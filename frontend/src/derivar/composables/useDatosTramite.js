import { ref } from 'vue'
import api from '@/services/api'
import { useRegistroStore } from '@/stores/useRegistroStore'
import { useQuery } from '@tanstack/vue-query'


const datos = ref ({});
//const isLoading = ref(false)
const hasError = ref(false)
const errorMessage = ref(null)

let sRegistro = useRegistroStore()
let id_proceso = sRegistro.getIDProceso

let getDatosTramite = async () => {
  let { data } =  await api.get(`/getRegistroTramite/${id_proceso}`)
  return data.contenido
}

let loadedTramite = (data) => {
  hasError.value = false
  errorMessage.value = null
  datos.value = data
}

const useDatosTramite = () => {

  const { isLoading, isError, data, error } = useQuery(
    ['datosTramite'],
    getDatosTramite,
    {
      onSuccess(data){
        loadedTramite(data)
      }
    },
    
  )

  return{
    isLoading, 
    isError, 
    datos, 
    error
  }
}

export default useDatosTramite