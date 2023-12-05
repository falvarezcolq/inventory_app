<template>
    <div>

        
        <div class="mt-4 busqueda">
            <div class="busqueda_seccion">
                <p class="title">OTROS INGRESOS POR CONCEPTO DE:</p>
                <div class = "row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="row form-group">
                            <div class = "mt-2 col-lg-6 col-md-6 col-sm-12">
                                <label for = "">TIPO INGRESO:</label><span class = "lb-error" v-if="formError.tipo_ingreso">  Campo requerido</span>
                                
                                <select class = "form-control mt-2"
                                v-model.trim="datosAdicionalesOtroIng.tipo_ingreso"
                                :class="{error: formError.tipo_ingreso}" 
                                
                                > 
                                    <option value = "">SELECCIONAR</option>
                                    <option v-for="(item, index) in tipoOtroIngrList" :key="index" :value="item.nombre">{{item.nombre}}</option>
                                </select>
                                
                            </div>
                            <div class = "mt-2 col-lg-6 col-md-6 col-sm-12">
                                <label for = "">DESCRIPCIÓN OTRO:</label><span class = "lb-error" ></span>
                            <input class = "mt-2 form-control" type = "text" 
                            :disabled="datosAdicionalesOtroIng.tipo_ingreso != 'OTRO'?' ': disabled"
                            v-model.trim="datosAdicionalesOtroIng.otro_descripcion"
                            :class="{error: formError.otro_descripcion}" 
                                @keyup="datosAdicionalesOtroIng.otro_descripcion = datosAdicionalesOtroIng.otro_descripcion.toUpperCase()"
                            >  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4 busqueda">
            <div class="busqueda_seccion">
                <p class="title">DATOS DE INGRESO MENSUAL</p>            
                <div class = "row form-group">
                    <div class = "col-lg-6 col-md-6 col-sm-12 mt-2">
                        <label for = "">TIPO DE MONEDA:</label><span class = "lb-error" v-if="formError.tipo_moneda">  Campo requerido</span>
                        <select class = "form-control"
                        v-model.trim="datosAdicionalesOtroIng.tipo_moneda"
                        :class="{error: formError.tipo_moneda}" 
                        @keyup="datosAdicionalesOtroIng.tipo_ingreso = datosAdicionalesOtroIng.tipo_moneda.toUpperCase()"
                        >
                            <option value = ""> SELECCIONAR</option>
                            <option v-for="(item, index) in tipoMonedaList" :key="index" :value="item.nombre">{{item.nombre}}</option>
                        </select>    
                    </div>
                    <div class = "col-lg-6 col-md-6 col-sm-12 mt-2">
                        <label for = "">MONTO:</label><span class = "lb-error" v-if="formError.monto"> Campo requerido</span>
                        <input type = "text" class = "form-control" 
                        equired autocomplete="off" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                        v-model.trim="datosAdicionalesOtroIng.monto"
                        :class="{error: formError.monto}" 
                        
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12 col-md-12 text-end">
                <button type="button" class="btn btn-secondary btn-sm"
                    @click="Cancelar"
                ><i class="fa fa-close"></i> CANCELAR
                </button>&nbsp;
                <button type="button" class="btn btn-primary btn-sm" @click="Continuar()" v-if="!moduleOIng">
                    <i class="fa fa-save"></i> CONTINUAR
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    import { ref, onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import * as Yup from 'yup';
    import api from '@/services/api'
    import ProgressStep from '@/inicio/components/ProgressStep.vue'
    import DatosTramite from '@/inicio/components/DatosTramite.vue';
    import { useInicioStore } from '@/stores/useInicioStore'
    import { useRegistroStore } from "@/stores/useRegistroStore";
    import { Mensaje } from '@/tools/Mensaje';
    import { ws } from "@/services/webservices";

    export default{
        components: { ProgressStep, DatosTramite},
        setup() {
            let router = useRouter();
            let tipoMonedaList = ref([]);
            let tipoOtroIngrList = ref([]);
            let formError = ref({});
            let datosAdicionalesOtroIng= ref({
                tipo_ingreso: '',
                tipo_moneda: '',
            });
            let idPersonaData = ref();
            let idTramiteData = ref();
            let idDefinitivaData = ref();
            let estado=ref(true);
            let sInicio = useInicioStore();
            let sRegistro = useRegistroStore();
            idPersonaData.value = sInicio.getIDPersona;
            idTramiteData.value = sInicio.getIDTramite;
            idDefinitivaData.value = sInicio.getIDDefinitiva;

            let schemaForm = Yup.object().shape({
                tipo_ingreso: Yup.string().required(),
                tipo_moneda: Yup.string().required(),
                monto: Yup.string().required(),
            })

            let fetchMoneda = () => api.get('/getParametro/PAR_MONEDA').then((response) => {
            tipoMonedaList.value = response.data.content
            })

            let fetchOtroIngr = () => api.get('/getParametro/PAR_INGRESO').then((response) => {
            tipoOtroIngrList.value = response.data.content
            })

            let validar = async () =>{
                try{
                    await schemaForm.validate(datosAdicionalesOtroIng.value, { abortEarly: false })
                   return true;
                     
                } catch (err) {
                    formError.value = {}
                    err.inner.forEach((error) => {
                    if(error.path && !formError[error.path]){
                        formError.value[error.path] = error.message
                    }
                    })
                    return false;
                }
            }

            let Continuar = async() =>{
                try {
                    if (await validar()) {
                        // let datosOI = {
                        //     datosAdicionalesOtroIng: datosAdicionalesOtroIng.value,
                        //     idDefinitivaData: idDefinitivaData.value,
                        // }

                   
                        // let result = await api.post('/proceso_inicio/datosAdicionalesOtroIng', datosOI);
                        // if (result.status === 201 && result.data.code === 1) {
                        //     let procesoInicio  = await ws.getProcesoInicio(idDefinitivaData.value)
                        
                        sInicio.addDatosAdicionalesOtroIng(datosAdicionalesOtroIng.value)
                        //     sInicio.reset()
                        //     sRegistro.reset();
                            // sRegistro.addIDProceso(idDefinitivaData.value);
                            // sRegistro.addIDTramite(idTramiteData.value);
                            // sRegistro.addProcesoInicio(procesoInicio)
                            router.push({ path: "/subirdocumentosP" });
                        // }
                    }
                } catch (err) {
                    console.log(err.message)
                    
                    Mensaje.error("Ocurrió un error intente nuevamente: "+err.message);
                }
            }
            let moduleOIng = ref(false)
            let cargarStore = ()=>{
                let datos_adicionalesOtroIng = sInicio.getDatosAdicionalesOtroIng;
                moduleOIng.value = datos_adicionalesOtroIng.module; 
                if(moduleOIng.value){
                    datosAdicionalesOtroIng.value = datos_adicionalesOtroIng.data;
                }
            }

            onMounted(fetchMoneda)
            onMounted(fetchOtroIngr)
            onMounted(cargarStore)


            let retornar = ()=>{
                router.push({ path: '/datosadicionales' })
            }

            
            let siguiente = ()=>{
                router.push({ path: '/documentos' })
            }

            let Cancelar = () => {
                Mensaje.Confirmar( "¿Confirma la cancelación del trámite?", () => {
                    sInicio.reset();
                    router.push({path: '/mistramites'});
                });
            }


            return {
                moduleOIng,Continuar, tipoMonedaList, tipoOtroIngrList, datosAdicionalesOtroIng, formError, idPersonaData, idTramiteData, estado,
                retornar,
                siguiente,
                Cancelar
            }
        }
    }

</script>