import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './lang/en.json'
import es from './lang/es.json'

import { data as es_message } from './lang/es_mensajes'

// the translations
const resources = { en, es: { ...es, translation: { ...es_message, ...es.translation } } }

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'es',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
