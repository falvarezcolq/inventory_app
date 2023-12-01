<template>
    <div>
        <div class="row form-group">
            <div class="col-md-12">
                <label for="">TIEMPO</label> <span class="lb-error" v-if="formError.cod_tiempo">Campo requerido</span>
                <select  class="form-control" 
                v-model="tramite.cod_tiempo"
                @change="MotivoTramite"
                :class="{error: formError.cod_tiempo}"
                >
                <option value="" >SELECCIONAR</option>
                <option v-for="(item, index) in tiempoTramitesList" :key="index" :value="item.cod_tiempo">{{item.nombre}}</option>
                </select>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <label for="">MOTIVO</label> <span class="lb-error" v-if="formError.cod_motivo">Campo requerido</span>          
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
                <label for="">TRÁMITE</label> <span class="lb-error" v-if="formError.id_tramite">Campo requerido</span>
                <select  class="form-control"
                v-model="tramite.id_tramite"
                :class="{error: formError.id_tramite}"
                @change="SetCodTramite"
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
    props:['tramite','formError','validador','params'],
    data(){
        return {
            tiempoTramitesList:[],
            tramitesList:[],
            motivoTramitesList:[],
        }
    },
    methods:{
        async TiempoTramite(){
            this.tramite.cod_tiempo = '';
            this.tramite.cod_motivo = '';
            this.tramite.id_tramite = '';
            let data = {params:this.params};

            let result = await api.get(`/getTiempoTramite/${this.tramite.cod_tipo_tramite}`,data).then((response) => {
                this.tiempoTramitesList = response.data.contenido;
            });
        },
        async MotivoTramite() {
            this.tramite.cod_motivo = '';
            this.tramite.id_tramite = '';
            let data ={ params:{...this.params,clas1:this.tramite.cod_tipo_tramite,clas2:this.tramite.cod_tiempo}}
            let result = await api.get(`/getCertMotivoPermanencia/${this.tramite.cod_tiempo}`, data)
            .then((response) => {
                this.motivoTramitesList = response.data.contenido
            })
        },
        async ObtenerTramite(){     
            this.tramite.id_tramite = '';
            let data ={ params:{...this.params,clas1:this.tramite.cod_tipo_tramite,clas2:this.tramite.cod_tiempo,clas3:this.tramite.cod_motivo}}
            let result = await api.get(`/getCertTramitePermanencia`,data).then((response) => {
                this.tramitesList = response.data.contenido;        
            });
        },
        async SetCodTramite(){
            let id_tramite = Number(this.tramite.id_tramite);
            if(id_tramite != ''){
                this.tramite.cod_tramite = this.tramitesList.find(x => x.id_tramite == id_tramite).cod_tramite;
                this.tramite.codigo = this.tramitesList.find(x => x.id_tramite == id_tramite).codigo;
            }
        }, 
        
    },
    mounted(){
        this.validador.cod_tiempo = Yup.string().required();
        this.validador.cod_motivo = Yup.string().required();
        this.validador.id_tramite = Yup.string().required();
        this.TiempoTramite();
    }
  }
  </script>