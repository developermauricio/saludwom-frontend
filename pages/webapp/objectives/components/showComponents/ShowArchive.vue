<template>
 <div class="p-3">
   <div v-if="archive.type_file === 'docx' || archive.type_file === 'pptx' || archive.type_file === 'xlsx' || archive.type_file === 'csv'">
     <VueDocPreview :value="$config.urlBack+archive.path_file" type="office"/>
   </div>
    <div v-if="archive.type_file === 'jpg' || archive.type_file === 'png' || archive.type_file === 'gif' || archive.type_file === 'heif' || archive.type_file === 'hevc' || archive.type_file === 'psd' || archive.type_file === 'svg'">
      <img class="w-100" :src="$config.urlBack+archive.path_file" alt="SaludWom">
    </div>
   <div v-if="archive.type_file === 'pdf'">
     <embed :src="$config.urlBack+archive.path_file+'#toolbar=0&navpanes=0&scrollbar=0'" type="application/pdf" width="100%" height="600px" />

<!--     <iframe :src="'https://docs.google.com/viewer?url='+$config.urlBack+archive.path_file+'&embedded=true'" style="border: none; width: 100%; height: 50rem"></iframe>-->
   </div>
   <div v-if="archive.type_file === 'mov' || archive.type_file === 'mp4' || archive.type_file === 'wmv' || archive.type_file === 'avi'">
     <video class="w-100" controls :src="$config.urlBack+archive.path_file"></video>
   </div>
 </div>
</template>

<script>
// import VueDocPreview from 'vue-doc-preview'
export default {
  components:{
    'VueDocPreview': () => import('vue-doc-preview')
  },
  name: "ShowArchive",
  props:['archive']
}
</script>

<style scoped>

</style>
