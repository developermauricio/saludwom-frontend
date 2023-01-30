<template>
  <div>
      <div class="container">
        <h2>Citas</h2>
      </div>
<!--    <HumanBody/>-->
  </div>
</template>

<script>
import HeaderLogo from "../partials/HeaderLogo";
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Detail from "./detail/Detail";
import HumanBody from "../../../components/HumanBody";
export default {
  name: "IndexCities",
  components: {
    HumanBody,
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
