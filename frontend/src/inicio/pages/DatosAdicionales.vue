<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <ProgressStep :step=3 />
      </div>
    </div>

    <div class="row">    
      <div class="col-12 col-md-12">
        <Definitiva v-show="activar" />      
      </div>  
    </div>
  </div>
</template> 

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import ProgressStep from '@/inicio/components/ProgressStep.vue'
import DatosTramite from '@/inicio/components/DatosTramite.vue';

import Definitiva from '@/inicio/pages/extranjeria/DatosAdicionalesPersona.vue';

export default {
  components: { ProgressStep, DatosTramite, Definitiva },

  setup() {
    let router = useRouter()
    let activar = ref(Boolean)

    let VerificaTipoTramite = () => {
      let id_tramite = 20
      let objTramite = { 20: true, 13: false }

      if (!objTramite[id_tramite]) {
        router.push({ path: '/documentos' })
      }
      else {
        activar.value = true
      }
    }

    const Continuar = async (datos) => {

      let result = await api.post('datosAdicionales', datos);
      router.push({ path: '/documentos' })
    }

    let Regresar = () => {
      router.push({ path: '/requisitos' })
    }

    onMounted(VerificaTipoTramite)

    return {
      Regresar,
      Continuar,
      activar
    }

  }
}
</script>
