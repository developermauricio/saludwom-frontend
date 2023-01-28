<template>
  <div>
    <vue-confirm-dialog v-if="showAlertValidation"></vue-confirm-dialog>
    <div class="row mt-3 d-flex align-items-center" v-if="archives && archives.length > 0">
      <div class="col-6 col-md-3 col-lg-3 py-4 p-md-3 p-lg-3" style="cursor: pointer"
           v-for="archive in archives" :key="archive.id">
        <div class="single-card p-2" @click="openModal(archive)">
          <div class="text-center">
            <img width="40" :src="require(`~/assets/img/icons/archives/${iconArchive(archive.type_file)}`)" alt="">
          </div>
          <p class="text-center text-truncate">{{ archive.name_file }}</p>
        </div>
        <!--   Botón remover archivo  -->
        <div class="text-center" v-if="valuationState === '1'">
          <a class="text-danger" @click="removeArchive(archive)">Remover</a>
        </div>
      </div>
    </div>
    <div v-else class="py-3">
      <h6 class="text-center">No hay archivos</h6>
    </div>
    <!--   Botón agregar archivos  -->
    <div class="mt-4" v-if="valuationState === '1' || archives && archives.length === 0 ">
      <button class="btn btn-success btn-block" @click="openModalAddArchives">Subir Archivos</button>
    </div>

  </div>

</template>

<script>
import ShowArchive from "./ShowArchive";
import AddArchives from "../AddArchives";
import {bus} from "../../../../../plugins/bus";

export default {
  name: "Archives",
  data(){
    return{
      showAlertValidation: false,
    }
  },
  props: ['archives', 'valuationState', 'valuationId'],
  methods: {

    async openModalAddArchives() {
      await this.$FModal.show(
        {
          component: AddArchives,
          placement: 'center top',
        },
        {
          countArchives: this.archives.length,
          valorationId: this.valuationId
        }
      )
    },
    async openModal(archive) {
      await this.$FModal.show(
        {
          component: ShowArchive,
          placement: 'center top',
        },
        {
          archive: archive
        }
      )
    },
    async removeArchive(archive) {
      this.showAlertValidation = true
      let archiveData = {
        id: archive.id,
        path: archive.path_file,
        nameFile: archive.name_file
      }
      this.$confirm(
        {
          message: '¿Esta seguro de eliminar el archivo?',
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
              this.$vs.loading({
                color: process.env.COLOR_BASE,
                text: 'Espere por favor...'
              })
              try {
                const resp = await this.$axios.post(
                  `/api/v1/remove-archive/`,archiveData
                );
                if (resp.status === 200) {
                  this.$vs.loading.close()
                  this.showAlertValidation = false
                  this.$FModal.hide()
                  bus.$emit('updateDataValuation')
                  this.$toast.success({
                    title: 'Confirmación',
                    message: 'Archivo eliminado exitosamente!',
                    showDuration: 1000,
                    hideDuration: 5000,
                  })
                }
              } catch (e) {
                this.$vs.loading.close()
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al eliminar el archivo. Consulte con el administrador.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
              }
            }
          }
        })
    },
    iconArchive(type) {
      switch (type.toLowerCase()) {
        case 'mov':
          return 'icon-video.png'
        case 'mp4':
          return 'icon-video.png'
        case 'wmv':
          return 'icon-video.png'
        case 'avi':
          return 'icon-video.png'
        case 'docx':
          return 'icon-doc.png'
        case 'doc':
          return 'icon-doc.png'
        case 'pdf':
          return 'icon-pdf.png'
        case 'png':
          return 'icon-image.png'
        case 'jpg':
          return 'icon-image.png'
        case 'jpeg':
          return 'icon-image.png'
        case 'webp':
          return 'icon-image.png'
        case 'gif':
          return 'icon-image.png'
        case 'heif':
          return 'icon-image.png'
        case 'hevc':
          return 'icon-image.png'
        case 'psd':
          return 'icon-image.png'
        case 'svg':
          return 'icon-image.png'
      }
      // return 'oams'
    }
  },
}
</script>

<style scoped>

</style>
