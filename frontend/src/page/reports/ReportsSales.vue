<template>
  <div>
    <div class="row">
      <div class="col-md-12 my-3">
        <h2 class="text-center">Total de ventas por día</h2>
      </div>
    </div>

    <div class="row">
      <div class="offset-md-3 col-md-3">
        <div class="form-group">
          <label for="date_init">Fecha inicio</label>
          <span class='lb-error' v-if="formError.date_init">{{formError.date_init}}</span>
          <input type="date" 
          placeholder=""
          v-model="report.date_init"
          class="form-control"
          :class="{error:formError.date_init}"
          >
        </div>
         <div class="form-group">
          <label for="date_init">Fecha Fin</label>
          <span class='lb-error' v-if="formError.date_end">{{formError.date_end}}</span>
          <input type="date" 
          placeholder=""
          v-model="report.date_end"
          class="form-control"
          :class="{error:formError.date_end}"
          >
        </div>

        <div>
          <button @click="getreport" class="btn btn-primary">Ver Reporte</button>
        </div>
      </div>
    </div>

    <div class="row" v-if="objectList">

      <div v-if="objectList.orders.length == 0 ">
        <label for="" class="orange" >Sin registros de ventas</label>
      </div>
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
              <b>{{ $t("date") }} : </b> {{ order.order_date }}
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
    
    let report = ref({
      date_init:maxDate,
      date_end:maxDate,
    })

    let isLoading = ref(false);
    let msgShow = ref(false);
    let formError = ref({});
    let schemaForm = Yup.object().shape({
      date_init: Yup.date().required(),
      date_end: Yup.date().required(),
    });
    let objectList = ref(null);

    let url = "/users";
    let total_report = ref(0);

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    };

    let Clear = () => {
      report.value = {
       date_init:maxDate,
       date_end:maxDate,
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

    let getreport= async()=>{
        await getList();
    }
    let getList = async () => {
      try {
        if(validate()){ 
          console.log(report.value)
          isLoading.value = true;
          let data=report.value
          await api.post(`/report_sales`,data).then((response) => {
            objectList.value = response.data.content;
            getTotalPurchase();
            console.log(objectList.value)
          });
        }
       
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        Mensaje.error(err.message);
      }
    };


    




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
    };
  },
};
</script>
