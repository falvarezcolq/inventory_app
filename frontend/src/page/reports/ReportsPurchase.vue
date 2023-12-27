<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">Total de compras y gastos</h2>
      </div>
    </div>

    <div class="row">
        <div
         v-for="(order, index) in objectList.orders"
                :key="index"
                :class="{}"
        >
              <div class="col-md-12">
        <div class="row">
          <div class="col-6">
           
            <div>
              <b>{{ $t("total_items") }} : </b> {{ order.total_items }}
            </div>
          </div>
          <div class="col-6">
            <div>
              <b>{{ $t("order_number") }} : </b>
              <span class="orange">{{ order.order_id }}</span>
            </div>
            <div>
              <!-- <b>{{ $t("nit") }} : </b> {{ object.order.nit }} -->
            </div>
            <div>
              <!-- <b>{{ $t("razon_social") }} : </b>{{ object.order.razon_social }} -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-sm table-hover border border-secondary">
            <thead class="thead-dark border-bottom border-danger">
              <tr class="table dark text-center border-bottom border-dark">
                <th>ITEM</th>
                <th>{{ $t("product_code") }}</th>
                <th>{{ $t("product") }}</th>
                <th>{{ $t("unit") }}</th>
                <th>{{ $t("quantity") }}</th>
                <th>{{ $t("price") }}</th>
                <th>{{ $t("discount") }}</th>
                <th>{{ $t("subtotal") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in order.order_items"
                :key="index"
                :class="{}"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ item.product.barcode }}</td>
                <td class="text-start">{{ item.product.name }}</td>
                <td class="text-center">{{ item.unit.abbreviation }}</td>
                <td class="text-end">{{ item.quantity }}</td>
                <td class="text-end">{{ Number(item.price).toFixed(2) }}</td>
                <td class="text-end">{{ item.descuent }} 0</td>
                <td class="text-end">{{ item.subtotal }}</td>
              </tr>
              <tr>
                <td colspan="6"></td>
                <!-- <td>{{ item.nit}} </td>
                            <td>{{ item.razon_social }} </td>
                            <td>{{ item.type_movement_id }} {{ item.movement_type}} </td>
                            <td>{{ item.total_items}} </td>
                            <td>{{ item.total_amount}} </td> -->
                <td class="text-end"><b>TOTAL:</b></td>
                <td class="text-end">
                  <b>
                    <span class="h4 text-black">{{ order.total_amount  }}</span>
                    </b
                  >
                </td>
              </tr>
            </tbody>
          </table>

            <div>
                <b>Total reporte: </b> {{ total_report }}
            </div>
        </div>
      </div>
        </div>
    
    </div>

    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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
    let maxDate = moment().format("YYYY-MM-DD");
    let search = ref({
      name: "",
    });

    let create_form = ref(false);
    let object = ref(null);
    let objectList = ref([]);
    let roleList = ref([]);
    let isLoading = ref(false);
    let msgShow = ref(false);
    let modalSaveForm = ref(null);
    let formError = ref({});
    let saveFormError = ref({});
    let schemaForm = Yup.object().shape({
      name: Yup.string().required(),
    });
    let schemaSaveForm = Yup.object().shape({
      username: Yup.string().max(50).required(),
      email: Yup.string().max(255).email(),
      address: Yup.string().max(255),
      phone: Yup.string().max(20),
      role_id: Yup.number().required(),
    });
    let url = "/users";
    let total_report = ref(0);

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    };

    let Clear = () => {
      search.value = {
        name: "",
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
            .get(url + `?page=1&limit=10000&name=${search.value.name}`)
            .then((response) => {
              objectList.value = response.data.content;
            });
        }
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
      }
    };

    let getTotalPurchase=()=>{
        let total = 0 ;
        if(objectList.value.orders.length >0){
            for (let index = 0; index < objectList.value.orders.length; index++) {
                const element = objectList.value.orders[index];
                const total_order = Number(element.total_amount)
                total = total + total_order;
                
            }
        }
        total_report.value = total;

    }
    let getList = async () => {
      try {
        isLoading.value = true;
        await api.get(`/report_purchase`).then((response) => {
          objectList.value = response.data.content;
          getTotalPurchase();
        });
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
      }
    };

    let getRoles = async () => {
      try {
        await api.get("/report_purchase").then((response) => {
          roleList.value = response.data.content;
        });
      } catch (err) {
        Mensaje.error(err.message);
      }
    };

    const ShowCreateForm = async () => {
      create_form.value = true;
      object.value = {
        username: "",
        email: "",
        address: "",
        phone: "",
        role_id: null,
      };
    };

    const getObject = async (id) => {
      isLoading.value = true;
      create_form.value = false;
      let response = await api.get(url + `/${id}`);
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
            let response = await api.delete(url + `/${id}`);
            if (response.status == 200) {
              let index = objectList.value.findIndex((x) => x.product_id == id);
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

    onMounted(() => {
      getList();
      getRoles();
    });

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
      total_report,
    };
  },
};
</script>
