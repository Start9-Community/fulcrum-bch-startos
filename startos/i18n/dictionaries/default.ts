export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Fulcrum BCH': 0,
  'Could not read the settings of the selected node. Assuming mainnet until it reports otherwise.': 1,
  'The selected node reports an unrecognized chain: ${chain}.': 2,
  'The selected node is not reachable yet. Fulcrum will connect once it is installed and running.': 3,
  Electrum: 4,
  'The Electrum interface is ready on ${chain}': 5,
  'The Electrum interface is not ready': 6,
  'Electrum interface not ready while syncing...': 7,
  'Sync Progress': 8,
  'The node switched from ${from} to ${to}. Restarting.': 9,
  'Fulcrum is synced': 10,
  'Unknown status': 11,
  'Sync Complete': 12,
  'Fulcrum has finished building its address index. The Electrum server is ready.': 13,
  // interfaces.ts
  'Serves the Electrum protocol to Bitcoin Cash wallets and to BCH Explorer': 14,
  // dependencies.ts
  'Fulcrum indexes every transaction on the chain, which needs an unpruned node and the full transaction index': 15,
  // init/taskSelectNode.ts
  'Choose which Bitcoin Cash node Fulcrum indexes from': 16,
  // actions/selectNode.ts
  'Select Node Backend': 17,
  'Choose which Bitcoin Cash node Fulcrum indexes the chain from.': 18,
  'Fulcrum restarts against the new node. If it is on a different chain, the index for that chain is built from scratch, which takes a while.': 19,
  'Node Backend': 20,
  'Choose the node you have installed. Fulcrum then raises a task on it:\n- Bitcoin Cash Node: turn pruning off and the transaction index and ZeroMQ on\n- Bitcoin Cash Daemon: turn pruning off and the transaction index on\n- Flowee the Hub: register the login Fulcrum uses': 21,
  'Bitcoin Cash Node': 22,
  'Bitcoin Cash Daemon': 23,
  'Flowee the Hub': 24,
  'Flowee needs an RPC credential registered for Fulcrum to log in with': 25,
  // actions/configure.ts
  Configure: 26,
  'Configure Fulcrum banner and performance settings.': 27,
  Configuration: 28,
  'Server Banner': 29,
  'Custom banner text displayed to connecting Electrum clients. Leave empty to use the Fulcrum default banner.': 30,
  'ASCII art welcome! Variables like $SERVER_VERSION are supported.': 31,
  'Node RPC Timeout (seconds)': 32,
  'Raise this if the logs show "bitcoind request timed out", which can happen while the node is still syncing or under heavy load.': 33,
  'Node RPC Clients': 34,
  'More clients can speed up the index build, but only if the node accepts as many concurrent RPC requests. Keep it at or below the number of CPU cores.': 35,
  'Worker Threads (0 for auto)': 36,
  '0 uses every CPU core, which keeps Fulcrum most responsive. Set a number to cap how much of the CPU Fulcrum can take.': 37,
  'Database Memory (MB)': 38,
  'Upper bound on memory used by the RocksDB cache. Increase for faster queries at the cost of RAM.': 39,
  'Database Max Open Files': 40,
  'Raise this if Fulcrum logs complaints about too many open files.': 41,
  Default: 42,
  // actions/deleteNetworkIndex.ts
  'Delete Chain Index': 43,
  'Delete the index Fulcrum built for one chain, freeing the disk it occupies.': 44,
  'The index for the chosen chain is deleted permanently. Fulcrum rebuilds it from the node the next time it runs on that chain, which takes hours on mainnet.': 45,
  Maintenance: 46,
  Chain: 47,
  "Only a chain Fulcrum has indexed has anything to delete. The index of the chain your node is on is rebuilt the next time Fulcrum starts; another chain's is rebuilt only if your node moves back to it.\n- Mainnet: the live Bitcoin Cash network\n- Testnet3: the legacy public test network\n- Testnet4: the lighter public test network\n- Scalenet: the public test network for high transaction throughput\n- Chipnet: the public test network where upcoming protocol upgrades activate early\n- Regtest: a private chain on this server only, for local testing": 48,
  Mainnet: 49,
  Testnet3: 50,
  Testnet4: 51,
  Scalenet: 52,
  Chipnet: 53,
  Regtest: 54,
  'Nothing to Delete': 55,
  'Fulcrum has no index for ${chain}.': 56,
  'Index Deleted': 57,
  'The ${chain} index is gone. Fulcrum rebuilds it the next time it runs on that chain.': 58,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
