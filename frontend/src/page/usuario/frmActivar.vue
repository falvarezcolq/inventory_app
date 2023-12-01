<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>CONFIRMAR CORREO, ACTIVAR CUENTA </h2>
        <h3 class="green">
          * Ingrese el código de activación que fue enviado a su correo electrónico, si no lo encuentra revise en correos no deseados(SPAM).
        </h3>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-4 offset-lg-4">

        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Código de activación:</label>
            <span class="lb-error" v-if="formError.codigo">{{ formError.codigo }}</span>
            <input type="text" class="form-control" v-model='persona.codigo' :class="{ error: formError.codigo }"
              @input="persona.codigo = $event.target.value.toLowerCase()" />
          </div>
         
          <div class="col-md-12 mt-4"  style="text-align:right">
            <label class="red">{{ mensaje }}</label>
            <br>
            <button type="button" class="btn btn-outline-primary btn-sm" @click="Registrar"><i class="fa fa-user-o"></i>
              ACTIVAR CUENTA</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <Loading v-show="isLoading"/>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import * as yup from 'yup'
import { Mensaje } from '@/tools/Mensaje'
import { useUsuarioStore } from '../../stores/useUsuarioStore';
import Loading from '@/components/Loading.vue'


export default {
    components:{
      Loading
    },
    setup() {
        let router = useRouter();
        let persona = ref({});
        let formError = ref({});
        let mensaje = ref("");
        let isLoading = ref(false);
        let sUsuario = useUsuarioStore();
        let schemaForm = yup.object().shape({
            codigo: yup.string().min(8).max(8).required(),
        });
        const Validar = async () => {
            mensaje.value ="";
            try {
                formError.value = {};
                await schemaForm.validate(persona.value, { abortEarly: false });
            }
            catch (err) {
                formError.value = {};
                err.inner.forEach((error) => {
                    if (error.path && !formError[error.path]) {
                        formError.value[error.path] = error.message;
                    }
                });
                return false;
            }
            return true;
        };
        let irLogin = () => {
            router.push({ path: "/" });
        };
        let Registrar = async () => {
            if (await Validar()) {
                isLoading.value=true;
                let result = await api.post('/setAcountActivation', { codigo: persona.value.codigo }).then(response => {
                  isLoading.value=false;  
                  if (response.data.codigo == 1) {
                        mensaje.value = response.data.mensaje;
                        console.log("**Cuenta activada**");
                        Mensaje.success_action("Cuenta Activada",()=>{refresh() } );
                    }

                    if (response.data.codigo == 0) {
                        mensaje.value = response.data.mensaje;
                    }
                }).catch(error => {
                  isLoading.value=false;  
                  mensaje.value = error.message;
                });
            }
        };
        let refresh = async() => {
          try {
            isLoading.value=true;
            let result = await api.post(`/refresh`);
            isLoading.value=false;
            if (result.status === 200 && result.data.codigo === 1) {
              sUsuario.addToken(result.data.token)
              router.push({ path: '/inicio' });
            }
          } catch (error) {
            isLoading.value=false;
            console.log(error.message)
          }
        }
        return {
            isLoading,
            mensaje,
            persona,
            formError,
            irLogin,
            Registrar,
        };
    },
    components: { Loading }
}
</script>