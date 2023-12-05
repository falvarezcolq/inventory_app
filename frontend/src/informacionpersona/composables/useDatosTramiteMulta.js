import { ref } from 'vue'
import api from '@/services/api'
import { useRegistroStore } from '@/stores/useRegistroStore'
import { useQuery } from '@tanstack/vue-query'

const datos = ref ({});
const hasError = ref(false);
const errorMessage = ref(null);

let sRegistro = useRegistroStore()
let id_proceso = sRegistro.getIDProceso

let getDatosTramite = async () => {
  let { data } =  await api.get(`/getRegistroTramite/${id_proceso}`)
  return data.content
}

const useDatosTramite = () => {

  const { isLoading, isError, data, error } = useQuery(
    ['datosTramite'],
    getDatosTramite,
  )

  return{
    isLoading, 
    isError, 
    datos, 
    error
  }
}

export default useDatosTramite;