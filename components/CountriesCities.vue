<template>
  <div>
    <!--  SELECCIONAR PAIS -->
    <div class="mb-4">
      <label class="form-label" :class="{ 'text-danger': $v.country.$error }">Seleccione país de residencia <span
        class="text-danger">*</span></label>
      <multiselect
        :class="{ 'is-invalid': $v.country.$error }"
        v-model="country"
        :options="countries"
        :searchable="true"
        :close-on-select="true"
        @input="getCitiesFromCountry"
        :custom-label="nameSelect"
        track-by="id"
        selectedLabel="Seleccionado"
        deselectLabel=""
        selectLabel="Selecciona"
        :show-labels="true"
        placeholder="Buscar país..."></multiselect>
      <p class="text-danger mt-1 font-weight-bold" v-if="$v.country.$error">El país es requerido.</p>
    </div>

    <!--  SELECCIONAR CIUDAD -->
    <div class="mb-4" v-if="country">
      <label class="form-label">Seleccione ciudad (opcional):</label>
      <multiselect
        v-model="city"
        :options="cities"
        :searchable="true"
        :close-on-select="true"
        :custom-label="nameSelect"
        @input="selectedCity"
        track-by="id"
        selectedLabel="Seleccionado"
        deselectLabel=""
        selectLabel="Selecciona"
        :show-labels="true"
        placeholder="Buscar ciudad..."></multiselect>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {bus} from "../plugins/bus";

export default {
  name: "CountriesCities",
  data() {
    return {
      country: null,
      city: null,
      countries: [],
      cities: [],
    }
  },
  props: ['countryData', 'cityData'],
  validations: {
    country: {required}
  },
  methods: {
    nameSelect({name}) {
      return `${name}`
    },
    /*Obtener todos los pais*/
    async getCountries() {
      await this.$axios.get('/api/v1/get-countries').then(resp => {
        this.countries = resp.data.data
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener los países. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
    selectedCity(city) {
      this.$emit('selectedCity', city)
    },
    /*Obtener todos los pais*/
    async getCitiesFromCountry(country) {
      this.city = null
      this.$emit('selectCountry', this.country)
      if (this.country){
        this.loading()
        await this.$axios.get(`/api/v1/get-cities-from-country/${country.alpha2Code}`).then(resp => {
          this.cities = resp.data.data
          this.$vs.loading.close()
        }).catch((e) => {
          console.log('ERROR', e);
          this.$toast.error({
            title: 'Error',
            message: 'Error al obtener las ciudades. Consulte con el administrador.<',
            showDuration: 1000,
            hideDuration: 8000,
          })
          this.$vs.loading.close()
        })
      }

    },
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
    },
    validateData() {
      this.$v.country.$touch();
      if (this.$v.$invalid) {
        return
      }
    },
    countryDataValue() {
      this.country = this.countryData
      this.city = this.cityData
    }
  },
  created() {
    setTimeout(() =>{
      this.country = this.countryData
      this.city = this.cityData
    }, 500)
  },
  watch: {
    'city': function (val) {
      if (val) {
        bus.$emit('selectedCity', val);
      }
    }
  },
  mounted() {
    this.loading()
    this.getCountries()

    bus.$on('validateCountry', () => {
      this.validateData()
    })
  }
}
</script>

<style scoped>

</style>
