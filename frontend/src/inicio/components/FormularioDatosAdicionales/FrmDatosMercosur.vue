<template>
     <div class="col-lg-6 col-md-12 col-ms-12 mt-3">
        <div class="busqueda">
            <div class="busqueda_seccion">
                <p class="title">MERCOSUR</p>
                <div class="col-md-12">
                    <label class="form-label">¿ADQUIRIÓ ANTERIORMENTE RESIDENCIA MERCOSUR?</label>
                    <span class="lb-error"></span>
                    <br />
                    <input class="mx-2" type="radio" id="rbtntrue"  value="SI" v-model="datosAdicionales.mercosur"/>
                    <label for="rbtntrue">SI</label>
                    <input class="mx-2" type="radio" id="rbtnfalse" value="NO" v-model="datosAdicionales.mercosur" :checked="true" />
                    <label for="rbtnfalse">NO</label>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import api from '@/services/api';
export default {
    props: [
        'datosAdicionales',
        'formError',
    ],
    data() {
        return {
            dataForm: {
                mercosur: "false",
            },
            tipoReprTutorList: [],
            estado: 'true',
        }
    },
    methods: {

    },
    mounted() {
        // this.datpsAdicionales.mercosur = this.dataForm.mercosur
    }
}
</script>