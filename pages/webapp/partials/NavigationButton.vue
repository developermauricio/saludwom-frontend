<template>
  <!-- Footer Nav -->
  <div class="footer-nav-area" id="footerNav">
    <div class="container px-0">
      <div class="footer-nav position-relative">
        <ul class="h-100 d-flex align-items-center justify-content-between ps-0">
          <!--  Menu Inicio  -->
          <li @click="menuSelected('Inicio', true, false)">
            <router-link to="/webapp/inicio">
              <svg class="bi bi-house" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"></path>
                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"></path>
              </svg>
              <span>Inicio</span>
            </router-link>
          </li>
          <!--  Menu Citas  -->
          <li @click="menuSelected('Citas', true, false)">
            <router-link to="/webapp/citas">
              <svg class="bi bi-collection" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"></path>
              </svg>
              <span>Citas</span>
            </router-link>
          </li>
          <!--  Menu Mis Objetivos  -->
          <li @click="menuSelected('Mis Objetivos', true, false)">
            <router-link to="/webapp/objetivos">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <span>Mis Objetivos</span>
            </router-link>
          </li>
          <!--  Menu Comprar Planes  -->
          <li @click="menuSelected('Comprar', true, false)">
            <router-link to="/webapp/planes">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
                <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
              </svg>
              <span>Comprar</span>
            </router-link>
          </li>
          <!--  Menu Perfil  -->
          <li @click="menuSelected('Perfil', true, false)" :class="classActiveIconButtonProfile ? 'router-link-exact-active' : ''">
            <router-link to="/webapp/perfil">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              <span>Perfil</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../../plugins/bus";

export default {
  name: "NavigationButton",
  data() {
    return {
      title: '',
      classActiveIconButtonProfile: false, //Permite agregar icono del perfil activo cuando estemos en el componente info perfil
    }
  },
  methods: {
    /* Función para agregar el título de la header con logo*/
    menuSelected(title, showLogo, backButton) {
      this.title = title
      this.$emit('header', this.title, showLogo, backButton)
      this.iconActiveProfileInfo(false)
    },
    iconActiveProfileInfo(value){
      this.classActiveIconButtonProfile = value
    }
  },

  mounted() {
    let route = this.$route
    /* Validamos en cual menú nos encontramos*/
    switch (route.name) {
      case 'index.home':
        this.title = 'Inicio'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        break;
      case 'index.quotes':
        this.title = 'Citas'
        this.$emit('header', this.title, true, false)
        break;
      /* Rutas o componentes del perfil*/
      case 'index.profile':
        this.title = 'Perfil'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        break;
      case 'profile.info': //Submenu o hijo del perfil
        this.title = 'Datos del usuario'
        this.$emit('header', this.title, false, true, localStorage.getItem('currentRoute'))
        this.iconActiveProfileInfo(true)
        break;
      case 'index.subscriptions':
        this.title = 'Suscripciones'
        this.$emit('header', this.title, false, true, localStorage.getItem('currentRoute'))
        this.iconActiveProfileInfo(true)
        localStorage.removeItem('currentRoute')
        // localStorage.setItem('currentRoute', route.path)
        break;
      case 'index.payment.history':
        this.title = 'Historial de Pagos'
        this.$emit('header', this.title, false, true, localStorage.getItem('currentRoute'))
        this.iconActiveProfileInfo(true)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        break;
      /* Rutas o componentes del doctor*/
      case 'index.doctors': //Submenu o hijo del perfil
        this.title = 'Doctores'
        this.$emit('header', this.title, false, true, '/webapp/inicio')
        break;
      /* Rutas o componentes de los planes*/
      case 'index.plans': //Submenu o hijo del perfil
        this.title = 'Comprar'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        break;
      /* Rutas o componentes de los objetivos*/
      case 'index.objectives':
        this.title = 'Mis Objetivos'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        // localStorage.setItem('currentRoute', route.path)
        break;
      case 'show.objective':
        this.title = 'Mi Objetivo'
        this.$emit('header', this.title, false, true, localStorage.getItem('currentRoute'))
        localStorage.setItem('currentRoute', route.path)
        // localStorage.setItem('currentRoute', route.path)
        break;
      /* Rutas o componentes para las valoraciones*/
      case 'valuation.create': //Submenu o hijo del perfil
        this.title = 'Crear Objetivo'
        this.$emit('header', this.title, false, true, localStorage.getItem('currentRoute'))
        break;
    }
  },
  watch: {
    /* Nos permite saber si estamos en el componente InfoProfile para activar el icono del perfil*/
    '$route'(to, from) {
      // console.log(to)
      /* Nos permite saber si estamos en el componente InfoProfile para activar el icono del perfil*/
      if (to.name === 'profile.info'){
        this.iconActiveProfileInfo(true)
        bus.$emit('profile.info', 'Datos del Usuario', false, true, localStorage.getItem('currentRoute'));
      }
      if (to.name === 'index.subscriptions'){
        this.iconActiveProfileInfo(true)
        bus.$emit('index.subscriptions', 'Suscripciones', false, true, localStorage.getItem('currentRoute'));
      }
      if (to.name === 'index.payment.history'){
        this.iconActiveProfileInfo(true)
        bus.$emit('index.payment.history', 'Historial de Pagos', false, true, localStorage.getItem('currentRoute'));
      }
      if (to.name === 'index.profile'){
        bus.$emit('index.profile', 'Perfil', true, false, '');
      }
      /* Nos permite saber si estamos en el componente IndexDoctors */
      if (to.name === 'index.doctors'){
        bus.$emit('index.doctors', 'Doctores', false, true, '/webapp/inicio');
      }
      /* Nos permite saber si estamos en el componente IndexPlans */
      if (to.name === 'index.plans'){
        bus.$emit('index.plans', 'Comprar', true, false, '');
      }
      /* Nos permite saber si estamos en el componente IndexObjectives */
      if (to.name === 'index.objectives'){
        bus.$emit('index.objectives', 'Mis Objetivos', true, false, '');
        // bus.$emit('index.objectives', 'Mis Objetivos', false, true, localStorage.getItem('currentRoute'));
        this.iconActiveProfileInfo(false)
      }
      if (to.name === 'show.objective'){
        this.iconActiveProfileInfo(true)
        bus.$emit('show.objective', 'Mi Objetivo', false, true, localStorage.getItem('currentRoute'));
      }
      /* Nos permite saber si estamos en el componente IndexHome */
      if (to.name === 'index.home'){
        bus.$emit('index.home', 'Inicio', true, false, '');
        this.iconActiveProfileInfo(false)
      }
      /* Nos permite saber si estamos en el componente IndexHome */
      if (to.name === 'index.quotes'){
        bus.$emit('index.quotes', 'Citas', true, false, '');
      }

      /* Nos permite saber si estamos en el componente CreateValuation */
      if (to.name === 'valuation.create'){
        bus.$emit('valuation.create', 'Crear Objetivo', false, true, localStorage.getItem('currentRoute'));
      }
    }
  },
}
</script>

<style scoped>
.router-link-exact-active {
  color: #D85C72 !important;
}

.router-link-active {
  color: #D85C72 !important;
}

.router-link-exact-active span {
  color: #D85C72 !important;
}
</style>
