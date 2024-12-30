CHECKOUT
<template>
  <div class="card-form">
    <div class="card-form__inner">
      <div>
        <img class="mb-3" src="@/assets/img/stripe/payment-method.png" alt="" style="width: 50%">
      </div>
      <div class="card-input">
        <label for="cardNumber" class="card-input__label" :class="{ 'is-invalid': $v.card.cardNumber.$error }">
          Número de tarjeta <span class="text-danger">*</span>
        </label>
        <input
          placeholder="XXXX XXXX XXXX XXXX"
          v-cardformat:formatCardNumber
          v-model="card.cardNumber"
          :class="{ 'is-invalid': $v.card.cardNumber.$error }"
          autofocus
          id="cardNumber"
          class="card-input__input"
          autocomplete="off"
        />
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label" :class="{ 'is-invalid': $v.card.name.$error }">
          Titular de la tarjeta <span class="text-danger">*</span>
        </label>
        <input
          :class="{ 'is-invalid': $v.card.name.$error }"
          id="cardName"
          class="card-input__input"
          v-model="card.name"
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label" :class="{ 'is-invalid': $v.card.cardExpiry.$error }">
              Fecha de Expiración <span class="text-danger">*</span>
            </label>
            <input
              :class="{ 'is-invalid': $v.card.cardExpiry.$error }"
              v-cardformat:formatCardExpiry
              id="cardExpiry"
              class="card-input__input"
              v-model="card.cardExpiry"
              autocomplete="off"
              placeholder="XX / XXXX"
            />
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label" :class="{ 'is-invalid': $v.card.cvc.$error }">CVC <span
              class="text-danger">*</span></label>
            <input
              placeholder="XXXX"
              v-cardformat:formatCardCVC
              class="card-input__input"
              id="cardCvv"
              v-model="card.cvc"
              autocomplete="off"
              :class="{ 'is-invalid': $v.card.cvc.$error }"
            />
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block" @click="paymentStripe">Pagar <strong>{{ (totalPay).toFixed(2)  | currency }}€</strong>
      </button>

    </div>
  </div>
</template>

<script>
import {required, minLength} from "vuelidate/lib/validators";
import {bus} from "../../../plugins/bus";

export default {

  name: "Stripe",
  data() {
    return {
      checkDocumentUser: false,
      errors: [],
      document: {
        number: null,
        documentType: null,
      },
      card: {
        amount: parseFloat(this.totalPay),
        cardExpiry: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        name: "",
        cvc: "",
        currentYear: new Date().getFullYear(),
        intent: null
      },
      user: this.$auth.user,
    };
  },
  props: ['planData', 'checkDocument', 'totalPay', 'couponApply'],

  validations: {
    card: {
      cardNumber: {required},
      cardExpiry: {required, minLength: minLength(9)},
      cvc: {required},
      name: {required},
    }
  },
  created() {
    bus.$on('dataDocument', (data) => {
      this.document.number = data.number
      this.document.documentType = data.documentType
    })
  },
  methods: {
    async paymentStripe() {
      this.$v.card.$touch();
      bus.$emit('validateDocument');
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Error',
          message: 'Verifique que todos los campos requeridos estén llenos o bien diligenciados.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      console.log(this.checkDocument)
      if (!this.checkDocument) {
        if (this.document.number === '' || this.document.number === null || !this.document.documentType) {
          this.$toast.error({
            title: 'Error',
            message: 'Verifique que todos los campos requeridos estén llenos o bien diligenciados.',
            showDuration: 1000,
            hideDuration: 8000,
          })
          return
        }
      }

      // let expirationDate = this.periodPlan(this.planData.period)
      // console.log(expirationDate)
      const data = new FormData()
      data.append('card_number', this.card.cardNumber);
      data.append('card_exp_month', this.card.expireMonth);
      data.append('card_exp_year', this.card.expireYear);
      data.append('cvc', this.card.cvc);
      data.append('amount', this.card.amount);
      data.append('total', this.planData.price);
      data.append('discount', this.couponApply.discountTotal);
      data.append('coupon', this.couponApply.coupon);
      data.append('email', this.user.email);
      data.append('plan', this.planData.id);
      data.append('plan', this.planData.id);
      data.append('plan_price_id', this.planData.stripe_plan_price_id);
      data.append('plan_name', this.planData.name);
      data.append('plan_period', this.planData.period);
      data.append('expiration_date_plan', this.planData.period);

      data.append('documentNumber', this.document.number)
      data.append('documentDocumentType', JSON.stringify(this.document.documentType))

      await this.$axios.get('/api/v1/checkout/intent').then(async resp => {
        this.$vs.loading({
          color: process.env.COLOR_BASE,
          text: 'Realizando intento de pago. Espere por favor...'
        })
        this.$vs.loading.close()
        // console.log('RESPUESTA INTENT', resp)
        await this.$axios.post('api/v1/checkout/payment', data).then(resp => {
          // this.$vs.loading({
          //   color: process.env.COLOR_BASE,
          //   text: 'Procesando pago. Espere por favor...'
          // })
          this.$vs.loading.close()
          // this.$router.push({name: 'index.subscriptions'});
          this.$toast.success({
            title: 'Confirmación',
            message: 'Exitoso!',
            showDuration: 1000,
            hideDuration: 5000,
          })
          bus.$emit('showConfirmation', true);
          this.$vs.loading.close()
          // console.log('RESPUESTA PAGO', resp)
        }).catch(e => {
          console.log(e.response.data)
          this.$toast.error({
            title: 'Error',
            message: 'Error, verifíque la fecha de expiración, veríque si tiene fondos o contacte al soporte SaludWom',
            showDuration: 1000,
            hideDuration: 12000,
          })
          console.log('ERROR PAYMENT ', e.response.data)
          this.$vs.loading.close()
        })
      }).catch(e => {
        this.$toast.error({
          title: 'Error',
          message: 'Error, verífque la fecha de expiración, veríque si tiene fondos o contacte al soporte SaludWom',
          showDuration: 1000,
          hideDuration: 12000,
        })
        this.$vs.loading.close()
        console.log('ERROR INTENT ', e.response)
      })
    },
  },
  watch: {
    'card.cardExpiry': function (val) {
      if (val) {
        this.card.expireMonth = val.substr(0, 2)
        // console.log('MES',val.substr(0,2))
        this.card.expireYear = val.substr(4, 6)
      }
    }
  },
  mounted() {
    // setTimeout(() =>{
    //   bus.$on('checkDocumentUser', (data) =>{
    //     this.checkDocumentUser = data
    //   })
    // }, 500)

  }
}
</script>

<style scoped lang="scss">
.card-container {
  margin: 30px auto 50px auto;
}

.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;

  &__inner {
    background: #fff;
    //box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
    border-radius: 10px;
    padding: 20px;
  }

  &__row {
    display: flex;
    align-items: flex-start;
  }

  &__col {
    flex: auto;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    &.-cvv {
      max-width: 150px;
    }
  }

  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .card-input__input {
      flex: 1;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__button {
    width: 100%;
    height: 55px;
    background: #38a294;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      background: darken(#38a294, 5%);
    }
  }
}

.card-input {
  margin-bottom: 20px;

  &__label {
    margin-bottom: 5px;
    color: #1a3b5d;
    width: 100%;
    display: block;
    text-align: left;
  }

  &__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: #1a3b5d;

    &:hover,
    &:focus {
      border-color: rgba(216, 92, 114, 0.33);
    }

    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }
  }
}
</style>


