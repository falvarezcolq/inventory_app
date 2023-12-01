<template>
  <div>
    <ProgressStep :step=1 />
    <div class="row">
      <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 form-group">
        <h3>{{ $t('elija_tramite') }}</h3>
        <div class="list-group">
          <div class="list-group-item list-group-item-action btn" :class="{'bg-primary bg-gradient text-white':tramite.cod_tipo_tramite == item.cod_tipo_tramite }"
            v-for="(item, index) in tipoTramitesList" :key="index" :value="item.cod_tipo_tramite" @click="asignarCodTramite(item.cod_tipo_tramite)"
          >
            <i class="fa fa-caret-right" v-if="tramite.cod_tipo_tramite == item.cod_tipo_tramite"></i>
            {{item.nombre}}
          </div>
        </div>
      </div>

      <div class="col-12 col-md-8 form-group" v-if="tramite.cod_tipo_tramite !=''" >    
        <h3>{{ $t('seleccionar_tramite') }}</h3>      

        <div v-if="tramite.cod_tipo_tramite == tipoTramites.ARRAIGO">
          <FiltroArraigo
              :tramite="tramite" 
              :formError="formError" 
              :validador="validador"
              :key="tramite.cod_tipo_tramite"
              :params="params"
          />
        </div>  

        <div v-if="tramite.cod_tipo_tramite == tipoTramites.PERMANENCIA">
          <FiltroPermanencia 
            :tramite="tramite"
            :formError="formError" :validador="validador"
            :key="tramite.cod_tipo_tramite"
            :params="params"
          />
        </div>
        
        <div v-if="tramite.cod_tipo_tramite == tipoTramites.TVF">
          <FiltroTvf 
            :tramite="tramite"
            :formError="formError" :validador="validador"
            :key="tramite.cod_tipo_tramite"
            :params="params"
          />
        </div>

        <div v-if="tramite.cod_tipo_tramite == tipoTramites.INVITACIONES || 
                  tramite.cod_tipo_tramite == tipoTramites.NATURALIZACION" 
        >
          <FiltroInvitaciones 
            :tramite="tramite" 
            :formError="formError" :validador="validador" 
            :params="params"
            :key="tramite.cod_tipo_tramite"
          />
        </div> 

        <div v-if="tramite.cod_tipo_tramite == tipoTramites.TRASPASO">
          <FiltroTraspaso 
            :tramite="tramite" 
            :formError="formError" :validador="validador" 
            :params="params"
            :key="tramite.cod_tipo_tramite"
          />
        </div> 

        <div v-if="tramite.cod_tipo_tramite == tipoTramites.AUTORIZACION_SALIDA ||
          tramite.cod_tipo_tramite == tipoTramites.CERTIFICACION ||
          tramite.cod_tipo_tramite == tipoTramites.DOCUMENTOS ||
          tramite.cod_tipo_tramite == tipoTramites.LEGALIZACION ||
          tramite.cod_tipo_tramite == tipoTramites.RECONOCIMIENTO ||
          tramite.cod_tipo_tramite == tipoTramites.VISA ||
          tramite.cod_tipo_tramite == tipoTramites.PASAPORTES ||
          tramite.cod_tipo_tramite == tipoTramites.COMPLEMENTACION_DE_MOVIMIENTO_O_FLUJO_MIGRATORIO ||
          tramite.cod_tipo_tramite == tipoTramites.TRIPULANTE ||
          tramite.cod_tipo_tramite == tipoTramites.CONDONACION_DE_MULTAS 
        ">
          <FiltroTramiteGeneral 
          :tramite="tramite" 
          :formError="formError" :validador="validador"
          :params="params"
          :key="tramite.cod_tipo_tramite"
          />
        </div>
  
      </div>

    </div>
    <div class="row">
      <div class="col-12 col-md-12" v-if="tramite.id_tramite !=''" >
        <!-- <TramiteDetalle :id_tramite="tramite.id_tramite" :key="tramite.id_tramite"/> -->
      </div>
    </div>

    <div class="row mt-4">
        <div class="col-12 col-md-12 text-end">
          <button type="button" class="btn btn-secondary btn-sm"
          @click="Cancelar"
          >
            <i class="fa fa-close"></i> {{ $t('cancelar') }}
          </button>&nbsp;
          <button type="button" class="btn btn-primary btn-sm"
            @click="Continuar"
            v-if="!tramiteModulo || esPersonaJuridica"
          ><i class="fa fa-save"></i> {{ $t('continuar') }}</button>
      
        </div>
      </div>
    <Loading  v-show="isLoading"/>
  </div>
</template>

<script>
import { computed, onMounted, ref ,watch} from 'vue';
import { useRouter } from 'vue-router';

import api from '@/services/api';
import ProgressStep from '@/inicio/components/ProgressStep.vue';
import DatosTramite from '@/inicio/components/DatosTramite.vue';
import { useInicioStore } from '@/stores/useInicioStore';
import TipoTramites from '@/constantes/TipoTramites';
import FiltroArraigo from '../components/FiltroArraigo.vue';

