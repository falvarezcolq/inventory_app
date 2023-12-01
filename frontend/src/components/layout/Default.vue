<template>
  <div class="wrapper">
    <!-- <Header /> -->
    <nav class="navbar navbar-expand fixed-top">
      <div class="btn-sidebar"> 
        <div class="btn btn-link" @click="showMenu"  >
          <i :class="vistaMenu ? 'fa fa-dedent girar':'fa fa-dedent'"></i>
        </div>
      </div>

      

      <ul class="navbar-nav navbar-right navbar-header ms-auto">

        <!-- <li class="nav-item">
        <div class="col-12 mt-3 text-end">
          <LanguageChanger/>
        </div>
        </li> -->
      
        <li class="nav-item">
          <button type="button" class="btn btn-sm btn-bell" title="Mis notificaciones"  @click="Notificaciones">
            <i class="fa fa-bell"></i>
            <div class="nro-notificacion" v-if="contador && contador > 0" >{{ contador }}</div>
          </button>  
        </li>

        <li class="nav-item">
          <button type="button" class="btn btn-link btn-sm">
            <i class="fa fa-user-circle"></i> 
          </button>
          {{user.usuario}} 
        </li>

        <li class="nav-item">
          <button type="button" class="btn btn-link btn-sm" title="Cerrar Sesión" @click="CerrarSecion">
            <i class="fa fa-power-off"></i>
          </button>
        </li>
      </ul>
    </nav>  

    
    <div id="content" :class="vistaMenu ? 'menu-default': ''">
      <Sidebar :isAction="vistaMenu" />  
      <main>
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <!-- <slot></slot> -->
              <router-view></router-view>
            </div>
          </div><br>
         
          <p class="credencial">{{ $t('name_app')}} &copy; 2023<br>
          v1.0</p>
        </div>
      </main>
    </div>  
  </div>  
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import api from '@/services/api'
import { service } from '@/services/service'
import ActivarCuentaCard from '@/components/ActivarCuentaCard.vue'
import { useUsuarioStore } from '../../stores/useUsuarioStore';
import decode from 'jwt-decode'
import LanguageChanger from '../LanguageChanger.vue';
import { Mensaje } from '@/tools/Mensaje'
import { onMounted } from 'vue'
import moment from 'moment'
export default {
  components: {
    Header,
    Sidebar,
    ActivarCuentaCard,
    LanguageChanger,
  },
  setup(){
    let sUsuario = useUsuarioStore();
    let vistaMenu = ref(false);
    let contador = ref(0);

    let router = useRouter();
    let credential = null;
    let timer = 0;

    let stop = () => {
        if (timer) {
            clearTimeout(timer);
            timer = 0;
        }
    }
    let reloj=()=>{
      // let momentoActual = new Date()
      // let hora = momentoActual.getHours()
      // let minuto = momentoActual.getMinutes()
      // let segundo = momentoActual.getSeconds()
      // let horaImprimible = hora + " : " + minuto + " : " + segundo
      // console.log(horaImprimible)

      if((credential.exp * 1000) - 10000 < moment().valueOf()){
      
        Mensaje.warning_info("Su sesión ha expirado",()=>{
          sUsuario.cerrarSesion()
          router.push({path: '/'})
    
        });
        stop()
      }else{
        timer = setTimeout(reloj,1000)
      }
    }

    let EstaLogueado = () => {
      sUsuario.verificarAutenticacion()
      if(sUsuario.token){
        if(service.tokenExpirado()){
          Mensaje.warning("Su sesión ha expirado",()=>{
            sUsuario.cerrarSesion()
            router.push({path: '/'})
          });
        }else{
          credential = decode(service.getToken())
          reloj();
        }
      }else{
        router.push("/");
      }
    }

   

    let showMenu = () => vistaMenu.value = !vistaMenu.value;

    let CerrarSecion = () => {
      stop()
      sUsuario.cerrarSesion()
      router.push({path: '/'})
    }
    let verifica= ()=>{
      if(user.value && user.value.actualizar ){
        router.push({path:"/frmactualizar"})
      }
    }
    
    let getNotificacionesNoVistos = async () => { 
      if(service.tokenConfirmado()){
        await api.get('/notificaciones/count').then( res => {
          contador.value = res.data.contenido;
        }).catch(err => {
          console.log(err);
        });
      }

    }

    onMounted(async()=>{
      
      await EstaLogueado();
      await getNotificacionesNoVistos();
      verifica();
    })

    
    //onMounted(verifica)

    let Notificaciones = () => {
     router.push({path:"/notificaciones"})
    }


    let user = ref(null);
    user.value = service.getInformacionUsuario();  

    return {
      user,
      showMenu,
      vistaMenu,
      CerrarSecion,
      contador,
      Notificaciones
    }
  }
}
</script>
