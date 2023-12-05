<template>
  <div>
    <div class="row">
      <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <h2>{{  $t('ventanilla_virtual') }}</h2>
        <p class="my-3">{{  $t('bienvenida') }}</p>
        
      </div>
    </div>
    <div class="row" v-if="mensaje!=''">
      <div class="col-12 col-md-12">
        <div class="alert alert-danger">
          <p><strong>{{ $t('nota')}}</strong></p>
          <p>{{ $t('obligatorio') }} {{ mensaje }} {{ $t('aqui_en') }} <router-link to="/informacionpersonal" class="alert-link">{{ $t('datos_personales') }}</router-link>.</p>
        </div>
        
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
import LanguageChanger from '../components/LanguageChanger.vue';


export default {
  components: { Loading, LanguageChanger },
  setup() {
    let isLoading = ref(false)
    let mensaje = ref('');
    let router = useRouter();

    let irDatosPersonales = () => {
      router.push({path:'/informacionpersonal'})
    }

    let validaFotoyDoc = async () => {
      isLoading.value = true;
      mensaje.value = "";
      await api.get('/imagen_actualizado').then((response) => {
        if (response.data.content) {
          let fotos = response.data.content;
          if(!fotos.foto_perfil){
            mensaje.value += " FOTO DE PERFIL,"
          }
          if(!fotos.foto_documento1){
            mensaje.value += " FOTO DEL DOCUMENTO "
          }
        }
        isLoading.value = false;
      })
      isLoading.value = false;
    }

    onMounted(validaFotoyDoc);

    return {
      isLoading,
      irDatosPersonales,
      mensaje,
    }

  }
}
</script>
