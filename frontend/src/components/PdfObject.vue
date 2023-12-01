<template>
<div>
    <div  ref="pdfContainer">
        <div class="zoom">
            <img class="img" :src="imagen">
        </div>
    </div>
</div>
</template>
  
<script>
import pdfobject from 'pdfobject';
import api from '@/services/api';
import { TipoHospedaje } from '@/constantes/TipoHospedaje';
export default {
    props: ['pdfDataUrl']
   ,
    data() {
        return {
            imagen:null,
        }
    },
    methods: {
        loadpdf() {
            if (this.pdfDataUrl) {
                this.imagen = null;
                if (this.pdfDataUrl.includes('data:image')) {
                    this.imagen = this.pdfDataUrl;
   
                } else {
                pdfobject.embed(this.pdfDataUrl, this.$refs.pdfContainer);
            }
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
    height: 60rem;
    border: 1rem solid rgba(0, 0, 0, .1);
}
.img{
	border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 100%;
}

.zoom {
  transition: transform .1s; /* Animation */
  width: 100%;
  margin: 0 auto;
	border-radius: 20px;
}

.zoom:hover {
  transform: scale(1.0); /* (130% zoom) */
}
</style>
  