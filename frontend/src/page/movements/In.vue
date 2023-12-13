<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">INCOME PURCHASE</h2>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-10">
        <div class="search">
          <div class="search_seccion">
            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <label class="frm-label">Supplier</label>
                  <span class="lb-error" v-if="formInError.supplier_id">{{
                    formInError.supplier_id
                  }}</span>
                  <select
                    class="form-control"
                    v-model="objectIn.supplier_id"
                    :class="{ error: formInError.supplier_id }"
                  >
                    <option
                      v-for="item in supplierList"
                      :key="item.supplier_id"
                      :value="item.supplier_id"
                    >
                      {{ item.supplier_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label class="frm-label">DATE</label>
                  <span class="lb-error" v-if="formInError.order_date">{{
                    formInError.order_date
                  }}</span>
                  <input
                    class="form-control"
                    placeholder=""
                    v-model="objectIn.order_date"
                    :class="{ error: formInError.order_date }"
                    type="date"
                  />
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
       <div class="col-md-2" style="text-align: right">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="ShowCreateForm()"
                data-bs-toggle="modal"
                data-bs-target="#modalSaveProductForm"
              >
                ADD NEW PRODUCT<i class="fa fa-plus"></i>
              </button>
            </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-8">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="frm-label">PRODUCT</label>
                <span class="lb-error" v-if="formError.name">{{
                  formError.name
                }}</span>

                <select class="form-control"
                   v-model="search.product_id"
                   @change="getObject(search.product_id)"
                 >
                  <option
                    v-for="item in productList"
                    :key="item.product_id"
                    :value="item.product_id"
                  >
                    {{ item.name }}
                  </option>

                  <span class="lb-error" v-if="product && Number(product.stock_quantity) == 0 ">{{
                    "No stock"
                  }}</span>
                  <span class="lb-success" v-if="product && Number(product.stock_quantity) > 0">{{
                    "Stock available: "+product.stock_quantity
                  }}</span>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label class="frm-label">BARCODE</label>
                <span class="lb-error" v-if="formError.barcode">{{
                  formError.barcode
                }}</span>
                <input
                  class="form-control"
                  placeholder=""
                  v-model="search.barcode"
                />
              </div>
            </div>
          
            <div class="col-md-4">
              <div class="form-group">
                <label class="frm-label">QUANTITY</label>
                <span class="lb-error" v-if="formError.name">{{
                  formError.name
                }}</span>
                <input
                  class="form-control text-end"
                  placeholder=""
                  v-model="search.quantity"
                  type="number"
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="mt-4">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  title="Add"
                  @click="addObject()"
                >
                  &nbsp; <i class="fa fa-plus"></i>&nbsp;&nbsp;</button
                >&nbsp;
           
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  title="Clear"
                  @click="Clear"
                >
                  <i class="fa fa-eraser"></i>
                </button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  title="Clear"
                  @click="Clear"
                >
                  <i class="fa fa-sync"></i>
                </button>
              </div>
            </div>
          
          </div>

         
      </div>
      <div class="col-md-4">
        <!-- <div style="width:100%;max-height:400px;"> -->
           <img
              
                :src="product.image_url"
                alt="Product Image"
                v-if="product && product.image_url"
                width="300"
                height="300"
               
            />
        <!-- </div>  -->
        
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
            <th>ITEM</th>

            <th class="text-start" >PRODUCT</th>
            <th class="text-start">UNIT</th>
            <th class="text-center" width="100">PURCHASE PRICE</th>
            <th class="text-center" width="100">QUANTITY</th>
            <th class="text-center" width="100">SUBTOTAL</th>
            <th></th>
            <th width="100">LOTE</th>
            <th width="100">EXPIRATION</th>
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
            <td class="text-center">{{ index + 1 }}</td>

            <td class="text-start">{{ item.name }}</td>
            <td>{{ item.unit_abbreviation }}</td>
            <td style="margin-rigth: 0">
              <span class="lb-error" v-if="formErrorRow[index].purchase_price">{{
                formErrorRow[index].purchase_price
              }}</span>
              <input
                v-model.trim="item.purchase_price"
                class="form-control input-table text-end"
                type="text"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                :class="{ error: formErrorRow[index].purchase_price }"
              />
            </td>
            <td class="text-center" style="">
              <span class="lb-error" v-if="formErrorRow[index].quantity">{{
                formErrorRow[index].quantity
              }}</span>
              <input
                v-model.trim="item.quantity"
                class="form-control input-table text-end"
                type="text"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                :class="{ error: formErrorRow[index].quantity }"
              />
            </td>

            <td style="position: relative">
              <div
                class="text-end"
                style="
                  width: 100%;
                  margin-top: 7px;
                  margin-right: 0px;
                  font-size: 12px;
                "
              >
                {{ (item.purchase_price * item.quantity).toFixed(2) }}
              </div>
            </td>

            <td class="text-center">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="deleteObject(item.product_id)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>

            <td width="100">
              <span class="lb-error" v-if="formErrorRow[index].lote">{{
                formErrorRow[index].lote
              }}</span>
              <input
                v-model.trim="item.lote"
                class="input-table"
                type="text"
                :class="{ error: formErrorRow[index].lote }"
              />
            </td>
            <td width="100">
              <span
                class="lb-error"
                v-if="formErrorRow[index].expiration_date"
                >{{ formErrorRow[index].expiration_date }}</span
              >
              <input
                v-model.trim="item.expiration_date"
                class="input-table"
                type="date"
                :class="{ error: formErrorRow[index].expiration_date }"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div class="row">
          <div class="offset-3 col-md-3 text-end">
            <div style="width: 100%" class="text-end">TOTAL:</div>
          </div>
          <div class="col-md-3">
            <input
              class="form-control text-end"
              type="text"
              v-model="total"
              disabled
            />
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="offset-9 col-md-3">
            <button class="btn btn-primary" @click="saveIn()">SAVE</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade modal-xl"
      id="modalSaveProductForm"
      data-bs-backdrop="static"
      ref="modalSaveProductForm"
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
        <div class="modal-body" v-if="newProduct != null">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="row">
                   <div class="col-md-12">
                    <label class="frm-label">PRODUCT CODE:</label>
                    <span class="lb-error" v-if="saveFormError.product_code">{{
                      saveFormError.product_code
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="newProduct.product_code"
                      :class="{ error: saveFormError.product_code }"
                      @input="newProduct.product_code = $event.target.value"
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
                      v-model="newProduct.name"
                      :class="{ error: saveFormError.name }"
                      @input="newProduct.name = $event.target.value.toUpperCase()"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">DESCRIPTION:</label>
                    <span class="lb-error" v-if="saveFormError.description">{{
                      saveFormError.description
                    }}</span>
                    <textarea
                      class="form-control"
                      v-model="newProduct.description"
                      :class="{ error: saveFormError.description }"
                      @input="newProduct.description = $event.target.value"
                    ></textarea>
                  </div>
                   <div class="col-md-12">
                    <label class="frm-label">PURCHASE PRICE:</label>
                    <span class="lb-error" v-if="saveFormError.purchase_price">{{
                      saveFormError.purchase_price
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      v-model="newProduct.purchase_price"
                      :class="{ error: saveFormError.purchase_price }"
                      onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                    />
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
                      v-model="newProduct.price"
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
                      v-model="newProduct.stock_quantity"
                      :class="{ error: saveFormError.stock_quantity }"
                      disabled
                    />
                  </div> -->
                   <div class="col-md-12">
                    <label class="frm-label">BARCODE:</label>
                    <span class="lb-error" v-if="saveFormError.barcode">{{
                      saveFormError.barcode
                    }}</span>
                    <input
                      class="form-control"
                      type="text"
                      v-model="newProduct.barcode"
                      :class="{ error: saveFormError.barcode }"
                      @input="newProduct.barcode = $event.target.value"
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
                      v-model="newProduct.manufacturer"
                      :class="{ error: saveFormError.manufacturer }"
                      @input="newProduct.manufacturer = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">CATEGORY:</label>
                    <span class="lb-error" v-if="saveFormError.category_id">{{
                      saveFormError.category_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="newProduct.category_id"
                      :class="{ error: saveFormError.category_id }"
                      @input="newProduct.category_id = $event.target.value">
                      <option value="">--SELECT--</option>
                      <option v-for="item in categoryList"
                      :key="item.category_id" 
                      :value="item.category_id">
                        {{ item.name }}</option> 
                      </select>
                  </div>
                 
                  <div class="col-md-12">
                    <label class="frm-label">SUPPLIER:</label>
                    <span class="lb-error" v-if="saveFormError.supplier_id">{{
                      saveFormError.supplier_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="newProduct.supplier_id"
                      :class="{ error: saveFormError.supplier_id }"
                      @input="newProduct.supplier_id = $event.target.value">
                      <option value="">--SELECT--</option>
                      <option v-for="item in supplierList" 
                      :key="item.supplier_id" 
                      :value="item.supplier_id">
                        {{ item.supplier_name}}</option> 
                    </select>
                  </div>

                  <div class="col-md-12">
                    <label class="frm-label">UNIT:</label>
                    <span class="lb-error" v-if="saveFormError.unit_id">{{
                      saveFormError.unit_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="newProduct.unit_id"
                      :class="{ error: saveFormError.unit_id }"
                      @input="newProduct.unit_id = $event.target.value">
                     
                      <option v-for="item in unitList" 
                      :key="item.unit_id" 
                      :value="item.unit_id">
                        {{ item.name}}</option> 
                    </select>
                  </div>
                
                  <div class="col-md-12">
                    <label class="frm-label">WEIGHT:</label>
                    <span class="lb-error" v-if="saveFormError.weight">{{
                      saveFormError.weight
                    }}</span>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      v-model="newProduct.weight"
                      :class="{ error: saveFormError.weight }"
                      @input="newProduct.weight = $event.target.value"
                    />
                  </div>
              </div>
             
         

              </div>
              <div class="col-md-6">
                
                <div class="col-md-12 mt-3" v-if="newProduct.image_url">
                  <img class="doc" :src="newProduct.image_url" 
                    alt="Product Image"
                    v-if="newProduct.image_url" width="400" height="400"

                    />

                </div>

                <div class="col-md-12 mt-3">
                <label :for="'file-upload'" class="btn btn-sm btn-outline-success">
                  <i class="fa fa-cloud-upload"></i> Upload image
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
              @click="saveProduct()"
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
import { ref, onMounted, computed } from "vue";
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
      barcode: "",
      product_id: null,
      quantity: 1,
    });
    let create_form = ref(false);
    let object = ref(null);
    let objectIn = ref({
      supplier_id: null,
      order_date: moment().format("YYYY-MM-DD"),
    });
    let objectList = ref([]);

    let isLoading = ref(false);
    let msgShow = ref(false);
    let modalSaveProductForm = ref(null);
    let formError = ref({});
    let formInError = ref({});
    let saveFormError = ref({});
    let schemaForm = Yup.object().shape({
      name: Yup.string().required(),
    });
    let schemaSaveProductForm = Yup.object().shape({
      name: Yup.string().max(100).required(),
      description: Yup.string().max(1024),
      purchase_price: Yup.number().required(),
      price: Yup.number().required(),
      stock_quantity: Yup.number().required(),
      category_id: Yup.number().required(),
      barcode: Yup.string().max(50),
      manufacturer: Yup.string().max(100),
      supplier_id: Yup.number().required(),
      product_code: Yup.string().max(50),
      weight: Yup.number().required(),
    });
    let urlProducts = "/products";
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

    let categoryList = ref([]);
    let supplierList = ref([]);
    let unitList = ref([]);
    let productList = ref([]);
    let newProduct = ref(null);
    let product = ref(null);
    let product_image = ref(null);
    let product_image_blob = ref(null);

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    };

    let Clear = () => {
      search.value = {
        barcode: "",
        product_id: null,
        quantity: 1,
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
            .get(urlProducts + `?page=1&limit=10000&name=${search.value.name}`)
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

    let getCategories = async () => {
      try {
        await api.get("/categories?page=1&limit=1000").then((response) => {
          categoryList.value = response.data.content;
        });
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };

    let getSuppliers = async () => {
      try {
        await api.get("/suppliers/suppliers?page=1&limit=1000").then((response) => {
          supplierList.value = response.data.content;
        });
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };

    let getProducts = async () => {
      try {
        await api.get("/products?page=1&limit=1000").then((response) => {
          productList.value = response.data.content;
        });
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };
    const ShowCreateForm = async () => {
      create_form.value = true;
      newProduct.value = data;
      console.log(newProduct.value);
    };

    const getObject = async (id) => {
       try {
        product.value = productList.value.find(x=>x.product_id == id);
        console.log(product.value);
      } catch (error) {
        console.log(error);
      }
    };

    const addObject = async () => {
      try {
        let product = productList.value.find(
          (x) => x.product_id == search.value.product_id
        );
        if (product) {
          let index = objectList.value.findIndex(
            (x) => x.product_id == product.product_id
          );
          if (index >= 0) {
            objectList.value[index].quantity += search.value.quantity;
          } else {
            product.quantity = search.value.quantity;
            product.sub_total = (product.purchase_price * product.quantity).toFixed(2);
            objectList.value.push(product);
            formErrorRow.value.push({});
          }
        }

        console.log(objectList.value);
      } catch (error) {
        console.log(error);
      }
    };

    const saveProductValidate = async () => {
      let valida = false;
      try {
        saveFormError.value = {};
        await schemaSaveProductForm.validate(newProduct.value, {
          abortEarly: false,
        });
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
      await createProduct();
    };

    const saveProduct = async () => {
      await createProduct();
    };

    const createProduct = async () => {
      try {
        if (await saveProductValidate()) {
          isLoading.value = true;
          let unit = unitList.value.find(x=>x.unit_id == newProduct.value.unit_id);
          newProduct.value.unit_abbreviation = unit.abbreviation;
          let data = newProduct.value;
          let response = await api.post(urlProducts, data);
          if( response.status == 201){
              response.data.content.created = true;
              newProduct.value = response.data.content;
              productList.value.push(response.data.content);
              
              if(product_image_blob.value){
                await saveImage();
              }

            Mensaje.success("Created successfully");
            Modal.getInstance(modalSaveProductForm.value).hide();
          }
        }
        isLoading.value = false;
      } catch (err) {
        Mensaje.error(err.message);
        isLoading.value = false;
      }
    };

    const deleteObject = async (id) => {
      try {
        let index = objectList.value.findIndex((x) => x.product_id == id);
        let deleteObject = objectList.value[index];
        Swal.fire({
          title: `${deleteObject.name}`,
          text: "Do you want to remove this product from items?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let index = objectList.value.findIndex((x) => x.product_id == id);
            if (index >= 0) {
              objectList.value.splice(index, 1);
              formErrorRow.value.splice(index, 1);
            }
          }
        });
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };

    const schemaFormIn = Yup.object().shape({
      supplier_id: Yup.number().required(),
      order_date: Yup.date().required(),
    });

    const schemaFormItem = Yup.object().shape({
      product_id: Yup.number().required(),
      quantity: Yup.number().required(),
      purchase_price: Yup.number().required(),
      lote: Yup.string().nullable(),
      expiration_date: Yup.date().nullable(),
    });

    const formErrorRow = ref([]);

    const validateItem = async (item, index) => {
      let valida = false;
    
      try {
        formErrorRow.value[index] = {};
        await schemaFormItem.validate(item, { abortEarly: false });
        valida = true;
      } catch (err) {
        formErrorRow.value[index] = {};
        err.inner.forEach((error) => {
          if (error.path && !formErrorRow[error.path]) {
            formErrorRow.value[index][error.path] = error.message;
          }
        });
      }
      return valida;
    };

    const validateIn = async () => {
      let valida = false;
      try {
        formInError.value = {};
        await schemaFormIn.validate(objectIn.value, { abortEarly: false });
        valida = true;
      } catch (err) {
        formInError.value = {};
        err.inner.forEach((error) => {
          if (error.path && !formInError[error.path]) {
            formInError.value[error.path] = error.message;
          }
        });
        valida = false;
      }

      if (objectList.value.length == 0) {
        Mensaje.error("No items");
        valida = false;
      } else {
        for (let i = 0; i < objectList.value.length; i++) {
          if (!(await validateItem(objectList.value[i], i))) {
            valida = false;
          }
        }
      }
      return valida;
    };

    const tot = ref(0);
    let total = computed(() => {
      let sum = 0;
      objectList.value.forEach((item) => {
        item.subtotal = (item.purchase_price * item.quantity).toFixed(2)
        sum += Number((item.purchase_price * item.quantity).toFixed(2));
      });
      tot.value = sum;
      return sum;
    });

    const saveIn = async () => {
      try {
        if (await validateIn()) {

          console.log(objectList)
          Mensaje.Confirmar("Do you want to save this income?", async () => {
            isLoading.value = true;

            let data = {
              supplier_id: objectIn.value.supplier_id,
              order_date: objectIn.value.order_date,
              items: objectList.value,
              total: tot.value,
            };
            await api
              .post("/in_purchase", data)
              .then((response) => {
                Mensaje.success("Created successfully");
                Clear();
                objectList.value = [];
                isLoading.value = false;
              })
              .catch((err) => {
                Mensaje.error(err.message);
                isLoading.value = false;
              });
          });
        }
      } catch (error) {
        Mensaje.error(err.message);
        isLoading.value = false;
      }
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

    let guardarArchivo = async (archivo,name,) => {
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
        formData.append('product_id', newProduct.value.product_id);

        formData.append('archivo', product_image_blob.value,"name");
        isLoading.value=true;
        let result = await api.post('/product_images', formData)
        isLoading.value=false;
        if (result.status == 200) {
          
          let index = productList.value.indexOf(x=>x.product_id == newProduct.value.product_id);
          productList.value[index].image_url = result.data.content.newProductImage.image_url;
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

    onMounted(() => {
      getCategories();
      getSuppliers();
      getProducts();
      getUnits();
    });

    return {
      formatDate,
      Search,
      maxDate,
      Clear,
      formError,
      formInError,
      saveFormError,
      objectList,
      search,
      isLoading,
      msgShow,
      object,
      modalSaveProductForm,

      saveObject,
      getObject,
      deleteObject,
      create_form,
      ShowCreateForm,
      addObject,

      categoryList,
      supplierList,
      unitList,
      productList,
      saveProduct,
      newProduct,
      total,
      saveIn,
      objectIn,
      formErrorRow,
      product,

      cargarArchivo,
      saveImage,
      product_image,
      product_image_blob,
    };
  },
};
</script>
