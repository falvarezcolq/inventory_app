<template>
    <div>
        hola
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api';


export default {
    params:[
        'id_tramite'
    ],
    setup(){
        let tramite = ref(null)
        let getTramite = ()=>api.get(`/proceso_inicio/gettramite/${this.id_tramite}`).then((response)=>{
            tramite.value = response.data.contenido
        })
        onMounted(getTramite())
        return {
            tramite,
        }
    }
}

</script>