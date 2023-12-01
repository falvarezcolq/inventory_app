<template>
  <div class="busqueda">
    <div class="busqueda_seccion">
      <p class="title">DATOS PERSONA</p>
      <div class="row">
        <div class="col-12 col-md-8">
          <label >NOMBRES Y APELLIDOS INTERESADO(A):</label> {{datosTramite.nombres}}<br />
          <label >CODIGO DE INICIO:</label> {{datosTramite.cod_inicio}}<br />
          <label >CODIGO DE REGISTRO:</label> {{datosTramite.nro_form}} <br />
          <label >ESTADO:</label> {{datosTramite.descripcion_est}}<br />
          <label >TRÁMITE:</label> {{datosTramite.tramite}}
        </div>
        <div class="col-12 col-md-4">
          <label >NRO. DE DOCUMENTO:</label> {{datosTramite.nro_documento}}<br />
          <label >TIPO DE DOCUMENTO:</label> {{datosTramite.tipo_documento}}<br />
          <label >FECHA DE NACIMIENTO:</label> {{formatDate (datosTramite.fecha_nacimiento)}}<br />
          <label >NACIONALIDAD:</label> {{datosTramite.nacionalidad}}<br />          
          <label >FECHA DE TRÁMITE:</label> {{ formatDate(datosTramite.fecha_inicio_tramite)}}<br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useProcesoStore } from '@/stores/useProcesoStore'
import api from "@/services/api";
import moment from "moment";
export default {

  setup(){

    let datosTramite = ref({});
    let sProceso = useProcesoStore();
    let id_proceso = sProceso.getIDProceso

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY");
    }

    let fetchDatosTramite = async () => {
      let result = await api.get(`/getProceso/${id_proceso}`).then((response) => {
        datosTramite.value = response.data.contenido;
      });
    }

    onMounted(fetchDatosTramite)

    return{
      datosTramite, formatDate,
    }
  }
}
</script>