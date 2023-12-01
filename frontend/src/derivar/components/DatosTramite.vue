<template>
  <div>
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS PERSONA</p>
        <div class="row dp-table">
          <div class="col-12 col-md-9">
            <label class="frm-label">NOMBRES Y APELLIDOS:</label><br>
            {{datos.nombres}}
          </div>
          <div class="col-12 col-md-3">
            <label class="frm-label">NRO. DE DOCUMENTO:</label><br>
            {{datos.nro_documento}}
          </div>
        </div>
        <div class="row dp-table">
          <div class="col-12 col-md-9">
            <label class="frm-label">CODIGO DE INICIO:</label><br>
            {{datos.cod_inicio}}
          </div>
          <div class="col-12 col-md-3">
            <label class="frm-label">ESTADO:</label><br>
            ...
          </div>
        </div>
        <div class="row dp-table">
          <div class="col-12 col-md-9">
            <label class="frm-label">TRÁMITE:</label><br>
            {{datos.tramite}}
          </div>
          <div class="col-12 col-md-3">
            <label class="frm-label">FECHA DE TRÁMITE:</label><br>
            {{ formatDate(datos.fecha_inicio_tramite)}}
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import useDatosTramite from '@/registro/composables/useDatosTramite'
import Loading from '@/components/Loading.vue'

import moment from 'moment';

export default {
  components: {
    Loading
  },
  setup() {
    const { isLoading, isError, datos, error } = useDatosTramite()
    
    let formatDate = (fecha) => {
      return moment(fecha).format('DD/MM/YYYY')
    }
  
    return{
      formatDate,
      isLoading, 
      isError, 
      datos, 
      error, 
    }

  }
}
</script>
