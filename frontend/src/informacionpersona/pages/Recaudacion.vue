<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-12"><h2 class="text-center">REGISTRO DE DEPÓSITO</h2></div>
    </div>
    <DatosTramite />
    <div class="row mt-4">
      
      <div class="offset-md-2 kcol-12 col-md-8">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">DATOS RECAUDACIÓN</p>
            <div class="row">
              <div class="col-12 col-md-5">
                <label>MONTO:</label>
              </div>
              <div class="col-12 col-md-7">
                <label><span class="text-muted">{{ datosCostos.moneda }}</span> {{ datosCostos.costo }} </label><br>
                <label><span class="text-muted">Bs</span> {{ Math.round(datosCostos.costo * datosUfvs.ufv_redondeado)}}</label>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-md-5">
                <label>CONSTANCIA DE PAGO:</label><span class="lb-error" v-if="formError.tipo_deposito"> Campo requerido</span>
              </div>
              <div class="col-12 col-md-7">
                <div class="form-group col-md-12" >
                  <label class="frm-label">TIPO DE COBRO</label>
                  <select class="form-control form-select form-select-sm" aria-label=".form-select-sm example" 
                  :class="{error:formError.tipo_deposito}"
                  v-model="registrodeposito.tipo_deposito">
                    <option value="" disabled>SELECCIONAR</option>
                    <option v-for="(item, index) in select_tipo_deposito" :key="index" :value="item.descripcion">
                    {{ item.descripcion }}
                    </option>
                  </select>
                </div>
<!-- 
                <div v-if="Number(datosCostos.costo)!=0">
                  <input class="form-check-input" 
                  id="radio1" 
                  type="radio" 
                  name="optradio" 
                  value="BOLETA ENTIDAD BANCARIA" 
                  v-model="registrodeposito.tipo_deposito"
                  />
                  <label class="form-check-label mx-2" for="radio1">BOLETA ENTIDAD BANCARIA</label><br />
                </div>
              
                <div v-if="Number(datosCostos.costo)!=0">
                  <input 
                  class="form-check-input" 
                  id="radio2"
                  type="radio" 
                  name="optradio" 
                  value="BOLETA RECAUDACIONES" 
                  v-model="registrodeposito.tipo_deposito"
                  />
                  <label class="form-check-label mx-2" for="radio2" 
                  >BOLETA RECAUDACIONES</label><br />
                </div>
               
                <div v-if="Number(datosCostos.costo)==0">
                 <input 
                  class="form-check-input" 
                  id="radio3" 
                  type="radio" 
                  name="optradio" 
                  value="SIN COSTO" 
                  v-model="registrodeposito.tipo_deposito"
                  :checked="Number(datosCostos.costo)==0"
                  />
                  <label class="form-check-label mx-2" for="radio3">SIN COSTO</label>

                </div>
                -->
              </div>
            </div>

            <div class="row form-group" v-if="Number(datosCostos.costo)!==0">
              <div class="col-12 mt-2 col-md-5">
                <label for="">NRO. DE BOLETA:</label><span class="lb-error" v-if="formError.nro_deposito"> Campo requerido</span>
              </div>
              <div class="col-12 mt-2 col-md-7">
                <input type="text" class="form-control" 
                  v-model.trim="registrodeposito.nro_deposito"
                  :class="{error: formError.nro_deposito}" 
                  @input="registrodeposito.nro_deposito = $event.target.value.toUpperCase()"
                />
              </div>
            </div>
            <div class="row form-group" v-if="Number(datosCostos.costo)!==0">
              <div class="col-12 col-md-5">
                <label for="">FECHA DE DEPOSITO:</label>
              </div>
              <div class="col-12 col-md-7">
                <input type="date" class="form-control" 
                :max="maxDate"
                v-model="registrodeposito.fecha_deposito"
                :class="{error: formError.fecha_deposito}" 
                @change="ValidarFecha" />
                <p class="orange mt-2" v-if="formError.fecha_deposito"><strong>{{ formError.fecha_deposito }}</strong></p>
              </div>
            </div>

            <div class="row form-group mt-3" v-show="tipo_tramite == 'T'">
              <div class="col-12 col-md-5">
                <label for="">DATOS DE CARPETA:</label><span class="lb-error" v-if="formError.cod"> Campo requerido</span>
              </div>
              <div class="col-12 col-md-7">
                <div class="row">
                  <div class="col-md-6">
                    <input 
                      type="text" 
                      min="0" 
                      placeholder="NRO. CARPETA" 
                      class="form-control" 
                      autocomplete="off" 
                      onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" 
                      v-model.trim="registrodeposito.cod"
                      :class="{error: formError.cod}" 
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <input type="text" placeholder="NRO. FORMULARIO" class="form-control"
                      v-model.trim="registrodeposito.cur"
                      :class="{error: formError.cur}" 
                      @input="registrodeposito.cur = $event.target.value.toUpperCase()"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3" v-show="tipo_tramite == 'T'">
              <div class="col-12 col-md-5">
                <label for=""> OBSERVACIÓN:</label>
              </div>
              <div class="col-12 col-md-7">
                <textarea class="form-control" name="" id="" cols="30" rows="2"
                v-model.trim="registrodeposito.descripcion"
                @input="registrodeposito.descripcion = registrodeposito.descripcion.toUpperCase()"
                ></textarea>
              </div>
            </div>

            <!-- <div class="row mt-3" v-show="tipo_tramite == 'T'">
              <div class="col-12 col-md-5">
                
              </div>
              <div class="col-12 col-md-7">
                <input type="checkbox"  class="checkbox"/>
                <label for="">Condonacion de Multa</label>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      
      <div class="offset-md-2 kcol-12 col-md-8" v-if="tramite && tramite.clas4=='TRIP'">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">NRO DE LIBRETA</p>
            <div class="row">

              <div class="col-12 mt-2 col-md-5">
                <label for="">NRO. DE LIBRETA:</label>
                <span class="lb-error" v-if="formError.nro_libreta"> Campo requerido</span>
              </div>
              <div class="col-12 mt-2 col-md-7">
                <input type="text" class="form-control" 
                  v-model.trim="registrodeposito.nro_libreta"
                  :class="{error: formError.nro_libreta}" 
                  onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" 
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-md-12" style="text-align: right">
        <button 
          type="button"                           
          class="btn btn-outline-success btn-sm" @click="ConfirmaConclucion"
        >
        <i class="fa fa-save"></i> CONCLUIR 
        </button>
      </div>
    </div>
    <Loading  v-show="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'; 

