import { T } from '@start9labs/start-sdk'
import { autoconfig as bchdAutoconfig } from 'bitcoin-cash-daemon-startos/startos/actions/config/autoconfig'
import { autoconfig as bchnAutoconfig } from 'bitcoin-cash-node-startos/startos/actions/config/autoconfig'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import {
  bchdDescription,
  bitcoincashdDescription,
  floweeDescription,
} from './manifest/i18n'
import { sdk } from './sdk'
import { NodeId } from './utils'

const selected = async (effects: T.Effects, node: NodeId) =>
  ((await storeJson.read((s) => s.nodePackageId).const(effects)) ??
    'bitcoincashd') === node

const confirmed = async (effects: T.Effects) =>
  !!(await storeJson.read((s) => s.nodeConfirmed).const(effects))

// Only the binding Fulcrum dials has to be up: gating on the node's
// `sync-progress` would keep Fulcrum unstartable for the days a fresh chain
// takes to sync, while Fulcrum itself indexes to whatever height it has.
const bitcoincashd = sdk.Dependency.optional('bitcoincashd', {
  description: bitcoincashdDescription,
  metadata: {
    title: 'Bitcoin Cash Node',
    icon: 'https://raw.githubusercontent.com/Start9-Community/bitcoin-cash-node-startos/master/icon.png',
  },
  versionRange: '>=29.0.0:11',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: async ({ effects }) => selected(effects, 'bitcoincashd'),
}).withInit(async (effects) => {
  if (!(await confirmed(effects))) return
  // ZeroMQ is upstream's recommendation rather than a requirement, so it is
  // set when the user runs the task but does not keep the task raised.
  await sdk.action.createTask(
    effects,
    'bitcoincashd',
    bchnAutoconfig,
    'critical',
    {
      input: {
        kind: 'partial',
        accept: [{ prune: 0, txindex: true }],
        set: { prune: 0, txindex: true, zmqEnabled: true },
      },
      when: { condition: 'input-not-matches', once: false },
      reason: i18n(
        'Fulcrum indexes every transaction on the chain, which needs an unpruned node and the full transaction index',
      ),
    },
  )
})

const bchd = sdk.Dependency.optional('bchd', {
  description: bchdDescription,
  metadata: {
    title: 'Bitcoin Cash Daemon',
    icon: 'https://raw.githubusercontent.com/Start9-Community/bitcoin-cash-daemon-startos/master/icon.png',
  },
  versionRange: '>=0.22.2:0',
  kind: 'running',
  // BCHD is dialed through its plaintext proxy, not its native TLS RPC.
  healthChecks: ['rpc-plaintext'],
  enabled: async ({ effects }) => selected(effects, 'bchd'),
}).withInit(async (effects) => {
  if (!(await confirmed(effects))) return
  await sdk.action.createTask(effects, 'bchd', bchdAutoconfig, 'critical', {
    input: {
      kind: 'partial',
      accept: [{ prune: 0, txindex: true }],
      set: { prune: 0, txindex: true },
    },
    when: { condition: 'input-not-matches', once: false },
    reason: i18n(
      'Fulcrum indexes every transaction on the chain, which needs an unpruned node and the full transaction index',
    ),
  })
})

// Flowee's credential task is raised by Select Node Backend instead: Flowee
// keeps only a hash and reports no current input, so `input-not-matches` here
// would re-raise it on every init.
const flowee = sdk.Dependency.optional('flowee', {
  description: floweeDescription,
  metadata: {
    title: 'Flowee the Hub',
    icon: 'https://raw.githubusercontent.com/Start9-Community/flowee-the-hub-startos/master/icon.png',
  },
  versionRange: '>=2026.5.2:12',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: async ({ effects }) => selected(effects, 'flowee'),
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(bitcoincashd)
  .addDependency(bchd)
  .addDependency(flowee)
