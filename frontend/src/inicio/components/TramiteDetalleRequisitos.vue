<template>
    <div class="busqueda" v-if="tramite">
        <div class="busqueda_seccion mt-4">
            <p class="title">DETALLE DEL TRÁMITE:</p>

            <div class="row">



                <div class="col-lg-6 col-md-6 col-sm-12">


                    <div class="box-text">
                        <label for="box-title">NOMBRE TRÁMITE:</label>
                        <div class="box-body">
                            <b>{{ tramite.tramite }}</b>
                        </div>
                    </div>

                    <!-- <div class="box-text">
                        <label for="box-title">TIPO DE TRÁMITE:</label>
                        <div class="box-body">
                            {{ tramite.clas1 }}
                        </div>
                    </div> -->
                    <div class="box-text">
                        <label for="box-title">SUB TIPO DE TRÁMITE:</label>
                        <div class="box-body">
                            {{ tramite.clas2 }} {{ tramite.clas3 }}
                        </div>
                    </div>


                    <!-- <div class="box-text">
                        <label for="box-title">NOMBRE TRÁMITE 2:</label>
                        <div class="box-body">
                            {{ tramite.tramiteres }}
                        </div>
                    </div> -->

                
     
                    <div class="box-text">
                        <label for="box-title">COSTO EN {{ tramite.moneda }}:</label>
                        <div class="box-body">
                            {{ tramite.costo_texto ? tramite.costo_texto : tramite.costo }}
                        </div>
                    </div>

                    <div class="box-text">
                        <label for="box-title">COSTO TOTAL EN BOLIVIANOS:</label>
                        <div class="box-body">
                           <b></b> 
                        </div>
                    </div>
                    <div class="box-text">
                        <label for="box-title">TIEMPO DE VIGENCIA:</label>
                        <div class="box-body">
                            {{ tramite.tiempo_vigencia }}
                        </div>
                    </div>

                    <div class="box-text" style="text-align: justify">
                        <label for="box-title">GUIA PARA REALIZAR EL TRAMITE:</label>
                        <div class="box-body" style="white-space: pre-wrap;">
                            <textarea name="" id="" cols="70" rows="10" :value="tramite.informacion" readonly style="border: none;">
                            </textarea>
                        </div>
                    </div>


                </div>
                <div class="col-lg-6 col-md-6 col-sm-12" v-show="tramite">
                    <!-- <Requisitos :cod_tramite="tramite.cod_tramite"/> -->
                </div>

            </div>





        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api';
import { ws } from '@/services/webservices';
import Requisitos from '../components/Requisitos.vue'


export default {
    props: [
        'id_tramite',
    ],
    components:{
        Requisitos,
    },
    setup(props) {

        let id_tramite = props.id_tramite;
        let tramite = ref(null)
        let getTramite = async () => {
            tramite.value = await ws.getTramite(id_tramite)

            if (tramite.value.moneda == "UFVs/Bs") {
                let cost_ufv_bs = tramite.value.costo.split('/');
                tramite.value.costo_texto = `${cost_ufv_bs[0]} UFVs  + ${cost_ufv_bs[1]} Bs.`;
            }
        }
        onMounted(async () => {
            await getTramite();
        })
        return {
            tramite,
        }
    }
}

</script>