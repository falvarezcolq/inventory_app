<template>
    <div ref="pdfContainer"></div>
</template>
  
<script>
import pdfobject from 'pdfobject';
import api from '@/services/api';
export default {
    props:['pdfDataUrl']
   ,
    methods: {
        loadpdf() {
            if (this.pdfDataUrl) {
                pdfobject.embed(this.pdfDataUrl, this.$refs.pdfContainer);
            }
        },
    },
    mounted() {
        this.loadpdf();
    }
}
</script>
<style>
.pdfobject-container {
    height: 30rem;
    border: 1rem solid rgba(0, 0, 0, .1);
}
</style>
  