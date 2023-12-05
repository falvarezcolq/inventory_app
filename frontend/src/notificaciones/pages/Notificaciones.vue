<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>NOTIFICACIONES</h2>
      </div>
    </div>
    <div class="row" v-for="item in notificaciones" :key="item.id_notificacion" >
      <div class="col-md-12 mt-3">
        <div class="card card-hover">
          <div class="card-body">
           <div class="row">
              <div class="col card-icon">
                <i class="fa fa-bell"></i>
              </div>    
              <div class="col card-text" style="width: 100px;">
              <p>
                  <span class="text-title">
                  EL TRAMITE: <b>{{ item.tramite }}</b>
                  </span>

                  con el NRO DE TRAMITE : {{ item.id_proceso_inicio }}

                  <span v-if="item.cod_notificacion == 'PI_APROBADO'">
                    ha sido <b>Aprobado</b>
                  </span>

                  <span v-if="item.cod_notificacion == 'PI_OBSERVADO'">
                    ha sido <b>Observado</b>
                  </span>
                  
                  <span v-if="item.cod_notificacion == 'PI_CANCELADO'">
                    ha sido <b>Cancelado</b>
                  </span>
                  <br>
                  <br>Mensaje:
                  <span>
                  {{ item.content }}
                  </span>
              </p>
              <div class="fecha">
                {{ moment(item.fecha_reg).format("YYYY-MM-DD HH:mm") }}
              </div>
           </div> 
           </div>
          </div>
        </div>
      </div>

    </div>

    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import {ref} from 'vue';
import api from '@/services/api';
import Loading from '@/components/Loading.vue';
import { onMounted } from 'vue';
import moment from 'moment';
export default {
  components:{
    Loading,
  },
  data(){
    let notificaciones = ref([]);
    let isLoading = ref(false);


    let getNotificaciones = async ()=>{
      isLoading.value = true;
      await api.get('/notificaciones').then(res=>{
        isLoading.value = false;
        notificaciones.value=res.data.content;
      }).catch(err=>{
        console.log(err);
        isLoading.value=false;
      })
    }

    onMounted(async()=>{
      await getNotificaciones();
    })
    return {
      isLoading,
      notificaciones,
      moment,
    }
  }
}


</script>
<style>
.card-body{
  /* display: inline-block; */
}
.card-icon{
  width:50px; 
  flex: 0 0 50px;
  /* padding: 10px; */
  font-size:1.5rem;
  color:#7c7c7c;
  /* display:inline-block; */
}

.card-text{
  width: 80%;
  /* display:inline-block; */
}

.card-hover:hover {
  background-color: #eff7ff;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}


.card-viewed{
  background-color: #e7e7e7;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

</style>