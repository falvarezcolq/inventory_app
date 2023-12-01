import decode from 'jwt-decode'

import api from "./api"
import { useWebServiceStore } from '@/stores/useWebServiceStore';
const getUsuarioUrl = '/getUsuario';
const getTipoTramite0 = `/getTipoTramite0`;
const getTramiteData = `/getTramiteData`;
const getProcesoInicioUrl = '/proceso_inicio/get';

const store = useWebServiceStore();



const getUsuario=async () => {
  return await api.get(getUsuarioUrl).then(res => {
    store.addUsuario(res.data.persona )
    return res.data.persona;
  })
}
const getUsuarioStore=async () => {
  let payload =store.getUsuario;
  if(payload && payload!=''){
    return payload;
  }else{
    return await getUsuario();
  }
}

const fetchTipoTramitePersonaNatural=async () => {
  return await api.get(getTipoTramite0).then((response) => {
    return response.data.contenido;
  });
}

const getTramite=async (id) => {
  return await api.get(getTramiteData+"/"+id).then(res => {
    return res.data.contenido;
  })
}


const getProcesoInicio=async (id) => {
  return await api.get(getProcesoInicioUrl+"/"+id).then(res => {
    return res.data.contenido;
  })
}

export const ws = {
  getUsuario,
  getUsuarioStore,
  fetchTipoTramitePersonaNatural,
  getTramite,
  getProcesoInicio,
}
