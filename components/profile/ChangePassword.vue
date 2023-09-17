<template>
  <div class="mt-4">
    <h6 class="mb-3 text-center mb-4">Cambiar Contraseña</h6>

    <div>
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
    </div>
    <div>
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
    </div>
    <div>
      <!-- Botón Actualizar -->
      <button class="btn btn-primary btn-block" @click="updatePassword">Actualizar Contraseña</button>
    </div>
  </div>
</template>

<script>
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
import {bus} from "../../plugins/bus";

export default {
  name: "ChangePassword",
  data() {
    return {
      validatePassword: false,
      showPassword: false,
      showPasswordConfirm: false,
      form: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  props: ['userId'],
  validations: {
    form: {
      password: {required, minLength: minLength(8)},
      password_confirmation: {required,sameAsPassword: sameAs('password')},
    },
  },
  methods: {
    updatePassword() {

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
          message: '¿Esta seguro de actualizar la contraseña?.',
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
              this.$axios.post(`api/v1/update-password/${this.userId}`, this.form).then(resp => {
                this.$toast.success({
                  title: 'Confirmación',
                  message: 'Exitoso!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })
                this.$v.form.$reset()
                this.form.password = ''
                this.form.password_confirmation = ''
                this.$vs.loading.close()
              }).catch((e) => {
                console.log(e)
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al actualizar la contraseña. Consulte a soporte de SaludWom.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
                this.$vs.loading.close()
              })
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
  }
}
</script>

<style scoped>

</style>
