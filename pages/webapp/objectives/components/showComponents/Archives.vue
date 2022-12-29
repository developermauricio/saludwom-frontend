<template>
 <div class="row mt-3 d-flex align-items-center ">
   <div class="col-4 col-md-3 col-lg-3 single-card p-2" @click="openModal(archive)" style="cursor: pointer" v-for="archive in archives" :key="archive.id">
     <div class="text-center">
       <img width="40" :src="require(`~/assets/img/icons/archives/${iconArchive(archive.type_file)}`)" alt="">
     </div>
     <p class="text-center text-truncate">{{ archive.name_file }}</p>
   </div>
 </div>
</template>

<script>
import ShowArchive from "./ShowArchive";

export default {
  name: "Archives",
  props:['archives'],
  methods:{
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
    iconArchive(type){
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
        case 'pdf':
          return 'icon-pdf.png'
        case 'png':
          return 'icon-image.png'
        case 'jpg':
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
  }
}
</script>

<style scoped>

</style>
