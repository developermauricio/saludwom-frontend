<template>
  <div class="price-table-one content-plans">
    <div class="mb-4 d-flex justify-content-center align-items-center banner-7-minute">
      <h3 class="text-white d-sm-block d-none text-center mt-2">Programa 7 minute WORKOUT</h3>
      <h5 class="text-white d-sm-none d-block text-center mt-2">Programa 7 minute WORKOUT</h5>
    </div>
    <h6 class="mb-4 text-center">Antes de empezar con nuestro tratamiento, tengo que conocer tu estado de salud, tus
      expectativas, experiencias y los objetivos a los que quieres llegar con nuestro programa Online, a continuación te
      presento nuestros <strong>programas online:</strong></h6>
    <splide :slides="plans" :options="options">
      <splide-slide v-for="plan in plans" :key="plan.id" v-if="plan.state ==='1'">
        <div class="single-price-content shadow-sm" :class="plan.id === (planSelected ? planSelected.id : '') ? 'active' : '' " v-bind:style="{backgroundImage: `url(${$config.urlBack+plan.image_background})` ,}" >
<!--             :style="{backgroundImage: `url(` + require(`${$config.urlBack}${plan.image_background}`) + `)`}">-->
          <div class="price">
            <span class="text-white mb-2 title-plan">{{ plan.name }}</span>
            <h2 class="display-4">{{ (plan.price).toFixed(2)  | currency }}€</h2>
<!--            <span class="badge bg-light text-dark rounded-pill">Oferta -29%</span>-->
          </div>
          <!-- Pricing Desc -->
          <div class="pricing-desc">
            <p class="text-white pl-3 pr-2">{{ plan.description }}</p>
            <!--          <ul class="ps-0">
                        <li><i class="bi bi-check-lg me-2"></i>3 Month Usage</li>
                        <li><i class="bi bi-check-lg me-2"></i>Lifetime Updates</li>
                        <li><i class="bi bi-check-lg me-2"></i>2 Website License</li>
                        <li class="times"><i class="bi bi-x-lg me-2"></i>Free Support</li>
                        <li class="times"><i class="bi bi-x-lg me-2"></i>Download New Release</li>
                      </ul>-->
          </div>
          <!-- Purchase -->
          <div class="purchase">
            <a :class="plan.id === (planSelected ? planSelected.id : '') ? 'active' : '' "
               class="btn btn-warning btn-select-plan btn-lg btn-creative w-100" @click="selectPlan(plan)">¡Lo
              quiero!</a>
            <!--          <small class="d-block text-white mt-2 ms-1">No credit card required*</small>-->
          </div>
        </div>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  name: "ListPlan",
  data() {
    return {
      planSelected: null,
      options: {
        // type   : 'slide',
        // height: '5rem',
        // padding: '0.5rem',
        drag: true,
        // gap: '2rem',
        focus: 0,
        autoplay: false,
        perPage: 2,
        arrows: true,
        autoWidth: true,
        pagination: true,
        accessibility: false,
        trimSpace: true,
        breakpoints: {
          480: {
            arrows: true,
            // width: '30rem',
            autoWidth: true,
            drag: true,
            // type   : 'loop',
            perPage: 1,
            // gap: '1rem',
          },
        },
      },
    }
  },
  props:['plans'],
  methods: {
    selectPlan(plan) {
      this.planSelected = plan
      this.$emit('selectedPlan', this.planSelected)
    },

  },
}
</script>

<style scoped>

</style>
