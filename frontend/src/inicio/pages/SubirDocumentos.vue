<template>
  <div v-if="proceso_inicio">

    <div class="row">
      <div class="col-12 col-md-12 my-3">
        <h2 class="text-center">DATOS DE TRÁMITE</h2>
      </div>
      <div class="col-12 col-md-12">
        <div class="row">
          <div class="col-md-12">
            <h3>INFORMACIÓN DEL TRÁMITE</h3>
          </div>
        </div>
        <div>
          <TramiteDetalle :id_tramite="proceso_inicio.id_tramite" />
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-md-12">
        <h3>DOCUMENTOS</h3>
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="alert alert-primary d-flex align-items-center" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>
                <p>Considere los siguientes aspectos para subir archivos:</p>
                <ul>
                  <li>Los archivos o fotos deben ser legibles</li>
                  <li>Formato de archivos permitidos: PDF, JPG, PNG</li>
                  <li>Archivos en formato PDF no debe exceder 2MB</li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="row form-group" style="text-align: justify">
      <div class="col-12 col-md-12" v-if="proceso_inicio">
        <div class="table-responsive-sm">
          <table class="table table-ms table-hover">
            <thead class="thead-dark">
              <tr class="text-center">
                <th width="5%">NRO.</th>
                <th width="60%">REQUISITOS</th>
                <th width="10%">DOCUMENTOS</th>
                <th width="10%">ACCIÓN</th>
                <th width="5%">APROBADO</th>
                <th width="10%">OBSERVADO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in requisitosList" :key="index">
                <td class="text-center" scope="row">{{ index + 1 }}</td>
                <td class="text-justify" scope="row"> {{ item.nombre_req }}</td>
                <td>
                  <div v-if="item.hash_name">
                    <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#modaldatosTramite"
                      @click="cargarArchivoVistaPrevia(item)"><i class="fa fa-eye"></i> {{ item.old_name }}</button>
                  </div>
                </td>
                <td>
                  <label :for="'file-upload' + item.id_cumplimiento" class="btn btn-sm btn-outline-success"
                    v-if="(item.subir_archivo && proceso_inicio.id_estado == 0) || (item.subir_archivo && proceso_inicio.id_estado == 2 && item.observado ) ">
                    <i class="fa fa-cloud-upload"></i> Subir Archivo
                  </label>
                  <input @change="cargarArchivo(item, $event)" type="file" :id="'file-upload' + item.id_cumplimiento"
                    style="display: none;" :key="item.id_cumplimiento" />
                </td>
                <td>
                  <div class="h3 green"
                  v-if="item.aprobado">
                    <i class="fa fa-check"></i>
                  </div>
                </td>
                <td>
                  <div class="h5 red" v-if="item.observado">
                    <i class="fa fa-window-close"></i>
                    <br>
                    {{ item.observacion }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-12">


        <div class="row">
          <div class="col-md-12">
            <h3>DONDE RECOGER EL TRÁMITE</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-12">
            
          </div>
          
        </div>
        
        <div class="row">
        
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">CIUDAD EMISIÓN:</label>
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
                <p>El lugar que seleccione es importante para:</p>
                <ul>
                  <li>La entrega del trámite</li>
                  <li>Donde debe presentar los documentos originales</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-6"  v-if="oficina">
            <div class="box-text" style="text-align: justify">
                <!-- <label for="box-title">TIPO:</label> -->
                <div class="box-body">
                    {{ oficina.descripcion}}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">DIRECCIÓN:</label>
                <div class="box-body">
                    {{ oficina.direccion }}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">TELÉFONO:</label>
                <div class="box-body">
                    {{ oficina.telefonos }}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">HORARIOS:</label>
                <div class="box-body">
                    {{ oficina.horarios }}   
                </div>
            </div>

            <!-- <div class="box-text">
            
                <a :href="oficina.url_image" target="_blank" >Ver ubicación</a>
            </div> -->
          </div>
        </div>
     
      </div>
    </div>


    


    
    <div class="row form-group">
      <div class="col-12 col-md-12 text-end">
        <button type="button" class="btn btn-primary btn-sm" :disabled="!habilitar"
          v-if="proceso_inicio.id_estado == 0" @click="ConcluirTramite">
          <i class="fa fa-save"></i> SOLICITAR INICIO DE TRÁMITE
        </button>
        <button type="button" class="btn btn-warning btn-sm" :disabled="!habilitar"
          v-if="proceso_inicio.id_estado == 2" @click="SolicitudDeTramiteSubsanado">
          <i class="fa fa-save"></i> SOLICITAR INICIO DE TRÁMITE
        </button>

      </div>
    </div>

    <div class="modal fade " id="modaldatosTramite" ref="modaldatosTramite">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">Requisito: <br /> <br />{{ texto_requisito }} </div>
            <button type="button" data-bs-dismiss="modal" class="btn-close "></button>
          </div>
          <div class="row">
            <div class="col-md-12 " v-if="pdfDataUrl">
              <PdfObject :pdfDataUrl="pdfDataUrl" />
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-title">VISTA PREVIA</div>
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

import TipoArchivos from '@/constantes/TipoArchivos';
import * as yup from 'yup'


export default {
  components: {
    ProgressStep,

    PdfObject,
    Loading,
    TramiteDetalle
},
  setup() {
    let router = useRouter()
    let sRegistro = useRegistroStore();
    let id_proceso_inicio = sRegistro.getIDProceso;
    let proceso_inicio = ref(sRegistro.getProcesoInicio);
    let requisitosList = ref([]);
    let lugares = ref([]);
    let lugar= ref('');
    let oficina = ref(null);
    let pdfDataUrl = ref(null);
    let texto_requisito = ref('');
    let habilitar = true;
    let isLoading = ref(false);
    let sInicio = useInicioStore();

    let schemaForm = yup.object().shape({
      lugar:yup.string().required(),
    })
    let formError = ref({})

    let fetchRequisitos = () => api.get(`/proceso_inicio/getRequisitoRegistro/${id_proceso_inicio}`).then((response) => {
      requisitosList.value = response.data.contenido;
    });
    let fetchLugar = () => api.get(`/proceso_inicio/lugares`).then(res=>{
      lugares.value = res.data.contenido;
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
      let archivos_nosubidos = requisitosList.value.filter(x => x.subir_archivo == true && x.hash_name == null)
      return (archivos_nosubidos.length == 0);
    }

    let cargaProcesoInicio = async () => {
    
      if (!proceso_inicio.value) {
        await api.get(`/proceso_inicio/get/${id_proceso_inicio}`).then((response) => {
          proceso_inicio.value = response.data.contenido;
          lugar.value = proceso_inicio.value.cod_oficina_destino
          lugarSeleccionado()
          sRegistro.addProcesoInicio(proceso_inicio.value);
        });
      }else{
        lugar.value = proceso_inicio.value.cod_oficina_destino;
        lugarSeleccionado();
      }
    }

    onMounted(async () => {
      if (!proceso_inicio.value) {
        router.push({ path: "/mistramites" })
      }
      await fetchRequisitos();
      await fetchLugar();
      await cargaProcesoInicio();
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
        if (result.status == 200 && result.data.codigo == 1) {
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


      return validar;
    }

    let ConcluirTramite = async () => {
      if(await validar()){
         Mensaje.Confirmar("Desea solicitar el inicio del trámite<br> por ventanilla virtual a DIGEMIG", async () => {

          try {
            let data = {lugar:lugar.value}
            let result = await api.post(`/proceso_inicio/solicitar_aprobacion_tramite/${id_proceso_inicio}`,data)
            if (result.status == 200 && result.data.codigo == 1) {
              Mensaje.success(result.data.mensaje);
              proceso_inicio.id_estado = 1;
              router.push("/mistramites");
            } else if (result.status == 200 && result.data.codigo == 0) {
              Mensaje.success(result.data.mensaje);
            } else {
              Mensaje.error("Error")
            }
          } catch (error) {
            Mensaje.error("Error: " + error.message)

          }
        })
      }
     
    }

    let SolicitudDeTramiteSubsanado = async () => {
      Mensaje.Confirmar("Desea solicitar a DIGEMIG, nueva revisión del inicio del trámite", async () => {
        try {
          let result = await api.post(`/proceso_inicio/solicitar_aprobacion_tramite_subsanado/${id_proceso_inicio}`)
          if (result.status == 200 && result.data.codigo == 1) {
            Mensaje.success(result.data.mensaje);
            proceso_inicio.id_estado = 3;
            router.push("/mistramites");
          } else if (result.status == 200 && result.data.codigo == 0) {
            Mensaje.success(result.data.mensaje);
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
    }
  },

}
</script>