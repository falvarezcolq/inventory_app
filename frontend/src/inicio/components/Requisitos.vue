<template>
  <div class="busqueda">
    <div class="busqueda_seccion mt-4">
      <div class="row">
        <div class="col-12 col-md-12 my-3">
          <h3>REQUISITOS</h3>
        </div>
      </div>
      <div class="row form-group" style="text-align: justify">
        <!-- <div class="col-12 col-md-12">
              <button class="btn btn-outline-primary" @click="todosLosRequisitos =!todosLosRequisitos" v-if="todosLosRequisitos"> Ocultar</button>
              <button class="btn btn-outline-default" @click="todosLosRequisitos =!todosLosRequisitos" v-else="">Ver todos los requisitos</button>
          </div> -->
        <div class="col-12 col-md-12">

          <div class="row">
            <div class="col-5 text-center"> <b>REQUISITO</b> </div>
            <div class="col-2 text-center"> <b>DOCUMENTOS</b> </div>
            <div class="col-1 text-center"> <b>ACCIÓN</b> </div>
            <div class="col-2 text-center"> <b>APROBADO</b> </div>
            <div class="col-2 text-center"> <b>OBSERVACIÓN</b> </div>
          </div>

          <div class="lista-requisito">
            <div v-for="(item, index) in filterTitulo" :key="index">
              <div class="row line"
                :class="[todosLosRequisitos || item.id_cumplimiento ? !item.id_cumplimiento && !item.titulo ? 'inhabilitado' : '' : 'display-none']">
                <div class="col-5" :class="[item.titulo ? 'req-titulo' : '']">
                  {{ index + 1 }}. {{ item.nombre }} <span class="orange" v-if="item.validar == 1"> **Obligatorio</span>
                </div>

                <div class="col-2">
                  <div v-if="item.hash_name">
                    <div class="btn btn-link" data-bs-toggle="modal" data-bs-target="#modaldatosTramite"
                      @click="cargarArchivoVistaPrevia(item)">
                      {{ item.old_name }}</div>
                  </div>
                </div>
                <div class="col-1">
                  <div>
                    <div class="h6">
                      <label :for="'file-upload' + item.id_requisito" class="btn btn-sm btn-outline-success"
                        v-if="item.subir_archivo">
                        <i class="fa fa-cloud-upload"></i> Subir Archivo
                      </label>
                    </div>
                    <input @change="cargarArchivo(item, $event)" type="file" :id="'file-upload' + item.id_requisito"
                      style="display: none;" :key="item.id_requisito" />
                  </div>
                </div>


                <div class="col-1 text-center" v-if="item.id_cumplimiento">
                  <div class="form-check form-switch">
                    <label class="form-check-label green " v-if="item.aprobado"> Aprobado</label>
                  </div>
                </div>

                <div class="col-2 text-center" v-if="item.id_cumplimiento">
                  <div>
                    <span class="orange" v-if="item.observado">{{ item.observacion }}</span>

                  </div>
                </div>
              </div>

              <div>
                <div v-for="(itemHijo, indexHijo) in filterHijo(item.cod_requisito)" :key="indexHijo">
                  <div class="row line"
                    :class="[todosLosRequisitos || itemHijo.id_cumplimiento ? !itemHijo.id_cumplimiento && !itemHijo.titulo ? 'inhabilitado' : '' : 'display-none']">
                    <div class="col-5 lista-hijo1" :class="[itemHijo.titulo ? 'req-titulo' : '']">
                      {{ indexHijo + 1 }}. {{ itemHijo.nombre }} <span class="orange" v-if="itemHijo.validar == 1">
                        **Obligatorio</span>
                    </div>

                    <div class="col-2">
                      <div v-if="itemHijo.hash_name">
                        <div class="btn btn-link" data-bs-toggle="modal" data-bs-target="#modaldatosTramite"
                          @click="cargarArchivoVistaPrevia(itemHijo)">
                          {{ itemHijo.old_name }} </div>
                      </div>

                    </div>
                    <div class="col-1">

                      <div>
                        <div class="h6">
                          <label :for="'file-upload' + itemHijo.id_requisito" class="btn btn-sm btn-outline-success"
                            v-if="itemHijo.subir_archivo">
                            <i class="fa fa-cloud-upload"></i> Subir Archivo
                          </label>
                        </div>
                        <input @change="cargarArchivo(itemHijo, $event)" type="file"
                          :id="'file-upload' + itemHijo.id_requisito" style="display: none;"
                          :key="itemHijo.id_requisito" />

                      </div>
                    </div>
                    <div class="col-1 text-center" v-if="itemHijo.id_cumplimiento">
                      <div class="form-check form-switch">
                        <label class="form-check-label green " v-if="itemHijo.aprobado"> Aprobado</label>
                      </div>
                    </div>
                    <div class="col-2 text-center" v-if="itemHijo.id_cumplimiento">
                      <div>
                        <span class="orange" v-if="itemHijo.observado">{{ itemHijo.observacion }}</span>

                      </div>
                    </div>


                  </div>

                  <div>
                    <div v-for="(itemHijo2, indexHijo2) in filterHijo(itemHijo.cod_requisito)" :key="itemHijo2">
                      <div class="row line"
                        :class="[todosLosRequisitos || itemHijo2.id_cumplimiento ? !itemHijo2.id_cumplimiento && !itemHijo2.titulo ? 'inhabilitado' : '' : 'display-none']">
                        <div class="col-5 lista-hijo2" :class="[itemHijo2.titulo ? 'req-titulo' : '']">
                          {{ indexHijo2 + 1 }}. {{ itemHijo2.nombre }} <span class="orange" v-if="itemHijo2.validar == 1">
                            **Obligatorio</span>
                        </div>

                        <div class="col-2">
                          <div v-if="itemHijo2.hash_name">
                            <div class="btn btn-link" data-bs-toggle="modal" data-bs-target="#modaldatosTramite"
                              @click="cargarArchivoVistaPrevia(itemHijo2)">
                              {{ itemHijo2.old_name }}</div>
                          </div>

                        </div>

                        <div class="col-1">

                          <div>
                            <div class="h6">
                              <label :for="'file-upload' + itemHijo2.id_requisito" class="btn btn-sm btn-outline-success"
                                v-if="itemHijo2.subir_archivo">
                                <i class="fa fa-cloud-upload"></i> Subir Archivo
                              </label>
                            </div>
                            <input @change="cargarArchivo(itemHijo2, $event)" type="file"
                              :id="'file-upload' + itemHijo2.id_requisito" style="display: none;"
                              :key="itemHijo2.id_requisito" />

                          </div>
                        </div>
                        <div class="col-1 text-center" v-if="itemHijo2.id_cumplimiento">
                          <div class="form-check form-switch">
                            <label class="form-check-label green " v-if="itemHijo2.aprobado"> Aprobado</label>
                          </div>
                        </div>
                        <div class="col-2 text-center" v-if="itemHijo2.id_cumplimiento">
                          <div>
                            <span class="orange" v-if="itemHijo2.observado">{{ itemHijo2.observacion }}</span>

                          </div>
                        </div>

                      </div>

                      <div>
                        <div v-for="(itemHijo3, indexHijo3) in filterHijo(itemHijo2.cod_requisito)" :key="itemHijo3">
                          <div class="row line"
                            :class="[todosLosRequisitos || itemHijo3.id_cumplimiento ? !itemHijo3.id_cumplimiento && !itemHijo3.titulo ? 'inhabilitado' : '' : 'display-none']">
                            <div class="col-5 lista-hijo3" :class="[itemHijo3.titulo ? 'req-titulo' : '']">
                              {{ indexHijo3 + 1 }}. {{ itemHijo3.nombre }} <span class="orange"
                                v-if="itemHijo3.validar == 1"> **Obligatorio</span>
                            </div>



                            <div class="col-2">
                              <div v-if="itemHijo3.hash_name">
                                <div class="btn btn-link" data-bs-toggle="modal" data-bs-target="#modaldatosTramite"
                                  @click="cargarArchivoVistaPrevia(itemHijo3)">
                                  {{ itemHijo3.old_name }}</div>
                              </div>

                            </div>

                            <div class="col-1">

                              <div>
                                <div class="h6">
                                  <label :for="'file-upload' + itemHijo3.id_requisito"
                                    class="btn btn-sm btn-outline-success" v-if="itemHijo3.subir_archivo">
                                    <i class="fa fa-cloud-upload"></i> Subir Archivo
                                  </label>
                                </div>
                                <input @change="cargarArchivo(itemHijo3, $event)" type="file"
                                  :id="'file-upload' + itemHijo3.id_requisito" style="display: none;"
                                  :key="itemHijo3.id_requisito" />

                              </div>
                            </div>
                            <div class="col-2 text-center" v-if="itemHijo3.id_cumplimiento">
                              <div class="form-check form-switch">

                                <label class="form-check-label green " v-if="itemHijo3.aprobado"> Aprobado</label>
                              </div>
                            </div>
                            <div class="col-2 text-center" v-if="itemHijo3.id_cumplimiento">
                              <div>
                                <span class="orange" v-if="itemHijo3.observado">{{ itemHijo3.observacion }}</span>

                              </div>
                            </div>

                          </div>


                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade " id="modaldatosTramite" ref="modaldatosTramite">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">Requisito: <b>{{ texto_requisito }}</b> </div>
              <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
            </div>
            <div class="row">
              <div class="col-md-12 " v-if="pdfDataUrl">
                <PdfObject :pdfDataUrl="pdfDataUrl" />
              </div>
            </div>
            <div class="modal-footer">
              <div class="modal-title">VISTA PREVIA</div>
              <button type="button" data-bs-dismiss="modal" class="btn-close "></button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade " id="modalQuitarRequisito" ref="modalQuitarRequisito">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title red">¿ Desea Borrar requisito ?</div>
              <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <p><b>REQUISITO:</b><br> {{ texto_requisito }}</p>
              <p><b>MOTIVO DE ELIMINACIÓN DEL REQUISITO:</b>
                <span class="lb-error" v-if="formError.motivo">{{ formError.motivo }}</span>
              </p>
              <textarea class="form-control" name="" id="" cols="30" rows="4" v-model.trim="descripcion.motivo"
                :class="{ error: formError.motivo }"
                @input="descripcion.motivo = $event.target.value.toUpperCase()"></textarea>
              <p><strong>Nota:</strong> 200 caracteres como máximo.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success btn-sm" @click="confirmarQuitarRequisito"><i
                  class="fa fa-save"></i> ACEPTAR
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal"><i
                  class="fa fa-close"></i> CANCELAR</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade " id="modalObservarRequisito" ref="modalObservarRequisito">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title warning"> OBSERVAR REQUISITO</div>
              <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <p><b>REQUISITO:</b><br> {{ texto_requisito }}</p>
              <p><b>MOTIVO DE OBSERVACION DEL REQUISITO:</b>
                <span class="lb-error" v-if="formError.motivo">{{ formError.motivo }}</span>
              </p>
              <textarea class="form-control" name="" id="" cols="30" rows="4" v-model.trim="descripcion.motivo"
                :class="{ error: formError.motivo }"
                @input="descripcion.motivo = $event.target.value.toUpperCase()"></textarea>
              <!-- <p><strong>Nota:</strong> maximo de caractes 200.</p> -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="confirmarObservarRequisito"><i
                  class="fa fa-save"></i> OBSERVAR
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal"><i
                  class="fa fa-close"></i> CANCELAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import PdfObject from '@/components/PdfObject.vue';
