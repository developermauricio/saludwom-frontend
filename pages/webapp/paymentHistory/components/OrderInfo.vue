<template>
  <div class="container">
    <div class="card invoice-card">
      <div class="card-body">
        <!-- Download Invoice -->
        <div class="download-invoice text-end mb-3">
          <a class="btn btn-sm btn-primary me-2" @click="downloadInvoice()">
            <i class="bi bi-file-earmark-pdf me-1"></i>
            Descargar
          </a>
<!--          <a class="btn btn-sm btn-light" href="#">-->
<!--            <i class="bi bi-printer me-1"></i>Print-->
<!--          </a>-->
        </div>
        <!-- Invoice Info -->
        <div class="invoice-info text-end mb-1">
          <h5 class="mb-1 fz-14">Salud WoM.</h5>
          <h6 class="fz-12">Orden No. {{ data.id}}</h6>
          <p class="mb-0 fz-12">Fecha: {{ $dateFns.format(data.created_at, 'MMM dd yyyy') }}</p>
          <span :class="`badge bg-${ stateColor(data.state)} ms-2 text-white`">{{ stateTitle(data.state) }}</span>
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
                <td><strong>{{ data.subscription.plan.name }}. </strong>{{ data.subscription.plan.description }}</td>
                <td>1</td>
                <td>{{ data.price_total }}€</td>
                <td>{{ data.price_total }}€</td>
              </tr>
              </tbody>
              <tfoot class="table-light">
              <tr>
                <td class="text-end" colspan="4">Total:</td>
                <td class="text-end">{{ data.price_total }}€</td>
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
  methods:{
    async downloadInvoice(){
      window.open(
        process.env.BASE_URL_API_MONITOR_BACK+'/api/v1/download-invoice/'+this.data.id+'/'+this.$auth.user.id, "_blank"
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
  }
}
</script>

<style scoped>

</style>
