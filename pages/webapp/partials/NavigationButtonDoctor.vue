<template>
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
          <!--  Menu Pacientes  -->
          <li @click="menuSelected('Pacientes', true, false)">
            <router-link to="/webapp/pacientes">
              <svg class="bi bi-collection" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"></path>
              </svg>
              <span>Pacientes</span>
            </router-link>
          </li>
          <li @click="menuSelected('Objetivos', true, false)">
            <router-link to="/webapp/objetivos-doctor">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <span>Objetivos</span>
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
  name: "NavigationButtonDoctor",
  data() {
    return {
      title: '',
      classActiveIconButtonProfile: false, //Permite agregar icono del perfil activo cuando estemos en el componente info perfil
    }
  },
  methods:{
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
    switch (route.name) {
      case 'index.home':
        this.title = 'Inicio'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        break;
      case 'index.doctor.patients':
        this.title = 'Pacientes'
        this.$emit('header', this.title, true, false)
        break;
      /* Rutas o componentes del perfil*/
      case 'index.profile':
        this.title = 'Perfil'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        break;
      /* Rutas o componentes de los objetivos*/
      case 'index.doctor.objectives':
        this.title = 'Objetivos'
        this.$emit('header', this.title, true, false)
        localStorage.removeItem('currentRoute')
        localStorage.setItem('currentRoute', route.path)
        // localStorage.setItem('currentRoute', route.path)
        break;
    }
  },
  watch:{
    /* Nos permite saber si estamos en el componente InfoProfile para activar el icono del perfil*/
    '$route'(to, from) {
      // console.log(to)
      /* Nos permite saber si estamos en el componente InfoProfile para activar el icono del perfil*/
      /* Nos permite saber si estamos en el componente IndexHome */
      if (to.name === 'index.home'){
        bus.$emit('index.home', 'Inicio', true, false, '');
        this.iconActiveProfileInfo(false)
      }
      /* Nos permite saber si estamos en el componente IndexHome */
      if (to.name === 'index.doctor.patients'){
        bus.$emit('index.doctor.patients', 'Pacientes', true, false, '');
      }
      if (to.name === 'index.profile'){
        bus.$emit('index.profile', 'Perfil', true, false, '');
      }
      /* Nos permite saber si estamos en el componente IndexObjectives */
      if (to.name === 'index.doctor.objectives'){
        bus.$emit('index.doctor.objectives', 'Objetivos', true, false, '');
        // bus.$emit('index.objectives', 'Mis Objetivos', false, true, localStorage.getItem('currentRoute'));
        this.iconActiveProfileInfo(false)
      }
    }
  }
}
</script>

<style scoped>

</style>
