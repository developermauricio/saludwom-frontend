<template>
  <div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <div class="p-4 schedule-doctor">
      <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-end align-items-end">
          <img class="avatar-profile" width="60" :src="`${$config.urlBack}${valuation.doctor.user.picture}`"
               v-if="valuation.doctor.user.picture" alt="SaludWoM">
          <img class="avatar-profile" width="60" src="@/assets/img/user-profile.png" alt="SaludWoM" v-else>
        </div>
        <div class="ml-2 mt-2">
          <div class="d-flex">
            <h5 class="mb-1">{{ valuation.doctor.user.name }} {{ valuation.doctor.user.last_name }}</h5>
          </div>
          <p class="mb-0 text-primary">Profesional Especialista</p>
        </div>
      </div>
      <div class="mt-4" v-if="valuation.subscription">
        <p>Recuerda que actualmente tienes activo el <strong class="text-primary">{{
            valuation.subscription.plan.name
          }}</strong>
          que permite agendar <strong class="text-primary">{{ valuation.subscription.plan.number_appointments }}
            citas.</strong>
          Después de agendar tu primera cita, la siguiente tendrá que ser en los próximos <strong
            class="text-primary">{{ valuation.subscription.plan.time_interval_appointments }}
            días.</strong></p>
        <p class="text-danger font-italic fw-500">Tenga en cuenta que el calendario mostrará los horarios disponibles en
          zona horaria Europa Madrid, agenda tu cita y podrás ver la fecha en tu zona horaria.</p>
      </div>
      <hr>
      <!--=====================================
          Calendario de disponibilidad
      ======================================-->
      <div>
        <!-- Citas actualmente agendadas  -->
        <div v-if="pendingAppointments && pendingAppointments.length > 0">
          <div>
            <p>Para continuar con el proceso completa el número de citas permitidas para tu plan.</p>
            <h6>Actualmente tienes agendada{{ pendingAppointments.length > 1 ? 's' : '' }}
              la{{ pendingAppointments.length > 1 ? 's' : '' }} siguiente{{ pendingAppointments.length > 1 ? 's' : '' }}
              cita{{ pendingAppointments.length > 1 ? 's' : '' }}:</h6>
          </div>
          <div v-for="pendAppo in pendingAppointments" :key="pendAppo.id">
            <div class="d-flex justify-content-between">
              <div>
                <p style="color: gray !important; font-size: 12px" class="mb-0">Fecha de cita.</p>
                <div class="d-flex align-items-center">
                  <i class="bx bx-time-five mr-1"></i>
                  <p class="m-0">
                    {{ pendAppo.date ? $moment(pendAppo.date).tz(timezoneUser).format('LLLL') : 'No hay fecha' }}</p>
                </div>
                <span :class="`badge ms-2 bg-${ stateColorApp(pendAppo.state)} text-white`">
                  {{ stateTitleApp(pendAppo.state) }}</span>
              </div>
            </div>
          </div>
        </div>


        <!-- Agendar citas  -->
        <div class="mt-5" v-if="valuation.subscription.plan.number_appointments !== totalAppointPending">
          <!-- Calendario de disponibilidad    -->
          <div v-for="(appointment, indexAppoint) in $v.appointments.$each.$iter" :key="indexAppoint">
            <div slot="header">
              <div class="d-flex">
                <!--                <div :class="{ 'text-danger': appointment.hour.$error }">-->
                <!--                  Selecciona Fecha-->
                <!--                </div>-->
                <!--                <div v-if="appointments[indexAppoint].hour">-->
                <!--                  <vs-tooltip text="Cita agendada">-->
                <!--                    <i class="bx bx-check-circle check-appointment ml-1"></i>-->
                <!--                  </vs-tooltip>-->
                <!--                </div>-->
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
                  class="badge bg-light ms-2 text-light">{{
                    $moment(appointments[indexAppoint].date + ' ' + appointments[indexAppoint].hour).format('LLL') + ':00 ' + $config.timezone
                  }}</span>
              </div>
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
            <span :class="[time.hour+':'+time.minute+':00' === (appointments[indexAppoint] ? appointments[indexAppoint].hour : '') ? 'active' : '' ,
              `badge ${time.state === 'SELECTED' ? 'bg-hour-selected':'bg-hour select-hour-schedule'}   ms-2 text-white`, `${time.hour+':'+time.minute+':00' === timeAvailable(time.hour+':'+time.minute+':00', indexAppoint) ? '': ''}`]"
            >{{ time.hour }}:{{ time.minute }}
            </span>
                    </vs-tooltip>
                  </h5>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <!-- Boton para agendar la segunda cita -->
          <div class="mt-4 d-flex justify-content-end">
            <button class="btn-secondary btn mr-2" @click="cancelAppointment"> Cancelar</button>
            <button class="btn btn-success" @click="saveAppointment()"> Reprogramar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {bus} from "../../plugins/bus";

