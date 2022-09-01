## Get started

```sh
# setup python env
python3.10 -m venv .venv
source .venv/bin/activate

# setup node env (assuming nvm is installed, otherwise be sure to use v16)
nvm use

# install dependencies (will install for both python and node.js)
npm install

# compile contract and build client
npm run build

# run tests
npm test
```

## Notes

If running `npm test` fails with the error below, you may need to upgrade your Algod to version >=3.9.0:

```
    mapping undefined, cannot build source map without `mapping`

      at new SourceMap (node_modules/algosdk/src/logic/sourcemap.ts:32:13)
      at HelloBeaker.<anonymous> (node_modules/beaker-ts/lib/application_client/application_client.js:116:33)
      at step (node_modules/beaker-ts/lib/application_client/application_client.js:44:23)
      at Object.next (node_modules/beaker-ts/lib/application_client/application_client.js:25:53)
      at fulfilled (node_modules/beaker-ts/lib/application_client/application_client.js:16:58)
```

When using strict TS rules, one need to prepend `// @ts-nocheck` to the generated client (see `postbuild` script).

Dependent on how many txns a test case contains, tests may take a while to execute. It is helpful to increase the timeout for unit tests.
