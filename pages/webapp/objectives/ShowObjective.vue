<template>
  <div class="container">
    <vue-loadmore
      :loadOffset="150"
      :successText="'Actualizado'"
      :loosingText="'Soltar para actualizar'"
      :refreshText="'Actualizando'"
      :pullingText="'Desplegar para actualizar'"
      :finished="finished"
      ref="loadmoreRef"
      :on-refresh="onRefresh"
    >
      <!-- Título y Estado -->
      <div class="px-4 py-3">
        <div class="">
          <!-- Titulo -->
          <h4>{{ valuation.name }}</h4>
          <!-- Estado del Plan -->
          <div>
            <span :class="`badge bg-${ stateColorObjec(valuation.state)} ms-2 text-white`">{{
                stateTitleObjec(valuation.state)
              }}</span>
          </div>
        </div>
      </div>

      <vs-tabs color="#D85C72" alignment="fixed" class="tabs-objective">
        <vs-tab label="Objetivo">
          <div class="pt-2">
            <vs-tooltip text="Mientras tu objetivo este pendiente de recibir recursos, puedes editar tu información.">
              <span class="badge bg-danger text-white w-100" v-if="valuation.state === '1'">Disponible para editar (Clic para más info)</span>
            </vs-tooltip>
            <Information
              :valuation="valuation"
              :missingAppointments="missingAppointments"
              :messageMissingAppointments="messageMissingAppointments"
              @getValuation="getValuation"/>
          </div>
        </vs-tab>
        <vs-tab label="Recursos">
          <div>
            <h2 class="text-light">Terapeuta</h2>
          </div>
        </vs-tab>
        <vs-tab label="Tratamiento">
          <div>
            <h2 class="text-light">Tratamiento</h2>
          </div>
        </vs-tab>
      </vs-tabs>
    </vue-loadmore>
    <ChatValoration :valuation="valuation" :chatChannel="valuation.chat" v-if="valuation.subscription.plan_id === 1 || valuation.subscription.plan_id === 2"/>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue";
import {bus} from "../../../plugins/bus";
import EditObjective from "./components/showComponents/editInformation/EditObjective";
import ChatValoration from "../../../components/ChatValoration";

export default {
  name: "ShowObjective",
  components: {
    ChatValoration,
    Information: defineAsyncComponent(() => import('./components/showComponents/Information'))
  },
  data() {
    return {
      finished: false,
      messageMissingAppointments: '',
      missingAppointments: false,
      valuation: {
        treatment: {treatment: null},
        subscription: {plan: {name: null, description: null}}
      }
    }
  },
  methods: {
    initData() {
      this.valuations = []
      this.finished = false
    },
    onRefresh(done) {
      setTimeout(() => {
        this.initData()
        this.getValuation()
        this.finished = false
        done();
      }, 50)
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
    // Válidamos si tiene completas el número de citas según el plan
    validateAppointment(valuation) {
      if (valuation) {
        let appointments = valuation.appointments
        let planNumberAppoint = valuation.subscription.plan.number_appointments
        let totalAppointPending = 0
        appointments.map(app => {
          if (app.state === '1' || app.state === '3' || app.state === '5') {
            totalAppointPending++
          }
        })
        if (totalAppointPending !== planNumberAppoint) {
          this.missingAppointments = true
          this.messageMissingAppointments = `Para tu plan actual "${valuation.subscription.plan.name}", no has completado el número de citas (${planNumberAppoint}) que puedes agendar, por favor completa tu agenda.`
        }
      }
    },
    getValuation() {
      const params = this.$route.params
      this.$axios.get(`/api/v1/get-valuation/${params.slug}`).then(resp => {
        this.valuation = resp.data.data
        this.$vs.loading.close()
        this.validateAppointment(this.valuation)
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener el objetivo. Consulte a soporte SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    }
  },
  mounted() {
    this.$vs.loading({
      color: process.env.COLOR_BASE,
      text: 'Espere por favor...'
    })
    bus.$on('updateDataValuation', () => {
      this.getValuation()
    })
  }
}
</script>

<style scoped>

</style>