import * as Yup from 'yup';
import FiltroPermanencia from '../components/FiltroPermanencia.vue';
import FiltroTramiteGeneral from '../components/FiltroTramiteGeneral.vue';
import FiltroInvitaciones from '../components/FiltroInvitaciones.vue';
import FiltroTraspaso from '../components/FiltroTraspaso.vue';
import FiltroTvf from '../components/FiltroTvf.vue';
import TramiteDetalle from '../components/TramiteDetalleRequisitos.vue';
import { Mensaje } from '@/tools/Mensaje';
import {ws} from '@/services/webservices'
import { watchEffect } from 'vue';
import Loading from '@/components/Loading.vue';
import LanguageChanger from '../../components/LanguageChanger.vue';

export default {
  components: { ProgressStep, DatosTramite, FiltroArraigo, FiltroPermanencia, FiltroTramiteGeneral, FiltroInvitaciones,FiltroTraspaso, FiltroTvf ,TramiteDetalle, Loading, LanguageChanger},
  setup(){
    let router = useRouter();
    let tipoTramitesList = ref([])
    let listaGrupoTramite = ref([])
    let tramite = ref({
      cod_tipo_tramite: '',
      cod_tiempo: '',
      cod_motivo: '',
      id_tramite: '',
      cod_tramite: '',
      codigo: ''
    })
    let isLoading = ref(false);
    let persona = ref({});
    let formError = ref({});
    let sInicio = useInicioStore();
    let tramiteData = ref(sInicio.getTramite);
    let tramiteModulo = ref(false)
    let objTramite = ref([]);
    let tipoTramites = ref({});
    let validador = ref({});
    tipoTramites = TipoTramites;
    let id_proceso_inicio = ref(null)

    let params = ref(null);

    let Cancelar = () => {
      Mensaje.Confirmar( "¿Confirma la cancelación del trámite?", () => {
        sInicio.reset();
        router.push({path: '/mistramites'});
      })
    }
    let cargarTipoTramite = async () => {
      isLoading.value = true;
      tipoTramitesList.value = await ws.fetchTipoTramitePersonaNatural()
      isLoading.value = false;
    }

    let asignarCodTramite=(cod_tipo_tramite)=>{
      tramite.value.cod_tipo_tramite=cod_tipo_tramite
      limpiarOpciones()
    }
    let limpiarOpciones = ()=>{
      tramite.value.cod_tiempo = '';
      tramite.value.cod_motivo = '';
      tramite.value.id_tramite = '';
      tramite.value.codigo = '';
    }

    let retornar = ()=>{
      router.push({path: '/mistramites'});
    }

    // let cargarTramite = () =>{
    //   let sTramite = sInicio.getTramite;
    //   tramiteModulo.value = sTramite.module;
    //   if( tramiteModulo.value ){
    //    tramite.value = sTramite.data
    //   }
    // }

    const Continuar = async () => {
      try {
        validador.value.cod_tipo_tramite = Yup.string().required();
        let schemaForm = Yup.object().shape(validador.value);
        await schemaForm.validate(tramite.value, { abortEarly: false })
        if (tramite.value.id_tramite && tramite.value.id_tramite!=''){
          if(tramite.value.cod_tipo_tramite=='PASAPORTES'){
            Mensaje.Confirmar("¿Esta seguro de guardar los<br>datos del trámite?",irRequisitosDOcSinGuardar)
          }else{
            Mensaje.Confirmar("¿Esta seguro de guardar los<br>datos del trámite?",irRequisitosSinGuardar)
          }   
        }    
        else{
          Mensaje.info("Debe seleccionar un tramite!")
        }

      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        });
      } 
    }


    let irRequisitosSinGuardar = async () => {
        try {
              let tramiteData = await ws.getTramite(tramite.value.id_tramite)
              sInicio.addTramiteData(tramiteData) 
              sInicio.addIDTramite(Number(tramite.value.id_tramite))
              sInicio.addTramite(tramite.value)
              sInicio.addCodTramite(tramite.value.cod_tramite)
              router.push({path: '/datosadicionales'});
        } catch (error) {
          console.log(error.message);
        }
    }


    let irRequisitosDOcSinGuardar = async () => {
        try {
          let tramiteData = await ws.getTramite(tramite.value.id_tramite)
          sInicio.addTramiteData(tramiteData) 
          sInicio.addIDTramite(Number(tramite.value.id_tramite))
          sInicio.addTramite(tramite.value)
          sInicio.addCodTramite(tramite.value.cod_tramite)
          router.push({path: '/subirdocumentosP'}); 
          isLoading.value = false;
        } catch (error) {
          isLoading.value = false;
          console.log(error.message);
        }
    }

    let cargarParametros = async ()=>{
      let usuario= await ws.getUsuarioStore();
      params.value = {
        grupo: usuario.id_nacionalidad,
        cert: "%",
        Hmenor: usuario.edad > 17 ? "S":"N",
        mLugarEmi:"G"
      }
    } 

    let Regresar = () => {
      router.push({path: '/inicio'})       
    }
    
    let siguiente=()=>{
      router.push({path: '/requisitos'})
    }

    onMounted(async()=>{
      await cargarParametros();
      await cargarTipoTramite();
    })

    watchEffect(tramite.value, (id_tramite) => {
      console.log(id_tramite)
      // getTramiteDate(id_tramite)
    })

    return{ 
      Cancelar,
      listaGrupoTramite,
      Regresar, 
      Continuar, 
      tipoTramitesList,
      tramite, 
      formError, 
      persona,
      objTramite,
      tipoTramites,

      validador,
      limpiarOpciones,
      retornar,
      tramiteModulo,
      siguiente,
      params,
      asignarCodTramite,
      tramiteData,
      isLoading,
    }
  },

}
</script>
