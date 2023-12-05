<template>
  <div class="form-group">
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DOCUMENTO:</p>
        <div class="datos-tramite" style="padding: 0 25px;"> 
          <!-- <div class="row">
            <div class="col-12 col-md-12 text-center mt-2">
              <div class="containter-img">
                  <img class="user" v-bind:src="foto_perfil" alt="Imagen de perfil" v-if = "foto_perfil" width="150" height="150">
                  <img class="user" :src="require('@/assets/perfil.png')" alt="Your Image" v-else  width="150" height="150">
              </div>
              
              <label for="file-upload-perfil" class="btn btn-sm btn-outline-success" >
                  <i class="fa fa-cloud-upload"></i> Subir foto de usuario
              </label>
              <input @change="subirFotoPerfil($event)" type="file" :id="'file-upload-perfil'" style="display: none;" />
            </div>
          </div> -->
          <div class="row form-group">
            <div class="col-12 col-md-12 text-center mt-2">
              <div class="containter-img">
                  <img class="doc" v-bind:src="foto_documento1" alt="Imagen de perfil" v-if="foto_documento1" style="width: 100%;">
                  <img class="doc"  :src="require('@/assets/default_document.png')" alt="Your Image" v-else  style="width: 100%;">
              </div>
              <label for="file-upload-documento1" class="btn btn-sm btn-outline-success w-100" >
                  <i class="fa fa-cloud-upload"></i> FOTO {{ persona ? persona.tipo_doc_nombre:'DOCUMENTO'}} (FRONTAL)
              </label>
              <input @change="subirFotoDoc1($event)" type="file" :id="'file-upload-documento1'" style="display: none;" />
            </div>
          </div>
          <div class="row form-group">
            <div class="col-12 col-md-12 text-center mt-2">
              <div class="containter-img">
                  <img class="doc" v-bind:src="foto_documento2" alt="Imagen de perfil" v-if ="foto_documento2" style="width: 100%;">
                  <img class="doc" :src="require('@/assets/default_document.png')" alt="Your Image" v-else  style="width: 100%;">
              </div>
              <label for="file-upload-documento2" class="btn btn-sm btn-outline-success w-100" >
                  <i class="fa fa-cloud-upload"></i> FOTO {{ persona ? persona.tipo_doc_nombre:'DOCUMENTO'}} (REVERSO si tiene) 
              </label>
              <input @change="subirFotoDoc2($event)" type="file" :id="'file-upload-documento2'" style="display: none;" />
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
  
  import moment from 'moment';
  import { ws } from "@/services/webservices";
  import { Mensaje } from "@/tools/Mensaje";
  import api from "@/services/api";

  import TipoArchivos from '@/constantes/TipoArchivos'



  export default {
    components: {
      Loading,
      SinResultado
    },
    setup() {

      let persona = ref(null);
      let foto_perfil = ref(null);
      let foto_documento1 = ref(null);
      let foto_documento2 = ref(null);
      

      let getUsuario = async () => {
        persona.value = await ws.getUsuario();
        console.log(persona.value)
      }



      let subirFotoPerfil = async (e)=>{

        try{
          let archivo = e.target.files[0];
          if( !archivo ) return ;
          const url = '/persona/subirfotoperfil';
          cargarArchivo(e,url,async()=>{
            Mensaje.success("¡Archivo subido con éxito!")
            persona.value = await ws.getUsuario();
            cargarFotoDePerfil()
          })
        } catch(error){
          console.log(error.message);
          Mensaje.error("Error:"+error.message)
        }
      }  

     

      let cargarArchivo = async (e,url,callback) => {
      try {
        let archivo = e.target.files[0];
        if (!archivo) return;
          const imagenesAceptadas = TipoArchivos.TipoImagenes;
          // const archivosAceptados = TipoArchivos.TipoNoImagen;
        if (imagenesAceptadas.includes(archivo['type'])) {
          resizeImage(archivo,url,callback)
        // } else if (archivosAceptados.includes(archivo['type'])) {
        //   guardarArchivo(archivo,url,callback,archivo.name);
        } else {
          Mensaje.error("El archivo seleccionado no tiene el formato aceptado, solamente imágenes son válidos. ")
        }
      } catch (error) {
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }
     

    let resizeImage = (file,url,callback) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {

            let tamanhoMinimoAceptable= img.width > img.height ? img.width : img.height ;
            if (tamanhoMinimoAceptable < 100 ){
              Mensaje.error("La imagen no alcanza el tamaño minimo aceptado")
              return;
            }
            const maxWidth = 4096;
            const maxHeight = 4096;
            let newWidth = img.width;
            let newHeight = img.height; 
            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }
            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
            }
            const max = newWidth > newHeight ? newWidth: newHeight;
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const qualityImage = 1 - (0.0002)*(max-100);
            canvas.toBlob((blob) => {
              guardarArchivo(blob,url,callback,file.name)
            }, 'image/jpeg', qualityImage)
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    let guardarArchivo = async (archivo,url, callback,name) => {
      try {
          const formData = new FormData();
          formData.append('archivo', archivo, name);
          let result = await api.post(url,formData)
          if (result.status == 200 && result.data.code ==1){
            callback()
          }else{
            Mensaje.error("Error")
          }
      } catch (error) {
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }

      let cargarFotoDePerfil = async() =>{
        if (persona.value && persona.value.foto_perfil){
           await getPerfil(persona.value.foto_perfil);
        }
      } 

      let subirFotoDoc1 = async (e)=>{
        try{
          let archivo = e.target.files[0];
          if( !archivo ) return ;
          const url = '/persona/subirDoc1';
          cargarArchivo(e,url,async()=>{
            Mensaje.success("¡Archivo subido con éxito!")
            persona.value = await ws.getUsuario();
            cargarFotoDocumento1()
          })
        } catch(error){
          console.log(error.message);
          Mensaje.error("Error:"+error.message)
        }
      }   

      let cargarFotoDocumento1 = async() =>{

        if (persona.value && persona.value.foto_documento1){
           await getDocumento1(persona.value.foto_documento1);
        }
      } 

      let subirFotoDoc2 = async (e)=>{
        try{
          let archivo = e.target.files[0];
          if( !archivo ) return ;
          const url = '/persona/subirDoc2';
          cargarArchivo(e,url,async()=>{
            Mensaje.success("¡Archivo subido con éxito!")
            persona.value = await ws.getUsuario();
            cargarFotoDocumento2()
          })
        } catch(error){
          console.log(error.message);
          Mensaje.error("Error:"+error.message)
        }
      }   

      let cargarFotoDocumento2 = async() =>{
        if (persona.value && persona.value.foto_documento2){
           await getDocumento2(persona.value.foto_documento2);
        }
      } 


      let getPerfil = async(nombre_archivo)=>{
        await api.get(`/getfile/${nombre_archivo}`, {
          responseType: 'blob'
        }).then( res =>{
          var reader = new window.FileReader();
          reader.readAsDataURL(res.data); 
          reader.onload = function() {
            foto_perfil.value = reader.result;
          }
        }
        ).catch(err=>{return null});
      } 

      let getDocumento1 = async(nombre_archivo)=>{
        await api.get(`/getfile/${nombre_archivo}`, {
          responseType: 'blob'
        }).then( res =>{
          var reader = new window.FileReader();
          reader.readAsDataURL(res.data); 
          reader.onload = function() {
            foto_documento1.value = reader.result;
          }
        }
        ).catch(err=>{return null});
      } 

      let getDocumento2 = async(nombre_archivo)=>{
        await api.get(`/getfile/${nombre_archivo}`, {
          responseType: 'blob'
        }).then( res =>{
          var reader = new window.FileReader();
          reader.readAsDataURL(res.data); 
          reader.onload = function() {
            foto_documento2.value = reader.result;
          }
        }
        ).catch(err=>{return null});
      } 
    

      onMounted(async()=>{
        await getUsuario();
        await cargarFotoDePerfil();
        await cargarFotoDocumento1();
        await cargarFotoDocumento2();
      })
      return {
        subirFotoPerfil,
        subirFotoDoc1,
        subirFotoDoc2,
        persona,
        cargarFotoDePerfil,
        foto_perfil,
        foto_documento1,
        foto_documento2,
      }
    },
  }
  </script>
  <style>
  /* .user {
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
  }*/
  /* .doc {
    display: inline-block;
    max-width: 400px;
    height:auto;
    border-radius: 10px;
    object-fit: cover;
  }  */
</style>
  