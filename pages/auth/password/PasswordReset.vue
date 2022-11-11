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
    <div v-if="!confirmSuccess" class="login-wrapper d-flex align-items-center justify-content-center">
      <div class="custom-container">
        <div class="text-center px-4"><img class="login-intro-img" src="@/assets/img/saludwom/logo_saludwom.png" alt="">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-2">
          <h6 class="mb-3 text-center">Restablecer Contraseña</h6>
          <nuxt-link to="/password/email">
            <div v-if="messageServer" class="alert custom-alert-2 d-block alert-danger alert-dismissible fade show"
                 role="alert">
              {{ messageServer }}
            </div>
          </nuxt-link>
          <div>
            <div class="form-group">
              <label class="form-label" :class="{ 'text-danger': $v.form.email.$error }">Correo electrónico <span
                class="text-danger">*</span></label>
              <input
                v-model="form.email"
                class="form-control"
                type="email"
                readonly
                disabled
                :class="[{ 'is-invalid': $v.form.email.$error }]"
                placeholder="">
              <p class="text-danger mt-1 font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo electrónico
                válido</p>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El correo
                electrónico es requerido</p>
            </div>

            <div class="form-group text-start mb-3 position-relative">
              <label class="form-label"
                     :class="[{ 'text-danger': $v.form.password.$error }, { 'text-danger': validatePassword }]">Nueva
                Contraseña
                <span class="text-danger">*</span></label>
              <div class="d-flex">
                <input v-if="showPassword"
                       v-model.trim="form.password"
                       class="form-control"
                       :class="[{ 'is-invalid': $v.form.password.$error }, {'is-invalid': validatePassword}, {'is-invalid': !$v.form.password.minLength}]"
                       type="text"
                       placeholder="">
                <input v-else
                       v-model.trim="form.password"
                       :class="[{ 'is-invalid': $v.form.password.$error }, {'is-invalid': validatePassword}, {'is-invalid': !$v.form.password.minLength}]"
                       type="password"
                       class="form-control">
                <div class="d-flex justify-content-center align-items-center show-password" @click="toggleShow">
                  <i :class="{ 'bx bx-show': showPassword, 'bx bx-low-vision': !showPassword }"></i>
                </div>
              </div>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.password.$error">La contraseña es requerida</p>
              <p class="text-danger font-weight-bold" v-if="!$v.form.password.minLength">La contraseña debe contener
                mínimo 8 caracteres</p>
            </div>
            <div class="form-group text-start mb-3 position-relative">
              <label class="form-label"
                     :class="[{ 'text-danger': $v.form.password_confirmation.$error }, { 'text-danger': validatePassword }]">Confirmar
                Nuevo
                Contraseña <span class="text-danger">*</span></label>
              <div class="d-flex">
                <input v-if="showPasswordConfirm"
                       class="form-control"
                       :class="[{ 'is-invalid': $v.form.password_confirmation.$error }, {'is-invalid': validatePassword}, {'is-invalid': !$v.form.password_confirmation.sameAsPassword}]"
                       type="text"
                       v-model.trim="form.password_confirmation"
                       placeholder="">
                <input v-else
                       type="password"
                       v-model.trim="form.password_confirmation"
                       :class="[{ 'is-invalid': $v.form.password_confirmation.$error }, {'is-invalid': validatePassword}, {'is-invalid': !$v.form.password_confirmation.sameAsPassword}]"
                       class="form-control">
                <div class="d-flex justify-content-center align-items-center show-password" @click="toggleShowConfirm">
                  <i :class="{ 'bx bx-show': showPasswordConfirm, 'bx bx-low-vision': !showPasswordConfirm }"></i>
                </div>
              </div>
              <p v-if="!$v.form.password_confirmation.sameAsPassword" class="text-danger mt-1 font-weight-bold">La
                contraseña no coincide</p>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.password_confirmation.$error">La confirmación
                de la
                contraseña es requerida</p>
            </div>
            <button @click="resetPassword" class="btn btn-primary w-100">Restablecer Contraseña</button>
          </div>
        </div>
        <p class="mb-0 mt-2">Tienes una cuenta?
          <nuxt-link class="stretched-link" to="/login">Iniciar Sesión</nuxt-link>
        </p>
      </div>
    </div>
    <ConfirmResetPassword v-if="confirmSuccess"/>
  </div>
</template>

<script>
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";

export default {
  middleware: ['guest'],
  name: "PasswordReset",
  data() {
    return {
      messageServer: false,
      confirmSuccess: false,
      showPassword: false,
      showPasswordConfirm: false,
      validatePassword: false,
      form: {
        email: String(),
        password: String(),
        password_confirmation: String(),
        token: String(),
      }
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required, minLength: minLength(8)},
      password_confirmation: {sameAsPassword: sameAs('password')},
    },
  },
  methods: {
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    },
    async resetPassword() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Error',
          message: 'Verifique que todos los campos requeridos esten llenos.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      this.$confirm(
        {
          message: '¿Esta seguro de restablecer tu contraseña?.',
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
                '/api/v1/password/reset',
                this.form
              ).then(resp => {
                this.$vs.loading.close()
                setTimeout(() => {
                  this.confirmSuccess = true
                }, 500)
                this.$toast.success({
                  title: 'Confirmación',
                  message: 'Exitoso!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })
              }).catch(e => {
                this.$vs.loading.close()
                if (e.response.status === 422) {
                  console.log(e.response);
                  this.messageServer = e.response.data.email
                }
              })
            }
          }
        })
    },
  },
  create() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.query.token
  },
  mounted() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  }
}
</script>

<style scoped>

</style>
