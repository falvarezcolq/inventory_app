<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center">RECUPERAR CONTRASEÑA </h2>
        <h3 class="green">
          <i class="fa fa-info-circle"></i> Te enviamos un email con instrucciones para restablecer tu contraseña.
        </h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 offset-lg-2">

        <div class="row form-group">
          <div class="col-md-12">
            <!-- <label for="">Correo Electrónico:</label> -->
            <span class="lb-error" v-if="formError.email">{{ formError.email }}</span>
            <input type="text" class="form-control" v-model='persona.email' :class="{ error: formError.email }"
              @input="persona.email = $event.target.value.toLowerCase()" 
              placeholder="Ingrese Correo Electrónico"
            />

              <label class="blue">{{ mensaje }}</label>
          </div>
          <div class="col-md-12 text-end">
            <button type="button" class="btn btn-primary btn-sm" @click="Registrar">
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-md-12">
        <div>
          ¿Ya tienes una cuenta?
          <span class="btn btn-link" @click="irLogin"> ¡Inicia sesión en su lugar!</span>
        </div>
      </div>
    </div>
     <Loading v-show="isLoading"/>
  </div>

 
</template>

<script>
import { ref, onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import * as yup from 'yup'
import moment from "moment"
import { Mensaje } from '@/tools/Mensaje'
import { useUsuarioStore } from '../../stores/useUsuarioStore';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '@/components/Loading.vue';

export default {
    components:{
      Loading
    },
    setup() {
        let router = useRouter();
        let persona = ref({});
        let formError = ref({});
        let sUsuario = useUsuarioStore();
        let mensaje = ref("");
        let isLoading = ref(false);
        let schemaForm = yup.object().shape({
            email: yup.string().email().min(0).max(50).required(),
        });

        const Validar = async () => {
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
            // await verificar_email();
            if (formError.value.email) {
                return false;
            }
            return true;
        };

        let irLogin = () => {
            router.push({ path: "/" });
        };

        let Registrar = async () => {
          try {
            if (await Validar()) {
                isLoading.value = true;
                // let result = await api.post('/recuperar_contrasenha', { email: persona.value.email }).then(response => {
                //   isLoading.value = false;  
                //   if (response.data.code == 1) {
                //     mensaje.value = response.data.message;
                //     //console.log('mesaje: ', mensaje.value);
                //   }
                // }).catch(error => {
                //   isLoading.value = false;  
                //   mensaje.value = error.message;
                // });
                
                let result = await api.post('/recuperar_contrasenha', { email: persona.value.email });
                if(result.data.code == 1){
                  isLoading.value = false; 
                  Mensaje.success_action('Se envío un email a su correo electrónico,<br> para restablecer su contraseña', () => {
                    router.push({path: '/'});
                  });
                }
                else{
                  Mensaje.warning_info('No se realiazo el envío de<br>restablecimiento de contraseña, vuelva a intentar.<br> O contáctese al número de teléfono de soporte', () => {
                    router.push({path: '/'});
                  });
                }


            }
            
          } catch (error) {
            isLoading.value = false; 
            console.log(error.message);
          }
        }

        return {
            isLoading,
            mensaje,
            persona,
            formError,
            irLogin,
            Registrar,
        }
    },
    components: { Loading }
}
</script>