<template>
  <div>
      <div class="container">
        <h2>Citas</h2>
        <button class="btn btn-primary" @click="testMqtt">Test MQtt</button>
      </div>
<!--    <HumanBody/>-->
  </div>
</template>

<script>
import HeaderLogo from "../partials/HeaderLogo";
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Detail from "./detail/Detail";
import HumanBody from "../../../components/HumanBody";
import {publishMQTT} from "../../../plugins/mqtt";
export default {
  name: "IndexCities",
  components: {
    HumanBody,
    Detail,
    HeaderLogo,
  },
  methods:{
    testMqtt(){
      publishMQTT('test-mqtt', 'HOLA MAURO, ESTOY AQUI SOY JESÚS')
    }
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
