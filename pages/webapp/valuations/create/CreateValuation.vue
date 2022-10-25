<template>
  <div class="container">
    <CardWelcome/>
    <div class="card">
      <div class="card-body">
        <!--  SELECCIONAR EL TIPO DE TRATAMIENTO -->
        <div>
          <label class="form-label">Seleccione el tipo de tratamiento:</label>
          <multiselect
            v-model="selectedTreatment"
            :options="treatments" :searchable="true" :close-on-select="true" selectedLabel="Seleccionado"
            deselectLabel="" selectLabel="Seleccionar tratamiento" :show-labels="true"
            placeholder="Buscar tratamiento..."></multiselect>
        </div>
        <!--  DESCRIPCIÓN DE LOS OBJETIVOS -->
        <div class="mt-4">
          <div class="form-group">
            <label class="form-label" for="">Dinos los objetivos a los que quiere llegar con el tratamiento:</label>
            <textarea class="form-control" name="textarea" cols="5" rows="6"></textarea>
          </div>
        </div>
        <!--  CARGAR ARCHIVOS -->
        <div class="mt-4">
          <label class="form-label" for="">Subir fotos o documentos necesarios:</label>
          <vue-dropzone
            ref="filesDropzone"
            id="dropzone"
            :useCustomSlot="true"
            :options="fileOptions">
            <div class="dropzone-custom-content">
              <h6> Clic o arrastra aquí imágenes, o documentos</h6>
            </div>
          </vue-dropzone>
        </div>
        <!--  CALENDARIO CON LA AGENDA -->
        <div class="mt-4">
          <label class="form-label" for="">Agenda tu cita:</label>
          <div>
            <a class="btn btn-primary mt-2" @click="openModalSchedule = true">Seleccionar Fechas</a>
          </div>

          <!--=====================================
            MODAL AGENDAR FECHAS
          ======================================-->
          <b-modal
            ref="drag"
            v-model="openModalSchedule"
            class="modal-schedule"
            id="modal-schedule"
            @closeModal="closeModal"
            @hide="onHideModal"
            modal-backdrop
            centered
            title=""
          >
            <h4
              class="text-center mb-4 title-edit-icon pt-4"
              style="
          font-weight: 500 !important;
          margin-top: -3.5rem;
        "
            >
              Agendar Citas
            </h4>
            <PatientSchedule/>
            <template #modal-footer="{ ok, cancel, hide }">
             <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
             <button class="btn btn-primary">Guardar Fechas</button>
            </template>
          </b-modal>


        </div>
        <hr>
        <!--  ACEPTAR CONSENTIMIENTOS -->
        <div class="mt-4">
          <ConsentForms/>
        </div>
        <hr>
        <!--  GUARDAR Y AGENDAR -->
        <div class="mt-4">
          <a class="btn btn-primary btn-block mt-2">Agendar Cita</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ConsentForms from "../../../../components/legal/ConsentForms";
import CardWelcome from "./components/CardWelcome";
import VueDropzone from 'nuxt-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'nuxt-dropzone/dropzone.css'
import PatientSchedule from "../../../../components/calendar/PatientSchedule";

export default {
  name: "CreateValuation",
  components: {
    PatientSchedule,
    CardWelcome,
    VueDropzone,
    ConsentForms
  },
  data() {
    return {
      openModalSchedule: false,
      fileOptions: {
        addRemoveLinks: true,
        url: 'ao',
        // thumbnailWidth: 150,
        headers: {"My-Awesome-Header": "header value"},
        maxFiles: 1, // Cantidad maxima que se puede subir
        paramName: 'files',
        dictRemoveFile: 'X',
        maxFilesize: 5,  //Tamaño en MB
        acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
        autoProcessQueue: false,
      },
      selectedTreatment: '',
      treatments: ['Mejora Postura', 'Embarazo/Preparto/Postparto', 'Cáncer: Rehabilitación Funcional', 'Stop Dolor Abdominoperineal', 'Fortalecimiento Abdominal y del Suelo Pélvico']
    }
  },
  methods: {
    deleteFile(fileRecord) {
      alert(fileRecord)
      let i = this.fileRecords.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecords.splice(i, 1);
      } else {
        // this.deleteUploadedFile(fileRecord);
      }
    },
    closeModal() {
      this.openModalSchedule = false
      this.$root.$emit("bv::hide::modal", "modal-schedule");
    },
    onHideModal(evt) {
      if (evt.trigger === "backdrop") {
        evt.preventDefault();
        this.handleBackdrop();
      }
      if (evt.trigger === "headerclose") {
        this.openModalSchedule = false;
      }
    },
    handleBackdrop() {
      console.log("Backdrop clicked");
    },
  }
}
</script>

<style scoped>

</style>
