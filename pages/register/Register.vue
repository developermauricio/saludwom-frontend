<template>
  <div>
    <!-- Back Button -->
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
    <div class="login-wrapper d-flex align-items-center justify-content-center">
      <div class="custom-container">
        <div class="text-center px-4"><img class="login-intro-img" src="@/assets/img/saludwom/logo_saludwom.png" alt="">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-3">
          <h6 class="mb-3 text-center mb-5">Que alegría que estés aquí... Estaremos más cerca!</h6>
            <div class="form-group text-start mb-3">
              <label class="form-label" :class="{ 'text-danger': $v.form.name.$error }">Nombres <span
                class="text-danger">*</span></label>
              <input
                class="form-control"
                type="text"
                v-model.trim="form.name"
                :class="{ 'is-invalid': $v.form.name.$error }"
                placeholder="">
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.name.$error">El nombre es requerido</p>
            </div>
            <div class="form-group text-start mb-3">
              <label class="form-label" :class="{ 'text-danger': $v.form.lastName.$error }">Apellidos <span
                class="text-danger">*</span></label>
              <input
                class="form-control"
                type="text"
                v-model.trim="form.lastName"
                :class="{ 'is-invalid': $v.form.lastName.$error }"
                placeholder="">
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.lastName.$error">El apellido es requerido</p>
            </div>
            <div class="form-group text-start mb-3">
              <label class="form-label" :class="{ 'text-danger': $v.form.email.$error }">Correo electrónico <span
                class="text-danger">*</span></label>
              <input
                class="form-control"
                type="email" placeholder=""
                v-model.trim="form.email"
                :class="[{ 'is-invalid': $v.form.email.$error }, {'is-invalid': validateEmailInput}]"
              >
              <p class="text-danger mt-1 font-weight-bold" v-if="validateEmailInput">El correo electrónico ya ha sido
                registrado,
                por favor ingrese otro</p>
              <p class="text-danger mt-1 font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo electrónico
                válido</p>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El correo
                electrónico es requerido</p>
            </div>
            <div class="form-group text-start mb-3">
              <label class="form-label" :class="{ 'text-danger': $v.form.phone.$error }">Teléfono <span
                class="text-danger">*</span></label>
              <vue-phone-number-input
                v-model="form.phone"
                color="#D85C72"
                :class="{ 'is-invalid': $v.form.phone.$error }"
                :translations="{
  countrySelectorLabel: 'Código del país',
  countrySelectorError: 'Seleccione un país',
  phoneNumberLabel: 'Número de teléfono',
  example: 'Ejemplo :'
}"
              />
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.phone.$error">El teléfono es requerido</p>
            </div>
            <!--  SELECCIONAR PAÍS Y CIUDAD DE RESIDENCIA -->
            <CountriesCities/>

            <!--  CONTRASEÑA -->
            <div class="form-group text-start mb-3 position-relative">
              <label class="form-label"
                     :class="[{ 'text-danger': $v.form.password.$error }, { 'text-danger': validatePassword }]">Contraseña
                <span class="text-danger">*</span></label>
              <div class="d-flex">
                <input v-if="showPassword"
                       v-model.trim="form.password"
                       class="form-control"
                       :class="[{ 'is-invalid': $v.form.password.$error }, {'is-invalid': validatePassword}]"
                       type="text"
                       placeholder="">
                <input v-else
                       v-model.trim="form.password"
                       :class="[{ 'is-invalid': $v.form.password.$error }, {'is-invalid': validatePassword}]"
                       type="password"
                       class="form-control">
                <div class="d-flex justify-content-center align-items-center show-password" @click="toggleShow">
                  <i :class="{ 'bx bx-show': showPassword, 'bx bx-low-vision': !showPassword }"></i>
                </div>
              </div>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.password.$error">La contraseña es requerida</p>
            </div>

            <div class="form-group text-start mb-3 position-relative">
              <label class="form-label"
                     :class="[{ 'text-danger': $v.form.confirmedPassword.$error }, { 'text-danger': validatePassword }]">Confirmar
                Contraseña <span class="text-danger">*</span></label>
              <div class="d-flex">
                <input v-if="showPasswordConfirm"
                       class="form-control"
                       :class="[{ 'is-invalid': $v.form.confirmedPassword.$error }, {'is-invalid': validatePassword}]"
                       type="text"
                       v-model.trim="form.confirmedPassword"
                       placeholder="">
                <input v-else
                       type="password"
                       v-model.trim="form.confirmedPassword"
                       :class="[{ 'is-invalid': $v.form.confirmedPassword.$error }, {'is-invalid': validatePassword}]"
                       class="form-control">
                <div class="d-flex justify-content-center align-items-center show-password" @click="toggleShowConfirm">
                  <i :class="{ 'bx bx-show': showPasswordConfirm, 'bx bx-low-vision': !showPasswordConfirm }"></i>
                </div>
              </div>
              <p v-if="validatePassword" class="text-danger mt-1 font-weight-bold">La contraseña no coincide</p>
              <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.confirmedPassword.$error">La confirmación de la
                contraseña es requerida</p>
            </div>
            <hr>
            <!--=====================================
              PLANES
            ======================================-->
            <!--  Activar planes-->
            <div>
              <h6 class="mb-3">¿Deseas adquirir tu plan ahora mismo?</h6>
              <div class="d-flex">
                <vs-checkbox color="#792151" v-model="plans">Si quiero</vs-checkbox>
              </div>
            </div>
            <!--  Lista de planes-->
            <div v-if="plans">
              <ListPlan @selectedPlan="selectedPlan"/>

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
              </div>
            </div>
            <hr>
            <div class="mb-3" id="pswmeter"></div>
            <div class="mb-3 d-flex">
              <vs-checkbox
                color="#792151"
                v-model="form.accept">
              </vs-checkbox>
              <label class="form-check-label fw-normal" :class="{ 'text-danger': $v.form.accept.$error }"
                     for="checkedCheckbox">Aceptar términos y condiciones</label>
            </div>
            <!-- Recaptcha -->
            <div class="mb-4 d-flex justify-content-center">
              <recaptcha @success="onSuccess"/>
              <div
                role="alert"
                class="invalid-feedback"
                v-if="$v.form.recaptcha.$error"
              >
                <strong v-if="!$v.form.recaptcha.required"
                >The Recaptcha is required.</strong
                >
              </div>
            </div>
            <button v-if="plans" :disabled="!form.accept" class="btn btn-primary w-100" type="submit">Pagar
              {{ plan ? plan.title : '' }} <strong style="font-size: 1.2rem">{{ plan ? plan.price : '' }}</strong> &
              Registrar
            </button>
            <button v-else class="btn btn-primary w-100" :disabled="!form.accept" @click="register()">Registrar</button>
        </div>
        <!-- Login Meta -->
        <div class="login-meta-data text-center">
          <p class="mt-3 mb-0">Tienes una cuenta?
            <nuxt-link class="stretched-link" to="/login">Inicia Sesión</nuxt-link>
          </p>
        </div>
      </div>
    </div>

    <ChatFloat/>
  </div>
