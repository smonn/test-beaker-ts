import { getAccounts, getAlgodClient } from "beaker-ts";
import type { SandboxAccount } from "beaker-ts/lib/sandbox/accounts";
import { HelloBeaker } from "./hellobeaker_client";

jest.setTimeout(15000);

let account: SandboxAccount | null;
let app: HelloBeaker | null;
let appId: number | null;
let appAddr: string | null;

beforeAll(async () => {
  account = (await getAccounts()).pop()!;

  app = new HelloBeaker({
    client: getAlgodClient(),
    signer: account.signer,
    sender: account.addr,
  });

  [appId, appAddr] = await app.create();
});

afterAll(async () => {
  await app?.delete();
  app = appId = appAddr = account = null;
});

test("ensure appId and appAddr", () => {
  expect(appId).toBeDefined();
  expect(appAddr).toBeDefined();
});

test("call hello", async () => {
  const result = await app?.hello({ name: "World" });
  expect(result?.returnValue).toBe("Hello, World");
});
