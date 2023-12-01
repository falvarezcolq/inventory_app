<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 my-3">
                <h2 class="text-center">DERIVACIÓN DE TRÁMITE</h2>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-12 col-md-12">
                <div class="busqueda">
                <div class="busqueda_seccion">
                    <p class="title">BÚSQUEDA DE TRÁMITE - DERIVAR</p>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label"
                                >Lugar:
                            </label>
                            <select class="form-control" placeholder="SELECCIONAR" v-model="lugar">
                                <option value="" disabled>SELECCIONAR</option>
                               <option value=""></option>
                            </select>
                        </div>                        
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label"
                                >Codigo de Inicio:
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="cod_inicio"
                            />
                        </div>
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label"
                                >Area:
                            </label>
                            <select class="form-control" placeholder="SELECCIONAR" v-model="area">
                                <option value="" disabled>SELECCIONAR</option>
                                <option v-for="are in listarLugares" :key="are" :value="are.cod_area">{{ are.nombre }}</option>
                            </select>
                        </div>                     
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label"
                                >Codigo de Registro:
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="cod_registro"
                            />
                        </div>
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label"
                                >Nombres o Apellidos:
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="nombre_completo"
                            />
                        </div>
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label"
                                >Nro. Documento:
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="nro_documento"
                            />
                        </div>
                    </div>
                    <div class="row justify-content-end mt-4"> 
                        <div class="col-auto">
                            <button class="btn btn-outline-primary" type="button"  @click="buscarDerivacion">Buscar</button>                           
                        </div>                           
                    </div>
                                         
                </div>
                </div>
            </div>
        </div>
        <div class="row mx-0" v-if="datosTramites.length<=0">
            <div class="col alert alert-success" role="alert">
                No se encontro ningun dato
            </div>
        </div>
        <div v-else>
            <table class="table table-sm table-responsive table-bordered table-hover table-striped">
                <thead class="thead-dark">
                    <tr class="text-center">
                    <th>#</th>
                    <th>NOMBRE COMPLETO</th>
                    <th>NRO. DOCUMENTO</th>
                    <th>NACIONALIDAD</th>
                    <th>TRÁMITE</th>
                    <th>FECHA TRÁMITE</th>
                    <th>Seleccionar</th>
                    </tr>
                </thead>     
                <tbody>
                    <tr v-for="(datos,index) in datosTramites" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ datos.nombres }} {{ datos.primer_apellido }} {{ datos.segundo_apellido }}</td>
                        <td>{{ datos.nro_documento }}</td>
                        <td>{{ datos.nacionalidad }}</td>
                        <td>{{ datos.tramite }}</td>
                        <td>{{ formatDate(datos.fecha_reg) }}</td>
                        <td>
                            <input type="checkbox" v-model="seleccionado" :value="datos.id_tramite">
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="row justify-content-end mt-4"> 
                <div class="col-auto">
                    <button class="btn btn-outline-secondary" type="button" @click="funSeleccionado">Seleccionar Tramite</button>                           
                </div>                           
            </div>
        </div>
       
    </div>
</template>
<script>
import {ref, onMounted} from "vue"
import api from "../../services/api";
import moment from "moment";
export default {
    setup(){
        let lugar=ref("");
        let cod_inicio=ref("");
        let area=ref("");
        let cod_registro=ref("");
        let nombre_completo=ref("");
        let nro_documento=ref("");
        let listarLugares=ref({});
        let datosTramites=ref({});
        let seleccionado=ref([]);

        let buscarDerivacion = async () => {
            if (area.value==''||area.value==null) {
                area.value='-'
            }
            if (cod_inicio.value==''||cod_inicio.value==null) {
                cod_inicio.value='-'
            }
            if (nro_documento.value==''||nro_documento.value==null) {
                nro_documento.value='-'
            }
            if (lugar.value==''||lugar.value==null) {
                lugar.value='-'
            }
            if (cod_registro.value==''||cod_registro.value==null) {
                cod_registro.value='-'
            }
            if (nombre_completo.value==''||nombre_completo.value==null) {
                nombre_completo.value='-'
            }
            let result = await api.get(`/buscarDatos/${area.value}/${cod_inicio.value}/${nro_documento.value}/${lugar.value}/${cod_registro.value}/${nombre_completo.value}/`).then((response) => {
                datosTramites.value = response.data.contenido;  
            });
        }
        let formatDate = (fecha) => {
            return moment(fecha).format("DD-MM-YYYY");            
        };

        let getLugares=()=>api.get('/getAreasDerivacion/D').then((response)=>{
            listarLugares.value=response.data.contenido;            
        });
        let funSeleccionado=()=>{
            console.log(seleccionado.value);
        }
        onMounted(getLugares)
        return {
            getLugares,
            lugar,
            cod_inicio,
            area,
            cod_registro,
            nombre_completo,
            nro_documento,
            listarLugares,
            buscarDerivacion,
            datosTramites,
            seleccionado,
            formatDate,
            funSeleccionado
        }
    }
   
}
</script>