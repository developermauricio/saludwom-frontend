<template>
  <div>
      <div class="container">
        <h2>Citas</h2>
      </div>
  </div>
</template>

<script>
import HeaderLogo from "../partials/HeaderLogo";
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Detail from "./detail/Detail";
export default {
  name: "IndexCities",
  components: {
    Detail,
    HeaderLogo,
  },
  data(){
    return{
      title: 'Citas',
    }
  }
}
</script>

<style scoped>

</style>
