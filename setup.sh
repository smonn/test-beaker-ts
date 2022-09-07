#!/usr/bin/env bash

set -e

echo 'Configure Python...'
python3.10 -m venv venv
source venv/bin/activate

echo 'Install Python dependencies...'
pip install -r requirements.txt

echo 'Configure Node.js...'
nvm use

echo 'Install Node.js dependencies...'
npm install

echo 'Done'