import api from '@/services/api';
import { useRegistroStore } from '@/stores/useRegistroStore';
import DatosTramite from '@/registro/components/DatosTramite.vue';
import Loading from '@/components/Loading.vue';

import moment from 'moment';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Mensaje } from '../../tools/Mensaje';

export default {
  components: {
    DatosTramite,
    Loading
  },
  setup() {
    let router = useRouter();
    let datos = ref({
      nro_documento: "",
      nacionalidad: "-",
      id_tramite: 0,
      fecha_inicio: moment().subtract(2, "days").format("YYYY-MM-DD"),
      fecha_fin: moment().format("YYYY-MM-DD"),
    });
    let sRegistro = useRegistroStore();
   
    let maxDate = moment().format("YYYY-MM-DD");
    let datosCostos = ref({});
    let tipo_tramite = ref('');
    let registrodeposito = ref({
      tipo_deposito:'',
      fecha_deposito:moment().format("YYYY-MM-DD")
    });
    let isLoading = ref( false );
    let datosUfvs = ref({});
    let formError = ref({});
    let tramite = ref({});
    let id_proceso = sRegistro.getIDProceso;
    let id_persona = sRegistro.getIDPersona;
    let id_tramite = sRegistro.getIDTramite;
    let cod_inicio = sRegistro.getCodInicio;
    tipo_tramite.value = sRegistro.getTipoTramite;
    let schemaFormTramite = null;
    let select_tipo_deposito = ref([]);
    
    let ValidarFecha = () => {
      let fecha_deposito = moment(registrodeposito.value.fecha_deposito);
      let fecha_inicial = moment('1900-01-01');
      let fecha_actual = moment();
      if (fecha_inicial < fecha_deposito && fecha_deposito < fecha_actual) {
        formError.value.fecha_deposito = null
      } else {
        formError.value.fecha_deposito = (moment(fecha_inicial).format("YYYY") > moment(fecha_deposito).format("YYYY")) ? 'LA FECHA NO PUEDE SER MENOR A 1900' : 'LA FECHA NO PUEDE SER MAYOR A LA ACTUAL';
      }
    }

    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY HH:mm:ss");
    };

    let fetchUfvs = async () => {
      let fecha_app = moment().format('YYYY-MM-DD') 
      let result = await api.get(`/getUfvs/${fecha_app}`).then((response) => {
        datosUfvs.value = response.data.contenido;
      });
    }
    

    let tipoDepositos = async () => {
      try{let resultado = await api.get(`/getTipoDepositoRegistro`).then((response) => { select_tipo_deposito.value = response.data.contenido;});
      } catch (error) {return error;}
    };

    let fetchDatosCostos = async () => {
      if(!id_proceso){
        router.push({ path: "/registrolista" });
      }

      await api.get(`/getRegistroTramite/${id_proceso}/${tipo_tramite.value}`).then((response) => {
        datosCostos.value = response.data.contenido;
        if(Number(datosCostos.value.costo)==0){
          registrodeposito.value.tipo_deposito = 'SIN COSTO'
          schemaFormTramite = Yup.object().shape({
                                                  nro_deposito: null,
                                                  fecha_deposito: null,
                                                  cod: Yup.string().required(),
                                                  tipo_deposito: Yup.string().required(),
                                                });
        }        
      })
    }

    let getTramite = async () =>{
      let result = await api.get(`/getTramiteProceso/${id_proceso}`).then((response) => {
        tramite.value = response.data.contenido;

      });
    } 

    let validarFormulario = async()=>{
       try{
        formError.value = {}
        schemaFormTramite = Yup.object().shape({
          nro_deposito: Number(datosCostos.value.costo)==0 ? null : Yup.string().required(),
          fecha_deposito: Yup.string().required(),
          cod: tipo_tramite.value != 'M'? Yup.string().required() :null,
          tipo_deposito: Yup.string().required(),
          nro_libreta: tramite.value && tramite.value.clas4 == 'TRIP'? Yup.string().required() :null,
        });
        await schemaFormTramite.validate(registrodeposito.value, { abortEarly: false });
        return true;
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message;
          }
        });
      }
      return false;
    }

    let ConfirmaConclucion = async (txt) => {
     if ( await validarFormulario() ){ 
      Mensaje.Confirmar('¡Confirmar concluir registro!', Continuar );
     }
    }

    let GeneraTalonControl = async () =>{
      try {
        let config = {responseType: 'blob'}
        let data = {
          id_proceso, 
          id_documento: tipo_tramite.value == 'T' ? 8 : 9
        }
        let ruta = `/generaTalon${tipo_tramite.value == 'T' ? 'Control':'Multa'}`;
        let result = await api.post(ruta, data, config);
        if( result.status === 200){
          const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "blob"})
          )
          let link = document.createElement("a")
          link.href = url
          let title = `TALON${cod_inicio}.pdf`
          link.setAttribute("download", title)
          document.body.appendChild(link)
          link.click()
          sRegistro.reset();
          
          Mensaje.success_action("Trámite registrado correctamente",()=>{
            router.push({ path: "/registrolista" });
          })
        }
      } catch (error) {
        Mensaje.error("No genera el Talon de control, Reporte el problema a Sistemas.");
      }
    }

    let GeneraKardexTripulante = async () =>{
      try {
        let config = {responseType: 'blob'}
        let result = await api.get(`/generakardexTripulante/${id_proceso}`, config);
        if( result.status === 200){
          const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "blob"})
          )
          let link = document.createElement("a")
          link.href = url
          let title = `KARDEX${cod_inicio}.pdf`
          link.setAttribute("download", title)
          document.body.appendChild(link)
          link.click()
        }
      } catch (error) {
        Mensaje.error("No genera el Talon de control, Reporte el problema a Sistemas.");
      }
    }

    let Continuar = async () => {
        try{
          isLoading.value = true;
          let data = {
            id_proceso,
            id_persona,
            id_tramite,
            cod_inicio,
            monto: datosCostos.value.costo,
            moneda: datosCostos.value.moneda,
            tipo_deposito: registrodeposito.value.tipo_deposito,
            nro_deposito: registrodeposito.value.nro_deposito,
            fecha_deposito: registrodeposito.value.fecha_deposito,
            cod: registrodeposito.value.cod,
            cur: registrodeposito.value.cur,
            descripcion: registrodeposito.value.descripcion,
            nro_libreta: registrodeposito.value.nro_libreta,
          };

          let result = null;
          if (tipo_tramite.value == 'M'){
            data.id_estado = 3;  
            result = await api.put('/RecaudacionMulta', data);
          }
          else{
            result = await api.post('/registrodeposito', data)
          }

          if (result && result.status == 201){

            if (tramite.value.clas4 == 'TRIP' ){
              await GeneraKardexTripulante();
            }
            await GeneraTalonControl();
          }

          // Mensaje.Confirmar("Trámite <b>registrado</b> correctamente",GeneraTalonControl)
          isLoading.value = false;
        } catch (error) {
          isLoading.value = false;
          Mensaje.error("Trámite <b>No Registrado</b><br>Reporte el problema a Sistemas");
        }
    }

    let Limpiar = () => {
      datos.value = {
        nro_documento: "",
        nacionalidad: "-",
        id_tramite: 0,
        fecha_inicio: moment().subtract(2, "days").format("YYYY-MM-DD"),
        fecha_fin: moment().format("YYYY-MM-DD"),
      };
    };

    onMounted( () => {
      fetchDatosCostos();
      fetchUfvs();
      getTramite();
      tipoDepositos();
    });

    return {
      formatDate,
      Continuar,
      datos,
      maxDate,
      Limpiar,
      ValidarFecha,
      //descripcion,
      formError,
      registrodeposito,
      formError,
      datosCostos,
      tipo_tramite,
      isLoading,
      ConfirmaConclucion,
      datosUfvs,
      tramite,
      select_tipo_deposito,
    };
  },
};
</script>
