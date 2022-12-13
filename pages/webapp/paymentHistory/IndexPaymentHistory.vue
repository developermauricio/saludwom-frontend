<template>
  <div>
    <div class="container payment-history">
      <NotOrders v-if="notOrders"/>
      <div class="card" v-if="!notOrders">
        <div class="card-body justify-content-center align-items-center">
          <h5 class="mb-3">Historial de Pagos</h5>
          <v-table class="table mb-0 table-striped table-responsive-sm table-responsive-md"
                   :currentPage.sync="currentPage"
                   :pageSize="8"
                   @totalPagesChanged="totalPages = $event"
                   :data="orders">
            <thead slot="head">
            <th scope="col"># Orden</th>
            <th scope="col">Descri</th>
            <th scope="col">Estado</th>
            <th scope="col">Valor</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="order in displayData" :key="order.id">
              <th class="text-center" scope="row"><span class="text-primary">{{ order.id }}</span></th>
              <td><span @click="openInfoSubs(order)"
                        class="text-primary" style="cursor: pointer">{{ order.subscription ? order.subscription.plan.name : '' }}</span></td>
              <td><span :class="`badge bg-${ stateColor(order.state)} ms-2 text-white`">{{
                  stateTitle(order.state)
                }}</span></td>
              <td class="text-center font-weight-bold">{{
                  order.discount ? (order.discount / 100).toFixed(2) : (order.price_total / 100).toFixed(2) | currency
                }}€
              </td>
              <td><span class="date-format">{{ $dateFns.format(order.created_at, 'MMM dd yyyy') }}</span></td>
              <td class="text-center icon-more">
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <i class="bx bx-dots-vertical"></i>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="openInfoSubs(order)">
                      <p class="m-0">Más Info</p>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="downloadInvoice(order)">
                      <p class="m-0">Descargar Orden de Compra</p>
                    </vs-dropdown-item>

                  </vs-dropdown-menu>
                </vs-dropdown>
              </td>
            </tr>
            </tbody>
          </v-table>
          <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderInfo from "./components/OrderInfo";

export default {
  name: "IndexPaymentHistory",
  data() {
    return {
      notOrders: false,
      orders: [],
      currentPage: 1,
      totalPages: 0
    }
  },
  methods: {
    async downloadInvoice(order) {
      window.open(
        process.env.BASE_URL_API_MONITOR_BACK + '/api/v1/download-invoice/' + order.id + '/' + this.$auth.user.id, "_blank"
      )
    },
    async getOrders() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      await this.$axios.get('/api/v1/get-orders-patient').then(resp => {
        this.orders = resp.data.data
        if (this.orders.length === 0) {
          this.notOrders = true
        }
        this.$vs.loading.close()
      }).catch(e => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener las ordenes de compras. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },

    openInfoSubs(order) {
      this.$FModal.show(
        {
          component: OrderInfo,
          placement: 'center top',
        },
        {
          data: order,
        }
      )
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
          return 'Aceptado'
      }
    },
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>
