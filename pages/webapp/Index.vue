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
import Welcome from "../../components/Welcome";

export default {
  middleware: ['auth'],
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
    async currentSubscription() {
      this.loading()
      await this.$axios.get(`/api/v1/get-current-subscription`).then(async resp => {
        await localStorage.removeItem('subscription')
        await localStorage.setItem('subscription', JSON.stringify(resp.data.data))
        bus.$emit('sendSubscription', resp.data.data)
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al validar la suscripción. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Validando suscripción...'
      })
    },
    /* Pasamos parámetros al header*/
    dataHeader(title, showLogo, backButton, urlBack) {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    },
    modalWelcome(){
      let user = this.$auth.user
      let checkStorage = localStorage.getItem('checkTour') || '0'

      console.log(user.tour)
      console.log(checkStorage)
      if (user.tour === 1 && checkStorage !== '0'){
        this.$FModal.show(
          {
            component: Welcome,
            placement: 'center top',
            clickToClose: false
          },
        )
      }
    }
  },
  mounted() {
    // this.currentSubscription()
    this.modalWelcome()

    /* Recibimos el evento que ejecutamos en el index.home que viene de NavigationButton */
    bus.$on('index.home', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.removeItem('currentRoute')
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
    bus.$on('index.payment.history', (title, showLogo, backButton, urlBack) => {
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
      localStorage.removeItem('currentRoute')
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
      localStorage.removeItem('currentRoute')
      localStorage.setItem('currentRoute', this.$route.path)
    })
    /* Recibimos el evento que ejecutamos en el index.doctors que viene de NavigationButton */
    bus.$on('valuation.create', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    })
    setTimeout(() =>{
      bus.$on('verifySubscription', () =>{
        this.currentSubscription()
      })
    }, 500)

  }
}
</script>

<style scoped>

</style>
