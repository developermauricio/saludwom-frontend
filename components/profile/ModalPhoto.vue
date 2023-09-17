<template>
  <div class="p-4">
    <vue-confirm-dialog></vue-confirm-dialog>
    <div class="text-center">
      <div>
        <h5>Foto de Perfil</h5>
      </div>
      <!--  NUEVA FOTO DE PERFIL -->
      <div class="mt-3">
        <img class="avatar-global" :src="image" alt="" style="width: 180px !important; height: 180px !important;">
      </div>

      <div class="mt-4">
        <!-- Input oculto para seleccionar la imagen -->
        <input type="file" ref="fileInput" style="display: none" @change="handleImageChange">
        <!-- Botón para activar la selección de la imagen -->
        <button class="btn btn-primary btn-sm" @click="selectImage" v-if="!updatePhoto">Cambiar Foto de Perfil</button>
        <button class="btn btn-primary btn-sm" @click="savePhoto" v-else>Actualizar Foto de Perfil</button>
      </div>
    </div>
<!--    <vue-confirm-dialog></vue-confirm-dialog>l-->
  </div>
</template>

<script>
import UploadPhotoProfile from "./UploadPhotoProfile";

export default {
  name: "ModalPhoto",
  components: {UploadPhotoProfile},
  data() {
    return {
      updatePhoto: false
    }
  },
  props: ['image'],
  methods: {
    savePhoto() {
      const formData = new FormData();
      formData.append('photo', this.$refs.fileInput.files[0]);

      this.$confirm(
        {
          message: '¿Esta seguro de actualizar tu foto de perfil?',
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
              this.$axios.post(`/api/v1/update-photo-profile`, formData).then(resp => {
                this.$auth.user.picture = resp.data.data
                this.$auth.setUser(this.$auth.user)

                this.$toast.success({
                  title: 'Confirmación',
                  message: 'La foto de perfil se actualizó correctamente!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })

              }).catch(e => {
                console.log('ERROR', e);
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al verificar el correo electrónico. Consulte a soporte de SaludWom.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
              }).finally(() => {
                this.$vs.loading.close()
                this.$FModal.hide()
              })
            }
          }
        })
    },
    // Manejar el cambio de la imagen seleccionada
    handleImageChange(event) {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Crear una URL local para la imagen seleccionada
        this.image = URL.createObjectURL(selectedFile);
        this.updatePhoto = true
      }
    },
    // Activar el input de selección de imagen
    selectImage() {
      this.$refs.fileInput.click();
    },
  },
}
</script>

<style scoped>

</style>
