<template>
  <div>
    <div class="container">
      <vue-confirm-dialog></vue-confirm-dialog>
      <!--=====================================
		    COMPONENTE CARD PROFILE
    ======================================-->
      <CardProfile/>

      <!--=====================================
		    COMPONENTE USUARIO INFORMACIÓN
    ======================================-->
      <div class="card user-data-card">
        <div class="card-body">
          <vs-tabs color="#D85C72" alignment="fixed">
            <vs-tab label="Datos Personales">
              <div class="register-form mt-4">
                <h6 class="mb-3 text-center mb-4">Actualizar Información Personal</h6>
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
                  <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.lastName.$error">El apellido es
                    requerido.</p>
                </div>
                <div class="form-group text-start mb-3">
                  <label class="form-label" :class="{ 'text-danger': $v.form.email.$error }">Correo electrónico (no se
                    puede actualizar)<span
                      class="text-danger">*</span></label>
                  <input
                    disabled
                    class="form-control"
                    type="email" placeholder=""
                    v-model.trim="form.email"
                    :class="[{ 'is-invalid': $v.form.email.$error }, {'is-invalid': validateEmailInput}]"
                  >
                  <p class="text-danger mt-1 font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo electrónico
                    válido.</p>
                  <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El
                    correo
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
                  <label class="form-label" :class="{ 'text-danger': $v.form.birthday.$error }">Fecha de Nacimiento
                    <span
                      class="text-danger">*</span></label>
                  <vuejs-datepicker
                    placeholder="Selecciona una fecha"
                    :input-class="{ 'is-invalid': $v.form.birthday.$error }"
                    :typeable="true"
                    :open-date="form.birthday"
                    v-model="form.birthday"
                    :full-month-name="true"
                    :language="es"
                    format="yyyy-MM-dd"
                    :bootstrap-styling="true"
                  ></vuejs-datepicker>
                  <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.birthday.$error">La fecha de nacimiento es
                    requerida.</p>
                </div>
                <!--  SELECCIONAR PAÍS Y CIUDAD DE RESIDENCIA -->
                <CountriesCities :countryData="form.country" :cityData="form.city" @selectCountry="selectedCountry"
                                 @selectedCity="selectedCity"/>

                <!-- Botón Actualizar -->
                <button class="btn btn-primary btn-block" @click="updateInformation">Actualizar</button>
              </div>
            </vs-tab>
            <vs-tab label="Cambiar Contraseña">
              <ChangePassword :userId="user.id"/>
            </vs-tab>
          </vs-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CardProfile from "./components/CardProfile";
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
import {en, es} from "vuejs-datepicker/dist/locale";
import {bus} from "../../../plugins/bus";
import ChangePassword from "../../../components/profile/ChangePassword";

export default {
  name: "InfoProfile",
  data() {
    return {
      es: es,
      en: en,
      validateEmailInput: false,
      genders: [],
      user: {
        id: null
      },
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
        roles: [],
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
      phone: {required}
    },
  },
  components: {
    ChangePassword,
    CardProfile
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
    updateInformation() {

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
          message: '¿Esta seguro de actualizar?.',
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
              this.$axios.post(`api/v1/update-data-patient/${this.user.id}`, this.form).then(resp => {
                this.$toast.success({
                  title: 'Confirmación',
                  message: 'Exitoso!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })
                this.$vs.loading.close()
                this.$auth.user.name = this.form.name
                this.$auth.user.last_name = this.form.lastName

                this.$auth.setUser(this.$auth.user)
              }).catch((e) => {
                console.log(e)
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al actualizar. Consulte a soporte de SaludWom.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
                this.$vs.loading.close()
              })
            }
          }
        })
    },
    getUserData() {
      this.$axios.get('api/v1/user').then(resp => {

        console.log('RESPUESTA => ', resp.data.user)
        this.form.name = resp.data.user.name
        this.form.lastName = resp.data.user.last_name
        this.form.email = resp.data.user.email
        this.form.phone = resp.data.user.phone
        this.form.gender = resp.data.user.patient.gender
        this.form.birthday = resp.data.user.birthday
        this.form.country = resp.data.user.city.country
        this.form.city = resp.data.user.city ?? null
        this.user.id = resp.data.user.id

      }).catch((e) => {
        console.log(e)
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener información. Consulte a soporte de SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      })
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
          message: 'Error al obtener los géneros. Consulte a soporte de SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
    },
  },
  mounted() {
    this.getGenders()
    this.getUserData()
    this.form.roles = this.$auth.user.roles
  },
}
</script>

<style scoped>

</style>
