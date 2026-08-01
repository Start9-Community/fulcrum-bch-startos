<p align="center">
  <img src="icon.png" alt="Fulcrum BCH Logo" width="21%">
</p>

# Fulcrum BCH on StartOS

> **Upstream docs:** <https://github.com/cculianu/Fulcrum>
>
> Everything not listed in this document should behave the same as upstream
> Fulcrum. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

Fulcrum is a fast, scalable Electrum server. It indexes a Bitcoin Cash chain from a full node and serves the Electrum protocol to light wallets and to block explorers, so neither has to download the chain itself. Upstream source: [cculianu/Fulcrum](https://github.com/cculianu/Fulcrum).

The package is titled **Fulcrum BCH** and its id is `fulcrum-bch`, to distinguish it from the Bitcoin package `fulcrum`.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| Image         | `cculianu/fulcrum`, the upstream image, unmodified          |
| Architectures | x86_64, aarch64                                             |
| Command       | `Fulcrum --ts-format none /data/fulcrum.conf`               |

`--ts-format none` drops Fulcrum's own log timestamps, which StartOS already adds.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose                                   |
| ------ | ----------- | ----------------------------------------- |
| `main` | `/data`     | Configuration, banner, and chain indexes  |

Files at the volume root:

| Path                 | Purpose                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `fulcrum.conf`       | Fulcrum's config, written by the package — see [Configuration Management](#configuration-management) |
| `banner.txt`         | The MOTD served to connecting Electrum clients                                 |
| `store.json`         | Package state: the selected node, and the credential minted for Flowee         |
| `<chain>/`           | One Fulcrum database per chain (`mainnet/`, `chipnet/`, `testnet3/`, …)         |

A Fulcrum database belongs to exactly one chain — Fulcrum refuses to open one built for another — so each chain gets its own directory and `datadir` is pointed at the one matching the chain the node reports. Switching a node between chains therefore never discards an index.

The selected node's `main` volume is additionally mounted **read-only** at `/mnt/node`. Fulcrum never reads the chain off disk; the mount exists so the package can read the node's own `store.json` for the chain it is on and, on Bitcoin Cash Node and Bitcoin Cash Daemon, its RPC credentials.

---

## Installation and First-Run Flow

1. On install, a **critical task** prompts for **Select Node Backend**. Until it is answered, that is the only control the service page offers.
2. Choosing a node writes it to `store.json`. For Bitcoin Cash Node and Bitcoin Cash Daemon, a second critical task is raised **on the node** to turn on the transaction index and turn off pruning. For Flowee, a critical task is raised there to register the RPC credential this package minted at install.
3. Once the node is installed, configured and running, Fulcrum starts and begins indexing. A full mainnet index takes hours.
4. When the index completes, StartOS raises a success notification.

There is no upstream setup wizard, and no credentials for the user to set: the RPC credential Fulcrum logs into the node with is resolved or minted by the package.

---

## Configuration Management

`fulcrum.conf` is a StartOS-managed file. The package writes it on every run and merges user settings into it; editing it by hand is not supported.

| StartOS-Managed                                                                                 | User-Configurable (via the Configure action) |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `datadir` — derived from the chain the node reports                                             | `banner.txt` contents                        |
| `bitcoind` — the node's RPC bridge address                                                      | `bitcoind_timeout`                           |
| `rpcuser` / `rpcpassword` — read from the node, or minted here for Flowee                       | `bitcoind_clients`                           |
| `tcp` — pinned to the Electrum port                                                             | `worker_threads`                             |
| `peering` / `announce` — both off; this server does not join the public Electrum peer network   | `db_mem`                                     |
| `banner` — pinned to `banner.txt`                                                               | `db_max_open_files`                          |

Every user-configurable key is optional. Left unset, it is omitted from `fulcrum.conf` entirely and Fulcrum applies its own default rather than one this package hard-codes.

---

## Network Access and Interfaces

| Interface | Host id | Port  | Protocol      | Purpose                                        |
| --------- | ------- | ----- | ------------- | ---------------------------------------------- |
| Electrum  | `main`  | 50001 | Electrum/TCP  | Wallet and explorer queries, plaintext TCP     |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

The binding is **plaintext only**, with no TLS address published alongside it. BCH Explorer resolves this binding's bridge address without specifying a scheme, so publishing both would leave which of the two it dials undefined. Clients that want an encrypted path should use the Tor address.

---

## Actions (StartOS UI)

| Action                    | Id                     | Visibility | Availability  | Input               | Output                          |
| ------------------------- | ---------------------- | ---------- | ------------- | ------------------- | ------------------------------- |
| **Select Node Backend**   | `select-node`          | enabled    | any status    | Node package        | none; restarts Fulcrum          |
| **Configure**             | `configure`            | enabled    | any status    | Banner + 5 tuning values | none                       |
| **Delete Chain Index**    | `delete-network-index` | enabled    | only stopped  | Chain               | Confirmation of what was deleted |

- **Select Node Backend** writes the chosen node to `store.json`. `main` reads that through a `.const()`, so the write is what restarts Fulcrum against the new node; the action does not restart anything itself. Selecting Flowee also raises the credential-registration task on Flowee.
- **Configure** merges its input into `fulcrum.conf` and writes `banner.txt`. Values left empty are removed from the config rather than written as a default.
- **Delete Chain Index** removes one chain's database directory outright. It is gated to a stopped service because Fulcrum holds the database open while it runs.

---

## Backups and Restore

**Included in backup:** the `main` volume, **excluding** every per-chain index directory.

**Excluded:** `mainnet/`, `testnet3/`, `testnet4/`, `scalenet/`, `chipnet/`, `regtest/`. Fulcrum's index is derived entirely from the node and is tens of gigabytes on mainnet; carrying it in a backup is pure cost.

**Restore behavior:** `fulcrum.conf`, `banner.txt` and `store.json` come back as they were — including the node selection and the Flowee credential — and Fulcrum rebuilds the index from the node on first start. Expect a full re-index after a restore.

---

## Health Checks

| Check         | Id              | Method                                                   | Messages                                                                            |
| ------------- | --------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Electrum      | `primary`       | Port listening (50001)                                   | Success: "The Electrum interface is ready on `<chain>`" / Loading while syncing     |
| Sync Progress | `sync-progress` | Port listening, else Fulcrum's own `<Controller>` log line | Success: "Fulcrum is synced" / Loading: the last progress line Fulcrum printed      |

Fulcrum does not open its Electrum port until the index is caught up, so "listening" is itself the synced signal. While it is not listening, `sync-progress` surfaces Fulcrum's own progress output.

`sync-progress` also carries the chain-change watch. Bitcoin Cash Node moves its RPC port with the chain, so the bridge address alone restarts the service when it switches; Bitcoin Cash Daemon and Flowee keep one port on every chain, so for those the check re-reads the node's `store.json` and restarts the service if the chain has moved.

A `synced-true` oneshot runs once `sync-progress` is ready and raises the sync-complete notification, guarded by a flag in `store.json` so it fires only once.

---

## Dependencies

Exactly one node is required at a time — the one **Select Node Backend** has chosen — so all three are declared optional in the manifest and only the selected one is returned as a live requirement.

| Dependency               | Id             | Required health check | Purpose                                      |
| ------------------------ | -------------- | --------------------- | -------------------------------------------- |
| **Bitcoin Cash Node**    | `bitcoincashd` | `primary`             | Chain data over JSON-RPC (default selection) |
| **Bitcoin Cash Daemon**  | `bchd`         | `rpc-plaintext`       | Chain data over JSON-RPC                     |
| **Flowee the Hub**       | `flowee`       | `primary`             | Chain data over JSON-RPC                     |

Only the binding Fulcrum dials has to be up — the node's own `sync-progress` is deliberately not required. Fulcrum indexes to whatever height the node has reached and follows it from there, so gating on a full node sync would keep the service unstartable, and its own progress unreadable, for the days a fresh chain takes.

The selected node's volume is mounted read-only at `/mnt/node` — see [Volume and Data Layout](#volume-and-data-layout). Version floors are declared in `startos/dependencies.ts`.

Three details are specific to how each node is reached:

- **Addresses come from the internal host bridge**, resolved with `sdk.host.getBridgeAddress(...).const()` in `startos/utils.ts`. The `.startos` DNS names are retired and are not used. While the node is absent the address resolves `null` and the `bitcoind` line is omitted rather than pointed somewhere that cannot answer; the read heals when the node appears.
- **Bitcoin Cash Daemon is dialed through its plaintext proxy** (host id `rpc-plaintext`), not its native TLS RPC, so no self-signed certificate has to be trusted. That proxy is on one fixed port for every chain, which also removes the per-chain RPC port table the package used to carry.
- **Flowee's credential is minted here, not read from Flowee.** Flowee stores only hashed `rpcauth` entries and cannot hand a password back out. `init/seedFiles.ts` mints a username and password into `store.json` once, and **Select Node Backend** raises a task on Flowee to register it.

---

## Limitations and Differences

1. **Plaintext Electrum only.** No TLS address is published on the Electrum binding — see [Network Access and Interfaces](#network-access-and-interfaces) for why. Use the Tor address for an encrypted path.
2. **Peering and announcement are disabled.** `peering` and `announce` are pinned off, so this server does not join or advertise itself on the public Electrum peer network.
3. **The chain follows the node and is not configurable here.** Fulcrum indexes whatever chain the selected node is on. To change chains, change the node's chain.
4. **Knuth is not offered.** Earlier versions listed it as a node backend; no StartOS package provides it.
5. **`fulcrum.conf` is not hand-editable.** It is rewritten on every run. Use the Configure action.
6. **The index is not backed up.** A restored install re-indexes from the node.

---

## What Is Unchanged from Upstream

- The Fulcrum binary and its image, used exactly as published upstream.
- The Electrum protocol surface — every method Fulcrum implements, unchanged.
- Fulcrum's own indexing, database format, and RocksDB tuning.
- Every `fulcrum.conf` key not listed under [Configuration Management](#configuration-management) keeps its upstream default.
- Fulcrum's requirement of an unpruned node with a full transaction index. The package's dependency tasks exist to satisfy it, not to change it.

---

## Contributing

See [AGENTS.md](AGENTS.md).

---

## Quick Reference for AI Consumers

```yaml
package_id: fulcrum-bch
image: cculianu/fulcrum
architectures: [x86_64, aarch64]
volumes:
  main: /data
mounts:
  selected_node_volume: /mnt/node (read-only)
ports:
  electrum: 50001
host_ids:
  electrum: main
dependencies: [bitcoincashd, bchd, flowee] # all optional; exactly one selected at a time
startos_managed_env_vars: none
startos_managed_config_keys:
  - datadir
  - bitcoind
  - rpcuser
  - rpcpassword
  - tcp
  - peering
  - announce
  - banner
actions:
  - select-node
  - configure
  - delete-network-index
health_checks:
  - primary
  - sync-progress
```
