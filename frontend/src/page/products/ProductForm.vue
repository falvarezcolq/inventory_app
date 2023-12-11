<template>
  <div>
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
              @input="object.category_id = $event.target.value"
            >
              <option
                v-for="item in categoryList"
                :key="item.category_id"
                :value="item.category_id"
              >
                {{ item.name }}
              </option>
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
              @input="object.supplier_id = $event.target.value"
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
      <div class="col-md-6">
        <div class="row">
                        <div class="col-md-12 mt-3" v-if="object.image_url">
            <img
                class="doc"
                :src="object.image_url"
                alt="Product Image"
                v-if="object.image_url"
                width="400"
                height="400"
            />
            </div>

            <div class="col-md-12 mt-3">
            <label :for="'file-upload'" class="btn btn-sm btn-outline-success">
                <i class="fa fa-cloud-upload"></i> Upload image
            </label>
            <input
                @change="cargarArchivo($event)"
                type="file"
                :id="'file-upload'"
                style="display: none"
            />
            </div>

            <div class="col-md-12 mt-3" v-if="product_image">
            <img
                class="doc"
                v-bind:src="product_image"
                alt="Product Image"
                v-if="product_image"
                width="400"
                height="400"
            />
            </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { ref,onMounted } from "vue";
import Loading from "../../components/Loading.vue";
import api from "../../services/api";




export default defineComponent({
    components: {
        Loading,
    },
    setup() {
        const isLoading = ref(false);
        const object = ref({
            product_code: "",
            name: "",
            description: "",
            price: "",
            stock_quantity: "",
            category_id: "",
            barcode: "",
            manufacturer: "",
            supplier_id: "",
            weight: "",
            image_url: null,
        });
        const saveFormError = ref({});
        const schemaSaveForm = Yup.object().shape({
            name:Yup.string().max(100).required(),
            description:Yup.string().max(1024),
            price:Yup.number().required(),
            stock_quantity:Yup.number().required(),
            category_id:Yup.number().required(),
            barcode:Yup.string().max(50),
            manufacturer:Yup.string().max(100),
            supplier_id:Yup.number().required(),
            product_code:Yup.string().max(50),
            weight:Yup.number().required(),
        });

        const url = '/products';
        const product_image = ref(null);
        const product_image_blob = ref(null);
        const product_image_name = ref(null);
        const categoryList = ref([]);
        const supplierList = ref([]);

        const cargarArchivo = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                product_image.value = reader.result;
            };
        };


      const getCategories = async () =>{
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

    const saveObject = async () => {
      if (create_form.value) {
        await createObject();
      } else {
        await updateObject();
      }
    };
    onMounted(() => {
        getCategories();
        getSuppliers();
    });

        return {
            object,
            saveFormError,
            categoryList,
            supplierList,
            product_image,
            cargarArchivo,
            
            getObject,
            saveObject,

        };
        
    },
})
</script>



