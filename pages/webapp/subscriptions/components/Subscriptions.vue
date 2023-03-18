<template>
  <div>
    <client-only>
      <vue-confirm-dialog></vue-confirm-dialog>
    </client-only>
    <div class=" mb-4 d-flex justify-content-center align-self-center" v-if="!subscriptions.length > 0 && showMessage">
      <h5 class="">No hay suscripciones disponibles</h5>
    </div>
    <div class="" v-else>
      <div class="d-flex justify-content-between mb-2">
        <div>
          <h6>Total de suscripciones: {{ totalSubs }} </h6>
        </div>
        <vs-dropdown vs-custom-content vs-trigger-click class="d-flex content-filter">
          <!--          <i class="bx bx-filter icon-filter"></i>-->
          <!--          <div class="d-flex justify-content-center align-items-center">-->
          <!--            <p class="m-0 text-filer">Filtrar</p>-->
          <!--          </div>-->


          <vs-dropdown-menu>
            <div class="p-2">
              <h6>Filtra por estado</h6>
              <div v-for="state in filterStateS" :key="state.state">
                <vs-checkbox
                  @input="filterGetSub"
                  color="#792151"
                  class="mb-2"
                  :id="state.state"
                  :vs-value="state.state"
                  v-model="filters">{{ state.title }}

                </vs-checkbox>
              </div>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <vue-loadmore
        :loadOffset="100"
        :finishedText="'No hay más suscripciones'"
        :loadingText="'Cargando'"
        :successText="'Actualizado'"
        :loosingText="'Soltar para actualizar'"
        :refreshText="'Actualizando'"
        :pullingText="'Desplegar para actualizar'"
        ref="loadmoreRef"
        :finished="finished"
        :on-refresh="onRefresh"
        :on-loadmore="onLoad">
        <ul class="list-ul">
          <li class="card mb-3" v-for="(subscription, index) in subscriptions" :key="subscription.id+'-'+index">
            <div class="card-body">
              <!-- Content-->
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <!-- Icon-->
                  <div
                    :class="`card w-25 d-flex justify-content-center align-items-end p-1 bg-icon-${iconColor(subscription.plan.name)}`">
                    <img :src="require(`~/assets/img/icons/${iconPlan(subscription.plan.name)}`)" width="60"
                         alt="Salud WoM">
                  </div>
                  <!-- Info-->
                  <div class="ml-2">
                    <h5 class="sb-title m-0">{{ subscription.plan.name }}</h5>
                    <div class="m-0 d-flex">
                      <div class="mr-1">
                        <strong class="sb-price">€{{ subscription.plan.price }}</strong>
                      </div>

                      <!--                    <div v-if="subscription.expiration_date">-->
                      <!--                       / Vence {{subscription.expiration_date ? $dateFns.format(subscription.expiration_date, 'MMM dd yyyy') : 'Validando' }}-->
                      <!--                    </div>-->
                    </div>
                    <span :class="`badge bg-${ stateColor(subscription.state)} ms-2 text-white`">{{
                        stateTitle(subscription.state)
                      }}</span>
                  </div>
                </div>
                <!-- Opciones-->
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <i class="bx bx-dots-vertical"></i>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="openInfoSubs(subscription.plan, subscription)">
                      <p class="m-0">Más Info</p>
                    </vs-dropdown-item>
                    <vs-dropdown-item
                      v-if="subscription.state !== '2' && subscription.state !== '5' && subscription.state !== '1'"
                      :class="`${subscription.state !== '2' ? 'item-dropdown' || subscription.state !== '5' : ''}`"
                      @click="cancelSubscription(subscription.id)">
                      <p class="m-0">Cancelar Suscripción</p>
                    </vs-dropdown-item>
                    <vs-dropdown-item v-if=" subscription.state !== '4' && subscription.state !== '1'"
                                      :class="`${subscription.state !== '4' ? 'item-dropdown' :'' }`">
                      <nuxt-link to="/webapp/planes"><p class="m-0">Renovar o comprar</p></nuxt-link>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
          </li>
        </ul>
      </vue-loadmore>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
import SubscriptionInfo from "./SubscriptionInfo";
import {bus} from "../../../../plugins/bus";

