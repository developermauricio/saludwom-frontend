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
            <p class="mb-2">Selecciona un plan e introduce tu código de cupón aquí y obtén increíbles descuentos!</p>
            <div class="coupon-form">
              <div class="form-group mb-3">
                <div class="input-group">
                  <input class="form-control"
                         v-model="coupon"
                         type="text"
                         :disabled="plan == null"
                         placeholder="INGRESA AQUÍ TU CUPÓN">

                  <button @click="applyCoupon" class="btn btn-primary">Aplicar</button>
                </div>
                <p class="text-success mt-1 font-weight-bold" v-if="messageDiscount.state">Cupón aplicado
                  exitosamente!!</p>
              </div>
            </div>
            <div class="content-information-pay mb-4" v-if="plan">
              <div class="total d-flex align-items-center">
                <h6 class="m-0">Plan Seleccionado:</h6>
                <p class="text-dark m-0 ml-2" style="font-size: 1rem">{{
                    plan ? plan.name : 'Ningún plan seleccionado'
                  }}</p>
              </div>
              <div class="total d-flex align-items-center">
                <h6 class="m-0">Valor Plan:</h6>
                <p class="text-dark m-0 ml-2" style="font-size: 1rem">{{ (plan.price).toFixed(2)  | currency }}€</p>
              </div>
              <div class="discount d-flex align-items-center">
                <h6 class="m-0">Descuento: </h6>
                <p class="text-success m-0 ml-2" style="font-size: 1rem">
                  {{ messageDiscount.discount ? messageDiscount.discount + '%' : '0%' }}</p>
              </div>
              <div class="total d-flex align-items-center">
                <h6 class="m-0">Total a Pagar:</h6>
                <p class="text-dark m-0 ml-2" style="font-size: 1rem">{{ (totalPay).toFixed(2)  | currency }}€</p>
              </div>
            </div>
            <div class="mb-3 d-flex">
              <vs-checkbox color="#792151" v-model="accept"></vs-checkbox>
              <label class="form-check-label text-muted fw-normal" for="checkedCheckbox">Aceptar términos y
                condiciones</label>
            </div>
            <button :disabled="!accept" id="payment-button" class="btn btn-primary w-100" @click="openCheckout">Pagar {{
                plan ? plan.title : ''
              }}
              <!--          <strong style="font-size: 1.2rem">{{ plan ? plan.price+'€' : '' }}</strong> & Registrar-->
              <strong style="font-size: 1.2rem">{{ plan ? (totalPay).toFixed(2)  + '€' : '' }}</strong>
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
              <Checkout @closeModal="closeModal" :plan="plan" :totalPay="totalPay" :couponApply="messageDiscount"/>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
    <ConfirmPay  v-else/>
  </div>
</template>

<script>
import {bus} from "@/plugins/bus";

export default {
  name: "IndexPlans",
  components: {},

  data() {
    return {
      confirmPay: false,
      showPlans: false,
      plans: [],
      plan: null,
      coupon: '',
      accept: false,
      openModalCheckout: false,
      messageDiscount: {state: false, discount: null, plan: null, coupon: null, discountTotal: null},
      totalPay: null,
    }
  },
  methods: {
    eventSelectScroll(option) {
      const options = {
        container: "body",
        easing: "linear"
      };
      setTimeout(() => {
        this.$scrollTo(option, 1000, options);
      }, 100);
    },
    async applyCoupon() {
      if (!this.plan) {
        this.$toast.error({
          title: 'Por favor',
          message: 'Para aplicar el cupón, selecciona un plan.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      if (!this.coupon) {
        this.$toast.error({
          title: 'Por favor',
          message: 'Para aplicar, ingresa tu cupón.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      let applyCoupon = {
        plan: this.plan,
        coupon: this.coupon
      }
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Validando cupón. Espere por favor...'
      })

      setTimeout( async ()  =>{
        await this.$axios.post('/api/v1/apply-coupon', applyCoupon).then(res => {
          this.$vs.loading.close()

          let exceptPlans = JSON.parse(res.data.plans)

          if (res.data.plans){
            let existPlan = exceptPlans.some(exceptPlan =>{

              return exceptPlan.id === this.plan.id
            })

            if (existPlan){
              return  this.$toast.error({
                title: 'Atención',
                message: `Lo sentimos, el cupón no puede ser aplicado al ${this.plan.name}.`,
                showDuration: 1000,
                hideDuration: 8000,
              })
            }
          }


          if (res.status === 202) {
            this.$toast.error({
              title: 'Por favor',
              message: res.data.message,
              showDuration: 1000,
              hideDuration: 8000,
            })
            this.$vs.loading.close()
          } else {

            if (this.messageDiscount.discount === null && this.messageDiscount.plan !== this.plan.id) {
              this.totalPay = this.totalPay - ((this.totalPay * res.data.coupon.discount) / 100)
              this.messageDiscount = {state: true, discount: res.data.coupon.discount, discountTotal:this.totalPay, plan: this.plan.id, coupon: res.data.coupon.id}
              this.$toast.success({
                title: 'Confirmación',
                message: 'Cupón aplicado exitosamente!',
                showDuration: 1000,
                hideDuration: 5000,
              })
              this.$vs.loading.close()
            }else{
              this.$toast.success({
                title: 'Confirmación',
                message: 'Cupón ya aplicado!',
                showDuration: 1000,
                hideDuration: 5000,
              })
              this.$vs.loading.close()
            }

          }
        }).catch(e => {
          console.log(e, 'ERROR AL APLICAR EL CUPÓN')
          this.$toast.error({
            title: 'Atención',
            message: 'Error al aplicar cupón.',
            showDuration: 1000,
            hideDuration: 8000,
          })
        })
      }, 500)

    },
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
      this.totalPay = data.price
      setTimeout(() =>{
        this.eventSelectScroll('#payment-button')
      }, 200)

      if (this.coupon) {
        this.messageDiscount.discount = null
        this.applyCoupon()
      }

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
      await this.$axios.get('/api/v1/get-plans-order').then(resp => {
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
    },
    'coupon': function (val) {
      if (val) {
        this.messageDiscount = {state: false, discount: null, plan: null, discountTotal: null, coupon: null}
        this.totalPay = this.plan.price
      }
    }
  },
  mounted() {
    this.loading()
    this.getPlans()
    bus.$on('showConfirmation', (data) => {
      setTimeout(() => {
        this.confirmPay = true
      }, 500)

    })
  },

}
</script>

<style scoped>

</style>
