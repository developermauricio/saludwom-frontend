<template>
  <div class="card user-info-card mb-3">
    <nuxt-link to="/webapp/perfil/info">
      <div class="card-body d-flex align-items-center">
        <div class="user-avatar align-content-start mr-3">
          <img class="avatar-profile" :src="`${$config.urlBack}/${user.picture}`" alt="">
        </div>
        <div class="user-info">
          <div class="d-flex align-items-center">
            <h5 class="mb-1">{{ user.name }} {{ user.last_name }}</h5>
          </div>
          <p class="mb-0 text-primary">Paciente</p>
        </div>
        <div class="ml-auto" v-if="nextInfoProfile">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>
    </nuxt-link>
      <span class="badge bg-warning text-white">Tú próxima cita es el 24 de diciembre 2022</span>
  </div>
</template>

<script>
import {bus} from "../../../../plugins/bus";
export default {
  name: "CardProfile",
  data() {
    return {
      nextInfoProfile: true, //True para mostrar la flecha de más información
      user: {
        name: String(),
        last_name: String(),
        picture: String()
      },
    }
  },
  created() {
    /* Cuando cargamos el componente, le decimos que muestre la flecha solo si el componente actual es diferente profile.info*/
    this.nextInfoProfile = this.$route.name !== 'profile.info';
  },
  mounted() {
    this.user = this.$auth.user
    /* Recibimos el evento que ejecutamos en el IndexProfile para mostrar o ocultar la flecha de más información*/
    bus.$on('nextInfoProfile', (routeData) => {
      this.nextInfoProfile = routeData.name !== 'profile.info';
    })
  }
}
</script>

<style scoped>

</style>
