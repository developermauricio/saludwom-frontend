<template>
  <div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <!-- Back Button -->
    <!--    <div class="login-back-button fixed-top">-->
    <!--      <nuxt-link to="/login">-->
    <!--        <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"-->
    <!--             xmlns="http://www.w3.org/2000/svg">-->
    <!--          <path fill-rule="evenodd"-->
    <!--                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>-->
    <!--        </svg>-->
    <!--      </nuxt-link>-->
    <!--    </div>-->


    <div class="header-area" id="headerArea">
      <div class="container">
        <!-- Header Content -->
        <div class="header-content position-relative d-flex align-items-center justify-content-between">

          <!-- Back Button -->
          <div class="back-button">
            <nuxt-link to="/login">
              <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
              </svg>
            </nuxt-link>
          </div>
        </div>
        <!-- # Header Five Layout End -->
      </div>
    </div>
    <!-- Login Wrapper Area -->
    <div>

      <div class="container p-4" style="background-color: #ffffff" v-if="!confirmRegister">
        <div class="text-center px-4 mt-5" v-if="!confirmRegister">
          <img class="login-intro-img" src="@/assets/img/saludwom/logo_saludwom.png"
               width="400" alt="">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-4">
          <h6 class="mb-3 text-center mb-4">Que alegría que estés aquí... Estaremos más cerca!</h6>
          <div class="form-group text-start mb-3">
            <label class="form-label" :class="{ 'text-danger': $v.form.name.$error }">Nombres <span
              class="text-danger">*</span></label>
            <input
              class="form-control"
              type="text"
              v-model.trim="form.name"
              :class="{ 'is-invalid': $v.form.name.$error }"
              placeholder="">
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.name.$error">El nombre es requerido.</p>
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
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.lastName.$error">El apellido es requerido.</p>
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
              por favor ingrese otro.</p>
            <p class="text-danger mt-1 font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo electrónico
              válido.</p>
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El correo
              electrónico es requerido.</p>
          </div>
          <div class="form-group text-start mb-3">
            <label class="form-label" :class="{ 'text-danger': $v.form.phone.$error }">Teléfono <span
              class="text-danger">*</span></label>
            <vue-phone-number-input
              v-model="form.phone"
              color="#D85C72"
              @update="form.phoneI=$event.formatInternational"
              :class="{ 'is-invalid': $v.form.phone.$error }"
              :translations="{
  countrySelectorLabel: 'Código del país',
  countrySelectorError: 'Seleccione un país',
  phoneNumberLabel: 'Número de teléfono',
  example: 'Ejemplo :'
}"
            />
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.phone.$error">El teléfono es requerido.</p>
          </div>
          <!--  SELECCIONAR GENEROS -->
          <div class="mb-4">
            <label class="form-label" :class="{ 'text-danger': $v.form.gender.$error }">Género <span
              class="text-danger">*</span></label>
            <multiselect
              :class="{ 'is-invalid': $v.form.gender.$error }"
              v-model="form.gender"
              :options="genders"
              :searchable="true"
              :close-on-select="true"
              :custom-label="nameSelect"
              track-by="id"
              selectedLabel="Seleccionado"
              deselectLabel=""
              selectLabel="Selecciona"
              :show-labels="true"
              placeholder="Buscar género..."></multiselect>
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.gender.$error">El género es requerido.</p>
          </div>
          <!--  SELECCIONAR FECHA -->
          <div class="my-4">
            <label class="form-label" :class="{ 'text-danger': $v.form.birthday.$error }">Fecha de Nacimiento <span
              class="text-danger">*</span></label>
            <vuejs-datepicker
              placeholder="Selecciona una fecha"
              :input-class="{ 'is-invalid': $v.form.birthday.$error }"
              :typeable="true"
              v-model="form.birthday"
              :full-month-name="true"
              :language="es"
              format="yyyy-MM-dd"
              :bootstrap-styling="true"
            ></vuejs-datepicker>
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.birthday.$error">La fecha de nacimiento es requerida.</p>
          </div>
          <!--  SELECCIONAR PAÍS Y CIUDAD DE RESIDENCIA -->
          <CountriesCities @selectCountry="selectedCountry" @selectedCity="selectedCity"/>

          <!--  CONTRASEÑA -->
          <div class="form-group text-start mb-3 position-relative">
            <label class="form-label"
                   :class="[{ 'text-danger': $v.form.password.$error }, { 'text-danger': validatePassword }]">Contraseña
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
            <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.password_confirmation.$error">La confirmación de
              la
              contraseña es requerida</p>
          </div>

          <!--  Lista de planes-->
          <div v-show="plans">
            <IndexPlans class="mt-5"/>
          </div>

          <div v-if="!plans">
            <div class="mb-3" id="pswmeter"></div>
            <hr>
            <div class="mb-3 d-flex">
              <vs-checkbox
                color="#792151"
                v-model="form.accept">
              </vs-checkbox>
              <label class="form-check-label fw-normal" :class="{ 'text-danger': $v.form.accept.$error }"
                     for="checkedCheckbox">Aceptar términos y condiciones</label>
            </div>
            <!-- Recaptcha -->
            <div class="mb-2 d-flex justify-content-center">
              <recaptcha @success="onSuccess" @expired="onExpired"/>
            </div>
            <p class="text-danger font-weight-bold" v-if="$v.form.recaptcha.$invalid">Recaptcha es requerido.</p>
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
      <div class="container p-4" v-if="confirmRegister">
        <ConfirmRegister />
      </div>
    </div>
    <ChatFloat/>
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from "vuelidate/lib/validators";
import {bus} from "../../../plugins/bus";
import IndexPlans from "../../webapp/plans/IndexPlans";
import {en, es} from "vuejs-datepicker/dist/locale";

