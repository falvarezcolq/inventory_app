<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">Total de ventas por producto</h2>
      </div>
    </div>

    <div class="row">
      <div class="offset-md-3 col-md-6">
        <div class="form-group">
          <label for="date_init">Fecha inicio</label>
          <span class="lb-error" v-if="formError.date_init">{{
            formError.date_init
          }}</span>
          <input
            type="date"
            placeholder=""
            v-model="report.date_init"
            class="form-control"
            :class="{ error: formError.date_init }"
          />
        </div>
        <div class="form-group">
          <label for="date_init">Fecha Fin</label>
          <span class="lb-error" v-if="formError.date_end">{{
            formError.date_end
          }}</span>
          <input
            type="date"
            placeholder=""
            v-model="report.date_end"
            class="form-control"
            :class="{ error: formError.date_end }"
          />
        </div>

        <div class="form-group" v-if="productList">
          <label for="date_init">Producto</label>
          <multiselect
            v-model="product"
            track-by="name"
            label="name"
            placeholder="Elije uno"
            :options="productList"
          >
          </multiselect>
        </div>

        <div>
          <button @click="getreport" class="btn btn-primary">
            Ver Reporte
          </button>
        </div>
      </div>
    </div>

    <div class="row" v-if="objectList">
      <div v-if="objectList.length == 0">
        <label for="" class="orange">Sin registros de ventas</label>
      </div>
      <div v-for="(product, index) in objectList" :key="index" :class="{}">
        <div class="col-md-12">
          <div class="row">
            <div class="col-6">
              <div>
                <b>{{ "total" }} : </b> {{ product.order_items.length }}
              </div>
              <div>
                <b>{{ $t("name") }} : </b> {{ product.name }}
              </div>
            </div>
            <div class="col-6">
              <div>
                <b>{{ "producto_code" }} : </b>
                <span class="orange">{{ product.product_code }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-sm table-hover border border-secondary">
              <thead class="thead-dark border-bottom border-danger">
                <tr class="table dark text-center border-bottom border-dark">
                  <th>orden</th>
                  <th>{{ $t("product") }}</th>
                  <th>{{ $t("unit") }}</th>
                  <th>{{ $t("quantity") }}</th>
                  <th>{{ $t("price") }}</th>
                  <th>{{ $t("subtotal") }}</th>

                  <th>{{ $t("quantity") }}</th>
                  <th>{{ $t("price") }}</th>
                  <th>{{ $t("subtotal") }}</th>

                  <th>{{ $t("Saldo") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in product.order_items"
                  :key="index"
                  :class="{}"
                >
                  <td class="text-center">{{ item.order.order_id }}</td>
                  <td class="text-start"> 
                   
                    {{ product.name }}
                     <span>
                      <i class="fa fa-arrow-down text-success" v-if="item.movement_type=='In'" ></i>
                      <i class="fa fa-arrow-up text-danger" v-if="item.movement_type=='Out'" ></i>
                    </span>
                    </td>
                  <td class="text-center">{{ product.unit.abbreviation }}</td>
                 
                  <td class="text-end" v-if="item.movement_type=='In'" >{{ item.quantity }}</td>
                  <td class="text-end" v-if="item.movement_type=='In'" >{{ Number(item.price).toFixed(2) }}</td>
                  <td class="text-end" v-if="item.movement_type=='In'" >{{ item.subtotal }}</td>

                  <td class="text-end"></td>
                  <td class="text-end"></td>
                  <td class="text-end"></td>
          
                  <td class="text-end" v-if="item.movement_type=='Out'" >{{ item.quantity }}</td>
                  <td class="text-end" v-if="item.movement_type=='Out'" >{{ Number(item.price).toFixed(2) }}</td>
                  <td class="text-end" v-if="item.movement_type=='Out'" >{{ item.subtotal }}</td>

                  <td class="text-end">{{ item.inventory_movement.balance }}</td>
                  <td class="text-end"></td>
                </tr>
                <tr>
                  <td colspan="1"></td>
            
                  <td class="text-end"><b>TOTAL:</b></td>
                    <td class="text-end"></td>
                  <td class="text-end"></td>
                  <td class="text-end"></td>
                  <td class="text-end"><b>{{product.total_in}}</b></td>
                  <td class="text-end"></td>
                  <td class="text-end"></td>
                  <td class="text-end"><b>{{product.total_out}}</b></td>
                  <td class="text-end"></td>
                  <td class="text-end">
                    <b>
                      <span class="h5 text-success" v-if="product.total_amount > 0" >+{{
                        product.total_amount
                      }}</span>
                      <span class="h5 text-success" v-if="product.total_amount == 0" > = {{
                        product.total_amount
                      }} cero</span>
                      <span class="h5 text-danger"  v-if="product.total_amount < 0" >{{
                        product.total_amount
                      }}</span>
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>

            <div>Total Ganancia: 

                      <span class="h5 text-success" v-if="total_report >= 0">+{{
                        total_report
                      }}</span>
                   
                      <span class="h5 text-danger"  v-if="total_report < 0" >{{
                        total_report
                      }}</span>

                     
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
import Multiselect from "vue-multiselect";

export default {
  components: {
    Loading,
    SinResultado,
    Multiselect,
  },
  setup() {
    let maxDate = moment().format("YYYY-MM-DD");

    let report = ref({
      date_init: maxDate,
      date_end: maxDate,
    });

    let isLoading = ref(false);
    let msgShow = ref(false);
    let formError = ref({});
    let schemaForm = Yup.object().shape({
      date_init: Yup.date().required(),
      date_end: Yup.date().required(),
    });
    let objectList = ref(null);
    let productList = ref(null);
    let product = ref(null);

    let url = "/users";
    let total_report = ref(0);

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    };

    let Clear = () => {
      report.value = {
        date_init: maxDate,
        date_end: maxDate,
      };
    };

    let validate = async () => {
      let valida = false;
      try {
        formError.value = {};
        await schemaForm.validate(report.value, { abortEarly: false });
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

    let getTotalPurchase = () => {
      let total = 0;
      if (objectList.value.length > 0) {
        for (let index = 0; index < objectList.value.length; index++) {
          objectList.value[index].total_in =  0;
          objectList.value[index].total_out =  0;

          for( let index2 = 0; index2 < objectList.value[index].order_items.length; index2++){
            const element = objectList.value[index].order_items[index2];
            if(element.movement_type == 'In'){
              objectList.value[index].total_in = objectList.value[index].total_in + Number(element.subtotal);
            }else{
              objectList.value[index].total_out = objectList.value[index].total_out + Number(element.subtotal);
            }
          }
          objectList.value[index].total_amount =  Number(objectList.value[index].total_out) - Number(objectList.value[index].total_in) ;
          total = total + Number(objectList.value[index].total_amount);
        }
      }
       total_report.value = total;
    };

    let getreport = async () => {
      await getList();
    };
    let getList = async () => {
      try {
        if (validate()) {
          console.log(report.value);
          isLoading.value = true;
          let data = {
            date_init: report.value.date_init,
            date_end: report.value.date_end,
            product_id: product.value?.product_id,
          };
          await api.post(`/report_balance`, data).then((response) => {
            objectList.value = response.data.content;
            getTotalPurchase();
            console.log(objectList.value);
          });
        }

        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };

    let getProducts = async () => {
      try {
        await api.get("/products?page=1&limit=1000").then((response) => {
          if (response.data.content.length > 0) {
            productList.value = response.data.content;
          }
        });
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };

    onMounted(async () => {
      // await getList();
      await getProducts();
    });
    return {
      maxDate,
      Clear,
      formError,

      objectList,

      isLoading,
      msgShow,

      getList,

      total_report,
      report,
      getreport,
      productList,
      product,
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
