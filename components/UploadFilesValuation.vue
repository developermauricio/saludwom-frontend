<template>
  <div>
    <VueFileAgent
      ref="vueFileAgent"
      :theme="'list'"
      :multiple="true"
      :deletable="true"
      :meta="true"
      :accept="'image/*,video/*,.pdf,.doc,.docx,.ods'"
      :maxSize="'10MB'"
      :maxFiles="2"
      :helpText="'Clic o arrastra aquí imágenes, o documentos.'"
      :errorText="{
      type: 'Tipo de archivo incorrecto, agrega fotos, videos, word, pdf',
      size: 'Este archivo no se enviará. Los archivos no deben superar los 15 MB de tamaño',
    }"
      v-model="fileRecords"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
    ></VueFileAgent>
    <!--  <div class="mt-3">-->
    <!--    <button class="btn btn-primary" @click="uploadFiles()">Enviar</button>-->
    <!--  </div>-->
  </div>
</template>

<script>
import {bus} from "../plugins/bus";

export default {
  name: "UploadFilesValuation",
  data() {
    return {
      fileRecords: [],
      uploadHeaders: '',
      uploadUrl: `${process.env.BASE_URL_API_MONITOR_BACK}/api/v1/upload-files-valuation/${this.$auth.user.id}`,
      fileRecordsForUpload: []
    }
  },
  methods: {
    uploadFiles: function () {
      if (this.fileRecordsForUpload.length > 0) {
        this.$vs.loading({
          color: process.env.COLOR_BASE,
          text: 'Subiendo archivos.Espere por favor...'
        })
        this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload).then(resp => {
          this.$vs.loading.close()
          this.$toast.success({
            title: 'Confirmación',
            message: 'La carga de uno o mas archivos fue exitoso. Exitoso!',
            showDuration: 1000,
            hideDuration: 5000,
          })
        }).catch(e => {
          console.log(e)
          this.$toast.error({
            title: 'Error',
            message: 'Error al subir archivos. Consulte con el administrador.',
            showDuration: 1000,
            hideDuration: 8000,
          })
          this.$vs.loading.close()
        });
        this.$vs.loading.close()
        // this.$refs.vueFileAgent.upload
        this.fileRecordsForUpload = [];
      }

    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    },
    filesSelected: function (fileRecordsNewlySelected) {
      let validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        let k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {

        this.$confirm(
          {
            message: '¿Estas seguro de quitar este archivo?',
            button: {
              no: 'No',
              yes: 'Si'
            },
            /**
             * Callback Function
             * @param {Boolean} confirm
             */
            callback: async confirm => {
              if (confirm) {
                this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
              }
            }
          })
        // if (confirm('Are you sure you want to delete?')) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    fileDeleted: function (fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      bus.$on('saveFiles', () => {
        this.uploadFiles()
      }, 500)
    })
  }
}
</script>

<style scoped>

</style>
