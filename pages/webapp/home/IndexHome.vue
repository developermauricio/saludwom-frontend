<template>
  <div>
    <!--=====================================
		 CONTENT
    ======================================-->
<!--    {{ $auth.user.patient.current_subscrition }}-->
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
    // this.captureEvent()
  },
  methods: {
    // captureEvent() {
    //   window.addEventListener('beforeinstallprompt', (e) => {
    //     // ! Prevent Chrome 67 and earlier from automatically showing the prompt
    //     e.preventDefault()
    //     // Stash the event so it can be triggered later.
    //     this.deferredPrompt = e
    //   })
    // },
    // clickCallback() {
    //   // Show the prompt
    //   this.deferredPrompt.prompt()
    //   // Wait for the user to respond to the prompt
    //   this.deferredPrompt.userChoice.then((choiceResult) => {
    //     if (choiceResult.outcome === 'accepted') {
    //       // Call another function?
    //     }
    //     this.deferredPrompt = null
    //   })
    // },
  },
}
</script>

<style scoped>

</style>
