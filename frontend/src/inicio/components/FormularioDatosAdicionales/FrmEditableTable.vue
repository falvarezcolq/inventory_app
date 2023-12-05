<template>
  <div class="busqueda">
    <div class="busqueda_seccion mt-4">
      <p class="title">DATOS DE LA SOLICITUD PARA PERSONA JURIDICA:</p>
      <div class="row">
        <div class="offset-lg-2 col-lg-8 col-md-12 ">
            <div class="row">
              <div class="col-lg-12">
                <label for="" class="form-label">PROCEDENCIA:</label>
                <span class="lb-error " v-if="formError.id_procedencia">Campo requerido</span>
                <select class="form-control"  v-model="form.id_procedencia"
                :class="{error:formError.id_procedencia}"
                >
                    <option value="">SELECCIONAR</option>
                    <option v-for="(item, index) in procedenciaList" :key="index" :value="item.id_lugarpro">{{
                      item.nombres }}</option>
                  </select>
              </div>
              <div class="col-lg-8">
                <label for="" class="form-label">NOMBRE PERSONA JURIDICA</label>
                <span class="lb-error " v-if="formError.nombre_persona_juridica">Campo requerido</span>
                <input type="text" class="form-control" 
                v-model="form.nombre_persona_juridica" 
                @keyup=" form.nombre_persona_juridica = form.nombre_persona_juridica.toUpperCase()"
                :class="{error:formError.nombre_persona_juridica}"
                >

              </div>

              <div class="col-lg-4">
                <label for="" class="form-label">CITE</label>
                <span class="lb-error " v-if="formError.cite">Campo requerido</span>
                <input type="text" class="form-control" 
                v-model="form.cite" 
                @keyup=" form.cite = form.cite.toUpperCase()"
                :class="{error:formError.cite}"
                >
              </div>
            </div>
        </div>
        <div class="col-12 mt-3">
          <div>
            <table class="table editable-table">
              <thead>
                <tr>
                  <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                  <td v-for="(column, columnIndex) in row" :key="columnIndex">

                    <input v-model="row[columnIndex]"
                    class="form-control input-table" :class="{error:errorRows[rowIndex][columnIndex]}"
                    type="date"
                    v-if="columnIndex == 4"
                      :max="maxDate" />

                    <select class="form-control select-table" v-model="row[columnIndex]" v-else-if="columnIndex == 6"
                    :class="{error:errorRows[rowIndex][columnIndex]}"
                    >
                      <option value="">--</option>
                      <option v-for="(item, index) in tipoDocumentoList" :key="index" :value="item.cod_clasificador">{{
                        item.nombre }}</option>
                    </select>
                    <select class="form-control select-table" v-model="row[columnIndex]" v-else-if="columnIndex == 7"

                    :class="{error:errorRows[rowIndex][columnIndex]}">
                      <option value="">--</option>
                      <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad" >{{
                        item.nombre_pais }}</option>
                    </select>


                    <div style="display: inline-flex;" v-else-if="columnIndex == 8">
                      <button class="btn btn-sm">
                        <i class="fa fa-pencil"></i>
                      </button>
                      <button class="btn btn-sm" style="color: red;" @click="borrarFila(rowIndex)" v-if="row[columnIndex]==''">
                        <i class="fa fa-times"></i>
                      </button>
                    </div>


                    <input v-model="row[columnIndex]" class="form-control input-table" type="text" v-else @keyup="row[columnIndex] = row[columnIndex].toUpperCase()"
                    :class="{error:errorRows[rowIndex][columnIndex]}"
                    />

                    <!-- <span class="lb-error lb-error-table" v-if="errorRows[rowIndex][columnIndex]">Campo requerido</span> -->
                  </td>

                </tr>
              </tbody>
            </table>
            <button @click="addRow" class="btn btn-sm btn-outline-danger"> + ADICIONAR FILA</button>
            <button @click="validarTabla" class="btn btn-sm btn-outline-danger"> VALIDAR</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted } from 'vue';
import moment from 'moment';
import * as Yup from 'yup';
import api from '@/services/api';


