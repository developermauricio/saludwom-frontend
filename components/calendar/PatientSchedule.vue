<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-6">
        <label class="form-label text-secondary" for="">Seleccionar fecha</label>
        <date-picker
          :clear-button="true"
          :bootstrap-styling="true"
          :language="es"
          format="yyyy-MM-dd"
        ></date-picker>
      </div>
      <div class="col-12 col-md-12 col-lg-12 mt-3">
        <label class="form-label text-secondary" for="">Seleccionar hora</label>
        <div>
          <vue-timepicker></vue-timepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {en, es} from "vuejs-datepicker/dist/locale";

export default {
  name: "PatientSchedule",
  data() {
    return {
      es: es,
      en: en,
      date: {

      }
    }
  }
}
</script>

<style scoped>

</style>
