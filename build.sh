#!/usr/bin/env bash

set -e

source venv/bin/activate

echo 'Compile smart contracts...'
python ./src/contracts/enforcer_contract.py
python ./src/contracts/marketplace_contract.py

echo 'Generate TypeScript clients...'
npx beaker generate ./specs/enforcer.json ./src/clients/
npx beaker generate ./specs/marketplace.json ./src/clients/

echo 'Prepend @ts-nocheck...'
echo '// @ts-nocheck' | cat - ./src/clients/enforcer_client.ts > /tmp/out && mv /tmp/out ./src/clients/enforcer_client.ts
echo '// @ts-nocheck' | cat - ./src/clients/marketplace_client.ts > /tmp/out && mv /tmp/out ./src/clients/marketplace_client.ts

echo 'Build...'
npx tsc -p tsconfig.build.json

echo 'Done'
