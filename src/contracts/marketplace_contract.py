import json
from pyteal import *
from beaker import *
from typing import Final


def check_rekey_zero(num_transactions: int) -> Expr:
    return And(
        *[
            Gtxn[i].rekey_to() == Global.zero_address()
            for i in range(num_transactions)
        ]
    )

def check_self(group_size: Expr = Int(1), group_index: Expr = Int(0)) -> Expr:
    return And(
        Global.group_size() == group_size,
        Txn.group_index() == group_index,
    )


class Marketplace(Application):
    app_id: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
    )

    asset_id: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
    )

    amount: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
    )

    price: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
    )

    seller: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        default=Global.zero_address(),
    )

    @create
    def create(self):
        return self.initialize_application_state()

    @update(authorize=Authorize.only(Global.creator_address()))
    def update(self):
        return Approve()
    
    @delete(authorize=Authorize.only(Global.creator_address()))
    def delete(self):
        return Approve()

    @opt_in
    def opt_in(self):
        return self.initialize_account_state()

    @external
    def list(self, asset: abi.Asset, app: abi.Application, amount: abi.Uint64, price: abi.Uint64, offer_txn: abi.ApplicationCallTransaction):
        return Seq(
            asset_balance := AssetHolding.balance(Txn.sender(), asset.asset_id()),
            asset_freeze := AssetParam.freeze(asset.asset_id()),
            asset_clawback := AssetParam.clawback(asset.asset_id()),
            app_addr := AppParam.address(app.application_id()),
            Assert(
                check_rekey_zero(2),
                check_self(
                    group_size=Int(2),
                    group_index=Int(1),
                ),
                And(
                    self.app_id.get() == Int(0),
                    self.asset_id.get() == Int(0),
                    self.amount.get() == Int(0),
                    self.price.get() == Int(0),
                    self.seller.get() == Global.zero_address(),
                    offer_txn.get().application_id() == app.application_id(),
                    asset_balance.value() > Int(0),
                    asset_freeze.value() == app_addr.value(),
                    asset_clawback.value() == app_addr.value(),
                )
            ),
            self.app_id.set(app.application_id()),
            self.asset_id.set(asset.asset_id()),
            self.amount.set(amount.get()),
            self.price.set(price.get()),
            self.seller.set(Txn.sender()),
        )

    @external
    def buy(self, asset: abi.Asset, app: abi.Application, owner: abi.Account, royalty_account: abi.Account, amount: abi.Uint64, pay_txn: abi.PaymentTransaction):
        return Seq(
            app_addr := AppParam.address(app.application_id()),
            Assert(
                check_rekey_zero(1),
                check_self(
                    group_size=Int(1),
                    group_index=Int(0),
                ),
                And(
                    self.seller.get() == owner.address(),
                    self.app_id.get() == app.application_id(),
                    self.asset_id.get() == asset.asset_id(),
                    self.price.get() <= pay_txn.get().amount(),
                    Global.current_application_address() == pay_txn.get().receiver(),
                    self.amount.get() >= amount.get(),
                )
            ),
            InnerTxnBuilder.ExecuteMethodCall(
                app_id=app.application_id(),
                method_signature="transfer_algo_payment(asset,uint64,account,account,account,pay,uint64)void",
                args=[
                    asset,
                    amount,
                    owner,
                    Txn.sender(),
                    royalty_account,
                    {
                        TxnField.type_enum: TxnType.Payment,
                        TxnField.receiver: app_addr.value(),
                        TxnField.amount: pay_txn.get().amount(),
                    },
                    self.amount.get()
                ]
            ),
            self.amount.set(Int(0)),
            self.price.set(Int(0)),
            self.seller.set(Global.zero_address()),
            self.asset_id.set(Int(0)),
            self.app_id.set(Int(0)),
        )



def build():
    with open("./specs/marketplace.json", "w") as f:
        f.write(json.dumps(Marketplace().application_spec()))

def compile():
    with open("./specs/marketplace_contract.teal", "w") as f:
        f.write(Marketplace().approval_program)

if __name__ == "__main__":
    build()
    compile()
