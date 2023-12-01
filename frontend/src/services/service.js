import decode from 'jwt-decode'
import moment from 'moment'


let cred= 'ailsud9e938fe8h3u6843980jk34j87ijo7'
let getToken = () => {
  return localStorage.getItem(cred)
}

let getInformacionUsuario = () => {
  let objToken = decode(localStorage.getItem(cred))
  return objToken
}

let tokenExpirado = () => {
  let objToken = decode(localStorage.getItem(cred))
  return objToken.exp * 1000 < moment.valueOf();
}

let tokenConfirmado = () => {
  let objToken = decode(localStorage.getItem(cred))
  return objToken.confirmado;
}

export const service = {
  getToken,
  getInformacionUsuario,
  tokenExpirado,
  tokenConfirmado,
}