<template>
    <div class="row form-group">
        <div class="col-md-12">
            <label for="">{{ $t('tramite') }}</label> 
            <span class="lb-error" v-if="formError.id_tramite">  {{ $t('campo_requerido') }}</span>
            <select  class="form-control"
                v-model="tramite.id_tramite"
                @change="SetCodTramite"
                :class="{error: formError.id_tramite}"
            >
                <option value="" >SELECCIONAR</option>
                <option v-for="(item, index) in tramitesList" :key="index" :value="item.id_tramite">{{item.nombre}}</option>
            </select>
        </div>         
    </div>

</template>
  
<script>
  import api from '@/services/api';
  import * as Yup from "yup";

  export default {
    props :['tramite','formError','params','validador'],
    data(){
        return {
            tramitesList:[],
        }
    },
    methods:{
        async ObtenerTramites(){     
            this.tramite.id_tramite = '';
            let data = { params:{...this.params,clas1:this.tramite.cod_tipo_tramite}};
            let result = await api.get(`/getTramitebyclas1`,data).then((response) => {
                this.tramitesList= response.data.content;        
            });
        },
        async SetCodTramite(){
            let id_tramite = Number(this.tramite.id_tramite);
            if(id_tramite != ''){
                this.tramite.cod_tramite = this.tramitesList.find(x => x.id_tramite == id_tramite).cod_tramite;
                this.tramite.code = this.tramitesList.find(x => x.id_tramite == id_tramite).code;
            }
        }, 
    },
    mounted(){
        this.validador.cod_tiempo=Yup.string();
        this.validador.cod_motivo=Yup.string();
        this.validador.id_tramite=Yup.string().required();
        this.ObtenerTramites();
    }
  }
  </script>