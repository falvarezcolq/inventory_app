<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">Products</h2>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="search">
          <div class="search_seccion">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">SEARCH</label>
                  <span class="lb-error" v-if="formError.name">{{
                    formError.name
                  }}</span>
                  <input
                    class="form-control"
                    placeholder="NAME'S PRODUCT"
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
              <div class="col-md-6" style="text-align: right">
                <button
                  class="btn btn-primary"
                  @click="ShowCreateForm()"
                  data-bs-toggle="modal"
                  data-bs-target="#modalSaveForm"
                >
                  ADD NEW PRODUCT<i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="objectList.length == 0">
      <div class="col">
        <label for="" class="orange">No items</label>
      </div>
    </div>
    <div class="table-responsive" v-else>
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>PRODUCT_CODE</th>
            <th>PRODUCT</th>
            <th>MANUFACTURER</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>CREATED AT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in objectList"
            :key="index"
            :class="{
              'table-success': item.created,
              'table-info': item.updated,
            }"
          >
            <td class="text-center">{{ item.product_code }}</td>
            <td>{{ item.name}} </td>
            <td>{{ item.manufacturer}} </td>
            <td class="text-end">{{ item.price}} </td>
            <td class="text-end">{{ item.stock_quantity}} </td>

            <td class="text-center">{{ formatDate(item.created_at) }}</td>
            <td class="text-center">
              <button
                class="btn btn-link"
                @click="getObject(item.product_id)"
                data-bs-toggle="modal"
                data-bs-target="#modalSaveForm"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-link red"
                @click="deleteObject(item.product_id)"
              >
                <i class="fa fa-trash"></i>
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
            <div class="modal-title">FORM PRODUCT</div>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body" v-if="object != null">
            <div class="row mb-3">
              <div class="offset-md-2 col-md-8">
                <div class="row">
                   <div class="col-md-12">
                    <label class="frm-label">PRODUCT CODE:</label>
                    <span class="lb-error" v-if="saveFormError.product_code">{{
                      saveFormError.product_code
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.product_code"
                      :class="{ error: saveFormError.product_code }"
                      @input="object.product_code = $event.target.value"
                    />
                  </div>
                
                  <div class="col-md-12">
                    <label class="frm-label">NAME:</label>
                    <span class="lb-error" v-if="saveFormError.name">{{
                      saveFormError.name
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.name"
                      :class="{ error: saveFormError.name }"
                      @input="object.name = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">DESCRIPTION:</label>
                    <span class="lb-error" v-if="saveFormError.description">{{
                      saveFormError.description
                    }}</span>
                    <textarea
                      class="form-control"
                      v-model="object.description"
                      :class="{ error: saveFormError.description }"
                      @input="object.description = $event.target.value"
                    ></textarea>
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">PRICE:</label>
                    <span class="lb-error" v-if="saveFormError.price">{{
                      saveFormError.price
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      v-model="object.price"
                      :class="{ error: saveFormError.price }"
                      @input="object.price = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">STOCK QUANTITY:</label>
                    <span class="lb-error" v-if="saveFormError.stock_quantity">{{
                      saveFormError.stock_quantity
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      v-model="object.stock_quantity"
                      :class="{ error: saveFormError.stock_quantity }"
                      @input="object.stock_quantity = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">CATEGORY ID:</label>
                    <span class="lb-error" v-if="saveFormError.category_id">{{
                      saveFormError.category_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="object.category_id"
                      :class="{ error: saveFormError.category_id }"
                      @input="object.category_id = $event.target.value">
                      <option v-for="item in categoryList"
                      :key="item.category_id" 
                      :value="item.category_id">
                        {{ item.name }}</option> 
                      </select>
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">BARCODE:</label>
                    <span class="lb-error" v-if="saveFormError.barcode">{{
                      saveFormError.barcode
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.barcode"
                      :class="{ error: saveFormError.barcode }"
                      @input="object.barcode = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">MANUFACTURER:</label>
                    <span class="lb-error" v-if="saveFormError.manufacturer">{{
                      saveFormError.manufacturer
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.manufacturer"
                      :class="{ error: saveFormError.manufacturer }"
                      @input="object.manufacturer = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">SUPPLIER ID:</label>
                    <span class="lb-error" v-if="saveFormError.supplier_id">{{
                      saveFormError.supplier_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="object.supplier_id"
                      :class="{ error: saveFormError.supplier_id }"
                      @input="object.supplier_id = $event.target.value">
                      <option v-for="item in supplierList" 
                      :key="item.supplier_id" 
                      :value="item.supplier_id">
                        {{ item.supplier_name}}</option> 
                    </select>
                  </div>
                  <!-- <div class="col-md-12">
                    <label class="frm-label">IMAGE URL:</label>
                    <span class="lb-error" v-if="saveFormError.image_url">{{
                      saveFormError.image_url
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.image_url"
                      :class="{ error: saveFormError.image_url }"
                      @input="object.image_url = $event.target.value"
                    />
                  </div> -->
                 
                  <div class="col-md-12">
                    <label class="frm-label">WEIGHT:</label>
                    <span class="lb-error" v-if="saveFormError.weight">{{
                      saveFormError.weight
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      v-model="object.weight"
                      :class="{ error: saveFormError.weight }"
                      @input="object.weight = $event.target.value"
                    />
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
              <i class="fa fa-save"></i> SAVE
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa fa-close"></i> CLOSE
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
       name:Yup.string().max(100).required(),
        description:Yup.string().max(1024),
        price:Yup.number().required(),
        stock_quantity:Yup.number().required(),
        category_id:Yup.number().required(),
        barcode:Yup.string().max(50),
        manufacturer:Yup.string().max(100),
        supplier_id:Yup.number().required(),
        // image_url:Yup.string().max(512),
        product_code:Yup.string().max(50),
        weight:Yup.number().required(),
    });
    let url = '/products';
    let data = {
        name:"",
        description:"",
        price:"",
        stock_quantity:0,
        category_id:null,
        barcode:"",
        manufacturer:"",
        supplier_id:null,
        image_url:null,
        product_code:"",
        weight:"",
      }

    let categoryList =  ref([]);
    let supplierList =  ref([]);


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
        isLoading.value = false;
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
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };
    


    let getCategories = async () =>{
      try{
        await api.get( '/categories?page=1&limit=1000').then((response) => {
          categoryList.value = response.data.content;
        });
      } catch(err) {
         isLoading.value = false;
        Mensaje.error(err.message);
      }
    }

    let getSuppliers = async () =>{
      try{
        await api.get( '/suppliers?page=1&limit=1000').then((response) => {
          supplierList.value = response.data.content;
        });
      } catch(err) {
         isLoading.value = false;
        Mensaje.error(err.message);
      }
    }

    const ShowCreateForm = async () => {
      create_form.value = true;
      object.value = data;
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
            .put(url + `/${object.value.product_id}`, data)
            .then((response) => {
              if (objectList.value.length > 0) {
                let index = objectList.value.findIndex(
                  (x) => x.product_id == object.value.product_id
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
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        }).then(async (result) => {
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
        });
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
       
      }
    };

    onMounted(() => {
      getList();
      getCategories();
      getSuppliers();
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
      categoryList,
      supplierList,
    };
  },
};
</script>
