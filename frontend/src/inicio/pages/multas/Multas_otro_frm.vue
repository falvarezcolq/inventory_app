<template> 
  <div>
    <div class="busqueda">
      <div class="row">
        <div class="col-md-12 my-3"><h2 class="text-center">MULTAS</h2></div>
      </div>

      <div class="busqueda_seccion">
        <p class="title">DATOS PERSONA</p>

        <div class="row dp-table">
          <div class="col-12 col-md-6">
            <label class="frm-label">NOMBRES Y APELLIDOS:</label>
            <p>{{ datosPersonaMulta.nombres }}</p>
          </div>  
          <div class="col-12 col-md-6">
            <label class="frm-label">TIPO DE DOCUMENTO: </label>
            <p>{{ datosPersonaMulta.tipo_documento }}</p>
          </div>
        </div>
        <div class="row dp-table">
          <div class="col-12 col-md-6">
            <label class="frm-label">NRO. DE DOCUMENTO: </label>
            <p>{{ datosPersonaMulta.nro_documento }}</p>
          </div>
          <div class="col-12 col-md-6">
            <label class="frm-label">NACIONALIDAD:</label>             
            <p>{{ datosPersonaMulta.nacionalidad }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class = "busqueda mt-4">
      <div class="busqueda_seccion">
        <p class="title">TIPO DE CAMBIO A LA FECHA 1 UFVs. EQUIVALENTE A: {{datosUfvs.ufv_redondeado}} Bs.</p>
        <div class = "row">
          <div class="col-12 col-md-6">
            <label for="">TIPO DE MULTA:</label> 
          </div>
          <div class="col-12 col-md-6 text-end">
            <!-- <input type="checkbox" class="check-box-req" id="condonacion"> <label for="condonacion">CONDONACIÓN MULTAS</label> -->
          </div>
        </div> 
        <div class="row">
          <div class="col-md-12">
            <select 
            class="form-control" 
              v-model="id_multa"
            >
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in CausaMultas" :key="index" :value="item.id_multa">{{ item.nombre }}
              </option>
            </select>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-md-12 text-end">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="Calcular(id_multa)">
              <i class="fa fa-calculator"></i> CALCULAR Y AGREGAR
            </button>&nbsp;
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="Cancelar">
              <i class="fa fa-file"></i> LIMPIAR
            </button>
          </div>
        </div>
       
        <table class="table table-sm table-responsive table-hover mt-3">
          <thead class="thead-dark">
            <tr class="text-center">
              <th>NRO</th>
              <th>CAUSAL</th>
              <th>IMPORTE (UFVs)</th>
              <th>IMPORTE (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in buscaMulta" :key="index">
              <td class="text-center">{{index+1}}</td>
              <td class="text-justify">{{ item.nombre }}</td>
              <td class="text-center">{{ item.monto }}</td>                 
              <td class="text-center">{{ Math.round(item.monto * datosUfvs.ufv_redondeado)-1 }} </td>
            </tr>
          </tbody>
        </table> 

        <div class = "row form-group mt-4">
          <div class="col-12 col-md-3"></div>
          <div class="col-12 col-md-3">
            <label for="" >TOTAL IMPORTE A CANCELAR: </label> 
          </div>
          <!-- TOTAL IMPUT UFVS -->
          <div class="col-12 col-md-3">
            <input type="text" class="form-control" :value="totalUfvs" disabled >
          </div>
          <!-- TOTAL IMPUT BS -->
          <div class="col-12 col-md-3">
            <input type="text" class="form-control"  :value="totalBs" disabled>
          </div>
        </div>
        
        

        <div class = "row form-group mt-4">
          <div class="col-12 col-md-6" style="center">
            <label for="">PAGO DE LA MULTA INMEDIATO O EJECUCIÓN DE PAGO DE MULTA</label> &nbsp;&nbsp; <input type="checkbox" class="check-box-req " v-model="estado">
          </div>
          <div class="col-12 col-md-6 " style="center">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="Continuar"> <i class="fa fa-print"></i>   TERMINAR E IMPRIMIR FORMILARIO DE CALCULO DE MULTAS    
            </button>
          </div> 
        </div>
        
        <fieldset  :disabled="estado == false">
          <div class = "row form-group mt-5">
            <div class="row">
              <div class="col-12 col-md-2">
              </div>
              <div class="col-12 col-md-8">
                <div class="busqueda">
                  <div class="busqueda_seccion">
                    <div class="row form-group">
                      <div class="col-12 col-md-5">
                        <label for="">FECHA DE COBRO DE MULTA:</label>
                      </div>
                      <div class="col-12 col-md-7">
                        <input type="date" class="form-control"
                        v-model="registrodeposito.fecha_deposito"
                        :max="maxDate"
                        /> 
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-12 col-md-5">
                        <label for="">DATOS DE CARPETA:</label>
                      </div>
                      <div class="col-12 col-md-7">
                        <div class="row">
                          <div class="col-md-5">
                            <select class="form-control" v-model="registrodeposito.moneda">
                              <option value="" >SELECCIONAR</option>
                              <option v-for="(item, index) in listaMonto" :key="index" :value="item.nombre">{{ item.nombre }}
                              </option>
                            </select>
                          </div>
                          <div class="col-12 col-md-3">
                            <input type="text" placeholder="Bs." class="form-control"
                            v-model.trim="totalBs"
                              @keyup="registrodeposito.cur = registrodeposito.cur.toUpperCase()"  
                            />
                            
                          </div>
                          <div class="col-md-3">
                            <input type="text" min="0" placeholder="UFVs" class="form-control" 
                            v-model.trim="totalUfvs"
                            /><!-- autocomplete="off" 
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-5">
                          <label>CONSTANCIA DE PAGO:</label><!--<span class="lb-error" v-if="formError.tipo_deposito"> Campo requerido</span> -->
                      </div>
                      <div class="col-12 col-md-7">
                        <input class="form-check-input" id="radio1" type="radio" name="optradio" value="BOLETA ENTIDAD BANCARIA" 
                          
                        /><!-- v-model="registrodeposito.tipo_deposito" -->
                        <label class="form-check-label mx-2" for="radio1">BOLETA ENTIDAD BANCARIA</label><br />

                        <input class="form-check-input" id="radio2" type="radio" name="optradio" value="BOLETA RECAUDACIONES" 
                          
                        /><!-- v-model="registrodeposito.tipo_deposito" -->
                        <label class="form-check-label mx-2" for="radio2">BOLETA RECAUDACIONES</label><br />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-12 mt-2 col-md-5">
                        <label for="">NRO. DE BOLETA:</label>
                        <!-- <span class="lb-error" v-if="formError.nro_deposito"> Campo requerido</span> -->
                      </div>
                      <div class="col-12 mt-2 col-md-7">
                        <input type="text" class="form-control" 
                          
                        /><!-- v-model.trim="registrodeposito.nro_deposito"
                          :class="{error: formError.nro_deposito}" 
                          @keyup="registrodeposito.nro_deposito = registrodeposito.nro_deposito.toUpperCase()" -->
                      </div>
                    </div>
                  
                    <div class="row form-group">
                      <div class="col-12 col-md-5">
                        <label for="">DATOS DE CARPETA:</label>
                        <!-- <span class="lb-error" v-if="formError.cod"> Campo requerido</span> -->
                      </div>
                      <div class="col-12 col-md-7">
                        <div class="row">
                          <div class="col-md-12">
                            <input 
                              type="text" 
                              min="0" 
                              placeholder="NRO. CARPETA" 
                              class="form-control" 
                              autocomplete="off" 
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" 
                              
                            /><!-- v-model.trim="registrodeposito.cod"
                              :class="{error: formError.cod}"  -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-5">
                        <label for="">FECHA DE DEPÓSITO:</label>
                        <!-- <span class="lb-error" v-if="formError.fecha_deposito"> Campo requerido</span> -->
                      </div>
                      <div class="col-12 col-md-7">
                        <input type="DATE" class="form-control"                            
                        />
                        <!-- v-model.trim="registrodeposito.descripcion" 
                        @keyup="registrodeposito.descripcion = regopistrodeposito.descripcion.toUpperCase()"-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-2">
              </div> 
            </div>
            <div class="row mt-4">
              <div class="col-12 col-md-12" style="text-align: right">
                <button 
                  type="button"                           
                  class="btn btn-outline-success btn-sm" @click="Registrar"
                >
                  <i class="fa fa-save"></i> REGISTRAR 
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>  
  </div>
    
</template>

<script>

  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from "@/services/api";
  import { useProcesoStore } from '@/stores/useProcesoStore'
  import { useInicioStore } from '@/stores/useInicioStore'
  import moment from "moment";
  import Swal from "sweetalert2";

  export default {
    setup(){
      let router = useRouter();
      let datosTramite = ref({});
      let sProceso = useProcesoStore();
      let id_proceso = sProceso.getIDProceso
      let CausaMultas = ref({})
      let datosUfvs = ref({})
      let listaMonto = ref({})
      let id_multa = ref('')
      let buscaMulta = ref({})
      let totalBs = ref(0)
      let totalUfvs = ref(0)
      let sInicio = useInicioStore();
      let datosPersonaMulta = ref({})
      let id_persona = sInicio.getIDPersona
      let registrodeposito = ref({})
      let estado = ref(false)
      let maxDate = moment().format("YYYY/MM/DD");
      let formError = ref({});

      let formatDate = (fecha) => {
        return moment(fecha).format("DD/MM/YYYY");
      }

      let fetchMultas = () => api.get('/getCausaMultas').then((response) => {
        CausaMultas.value = response.data.content
      })

      let fetchMonto = () => api.get('/getTipoMonto').then((response) => {
        listaMonto.value = response.data.content
      })

      let PersonaMulta = async () => {
        let result = await api.get(`/PersonaMulta/${id_persona}`).then((response) => {
          datosPersonaMulta.value = response.data.content;
        });
      }
      let fetchUfvs = async () => {
        let fecha_app = moment().format('YYYY-MM-DD') 
        let result = await api.get(`/getUfvs/${fecha_app}`).then((response) => {
          datosUfvs.value = response.data.content;
        });
      }

      let Calcular = async () => {
        let result = await api.get(`/getBuscarMultas/${id_multa.value}`).then((response) => {
          buscaMulta.value = response.data.content;
          totalBs.value = Math.round(Number(buscaMulta.value[0].monto) * Number(datosUfvs.value.ufv_redondeado))-1 
          totalUfvs.value = buscaMulta.value[0].monto
        });
      }

      let GenerarPDF = async (id_documento, id_proceso) => {
        try {
          let config = {responseType: 'blob'}
          let fecha = moment().format('YYYY-MM-DD');
          let id_tramite = 0
          let result = await api.get(`/getGeneraPdf_oldpdf/${id_proceso}/${id_tramite}/${id_documento}/${id_persona}/${fecha}`, config)
          
          // Descarga archivo587
          if( result.status === 200){
            
            const url = window.URL.createObjectURL(
              new Blob([result.data], { type: "blob"})
            )
            let link = document.createElement("a")
            link.href = url
            let title = "Archivo.pdf"
            link.setAttribute("download", title)
            document.body.appendChild(link)
            link.click()
          }
          
        } catch (error) {
            Swal.fire({
              text: "No genera el documento", 
              icon: "error", 
              confirmButtonText: "Aceptar", 
              confirmButtonColor: "#198754", 
              allowOutsideClick: false 
            });
          }
      }

      let Limpiar = () => {
        buscaMulta.value = {
          nro_documento: '',
          nacionalidad: '-',
          id_tramite: 0,
          fecha_inicio: moment().subtract(2,'days').format('YYYY-MM-DD'),
          fecha_fin: moment().format('YYYY-MM-DD')
        }
      }  

      let Continuar = async () => {
        try{
          let data = {
            id_persona,
            id_tramite : null,
            monto: totalBs.value,
            moneda: 'Bs',
            tipo_deposito: '',
            id_multa: id_multa.value,
            tipo_rec: 'M',
            pago: 'S',
          }
          let result = await api.post('/setPersonaMulta', data)
          sInicio.addIDProceso(Number(result.data.content.o_descripcion))
          let id_documento = 27
          GenerarPDF(id_documento, result.data.content.o_descripcion)

          Swal.fire({
              html: "Trámite <b>registrado</b> correctamente",
              icon: "success",
              confirmButtonText: "ACEPTAR",
              confirmButtonColor: "#198754",
              allowOutsideClick: false,
            }).then((result1) => {
            if (result1.isConfirmed) {
              router.push({ path: '/iniciolista' })
            }
          });

        } catch (err) {
            formError.value = {}
            err.inner.forEach((error) => {
            if(error.path && !formError[error.path]){
                formError.value[error.path] = error.message
            }
            })
          }
      }
      onMounted(fetchMultas)
      onMounted(fetchUfvs)
      onMounted(fetchMonto)
      onMounted(PersonaMulta)

      return{
        datosTramite, 
        formatDate,
        CausaMultas,
        datosUfvs,
        listaMonto,
        Calcular,
        id_multa,
        buscaMulta,
        totalBs,
        totalUfvs,
        datosPersonaMulta,
        Continuar,
        registrodeposito,
        estado,
        maxDate,
        GenerarPDF,
        formError,
      }
    }
  }
</script>
