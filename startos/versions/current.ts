import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:18',
  releaseNotes: {
    en_US: `Notices when the node changes chain, whichever node it is.

Fulcrum watched for a chain change on Bitcoin Cash Daemon and Flowee but not on Bitcoin Cash Node, on the assumption that Bitcoin Cash Node moving its RPC port would be noticed by itself. It is not: the port it moves off stays registered, just disabled, and a disabled port still resolves — so Fulcrum kept indexing against the chain it started on until it was restarted by hand.`,
    es_ES: `Detecta cuándo el nodo cambia de cadena, sea cual sea el nodo.

Fulcrum vigilaba los cambios de cadena en Bitcoin Cash Daemon y Flowee, pero no en Bitcoin Cash Node, suponiendo que el cambio de puerto RPC de este último se detectaría solo. No es así: el puerto que abandona sigue registrado, solo que desactivado, y un puerto desactivado se sigue resolviendo, de modo que Fulcrum continuaba indexando la cadena con la que arrancó hasta reiniciarlo a mano.`,
    de_DE: `Bemerkt einen Chainwechsel des Knotens, unabhängig davon, welcher Knoten es ist.

Fulcrum achtete bei Bitcoin Cash Daemon und Flowee auf einen Chainwechsel, nicht aber bei Bitcoin Cash Node — in der Annahme, dessen wandernder RPC-Port falle von selbst auf. Das tut er nicht: der verlassene Port bleibt registriert, nur deaktiviert, und ein deaktivierter Port wird weiterhin aufgelöst. Fulcrum indizierte daher weiter gegen die Chain, mit der es gestartet war, bis es von Hand neu gestartet wurde.`,
    pl_PL: `Zauważa zmianę łańcucha przez węzeł, niezależnie od tego, który to węzeł.

Fulcrum śledził zmianę łańcucha w Bitcoin Cash Daemon i Flowee, ale nie w Bitcoin Cash Node — zakładając, że przeniesienie portu RPC przez ten ostatni zostanie zauważone samo. Tak nie jest: opuszczony port pozostaje zarejestrowany, tyle że wyłączony, a wyłączony port nadal się rozwiązuje. Fulcrum indeksował więc dalej łańcuch, z którym wystartował, dopóki nie został ręcznie zrestartowany.`,
    fr_FR: `Remarque un changement de chaîne du nœud, quel que soit le nœud.

Fulcrum surveillait un changement de chaîne sur Bitcoin Cash Daemon et Flowee, mais pas sur Bitcoin Cash Node, en supposant que le déplacement de son port RPC se signalerait de lui-même. Ce n'est pas le cas : le port qu'il quitte reste enregistré, simplement désactivé, et un port désactivé continue de se résoudre. Fulcrum poursuivait donc son indexation sur la chaîne de départ jusqu'à un redémarrage manuel.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
