<template>
    <div class="col-lg-12 col-md-12 col-ms-12 mt-3">
        <div class="busqueda">
            <div class="busqueda_seccion">

                <p class="title" v-if="esInvitacion==false">DATOS DE REPRESENTANTE O TUTOR</p>
                <p class="title" v-if="esInvitacion">DATOS DE LA PERSONA A INVITAR</p>

                <!-- <div class="col-md-6" v-if="esInvitacion==false"> -->
                <div class="col-md-6 col-sm-12">
                    <label class="form-label">ES EL INTERESADO?</label>
                    <span class="lb-error"></span>
                    <br />
                    
                    <input class="mx-2" type="radio" id="true" value="true" v-model="estado" @click="limpiar" />
                    <label for="true">SI</label>

                    <input class="mx-2" type="radio" id="false" value="false" v-model="estado" />
                    <label for="false">NO</label>
                </div>
                <fieldset :disabled="estado !== 'false'">
                    <div class="row">
                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">RELACIÓN:</label>
                            <span class="lb-error" v-if="formError.relacion_tutor">
                                Campo
                                requerido
                            </span>
                            <select class="form-control" v-model="datosAdicionales.relacion_tutor"
                                :class="{ error: formError.relacion_tutor }">
                                <option value="">SELECCIONAR</option>
                                <option v-for="(item, index) in tipoReprTutorList" :key="index" :value="item.nombre">
                                    {{ item.nombre }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">NOMBRE:</label>
                            <span class="lb-error" v-if="formError.nombre_tutor">
                                Campo
                                requerido
                            </span>
                            <input type="text" class="form-control" v-model="datosAdicionales.nombre_tutor"
                                :class="{ error: formError.nombre_tutor }"
                                @input="datosAdicionales.nombre_tutor = $event.target.value.toUpperCase()" />
                        </div>
                        
                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">PRIMER APELLIDO:</label>
                            <span class="lb-error" v-if="formError.primer_ap_tutor">
                                Campo
                                requerido
                            </span>
                            <input type="txt" class="form-control" v-model="datosAdicionales.primer_ap_tutor"
                                :class="{ error: formError.primer_ap_tutor }"
                                @input="datosAdicionales.primer_ap_tutor = $event.target.value.toUpperCase()" />
                        </div>

                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">SEGUNDO APELLIDO:</label>
                            <span class="lb-error" v-if="formError.segundo_ap_tutor">
                                Campo
                                requerido
                            </span>
                            <input type="txt" class="form-control" v-model="datosAdicionales.segundo_ap_tutor"
                                :class="{ error: formError.segundo_ap_tutor }"
                                @input="datosAdicionales.segundo_ap_tutor = $event.target.value.toUpperCase()" />
                        </div>

                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">OTROS APELLIDOS:</label>
                            <span class="lb-error"></span>
                            <input type="text" class="form-control" v-model="datosAdicionales.otro_ap_tutor"
                                @input="datosAdicionales.otro_ap_tutor = $event.target.value.toUpperCase()" />
                        </div>

                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">NACIONALIDAD:</label>
                            <span class="lb-error" v-if="formError.nacionalidad_tutor">
                                Campo
                                requerido
                            </span>
                            <select class="form-control" v-model="datosAdicionales.nacionalidad_tutor"
                                :class="{ error: formError.nacionalidad_tutor }">
                                <option value="">SELECCIONAR</option>
                                <option v-for="(item, index) in nacionalidadList" :key="index"
                                    :value="item.cod_nacionalidad">{{ item.nombre_pais }}</option>
                            </select>
                        </div>

                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">TIPO DE DOCUMENTO:</label>
                            <span class="lb-error" v-if="formError.tipo_doc_tutor">
                                Campo
                                requerido
                            </span>
                            <select class="form-control" v-model="datosAdicionales.tipo_doc_tutor"
                                :class="{ error: formError.tipo_doc_tutor }">
                                <option value="">SELECCIONAR</option>
                                <option v-for="(item, index) in tipoDocumentoList" :key="index" :value="item.nombre">
                                    {{
                                        item.nombre
                                    }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 col-sm-12 mt-3">
                            <label class="form-label">NRO DE DOCUMENTO:</label>
                            <span class="lb-error" v-if="formError.num_doc_tutor">
                                Campo
                                requerido
                            </span>
                            <input type="text" class="form-control" v-model="datosAdicionales.num_doc_tutor"
                                :class="{ error: formError.num_doc_tutor }"
                                @input="datosAdicionales.num_doc_tutor = $event.target.value.toUpperCase()" />
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';
import * as Yup from 'yup';
export default {
    props: [
        'datosAdicionales',
        'formError',
        'nacionalidadList', // viene del cmponente padre
        'tipoDocumentoList', // viene del cmponente padre
        'esInvitacion',
        'validador',
        'esMenor'
    ],
    data() {
        return {
            dataForm: {
                relacion_tutor: "",
                nombre_tutor: "",
                primer_ap_tutor: "",
                segundo_ap_tutor: "",
                otro_ap_tutor: "",
                nacionalidad_tutor: "",
                tipo_doc_tutor: "",
                num_doc_tutor: "",
            },
            tipoReprTutorList: [],
            estado: 'true',
        }
    },
    methods: {
        asignarValidacion(){
            if (this.esInvitacion){
            this.validador.relacion_tutor = Yup.string().required();
            this.validador.nombre_tutor = Yup.string().required();
            this.validador.primer_ap_tutor = Yup.string().required();
            this.validador.nacionalidad_tutor = Yup.string().required();
            this.validador.tipo_doc_tutor = Yup.string().required();
            this.validador.num_doc_tutor = Yup.string().required();
            }
        },
        limpiar() {
            this.datosAdicionales.relacion_tutor = this.dataForm.relacion_tutor;
            this.datosAdicionales.nombre_tutor = this.dataForm.nombre_tutor;
            this.datosAdicionales.primer_ap_tutor = this.dataForm.primer_ap_tutor;
            this.datosAdicionales.segundo_ap_tutor = this.dataForm.segundo_ap_tutor;
            this.datosAdicionales.otro_ap_tutor = this.dataForm.otro_ap_tutor;
            this.datosAdicionales.nacionalidad_tutor = this.dataForm.nacionalidad_tutor;
            this.datosAdicionales.tipo_doc_tutor = this.dataForm.tipo_doc_tutor;
            this.datosAdicionales.num_doc_tutor = this.dataForm.num_doc_tutor;
        },
        async fetchReprTutor() {
            api.get("/getRepreTutor").then(response => {
                this.tipoReprTutorList = response.data.content;
            });
        },
    },
    mounted() {
        if(this.esInvitacion || this.esMeno ){
            this.estado ='false';
        }

        this.fetchReprTutor();
        this.asignarValidacion();
    }
}
</script>