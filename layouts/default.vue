<template>
  <div class="mb-5">
    <!-- Preloader -->
    <div id="preloader">
      <div class="spinner-grow text-primary" role="status"></div>
    </div>
    <!-- Internet Connection Status -->
    <!-- # This code for showing internet connection status -->
    <div class="internet-connection-status" id="internetStatus"></div>
    <Nuxt/>
  </div>
</template>

<script>


import {bus} from "../plugins/bus";

export default {
  name: "default",
  data(){
    return{
      internetStatus: true,
    }
  },
  mounted() {
    bus.$emit('logoPrimary', process.env.LOGO_PRIMARY);
  }
}
</script>

<style>
</style>
