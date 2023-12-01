<template>
  <div>
    <div class="row">
     
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <h2>{{  $t('name_app') }}</h2>
        <p class="my-3">{{  $t('bienvenida') }}</p>
        
      </div>
    </div>
   
    <Loading v-show="isLoading" />
  </div>
</template>  

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import api from '@/services/api';

import Loading from '@/components/Loading.vue';
import LanguageChanger from './LanguageChanger.vue';


export default {
  components: { Loading, LanguageChanger },
  setup() {
    let isLoading = ref(false)
    let mensaje = ref('');
    let router = useRouter();

    let irDatosPersonales = () => {
      router.push({path:'/informacionpersonal'})
    }

   

    return {
      isLoading,
      irDatosPersonales,
      mensaje,
    }

  }
}
</script>
