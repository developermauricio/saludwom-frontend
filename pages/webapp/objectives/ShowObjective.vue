<template>
    <div class="container">
      <vs-tabs color="#D85C72" alignment="fixed">
        <vs-tab label="Información">
          <div class="pt-2">
            <Information :valuation="valuation"/>
          </div>
        </vs-tab>
        <vs-tab label="Terapeuta">
          <div>

          </div>
        </vs-tab>
        <vs-tab label="Tratamiento">
          <div>

          </div>
        </vs-tab>
      </vs-tabs>
    </div>
</template>

<script>
import Information from "./components/showComponents/Information";
export default {
  name: "ShowObjective",
  components: {Information},
  data(){
    return{
      valuation: {
        treatment:{treatment: null},
        subscription:{ plan: {name: null, description:null}}
      }
    }
  },
  methods:{
    async getValuation(){
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      const params = this.$route.params

      await this.$axios.get(`/api/v1/get-valuation/${params.slug}`).then(resp => {
       this.valuation = resp.data.data
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener el objetivo. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    }
  },
  created() {
    this.getValuation()
  }
}
</script>

<style scoped>

</style>
