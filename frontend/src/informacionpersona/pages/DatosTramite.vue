<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-12 my-3">
        <h2 class="text-center">DATOS DEL TRÁMITE</h2>
      </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-12 col-md-8">
        <DatosTramite />    
      </div>
      <div class="col-12 col-md-4">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">DOCUMENTOS ADJUNTOS</p>
            <div class="row dp-table form-group" v-for="(item, index) in objDocumentos" :key="index">
              <div class="col-12 col-md-10">
                <label class="frm-label">{{item.nombre}}:</label> 
              </div>  
              <div class="col-12 col-md-2 text-center">
                <!-- <a href="#" title="Ver Documento"><i class="fa fa-eye"></i></a> -->
                <button class="btn btn-link"  data-bs-toggle="modal" data-bs-target="#modaldatosTramite"
                @click="cargarArchivoVistaPrevia(item.id_documento_json)"><i class="fa fa-eye"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  

    <table class="table table-ms table-responsive table-hover">
      <thead class="thead-dark">
        <tr class="text-center">
          <th width="5%">NRO.</th>
          <th>REQUISITOS</th>
          <th width="6%">MARCAR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in requisitosList" :key="index">
          <td class="text-center" scope="row">{{ index + 1 }}</td>
          <td class="text-justify" scope="row"> {{ item.nombre_req }}</td>
          <td> 
            <div class="text-center">
              <input 
                type="checkbox"
                class="check-box-req"
                :name="item.id_requisito"
                :id="item.id_requisito"
                :value="item.id_requisito"
                v-model="requisitos"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="row mt-2">
      <div class="col-md-6">
        <!-- <button
          type="button"
          class="btn btn-outline-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalObservar"
          :disabled="habilitar"
          @click="Observar"
        >
          <i class="fa fa-eye"></i> OBSERVAR</button
        >&nbsp; -->

        <!-- <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalSubsanar"
          :disabled="habilitar"
          @click="Subsanar"
        >
          <i class="fa fa-eye"></i> SUBSANAR
        </button> -->
      </div>
      <div class="col-md-6" style="text-align: right">
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="Continuar"
        >
          <i class="fa fa-save"></i> CONTINUAR
        </button>
      </div>
    </div>

   

    <!--Modal observación-->
    <div class="modal fade" id="modalObservar" data-bs-backdrop="static" ref="modalObservar"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title"><b>DATOS DE LA OBSERVACIÓN</b></div>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <label for="">DESCRIPCIÓN DE LA OBSERVACIÓN:</label
            >
            <textarea
              class="form-control"
              name=""
              id=""
              cols="30"
              rows="4"
              v-model.trim="observacion.descripcion"
              @input="observacion.descripcion = $event.target.value.toUpperCase()"
            ></textarea
            ><br />
            <label for="">ACCIONES A SEGUIR:</label>
            <textarea
              class="form-control"
              name=""
              id=""
              cols="30"
              rows="4"
              v-model.trim="observacion.acciones_subsanar"
              @input="observacion.acciones_subsanar = $event.target.value.toUpperCase()"
            ></textarea>
            <!-- <p><strong>Nota:</strong> maximo de caractes 200.</p> -->
          </div>
          <div class="modal-footer">
            
            <router-link to="/registrolista">
              <button
              
              class="btn btn-outline-secondary btn-sm"
              data-bs-dismiss="modal"              
              >
              <i class="fa fa-close"></i>  CANCELAR
              </button>
            </router-link>
            
            <!-- <router-link @click="registroObservado" to="/registrolista"> -->
              <button
              class="btn btn-outline-success btn-sm"
              data-bs-dismiss="modal"
              @click="registroObservado"
              >
              <i class="fa fa-save"></i>  ACEPTAR</button>
            <!-- </router-link> -->

          </div>
        </div>
      </div>
    </div>

    <!--Modal subsanacion-->
    <div class="modal fade" id="modalSubsanar" data-bs-backdrop="static" ref="modalSubsanar">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title"><b>DATOS DE LA SUBSANACIÓN</b></div>
                    <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <label for="">DESCRIPCIÓN DE LA SUBSANACIÓN:</label>
                    <textarea class="form-control" name="" id="" cols="30" rows="4" v-model.trim="observacion.subsanar"
                    @input="observacion.subsanar = $event.target.value.toUpperCase()"
                    ></textarea><br>
              </div>
                <div class="modal-footer">
                  <router-link to="/registrolista">
                    <button 
                     class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal" 
                    ><i class="fa fa-close"></i> CANCELAR
                    </button>
                  </router-link>
                    
                  <!-- <router-link @click="registroSubsanar" to="/registrolista"> -->
                    <button
                    class="btn btn-outline-success btn-sm"              
                    data-bs-dismiss="modal"
                    @click="registroSubsanar"
                    >
                    <i class="fa fa-save"></i>  ACEPTAR</button>
                  <!-- </router-link> -->
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade " id="modaldatosTramite" ref="modaldatosTramite">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
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


  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import api from "@/services/api";
import DatosTramite from '@/registro/components/DatosTramite.vue';
import { useRegistroStore } from '@/stores/useRegistroStore';
import TipoTramites from "@/constantes/TipoTramites";

import moment from "moment";
import Swal from "sweetalert2";
import * as Yup from "yup";
import PdfObject from '@/components/PdfObject.vue';
import { Mensaje } from "@/tools/Mensaje";


