<template>
    <div class="container">
      <div class="row g-3">
        <!--=====================================
           SERVICIOS
       ======================================-->
        <div class="col-12 col-sm-12 col-lg-12 mb-3">
          <div class="card bg-secondary bg-img bg-cards" style="cursor: pointer">
            <div class="card-body p-3 direction-rtl">
              <h6 class="text-white">Suscripciones</h6>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-lg-12 mb-3">
          <Subscriptions/>
        </div>
      </div>
  </div>
</template>

<script>
import Subscriptions from "./components/Subscriptions";
export default {
  name: "IndexSubscriptions",
  components: {Subscriptions}
}
</script>

<style scoped>

</style>
