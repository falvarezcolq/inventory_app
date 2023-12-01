<template>  
  <div class="busqueda">
    <div class="row">
      <div class="col-md-12 my-3"><h2 class="text-center">MULTAS</h2></div>
    </div>
    <div class="busqueda_seccion">
      <p class="title">DATOS PERSONA</p>
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="row dp-table">
            <div class="col-12 col-md-6">
              <label  class="frm-label">NOMBRES Y APELLIDOS:</label>
              <p>{{ datosPersonaMulta.nombres }}</p>               
            </div>
            <div class="col-12 col-md-6">
              <label class="frm-label">TIPO DE DOCUMENTO: </label>
              <p>{{ datosPersonaMulta.tipo_documento }}</p>
            </div>
          </div>  
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="row dp-table">         
            <div class="col-12 col-md-6">
              <label class="frm-label">NACIONALIDAD:</label>             
              <p>{{ datosPersonaMulta.nacionalidad }}</p>
            </div>
            <div class="col-12 col-md-6">
              <label class="frm-label">NRO. DE DOCUMENTO: </label>
              <p>{{ datosPersonaMulta.nro_documento }}</p>
            </div>
          </div>
        </div>  
      </div>
    </div>

    <div class = "busqueda mt-4">
      <div class="busqueda_seccion">
        <p class="title">TIPO DE CAMBIO A LA FECHA 1 UFVs. EQUIVALENTE A: {{datosUfvs.ufv_redondeado}} Bs.</p>
        <div class = "row">
          <div class="col-12 col-md-6 mt-3">
            <label for="">TIPO DE MULTA:</label> <span class="lb-error" v-if="formError.id_multa">Campo requerido</span>
          </div>
          <div class="col-12 col-md-6 text-end">
            <!-- <input type="checkbox" class="check-box-req" id="condonacion"> <label for="condonacion">CONDONACIÓN MULTAS</label> -->
          </div>
        </div> 
        <div class="row">
          <div class="col-md-12">
            <select 
              class="form-control" 
              v-model="multa.id_multa"
              :class="{error: formError.id_multa}"
            >
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in CausaMultas" :key="index" :value="item.id_multa">{{ item.nombre }}
              </option>
            </select>
          </div>

        </div>

        <div class="row form-group mt-4" v-show="multa.id_multa == 5">
          <div class="col-md-6">
            <label for="">FECHA DE VENCIMIENTO DE PERMANENCIA:</label> 
            <!-- <span class="lb-error" v-if="formError.fecha_nacimiento">{{ formError.fecha_nacimiento }}</span> -->
            <input type="date" class="form-control" v-model="datosPersonaMulta.fecha_vencimientoPermanencia"
            
              :max="maxDate"
                />          
            <!--   :class="{ error: formError.fecha_nacimiento }" @change="CalcularEdad" <p v-if="edadFN == 'Mayor de edad'" class="green text-end"><strong>{{ edadFN }}</strong></p>
            <p v-else-if="edadFN == 'Menor de edad'" class="orange text-end"><strong>{{ edadFN }}</strong></p> -->
          </div> 
        </div>
        <div class="row form-group mt-2" v-show="multa.id_multa == 5">
          <div class="col-md-6">
            <label for="">FECHA DE REGISTRO DEL COBRO DE MULTA:</label> 
            <!-- <span class="lb-error" v-if="formError.fecha_nacimiento">{{ formError.fecha_nacimiento }}</span> -->
            <input type="date" class="form-control"
              v-model="datosPersonaMulta.fecha_cobroMulta"
              :max="maxDate"
                />
            <!--   :class="{ error: formError.fecha_nacimiento }" @change="CalcularEdad" <p v-if="edadFN == 'Mayor de edad'" class="green text-end"><strong>{{ edadFN }}</strong></p>
            <p v-else-if="edadFN == 'Menor de edad'" class="orange text-end"><strong>{{ edadFN }}</strong></p> -->
          </div>
        </div>
        <div class="row form-group mt-2" v-show="multa.id_multa == 6 || multa.id_multa == 7">
          <div class="col-12 col-md-3 text-end">
            <label for="">CANTIDAD DE PERSONAS: </label>
          </div>
          <div class="col-12 col-md-2">
            <input type="text" class="form-control" v-model="datosPersonaMulta.cantPersonas"   >
          </div>
        </div>
        <div class="col-md-12 text-end mt-4" >
          <button type="button" class="btn btn-outline-primary btn-sm" @click="Calcular">
            <i class="fa fa-calculator"></i> CALCULAR Y AGREGAR
          </button>&nbsp;
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="Limpiar">
            <i class="fa fa-file"></i> LIMPIAR
          </button>
        </div>
       
       
        <table class="table table-sm table-responsive table-hover mt-4">
          <thead class="thead-dark">
            <tr class="text-center">
              <th width="6%">NRO</th>
              <th>CAUSAL</th>
              <th>IMPORTE (UFVs)</th>
              <th>IMPORTE (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in buscaMulta" :key="index">
              <td class="text-center">{{index+1}}</td>
              <td>{{ item.nombre }}</td>
              <td class="text-center">{{ totalUfvs }}</td>                 
              <td class="text-center">{{ totalBs }} </td>
            </tr>
          </tbody>
        </table> 

        <div class = "row form-group mt-4">
          <div class="col-12 col-md-10 text-end">
            <label for="">TOTAL IMPORTE A CANCELAR: </label> 
          </div>
          <!-- TOTAL IMPUT UFVS -->
          <div class="col-12 col-md-1">
            <input type="text" class="form-control" :value="totalUfvs" disabled >
          </div>
          <!-- TOTAL IMPUT BS -->
          <div class="col-12 col-md-1">
            <input type="text" class="form-control" :value="totalBs" disabled>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12 text-end">
            <button type="button" 
              class="btn btn-outline-primary btn-sm" 
              @click="Continuar"
            > 
              <i class="fa fa-print"></i> TERMINAR E IMPRIMIR FORMULARIO DE CALCULO DE MULTAS    
            </button>
          </div>
        </div>
      </div>
    </div>  
  </div>
    
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import api from "@/services/api";
import { useProcesoStore } from '@/stores/useProcesoStore'
import { useInicioStore } from '@/stores/useInicioStore'

import moment from "moment";
import Swal from "sweetalert2";
import * as Yup from 'yup';

export default {
  setup(){
    let router = useRouter();
    let datosTramite = ref({});
    let CausaMultas = ref({});
    let datosUfvs = ref({});
    let listaMonto = ref({});
    let id_multa = ref('');
    let buscaMulta = ref({});
    let totalBs = ref(0);
    let totalUfvs = ref(0);
    let sInicio = useInicioStore();
    let datosPersonaMulta = ref({});
    let id_persona = sInicio.getIDPersona;
    let registrodeposito = ref({});
    let estado = ref(false);
    let maxDate = moment().format("YYYY-MM-DD");
    let formError = ref({});
    let multa = ref({ id_multa: ''});

    let schemaForm = Yup.object().shape({
      id_multa: Yup.string().required(),
    });


    let formatDate = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY");
    }

    let fetchMultas = () => api.get('/getCausaMultas').then((response) => {
      CausaMultas.value = response.data.contenido
    })

    let fetchMonto = () => api.get('/getTipoMonto').then((response) => {
      listaMonto.value = response.data.contenido
    })

    let PersonaMulta = async () => {
      if(!id_persona){
        router.push({ path: '/iniciolista' });
      }

      let result = await api.get(`/PersonaMulta/${id_persona}`).then((response) => {
        datosPersonaMulta.value = response.data.contenido;
      });
    }
    let fetchUfvs = async () => {
      let fecha_app = moment().format('YYYY-MM-DD') 
      let result = await api.get(`/getUfvs/${fecha_app}`).then((response) => {
        datosUfvs.value = response.data.contenido;
      });
    }
    let calcPersonas;
    let cantDias;
    let Calcular = async () => {
      try {
        await schemaForm.validate(multa.value, { abortEarly: false });
        
        let id_multa = multa.value.id_multa;
        await api.get(`/getBuscarMultas/${id_multa}`).then((response) => {
          buscaMulta.value = response.data.contenido;
          //calculo de días por permanencia en territorio boliviano
          if(id_multa == 5){
            cantDias = moment(datosPersonaMulta.value.fecha_cobroMulta).diff(moment(datosPersonaMulta.value.fecha_vencimientoPermanencia), 'days')
            totalBs.value = Math.round(Number(buscaMulta.value[0].monto) * cantDias * Number(datosUfvs.value.ufv_redondeado)); 
            totalUfvs.value = cantDias * buscaMulta.value[0].monto;
          }else
          {    
            if(id_multa == 6 || id_multa == 7){
              calcPersonas = datosPersonaMulta.value.cantPersonas
              totalBs.value = Math.round(Number(buscaMulta.value[0].monto) * calcPersonas * Number(datosUfvs.value.ufv_redondeado)); 
              totalUfvs.value = calcPersonas * buscaMulta.value[0].monto;
            } else{    
            totalBs.value = Math.round(Number(buscaMulta.value[0].monto)* Number(datosUfvs.value.ufv_redondeado)); 
            totalUfvs.value = buscaMulta.value[0].monto;}
          }
        });
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
              formError.value[error.path] = error.message
          }
        });
      }
    }
   
    let Continuar = async () => {
     //try{
       // Valida campos
       //await schemaForm.validate(multa.value, { abortEarly: false });
 

        let data = {
          id_persona,
          id_tramite : null,
          monto: totalBs.value,
          moneda: 'Bs',
          tipo_deposito: '',
          id_multa: multa.value.id_multa,
          tipo_rec: 'M',
          pago: 'S',
          calcPersonas, 
          pago_unitario_dia_o_persona: buscaMulta.value[0].monto,
          cantDias,
          tipo_cambioUFVs : datosUfvs.value.ufv_redondeado,
          totalUFVS: totalUfvs.value,
          fechaCobroMulta: datosPersonaMulta.value.fecha_cobroMulta,
          fechaVencimientoPermanencia: datosPersonaMulta.value.fecha_vencimientoPermanencia,

        }

        let result = await api.post('/setPersonaMulta', data);

        sInicio.addIDProceso(Number(result.data.contenido.o_descripcion))
        let id_documento = 27
        GenerarPDF(id_documento, result.data.contenido.o_descripcion)

      //   Swal.fire({
      //       html: "Trámite <b>registrado</b> correctamente",
      //       icon: "success",
      //       confirmButtonText: "ACEPTAR",
      //       confirmButtonColor: "#198754",
      //       allowOutsideClick: false,
      //     }).then((result1) => {
      //     if (result1.isConfirmed) {
      //       sInicio.reset();
      //       router.push({ path: '/iniciolista' })
      //     }
      //   });

      // } catch (err) {
      //   formError.value = {}
      //   err.inner.forEach((error) => {
      //     if(error.path && !formError[error.path]){
      //         formError.value[error.path] = error.message
      //     }
      //   });
      // }
    }
  const RegistrarRecaudacionMulta = async () => {
  try{
    await schemaForm.validate(multa.value, { abortEarly: false });

      let data = {
        id_persona,
        id_tramite : null,
        monto: totalBs.value,
        moneda: 'Bs',
        tipo_deposito: '',
        id_multa: multa.value.id_multa,
        tipo_rec: 'M',
        pago: 'S',
      }
      let result = await api.post('/setPersonaMulta', data);

      sInicio.addIDProceso(Number(result.data.contenido.o_descripcion))

      let id_documento = 27
     // GenerarPDF(id_documento, result.data.contenido.o_descripcion)    
    if(result.status === 200 && result.data.codigo === 1){       
      sInicio.reset();
      Swal.fire({text: "Trámite iniciado correctamente", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#198754", allowOutsideClick: false })
      .then((response) => {
        if(response.value){
        let tipo_tramite = 'M'
        let id_tramite=0;
        sInicio.addIDPersona(id_persona);
        sInicio.addIDProceso(Number(result.data.contenido.o_descripcion));
        sInicio.addIDTramite(id_tramite);
        sInicio.addTipoTramite(tipo_tramite);
          router.push({path: "/recaudacionesinicio"}) }
      });
    } 
    else{
      console.log("[Error en registrar]");
    }
  } catch (err) {
      formError.value = {}
      err.inner.forEach((error) => {
        if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
        }
      });
    }
}
    let GenerarPDF = async (id_documento, id_proceso) => {

      //try {
        let config = {responseType: 'blob'}

        let result = await api.get(`/getGeneraPdf_oldpdf/${id_proceso}/${id_documento}`, config)
        
        // Descarga archivo587
        if( result.status === 200){
          
          const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "blob"})
          )
          let link = document.createElement("a")
          link.href = url
          let title = "Archivo.pdf"
          link.setAttribute("download", title)
          document.body.appendChild(link)
          link.click()
        }
        
      // } catch (error) {
      //     Swal.fire({
      //       text: "No genera el documento", 
      //       icon: "error", 
      //       confirmButtonText: "Aceptar", 
      //       confirmButtonColor: "#198754", 
      //       allowOutsideClick: false 
      //     });
      //   }
    }

    let Limpiar = () => {
      buscaMulta.value = { }
      totalBs.value = ""
      totalUfvs.value = ""
      datosPersonaMulta.value={ }
    }  

    onMounted(() => {
      fetchMultas();
      fetchUfvs();
      fetchMonto();
      PersonaMulta();

    });

    return{
      datosTramite, 
      formatDate,
      CausaMultas,
      datosUfvs,
      listaMonto,
      Calcular,
      id_multa,
      buscaMulta,
      totalBs,
      totalUfvs,
      datosPersonaMulta,
      Continuar,
      registrodeposito,
      estado,
      maxDate,
      GenerarPDF,
      formError,
      multa,
      Limpiar,
    }
  }
}
</script>
