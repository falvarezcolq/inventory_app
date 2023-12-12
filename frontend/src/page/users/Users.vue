<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">Users</h2>
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
                    placeholder="NAME'S CATEGORY"
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
                  ADD NEW USER <i class="fa fa-plus"></i>
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
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>PHONE</th>
            <th>ROLE</th>
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
            <!-- <td class="text-center">{{ item.user_id }}</td> -->
            <td>{{ item.username}} </td>
            <td>{{ item.email}} </td>
            <td>{{ item.address}} </td>
            <td>{{ item.phone}} </td>
            <td>{{ item.role}} </td>

            <td class="text-center">{{ formatDate(item.created_at) }}</td>
            <td class="text-center">
              <button
                class="btn btn-link"
                @click="getObject(item.user_id)"
                data-bs-toggle="modal"
                data-bs-target="#modalSaveForm"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-link red"
                @click="deleteObject(item.user_id)"
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
            <div class="modal-title">FORM USER</div>
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
                    <label class="frm-label">USERNAME:</label>
                    <span class="lb-error" v-if="saveFormError.username">{{
                      saveFormError.username
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.username"
                      :class="{ error: saveFormError.username }"
                    
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">EMAIL:</label>
                    <span class="lb-error" v-if="saveFormError.email">{{
                      saveFormError.email
                    }}</span>
                    <input
                      class="form-control"
                      type="email"
                      v-model="object.email"
                      :class="{ error: saveFormError.email }"
                      @input="object.email = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">ADDRESS:</label>
                    <span class="lb-error" v-if="saveFormError.address">{{
                      saveFormError.address
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.address"
                      :class="{ error: saveFormError.address }"
                      @input="object.address = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">PHONE:</label>
                    <span class="lb-error" v-if="saveFormError.phone">{{
                      saveFormError.phone
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.phone"
                      :class="{ error: saveFormError.phone }"
                      @input="object.phone = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">ROLE:</label>
                    <span class="lb-error" v-if="saveFormError.role_id">{{
                      saveFormError.role_id
                    }}</span>
                    <select class="form-control" 
                    v-model="object.role_id">
                      <option v-for="item in roleList" :key="item.role_id" :value="item.role_id">{{item.role_name}}</option>
                    </select>
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
                (x) => x.user_id == id
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
        Mensaje.error(err.message);
        isLoading.value = false;
      }
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
    };
  },
};
</script>
