<template>
  <div>
    <ProgressStep :step=2 />
    
    <div class="row">
      <div class="col-12 col-md-12 my-3">
        <h3>REQUISITOS</h3>
      </div>
    </div>

    <div class="row form-group" style="text-align: justify">
      <div class="col-12 col-md-12">
        <ol class="lista-requisito">
          <li v-for="(item, index) in filterTitulo" :key="index">
            <div class="row" :class="[index%2 == 0 ? 'grey':'']">
              <div class="col-9 col-md-10"
                :class="[item.titulo ? 'req-titulo':'', item.validar == 1 ? 'orange':'']"
              >
                {{item.nombre}}                                
              </div>
              <div class="col-3 col-md-2 text-end">
                <input type="checkbox"
                  v-if="item.insertar == 1 || item.insertar == 4"
                  :name="item.id_requisito"
                  :id="item.id_requisito"
                  :value="item.id_requisito"
                  v-model="requisitos"
                  class="check-box-req"
                >
              </div>
            </div>

            <ol class="lista-hijo">
              <li v-for="(itemHijo, indexHijo) in filterHijo(item.cod_requisito)" :key="indexHijo">
                <div class="row">
                  <div class="col-9 col-md-10" :class="[itemHijo.titulo ? 'req-titulo':'', itemHijo.validar == 1 ? 'orange':'']">
                    {{itemHijo.nombre}}                                
                  </div>
                  <div class="col-3 col-md-2 text-end">
                    <input type="checkbox"
                      v-if="itemHijo.insertar == 1 || itemHijo.insertar == 4"
                      :name="itemHijo.id_requisito"
                      :id="itemHijo.id_requisito"
                      :value="itemHijo.id_requisito"
                      class="check-box-req"
                      v-model="requisitos"
                    >
                  </div>

                  <ol class="lista-hijo">
                    <li v-for="(itemHijo_, indexHijo_) in filterHijo(itemHijo.cod_requisito)" :key="indexHijo_">
                      <div class="row">
                        <div class="col-9 col-md-10" :class="[itemHijo_.titulo ? 'req-titulo':'',itemHijo_.validar == 1 ? 'orange':'']">
                          {{itemHijo_.nombre}}                                
                        </div>
                        <div class="col-3 col-md-2 text-end">
                          <input type="checkbox"
                            v-if="itemHijo_.insertar == 1 || itemHijo_.insertar == 4"
                            :name="itemHijo_.id_requisito"
                            :id="itemHijo_.id_requisito"
                            :value="itemHijo_.id_requisito"
                            class="check-box-req"
                            v-model="requisitos"
                          >
                        </div>

                        <ol class="lista-hijo">
                          <li v-for="(itemHijo_nivel4, indexHijo_nivel4) in filterHijo(itemHijo_.cod_requisito)" :key="indexHijo_nivel4">
                            <div class="row">
                              <div class="col-9 col-md-10" :class="[itemHijo_nivel4.validar == 1 ? 'orange':'']">
                                {{itemHijo_nivel4.nombre}}                                
                              </div>
                              <div class="col-3 col-md-2 text-end">
                                <input type="checkbox"
                                  v-if="itemHijo_nivel4.insertar == 1 || itemHijo_nivel4.insertar == 4"
                                  :name="itemHijo_nivel4.id_requisito"
                                  :id="itemHijo_nivel4.id_requisito"
                                  :value="itemHijo_nivel4.id_requisito"
                                  class="check-box-req"
                                  v-model="requisitos"
                                >
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </li>
                  </ol>
                </div>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>

    <div class="row mt-2" v-if="!requisitosModule">
      <div class="col-12 col-md-12 text-end">
        <button type="button" class="btn btn-secondary btn-sm"
          @click="Cancelar"
        ><i class="fa fa-close"></i> CANCELAR
        </button>&nbsp;
        <button type="button" class="btn btn-primary btn-sm"
          @click="Continuar"
        ><i class="fa fa-save"></i> CONTINUAR</button>
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
import DatosTramite from '@/inicio/components/DatosTramite.vue';
import { useInicioStore } from '@/stores/useInicioStore';

import {onlyNumbers} from '@/tools/inputs';
import { Mensaje } from '@/tools/Mensaje';
import TipoTramites from '@/constantes/TipoTramites';
import Loading from '@/components/Loading.vue';

