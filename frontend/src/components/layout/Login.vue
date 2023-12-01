<template>
  <div class="login-bg">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-12 mt-3 text-center">
          <LanguageChanger/>
        </div>
      </div>
      <div class="m-0 row vh-100 justify-content-center align-items-center">  
        <div class="col-lg-6 form-group">
          <div class="title login-title-vv text-center">
            <h1>{{  $t('name_app') }}</h1>
            <h3></h3>
          </div>

          <!-- <div class="text-center">
            <button class="btn btn-success" @click="irnuevousuario">  {{ $t('crear_cuenta') }}</button>
          </div> -->

          <div class="row mt-4">
            <div class="col-12 col-md-8 mx-auto login-title-vv">
              <div style="background: rgba(255,255,255,.8); padding: 20px 30px; border-radius: 10px;">
                <h2>{{ $t('contactos') }}:</h2>
                <p>
                  <b>{{ $t('consultas') }}:</b> (591-2) 78999340 <br>
                  <!-- <b>{{ $t('soporte_tecnico') }}:</b> (591-2) 2110960 {{ $t('interno') }} 117  -->
                </p>
              </div>
            </div>
          </div>

        </div>   
        <div class="col-lg-3 col-md-8 col-sm-10 form-group">
          <div class="card login" style="background-color: rgba(255, 255, 255, 0.8);">
            <div class="card-body">            
              <h3 class="text-center my-3">{{  $t('ingresa_a') }}<br>{{  $t('name_app') }}</h3>
              <div class="text-center mb-2">
                <img class="img-fluid img-responsive" width="180" height="180" src="../../assets/loge.png" alt="Logo">
              </div>                    
              <div class="form-group mt-3">
                <label> {{  $t('usuario') }} ({{  $t('correo_electronico') }}):</label> <span class="lb-error" v-if="formError.usuario">{{ $t('campo_requerido') }}</span>
                <input 
                  type="text" 
                  :placeholder="$t('ingresa_usuario') " 
                  class="form-control" 
                  v-model.trim="user.usuario"
                  :class="{error: formError.usuario}"
                >
              </div>
              <div class="form-group">
                <label>{{  $t('contrasenha') }}:</label> <span class="lb-error" v-if="formError.password">{{ $t('campo_requerido') }}</span>
                <input 
                  type="password" 
                  :placeholder="$t('ingresa_contrasenha')" 
                  class="form-control" 
                  v-model.trim="user.password"
                  :class="{error: formError.password}"
                >
              </div>
              <div class="form-group d-grid my-3">
                <span class="lb-error" v-if="errorlogin"> {{ errorlogin  }}</span>
                <button type="button" class="btn btn-primary btn-sm" @click="Ingresar">{{  $t('iniciar_sesion') }}</button>
              </div>
              <div class="form-group text-center">
                <button type="button" class="btn btn-link btn-sm" @click="irRecuperar">{{  $t('recuperar_contrasenha') }}</button>
              </div>
            </div>
          </div> 
          <p class="credencial"> {{ $t('name_app')}} &copy; 2023<br>
          v1.0
          </p>
        </div>  
      </div> 
      <Loading v-show="isLoading" />   
    </div> 
  </div>
 
</template>

<script>
import { ref } from 'vue';
import { routerViewLocationKey, useRouter } from 'vue-router';
import { useUsuarioStore } from '../../stores/useUsuarioStore';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as Yup from 'yup';
import { onMounted } from 'vue';
import decode from 'jwt-decode';
import Loading from '../Loading.vue';
import LanguageChanger from '../LanguageChanger.vue';

export default {
  components:{
    Loading,
    LanguageChanger
},
  setup(){


    let user = ref({});
    let router = useRouter();
    let sUsuario = useUsuarioStore();
    let formError = ref({});
    let errorlogin = ref(null);
    let isLoading = ref( false );
    let schemaForm = Yup.object().shape({
      usuario: Yup.string().required(),
      password: Yup.string().required()
    })

    let EstaLogueado = () => {
      sUsuario.verificarAutenticacion()
      if(sUsuario.token){
        router.push("/home");
      }
    }
    
    let irRecuperar=()=>{
      router.push("/frmrecuperarcuenta");
    }

    const Ingresar = async () => {
      try {
        await schemaForm.validate(user.value, { abortEarly: false});
        Login();
      } catch (err) {
        
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
      }
    }

    let Login = async () => {
      try {
        let data = {
          username: user.value.usuario,
          password: user.value.password
        }
        let config = {
          headers: {
            userclient: `${process.env.VUE_APP_USER_CLIENT}`
          }
        }
        isLoading.value = true;
        let result = await axios.post(`${process.env.VUE_APP_URL_APP}/login`, data, config);
        
        isLoading.value = false;
        errorlogin.value = null;
        if(result.status === 200 && result.data.codigo === 1){

          sUsuario.addToken(result.data.contenido)
          let data= decode(result.data.contenido)
  
          if(data.actualizar){
            router.push({path:'/frmactualizar'})
          }else{
            router.push({path: '/home'});
          }
        
        }else if( result.status ===404  && result.data.codigo ===0){
          errorlogin.value = result.data.mensaje;
        }
        
      } catch (error) {
        isLoading.value = false;
        console.log(error)
      }
    }

    
    let Limpiar = () => {
      user.value = {
        usuario: '',
        password: ''
      }
    }


    let irnuevousuario = ()=>{
      router.push({path: '/frmusuario'});
    }

    onMounted(EstaLogueado);
    return { user, Ingresar, formError,errorlogin,irnuevousuario ,irRecuperar,isLoading}
  }
}
</script>