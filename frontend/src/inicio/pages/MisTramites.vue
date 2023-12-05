<template>
  <div>
    <div class="row">
      <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 my-3"><h2 class="text-center">{{ $t('inicio_tramite') }}</h2></div>
    </div>

    <div class="row mb-3">
      <div class="col-12 col-md-4 form-group">
        <button class="btn btn-success btn-sm align-center" @click="NuevoRegistro" v-if="permitirTramite">
          <i class="fa fa-file"></i> {{ $t('nuevo_tramite') }}
        </button>
      </div>
      <div class="col-12 col-md-8 form-group">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">{{ $t('busqueda') }}</p>
            <div class="row mt-2">
              <div class="col-12 col-md-5 form-group">
                <label for="">{{ $t('fecha_inicio') }}</label>
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
              <div class="col-12 col-md-5 form-group">
                <label for="">{{ $t('fecha_fin') }}</label>
                <input type="date" 
                  class="form-control"
                  v-model="datos.fecha_fin"
                  :max="maxDate"
                  @change="ValidarFechaFin"
                  :class="{error: formError.fecha_fin}"
                  />
                  <p class="orange mt-2" v-if="formError.fecha_fin"><strong>{{ formError.fecha_fin }}</strong></p>
              </div>
              <div class="col-12 col-md-2 form-group">
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
          </div>
        </div>  
      </div>
    </div>

    <!-- <div class="table-wrapper"> -->
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>{{ $t('codigo_unico') }}</th>
            <!-- <th>CÓDIGO INICIO</th>
            <th>NACIONALIDAD</th> -->
            <th>{{ $t('tramite') }}</th>
            <th>{{ $t('fecha_inicio_tramite') }}</th>
            <th style="width: 10%;">{{ $t('estado') }}</th>
            <th style="width: 10%;">{{ $t('acciones') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in inicioLista" :key="index">
            <td class="text-center">{{ item.id_proceso_inicio}}</td>
            <!-- <td :class="{'red': item.cod_inicio==null}">{{ item.cod_inicio || '---' }}</td> -->
            <td>{{item.tramite}}</td>
            <td class="text-center">{{formatDate(item.fecha_reg)}}</td>
            <td class="text-center" :class="{'red': item.id_estado == 0, 'green': item.id_estado == 1, 'orange': item.id_estado == 2, 'blue':item.id_estado == 5}">
              <span :title="item.descripcion_est" >{{item.nombre_est}}</span>
              <br>
              <span>{{ item.cod_inicio }}</span>
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-primary" @click="irSubirArchivos(item)" title="Procesa inicio de tramite" v-if="item.id_estado==0">
                <i class="fa fa-pencil"></i> {{ $t('procesar') }}
              </button>
              <!-- <button class="btn btn-sm btn-success"  @click="irSubirArchivos(item)" title="Ver tramite" v-if="item.id_estado==1 || item.id_estado==3" >
                <i class="fa fa-pencil"></i> VER
              </button>
              <button class="btn btn-sm btn-warning"  @click="irSubirArchivos(item)" title="Ver tramite" v-if="item.id_estado==2" >
                <i class="fa fa-pencil"></i> SUBSANAR
                
              </button> -->

              <button class="btn btn-sm btn-primary"  @click="download_aut(item)" title="Ver tramite" v-if="item.id_estado==5" >
                <i class="fa fa-fold"></i> {{ $t('descargar_autorizacion') }}
              </button>
<!--         <button class="btn btn-sm btn-outline-success"  @click="irSubirArchivos(item)" title="Ver tramite" v-if="item.id_estado==5" >
                <i class="fa fa-pencil"></i> VER
              </button> -->
              <button type="button" 
                class="btn btn-danger btn-sm" 
                title="Cancelar trámite"
                @click="modalCargarTramite(item)"
                data-bs-toggle="modal"
                data-bs-target="#modalCancelar"
                v-if="item.id_estado == 0 || item.id_estado==1 || item.id_estado==2 || item.id_estado==3"
              >
                <i class="fa fa-trash" title="Cancelar solicitud de inicio de tramite."></i>
              </button>&nbsp;
              <button class="btn btn-sm btn-success" @click="irSubirArchivos(item)" title="Ver trámite" v-if="item.id_estado==1 || item.id_estado==2 || item.id_estado==3" >
                <i class="fa fa-pencil"></i>
              </button>

              <!-- <button class="btn btn-sm btn-success"  @click="irSubirArchivos(item)" title="Ver trámite" v-if="item.id_estado==5" >
                <i class="fa fa-eye"></i>
              </button> -->
              
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
            <div class="modal-title">{{ $t('cancelacion_tramite') }}</div>
            <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
          </div>
          <div class="modal-body">
           
            <p><b>{{ $t('tramite') }}:</b><br> {{ datosTramite.tramite }}</p>
            <p><b>{{ $t('motivo_cancelacion') }}</b> <span class="lb-error" v-if="formError.motivo">{{ $t('campo_requerido') }}</span></p>
            <textarea class="form-control" name="" id="" cols="30" rows="4" 
              v-model="descripcion.motivo"
              :class="{error: formError.motivo}"
              @input="descripcion.motivo=$event.target.value.toUpperCase()"
            ></textarea>
            <!-- <p><strong>Nota:</strong> maximo de caractes 200.</p> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal"
            >
              <i class="fa fa-close"></i> {{ $t('cancelar') }}</button>&nbsp;
            <button type="button" class="btn btn-success btn-sm" 
              @click="CancelarTramite(datosTramite.id_proceso_inicio)"
            >
              <i class="fa fa-save"></i> {{ $t('aceptar') }}
            </button>
            
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
import { useRegistroStore } from '@/stores/useRegistroStore';
import { Mensaje } from '@/tools/Mensaje';
import { useInicioStore } from '@/stores/useInicioStore';
import LanguageChanger from '../../components/LanguageChanger.vue';

export default{
  components:{
    Loading,
    SinResultado,
    LanguageChanger,
  },
  setup(){
    const inicioLista = ref([])
    const router = useRouter()
    const datos = ref({
      nro_documento: '',
      nacionalidad: '-',
      id_tramite: 0,
      fecha_inicio:null,
      fecha_fin: null,
    })
    let maxDate = moment().format('YYYY-MM-DD');
    let datosTramite = ref({});
    let descripcion = ref({motivo: ''})
    let formError = ref({});
    let modalCancelar = ref(null);
    let nacionalidadList = ref([]);
    let isLoading = ref( false );
    let msgShow = ref( false );
    let sRegistro = useRegistroStore();
    let permitirTramite = ref(false);
    let sInicio = useInicioStore()

    let schemaForm = Yup.object().shape({
      motivo: Yup.string().required()
    })

    let schemaFormBuscar = Yup.object().shape({
      fecha_inicio:Yup.date().max(new Date(),"Fecha excedida").nullable().default(undefined),
      fecha_fin:Yup.date().nullable().default(undefined),
    })

    let modalCargarTramite = (item) =>{
      datosTramite.value = item;
    }

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
      await Buscar()
    }

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY HH:mm:ss");
    }

    let NuevoRegistro =  () => {
      sInicio.reset()
      router.push({path: "/tramites"})
    }

    let irSubirArchivos = (item) =>{
      sRegistro.addIDProceso(item.id_proceso_inicio);
      sRegistro.addIDTramite(item.id_tramite);
      sRegistro.addProcesoInicio(item);
      router.push("/subirdocumentos")
    }

    let download_aut = async(item)=>{
      try {

        let data = {id_proceso_inicio:item.id_proceso_inicio}
        let config = {responseType: 'blob'}
        isLoading.value =  true;
        let result = await api.post("/proceso_inicio/notificacion",data,config)
        isLoading.value = false;
        if( result.status == 200){

          let file = new Blob([result.data], {type: 'application/pdf'});
          let fileURL = URL.createObjectURL(file);
          let link = document.createElement('a');
          link.href = fileURL;
          link.download =  `NOTAUT_${item.id_proceso_inicio}.pdf`;
          link.setAttribute("target", "_blank")
          link.click();

        // let file = new Blob([result.data], {type: 'application/pdf'});
        // let fileURL = URL.createObjectURL(file);
        // window.open(fileURL, '_blank');

        }else{
          throw{message:"Error"}
        }
      } catch (error) {
        isLoading.value = false;
        console.log(error.message);
        Mensaje.error("Error, comunique al area de sistemas.")
      }

    }

    let validarFormularioCancelacion = async ()=>{
       try{
        await schemaForm.validate(descripcion.value, { abortEarly: false }) 
        return true;
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
        return false;
      }
    }
    let CancelarTramite = async(id_proceso) => {
      if( await validarFormularioCancelacion()){
         Mensaje.Confirmar("¿Desea realizar la baja del trámite?",async ()=>{
            await Cancelar(id_proceso)
          })     
      }
     
    }

    let Cancelar = async (id_proceso) => {
      try {
        let data = { 
          id_proceso_inicio : id_proceso, 
          descripcion: descripcion.value.motivo
        }
        let result = await api.post('/proceso_inicio/cancelar', data);  
        if(result.status === 200 && result.data.code == 1){
          Swal.fire({text: "Trámite fue dado de baja correctamente.", icon: "success", confirmButtonText: "ACEPTAR", confirmButtonColor: "#198754", allowOutsideClick: false })
          descripcion.value.motivo = ''
          Modal.getInstance(modalCancelar.value).hide()
        }
        fetchInicioLista()
        estadoBtnNuevoTramite()
      } catch (err) {
        console.log("**[ERROR CANCELAR TRÁMITE]**");        
      }      
    }

    let Limpiar = () => {
      datos.value = {
        nro_documento: '',
        nacionalidad: '-',
        id_tramite: 0,
        fecha_inicio:null,
        fecha_fin: null,
      }
    }  


    let validarBusqueda = async ()=>{
       try{
        await schemaFormBuscar.validate(datos.value, { abortEarly: false }) 
        return true;
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
        return false;
      }
    }
    let Buscar = async () => {
      try {

        if(await validarBusqueda()){
    
          isLoading.value = true;
          let data = {
              fecha_inicio : datos.value.fecha_inicio,
              fecha_fin : datos.value.fecha_fin,        
          }
          await api.post(`/proceso_inicio/buscar`,data).then((response) => {
            inicioLista.value = response.data.content;
            if(inicioLista.value.length == 0){
              msgShow.value = true;
            }
            else{
              msgShow.value = false;
            }
            isLoading.value = false;
          }); 
        }

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        console.log(error.message);
      }
    }


    let estadoBtnNuevoTramite = async () => {
      try {
          await api.get(`/proceso_inicio/permiso_tramite`).then((response) => {
            permitirTramite.value = (response.data.content == 1);
          });        
      } catch (error) {
        console.log(error.message);
      }
    }

    let DatoTramite = (id_proceso) => {
      datosTramite.value = inicioLista.value.find(x => x.id_proceso == id_proceso)
    }


    onMounted(() => {
      fetchInicioLista();
      estadoBtnNuevoTramite();
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
      irSubirArchivos,
      modalCargarTramite,
      download_aut,
      permitirTramite,
    }
        
  }
  
}
</script>
