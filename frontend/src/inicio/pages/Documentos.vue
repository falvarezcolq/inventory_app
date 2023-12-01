<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <ProgressStep :step=5 />
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-4" style="border-right:1px solid #ccc">
        <div class="row">
          <div class="col-md-12"><h2>DATOS DE TRÁMITE</h2></div>
        </div>

      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-12"><h2>DOCUMENTOS</h2></div>
        </div>

        <div class="alert alert-info" role="alert">
          <p><i class="fa fa-exclamation-triangle"></i> Concluya el trámite para procesar.</p>
          <p><i class="fa fa-exclamation-triangle"></i> Si ha <b>modificado</b> un dato, debe descargar nuevamente todos los documentos.</p>
        </div>

        <div class="row">
          <div class="col-12 col-md-12 text-center">
            <button class="btn btn-outline-success mb-3 btn-sm" v-for="(item, index) in documentosList" :key="index" style="width:51%;"
            @click="GenerarPDF(item.id_documento)" 
            ><!-- :disabled="item.id_documento!=desabilitaButton[index]?disabled:''" -->
              <i class="fa fa-print"></i> {{item.nombre}}
            </button>
          </div>
        </div>
        
        <div class="row mt-4">
         
          
          <div class="col-md-12 text-end">
            <button type="button"  class="btn btn-outline-primary btn-sm" :disabled="!habilitar"
              @click="ConcluirTramite"
            ><i class="fa fa-save"></i> CONCLUIR INICIO DE TRÁMITE</button> &nbsp;

            <button type="button"  class="btn btn-outline-primary btn-sm" :disabled="!habilitar"
              @click="RegistrarRecaudacion"
            ><i class="fa fa-save"></i> CONTINUAR CON EL TRÁMITE</button>
          </div>
        </div>
        
      </div>
    </div>
    

    <div class="row mt-2" >
      <div class="col-6">
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="retornar"><i class="fa fa-arrow-left"></i>
        </button>
      </div>
      <div class="col-6 d-md-flex justify-content-md-end">
        <!-- <div  v-if="definitivaModule" >
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="siguiente"><i class="fa fa-arrow-right"></i>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import api from '@/services/api'
import ProgressStep from '@/inicio/components/ProgressStep.vue'
import { useInicioStore } from '@/stores/useInicioStore'
import { useHistorialProcesoStore } from '@/stores/useHistorialProcesoStore'

import Swal from 'sweetalert2'
import moment from 'moment'
import { Mensaje } from '@/tools/Mensaje'
import { number } from 'yup'

