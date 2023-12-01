<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2> ACTUALIZAR INFORMACIÓN PERSONAL </h2>
        <h3 class="green">
          * Es obligatorio los datos fidedignos del documento personal.
          <br> 
          <!-- * Es obligatorio un correo que sera nombre de usuario -->
        </h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3" style="border-right:1px solid #ccc">
        <div class="row form-group">
          <div class="col-md-12">
            <label for="">Tipo Documento:</label> 
            <span class="lb-error" v-if="formError.tipo_documento">{{ formError.tipo_documento }}</span>
            <select class="form-control" v-model="persona.tipo_documento" :class="{ error: formError.tipo_documento }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in documentoList" :key="index" :value="item.cod_clasificador">
                {{ item.nombre }}</option>
            </select>
          </div>
          <div class="col-md-12">
            <label for="">Nro Documento:</label> 
            <span class="lb-error" v-if="formError.nro_documento">{{ formError.nro_documento}}</span>
            <input type="text" class="form-control" v-model="persona.nro_documento"
              :class="{ error: formError.nro_documento }" 
              @input="persona.nro_documento = $event.target.value.toUpperCase()"
              />
          </div>

          <div class="col-md-12">
            <label for="">Pais de Emision:</label> 
            <span class="lb-error" v-if="formError.nacionalidad_emision">{{formError.nacionalidad_emision}}</span>
            <select class="form-control" 
            v-model="persona.nacionalidad_emision" 
            :class="{ error: formError.nacionalidad_emision }"
            @change="cambioPaisEmision"
            >
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">
                {{ item.nombre_pais }}</option>
            </select>
          </div>
          <div class="col-lg-12">
            <label class="form-label">Fecha de emisión de documento (solo si tiene):</label>
            <span class="lb-error" v-if="formError.fecha_emision" >{{ formError.fecha_emision }}</span>
            <input type="date" class="form-control" v-model="persona.fecha_emision"
              :class="{ error: formError.fecha_emision }"
              :max="maxDate"
              />
          </div>
          

          <div class="col-md-12">
            <label for="">Indefinido:</label>
            <input type="checkbox" class="form-check" v-model='persona.indefinido' />
          </div>

          <div class="col-lg-12">
            <label class="form-label">Fecha de expiración del documento:</label>
            <span class="lb-error" v-if="formError.fecha_expiracion" >{{ formError.fecha_expiracion }}</span>
      
            <input type="date" class="form-control" v-model="persona.fecha_expiracion"
              :disabled="persona.indefinido" 
              :class="{ error: formError.fecha_expiracion }" 
              :min="minDate"/>
          </div>
         
        </div>
       
      </div>


      <div class="col-md-9">
        <div class="row form-group">
          <div class="col-md-4">
            <label for="">Primer Apellido:</label> 
            <span class="lb-error" v-if="formError.primer_apellido">{{formError.primer_apellido}}</span>
            <input type="text" class="form-control" v-model="persona.primer_apellido"
              :class="{ error: formError.primer_apellido }" 
              @input="persona.primer_apellido = $event.target.value.toUpperCase()"
              />
          </div>
          <div class="col-md-4">
            <label for="">Segundo Apellido:</label>
            <span class="lb-error" v-if="formError.segundo_apellido">{{formError.segundo_apellido}}</span>
            <input type="text" class="form-control" v-model="persona.segundo_apellido" 
            :class="{ error: formError.segundo_apellido }"
            @input="persona.segundo_apellido = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-md-4">
            <label for="">Otro Apellido:</label>
            <span class="lb-error" v-if="formError.otro_apellido">{{formError.otro_apellido}}</span>
            <input type="text" class="form-control" v-model="persona.otro_apellido" 
            :class="{ error: formError.otro_apellido }" 
            @input="persona.otro_apellido = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-md-6">
            <label for="">Nombre(s):</label> 
            <span class="lb-error" v-if="formError.nombres">{{formError.nombres}}</span>
            <input type="text" class="form-control" v-model="persona.nombres"
             :class="{ error: formError.nombres }"
             @input="persona.nombres = $event.target.value.toUpperCase()"
              />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-4">
            <label for="">Fecha de Nacimiento:</label>
            <span class="lb-error" v-if="formError.fecha_nacimiento">{{formError.fecha_nacimiento}}</span>
            <input type="date" class="form-control" v-model="persona.fecha_nacimiento"
              :class="{ error: formError.fecha_nacimiento }" :max="maxDate" />
          </div>

          <div class="col-md-4">
            <label for="">Género:</label> 
            <span class="lb-error" v-if="formError.genero">{{formError.genero}}</span>
            <select class="form-control" v-model="persona.genero" :class="{ error: formError.genero }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in generoList" :key="index" :value="item.cod_clasificador">{{ item.nombre }}
              </option>
            </select>
          </div>


          </div>
        <div class="row form-group">
          <div class="col-md-4">
            <label for="">Nacionalidad:</label>  
            <span class="lb-error" v-if="formError.nacionalidad">{{formError.nacionalidad}}</span>
            <select class="form-control" v-model="persona.nacionalidad" :class="{ error: formError.nacionalidad }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">
                {{ item.nombre_pais }}</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="">Pais de Nacimiento:</label> 
            <span class="lb-error" v-if="formError.pais_nacimiento">{{ formError.pais_nacimiento }}</span>
            <select class="form-control" v-model="persona.pais_nacimiento" :class="{ error: formError.pais_nacimiento }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">
                {{ item.nombre_pais }}</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="">Lugar de Nacimiento:</label>
            <span class="lb-error" v-if="formError.lugar_nacimiento">{{ formError.lugar_nacimiento }}</span>
            <input type="text" class="form-control" v-model="persona.lugar_nacimiento"  
            :class="{ error: formError.lugar_nacimiento }"
            @input="persona.lugar_nacimiento = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-md-8">
            <label for="">Dirección:</label>
            <span class="lb-error" v-if="formError.direccion">{{ formError.direccion }}</span>
            <input type="text" class="form-control" v-model="persona.direccion" :class="{ error: formError.direccion }"
            @input="persona.direccion = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-md-4">
            <label for="">Telefono:</label>
            <span class="lb-error" v-if="formError.telefono">{{ formError.telefono }}</span>
            <input type="text" class="form-control" v-model='persona.telefono'  :class="{ error: formError.telefono }" 
            onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" 
            />
          </div>

        </div>
        <hr class="hr"/>
        
        <!-- 
        <div class="row form-group mt-2">
          <div class="offset-4 col-md-4">
            <label for="">Correo Electrónico:</label>
            <span class="lb-error" v-if="formError.email">{{ formError.email }}</span>
            <input type="text" class="form-control" v-model='persona.email'  :class="{ error: formError.email }" 
            @input="persona.email = $event.target.value.toLowerCase()"
            />
          </div>
        </div> 
        -->
      
    </div>
  </div>

  <div class="row mt-2">
    <div class="col-6">
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="Cancelar"><i class="fa fa-arrow-left"></i>
        </button>
      </div>
    <div class="col-6" style="text-align:right">
      <button type="button" class="btn btn-outline-primary btn-sm" @click="Registrar"><i class="fa fa-save"></i>
        ACTUALIZAR</button>
        <div>
      </div>
    </div>
  </div>
