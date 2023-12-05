<template>
    <div class="mxy-3">
        <TituloFormulario texto="FORMULARIO DE DECLARACIÓN JURADA DE SOLVENCIA ECONOMICA"/>
        <div v-for="lista in requisitosList" :key="lista.id" class="mt-3">
             <div class="busqueda">
                <div class="busqueda_seccion">
                   <label><b>Lugar y Fecha:</b></label> <span></span>
                </div>
             </div>
            <div class="busqueda">
                <div class="busqueda_seccion">
                    <p class="title">DOCUMENTOS ADJUNTOS</p>
                    <div class="row">
                        <div class="col">
                            <label> <b>Nombre: </b></label> <span>{{lista.nombres}}</span>
                        </div>
                        <div class="col">
                            <label><b>Apellidos:</b></label> <span>{{lista.primer_apellido}} {{lista.segundo_apellido}}</span>
                        </div>                       
                        <div class="col">
                            <label><b>Fecha Nacimiento:</b> </label> <span>{{lista.fecha_nacimiento}}</span>
                        </div>
                        <div class="col">
                            <label><b>Numero Documento:</b></label> <span>{{lista.nro_documento==''?'':lista.nro_documento}}</span>
                        </div>
                    
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>Otro apellido: <span>{{lista.otro_apellido==''?'':lista.otro_apellido}}</span></p>
                        </div>
                    
                        <div class="col">
                            <p>Genero: <span>{{lista.genero}}</span></p>
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pre>{{ requisitosList }}</pre>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useRegistroStore } from '@/stores/useRegistroStore';
import TituloFormulario from './TituloFormularios.vue'
export default {
    props:{
        id:String
    },
    components:{
        TituloFormulario
    },
    setup(props, context){        
        let idDocumento=props.id;
        let sRegistro = useRegistroStore()
        let id_proceso = sRegistro.getIDProceso
        let id_tramite = sRegistro.getIDTramite
        let id_persona= sRegistro.getIDPersona
      
        let requisitosList=ref([])
        let fetchDocumentos = () => api.get(`/getSolvenciaEconomica/${idDocumento}/${id_proceso}/${id_tramite}/${id_persona}`).then((response) => {
            requisitosList.value = response.data.content;
            console.log(requisitosList.value);
        });
        onMounted(fetchDocumentos);
        
        return{
            idDocumento,
            id_proceso,
            id_tramite,
            id_persona,
            requisitosList,
            fetchDocumentos
        }
    }
}
</script>


