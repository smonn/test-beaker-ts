import algosdk, { AtomicTransactionComposer } from "algosdk";
import * as bkr from "beaker-ts";
import type { ApplicationState } from "beaker-ts/lib/application_client/state";
import type { SandboxAccount } from "beaker-ts/lib/sandbox/accounts";
import { Enforcer, OfferTuple, RoyaltyPolicyTuple } from "./enforcer_client";
import { Marketplace } from "./marketplace_client";

jest.setTimeout(60000);

const ZERO_ADDRESS = algosdk.encodeAddress(new Uint8Array(32));

interface GlobalState {
  admin: string;
  royalty_receiver: string;
  royalty_basis: number | bigint;
}

function readValue<T extends string | number | Uint8Array>(
  state: ApplicationState,
  key: string
): T {
  const encodedKey = Buffer.from(key, "utf8").toString("hex");
  return state[encodedKey] as T;
}

async function createTestAsset(
  client: algosdk.Algodv2,
  creator: SandboxAccount,
  enforcerAppAddr: string
): Promise<[number, string]> {
  const atc = new algosdk.AtomicTransactionComposer();

  atc.addTransaction({
    signer: creator.signer,
    txn: algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams: await client.getTransactionParams().do(),
      from: creator.addr,
      total: 1,
      decimals: 0,
      defaultFrozen: true,
      assetName: "Test Asset",
      unitName: "TEST",
      manager: enforcerAppAddr,
      reserve: enforcerAppAddr,
      freeze: enforcerAppAddr,
      clawback: enforcerAppAddr,
    }),
  });

  const result = await atc.execute(client, 5);

  const info = await client
    .pendingTransactionInformation(result.txIDs[0]!)
    .do();

  return [info["asset-index"] as number, result.txIDs[0]!];
}

async function getApplicationState(
  enforcerApp: Enforcer
): Promise<GlobalState | null> {
  const state = await enforcerApp.getApplicationState(true);
  if (!state) return null;

  return {
    admin: algosdk.encodeAddress(readValue<Uint8Array>(state, "admin")),
    royalty_basis: readValue<number>(state, "royalty_basis"),
    royalty_receiver: algosdk.encodeAddress(
      readValue<Uint8Array>(state, "royalty_receiver")
    ),
  };
}

async function getMarketplaceApplicationState(marketplaceApp: Marketplace) {
  const state = await marketplaceApp.getApplicationState(true);
  if (!state) return null;

  return {
    app_id: readValue<number>(state, "app_id"),
    asset_id: readValue<number>(state, "asset_id"),
    price: readValue<number>(state, "price"),
    amount: readValue<number>(state, "amount"),
    seller: algosdk.encodeAddress(readValue<Uint8Array>(state, "seller")),
  };
}

// async function getAccountState() {
//   const state = await app?.getAccountState(account!.addr, true);
//   if (!state) return null;

//   const keys = Object.keys(state);
//   return {
//     offers: keys.map((key) => ({
//       asset_id: algosdk.decodeUint64(Buffer.from(key, "hex"), "safe"),
//       amount: algosdk.decodeUint64(
//         (state[key] as Uint8Array).subarray(32),
//         "safe"
//       ),
//       auth_address: algosdk.encodeAddress(
//         (state[key] as Uint8Array).subarray(0, 32)
//       ),
//     })),
//   };
// }

// beforeAll(async () => {
//   account = (await getAccounts()).pop()!;

//   app = new Enforcer({
//     client: getAlgodClient(),
//     signer: account.signer,
//     sender: account.addr,
//   });

//   [appId, appAddr] = await app.create({
//     extraPages: 3,
//     appGlobalByteSlices: 63,
//     appGlobalInts: 1,
//     appLocalByteSlices: 16,
//   });

//   await app.optIn({
//     from: account.addr,
//   });
// });

// afterAll(async () => {
//   await app?.delete();
//   app = appId = appAddr = account = null;
// });

function generateSandboxAccount(): SandboxAccount {
  const account = algosdk.generateAccount();
  return {
    addr: account.addr,
    privateKey: Buffer.from(account.sk),
    signer: algosdk.makeBasicAccountTransactionSigner(account),
  };
}

test("happy path", async () => {
  const client = bkr.sandbox.getAlgodClient();
  const accounts = await bkr.sandbox.getAccounts();
  const admin = accounts.pop()!;
  const seller = accounts.pop()!;
  const buyer = accounts.pop()!;
  const royaltyReceiver = generateSandboxAccount();

  // getAccountState();
  // getApplicationState();

  const adminEnforcer = new Enforcer({
    client,
    signer: admin.signer,
    sender: admin.addr,
  });

  const [enforcerAppId, enforcerAppAddr] = await adminEnforcer.create({
    // max out schema
    extraPages: 3,
    appGlobalByteSlices: 63,
    appGlobalInts: 1,
    appLocalByteSlices: 16,
  });

  const sellerEnforcer = new Enforcer({
    client,
    signer: seller.signer,
    sender: seller.addr,
    appId: enforcerAppId,
  });

  const buyerEnforcer = new Enforcer({
    client,
    signer: buyer.signer,
    sender: buyer.addr,
    appId: enforcerAppId,
  });

  // opt in all accounts to the enforcer app
  await Promise.all([
    adminEnforcer.optIn(),
    sellerEnforcer.optIn(),
    buyerEnforcer.optIn(),
  ]);

  const [assetId] = await createTestAsset(client, admin, enforcerAppAddr);
  expect(assetId).toBeDefined();

  let enforcerAppState = await getApplicationState(adminEnforcer);

  expect(enforcerAppState).toEqual({
    admin: admin.addr,
    royalty_receiver: admin.addr,
    royalty_basis: 0,
  });

  // set policy with 5% royalty
  const policy = new RoyaltyPolicyTuple();
  policy.basis = 500n;
  policy.receiver = royaltyReceiver.addr;
  await adminEnforcer.set_policy({
    royalty_policy: policy,
  });

  enforcerAppState = await getApplicationState(adminEnforcer);
  expect(enforcerAppState).toEqual({
    admin: admin.addr,
    royalty_receiver: royaltyReceiver.addr,
    royalty_basis: 500,
  });

  // list asset for sale
  const sellerMarketplace = new Marketplace({
    client,
    signer: admin.signer,
    sender: admin.addr,
  });

  const [, marketplaceAppAddr] = await sellerMarketplace.create();

  let atc = new AtomicTransactionComposer();
  const offer = new OfferTuple();
  offer.auth_address = marketplaceAppAddr;
  offer.amount = 1n;
  const prevOffer = new OfferTuple();
  prevOffer.auth_address = ZERO_ADDRESS;
  prevOffer.amount = 0n;
  atc.addMethodCall({
    suggestedParams: await client.getTransactionParams().do(),
    signer: admin.signer,
    sender: admin.addr,
    appID: enforcerAppId,
    method: adminEnforcer.methods.find((m) => m.name === "offer")!,
    methodArgs: [assetId, Object.values(offer), Object.values(prevOffer)],
  });
  let group = atc.buildGroup();

  await sellerMarketplace.list({
    amount: 1n,
    asset: BigInt(assetId),
    app: BigInt(enforcerAppId),
    offer_txn: group[0]!,
    price: 1000000n,
  });

  const marketplaceState = await getMarketplaceApplicationState(
    sellerMarketplace
  );

  expect(marketplaceState).toEqual({
    app_id: enforcerAppId,
    asset_id: assetId,
    price: 1000000,
    amount: 1,
    seller: admin.addr,
  });

  await sellerMarketplace.delete();
  await adminEnforcer.delete();
});
