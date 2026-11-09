import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:20',
  releaseNotes: {
    en_US: `- Wallets can now connect over the server's IPv6 addresses.`,
    es_ES: `- Las carteras ahora pueden conectarse a través de las direcciones IPv6 del servidor.`,
    de_DE: `- Wallets können sich jetzt über die IPv6-Adressen des Servers verbinden.`,
    pl_PL: `- Portfele mogą teraz łączyć się przez adresy IPv6 serwera.`,
    fr_FR: `- Les portefeuilles peuvent désormais se connecter via les adresses IPv6 du serveur.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
