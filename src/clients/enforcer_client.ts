// @ts-nocheck
import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class AssetConfigTuple {
    total: bigint = BigInt(0);
    decimals: bigint = BigInt(0);
    default_frozen: boolean = false;
    unit_name: string = "";
    name: string = "";
    url: string = "";
    metadata_hash: Uint8Array = new Uint8Array();
    manager_addr: string = "";
    reserve_addr: string = "";
    freeze_addr: string = "";
    clawback_addr: string = "";
    static codec: algosdk.ABIType = algosdk.ABIType.from("(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)");
    static fields: string[] = ["total", "decimals", "default_frozen", "unit_name", "name", "url", "metadata_hash", "manager_addr", "reserve_addr", "freeze_addr", "clawback_addr"];
    static decodeResult(val: algosdk.ABIValue | undefined): AssetConfigTuple {
        return bkr.decodeNamedTuple(val, AssetConfigTuple.fields) as AssetConfigTuple;
    }
    static decodeBytes(val: Uint8Array): AssetConfigTuple {
        return bkr.decodeNamedTuple(AssetConfigTuple.codec.decode(val), AssetConfigTuple.fields) as AssetConfigTuple;
    }
}
export class OfferTuple {
    auth_address: string = "";
    amount: bigint = BigInt(0);
    static codec: algosdk.ABIType = algosdk.ABIType.from("(address,uint64)");
    static fields: string[] = ["auth_address", "amount"];
    static decodeResult(val: algosdk.ABIValue | undefined): OfferTuple {
        return bkr.decodeNamedTuple(val, OfferTuple.fields) as OfferTuple;
    }
    static decodeBytes(val: Uint8Array): OfferTuple {
        return bkr.decodeNamedTuple(OfferTuple.codec.decode(val), OfferTuple.fields) as OfferTuple;
    }
}
export class RoyaltyPolicyTuple {
    receiver: string = "";
    basis: bigint = BigInt(0);
    static codec: algosdk.ABIType = algosdk.ABIType.from("(address,uint64)");
    static fields: string[] = ["receiver", "basis"];
    static decodeResult(val: algosdk.ABIValue | undefined): RoyaltyPolicyTuple {
        return bkr.decodeNamedTuple(val, RoyaltyPolicyTuple.fields) as RoyaltyPolicyTuple;
    }
    static decodeBytes(val: Uint8Array): RoyaltyPolicyTuple {
        return bkr.decodeNamedTuple(RoyaltyPolicyTuple.codec.decode(val), RoyaltyPolicyTuple.fields) as RoyaltyPolicyTuple;
    }
}
export class Enforcer extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { administrator: { type: bkr.AVMType.bytes, key: "admin", desc: "", static: false }, royalty_basis: { type: bkr.AVMType.uint64, key: "royalty_basis", desc: "", static: false }, royalty_receiver: { type: bkr.AVMType.bytes, key: "royalty_receiver", desc: "", static: false } }, dynamic: {} };
    override acctSchema: bkr.Schema = { declared: {}, dynamic: { offers: { type: bkr.AVMType.bytes, desc: "", max_keys: 14 } } };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMSAzMiA0IDEwMDAwCmJ5dGVjYmxvY2sgMHg2MTY0NmQ2OTZlIDB4NzI2Zjc5NjE2Yzc0Nzk1ZjcyNjU2MzY1Njk3NjY1NzIgMHgxNTFmN2M3NSAweDcyNmY3OTYxNmM3NDc5NWY2MjYxNzM2OTczIDB4MDAKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDQyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4N2IzNTFjZTUgLy8gImFjY291bnRfZnJlZXplKGFzc2V0LGFjY291bnQsYm9vbCl2b2lkIgo9PQpibnogbWFpbl9sNDEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlZTZhODRhYSAvLyAiYXNzZXRfY29uZmlnKGFzc2V0LHVpbnQ2NCx1aW50MzIsYm9vbCxzdHJpbmcsc3RyaW5nLHN0cmluZyxieXRlW10sYWRkcmVzcyxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcyl2b2lkIgo9PQpibnogbWFpbl9sNDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlN2VjZDVhOCAvLyAiYXNzZXRfY3JlYXRlKHVpbnQ2NCx1aW50MzIsYm9vbCxzdHJpbmcsc3RyaW5nLHN0cmluZyxieXRlW10sYWRkcmVzcyxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcyl1aW50NjQiCj09CmJueiBtYWluX2wzOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDRiMTdiZjIwIC8vICJhc3NldF9kZXN0cm95KGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2wzOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDE1Y2YyYmEzIC8vICJhc3NldF9mcmVlemUoYXNzZXQsYm9vbCl2b2lkIgo9PQpibnogbWFpbl9sMzcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyZmM3NDNhOCAvLyAiYXNzZXRfdHJhbnNmZXIoYXNzZXQsdWludDY0LGFjY291bnQsYWNjb3VudCl2b2lkIgo9PQpibnogbWFpbl9sMzYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgxNjFjMDgxMSAvLyAiZ2V0X2FjY291bnRfaXNfZnJvemVuKGFjY291bnQpYm9vbCIKPT0KYm56IG1haW5fbDM1CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NTBjYzc0MGYgLy8gImdldF9hZG1pbmlzdHJhdG9yKClhZGRyZXNzIgo9PQpibnogbWFpbl9sMzQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhjZTJmMDVmMyAvLyAiZ2V0X2Fzc2V0X2NvbmZpZyhhc3NldCkodWludDY0LHVpbnQzMixib29sLHN0cmluZyxzdHJpbmcsc3RyaW5nLGJ5dGVbXSxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcyxhZGRyZXNzKSIKPT0KYm56IG1haW5fbDMzCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZTNkY2JjNTggLy8gImdldF9hc3NldF9pc19mcm96ZW4oYXNzZXQsYWNjb3VudClib29sIgo9PQpibnogbWFpbl9sMzIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlOTc0ODNiZiAvLyAiZ2V0X2NpcmN1bGF0aW5nX3N1cHBseShhc3NldCl1aW50NjQiCj09CmJueiBtYWluX2wzMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGI3OTZjMzUxIC8vICJnZXRfb2ZmZXIodWludDY0LGFjY291bnQpKGFkZHJlc3MsdWludDY0KSIKPT0KYm56IG1haW5fbDMwCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YTIzMDA3YWUgLy8gImdldF9wb2xpY3koKShhZGRyZXNzLHVpbnQ2NCkiCj09CmJueiBtYWluX2wyOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGY0NTI1ODA3IC8vICJvZmZlcihhc3NldCwoYWRkcmVzcyx1aW50NjQpLChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKPT0KYm56IG1haW5fbDI4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4M2RhMGJhYzYgLy8gInJveWFsdHlfZnJlZV9tb3ZlKGFzc2V0LHVpbnQ2NCxhY2NvdW50LGFjY291bnQsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2wyNwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDFiMWE5NjViIC8vICJzZXRfYWRtaW5pc3RyYXRvcihhZGRyZXNzKXZvaWQiCj09CmJueiBtYWluX2wyNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGQ0NDc1MDMyIC8vICJzZXRfcGF5bWVudF9hc3NldChhc3NldCxib29sKXZvaWQiCj09CmJueiBtYWluX2wyNQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGU5MGI5ODA0IC8vICJzZXRfcG9saWN5KChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKPT0KYm56IG1haW5fbDI0CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZmRkNjFkNmEgLy8gInRyYW5zZmVyX2FsZ29fcGF5bWVudChhc3NldCx1aW50NjQsYWNjb3VudCxhY2NvdW50LGFjY291bnQscGF5LHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMjMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhiN2I4Nzc2NiAvLyAidHJhbnNmZXJfYXNzZXRfcGF5bWVudChhc3NldCx1aW50NjQsYWNjb3VudCxhY2NvdW50LGFjY291bnQsYXhmZXIsYXNzZXQsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2wyMgplcnIKbWFpbl9sMjI6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA4Nwp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgODgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDg5CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA5MAp0eG5hIEFwcGxpY2F0aW9uQXJncyA1CmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgOTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDkzCnR4bmEgQXBwbGljYXRpb25BcmdzIDcKYnRvaQpzdG9yZSA5NAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDkyCmxvYWQgOTIKZ3R4bnMgVHlwZUVudW0KaW50Y18zIC8vIGF4ZmVyCj09CmFzc2VydApsb2FkIDg3CmxvYWQgODgKbG9hZCA4OQpsb2FkIDkwCmxvYWQgOTEKbG9hZCA5Mgpsb2FkIDkzCmxvYWQgOTQKY2FsbHN1YiB0cmFuc2ZlcmFzc2V0cGF5bWVudF80MAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjM6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA4MAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgODEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDgyCnR4bmEgQXBwbGljYXRpb25BcmdzIDQKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA4Mwp0eG5hIEFwcGxpY2F0aW9uQXJncyA1CmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgODQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgpidG9pCnN0b3JlIDg2CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgODUKbG9hZCA4NQpndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApsb2FkIDgwCmxvYWQgODEKbG9hZCA4Mgpsb2FkIDgzCmxvYWQgODQKbG9hZCA4NQpsb2FkIDg2CmNhbGxzdWIgdHJhbnNmZXJhbGdvcGF5bWVudF8zOQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKY2FsbHN1YiBzZXRwb2xpY3lfMzgKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDI1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNzgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApwdXNoaW50IDggLy8gOAoqCmdldGJpdApzdG9yZSA3OQpsb2FkIDc4CmxvYWQgNzkKY2FsbHN1YiBzZXRwYXltZW50YXNzZXRfMzcKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDI2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmNhbGxzdWIgc2V0YWRtaW5pc3RyYXRvcl8zNgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjc6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3Mwp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgNzQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDc1CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3Ngp0eG5hIEFwcGxpY2F0aW9uQXJncyA1CmJ0b2kKc3RvcmUgNzcKbG9hZCA3Mwpsb2FkIDc0CmxvYWQgNzUKbG9hZCA3Ngpsb2FkIDc3CmNhbGxzdWIgcm95YWx0eWZyZWVtb3ZlXzM1CmludGNfMSAvLyAxCnJldHVybgptYWluX2wyODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDcwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKc3RvcmUgNzEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwpzdG9yZSA3Mgpsb2FkIDcwCmxvYWQgNzEKbG9hZCA3MgpjYWxsc3ViIG9mZmVyXzM0CmludGNfMSAvLyAxCnJldHVybgptYWluX2wyOToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRwb2xpY3lfMzMKc3RvcmUgNjMKYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CmxvYWQgNjMKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMzA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpzdG9yZSA1Ngp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNTcKbG9hZCA1Ngpsb2FkIDU3CmNhbGxzdWIgZ2V0b2ZmZXJfMzIKc3RvcmUgNTgKYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CmxvYWQgNTgKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMzE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpjYWxsc3ViIGdldGNpcmN1bGF0aW5nc3VwcGx5XzMxCnN0b3JlIDU0CmJ5dGVjXzIgLy8gMHgxNTFmN2M3NQpsb2FkIDU0Cml0b2IKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMzI6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA0OQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNTAKbG9hZCA0OQpsb2FkIDUwCmNhbGxzdWIgZ2V0YXNzZXRpc2Zyb3plbl8zMApzdG9yZSA1MQpieXRlY18yIC8vIDB4MTUxZjdjNzUKYnl0ZWMgNCAvLyAweDAwCmludGNfMCAvLyAwCmxvYWQgNTEKc2V0Yml0CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDMzOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBnZXRhc3NldGNvbmZpZ18yOQpzdG9yZSA0NwpieXRlY18yIC8vIDB4MTUxZjdjNzUKbG9hZCA0Nwpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wzNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRhZG1pbmlzdHJhdG9yXzI4CnN0b3JlIDQ2CmJ5dGVjXzIgLy8gMHgxNTFmN2M3NQpsb2FkIDQ2CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDM1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBnZXRhY2NvdW50aXNmcm96ZW5fMjcKc3RvcmUgNDQKYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CmJ5dGVjIDQgLy8gMHgwMAppbnRjXzAgLy8gMApsb2FkIDQ0CnNldGJpdApjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wzNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDQwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSA0MQp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNDIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDQzCmxvYWQgNDAKbG9hZCA0MQpsb2FkIDQyCmxvYWQgNDMKY2FsbHN1YiBhc3NldHRyYW5zZmVyXzIxCmludGNfMSAvLyAxCnJldHVybgptYWluX2wzNzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDM4CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKcHVzaGludCA4IC8vIDgKKgpnZXRiaXQKc3RvcmUgMzkKbG9hZCAzOApsb2FkIDM5CmNhbGxzdWIgYXNzZXRmcmVlemVfMjAKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDM4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBhc3NldGRlc3Ryb3lfMTkKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDM5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJ0b2kKc3RvcmUgMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApleHRyYWN0X3VpbnQzMgpzdG9yZSAxNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmludGNfMCAvLyAwCnB1c2hpbnQgOCAvLyA4CioKZ2V0Yml0CnN0b3JlIDE3CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKc3RvcmUgMTgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQpzdG9yZSAxOQp0eG5hIEFwcGxpY2F0aW9uQXJncyA2CnN0b3JlIDIwCnR4bmEgQXBwbGljYXRpb25BcmdzIDcKc3RvcmUgMjEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOApzdG9yZSAyMgp0eG5hIEFwcGxpY2F0aW9uQXJncyA5CnN0b3JlIDIzCnR4bmEgQXBwbGljYXRpb25BcmdzIDEwCnN0b3JlIDI0CnR4bmEgQXBwbGljYXRpb25BcmdzIDExCnN0b3JlIDI1CmxvYWQgMTUKbG9hZCAxNgpsb2FkIDE3CmxvYWQgMTgKbG9hZCAxOQpsb2FkIDIwCmxvYWQgMjEKbG9hZCAyMgpsb2FkIDIzCmxvYWQgMjQKbG9hZCAyNQpjYWxsc3ViIGFzc2V0Y3JlYXRlXzE4CnN0b3JlIDI2CmJ5dGVjXzIgLy8gMHgxNTFmN2M3NQpsb2FkIDI2Cml0b2IKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNDA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAzCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSA0CnR4bmEgQXBwbGljYXRpb25BcmdzIDMKaW50Y18wIC8vIDAKZXh0cmFjdF91aW50MzIKc3RvcmUgNQp0eG5hIEFwcGxpY2F0aW9uQXJncyA0CmludGNfMCAvLyAwCnB1c2hpbnQgOCAvLyA4CioKZ2V0Yml0CnN0b3JlIDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQpzdG9yZSA3CnR4bmEgQXBwbGljYXRpb25BcmdzIDYKc3RvcmUgOAp0eG5hIEFwcGxpY2F0aW9uQXJncyA3CnN0b3JlIDkKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOApzdG9yZSAxMAp0eG5hIEFwcGxpY2F0aW9uQXJncyA5CnN0b3JlIDExCnR4bmEgQXBwbGljYXRpb25BcmdzIDEwCnN0b3JlIDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDExCnN0b3JlIDEzCnR4bmEgQXBwbGljYXRpb25BcmdzIDEyCnN0b3JlIDE0CmxvYWQgMwpsb2FkIDQKbG9hZCA1CmxvYWQgNgpsb2FkIDcKbG9hZCA4CmxvYWQgOQpsb2FkIDEwCmxvYWQgMTEKbG9hZCAxMgpsb2FkIDEzCmxvYWQgMTQKY2FsbHN1YiBhc3NldGNvbmZpZ18xNwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNDE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKaW50Y18wIC8vIDAKcHVzaGludCA4IC8vIDgKKgpnZXRiaXQKc3RvcmUgMgpsb2FkIDAKbG9hZCAxCmxvYWQgMgpjYWxsc3ViIGFjY291bnRmcmVlemVfMTYKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDQyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2w1MAp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sNDkKdHhuIE9uQ29tcGxldGlvbgppbnRjXzMgLy8gVXBkYXRlQXBwbGljYXRpb24KPT0KYm56IG1haW5fbDQ4CnR4biBPbkNvbXBsZXRpb24KcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCj09CmJueiBtYWluX2w0NwplcnIKbWFpbl9sNDc6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CmFzc2VydApjYWxsc3ViIGRlbGV0ZV81CmludGNfMSAvLyAxCnJldHVybgptYWluX2w0ODoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgdXBkYXRlXzMKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDQ5Ogp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl82CmludGNfMSAvLyAxCnJldHVybgptYWluX2w1MDoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzEKaW50Y18xIC8vIDEKcmV0dXJuCgovLyA8bGFtYmRhPgpsYW1iZGFfMDoKaXRvYgpyZXRzdWIKCi8vIGNyZWF0ZQpjcmVhdGVfMToKYnl0ZWNfMCAvLyAiYWRtaW4iCmdsb2JhbCBDcmVhdG9yQWRkcmVzcwphcHBfZ2xvYmFsX3B1dApieXRlY18zIC8vICJyb3lhbHR5X2Jhc2lzIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJyb3lhbHR5X3JlY2VpdmVyIgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gdXBkYXRlCnVwZGF0ZV8zOgp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmludGNfMSAvLyAxCnJldHVybgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzQ6CmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGRlbGV0ZQpkZWxldGVfNToKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzQKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzEgLy8gMQpyZXR1cm4KCi8vIG9wdF9pbgpvcHRpbl82OgpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV83OgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfODoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5Xzk6CmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8xMDoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzExOgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMTI6CmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8xMzoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzE0OgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMTU6CmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGFjY291bnRfZnJlZXplCmFjY291bnRmcmVlemVfMTY6CnN0b3JlIDk3CnN0b3JlIDk2CnN0b3JlIDk1CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8xMQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmludGNfMCAvLyAwCnJldHVybgoKLy8gYXNzZXRfY29uZmlnCmFzc2V0Y29uZmlnXzE3OgpzdG9yZSAxMDkKc3RvcmUgMTA4CnN0b3JlIDEwNwpzdG9yZSAxMDYKc3RvcmUgMTA1CnN0b3JlIDEwNApzdG9yZSAxMDMKc3RvcmUgMTAyCnN0b3JlIDEwMQpzdG9yZSAxMDAKc3RvcmUgOTkKc3RvcmUgOTgKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzgKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGFzc2V0X2NyZWF0ZQphc3NldGNyZWF0ZV8xODoKc3RvcmUgMzcKc3RvcmUgMzYKc3RvcmUgMzUKc3RvcmUgMzQKc3RvcmUgMzMKc3RvcmUgMzIKc3RvcmUgMzEKc3RvcmUgMzAKc3RvcmUgMjkKc3RvcmUgMjgKc3RvcmUgMjcKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzcKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGFzc2V0X2Rlc3Ryb3kKYXNzZXRkZXN0cm95XzE5OgpzdG9yZSAxMTAKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzEyCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBhc3NldF9mcmVlemUKYXNzZXRmcmVlemVfMjA6CnN0b3JlIDExMgpzdG9yZSAxMTEKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzEwCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBhc3NldF90cmFuc2Zlcgphc3NldHRyYW5zZmVyXzIxOgpzdG9yZSAxMTYKc3RvcmUgMTE1CnN0b3JlIDExNApzdG9yZSAxMTMKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzkKLy8gdW5hdXRob3JpemVkCmFzc2VydApndHhuIDAgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKaW50Y18xIC8vIDEKPT0KdHhuIEdyb3VwSW5kZXgKaW50Y18wIC8vIDAKPT0KJiYKYXNzZXJ0CmxvYWQgMTE0CmludGNfMSAvLyAxCj09CmFzc2VydApsb2FkIDExNQp0eG5hcyBBY2NvdW50cwpsZW4KaW50Y18yIC8vIDMyCj09CmFzc2VydApsb2FkIDExNgp0eG5hcyBBY2NvdW50cwpsZW4KaW50Y18yIC8vIDMyCj09CmFzc2VydApsb2FkIDExMwp0eG5hcyBBc3NldHMKbG9hZCAxMTUKdHhuYXMgQWNjb3VudHMKbG9hZCAxMTYKdHhuYXMgQWNjb3VudHMKbG9hZCAxMTQKY2FsbHN1YiBkb21vdmVhc3NldF8yMwpyZXRzdWIKCi8vIGNvbXB1dGVfcm95YWx0eV9hbW91bnQKY29tcHV0ZXJveWFsdHlhbW91bnRfMjI6Cm11bHcKaW50Y18wIC8vIDAKaW50YyA0IC8vIDEwMDAwCmRpdm1vZHcKcG9wCnBvcApzd2FwCiEKYXNzZXJ0CnJldHN1YgoKLy8gZG9fbW92ZV9hc3NldApkb21vdmVhc3NldF8yMzoKc3RvcmUgMTIwCnN0b3JlIDExOQpzdG9yZSAxMTgKc3RvcmUgMTE3Cml0eG5fYmVnaW4KaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKaW50Y18zIC8vIGF4ZmVyCml0eG5fZmllbGQgVHlwZUVudW0KbG9hZCAxMTcKaXR4bl9maWVsZCBYZmVyQXNzZXQKbG9hZCAxMjAKaXR4bl9maWVsZCBBc3NldEFtb3VudApsb2FkIDExOAppdHhuX2ZpZWxkIEFzc2V0U2VuZGVyCmxvYWQgMTE5Cml0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIGRvX3BheV9hbGdvcwpkb3BheWFsZ29zXzI0OgpzdG9yZSAxNzAKc3RvcmUgMTY5CmxvYWQgMTY5CmJ5dGVjXzMgLy8gInJveWFsdHlfYmFzaXMiCmFwcF9nbG9iYWxfZ2V0CmNhbGxzdWIgY29tcHV0ZXJveWFsdHlhbW91bnRfMjIKc3RvcmUgMTcxCml0eG5fYmVnaW4KaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKaW50Y18xIC8vIHBheQppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTY5CmxvYWQgMTcxCi0KaXR4bl9maWVsZCBBbW91bnQKbG9hZCAxNzAKaXR4bl9maWVsZCBSZWNlaXZlcgpsb2FkIDE3MQppbnRjXzAgLy8gMAo+CmJ6IGRvcGF5YWxnb3NfMjRfbDIKaXR4bl9uZXh0CmludGNfMCAvLyAwCml0eG5fZmllbGQgRmVlCmludGNfMSAvLyBwYXkKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDE3MQppdHhuX2ZpZWxkIEFtb3VudApieXRlY18xIC8vICJyb3lhbHR5X3JlY2VpdmVyIgphcHBfZ2xvYmFsX2dldAppdHhuX2ZpZWxkIFJlY2VpdmVyCmRvcGF5YWxnb3NfMjRfbDI6Cml0eG5fc3VibWl0CnJldHN1YgoKLy8gZG9fcGF5X2Fzc2V0cwpkb3BheWFzc2V0c18yNToKc3RvcmUgMTg1CnN0b3JlIDE4NApzdG9yZSAxODMKbG9hZCAxODQKYnl0ZWNfMyAvLyAicm95YWx0eV9iYXNpcyIKYXBwX2dsb2JhbF9nZXQKY2FsbHN1YiBjb21wdXRlcm95YWx0eWFtb3VudF8yMgpzdG9yZSAxODYKaXR4bl9iZWdpbgppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDE4MwppdHhuX2ZpZWxkIFhmZXJBc3NldApsb2FkIDE4NApsb2FkIDE4NgotCml0eG5fZmllbGQgQXNzZXRBbW91bnQKbG9hZCAxODUKaXR4bl9maWVsZCBSZWNlaXZlcgpsb2FkIDE4NgppbnRjXzAgLy8gMAo+CmJ6IGRvcGF5YXNzZXRzXzI1X2wyCml0eG5fbmV4dAppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDE4MwppdHhuX2ZpZWxkIFhmZXJBc3NldApsb2FkIDE4NgppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CmJ5dGVjXzEgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0Cml0eG5fZmllbGQgUmVjZWl2ZXIKZG9wYXlhc3NldHNfMjVfbDI6Cml0eG5fc3VibWl0CnJldHN1YgoKLy8gZG9fdXBkYXRlX29mZmVyZWQKZG91cGRhdGVvZmZlcmVkXzI2OgpzdG9yZSAxMzcKc3RvcmUgMTM2CnN0b3JlIDEzNQpzdG9yZSAxMzQKc3RvcmUgMTMzCnN0b3JlIDEzMgpsb2FkIDEzMgppbnRjXzAgLy8gMApsb2FkIDEzMwpjYWxsc3ViIGxhbWJkYV8wCmFwcF9sb2NhbF9nZXRfZXgKc3RvcmUgMTM5CnN0b3JlIDEzOApsb2FkIDEzOQpibnogZG91cGRhdGVvZmZlcmVkXzI2X2w1CmxvYWQgMTM3CmludGNfMCAvLyAwCj09CmFzc2VydApsb2FkIDEzNgpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KYXNzZXJ0CmRvdXBkYXRlb2ZmZXJlZF8yNl9sMjoKbG9hZCAxMzUKaW50Y18wIC8vIDAKPgpibnogZG91cGRhdGVvZmZlcmVkXzI2X2w0CmxvYWQgMTMyCmxvYWQgMTMzCmNhbGxzdWIgbGFtYmRhXzAKYXBwX2xvY2FsX2RlbApiIGRvdXBkYXRlb2ZmZXJlZF8yNl9sNgpkb3VwZGF0ZW9mZmVyZWRfMjZfbDQ6CmxvYWQgMTMyCmxvYWQgMTMzCmNhbGxzdWIgbGFtYmRhXzAKbG9hZCAxMzQKbG9hZCAxMzUKaXRvYgpjb25jYXQKYXBwX2xvY2FsX3B1dApiIGRvdXBkYXRlb2ZmZXJlZF8yNl9sNgpkb3VwZGF0ZW9mZmVyZWRfMjZfbDU6CmxvYWQgMTM4CnN0b3JlIDE0MApsb2FkIDE0MAppbnRjXzIgLy8gMzIKZXh0cmFjdF91aW50NjQKbG9hZCAxMzcKPT0KYXNzZXJ0CmxvYWQgMTQwCmV4dHJhY3QgMCAzMgpsb2FkIDEzNgo9PQphc3NlcnQKYiBkb3VwZGF0ZW9mZmVyZWRfMjZfbDIKZG91cGRhdGVvZmZlcmVkXzI2X2w2OgpyZXRzdWIKCi8vIGdldF9hY2NvdW50X2lzX2Zyb3plbgpnZXRhY2NvdW50aXNmcm96ZW5fMjc6CnN0b3JlIDQ1CmludGNfMCAvLyAwCnJldHVybgoKLy8gZ2V0X2FkbWluaXN0cmF0b3IKZ2V0YWRtaW5pc3RyYXRvcl8yODoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0CnJldHN1YgoKLy8gZ2V0X2Fzc2V0X2NvbmZpZwpnZXRhc3NldGNvbmZpZ18yOToKc3RvcmUgNDgKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBnZXRfYXNzZXRfaXNfZnJvemVuCmdldGFzc2V0aXNmcm96ZW5fMzA6CnN0b3JlIDUzCnN0b3JlIDUyCmludGNfMCAvLyAwCnJldHVybgoKLy8gZ2V0X2NpcmN1bGF0aW5nX3N1cHBseQpnZXRjaXJjdWxhdGluZ3N1cHBseV8zMToKc3RvcmUgNTUKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBnZXRfb2ZmZXIKZ2V0b2ZmZXJfMzI6CnN0b3JlIDYwCnN0b3JlIDU5CmxvYWQgNjAKdHhuYXMgQWNjb3VudHMKaW50Y18wIC8vIDAKbG9hZCA1OQpjYWxsc3ViIGxhbWJkYV8wCmFwcF9sb2NhbF9nZXRfZXgKc3RvcmUgNjIKc3RvcmUgNjEKbG9hZCA2Mgphc3NlcnQKbG9hZCA2MQpyZXRzdWIKCi8vIGdldF9wb2xpY3kKZ2V0cG9saWN5XzMzOgppbnRjXzAgLy8gMApieXRlY18zIC8vICJyb3lhbHR5X2Jhc2lzIgphcHBfZ2xvYmFsX2dldF9leApzdG9yZSA2NgpzdG9yZSA2NQpsb2FkIDY2CmFzc2VydApsb2FkIDY1CnN0b3JlIDY0CmludGNfMCAvLyAwCmJ5dGVjXzEgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDY5CnN0b3JlIDY4CmxvYWQgNjkKYXNzZXJ0CmxvYWQgNjgKc3RvcmUgNjcKbG9hZCA2NwpsZW4KaW50Y18yIC8vIDMyCj09CmFzc2VydApsb2FkIDY3CmxvYWQgNjQKaXRvYgpjb25jYXQKcmV0c3ViCgovLyBvZmZlcgpvZmZlcl8zNDoKc3RvcmUgMTIzCnN0b3JlIDEyMgpzdG9yZSAxMjEKbG9hZCAxMjIKaW50Y18yIC8vIDMyCmV4dHJhY3RfdWludDY0CnN0b3JlIDEyNApsb2FkIDEyMgpleHRyYWN0IDAgMzIKc3RvcmUgMTI1CmxvYWQgMTIzCmludGNfMiAvLyAzMgpleHRyYWN0X3VpbnQ2NApzdG9yZSAxMjYKbG9hZCAxMjMKZXh0cmFjdCAwIDMyCnN0b3JlIDEyNwp0eG4gU2VuZGVyCmxvYWQgMTIxCmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSAxMjkKc3RvcmUgMTI4CmxvYWQgMTIxCmFzc2V0X3BhcmFtc19nZXQgQXNzZXRDbGF3YmFjawpzdG9yZSAxMzEKc3RvcmUgMTMwCmd0eG4gMCBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQpndHhuIDEgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KJiYKYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKcHVzaGludCAyIC8vIDIKPT0KdHhuIEdyb3VwSW5kZXgKaW50Y18wIC8vIDAKPT0KJiYKYXNzZXJ0CmxvYWQgMTI4CmxvYWQgMTI0Cj49CmFzc2VydApsb2FkIDEzMApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwo9PQphc3NlcnQKdHhuIFNlbmRlcgpsb2FkIDEyMQp0eG5hcyBBc3NldHMKbG9hZCAxMjUKbG9hZCAxMjQKbG9hZCAxMjcKbG9hZCAxMjYKY2FsbHN1YiBkb3VwZGF0ZW9mZmVyZWRfMjYKcmV0c3ViCgovLyByb3lhbHR5X2ZyZWVfbW92ZQpyb3lhbHR5ZnJlZW1vdmVfMzU6CnN0b3JlIDE0NQpzdG9yZSAxNDQKc3RvcmUgMTQzCnN0b3JlIDE0MgpzdG9yZSAxNDEKbG9hZCAxNDMKdHhuYXMgQWNjb3VudHMKbG9hZCAxNDEKdHhuYXMgQXNzZXRzCmNhbGxzdWIgbGFtYmRhXzAKYXBwX2xvY2FsX2dldApzdG9yZSAxNDYKbG9hZCAxNDYKaW50Y18yIC8vIDMyCmV4dHJhY3RfdWludDY0CnN0b3JlIDE0Nwpsb2FkIDE0NgpleHRyYWN0IDAgMzIKc3RvcmUgMTQ4Cmd0eG4gMCBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQppbnRjXzEgLy8gMQo9PQp0eG4gR3JvdXBJbmRleAppbnRjXzAgLy8gMAo9PQomJgphc3NlcnQKbG9hZCAxNDcKbG9hZCAxNDUKPT0KYXNzZXJ0CmxvYWQgMTQ3CmxvYWQgMTQyCj49CmFzc2VydApsb2FkIDE0OAp0eG4gU2VuZGVyCj09CmFzc2VydApsb2FkIDE0Mwp0eG5hcyBBY2NvdW50cwpsb2FkIDE0MQp0eG5hcyBBc3NldHMKcHVzaGJ5dGVzIDB4IC8vICIiCmludGNfMCAvLyAwCmxvYWQgMTQ4CmxvYWQgMTQ3CmNhbGxzdWIgZG91cGRhdGVvZmZlcmVkXzI2CmxvYWQgMTQxCnR4bmFzIEFzc2V0cwpsb2FkIDE0Mwp0eG5hcyBBY2NvdW50cwpsb2FkIDE0NAp0eG5hcyBBY2NvdW50cwpsb2FkIDE0MgpjYWxsc3ViIGRvbW92ZWFzc2V0XzIzCnJldHN1YgoKLy8gc2V0X2FkbWluaXN0cmF0b3IKc2V0YWRtaW5pc3RyYXRvcl8zNjoKc3RvcmUgMTQ5CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8xMwovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0Cmd0eG4gMCBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQppbnRjXzEgLy8gMQo9PQp0eG4gR3JvdXBJbmRleAppbnRjXzAgLy8gMAo9PQomJgphc3NlcnQKbG9hZCAxNDkKbGVuCmludGNfMiAvLyAzMgo9PQphc3NlcnQKYnl0ZWNfMCAvLyAiYWRtaW4iCmxvYWQgMTQ5CmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gc2V0X3BheW1lbnRfYXNzZXQKc2V0cGF5bWVudGFzc2V0XzM3OgpzdG9yZSAxNTEKc3RvcmUgMTUwCnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8xNQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgMTUwCmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSAxNTMKc3RvcmUgMTUyCmxvYWQgMTUwCmFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCnN0b3JlIDE1NQpzdG9yZSAxNTQKZ3R4biAwIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09CmFzc2VydApnbG9iYWwgR3JvdXBTaXplCmludGNfMSAvLyAxCj09CnR4biBHcm91cEluZGV4CmludGNfMCAvLyAwCj09CiYmCmFzc2VydApsb2FkIDE1MQpsb2FkIDE1MwohCiYmCmJueiBzZXRwYXltZW50YXNzZXRfMzdfbDQKbG9hZCAxNTEKIQpsb2FkIDE1MwomJgpibnogc2V0cGF5bWVudGFzc2V0XzM3X2wzCmludGNfMCAvLyAwCnJldHVybgpzZXRwYXltZW50YXNzZXRfMzdfbDM6Cml0eG5fYmVnaW4KaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKaW50Y18zIC8vIGF4ZmVyCml0eG5fZmllbGQgVHlwZUVudW0KbG9hZCAxNTAKdHhuYXMgQXNzZXRzCml0eG5fZmllbGQgWGZlckFzc2V0CmludGNfMCAvLyAwCml0eG5fZmllbGQgQXNzZXRBbW91bnQKbG9hZCAxNTQKaXR4bl9maWVsZCBBc3NldENsb3NlVG8KbG9hZCAxNTQKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCml0eG5fc3VibWl0CmIgc2V0cGF5bWVudGFzc2V0XzM3X2w1CnNldHBheW1lbnRhc3NldF8zN19sNDoKaXR4bl9iZWdpbgppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDE1MAp0eG5hcyBBc3NldHMKaXR4bl9maWVsZCBYZmVyQXNzZXQKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBBc3NldEFtb3VudApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwppdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKaXR4bl9zdWJtaXQKc2V0cGF5bWVudGFzc2V0XzM3X2w1OgpyZXRzdWIKCi8vIHNldF9wb2xpY3kKc2V0cG9saWN5XzM4OgpzdG9yZSAxNTYKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzE0Ci8vIHVuYXV0aG9yaXplZAphc3NlcnQKbG9hZCAxNTYKaW50Y18yIC8vIDMyCmV4dHJhY3RfdWludDY0CnN0b3JlIDE1Nwpsb2FkIDE1NgpleHRyYWN0IDAgMzIKc3RvcmUgMTU4Cmd0eG4gMCBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQppbnRjXzEgLy8gMQo9PQp0eG4gR3JvdXBJbmRleAppbnRjXzAgLy8gMAo9PQomJgphc3NlcnQKbG9hZCAxNTcKaW50YyA0IC8vIDEwMDAwCjw9CmFzc2VydApieXRlY18zIC8vICJyb3lhbHR5X2Jhc2lzIgpsb2FkIDE1NwphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJyb3lhbHR5X3JlY2VpdmVyIgpsb2FkIDE1OAphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIHRyYW5zZmVyX2FsZ29fcGF5bWVudAp0cmFuc2ZlcmFsZ29wYXltZW50XzM5OgpzdG9yZSAxNjUKc3RvcmUgMTY0CnN0b3JlIDE2MwpzdG9yZSAxNjIKc3RvcmUgMTYxCnN0b3JlIDE2MApzdG9yZSAxNTkKbG9hZCAxNjEKdHhuYXMgQWNjb3VudHMKbG9hZCAxNTkKdHhuYXMgQXNzZXRzCmNhbGxzdWIgbGFtYmRhXzAKYXBwX2xvY2FsX2dldApzdG9yZSAxNjYKbG9hZCAxNjYKaW50Y18yIC8vIDMyCmV4dHJhY3RfdWludDY0CnN0b3JlIDE2Nwpsb2FkIDE2NgpleHRyYWN0IDAgMzIKc3RvcmUgMTY4CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCj09CmFzc2VydApnbG9iYWwgR3JvdXBTaXplCnB1c2hpbnQgMiAvLyAyCj09CmFzc2VydApndHhuIDAgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KZ3R4biAxIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09CiYmCmFzc2VydApnbG9iYWwgR3JvdXBTaXplCnB1c2hpbnQgMiAvLyAyCj09CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCj09CiYmCmFzc2VydAp0eG4gU2VuZGVyCmxvYWQgMTY4Cj09CmFzc2VydApsb2FkIDE2MApsb2FkIDE2Nwo8PQphc3NlcnQKbG9hZCAxNjQKZ3R4bnMgUmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KYXNzZXJ0CmJ5dGVjXzEgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0Cmdsb2JhbCBaZXJvQWRkcmVzcwohPQphc3NlcnQKbG9hZCAxNjMKdHhuYXMgQWNjb3VudHMKYnl0ZWNfMSAvLyAicm95YWx0eV9yZWNlaXZlciIKYXBwX2dsb2JhbF9nZXQKPT0KYXNzZXJ0CmxvYWQgMTY0Cmd0eG5zIEFtb3VudApsb2FkIDE2MQp0eG5hcyBBY2NvdW50cwpjYWxsc3ViIGRvcGF5YWxnb3NfMjQKbG9hZCAxNTkKdHhuYXMgQXNzZXRzCmxvYWQgMTYxCnR4bmFzIEFjY291bnRzCmxvYWQgMTYyCnR4bmFzIEFjY291bnRzCmxvYWQgMTYwCmNhbGxzdWIgZG9tb3ZlYXNzZXRfMjMKbG9hZCAxNjEKdHhuYXMgQWNjb3VudHMKbG9hZCAxNTkKdHhuYXMgQXNzZXRzCmxvYWQgMTY4CmxvYWQgMTY3CmxvYWQgMTYwCi0KdHhuIFNlbmRlcgpsb2FkIDE2NQpjYWxsc3ViIGRvdXBkYXRlb2ZmZXJlZF8yNgpyZXRzdWIKCi8vIHRyYW5zZmVyX2Fzc2V0X3BheW1lbnQKdHJhbnNmZXJhc3NldHBheW1lbnRfNDA6CnN0b3JlIDE3OQpzdG9yZSAxNzgKc3RvcmUgMTc3CnN0b3JlIDE3NgpzdG9yZSAxNzUKc3RvcmUgMTc0CnN0b3JlIDE3MwpzdG9yZSAxNzIKbG9hZCAxNzQKdHhuYXMgQWNjb3VudHMKbG9hZCAxNzIKdHhuYXMgQXNzZXRzCmNhbGxzdWIgbGFtYmRhXzAKYXBwX2xvY2FsX2dldApzdG9yZSAxODAKbG9hZCAxODAKaW50Y18yIC8vIDMyCmV4dHJhY3RfdWludDY0CnN0b3JlIDE4MQpsb2FkIDE4MApleHRyYWN0IDAgMzIKc3RvcmUgMTgyCmd0eG4gMCBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQpndHhuIDEgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KJiYKYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKcHVzaGludCAyIC8vIDIKPT0KdHhuIEdyb3VwSW5kZXgKaW50Y18wIC8vIDAKPT0KJiYKYXNzZXJ0CnR4biBTZW5kZXIKbG9hZCAxODIKPT0KYXNzZXJ0CmxvYWQgMTczCmxvYWQgMTgxCjw9CmFzc2VydApsb2FkIDE3NwpndHhucyBYZmVyQXNzZXQKbG9hZCAxNzgKdHhuYXMgQXNzZXRzCj09CmFzc2VydApsb2FkIDE3NwpndHhucyBBc3NldFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09CmFzc2VydApieXRlY18xIC8vICJyb3lhbHR5X3JlY2VpdmVyIgphcHBfZ2xvYmFsX2dldApnbG9iYWwgWmVyb0FkZHJlc3MKIT0KYXNzZXJ0CmxvYWQgMTc2CnR4bmFzIEFjY291bnRzCmJ5dGVjXzEgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApsb2FkIDE3NwpndHhucyBYZmVyQXNzZXQKbG9hZCAxNzcKZ3R4bnMgQXNzZXRBbW91bnQKbG9hZCAxNzQKdHhuYXMgQWNjb3VudHMKY2FsbHN1YiBkb3BheWFzc2V0c18yNQpsb2FkIDE3Mgp0eG5hcyBBc3NldHMKbG9hZCAxNzQKdHhuYXMgQWNjb3VudHMKbG9hZCAxNzUKdHhuYXMgQWNjb3VudHMKbG9hZCAxNzMKY2FsbHN1YiBkb21vdmVhc3NldF8yMwpsb2FkIDE3NAp0eG5hcyBBY2NvdW50cwpsb2FkIDE3Mgp0eG5hcyBBc3NldHMKbG9hZCAxODIKbG9hZCAxODEKbG9hZCAxNzMKLQp0eG4gU2VuZGVyCmxvYWQgMTc5CmNhbGxzdWIgZG91cGRhdGVvZmZlcmVkXzI2CnJldHN1Yg==";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "account_freeze", desc: "", args: [{ type: "asset", name: "freeze_asset", desc: "" }, { type: "account", name: "freeze_account", desc: "" }, { type: "bool", name: "asset_frozen", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "asset_config", desc: "", args: [{ type: "asset", name: "config_asset", desc: "" }, { type: "uint64", name: "total", desc: "" }, { type: "uint32", name: "decimals", desc: "" }, { type: "bool", name: "default_frozen", desc: "" }, { type: "string", name: "unit_name", desc: "" }, { type: "string", name: "name", desc: "" }, { type: "string", name: "url", desc: "" }, { type: "byte[]", name: "metadata_hash", desc: "" }, { type: "address", name: "manager_addr", desc: "" }, { type: "address", name: "reserve_addr", desc: "" }, { type: "address", name: "freeze_addr", desc: "" }, { type: "address", name: "clawback_addr", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "asset_create", desc: "", args: [{ type: "uint64", name: "total", desc: "" }, { type: "uint32", name: "decimals", desc: "" }, { type: "bool", name: "default_frozen", desc: "" }, { type: "string", name: "unit_name", desc: "" }, { type: "string", name: "name", desc: "" }, { type: "string", name: "url", desc: "" }, { type: "byte[]", name: "metadata_hash", desc: "" }, { type: "address", name: "manager_addr", desc: "" }, { type: "address", name: "reserve_addr", desc: "" }, { type: "address", name: "freeze_addr", desc: "" }, { type: "address", name: "clawback_addr", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "asset_destroy", desc: "", args: [{ type: "asset", name: "destroy_asset", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "asset_freeze", desc: "", args: [{ type: "asset", name: "freeze_asset", desc: "" }, { type: "bool", name: "asset_frozen", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "asset_transfer", desc: "", args: [{ type: "asset", name: "xfer_asset", desc: "" }, { type: "uint64", name: "asset_amount", desc: "" }, { type: "account", name: "asset_sender", desc: "" }, { type: "account", name: "asset_receiver", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_account_is_frozen", desc: "", args: [{ type: "account", name: "account", desc: "" }], returns: { type: "bool", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_administrator", desc: "", args: [], returns: { type: "address", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_config", desc: "", args: [{ type: "asset", name: "asset", desc: "" }], returns: { type: "(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_is_frozen", desc: "", args: [{ type: "asset", name: "asset", desc: "" }, { type: "account", name: "account", desc: "" }], returns: { type: "bool", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_circulating_supply", desc: "", args: [{ type: "asset", name: "asset", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_offer", desc: "", args: [{ type: "uint64", name: "royalty_asset", desc: "" }, { type: "account", name: "owner", desc: "" }], returns: { type: "(address,uint64)", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_policy", desc: "", args: [], returns: { type: "(address,uint64)", desc: "" } }),
        new algosdk.ABIMethod({ name: "offer", desc: "", args: [{ type: "asset", name: "royalty_asset", desc: "" }, { type: "(address,uint64)", name: "offer", desc: "" }, { type: "(address,uint64)", name: "previous_offer", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "royalty_free_move", desc: "", args: [{ type: "asset", name: "royalty_asset", desc: "" }, { type: "uint64", name: "royalty_asset_amount", desc: "" }, { type: "account", name: "owner", desc: "" }, { type: "account", name: "receiver", desc: "" }, { type: "uint64", name: "offered_amount", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_administrator", desc: "", args: [{ type: "address", name: "new_admin", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_payment_asset", desc: "", args: [{ type: "asset", name: "payment_asset", desc: "" }, { type: "bool", name: "is_allowed", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_policy", desc: "", args: [{ type: "(address,uint64)", name: "royalty_policy", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "transfer_algo_payment", desc: "", args: [{ type: "asset", name: "royalty_asset", desc: "" }, { type: "uint64", name: "royalty_asset_amount", desc: "" }, { type: "account", name: "owner", desc: "" }, { type: "account", name: "buyer", desc: "" }, { type: "account", name: "royalty_receiver", desc: "" }, { type: "pay", name: "payment_txn", desc: "" }, { type: "uint64", name: "offered_amount", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "transfer_asset_payment", desc: "", args: [{ type: "asset", name: "royalty_asset", desc: "" }, { type: "uint64", name: "royalty_asset_amount", desc: "" }, { type: "account", name: "owner", desc: "" }, { type: "account", name: "buyer", desc: "" }, { type: "account", name: "royalty_receiver", desc: "" }, { type: "axfer", name: "payment_txn", desc: "" }, { type: "asset", name: "payment_asset", desc: "" }, { type: "uint64", name: "offered_amount", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async account_freeze(args: {
        freeze_asset: bigint;
        freeze_account: string;
        asset_frozen: boolean;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "account_freeze"), { freeze_asset: args.freeze_asset, freeze_account: args.freeze_account, asset_frozen: args.asset_frozen }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async asset_config(args: {
        config_asset: bigint;
        total: bigint;
        decimals: bigint;
        default_frozen: boolean;
        unit_name: string;
        name: string;
        url: string;
        metadata_hash: Uint8Array;
        manager_addr: string;
        reserve_addr: string;
        freeze_addr: string;
        clawback_addr: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "asset_config"), { config_asset: args.config_asset, total: args.total, decimals: args.decimals, default_frozen: args.default_frozen, unit_name: args.unit_name, name: args.name, url: args.url, metadata_hash: args.metadata_hash, manager_addr: args.manager_addr, reserve_addr: args.reserve_addr, freeze_addr: args.freeze_addr, clawback_addr: args.clawback_addr }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async asset_create(args: {
        total: bigint;
        decimals: bigint;
        default_frozen: boolean;
        unit_name: string;
        name: string;
        url: string;
        metadata_hash: Uint8Array;
        manager_addr: string;
        reserve_addr: string;
        freeze_addr: string;
        clawback_addr: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "asset_create"), { total: args.total, decimals: args.decimals, default_frozen: args.default_frozen, unit_name: args.unit_name, name: args.name, url: args.url, metadata_hash: args.metadata_hash, manager_addr: args.manager_addr, reserve_addr: args.reserve_addr, freeze_addr: args.freeze_addr, clawback_addr: args.clawback_addr }, txnParams);
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async asset_destroy(args: {
        destroy_asset: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "asset_destroy"), { destroy_asset: args.destroy_asset }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async asset_freeze(args: {
        freeze_asset: bigint;
        asset_frozen: boolean;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "asset_freeze"), { freeze_asset: args.freeze_asset, asset_frozen: args.asset_frozen }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async asset_transfer(args: {
        xfer_asset: bigint;
        asset_amount: bigint;
        asset_sender: string;
        asset_receiver: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "asset_transfer"), { xfer_asset: args.xfer_asset, asset_amount: args.asset_amount, asset_sender: args.asset_sender, asset_receiver: args.asset_receiver }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async get_account_is_frozen(args: {
        account: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<boolean>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_account_is_frozen"), { account: args.account }, txnParams);
        return new bkr.ABIResult<boolean>(result, result.returnValue as boolean);
    }
    async get_administrator(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_administrator"), {}, txnParams);
        return new bkr.ABIResult<string>(result, result.returnValue as string);
    }
    async get_asset_config(args: {
        asset: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<AssetConfigTuple>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_asset_config"), { asset: args.asset }, txnParams);
        return new bkr.ABIResult<AssetConfigTuple>(result, AssetConfigTuple.decodeResult(result.returnValue));
    }
    async get_asset_is_frozen(args: {
        asset: bigint;
        account: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<boolean>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_asset_is_frozen"), { asset: args.asset, account: args.account }, txnParams);
        return new bkr.ABIResult<boolean>(result, result.returnValue as boolean);
    }
    async get_circulating_supply(args: {
        asset: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_circulating_supply"), { asset: args.asset }, txnParams);
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async get_offer(args: {
        royalty_asset: bigint;
        owner: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<OfferTuple>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_offer"), { royalty_asset: args.royalty_asset, owner: args.owner }, txnParams);
        return new bkr.ABIResult<OfferTuple>(result, OfferTuple.decodeResult(result.returnValue));
    }
    async get_policy(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<RoyaltyPolicyTuple>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "get_policy"), {}, txnParams);
        return new bkr.ABIResult<RoyaltyPolicyTuple>(result, RoyaltyPolicyTuple.decodeResult(result.returnValue));
    }
    async offer(args: {
        royalty_asset: bigint;
        offer: OfferTuple;
        previous_offer: OfferTuple;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "offer"), { royalty_asset: args.royalty_asset, offer: args.offer, previous_offer: args.previous_offer }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async royalty_free_move(args: {
        royalty_asset: bigint;
        royalty_asset_amount: bigint;
        owner: string;
        receiver: string;
        offered_amount: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "royalty_free_move"), { royalty_asset: args.royalty_asset, royalty_asset_amount: args.royalty_asset_amount, owner: args.owner, receiver: args.receiver, offered_amount: args.offered_amount }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async set_administrator(args: {
        new_admin: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "set_administrator"), { new_admin: args.new_admin }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async set_payment_asset(args: {
        payment_asset: bigint;
        is_allowed: boolean;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "set_payment_asset"), { payment_asset: args.payment_asset, is_allowed: args.is_allowed }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async set_policy(args: {
        royalty_policy: RoyaltyPolicyTuple;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "set_policy"), { royalty_policy: args.royalty_policy }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async transfer_algo_payment(args: {
        royalty_asset: bigint;
        royalty_asset_amount: bigint;
        owner: string;
        buyer: string;
        royalty_receiver: string;
        payment_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        offered_amount: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "transfer_algo_payment"), { royalty_asset: args.royalty_asset, royalty_asset_amount: args.royalty_asset_amount, owner: args.owner, buyer: args.buyer, royalty_receiver: args.royalty_receiver, payment_txn: args.payment_txn, offered_amount: args.offered_amount }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
    async transfer_asset_payment(args: {
        royalty_asset: bigint;
        royalty_asset_amount: bigint;
        owner: string;
        buyer: string;
        royalty_receiver: string;
        payment_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        payment_asset: bigint;
        offered_amount: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "transfer_asset_payment"), { royalty_asset: args.royalty_asset, royalty_asset_amount: args.royalty_asset_amount, owner: args.owner, buyer: args.buyer, royalty_receiver: args.royalty_receiver, payment_txn: args.payment_txn, payment_asset: args.payment_asset, offered_amount: args.offered_amount }, txnParams);
        return new bkr.ABIResult<void>(result);
    }
}
