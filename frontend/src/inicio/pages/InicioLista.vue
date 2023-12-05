<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3"><h2 class="text-center">INICIO DE TRÁMITE</h2></div>
    </div>

    <div class="row mb-3">
      <div class="col-md-2">
        <button class="btn btn-outline-success btn-sm" @click="NuevoRegistro">
          <i class="fa fa-file"></i> NUEVO TRÁMITE
        </button>
      </div>
      <div class="col-md-10">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">BÚSQUEDA:</p>
            <div class="row">
              <div class="col-md-3">
                <input class="form-control block" placeholder="NRO DOCUMENTO" 
                  v-model="datos.nro_documento"/>
              </div>
              <div class="col-md-3">
                <select class="form-control"
                v-model="datos.nacionalidad"
                >
                  <option value="-">NACIONALIDAD</option>
                  <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">{{item.nombre_pais}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <!-- <select class="form-control"
                v-model="datos.id_tramite"
                >
                  <option value="0">TRAMITE</option>
                </select> -->
              </div>

              <div class="col-md-3">
                <button type="button" 
                  class="btn btn-sm btn-outline-primary"
                  title="Buscar"
                  @click="Buscar"
                >
                  <i class="fa fa-search"></i>
                </button>&nbsp;
                <button type="button" 
                  class="btn btn-sm btn-outline-secondary"
                  title="Limpiar"
                  @click="Limpiar"
                >
                  <i class="fa fa-eraser"></i>
                </button>
              </div>

            </div>
            <div class="row mt-2">
              <div class="col-md-3">
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="datos.fecha_inicio"
                  :max="maxDate"
                  @change="ValidarFechaInicio"
                  :class="{error: formError.fecha_inicio}"
                />
                <p class="orange mt-2" v-if="formError.fecha_inicio"><strong>{{ formError.fecha_inicio }}</strong></p>
              </div>
              <div class="col-md-3">
                <input type="date" 
                  class="form-control"
                  v-model="datos.fecha_fin"
                  :max="maxDate"
                  @change="ValidarFechaFin"
                  :class="{error: formError.fecha_fin}"
                  />
                  <p class="orange mt-2" v-if="formError.fecha_fin"><strong>{{ formError.fecha_fin }}</strong></p>
              </div>
              <div class="col-md-3"></div>
              <div class="col-md-3"></div>
            </div>
          </div>
        </div>  
      </div>
    </div>

    <!-- <div class="table-wrapper"> -->
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>NRO</th>
            <th>CÓDIGO INICIO</th>
            <th>NOMBRE COMPLETO</th>
            <th>NRO DOCUMENTO</th>
            <th>NACIONALIDAD</th>
            <th>TRÁMITE</th>
            <th>FECHA INICIO TRÁMITE</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in inicioLista" :key="index">
            <td class="text-center">{{index+1}}</td>
            <td :class="{'red': item.cod_inicio==null}">{{ item.cod_inicio || '---' }}</td>
            <td>{{item.nombres +' '+ item.primer_apellido +' '+ item.segundo_apellido}}</td>
            <td>
              {{item.nro_documento}}<br />
              <span class="text-muted">{{item.tipo_documento}}</span>
            </td>
            <td>{{item.nacionalidad}}</td>
            <td>{{item.tramite}}</td>
            <td class="text-center">{{formatDate(item.fecha_reg)}}</td>
            <td class="text-center" :class="{'red': item.id_estado == 0, 'green': item.id_estado == 1, 'orange': item.id_estado == 2}">{{item.descripcion_est}}</td>
            <td class="text-center">
              <button type="button" 
                class="btn btn-outline-danger btn-sm" 
                title="Cancelar Trámite"
                @click="DatoTramite(item.id_proceso)"
                data-bs-toggle="modal"
                data-bs-target="#modalCancelar"
                v-if="item.id_estado!=2"
              >
                <i class="fa fa-close"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </div> -->

    <!--Modal-->
    <div class="modal fade" id="modalCancelar" data-bs-backdrop="static" ref="modalCancelar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">CANCELACIÓN DE TRÁMITE</div>
            <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <p><b>NOMBRE COMPLETO</b><br> {{datosTramite.nombres}} {{datosTramite.primer_apellido}} {{datosTramite.segundo_apellido}} - {{datosTramite.nro_documento}}</p>
            <p><b>TRÁMITE:</b><br> {{datosTramite.tramite}}</p>
            <p><b>MOTIVO DE CANCELACIÓN DEL TRÁMITE:</b> <span class="lb-error" v-if="formError.motivo">Campo requerido</span></p>
            <textarea class="form-control" name="" id="" cols="30" rows="4" 
            v-model="descripcion.motivo"
              :class="{error: formError.motivo}"
              @input="descripcion.motivo=$event.target.value.toUpperCase()"
            ></textarea>
            <!-- <p><strong>Nota:</strong> maximo de caractes 200.</p> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success btn-sm" 
              @click="CancelarTramite(datosTramite.id_proceso)"
            ><i class="fa fa-save"></i> ACEPTAR
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal"
            ><i class="fa fa-close"></i> CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
    
    <SinResultado v-show="msgShow" />
    <Loading  v-show="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import api from '@/services/api'
