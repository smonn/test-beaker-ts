import json
from pyteal import abi, Concat, Bytes, Txn, Assert, Global
from beaker import Application, external, delete


class HelloBeaker(Application):
    @external
    def hello(self, name: abi.String, *, output: abi.String):
        return output.set(Concat(Bytes("Hello, "), name.get()))

    @delete
    def delete(self):
        return Assert(Txn.sender() == Global.creator_address())


def build():
    with open("./src/app.json", "w") as f:
        f.write(json.dumps(HelloBeaker().application_spec()))


if __name__ == "__main__":
    build()
