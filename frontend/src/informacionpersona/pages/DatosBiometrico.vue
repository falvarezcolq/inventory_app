<template>
  <div>
    <h2 class="text-center">REGISTRO Y CAPTURA DE DATOS</h2>
    
    <DatosTramite />
    
    <div class="row mt-2">
      <div class="col-12 col-md-12">
        <button type="button" class="btn btn-outline-primary btn-sm" @click="Actualizar">
          <i class="fa fa-redo-alt"></i> ACTUALIZAR PARA VISUALIZAR IMAGENES
        </button>
      </div>
    </div>

    <div class="row">
      <div class="mt-2 col-md-4 col-ms-6 col-lg-3" v-for="img in fotosImagenes" :key="img.id">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">
              <span v-if="img.par_tipo_imagen=='FOT'">FOTOGRAFIA</span>
              <span v-if="img.par_tipo_imagen=='FOTI'">FOTOGRAFIA DE INICIO</span>
              <span v-if="img.par_tipo_imagen=='FIR'">FIRMA</span>
              <span v-if="img.par_tipo_imagen=='HPI'">HUELLA PULGAR IZQUIERDO</span>
              <span v-if="img.par_tipo_imagen=='HPD'">HUELLA PULGAR DERECHO</span>
              <span v-if="img.par_tipo_imagen=='HDII'">HUELLA DEDO INDICE IZQUIERDO</span>
              <span v-if="img.par_tipo_imagen=='HDID'">HUELLA DEDO INDICE DERECHO</span>
            </p>
            <div class="card" style=" width: 100%;height: auto; ">
              <img
                :src="`data:image/png;base64,${img.imagen}`"
                        
                alt="url internet"
              />
            </div>            
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12" style="text-align: right">
      <button type="button" class="btn btn-outline-success btn-sm" @click="Continuar">
        <i class="fa fa-save"></i> CONTINUAR
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import api from "@/services/api";
import { useRegistroStore } from '@/stores/useRegistroStore'
//import DatoPersona from "@/registro/components/DatoPersona.vue";
import DatosTramite from '@/registro/components/DatosTramite.vue'
import { Mensaje } from "@/tools/Mensaje";

export default {
  components: {
    DatosTramite
  },
  setup() {
    let fotosImagenes = ref([]);
    const router = useRouter();
    let sRegistro = useRegistroStore();
    let id_proceso = sRegistro.getIDProceso;
    let tramite = ref(null);

    const getFoto = ()=>{
      return  fotosImagenes.value.find( x => x.par_tipo_imagen === 'FOT');
    }
    const getPulgarIzquierdo = ()=>{
      return  fotosImagenes.value.find( x => x.par_tipo_imagen === 'HPI');
    }
    const getPulgarDerecho = () =>{
      return  fotosImagenes.value.find( x => x.par_tipo_imagen === 'HPD');
    }
    const getFirma = () =>{
      return  fotosImagenes.value.find( x => x.par_tipo_imagen === 'FIR');
    }

    const getHuellas = ()=>{
      return fotosImagenes.value.filter( x => x.par_tipo_imagen.substring(0,1) === 'H');
    }

    const validar = () =>{
      
      if (!tramite.value){
         return false
      }
      
      if ( tramite.value.clas4.substring(0,3) == 'TVF'){
        let foto = getFoto();
        if( !foto ){
          Mensaje.error("Debe registrar La fotografia del ciudadano para continuar")
          return false;
        }
      
      }


       
      if (tramite.value.clas4 == 'TRIP'){
        if (fotosImagenes.value.length==0){
            Mensaje.error("Debe actualizar para obtener imagenes registradas.")
            return false;
          }
        let foto = getFoto();
        let imagenPulgarIzquierdo = getPulgarIzquierdo();
        let imagenPulgarDerecho = getPulgarDerecho();
        let firma = getFirma();

        if (!(foto && imagenPulgarIzquierdo && imagenPulgarDerecho && firma)){
          
          let mensaje = ''
          if (!foto){
            mensaje = mensaje + "Debe registrar La fotografia del ciudadano <br/>";}
          if (!imagenPulgarIzquierdo){
            mensaje = mensaje + "Debe registrar el Pulgar Derecho del ciudadano <br/>";}
          if (!imagenPulgarDerecho){
            mensaje = mensaje + "Debe registrar el Pulgar Izquierdo del ciudadano <br/>";}
          if (!firma){
           mensaje = mensaje + "Debe registrar la firma del ciudadano del ciudadano <br/>";}
          Mensaje.error(mensaje)
          return false;

        }

      }
      return true;
    }



    const Continuar = () => {
      if (validar()==true){
        router.push({ path: "/recaudaciones" });
      }
    }

    const Actualizar = async ()=> {      
      await api.get(`/getImagenes/${id_proceso}`).then(response => {
        fotosImagenes.value = response.data.content;
      });
    }

    let getTramite = async () =>{
      let result = await api.get(`/getTramiteProceso/${id_proceso}`).then((response) => {
        tramite.value = response.data.content;
      });
    } 
    
    onMounted(getTramite);
  
    return {
      Continuar,
      fotosImagenes,
      Actualizar
    }
  }
};
</script>