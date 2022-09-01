import { getAccounts, getAlgodClient } from "beaker-ts";
import { HelloBeaker } from "./hellobeaker_client";

test("create app", async () => {
  const account = (await getAccounts()).pop()!;

  const hello = new HelloBeaker({
    client: getAlgodClient(),
    signer: account.signer,
    sender: account.addr,
  });

  const [appId, appAddr, txId] = await hello.create();

  console.log({ appId, appAddr, txId });
  expect(appId).toBeDefined();
});
