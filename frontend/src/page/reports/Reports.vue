<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">{{$t('reports')}}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
          <div class="card-body">
            <h5 class="card-title">Total de compras y gastos</h5>
            <p class="card-text"> El reportes muestra el total de dinero gastado en compras y gastos.</p>
            <button class="btn btn-primary" @click="report_purchase">Ver reporte</button>
          </div>
      
      </div>
      <div class="col-md-4">
        <div class="card-body">
        <h5 class="card-title">Total de ventas por dia</h5>
        <p class="card-text">Muestra el total de ventas por dia</p>
        <button  class="btn btn-primary" @click="report_sales" >Ver Reporte </button>
      </div>

      </div>
       <div class="col-md-4">
        <div class="card-body">
        <h5 class="card-title">Balance ventas</h5>
        <p class="card-text">Muestra la diferencia del total invertido y total vendido.</p>
        <button href="#" class="btn btn-primary"  @click="report_balance" >Ver Reporte </button>
      </div>
      </div>
    </div>
 
  
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import Loading from "@/components/Loading.vue";
import SinResultado from "@/components/SinResultado.vue";
import { Modal } from "bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Mensaje } from "../../tools/Mensaje";

export default {
  components: {
    Loading,
    SinResultado,
  },
  setup() {
    let router = useRouter();
    let maxDate = moment().format("YYYY-MM-DD");
    let search = ref({
      name: "",
    });

    let create_form = ref(false);
    let object = ref(null);
    let objectList = ref([]);
    let roleList  =  ref([]);
    let isLoading = ref(false);
    let msgShow = ref(false);
    let modalSaveForm = ref(null);
    let formError = ref({});
    let saveFormError = ref({});
    let schemaForm = Yup.object().shape({
      name: Yup.string().required(),
      
    });
    let schemaSaveForm = Yup.object().shape({
      username:Yup.string().max(50).required(),
      email:Yup.string().max(255).email(),
      address:Yup.string().max(255),
      phone:Yup.string().max(20),
      role_id:Yup.number().required(),
    });
    let url = '/users';

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    };

    let Clear = () => {
      search.value = {
       name:"",
      };
      objectList.value = [];
    };

    let searchValidate = async () => {
      let valida = false;
      try {
        formError.value = {};
        await schemaForm.validate(search.value, { abortEarly: false });
        valida = true;
      } catch (err) {
        formError.value = {};
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message;
          }
        });
      }
      return valida;
    };

    let Search = async () => {
      try {
        if (await searchValidate()) {
          isLoading.value = true;
          await api
            .get(
              url + `?page=1&limit=10000&name=${search.value.name}`
            )
            .then((response) => {
              objectList.value = response.data.content;
            });
        }
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
      }
    };

    let getList = async () => {
      try {
        isLoading.value = true;
        await api.get(url + `?page=1&limit=1000`).then((response) => {
          objectList.value = response.data.content;
        });
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
      }
    };
    
    let getRoles = async ()=>{
      try{
        await api.get( '/roles?page=1&limit=1000').then((response) => {
          roleList.value = response.data.content;
        });
      } catch(err) {
        Mensaje.error(err.message);
      }
    }

    const ShowCreateForm = async () => {
      create_form.value = true;
      object.value = {
        username:"",
        email:"",
        address:"",
        phone:"",
        role_id:null,
      };
    };

    const getObject = async (id) => {
      isLoading.value = true;
      create_form.value = false;
      let response = await api.get(url+`/${id}`);
      isLoading.value = false;
      if (response.status == 200) {
        object.value = response.data.content;
      } else {
        Mensaje.error(response.data.message);
      }
    };

    const createObject = async () => {
      try {
        if (await saveValidate()) {
          isLoading.value = true;
          let data = object.value;
          await api
            .post(url, data)
            .then((response) => {
              if (objectList.value.length > 0) {
                response.data.content.created = true;
                objectList.value.push(response.data.content);
              }
              Mensaje.success("Created successfully");
              Modal.getInstance(modalSaveForm.value).hide();
            })
            .catch((err) => {
              Mensaje.error(err.message);
            });
        }
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
        isLoading.value = false;
      }
    };

    const updateObject = async () => {
      try {
        if (await saveValidate()) {
          isLoading.value = true;
          let data = object.value;
          await api
            .put(url + `/${object.value.user_id}`, data)
            .then((response) => {
              if (objectList.value.length > 0) {
                let index = objectList.value.findIndex(
                  (x) => x.user_id == object.value.user_id
                );
                if (index >= 0) {
                  object.value.updated = true;
                  objectList.value[index] = object.value;
                }
              }
              Mensaje.success("Updated successfully");
              Modal.getInstance(modalSaveForm.value).hide();
            })
            .catch((err) => {
              Mensaje.error(err.message);
            });
        }
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
        isLoading.value = false;
      }
    };

    const saveValidate = async () => {
      let valida = false;
      try {
        saveFormError.value = {};
        await schemaSaveForm.validate(object.value, { abortEarly: false });
        valida = true;
      } catch (err) {
        saveFormError.value = {};
        err.inner.forEach((error) => {
          if (error.path && !saveFormError[error.path]) {
            saveFormError.value[error.path] = error.message;
          }
        });
      }
      return valida;
    };
    const saveObject = async () => {
      if (create_form.value) {
        await createObject();
      } else {
        await updateObject();
      }
    };

   const deleteObject = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        }).then(async (result) => {
          try {
            if (result.isConfirmed) {
              isLoading.value = true;
              let response = await api.delete(url+`/${id}`);
              if (response.status == 200) {
                let index = objectList.value.findIndex(
                  (x) => x.product_id == id
                );
                if (index >= 0) {
                  objectList.value.splice(index, 1);
                }
                Mensaje.success("Deleted successfully");
              } else {
                Mensaje.error(response.data.message);
              }
              isLoading.value = false;
            }
          } catch (err) {
            isLoading.value = false;
            Mensaje.error(err.message);
          }
        });
    };



    const report_purchase =()=>{
      router.push({
        path:'report_purchase',
      })
    }

    const report_sales = ()=>{
      router.push({
        path:'report_sales'
      })
    }

    const report_balance = ()=>{
      router.push({
        path:'report_balance'
      })
    }

    return {
      formatDate,
      Search,
      maxDate,
      Clear,
      formError,
      saveFormError,
      objectList,
      search,
      isLoading,
      msgShow,
      object,
      modalSaveForm,
      saveObject,
      getList,
      getObject,
      deleteObject,
      create_form,
      ShowCreateForm,
      roleList,
      report_purchase,
      report_sales,
      report_balance,
    };
  },
};
</script>
