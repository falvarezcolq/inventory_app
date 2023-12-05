<template>
    <div class="busqueda" v-if="tramite">
        <div class="busqueda_seccion mt-4">
            <p class="title">INFORMACIÓN DE SOLICITUD DE TRAMITE:</p>
            
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                     <div class="box-text">
                <label for="box-title">TIPO DE TRÁMITE:</label>
                <div class="box-body">
                    {{ tramite.clas1 }}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">SUB TIPO DE TRÁMITE:</label>
                <div class="box-body">
                    {{ tramite.clas2 }} {{ tramite.clas3 }}
                </div>
            </div>

            <div class="box-text">
                <label for="box-title">NOMBRE TRÁMITE:</label>
                <div class="box-body">
                    {{ tramite.tramite }}
                </div>
            </div>
            <div class="box-text">
                <label for="box-title">NOMBRE TRÁMITE 2:</label>
                <div class="box-body">
                    {{ tramite.tramiteres }}
                </div>
            </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">

                    <div class="box-text" style="text-align: justify">
                        <label for="box-title">INFORMACIÓN DEL TRÁMITE:</label>
                        <div class="box-body">
                            {{ tramite.informacion }}
                        </div>
                    </div>
                    <div class="box-text">
                        <label for="box-title">COSTO EN {{ tramite.moneda }}:</label>
                        <div class="box-body">
                            {{ tramite.costo }}
                        </div>
                    </div>
                    <div class="box-text">
                        <label for="box-title">TIEMPO DE VIGENCIA:</label>
                        <div class="box-body">
                            {{ tramite.tiempo_vigencia }}
                        </div>
                    </div>
                </div>
            
            </div>
           
           
          


        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api';


export default {
    props: [
        'id_proceso_inicio'
    ],
    setup(props) {
        let id_proceso_inicio = props.id_proceso_inicio;
        let tramite = ref(null)
        let getTramite = () => api.get(`/proceso_inicio/gettramite/${id_proceso_inicio}`).then((response) => {
            tramite.value = response.data.content
        })
        onMounted(async () => {
            await getTramite();
        })
        return {
            tramite,
        }
    }
}

</script>