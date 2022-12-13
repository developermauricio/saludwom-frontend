<template>
  <div class="container">
    <div class="card invoice-card">
      <div class="card-body">
        <!-- Download Invoice -->
        <div class="d-flex justify-content-between">
          <!-- Invoice Info -->
          <div class="invoice-info text-end mb-1">
            <h5 class="mb-1" style="font-size: 1.2rem">Salud WoM.</h5>
            <h6 class="fz-12">Orden No. {{ data.id }}</h6>
            <p class="mb-0 fz-12">Fecha de Pago: <span class="date-format">{{ $dateFns.format(data.created_at, 'MMMM dd yyyy') }}</span></p>
            <span :class="`badge bg-${ stateColor(data.state)} ms-2 text-white`">{{ stateTitle(data.state) }}</span>
          </div>

          <div class="download-invoice text-end mb-3 ">
            <a class="btn btn-sm btn-primary me-2" @click="downloadInvoice()">
              <i class="bi bi-file-earmark-pdf me-1"></i>
              Descargar PDF
            </a>
          </div>
        </div>
        <!-- Invoice Table -->
        <div class="invoice-table">
          <div class="table-responsive">
            <table class="table table-bordered caption-top">
              <!--              <caption>List of works</caption>-->
              <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th class="text-center">Valor Unitario €</th>
                <th>Total €</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ data.id }}</td>
                <td><strong>{{ data.subscription ? data.subscription.plan.name : '' }}. </strong>{{ data.subscription ? data.subscription.plan.description :'' }}</td>
                <td>1</td>
                <td>{{ (data.price_total / 100).toFixed(2)  | currency }}€</td>
                <td>{{ (data.price_total / 100).toFixed(2) | currency }}€</td>
              </tr>
              </tbody>
              <tfoot class="table-light">
              <tr>
                <td class="text-end" colspan="4">Costo Plan:</td>
                <td>{{ (data.price_total / 100).toFixed(2) | currency }}€</td>
              </tr>
              <tr>
                <td class="text-end" colspan="4">Descuento:</td>
                <td>{{ (discount(data.discount, data.price_total) / 100).toFixed(2)  | currency }}€
                </td>
              </tr>
              <tr>
                <td class="text-end" colspan="4">Costo Toal:</td>
                <td>
                  {{ data.discount ? (data.discount / 100).toFixed(2) : (data.price_total / 100).toFixed(2) | currency }}€
                </td>
              </tr>
              <!--              <tr>-->
              <!--                <td class="text-end" colspan="4">VAT (10%):</td>-->
              <!--                <td class="text-end">$74</td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="text-end" colspan="4">Grand Total:</td>-->
              <!--                <td class="text-end">$814</td>-->
              <!--              </tr>-->
              </tfoot>
            </table>
          </div>
        </div>
        <!--        <p class="mb-0">Notice: This is auto generated invoice.</p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  props: ['data'],
  methods: {
    async downloadInvoice() {
      window.open(
        process.env.BASE_URL_API_MONITOR_BACK + '/api/v1/download-invoice/' + this.data.id + '/' + this.$auth.user.id, "_blank"
      )
    },
    discount(discount, total) {
      console.log(discount)
      console.log(total)
      return discount ? total - discount : 0.00
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

}
</script>

<style scoped>

</style>
