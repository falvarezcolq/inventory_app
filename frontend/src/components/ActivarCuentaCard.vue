<template>
  <div class="row">
    <div class="cold-12 col-md-6">
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
          <p style="font-size: 1.25rem; font-weight: bold;">Activar cuenta de usuario</p>
          <p>Se ha enviado un correo electrónico, con el código activación. Revise su correo electrónico en su bandeja de entrada.</p>
          <button type="button" class="btn btn-danger btn-sm" @click="irActivarCuenta"> Activar cuenta</button>
        </div>
        
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="alert alert-success d-flex align-items-center" role="alert">
        <div>
          <p style="font-size: 1.25rem; font-weight: bold;">Solicitar nuevo código de activación</p>
          <p>Si no recibiste el correo electrónico con el código de activación, puede volver a solicitar un nuevo código de activación.</p>
          <button type="button" class="btn btn-success btn-sm"  @click="reenviarCuenta"> Solicitar nuevo código de activación</button> a: {{ user.usuario }}
        </div>
        
      </div>
    </div>

    <br>
    <!-- <div class="card mb-3 bg-warning p-2 text-dark bg-opacity-10">
    <div class="card-body">
      <div class="row mt-4">
        <div class="col-md-8">
          <p class="bienvenido">Activar cuenta de usuario</p>
          <div>
            <span class="red"><i class="fa fa-warning warning"></i></span>
            <label for="" class="warning">
              Se ha enviado un correo electrónico con el código activación de cuenta
            </label>
              <button type="button" class="btn btn-danger m-2" @click="irActivarCuenta"> Activar cuenta</button>
          </div>
          <div>
            <span class="red"><i class="fa fa-warning warning"></i></span>
            <label for="" class="warning">
              Si no aun no encuetras tu codigo de activacion el tu bandeja de entrada, verifica si el correo es el correcto, revisa tu bandeja de correo no deseado , y si a un no esta puedes :
            </label>
            <button class="btn btn-link"  @click="reenviarCuenta"> Reenviar correo de activación </button> a: {{ user.usuario }}
          </div>
        </div>
        </div>

      </div>
    </div> -->

    <Loading v-show="isLoading"/>
  </div>
</template>

<script>


import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { service } from '@/services/service';
import { Mensaje } from "@/tools/Mensaje";
import api from "@/services/api";
import Loading from "./Loading.vue";

export default {
  components: {
    Loading
  },
  setup() {
    let user = ref(null);
    let router = useRouter();
    let isLoading = ref(false);
    user.value = service.getInformacionUsuario();

    let irActivarCuenta = ()=>{
      router.push({path:"/frmactivar"});
    }
    let reenviarCuenta = ()=>{
      Mensaje.Confirmar("¿Desea reenviar el codigo de activacion a su correo?",async()=>{
        isLoading.value=true;
        await api.post(`/correoactivacion`).then((res)=>{
          isLoading.value=false;
          Mensaje.success(res.data.mensaje);
        }).catch(err=>{
          isLoading.value=false;
          Mensaje.error(err.message)
        })
      })
      
    }
    return {
      user,
      irActivarCuenta,
      reenviarCuenta,
      isLoading,
    }
  },
};
</script>
