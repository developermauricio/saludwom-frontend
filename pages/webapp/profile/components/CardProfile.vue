<template>
  <div class="card user-info-card mb-3">
    <nuxt-link to="/webapp/perfil/info">
      <div class="card-body d-flex align-items-center">
        <div class="user-avatar align-content-start mr-3">
          <img class="avatar-profile" src="@/assets/img/avatars/foto_mao_2.jpg" alt="">
        </div>
        <div class="user-info">
          <div class="d-flex align-items-center">
            <h5 class="mb-1">Silvio Mauricio Gutierrez Quiñones</h5>
          </div>
          <p class="mb-0">Paciente</p>
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
  </div>
</template>

<script>
import {bus} from "../../../../plugins/bus";
export default {
  name: "CardProfile",
  data() {
    return {
      nextInfoProfile: true //True para mostrar la flecha de más información
    }
  },
  created() {
    /* Cuando cargamos el componente, le decimos si que muestre la fecha solo si el componente actual es diferente profile.info*/
    this.nextInfoProfile = this.$route.name !== 'profile.info';
  },
  mounted() {
    /* Recibimos el evento que ejecutamos en el IndexProfile para mostrar o ocultar la flecha de mas información*/
    bus.$on('nextInfoProfile', (routeData) => {
      this.nextInfoProfile = routeData.name !== 'profile.info';
    })
  }
}
</script>

<style scoped>

</style>
