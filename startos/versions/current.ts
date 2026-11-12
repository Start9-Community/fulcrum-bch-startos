import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:22',
  releaseNotes: {
    en_US:
      'Fixes the sync progress shown while Fulcrum indexes, which could occasionally fail to update.',
    es_ES:
      'Corrige el progreso de sincronización que se muestra mientras Fulcrum indexa, que a veces no se actualizaba.',
    de_DE:
      'Behebt den während der Indizierung angezeigten Synchronisierungsfortschritt, der sich gelegentlich nicht aktualisierte.',
    pl_PL:
      'Naprawia postęp synchronizacji wyświetlany podczas indeksowania przez Fulcrum, który czasem się nie aktualizował.',
    fr_FR:
      'Corrige la progression de synchronisation affichée pendant l’indexation de Fulcrum, qui ne se mettait parfois pas à jour.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
