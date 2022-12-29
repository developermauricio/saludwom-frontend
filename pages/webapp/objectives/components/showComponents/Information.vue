<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h6>Información del Plan</h6>
        <div>
          <p style="font-size: 0.9rem;" class="m-0"><span
            class="font-weight-bold">Plan: </span>{{ valuation.subscription.plan.name }}.</p>
          <p style="font-size: 0.9rem;" class="m-0"><span
            class="font-weight-bold">Detalle del Plan: </span>{{ valuation.subscription.plan.description }}.</p>
          <p style="font-size: 0.9rem;" class="m-0"><span class="font-weight-bold">Estado: </span>
            <span :class="`badge bg-${ stateColorSubs(valuation.subscription.state)} ms-2 text-white`">{{
                stateTitleSubs(valuation.subscription.state)
              }}</span></p>
          <p style="font-size: 0.9rem;" class="m-0"><span
            class="font-weight-bold">Fecha de Suscripción: </span>{{ $moment(valuation.subscription.created_at).format('LL') }}
          </p>
        </div>
        <hr>
        <h6>Información del Objetivo</h6>
        <div>
          <p style="font-size: 0.9rem;"><span class="font-weight-bold">Estado: </span><span
            :class="`badge bg-${ stateColorObjec(valuation.state)} ms-2 text-white`">{{
              stateTitleObjec(valuation.state)
            }}</span></p>
          <p style="font-size: 0.9rem;"><span class="font-weight-bold">Nombre Objetivo: </span>{{ valuation.name }}.</p>
          <p style="font-size: 0.9rem;"><span
            class="font-weight-bold">Tipo de Tratamiento: </span>{{ valuation.treatment.treatment }}.</p>
          <p style="font-size: 0.9rem;"><span
            class="font-weight-bold">Detalle del Objetivo: </span>{{ valuation.objectives }}</p>
          <p style="font-size: 0.9rem;"><span class="font-weight-bold">Fotos o Documentos: </span></p>
          <Archives :archives="valuation.archives"/>
        </div>
        <h6>Cita{{ appointments.length >= 1 ? 's' : '' }}</h6>
        <div v-if="appointments.length > 0">
          <ul>
            <li v-for="(appointment, index) in valuation.appointments" :key="'appoint-'+appointment.date"
                class="font-weight-bold">
              <i class="bx bx-check-circle check-appointment ml-1 text-success mr-1"></i>
              Cita {{ index + 1 }}<br>
              <span class="badge bg-success ms-2 text-white mt-1">{{ $moment(appointment.date).tz(timezoneUser).format('LLLL') }}</span><br>
              <a class="btn mt-3 bt-sm btn-creative btn-zoom btn-primary" target="_blank" :href="appointment.link_meeting"><i class="bx bxl-zoom"></i> Link Zoom</a><br>
              <span :class="`badge bg-${ stateColorApp(appointment.state)} ms-2 text-white mt-3`">{{
                  stateTitleApp(appointment.state)
                }}</span><br>
              <p class="mt-1" style="margin-top: 5px">Esp. {{ appointment.doctor.user.name }} {{
                  appointment.doctor.user.last_name
                }}</p>
              <hr>
            </li>
          </ul>
        </div>
        <div v-else>
          <h6 class="font-weight-bold text-center text-black">No hay citas agendadas</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Archives from "./Archives";

export default {
  name: "Information",
  components: {Archives},
  data() {
    return {
      appointments: [],
      timezoneUser: null,
    }
  },
  props: ['valuation'],

  methods: {
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

    stateColorApp(state){
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
    stateTitleApp(state){
      switch (state) {
        case '1':
          return 'Pendiente'
        case '2':
          return 'Cancelado'
        case '3':
          return 'Finalizada'
        case '5':
          return 'En Progreso'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.appointments = this.valuation.appointments
    }, 1000)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timezoneUser = timeZone
  }
}
</script>

<style scoped>

</style>
