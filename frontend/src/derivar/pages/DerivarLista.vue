<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">DERIVAR TRÁMITE</h2>
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
                  <label class="frm-label">LUGAR:</label> <span class="lb-error" v-if="formError.lugar">Campo
                    requerido</span>
                  <select class="form-control" v-model="busqueda.lugar" :class="{ error: formError.lugar }">
                    <option value="">SELECCIONAR</option>
                    <option v-for="(item, index) in oficinasLista" :key="index" :value="item.cod_oficina">
                      {{ item.nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="frm-label">ÁREA:</label> <span class="lb-error" v-if="formError.cod_area">Campo
                    requerido</span>
                  <select class="form-control" v-model="busqueda.cod_area" :class="{ error: formError.cod_area }">
                    <option value="">SELECCIONAR</option>
                    <option v-for="(item, index) in areasLista" :key="index" :value="item.cod_area">
                      {{ item.nombre }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">CÓDIGO DE INICIO</label>
                  <input class="form-control" placeholder="CÓDIGO DE INICIO" v-model="busqueda.cod_inicio" />
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
                  <input class="form-control" placeholder="NOMBRES Y/O APELLIDOS" v-model="busqueda.nombre" />
                </div>
                <div class="form-group">
                  <label class="frm-label">NÚMERO DOCUMENTO</label>
                  <input class="form-control" placeholder="NRO. DOCUMENTO" v-model="busqueda.nro_documento" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mt-4">
                  <button type="button" class="btn btn-sm btn-outline-primary" title="Buscar" @click="Buscar">
                    <i class="fa fa-search"></i></button>&nbsp;
                  <button type="button" class="btn btn-sm btn-outline-secondary" title="Limpiar" @click="Limpiar">
                    <i class="fa fa-eraser"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Grid-->
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>COD. DE INICIO</th>
            <th>NOMBRE COMPLETO</th>
            <th>NRO. DOCUMENTO</th>
            <th>NACIONALIDAD</th>
            <th>TRÁMITE</th>
            <th>FECHA TRÁMITE</th>
            <th>MARCAR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in registroLista" :key="index">
            <td class="text-center">{{ item.cod_inicio }}</td>
            <td>
              {{
                item.nombres +
                " " +
                item.primer_apellido +
                " " +
                item.segundo_apellido
              }}
            </td>
            <td>
              {{ item.nro_documento }}<br />
              <span class="text-muted">{{ item.tipo_documento }}</span>
            </td>
            <td>{{ item.nacionalidad }}</td>
            <td>{{ item.tramite }}</td>
            <td class="text-center">{{ formatDate(item.fecha_reg) }}</td>
            <td class="text-center">
              <input 
              type="checkbox" 
              :id="item.id_proceso" 
              :name="item.id_proceso" 
              :value="item.id_proceso"
              v-model="objRegistro" 
              class="check-box-req" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <SinResultado v-show="msgShow" />

    <div class="row">
      <div class="col-md-12" style="text-align: right">
        <button type="button" class="btn btn-outline-success btn-sm" @click="Derivar">
          <i class="fa fa-square-check"></i> DERIVAR</button>&nbsp;
      </div>
    </div>

    <!--Modal-->
    <div class="modal fade modal-lg" id="modalDerivar" data-bs-backdrop="static" ref="modalDerivar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">DERIVAR TRÁMITE</div>
            <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <p>
              <b>COD. DE INICIO:</b><br />
              <span v-for="(item, index) in objCodInicio" :key="index">{{ index + 1 < objCodInicio.length ?
                item.cod_inicio + ', ' : item.cod_inicio }}</span>
            </p>
            <p>
              <b>MOTIVO/DESCRIPCIÓN:</b> <span class="lb-error" v-if="formError.motivo">Campo requerido</span><br>
              <textarea class="form-control" name="" id="" cols="30" rows="3" v-model.trim="descripcion.motivo"
                :class="{ error: formError.motivo }"
                @input="descripcion.motivo = $event.target.value.toUpperCase()"></textarea>
            </p>
            <!-- <p><strong>Nota:</strong> maximo de caractes 200.</p> -->
            <div class="row">
              <div class="col-md-7">
                <label for="">ÁREA</label>
                 <span class="lb-error" v-if="formError.cod_area">Campo requerido</span><br>
                <select 
                class="form-control" 
                v-model="descripcion.cod_area" 
                :class="{ error: formError.cod_area }">
                  <option value="">SELECCIONAR</option>
                  <option v-for="(item, index) in areasDerivacion" :key="index" :value="item.cod_area">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>
              <div class="col-md-5">
                <input type="checkbox" v-model="habilitarCodOficina" id="habilitar"> <label for="habilitar">LUGAR</label>
                <span class="lb-error" v-if="formError.cod_oficina">Campo requerido</span>
                <select class="form-control" v-model="descripcion.cod_oficina" :class="{ error: formError.cod_oficina }"
                  :disabled="!habilitarCodOficina">
                  <option value="">SELECCIONAR</option>
                  <option v-for="(item, index) in oficinasLista" :key="index" :value="item.cod_oficina">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success btn-sm" @click="DerivarTramite">
              <i class="fa fa-save"></i> ACEPTAR
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
              <i class="fa fa-close"></i> CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>

    <Loading v-show="isLoading" />

  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import api from "@/services/api";
import { service } from '@/services/service';
import Loading from '@/components/Loading.vue';
import SinResultado from '@/components/SinResultado.vue';

import moment from "moment";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Modal } from 'bootstrap';
import { Mensaje } from "@/tools/Mensaje";

export default {
  components: {
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
    let datosTramite = ref({});
    let descripcion = ref({
      motivo: '',
      cod_area: '',
      cod_oficina: ''
    });
    let objRegistro = ref([]);
    let oficinasLista = ref([]);
    let areasLista = ref([]);
    let isLoading = ref(false);
    let msgShow = ref(false);
    let modalDerivar = ref(null);
    let objCodInicio = ref([]);
    let habilitarCodOficina = ref(false);
    let areasDerivacion = ref([]);

    /* Validacion de campo */
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
        cod_inicio: '',
        fecha: '',
        nombre: '',
        nro_documento: ''
      }
    }

    let validarFormBusqueda = async () => {
      try {
        await schemaForm.validate(busqueda.value, { abortEarly: false });
        return true;
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        });
        return false;
      }
    }

    let Buscar = async () => {

      if (await validarFormBusqueda()) {
        try {
          isLoading.value = true;
          let lugar = busqueda.value.lugar != "" ? busqueda.value.lugar : "-";
          let area = busqueda.value.cod_area != "" ? busqueda.value.cod_area : "-";
          let cod_inicio = busqueda.value.cod_inicio != "" ? busqueda.value.cod_inicio : "-";
          let fecha = busqueda.value.fecha != "" ? busqueda.value.fecha : "-";
          let nombre = busqueda.value.nombre != "" ? busqueda.value.nombre : "-";
          let nro_documento = busqueda.value.nro_documento != "" ? busqueda.value.nro_documento : "-";

          await api.get(`/getDerivacionTramites/${lugar}/${area}/${cod_inicio}/${fecha}/${nombre}/${nro_documento}`).then((response) => {
            registroLista.value = response.data.content;
          });

          if (registroLista.value &&  Array.isArray(registroLista.value) && registroLista.value.length == 0)
          {
            msgShow.value = true;
          } else {
            msgShow.value = false;
          }
          formError.value = {};
          isLoading.value = false;

        } catch (error) {
          isLoading.value = false;
        }
      }




    }

    let Derivar = async () => {
      if (ValidarCamposRecepcion()) {
        Swal.fire({
          text: "¿Desea derivar el trámite marcado?",
          icon: "question",
          confirmButtonText: "ACEPTAR",
          showCancelButton: true,
          cancelButtonText: "CANCELAR",
          confirmButtonColor: "#198754",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            CargarDatoDerivacion();
          }
          else {
            objRegistro.value = [];
          }
        })
      }
    }

    let ValidarCamposRecepcion = () => {
      let valida = false
      // Validacion para una sola opcion
      if (objRegistro.value.length == 0 || objRegistro.value.length > 1) {
        Mensaje.info("Marca <b>una opción</b> para derivar el trámite")
      }
      else {
        valida = true;
      }
      return valida;
    }

    let CargarDatoDerivacion = () => {
      descripcion.value = {
        cod_area: '',
        cod_oficina: '',
        motivo: ''
      };
      obtenerAreaDerivacion();
      let modal = new Modal(modalDerivar.value);
      modal.show();
      objCodInicio.value = [];
      objRegistro.value.forEach((item, index) => {
        if (registroLista.value.find(x => x.id_proceso == item)) {
          objCodInicio.value.push(registroLista.value.find(x => x.id_proceso == item));
        }
      });
    }

    let validarFormularioDerivacion = async () => {
      try {
        formError.value = {};
        
        let schemaFormDerivar = Yup.object().shape({
          motivo: Yup.string().required(),
          cod_area: Yup.string().required(),
          cod_oficina: (habilitarCodOficina.value) ? Yup.string().required() : null,
        });
        await schemaFormDerivar.validate(descripcion.value, { abortEarly: false });
        return true;

      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        });
        return false
      }
    }

    let DerivarTramite = async () => {
      try{
        if( await validarFormularioDerivacion() && objRegistro.value[0]){
                let id_proceso = objRegistro.value[0];
                let tramite = registroLista.value.find(x => x.id_proceso == id_proceso);

                let data = {
                  id_proceso,
                  cod_oficina_origen: tramite.cod_oficina_destino,
                  cod_area_origen : tramite.cod_area_destino,
                  cod_oficina_destino: (descripcion.value.cod_oficina != '') ? descripcion.value.cod_oficina : tramite.cod_oficina_destino,
                  cod_area_destino: descripcion.value.cod_area,
                  motivo: descripcion.value.motivo
                };

                let result = await api.put("/setDerivacionTramite", data);
                if (result.status === 200 && result.data.code == 1 && result.data.content != '') {
                  Mensaje.success_action("Trámite derivado(s) correctamente",()=>{
                    registroLista.value = [];
                    objRegistro.value = [];
                    habilitarCodOficina.value = false;
                    Modal.getInstance(modalDerivar.value).hide();
                  })
                }
              }
      } catch(error){
        Mensaje.error("¡Ocurrio un error,verifique su conexion!")
      }

     

    }

    let fetchOficinasLista = () => api.get('/getOficinas').then((response) => {
      oficinasLista.value = response.data.content
    })

    let fetchAreaLista = () => api.get('/getAreas/D').then((response) => {
      areasLista.value = response.data.content
    })

    let obtenerAreaDerivacion = () => api.get('/obtenerAreasDerivacion').then((response) => {
      areasDerivacion.value = response.data.content
    });


    let Service = () => {
      let datos = service.getInformacionUsuario()
      busqueda.value.lugar = datos.cod_oficina
    }

    onMounted(() => {
      fetchOficinasLista();
      fetchAreaLista();
      Service();
    });

    return {
      formatDate,
      Buscar,
      Derivar,
      ValidarFecha,
      maxDate,
      Limpiar,
      datosTramite,
      formError,
      descripcion,
      registroLista,
      busqueda,
      objRegistro,
      oficinasLista,
      areasLista,
      isLoading,
      msgShow,
      formError,
      modalDerivar,
      objCodInicio,
      habilitarCodOficina,
      DerivarTramite,
      areasDerivacion,
    }
  },
};

</script>
