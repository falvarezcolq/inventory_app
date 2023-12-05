<template>
  <div>
    <div class="row">
      <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12 my-3">
        <h2 class="text-center">{{ $t('datos_tramite') }}</h2>
      </div>
      <div class="col-12 col-md-12">
        <div class="row">
          <div class="col-md-12">
            <h3>{{ $t('info_tramite') }}</h3>
          </div>
        </div>
        <div v-if="id_tramite">
          <TramiteDetalle :id_tramite="id_tramite" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-12">
        <Requisitos ref="requisitos" />
      </div>
    </div>


    <div class="row">
      <div class="col-12 col-md-12">
        <div class="row ">
          <div class="col-md-12 mt-4">
            <h3>{{ $t('donde_recoger') }}</h3>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <label class="form-label">{{ $t('ciudad_emision') }}</label>
            <span class="lb-error" v-if="formError.lugar">
              {{ formError.lugar }}
            </span>
            <select class="form-control" 
            v-model.trim="lugar" 
            :class="{ error: formError.lugar }"
            @change="lugarSeleccionado"
            >
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in lugares" :key="index" :value="item.cod_oficina">{{ item.descripcion }} {{ item.nombre }}</option>
            </select>
            <br>
            <div class="alert alert-success d-flex align-items-center" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>
                <p>{{ $t('info_lugar') }}</p>
                <ul>
                  <li>{{ $t('info_entrega') }}</li>
                  <li>{{ $t('info_docuemntos') }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-6"  v-if="oficina">
            <div class="box-text" style="text-align: justify">
                <label for="box-title">{{ $t('tipo') }}</label>
                <div class="box-body">
                    {{ oficina.descripcion}}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">{{ $t('direccion') }}</label>
                <div class="box-body">
                    {{ oficina.direccion }}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">{{ $t('telefono') }}</label>
                <div class="box-body">
                    {{ oficina.telefonos }}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">{{ $t('horarios') }}</label>
                <div class="box-body">
                    {{ oficina.horarios }}   
                </div>
            </div>

            <!-- <div class="box-text">
                <a :href="oficina.url_image" target="_blank" >{{ $t('ubicacion') }}</a>
            </div> -->
          </div>
        </div>
     
      </div>
    </div> 

    <div class="row form-group" v-if="mensaje_validacion!=''">
      <div class="col-12 col-md-12 text-end orange"  >
        {{ mensaje_validacion }}
      </div>
    </div>
    
    <div class="row form-group" >
 
      <div class="col-12 col-md-12 text-end" >
        <button type="button" class="btn btn-primary btn-sm" :disabled="!habilitar"
          @click="ConcluirTramite">
          <i class="fa fa-save"></i> {{ $t('solicitud') }}
        </button>
      
      </div>
<!-- 
      <div class="col-12 col-md-12 text-end" v-if="proceso_inicio">
        <button type="button" class="btn btn-primary btn-sm" :disabled="!habilitar"
          v-if="proceso_inicio.id_estado == 0" @click="ConcluirTramite">
          <i class="fa fa-save"></i> SOLICITAR INICIO DE TRÁMITE
        </button>
        <button type="button" class="btn btn-warning btn-sm" :disabled="!habilitar"
          v-if="proceso_inicio.id_estado == 2" @click="SolicitudDeTramiteSubsanado">
          <i class="fa fa-save"></i> SOLICITAR INICIO DE TRÁMITE
        </button>

      </div> -->
    </div>

    <div class="modal fade " id="modaldatosTramite" ref="modaldatosTramite">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">{{ $t('requisito') }} <br /> <br />{{ texto_requisito }} </div>
            <button type="button" data-bs-dismiss="modal" class="btn-close "></button>
          </div>
          <div class="row">
            <div class="col-md-12 " v-if="pdfDataUrl">
              <PdfObject :pdfDataUrl="pdfDataUrl" />
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-title">{{ $t('vista_previa') }}</div>
            <button type="button" data-bs-dismiss="modal" class="btn-close "></button>
          </div>
        </div>
      </div>
    </div>
    

    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import api from '@/services/api';
import ProgressStep from '@/inicio/components/ProgressStep.vue';
import { useRegistroStore } from "@/stores/useRegistroStore";
import { useInicioStore } from '@/stores/useInicioStore';
import TramiteDetalle from "@/inicio/components/TramiteDetalle.vue";
import PdfObject from '@/components/PdfObject.vue';
import { Mensaje } from '@/tools/Mensaje';
import Loading from '@/components/Loading.vue';
import Requisitos from '../components/Requisitos.vue';

import TipoArchivos from '@/constantes/TipoArchivos';
import * as yup from 'yup'
import LanguageChanger from '../../components/LanguageChanger.vue';

export default {
  components: {
    ProgressStep,
    PdfObject,
    Loading,
    TramiteDetalle,
    Requisitos,
    LanguageChanger,
},
  setup() {
    let router = useRouter()
    let sRegistro = useRegistroStore(); 
    let requisitosList = ref([]);
    let lugares = ref([]);
    let lugar= ref('');
    let oficina = ref(null);
    let pdfDataUrl = ref(null);
    let texto_requisito = ref('');
    let habilitar = true;
    let isLoading = ref(false);
    let sInicio = useInicioStore();
    let cod_tramite = ref(sInicio.getCodTramite)
    let id_proceso_inicio = ref(sInicio.getIDProcesoInicio)
    let proceso_inicio = ref(sRegistro.getProcesoInicio);
    let id_tramite  = sInicio.getIDTramite;
    let tramiteData = sInicio.getTramiteData;
    let requisitos = ref(null)


    


    let mensaje_validacion = ref('');
    let schemaForm = yup.object().shape({
      lugar:yup.string().required(),
    })
    let formError = ref({})

    let fetchRequisitos = () => api.get(`/proceso_inicio/getRequisito/${sInicio.getIDProcesoInicio}`).then((response) => {
      requisitosList.value = response.data.content;
    });
    let fetchLugar = () => api.get(`/proceso_inicio/lugares`).then(res=>{
      lugares.value = res.data.content;
    })

    let lugarSeleccionado=()=>{

      if(lugar.value!=''){
        oficina.value = lugares.value.find(x => x.cod_oficina == lugar.value);
      }else{
        oficina.value = null;
      }
    }
    let retornar = () => {
      router.push("/mistramites");
    }
    let validaSolicitud = () => {
      if(requisitos.value){
        requisitosList.value = requisitos.value.requisitosList
        let archivos_nosubidos = requisitosList.value.filter( x => x.subir_archivo == true && x.hash_name == null  && x.validar == 1)
        return (archivos_nosubidos.length == 0);
      }
      return false;
     
    }



    onMounted(async () => {
      await fetchLugar();
    })

    let cargarArchivo = async (item, e) => {
      try {
        let archivo = e.target.files[0];
        if (!archivo) return;      
          const imagenesAceptadas = TipoArchivos.TipoImagenes;
          const archivosAceptados = TipoArchivos.TipoNoImagen;
        if (imagenesAceptadas.includes(archivo['type'])) {
          resizeImage(archivo,item)
        } else if (archivosAceptados.includes(archivo['type'])) {
          guardarArchivo(archivo,archivo.name, item);
        } else {
          Mensaje.error("El archivo seleccionado no tiene el formato aceptado, solamente imágenes y pdf son válidos. ")
        }
      } catch (error) {
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }


    let resizeImage = (file,item) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {

            let tamanhoMinimoAceptable= img.width > img.height ? img.width : img.height ;
            if (tamanhoMinimoAceptable < 100 ){
              Mensaje.error("La imagen no alcanza el tamaño minimo aceptado")
              return;
            }
            const maxWidth = 4096;
            const maxHeight = 4096;
            let newWidth = img.width;
            let newHeight = img.height; 
            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }
            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
            }
            const max = newWidth > newHeight ? newWidth: newHeight;
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const qualityImage = 1 - (0.0002)*(max-100);
            canvas.toBlob((blob) => {
              guardarArchivo(blob,file.name,item)
            }, 'image/jpeg', qualityImage)
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    let guardarArchivo = async (archivo,name, item) => {
      try {

        if (archivo.size > 2050000 ){
          Mensaje.error("El documento no debe exceder los 2MB de tamaño")
          return ;
        }
        const formData = new FormData();
        formData.append('id_cumplimiento', item.id_cumplimiento);
        formData.append('archivo', archivo,name);
        isLoading.value=true;
        let result = await api.post('/subirarchivo', formData)
        isLoading.value=false;
        if (result.status == 200 && result.data.code == 1) {
          Mensaje.success("¡Archivo subido con éxito!")
          await fetchRequisitos();
        } else {
          Mensaje.error("Error")
        }
      } catch (error) {
        isLoading.value=false;
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }

    let cargarArchivoVistaPrevia = async (item) => {
      try {
        let config = { responseType: 'blob' }
        pdfDataUrl.value = null;
        texto_requisito.value = item.nombre_req;
        const reader = new FileReader();
        let result = await api.get(`/file/${item.hash_name}`, config).then(response => {
          reader.onload = () => {
            pdfDataUrl.value = reader.result + '#toolbar=0&navpanes=0&scrollbar=0';
          }
          reader.readAsDataURL(response.data);
        })



      } catch (error) {
        Mensaje.error("No se puede visualizar el documento.")
      }
    }

    habilitar = computed(() => {
      return validaSolicitud();
    })


    let validar= async()=>{
     
      let validar= true;
      mensaje_validacion.value =''
      try {      
        formError.value = {}
        await schemaForm.validate({ lugar:lugar.value }, { abortEarly: false })

      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
       
       validar = false;
      }

      

      if(!validaSolicitud()){
        mensaje_validacion.value = "Los archivos de los requisitos obligatorios deben ser subidos"
        validar = false;
      } 


      return validar;
    }



    let guardarProcesoInicio = async () => {
      try {
        let datos = {
          datosAdicionales: sInicio.getDatosAdicionales.data,
          datosAdicionalesSR: sInicio.getDatosAdicionalesSR.data,
          datosAdicionalesCR: sInicio.getDatosAdicionalesCR.data,
          datosAdicionalesDConyugue: sInicio.getDatosAdicionalesDConyugue.data,
          datosAdicionalesOtroIng: sInicio.getDatosAdicionalesOtroIng.data,
          idTramiteData: sInicio.getIDTramite,
          id_proceso_inicio: sInicio.getIDProcesoInicio,
        };
        isLoading.value = true;
        let result = await api.post("/proceso_inicio", datos);
        isLoading.value = false;
        if (result.status === 201 && result.data.code === 1) {
          sInicio.addIDProceso(Number(result.data.content.id_proceso_inicio));
          return true;
        }
        return false;
      } catch (error) {
        console.log(error)
        return false
      }
    }



    let guardarRequisito = async (id_requisito) => {
      try {
    
        if (sInicio.getIDProcesoInicio != 0) {
          let data = {
            id_requisito: id_requisito,
            id_proceso_inicio: sInicio.getIDProcesoInicio,
          }

          isLoading.value = true;
          let result = await api.post('/proceso_inicio/requisitos_id', data);
          isLoading.value = false;

          if (result.status == 200 && result.data.code == 1) {
            let i = requisitosList.value.findIndex(x => x.id_requisito == id_requisito)
            requisitosList.value[i].id_cumplimiento = result.data.content;
            return result.data.content
          }
        }
        return null;
      } catch (err) {
        isLoading.value = false;
        return null;
      }
    }




    let ConcluirTramite = async () => {

      if(await validar()){
         Mensaje.Confirmar("Desea solicitar el inicio del trámite<br> por ventanilla virtual a DIGEMIG", async () => {

          try{
            //  proceso
            if (sInicio.getIDProcesoInicio == 0) {
              let result = await guardarProcesoInicio()
              if (!result) {
                throw { message: "No se ha podido registrar el Proceso Inicio" }
              }
            }
            //  requisitos obligatorios
            let requisitoSinRegistrar = requisitosList.value.filter( x => x.id_cumplimiento==null && x.validar == 1);


          
                                  
            for (let index = 0; index < requisitoSinRegistrar.length; index++) {
              const item = requisitoSinRegistrar[index];
              let id_cumplimiento = await guardarRequisito(item.id_requisito)
             
              if (!id_cumplimiento) {
                throw { message: "No se ha podido registrar el requisito "+ item.nombre_req }
              }
            }
            // solicitud de aprobacionde de tramite
            let data = {lugar:lugar.value}
            isLoading.value = true;
            let result = await api.post(`/proceso_inicio/solicitar_aprobacion_tramite/${sInicio.getIDProcesoInicio}`,data)
            isLoading.value = false;
            if (result.status == 200 && result.data.code == 1) {
              Mensaje.success(result.data.message);
              // proceso_inicio.id_estado = 1;
              sInicio.reset();
              router.push("/mistramites");
            } else if (result.status == 200 && result.data.code == 0) {
              Mensaje.success(result.data.message);
            } else {
              Mensaje.error("Error")
            }
          } catch (error) {
            console.log(error.message);
            Mensaje.error("Error:" + error.message)
          }
        })
      }
     
    }


    let SolicitudDeTramiteSubsanado = async () => {
      Mensaje.Confirmar("Desea solicitar a DIGEMIG, nueva revisión del inicio del trámite", async () => {
        try {
          let result = await api.post(`/proceso_inicio/solicitar_aprobacion_tramite_subsanado/${sInicio.getIDProcesoInicio}`)
          if (result.status == 200 && result.data.code == 1) {
            Mensaje.success(result.data.message);
            proceso_inicio.id_estado = 3;
            router.push("/mistramites");
          } else if (result.status == 200 && result.data.code == 0) {
            Mensaje.success(result.data.message);
          } else {
            Mensaje.error("Error")
          }
        } catch (error) {
          Mensaje.error("Error: " + error.message)
        }
      })
    }

  
    return {
      fetchRequisitos,
      requisitosList,
      retornar,
      id_proceso_inicio,
      cargarArchivo,
      cargarArchivoVistaPrevia,
      pdfDataUrl,
      texto_requisito,
      habilitar,
      ConcluirTramite,
      proceso_inicio,
      SolicitudDeTramiteSubsanado,
      isLoading,
      lugares,
      lugar,
      formError,
      oficina,
      lugarSeleccionado,
      cod_tramite,
      id_tramite,
      mensaje_validacion,
      requisitos,
    }
  },

}
</script>