export default {
  name: "AppointmentSchedule",
  props: ['valuation'],
  data() {
    return {
      lastHour: {
        hour: null,
        minute: null,
      },
      timezoneUser: null,
      totalAppointPending: 0,
      pendingAppointments: [],
      appointments: [
        {
          doctor_schedule_id: null,
          // numberAppointment: 1,
          doctor: {
            id: this.valuation.doctor.id,
            name: this.valuation.doctor.user.name + ' ' + this.valuation.doctor.user.last_name
          },
          times: [],
          date: null,
          hour: null,
          timezone: null,
          onlyHour: null,
          onlyMinute: null,
        }
      ],

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
  methods: {
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
      let dataAppVal = {
        'treatment': this.valuation.treatment,
        'subscription': this.valuation.subscription,
        'valuation_id': this.valuation.id,
        'doctor_id': this.valuation.doctor.id,
        'appointments': this.appointments
      }
      this.$confirm(
        {
          message: '¿Esta segur@ de agendar la cita?',
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
              this.$vs.loading({
                color: process.env.COLOR_BASE,
                text: 'Espere por favor...'
              })
              try {
                const resp = await this.$axios.post(
                  `api/v1/reschedule-appointment/`, dataAppVal
                );
                if (resp.status === 200) {
                  this.$vs.loading.close()
                  bus.$emit('updateDataValuation')
                  bus.$emit('validateAddAppointment')
                  bus.$emit('closeAlert')
                  this.$FModal.hide()
                  this.$toast.success({
                    title: 'Confirmación',
                    message: 'Tu cita se reprogramo exitosamente!',
                    showDuration: 1000,
                    hideDuration: 5000,
                  })
                }
              } catch (e) {
                this.$vs.loading.close()
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al reprogramar tu cita. Consulte con el administrador.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
              }
            } else {
              bus.$emit('closeAlert')
            }
          }
        })
    },
    cancelAppointment() {
      this.appointments = []
      this.pendingAppointments = []
      this.$FModal.hide()
    },
    timeAvailable(time, index) {
      let currentTime = this.appointments.find(item => item.hour === time)
      let currentIndex = this.appointments.findIndex(item => item.hour === time)
      if (currentTime && currentIndex !== index) {
        return currentTime.hour
      }
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
    indexAppointment(index) {
      this.index = parseInt(index)
    },
    appointAvailable() {
      this.valuation.appointments.map(appo => {
        if (appo.state === '1' || appo.state === '3' || appo.state === '5') {
          this.pendingAppointments.push(appo)
          this.totalAppointPending++
        }
      })
    },
    checkScheduleAvailable() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Verificando disponibilidad...'
      })
      this.$axios.get(`/api/v1/check-schedule-available/${this.valuation.doctor_id}`).then(resp => {
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
    calendarOnChange(date, dateStr, instance) {
      if (date[0]) {
        let lastDate = this.pendingAppointments.at(-1) //Ultima fecha o cita agendada

        if (lastDate) { //validamos si tiene una ultima fecha
          let dateNex = new Date(lastDate.only_date); //Tomamos la ultima fecha agendada y la guardamos en una varibale para sacar la diferencia de cuando va sacar la proxima cita (puede ser en 10 dias o 15 dias, depende del plan)
          dateNex.setDate(dateNex.getDate() + this.valuation.subscription.plan.time_interval_appointments + 1); //Sacamos la diferencia de dias para sacar la proxima cita
          let formatDateNext = this.$dateFns.format(dateNex, 'yyyy-MM-dd') // formateamos la fecha en la se podrá sacar la proxima cita

          let formatCurrentDate = this.$dateFns.format(date[0], 'yyyy-MM-dd') // Esta es la fecha que selecciona el usuario

          let diffDate = new Date(lastDate.only_date) //Esta la ultima fecha agendada pero esta vez la guardamos para saber cuando puede sacar la cita hacia atras (digamos que la ultima cita la saco el 7 de marzo, entonces en febrero hay disponibiblidad pero que fecha puede usar)
          diffDate.setDate(diffDate.getDate() - this.valuation.subscription.plan.time_interval_appointments + 1) //Sacamos la diferencia hacia atras
          let formatDateDiff = this.$dateFns.format(diffDate, 'yyyy-MM-dd') //Formateamos la fecha diferencia hacia atras

          let validateDate = false //Con esta variable vamos a saver si la proxima cita es hacia delante o hacia atras

          if (formatCurrentDate < lastDate.only_date){ //Si es asi atras, entonces la variable validateDate es true
            validateDate = true
          }
          if (validateDate) { //Si validate es true entonces validamos la fecha hacia atras
            if (formatCurrentDate > formatDateDiff && validateDate) {
              this.$toast.error({
                title: 'Sr@ Paciente',
                message: `Recuerde agendar tu próxima cita después de cada ${this.valuation.subscription.plan.time_interval_appointments} días`,
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
          if (formatDateNext > formatCurrentDate && !validateDate) { //Si validateDate es false entonces hacemos la validación hacia delante
            this.$toast.error({
              title: 'Sr@ Paciente',
              message: `Recuerde agendar tu próxima cita después de cada ${this.valuation.subscription.plan.time_interval_appointments} días`,
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
    removedAppointment(index) {
      if (this.appointments.length > 1) {
        this.appointments.splice(index, 1);
      }
    },

    transformTimezone(date) {
      return this.$moment(date).tz(this.timezoneUser).format('LLL')
    },

    stateColorApp(state) {
      switch (state) {
        case '1':
          return 'warning'
        case '2':
          return 'danger'
        case '3':
          return 'success'
        case '5':
          return 'info'
      }
    },
    stateTitleApp(state) {
      switch (state) {
        case '1':
          return 'Pendiente'
        case '2':
          return 'Cancelada'
        case '3':
          return 'Finalizada'
        case '5':
          return 'En Progreso'
      }
    }
  },
  mounted() {
    this.appointAvailable()
    this.checkScheduleAvailable()
    this.timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}
</script>

<style scoped>

</style>