</div></template>

<script>
import { ref, onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import * as yup from 'yup'
import moment from "moment"
import { Mensaje } from '@/tools/Mensaje'
import { useUsuarioStore } from '../../stores/useUsuarioStore';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ws } from '@/services/webservices'
export default {
  setup() {
    let router = useRouter()
    let documentoList = ref([])
    let generoList = ref([])
    let nacionalidadList = ref([])
    let persona = ref({ tipo_documento: 'CI', nacionalidad: 'BOL',genero:'',indefinido:false})
    
    let formError = ref({})
    let maxDate = moment().format("YYYY-MM-DD")
    let sUsuario = useUsuarioStore();
    let schemaForm = yup.object().shape({
      nombres:yup.string().min(0).max(100).required(),
      primer_apellido:yup.string().min(0).max(50).required(),
      segundo_apellido:yup.string().min(0).max(50),
      otro_apellido:yup.string().min(0).max(50),
      fecha_nacimiento:yup.date()
      .min(new Date('1900-01-01'),"Fecha de nacimiento no válido")
      .max(new Date(),"Fecha de nacimiento no válido").required(),
      genero:yup.string().min(0).max(50).required(),
      nacionalidad:yup.string().min(0).max(20).required(),
      pais_nacimiento:yup.string().min(0).max(20).required(),
      lugar_nacimiento:yup.string().min(0).max(20),
      direccion:yup.string().min(0).max(150),
      telefono:yup.string().min(0).max(15).required(),
      tipo_documento:yup.string().min(0).max(50).required(),
      nro_documento:yup.string().min(0).max(50).required(),
      fecha_emision:yup.date().max(new Date(),"Fecha excedida").nullable().default(undefined),
      fecha_expiracion:yup.date().nullable().default(undefined),
      indefinido:yup.boolean().required(),
      nacionalidad_emision:yup.string().min(0).max(100).required(),
    })

    let fetchDocumento = () => api.get('/getParametro/PAR_TIPO_DOCUMENTO').then((response) => {
      documentoList.value = response.data.contenido
    })

    let fetchGenero = () => api.get('/getParametro/PAR_GENERO').then((response) => {
      generoList.value = response.data.contenido
    })

    let fetchNacionalidad = () => api.get('/getNacionalidad').then((response) => {
      nacionalidadList.value = response.data.contenido
    })

    let getUsuario=async()=>{
      persona.value = await  ws.getUsuario();
      console.log(persona.value);
    }

    const cambioPaisEmision = ()=>{
      persona.value.nacionalidad = persona.value.nacionalidad_emision;
      persona.value.pais_nacimiento = persona.value.nacionalidad_emision;
    }

    const Validar = async ()=>{

      let validar= true;
      try {
        formError.value = {}
        await schemaForm.validate(persona.value, { abortEarly: false })
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
            formError.value[error.path] = error.message
          }
        })
       
       validar = false;
      }

      // await verificar_email();
      if (formError.value.email){
       validar = false;
      }
      if(persona.value.password != persona.value.password2){
        formError.value.password2 = 'Las contraseñas no coinciden';
       validar = false;
      }

      if(persona.value.fecha_emision){
        if(persona.value.fecha_expiracion){  
          if(moment(persona.value.fecha_emision).valueOf()>= moment(persona.value.fecha_expiracion).valueOf()){
            formError.value.fecha_expiracion = "Fecha de expiración debe ser mayor a la fecha de emision";
            validar = false;
          }
        }
      }
      return validar;
    }

    const Registrar = async () => {

      if( await Validar()){
        Mensaje.Confirmar("¿Esta seguro de actualizar la información personal, por unica vez?<br> ¡Revise a detalle la información antes de registrar!" , ()=>{
           api.put('/setUsuario',persona.value).then(result=>{
              if (result.status === 200 && result.data.codigo === 1) {
     
                Mensaje.success_action("Actualizado correctamente",()=>{
                  //  Login()
                });
              }
            }).catch((error)=>{

              Mensaje.error(error.message)
              if(error.status == 400){
                Mensaje.error("Error 400")
              }
              if(error.status == 500){
                Mensaje.error("Error 500")
              }
            })
        })
       
      }
    }

    const Cancelar=()=>{
      router.push({path:'/informacionpersonal'})
    }

    let verificar_email = async  () => api.get(`/getEmail/${persona.value.email}`).then((response) => {
      if (response.data.codigo == 1 ) {
        formError.value.email= "¡El Correo Electrónico ya esta registrado! ";
      }
    })

    onMounted(fetchDocumento)
    onMounted(fetchGenero)
    onMounted(fetchNacionalidad)
    onMounted(getUsuario)

    return { Registrar,
       documentoList,
       generoList,
       nacionalidadList,
       persona,
       formError,
       maxDate,
       Cancelar ,
       cambioPaisEmision,
       verificar_email,
 
      }
  }
}
</script>