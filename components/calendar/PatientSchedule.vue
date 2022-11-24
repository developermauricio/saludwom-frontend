<template>
  <div>
    <div class="row">
      <div class="col-12" v-for="doctor in scheduleDoctor" :key="doctor.id">
        <vs-radio v-model="doctorSelected" vs-name="radios1" :vs-value="doctor">Dr.{{ doctor.user.name }}
          {{ doctor.user.last_name }}
        </vs-radio>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-6">
        <label class="form-label text-secondary" for="">Seleccionar fecha</label>
<!--        <date-picker-->
<!--          :clear-button="true"-->
<!--          :bootstrap-styling="true"-->
<!--          :language="es"-->
<!--          :disabled-dates="state.disabledDates"-->
<!--          format="yyyy-MM-dd"-->
<!--        ></date-picker>-->

        <flat-pickr
          v-model="calendarSchedule"
          :config="config"
          @on-change="calendarOnChange"
          value=""/>
      </div>
      <div class="col-12 col-md-12 col-lg-12 mt-3">
        <label class="form-label text-secondary" for="">Seleccionar hora</label>
        <div>
          <vue-timepicker :hour-range="hourSchedule"></vue-timepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {en, es} from "vuejs-datepicker/dist/locale";


export default {
  name: "PatientSchedule",
  props: ['scheduleDoctor'],
  data() {
    return {
      hourSchedule: null,

      config:{
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d',
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          },
          months: {
            shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
            longhand: ['Enero', 'Febrero', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          },
        },
        enable: []
      },

      calendarSchedule: null,
      doctorSelected: null,
      currentDate: null,
      state: {
        disabledDates: {
          // to: new Date('2022-11-24'),
          // from: new Date('2022-11-25'),
          enable: []
          // to: new Date(2016, 0, 5), // Disable all dates up to specific date
          // from: new Date(2016, 0, 26),
          // ranges: [
          //   {
          //     from: new Date('2022-11-24'),
          //     to: new Date('2022-11-25')
          //   },
          //   {
          //     from: new Date('2022-11-27'),
          //     to: new Date('2022-11-28')
          //
          //   }
          // ],
        },

        date: new Date()
      },
      date: {}
    }
  },
  methods: {
    calendarOnChange(date){
      console.log(date)
    }
  },
  watch: {
    'doctorSelected': function (val) {
      if (val) {
        let schedule = JSON.parse(val.schedule)
        console.log(schedule.schedules)
        schedule.schedules.forEach((item) =>{
          this.config.enable.push(item.date)
        })
      }
    }
  },
  mounted() {
    // this.currentDate = new Date()
    // this.currentDate.setFullYear(this.currentDate.getFullYear() - 18)
    // this.currentDate = this.currentDate.getFullYear() + 1
    // this.state.disabledDates.from = new Date(this.currentDate, 0, 0);
    // console.log(this.currentDate)
    // let schedule = this.doctorSelected.schedule
    // console.log(schedule)
    // this.state.disabledDates.ranges.map((item) =>{
    //
    // })
  }
}
</script>

<style scoped>

</style>
