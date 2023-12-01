<template>
    <div>
        <pre>{{ requisitosList }}</pre>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useRegistroStore } from '@/stores/useRegistroStore';
export default {
    props:{
        id:String
    },
    setup(props){        
        let idDocumento=props.id;
        let sRegistro = useRegistroStore()
        let id_proceso = sRegistro.getIDProceso
        let id_tramite = sRegistro.getIDTramite
        let id_persona= sRegistro.getIDPersona

        let requisitosList=ref([])
        let fetchDocumentos = () => api.get(`/getSolvenciaEconomica/${idDocumento}/${id_proceso}/${id_tramite}/${id_persona}`).then((response) => {            
            requisitosList.value = response.data.contenido;
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