export default {
  components: { ProgressStep, DatosTramite, Loading },
  setup(){
    let router = useRouter();
    let requisitosList = ref([]);
    let sInicio = useInicioStore();
    let requisitos = ref([]);
    let idProceso = ref();
    let nroFojas = ref('');
    let cantDocIdentidad = ref('');
    let observacion = ref('');
    let oNumbers = ref();
    let requisitosModule = ref(false);
    let tramite=ref({});
    let tipoTramites = TipoTramites;
    let isLoading = ref( false )


    oNumbers = onlyNumbers;

    let cod_tramite = computed(() => sInicio.getCodTramite)
    let id_proceso = computed(() => sInicio.getIDProcesoInicio)

    let id_tramite  = sInicio.getIDTramite;
    idProceso.value = sInicio.getIDProcesoInicio;
    nroFojas.value  = sInicio.getNroFojas;
    cantDocIdentidad.value = sInicio.getCantDocIdentidad;
    observacion.value = sInicio.observacion;
    let tramiteData = sInicio.getTramiteData;
    
    let requisitosStore = () => {
      let requisitosData = sInicio.getRequisitos;
      requisitosModule.value = requisitosData.module;
      if(requisitosModule.value){
        requisitos.value = requisitosData.data;
      }
    }

    let fetchRequisitos = async () =>{
      
      isLoading.value = true;
      await api.get(`/getRequisitos/${cod_tramite.value}`).then((response) => {
      if(response.data.contenido.length > 0){
        requisitosList.value = response.data.contenido;
      }
        isLoading.value = false;
    })
      isLoading.value = false;
  }
    
  
    let filterTitulo = computed(() => requisitosList.value.filter(x => x.nro_padre == 0) )

    let filterHijo = (hijo) => {
      return requisitosList.value.filter(x => x.nro_padre == hijo)
    }
    
    let Cancelar = () => {
      Mensaje.Confirmar('¿Confirma la cancelación del trámite?',()=>{
        sInicio.reset()
        router.push("/mistramites")
      })
    }
    
    let retornar=()=>{
      router.push({path: "/tramites"})
    }
    let siguiente=()=>{
        router.push({path: '/datosadicionales'}) 
    }
  
    const VerificaRequisitos = () => {
      // Verifica requisitos obligatorios
      // Requisitos all
      let requisitosAll = requisitosList.value;
      // Requisitos selecionados
      let requisitosSeleccionados = requisitos.value;
      // Requisitos obligatorios
      let requisitosTramite = requisitosAll.filter(x => x.validar == 1); 
      let nroRequisitos = requisitosTramite.length;
      let nro = 0;
      for(let i = 0; i < requisitosTramite.length; i ++){
        for(let j = 0; j < requisitosSeleccionados.length; j++){
          if(requisitosTramite[i].id_requisito == requisitosSeleccionados[j]){
            nro++;
          }
        }
      }
      return (nroRequisitos == nro);
    }

    const Continuar = () => {
      let mensaje = '';
      if(!VerificaRequisitos()){
        mensaje += 'Tiene que marcar los requisitos obligatorios <br>';
      }
      if (mensaje == ''){
        Mensaje.Confirmar("¿Esta seguro de guardar los<br>requisitos?",siguientepagina);
      }else{
        Mensaje.info(mensaje);
      }
    }
    
    let siguientepagina=()=>{
      sInicio.addRequisitos(requisitos.value);
      
      // if(tramiteData.clas1 == 'PASAPORTES'){
        // router.push({path: '/subirdocumentos'})  
      // } else{
        router.push({path: '/datosadicionales'})    
      // }
    }

    let Regresar = () => {
      router.push({path: '/tramites'})       
    }


    onMounted(()=>{
      if(!tramiteData){
        router.push({path:'/tramites'})
      }
    })
    onMounted(fetchRequisitos);
    onMounted(requisitosStore);

    return { Cancelar, Regresar, Continuar, fetchRequisitos, filterTitulo, filterHijo, requisitos, requisitosStore, nroFojas,cantDocIdentidad,
       observacion, oNumbers,retornar,siguiente,requisitosModule,tipoTramites,tramite,isLoading}
  }
}
</script>