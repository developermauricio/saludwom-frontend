<template>
  <div>
    <div class="d-flex justify-content-between mt-3">
      <div class="mr-1 ml-3 w-100 justify-content-center align-items-center mt-lg-5 mt-md-5">
        <h5>Hola soy Mailyn L. Solarte Muñoz!</h5>
        <p style="font-size: 0.8rem">Fisioterapeuta Especialista en Suelo Pélvico, con más de 15 años de experiencia. Quiero darte la bienvenida, Junt@s seremos un equipo, tú y yo construiremos tu cambio, tú ganas y yo te acompaño para que lo consigas. </p>
        <button class="btn btn-primary" @click="closeModal">Comenzar!</button>
      </div>
      <div>
        <img :src="require(`~/assets/img/saludwom/maily-solarte.png`)" alt="saludwom" width="350">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
   async closeModal(){
     this.$vs.loading({
       color: process.env.COLOR_BASE,
       text: 'Espere por favor...'
     })
      await this.$axios.post('/api/v1/check-tour-welcome-patient').then(resp =>{
        this.$vs.loading.close()
        this.$FModal.hide()
        localStorage.setItem('checkTour', 0)
      }).catch(e =>{
        this.$vs.loading.close()
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al check tour. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
