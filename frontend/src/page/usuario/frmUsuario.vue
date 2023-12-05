<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center">{{ $t('crear_cuenta') }}:</h2>
        <h3 class="green">
          <i class="fa fa-info-circle"></i> {{ $t('usuario_correo') }}:
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="col-12 col-md-4 form-group">
          <label for="">{{ $t('nacionalidad') }}:</label>
          <span class="lb-error" v-if="formError.nacionalidad">{{
            formError.nacionalidad
          }}</span>
          <select
            class="form-control"
            v-model="persona.nacionalidad"
            :class="{ error: formError.nacionalidad }"
            @change="cambioPaisEmision"
          >
            <option value="">SELECCIONAR</option>
            <option
              v-for="(item, index) in nacionalidadList"
              :key="index"
              :value="item.cod_nacionalidad"
            >
              {{ item.nombre_pais }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row" v-show="persona.nacionalidad == 'BOL'">
      <div class="col-md-3 form-group" style="border-right: 1px solid #ccc">
        <div class="row form-group">
          <div class="col-md-12 form-group">
            <label for="">{{ $t('tipo_documento') }} * </label>
            <span class="lb-error" v-if="formError.tipo_documento">{{
              formError.tipo_documento
            }}</span>
            <select
              class="form-control"
              v-model="persona.tipo_documento"
              :class="{ error: formError.tipo_documento }"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in documentoList"
                :key="index"
                :value="item.cod_clasificador"
              >
                {{ item.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-12 form-group">
            <label for="">{{ $t('nro_documento') }} *</label>
            <span class="lb-error" v-if="formError.nro_documento">{{
              formError.nro_documento
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.nro_documento"
              :class="{ error: formError.nro_documento }"
              @input="persona.nro_documento = $event.target.value.toUpperCase()"
            />
          </div>

        
        </div>
      </div>

      <div class="col-md-9 form-group">
        <div class="row form-group">
          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('nombre') }} *</label>
            <span class="lb-error" v-if="formError.nombres">{{
              formError.nombres
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.nombres"
              :class="{ error: formError.nombres }"
              @input="persona.nombres = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('primer_apellido') }} *</label>
            <span class="lb-error" v-if="formError.primer_apellido">{{
              formError.primer_apellido
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.primer_apellido"
              :class="{ error: formError.primer_apellido }"
              @input="
                persona.primer_apellido = $event.target.value.toUpperCase()
              "
            />
          </div>
          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('segundo_apellido') }}</label>
            <span class="lb-error" v-if="formError.segundo_apellido">{{
              formError.segundo_apellido
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.segundo_apellido"
              :class="{ error: formError.segundo_apellido }"
              @input="
                persona.segundo_apellido = $event.target.value.toUpperCase()
              "
            />
          </div>

      
        </div>

        <div class="row form-group">
          <div class="col-12 col-md-6 form-group">
            <label for="">{{ $t('fecha_nacimiento') }} *</label>
            <span class="lb-error" v-if="formError.fecha_nacimiento">{{
              formError.fecha_nacimiento
            }}</span>
            <input
              type="date"
              class="form-control"
              v-model="persona.fecha_nacimiento"
              :class="{ error: formError.fecha_nacimiento }"
              :max="maxDate"
            />
          </div>
          <div class="col-12 col-md-6 form-group">
            <label for="">{{ $t('telefono') }} *</label>
            <span class="lb-error" v-if="formError.telefono">{{
              formError.telefono
            }}</span>
            <div class="input-group mb-3">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  class="flag"
                  :id="codigo_pais ? codigo_pais.cod : 'BOL'"
                  v-if="codigo_pais.cod != ''"
                ></div>
                +{{ codigo_pais ? codigo_pais.phone_code : "591" }}
              </button>
              <ul class="dropdown-menu dropdown-country">
                <li v-for="country in Countries" :key="country.name">
                  <div
                    class="flag"
                    :id="country.cod"
                    v-if="country.cod != ''"
                  ></div>
                  <div class="flag_text">
                    <a
                      class="dropdown-item flag_text"
                      @click="agregar_codigo(country)"
                      >{{ country.name }} <b>+{{ country.phone_code }}</b></a
                    >
                  </div>
                </li>
              </ul>

              <input
                type="text"
                class="form-control"
                v-model="persona.telefono"
                :class="{ error: formError.telefono }"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                aria-label="Text input with dropdown button"
              />
            </div>
          </div>
        </div>
       
        <hr class="hr" />

        <div class="row form-group mt-2">
          <div class="offset-lg-4 col-md-4">
            <label for="">{{ $t('correo_electronico') }}: *</label>
            <span class="lb-error" v-if="formError.email">{{
              formError.email
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.email"
              :class="{ error: formError.email }"
              @input="persona.email = $event.target.value.toLowerCase()"
            />
          </div>
        </div>
        <div class="row form-group mt-2">
          <div class="offset-lg-4 col-md-4">
            <label for="">{{ $t('contrasenha') }}: *</label>
            <span class="lb-error" v-if="formError.password">{{
              formError.password
            }}</span>
            <input
              type="password"
              class="form-control"
              v-model="persona.password"
              :class="{ error: formError.password }"
            />
          </div>
        </div>

        <div class="row form-group">
          <div class="offset-lg-4 col-md-4">
            <label for="">{{ $t('repetir_contrasenha') }}: *</label>
            <span class="lb-error" v-if="formError.password2">{{
              formError.password2
            }}</span>
            <input
              type="password"
              class="form-control"
              v-model="persona.password2"
              :class="{ error: formError.password2 }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-show="persona.nacionalidad != 'BOL'">
      <div class="col-md-3 form-group" style="border-right: 1px solid #ccc">
        <div class="row form-group">
          <div class="col-md-12 form-group">
            <label for="">{{ $t('tipo_documento') }} * </label>
            <span class="lb-error" v-if="formError.tipo_documento">{{
              formError.tipo_documento
            }}</span>
            <select
              class="form-control"
              v-model="persona.tipo_documento"
              :class="{ error: formError.tipo_documento }"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in documentoList"
                :key="index"
                :value="item.cod_clasificador"
              >
                {{ item.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-12 form-group">
            <label for="">{{ $t('nro_documento') }} *</label>
            <span class="lb-error" v-if="formError.nro_documento">{{
              formError.nro_documento
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.nro_documento"
              :class="{ error: formError.nro_documento }"
              @input="persona.nro_documento = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-md-12 form-group">
            <label for="">{{ $t('pais_emision') }}  *</label>
            <span class="lb-error" v-if="formError.nacionalidad_emision">{{
              formError.nacionalidad_emision
            }}</span>
            <select
              class="form-control"
              v-model="persona.nacionalidad_emision"
              :class="{ error: formError.nacionalidad_emision }"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in nacionalidadList"
                :key="index"
                :value="item.cod_nacionalidad"
              >
                {{ item.nombre_pais }}
              </option>
            </select>
          </div>
          <div class="col-lg-12 form-group">
            <label class="form-label"
              >{{ $t('fecha_emision') }}</label
            >
            <span class="lb-error" v-if="formError.fecha_emision">{{
              formError.fecha_emision
            }}</span>
            <input
              type="date"
              class="form-control"
              v-model="persona.fecha_emision"
              :class="{ error: formError.fecha_emision }"
              :max="maxDate"
            />
          </div>
          <div class="col-lg-12 form-group">
            <label class="form-label">{{ $t('fecha_expiracion') }}</label>
            <span class="lb-error" v-if="formError.fecha_expiracion">{{
              formError.fecha_expiracion
            }}</span>

            <input
              type="date"
              class="form-control"
              v-model="persona.fecha_expiracion"
              :disabled="persona.indefinido"
              :class="{ error: formError.fecha_expiracion }"
              :min="minDate"
            />
          </div>

          <div class="col-md-12 form-group">
            <label for="">{{ $t('indefinido') }}</label>
            <input
              type="checkbox"
              class="form-check"
              v-model="persona.indefinido"
            />
          </div>
        </div>
      </div>

      <div class="col-md-9 form-group">
        <div class="row form-group">
          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('nombre') }} *</label>
            <span class="lb-error" v-if="formError.nombres">{{
              formError.nombres
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.nombres"
              :class="{ error: formError.nombres }"
              @input="persona.nombres = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('primer_apellido') }} *</label>
            <span class="lb-error" v-if="formError.primer_apellido">{{
              formError.primer_apellido
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.primer_apellido"
              :class="{ error: formError.primer_apellido }"
              @input="
                persona.primer_apellido = $event.target.value.toUpperCase()
              "
            />
          </div>
          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('segundo_apellido') }}</label>
            <span class="lb-error" v-if="formError.segundo_apellido">{{
              formError.segundo_apellido
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.segundo_apellido"
              :class="{ error: formError.segundo_apellido }"
              @input="
                persona.segundo_apellido = $event.target.value.toUpperCase()
              "
            />
          </div>

          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('otro_apellido') }}</label>
            <span class="lb-error" v-if="formError.otro_apellido">{{
              formError.otro_apellido
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.otro_apellido"
              :class="{ error: formError.otro_apellido }"
              @input="persona.otro_apellido = $event.target.value.toUpperCase()"
            />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('fecha_nacimiento') }} *</label>
            <span class="lb-error" v-if="formError.fecha_nacimiento">{{
              formError.fecha_nacimiento
            }}</span>
            <input
              type="date"
              class="form-control"
              v-model="persona.fecha_nacimiento"
              :class="{ error: formError.fecha_nacimiento }"
              :max="maxDate"
            />
          </div>

          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('genero') }} *</label>
            <span class="lb-error" v-if="formError.genero">{{
              formError.genero
            }}</span>
            <select
              class="form-control"
              v-model="persona.genero"
              :class="{ error: formError.genero }"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in generoList"
                :key="index"
                :value="item.cod_clasificador"
              >
                {{ item.nombre }}
              </option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('pais_nacimiento') }} *</label>
            <span class="lb-error" v-if="formError.pais_nacimiento">{{
              formError.pais_nacimiento
            }}</span>
            <select
              class="form-control"
              v-model="persona.pais_nacimiento"
              :class="{ error: formError.pais_nacimiento }"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in nacionalidadList"
                :key="index"
                :value="item.cod_nacionalidad"
              >
                {{ item.nombre_pais }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('lugar_nacimiento') }}</label>
            <span class="lb-error" v-if="formError.lugar_nacimiento">{{
              formError.lugar_nacimiento
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.lugar_nacimiento"
              :class="{ error: formError.lugar_nacimiento }"
              @input="
                persona.lugar_nacimiento = $event.target.value.toUpperCase()
              "
            />
          </div>

          <div class="col-12 col-md-8 form-group">
            <label for="">{{ $t('direccion') }}</label>
            <span class="lb-error" v-if="formError.direccion">{{
              formError.direccion
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.direccion"
              :class="{ error: formError.direccion }"
              @input="persona.direccion = $event.target.value.toUpperCase()"
            />
          </div>

          <div class="col-12 col-md-4 form-group">
            <label for="">{{ $t('telefono') }} *</label>
            <span class="lb-error" v-if="formError.telefono">{{
              formError.telefono
            }}</span>

            <div class="input-group mb-3">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  class="flag"
                  :id="codigo_pais ? codigo_pais.cod : 'BOL'"
                  v-if="codigo_pais.cod != ''"
                ></div>
                +{{ codigo_pais ? codigo_pais.phone_code : "591" }}
              </button>
              <ul class="dropdown-menu dropdown-country">
                <li v-for="country in Countries" :key="country.name">
                  <div
                    class="flag"
                    :id="country.cod"
                    v-if="country.cod != ''"
                  ></div>
                  <div class="flag_text">
                    <a
                      class="dropdown-item flag_text"
                      @click="agregar_codigo(country)"
                      >{{ country.name }} <b>+{{ country.phone_code }}</b></a
                    >
                  </div>
                </li>
              </ul>

              <input
                type="text"
                class="form-control"
                v-model="persona.telefono"
                :class="{ error: formError.telefono }"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                aria-label="Text input with dropdown button"
              />
            </div>
          </div>
        </div>
        <hr class="hr" />

        <div class="row form-group mt-2">
          <div class="offset-lg-4 col-md-4">
            <label for="">{{ $t('correo_electronico') }} *</label>
            <span class="lb-error" v-if="formError.email">{{
              formError.email
            }}</span>
            <input
              type="text"
              class="form-control"
              v-model="persona.email"
              :class="{ error: formError.email }"
              @input="persona.email = $event.target.value.toLowerCase()"
            />
          </div>
        </div>
        <div class="row form-group mt-2">
          <div class="offset-lg-4 col-md-4">
            <label for="">{{ $t('contrasenha') }} *</label>
            <span class="lb-error" v-if="formError.password">{{
              formError.password
            }}</span>
            <input
              type="password"
              class="form-control"
              v-model="persona.password"
              :class="{ error: formError.password }"
            />
          </div>
        </div>

        <div class="row form-group">
          <div class="offset-lg-4 col-md-4">
            <label for="">{{ $t('repetir_contrasenha') }} *</label>
            <span class="lb-error" v-if="formError.password2">{{
              formError.password2
            }}</span>
            <input
              type="password"
              class="form-control"
              v-model="persona.password2"
              :class="{ error: formError.password2 }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-md-12" style="text-align: right">
        <button type="button" class="btn btn-primary btn-sm" @click="Registrar">
          <i class="fa fa-save"></i>
          {{ $t('registrar') }}
        </button>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p>
            {{ $t('ya_tiene_cuenta') }}
            <span class="btn btn-link" @click="irLogin"> {{ $t('inicio_cesion') }}</span>
          </p>
        </div>
      </div>
    </div>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted, computed, inject } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";
import * as yup from "yup";
import moment from "moment";
import { Mensaje } from "@/tools/Mensaje";
import { useUsuarioStore } from "../../stores/useUsuarioStore";

import axios from "axios";
import Loading from "@/components/Loading.vue";
import "@/flags-all.css";
import { countries } from "@/assets/flags/countries.js";
export default {
  components: {
    Loading,
  },
  setup() {
    let router = useRouter();
    let documentoList = ref([]);
    let generoList = ref([]);
    let nacionalidadList = ref([]);
    let persona = ref({
      tipo_documento: "CI",
      nacionalidad: "BOL",
      genero: "",
      indefinido: false,
    });
    let formError = ref({});
    let maxDate = moment().format("YYYY-MM-DD");
    let sUsuario = useUsuarioStore();
    let isLoading = ref(false);
    let minDate = moment("1900-01-01");
    let maxDate2 = moment();
    let Countries = ref(countries);
    let codigo_pais = ref({ cod: "BOL", name: "Bolivia", phone_code: "591" });
    let regex_name =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let regex_address =
      /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.#^^/'-]+$/u;

    let schemaForm = yup.object().shape({
      nombres: yup
        .string()
        .min(0)
        .max(100)
        .matches(regex_name, "El formato no es correcto")
        .required(),
      primer_apellido: yup
        .string()
        .min(0)
        .max(50)
        .matches(regex_name, "El formato no es correcto")
        .required(),
      segundo_apellido: yup
        .string()
        .min(0)
        .max(50)
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(regex_name, "El formato no es correcto"),
      otro_apellido: yup
        .string()
        .min(0)
        .max(50)
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(regex_name, "El formato no es correcto"),
      fecha_nacimiento: yup
        .date()
        .min(
          minDate,
          `La fecha no puede ser anterior a ${minDate.format("DD/MM/YYYY")}`
        )
        .max(
          maxDate2,
          `La fecha no puede ser posterior a ${maxDate2.format("DD/MM/YYYY")}`
        )
        .required(),
      genero: yup.string().min(0).max(50).required(),
      nacionalidad: yup.string().min(0).max(20).required(),
      pais_nacimiento: yup.string().min(0).max(20).required(),
      lugar_nacimiento: yup
        .string()
        .min(0)
        .max(20)
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(regex_address, "El formato no es correcto"),
      direccion: yup
        .string()
        .min(0)
        .max(150)
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(regex_address, "El formato no es correcto"),
      email: yup.string().email().min(0).max(50).required(),
      telefono: yup.string().min(0).max(15).required(),
      tipo_documento: yup.string().min(0).max(50).required(),
      nro_documento: yup.string().min(0).max(50).required(),
      fecha_emision: yup
        .date()
        .max(new Date(), "Fecha excedida")
        .nullable()
        .default(undefined),
      fecha_expiracion: yup.date().nullable().default(undefined),
      indefinido: yup.boolean().required(),
      nacionalidad_emision: yup.string().min(0).max(100).required(),
      password: yup.string().min(4).max(50).required(),
    });

    let schemaForm2 = yup.object().shape({
      nacionalidad: yup.string().min(0).max(20).required(),
      nombres: yup
        .string()
        .min(0)
        .max(100)
        .matches(regex_name, "El formato no es correcto")
        .required(),
      primer_apellido: yup
        .string()
        .min(0)
        .max(50)
        .matches(regex_name, "El formato no es correcto")
        .required(),
      segundo_apellido: yup
        .string()
        .min(0)
        .max(50)
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(regex_name, "El formato no es correcto"),
      fecha_nacimiento: yup
        .date()
        .min(
          minDate,
          `La fecha no puede ser anterior a ${minDate.format("DD/MM/YYYY")}`
        )
        .max(
          maxDate2,
          `La fecha no puede ser posterior a ${maxDate2.format("DD/MM/YYYY")}`
        )
        .required(),

      email: yup.string().email().min(0).max(50).required(),
      telefono: yup.string().min(0).max(15).required(),
      tipo_documento: yup.string().min(0).max(50).required(),
      nro_documento: yup.string().min(0).max(50).required(),
      password: yup.string().min(4).max(50).required(),
    });

    let fetchDocumento = () =>
      api.get("/getParametro/PAR_TIPO_DOCUMENTO").then((response) => {
        documentoList.value = response.data.content;
      });

    let fetchGenero = () =>
      api.get("/getParametro/PAR_GENERO").then((response) => {
        generoList.value = response.data.content;
      });

    let fetchNacionalidad = () =>
      api.get("/getNacionalidad").then((response) => {
        nacionalidadList.value = response.data.content;
      });

    const cambioPaisEmision = () => {
      persona.value.nacionalidad_emision = persona.value.nacionalidad;
      persona.value.pais_nacimiento = persona.value.nacionalidad;

      agregar_codigo_pais(persona.value.nacionalidad);
    };

    const Validar = async () => {
      let validar = true;
      try {
        Object.keys(persona.value).forEach((key) => {
          if (typeof persona.value[key] == "string") {
            persona.value[key] = persona.value[key].trim();
          }
        });
        formError.value = {};
        await schemaForm.validate(persona.value, { abortEarly: false });
      } catch (err) {
        formError.value = {};
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message;

            console.log(error.path)
          }
        });

        validar = false;
      }

      return validar
    };
    const Validar2 = async () => {
      let validar = true;
      try {
        Object.keys(persona.value).forEach((key) => {
          if (typeof persona.value[key] == "string") {
            persona.value[key] = persona.value[key].trim();
          }
        });
        formError.value = {};
        await schemaForm2.validate(persona.value, { abortEarly: false });
      } catch (err) {
        formError.value = {};
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message;
          }
        });
        validar = false;
      }

      if (persona.value.email) {
        isLoading.value = true;
        await verificar_email();
        isLoading.value = false;
      }

      if (formError.value.email) {
        validar = false;
      }
      if (persona.value.password != persona.value.password2) {
        formError.value.password2 = "Las contraseñas no coinciden";
        validar = false;
      }

      if (persona.value.fecha_emision) {
        if (persona.value.fecha_expiracion) {
          if (
            moment(persona.value.fecha_emision).valueOf() >=
            moment(persona.value.fecha_expiracion).valueOf()
          ) {
            formError.value.fecha_expiracion =
              "Fecha de expiración debe ser mayor a la fecha de emision";
            validar = false;
          }
        }
      }

      return validar;
    };

    const Registrar = async () => {
      if (persona.value.nacionalidad == "BOL") {
        registrarbol();
      }
      if (
        persona.value.nacionalidad != "BOL" &&
        persona.value.nacionalidad != ""
      ) {
        registrarext();
      }
    };

    let registrarext = async () => {

      if (await Validar()) {
        Mensaje.Confirmar(
          "¿Esta seguro de registrar ?<br> ¡Revise a detalle la información antes de registrar!",
          () => {
            isLoading.value = true;
            persona.value.phone_code = codigo_pais.value.phone_code;
            api
              .post("/setUsuario", persona.value)
              .then((result) => {
                if (result.status === 201 && result.data.code === 1) {
                  console.log("**Usuario Creado**");
                  isLoading.value = false;
                  Mensaje.success_action("Registrado correctamente", () => {
                    Login();
                  });
                }
              })
              .catch((error) => {
                isLoading.value = false;
                Mensaje.error(error.message);
                if (error.status == 400) {
                  Mensaje.error("Error 400");
                }
                if (error.status == 500) {
                  Mensaje.error("Error 500");
                }
              });
          }
        );
      }
    };

    let registrarbol = async () => {
      if (await Validar2()) {
        Mensaje.Confirmar(
          "¿Esta seguro de registrar ?<br> ¡Revise a detalle la información antes de registrar!",
          () => {
            isLoading.value = true;
            persona.value.phone_code = codigo_pais.value.phone_code;
            api
              .post("/setUsuario", persona.value)
              .then((result) => {
                if (result.status === 201 && result.data.code === 1) {
                  console.log("**Usuario Creado**");
                  isLoading.value = false;
                  Mensaje.success_action("Registrado correctamente", () => {
                    Login();
                  });
                }
              })
              .catch((error) => {
                isLoading.value = false;
                Mensaje.error(error.message);
                if (error.status == 400) {
                  Mensaje.error("Error 400");
                }
                if (error.status == 500) {
                  Mensaje.error("Error 500");
                }
              });
          }
        );
      }
    };

    let Login = async () => {
      try {
        let data = {
          usr_usuario: persona.value.email,
          usr_password: persona.value.password,
        };

        let config = {
          headers: {
            userclient: `${process.env.VUE_APP_USER_CLIENT}`,
          },
        };
        isLoading.value = true;
        let result = await axios.post(
          `${process.env.VUE_APP_URL_APP}/login`,
          data,
          config
        );

        if (result.status === 200 && result.data.code === 1) {
          sUsuario.addToken(result.data.token);
          router.push({ path: "/inicio" });
        }

        isLoading.value = false;
        errorlogin.value = null;
      } catch (error) {
        isLoading.value = false;
        console.log(error.message);
      }
    };

    let Cancelar = () => {
      router.push({ path: "/usuarios" });
    };

    let irLogin = () => {
      router.push({ path: "/" });
    };

    let verificar_email = async () =>
      api.get(`/getEmail/${persona.value.email}`).then((response) => {
        if (response.data.code == 1) {
          formError.value.email = "¡El Correo Electrónico ya esta registrado! ";
        }
        isLoading.value = false;
      });

    let agregar_codigo = (country) => {
      codigo_pais.value = country;
    };

    let agregar_codigo_pais = (cod) => {
      let pais = Countries.value.find((x) => x.cod == cod);
      if (pais) {
        codigo_pais.value = pais;
      }
    };
    onMounted(fetchDocumento);
    onMounted(fetchGenero);
    onMounted(fetchNacionalidad);

    return {
      Registrar,
      documentoList,
      generoList,
      nacionalidadList,
      persona,
      formError,
      maxDate,
      Cancelar,
      cambioPaisEmision,
      verificar_email,
      irLogin,
      isLoading,
      Countries,
      agregar_codigo,
      codigo_pais,
      agregar_codigo_pais,
    };
  },
};
</script>
<style></style>
