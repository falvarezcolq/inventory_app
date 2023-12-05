<template>
  <div class="busqueda">
    <div class="busqueda_seccion">
      <p class="title">DATOS PERSONA</p>
      <div class="row">
        <div class="col-12 col-md-8">
          <label>NOMBRES Y APELLIDOS INTERESADO(A):</label> {{datosTramite.nombres}}<br />
          <label>CODIGO DE INICIO:</label> {{datosTramite.cod_inicio}}<br />
          <label>TRÁMITE:</label> {{datosTramite.tramite}}
        </div>
        <div class="col-12 col-md-4">
          <label>NRO. DE DOCUMENTO:</label> {{datosTramite.nro_documento}}<br />
          <label>ESTADO:</label> ...<br />
          <label>FECHA DE TRÁMITE:</label> {{ formatDate(datosTramite.fecha_inicio_tramite)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRegistroStore } from '../stores/useRegistroStore'
import api from "../services/api";
import moment from "moment";

export default {
  setup(){
    let datosTramite = ref({
      nombres: '',
      cod_inicio: '',
      tramite: '',
      nro_documento: ''
    });

    let sRegistro = useRegistroStore();
    let id_proceso = sRegistro.getIDProceso

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY");
    }

    let fetchDatosTramite = async () => {
      await api.get(`/getRegistroTramite_/${id_proceso}`).then((response) => {
        datosTramite.value = response.data.content
      });
    }

    onMounted(fetchDatosTramite)

    return{
      datosTramite, 
      formatDate,
    }
  }
}
</script>