<template>
  <div>
    <!-- <div class="row">
      <div class="col-12 mt-3 text-end">
        <LanguageChanger/>
      </div>
    </div> -->
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">{{ $t('info_personal') }}</p>
        <div class="row form-group">
          <!-- <div class="col-12 col-md-3 form-group">
            <DatoFoto />
          </div> -->
          <div class="col-12 col-md-12  form-group persona" v-if="userauth">
            <div class="row form-group">
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('nombre') }}:</label>
                {{ userauth.username }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('correo') }}</label>
                {{ userauth.email }}
              </div>
              <div class="col-4 col-md-4">
                <label class="lbPersona">{{ $t('direccion') }}</label>
                {{ userauth.address }}
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
    let userauth = ref(null);
    let isLoading = ref( false );
    let getUsuario = async () => {
      isLoading.value = true;
      userauth.value = await ws.getUsuario();
      isLoading.value = false;
    }
    onMounted(getUsuario)
    return {
      userauth,
      moment,
    }
  },
}
</script>
