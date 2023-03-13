<template>
  <div>
    <!--    <ListObjectDoctor/>-->
    <ListValuations :valuations="valuations" :notObjectives="notObjectives"/>
  </div>
</template>

<script>
import ListValuations from "../components/ListValuations";

export default {
  middleware: ['doctor'],
  name: "IndexObjectDoctor",
  components: {ListValuations},
  data() {
    return {
      valuations: [],
      openRefresh:true,
      notObjectives: false,
    }
  },
  methods: {
    async getValuations() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      await this.$axios.get(`/api/v1/get-valuations-doctor/?page=${this.page}`).then(({data}) => {
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
          message: 'Error al obtener lista de objetivos. Consulte a soporte SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    }
  },
  mounted() {
    this.getValuations()
  }
}
</script>

<style scoped>

</style>
