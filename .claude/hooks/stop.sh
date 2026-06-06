#!/bin/bash
# Blocks Claude from ending a turn until typecheck + lint pass.
cd "$(git rev-parse --show-toplevel)"
pnpm typecheck && pnpm lint