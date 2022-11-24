<template>
  <div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <div class="login-back-button">
      <nuxt-link to="/login">
        <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
        </svg>
      </nuxt-link>
    </div>
    <!-- Login Wrapper Area -->
    <div v-if="!confirmRegister" class="login-wrapper d-flex align-items-center justify-content-center">
      <div class="custom-container">
        <div class="text-center px-4"><img class="login-intro-img" src="@/assets/img/saludwom/logo_saludwom.png" alt="">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-2">
          <h6 class="mb-3 text-center">Ingresa tu correo electrónico.</h6>

          <div v-if="messageServer" class="alert custom-alert-2 d-block alert-danger alert-dismissible fade show"
               role="alert">
            {{ messageServer }}.
          </div>
          <div>
            <div class="form-group">
              <label class="form-label" :class="{ 'text-danger': $v.form.email.$error }">Correo electrónico <span
                class="text-danger">*</span></label>
              <input
                v-model="form.email"
                class="form-control"
                type="email"
                :class="[{ 'is-invalid': $v.form.email.$error }]"
                placeholder="">
              <p class="text-danger mt-1 font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo electrónico
                válido</p>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El correo
                electrónico es requerido</p>
            </div>
            <button @click="resend" class="btn btn-primary w-100">Enviar link de vericación</button>
          </div>
        </div>
        <p class="mb-0 mt-2">Tienes una cuenta?
          <nuxt-link class="stretched-link" to="/login">Iniciar Sesión</nuxt-link>
        </p>
      </div>
    </div>
    <ConfirmRegister v-if="confirmRegister"/>
  </div>
</template>

<script>
import {email, required, sameAs} from "vuelidate/lib/validators";

export default {
  middleware: ['guest'],
  name: "Resend",
  data() {
    return {
      confirmRegister: false,
      messageServer: '',
      form: {
        email: String(),
      }
    }
  },
  validations: {
    form: {
      email: {required, email},
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
    },
    async resend() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Error',
          message: 'El correo electrónico es requerido.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }

      this.$confirm(
        {
          message: '¿Esta seguro de realizar la solicitud para una nueva verificación de tu cuenta?.',
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
              this.loading()
              await this.$axios.post(
                '/api/v1/verification/resend',
                this.form
              ).then(resp =>{
                this.$vs.loading.close()
                setTimeout(() => {
                  this.confirmRegister = true
                }, 500)
                this.$toast.success({
                  title: 'Confirmación',
                  message: 'Exitoso!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })
              }).catch(e =>{
                this.$vs.loading.close()
                if (e.response.status === 422) {
                  this.messageServer = e.response.data.errors.email
                }
              })
            }
          }
        })
    },
  },
  watch: {
    'form.email': function (val) {
      if (val) {
        this.messageServer = ''
      }
    },
  }
}
</script>

<style scoped>

</style>
