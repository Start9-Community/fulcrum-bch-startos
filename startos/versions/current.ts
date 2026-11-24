import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:23',
  releaseNotes: {
    en_US:
      'Fulcrum BCH no longer has access to its node’s data volume: it reads only the network and RPC login the node publishes for its dependents, and follows a change to either at once. Update your node first, to Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 or Flowee the Hub 2026.5.2:19 or later.',
    es_ES:
      'Fulcrum BCH ya no tiene acceso al volumen de datos de su nodo: solo lee la red y el inicio de sesión RPC que el nodo publica para sus dependientes, y sigue al instante cualquier cambio en ellos. Actualice primero su nodo, a Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 o Flowee the Hub 2026.5.2:19 o posterior.',
    de_DE:
      'Fulcrum BCH hat keinen Zugriff mehr auf das Datenvolume seines Knotens: Es liest nur das Netzwerk und die RPC-Anmeldung, die der Knoten für abhängige Dienste veröffentlicht, und folgt einer Änderung daran sofort. Aktualisieren Sie zuerst Ihren Knoten, auf Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 oder Flowee the Hub 2026.5.2:19 oder neuer.',
    pl_PL:
      'Fulcrum BCH nie ma już dostępu do woluminu danych swojego węzła: odczytuje tylko sieć i dane logowania RPC, które węzeł publikuje dla usług zależnych, i od razu podąża za ich zmianą. Najpierw zaktualizuj węzeł do Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 lub Flowee the Hub 2026.5.2:19 albo nowszego.',
    fr_FR:
      'Fulcrum BCH n’a plus accès au volume de données de son nœud : il lit seulement le réseau et l’identifiant RPC que le nœud publie pour ses dépendants, et suit aussitôt tout changement de l’un ou de l’autre. Mettez d’abord votre nœud à jour, vers Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 ou Flowee the Hub 2026.5.2:19 ou ultérieur.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
