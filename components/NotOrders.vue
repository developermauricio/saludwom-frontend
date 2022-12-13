<template>
  <div>
    <div class="order-success-wrapper">
      <div class="custom-container">
        <div class="order-done-content">
          <svg class="bi bi-check-circle-fill text-success mb-4" width="60" height="60" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>
          <h5>¡Aún no has comprado planes!</h5>
          <p>Conoce nuestros planes y no dudes que será tu mejor decisión adquirir uno de ellos.</p>
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
  name: "NotOrders",
  methods:{
    goToPlans(){
      this.$router.push({name: 'index.plans'});
    }
  }
}
</script>

<style scoped>
.order-success-wrapper{
  height: 70vh !important;
}
</style>
