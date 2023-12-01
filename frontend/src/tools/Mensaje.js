
import Swal from 'sweetalert2';

export const Mensaje = {
    error:(text)=>{  
        return  Swal.fire({
            html: text,
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#198754",
            allowOutsideClick: false
          }); 
    },
    cancelar: (text,action)=>{  
        return   Swal.fire({
            html: text,
            icon: "error",
            confirmButtonText: "CANCELAR Y SALIR",
            showCancelButton: true,
            cancelButtonText: "VOLVER",
            confirmButtonColor: "#198754",
            allowOutsideClick: true,
          }).then((result) => {
            if (result.isConfirmed) {
                action()
            }
          });  
    },
    success:(text)=>{  
        return  Swal.fire({
            html: text,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#198754",
            allowOutsideClick: false
          }); 
    },
    success_action:(text,action)=>{  
        return  Swal.fire({
            html: text, 
            icon: "success", 
            confirmButtonText: "Aceptar", 
            confirmButtonColor: "#198754", 
            allowOutsideClick: false })
          .then((response) => {
            if(response.value){
              action();
            }
          });  
    },
    Confirmar:(text,action)=>{
        Swal.fire({
            html:text,
            icon:'question',
            confirmButtonText: "CONFIRMAR",
            showCancelButton: true,
            cancelButtonText: "VOLVER",
            confirmButtonColor: "#198754",
            allowOutsideClick: true,
        }).then((result) => {
            if (result.isConfirmed) {
                action();
            }
        });  
    },
    info:(text)=>{
        Swal.fire({
            html: text,
            icon: "info",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: "#198754",
            allowOutsideClick: false,
        });
    },
    warning:(text)=>{
        Swal.fire({
            html: text,
            icon: "warning",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: "#198754",
            allowOutsideClick: false,
        });
    },
    warning_action:(text,action)=>{
        Swal.fire({
            html:text,
            icon:'warning',
            confirmButtonText: "CONFIRMAR",
            showCancelButton: true,
            cancelButtonText: "VOLVER",
            confirmButtonColor: "#198754",
            allowOutsideClick: true,
        }).then((result) => {
            if (result.isConfirmed) {
                action();
            }
        });  
    },

    warning_info:(text,action)=>{  
        return  Swal.fire({
            html: text, 
            icon: "warning", 
            confirmButtonText: "Aceptar", 
            confirmButtonColor: "#198754", 
            allowOutsideClick: false })
          .then((response) => {
            if(response.value){
              action();
            }
          });  
    },


}