export default {
  name: "Subscriptions",
  data() {
    return {
      pageIndex: 1,
      pageSize: 0,
      openRefresh: true,
      finished: false,
      totalCount: 0,

      subscriptions: [],
      totalSubs: null,
      filters: [],
      filterState: [],
      filterStateS: [
        {state: '1', title: 'Pendiente'},
        {state: '2', title: 'Cancelado'},
        {state: '3', title: 'Rechazado'},
        {state: '4', title: 'Activo'},
        {state: '5', title: 'Completado'}
      ],

      showMessage: false,
      error: false,
      // page: 0,
      loadingRefreshData: false,
      // lastPage: null,

    }
  },
  computed: {
    filterListSubscription: function () {
      if (this.filters.length > 0) {
        return this.subscriptions.filter(function (item) {
          return this.filters.includes(item.state);
        }, this)
      }
      return this.subscriptions
    }
  },

  methods: {
    filterGetSub() {
      if (this.filters.length > 0) {
        this.initData()
        this.$axios.get(`/api/v1/get-subscriptions-state/${JSON.stringify(this.filters)}`).then(resp => {
          this.subscriptions = resp.data.data
        }).catch((e) => {
          console.log('ERROR', e);
          this.$toast.error({
            title: 'Error',
            message: 'Error al obtener las suscripciones. Consulte a soporte SaludWom.',
            showDuration: 1000,
            hideDuration: 8000,
          })
          this.$vs.loading.close()
        })
      } else {
        this.initData()
        this.getSubscriptions()
      }
    },
    initData() {
      this.showMessage = false
      this.subscriptions = []
      this.finished = false
      this.pageIndex = 1
    },
    onRefresh(done) {
      setTimeout(() => {
        this.initData()
        this.getSubscriptions()
        done();
      }, 50)

    },
    onLoad(done) {
      if (this.pageIndex <= this.pageSize) {
        this.pageIndex++;
        this.getSubscriptions()
      } else {
        this.finished = true
      }
      done();
    },
    /*Obtener todas las suscripciones*/
    async getSubscriptions() {

      await this.$axios.get(`/api/v1/get-subscriptions/?page=${this.pageIndex}`).then(({data}) => {
        if (data.data.data.length === 0) {
          this.$vs.loading.close()
          return this.showMessage = false
        }
        data.data.data.forEach((item) => {
          this.subscriptions.push(item)
        })
        this.pageSize = data.lastPage
        this.totalSubs = data.total
        this.$vs.loading.close()
        /* Agregar filtros*/
        // data.data.data.map((data) => {
        //   if (this.filterState.length <= 0) {
        //     this.addFilters(data)
        //   }
        // })
        // data.data.data.map((data) => {
        //   let exit = this.filterState.some(item => item.state === data.state)
        //   if (!exit) {
        //     this.addFilters(data)
        //   }
        // })

      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener las suscripciones. Consulte a soporte SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },

    openInfoSubs(plan, subscription) {
      this.$FModal.show(
        {
          component: SubscriptionInfo
        },
        {
          dataPlan: plan,
          dataSubscription: subscription
        }
      )
    },

    async cancelSubscription(subscription) {
      this.$confirm(
        {
          message: '¿Esta seguro de cancelar la suscripción?',
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
                text: 'Cancelado la suscripción. Espere por favor...'
              })
              await this.$axios.post(`/api/v1/cancel-subscription/${subscription}`).then(resp => {
                this.$vs.loading.close()
                this.$toast.success({
                  title: 'Confirmación',
                  message: 'La suscripción fue cancelada exitosamente!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })
                this.subscriptions.forEach((subs, index) => {
                  if (subs.id === resp.data.data.id) {
                    localStorage.removeItem('subscription')
                    this.subscriptions[index].state = '2'
                  }
                })
                this.subscriptions.sort((a, b) => {
                  return b.state - a.state
                })

              }).catch(e => {
                this.$vs.loading.close()
                console.log('ERROR CANCELAR SUSCRIPCIÓN', e.response)
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al cancelar la suscripción. Consulte al administrador',
                  showDuration: 1000,
                  hideDuration: 10000,
                })
              })
            }
          }
        })
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
    },

    addFilters(data) {
      switch (data.state) {
        case '1':
          this.filterState.push({state: '1', title: 'Pendiente'})
          break
        case '2':
          this.filterState.push({state: '2', title: 'Cancelado'})
          break
        case '3':
          this.filterState.push({state: '3', title: 'Rechazado'})
          break
        case '4':
          this.filterState.push({state: '4', title: 'Activo'})
          break
        case '5':
          this.filterState.push({state: '5', title: 'Completado'})
          break
      }
    },
    loading() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
    },
  },

  mounted() {
    this.loading()
    this.getSubscriptions()
    bus.$on('cancelledSubscription', (data) => {
      setTimeout(() => {
        this.cancelSubscription(data)
      }, 500)
    })
  }
}
</script>

<style scoped>
.con-vs-checkbox {
  justify-content: normal;
}

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
