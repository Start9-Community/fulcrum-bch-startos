import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:23',
  releaseNotes: {
    en_US: `- Fulcrum BCH no longer has access to its node’s data volume: it reads only the network and RPC login the node publishes for its dependents, and follows a change to either at once.
- While its node is not installed or is older than Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 or Flowee the Hub 2026.5.2:19, Fulcrum BCH does not start and says so; it starts by itself once the node is updated. Update your node first.
- The node’s RPC login is no longer stored in Fulcrum’s configuration file or its backups.`,
    es_ES: `- Fulcrum BCH ya no tiene acceso al volumen de datos de su nodo: solo lee la red y el inicio de sesión RPC que el nodo publica para sus dependientes, y sigue al instante cualquier cambio en ellos.
- Mientras su nodo no esté instalado o sea anterior a Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 o Flowee the Hub 2026.5.2:19, Fulcrum BCH no se inicia y lo indica; se inicia solo en cuanto el nodo se actualiza. Actualice primero su nodo.
- El inicio de sesión RPC del nodo ya no se guarda en el archivo de configuración de Fulcrum ni en sus copias de seguridad.`,
    de_DE: `- Fulcrum BCH hat keinen Zugriff mehr auf das Datenvolume seines Knotens: Es liest nur das Netzwerk und die RPC-Anmeldung, die der Knoten für abhängige Dienste veröffentlicht, und folgt einer Änderung daran sofort.
- Solange sein Knoten nicht installiert oder älter als Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 oder Flowee the Hub 2026.5.2:19 ist, startet Fulcrum BCH nicht und meldet das; sobald der Knoten aktualisiert ist, startet es von selbst. Aktualisieren Sie zuerst Ihren Knoten.
- Die RPC-Anmeldung des Knotens wird nicht mehr in der Konfigurationsdatei von Fulcrum oder in seinen Backups gespeichert.`,
    pl_PL: `- Fulcrum BCH nie ma już dostępu do woluminu danych swojego węzła: odczytuje tylko sieć i dane logowania RPC, które węzeł publikuje dla usług zależnych, i od razu podąża za ich zmianą.
- Dopóki jego węzeł nie jest zainstalowany lub jest starszy niż Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 lub Flowee the Hub 2026.5.2:19, Fulcrum BCH nie uruchamia się i o tym informuje; uruchamia się sam po aktualizacji węzła. Najpierw zaktualizuj węzeł.
- Dane logowania RPC węzła nie są już przechowywane w pliku konfiguracyjnym Fulcrum ani w jego kopiach zapasowych.`,
    fr_FR: `- Fulcrum BCH n’a plus accès au volume de données de son nœud : il lit seulement le réseau et l’identifiant RPC que le nœud publie pour ses dépendants, et suit aussitôt tout changement de l’un ou de l’autre.
- Tant que son nœud n’est pas installé ou est antérieur à Bitcoin Cash Node 29.0.0:17, Bitcoin Cash Daemon 0.22.2:8 ou Flowee the Hub 2026.5.2:19, Fulcrum BCH ne démarre pas et l’indique ; il démarre de lui-même une fois le nœud mis à jour. Mettez d’abord votre nœud à jour.
- L’identifiant RPC du nœud n’est plus stocké dans le fichier de configuration de Fulcrum ni dans ses sauvegardes.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
