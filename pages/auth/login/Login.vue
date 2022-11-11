<template>
  <div>
    {{ $auth.loggedIn}}
    <div class="login-back-button"><a href="element-hero-blocks.html">
      <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
      </svg>
    </a></div>
    <!-- Login Wrapper Area -->
    <div class="login-wrapper d-flex align-items-center justify-content-center">
      <div class="custom-container">
        <div class="text-center px-4"><img class="login-intro-img" src="@/assets/img/saludwom/logo_saludwom.png" alt="">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-2">
          <h6 class="mb-3 text-center">Inicie sesión para continuar.</h6>
          <div v-if="messageInvalid" class="alert custom-alert-2 alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-x-circle"></i>
            {{ messageInvalid[0]  }}
            <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button"
                    data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div v-if="messageActiveAccount" class="alert custom-alert-2 d-block alert-danger alert-dismissible fade show"
               role="alert">
            {{ messageActiveAccount }}.
            <div>
              <nuxt-link to="/resend" class="text-white" style="margin-left: 10px">Clic para reenviar el correo electrónico de verificación.</nuxt-link>
            </div>
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
            <div class="form-group position-relative">
              <label class="form-label"
                     :class="[{ 'text-danger': $v.form.password.$error }]">Contraseña
                <span class="text-danger">*</span></label>
              <div class="d-flex">
                <input v-if="showPassword"
                       v-model.trim="form.password"
                       class="form-control"
                       :class="[{ 'is-invalid': $v.form.password.$error }]"
                       type="text"
                       placeholder="">
                <input v-else
                       v-model.trim="form.password"
                       :class="[{ 'is-invalid': $v.form.password.$error }]"
                       type="password"
                       class="form-control">
                <div class="d-flex justify-content-center align-items-center show-password" @click="toggleShow">
                  <i :class="{ 'bx bx-show': showPassword, 'bx bx-low-vision': !showPassword }"></i>
                </div>
              </div>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.password.$error">La contraseña es requerida</p>
            </div>
            <button @click="login" class="btn btn-primary w-100">Iniciar Sesión</button>
          </div>
        </div>
        <!-- Login Meta -->
        <div class="login-meta-data text-center">
          <nuxt-link class="stretched-link forgot-password d-block mt-3 mb-1"
           to="/password/email">Has olvidado tu contraseña?</nuxt-link>
          <p class="mb-0">Aún no te has registrado?
            <nuxt-link class="stretched-link" to="/register">Registrate ahora</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {email, required, sameAs} from "vuelidate/lib/validators";
import {guest} from "../../../middleware/guest";
export default {
  name: 'Login',
  auth: false,
  // middleware: 'guest',
  data() {
    return {
      showPassword: false,
      messageInvalid: '',
      messageActiveAccount: '',
      form: {
        // email: String(),
        // password: String(),
        email: 'developer.mauricio2310@gmail.com',
        password: 'cantare.de.2310'
      }
    }
  },
  beforeCreate() {
    // if (this.$auth.loggedIn) {
    //   return this.$router.push('/webapp/inicio')
    // }
  },
  created() {
    // console.log(this.$auth.loggedIn)
    // guest()
  },
  validations: {
    form: {
      email: {required, email},
      password: {required}
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
    async login() {
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
      this.loading()
      const loginSuccess = await this.$auth.loginWith('local', {
        data: this.form
      }).then(res => {
          // this.$auth.setUser(res.data.user)
          this.$router.push({name: 'webapp'});
          this.$vs.loading.close()
        })
        .catch(e => {
          this.$vs.loading.close()
          if (e.response.status === 422) {
            this.messageActiveAccount = e.response.data.errors.verification ? e.response.data.errors.verification : null
            this.messageInvalid = e.response.data.errors.email ? e.response.data.errors.email : ''
          }

        })

      // if (loginSuccess) {
      //   await this.$auth.setUser(this.form)
      // }
    }
  },
  watch: {
    'form.email': function (val) {
      if (val) {
        this.messageInvalid = ''
        this.messageActiveAccount = ''
      }
    },
    'form.password': function (val) {
      if (val) {
        this.messageInvalid = ''
        this.messageActiveAccount = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
