<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">{{$t('products')}}</h2>
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
                    :placeholder="$t('name_product')"
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
                  {{$t('new_product')}}<i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="objectList.length == 0">
      <div class="col">
        <label for="" class="orange">{{$t('no_items')}}</label>
      </div>
    </div>
    <div class="table-responsive" v-else>
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>{{$t('product_code')}}</th>
            <th>{{$t('product')}}</th>
            <!-- <th>MANUFACTURER</th> -->
            <th class="text-end">{{$t('purchase_price')}}</th>
            <th class="text-end">{{$t('sale_price')}}</th>
            <th class="text-end" >{{$t('stock')}}</th>
            <th class="text-center">{{$t('unit')}}</th>
            <th class="text-center">{{$t('created_at')}}</th>
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
            <!-- <td class="text-center">{{ item.product_code }}</td> -->
            <td>
                <img class="doc" v-bind:src="item.image_url" 
                    alt="Product Image"
                    v-if="item.image_url" width="200" height="200"
                    />
            </td>
            <td>{{ item.name}} </td>
            <!-- <td>{{ item.manufacturer}} </td> -->
            <td class="text-end">{{ item.purchase_price}} </td>
            <td class="text-end">{{ item.price}} </td>
            <td class="text-end">{{ item.stock_quantity}} </td>
            <td class="text-center">{{ item.unit_abbreviation}} </td>
            

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
            <div class="modal-title">{{$t('product')}}</div>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body" v-if="object != null">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="row">
                   <div class="col-md-12">
                    <label class="frm-label">{{$t('product_code')}}:</label>
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
                    <label class="frm-label">{{$t('name')}}:</label>
                    <span class="lb-error" v-if="saveFormError.name">{{
                      saveFormError.name
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="object.name"
                      :class="{ error: saveFormError.name }"
                      @input="object.name = $event.target.value.toUpperCase()"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">{{$t('description')}}:</label>
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
                    <label class="frm-label">{{$t('purchase_price')}}:</label>
                    <span class="lb-error" v-if="saveFormError.purchase_price">{{
                      saveFormError.purchase_price
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      v-model="object.purchase_price"
                      :class="{ error: saveFormError.purchase_price }"
                      onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">{{$t('sale_price')}}:</label>
                    <span class="lb-error" v-if="saveFormError.price">{{
                      saveFormError.price
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      v-model="object.price"
                      :class="{ error: saveFormError.price }"
                       onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                    />
                  </div>
                  <!-- <div class="col-md-12">
                    <label class="frm-label">STOCK QUANTITY:</label>
                    <span class="lb-error" v-if="saveFormError.stock_quantity">{{
                      saveFormError.stock_quantity
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      value="0"
                      v-model="object.stock_quantity"
                      :class="{ error: saveFormError.stock_quantity }"
                      disabled
                    />
                  </div> -->
                   <div class="col-md-12">
                    <label class="frm-label">{{$t('barcode')}}:</label>
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
                    <label class="frm-label">{{$t('manufacturer')}}:</label>
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
                    <label class="frm-label">{{$t('category')}}:</label>
                    <span class="lb-error" v-if="saveFormError.category_id">{{
                      saveFormError.category_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="object.category_id"
                      :class="{ error: saveFormError.category_id }"
                      @input="object.category_id = $event.target.value">
                      <option value="">--{{$t('select')}}--</option>
                      <option v-for="item in categoryList"
                      :key="item.category_id" 
                      :value="item.category_id">
                        {{ item.name }}</option> 
                      </select>
                  </div>
                 
                  <div class="col-md-12">
                    <label class="frm-label">{{$t('supplier')}}:</label>
                    <span class="lb-error" v-if="saveFormError.supplier_id">{{
                      saveFormError.supplier_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="object.supplier_id"
                      :class="{ error: saveFormError.supplier_id }"
                      @input="object.supplier_id = $event.target.value">
                      <option value="">--{{$t('select')}}--</option>
                      <option v-for="item in supplierList" 
                      :key="item.supplier_id" 
                      :value="item.supplier_id">
                        {{ item.supplier_name}}</option> 
                    </select>
                  </div>

                  <div class="col-md-12">
                    <label class="frm-label">{{$t('unit')}}:</label>
                    <span class="lb-error" v-if="saveFormError.unit_id">{{
                      saveFormError.unit_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="object.unit_id"
                      :class="{ error: saveFormError.unit_id }"
                      @input="object.unit_id = $event.target.value">
                     
                      <option v-for="item in unitList" 
                      :key="item.unit_id" 
                      :value="item.unit_id">
                        {{ item.name}}</option> 
                    </select>
                  </div>
                
                  <div class="col-md-12">
                    <label class="frm-label">{{$t('weight')}}:</label>
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
              <div class="col-md-6">
                
                <div class="col-md-12 mt-3" v-if="object.image_url">
                  <img class="doc" :src="object.image_url" 
                    alt="Product Image"
                    v-if="object.image_url" width="400" height="400"

                    />

                </div>

                <div class="col-md-12 mt-3">
                <label :for="'file-upload'" class="btn btn-sm btn-outline-success">
                  <i class="fa fa-cloud-upload"></i> {{$t('upload_image')}}
                </label>
                <input @change="cargarArchivo($event)" type="file" :id="'file-upload'"
                  style="display: none;"/>
                </div>

                <div class="col-md-12 mt-3" v-if="product_image">
                  <img class="doc" v-bind:src="product_image" 
                    alt="Product Image"
                    v-if="product_image" width="400" height="400"

                    />

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
import TipoArchivos from '../../constantes/TipoArchivos';


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
        purchase_price:Yup.number().required(),
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
        purchase_price:"",
        price:"",
        stock_quantity:0,
        category_id:null,
        barcode:"",
        manufacturer:"",
        category_id:"",
        supplier_id:"1",
        unit_id:"1",
        image_url:null,
        product_code:"",
        weight:"1",
      
      }
    let product_image = ref(null);
    let product_image_blob = ref(null);
    


    let categoryList =  ref([]);
    let supplierList =  ref([]);
    let unitList =  ref([]);
  


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
        await api.get( '/suppliers/suppliers?page=1&limit=1000').then((response) => {
          supplierList.value = response.data.content;
        });
      } catch(err) {
         isLoading.value = false;
        Mensaje.error(err.message);
      }
    }

    let getUnits = async () =>{
      try{
        await api.get( '/units?page=1&limit=1000').then((response) => {
          unitList.value = response.data.content;
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

          let unit = unitList.value.find(x => x.unit_id == object.value.unit_id);
          object.value.unit_abbreviation = unit.abbreviation;
          let data = object.value;
          let response = await api.post(url, data);
          if (response.status == 201) {
              if (objectList.value.length >= 0) {
                response.data.content.created = true;
                object.value.product_id = response.data.content.product_id;
                objectList.value.push(response.data.content);
              }
              if(product_image_blob.value){
                await saveImage();
              }
              object.value = null;
              Mensaje.success("Created successfully");
              Modal.getInstance(modalSaveForm.value).hide();
          }
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
          let unit = unitList.value.find(x => x.unit_id == object.value.unit_id);
          object.value.unit_abbreviation = unit.abbreviation;
          let data = object.value;
          let response  = await api
            .put(url + `/${object.value.product_id}`, data)
          
          if( response.status == 200){
            if (objectList.value.length > 0) {
              let index = objectList.value.findIndex(
                (x) => x.product_id == object.value.product_id
              );
              if (index >= 0) {
                object.value.updated = true;
                objectList.value[index] = object.value;
                console.log("objectList.value[index]",objectList.value[index])
              }
            }
            if(product_image_blob.value){
              await saveImage();
            }
            Mensaje.success("Updated successfully");
            Modal.getInstance(modalSaveForm.value).hide();
          }
           

            
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



    let cargarArchivo = async ( e) => {
      try {
        let archivo = e.target.files[0];
        if (!archivo) return;
          const imagenesAceptadas = TipoArchivos.TipoImagenes;
        if (imagenesAceptadas.includes(archivo['type'])) {
          resizeImage(archivo)
        } else  {
          Mensaje.error("El archivo seleccionado no tiene el formato aceptado, solamente imágenes y pdf son válidos. ")
        }
      } catch (error) {
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }


    let resizeImage = (file) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {

            let tamanhoMinimoAceptable= img.width > img.height ? img.width : img.height ;
            if (tamanhoMinimoAceptable < 100 ){
              Mensaje.error("La imagen no alcanza el tamaño minimo aceptado")
              return;
            }
            const maxWidth = 4096;
            const maxHeight = 4096;
            let newWidth = img.width;
            let newHeight = img.height; 
            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }
            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
            }
            const max = newWidth > newHeight ? newWidth: newHeight;
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const qualityImage = 1 - (0.0002)*(max-100);
            canvas.toBlob((blob) => {
              guardarArchivo(blob,file.name)
            }, 'image/jpeg', qualityImage)
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    let guardarArchivo = async (archivo,name, item) => {
      try {
        
        product_image_blob.value = archivo;
        var reader = new window.FileReader();
          reader.readAsDataURL(archivo); 
          reader.onload = function() {
               product_image.value = reader.result;
          }
      } catch (error) {
        console.log(error.message);
      }
    }

    let saveImage = async () => {
      try {
         
         console.log("product_image_blob.value",product_image_blob.value)
        if (product_image_blob.size > 2050000 ){
          Mensaje.error("El documento no debe exceder los 2MB de tamaño")
          return ;
        }
        const formData = new FormData();  
        formData.append('product_id', object.value.product_id);
        formData.append('archivo', product_image_blob.value,"name");
        isLoading.value=true;
        let result = await api.post('/product_images', formData)
        isLoading.value=false;
        if (result.status == 200) {
          
          product_image_blob.value = null;
          product_image.value = null;
          console.log("¡Archivo subido con éxito!")
        } else {
          Mensaje.error("Error")
        }
      } catch (error) {
        isLoading.value=false;
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }

    onMounted(() => {
      getList();
      getCategories();
      getSuppliers();
      getUnits();
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
      unitList,

      cargarArchivo,
      product_image,
      
    };
  },
};
</script>
