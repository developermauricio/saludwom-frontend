<template>
  <div class="container py-4">
    <div class="d-flex justify-content-center">
      <div :class="`card w-25 align-items-center p-2 bg-icon-${iconColor(dataPlan.name)}`">
        <img :src="require(`~/assets/img/icons/${iconPlan(dataPlan.name)}`)" width="60" alt="Salud WoM">
      </div>
    </div>
    <!-- Info-->
    <div class="ml-2 text-center py-2">
      <h5 class="sb-title m-0">{{ dataPlan.name }}</h5>
      <p class="m-0"><strong class="sb-price">€{{ dataPlan.price }}</strong> / Vence
        {{ $dateFns.format(dataSubscription.expiration_date, 'MMM dd yyyy') }}</p>
      <p class="mb-1"> Suscrit@ el {{ $dateFns.format(dataSubscription.created_at, 'MMM dd yyyy') }}</p>
      <p class="m-0">{{ dataPlan.description }}</p>

      <span :class="`badge bg-${ stateColor(dataSubscription.state)} ms-2 text-white`">{{
          stateTitle(dataSubscription.state)
        }}</span>

    </div>
    <div class="text-center" v-if="dataSubscription.state === '1'">
      <p class="ms-2 text-danger">El estado es pendiente mientras termina el proceso de pago u otra solicitud. Si necesitas ayuda, no dudes en contactarnos.</p>
    </div>

    <div class="text-center mt-2" v-if="dataSubscription.state !== '2' && dataSubscription.state !== '5' && dataSubscription.state !== '1'">
      <hr>
      <button class="btn btn-danger" @click="cancelledSubscription(dataSubscription.id)">Cancelar Suscripción</button>
    </div>
    <div class="text-center mt-2" v-else-if="dataSubscription.state !== '1'">
      <hr>
      <button @click="closeModal" class="btn btn-success" >Renovar o comprar</button>
    </div>
    <!--    {{ dataPlan }}-->
  </div>
</template>

<script>
import {bus} from "../../../../plugins/bus";

export default {
  name: "SubscriptionInfo",
  data() {
    return {}
  },
  props: ['dataPlan', 'dataSubscription'],
  methods: {
    closeModal(){
      this.$router.push({name: 'index.plans'});
      this.$FModal.hide()
    },
    cancelledSubscription(){
      this.$FModal.hide()
      bus.$emit('cancelledSubscription', true)
    },
    iconColor(plan) {
      switch (plan) {
        case 'Plan Rubí':
          return 'rubi'
        case 'Plan Esmeralda':
          return 'esmeralda'
        case 'Plan Diamante':
          return 'diamante'
      }
    },
    iconPlan(plan) {
      switch (plan) {
        case 'Plan Rubí':
          return 'rubi.png'
        case 'Plan Esmeralda':
          return 'esmeralda.png'
        case 'Plan Diamante':
          return 'diamante.png'
      }
    },
    stateColor(state) {
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
    stateTitle(state) {
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
    }
  }
}
</script>

<style scoped>
.sb-price {
  color: #D85C72 !important;
}

.bg-success {
  background-color: #49a65a !important;
}

.bg-icon-rubi {
  background-color: #f8b7c8 !important;
}

.bg-icon-esmeralda {
  background-color: #d1f8aa !important;
}

.bg-icon-diamante {
  background-color: #c3e5fa !important;
}
</style>
