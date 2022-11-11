<template>
  <div>
    <HeaderLogo :title="title" :show-logo="showLogo" :back-button="backButton" :url-back="urlBack"/>
    <div id="webappStatus">  <!-- Con este identificador mostramos todos los componentes si hay o no internet-->
      <div class="page-content-wrapper py-3">
        <router-view/> <!-- Componentes del sistema-->
      </div>
      <NavigationButton @header="dataHeader"/> <!-- Navegación menu inferior-->
    </div>
<!--    <NoInternetConnection id="noInternetConnection"/> &lt;!&ndash; Se muestra un mensaje cuando no hay internet&ndash;&gt;-->
  </div>
</template>

<script>
import {bus} from "../../plugins/bus";
import HeaderLogo from "./partials/HeaderLogo";
import NavigationButton from "./partials/NavigationButton";
import NoInternetConnection from "./partials/NoInternetConnection";

export default {
  name: "Index",
  components: {
    HeaderLogo,
    NavigationButton,
    NoInternetConnection
  },
  data() {
    return {
      title: '',
      showLogo: true,
      backButton: false,
      urlBack: ''
    }
  },
  methods: {
    /* Pasamos parámetros al header*/
    dataHeader(title, showLogo, backButton, urlBack) {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    }
  },
  mounted() {
    /* Recibimos el evento que ejecutamos en el index.home que viene de NavigationButton */
    bus.$on('index.home', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.clear()
      localStorage.setItem('currentRoute', this.$route.path)
    })
    /* Recibimos el evento que ejecutamos en el index.quotes que viene de NavigationButton */
    bus.$on('index.quotes', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    })
    /* Recibimos el evento que ejecutamos en el profile.info que viene de NavigationButton */
    bus.$on('profile.info', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    })
    bus.$on('index.subscriptions', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.setItem('currentRoute', this.$route.path)
    })
    bus.$on('index.profile', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.clear()
      localStorage.setItem('currentRoute', this.$route.path)
    })
    /* Recibimos el evento que ejecutamos en el index.doctors que viene de NavigationButton */
    bus.$on('index.doctors', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    })
    /* Recibimos el evento que ejecutamos en el index.doctors que viene de NavigationButton */
    bus.$on('index.plans', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.clear()
      localStorage.setItem('currentRoute', this.$route.path)
    })
    /* Recibimos el evento que ejecutamos en el index.doctors que viene de NavigationButton */
    bus.$on('valuation.create', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    })
  }
}
</script>

<style scoped>

</style>
