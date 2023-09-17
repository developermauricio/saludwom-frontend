<template>
  <div class="upload-example">
    <cropper
      ref="cropper"
      @change="onChange"
      :src="img"
      :stencil-props="{
		handlers: {},
		movable: false,
		resizable: false,
	}"
      :stencil-size="{
		width: 300,
		height: 300
	}"
      :stencil-component="$options.components.CircleStencil"
      image-restriction="stencil"
    />

    <div class="mt-2">
      <button class="btn btn-primary" @click="savePhoto"> Guardar</button>
    </div>

    <div class="mt-4">
      <img :src="imageResult" alt="">
    </div>

  </div>
</template>

<script>
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
export default {
  name: "UploadPhotoProfile",
  components: {
    Cropper,
    Preview,
    CircleStencil
  },
  data() {
    return {
      imageResult: '',
      img: 'https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
    }
  },
  props: ['imageProfile'],
  methods:{
    savePhoto(){
      const { coordinates, canvas, } = this.$refs.cropper.getResult();
        this.imageResult = canvas.toDataURL();
    },
    onChange({ coordinates, image }) {
      this.result = {
        coordinates,
        image
      };
    },
  },
  mounted() {
    setTimeout(() =>{
      this.img = this.imageProfile
    }, 1000)

  }
}
</script>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #DDD;
}
</style>
