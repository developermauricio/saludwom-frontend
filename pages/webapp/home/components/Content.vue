<template>
  <div>
    <client-only>
      <vue-confirm-dialog></vue-confirm-dialog>
    </client-only>
    <div class="container">
      <div class="add-new-contact-wrap">
        <a class="shadow" href="#" data-bs-toggle="modal" data-bs-target="#addnewcontact">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                 class="bi bi-calendar-week-fill text-white m-0" viewBox="0 0 16 16">
              <path
                d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
            </svg>
            <div class="content-text-button-float">
              <span class="m-auto text-button-float">Calendario</span>
            </div>
          </div>
        </a>
      </div>
      <!--=====================================
           SECTION PROFILE
       ======================================-->
      <div class="row">
        <div class="col-12">
          <SectionProfile/>
        </div>
      </div>
      <!--=====================================
           SECTION MENSAJE
       ======================================-->
      <div class="row">
        <div class="col-12 pr-5 pl-5">
          <p class="text-center text-primary font-italic">Junt@s seremos un equipo, tú y yo construiremos tu cambio, tú
            ganas y yo te acompaño para que lo consigas.</p>
        </div>
      </div>
      <div class="row g-3">
        <!--=====================================
           CREA TU VALORACIÓN
       ======================================-->
        <div class="col-6 col-sm-6 col-lg-6 mb-3" @click="verifySubscription()">
          <div class="card single-product-card">
            <div class="card-body p-3">
              <div class="product-thumbnail d-block text-center">
                <img src="@/assets/img/saludwom/valoracion.png" class="text-center" alt="" width="80">
                <a class="product-title d-block  text-title-card-home">Personaliza tu cambio</a>
              </div>
            </div>
          </div>
        </div>
        <!--=====================================
            MIS VALORACIONES
        ======================================-->
        <div class="col-6 col-sm-6 col-lg-6">
          <div class="card single-product-card">
            <div class="card-body p-3">
              <a class="product-thumbnail d-block text-center" href="page-shop-details.html">
                <img src="@/assets/img/saludwom/valoraciones.png" alt="" width="80">
                <a class="product-title d-block text-title-card-home" href="page-shop-details.html">Guía de
                  Recuperación</a>
              </a>
            </div>
          </div>
        </div>
        <!--=====================================
            COMPRAR PLANES
        ======================================-->
        <div class="col-6 col-sm-6 col-lg-6">
          <div class="card single-product-card">
            <div class="card-body p-3">
              <nuxt-link to="/webapp/plans" class="product-thumbnail d-block text-center">
                <img src="@/assets/img/saludwom/comprar.png" alt="" width="80">
                <nuxt-link to="/webapp/citas" class="product-title d-block text-truncate text-title-card-home">Comprar
                  planes
                </nuxt-link>
              </nuxt-link>
            </div>
          </div>
        </div>
        <!--=====================================
            LOGROS Y RECOMPENSAS
        ======================================-->
        <div class="col-6 col-sm-6 col-lg-6">
          <div class="card single-product-card">
            <div class="card-body p-3">
              <nuxt-link to="/webapp/doctors" class="product-thumbnail d-block text-center"
                         href="page-shop-details.html">
                <img src="@/assets/img/saludwom/certificate.png" alt="" width="80">
                <a class="product-title d-block text-truncate text-title-card-home"
                   href="page-shop-details.html">Exítos</a>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionProfile from "./SectionProfile";
import {bus} from "../../../../plugins/bus";

export default {
  name: "Content",
  components: {
    SectionProfile
  },
  data() {
    return {
      subscription: null,
    }
  },

  methods: {
    verifySubscription() {
      setTimeout(() =>{
        bus.$emit('verifySubscription');
      }, 500)

    },
    async openValuation() {
      // this.$vs.loading({
      //   color: process.env.COLOR_BASE,
      //   text: 'Verificando. Espere por favor...'
      // })
      // setTimeout(() =>{
      //   this.subscription = JSON.parse(localStorage.getItem('subscription'))
      // }, 500)

      // this.verifySubscription()

      if (!this.subscription) {
        this.$confirm(
          {
            message: 'No tienes una suscripción vigente, ¿quieres comprar?',
            button: {
              no: 'No',
              yes: 'Si'
            },
            /**
             * Callback Function
             * @param {Boolean} confirm
             */
            callback: async confirm => {
              if (confirm) {
                this.$router.push({name: 'index.plans'});
              }
            }
          })
        this.$vs.loading.close()
      } else {
        this.$vs.loading.close()
        this.$router.push({name: 'valuation.create'});
      }
    },
  },

  mounted() {
    setTimeout(() => {
      bus.$on('sendSubscription', (data) => {
        this.subscription = data
        if (this.subscription){
          this.openValuation()
        }
      })
    }, 500)
  }
}
</script>

<style scoped>

</style>
