<template>
  <div>
    <!--=====================================
          INFO DEL OBJETIVO
      ======================================-->
    <vue-confirm-dialog v-if="showAlertConfirm"></vue-confirm-dialog>
    <div class="card mb-3">
      <div class="card-body">
        <!-- Título y Estado -->
        <div class="d-flex justify-content-between">
          <!-- Titulo -->
          <div>
            <h5>Tu Objetivo.</h5>
          </div>
          <!-- Editar -->
          <div class="float-right" v-if="valuation.state === '1'">
            <a @click="openEditObjective" style="cursor: pointer">Editar</a>
          </div>
        </div>
        <!-- Información -->
        <div class="mt-2">
          <h6 class="text-secondary font-weight-bold">{{ valuation.name }}.</h6>
          <p>{{ valuation.objectives }}</p>
          <div>
            <p>Tratamiento de <span class="text-primary">{{ valuation.treatment.treatment }}.</span></p>
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <!-- Estado del Plan -->
          <div>
            <span :class="`badge bg-${ stateColorObjec(valuation.state)} ms-2 text-white`">{{
                stateTitleObjec(valuation.state)
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--=====================================
          ARCHIVOS
      ======================================-->
    <div class="card mb-3">
      <div class="card-body">
        <!-- Título y Estado -->
        <div class="d-flex justify-content-between">
          <!-- Titulo -->
          <div>
            <h5>Documentos o archivos adjuntados.</h5>
          </div>
        </div>
        <!-- Lista de archivos -->
        <div class="px-2">
          <Archives :archives="valuation.archives" :valuationState="valuation.state" :valuationId="valuation.id"/>
        </div>
      </div>
    </div>
    <!--=====================================
          INFO CITAS
      ======================================-->
    <div class="card mb-3">
      <div class="card-body">
        <!-- Título y Estado -->
        <div class="d-flex justify-content-between mb-3">
          <!-- Titulo -->
          <div>
            <h5>Cita{{ valuation.appointments && valuation.appointments.length >= 1 ? 's' : '' }}.</h5>
          </div>
          <div v-if="missingAppointments">
            <button @click="appointSchedule(valuation)" class="btn btn-success">Agendar Citas
            </button>
          </div>
        </div>
        <!-- Citas -->
        <div v-if="valuation.appointments && valuation.appointments.length > 0">
          <!--    Información de las citas -->
          <div class="text-justify">
            <p style="font-size: 0.7rem"><span class="text-danger font-weight-bold">IMPORTANTE: </span>
              Si necesitas cancelar tu cita, debe realizar la cancelación con <span
                class="text-danger font-italic">7 días de antelación</span>.
              En caso de reprogramar la cita, debes primero cancelar la cita.
            </p>
            <p class="font-weight-bold" style="font-size: 0.8rem" v-if="missingAppointments">
              {{ messageMissingAppointments }}
            </p>
          </div>
          <hr>
          <div v-for="(appointment, index) in valuation.appointments" :key="'appoint-'+appointment.date+index"
               :class="`mb-3`">
            <div :class="`${appointment.state === '2' || appointment.state === '3' ? 'bg-gray p-2' : ''}`">
              <div class="d-flex justify-content-between">
                <div>
                  <p style="color: gray !important; font-size: 12px" class="mb-0">Fecha de cita.</p>
                  <div class="d-flex align-items-center">
                    <i
                      :class="`bx bx-time-five mr-1 ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`"></i>
                    <p :class="`m-0 ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`">
                      {{
                        appointment.date ? $moment(appointment.date).tz(timezoneUser).format('LLLL') : 'No hay fecha'
                      }}</p>
                  </div>
                </div>
                <!-- Boton Zoom -->
                <div v-if="appointment.state === '1' || appointment.state === '5'">
                  <a class="btn m-1 btn-sm btn-info" :href="appointment.link_meeting_zoom" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-camera-video" viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
                    </svg>
                    Zoom
                  </a>
                </div>
              </div>
              <!-- Info doctor -->
              <div class="mt-2">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6
                      :class="`text-secondary ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`">
                      Esp. {{ appointment.doctor.user.name }}
                      {{ appointment.doctor.user.last_name }}</h6>
                    <span :class="`badge bg-${ stateColorApp(appointment.state)} text-white`">
                  {{ stateTitleApp(appointment.state) }}</span>
                  </div>
                  <div>
                    <button class="btn btn-danger btn-sm" v-if="appointment.state === '1'"
                            @click="cancelAppointment(appointment)">Cancelar Cita
                    </button>
                    <!--                    <button class="btn btn-success btn-sm" v-if="appointment.state === '2' && missingAppointments" @click="appointSchedule(valuation)">Reprogramar</button>-->
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>

    <!--=====================================
            SECCIÓN INFO SUSCRIPCIÓN
        ======================================-->
    <div class="card mb-3">
      <div class="card-body">
        <!-- Título y Estado -->
        <div class="d-flex justify-content-between">
          <!-- Titulo -->
          <div>
            <h5>Tu suscripción para este objetivo.</h5>
          </div>
          <!-- Estado del Plan -->
          <div>
           <span :class="`badge bg-${ stateColorSubs(valuation.subscription.state)} ms-2 text-white`">{{
               stateTitleSubs(valuation.subscription.state)
             }}</span>
          </div>
        </div>
        <!-- Información -->
        <div class="mt-2">
          <h6 class="text-secondary font-weight-bold">{{ valuation.subscription.plan.name }}.</h6>
          <p>{{ valuation.subscription.plan.description }}.</p>
          <!-- Fecha de inicio y vencimiento -->
          <!--          <div class="d-flex justify-content-between">-->
          <!--            <p class="text-muted" style="color: gray !important; font-size: 12px">Este plan vence el-->
          <!--              {{-->
          <!--                valuation.subscription ? $moment(valuation.subscription.created_at).format('LL') : 'No hay fecha'-->
          <!--              }}</p>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Archives from "./Archives";
import EditObjective from "./editInformation/EditObjective";
import {bus} from "../../../../../plugins/bus";
import DoctorSchedule from "../../../valuations/create/components/DoctorSchedule";
import AppointmentSchedule from "../../../../../components/appointment/AppointmentSchedule";

export default {
  name: "Information",
  components: {Archives},
  data() {
    return {
      showAlertConfirm: false,
      appointments: [],
      timezoneUser: null,
      pendingAppointments: [],
    }
  },
  props: ['valuation', 'missingAppointments', 'messageMissingAppointments'],

  methods: {
    validateAddAppointment() {
      this.pendingAppointments = []
      setTimeout(() =>{
        this.valuation.appointments.map(appo => {
          if (appo.state === '1' || appo.state === '3' || appo.state === '5') {
            this.pendingAppointments.push(appo)
          }
        })
        let numberAppointmentPlan = this.valuation.subscription.plan.number_appointments
        let numberAppointmentCurrent = this.pendingAppointments.length
        if (numberAppointmentPlan === numberAppointmentCurrent){
          this.missingAppointments = false
          this.messageMissingAppointments = false
        }
      }, 500)
    },
    /* Reprogramar las citas*/
    appointSchedule(valuation) {
      console.log(valuation)
      this.$FModal.show(
        {
          component: AppointmentSchedule,
          // clickToClose: false,
          // escToClose: false
          // placement: 'center top',
        },
        {
          valuation: valuation,
        }
      )
    },
    cancelAppointment(appointment) {
      console.log(appointment)
      let dateNow = new Date()
      let dateAppoi = new Date(appointment.date); //Tomamos la ultima fecha agendada y la guardamos en una varibale para sacar la diferencia de cuando va sacar la proxima cita (puede ser en 10 dias o 15 dias, depende del plan)
      dateAppoi.setDate(dateAppoi.getDate() - 6);
      console.log(dateAppoi)
      if (dateNow > dateAppoi){
        this.$toast.error({
          title: 'Atención',
          message: 'Solo puedes cancelar tu cita con 7 días de anticipación.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      setTimeout(() =>{
        this.showAlertConfirm = true
        this.$confirm(
          {
            message: `¿Esta segur@ de cancelar su cita del ${this.$moment(appointment.date).tz(this.timezoneUser).format('LLLL')}?`,
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
                    `api/v1/cancel-appointment/${appointment.id}`
                  );
                  if (resp.status === 200) {
                    this.$vs.loading.close()
                    bus.$emit('updateDataValuation')
                    this.$toast.success({
                      title: 'Confirmación',
                      message: 'Tu cita se canceló exitosamente!',
                      showDuration: 1000,
                      hideDuration: 5000,
                    })
                    // setTimeout(() =>{
                    //   this.$router.push({name: 'index.objectives'});
                    // }, 1000)
                  }
                } catch (e) {
                  this.$vs.loading.close()
                  this.$toast.error({
                    title: 'Error',
                    message: 'Error al cancelar tu cita. Consulte con el administrador.',
                    showDuration: 1000,
                    hideDuration: 8000,
                  })
                }
              }
              this.showAlertConfirm = false
            }
          })
      }, 100)
    },
    openEditObjective() {
      this.$FModal.show(
        {
          component: EditObjective,
          clickToClose: false,
          escToClose: false,
          placement: 'center top',
        },
        {
          valuation: {
            valuationId: this.valuation.id,
            valuationName: this.valuation.name,
            valuationTreatment: this.valuation.treatment,
            valuationObjective: this.valuation.objectives,
          }
        }
      )
    },

    stateColorSubs(state) {
      switch (state) {
        case '1':
          return 'warning'
        case '2':
          return 'danger'
        case '3':
          return 'danger'
        case '4':
          return 'success'
        case '5':
          return 'info'
      }
    },
    stateTitleSubs(state) {
      switch (state) {
        case '1':
          return 'Pendiente'
        case '2':
          return 'Cancelado'
        case '3':
          return 'Rechazado'
        case '4':
          return 'Activo'
        case '5':
          return 'Completado'
      }
    },

    stateTitleObjec(state) {
      switch (state) {
        case '1':
          return 'Pendiente de recibir recursos'
        case '2':
          return 'Recursos enviados por el doctor'
        case '3':
          return 'Pendiente de recibir el tratamiento'
        case '4':
          return 'En tratamiento'
        case '5':
          return 'Finalizado'
      }
    },
    stateColorObjec(state) {
      switch (state) {
        case '1':
          return 'warning'
        case '2':
          return 'info'
        case '3':
          return 'danger'
        case '4':
          return 'info'
        case '5':
          return 'success'
      }
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
  created() {
    this.$emit('getValuation')
    this.timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  mounted() {
    bus.$on('validateAddAppointment', () => {
      this.validateAddAppointment()
    })
  }
}
</script>

<style scoped>

</style>
