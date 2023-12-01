<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <ProgressStep :step=1 />
      </div>
    </div>


    <div class="row">
      <div class="form-group" >
          <button class="btn btn-outline-primary " @click="irTramites" v-if="!personaModule">
            <i class="fa fa-address-book-o"></i>
            PERSONA JURIDICA</button>

            <button type="button" class="btn btn-outline-secondary m-2"  
            @click="Cancelar" v-if="!personaModule && esPersonaJuridica">
              <i class="fa fa-close"></i>
              CANCELAR REGISTRO</button>
        </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h2>DATOS PERSONALES</h2>
      </div>
    </div>
    
    
    <fieldset :disabled="esPersonaJuridica">
    <div class="row mt-2">
      <div class="col-md-3" style="border-right:1px solid #ccc">
        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Nombre(s):</label> <span class="lb-error" v-if="formError.nombres">Campo requerido</span>
            <input type="text" class="form-control" v-model.trim="persona.nombres" :class="{ error: formError.nombres }"
              @input="persona.nombres = $event.target.value.toUpperCase()" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Primer Apellido:</label> <span class="lb-error" v-if="formError.primer_apellido">Campo
              requerido</span>
            <input type="text" class="form-control" v-model.trim="persona.primer_apellido"
              :class="{ error: formError.primer_apellido }"
              @input="persona.primer_apellido = $event.target.value.toUpperCase()" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Segundo Apellido:</label>
            <input type="text" class="form-control" v-model.trim="persona.segundo_apellido"
              @input="persona.segundo_apellido = $event.target.value.toUpperCase()" />
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Otro Apellido:</label>
            <input type="text" class="form-control" v-model.trim="persona.otro_apellido"
              @input="persona.otro_apellido = $event.target.value.toUpperCase()" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Fecha de Nacimiento:</label> <span class="lb-error" v-if="formError.fecha_nacimiento">{{
              formError.fecha_nacimiento }}</span>
            <input type="date" class="form-control" v-model="persona.fecha_nacimiento"
              :class="{ error: formError.fecha_nacimiento }" :max="maxDate" @change="CalcularEdad" />
            <p v-if="edadFN == 'Mayor de edad'" class="green text-end"><strong>{{ edadFN }}</strong></p>
            <p v-else-if="edadFN == 'Menor de edad'" class="orange text-end"><strong>{{ edadFN }}</strong></p>
          </div>
        </div>



      </div>
      <div class="col-md-9">
        <div class="row form-group">
          <div class="col-md-4">
            <label for="">Tipo Documento:</label> <span class="lb-error" v-if="formError.tipo_documento">Campo
              requerido</span>
              <select 
                class="form-control"
                v-model="persona.tipo_documento"
                :class="{error: formError.tipo_documento}"
              >
                <option value="">SELECCIONAR</option>
                <option v-for="(item, index) in documentoList" :key="index" :value="item.cod_clasificador">{{ item.nombre }}</option>
              </select>
          </div>
          <div class="col-md-4">
            <label for="">Nro Documento:</label> <span class="lb-error" v-if="formError.nro_documento">Campo
              requerido</span>
            <input type="text" class="form-control" v-model.trim="persona.nro_documento"
              :class="{ error: formError.nro_documento }"
              @input="persona.nro_documento = $event.target.value.toUpperCase()" />
          </div>
      
          <div class="col-md-4">
            <label for="">Género:</label> <span class="lb-error" v-if="formError.genero">Campo requerido</span>
            <select class="form-control" v-model="persona.genero" :class="{ error: formError.genero }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in generoList" :key="index" :value="item.cod_clasificador">{{ item.nombre }}
              </option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-4">
            <label for="">Teléfono:</label>
            <input type="text" class="form-control" v-model.trim='persona.telefono'
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" />
          </div>
          <div class="col-md-4">
            <label for="">Correo Electrónico: <span class="lb-error" v-if="formError.email">{{ formError.email
            }}</span></label>
            <!-- <input type="text" class="form-control" v-model.trim='persona.email' :class="{ error: formError.email }"
              @change="verificar_email()" /> -->
            <input type="text" class="form-control" v-model.trim='persona.email' :class="{ error: formError.email }" />
            <p class="orange text-end">{{ Email }}</p>
          </div>
       
          <div class="col-md-4">
            <label for="">Dirección:</label>
            <input type="text" class="form-control" v-model.trim="persona.direccion"
              @input="persona.direccion = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-4">
            <div>
              <label for="">Nacionalidad:</label> <span class="lb-error" v-if="formError.nacionalidad">Campo
                requerido</span>
              <span v-if="grupo != '' && grupo != '0'" class="text-end orange"> - Grupo: {{ grupo.substring(0, 1) }}</span>
              
            </div>
              <select 
                class="form-control"
                @change="ObtenerGrupoPais($event)"
                :disabled="personaModule"
                v-model="persona.nacionalidad"
                :class="{error: formError.nacionalidad}"
              >
                <option value="">SELECCIONAR</option>
                <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">{{item.nombre_pais}}</option>
              </select>
          </div>

          <div class="col-md-4">
            <div>
              <label for="">País de nacimiento:</label>
              <span class="lb-error" v-if="formError.pais_nacimiento">Campo requerido</span>
            </div>
              <select 
                class="form-control"
                v-model="persona.pais_nacimiento"
                :class="{error: formError.pais_nacimiento}"
              >
                <option value="">SELECCIONAR</option>
                <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">{{item.nombre_pais}}</option>
              </select>
          </div>

          <div class="col-md-4">
            <label for="">Lugar de Nacimiento:</label>
            <input type="text" class="form-control" v-model.trim='persona.lugar_nacimiento'
              @input="persona.lugar_nacimiento = $event.target.value.toUpperCase()" />
          </div>
        </div>
        <div class="row">
          <div class="col-3 mt-5" style>
            <button type="button" class="btn btn-outline-primary btn-sm " @click="Multas" v-if="!personaModule" ><i class="fa fa-save"></i>&nbsp;INICIO
              MULTA</button>
          </div>
          <div class="col-9 mt-5 d-md-flex justify-content-md-end" style>
            <button type="button" class="btn btn-outline-primary btn-sm " @click="Continuar"><i class="fa fa-save"></i>
             {{ personaModule ? 'ACTUALIZAR' : 'INICIAR TRAMITE'  }}</button>&nbsp;
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="Cancelar"><i class="fa fa-close"></i>
              CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
   </fieldset>
    <div class="row mt-2" >
      <div class="col-6">
        <!-- <button type="button" class="btn btn-outline-secondary btn-sm" @click="Cancelar"><i class="fa fa-arrow-left"></i>
        </button> -->
      </div>
      <div class="col-6 d-md-flex justify-content-md-end">
        <div  v-if="personaModule || esPersonaJuridica" >
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="siguiente"><i class="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useInicioStore } from '@/stores/useInicioStore'
//import { useUsuarioStore } from '@/stores/useUsuarioStore'
import { useNacionalidadStore } from '@/stores/useNacionalidadStore'
import ProgressStep from '@/inicio/components/ProgressStep.vue'
import TipoDocumento from '@/inicio/components/TipoDocumento.vue'
import Nacionalidad from '@/inicio/components/Nacionalidad.vue'
import * as Yup from 'yup';
import moment from 'moment';
import Swal from "sweetalert2";
import { Mensaje } from '@/tools/Mensaje';

