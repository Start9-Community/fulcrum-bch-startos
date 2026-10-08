import { rm, stat } from 'node:fs/promises'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { NETWORKS } from '../utils'

const { InputSpec, Value } = sdk

export const deleteNetworkIndex = sdk.Action.withInput(
  'delete-network-index',

  async () => ({
    name: i18n('Delete Chain Index'),
    description: i18n(
      'Delete the index Fulcrum built for one chain, freeing the disk it occupies.',
    ),
    warning: i18n(
      'The index for the chosen chain is deleted permanently. Fulcrum rebuilds it from the node the next time it runs on that chain, which takes hours on mainnet.',
    ),
    // Fulcrum holds its database open while it runs, so the index can only be
    // removed from under it while the service is stopped.
    allowedStatuses: 'only-stopped',
    group: i18n('Maintenance'),
    visibility: 'enabled',
  }),

  InputSpec.of({
    network: Value.select({
      name: i18n('Chain'),
      description: i18n(
        "Only a chain Fulcrum has indexed has anything to delete. The index of the chain your node is on is rebuilt the next time Fulcrum starts; another chain's is rebuilt only if your node moves back to it.\n- Mainnet: the live Bitcoin Cash network\n- Testnet3: the legacy public test network\n- Testnet4: the lighter public test network\n- Scalenet: the public test network for high transaction throughput\n- Chipnet: the public test network where upcoming protocol upgrades activate early\n- Regtest: a private chain on this server only, for local testing",
      ),
      default: null,
      values: {
        mainnet: i18n('Mainnet'),
        testnet3: i18n('Testnet3'),
        testnet4: i18n('Testnet4'),
        scalenet: i18n('Scalenet'),
        chipnet: i18n('Chipnet'),
        regtest: i18n('Regtest'),
      } satisfies Record<(typeof NETWORKS)[number], string>,
    }),
  }),

  async () => null,

  async ({ input }) => {
    const path = sdk.volumes.main.subpath(input.network)
    const present = await stat(path).then(
      () => true,
      () => false,
    )

    if (!present) {
      return {
        version: '1' as const,
        title: i18n('Nothing to Delete'),
        message: i18n('Fulcrum has no index for ${chain}.', {
          chain: input.network,
        }),
        result: null,
      }
    }

    await rm(path, { recursive: true, force: true })

    return {
      version: '1' as const,
      title: i18n('Index Deleted'),
      message: i18n(
        'The ${chain} index is gone. Fulcrum rebuilds it the next time it runs on that chain.',
        { chain: input.network },
      ),
      result: null,
    }
  },
)
