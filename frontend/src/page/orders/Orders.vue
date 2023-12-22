<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">{{$t('orders')}} </h2>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="search">
          <div class="search_seccion">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">{{$t('search')}}</label>
                  <span class="lb-error" v-if="formError.name">{{
                    formError.name
                  }}</span>
                  <input
                    class="form-control"
                    :placeholder="$t('name') "
                    v-model="search.name"
                  />
                </div>
              </div>

              <div class="col-md-3">
                <div class="mt-4">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    title="Search"
                    @click="Search"
                  >
                    <i class="fa fa-search"></i></button
                  >&nbsp;
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    title="Clear"
                    @click="Clear"
                  >
                    <i class="fa fa-eraser"></i>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="objectList.length == 0">
      <div class="col">
        <label for="" class="orange">{{$t('no_items')}} </label>
      </div>
    </div>
    <div class="table-responsive" v-else>
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>ID</th>
            <th>CI/NIT</th>
            <th>{{$t('razon_social')}} </th>
            <th>{{$t('type_movement')}} </th>
            <th>{{$t('items')}} </th>
            <th>{{$t('total')}} </th>
            <th>{{$t('created_at')}} </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in objectList"
            :key="index"
            :class="{
              'table-primary': item.movement_type=='In',
              'table-success': item.movement_type=='Out',
            }"
          >
            <td class="text-center">{{ item.order_id }}</td>
            <td>{{ item.nit}} </td>
            <td>{{ item.razon_social }} </td>
            <td>{{ item.type_movement_id }} {{ item.movement_type}} </td>
            <td>{{ item.total_items}} </td>
            <td>{{ item.total_amount}} </td>
            <td class="text-center">{{ formatDate(item.created_at) }}</td>
            <td class="text-center">
              <button
                class="btn btn-link"
                @click="getObject(item.order_id)"
                data-bs-toggle="modal"
                data-bs-target="#modalSaveForm"
              >
                <i class="fa fa-eye"></i>
              </button>
            
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade modal-xl"
      id="modalSaveForm"
      data-bs-backdrop="static"
      ref="modalSaveForm"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">{{$t('order')}} </div>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body" v-if="object != null">
            <div class="row mb-3">
              <div class="offset-md-1 col-md-10">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-6"> 
                        <div> <b>{{$t('supplier')}} : </b> {{ object.order.razon_social}}</div>
                        <!-- <div> <b>Estado: </b> --</div> -->
                        <div> <b>{{$t('order_date')}} : </b> {{ moment(object.order.order_date).format("YYYY-MM-DD")}}</div>
                        <div> <b>{{$t('total_items')}} : </b> {{ object.order.total_items }}</div>
                      </div>
                      <div class="col-6"> 
                        <div> <b>{{$t('order_number')}} : </b> <span class="orange">{{object.order.order_id}}</span></div>
                        <div> <b>{{$t('nit')}} : </b> {{ object.order.nit}}</div>
                        <div> <b>{{$t('razon_social')}} : </b>{{ object.order.razon_social}}</div>
                       
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table class="table table-sm table-hover border border-secondary">
                        <thead class="thead-dark border-bottom border-danger" >
                          <tr class="table dark text-center border-bottom border-dark">
                            <th>ITEM</th>
                            <th>{{$t('product_code')}}</th>
                            <th>{{$t('product')}}</th>
                            <th>{{$t('unit')}}</th>
                            <th>{{$t('quantity')}}</th>
                            <th>{{$t('price')}}</th>
                            <th>{{$t('discount')}}</th>
                            <th>{{$t('subtotal')}}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in object.order_items"
                            :key="index"
                            :class="{
                            
                            }"
                          >
                            <td class="text-center">{{ index + 1 }}</td>
                            <td class="text-center">{{ item.product.barcode }} </td>
                            <td class="text-start">{{ item.product.name }} </td>
                            <td class="text-center">{{ item.unit.abbreviation }} </td>
                            <td class="text-end">{{ item.quantity}} </td>
                            <td class="text-end">{{ Number(item.price).toFixed(2)}} </td>
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
                            <td class="text-end"><b> <span class="h4 text-black">{{object.order.total_amount}}</span></b></td>
                          </tr>
                        </tbody>
                      </table>

                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="saveObject()"
            >
              <i class="fa fa-save"></i> {{ $t('save') }}
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa fa-close"></i> {{ $t('close') }}
            </button>
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
    let isLoading = ref(false);
    let msgShow = ref(false);
    let modalSaveForm = ref(null);
    let formError = ref({});
    let saveFormError = ref({});
    let schemaForm = Yup.object().shape({
      name: Yup.string().required(),
      
    });
    let schemaSaveForm = Yup.object().shape({
      nit:Yup.string().max(50).required(),
      razon_social:Yup.string().max(255).required(),
      supplier_name:Yup.string().max(100).required(),
      contact_person:Yup.string().max(100).nullable(),
      contact_email:Yup.string().max(100).email().nullable(),
      contact_phone:Yup.string().max(20).nullable(),
      address:Yup.string().max(255).nullable(),
    });
    let url = '/orders';

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

    const ShowCreateForm = async () => {
      create_form.value = true;
      object.value = {
        name: "",
      };
    };

    const getObject = async (id) => {
      isLoading.value = true;
      create_form.value = false;
      let response = await api.get(url+`/${id}/detail`);
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
            .put(url + `/${object.value.order_id}`, data)
            .then((response) => {
              if (objectList.value.length > 0) {
                let index = objectList.value.findIndex(
                  (x) => x.order_id == object.value.order_id
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

   

    onMounted(() => {
      getList();
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
    
      create_form,
      ShowCreateForm,
      moment,
    };
  },
};
</script>
