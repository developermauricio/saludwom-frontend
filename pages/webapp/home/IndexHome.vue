<template>
  <div>
  <button
      ref="addBtn"
      class="add-button"
      @click="clickCallback"
    >
      Add
    </button>
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
      title: 'Inicio',
      deferredPrompt: null,
    }
  },
  mounted() {
    this.captureEvent()
  },
  methods: {
    captureEvent() {
      window.addEventListener('beforeinstallprompt', (e) => {
        // ! Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e
      })
    },
    clickCallback() {
      // Show the prompt
      this.deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // Call another function?
        }
        this.deferredPrompt = null
      })
    },
  },
}
</script>

<style scoped>

</style>
