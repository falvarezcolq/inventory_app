<template>
  <div class="datos-tramite">
    <table class="table table-striped table-sn table-detail">
      <tbody>
        <tr>
          <td width="50%"><label class="lbPersona">NOMBRES:</label></td>
          <td width="50%">{{persona.nombres}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">PRIMER APELLIDO:</label></td>
          <td>{{persona.primer_apellido}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">SEGUNDO APELLIDO:</label></td>
          <td>{{persona.segundo_apellido}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">FECHA NACIMIENTO:</label></td>
          <td>{{FormatFecha(persona.fecha_nacimiento)}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">TIPO DOCUMENTO:</label></td>
          <td>{{persona.tipo_documento == 'PA' ? 'PASAPORTE' : persona.tipo_documento == 'CEX' ? 'CEDULA DE IDENTIDAD DE EXTRANJERO' : persona.tipo_documento == 'CDN' ? 'CERTIFICADO DE NACIONALIDAD' : persona.tipo_documento == 'CN' ? 'CERTIFICADO DE NACIMIENTO' : persona.tipo_documento == 'DNI' ? 'DOCUMENTO NACIONAL DE IDENTIDAD' : persona.tipo_documento == 'CI' ? 'CEDULA DE IDENTIDAD' : ''}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">NRO DOCUMENTO:</label></td>
          <td>{{persona.nro_documento}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">NACIONALIDAD:</label></td>
          <td>{{persona.nacionalidad}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">PAIS DE NACIMIENTO:</label></td>
          <td>{{persona.pais_nacimiento}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">GÉNERO:</label></td>
          <td>{{persona.genero == 'M' ? 'MASCULINO': persona.genero == 'F'?' FEMENINO':''}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">TELÉFONO:</label></td>
          <td>{{persona.telefono}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">CORREO ELECTRÓNICO:</label></td>
          <td>{{persona.email}}</td>
        </tr>
        <tr>
          <td><label class="lbPersona">DIRECCIÓN:</label></td>
          <td>{{persona.direccion}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
import { ref, onMounted } from 'vue'
import { useInicioStore } from '@/stores/useInicioStore'
import api from "@/services/api";
import moment from 'moment'

export default {

  setup(){
    let persona = ref({})
    let sPersona = useInicioStore()
    // let Documento = ref([])
    // let Nacionalidad = ref([])

    let personStore = () => {
      let personaData = sPersona.getPersona
      if(personaData.module){
        persona.value = personaData.data
        
      }
    }

    let FormatFecha = ( fecha ) => {
      return moment( fecha ).format('DD/MM/YYYY');
    }
    // let fetchDocumento= () =>
    //   doc = persona.value.tipo_documento
    //   console.log("doc", doc);
    //   api.get(`/getDocumento/${'PER'}`).then(response => {
    //   Documento.value = response.data.content;
    //   console.log('Documento',Documento.value);
    // }); 
    // let fetchNacionalidad= ()  =>
    // api.get(`/getNacionalidad/${persona.value[0].nacionalidad}`).then(response => {
    // Nacionalidad.value = response.data.content;
    // console.log('Nacionalidad',Nacionalidad.value);
    // }); 

    onMounted(personStore)
    // onMounted(fetchDocumento)
    // onMounted(fetchNacionalidad)

    return { 
      persona, 
      FormatFecha,
      // Nacionalidad,
      // Documento
    }
  }
}
</script>
