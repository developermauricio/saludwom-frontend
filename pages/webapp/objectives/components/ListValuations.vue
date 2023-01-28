<template>
  <div class="container">
    <NotObjectives v-if="notObjectives"/>
    <load-more v-if="!notObjectives"
      class="items-service"
      :pageIndex="pageIndex"
      :pageSize="pageSize"
      :totalCount="totalCount"
      :openRefresh="openRefresh"
      @refresh="onRefresh"
      @loadmore="onLoad">
      <div class="card mb-3 single-card" v-for="(valuation, index) in valuations" :key="valuation.id">
        <nuxt-link :to="`/webapp/objetivos/${valuation.slug}`" class="card-body" >
          <!-- Content-->
          <div class="d-flex align-items-center">
            <div class="d-flex">

              <!-- Info-->
              <div class="ml-2">
                <h5 class="sb-title">{{ valuation.name }}</h5>
                <p style="font-size: 0.9rem;" class="m-0"><span class="font-weight-bold">Tratamiento: </span>{{valuation.treatment.treatment}}</p>
                <p style="font-size: 0.9rem;" class="m-0"><span class="font-weight-bold">Creado: </span>{{$moment(valuation.created_at).tz(timezoneUser).format('LL')}}</p>
                <p style="font-size: 0.9rem;"><span class="font-weight-bold">Estado: </span><span :class="`badge bg-${ stateColor(valuation.state)} ms-2 text-white`">{{
                    stateTitle(valuation.state)
                  }}</span></p>
              </div>
            </div>

            <div class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right"
                   viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
    </load-more>
  </div>
</template>

<script>
export default {
  name: "ListValuations",
  data(){
    return{
      timezoneUser: null,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      totalSubs: null,

      loadingRefreshData: false,
    }
  },
  props: ['valuations', 'notObjectives', 'openRefresh'],
  methods:{

    stateTitle(state) {
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
    stateColor(state) {
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
    initData() {
      this.valuations = []
      this.page = 1
      this.loadingRefreshData = false
    },
    onRefresh() {
      setTimeout(() => {
        this.initData()
        this.getValuations()
        // done();
      }, 50)

    },
    onLoad(pageIndex) {
      this.pageIndex = pageIndex
      if (this.pageIndex <= this.pageSize) {
        this.getValuations()
      } else {
        this.loadingRefreshData = true
      }
      // done();
    },
    async getValuations(){
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      await this.$axios.get(`/api/v1/get-valuations/?page=${this.page}`).then(({data}) => {
        this.openRefresh = true
        if (data.data.data.length < 0) {
          return this.showMessage = false
        }
        data.data.data.forEach((item) => {
          this.valuations.push(item)
        })
        if (this.valuations.length === 0) {
          this.notObjectives = true
        }

        this.pageSize = data.lastPage
        this.totalSubs = data.total
        this.$vs.loading.close()

      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener lista de objetivos. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    }
  },
  mounted() {
    // this.getValuations()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timezoneUser = timeZone
  }
}
</script>

<style scoped>

</style>
