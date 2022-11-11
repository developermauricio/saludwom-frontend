<template>
  <div class="m-0">
    <div v-if="!confirmPay" class="mb-0">
      <div class="container" v-if="showPlans">
        <div class="container mb-4 d-flex justify-content-center align-self-center" v-if="!plans.length > 0">
          <h5 class="">No hay planes disponibles</h5>
        </div>
        <div v-else>
          <ListPlan @selectedPlan="selectedPlan" :plans="plans"/>
          <div class="apply-coupon mt-4">
            <h6 class="mb-0">¿Tienes un cupón?</h6>
            <p class="mb-2">Introduce tu código de cupón aquí y obtén increíbles descuentos!</p>
            <div class="coupon-form">
              <form action="#">
                <div class="form-group">
                  <div class="input-group">
                    <input class="form-control input-group-text text-start" type="text"
                           placeholder="INGRESA AQUÍ TU CUPÓN">
                    <button class="btn btn-primary">Aplicar</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="mb-3 d-flex">
              <vs-checkbox color="#792151" v-model="accept"></vs-checkbox>
              <label class="form-check-label text-muted fw-normal" for="checkedCheckbox">Aceptar términos y
                condiciones</label>
            </div>
            <button :disabled="!accept" class="btn btn-primary w-100" @click="openCheckout">Pagar {{
                plan ? plan.title : ''
              }}
              <!--          <strong style="font-size: 1.2rem">{{ plan ? plan.price+'€' : '' }}</strong> & Registrar-->
              <strong style="font-size: 1.2rem">{{ plan ? plan.price + '€' : '' }}</strong>
            </button>
          </div>

        </div>
        <div>
          <!--=====================================
                MODAL CHECKOUT
              ======================================-->
          <b-modal
            ref="drag"
            v-model="openModalCheckout"
            class="modal-checkout"
            id="modal-modal-checkout"
            @closeModal="closeModal"
            @hide="onHideModal"
            modal-backdrop
            centered
            title=""
            hide-footer
          >
            <h4
              class="text-center mb-4 title-edit-icon pt-4"
              style="
          font-weight: 500 !important;
          margin-top: -3.5rem;
        "
            >
              <!--          Agendar Citas-->
            </h4>
            <div>
              <Checkout @closeModal="closeModal" :plan="plan"/>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
    <ConfirmPay v-else/>
  </div>
</template>

<script>
import {bus} from "../../../plugins/bus";

export default {
  name: "IndexPlans",
  components: {},

  data() {
    return {
      confirmPay: false,
      showPlans: false,
      plans: [],
      plan: null,
      accept: false,
      openModalCheckout: false,
    }
  },
  methods: {
    openCheckout() {
      if (!this.plan) {
        this.$toast.error({
          title: 'Por favor',
          message: 'Para continuar selecciona un plan.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      this.openModalCheckout = true
      bus.$emit('planSendStripe', this.plan)
      this.$emit('planSendCheckout', this.plan)
    },
    selectedPlan(data) {
      this.plan = data;

    },
    closeModal() {

      this.openModalCheckout = false
      this.$root.$emit("bv::hide::modal", "modal-checkout");
    },
    onHideModal(evt) {
      if (evt.trigger === "backdrop") {
        evt.preventDefault();
        this.handleBackdrop();
      }
      if (evt.trigger === "headerclose") {
        this.openModalCheckout = false;
      }
    },
    handleBackdrop() {
      console.log("Backdrop clicked");
    },
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
    },
    /*Obtener todos los planes*/
    async getPlans() {
      await this.$axios.get('/api/v1/get-plans').then(resp => {
        this.plans = resp.data.data
        this.$vs.loading.close()
        this.showPlans = true
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener los planes. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.showPlans = true
        this.$vs.loading.close()
      })
    },
  },
  watch: {
    'plan': function (val) {
      if (val) {
        bus.$emit('planSendStripe', val)
      }
    }
  },
  mounted() {
    this.loading()
    this.getPlans()
    bus.$on('showConfirmation', (data) => {
      setTimeout(() =>{
        this.confirmPay = true
      }, 500)

    })
  }
}
</script>

<style scoped>

</style>