export default {
  components: {IndexPlans},
  middleware: ['guest'],
  name: "Register",
  data() {
    return {
      es: es,
      en: en,

      confirmRegister: false,
      validateEmailInput: false,
      validatePassword: false,
      plans: false,
      plan: null,
      genders: [],
      showPassword: false,
      showPasswordConfirm: false,
      form: {
        birthday: null,
        gender: null,
        name: String(),
        lastName: String(),
        phone: String(),
        phoneI: String(),
        country: null,
        city: null,
        email: null,
        password: String(),
        password_confirmation: String(),
        accept: false,
        recaptcha: null,
      },
    }
  },
  validations: {
    form: {
      name: {required},
      lastName: {required},
      gender: {required},
      birthday: {required},
      email: {required, email},
      phone: {required},
      password: {required, minLength: minLength(8)},
      password_confirmation: {sameAsPassword: sameAs('password')},
      recaptcha: {required},
      accept: {
        checked: value => value === true
      },
    },
  },
  methods: {
    nameSelect({name}) {
      return `${name}`
    },
    selectedCountry(data) {
      this.form.country = data
    },
    selectedCity(data) {
      this.form.city = data
    },
    onSuccess(token) {
      this.form.recaptcha = token
    },
    onExpired() {
      this.form.recaptcha = null
    },
    /*Obtener todos los géneros*/
    async getGenders() {
      await this.$axios.get('/api/v1/get-genders').then(resp => {
        this.genders = resp.data.data
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener los géneros. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
    async register() {
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

      this.$confirm(
        {
          message: '¿Esta seguro de realizar el registro? Enviaremos un correo electrónico para activar tu cuenta.',
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
              try {
                const resp = await this.$axios.post(
                  '/register',
                  this.form
                );
                if (resp.status === 200) {
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
                }
              } catch (e) {
                this.$vs.loading.close()
              }
            }
          }
        })
    },

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
    selectedPlan(data) {
      this.plan = data;
    },
    generateRecaptcha() {
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
          message: 'Error al verificar el correo electrónico. Consulte a soporte de SaludWom.',
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
        }, 1000);

      }
    },
  },
  mounted() {
    this.getGenders()
  }
}
</script>

<style scoped>
.header-area {
  background-color: transparent !important;
  border-bottom: none !important;
}
</style>
