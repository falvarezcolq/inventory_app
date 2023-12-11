<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">OUTLETS</h2>
      </div>
    </div>


   <div class="row mb-3">
      <div class="col-md-12">
        <div class="search">
          <div class="search_seccion">
            <div class="row">
       
              <div class="col-md-5">  
                <div class="form-group">
                  <label class="frm-label">Supplier</label>
                  <span class="lb-error" v-if="formInError.supplier_id">{{
                    formInError.supplier_id
                  }}</span>
                  <select class="form-control" 
                    v-model="objectIn.supplier_id"
                    :class="{error:formInError.supplier_id}">
                    <option v-for="item in supplierList" :key="item.supplier_id" :value="item.supplier_id">
                      {{ item.supplier_name }}</option>
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
                    :class="{error:formInError.order_date}"
                    type="date"
                  />
                </div>
                
              </div>            
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-8">
        <div class="search">
          <div class="search_seccion">
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
                    <option v-for="item in productList" :key="item.product_id" :value="item.product_id">
                      {{ item.name }}</option>
                  </select>
            

                  <span class="lb-error" v-if="product && Number(product.stock_quantity) == 0 ">{{
                    "No stock"
                  }}</span>
                  <span class="lb-success" v-if="product && Number(product.stock_quantity) > 0">{{
                    "Stock available: "+product.stock_quantity
                  }}</span>
                </div>
              </div>
              <div class="col-md-3">
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
               <div class="col-md-5">
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

              <div class="col-md-3">
                <div class="mt-4">
                   <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    title="Add"
                    @click="addObject()"
                  >
                   &nbsp; <i class="fa fa-plus"></i>&nbsp;&nbsp;  
                    </button
                  >&nbsp;
                  <!-- <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    title="Search"
                    @click="Search"
                  >
                    <i class="fa fa-search"></i></button
                  >&nbsp; -->
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
              <!-- <div class="col-md-12" style="text-align: right">
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="ShowCreateForm()"
                  data-bs-toggle="modal"
                  data-bs-target="#modalSaveProductForm"
                >
                  ADD NEW PRODUCT<i class="fa fa-plus"></i>
                </button>
              </div> -->
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
            <th>PRODUCT</th>
            <th class="text-center" width="100">PRICE</th>
            <th class="text-center" width="100">QUANTITY</th>
            <th class="text-center" width="100">SUBTOTAL</th>
            <th></th>
             <!-- <th width="100">LOTE</th>
            <th width="100">EXPIRATION</th> -->
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
            <td class="text-center">{{ (index + 1) }}</td>           
            <td>{{ item.name}} </td>
            <td style="margin-rigth:0"> 
              <span class="lb-error" v-if="formErrorRow[index].price">{{
                  formErrorRow[index].price
              }}</span>
              <!-- <input v-model.trim="item.price"
                  class="form-control input-table text-end" 
                  type="text"
                  onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                  :class="{ error: formErrorRow[index].price }"
                  disabled
              />  -->
              <div class="text-end" style="width:100%; margin-top:7px; margin-right:0px; font-size:12px;">
                {{ item.price }}  
              </div>
            </td>
            <td class="text-center" style="">
              <span class="lb-error" v-if="formErrorRow[index].quantity">{{
                  formErrorRow[index].quantity
              }}</span>
              <input v-model.trim = "item.quantity"
                class="form-control input-table text-end" 
                type="text"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)"
                @keyup="validateItem(item,index)"
                :class="{ error: formErrorRow[index].quantity }"
                /> 
            </td>
           
            <td  style="position:relative;">
              <div class="text-end" style="width:100%; margin-top:7px; margin-right:0px; font-size:12px;">
                {{ (item.price * item.quantity).toFixed(2) }}
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

            <!-- <td width="100"> 
              <span class="lb-error" v-if="formErrorRow[index].lote">{{
                  formErrorRow[index].lote
              }}</span>
              <input v-model.trim = "item.lote"
                class="input-table" 
                type="text"
                :class="{ error: formErrorRow[index].lote }"
                /> 
            </td>
            <td width="100"> 
              <span class="lb-error" v-if="formErrorRow[index].expiration_date">{{
                  formErrorRow[index].expiration_date
              }}</span>
              <input v-model.trim = "item.expiration_date"
                class="input-table" 
                type="date"
                 :class="{ error: formErrorRow[index].expiration_date }"
                /> 
            </td> -->
          </tr>
        </tbody>
      </table>

      <div>
        <div class="row">
          <div class="offset-3 col-md-3 text-end">
            <div style="width:100%;" class="text-end">
                TOTAL: 
            </div>
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
          <div class="offset-9 col-md-3 ">
            <button class="btn btn-primary"
              @click="saveOut()"
            >
              SAVE
            </button>
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
                      @input="newProduct.name = $event.target.value"
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
                      @input="newProduct.price = $event.target.value"
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
                      v-model="newProduct.stock_quantity"
                      :class="{ error: saveFormError.stock_quantity }"
                      @input="newProduct.stock_quantity = $event.target.value"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="frm-label">CATEGORY ID:</label>
                    <span class="lb-error" v-if="saveFormError.category_id">{{
                      saveFormError.category_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="newProduct.category_id"
                      :class="{ error: saveFormError.category_id }"
                      @input="newProduct.category_id = $event.target.value">
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
                    <label class="frm-label">SUPPLIER ID:</label>
                    <span class="lb-error" v-if="saveFormError.supplier_id">{{
                      saveFormError.supplier_id
                    }}</span>
                    <select
                      class="form-control"
                      v-model="newProduct.supplier_id"
                      :class="{ error: saveFormError.supplier_id }"
                      @input="newProduct.supplier_id = $event.target.value">
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
                      v-model="newProduct.image_url"
                      :class="{ error: saveFormError.image_url }"
                      @input="newProduct.image_url = $event.target.value"
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
                      v-model="newProduct.weight"
                      :class="{ error: saveFormError.weight }"
                      @input="newProduct.weight = $event.target.value"
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
import Multiselect from "vue-multiselect";
import Multas from '../../inicio/pages/multas/Multas.vue';
export default {
  components: {
    Loading,
    SinResultado,
    Multiselect,
    Multas
  },
  setup() {
    let maxDate = moment().format("YYYY-MM-DD");
    let search = ref({
      barcode: "",
      product_id:null,
      quantity:1,
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
    let urlProducts = '/products';
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
    let productList =  ref([]);
    let newProduct = ref(null);
    let product = ref(null);
    


    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    };

    let Clear = () => {
      search.value = {
        barcode: "",
        product_id:null,
        quantity:1,
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
              urlProducts + `?page=1&limit=10000&name=${search.value.name}`
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

    let getProducts = async () =>{
      try{
        await api.get( '/products?page=1&limit=1000').then((response) => {
          if(response.data.content.length > 0){
            
            productList.value = response.data.content;
            for (let index = 0; index < productList.value.length; index++) {
              productList.value[index].stock_quantity_init = Number(productList.value[index].stock_quantity);
            }
          } 


        });
      } catch(err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    }
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

    const addObject = async ()=>{
      try {
        let product = productList.value.find(x=>x.product_id == search.value.product_id);


        if(product){

          if(Number(product.stock_quantity) < Number(search.value.quantity) ){
            Mensaje.error("Stock not enough exists only "+product.stock_quantity+" units" + " of "+search.value.quantity);
            return;
          }else{
            product.stock_quantity = product.stock_quantity - search.value.quantity;
          }

          let index = objectList.value.findIndex(x=>x.product_id == product.product_id);
          if(index >= 0){
            objectList.value[index].quantity += search.value.quantity;
          }else{
            product.quantity = search.value.quantity;
            product.sub_total = (product.price * product.quantity).toFixed(2);
            objectList.value.push(product);
            formErrorRow.value.push({});
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

   

    const saveProductValidate = async () => {
      let valida = false;
      try {
        saveFormError.value = {};
        await schemaSaveProductForm.validate(newProduct.value, { abortEarly: false });
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
          let data = newProduct.value;
          await api
            .post(urlProducts, data)
            .then((response) => {
              if (productList.value.length > 0) {
                response.data.content.created = true;
                productList.value.push(response.data.content);
              }
              Mensaje.success("Created successfully");
              Modal.getInstance(modalSaveProductForm.value).hide();
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

    const deleteObject = async (id) => {
      try {

        let index = objectList.value.findIndex(x=>x.product_id == id);
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
             let index = objectList.value.findIndex(x=>x.product_id == id);
             objectList.value[index].stock_quantity = objectList.value[index].stock_quantity_init;
             objectList.value[index].quantity = 0;
             
              if(index >= 0){
                objectList.value.splice(index,1);
                formErrorRow.value.splice(index,1);
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
      price: Yup.number().required(),
      lote: Yup.string().nullable(),
      expiration_date: Yup.date().nullable(),
    });

    const formErrorRow = ref([]);

    const validateItem = async (item,index)=>{
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
      if(item.stock_quantity_init < item.quantity){
        valida = false;
        formErrorRow.value[index].quantity = "No stock"; 
      }else{
        item.stock_quantity = item.stock_quantity_init - item.quantity;
      }
      return valida;
    }

    const validateIn = async ()=>{
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
        valida=false;
      }

      if(objectList.value.length == 0){
        Mensaje.error("No items");
        valida = false;
      }else{
        for(let i = 0; i < objectList.value.length; i++){
          if(! await validateItem(objectList.value[i],i)){
            valida = false;
          }
        }
      }
      return valida;
    }

    const tot = ref(0);
    let total = computed(() => {
      let sum = 0;
      objectList.value.forEach((item) => {
        sum += Number(Number((item.price * item.quantity).toFixed(2)).toFixed(2));
      });
      tot.value = sum.toFixed(2);
      return sum.toFixed(2)
    });

    const saveOut = async ()=>{
      try {
        if( await validateIn()){
          Mensaje.Confirmar("Do you want to save this income?",async ()=>{
           
             isLoading.value = true;
            let data = {
              supplier_id:objectIn.value.supplier_id,
              order_date:objectIn.value.order_date,
              items:objectList.value,
              total:tot.value,
            }
            await api.post('/out',data).then((response)=>{
              Mensaje.success("Created successfully");
              objectList.value.map((item)=>{
                  item.stock_quantity_init = item.stock_quantity;
              });
              Clear();
              objectList.value = [];
              isLoading.value = false;
            }).catch((err)=>{
              Mensaje.error(err.message);
              isLoading.value = false;
            })
          });
        }
      } catch (error) {
        Mensaje.error(err.message);
        isLoading.value = false;
      }
    }

    


    onMounted(() => {
      getCategories();
      getSuppliers();
      getProducts();
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
      productList,
      saveProduct,
      newProduct,
      total,
      saveOut,
      objectIn,
      formErrorRow,
      product,
      validateItem,
    };
  },
};
</script>
