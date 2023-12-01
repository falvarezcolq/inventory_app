<template>
  <select 
    class="form-control"
    @change="change($event)"
    v-model="model"
  >
    <option value="">SELECCIONAR</option>
    <option v-for="(item, index) in data" :key="index" :value="item.cod_clasificador">{{ item.nombre }}</option>
  </select>
</template>

<script>
import { ref } from 'vue'
import useTipoGenero from '@/inicio/composables/useTipoGenero'

export default {
  props: {
    setOption: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let model = ref('')
    model.value=props.setOption;
    const { data, isLoading, hasError, errorMessage } = useTipoGenero()
    let option = ref('')

    let change = (event) => {
      option.value = event.target.value     
    }

    let t=()=>{
      model=props.setOption;
    }
 
    return {
      data,
      isLoading,
      change,
      option,
      model
    }

  }
}
</script>