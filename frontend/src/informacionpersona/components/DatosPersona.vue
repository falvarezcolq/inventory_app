<template>
  <div>
    <div class="row">
      <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>
    </div>
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">{{ $t('info_personal') }}</p>
        <div class="row form-group">
          <!-- <div class="col-12 col-md-3 form-group">
            <DatoFoto />
          </div> -->
          <div class="col-12 col-md-12  form-group persona" v-if="persona">
            <div class="row form-group">
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('nombre') }}:</label>
                {{ persona.nombres }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('primer_apellido') }}</label>
                {{ persona.primer_apellido }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('segundo_apellido') }}</label>
                {{ persona.segundo_apellido }}
              </div>
            </div>

            <div class="row form-group">
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('fecha_nacimiento') }}</label>
                {{ persona.fecha_nacimiento ? moment(persona.fecha_nacimiento).format("DD/MM/YYYY") : "" }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('tipo_documento') }}</label>
                {{ persona.tipo_doc_nombre }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('nro_documento') }}</label>
                {{ persona.nro_documento }}
              </div>
            </div>

            <div class="row form-group">
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('nacionalidad') }}</label>
                {{ persona.nacionalidad_nombre }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('pais_nacimiento') }}</label>
                {{ persona.pais_nacimiento_nombre }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('genero') }}</label>
                {{ persona.genero_nombre }}
              </div>
            </div>
            <div class="row form-group">
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('telefono') }}</label>
                {{ persona.telefono }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('correo') }}</label>
                {{ persona.email }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('direccion') }}</label>
                {{ persona.direccion }}
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Loading from '@/components/Loading.vue';
import SinResultado from '@/components/SinResultado.vue';
import DatoFoto from '@/informacionpersona/components/DatosFoto.vue';

import moment from 'moment';
import { ws } from "@/services/webservices";
import LanguageChanger from '../../components/LanguageChanger.vue';

export default {
  components: {
    Loading,
    SinResultado,
    DatoFoto,
    LanguageChanger
  },
  setup() {
    let persona = ref(null);
    let isLoading = ref( false );
    let getUsuario = async () => {
      isLoading.value = true;
      persona.value = await ws.getUsuario();
      isLoading.value = false;
    }
    onMounted(getUsuario)
    return {
      persona,
      moment,
    }
  },
}
</script>
