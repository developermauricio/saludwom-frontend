<template>
  <div class="p-5">
<!--    <pre>{{ archive }}</pre>-->
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
      v-if="archive.type_file === 'iframe' || archive.type_file === 'mov' || archive.type_file === 'mp4' || archive.type_file === 'wmv' || archive.type_file === 'avi'">
      <div v-if="pathVideo(archive.path_file)">
        <video class="w-100" controls :src="file(archive)" style="height: 50%"></video>
      </div>
      <div v-else>
        <div class="iframe-container">
          <div class="w-100 text-center iframe-video" v-html="archive.path_file" >{{ archive.path_file }}</div>
        </div>
      </div>
    </div>
    <!-- Info descripción recurso  -->
    <div>
      <div class="my-3 w-auto">
        <h6>{{ resource.name }}</h6>
      </div>
      <div>
        <p>{{ resource.description }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ShowResourceQuestionnaire",
  props: ['resource'],
  data(){
    return{
      archive: null,
    }
  },
  methods:{
    file(file){
      console.log(file)
      switch (file.storage) {
        case 'cloud':
          return this.$config.urlDigitalOcean+file.path_file
        case 'local':
          return this.$config.urlBack+file.path_file
      }
    },
    pathVideo(file) {
      const url = new URL(file, window.location.href);
      const ruta = url.pathname.split('/');
      const storage = ruta[1];
      switch (storage) {
        case 'storage':
          return this.$config.urlBack + file
        case 'cloud':
          return this.$config.urlDigitalOcean + file;
        case '':
          return false
      }
    }
  },
  beforeMount() {
    this.archive = this.resource.archive
  }
}
</script>

<style scoped>

</style>