export default {
  components: {
    DatosTramite,
    PdfObject,
  },
  setup() {
    let router = useRouter();
    let requisitosList = ref([]);
    let maxDate = moment().format("YYYY-MM-DD");
    let observacion = ref({ motivo: "" });
    let documentosList = ref([]);
    let requisitos = ref([]);
    let desabilitaButton = ref([]);
    let habilitar = ref(false);
    let sRegistro = useRegistroStore();
    let id_persona = sRegistro.getIDPersona;
    let id_proceso = sRegistro.getIDProceso;
    let idTramite = sRegistro.getIDTramite;
    let id_estadoObser = 5;
    let id_estadoSubsa = 6;
    let tramite = ref({});
    
    let objDocumentos = ref([]);
    let pdfDataUrl = ref(null);
    
    let fetchDocumentos = async () => api.get(`/getDocumentosGeneradosTramite/${id_proceso}`).then((response) => {
      objDocumentos.value = response.data.content
    })


    let filterTitulo = computed(() =>
      requisitosList.value.filter((x) => x.nro_padre == 0)
    );

    let filterHijo = (hijo) => {
      return requisitosList.value.filter((x) => x.nro_padre == hijo);
    };
    let fetchRequisitos = () => api.get(`/getRequisitoRegistro/${id_proceso}`).then((response) => {
      requisitosList.value = response.data.content;
    });

    let getTramite = () => api.get(`/getTramiteData/${idTramite}`).then((response)=>{
      if(response.data.code==1){
        tramite.value =response.data.content;
      }else{
        tramite.value = null 
      }
      sRegistro.addTramite(tramite.value);
    });

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY");
      
    };

    let Continuar = async () => {
      if(requisitos.value.length == requisitosList.value.length ){
        RecibirTramite()
      }
      else{
        Mensaje.info( "Debe validarse todos los requisitos");
      }
    }

    let registroObservado = async (id_proceso) => {
      try {   
        let datos = {
          id_proceso : sRegistro.getIDProceso,
          id_estadoObser, 
          observacion: observacion.value.descripcion,
          acciones: observacion.value.acciones_subsanar,
        }    
        let id_documento = 25
        let result = await api.put("/EstadoObservacion", datos)
        if(result.status === 200 && result.data.code == 1){
          GenerarPDF(id_documento)
        }
        habilitar.value = true;
      } catch (error) {
        console.log('**[ERROR]**');        
      }
    }

    let registroSubsanar = async () => {
      try {
            let datos = {
              id_proceso : sRegistro.getIDProceso,
              id_estadoSubsa,
              subsanar:observacion.value.subsanar
            }    
            let result = await api.put("/EstadoSubsanacion", datos)
          
            // if(result.status === 200 && result.data.code == 1){
            // //   GenerarPDF(documentosList.value[0].id_documento)
            // }
          } catch (error) {
            console.log('**[ERROR]**');        
          }
    };

  
    
    let RecibirTramite = async () => {
      try {
        for(let i = 0; i < requisitos.value.length; i++){
          let data = {
            id_proceso,
            id_requisito: requisitos.value[i],
            estado: 2,
            observacion: ''
          }
          let result = await api.put("/cambiarEstadoCumplimiento", data)
        }

        if(tramite.value && (
          tramite.value.clas1==TipoTramites.ARRAIGO ||
          tramite.value.clas1==TipoTramites.CERTIFICACION ||
          tramite.value.clas1==TipoTramites.AUTORIZACION_SALIDA ||
          tramite.value.tramiteres=="REPOSICION LIBRETA DE TRIPULANTE" ||
          tramite.value.tramiteres=="RENOVACION LIBRETA DE TRIPULANTE"        
          ) ){
          router.push({path:"/recaudaciones"});
        }else{
          router.push({ path: "/datosbiometrico" });
        }
        
      } catch (error) {
        console.log('**[ERROR]**');        
      }
    }

    let EditarTramite = () => {
      console.log("Editar tramite");
    };

    

    let estado = (indexEstado) => {
      let objEstado = { INICIANDO: "TRÁMITE INCOMPLETO" };
      return objEstado[indexEstado];
    };

    let GenerarPDF = async (id_documento) => {
      try {
        
        let config = {responseType: 'blob'}
        let fecha = moment().format('YYYY-MM-DD');


        let result = await api.get(`/getGeneraPdf_oldpdf/${id_proceso}/${idTramite}/${id_documento}/${id_persona}/${fecha}`, config)
          
        // Descarga archivo
        if( result.status === 200){
          
          const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "blob"})
          )
          let link = document.createElement("a")
          link.href = url
          let title = "Archivo.pdf"
          link.setAttribute("download", title)
          document.body.appendChild(link)
          link.click()
        }
        
      } catch (error) {
        Mensaje.error("No genera el documento")
      }
    }


    let cargarArchivoVistaPrevia = async (id) => {
      try {
         let config = { responseType: 'blob' }
        pdfDataUrl.value = null;
        const reader = new FileReader();
        let result = await api.get(`/getReimprimePdfx/${id}`, config).then(response => {
          reader.onload = () => {
            pdfDataUrl.value = reader.result + '#toolbar=0&navpanes=0&scrollbar=0';
          }
          reader.readAsDataURL(response.data);
        })
      } catch (error) {
        Mensaje.error("No se puede visualizar el documento.")
      }
    }

    onMounted(fetchRequisitos);
    onMounted(fetchDocumentos);
    onMounted(getTramite);

    return {
      formatDate,
      EditarTramite,
      Continuar,
      maxDate,
      estado,
      requisitosList,
      observacion,
      filterTitulo,
      filterHijo,
      fetchRequisitos,
      requisitos,
      objDocumentos,
      desabilitaButton,
      registroObservado,
      GenerarPDF,
      documentosList,
      registroSubsanar,
      habilitar,
      cargarArchivoVistaPrevia,
      pdfDataUrl,
    };
  },
};
</script>