import { Mensaje } from '@/tools/Mensaje';
import * as Yup from 'yup';
import { Modal } from 'bootstrap'
import TipoArchivos from '@/constantes/TipoArchivos';
import { useRegistroStore } from "@/stores/useRegistroStore";
import { useInicioStore } from '@/stores/useInicioStore';
import { offset } from '@popperjs/core';
import Loading from '@/components/Loading.vue';
import LanguageChanger from '../../components/LanguageChanger.vue';
export default {
  props: [
    'id_proceso_inicio',
    'cod_tramite',
  ],
  components: {
    PdfObject,
    Loading,
    LanguageChanger,
  },
  setup(props) {
    let router = useRouter()

    let sInicio = useInicioStore();
    let cod_tramite = ref(sInicio.getCodTramite)
    let id_proceso_inicio = ref(sInicio.getIDProcesoInicio)
    let id_tramite = ref(sInicio.getIDTramite);

    let proceso_inicio = ref(null);
    let requisitosList = ref([]);
    let pdfDataUrl = ref(null);
    let texto_requisito = ref('');
    let habilitar = true;
    let todosLosRequisitos = ref(true);
    let formError = ref({});
    let descripcion = ref({ motivo: '' })
    let requisitoBorrar = ref(null)
    let requisitoObservar = ref(null)
    let modalQuitarRequisito = ref(null);
    let modalObservarRequisito = ref(null);
    let isLoading = ref(false);

    let fetchRequisitos = async () => {
      if (id_proceso_inicio.value != 0) {
        await api.get(`/proceso_inicio/getRequisito/${id_proceso_inicio.value}`).then((response) => {
          requisitosList.value = response.data.content;
        });
      } else {
        await api.get(`/getRequisitos/${cod_tramite.value}`).then((response) => {
          requisitosList.value = response.data.content;
        });
      }

    }


    let guardarProcesoInicio = async () => {
      try {
        let datos = {
          datosAdicionales: sInicio.getDatosAdicionales.data,
          datosAdicionalesSR: sInicio.getDatosAdicionalesSR.data,
          datosAdicionalesCR: sInicio.getDatosAdicionalesCR.data,
          datosAdicionalesDConyugue: sInicio.getDatosAdicionalesDConyugue.data,
          datosAdicionalesOtroIng: sInicio.getDatosAdicionalesOtroIng.data,
          idTramiteData: sInicio.getIDTramite,
          id_proceso_inicio: sInicio.getIDProcesoInicio,
        };
        isLoading.value = true;
        let result = await api.post("/proceso_inicio", datos);
        isLoading.value = false;
        if (result.status === 201 && result.data.code === 1) {
          id_proceso_inicio.value = Number(result.data.content.id_proceso_inicio);
          sInicio.addIDProceso(Number(result.data.content.id_proceso_inicio));
          return true;
        }
        return false;
      } catch (error) {
        console.log(error)
        return false
      }
    }


    let retornar = () => {
      router.push("/mistramites");
    }
    let validaSolicitud = () => {
      let archivos_nosubidos = requisitosList.value.filter(x => x.id_cumplimiento && x.aprobado == false)
      return (archivos_nosubidos.length == 0);
    }

    let schemaForm = Yup.object().shape({
      motivo: Yup.string().max(100).required()
    })
    let validarForm = async () => {
      try {
        formError.value = {}
        await schemaForm.validate(descripcion.value, { abortEarly: false })
        return true;
      } catch (err) {
        formError.value = {}
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message
          }
        })
        return false;
      }
    }


    let confirmarQuitarRequisito = async () => {
      if (await validarForm()) {
        Mensaje.warning_action("¿Confirmar borrar el requisito del tramite?", async () => {
          await quitar(requisitoBorrar.value)
        })
      }
    }

    let confirmarObservarRequisito = async () => {
      if (await validarForm()) {
        Mensaje.warning_action("¿Confirmar que desea observar el tramite? Esto significa que hasta que no se subsane el requisito observado, el tramite no sera procesado.",
          async () => {
            await observar(requisitoObservar.value)
          })
      }
    }

    onMounted(async () => {
      await fetchRequisitos();
      // await cargaProcesoInicio();
    })




    let quitarRequisito = async (item) => {
      texto_requisito.value = item.nombre_req;
      requisitoBorrar.value = item;
    }

    let observarRequisito = async (item) => {
      texto_requisito.value = item.nombre_req;
      requisitoObservar.value = item;
    }
    let quitar = async (item) => {
      try {

        if (item.id_requisito && proceso_inicio.value.id_proceso_inicio) {
          let data = {
            id_requisito: item.id_requisito,
            id_proceso_inicio: proceso_inicio.value.id_proceso_inicio,
            observacion_baja: descripcion.value.motivo
          }
          let result = await api.post('/proceso_inicio/quitar_requisito', data)

          if (result.status == 200 && result.data.code == 1) {
            let i = requisitosList.value.findIndex(x => x.id_requisito == item.id_requisito)
            requisitosList.value[i].id_cumplimiento = null;

            Mensaje.success(`Requisito borrado!`)
            descripcion.value.motivo = ''
            Modal.getInstance(modalQuitarRequisito.value).hide()
          } else {
            throw { message: "ERROR guardarTramite" };
          }
        }
      } catch (err) {
        console.log(err.message);
        Mensaje.error("No se registro correctamente. Informar el problema a Sistemas! guardar requisito")
      }
    }


    let observar = async (item) => {
      try {

        if (item.id_requisito && proceso_inicio.value.id_proceso_inicio) {
          let data = {
            id_requisito: item.id_requisito,
            id_proceso_inicio: proceso_inicio.value.id_proceso_inicio,
            id_cumplimiento: item.id_cumplimiento,
            observacion: descripcion.value.motivo
          }
          let result = await api.post('/proceso_inicio/observar_tramite', data)

          if (result.status == 200 && result.data.code == 1) {
            let i = requisitosList.value.findIndex(x => x.id_requisito == item.id_requisito)
            requisitosList.value[i] = result.data.content;
            Mensaje.success(`Observacion registrada correctamente!`)
            descripcion.value.motivo = ''
            Modal.getInstance(modalObservarRequisito.value).hide()
          } else {
            throw { message: "ERROR guardarTramite" };
          }
        }
      } catch (err) {
        console.log(err.message);
        Mensaje.error("No se registro correctamente. Informar el problema a Sistemas! guardar requisito")
      }
    }


    let cargarArchivo = async (item, e) => {
      try {


        let archivo = e.target.files[0];
        if (!archivo) return;
        const imagenesAceptadas = TipoArchivos.TipoImagenes;
        const archivosAceptados = TipoArchivos.TipoNoImagen;
        if (imagenesAceptadas.includes(archivo['type'])) {
          resizeImage(archivo, item)
        } else if (archivosAceptados.includes(archivo['type'])) {
          guardarArchivo(archivo, archivo.name, item);
        } else {
          Mensaje.error("El archivo seleccionado no tiene el formato aceptado, solamente imágenes y pdf son válidos. ")
        }
      } catch (error) {
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }


    let resizeImage = (file, item) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {

            let tamanhoMinimoAceptable = img.width > img.height ? img.width : img.height;
            if (tamanhoMinimoAceptable < 100) {
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
            const max = newWidth > newHeight ? newWidth : newHeight;
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const qualityImage = 1 - (0.0002) * (max - 100);
            canvas.toBlob((blob) => {
              guardarArchivo(blob, file.name, item)
            }, 'image/jpeg', qualityImage)
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }


    let guardarRequisito = async (id_requisito) => {
      try {
        if (id_proceso_inicio.value != 0) {
          let data = {
            id_requisito: id_requisito,
            id_proceso_inicio: id_proceso_inicio.value,
          }
          isLoading.value = true;
          let result = await api.post('/proceso_inicio/requisitos_id', data);
          isLoading.value = false;

          if (result.status == 200 && result.data.code == 1) {
            let i = requisitosList.value.findIndex(x => x.id_requisito == id_requisito)
            requisitosList.value[i].id_cumplimiento = result.data.content;
            return result.data.content
          }
        }
        return null;
      } catch (err) {
        isLoading.value = false;
        return null;
      }
    }

    let guardarArchivo = async (archivo, name, item) => {
      try {

        if (archivo.size > 2050000) {
          Mensaje.error("El documento no debe exceder los 2MB de tamaño")
          return;
        }
        if (id_proceso_inicio.value == 0) {
          let result = await guardarProcesoInicio()
          if (!result) {
            throw { message: "No se ha podido registrar el Proceso Inicio" }
          }
        }
        let id_cumplimiento = item.id_cumplimiento;
        if (!id_cumplimiento) {
          id_cumplimiento = await guardarRequisito(item.id_requisito)
          if (!id_cumplimiento) {
            throw { message: "No se ha podido registrar el requisito" }
          }
        }

        const formData = new FormData();
        formData.append('id_cumplimiento', id_cumplimiento);
        formData.append('archivo', archivo, name);
        isLoading.value = true;
        let result = await api.post('/subirarchivo', formData)
        isLoading.value = false;
        if (result.status == 200 && result.data.code == 1) {
          fetchRequisitos()
          Mensaje.success("¡Archivo subido con éxito!")
        } else {
          Mensaje.error("Error")
        }
      } catch (error) {
        console.log(error.message);
        Mensaje.error("Error:" + error.message)
      }
    }



    let cargarArchivoVistaPrevia = async (item) => {
      try {
        let config = { responseType: 'blob' }
        pdfDataUrl.value = null;
        texto_requisito.value = item.nombre_req;
        const reader = new FileReader();
        let result = await api.get(`/file/${item.hash_name}`, config).then(response => {
          reader.onload = () => {
            pdfDataUrl.value = reader.result + '#toolbar=0&navpanes=0&scrollbar=0';

          }
          reader.readAsDataURL(response.data);
        })
      } catch (error) {
        Mensaje.error("No se puede visualizar el documento.")
      }
    }
    let filterTitulo = computed(() => requisitosList.value.filter(x => x.nro_padre == 0))

    let filterHijo = (hijo) => {
      return requisitosList.value.filter(x => x.nro_padre == hijo)
    }
    habilitar = computed(() => {
      return validaSolicitud();
    })

    let ConcluirTramite = async () => {

      Mensaje.Confirmar("Desea solicitar a ventanilla virtual DIGEMIG, el inicio de su tramite.", async () => {
        try {
          let result = await api.post(`/proceso_inicio/solicitar_aprobacion_tramite/${props.id_proceso_inicio}`)
          if (result.status == 200 && result.data.code == 1) {
            Mensaje.success(result.data.message);
            proceso_inicio.id_estado = 1;
            router.push("/mistramites");
          } else if (result.status == 200 && result.data.code == 0) {
            Mensaje.success(result.data.message);
          } else {
            Mensaje.error("Error")
          }
        } catch (error) {
          Mensaje.error("Error: " + error.message)

        }
      })
    }

    let aprobarRequisito = async (item) => {
      item.aprobado = !item.aprobado


      if (!item.aprobado) {

        if (item.observado) {
          Mensaje.Confirmar("¿Aprobar Requisito? <br/> La observación del requisito será levantada y quedara sin efecto.", async () => {
            await setEstadoAprobacion(item);
          })
        } else {
          await setEstadoAprobacion(item);
        }


      } else {
        Mensaje.warning_action("Quitar aprobación del requisito", async () => {
          await setEstadoAprobacion(item);
        })
      }
    }

    let setEstadoAprobacion = async (item) => {
      try {
        let data = {
          id_cumplimiento: item.id_cumplimiento,
          id_requisito: item.id_requisito,
          id_proceso_inicio: item.id_proceso_inicio,
          aprobado: !item.aprobado,
        }
        let result = await api.post(`/proceso_inicio/solicitar_aprobacion_requisito`, data)
        if (result.status == 200 && result.data.code == 1) {
          let index = requisitosList.value.findIndex(x => x.id_requisito == item.id_requisito)
          requisitosList.value[index] = result.data.content;
          item.aprobado = !item.aprobado;
        }

      } catch (error) {
        console.log(error.message);
        Mensaje.error("Ocurrio un error, porfavor reporte al área de sistemas");
      }
    }

    return {
      fetchRequisitos,
      requisitosList,
      retornar,
      cargarArchivo,
      cargarArchivoVistaPrevia,
      pdfDataUrl,
      texto_requisito,
      habilitar,
      ConcluirTramite,
      // id_proceso_inicio,
      proceso_inicio,
      validaSolicitud,
      filterTitulo,
      filterHijo,
      todosLosRequisitos,

      quitarRequisito,
      descripcion,
      formError,
      confirmarQuitarRequisito,
      modalQuitarRequisito,
      modalObservarRequisito,
      aprobarRequisito,
      confirmarObservarRequisito,
      observarRequisito,
      requisitoObservar,
    }
  },

}
</script>
<style>
.btn-upload-file:active {
  transform: translateY(2px);
}


.btn-add {
  color: #bfbfbf;
  cursor: pointer;
}

.btn-add:active {
  color: #4c2e2e;
  font-weight: bold;
  transform: translateY(2px);
}

.btn-add:hover {
  color: #4c2e2e;
  font-weight: bold;

}

.line {
  border-bottom: 1px solid #f0f0f0;
  margin-top: 5px;
  margin-bottom: 5px;
}

.inhabilitado {
  /* color: #bfbfbf; */
}

.inhabilitado>.orange {
  color: #ff9a9a;
}

.display-none {
  display: none;
}

input.check {
  font-size: 1.4rem !important;
}
</style>