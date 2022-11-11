<template>
  <div>
    <client-only>
      <vue-confirm-dialog></vue-confirm-dialog>
    </client-only>

<!--    <div class=" mb-4 d-flex justify-content-center align-self-center" v-show="!subscriptions.length > 0 && showMessage">-->
<!--      <h5 class="">No hay suscripciones disponibles</h5>-->
<!--    </div>-->
    <div class="container">
      <div class="d-flex justify-content-between mb-2">
        <div>
          <h6>Total de suscripciones: {{ totalSubs }} </h6>
        </div>
        <vs-dropdown vs-custom-content vs-trigger-click class="d-flex content-filter">
          <i class="bx bx-filter icon-filter"></i>
          <div class="d-flex justify-content-center align-items-center">
            <p class="m-0 text-filer">Filtrar</p>
          </div>

          <vs-dropdown-menu>
            <div class="p-2">
              <h6>Filtra por estado</h6>
              <!--                <div v-for="state in filterState" :key="state.state">-->
              <!--                  <vs-checkbox-->
              <!--                    color="#792151"-->
              <!--                    class="mb-2"-->
              <!--                    :id="state.state"-->
              <!--                    :vs-value="state.state"-->
              <!--                    v-model="filters">{{ state.title }}-->

              <!--                  </vs-checkbox>-->
              <!--                </div>-->
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <div class="wrap">
        <vue-loadmore
          ref="loadmoreRef"
          :pulling-text="'Actualizar'"
          :finished-text="'Actualizado'"
          :loosing-text="'Suelta para actualizar'"
          :refresh-text="'Actualizando'"
          :loading-text="'Obteniendo suscripciones'"
          :success-text="'Actualizado correctamente'"
          :on-refresh="onRefresh"
          :on-loadmore="onLoad"
          :load-offset="100"
          :finished="loadingRefreshData">

          <div class="card mb-3" v-for="(subscription, index) in filterListSubscription" :key="subscription.id">
            <div class="card-body">
              <!-- Content-->
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <!-- Icon-->
                  <div
                    :class="`card w-25 d-flex justify-content-end align-items-end p-2 bg-icon-${iconColor(subscription.plan.name)}`">
                    <img :src="require(`~/assets/img/icons/${iconPlan(subscription.plan.name)}`)" width="60"
                         alt="Salud WoM">
                  </div>
                  <!-- Info-->
                  <div class="ml-2">
                    <h5 class="sb-title m-0">{{ subscription.plan.name }}</h5>
                    <p class="m-0"><strong class="sb-price">€{{ subscription.plan.price }}</strong> / Vence
                      {{ $dateFns.format(subscription.expiration_date, 'MMM dd yyyy') }}</p>
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
          </div>
        </vue-loadmore>
      </div>

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
      subscriptions: [],
      totalSubs: null,
      filters: [],
      filterState: [],

      showMessage:false,
      error: false,
      page: 1,
      loadingRefreshData: false,
      lastPage: null,

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
    moreGetSubscriptions(done) {
      if (this.page <= this.lastPage) {
        this.page++
        // this.loadingRefreshData = true
        this.$axios.get(`/api/v1/get-subscriptions/?page=${this.page}`).then(({data}) => {
          data.data.data.map(item => {
            this.subscriptions.push(item)
          })
          // this.loadingRefreshData = false
        }).catch(e => {
          console.log('Error ', e);
        })
        // window.onscroll = function () {
        //   alert('hola')
        //   if (this.page > this.lastPage) {
        //     return
        //   }
        //   if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        //     this.loadingRefreshData = true
        //     setTimeout(() => {
        //       this.page = this.page + 1
        //
        //       this.$axios.get(`/api/v1/get-subscriptions/?page=${this.page}`).then(({data}) =>{
        //         data.data.map(item =>{
        //           this.subscriptions.push(item)
        //         })
        //         this.loadingRefreshData = false
        //       }).catch(e =>{
        //         console.log('Error ', e.response);
        //       })
        //
        //     }, 500)
        //   }
        // }
        done();
      } else {
        this.page = 1
        this.loadingRefreshData = true
      }
      // setTimeout(() => {
      //   this.$refs.loadmoreRef.checkSroll();
      // }, 1500);
    },
    initData() {
      this.showMessage = false
      this.subscriptions = []
      this.page = 1
      this.loadingRefreshData = false
    },
    onRefresh(done) {
      this.initData()
      this.getSubscriptions()
      done();
    },
    onLoad(done) {
      if (this.page <= this.lastPage) {
        this.getSubscriptions()
      } else {
        this.loadingRefreshData = true
      }
      done();
    },
    /*Obtener todas las suscripciones*/
    async getSubscriptions() {

      await this.$axios.get(`/api/v1/get-subscriptions/?page=${this.page}`).then(({data}) => {
        if (data.data.data.length < 0){
         return this.showMessage = true
        }
        data.data.data.forEach((item) => {
          this.subscriptions.push(item)
        })
        this.page++;
        this.lastPage = data.lastPage
        this.totalSubs = data.total
        // this.subscriptions = []
        // this.subscriptions = data.data.data
        this.$vs.loading.close()


        // this.fetch();
        // this.loadingRefreshData = false
        /* Agrear filtros*/
        // resp.data.data.map((data) => {
        //   if (this.filterState.length <= 0) {
        //     this.addFilters(data)
        //   }
        // })
        // resp.data.data.map((data) => {
        //   let exit = this.filterState.some(item => item.state === data.state)
        //   if (!exit){
        //     this.addFilters(data)
        //   }
        // })

      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener las suscripciones. Consulte con el administrador.',
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
                this.getSubscriptions()
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
    // this.fetch();
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
