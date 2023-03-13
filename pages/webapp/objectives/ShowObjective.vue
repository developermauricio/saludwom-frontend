<template>
  <div class="container">
    <vs-tabs color="#D85C72" alignment="fixed">
      <vs-tab label="Información">
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
      <vs-tab label="Terapeuta">
        <div>
          <h2>Terapeuta</h2>
        </div>
      </vs-tab>
      <vs-tab label="Tratamiento">
        <div>
          <h2>Tratamiento</h2>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue";
import {bus} from "../../../plugins/bus";

export default {
  name: "ShowObjective",
  components: {
    Information: defineAsyncComponent(() => import('./components/showComponents/Information'))
  },
  data() {
    return {
      messageMissingAppointments: '',
      missingAppointments:false,
      valuation: {
        treatment: {treatment: null},
        subscription: {plan: {name: null, description: null}}
      }
    }
  },
  methods: {
    // Válidamos si tiene completas el número de citas según el plan
    validateAppointment(valuation){
      if (valuation){
        let appointments = valuation.appointments
        let planNumberAppoint = valuation.subscription.plan.number_appointments
        let totalAppointPending = 0
        appointments.map(app =>{
            if (app.state === '1' || app.state === '3' || app.state === '5'){
              totalAppointPending ++
            }
        })
        if (totalAppointPending !== planNumberAppoint){
            this.missingAppointments = true
            this.messageMissingAppointments = `Para tu plan actual "${valuation.subscription.plan.name}", no has completado el número de citas (${planNumberAppoint}) que puedes agendar, por favor completa tu agenda.`
        }
      }
    },
    getValuation() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
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
    bus.$on('updateDataValuation', () => {
      this.getValuation()
    })
  }
}
</script>

<style scoped>

</style>
