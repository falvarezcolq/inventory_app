
<script setup lang="ts"/>

<template>
    <div class="language-changer">
        <!-- <select v-model="this.$i18n.locale" >
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
            {{ lang.text }}
        </option>
        </select> -->

        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" style="font-size: 0.6rem;"
            aria-expanded="false">
            <!-- <div class="flag" :id="language.cod"></div> -->
            {{ language.text }}
            
        </button>
        <ul class="dropdown-menu dropdown-country">
            <li class="mx-4" v-for="lang in langs" :key="lang.code">
                <!-- <div class="flag" :id="lang.cod"></div> -->
                <div class="flag_text">
                   
                    <a class="dropdown-item flag_text" @click="language_selected(lang)"> <b>{{ lang.text }}</b></a>
                </div>
            </li>
        </ul>


    </div>
</template>

<script>

import { onMounted } from 'vue';
import { ref } from 'vue';
import "@/flags-all.css";

import { setLocale } from 'yup'
import es from '@/locales/yup/yup.locale.es'
import en from '@/locales/yup/yup.locale.en'
export default {
    name: "language-changer",
    data() {
        let language = ref({ code: "es", text: "Español", cod: "ESP" },)
        let langs= ref( [
                { code: "en", text: "English", cod: "USA" },
                { code: "es", text: "Español", cod: "ESP" },
            ])
        let language_selected = (lang) => {
            this.$i18n.locale = lang.code;
            language.value = lang
            const DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY ='defaultLanguageVuei18n'
            localStorage.setItem(DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY, lang.code )   

            if(lang.code){
                if(lang.code == 'es'){
                    setLocale(es)
                }

                if(lang.code == 'en'){
                    setLocale(en)
                }
                
            }else{
                setLocale(es)
            }
            
        }
        onMounted(()=>{
            language.value = langs.value.find( x=> x.code == this.$i18n.locale);
            if(this.$i18n.locale){
                if(this.$i18n.locale == 'es'){
                    setLocale(es)
                }

                if(this.$i18n.locale == 'en'){
                    setLocale(en)
                }
                
            }else{
                setLocale(es)
            }
        })
        return {
            language_selected,
            language,
            langs,
        };
    },
};
</script>