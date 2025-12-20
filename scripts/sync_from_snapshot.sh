#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 /path/to/EightVo-Solutions-Inc" >&2
  exit 1
fi

SRC=$(realpath "$1")
DEST=$(realpath "$(dirname "$0")/..")

if [ ! -d "$SRC" ]; then
  echo "Source directory not found: $SRC" >&2
  exit 1
fi

# Sync everything except Vercel package/config, git metadata, and build artifacts
rsync -av --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.vercel/' \
  --exclude 'vercel.*' \
  --exclude 'vercel.json' \
  --exclude 'frontend/vercel.json' \
  "$SRC"/ "$DEST"/
