import { ref } from 'vue'
import api from '@/services/api'
import { useQuery } from '@tanstack/vue-query'

let hasError = ref(false)
let errorMessage = ref(null)

let getTipoDocumento = async () => {
  let result = await api.get('/getParametro/PAR_TIPO_DOCUMENTO')
  return result.data.content
}

const useTipoDocumento = () => {

  const { isLoading, data } = useQuery(
    ['datosTipoDocumento'],
    () => getTipoDocumento()
  )

  return{
    data, 
    isLoading,
    hasError,
    errorMessage
  }

}

export default useTipoDocumento