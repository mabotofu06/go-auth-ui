#!/bin/bash

ENV_NAME="${1:-localhost}"

if [ ! -f "env/${ENV_NAME}.env" ]; then
  echo "env/${ENV_NAME}.env がありません" >&2
  exit 1
fi

cp "env/${ENV_NAME}.env" .env
echo "[OK] env/${ENV_NAME}.env -> .env 反映"

echo "===== Build and Copying static pages... ====="
npm run build