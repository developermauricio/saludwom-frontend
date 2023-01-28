<template>
  <div class="p-4">
        <vue-confirm-dialog></vue-confirm-dialog>
    <label class="form-label" for="">Subir fotos o documentos necesarios.</label>
    <p class="text-light">Opcionalmente, puedes enviar hasta <strong class="text-danger">10</strong> archivos por objetivo y actualmente {{ countArchives === 0 ? 'no has subido archivos' : 'ya has subido'}} <strong class="text-danger" v-if="countArchives > 0">{{countArchives}}.</strong><br> Envianos documentos o fotos
      que creas necesarias para comprender más tu
      objetivo. Como historias clínicas, fotos de ecografías, de alguna zona de tu cuerpo. Etc. </p>
    <UploadFilesValuation ref="uploadFilesValuation" :valuationId="valorationId"/>
    <!-- Footer-->
    <div class="float-right py-3 d-none d-md-block d-lg-block mt-3">
      <div class="d-flex ">
        <button class="btn btn-secondary" @click="cancelClose">Cancelar</button>
        <button class="btn btn-success ml-2" @click="uploadFiles">Subir Archivos</button>
      </div>
    </div>
    <div class="mt-5 d-block d-md-none d-lg-none">
      <div class="mb-2">
        <button class="btn btn-success btn-block" @click="uploadFiles">Subir Archivos</button>
      </div>
      <div>
        <a class="btn btn-secondary btn-block" @click="cancelClose">Cancelar</a>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../../../plugins/bus";

export default {
  name: "AddArchives",
  props: ['valorationId', 'countArchives'],
  methods: {
    cancelClose(){
      this.$FModal.hide()
    },
    uploadFiles() {
      this.$refs.uploadFilesValuation.validateUpload(this.countArchives)
     // bus.$emit('confirmUploadArchives', this.countArchives)
    }
  }
}
</script>

<style scoped>

</style>
