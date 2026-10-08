import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:19',
  releaseNotes: {
    en_US: `- Requires Bitcoin Cash Node 29.0.0:11 or later.
- Select Node Backend preselects nothing until you have chosen a node, and its description says what Fulcrum asks of each node.
- Delete Chain Index preselects no chain, and its description explains each one.
- Leaving Server Banner empty in Configure restores Fulcrum's built-in banner.
- Configure's RPC timeout, RPC client and worker thread descriptions say when to change them.`,
    es_ES: `- Requiere Bitcoin Cash Node 29.0.0:11 o posterior.
- Seleccionar nodo de respaldo no preselecciona nada hasta que haya elegido un nodo, y su descripción indica qué pide Fulcrum a cada nodo.
- Eliminar índice de cadena no preselecciona ninguna cadena, y su descripción explica cada una.
- Dejar vacío el banner del servidor en Configurar restaura el banner integrado de Fulcrum.
- Las descripciones del tiempo de espera RPC, los clientes RPC y los hilos de trabajo en Configurar indican cuándo cambiarlos.`,
    de_DE: `- Erfordert Bitcoin Cash Node 29.0.0:11 oder neuer.
- Knoten-Backend auswählen gibt nichts vor, bis Sie einen Knoten gewählt haben, und die Beschreibung nennt, was Fulcrum von jedem Knoten verlangt.
- Chain-Index löschen gibt keine Chain vor, und die Beschreibung erklärt jede einzelne.
- Ein leeres Server-Banner unter Konfigurieren stellt das eingebaute Banner von Fulcrum wieder her.
- Die Beschreibungen von RPC-Zeitlimit, RPC-Clients und Worker-Threads unter Konfigurieren sagen, wann eine Änderung sinnvoll ist.`,
    pl_PL: `- Wymaga Bitcoin Cash Node 29.0.0:11 lub nowszego.
- Wybierz węzeł źródłowy nie zaznacza niczego, dopóki nie wybierzesz węzła, a jego opis mówi, o co Fulcrum prosi każdy węzeł.
- Usuń indeks łańcucha nie zaznacza żadnego łańcucha, a jego opis objaśnia każdy z nich.
- Pozostawienie pustego banera serwera w Konfiguruj przywraca wbudowany baner Fulcrum.
- Opisy limitu czasu RPC, klientów RPC i wątków roboczych w Konfiguruj mówią, kiedy je zmieniać.`,
    fr_FR: `- Nécessite Bitcoin Cash Node 29.0.0:11 ou une version ultérieure.
- Sélectionner le nœud source ne présélectionne rien tant que vous n'avez pas choisi de nœud, et sa description indique ce que Fulcrum demande à chaque nœud.
- Supprimer l'index de la chaîne ne présélectionne aucune chaîne, et sa description explique chacune d'elles.
- Laisser vide la bannière du serveur dans Configurer rétablit la bannière intégrée de Fulcrum.
- Les descriptions du délai RPC, des clients RPC et des fils de travail dans Configurer indiquent quand les modifier.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
