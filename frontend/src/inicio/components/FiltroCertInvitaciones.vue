<template>
    <div>
        <div class="row form-group">
            <div class="col-md-12">
                <label for="">CASO</label> 
                <span class="lb-error" v-if="formError.cod_motivo">Campo requerido</span>          
                <select  class="form-control"
                v-model="tramite.cod_motivo"
                @change="ObtenerTramite"
                :class="{error: formError.cod_motivo}"
                >
                <option value="" >SELECCIONAR</option>
                <option v-for="(item, index) in motivoTramitesList" :key="index" :value="item.cod_motivo">{{item.nombre}}</option>
                </select>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <label for="">TRÁMITE</label> 
                <span class="lb-error" v-if="formError.id_tramite">Campo requerido</span>
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
    </div>
</template>
  
<script>
  import api from '@/services/api';
  import * as Yup from "yup";
  export default {
    props :['tramite','formError', 'validador','params'],
    data(){
        return {
            tramitesList:[],
            motivoTramitesList:[],
        }
    },
    methods:{
        async ObtenerMotivoTramiteArraigo(){
            this.tramite.cod_motivo = '';
            this.tramite.id_tramite = '';
            let data ={ params:{...this.params,clas1:this.tramite.cod_tipo_tramite}}
            let result = await api.get(`/getcertMotivoTramite`,data).then((response) => {
                this.motivoTramitesList = response.data.content
            })
        },
        async ObtenerTramite(){     
            this.tramite.id_tramite = '';
            let data ={ params:{...this.params,clas1:this.tramite.cod_tipo_tramite,clas2:this.tramite.cod_motivo}}
            let result = await api.get(`/getcertInvitacionesTramite`,data).then((response) => {
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
        this.validador.cod_tiempo=null;
        this.validador.cod_motivo=null;
        this.validador.id_tramite=Yup.string().required();
        this.ObtenerMotivoTramiteArraigo();
    }
  }
  </script>