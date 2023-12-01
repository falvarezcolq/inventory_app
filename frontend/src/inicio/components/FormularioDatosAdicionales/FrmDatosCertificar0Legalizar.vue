<template>
  <div class="col-lg-6 col-md-12 col-ms-12 mt-3"
    v-show="true || idTramiteData == 284 || idTramiteData == 80 || idTramiteData == 238 || idTramiteData == 92 || idTramiteData == 46 || idTramiteData == 43 || idTramiteData == 33 || idTramiteData == 207 || idTramiteData == 78 || idTramiteData == 282 || idTramiteData == 235 || idTramiteData == 208">
    <div class="busqueda">
      <div class="busqueda_seccion ">
        <p class="title">CERTIFICAR O LEGALIZAR TRÁMITE:</p>
        <div class="row form-group">


          <div class="col-10 col-md-10 text-end">

            <input type="checkbox" class="check-box-req" v-model="tramites_anteriores" id="activar" @change="TipoTramite">
            <label for="activar my-2" class="m-r-2 mx-2">ACTIVAR TRAMITES ANTERIORES:</label>
          </div>

          <div class="col-md-12 col-sm-12">
            <label class="form-label">TIPO TRÁMITE:</label>
            <select class="form-control" v-model="datosAdicionales.cod_tipo_tramite"
              :class="{ error: formError.cod_tipo_tramite }">

              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in tipoTramiteList" :key="index" :value="item.cod_tipo_tramite">{{ item.nombre  }}</option>
            </select>
          </div>

          <div v-if="datosAdicionales.cod_tipo_tramite == tipoTramites.NATURALIZACION && tramites_anteriores">
            <FitroNaturalizacionTA :tramite="datosAdicionales" 
            :formError="formError" 
            :validador="validador"
            :key="datosAdicionales.cod_tipo_tramite" 
            :params="params"/>
          </div>


          <div v-if="(datosAdicionales.cod_tipo_tramite == tipoTramites.PERMANENCIA || datosAdicionales.cod_tipo_tramite == tipoTramites.VISAS ) && tramites_anteriores">
            <FiltroPermanenciaVisasTA :tramite="datosAdicionales" :formError="formError" :validador="validador"
              :key="datosAdicionales.cod_tipo_tramite" 
              :params="params"/>
          </div>

          <div v-if="datosAdicionales.cod_tipo_tramite == tipoTramites.INVITACIONES && !tramites_anteriores">
            <FiltroCertInvitaciones :tramite="datosAdicionales" 
              :formError="formError" :validador="validador"
              :key="datosAdicionales.cod_tipo_tramite" 
              :params="params"
              />
          </div>

          <div v-if="(datosAdicionales.cod_tipo_tramite == tipoTramites.RECONOCIMIENTO || datosAdicionales.cod_tipo_tramite == tipoTramites.VISA ) && !tramites_anteriores">
            <FiltroCertReconocimiento :tramite="datosAdicionales" 
              :formError="formError" :validador="validador"
              :key="datosAdicionales.cod_tipo_tramite" 
              :params="params"
              />
          </div>

          <div v-if="(
            datosAdicionales.cod_tipo_tramite == tipoTramites.ANTIGUO_RESIDENTE ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.AMPLIACION || // no se ha registrado nada para ampliacion debido a qu o existe ningun registro que haya solicitido la certificacion de este tramite
            datosAdicionales.cod_tipo_tramite == tipoTramites.ARRAIGO ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.AUTORIZACION_SALIDA ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.CEDULA_DE_EXTRANJERO ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.CERTIFICADO_DE_NACIMIENTO ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.COMPLEMENTACION_DE_MOVIMIENTO_O_FLUJO_MIGRATORIO ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.DOCUMENTOS ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.MOVIMIENTO_O_FLUJO_MIGRATORIO ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.PASAPORTES ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.REGISTRO_DE_NO_ARRAIGO ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.RESOLUCION_ADMINISTRATIVA ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.TRIPULANTE ||
            datosAdicionales.cod_tipo_tramite == tipoTramites.TVF 
            
            ) && !tramites_anteriores">
            <FiltroCertOtrosTramites :tramite="datosAdicionales" 
              :formError="formError" :validador="validador"
              :key="datosAdicionales.cod_tipo_tramite" 
              :params="params"
              />
          </div>

          <div v-if="(datosAdicionales.cod_tipo_tramite == tipoTramites.NATURALIZACION
           || datosAdicionales.cod_tipo_tramite == tipoTramites.TRASPASO ) && !tramites_anteriores ">
            <FiltroCertNaturalizacion :tramite="datosAdicionales" :formError="formError" :validador="validador" 
              :key="datosAdicionales.cod_tipo_tramite" 
              :params="params"
              />
          </div>

          <div v-if="(datosAdicionales.cod_tipo_tramite == tipoTramites.PERMANENCIA ) && !tramites_anteriores ">
            <FiltroCertPermanencia :tramite="datosAdicionales" :formError="formError" :validador="validador" 
              :key="datosAdicionales.cod_tipo_tramite" 
              :params="params"
              />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import * as Yup from "yup";
