import { ref } from 'vue'
import api from '@/services/api'
import { useQuery } from '@tanstack/vue-query'

//let data = ref([])
//let isLoading = ref(false)
let hasError = ref(false)
let errorMessage = ref(null)

let getNacionalidad = async() => {
  let result = await api.get('/getNacionalidad')
  return result.data.contenido
}

const useNacionalidad = () => {

  const { isLoading, data } = useQuery(
    ['datosNaionalidad'],
    () => getNacionalidad(),
  )
  
  return {
    data,
    isLoading,
    hasError,
    errorMessage    
  }

}  

export default useNacionalidad