<template>
  <nav class="sidebar" :class="isAction ? 'side_active':''">
    <div class="sidebar-header text-center">
      <!-- <div class="btn-sidebar"> 
        <div class="btn btn-link" @click="showMenu"  >
          <i :class="vistaMenu ? 'fa fa-dedent girar':'fa fa-dedent' "></i>
        </div>
      </div> -->
      <div class="row" @click="irInicio">
        <!-- <div class="col-md-12">
          <img src="../../assets/buo.png" width="70" />
        </div> -->
        <div class="col-md-12">
          
          <span ><b>{{ $t('name_app')}}</b></span>
        </div>
      </div>
    </div>
    <hr style="border-top: 1px solid #f48120;">
    <div class="m-menu">
      <ul class="menu">
        <li>
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/about_me">
                <i class="fa fa-chevron-right"></i> 
                <!-- {{item.nombre_menu}}  -->
                {{$t('info_personal')}}
              </router-link>
            </div>
          </div>
        </li>
      
        <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/roles">
                <i class="fa fa-chevron-right"></i> 
                {{$t('roles')}}
              </router-link>
            </div>
          </div>
        </li>

         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/categories">
                <i class="fa fa-chevron-right"></i> 
                {{$t('categories')}}
              </router-link>
            </div>
          </div>
        </li>
         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/suppliers">
                <i class="fa fa-chevron-right"></i> 
                {{$t('suppliers')}}
              </router-link>
            </div>
          </div>
        </li>
         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/users">
                <i class="fa fa-chevron-right"></i> 
                {{$t('users')}}
              </router-link>
            </div>
          </div>
        </li>
        
         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/units">
                <i class="fa fa-chevron-right"></i> 
                {{$t('units')}}
              </router-link>
            </div>
          </div>
        </li>
         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/products">
                <i class="fa fa-chevron-right"></i> 
                {{$t('products')}}
              </router-link>
            </div>
          </div>
        </li>
         <!-- <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/movements">
                <i class="fa fa-chevron-right"></i> 
                MOVEMENTS
              </router-link>
            </div>
          </div>
        </li> -->

        <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/in">
                <i class="fa fa-chevron-right"></i> 
                {{$t('incomes')}}
              </router-link>
            </div>
          </div>
        </li>
         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/out">
                <i class="fa fa-chevron-right"></i> 
                {{$t('outlets')}}
              </router-link>
            </div>
          </div>
        </li>
         <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/orders">
                <i class="fa fa-chevron-right"></i> 
                {{$t('orders')}}
              </router-link>
            </div>
          </div>
        </li>
<!-- 
        <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/customers">
                <i class="fa fa-chevron-right"></i> 
                CUSTOMERS
              </router-link>
            </div>
          </div>
        </li> -->

        <!-- <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/payments">
                <i class="fa fa-chevron-right"></i> 
                PAYMENTS
              </router-link>
            </div>
          </div>
        </li> -->
         <!-- <li >
          <div class="row">
            <div class="col-md-12" >
              <router-link to="/reviews">
                <i class="fa fa-chevron-right"></i> 
                REVIEWS
              </router-link>
            </div>
          </div>
        </li> -->
      </ul>
    </div>

  </nav>

</template>

<script>
import { computed, onMounted, ref } from 'vue';

import { service } from '../../services/service';
import { useUsuarioStore } from '../../stores/useUsuarioStore';
// import router from '@/router';
import { useRouter } from 'vue-router'


import axios from 'axios';

export default {
  props: {
    isAction: {
      type: Boolean,
      default: false
    }
  },
  setup(){
    let user = ref('');
    //let sUsuario = useUsuarioStore();
    let arrModules = ref([]);
    //let vistaMenu = ref(false);
    let router = useRouter();
    
    user.value = service.getInformacionUsuario();
    let id_usuario = user.value.id_usuario;
    let id_sistema = user.value.id_sistema;
    let confirmado = user.value.confirmado; 
    

    //let showMenu = ()=> vistaMenu.value = !vistaMenu.value;

    let getModulos = async () => {
      let config = {
        headers: {
          userclient: `${process.env.VUE_APP_USER_CLIENT}`,
          token: service.getToken()
        }
      }
      let result = await axios.get(`${process.env.VUE_APP_URL_APP}/usuarioModuloRol/${id_usuario}/${id_sistema}`, config);

      if(result.data?.content && result.data.content.length > 0){
        arrModules.value = result.data.content;
      }
      else{
        console.log("SIN MODULOS ASIGNADOS");
      }
    }

    let FilterMenu = computed(() => arrModules.value.filter( x => x.id_padre == 0 ))

    let FilterSubMenu = (id_menu) => {
      return arrModules.value.filter( x => x.id_padre == id_menu );
    }
    let irInicio=()=>{
     
      router.push({ path: "/home" });
      
    }
    // onMounted(() => {
    //   getModulos();
    // });

    return { 
      FilterMenu,
      FilterSubMenu,
      //vistaMenu,
      //showMenu,
      irInicio,
      confirmado,
    }

  }
}
</script>