import DatosTramite from '@/inicio/components/DatosTramite.vue';
import TipoTramites from '@/constantes/TipoTramites';
import FiltroArraigo from '@/inicio/components/FiltroArraigo.vue';
import FiltroPermanencia from '@/inicio/components/FiltroPermanencia.vue';
import FiltroTramiteGeneral from '@/inicio/components/FiltroTramiteGeneral.vue';
import FiltroInvitaciones from '@/inicio/components/FiltroInvitaciones.vue';
import FiltroTraspaso from '@/inicio/components/FiltroTraspaso.vue';
import FiltroTvf from '@/inicio/components/FiltroTvf.vue';
import { useInicioStore } from '@/stores/useInicioStore';
import FitroNaturalizacionTA from '@/inicio/components/FiltroNaturalizacionTA.vue';
import FiltroPermanenciaVisasTA from '@/inicio/components/FiltroPermanenciaVisasTA.vue';
import FiltroCertInvitaciones from '@/inicio/components/FiltroCertInvitaciones.vue';
import FiltroCertReconocimiento from '@/inicio/components/FiltroCertReconocimiento.vue';
import FiltroCertOtrosTramites from '@/inicio/components/FiltroCertOtrosTramites.vue';
import FiltroCertNaturalizacion from '@/inicio/components/FiltroCertNaturalizacion.vue';
import FiltroCertPermanencia from '@/inicio/components/FiltroCertPermanencia.vue';
export default {
  components: {
    FitroNaturalizacionTA,
    FiltroPermanenciaVisasTA,
    FiltroCertInvitaciones,
    FiltroCertReconocimiento,
    FiltroCertOtrosTramites,
    FiltroCertNaturalizacion,
    FiltroCertPermanencia,
    //  DatosTramite,
    //  FiltroArraigo,
    //  FiltroPermanencia,
    //  FiltroTramiteGeneral,
     FiltroInvitaciones,
    //  FiltroTraspaso,
    //  FiltroTvf 
    },


  props: [
    'datosAdicionales',
    'formError',
    'validador',
    'params',
  ],
  data() {
    return {
      dataForm: {
        cert_tramite: "",
      },
      tipoTramites: TipoTramites,
      tipoTramiteList: [''],
      tramiteList: [''],
      tramite: {
        cod_tipo_tramite: '',
        cod_tiempo: '',
        cod_motivo: '',
        id_tramite: '',
        cod_tramite: ''
      },
      sInicio: useInicioStore(),
      tramites_anteriores: false
    }
  },
  methods: {
    asignarValidacion() {
      this.validador.cert_tramite = Yup.string().required();
    },
    async TipoTramite() {
      let edad = this.sInicio.getEdad;
      this.datosAdicionales.cod_tipo_tramite = ''
      this.datosAdicionales.cod_tiempo = ''
      this.datosAdicionales.cod_motivo = ''
      this.datosAdicionales.id_tramite = ''

      if (this.tramites_anteriores) {
        let result = await api.get(`/getTipoTramite0CertificacionAnterior`, { params: this.params }).then((response) => {
          this.tipoTramiteList = response.data.contenido;
        });
      } else {
        let result = await api.get(`/getTipoTramite0Certificacion`, { params: this.params }).then((response) => {
          this.tipoTramiteList = response.data.contenido;
        });
      }
    }
  },
  mounted() {
    this.validador.cod_tipo_tramite = Yup.string().required();
    this.TipoTramite();
  }
}
</script>