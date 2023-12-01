<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand fixed-top">
      <!-- <div class="navbar-brand"></div> -->
      <!--Mobil-->
      <div class="menu-mobil">
        <i class="fa fa-bars"></i> MENU
      </div>
      <div class="btn-sidebar"> 
        <div class="btn btn-link" @click="showMenu"  >
          <i :class="vistaMenu ? 'fa fa-dedent girar':'fa fa-dedent' "></i>
        </div>
      </div>

  <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>

      <ul class="navbar-nav navbar-right ms-auto">

        <li class="nav-item">
          <button type="button" class="btn btn-sm btn-bell" title="Mis notificaciones"  @click="notificaciones">
            <i class="fa fa-bell" style="color: #ff7e69"></i>
            <div class="nro-notificacion" v-if="contador && contador > 0" >{{ contador }}</div>
          </button>  
        </li>

        <li class="nav-item"><a class="nav-link" href="#">
          <span class="nav-descripcion">USUARIO</span>
          <!-- <i class="fa fa-user-circle"></i>  -->
          {{user.usuario}} </a>
        </li>


        <li class="nav-item">
          <button type="button" class="btn btn-link btn-sm" title="Cerrar Sesión" @click="CerrarSecion">
            <i class="fa fa-power-off" style="color: #ff7e69"></i>
          </button>
        </li>
      </ul>
    </nav>      
    

  </div>
  
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { service } from '../../services/service'
import { useUsuarioStore } from '../../stores/useUsuarioStore'
import { onMounted } from 'vue'
import api from '@/services/api'

export default {
  setup(){
    let user = ref(null);
    user.value = service.getInformacionUsuario();
    let sUsuario = useUsuarioStore();

    let router = useRouter();

    let CerrarSecion = () => {
      sUsuario.cerrarSesion()
      router.push({path: '/'})
    }
    let verifica= ()=>{
      if(user.value && user.value.actualizar ){
        router.push({path:"/frmactualizar"})
      }
    }
    
    let contador = ref(0);
    let getNotificacionesNoVistos = async ()=>{ 
      await api.get('/notificaciones/count').then(res=>{
        contador.value=res.data.contenido;
      }).catch(err=>{
        console.log(err);
      })
    }

    onMounted(async()=>{
      await getNotificacionesNoVistos();
    })

    
    onMounted(verifica)

    let notificaciones = ()=>{
     router.push({path:"/notificaciones"})
    }

    return { user, CerrarSecion,notificaciones,contador}
  }
}
</script>
<style>
.btn-bell{
  position: relative;
}
.nro-notificacion{
  color: #fff;
  font-weight: 800;
  background-color: red;
  border-radius: 50%;
  border:#fff solid 1px;
  font-size:0.7rem;
  width: 18px;
  height: 18px;
  position: absolute;
  z-index: 20;
  top: -10px;
  left: 15px;
}
</style>