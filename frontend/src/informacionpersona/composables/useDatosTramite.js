import { ref } from 'vue'
import api from '@/services/api'
import { useRegistroStore } from '@/stores/useRegistroStore'
import { useQuery } from '@tanstack/vue-query'

// let sRegistro = useRegistroStore()
// let id_proceso = sRegistro.getIDProceso;
// let tipo_tramite = sRegistro.getTipoTramite;

// console.log('id_proceso composable',id_proceso);
const datos = ref({});
const hasError = ref(false);
const errorMessage = ref(null);

let getDatosTramite = async () => {
  let sRegistro = useRegistroStore()
  let id_proceso = sRegistro.getIDProceso;
  let tipo_tramite = sRegistro.getTipoTramite;
  let { data } =  await api.get(`/getRegistroTramite/${id_proceso}/${tipo_tramite}`);
  return data.contenido;
}

let loadedTramite = (data) => {
  hasError.value = false;
  errorMessage.value = null;
  datos.value = data;
}

const useDatosTramite = () => {
  const { isLoading, isError, data, error } = useQuery(
    ['datosTramite'],
    getDatosTramite, {
      onSuccess(data){
        loadedTramite(data)
      }
    }
  )

  return{
    isLoading, 
    isError, 
    datos, 
    error
  }
}

export default useDatosTramite;