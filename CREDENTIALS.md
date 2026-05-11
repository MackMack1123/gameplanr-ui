# Credentials & rotation

Operator-facing notes for the credentials this repo touches. Both files
referenced here are gitignored — they live on the operator's machine
only.

## What's where

| Credential | File · key | Used by |
|---|---|---|
| Gitea PAT (canonical) | `.kamal/secrets` → `KAMAL_REGISTRY_PASSWORD` | `kamal deploy` (Docker registry pull) AND `npm publish` (Gitea npm registry — scope `package`). **Same PAT for both.** |
| Caddy agent-bypass | `.kamal/secrets` → `DESIGN_AGENT_TOKEN` | `Caddyfile` — `?key=…` URL bypass + `design_agent_token` cookie session. Lets agents fetch `design.gameplanr.co` without the basic_auth dialog. |
| npm registry token | `.npmrc` → `_authToken` for `//gitea.mvp-labs.com/api/packages/brm5017/npm/` | `npm publish` only. **Must equal** `KAMAL_REGISTRY_PASSWORD` (it's the same Gitea PAT, just consumed by a different tool). |
| Kamal SSH key | `~/.ssh/kamal_deploy` | SSH into the deploy host (`72.61.71.153:2222` per `config/deploy.yml`). |
| Caddy basic_auth | `Caddyfile` (committed) | The hashed credential for the human path is in the Caddyfile itself — bcrypt hash, safe to commit. |

## Rotating the Gitea PAT

This is the rotation that bit us — the npm `_authToken` and
`KAMAL_REGISTRY_PASSWORD` drifted apart, and `npm publish` failed with
401 until they were reunited. Single source of truth is "the current
Gitea PAT"; both files must equal it.

1. **Generate a new PAT in Gitea**: `gitea.mvp-labs.com` → Settings →
   Applications → Generate New Token. Required scope: `write:package`
   (covers the Docker container registry AND the npm package registry).
2. **Update `.kamal/secrets` in this repo**: replace the
   `KAMAL_REGISTRY_PASSWORD=…` value.
3. **Update `.npmrc` in this repo**: replace the `_authToken=…` value.
   It must equal what you just put in `.kamal/secrets`. Verify with:
   ```sh
   diff <(grep ^KAMAL_REGISTRY_PASSWORD= .kamal/secrets | cut -d= -f2-) \
        <(grep _authToken= .npmrc | cut -d= -f2-) \
     && echo "match" || echo "MISMATCH"
   ```
4. **Update sibling repos that use the same PAT**: every GamePlanr app
   (`gameplanr-home`, `lineup`, `Game-Planr-Tournament`,
   `GamePlanr-Volunteer`, `field-schedule`, `gameplanr-harmony`) has
   `.kamal/secrets`, `.kamal/secrets.prod`, `.kamal/secrets.staging`
   with the same `KAMAL_REGISTRY_PASSWORD`. Update them all in lockstep
   so future deploys don't 401 randomly.
5. **Redeploy** at least one consumer to confirm: `kamal deploy` from
   any of those repos. A 401 from the Docker registry pull means a
   `.kamal/secrets` file has the old token.
6. **Smoke-test npm publish auth**: run from this repo:
   ```sh
   npm whoami --registry https://gitea.mvp-labs.com/api/packages/brm5017/npm/
   ```
   Should print the Gitea username (not error out).
7. **Revoke the old PAT** in Gitea once everything's green.

## Rotating the Caddy agent-bypass token

Lower-stakes — only affects agent access to `design.gameplanr.co`.

1. Generate any 64-char random string:
   `openssl rand -hex 32`.
2. Update `.kamal/secrets` → `DESIGN_AGENT_TOKEN=…`.
3. `kamal deploy` from this repo.
4. Smoke-test:
   ```sh
   TOKEN=$(grep ^DESIGN_AGENT_TOKEN= .kamal/secrets | cut -d= -f2-)
   curl -s -o /dev/null -w "%{http_code}\n" "https://design.gameplanr.co/?key=$TOKEN"
   ```
   Expect `200`. A `401` means either the env var didn't reach the
   container (`kamal app exec --reuse 'printenv | grep DESIGN_AGENT_TOKEN'`
   to verify) or the new token wasn't redeployed.

Old tokens stop working immediately on the next deploy because the
Caddyfile reads the env var at startup — there's no rotation window.
