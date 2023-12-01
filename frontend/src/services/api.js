import axios from 'axios';
import { service } from './service';

const api = axios.create({
  baseURL: `${process.env.VUE_APP_URL_APP}`
});

api.interceptors.request.use( 
  request => {
    let token = service.getToken()
    if(token){
      request.headers.token = token;
    }
    return request
  },
  function(err){
    console.log('No hay token desde el interceptor' + err)
  }
);

export default api;