</template>

<script>
import {required, email, requiredIf} from "vuelidate/lib/validators";
import {bus} from "../../plugins/bus";

export default {
  name: "Register",
  data() {
    return {
      validateEmailInput: false,
      validatePassword: false,
      plans: false,
      plan: null,
      showPassword: false,
      showPasswordConfirm: false,
      form: {
        name: String(),
        lastName: String(),
        phone: String(),
        country: null,
        city: null,
        email: null,
        password: String(),
        confirmedPassword: String(),
        accept: false,
        recaptcha: null,
      },
    }
  },
  validations: {
    form: {
      name: {required},
      lastName: {required},
      email: {required, email},
      phone: {required},
      password: {required},
      confirmedPassword: {required},
      recaptcha: {required},
      accept: {
        checked: value => value === true
      },
    },
  },
  methods: {
    onSuccess(token){
      this.form.recaptcha = token
    },
    async register() {
      // console.log(this.$recaptcha.execute)
      // this.form.recaptcha = await this.$recaptcha.getResponse()
      this.$v.form.$touch();
      bus.$emit('validateCountry');
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Error',
          message: 'Verifique que todos los campos requeridos esten llenos.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }


      this.$toast.success({
        title: 'Confirmación',
        message: 'Exitoso!',
        showDuration: 1000,
        hideDuration: 5000,
      })
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    },
    selectedPlan(data) {
      this.plan = data;
    },
    generateRecaptcha(){
      this.$refs.recaptcha.execute();
    },
    async validateEmail(email) {
      await this.$axios.get(`/api/v1/verify-email-user/${email}`).then(resp => {
        if (resp.data.data !== 300) {
          this.validateEmailInput = true
        }
      }).catch(e => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al verificar el correo electrónico. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      });
      this.$vs.loading.close()
    }
  },
  watch: {
    'form.email': function (val) {
      if (val) {
        this.validateEmailInput = false
        if (this.time) {
          clearTimeout(this.time)
        }

        this.time = setTimeout(() => {
          this.$vs.loading({
            color: process.env.COLOR_BASE,
            text: 'Validando correo electrónico...'
          })
          this.validateEmail(val)
        }, 2000);

      }
    },
    'form.confirmedPassword': function (val) {
      if (val) {
        if (val !== this.form.password) {
          this.validatePassword = true
        } else {
          this.validatePassword = false
        }
      }
    },
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
