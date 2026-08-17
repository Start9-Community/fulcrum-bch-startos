# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **This is the Bitcoin Cash Fulcrum, distinct from `fulcrum`, the Bitcoin one.** Don't copy changes between them without checking; their node backends and interface shapes differ.
- **Dependencies are reached over the LXC bridge, never `.startos` DNS.** `startos/utils.ts` resolves each node's RPC with `sdk.host.getBridgeAddress(...).const()`. BCHN's RPC port moves per chain, so that `.const()` is also its chain-change signal; BCHD and Flowee pin one port for every chain, so the `sync-progress` health check re-reads the node's `store.json` and restarts on drift. **BCHD must be dialed through its plaintext proxy** (`rpc-plaintext`, 8334) so no self-signed certificate has to be trusted — dialing its native TLS RPC also meant carrying a per-chain port table, which was wrong on testnet4.
- **BCHN does not export its host ids.** `bitcoin-cash-node-startos/startos/utils` exports `networkPorts` and the _interface_ ids but no `rpcHostId`, so the host id `'rpc'` is a literal in `startos/utils.ts`. Exporting it upstream would remove the literal.
- **The chain follows the node and drives `datadir`.** `main` reads the chain off the node's read-only `/mnt/node` mount and points Fulcrum at `/data/<chain>`. A Fulcrum database refuses to open on a chain it was not built for, so these directories must never be merged. `NETWORKS` in `startos/utils.ts` is the single source for them — the backup excludes and the Delete Chain Index picker both derive from it, so adding a chain means adding it there.
- **`fulcrum.conf` performance keys are deliberately optional.** Unset keys are omitted from the file so Fulcrum applies its own defaults; do not reintroduce `.catch(<number>)` defaults, which hard-code upstream's values into this package and go stale.
