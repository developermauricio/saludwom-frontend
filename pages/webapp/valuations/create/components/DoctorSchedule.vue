<template>
  <div class="p-4 schedule-doctor">
    <div class="d-flex justify-content-center">
      <div class="d-flex justify-content-end align-items-end">
        <img class="avatar-profile" width="60" :src="`${$config.urlBack}${data.user.picture}`" v-if="data.user.picture" alt="SaludWoM">
        <img class="avatar-profile" width="60" src="@/assets/img/user-profile.png" alt="SaludWoM" v-else>
      </div>
      <div class="ml-2 mt-2">
        <div class="d-flex">
          <h5 class="mb-1">{{ data.user.name }} {{ data.user.last_name }}</h5>
        </div>
        <p class="mb-0 text-primary">Profesional Especialista</p>
      </div>
    </div>
    <div class="mt-4" v-if="subscription">
      <p>Recuerda que actualmente tienes activo el <strong class="text-primary">{{ subscription.plan.name }}</strong>
        que permite agendar <strong class="text-primary">{{ subscription.plan.number_appointments }} citas.</strong>
        Después de agendar tu primera cita, la siguiente tendrá que ser en los próximos <strong
          class="text-primary">{{ subscription.plan.time_interval_appointments }}
          días.</strong></p>
      <p class="text-danger font-italic fw-500">Tenga en cuenta que el calendario mostrará los horarios disponibles en
        zona horaria Europa Madrid, agenda tu cita y podrás ver la fecha en tu zona horaria.</p>
    </div>
    <hr>
    <!-- Calendario de disponibilidad    -->
    <div v-for="(appointment, indexAppoint) in $v.appointments.$each.$iter" :key="indexAppoint">
      <vs-collapse>
        <vs-collapse-item :open="true">
          <div slot="header">
            <div class="d-flex">
              <div :class="{ 'text-danger': appointment.hour.$error }">
                Agenda tu {{ titleNumberAppointment(indexAppoint) }} cita
              </div>
              <div v-if="appointments[indexAppoint].hour">
                <vs-tooltip text="Cita agendada">
                  <i class="bx bx-check-circle check-appointment ml-1"></i>
                </vs-tooltip>
              </div>
            </div>
            <ul>
              <li v-if="appointment.date.$error" class="text-danger font-weight-bold">* Selecciona una fecha</li>
              <li v-if="appointment.hour.$error" class="text-danger font-weight-bold">* Selecciona una hora</li>
            </ul>

            <div v-if="appointments[indexAppoint].hour">
              <span class="badge bg-success ms-2 text-white">{{
                  transformTimezone(appointments[indexAppoint].date + ' ' + appointments[indexAppoint].hour) + ':00 ' + timezoneUser
                }}</span><br>

              <span
                class="badge bg-light ms-2 text-light">{{ $moment(appointments[indexAppoint].date + ' ' + appointments[indexAppoint].hour).format('LLL') + ':00 ' + $config.timezone }}</span>
            </div>
            <!--            <p v-if="appointment.date.$error" class="text-danger font-weight-bold">Selecciona una fecha</p>-->
            <!--            <p v-if="appointment.hour.$error" class="text-danger font-weight-bold">Selecciona una hora</p>-->
            <div v-if="indexAppoint > 0">
              <a class="btn m-1 mt-3 btn-sm btn-danger" @click="removedAppointment(indexAppoint)"
                 style="z-index: 999999">Quitar
                Cita</a>
            </div>
          </div>
          <div :id="`appointment-${indexAppoint}`">
            <flat-pickr
              v-model="appointment.date.$model"
              :config="config"
              @on-change="calendarOnChange"
              @input="indexAppointment(indexAppoint)"
              value=""/>
          </div>
          <div class="mt-3 mb-3">
            <div class="text-center">
              <label class="form-label">Selecciona la fecha disponible y luego el horario:</label>
            </div>
            <div class="row pr-4 pl-4 justify-content-center justify-content-center">
              <div class="mr-2" v-for="(time, indexTimes) in appointments[indexAppoint].times" :key="indexTimes">
                <h5 @click="selectHour(time, indexAppoint, appointment.date.$model)">
                  <vs-tooltip :text="stateTitleTime(time.state)">
            <span
              :class="[time.hour+':'+time.minute+':00' === (appointments[indexAppoint] ? appointments[indexAppoint].hour : '') ? 'active' : '' ,
              `badge ${time.state === 'SELECTED' ? 'bg-hour-selected':'bg-hour select-hour-schedule'}   ms-2 text-white`, `${time.hour+':'+time.minute+':00' === timeAvailable(time.hour+':'+time.minute+':00', indexAppoint) ? '': ''}`]"
            >{{ time.hour }}:{{ time.minute }}
            </span>
                  </vs-tooltip>
                </h5>
              </div>
            </div>
          </div>

        </vs-collapse-item>
      </vs-collapse>
      <hr>
      <div v-if="subscription">
        <button class="btn btn-success" @click="addAppointment(index + 1)"
                v-if="appointments.length < subscription.plan.number_appointments"> Agendar la siguiente cita
        </button>
      </div>
    </div>
    <!-- Boton para agendar la segunda cita -->
    <div class="mt-4 d-flex" v-if="subscription">
      <button class="btn-secondary btn mr-2" @click="cancelAppointment"> Cancelar</button>

      <button class="btn btn-success" @click="saveAppointment()"
              v-if="appointments.length === subscription.plan.number_appointments"> Guardar Citas
      </button>
    </div>

  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {bus} from "../../../../../plugins/bus";
