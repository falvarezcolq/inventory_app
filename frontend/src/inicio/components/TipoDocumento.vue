<template>
  <select 
    class="form-control"
    @change="changeTipoDocumento($event)"
    v-model="tipo_documento"
  >
    <option value="">SELECCIONAR</option>
    <option v-for="(item, index) in data" :key="index" :value="item.cod_clasificador">{{ item.nombre }}</option>
  </select>
</template>

<script>
import { ref } from 'vue'
import useTipoDocumento from '@/inicio/composables/useTipoDocumento'

export default {
  props: {
    setOption: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let tipo_documento = ref(props.setOption);
    const { data, isLoading, hasError, errorMessage } = useTipoDocumento()
    let option = ref('')

    let changeTipoDocumento = (event) => {
      option.value = event.target.value     
    }
    
    return {
      data,
      isLoading,
      changeTipoDocumento,
      option,
      tipo_documento
    }

  }
}
</script>