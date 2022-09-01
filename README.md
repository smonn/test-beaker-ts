## Get started

```sh
# setup python env
python3.10 -m venv .venv
source .venv/bin/activate

# install dependencies
pip install -r requirements.txt
npm install

# compile contract
python contract.py

# build client
npm run build

# run tests
npm test
```

## Notes

First, running `npm test` fails with this error:

```
    mapping undefined, cannot build source map without `mapping`

      at new SourceMap (node_modules/algosdk/src/logic/sourcemap.ts:32:13)
      at HelloBeaker.<anonymous> (node_modules/beaker-ts/lib/application_client/application_client.js:116:33)
      at step (node_modules/beaker-ts/lib/application_client/application_client.js:44:23)
      at Object.next (node_modules/beaker-ts/lib/application_client/application_client.js:25:53)
      at fulfilled (node_modules/beaker-ts/lib/application_client/application_client.js:16:58)
```

Second, when using strict TS rules, one need to prepend `// @ts-nocheck` to the generated client (see `postbuild` script).
