<template>
  <div class="p-3">

    <div
      v-if="archive.type_file === 'docx' || archive.type_file === 'doc' || archive.type_file === 'pptx' || archive.type_file === 'xlsx' || archive.type_file === 'csv'">
      <VueDocPreview :value="file(archive)" type="office"/>
    </div>
    <div
      v-if="archive.type_file === 'jpg' || archive.type_file === 'png' || archive.type_file === 'gif' || archive.type_file === 'heif' ||
    archive.type_file === 'hevc' || archive.type_file === 'psd' || archive.type_file === 'svg'|| archive.type_file === 'jpeg' || archive.type_file === 'webp'">
      <div class="text-center">
        <vue-load-image>
          <img slot="image" class="w-75 h-50" :src="file(archive)" alt="SaludWom"/>
          <img slot="preloader" src="@/assets/img/loading-image-saludwom.gif" alt=""/>
          <div slot="error">error message</div>
        </vue-load-image>
<!--        <img @load="onImgLoad" class="w-75 h-50" :src="file(archive)" alt="SaludWom">-->
      </div>
    </div>
    <div v-if="archive.type_file === 'pdf'">
      <embed :src="file(archive)+'#toolbar=0&navpanes=0&scrollbar=0'" type="application/pdf"
             width="100%" height="600px"/>

      <!--     <iframe :src="'https://docs.google.com/viewer?url='+$config.urlBack+archive.path_file+'&embedded=true'" style="border: none; width: 100%; height: 50rem"></iframe>-->
    </div>
    <div
      v-if="archive.type_file === 'mov' || archive.type_file === 'mp4' || archive.type_file === 'wmv' || archive.type_file === 'avi'">
      <video class="w-100" controls :src="file(archive)"></video>
    </div>
    <div class="my-4 text-center w-auto">
      <h6>{{ archive.name_file }}</h6>
    </div>
  </div>
</template>

<script>
// import VueDocPreview from 'vue-doc-preview'
export default {
  components: {
    'VueDocPreview': () => import('vue-doc-preview')
  },
  name: "ShowArchive",
  props: ['archive'],
  methods:{
    onImgLoad(){

    },
    file(file){
      switch (file.storage) {
        case 'cloud':
          return this.$config.urlDigitalOcean+file.path_file
        case 'local':
          return this.$config.urlBack+file.path_file
      }
    }
  }
}
</script>

<style scoped>

</style>
