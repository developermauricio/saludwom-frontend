<template>
  <div>
    <div class="container">
      <!--=====================================
		    COMPONENTE CARD PROFILE
    ======================================-->
      <CardProfile/>
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
