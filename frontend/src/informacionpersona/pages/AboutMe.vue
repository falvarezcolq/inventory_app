<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-12 my-3">
        <h2 class="text-center">{{ $t('datos_personales') }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 form-group">
        <DatosPersona/>
        <div class="mt-3">
          <div v-if="user.confirmado" >
            <i class="fa fa-check green"></i> &nbsp; 
            <label for=""><h3>{{ $t('correo_confirmado')}} {{ $t('cuenta_activa') }}</h3></label>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-5 form-group">
        <DatosDocumento />  
      </div> -->

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import Loading from '@/components/Loading.vue';
import SinResultado from '@/components/SinResultado.vue';

import DatosPersona from "@/informacionpersona/components/DatosPersona.vue";
import DatosDocumento from "@/informacionpersona/components/DatosDocumento.vue";

import { service } from '../../services/service'


export default {
  components: {
    Loading,
    SinResultado,
    DatosPersona,
    DatosDocumento,
  },
  setup() {

    let user = ref(null);
    let router = useRouter();
    user.value = service.getInformacionUsuario();
    
    let verifica = () => {
      console.log('Verifica');
   
    }
    
    let irActivarCuenta = () => {
      router.push({path:"/frmactivar"});
    }
    let irActualizar = () => {
      router.push({path:"/informacionpersonal/actualizar"});
    }
    //onMounted(verifica)
    
    return {
      user,
      irActivarCuenta,
      irActualizar
    }
  },
};

</script>
