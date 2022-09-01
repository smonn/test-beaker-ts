import json
from pyteal import *
from beaker import Application, external


class HelloBeaker(Application):
    @external
    def hello(self, name: abi.String, *, output: abi.String):
        return output.set(Concat(Bytes("Hello, "), name.get()))


def build():
    with open("app.json", "w") as f:
        f.write(json.dumps(HelloBeaker().application_spec()))


if __name__ == "__main__":
    build()
