<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">SEGUIMIENTO DE TRÁMITE</h2>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12 col-md-12">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">BÚSQUEDA POR CODIGO O NOMBRE</p>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Ingrese palabra o codigo a buscar" aria-label="Buscar Palabra" aria-describedby="button-addon2"
              v-model="buscarPalabra"
              >
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="Buscar">Buscar</button>
            </div>        
          </div>
        </div>
      </div>
    </div>

    <table class="table table-sm table-responsive table-bordered table-hover table-striped">
      <thead class="thead-dark">
        <tr class="text-center">
          <th>#</th>
          <th>NOMBRE COMPLETO</th>
          <th>NRO. DOCUMENTO</th>
          <th>NACIONALIDAD</th>
          <th>TRÁMITE</th>
          <th>FECHA TRÁMITE</th>
          <th>VER</th>
        </tr>
      </thead>     
      <tbody>
        <tr v-for="(item,index) in procesoLista" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ item.nombres +' '+ item.primer_apellido +' '+ item.segundo_apellido }}</td>
          <td>{{ item.nro_documento }}</td>
          <td>{{ item.nombre_pais }}</td>
          <td>{{ item.tramite }}</td>
          <td>{{ formatDate(item.fecha_inicio_tramite) }}</td>
          <td>
           <div class="justify-content-center">
            <button class="btn btn-primary botonMostrar" data-bs-toggle="modal" data-bs-target="#mostrarSeguimiento" @click="mostrarDatos(item.id_proceso)" >Ver</button>
           </div>
          </td>
        </tr>        
      </tbody>
    </table>

    <!--Modal-->
    <div
      class="modal fade modal-xl"
      id="mostrarSeguimiento"
      tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">SEGUIMIENTO DE TRÁMITE</div>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row"> 
              <div class="col col-md-4" v-for="datos in datosMostrar" :key="datos">
                <div class="card" style="width: 18rem;" >
                  <div class="card-header">
                   <h3>{{ datos.nombre_est }}</h3>
                   <p><b>{{ datos.cod_inicio }}</b></p>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ datos.nombres }}</h5>
                    <p class="card-text"><b>Oficina Remite: </b>{{ datos.cod_oficina_remite }}</p>
                    <p class="card-text"><b>Oficina Destino: </b>{{ datos.cod_oficina_destino }}</p>
                    <p class="card-text"><b>Area Remite: </b>{{ datos.cod_area_remite }}</p>
                    <p class="card-text"><b>Area Destino: </b>{{ datos.cod_area_remite }}</p>
                    <p class="card-text"><b>Fecha Inicio: </b>{{ formatDate(datos.fecha_inicio_tramite) }}</p>
                  </div>
                </div>               
              </div>
            </div>                      
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-success btn-sm"
            >
              <i class="fa fa-save"></i> ACEPTAR
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa fa-close"></i> CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import api from "../../services/api";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  setup() {
 
    let buscarPalabra = ref("")
    let procesoLista = ref({})
    let datosMostrar= ref({})
    let Limpiar = () => {
      buscarPalabra.value ='';
    }

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY");
    }

    let mostrarDatos=async(datos)=>{
      try {      
        await api.get(`/getHistorial/${datos}`)
          .then((response) => {
            datosMostrar.value = response.data.content;            
        })  
      } catch (err) {
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
      }
    }

    let Buscar = async () => {
      try {  
        if (buscarPalabra.value == "") {
          buscarPalabra.value = "-";
        }      
        await api.get(`/getSeguimiento/${buscarPalabra.value}`)
          .then((response) => {
            procesoLista.value = response.data.content;            
        })  
      } catch (err) {
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
      }
      
    }


    return {
      Buscar,
      formatDate,
      mostrarDatos,
      datosMostrar,
      procesoLista,
      buscarPalabra
    }
  },
};

</script>
<style scoped>
.botonMostrar{
  height: 25px;
  padding: 0;
  margin: 0;
}
.alinear{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
