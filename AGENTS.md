# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `fulcrum-bch`**, titled **Fulcrum BCH** — distinct from `fulcrum`, the Bitcoin package. One subcontainer, one interface (**Electrum**, host id `main`, plaintext TCP on 50001), one `main` volume.
- **The Electrum binding must stay plaintext-only.** BCH Explorer resolves it with `sdk.host.getBridgeAddress({ packageId: 'fulcrum-bch', hostId: 'main', internalPort: 50001 })` and passes no `ssl`, which matches any address on the binding. Adding an `addSsl` address here would leave which of the two it dials undefined. This is a cross-package contract; changing it means changing BCH Explorer in the same pass.
- **Three node backends, one selected at a time.** `bitcoincashd`, `bchd` and `flowee` are all `optional: true` in the manifest; `setupDependencies` returns only the one `store.json` names. `main` reads that selection through a `.const()`, so the Select Node Backend action only writes the store — it never restarts anything itself.
- **Dependencies are reached over the LXC bridge, never `.startos` DNS.** `startos/utils.ts` resolves each node's RPC with `sdk.host.getBridgeAddress(...).const()`. BCHN's RPC port moves per chain, so that `.const()` is also its chain-change signal; BCHD and Flowee pin one port for every chain, so the `sync-progress` health check re-reads the node's `store.json` and restarts on drift. **BCHD must be dialed through its plaintext proxy** (`rpc-plaintext`, 8334) so no self-signed certificate has to be trusted — dialing its native TLS RPC also meant carrying a per-chain port table, which was wrong on testnet4.
- **BCHN does not export its host ids.** `bitcoin-cash-node-startos/startos/utils` exports `networkPorts` and the *interface* ids but no `rpcHostId`, so the host id `'rpc'` is a literal in `startos/utils.ts`. Exporting it upstream would remove the literal.
- **Flowee's RPC credential is minted here, not read from Flowee.** Flowee stores only hashed `rpcauth` entries and dropped its plaintext `store.json` fields in 2026.5.2:12. `init/seedFiles.ts` mints a username and password into this package's `store.json` (once, and for existing installs too — not gated on `kind === 'install'`), and `actions/selectNode.ts` raises a critical task on Flowee (`create-dependent-credential`) to register it. That task belongs in the action, not `setupDependencies`: `input-not-matches` cannot judge a credential Flowee only stores hashed, so a task created on init would reappear every init no matter how often it was answered. Never expect to read a password back out of Flowee.
- **The chain follows the node and drives `datadir`.** `main` reads the chain off the node's read-only `/mnt/node` mount and points Fulcrum at `/data/<chain>`. A Fulcrum database refuses to open on a chain it was not built for, so these directories must never be merged. `NETWORKS` in `startos/utils.ts` is the single source for them — the backup excludes and the Delete Chain Index picker both derive from it, so adding a chain means adding it there.
- **`fulcrum.conf` performance keys are deliberately optional.** Unset keys are omitted from the file so Fulcrum applies its own defaults; do not reintroduce `.catch(<number>)` defaults, which hard-code upstream's values into this package and go stale.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach fulcrum-bch -n primary-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `primary-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
