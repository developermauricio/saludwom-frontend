<template>
  <div>
    <!--=====================================
          INFO DEL OBJETIVO
      ======================================-->
<!--    <vue-confirm-dialog></vue-confirm-dialog>-->
    <div class="card mb-3">
      <div class="card-body">
        <!-- Título y Estado -->
        <div class="d-flex justify-content-between">
          <!-- Titulo -->
          <div>
            <h5>Tu Objetivo.</h5>
          </div>
          <!-- Estado del Plan -->
          <div>
            <span :class="`badge bg-${ stateColorObjec(valuation.state)} ms-2 text-white`">{{
                stateTitleObjec(valuation.state)
              }}</span>
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
        <!-- Editar -->
        <div class="float-right" v-if="valuation.state === '1'">
          <a @click="openEditObjective"  style="cursor: pointer">Editar</a>
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
        <div class="d-flex justify-content-between">
          <!-- Titulo -->
          <div>
            <h5>Cita{{ valuation.appointments && valuation.appointments.length >= 1 ? 's' : '' }}.</h5>
          </div>

        </div>
        <!-- Citas -->
        <div v-if="valuation.appointments && valuation.appointments.length > 0">
          <div v-for="(appointment, index) in valuation.appointments" :key="'appoint-'+appointment.date" class="mb-3">
            <div class="d-flex justify-content-between">
              <div>
                <p style="color: gray !important; font-size: 12px" class="mb-0">Fecha de cita.</p>
                <div class="d-flex align-items-center">
                  <i class="bx bx-time-five mr-1"></i>
                  <p class="m-0">
                    {{ appointment.date ? $moment(appointment.date).tz(timezoneUser).format('LLLL') : 'No hay fecha' }}</p>
                </div>
              </div>
              <!-- Boton Zoom -->
              <div>
                <a class="btn m-1 btn-circle btn-info" :href="appointment.link_meeting" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       class="bi bi-camera-video" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
                  </svg>
                </a>
              </div>
            </div>
            <!-- Info doctor -->
            <div class="mt-2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-secondary">Esp. {{ appointment.doctor.user.name }}
                    {{ appointment.doctor.user.last_name }}</h6>
                </div>
                <div>
                   <span :class="`badge bg-${ stateColorApp(appointment.state)} text-white`">
                  {{ stateTitleApp(appointment.state) }}</span>
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
          <div class="d-flex justify-content-between">
            <p class="text-muted" style="color: gray !important; font-size: 12px">Este plan vence el
              {{
                valuation.subscription ? $moment(valuation.subscription.created_at).format('LL') : 'No hay fecha'
              }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Archives from "./Archives";
import EditObjective from "./editInformation/EditObjective";
import {bus} from "../../../../../plugins/bus";

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
    openEditObjective(){
      this.$FModal.show(
        {
          component: EditObjective,
          clickToClose: false,
          escToClose: false,
          placement: 'center top',
        },
        {
          valuation:{
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
          return 'Cancelado'
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
  }
}
</script>

<style scoped>

</style>
