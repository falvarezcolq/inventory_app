import { ref } from 'vue'
import api from '@/services/api'
import { useQuery } from '@tanstack/vue-query'

let hasError = ref(false);
let errorMessage = ref(null);

let getTipoGenero = async () => {
  let result = await api.get('/getParametro/PAR_GENERO')
  return result.data.contenido;
}

const useTipoGenero = () => {
  const { isLoading, data } = useQuery(
    ['datosTipoGenero'],
    () => getTipoGenero()
  )
  return{
    data, 
    isLoading,
    hasError,
    errorMessage
  }
}

export default useTipoGenero;