// require("moment/min/locales.min");
// require("moment-timezone")
// import moment from 'moment-timezone';

export default {
  name: "DoctorSchedule",
  data() {
    return {
      timezoneUser: null,
      lastHour: {
        hour: null,
        minute: null,
      },
      index: null,
      appointments: [
        {
          doctor_schedule_id: null,
          // numberAppointment: 1,
          doctor: {
            id: this.data.id,
            name: this.data.user.name + ' ' + this.data.user.last_name
          },
          times: [],
          date: null,
          hour: null,
          timezone: null,
          onlyHour: null,
          onlyMinute: null,
        }
      ],
      subscription: null,

      checkSchedule: [],
      schedule: null,
      times: [],
      hourSelected: [],
      config: {
        // maxDate: '2022-11-24',
        // weekNumbers: true,
        disableMobile: false,
        inline: true,
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
    }
  },
  validations: {
    appointments: {
      required,
      $each: {
        date: {required},
        hour: {required},
      }
    }
  },
  props: ['data'],
  methods: {
    transformTimezone(date) {
      return this.$moment(date).tz(this.timezoneUser).format('LLL')
    },

    saveAppointment() {
      this.$v.appointments.$touch()
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Sr@ paciente',
          message: 'Verifique que a ingresado la fecha y hora',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      bus.$emit('appointments', this.appointments)
      this.$FModal.hide()
    },
    cancelAppointment() {
      this.appointments = []
      this.$FModal.hide()
    },
    stateTitleTime(state) {
      switch (state) {
        case 'SELECTED':
          return 'No Disponible'
        case 'PATIENT':
          return 'Ya has tomado este horario'
        case 'AVAILABLE':
          return 'Disponible'
      }
    },
    /*=============================================
      MÉTODOS PARA AGREGAR Y REMOVER HEADERS
    =============================================*/
    addAppointment(index) {
      if (this.appointments.length < this.subscription.plan.number_appointments) {
        this.appointments.push({
          date: null, hour: null, timezone: null, times: null, onlyHour: null, onlyMinute: null, doctor: {
            id: this.data.id,
            name: this.data.user.name + ' ' + this.data.user.last_name
          }
        });
        this.eventSelectScroll('#appointment-' + index)
      } else {
        this.$toast.error({
          title: 'Sr@ paciente',
          message: 'No puede agendar más citas.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      }
    },
    removedAppointment(index) {
      if (this.appointments.length > 1) {
        this.appointments.splice(index, 1);
      }
    },
    titleNumberAppointment(index) {
      switch (index) {
        case '0':
          return 'primera'
        case '1':
          return 'segunda'
        case '2':
          return 'tercera'
        case '3':
          return 'cuarta'
        case '4':
          return 'quinta'
        case '5':
          return 'sexta'
        case '6':
          return 'séptima'
        case '7':
          return 'octava'
        case '8':
          return 'novena'
        case '9':
          return 'décima'
      }
    },
    selectHour(hour, index, date) {
      setTimeout(() => {
        if (hour.state === 'SELECTED') {
          this.$toast.error({
            title: 'Sr@ Paciente',
            message: 'La hora no esta disponible',
            showDuration: 1000,
            hideDuration: 8000,
          })
          return
        }

        if (hour.state === 'PATIENT') {
          this.$toast.error({
            title: 'Sr@ Paciente',
            message: 'Ya has agendado este horario',
            showDuration: 1000,
            hideDuration: 8000,
          })
          return
        }
        if (this.appointments[index].hour) {

          let currentDate = this.appointments.find(item => item.date === date)
          let currentTime = currentDate.times.find(item => item.hour === this.lastHour.hour && item.minute === this.lastHour.minute)
          currentTime.state = 'AVAILABLE'
        }

        /*CAMBIAR ESTADO A LA HORA TOMADA*/
        this.appointments[index].doctor_schedule_id = hour.doctor_schedule_id
        this.appointments[index].hour = hour.hour + ':' + hour.minute + ':00'
        this.appointments[index].onlyHour = hour.hour
        this.appointments[index].onlyMinute = hour.minute
        this.appointments[index].timezone = this.timezoneUser
        let currentDate = this.appointments.find(item => item.date === date)
        let currentTime = currentDate.times.find(item => item.hour === hour.hour && item.minute === item.minute)

        this.lastHour.hour = hour.hour
        this.lastHour.minute = hour.minute
      }, 500)
    },
    timeAvailable(time, index) {
      let currentTime = this.appointments.find(item => item.hour === time)
      let currentIndex = this.appointments.findIndex(item => item.hour === time)
      if (currentTime && currentIndex !== index) {
        return currentTime.hour
      }
    },
    calendarOnChange(date, dateStr, instance) {

      if (date[0]) {

        let lastDate = this.appointments.at(-2) //Ultima fecha de la agenda
        if (lastDate && this.index > 0) {
          let dateNex = new Date(lastDate.date);
          dateNex.setDate(dateNex.getDate() + this.subscription.plan.time_interval_appointments);
          let formatDateNext = this.$dateFns.format(dateNex, 'yyyy-MM-dd')
          let formatCurrentDate = this.$dateFns.format(date[0], 'yyyy-MM-dd')
          if (formatDateNext > formatCurrentDate) {
            this.$toast.error({
              title: 'Sr@ Paciente',
              message: `Recuerde agendar tu próxima cita después de cada ${this.subscription.plan.time_interval_appointments} días`,
              showDuration: 1000,
              hideDuration: 8000,
            })
            setTimeout(() => {
              this.appointments.forEach((item, index) => {
                if (index === this.index) {
                  item.doctor_schedule_id = null
                  item.date = null
                  item.hour = null
                  item.timezone = null
                    item.onlyHour = null
                  item.onlyMinute = null
                  item.times = null
                }
              })
            }, 50)
            return
          }
        }

        this.checkScheduleAvailable()
        let dateSelected = this.$dateFns.format(date[0], 'yyyy-MM-dd')
        let currentDate = this.checkSchedule.find(item => this.$dateFns.format(item.date, 'yyyy-MM-dd') === dateSelected)
        this.appointments.forEach((item, index) => {
          if (index === this.index) {
            item.doctor_schedule_id = null
            item.hour = null
            item.timezone = null
              item.onlyHour = null
            item.onlyMinute = null
          }
        })
        this.appointments[this.index].times = currentDate.schedules_hours_minutes
      }

    },
    indexAppointment(index) {
      this.index = parseInt(index)
    },
    async checkScheduleAvailable() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Verificando disponibilidad...'
      })
      await this.$axios.get(`/api/v1/check-schedule-available/${this.data.id}`).then(resp => {
        resp.data.data.doctor_schedule.forEach((item) => {
          this.config.enable.push(item.date)
        })
        this.checkSchedule = resp.data.data.doctor_schedule
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.loading.close()
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al verificar la disponibilidad de agenda. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      })
    },
    eventSelectScroll(option) {
      const options = {
        container: "body",
        easing: "linear"
      };
      setTimeout(() => {
        this.$scrollTo(option, 1000, options);
      }, 100);
    },
  },
  created() {
    setTimeout(() =>{
      bus.$emit('verifySubscription');
    }, 100)
    // this.subscription = JSON.parse(localStorage.getItem('subscription'))
  },
  mounted() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timezoneUser = timeZone
    this.checkScheduleAvailable()
    bus.$on('sendSubscription', (data) =>{
      this.subscription = data
    })
  }
}
</script>

<style scoped>
</style>
