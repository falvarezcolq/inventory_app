<template>
  <select 
    class="form-control"
    @change="changeNacionlidad($event)"
    v-model="nacionalidad"
  >
    <option value="">SELECCIONAR</option>
    <option v-for="(item, index) in data" :key="index" :value="item.cod_nacionalidad">{{item.nombre_pais}}</option>
  </select>
</template>

<script>
import { ref } from 'vue'
import useNacionalidad from '@/inicio/composables/useNacionalidad'

export default {
  props: {
    setOption: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let nacionalidad = ref(props.setOption);
    let option = ref('');
    let nacionalidadObjeto = ref('');


    const { data, isLoading, hasError, errorMessage } = useNacionalidad()

    let changeNacionlidad = (event) => {
      option.value = event.target.value;
      if(option.value == ''){
        nacionalidadObjeto.value = ''
      }else{
        nacionalidadObjeto.value = data.value.find(e=>e.cod_nacionalidad == option.value);
      }
    }

    return {
      nacionalidadObjeto,
      data,
      isLoading,
      hasError,
      errorMessage,
      nacionalidad,
      changeNacionlidad,
      option
    }

  }
}
</script>