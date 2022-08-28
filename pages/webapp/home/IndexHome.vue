<template>
  <div>
    <!--=====================================
		 CONTENT
    ======================================-->
      <!-- MENSAJE DE BIENVENIDA   -->
      <div class="container">
        <div class="card bg-primary mb-3 bg-img">
          <div class="card-body direction-rtl p-4">
            <h2 class="text-white">¡Hola! Bienvenid@</h2>
            <p class="mb-4 text-white">Que alegría que estés aquí... seremos un equipo para cumplir tus objetivos.</p>
          </div>
        </div>
      </div>
      <!-- CONTENIDO   -->
      <Content/>
    </div>
</template>

<script>
import HeaderLogo from "../partials/HeaderLogo";
import Content from "./components/Content";
export default {
  name: "IndexHome",
  components: {
    HeaderLogo,
    Content
  },
  data(){
    return{
      title: 'Inicio'
    }
  }
}
</script>

<style scoped>

</style>