export default {

  props: [
  'nacionalidadList',
  'tipoDocumentoList',
  ],
  data() {
      let headers = ref(['NOMBRES:', 'PRIMER APELLIDO', 'SEGUNDO APELLIDO', 'OTROS APELLIDOS', 'FECHA NACIMIENTO', 'NRO DOCUMENTO', 'TIPO DOCUMENTO', 'NACIONALIDAD', 'ACCION']);
      let numColumns = 8;
      let rows = ref([
        ['', '', '', '', '', '', '', '',''],
      ]);
      let errorRows = ref([
        [null, null, null, null, null, null, null, null,null],
      ]);

      let maxDate = moment().format("YYYY-MM-DD");
      let minDate = moment('1900-01-01');
      let maxDate2 = moment(); 
      let procedenciaList=ref([]);
      let form = ref({
           id_procedencia:"",
           nombre_persona_juridica:"",
           cite:"",
      })
      let formError = ref({});
      


      let schemaForm = Yup.object().shape({
        nombres: Yup.string().required(),
        primer_apellido: Yup.string().required(),
        tipo_documento:null,// Yup.string().required(),
        nro_documento:null, //Yup.string().required(),
        fecha_nacimiento: null,//Yup.date(),
          // .min(minDate, `La fecha no puede ser anterior a ${minDate.format('DD/MM/YYYY')}`)
          // .max(maxDate2, `La fecha no puede ser posterior a ${maxDate2.format('DD/MM/YYYY')}`),
          // .required(`Campo requerido`),
        nacionalidad: null, //Yup.string().required(),
        // genero: Yup.string().required(),
      })

      let schemaFormInput = Yup.object().shape({
        id_procedencia: Yup.string().required(),
        nombre_persona_juridica: Yup.string().required(),
        cite: Yup.string().required(),
      })

      const validarTabla = async () => {

        // quitar espacios
        
        Object.keys(form.value).forEach(key=>{  
              if((typeof form.value[key])=='string'){
                form.value[key] = form.value[key].trim();
              }
            })
        for(let index = 0 ; index < rows.value.length;index++){
            for( let j=0;j<rows.value[index].length; j++){ 
              if((typeof rows.value[index][j])=='string'){
                rows.value[index][j] = rows.value[index][j].trim();
              }
            }
          }
      
        let valido = true;
        formError.value = {};
          try {
            await schemaFormInput.validate(form.value, { abortEarly: false });
            valido = valido && true;
          } catch (err) {
            err.inner.forEach(error => {
              if (error.path && !formError[error.path]) {
                formError.value[error.path] = error.message;
              }
            });
            valido = valido && false;
          }

        for (let i = 0 ; i < rows.value.length;i++){
          errorRows.value[i]= new Array(numColumns).fill(null);
          try {
            await schemaForm.validate({
              nombres:rows.value[i][0],
              primer_apellido:rows.value[i][1],
              fecha_nacimiento:rows.value[i][4],
              nro_documento:rows.value[i][5],
              tipo_documento:rows.value[i][6],
              nacionalidad:rows.value[i][7],
              // genero:rows.value[i][],
            }, { abortEarly: false });
            valido = valido && true;

          } catch (err) {

            err.inner.forEach((error) => {
              if (error.path) {
                 if (error.path == 'nombres' ) { errorRows.value[i][0] = error.message;}
                 if (error.path == 'primer_apellido' ) { errorRows.value[i][1] = error.message;}
                 if (error.path == 'fecha_nacimiento' ) { errorRows.value[i][4] = error.message;}
                 if (error.path == 'nro_documento' ) { errorRows.value[i][5] = error.message;}
                 if (error.path == 'tipo_documento' ) { errorRows.value[i][6] = error.message;}
                 if (error.path == 'nacionalidad' ) { errorRows.value[i][7] = error.message;}
              }
               valido = valido && false;
            });
          }
        }



        return valido && rows.value.length>0;
      }



      let addRow = ()=> {
        const newRow = ['', '', '', '', '', '', '', '','']; // Add empty values for each column
        const newErrorRow = [null, null, null, null, null, null, null, null,null]
        rows.value.push(newRow);
        errorRows.value.push(newErrorRow);
      };

      let borrarFila = (indexRow)=> {
        rows.value.splice(indexRow, 1)
        errorRows.value.splice(indexRow, 1)
      };

      let fetchProcedencia = () =>   api.get('/getProcedencia').then((response) => {
        procedenciaList.value = response.data.content
      })

    onMounted(() => {
      fetchProcedencia();
    })
    return {
      headers,
      rows,
      errorRows,
      maxDate,
      addRow,
      borrarFila,
      validarTabla,
      procedenciaList,
      formError,
      form,
    };
  },
};

</script>

<style>
.editable-table td {
  /* margin-bottom: 20px;  */
  /* padding-bottom: -10px  ; */
  /* border: 1px; */
  height: 0px;
  padding: 0;
}

.editable-table tr {
  margin: 0;
  height: 0px;
  /* padding: 0.2rem;
   /* height: 2rem; */
}

.input-table {
  /* height: 2rem; */
  /* border: 1px solid rgba(0, 0, 0, .1); */
  padding: 0.2rem;
  margin: 3px;
  border: 0px;
  border-radius: 0;
  font-size:40px;
}

.select-table {
  /* height: 2rem; */
  /* border: 1px solid rgba(0, 0, 0, .1); */
  padding: 0.2rem;
  margin: 3px;
  border: 0px;
  /* border-radius: 0; */
  color: azure;
  font-size: 0.9rem !important;
}


.editable-table select {
  font-size: 0.7rem !important;
  /* max-width: 80px; */
  /* text-indent: 10px; */
}

.editable-table tr:focus-within{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 100;
  margin-bottom: 20px;
}

.editable-table tr:focus-within input {

  /* background:gray; */
  border: 1px solid rgba(0, 0, 0, .1);
  font-size: 0.9rem !important;
  color: #235555 !important;
  font-weight:600 !important;
}

.editable-table tr:focus-within select  {

/* background:gray; */
border: 1px solid rgba(0, 0, 0, .1);
font-size: 0.9rem !important;
  color: #235555 !important;
  font-weight:600 !important;
}

.editable-table  .error {

/* background:gray; */
border: 1px solid #f06b78;
}

.lb-error-table{
  margin-left: 5px;
  font-size: 0.6rem;
  position: relative;
  top: -5px;
}
</style>

