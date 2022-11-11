<template>
  <div>
    <div class="order-success-wrapper">
      <div class="custom-container">
        <div class="order-done-content" v-if="success.status">
          <svg class="bi bi-check-circle-fill text-success mb-4" width="60" height="60" viewBox="0 0 16 16"
               fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>
          <h5>¡Su cuenta ha sido activada exitosamente!</h5>
          <p>Cada vez estamos más cerca, ahora ve al login e inicia sesión. Gracias!</p>
          <nuxt-link to="/login" class="btn btn-primary mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left"
                 viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Ir al inicio de sesión
          </nuxt-link>
        </div>
        <div class="order-done-content" v-if="!success.status">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-x-circle-fill text-danger mb-4" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
          <h5>{{ success.message }}</h5>

          <nuxt-link to="/login" class="btn btn-primary mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left"
                 viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Ir al inicio de sesión
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Verify",
  data(){
    return{
      success:{
        status: null,
        message: null
      }
    }
  },
  methods: {
    async verify() {
      const params = this.$route.params
      const query = Object.keys(this.$route.query)
        .map(k => `${k}=${this.$route.query[k]}`)
        .join('&');
      await this.$axios.post(
        `/api/v1/verification/verify/${params.id}?${query}`
      ).then(resp =>{
        this.success.status = true
      }).catch(e =>{
        this.success.status = false
        this.success.message = e.response.data.errors.message
      })
    }
  },
  mounted() {
    this.verify()
  }
}
</script>

<style scoped>

</style>
