<template>
    <div>                     
        <div class="busqueda">
            <div class="busqueda_seccion">
                <p class="title">DE TRABAJO REMUNERADO CON RELACION DE DEPEDENCIA:</p>
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-2">
                        <label for="">TIPO DE ORGANIZACIÓN:</label>
                        <span class="lb-error" v-if="formError.tipo_organizacion">
                            Campo requerido</span>
                        <select class="form-control mt-2" v-model="datosAdicionalesCR.tipo_organizacion"
                        :class="{ error: formError.tipo_organizacion }"
                        >
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoTipoOrganizaciónList" :key="index"
                                :value="item.cod_clasificador">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="mt-2 col-sm-12 col-lg-6 col-md-6">
                        <label for="">ACTIVIDAD QUE DESEMPEÑA O DESEMPEÑARA:</label><span class="lb-error"
                            v-if="formError.actividad_desempenado">
                            Campo requerido</span>
                        <input class="mt-2 form-control" type="text" v-model="datosAdicionalesCR.actividad_desempenado"
                            :class="{ error: formError.actividad_desempenado }" @keyup="
                                datosAdicionalesCR.actividad_desempenado =
                                $event.target.value.toUpperCase()
                            " />
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">NOMBRE DE LA ORGANIZACIÓN DONDE TRABAJA:</label><span class="lb-error"
                            v-if="formError.nombre_organizacion">
                            Campo requerido</span>
                        <input class="mt-2 form-control" type="text" v-model="datosAdicionalesCR.nombre_organizacion"
                            :class="{ error: formError.nombre_organizacion }" @keyup="
                                datosAdicionalesCR.nombre_organizacion =
                                $event.target.value.toUpperCase()
                            " />
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">RUBRO:</label><span class="lb-error" v-if="formError.rubro">
                            Campo requerido</span>
                        <input class="mt-2 form-control" type="text" v-model="datosAdicionalesCR.rubro"
                            :class="{ error: formError.rubro }" @keyup="
                                datosAdicionalesCR.rubro =
                                $event.target.value.toUpperCase()
                            " />
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">TIPO DE CONTRATO:</label><span class="lb-error" v-if="formError.tipo_contrato">
                            Campo requerido</span>
                        <select class="form-control mt-2" v-model="datosAdicionalesCR.tipo_contrato"
                            :class="{ error: formError.tipo_contrato }">
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoContratoList" :key="index"
                                :value="item.cod_clasificador">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">TIEMPO DE DURACIÓN DEL CONTRATO:</label><span class="lb-error"
                            v-if="formError.duracion_contrato">
                            Campo requerido</span>
                        <div class="row">
                            <div class="mt-2 col-sm-12 col-lg-4 col-md-4">
                                <input type="text" class="form-control" 
                                equired autocomplete="off" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                                v-model="datosAdicionalesCR.duracion_contrato"
                                    :class="{ error: formError.duracion_contrato }" 
                                />
                            </div>
                            <div class="col-sm-12 col-lg-8 col-md-8">
                                <select class="form-control mt-2" v-model="datosAdicionalesCR.tiempo_contrato"
                                    :class="{ error: formError.tiempo_contrato }">
                                    <option value="">SELECCIONAR</option>
                                    <option v-for="(item, index) in tipoPermanenciaList" :key="index"
                                        :value="item.nombre">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">DEPARTAMENTO:</label>
                        <span class="lb-error" v-if="formError.departamento">Campo requerido</span>
                        <select class="form-control" v-model="datosAdicionalesCR.cd_departamento"
                            :class="{ error: formError.cd_departamento }"
                            @change="fetchProvinciaInst(datosAdicionalesCR.cd_departamento)">
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoDepartamentoList" :key="index"
                                :value="item.cod_clasificador">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">PROVINCIA</label> <span class="lb-error"></span>
                        <select class="form-control" v-model="datosAdicionalesCR.cd_provincia"
                            @change="fetchLocalidadInst(datosAdicionalesCR.cd_provincia)">
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoProvinciaList" :key="index"
                                :value="item.cod_clasificador">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">LOCALIDAD:</label> <span class="lb-error"></span>
                        <select class="form-control" v-model="datosAdicionalesCR.cd_localidad">
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoLocalidadList" :key="index" :value="item.nombre">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">DIRECCIÓN:</label><span class="lb-error" v-if="formError.cd_direccion">
                            Campo requerido</span>
                        <input type="text" class="form-control" v-model="datosAdicionalesCR.cd_direccion"
                            :class="{ error: formError.cd_direccion }" @keyup="
                                datosAdicionalesCR.cd_direccion =
                                $event.target.value.toUpperCase()
                            " />
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">TELÉFONO O CELULAR:</label>
                        <input type="text" class="form-control" 
                        equired autocomplete="off" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                        v-model="datosAdicionalesCR.cd_telefono" @keyup="
                        datosAdicionalesCR.cd_telefono = $event.target.value.toUpperCase()" 
                        />
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
                        <label for="">ROE:</label>
                        <input type="text" class="form-control" placeholder="Registro Obligatorio de Empladores"
                        v-model="datosAdicionalesCR.cd_roe" @keyup="
                            datosAdicionalesCR.cd_roe =
                            $event.target.value.toUpperCase()
                        " />
                    </div>
                </div>
            </div>
        </div> 
        <div class="busqueda mt-3">
            <div class="busqueda_seccion">
                <p class="title">DATOS DE INGRESO MENSUAL:</p>
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-2">
                        <label for="">TIPO DE MONEDA:</label><span class="lb-error" v-if="formError.cd_tipo_moneda">
                            Campo requerido</span>
                        <select class="form-control" v-model="datosAdicionalesCR.cd_tipo_moneda"
                            :class="{ error: formError.cd_tipo_moneda }">
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoMonedaList" :key="index" :value="item.nombre">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 mt-2">
                        <label for="">MONTO:</label><span class="lb-error" v-if="formError.cd_monto">
                            Campo requerido</span>
                        <input type="text" class="form-control" 
                        equired autocomplete="off" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                        v-model="datosAdicionalesCR.cd_monto"
                        :class="{ error: formError.cd_monto }"
                        />
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
                <button type="button" class="btn btn-primary btn-sm" @click="Continuar"  v-if="!moduleCR" >
                    <i class="fa fa-save"></i> CONTINUAR
                </button>
            </div>
        </div> 
        
       
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import ProgressStep from "@/inicio/components/ProgressStep.vue";
import DatosTramite from "@/inicio/components/DatosTramite.vue";
import { useInicioStore } from "@/stores/useInicioStore";
import { useRegistroStore } from "@/stores/useRegistroStore";
import * as Yup from "yup";
import { Mensaje } from "@/tools/Mensaje";
import { ws } from "@/services/webservices"; 
export default {
    components: { ProgressStep, DatosTramite },
    setup() {
        let router = useRouter();

        let formError = ref({});
        let datosAdicionalesCR = ref({
            tipo_organizacion: '',
            tipo_contrato: '',
            tiempo_contrato: '',
            cd_departamento: '',
            cd_provincia: '',
            cd_localidad: '',
            cd_tipo_moneda: '',

        });
        let ciudad = ref();
        let provincia = ref();
        let tipoTipoOrganizaciónList = ref([]);
        let tipoContratoList = ref([]);
        let tipoGradoInsList = ref([]);
        let tipoProfesionList = ref([]);
        let tipoPermanenciaList = ref([]);
        let tipoDepartamentoList = ref([]);
        let tipoProvinciaList = ref([]);
        let tipoLocalidadList = ref([]);
        let tipoMonedaList = ref([]);
        let nacionalidadList = ref([]);
        let tipoDocumentoList = ref([]);
        let generoList = ref([]);
        let idPersonaData = ref();
        let idTramiteData = ref();
        let idDefinitivaData = ref();
        let sInicio = useInicioStore();
        let sRegistro = useRegistroStore();
        idPersonaData.value = sInicio.getIDPersona;
        idTramiteData.value = sInicio.getIDTramite;
        idDefinitivaData.value = sInicio.getIDDefinitiva;

        let schemaForm = Yup.object().shape({
            cd_monto: Yup.string().required(),
            cd_tipo_moneda: Yup.string().required(),
            cd_direccion: Yup.string().required(),
            cd_departamento: Yup.string().required(),
            tipo_contrato: Yup.string().required(),
            tiempo_contrato: Yup.string().required(),
            duracion_contrato: Yup.string().required(),
            rubro: Yup.string().required(),
            tipo_organizacion: Yup.string().required(),
            actividad_desempenado: Yup.string().required(),
            nombre_organizacion: Yup.string().required(),
        });

        let fetchTipoOrganización = () =>
            api.get("/getParametro/PAR_TIPOEMPRESA").then((response) => {
                tipoTipoOrganizaciónList.value = response.data.content;
            });

        let fetchTipoGradoInst = () =>
            api.get("/getGrado").then((response) => {
                tipoGradoInsList.value = response.data.content;
            });
        let fetchProfesionInst = () =>
            api.get("/getParametro/PAR_PROFESION").then((response) => {
                tipoProfesionList.value = response.data.content;
            });
        let fetchPermananciaInst = () =>
            api.get("/getParametro/PAR_TIEMPO").then((response) => {
                tipoPermanenciaList.value = response.data.content;
            });

        let fetchDepartamentoInst = () =>
            api.get("/getCiudad").then((response) => {
                tipoDepartamentoList.value = response.data.content;
            });
        let fetchNacionalidad = () =>
            api.get("/getNacionalidad").then((response) => {
                nacionalidadList.value = response.data.content;
            });
        let fetchProvinciaInst = (ciudad) =>
            api.get(`/getProvincias/${ciudad}`).then((response) => {
                tipoProvinciaList.value = response.data.content;
            });

        let fetchLocalidadInst = (provincia) =>
            api.get(`/getLocalidad/${provincia}`).then((response) => {
                tipoLocalidadList.value = response.data.content;
            });

        let fetchMoneda = () =>
            api.get("/getParametro/PAR_MONEDA").then((response) => {
                tipoMonedaList.value = response.data.content;
            });
        let fetchGenero = () =>
            api.get("/getParametro/PAR_GENERO").then((response) => {
                generoList.value = response.data.content;
            });
        let fetchTipoDocumento = () =>
            api.get("/getParametro/PAR_TIPO_DOCUMENTO").then((response) => {
                tipoDocumentoList.value = response.data.content;
            });
        let fetchTipoContrato = () =>
            api.get("/getParametro/PAR_TIPOCONTRATO").then((response) => {
                tipoContratoList.value = response.data.content;
            });


        let validar = async ()=>{
            try {
                await schemaForm.validate(datosAdicionalesCR.value, {abortEarly: false });
                return true;

            } catch (err) {
                formError.value = {};
                err.inner.forEach((error) => {
                    if (error.path && !formError[error.path]) {
                        formError.value[error.path] = error.message;
                    }
                });
                return false;
            }
        }



        let Continuar = async () => {
            try {
                if(await validar()){
                    // let datosCR={
                    //     datosAdicionalesCR: datosAdicionalesCR.value, 
                    //     idDefinitivaData: idDefinitivaData.value,
                    //     idPersonaData: idPersonaData.value, 
                    //     idTramiteData: idTramiteData.value,
                    // }
                    // let result = await api.post("/proceso_inicio/datosAdicionalesCR", datosCR);
                    // if (result.status === 201 && result.data.code === 1) {
                    //     let procesoInicio  = await ws.getProcesoInicio(idDefinitivaData.value)
                        inicio.addDatosAdicionalesCR(datosAdicionalesCR.value);
                        inicio.reset()
                        // sRegistro.reset();
                        // sRegistro.addIDProceso(idDefinitivaData.value);
                        // sRegistro.addIDTramite(idTramiteData.value);
                        // sRegistro.addProcesoInicio(procesoInicio)
                        router.push({ path: "/subirdocumentosP" });
                        // router.push({ path: '/documentos' })
                    // }
                }
            } catch (err) {
              Mensaje.error("Error:"+error.message)
            }
        };


        let moduleCR = ref(false)
        let cargarStore = ()=>{
            let datos_adicionalesCR = inicio.getDatosAdicionalesCR;
            moduleCR.value = datos_adicionalesCR.module; 
            if(moduleCR.value){
                datosAdicionalesCR.value = datos_adicionalesCR.data;
            }
        }
        onMounted(fetchTipoOrganización);
        onMounted(fetchTipoGradoInst);
        onMounted(fetchProfesionInst);
        onMounted(fetchPermananciaInst);
        onMounted(fetchDepartamentoInst);
        onMounted(fetchMoneda);
        onMounted(fetchGenero);
        onMounted(fetchTipoContrato);
        onMounted(fetchNacionalidad);
        onMounted(fetchTipoDocumento);
        onMounted(cargarStore)


        let retornar = ()=>{
            router.push({ path: '/datosadicionales' })
        }
        let siguiente = ()=>{
            router.push({ path: '/subirdocumentos' })
        }

        let Cancelar = () => {
            Mensaje.Confirmar( "¿Confirma la cancelación del trámite?", () => {
            sInicio.reset();
            router.push({path: '/mistramites'});
        })
        }

        return {
            moduleCR,
            retornar,
            siguiente,
            Continuar,
            datosAdicionalesCR,
            tipoDepartamentoList,
            tipoProvinciaList,
            tipoPermanenciaList,
            tipoMonedaList,
            tipoLocalidadList,
            ciudad,
            provincia,
            fetchProvinciaInst,
            fetchLocalidadInst,
            generoList,
            tipoProfesionList,
            tipoGradoInsList,
            nacionalidadList,
            tipoTipoOrganizaciónList,
            tipoDocumentoList,
            formError,
            tipoContratoList,
            Cancelar
        };
    },
};
</script>
