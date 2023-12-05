<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3"><h2 class="text-center">GESTIÓN DE USUARIOS</h2></div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12 mb-4">
        <button type="button" class="btn btn-outline-success btn-sm"
          @click="NuevoRegistro"
        >NUEVO USUARIO</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-12">
        <table class="table table-striped table-bordered table-sm table-hover">
          <thead class="thead-dark">
            <tr class="text-center">
              <th>NRO</th>
              <th>NOMBRE COMPLETO</th>
              <th>FECHA NACIMIENTO</th>
              <th>USUARIO</th>
              <th>FECHA REGISTRO</th>
              <th>ACCIONES</th>  
            </tr>
            
          </thead>
          <tbody>
            <tr v-for="(item, index) in usuarioLista" :key="index">
              <td class="text-center">{{index+1}}</td>
              <td>{{item.nombres+' '+item.primer_apellido+' '+item.segundo_apellido}}</td>
              <td class="text-center">{{dateFN(item.fecha_nacimiento)}}</td>
              <td>{{item.usuario}}</td>
              <td class="text-center">{{dateFormat(item.fecha_reg)}}</td>
              <td class="text-center">
                <button type="button" 
                  class="btn btn-outline-success btn-sm" 
                  title="Editar Usuario"
                  @click="EditarUsuario(item.id_usuario)"
                >
                  <i class="fa fa-edit"></i></button>&nbsp;
                <button type="button" 
                  class="btn btn-outline-danger btn-sm" 
                  title="Baja de Usuario"
                  @click="BajaUsuario(item.id_usuario)"
                ><i class="fa fa-user-minus"></i></button>&nbsp;
                <button type="button" class="btn btn-outline-warning btn-sm" title="Resetear Contraseña"
                  @click="ResetearPassword(item.id_usuario, item.nro_documento)"
                >
                  <i class="fa fa-lock"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <div class="modal fade" id="modal-baja">
      <p>hola</p>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router"
import api from "../../services/api"
import moment from 'moment'
import Swal from "sweetalert2";

export default {
  setup(){
    let router = useRouter()
    let usuarioLista = ref([])

    let fetchUsuarios = () => {
      api.get("/getUsuarios").then((response) => {
        usuarioLista.value = response.data.content
      })
    }

    let dateFormat = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY HH:mm:ss")
    }

    let dateFN = (fecha) => {
      return moment(fecha).format("DD/MM/YYYY")
    }

    let NuevoRegistro = () => {
      router.push({path: "/frmusuario"})
    }
    let ResetearPassword = (id_usuario, nro_documento) => {
      Swal.fire({
        text: "¿Desea resetear contraseña?", 
        icon: "question", 
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText:"Cancelar", 
        confirmButtonColor: "#198754", 
        allowOutsideClick: false 
      }).then((result) => {
        if(result.isConfirmed){
          let data = {
            id_usuario: Number(id_usuario),
            nro_documento
          }
          console.log("usuario: ", data)
          api.post("/setPassword", data)
        }
      })
    }

    let EditarUsuario = (id_usuario) => {
      //console.log(id_usuario);
    }

    let BajaUsuario = async (id_usuario) => {
      
      Swal.fire({
        text: "¿Desea realizar la baja del Usuario?", 
        icon: "question", 
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText:"Cancelar", 
        confirmButtonColor: "#198754", 
        allowOutsideClick: false 
      })
      .then((response) => {
        if(response.isConfirmed){
          let data = {
            id_usuario,
            observacion: 'BAJA POR BOLETA 002'
          }
          api.put('/bajaUsuario', data)
          //Swal.fire({text: "Usuario creado", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#198754", allowOutsideClick: false })
          fetchUsuarios()
        }
      })
      
    }

    onMounted(fetchUsuarios)

    return { NuevoRegistro, usuarioLista, dateFormat, dateFN,ResetearPassword, BajaUsuario, EditarUsuario }
  }

}
</script>