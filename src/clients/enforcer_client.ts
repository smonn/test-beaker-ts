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
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMSAzMiA0IDEwMDAwCmJ5dGVjYmxvY2sgMHg2MTY0NmQ2OTZlIDB4MTUxZjdjNzUgMHg3MjZmNzk2MTZjNzQ3OTVmNzI2NTYzNjU2OTc2NjU3MiAweDcyNmY3OTYxNmM3NDc5NWY2MjYxNzM2OTczIDB4MDAgMHgKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDQyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4N2IzNTFjZTUgLy8gImFjY291bnRfZnJlZXplKGFzc2V0LGFjY291bnQsYm9vbCl2b2lkIgo9PQpibnogbWFpbl9sNDEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlZTZhODRhYSAvLyAiYXNzZXRfY29uZmlnKGFzc2V0LHVpbnQ2NCx1aW50MzIsYm9vbCxzdHJpbmcsc3RyaW5nLHN0cmluZyxieXRlW10sYWRkcmVzcyxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcyl2b2lkIgo9PQpibnogbWFpbl9sNDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlN2VjZDVhOCAvLyAiYXNzZXRfY3JlYXRlKHVpbnQ2NCx1aW50MzIsYm9vbCxzdHJpbmcsc3RyaW5nLHN0cmluZyxieXRlW10sYWRkcmVzcyxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcyl1aW50NjQiCj09CmJueiBtYWluX2wzOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDRiMTdiZjIwIC8vICJhc3NldF9kZXN0cm95KGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2wzOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDE1Y2YyYmEzIC8vICJhc3NldF9mcmVlemUoYXNzZXQsYm9vbCl2b2lkIgo9PQpibnogbWFpbl9sMzcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyZmM3NDNhOCAvLyAiYXNzZXRfdHJhbnNmZXIoYXNzZXQsdWludDY0LGFjY291bnQsYWNjb3VudCl2b2lkIgo9PQpibnogbWFpbl9sMzYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgxNjFjMDgxMSAvLyAiZ2V0X2FjY291bnRfaXNfZnJvemVuKGFjY291bnQpYm9vbCIKPT0KYm56IG1haW5fbDM1CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NTBjYzc0MGYgLy8gImdldF9hZG1pbmlzdHJhdG9yKClhZGRyZXNzIgo9PQpibnogbWFpbl9sMzQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhjZTJmMDVmMyAvLyAiZ2V0X2Fzc2V0X2NvbmZpZyhhc3NldCkodWludDY0LHVpbnQzMixib29sLHN0cmluZyxzdHJpbmcsc3RyaW5nLGJ5dGVbXSxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcyxhZGRyZXNzKSIKPT0KYm56IG1haW5fbDMzCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZTNkY2JjNTggLy8gImdldF9hc3NldF9pc19mcm96ZW4oYXNzZXQsYWNjb3VudClib29sIgo9PQpibnogbWFpbl9sMzIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlOTc0ODNiZiAvLyAiZ2V0X2NpcmN1bGF0aW5nX3N1cHBseShhc3NldCl1aW50NjQiCj09CmJueiBtYWluX2wzMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGI3OTZjMzUxIC8vICJnZXRfb2ZmZXIodWludDY0LGFjY291bnQpKGFkZHJlc3MsdWludDY0KSIKPT0KYm56IG1haW5fbDMwCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YTIzMDA3YWUgLy8gImdldF9wb2xpY3koKShhZGRyZXNzLHVpbnQ2NCkiCj09CmJueiBtYWluX2wyOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGY0NTI1ODA3IC8vICJvZmZlcihhc3NldCwoYWRkcmVzcyx1aW50NjQpLChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKPT0KYm56IG1haW5fbDI4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4M2RhMGJhYzYgLy8gInJveWFsdHlfZnJlZV9tb3ZlKGFzc2V0LHVpbnQ2NCxhY2NvdW50LGFjY291bnQsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2wyNwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDFiMWE5NjViIC8vICJzZXRfYWRtaW5pc3RyYXRvcihhZGRyZXNzKXZvaWQiCj09CmJueiBtYWluX2wyNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGQ0NDc1MDMyIC8vICJzZXRfcGF5bWVudF9hc3NldChhc3NldCxib29sKXZvaWQiCj09CmJueiBtYWluX2wyNQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGU5MGI5ODA0IC8vICJzZXRfcG9saWN5KChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKPT0KYm56IG1haW5fbDI0CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZmRkNjFkNmEgLy8gInRyYW5zZmVyX2FsZ29fcGF5bWVudChhc3NldCx1aW50NjQsYWNjb3VudCxhY2NvdW50LGFjY291bnQscGF5LHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMjMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhiN2I4Nzc2NiAvLyAidHJhbnNmZXJfYXNzZXRfcGF5bWVudChhc3NldCx1aW50NjQsYWNjb3VudCxhY2NvdW50LGFjY291bnQsYXhmZXIsYXNzZXQsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2wyMgplcnIKbWFpbl9sMjI6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA4Nwp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgODgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDg5CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA5MAp0eG5hIEFwcGxpY2F0aW9uQXJncyA1CmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgOTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDkzCnR4bmEgQXBwbGljYXRpb25BcmdzIDcKYnRvaQpzdG9yZSA5NAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDkyCmxvYWQgOTIKZ3R4bnMgVHlwZUVudW0KaW50Y18zIC8vIGF4ZmVyCj09CmFzc2VydApsb2FkIDg3CmxvYWQgODgKbG9hZCA4OQpsb2FkIDkwCmxvYWQgOTEKbG9hZCA5Mgpsb2FkIDkzCmxvYWQgOTQKY2FsbHN1YiB0cmFuc2ZlcmFzc2V0cGF5bWVudF8zOAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjM6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA4MAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgODEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDgyCnR4bmEgQXBwbGljYXRpb25BcmdzIDQKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA4Mwp0eG5hIEFwcGxpY2F0aW9uQXJncyA1CmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgODQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgpidG9pCnN0b3JlIDg2CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgODUKbG9hZCA4NQpndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApsb2FkIDgwCmxvYWQgODEKbG9hZCA4Mgpsb2FkIDgzCmxvYWQgODQKbG9hZCA4NQpsb2FkIDg2CmNhbGxzdWIgdHJhbnNmZXJhbGdvcGF5bWVudF8zNwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKY2FsbHN1YiBzZXRwb2xpY3lfMzYKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDI1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNzgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApwdXNoaW50IDggLy8gOAoqCmdldGJpdApzdG9yZSA3OQpsb2FkIDc4CmxvYWQgNzkKY2FsbHN1YiBzZXRwYXltZW50YXNzZXRfMzUKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDI2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmNhbGxzdWIgc2V0YWRtaW5pc3RyYXRvcl8zNAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjc6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3Mwp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgNzQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDc1CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3Ngp0eG5hIEFwcGxpY2F0aW9uQXJncyA1CmJ0b2kKc3RvcmUgNzcKbG9hZCA3Mwpsb2FkIDc0CmxvYWQgNzUKbG9hZCA3Ngpsb2FkIDc3CmNhbGxzdWIgcm95YWx0eWZyZWVtb3ZlXzMzCmludGNfMSAvLyAxCnJldHVybgptYWluX2wyODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDcwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKc3RvcmUgNzEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwpzdG9yZSA3Mgpsb2FkIDcwCmxvYWQgNzEKbG9hZCA3MgpjYWxsc3ViIG9mZmVyXzMyCmludGNfMSAvLyAxCnJldHVybgptYWluX2wyOToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRwb2xpY3lfMzEKc3RvcmUgNjMKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgNjMKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMzA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpzdG9yZSA1Ngp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNTcKbG9hZCA1Ngpsb2FkIDU3CmNhbGxzdWIgZ2V0b2ZmZXJfMzAKc3RvcmUgNTgKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgNTgKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMzE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpjYWxsc3ViIGdldGNpcmN1bGF0aW5nc3VwcGx5XzI5CnN0b3JlIDU0CmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpsb2FkIDU0Cml0b2IKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMzI6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA0OQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNTAKbG9hZCA0OQpsb2FkIDUwCmNhbGxzdWIgZ2V0YXNzZXRpc2Zyb3plbl8yOApzdG9yZSA1MQpieXRlY18xIC8vIDB4MTUxZjdjNzUKYnl0ZWMgNCAvLyAweDAwCmludGNfMCAvLyAwCmxvYWQgNTEKc2V0Yml0CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDMzOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBnZXRhc3NldGNvbmZpZ18yNwpzdG9yZSA0NwpieXRlY18xIC8vIDB4MTUxZjdjNzUKbG9hZCA0Nwpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wzNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRhZG1pbmlzdHJhdG9yXzI2CnN0b3JlIDQ2CmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpsb2FkIDQ2CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDM1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBnZXRhY2NvdW50aXNmcm96ZW5fMjUKc3RvcmUgNDQKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmJ5dGVjIDQgLy8gMHgwMAppbnRjXzAgLy8gMApsb2FkIDQ0CnNldGJpdApjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wzNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDQwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSA0MQp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNDIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDQzCmxvYWQgNDAKbG9hZCA0MQpsb2FkIDQyCmxvYWQgNDMKY2FsbHN1YiBhc3NldHRyYW5zZmVyXzE5CmludGNfMSAvLyAxCnJldHVybgptYWluX2wzNzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDM4CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKcHVzaGludCA4IC8vIDgKKgpnZXRiaXQKc3RvcmUgMzkKbG9hZCAzOApsb2FkIDM5CmNhbGxzdWIgYXNzZXRmcmVlemVfMTgKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDM4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBhc3NldGRlc3Ryb3lfMTcKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDM5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJ0b2kKc3RvcmUgMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApleHRyYWN0X3VpbnQzMgpzdG9yZSAxNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmludGNfMCAvLyAwCnB1c2hpbnQgOCAvLyA4CioKZ2V0Yml0CnN0b3JlIDE3CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKc3RvcmUgMTgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQpzdG9yZSAxOQp0eG5hIEFwcGxpY2F0aW9uQXJncyA2CnN0b3JlIDIwCnR4bmEgQXBwbGljYXRpb25BcmdzIDcKc3RvcmUgMjEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOApzdG9yZSAyMgp0eG5hIEFwcGxpY2F0aW9uQXJncyA5CnN0b3JlIDIzCnR4bmEgQXBwbGljYXRpb25BcmdzIDEwCnN0b3JlIDI0CnR4bmEgQXBwbGljYXRpb25BcmdzIDExCnN0b3JlIDI1CmxvYWQgMTUKbG9hZCAxNgpsb2FkIDE3CmxvYWQgMTgKbG9hZCAxOQpsb2FkIDIwCmxvYWQgMjEKbG9hZCAyMgpsb2FkIDIzCmxvYWQgMjQKbG9hZCAyNQpjYWxsc3ViIGFzc2V0Y3JlYXRlXzE2CnN0b3JlIDI2CmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpsb2FkIDI2Cml0b2IKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNDA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAzCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSA0CnR4bmEgQXBwbGljYXRpb25BcmdzIDMKaW50Y18wIC8vIDAKZXh0cmFjdF91aW50MzIKc3RvcmUgNQp0eG5hIEFwcGxpY2F0aW9uQXJncyA0CmludGNfMCAvLyAwCnB1c2hpbnQgOCAvLyA4CioKZ2V0Yml0CnN0b3JlIDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQpzdG9yZSA3CnR4bmEgQXBwbGljYXRpb25BcmdzIDYKc3RvcmUgOAp0eG5hIEFwcGxpY2F0aW9uQXJncyA3CnN0b3JlIDkKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOApzdG9yZSAxMAp0eG5hIEFwcGxpY2F0aW9uQXJncyA5CnN0b3JlIDExCnR4bmEgQXBwbGljYXRpb25BcmdzIDEwCnN0b3JlIDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDExCnN0b3JlIDEzCnR4bmEgQXBwbGljYXRpb25BcmdzIDEyCnN0b3JlIDE0CmxvYWQgMwpsb2FkIDQKbG9hZCA1CmxvYWQgNgpsb2FkIDcKbG9hZCA4CmxvYWQgOQpsb2FkIDEwCmxvYWQgMTEKbG9hZCAxMgpsb2FkIDEzCmxvYWQgMTQKY2FsbHN1YiBhc3NldGNvbmZpZ18xNQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNDE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKaW50Y18wIC8vIDAKcHVzaGludCA4IC8vIDgKKgpnZXRiaXQKc3RvcmUgMgpsb2FkIDAKbG9hZCAxCmxvYWQgMgpjYWxsc3ViIGFjY291bnRmcmVlemVfMTQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDQyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2w1MAp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sNDkKdHhuIE9uQ29tcGxldGlvbgppbnRjXzMgLy8gVXBkYXRlQXBwbGljYXRpb24KPT0KYm56IG1haW5fbDQ4CnR4biBPbkNvbXBsZXRpb24KcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCj09CmJueiBtYWluX2w0NwplcnIKbWFpbl9sNDc6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CmFzc2VydApjYWxsc3ViIGRlbGV0ZV8zCmludGNfMSAvLyAxCnJldHVybgptYWluX2w0ODoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgdXBkYXRlXzIKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDQ5Ogp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl80CmludGNfMSAvLyAxCnJldHVybgptYWluX2w1MDoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzEKaW50Y18xIC8vIDEKcmV0dXJuCgovLyA8bGFtYmRhPgpsYW1iZGFfMDoKaXRvYgpyZXRzdWIKCi8vIGNyZWF0ZQpjcmVhdGVfMToKYnl0ZWNfMCAvLyAiYWRtaW4iCmdsb2JhbCBDcmVhdG9yQWRkcmVzcwphcHBfZ2xvYmFsX3B1dApieXRlY18zIC8vICJyb3lhbHR5X2Jhc2lzIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlY18yIC8vICJyb3lhbHR5X3JlY2VpdmVyIgpieXRlYyA1IC8vICIiCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gdXBkYXRlCnVwZGF0ZV8yOgp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQphc3NlcnQKcmV0c3ViCgovLyBkZWxldGUKZGVsZXRlXzM6CnR4biBTZW5kZXIKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApyZXRzdWIKCi8vIG9wdF9pbgpvcHRpbl80OgpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV81OgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfNjoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5Xzc6CmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV84OgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfOToKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzEwOgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMTE6CmJ5dGVjXzAgLy8gImFkbWluIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8xMjoKYnl0ZWNfMCAvLyAiYWRtaW4iCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzEzOgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhY2NvdW50X2ZyZWV6ZQphY2NvdW50ZnJlZXplXzE0OgpzdG9yZSA5NwpzdG9yZSA5NgpzdG9yZSA5NQp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfOQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmludGNfMCAvLyAwCnJldHVybgoKLy8gYXNzZXRfY29uZmlnCmFzc2V0Y29uZmlnXzE1OgpzdG9yZSAxMDkKc3RvcmUgMTA4CnN0b3JlIDEwNwpzdG9yZSAxMDYKc3RvcmUgMTA1CnN0b3JlIDEwNApzdG9yZSAxMDMKc3RvcmUgMTAyCnN0b3JlIDEwMQpzdG9yZSAxMDAKc3RvcmUgOTkKc3RvcmUgOTgKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzYKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGFzc2V0X2NyZWF0ZQphc3NldGNyZWF0ZV8xNjoKc3RvcmUgMzcKc3RvcmUgMzYKc3RvcmUgMzUKc3RvcmUgMzQKc3RvcmUgMzMKc3RvcmUgMzIKc3RvcmUgMzEKc3RvcmUgMzAKc3RvcmUgMjkKc3RvcmUgMjgKc3RvcmUgMjcKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzUKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGFzc2V0X2Rlc3Ryb3kKYXNzZXRkZXN0cm95XzE3OgpzdG9yZSAxMTAKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzEwCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBhc3NldF9mcmVlemUKYXNzZXRmcmVlemVfMTg6CnN0b3JlIDExMgpzdG9yZSAxMTEKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzgKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGFzc2V0X3RyYW5zZmVyCmFzc2V0dHJhbnNmZXJfMTk6CnN0b3JlIDExNgpzdG9yZSAxMTUKc3RvcmUgMTE0CnN0b3JlIDExMwp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfNwovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0Cmd0eG4gMCBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQppbnRjXzEgLy8gMQo9PQp0eG4gR3JvdXBJbmRleAppbnRjXzAgLy8gMAo9PQomJgphc3NlcnQKbG9hZCAxMTQKaW50Y18xIC8vIDEKPT0KYXNzZXJ0CmxvYWQgMTE1CnR4bmFzIEFjY291bnRzCmxlbgppbnRjXzIgLy8gMzIKPT0KYXNzZXJ0CmxvYWQgMTE2CnR4bmFzIEFjY291bnRzCmxlbgppbnRjXzIgLy8gMzIKPT0KYXNzZXJ0CmxvYWQgMTEzCnR4bmFzIEFzc2V0cwpsb2FkIDExNQp0eG5hcyBBY2NvdW50cwpsb2FkIDExNgp0eG5hcyBBY2NvdW50cwpsb2FkIDExNApjYWxsc3ViIGRvbW92ZWFzc2V0XzIxCnJldHN1YgoKLy8gY29tcHV0ZV9yb3lhbHR5X2Ftb3VudApjb21wdXRlcm95YWx0eWFtb3VudF8yMDoKbXVsdwppbnRjXzAgLy8gMAppbnRjIDQgLy8gMTAwMDAKZGl2bW9kdwpwb3AKcG9wCnN3YXAKIQphc3NlcnQKcmV0c3ViCgovLyBkb19tb3ZlX2Fzc2V0CmRvbW92ZWFzc2V0XzIxOgpzdG9yZSAxMjAKc3RvcmUgMTE5CnN0b3JlIDExOApzdG9yZSAxMTcKaXR4bl9iZWdpbgppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDExNwppdHhuX2ZpZWxkIFhmZXJBc3NldApsb2FkIDEyMAppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CmxvYWQgMTE4Cml0eG5fZmllbGQgQXNzZXRTZW5kZXIKbG9hZCAxMTkKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCml0eG5fc3VibWl0CnJldHN1YgoKLy8gZG9fcGF5X2FsZ29zCmRvcGF5YWxnb3NfMjI6CnN0b3JlIDE3MApzdG9yZSAxNjkKbG9hZCAxNjkKYnl0ZWNfMyAvLyAicm95YWx0eV9iYXNpcyIKYXBwX2dsb2JhbF9nZXQKY2FsbHN1YiBjb21wdXRlcm95YWx0eWFtb3VudF8yMApzdG9yZSAxNzEKaXR4bl9iZWdpbgppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppbnRjXzEgLy8gcGF5Cml0eG5fZmllbGQgVHlwZUVudW0KbG9hZCAxNjkKbG9hZCAxNzEKLQppdHhuX2ZpZWxkIEFtb3VudApsb2FkIDE3MAppdHhuX2ZpZWxkIFJlY2VpdmVyCmxvYWQgMTcxCmludGNfMCAvLyAwCj4KYnogZG9wYXlhbGdvc18yMl9sMgppdHhuX25leHQKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKaW50Y18xIC8vIHBheQppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTcxCml0eG5fZmllbGQgQW1vdW50CmJ5dGVjXzIgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0Cml0eG5fZmllbGQgUmVjZWl2ZXIKZG9wYXlhbGdvc18yMl9sMjoKaXR4bl9zdWJtaXQKcmV0c3ViCgovLyBkb19wYXlfYXNzZXRzCmRvcGF5YXNzZXRzXzIzOgpzdG9yZSAxODUKc3RvcmUgMTg0CnN0b3JlIDE4Mwpsb2FkIDE4NApieXRlY18zIC8vICJyb3lhbHR5X2Jhc2lzIgphcHBfZ2xvYmFsX2dldApjYWxsc3ViIGNvbXB1dGVyb3lhbHR5YW1vdW50XzIwCnN0b3JlIDE4NgppdHhuX2JlZ2luCmludGNfMCAvLyAwCml0eG5fZmllbGQgRmVlCmludGNfMyAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTgzCml0eG5fZmllbGQgWGZlckFzc2V0CmxvYWQgMTg0CmxvYWQgMTg2Ci0KaXR4bl9maWVsZCBBc3NldEFtb3VudApsb2FkIDE4NQppdHhuX2ZpZWxkIFJlY2VpdmVyCmxvYWQgMTg2CmludGNfMCAvLyAwCj4KYnogZG9wYXlhc3NldHNfMjNfbDIKaXR4bl9uZXh0CmludGNfMCAvLyAwCml0eG5fZmllbGQgRmVlCmludGNfMyAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTgzCml0eG5fZmllbGQgWGZlckFzc2V0CmxvYWQgMTg2Cml0eG5fZmllbGQgQXNzZXRBbW91bnQKYnl0ZWNfMiAvLyAicm95YWx0eV9yZWNlaXZlciIKYXBwX2dsb2JhbF9nZXQKaXR4bl9maWVsZCBSZWNlaXZlcgpkb3BheWFzc2V0c18yM19sMjoKaXR4bl9zdWJtaXQKcmV0c3ViCgovLyBkb191cGRhdGVfb2ZmZXJlZApkb3VwZGF0ZW9mZmVyZWRfMjQ6CnN0b3JlIDEzNwpzdG9yZSAxMzYKc3RvcmUgMTM1CnN0b3JlIDEzNApzdG9yZSAxMzMKc3RvcmUgMTMyCmxvYWQgMTMyCmludGNfMCAvLyAwCmxvYWQgMTMzCmNhbGxzdWIgbGFtYmRhXzAKYXBwX2xvY2FsX2dldF9leApzdG9yZSAxMzkKc3RvcmUgMTM4CmxvYWQgMTM5CmJueiBkb3VwZGF0ZW9mZmVyZWRfMjRfbDUKbG9hZCAxMzcKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmxvYWQgMTM2Cmdsb2JhbCBaZXJvQWRkcmVzcwo9PQphc3NlcnQKZG91cGRhdGVvZmZlcmVkXzI0X2wyOgpsb2FkIDEzNQppbnRjXzAgLy8gMAo+CmJueiBkb3VwZGF0ZW9mZmVyZWRfMjRfbDQKbG9hZCAxMzIKbG9hZCAxMzMKY2FsbHN1YiBsYW1iZGFfMAphcHBfbG9jYWxfZGVsCmIgZG91cGRhdGVvZmZlcmVkXzI0X2w2CmRvdXBkYXRlb2ZmZXJlZF8yNF9sNDoKbG9hZCAxMzIKbG9hZCAxMzMKY2FsbHN1YiBsYW1iZGFfMApsb2FkIDEzNApsb2FkIDEzNQppdG9iCmNvbmNhdAphcHBfbG9jYWxfcHV0CmIgZG91cGRhdGVvZmZlcmVkXzI0X2w2CmRvdXBkYXRlb2ZmZXJlZF8yNF9sNToKbG9hZCAxMzgKc3RvcmUgMTQwCmxvYWQgMTQwCmludGNfMiAvLyAzMgpleHRyYWN0X3VpbnQ2NApsb2FkIDEzNwo9PQphc3NlcnQKbG9hZCAxNDAKZXh0cmFjdCAwIDMyCmxvYWQgMTM2Cj09CmFzc2VydApiIGRvdXBkYXRlb2ZmZXJlZF8yNF9sMgpkb3VwZGF0ZW9mZmVyZWRfMjRfbDY6CnJldHN1YgoKLy8gZ2V0X2FjY291bnRfaXNfZnJvemVuCmdldGFjY291bnRpc2Zyb3plbl8yNToKc3RvcmUgNDUKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBnZXRfYWRtaW5pc3RyYXRvcgpnZXRhZG1pbmlzdHJhdG9yXzI2OgpieXRlY18wIC8vICJhZG1pbiIKYXBwX2dsb2JhbF9nZXQKcmV0c3ViCgovLyBnZXRfYXNzZXRfY29uZmlnCmdldGFzc2V0Y29uZmlnXzI3OgpzdG9yZSA0OAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGdldF9hc3NldF9pc19mcm96ZW4KZ2V0YXNzZXRpc2Zyb3plbl8yODoKc3RvcmUgNTMKc3RvcmUgNTIKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBnZXRfY2lyY3VsYXRpbmdfc3VwcGx5CmdldGNpcmN1bGF0aW5nc3VwcGx5XzI5OgpzdG9yZSA1NQppbnRjXzAgLy8gMApyZXR1cm4KCi8vIGdldF9vZmZlcgpnZXRvZmZlcl8zMDoKc3RvcmUgNjAKc3RvcmUgNTkKbG9hZCA2MAp0eG5hcyBBY2NvdW50cwppbnRjXzAgLy8gMApsb2FkIDU5CmNhbGxzdWIgbGFtYmRhXzAKYXBwX2xvY2FsX2dldF9leApzdG9yZSA2MgpzdG9yZSA2MQpsb2FkIDYyCmFzc2VydApsb2FkIDYxCnJldHN1YgoKLy8gZ2V0X3BvbGljeQpnZXRwb2xpY3lfMzE6CmludGNfMCAvLyAwCmJ5dGVjXzMgLy8gInJveWFsdHlfYmFzaXMiCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDY2CnN0b3JlIDY1CmxvYWQgNjYKYXNzZXJ0CmxvYWQgNjUKc3RvcmUgNjQKaW50Y18wIC8vIDAKYnl0ZWNfMiAvLyAicm95YWx0eV9yZWNlaXZlciIKYXBwX2dsb2JhbF9nZXRfZXgKc3RvcmUgNjkKc3RvcmUgNjgKbG9hZCA2OQphc3NlcnQKbG9hZCA2OApzdG9yZSA2Nwpsb2FkIDY3CmxlbgppbnRjXzIgLy8gMzIKPT0KYXNzZXJ0CmxvYWQgNjcKbG9hZCA2NAppdG9iCmNvbmNhdApyZXRzdWIKCi8vIG9mZmVyCm9mZmVyXzMyOgpzdG9yZSAxMjMKc3RvcmUgMTIyCnN0b3JlIDEyMQpsb2FkIDEyMgppbnRjXzIgLy8gMzIKZXh0cmFjdF91aW50NjQKc3RvcmUgMTI0CmxvYWQgMTIyCmV4dHJhY3QgMCAzMgpzdG9yZSAxMjUKbG9hZCAxMjMKaW50Y18yIC8vIDMyCmV4dHJhY3RfdWludDY0CnN0b3JlIDEyNgpsb2FkIDEyMwpleHRyYWN0IDAgMzIKc3RvcmUgMTI3CnR4biBTZW5kZXIKbG9hZCAxMjEKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDEyOQpzdG9yZSAxMjgKbG9hZCAxMjEKYXNzZXRfcGFyYW1zX2dldCBBc3NldENsYXdiYWNrCnN0b3JlIDEzMQpzdG9yZSAxMzAKZ3R4biAwIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09CmFzc2VydApnbG9iYWwgR3JvdXBTaXplCmludGNfMSAvLyAxCj09CnR4biBHcm91cEluZGV4CmludGNfMCAvLyAwCj09CiYmCmFzc2VydApsb2FkIDEyOApsb2FkIDEyNAo+PQphc3NlcnQKbG9hZCAxMzAKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KYXNzZXJ0CnR4biBTZW5kZXIKbG9hZCAxMjEKdHhuYXMgQXNzZXRzCmxvYWQgMTI1CmxvYWQgMTI0CmxvYWQgMTI3CmxvYWQgMTI2CmNhbGxzdWIgZG91cGRhdGVvZmZlcmVkXzI0CnJldHN1YgoKLy8gcm95YWx0eV9mcmVlX21vdmUKcm95YWx0eWZyZWVtb3ZlXzMzOgpzdG9yZSAxNDUKc3RvcmUgMTQ0CnN0b3JlIDE0MwpzdG9yZSAxNDIKc3RvcmUgMTQxCmxvYWQgMTQzCnR4bmFzIEFjY291bnRzCmxvYWQgMTQxCnR4bmFzIEFzc2V0cwpjYWxsc3ViIGxhbWJkYV8wCmFwcF9sb2NhbF9nZXQKc3RvcmUgMTQ2CmxvYWQgMTQ2CmludGNfMiAvLyAzMgpleHRyYWN0X3VpbnQ2NApzdG9yZSAxNDcKbG9hZCAxNDYKZXh0cmFjdCAwIDMyCnN0b3JlIDE0OApndHhuIDAgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKaW50Y18xIC8vIDEKPT0KdHhuIEdyb3VwSW5kZXgKaW50Y18wIC8vIDAKPT0KJiYKYXNzZXJ0CmxvYWQgMTQ3CmxvYWQgMTQ1Cj09CmFzc2VydApsb2FkIDE0Nwpsb2FkIDE0Mgo+PQphc3NlcnQKbG9hZCAxNDgKdHhuIFNlbmRlcgo9PQphc3NlcnQKbG9hZCAxNDMKdHhuYXMgQWNjb3VudHMKbG9hZCAxNDEKdHhuYXMgQXNzZXRzCmJ5dGVjIDUgLy8gIiIKaW50Y18wIC8vIDAKbG9hZCAxNDgKbG9hZCAxNDcKY2FsbHN1YiBkb3VwZGF0ZW9mZmVyZWRfMjQKbG9hZCAxNDEKdHhuYXMgQXNzZXRzCmxvYWQgMTQzCnR4bmFzIEFjY291bnRzCmxvYWQgMTQ0CnR4bmFzIEFjY291bnRzCmxvYWQgMTQyCmNhbGxzdWIgZG9tb3ZlYXNzZXRfMjEKcmV0c3ViCgovLyBzZXRfYWRtaW5pc3RyYXRvcgpzZXRhZG1pbmlzdHJhdG9yXzM0OgpzdG9yZSAxNDkKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzExCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKZ3R4biAwIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09CmFzc2VydApnbG9iYWwgR3JvdXBTaXplCmludGNfMSAvLyAxCj09CnR4biBHcm91cEluZGV4CmludGNfMCAvLyAwCj09CiYmCmFzc2VydApsb2FkIDE0OQpsZW4KaW50Y18yIC8vIDMyCj09CmFzc2VydApieXRlY18wIC8vICJhZG1pbiIKbG9hZCAxNDkKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBzZXRfcGF5bWVudF9hc3NldApzZXRwYXltZW50YXNzZXRfMzU6CnN0b3JlIDE1MQpzdG9yZSAxNTAKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzEzCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKbG9hZCAxNTAKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDE1MwpzdG9yZSAxNTIKbG9hZCAxNTAKYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKc3RvcmUgMTU1CnN0b3JlIDE1NApndHhuIDAgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKaW50Y18xIC8vIDEKPT0KdHhuIEdyb3VwSW5kZXgKaW50Y18wIC8vIDAKPT0KJiYKYXNzZXJ0CmxvYWQgMTUxCmxvYWQgMTUzCiEKJiYKYm56IHNldHBheW1lbnRhc3NldF8zNV9sNApsb2FkIDE1MQohCmxvYWQgMTUzCiYmCmJueiBzZXRwYXltZW50YXNzZXRfMzVfbDMKaW50Y18wIC8vIDAKcmV0dXJuCnNldHBheW1lbnRhc3NldF8zNV9sMzoKaXR4bl9iZWdpbgppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDE1MAp0eG5hcyBBc3NldHMKaXR4bl9maWVsZCBYZmVyQXNzZXQKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBBc3NldEFtb3VudApsb2FkIDE1NAppdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwpsb2FkIDE1NAppdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKaXR4bl9zdWJtaXQKYiBzZXRwYXltZW50YXNzZXRfMzVfbDUKc2V0cGF5bWVudGFzc2V0XzM1X2w0OgppdHhuX2JlZ2luCmludGNfMCAvLyAwCml0eG5fZmllbGQgRmVlCmludGNfMyAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTUwCnR4bmFzIEFzc2V0cwppdHhuX2ZpZWxkIFhmZXJBc3NldAppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEFzc2V0QW1vdW50Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgppdHhuX3N1Ym1pdApzZXRwYXltZW50YXNzZXRfMzVfbDU6CnJldHN1YgoKLy8gc2V0X3BvbGljeQpzZXRwb2xpY3lfMzY6CnN0b3JlIDE1Ngp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMTIKLy8gdW5hdXRob3JpemVkCmFzc2VydApsb2FkIDE1NgppbnRjXzIgLy8gMzIKZXh0cmFjdF91aW50NjQKc3RvcmUgMTU3CmxvYWQgMTU2CmV4dHJhY3QgMCAzMgpzdG9yZSAxNTgKZ3R4biAwIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09CmFzc2VydApnbG9iYWwgR3JvdXBTaXplCmludGNfMSAvLyAxCj09CnR4biBHcm91cEluZGV4CmludGNfMCAvLyAwCj09CiYmCmFzc2VydApsb2FkIDE1NwppbnRjIDQgLy8gMTAwMDAKPD0KYXNzZXJ0CmJ5dGVjXzMgLy8gInJveWFsdHlfYmFzaXMiCmxvYWQgMTU3CmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzIgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmxvYWQgMTU4CmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gdHJhbnNmZXJfYWxnb19wYXltZW50CnRyYW5zZmVyYWxnb3BheW1lbnRfMzc6CnN0b3JlIDE2NQpzdG9yZSAxNjQKc3RvcmUgMTYzCnN0b3JlIDE2MgpzdG9yZSAxNjEKc3RvcmUgMTYwCnN0b3JlIDE1OQpsb2FkIDE2MQp0eG5hcyBBY2NvdW50cwpsb2FkIDE1OQp0eG5hcyBBc3NldHMKY2FsbHN1YiBsYW1iZGFfMAphcHBfbG9jYWxfZ2V0CnN0b3JlIDE2Ngpsb2FkIDE2NgppbnRjXzIgLy8gMzIKZXh0cmFjdF91aW50NjQKc3RvcmUgMTY3CmxvYWQgMTY2CmV4dHJhY3QgMCAzMgpzdG9yZSAxNjgKZ3R4biAwIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09Cmd0eG4gMSBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQomJgphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQpwdXNoaW50IDIgLy8gMgo9PQp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQo9PQomJgphc3NlcnQKdHhuIFNlbmRlcgpsb2FkIDE2OAo9PQphc3NlcnQKbG9hZCAxNjAKbG9hZCAxNjcKPD0KYXNzZXJ0CmxvYWQgMTY0Cmd0eG5zIFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09CmFzc2VydApsb2FkIDE2Mwp0eG5hcyBBY2NvdW50cwpieXRlY18yIC8vICJyb3lhbHR5X3JlY2VpdmVyIgphcHBfZ2xvYmFsX2dldAo9PQphc3NlcnQKbG9hZCAxNjQKZ3R4bnMgQW1vdW50CmxvYWQgMTYxCnR4bmFzIEFjY291bnRzCmNhbGxzdWIgZG9wYXlhbGdvc18yMgpsb2FkIDE1OQp0eG5hcyBBc3NldHMKbG9hZCAxNjEKdHhuYXMgQWNjb3VudHMKbG9hZCAxNjIKdHhuYXMgQWNjb3VudHMKbG9hZCAxNjAKY2FsbHN1YiBkb21vdmVhc3NldF8yMQpsb2FkIDE2MQp0eG5hcyBBY2NvdW50cwpsb2FkIDE1OQp0eG5hcyBBc3NldHMKbG9hZCAxNjgKbG9hZCAxNjcKbG9hZCAxNjAKLQp0eG4gU2VuZGVyCmxvYWQgMTY1CmNhbGxzdWIgZG91cGRhdGVvZmZlcmVkXzI0CnJldHN1YgoKLy8gdHJhbnNmZXJfYXNzZXRfcGF5bWVudAp0cmFuc2ZlcmFzc2V0cGF5bWVudF8zODoKc3RvcmUgMTc5CnN0b3JlIDE3OApzdG9yZSAxNzcKc3RvcmUgMTc2CnN0b3JlIDE3NQpzdG9yZSAxNzQKc3RvcmUgMTczCnN0b3JlIDE3Mgpsb2FkIDE3NAp0eG5hcyBBY2NvdW50cwpsb2FkIDE3Mgp0eG5hcyBBc3NldHMKY2FsbHN1YiBsYW1iZGFfMAphcHBfbG9jYWxfZ2V0CnN0b3JlIDE4MApsb2FkIDE4MAppbnRjXzIgLy8gMzIKZXh0cmFjdF91aW50NjQKc3RvcmUgMTgxCmxvYWQgMTgwCmV4dHJhY3QgMCAzMgpzdG9yZSAxODIKZ3R4biAwIFJla2V5VG8KZ2xvYmFsIFplcm9BZGRyZXNzCj09Cmd0eG4gMSBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQomJgphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQpwdXNoaW50IDIgLy8gMgo9PQp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQo9PQomJgphc3NlcnQKdHhuIFNlbmRlcgpsb2FkIDE4Mgo9PQphc3NlcnQKbG9hZCAxNzMKbG9hZCAxODEKPD0KYXNzZXJ0CmxvYWQgMTc3Cmd0eG5zIFhmZXJBc3NldApsb2FkIDE3OAp0eG5hcyBBc3NldHMKPT0KYXNzZXJ0CmxvYWQgMTc3Cmd0eG5zIEFzc2V0UmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KYXNzZXJ0CmxvYWQgMTc2CnR4bmFzIEFjY291bnRzCmJ5dGVjXzIgLy8gInJveWFsdHlfcmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApsb2FkIDE3NwpndHhucyBYZmVyQXNzZXQKbG9hZCAxNzcKZ3R4bnMgQXNzZXRBbW91bnQKbG9hZCAxNzQKdHhuYXMgQWNjb3VudHMKY2FsbHN1YiBkb3BheWFzc2V0c18yMwpsb2FkIDE3Mgp0eG5hcyBBc3NldHMKbG9hZCAxNzQKdHhuYXMgQWNjb3VudHMKbG9hZCAxNzUKdHhuYXMgQWNjb3VudHMKbG9hZCAxNzMKY2FsbHN1YiBkb21vdmVhc3NldF8yMQpsb2FkIDE3NAp0eG5hcyBBY2NvdW50cwpsb2FkIDE3Mgp0eG5hcyBBc3NldHMKbG9hZCAxODIKbG9hZCAxODEKbG9hZCAxNzMKLQp0eG4gU2VuZGVyCmxvYWQgMTc5CmNhbGxzdWIgZG91cGRhdGVvZmZlcmVkXzI0CnJldHN1Yg==";
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
