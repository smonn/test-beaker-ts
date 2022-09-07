import json
from pyteal import *
from beaker import *
from typing import Final


class AssetConfigTuple(abi.NamedTuple):
    total: abi.Field[abi.Uint64]
    decimals: abi.Field[abi.Uint32]
    default_frozen: abi.Field[abi.Bool]
    unit_name: abi.Field[abi.String]
    name: abi.Field[abi.String]
    url: abi.Field[abi.String]
    metadata_hash: abi.Field[abi.DynamicArray[abi.Byte]]
    manager_addr: abi.Field[abi.Address]
    reserve_addr: abi.Field[abi.Address]
    freeze_addr: abi.Field[abi.Address]
    clawback_addr: abi.Field[abi.Address]


class OfferTuple(abi.NamedTuple):
    auth_address: abi.Field[abi.Address]
    amount: abi.Field[abi.Uint64]


class RoyaltyPolicyTuple(abi.NamedTuple):
    receiver: abi.Field[abi.Address]
    basis: abi.Field[abi.Uint64]


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

def valid_address_length(addr: Expr) -> Expr:
    return Len(addr) == Int(32)

class Enforcer(Application):
    """
    Enforcer contract ensures royalty payments are made according to ARC-18.
    Also implements `asset_transfer` of ARC-20.
    """

    administrator: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        key=Bytes("admin"),
        default=Global.creator_address()
    )

    royalty_basis: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0)
    )

    royalty_receiver: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        default=Global.creator_address()
    )

    offers: Final[DynamicAccountStateValue] = DynamicAccountStateValue(
        stack_type=TealType.bytes,
        max_keys=14,
        key_gen=Subroutine(TealType.bytes)(lambda x: Itob(x)),
    )

    _basis_point_multiplier: Final[int] = 100 * 100
    basis_point_multiplier: Final[Int] = Int(_basis_point_multiplier)

    @create
    def create(self):
        return self.initialize_application_state()

    @update
    def update(self):
        return Assert(Txn.sender() == self.administrator)
    
    @delete
    def delete(self):
        return Assert(Txn.sender() == self.administrator)

    @opt_in
    def opt_in(self):
        return self.initialize_account_state()

    #region ARC-20

    @external(authorize=Authorize.only(administrator))
    def asset_create(
        self,
        total: abi.Uint64,
        decimals: abi.Uint32,
        default_frozen: abi.Bool,
        unit_name: abi.String,
        name: abi.String,
        url: abi.String,
        metadata_hash: abi.DynamicArray[abi.Byte],
        manager_addr: abi.Address,
        reserve_addr: abi.Address,
        freeze_addr: abi.Address,
        clawback_addr: abi.Address,
        *,
        output: abi.Uint64,
    ):
        """
        ARC-20: asset_create. Not supported.
        """
        return Reject()

    @external(authorize=Authorize.only(administrator))
    def asset_config(
        self,
        config_asset: abi.Asset,
        total: abi.Uint64,
        decimals: abi.Uint32,
        default_frozen: abi.Bool,
        unit_name: abi.String,
        name: abi.String,
        url: abi.String,
        metadata_hash: abi.DynamicArray[abi.Byte],
        manager_addr: abi.Address,
        reserve_addr: abi.Address,
        freeze_addr: abi.Address,
        clawback_addr: abi.Address,
    ) -> Expr:
        """
        ARC-20: asset_config. Not supported.
        """
        return Reject() 

    @external(authorize=Authorize.only(administrator))
    def asset_transfer(
        self,
        xfer_asset: abi.Asset,
        asset_amount: abi.Uint64,
        asset_sender: abi.Account,
        asset_receiver: abi.Account,
    ):
        """
        ARC-20: asset_transfer. Transfers the asset via clawback transaction
        from the sender to the receiver. Only performs transfer if sent by the
        administrator. 
        """
        return Seq(
            Assert(
                check_rekey_zero(1),
                check_self(),
                asset_amount.get() == Int(1),
                valid_address_length(asset_sender.address()),
                valid_address_length(asset_receiver.address()),
            ),
            self.do_move_asset(
                xfer_asset.asset_id(),
                asset_sender.address(),
                asset_receiver.address(),
                asset_amount.get()
            ),
        )

    @external(authorize=Authorize.only(administrator))
    def asset_freeze(
        self,
        freeze_asset: abi.Asset,
        asset_frozen: abi.Bool,
    ):
        """
        ARC-20: asset_freeze. Not supported.
        """
        return Reject()
    
    @external(authorize=Authorize.only(administrator))
    def account_freeze(
        self,
        freeze_asset: abi.Asset,
        freeze_account: abi.Account,
        asset_frozen: abi.Bool,
    ):
        """
        ARC-20: account_freeze. Not supported.
        """
        return Reject()

    @external(authorize=Authorize.only(administrator))
    def asset_destroy(
        self,
        destroy_asset: abi.Asset,
    ):
        """
        ARC-20: asset_destroy. Not supported.
        """
        return Reject()

    @external(read_only=True)
    def get_circulating_supply(self, asset: abi.Asset, *, output: abi.Uint64):
        """
        ARC-20: get_circulating_supply. Not supported.
        """
        return Reject()

    @external(read_only=True)
    def get_asset_config(self, asset: abi.Asset, *, output: AssetConfigTuple):
        """
        ARC-20: get_asset_config. Not supported.
        """
        return Reject()

    @external(read_only=True)
    def get_asset_is_frozen(self, asset: abi.Asset, account: abi.Account, *, output: abi.Bool):
        """
        ARC-20: get_asset_is_frozen. Not supported.
        """
        return Reject()

    @external(read_only=True)
    def get_account_is_frozen(self, account: abi.Account, *, output: abi.Bool):
        """
        ARC-20: get_account_is_frozen. Not supported.
        """
        return Reject()

    #endregion ARC-20

    #region ARC-18

    @external(authorize=Authorize.only(administrator))
    def set_administrator(self, new_admin: abi.Address):
        """
        ARC-18: set_administrator. Sets the administrator to the new address.
        """
        return Seq(
            Assert(
                check_rekey_zero(1),
                check_self(),
                valid_address_length(new_admin.get()),
            ),
            self.administrator.set(new_admin.get()),
        )

    @external(authorize=Authorize.only(administrator))
    def set_policy(self, royalty_policy: RoyaltyPolicyTuple):
        """
        ARC-18: set_policy. Sets the royalty policy to the new policy.
        """
        return Seq(
            (basis := abi.Uint64()).set(royalty_policy.basis),
            (receiver := abi.Address()).set(royalty_policy.receiver),
            Assert(
                check_rekey_zero(1),
                check_self(),
                basis.get() <= self.basis_point_multiplier,
            ),
            self.royalty_basis.set(basis.get()),
            self.royalty_receiver.set(receiver.encode()),
        )

    @external(authorize=Authorize.only(administrator))
    def set_payment_asset(self, payment_asset: abi.Asset, is_allowed: abi.Bool):
        """
        ARC-18: set_payment_asset. Opt in/out to the payment asset for future royalty payments.
        """
        return Seq(
            balance := payment_asset.holding(self.address).balance(),
            creator := payment_asset.params().creator_address(),
            Assert(
                check_rekey_zero(1),
                check_self(),
            ),
            If(
                And(
                    is_allowed.get(),
                    Not(balance.hasValue()),
                )
            ).Then(
                InnerTxnBuilder.Execute({
                    TxnField.fee: Int(0),
                    TxnField.type_enum: TxnType.AssetTransfer,
                    TxnField.xfer_asset: payment_asset.asset_id(),
                    TxnField.asset_amount: Int(0),
                    TxnField.asset_receiver: self.address,
                })
            ).ElseIf(
                And(
                    Not(is_allowed.get()),
                    balance.hasValue(),
                )
            ).Then(
                InnerTxnBuilder.Execute({
                    TxnField.fee: Int(0),
                    TxnField.type_enum: TxnType.AssetTransfer,
                    TxnField.xfer_asset: payment_asset.asset_id(),
                    TxnField.asset_amount: Int(0),
                    TxnField.asset_close_to: creator.value(),
                    TxnField.asset_receiver: creator.value(),
                })
            ).Else(Reject()),
        )

    @external
    def transfer_algo_payment(
        self,
        royalty_asset: abi.Asset,
        royalty_asset_amount: abi.Uint64,
        owner: abi.Account,
        buyer: abi.Account,
        royalty_receiver: abi.Account,
        payment_txn: abi.PaymentTransaction,
        offered_amount: abi.Uint64):
        """
        ARC-18: transfer_algo_payment. Transfers the asset from the owner to the
        buyer while enforcing royalty payments.
        """

        valid_transfer_group = Seq(
            (offer := abi.make(OfferTuple)).decode(self.offers[royalty_asset.asset_id()][owner.address()]),
            (offer_amount := abi.Uint64()).set(offer.amount),
            (offer_auth := abi.Address()).set(offer.auth_address),
            Assert(
                check_rekey_zero(2),
                check_self(
                    group_index=Int(1),
                    group_size=Int(2),
                ),
                Txn.sender() == offer_auth.get(),
                royalty_asset_amount.get() <= offer_amount.get(),
                payment_txn.get().receiver() == self.address,
                self.royalty_receiver != Global.zero_address(),
                royalty_receiver.address() == self.royalty_receiver,
            )
        )

        return Seq(
            valid_transfer_group,
            self.do_pay_algos(
                payment_txn.get().amount(),
                owner.address(),
            ),
            self.do_move_asset(
                royalty_asset.asset_id(),
                owner.address(),
                buyer.address(),
                royalty_asset_amount.get(),
            ),
            self.do_update_offered(
                owner.address(),
                royalty_asset.asset_id(),
                offer_auth.get(),
                offer_amount.get() - royalty_asset_amount.get(),
                Txn.sender(),
                offered_amount.get()
            )
        )

    @external
    def transfer_asset_payment(
        self,
        royalty_asset: abi.Asset,
        royalty_asset_amount: abi.Uint64,
        owner: abi.Account,
        buyer: abi.Account,
        royalty_receiver: abi.Account,
        payment_txn: abi.AssetTransferTransaction,
        payment_asset: abi.Asset,
        offered_amount: abi.Uint64
    ):
        """
        ARC-18: transfer_asset_payment. Transfers the asset from the owner to the
        buyer while enforcing royalty payments.
        """

        valid_transfer_group = Seq(
            (offer := abi.make(OfferTuple)).decode(self.offers[royalty_asset.asset_id()][owner.address()]),
            (offer_amount := abi.Uint64()).set(offer.amount),
            (offer_auth := abi.Address()).set(offer.auth_address),
            Assert(
                check_rekey_zero(2),
                check_self(
                    group_index=Int(1),
                    group_size=Int(2),
                ),
                Txn.sender() == offer_auth.get(),
                royalty_asset_amount.get() <= offer_amount.get(),
                payment_txn.get().xfer_asset() == payment_asset.asset_id(),
                payment_txn.get().asset_receiver() == self.address,
                self.royalty_receiver != Global.zero_address(),
                royalty_receiver.address() == self.royalty_receiver,
            )
        )

        return Seq(
            valid_transfer_group,
            self.do_pay_assets(
                payment_txn.get().xfer_asset(),
                payment_txn.get().asset_amount(),
                owner.address(),
            ),
            self.do_move_asset(
                royalty_asset.asset_id(),
                owner.address(),
                buyer.address(),
                royalty_asset_amount.get(),
            ),
            self.do_update_offered(
                owner.address(),
                royalty_asset.asset_id(),
                offer_auth.get(),
                offer_amount.get() - royalty_asset_amount.get(),
                Txn.sender(),
                offered_amount.get()
            )
        )

    @external
    def offer(
        self,
        royalty_asset: abi.Asset,
        offer: OfferTuple,
        previous_offer: OfferTuple,
    ):
        return Seq(
            (offer_amount := abi.Uint64()).set(offer.amount),
            (offer_auth := abi.Address()).set(offer.auth_address),
            (previous_amount := abi.Uint64()).set(previous_offer.amount),
            (previous_auth := abi.Address()).set(previous_offer.auth_address),
            balance := royalty_asset.holding(Txn.sender()).balance(),
            clawback := royalty_asset.params().clawback_address(),
            Assert(
                check_rekey_zero(1),
                check_self(),
                balance.value() >= offer_amount.get(),
                clawback.value() == self.address,
            ),
            self.do_update_offered(
                Txn.sender(),
                royalty_asset.asset_id(),
                offer_auth.get(),
                offer_amount.get(),
                previous_auth.get(),
                previous_amount.get(),
            )
        )

    @external
    def royalty_free_move(
        self,
        royalty_asset: abi.Asset,
        royalty_asset_amount: abi.Uint64,
        owner: abi.Account,
        receiver: abi.Account,
        offered_amount: abi.Uint64
    ):
        return Seq(
            (offer := abi.make(OfferTuple)).decode(self.offers[royalty_asset.asset_id()][owner.address()]),
            (offer_amount := abi.Uint64()).set(offer.amount),
            (offer_auth := abi.Address()).set(offer.auth_address),
            Assert(
                check_rekey_zero(1),
                check_self(),
                offer_amount.get() == offered_amount.get(),
                offer_amount.get() >= royalty_asset_amount.get(),
                offer_auth.get() == Txn.sender(),
            ),
            self.do_update_offered(
                owner.address(),
                royalty_asset.asset_id(),
                Bytes(""),
                Int(0),
                offer_auth.get(),
                offer_amount.get(), 
            ),
            self.do_move_asset(
                royalty_asset.asset_id(),
                owner.address(),
                receiver.address(),
                royalty_asset_amount.get(),
            )
        )

    @external(read_only=True)
    def get_offer(self, royalty_asset: abi.Uint64, owner: abi.Account, *, output: OfferTuple):
        """
        ARC-18: get_offer. Returns the offer for the given asset and owner.
        """
        return output.decode(self.offers[royalty_asset.get()][owner.address()].get_must())

    @external(read_only=True)
    def get_policy(self, *, output: RoyaltyPolicyTuple):
        """
        ARC-18: get_policy. Returns the royalty policy.
        """
        return Seq(
            (basis := abi.Uint64()).set(self.royalty_basis.get_must()),
            (receiver := abi.Address()).set(self.royalty_receiver.get_must()),
            output.set(receiver, basis)
        )

    @external(read_only=True)
    def get_administrator(self, *, output: abi.Address):
        """
        ARC-18: get_administrator. Returns the administrator address.
        """
        return output.decode(self.administrator)

    #endregion

    @internal(TealType.uint64)
    def compute_royalty_amount(self, payment_amt, royalty_basis):
        return WideRatio([payment_amt, royalty_basis], [self.basis_point_multiplier])

    @internal(TealType.none)
    def do_pay_algos(self, purchase_amount: Expr, owner: Expr):
        royalty_amount = ScratchVar()
        return Seq(
            royalty_amount.store(self.compute_royalty_amount(purchase_amount, self.royalty_basis)),
            InnerTxnBuilder.Begin(),
            InnerTxnBuilder.SetFields({
                TxnField.fee: Int(0),
                TxnField.type_enum: TxnType.Payment,
                TxnField.amount: purchase_amount - royalty_amount.load(),
                TxnField.receiver: owner,
            }),
            If(royalty_amount.load() > Int(0)).Then(
                Seq(
                    InnerTxnBuilder.Next(),
                    InnerTxnBuilder.SetFields({
                        TxnField.fee: Int(0),
                        TxnField.type_enum: TxnType.Payment,
                        TxnField.amount: royalty_amount.load(),
                        TxnField.receiver: self.royalty_receiver,
                    }),
                )
            ),
            InnerTxnBuilder.Submit(),
        )

    @internal(TealType.none)
    def do_pay_assets(self, purchase_asset_id, purchase_amount, owner):
        royalty_amount = ScratchVar()
        return Seq(
            royalty_amount.store(self.compute_royalty_amount(purchase_amount, self.royalty_basis)),
            InnerTxnBuilder.Begin(),
            InnerTxnBuilder.SetFields({
                TxnField.fee: Int(0),
                TxnField.type_enum: TxnType.AssetTransfer,
                TxnField.xfer_asset: purchase_asset_id,
                TxnField.asset_amount: purchase_amount - royalty_amount.load(),
                TxnField.receiver: owner,
            }),
            If(royalty_amount.load() > Int(0)).Then(
                Seq(
                    InnerTxnBuilder.Next(),
                    InnerTxnBuilder.SetFields({
                        TxnField.fee: Int(0),
                        TxnField.type_enum: TxnType.AssetTransfer,
                        TxnField.xfer_asset: purchase_asset_id,
                        TxnField.asset_amount: royalty_amount.load(),
                        TxnField.receiver: self.royalty_receiver,
                    })
                ),
            ),
            InnerTxnBuilder.Submit(),
        )

    @internal(TealType.none)
    def do_move_asset(asset_id: Expr, from_addr: Expr, to_addr: Expr, asset_amount: Expr):
        return InnerTxnBuilder.Execute({
            TxnField.fee: Int(0),
            TxnField.type_enum: TxnType.AssetTransfer,
            TxnField.xfer_asset: asset_id,
            TxnField.asset_amount: asset_amount,
            TxnField.asset_sender: from_addr,
            TxnField.asset_receiver: to_addr,
        })

    @internal(TealType.none)
    def do_update_offered(self, account, asset, auth, amount, prev_auth, prev_amount):
        return Seq(
            previous := self.offers[asset][account].get_maybe(),
            If(previous.hasValue()).Then(
                Seq(
                    (prev_offer := abi.make(OfferTuple)).decode(previous.value()),
                    prev_offer.amount.use(lambda amt: Assert(amt.get() == prev_amount)),
                    prev_offer.auth_address.use(lambda addr: Assert(addr.get() == prev_auth)),
                )
            ).Else(
                Assert(prev_amount == Int(0), prev_auth == Global.zero_address()),
            ),
            If(amount > Int(0)).Then(
                self.offers[asset][account].set(Concat(auth, Itob(amount))),
            ).Else(
                self.offers[asset][account].delete(),
            )
        )

def build():
    with open("./specs/enforcer.json", "w") as f:
        f.write(json.dumps(Enforcer().application_spec()))


if __name__ == "__main__":
    build()
