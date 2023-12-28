import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';


// import i18n from '@/localization'

import App from './App.vue';
import router from './router';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@fortawesome/fontawesome-free/css/all.css"
//import "./assets/fonts/montserrat/Montserrat.css"
import '@/style-dev.css'


import DefaultLayout from './components/layout/Default.vue'
import PublicLayout from './components/layout/Public.vue'
import LoginLayout from './components/layout/Login.vue'
//import PageNotFoundLayout from 'components/layout/PageNotFoundLayout.vue'

import { setLocale } from 'yup'
import es from './locales/yup/yup.locale.es'
import en from './locales/yup/yup.locale.en'

import { createI18n } from "vue-i18n";
import ES from "./localization/es";
import EN from "./localization/en";




const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

const DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY ='defaultLanguageVuei18n'
const defaultLang = localStorage.getItem(DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY)

// console.log(defaultLang);
// configure i18n
const i18n = createI18n({
  locale: defaultLang ? defaultLang : "es",
  // fallbackLocale: "en",
  messages: { es:ES,en:EN },
});

if(defaultLang){
  if(defaultLang == 'es'){
    setLocale(es)
  }

  if(defaultLang == 'en'){
    setLocale(en)
  }
  
}else{
  setLocale(es)
}



app.use(i18n)



VueQueryPlugin.install( app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000*60, // 1 minuto
        refetchOnReconnect: 'always'
      }
    }
  }
})
//app.use(VueSweetalert2)


app.component('default-layout', DefaultLayout)
app.component('public-layout', PublicLayout)
app.component('login-layout', LoginLayout)
//app.component('pagenotfound-layout', PageNotFoundLayout)
app.mount('#app')


