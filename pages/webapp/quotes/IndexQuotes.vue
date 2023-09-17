<template>
  <div class="container">
    <client-only>
      <vue-loadmore
        :loadOffset="150"
        :finishedText="'No hay más citas'"
        :loadingText="'Cargando'"
        :successText="'Actualizado'"
        :loosingText="'Soltar para actualizar'"
        :refreshText="'Actualizando'"
        :pullingText="'Desplegar para actualizar'"
        ref="loadmoreRef"
        :finished="finished"
        :on-refresh="onRefresh"
        :on-loadmore="onLoad">
        <div class="row h-100 justify-content-center align-items-center">
          <div v-if="isAppointment" class="col-12 text-center">
            <h5 class="text-muted">No hay citas agendadas</h5>
          </div>
        </div>
        <div v-if="!isAppointment">
          <div class="my-4">
            <div class="card mb-4">
              <div class="card-body">
                <!-- Título y Estado -->
                <div class="mb-3">
                  <!-- Titulo -->
                  <div>
                    <h6>Cita{{ appointments && appointments.length >= 1 ? 's' : '' }}.</h6>
                  </div>
                  <div class="text-justify">
                    <p style="font-size: 0.7rem"><span class="text-danger font-weight-bold">IMPORTANTE: </span>
                      Si necesitas cancelar tu cita, debe realizar la cancelación con <span
                        class="text-danger font-italic">7 días de antelación</span>.
                      En caso de reprogramar la cita, debes primero cancelar la cita.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-3" v-for="(appointment, index) in appointments" :key="'appoint-'+appointment.date+index"
                 v-if="appointments && appointments.length > 0">
              <div class="card-body">
                <div :class="`${appointment.state === '2' || appointment.state === '3' ? 'bg-gray p-2' : ''}`">
                  <div class="">
                    <div>Objetivo: <strong class="text-primary" style="cursor: pointer" @click="showValuation(appointment.valuation.slug)">{{ appointment.valuation.name }}</strong></div>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between mb-2">
                    <div>
                      <p style="color: gray !important; font-size: 12px" class="mb-0">Fecha de cita.</p>
                      <div class="d-flex align-items-center py-2">
                        <i
                          :class="`bx bx-calendar mr-1 ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`"></i>
                        <p :class="`m-0 ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`">
                          {{
                            appointment.date ? $moment(appointment.date).tz(timezoneUser).format('LL') : 'No hay fecha'
                          }}</p>
                      </div>
                      <div class="d-flex align-items-center">
                        <i
                          :class="`bx bx-time-five mr-1 ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`"></i>
                        <p :class="`m-0 ${appointment.state === '2' || appointment.state === '3' ? 'text-light' : ''}`">
                          {{
                            appointment.date ? $moment(appointment.date).tz(timezoneUser).format('HH:mm') : 'No hay fecha'
                          }}</p>
                      </div>
                    </div>
                    <!-- Boton Zoom -->
                    <div v-if="appointment.state === '1' || appointment.state === '5'">
                      <a class="btn m-1 btn-sm btn-info-zoom" :href="appointment.link_meeting_zoom" target="_blank">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-loadmore>
    </client-only>
  </div>
</template>

<script>

import {bus} from "../../../plugins/bus";

export default {
  name: "IndexCities",
  components: {},
  data() {
    return {
      isAppointment: false,
      appointments: [],

      page: 1,
      pageSize: 0,
      finished: false,
      timezoneUser: null,
    }
  },
  computed: {
    url() {
      return `/api/v1/get-appointments-patient/${this.$auth.user.patient.id}/?page=${this.page}`;
    }
  },
  methods: {
    showValuation(slug){
      this.$router.push(`/webapp/objetivos/${slug}`)
    },
    initData() {
      this.showMessage = false
      this.appointments = []
      this.finished = false
      this.page = 1
    },
    onRefresh(done) {
      setTimeout(() => {
        this.initData()
        this.getAppointments()
        done();
      }, 50)
    },
    onLoad(done) {
      if (this.page <= this.pageSize) {
        this.page++;
        this.getAppointments()
      } else {
        this.finished = true
      }
      done();
    },
    getAppointments() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      this.$axios.get(this.url).then(({data}) => {
        console.log(data.data)
        data.data.data.forEach((item) => {
          this.appointments.push(item)
        })
        if (this.appointments.length === 0) {
          this.$vs.loading.close()
          return this.isAppointment = true
        }
        this.pageSize = data.lastPage

      }).catch(e => {
        this.isAppointment = true
        console.log(e)
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener las citas. Consulte a soporte de SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      }).finally(() => {
        this.$vs.loading.close()
      })
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
    cancelAppointment(appointment) {

      let dateNow = new Date()
      let dateAppoi = new Date(appointment.date); //Tomamos la ultima fecha agendada y la guardamos en una varibale para sacar la diferencia de cuando va sacar la proxima cita (puede ser en 10 dias o 15 dias, depende del plan)
      dateAppoi.setDate(dateAppoi.getDate() - 6);

      if (dateNow > dateAppoi) {
        this.$toast.error({
          title: 'Atención',
          message: 'Solo puedes cancelar tu cita con 7 días de anticipación.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      setTimeout(() => {
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
                    message: 'Error al cancelar tu cita. Consulte a soporte SaludWom.',
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
  },
  mounted() {
    this.getAppointments()
  },
  created() {

    this.timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}
</script>

<style scoped>

</style>
