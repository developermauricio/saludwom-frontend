<template>
  <div>
    <div class="container">
      <!--=====================================
		    COMPONENTE CARD PROFILE
    ======================================-->
      <CardProfile/>

      <nuxt-link class="affan-element-item" to="/webapp/perfil/info">Datos Personales<i class="bx bx-chevron-right me-2"></i></nuxt-link>
      <nuxt-link class="affan-element-item" to="/webapp/perfil/suscripciones">Suscripciones<i class="bx bx-chevron-right me-2"></i></nuxt-link>
      <nuxt-link class="affan-element-item" to="/subscription">Mi tratamiento en 7 minute<i class="bx bx-chevron-right me-2"></i></nuxt-link>
      <nuxt-link class="affan-element-item" to="/subscription">Recursos en PDF<i class="bx bx-chevron-right me-2"></i></nuxt-link>
      <nuxt-link class="affan-element-item" to="/subscription">Historial de Pagos<i class="bx bx-chevron-right me-2"></i></nuxt-link>
      <nuxt-link class="affan-element-item" to="/subscription">Consentimientos<i class="bx bx-chevron-right me-2"></i></nuxt-link>
      <nuxt-link class="affan-element-item" to="/subscription">Acerda de la app<i class="bx bx-chevron-right me-2"></i></nuxt-link>
    </div>
  </div>
</template>

<script>
import {bus} from "../../../plugins/bus";
import CardProfile from "./components/CardProfile";
export default {
  name: "IndexProfile",
  components: {
    CardProfile,
  },
  watch: {
    /* Nos permite validar controlar cuando estamos en el componente del perfil y luego emitimos un evento que permite agregar o quitar la flecha que indica más información*/
    '$route'(to, from) {
      bus.$emit('nextInfoProfile', to);
    }
  },
}
</script>

<style scoped>

</style>
