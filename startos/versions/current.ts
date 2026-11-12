import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:21',
  releaseNotes: {
    en_US: 'Fixes a case where Fulcrum could stop responding until restarted.',
    es_ES:
      'Corrige un caso en el que Fulcrum podía dejar de responder hasta reiniciarlo.',
    de_DE:
      'Behebt einen Fall, in dem Fulcrum bis zu einem Neustart nicht mehr reagieren konnte.',
    pl_PL:
      'Naprawia przypadek, w którym Fulcrum mógł przestać odpowiadać aż do ponownego uruchomienia.',
    fr_FR:
      'Corrige un cas où Fulcrum pouvait cesser de répondre jusqu’à son redémarrage.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
