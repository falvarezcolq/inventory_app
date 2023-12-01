<template>
    <div>
        <div class="busqueda">
            <div class="busqueda_seccion">
                <p class="title">FOTOGRAFIA DE PERSONA QUE REALIZA EL INICIO DEL TRAMITE:</p>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="alert alert-info" role="alert">
                            <p><i class="fa fa-exclamation-triangle"></i> Registrar la foto de la persona que inicia el tramite.</p>
                        </div>
                        <div class="col-lg-6">
                            <button @click="startWebcam" class="btn btn-outline-primary" v-show="!camara && !foto"> ENCENDER CAMARA</button>
                            <button @click="captureImage" class="btn btn-success" v-show="camara && !foto"> TOMAR FOTOGRAFIA</button>
                            <button @click="startWebcam" class="btn btn-outline-primary" v-show="!camara && foto"> TOMAR  NUEVA FOTOGRAFIA</button>
                            <button @click="captureImage" class="btn btn-success" v-show="camara && foto"> TOMAR FOTOGRAFIA</button>
                            <br><br>
                            <button class="btn btn-danger" v-show="camara" @click="endWebCam">APAGAR CAMARA</button>
                            <br><br>
                        </div>
                    </div>
                    <div class="col-lg-6" style="text-align:center;">
                        <p> 
                            <i class="fa fa-camera" v-if="!camara"> FOTOGRAFÍA</i>
                            <i class="fa fa-circle" v-else style="color:crimson"> CAPTURANDO FOTOGRAFÍA ...</i>
                         </p>
                        <canvas ref="canvas" height="200" width="260" v-show="!camara"
                         style="border-radius: 5px;box-shadow: 5px 5px 15px gray;"></canvas>
                        <video ref="video" v-show="camara"  height="200" ></video>
                    </div>
                   
                   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import { Mensaje } from '@/tools/Mensaje';

export default {
    
    setup(){
        let videoStream = ref(null);
        let canvasContext = ref(null);
        let camara = ref(false);
        let foto = ref(null);
        let canvas = ref(null);
        let video = ref(null);
      
        
        let startWebcam = async ()=>{
            try {
                // Solicita acceso a la cámara
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                videoStream.value = stream;

                // // Muestra la imagen de la cámara en el elemento de video
                video.value.srcObject = stream;
                video.value.play();
                camara.value = true;
                canvasContext.value = canvas.value.getContext('2d');

            } catch (error) {
                console.error(error);
                Mensaje.error("Camara no encontrada");
            }
        }
        
        let endWebCam =()=>{
            try {
                if (videoStream.value) {
                    const tracks = videoStream.value.getTracks();
                    tracks.forEach((track) => {
                        track.stop();
                    });
                    camara.value=false;
                }
            } catch (error) {
                console.error(error);
                Mensaje.error("Ha ocurrido un error con la camara")
            }
        }
        
        let captureImage = ()=>{
            try {
                const videoElement = video.value;
                const canvasElement = canvas.value;
                // Copia la imagen de la cámara en el elemento canvas
                canvasContext.value.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                // Crea una imagen a partir del elemento canvas
                foto.value = canvasElement.toDataURL().split(';base64,')[1];
                // console.log(foto.value);
            
             } catch (error) {
                console.error(error);
                Mensaje.error("Ha ocurrido un error con la camara")
            }
            // // Muestra la imagen en un elemento img
            // const imageElement = new Image();
            // imageElement.src = image;
            // document.body.appendChild(imageElement);
            
            endWebCam()
        }



        return {
            videoStream,
            canvasContext,
            camara,
            foto,
            canvas,
            video,
            startWebcam,
            endWebCam,
            captureImage,

        } 
    },
};
</script>
  