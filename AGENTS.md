# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes. This file restates neither:
whoever changes the package has both, so it carries only what they don't — repo mechanics,
a change that looks right and is not, where the next thing gets added, a naming trap, a
build or test invocation particular to this repo.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **This is the Bitcoin Cash Fulcrum, distinct from `fulcrum`, the Bitcoin one.** Don't copy changes between them without checking; their node backends and interface shapes differ.
- **Keep the chain re-read in the `sync-progress` health check.** A node's chain switch leaves its old RPC binding disabled, and a disabled binding still resolves, so the `.const()` bridge address never signals the switch. Dial BCHD through its `rpc-plaintext` proxy, never its native TLS RPC, which would need its self-signed certificate trusted. BCHN does not export its RPC host id, so `'rpc'` is a literal in `startos/utils.ts`.
- **Add a chain in `NETWORKS` (`startos/utils.ts`) only.** The datadir, backup excludes and Delete Chain Index picker all derive from it; never merge two chains' directories, since a Fulcrum database refuses to open on another chain.
- **Leave `fulcrum.conf`'s performance keys optional.** Unset keys are omitted so Fulcrum applies its own defaults; a `.catch(<number>)` hard-codes upstream's values here and goes stale.
