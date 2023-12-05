<template>
  <div>
      <div class="busqueda">
    <div class="busqueda_seccion">
      <p class="title">DOCUMENTOS ADJUNTOS</p>
      <div class="row dp-table" v-for="(item, index) in objDocumentos" :key="index">
        <div class="col-12 col-md-10">
          <label class="frm-label">{{item.nombre}}:</label> 
        </div>  
        <div class="col-12 col-md-2 text-center">
          <!-- <a href="#" title="Ver Documento"><i class="fa fa-eye"></i></a> -->
          <button 
            class="btn btn-link" 
            data-bs-toggle="modal" 
            data-bs-target="#modaldatosTramite"
            @click="cargarArchivoVistaPrevia(item.id_documento_json)"
            title="Ver documento"
          >
            <i class="fa fa-eye"></i>
          </button>
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
import { ref, onMounted } from 'vue'
import api from "../services/api";
import PdfObject from '@/components/PdfObject.vue';
import { Mensaje } from '@/tools/Mensaje';
export default {
  components:{
    PdfObject,
  },
  props:["id_proceso"],

  setup(props){

    let objDocumentos = ref([]);
    let pdfDataUrl = ref(null);
    let fetchDocumentos = async () => api.get(`/getDocumentosGeneradosTramite/${props.id_proceso}`).then((response) => {
      objDocumentos.value = response.data.content
    })

    let cargarArchivoVistaPrevia = async (id) => {

      // console.log(id)
      // try {
        let config = { responseType: 'blob' }
        pdfDataUrl.value = null;
        const reader = new FileReader();
        let result = await api.get(`/getReimprimePdfx/${id}`, config).then(response => {
          reader.onload = () => {
            pdfDataUrl.value = reader.result + '#toolbar=0&navpanes=0&scrollbar=0';
          }
          reader.readAsDataURL(response.data);
        })
      // } catch (error) {
      //   Mensaje.error("No se puede visualizar el documento.")
      // }
    }
    onMounted(fetchDocumentos)
    return{
      objDocumentos,
      cargarArchivoVistaPrevia,
      pdfDataUrl,
    }
  }
}
</script>