import Loading from '@/components/Loading.vue';
import SinResultado from '@/components/SinResultado.vue';

import moment from 'moment'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { Modal } from 'bootstrap'

export default{
  components:{
    Loading,
    SinResultado,
  },
  setup(){
    const inicioLista = ref([])
    const router = useRouter()
    const datos = ref({
      nro_documento: '',
      nacionalidad: '-',
      id_tramite: 0,
      fecha_inicio: moment().subtract(2,'days').format('YYYY-MM-DD'),
      fecha_fin: moment().format('YYYY-MM-DD')
    })
    let maxDate = moment().format('YYYY-MM-DD');
    let datosTramite = ref({});
    let descripcion = ref({motivo: ''})
    let formError = ref({});
    let modalCancelar = ref(null);
    let nacionalidadList = ref([]);
    let isLoading = ref( false );
    let msgShow = ref( false );

    let schemaForm = Yup.object().shape({
      motivo: Yup.string().required()
    })
    let ValidarFechaInicio = () => {
      let fecha_inicio = moment(datos.value.fecha_inicio);
      let fecha_inicial = moment('1900-01-01');
      let fecha_actual = moment();
      if (fecha_inicial < fecha_inicio && fecha_inicio < fecha_actual) {
        formError.value.fecha_inicio = null
      } else {
        formError.value.fecha_inicio = (moment(fecha_inicial).format("YYYY") > moment(fecha_inicio).format("YYYY")) ? 'LA FECHA NO PUEDE SER MENOR A 1900' : 'LA FECHA NO PUEDE SER MAYOR A LA ACTUAL';
      }
    }
    let ValidarFechaFin = () => {
      let fecha_fin = moment(datos.value.fecha_fin);
      let fecha_inicial = moment('1900-01-01');
      let fecha_actual = moment();
      if (fecha_inicial < fecha_fin && fecha_fin < fecha_actual) {
        formError.value.fecha_fin = null
      } else {
        formError.value.fecha_fin = (moment(fecha_inicial).format("YYYY") > moment(fecha_fin).format("YYYY")) ? 'LA FECHA NO PUEDE SER MENOR A 1900' : 'LA FECHA NO PUEDE SER MAYOR A LA ACTUAL';
      }
    }
    let fetchInicioLista = async () => {
      try {
        let nro_documento = datos.value.nro_documento;
        let nacionalidad = datos.value.nacionalidad;
        let id_tramite = datos.value.id_tramite;
        let fecha_inicio = datos.value.fecha_inicio;
        let fecha_fin = datos.value.fecha_fin;
        if(nro_documento == ''){
          nro_documento = '-';
        }
  
        let result = await api.get(`/getInicio/${nro_documento}/${nacionalidad}/${id_tramite}/${fecha_inicio}/${fecha_fin}`).then((response) => {
          inicioLista.value = response.data.content;
        }); 
      } catch (error) {
        console.log('**[ERROR GENERACION DE LISTA]**');        
      }
    }

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY HH:mm:ss");
    }

    let NuevoRegistro =  () => {
      //router.push({path: "/inicio"})
      // router.push({path: "/persona"})
      router.push({path: "/tramites"})
    }

    let CancelarTramite = async(id_proceso) => {
      try{
        await schemaForm.validate(descripcion.value, { abortEarly: false })

        Swal.fire({
          text: "¿Desea realizar la baja del trámite?", 
          icon: "question", 
          confirmButtonText: "ACEPTAR",
          showCancelButton: true,
          cancelButtonText:"CANCELAR", 
          confirmButtonColor: "#198754", 
          allowOutsideClick: false 
        }).then((result) => {
          if(result.isConfirmed){
            Cancelar(id_proceso)
          }
        });
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
      }
    }

    let Cancelar = async (id_proceso) => {
      try {
        let data = { 
          id_proceso, 
          motivo: descripcion.value.motivo
        }
        let result = await api.put('/cancelarTramite', data);  
        if(result.status === 200 && result.data.code == 1){
          Swal.fire({text: "Trámite fue dado de baja correctamente.", icon: "success", confirmButtonText: "ACEPTAR", confirmButtonColor: "#198754", allowOutsideClick: false })
          descripcion.value.motivo = ''
          Modal.getInstance(modalCancelar.value).hide()
        }
        fetchInicioLista()
      } catch (err) {
        console.log("**[ERROR CANCELAR TRÁMITE]**");        
      }      
    }

    let Limpiar = () => {
      datos.value = {
        nro_documento: '',
        nacionalidad: '-',
        id_tramite: 0,
        fecha_inicio: moment().subtract(2,'days').format('YYYY-MM-DD'),
        fecha_fin: moment().format('YYYY-MM-DD')
      }
    }  

    let Buscar = async () => {
      try {
        isLoading.value = true;
        let nro_documento = datos.value.nro_documento;
        let nacionalidad = datos.value.nacionalidad;
        let id_tramite = datos.value.id_tramite;
        let fecha_inicio = datos.value.fecha_inicio;
        let fecha_fin = datos.value.fecha_fin;
        if(nro_documento == ''){
          nro_documento = '-';
        }
        await api.get(`/getInicioTramite/${nro_documento}/${nacionalidad}/${id_tramite}/${fecha_inicio}/${fecha_fin}`).then((response) => {
          inicioLista.value = response.data.content;
          if(inicioLista.value.length == 0){
            msgShow.value = true;
          }
          else{
            msgShow.value = false;
          }
          isLoading.value = false;
        }); 
      } catch (error) {
        isLoading.value = false;
        console.log('**[ERROR EN BUSQUEDA]**');
      }
    }

    let DatoTramite = (id_proceso) => {
      datosTramite.value = inicioLista.value.find(x => x.id_proceso == id_proceso)
    }
    
    let fetchNacionalidad = () => api.get('/getNacionalidad').then((response) => {
      nacionalidadList.value = response.data.content
    })

    onMounted(() => {
      fetchNacionalidad();
      //fetchInicioLista()
    })

    return{ 
      inicioLista, 
      formatDate, 
      NuevoRegistro, 
      CancelarTramite, 
      Buscar, 
      datos, 
      maxDate, 
      Limpiar, 
      DatoTramite,
      datosTramite,
      descripcion,
      formError,
      Cancelar,
      modalCancelar,
      nacionalidadList,
      isLoading,
      msgShow,
      ValidarFechaInicio,
      ValidarFechaFin,
    }
        
  }
  
}
</script>
