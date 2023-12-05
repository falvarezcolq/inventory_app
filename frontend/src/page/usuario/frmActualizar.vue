<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>ACTUALIZAR CONTRASEÑA </h2>
        <h3 class="green">
          * Ingrese el correo con el que registro su cuenta.
          <br>
        </h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 offset-lg-4">

        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Nueva contraseña:</label>
            <span class="lb-error" v-if="formError.new_password">{{ formError.new_password }}</span>
            <input type="password" class="form-control" v-model='persona.new_password' :class="{ error: formError.new_password }"
              @input="persona.new_password = $event.target.value.toLowerCase()" />
          </div>
          <div class="col-md-12">
            <label for="">Repite contraseña:</label>
            <span class="lb-error" v-if="formError.new_password_2">{{ formError.new_password_2 }}</span>
            <input type="password" class="form-control" v-model='persona.new_password_2' :class="{ error: formError.new_password_2 }"
              @input="persona.new_password_2 = $event.target.value.toLowerCase()" />
          </div>
          <div class="col-md-12 mt-4"  style="text-align:right">
            <label class="red">{{ mensaje }}</label>
            <br>
            <button type="button" class="btn btn-outline-primary btn-sm" @click="Registrar"><i class="fa fa-user-o"></i>
              ACTUALIZAR</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <Loading v-show="isLoading"/>
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
import Loading from '@/components/Loading.vue'
import { ws } from '@/services/webservices'
import Login from '../secure/Login.vue'

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
            new_password: yup.string().min(4).max(50).required(),
            new_password_2: yup.string().min(4).max(50).required(),
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

            if(persona.value.new_password != persona.value.new_password_2){
              mensaje.value = 'La contraseñas no son iguales';
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
                let result = await api.post('/setPassword', { new_password: persona.value.new_password }).then(response => {
                  isLoading.value=false;  
                  if (response.data.code == 1) {
                        mensaje.value = response.data.message;
                        console.log("**Contraseña actualizada**");
                        Mensaje.success_action("Actualzado correctamente",()=>{Login(persona.value.new_password) } );
                    }
                }).catch(error => {
                  isLoading.value=false;  
                  mensaje.value = error.message;
                });
            }
        };
        let Login = async(new_password) => {
          try {
            let persona = await ws.getUsuario();
            let data = {
              usr_usuario: persona.email,
              usr_password: new_password
            }
            let config = {
              headers: {
                userclient: `${process.env.VUE_APP_USER_CLIENT}`
              }
            }
            let result = await axios.post(`${process.env.VUE_APP_URL_APP}/login`, data, config);
            if (result.status === 200 && result.data.code === 1) {
              sUsuario.addToken(result.data.token)
              router.push({ path: '/inicio' });
            }
            errorlogin.value = null;
          } catch (error) {
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