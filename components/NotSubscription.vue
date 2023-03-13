<template>
  <div>
    <div class="order-success-wrapper">
      <div class="custom-container">
        <div class="order-done-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-x-circle-fill text-danger mb-4" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
          <h5>¡No tienes una suscripción activa!</h5>
          <p>Selecciona el plan acorde a tus objetivos.</p>
          <button @click="goToPlans()" class="btn btn-primary mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Ver Planes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotSubscription",
  methods:{
    goToPlans(){
      this.$router.push({name: 'index.plans'});
    }
  }
}
</script>

<style scoped>

</style>