export default {
  components: { ProgressStep },
  setup(){
    let router = useRouter()
    let documentosList = ref([])
    let sInicio = useInicioStore()  
    let id_proceso = ref()
    let id_tramite = ref()
    let habilitar = ref(false)
    let desabilitaButton = ref([])
    let sHistorialPrceso = useHistorialProcesoStore();
    let idPersona = sInicio.getIDPersona
    let esPersonaJuridica = ref(sInicio.esPersonaJuridica);
    let proceso = ref(null);
    

    let halitarConclusion=(id_doc)=>{
        let documento = documentosList.value.find(x => x.id_documento == id_doc)
        if (documento){
          documento.descargado = true
        }
        let habilitarBoton = true;
        documentosList.value.forEach(d => {
          habilitarBoton = habilitarBoton && d.descargado
        });
        return habilitarBoton;
    }

    let GenerarPDF = async (id_documento) => {
      try {
        let config = {responseType: 'blob'}
        //let fecha = moment().format('YYYY-MM-DD');
        // let result = await api.get(`/getGeneraPdf/${id_proceso.value}/${id_tramite.value}/${id_documento}/${idPersona}/${fecha}`, config)
        let result = await api.get(`/getGeneraPdfx/${id_proceso.value}/${id_documento}`, config)
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
          
          if (documentosList.value.length>0){
            habilitar.value = halitarConclusion(id_documento)            
          }
          desabilitaButton.value.push(id_documento)
        }
        
      } catch (error) {
        Mensaje.error("No genera el documento")
      }
    } 

    const RegistrarRecaudacion = async () => {
      let data = { 
       id_proceso: id_proceso.value,
        id_estado: 1
      }
      let result = await api.put(`/tramiteConcluido`, data)
      let data_recep = {
          id_proceso: id_proceso.value,
          cod_area: 'VENT',
          tipo_tramite:'T',
          id_estado: 2
        };
      let result_recep = await api.put(`/recibirTramite`, data_recep)      
      if(result_recep.status === 200 && result_recep.data.codigo === 1){       
        sInicio.reset();
        Swal.fire({text: "Trámite iniciado correctamente", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#198754", allowOutsideClick: false })
        .then((response) => {
          if(response.value){
          let tipo_tramite = 'T'
          sInicio.addIDPersona(idPersona);
          sInicio.addIDProceso(id_proceso.value);
          sInicio.addIDTramite(id_tramite.value);
          sInicio.addTipoTramite(tipo_tramite);
            router.push({path: "/recaudacionesinicio"}) }
        });
      } 
      else{
        console.log("[Error en registrar]");
      }
    }

    let getData = () => {
      id_proceso.value = sInicio.getIDProcesoInicio
      id_tramite.value = sInicio.getIDTramite 
    }
    
    let fetchDocumentos = () => {
      let arrRequisitos = sInicio.getRequisitos;
      let tramite = sInicio.getTramite;
      let tipo_tramite = tramite.data.cod_tipo_tramite;
      let tipo = tipo_tramite.substring(0,3);
      let excepcion = arrRequisitos.data.toString();
      api.get(`/getDocumentos/${id_tramite.value}/${excepcion}/${tipo}`).then((response) => {
        documentosList.value = response.data.contenido 
      })
    }


    let getProceso = () => {
      api.get(`/getProceso/${sInicio.getIDProcesoInicio}`).then((response) => {
        proceso.value = response.data.contenido 
      })
    }

    onMounted(getData)
    onMounted(fetchDocumentos)
    onMounted(getProceso)

    const ConcluirTramite = async () => {
      try {
         let data = { 
        id_proceso: id_proceso.value,
        id_estado: 1
        }
        let result = await api.put(`/tramiteConcluido/`, data)      
        if(result.status === 200 && result.data.codigo === 1){ 
          
          if ( esPersonaJuridica.value && Number( proceso.value.costo_total_bs) == 0 ){
            registrarProceso();
          }else{
             Mensaje.success_action("Trámite iniciado correctamente",()=>{
              sInicio.reset();
              router.push({path: "/iniciolista"})
            });
          }
          
        } 
      } catch (error) {
        Mensaje.error("no se puede concluir el tramite con éxito")
      }
    }


    let registrarProceso=async()=>{
      try {
         let data = {  id_proceso: id_proceso.value, }
        let result = await api.post(`/registrodepositoautomatico/`, data)      
       
        if (result && result.status == 201){
          await GeneraTalonControl();
        }
      } catch (error) {
        Mensaje.error("no se puede concluir el tramite con éxito")
      }
    }

    let GeneraTalonControl = async () =>{
      try {
        let config = {responseType: 'blob'}
        let data = {
          id_proceso:id_proceso.value, 
          id_documento: 8 ,
        }
        let ruta = `/generaTalonControl`;
        let result = await api.post(ruta, data, config);
        if( result.status === 200){
          const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "blob"})
          )
          let link = document.createElement("a")
          link.href = url
          let title = `TALON${proceso.value ? proceso.value.cod_inicio:''}.pdf`
          link.setAttribute("download", title)
          document.body.appendChild(link)
          link.click()
          Mensaje.success_action("Trámite registrado correctamente",()=>{
            sInicio.reset();
            router.push({ path: "/iniciolista" });
          })
        }
      } catch (error) {
        Mensaje.error("No genera el Talon de control, Reporte el problema a Sistemas.");
      }
    }
    
    let retornar = () => {
        if ( sInicio.getDatosAdicionalesCR.module ) {
          router.push({ path: "/ConRelacion" });
        } else if (sInicio.getDatosAdicionalesSR.module) {
          router.push({ path: "/SinRelacion" });
        } else if (sInicio.getDatosAdicionalesOtroIng.module) {
          router.push({ path: "/OtroIngreso" });
        }else{
          router.push({ path: "/datosadicionales" });
        }   
    }

    return{ getData, retornar, ConcluirTramite, documentosList, GenerarPDF, habilitar, desabilitaButton,RegistrarRecaudacion }
  },
  computed:{
      
 }
}
</script>