<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">SEGUIMIENTO DE TRÁMITES</h2>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">BÚSQUEDA</p>            
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">LUGAR:</label> <span class="lb-error" v-if="formError.lugar">Campo requerido</span>
                  <!-- <select class="form-control" v-model="busqueda.lugar" disabled> -->
                  <select class="form-control" v-model="busqueda.lugar">
                    <option value="">SELECCIONAR</option>
                    <option
                      v-for="(item, index) in oficinasLista"
                      :key="index"
                      :value="item.cod_oficina"
                      :class="{ error: formError.lugar }"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="frm-label">ÁREA:</label> <span class="lb-error" v-if="formError.cod_area">Campo requerido</span>
                  <select class="form-control" 
                    v-model="busqueda.cod_area"
                    :class="{ error: formError.cod_area }"
                  >
                    <option value="">SELECCIONAR</option>
                    <option
                      v-for="(item, index) in tipoAreaList"
                      :key="index"
                      :value="item.cod_area"
                    ><!-- :disabled="activarIndefinido" -->
                      {{ item.nombre }}
                    </option>
                  </select>
                  <!--
                  <div class="text-end">
                    <input
                      class="mt-2 mx-1"
                      type="checkbox"
                      v-model="busqueda.multa"
                    /><label>MULTAS</label>
                  </div>
                  -->
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">CÓDIGO DE INICIO</label>
                  <input
                    class="form-control"
                    placeholder="CÓDIGO DE INICIO"
                    v-model="busqueda.cod_inicio"
                  />
                </div>
                <div class="form-group">
                  <label class="frm-label">FECHA TRÁMITE</label>
                  <input type="date" class="form-control" 
                    v-model="busqueda.fecha"
                    :max="maxDate"
                    :class="{error: formError.fecha}" 
                    @change="ValidarFecha"
                  />
                  <p class="orange mt-2" v-if="formError.fecha"><strong>{{ formError.fecha }}</strong></p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">NOMBRES Y/O APELLIDOS</label>
                  <input
                    class="form-control"
                    placeholder="NOMBRES Y/O APELLIDOS"
                    v-model="busqueda.nombre"
                    @input="busqueda.nombre = $event.target.value.toUpperCase()"
                  />
                </div>
                <div class="form-group">
                  <label class="frm-label">NÚMERO DOCUMENTO</label>
                  <input class="form-control" placeholder="NRO. DOCUMENTO" v-model="busqueda.nro_documento" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mt-4">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    title="Buscar"
                    @click="Buscar"
                  >
                    <i class="fa fa-search"></i></button
                  >&nbsp;
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    title="Limpiar"
                    @click="Limpiar"
                  >
                    <i class="fa fa-eraser"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-sm table-hover">
      <thead class="thead-dark">
        <tr class="text-center">
          <th>COD. DE INICIO</th>
          <th>NOMBRE COMPLETO</th>
          <th>NACIONALIDAD</th>
          <th>TRÁMITE</th>
          <th>FECHA TRÁMITE</th>
          <th>OPCIÓN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in registroLista" :key="index">
          <td class="text-center">{{ item.cod_inicio }}</td>
          <td>
            {{item.nombres + " " + item.primer_apellido + " " + item.segundo_apellido||''}}<br>
            <span class="text-muted">{{ item.nro_documento }}</span><br />
            <span class="text-line-2">{{ item.tipo_documento }}</span>
          </td>
          
          <td class="text-center">{{ item.nacionalidad }}</td>
          <td>{{ item.tramite }}</td>
          <td class="text-center">{{ formatDate(item.fecha_reg) }}</td>
          <td class="text-center">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="Historial(item.id_proceso)"
              data-bs-toggle="modal"
              data-bs-target="#modalHistorial"
            >HISTORIAL</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!--Modal-->
    <div
      class="modal fade modal-xl"
      id="modalHistorial"
      data-bs-backdrop="static"
      ref="modalHistorial"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">HISTORIAL DEL TRÁMITE</div>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-3"><label class="frm-label">NOMBRE COMPLETO:</label></div>
                  <div class="col-md-9 text-view">{{ objTramite.nombres }} {{ objTramite.primer_apellido }} {{ objTramite.segundo_apellido || '' }}</div>
                </div>
                <div class="row">
                  <div class="col-md-3"><label class="frm-label">TIPO TRÁMITE:</label></div>
                  <div class="col-md-9 text-view">{{ objTramite.tramite }}</div>
                </div>
                <div class="row">
                  <div class="col-md-3"><label class="frm-label">FECHA TRÁMITE:</label></div>
                  <div class="col-md-9 text-view">{{ formatDate(objTramite.fecha_tramite) }}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row">
                  <div class="col-md-4"><label class="frm-label">COD. TRÁMITE:</label></div>
                  <div class="col-md-8 text-view">{{ objTramite.cod_inicio }}</div>
                </div>
                <div class="row">
                  <div class="col-md-4"><label class="frm-label">COD. REGISTRO:</label></div>
                  <div class="col-md-8 text-view">{{ objTramite.cod_registro || ''}}</div>
                </div>
                <div class="row">
                  <div class="col-md-4"><label class="frm-label">FECHA REGISTRO:</label></div>
                  <div class="col-md-8 text-view">{{ objTramite.fecha_registro ? formatDate(objTramite.fecha_registro):'' }}</div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-hover">
              <thead class="thead-dark">
                <tr class="text-center">
                  <th>USUARIO</th>
                  <th>OFICINA REMITE</th>
                  <th>ÁREA REMITE</th>
                 
                  <th>FECHA</th>
                  <th>OFICINA DESTINO</th>
                  <th>ÁREA DESTINO</th>
                  <th>ESTADO</th>
                  <th>OBSERVACIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in arrHistorial" :key="index">
                  <td>{{ item.usuario }}</td>
                  <td class="text-center">{{ item.oficina_remite_descripcion }}</td>
                  <td class="text-center">{{ item.area_remite_descripcion }}</td>

                  <td class="text-center">{{ formatDate(item.fecha_proceso) }}</td>
                  <td class="text-center">{{ item.oficina_destino_descripcion }}</td>
                  <td class="text-center">{{ item.area_destino_descripcion }}</td>
                  <td class="text-center">{{ item.estado }}</td>
                  <td class="text-center">{{ item.observacion }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="GeneraReporte()"
            >
              <i class="fa fa-file-export"></i> GENERAR REPORTE
            </button>&nbsp;
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa fa-close"></i> CERRAR
            </button>
          </div>
        </div>
      </div>
    </div>

    <Loading  v-show="isLoading" />
    <SinResultado v-show="msgShow" />

  </div>
  
</template>

<script>
import { ref, onMounted} from "vue";

import api from "@/services/api";
import { service } from '@/services/service';
import Loading from '@/components/Loading.vue';
import SinResultado from '@/components/SinResultado.vue';

import moment from "moment";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default {
  components:{
    Loading,
    SinResultado,
  },
  setup() {
    let maxDate = moment().format("YYYY-MM-DD");
    let formError = ref({});
    let busqueda = ref({
      lugar: '',
      cod_area: '',
      multa: false,
      cod_inicio: '',
      fecha: '',
      nombre: '',
      nro_documento: ''
    });
    let registroLista = ref([]);
    let arrHistorial = ref([]);

    let tipoAreaList = ref([]);
    let oficinasLista = ref([]);
    let areasLista = ref([]);
    let isLoading = ref(false);
    let msgShow = ref(false);
    let modalHistorial = ref(null);
    let objTramite = ref({});
    let idProceso = ref(0);

    let schemaForm = Yup.object().shape({
      lugar: Yup.string().required(),
      cod_area: Yup.string().required(),
    });
    let ValidarFecha = () => {
      let fecha = moment(busqueda.value.fecha);
      let fecha_inicial = moment('1900-01-01');
      let fecha_actual = moment();
      if (fecha_inicial < fecha && fecha < fecha_actual) {
        formError.value.fecha = null
      } else {
        formError.value.fecha = (moment(fecha_inicial).format("YYYY") > moment(fecha).format("YYYY")) ? 'LA FECHA NO PUEDE SER MENOR A 1900' : 'LA FECHA NO PUEDE SER MAYOR A LA ACTUAL';
      }
    }
    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY HH:mm:ss");
    }

    let Limpiar = () => {
      busqueda.value = {
        lugar: busqueda.value.lugar,
        cod_area: '',
        multa: false,
        cod_inicio: '',
        fecha: '',
        nombre: '',
        nro_documento: ''
      }
      registroLista.value = [];
    }

    let ValidaCamposBusqueda = () => {
      let valida = false;
      let area = busqueda.value.cod_area;
      if(area == ''){
        Swal.fire({
          text: "Selecciona el área",
          icon: "info",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: "#198754",
          allowOutsideClick: false,
        });
      }
      else{
        valida = true;
      }
      return valida;
    }

    let Buscar = async () => {
      try {
        // Valida campos
        idProceso.value = 0;
        formError.value = {};
        await schemaForm.validate(busqueda.value, { abortEarly: false});

        isLoading.value = true;
        let lugar = busqueda.value.lugar != "" ? busqueda.value.lugar :"-" ;
        let area = busqueda.value.cod_area != "" ? busqueda.value.cod_area :"-" ;
        let multa = busqueda.value.multa != "" ? busqueda.value.multa :"-" ;
        let cod_inicio = busqueda.value.cod_inicio != "" ? busqueda.value.cod_inicio :"-" ;
        let fecha = busqueda.value.fecha != "" ? busqueda.value.fecha :"-" ;
        let nombre = busqueda.value.nombre != "" ? busqueda.value.nombre :"-" ;
        let nro_documento = busqueda.value.nro_documento != "" ? busqueda.value.nro_documento :"-" ;
        
        await api.get(`/getSeguimiento/${lugar}/${area}/${multa}/${cod_inicio}/${fecha}/${nombre}/${nro_documento}`).then((response) => {
          registroLista.value = response.data.contenido;
          if(registroLista.value.length > 0){
            msgShow.value = false;
          }
          else{
            msgShow.value = true;
          }
        });
        isLoading.value = false;
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        });
      }

    }

    let Historial = async (id_proceso) => {
      idProceso.value = id_proceso;
      let result = await api.get(`/getHistorial/${id_proceso}`);
      if(result.status == 200 && result.data.codigo == 1){
        objTramite.value = registroLista.value.find(x => x.id_proceso == id_proceso);
        arrHistorial.value = result.data.contenido;
      }
    }

    let GeneraReporte = async() => {
      let config = {responseType: 'blob'}
      let result = await api.get(`/getDocumentoHistorial/${idProceso.value}`, config);
      if( result.status === 200){
          const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "blob"})
          );
          let link = document.createElement("a")
          link.href = url;
          let title = `historial.pdf`;
          link.setAttribute("download", title);
          document.body.appendChild(link);
          link.click();
        }
    }

    let fetchOficinasLista = () => api.get('/getOficinas').then((response) => {
      oficinasLista.value = response.data.contenido
    })

    let fetchAreaLista = () => api.get('/getAreas/D').then((response) => {
      areasLista.value = response.data.contenido
    })

    let fetchAreaInst = () => api.get('/getAreas/D').then((response) => {
      tipoAreaList.value = response.data.contenido
    })

    let Service = () => {
      let datos = service.getInformacionUsuario()
      busqueda.value.lugar = datos.cod_oficina
    }
    
    onMounted(() => {
      fetchOficinasLista();
      fetchAreaLista();
      fetchAreaInst();
      Service();
    });

    return {
      formatDate,
      Buscar,
      ValidarFecha,
      maxDate,
      Limpiar,
      formError,
      registroLista,
      busqueda,
      tipoAreaList,
      oficinasLista,
      areasLista,
      isLoading,
      msgShow,
      Historial,
      arrHistorial,
      objTramite,
      modalHistorial,
      GeneraReporte,
      idProceso
    }
  },
};

</script>
