<template>
  <div v-if="$store.state.resource.listResources.length === 0">
    <h4 class="text-center mt-5 text-light">No hay recursos asignados.</h4>
  </div>
  <div v-else>
    <div class="mt-4">
      <div class="card" v-for="(resource, index) in $store.state.resource.listResources" :key="index">
        <vs-collapse accordion>
          <vs-collapse-item>
            <div slot="header" class="card-body">
              <h4>{{ resource.created_at_format }}</h4>
              <span :class="`badge bg-${ stateColor(resource.state)} ms-2 text-white`">{{
                  stateTitle(resource.state)
                }}</span>
            </div>
            <div>
                <ContentResource :resource="resource" :valuationId="valuation.id"/>
            </div>
          </vs-collapse-item>
        </vs-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import ContentResource from "../../../../components/objectives/ContentResource";
export default {
  name: "Resource",
  components: {ContentResource},
  data(){
    return{
      resources: []
    }
  },
  props: ['valuation'],
  async beforeMount() {
    await this.$store.dispatch('getResource', this.valuation.id)
  },
  methods: {
    stateTitle(state) {
      switch (state) {
        case '1':
          return 'Pendiente de Responder'
        case '2':
          return 'Resuelto y Enviado'
      }
    },
    stateColor(state) {
      switch (state) {
        case '1':
          return 'warning'
        case '2':
          return 'success'
      }
    }
  }
}
</script>

<style scoped>

</style>
