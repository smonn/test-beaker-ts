import algosdk from "algosdk";

const value = Buffer.from(
  new Uint8Array([
    43, 11, 75, 23, 205, 133, 46, 67, 47, 191, 163, 10, 125, 96, 144, 184, 166,
    98, 52, 57, 48, 108, 95, 89, 211, 182, 143, 195, 242, 179, 221, 148, 0, 0,
    0, 0, 0, 0, 0, 1,
  ])
);

const addr = value.subarray(0, 32);
const amount = value.subarray(32);

console.log(algosdk.encodeAddress(addr));
console.log(algosdk.decodeUint64(amount, "bigint"));
