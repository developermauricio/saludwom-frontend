<template>
  <div>
    <div class="header-area" id="headerArea">
      <div class="container">
        <!-- Header Content -->
        <div class="header-content position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <div class="logo-wrapper offline-url" v-if="showLogo">
            <router-link to="/webapp/inicio">
              <img :src="require(`~/assets/img/saludwom/${$config.logo}`)" alt="">
            </router-link>
          </div>
          <!-- Back Button -->
          <div class="back-button" v-if="backButton">
            <nuxt-link :to="urlBack">
              <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
              </svg>
            </nuxt-link>
          </div>
          <div :class="`page-heading ${showLogo ? 'mr-5':'mr-3'} text-truncate`">
            <h6 class="mb-0 text-truncate px-2">{{ title }}</h6>
          </div>
          <!--=====================================
		        NOTIFICACIONES
          ======================================-->
          <Notifications/>
        </div>
        <!-- # Header Five Layout End -->
      </div>
    </div>
  </div>
</template>

<script>
import Notifications from "./Notifications";
export default {
  name: "HeaderLogo",
  components:{
    Notifications
  },
  data(){
    return{
      logoPrimary: ''
    }
  },
  props:['title', 'showLogo', 'backButton', 'urlBack'],
}
</script>

<style scoped>

</style>