export default {
  components: { ProgressStep, TipoDocumento, Nacionalidad },
  setup() {
    let router = useRouter();
    let sInicio = useInicioStore();
    let sEdad = useInicioStore();
    let sNacionalidad = useNacionalidadStore();
    let generoList = ref([]);
    let documentoList = ref([]);
    let nacionalidadList = ref([]);
    let emailList = ref([])
    let grupo = ref('');
    let nacionalidadGrupo = ref([])
    let personaModule = ref(false);
    let persona = ref({
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      tipo_documento: '',
      genero: '',
      nacionalidad: ''
    });
    let formError = ref({});
    let idTipoDocumento = ref('')
    let idNacionalidad = ref('')
    let edadFN = ref('');
    let FechaNac = ref('');
    let Email = ref('');
    let minDate = moment('1900-01-01');
    let maxDate2 = moment();
   
    let esPersonaJuridica = ref(false)
    let maxDate = moment().format("YYYY-MM-DD");

    let schemaForm = Yup.object().shape({
      nombres: Yup.string().required(),
      primer_apellido: Yup.string().required(),
      tipo_documento: Yup.string().required(),
      nro_documento: Yup.string().required(),
      fecha_nacimiento: Yup.date()
        .min(minDate, `La fecha no puede ser anterior a ${minDate.format('DD/MM/YYYY')}`)
        .max(maxDate2, `La fecha no puede ser posterior a ${maxDate2.format('DD/MM/YYYY')}`)
        .required(`Campo requerido`),
      nacionalidad: Yup.string().required(),
      genero: Yup.string().required(),
      email: Yup.string().email("Incorrecto")
    })

    let personStore = () => {
      esPersonaJuridica.value = sInicio.getEsPersonaJuridica;
      let personaData = sInicio.getPersona
      if (personaData.module) {
        persona.value = personaData.data;
      } else {
        persona.value = { tipo_documento: '', genero: '', nacionalidad: '' }
      }
      personaModule.value = personaData.module
    }

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY/MM/DD");
    };

    let fetchGenero = () => api.get('/getParametro/PAR_GENERO').then((response) => {
      generoList.value = response.data.contenido
    })
  
    let fetchDocumento = () => api.get('/getParametro/PAR_TIPO_DOCUMENTO').then((response) => {
      documentoList.value = response.data.contenido
    })

    let fetchNacionalidad = () => api.get('/getNacionalidad').then((response) => {
      nacionalidadList.value = response.data.contenido
    })

    let verificar_email = () => api.get(`/getEmail/${persona.value.email}`).then((response) => {
      if (persona.value.email === response.data.contenido) {
        Email.value = "El Correo Electronico ya existe cambie porfavor";

      }
    })

    const Continuar = async () => {
      try {
        await schemaForm.validate(persona.value, { abortEarly: false });
        if (personaModule){
          Mensaje.Confirmar("¿Esta seguro de <b>actualizar</b> los<br>datos de la persona?",Guardar)
        }else{
          Mensaje.Confirmar("¿Esta seguro de <b>guardar</b> los<br>datos de la persona?",Guardar)
        }
        
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        });
      }
    }

    let Cancelar = () => {
      Swal.fire({
        html: "¿Esta seguro de cancelar?",
        icon: "info",
        confirmButtonText: "CANCELAR Y SALIR",
        showCancelButton: true,
        cancelButtonText: "VOLVER",
        confirmButtonColor: "#198754",
        allowOutsideClick: true,
      }).then((result) => {
        if (result.isConfirmed) {
          sInicio.reset();
          router.push({ path: '/iniciolista' });
        }
      });
    }

    let Guardar = async () => {
      try {
        if (!personaModule.value) {
          let result = await api.post('/setPersona', persona.value)
          if (result.status === 201 && result.data.codigo === 1) {
            personaModule.value = true;
            sInicio.addPersona(persona.value)
            sInicio.addIDPersona(Number(result.data.contenido.id_persona))
            router.push({ path: '/tramites' })
          }
        }
        else {
          persona.value.id_persona = sInicio.getIDPersona;
          persona.value.actualizar_datos = sInicio.getIDDefinitiva != 0 ;
          persona.value.id_proceso = sInicio.getIDProcesoInicio;
     
          let result = await api.put("/setUpPersona", persona.value)
          if (result.status === 201 && result.data.codigo === 1) {
            sInicio.addPersona(persona.value)
            sInicio.addIDPersona(Number(result.data.contenido.id_persona))
            router.push({ path: '/tramites' })
          }
        }
        
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        })
      }

    }

    let Multas = async () => {
      try {
        await schemaForm.validate(persona.value, { abortEarly: false });
        try {
          let result = await api.post('/setPersona', persona.value)
          if (result.status === 201 && result.data.codigo === 1) {
            sInicio.addPersona(persona.value)
            sInicio.addIDPersona(Number(result.data.contenido.id_persona))
            router.push({ path: '/multas' })
          } else {
            Mensaje.error("Error, datos no registrados.");
          }
        } catch (err) {
          Mensaje.error("Error, datos no registrados.");
        }

      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        })
      }

    }

    let ObtenerGrupoPais = (event) => {
      event.preventDefault();
      if (persona.value.nacionalidad == '') {
        grupo.value = ''
      }
      else {
        persona.value.pais_nacimiento = persona.value.nacionalidad;
        let elemento = nacionalidadList.value.find(e=>e.cod_nacionalidad == persona.value.nacionalidad);
        grupo.value = elemento.grupo.substring(0.1);
        sNacionalidad.addIDNacionalidad(Number(elemento.id_nacionalidad));
        sNacionalidad.addCodNacionalidad(elemento.cod_nacionalidad);
        sNacionalidad.addNombrePais(elemento.nombre_pais);
        sNacionalidad.addCodClasificador(Number(elemento.grupo.substring(0.1)));
        sNacionalidad.addGrupo(Number(elemento.grupo));
      }
    }

    let CalcularEdad = () => {
      let fecha_nacimiento = moment(persona.value.fecha_nacimiento);
      let fecha_inicial = moment('1900-01-01');
      let edad = 0;
      let meses = 0;
      let fecha_actual = moment();
      if (fecha_inicial < fecha_nacimiento && fecha_nacimiento < fecha_actual) {
        edad = fecha_actual.diff(fecha_nacimiento, 'years');
        edadFN.value = (edad <= 17) ? "Menor de edad" : "Mayor de edad";
        formError.value.fecha_nacimiento = null
      } else {
        formError.value.fecha_nacimiento = 'Fecha no valida';
        edadFN.value = ''
      }
      sEdad.addEdad(Number(edad));
    }

    let siguiente =()=>{
      router.push({ path: '/tramites' })
    }

    let irTramites = ()=>{ 
      esPersonaJuridica.value = true;
      
      sInicio.setEsPersonaJuridica(esPersonaJuridica.value);
      console.log('get',sInicio.getEsPersonaJuridica);
      router.push({ path: '/tramites' })
    }


    
    onMounted(() => {
      fetchDocumento();
      fetchGenero();
      fetchNacionalidad();
      personStore();
      // nacionalidadGrupo
    })

    return {
      formatDate,
      Continuar,
      Cancelar,
      edadFN,
      Email,
      FechaNac,
      nacionalidadGrupo,
      grupo,
      generoList,
      persona,
      personaModule,
      formError,
      maxDate,
      Cancelar,
      ObtenerGrupoPais,
      idTipoDocumento,
      idNacionalidad,
      CalcularEdad,
      verificar_email,
      Multas,
      siguiente,
      documentoList,
      nacionalidadList,
      esPersonaJuridica,
      irTramites,
    }
  }
}
</script>