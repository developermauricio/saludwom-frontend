<template>
  <div>
<!--    <vue-confirm-dialog></vue-confirm-dialog>-->
    <HeaderLogo :title="title" :show-logo="showLogo" :back-button="backButton" :url-back="urlBack"/>
    <div id="webappStatus">  <!-- Con este identificador mostramos todos los componentes si hay o no internet-->
      <div class="page-content-wrapper pb-5 pt-3">
        <router-view/> <!-- Componentes del sistema-->
      </div>
      <NavigationButton @header="dataHeader" v-role="'Paciente'"/> <!-- Navegación menu inferior-->
      <NavigationButtonDoctor @header="dataHeader" v-role="'Doctor'"/>
    </div>
    <!--    <NoInternetConnection id="noInternetConnection"/> &lt;!&ndash; Se muestra un mensaje cuando no hay internet&ndash;&gt;-->
  </div>
</template>

<script>
import {bus} from "../../plugins/bus";
import Welcome from "../../components/Welcome";
import HeaderLogo from "./partials/HeaderLogo";
import NavigationButton from "./partials/NavigationButton";
import NoInternetConnection from "./partials/NoInternetConnection";
import NavigationButtonDoctor from "./partials/NavigationButtonDoctor";

export default {
  middleware: ['auth'],
  name: "Index",
  components: {
    NavigationButtonDoctor,
    HeaderLogo,
    NavigationButton,
    NoInternetConnection
  },
  data() {
    return {
      title: '',
      showLogo: true,
      backButton: false,
      urlBack: '',
      // stateUse: useIdle(5 * 60 * 1000) // 5 min
    }
  },
  methods: {
    async currentSubscription() {
      this.loading()
      await this.$axios.get(`/api/v1/get-current-subscription`).then(async resp => {
        // await localStorage.removeItem('subscription')
        // await localStorage.setItem('subscription', JSON.stringify(resp.data.data))
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
  // onIdle() {
  //   console.log('DESCONECTADO')
  // },
  // onActive() {
  //   console.log('ACTIVO')
  // },
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
    bus.$on('index.objectives', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.removeItem('currentRoute')
      localStorage.setItem('currentRoute', this.$route.path)
    })
    bus.$on('index.quotes', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.removeItem('currentRoute')
      localStorage.setItem('currentRoute', this.$route.path)
    })
    bus.$on('show.objective', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.removeItem('currentRoute')
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

    /* Recibimos el evento que ejecutamos en el index.doctor.patients que viene de NavigationButtonDoctor */
    bus.$on('index.doctor.patients', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
    })
    bus.$on('index.doctor.objectives', (title, showLogo, backButton, urlBack) => {
      this.title = title
      this.urlBack = urlBack
      this.showLogo = showLogo
      this.backButton = backButton
      localStorage.removeItem('currentRoute')
      localStorage.setItem('currentRoute', this.$route.path)
    })

    console.log(this.$route.query)
    setTimeout(() =>{
      /*Para mostrar un mensaje luego que no tiene permisos para acceder a cierta parte del sitio*/
      bus.$on('accessNotAllowed', () =>{
        this.$toast.error({
          title: 'Error',
          message: 'Acceso no permitido. Consulte al administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      })
    }, 2000)
    setTimeout(() =>{
      bus.$on('verifySubscription', () =>{
        this.currentSubscription()
      })
    }, 500)

  },
  watch:{
    'stateUse': function (v){

    }
  }
}
</script>

<style scoped>

</style>
