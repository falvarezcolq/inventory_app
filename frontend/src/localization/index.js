
// import VueI18n from 'vue-i18n'

import { createI18n } from "vue-i18n";

import ES from './es'
import EN from './en'


// const DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY = 'defaultLanguageVuei18nExample'
// const defaultLang = localStorage(DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY)

// export default new VueI18n({
//   locale: 'ES', // set default language
// //   locale: defaultLang,
//   messages:{
//     ES,
//     EN,
//   } // feed all the messages with the tall language
// })

export const i18n = createI18n({
    locale: "es",
    fallbackLocale: "es",
    messages:{
        ES,
        EN,
    }
});