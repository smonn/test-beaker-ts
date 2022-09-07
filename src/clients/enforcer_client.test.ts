import algosdk from "algosdk";
import { getAccounts, getAlgodClient } from "beaker-ts";
import type { ApplicationState } from "beaker-ts/lib/application_client/state";
import type { SandboxAccount } from "beaker-ts/lib/sandbox/accounts";
import { Enforcer, OfferTuple, RoyaltyPolicyTuple } from "./enforcer_client";

jest.setTimeout(15000);

let account: SandboxAccount | null;
let app: Enforcer | null;
let appId: number | null;
let appAddr: string | null;

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

async function createAsset(): Promise<number> {
  const client = getAlgodClient();
  const atc = new algosdk.AtomicTransactionComposer();

  atc.addTransaction({
    signer: account!.signer,
    txn: algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams: await client.getTransactionParams().do(),
      from: account!.addr,
      total: 1,
      decimals: 0,
      defaultFrozen: true,
      assetName: "Test Asset",
      unitName: "TEST",
      manager: appAddr!,
      reserve: appAddr!,
      freeze: appAddr!,
      clawback: appAddr!,
    }),
  });

  const result = await atc.execute(client, 5);

  const info = await client
    .pendingTransactionInformation(result.txIDs[0]!)
    .do();

  return info["asset-index"] as number;
}

async function getApplicationState(): Promise<GlobalState | null> {
  const state = await app?.getApplicationState(true);
  if (!state) return null;

  return {
    admin: algosdk.encodeAddress(readValue<Uint8Array>(state, "admin")),
    royalty_basis: readValue<number>(state, "royalty_basis"),
    royalty_receiver: algosdk.encodeAddress(
      readValue<Uint8Array>(state, "royalty_receiver")
    ),
  };
}

async function getAccountState() {
  const state = await app?.getAccountState(account!.addr, true);
  if (!state) return null;

  const keys = Object.keys(state);
  return {
    offers: keys.map((key) => ({
      asset_id: algosdk.decodeUint64(Buffer.from(key, "hex"), "safe"),
      amount: algosdk.decodeUint64(
        (state[key] as Uint8Array).subarray(32),
        "safe"
      ),
      auth_address: algosdk.encodeAddress(
        (state[key] as Uint8Array).subarray(0, 32)
      ),
    })),
  };
}

beforeAll(async () => {
  account = (await getAccounts()).pop()!;

  app = new Enforcer({
    client: getAlgodClient(),
    signer: account.signer,
    sender: account.addr,
  });

  [appId, appAddr] = await app.create({
    extraPages: 3,
    appGlobalByteSlices: 63,
    appGlobalInts: 1,
    appLocalByteSlices: 16,
  });

  await app.optIn({
    from: account.addr,
  });
});

afterAll(async () => {
  await app?.delete();
  app = appId = appAddr = account = null;
});

test("ensure appId and appAddr", () => {
  expect(appId).toBeDefined();
  expect(appAddr).toBeDefined();
});

test("call set_administrator", async () => {
  const result = await app?.set_administrator({
    new_admin: account!.addr,
  });
  expect(result?.returnValue).toBeUndefined();
  const state = await getApplicationState();
  expect(state?.admin).toBe(account!.addr);
});

test("call get_administrator", async () => {
  const result = await app?.get_administrator();
  expect(result?.returnValue).toEqual(account!.addr);
});

test("call set_policy", async () => {
  const policy = new RoyaltyPolicyTuple();
  policy.basis = 500n;
  policy.receiver = account!.addr;
  const result = await app?.set_policy({
    royalty_policy: policy,
  });
  expect(result?.returnValue).toBeUndefined();
  const state = await getApplicationState();
  expect(state?.royalty_basis).toBe(500);
  expect(state?.royalty_receiver).toBe(account!.addr);
});

test("call offer", async () => {
  const assetId = await createAsset();
  const offer = new OfferTuple();
  offer.amount = 1n;
  offer.auth_address = account!.addr;

  // New offer, so amount should be 0 and auth addr should be the zero addr
  const prevOffer = new OfferTuple();
  prevOffer.amount = 0n;
  prevOffer.auth_address = algosdk.encodeAddress(new Uint8Array(32));

  const result = await app?.offer({
    offer,
    royalty_asset: BigInt(assetId),
    previous_offer: prevOffer,
  });

  expect(result?.returnValue).toBeUndefined();

  const offers = await getAccountState();
  expect(offers).toEqual({
    offers: [
      {
        asset_id: assetId,
        amount: 1,
        auth_address: account!.addr,
      },
    ],
  });
});
