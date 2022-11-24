<template>
  <div class="content-consent-forms">
    <div class="d-flex">
      <vs-checkbox color="#792151" v-model="accept"></vs-checkbox>
      <a target="_blank" class="text-accept-terms" href="#">Antes de agendar tu cita, acepta y firma los
        consentimientos</a>
    </div>
    <div class="mt-4" v-if="accept">
      <Signature/>
    </div>
  </div>
</template>

<script>
import Signature from "../Signature";

export default {
  name: "ConsentForms",
  components: {
    Signature
  },
  data() {
    return {
      accept: false,
    }
  },
  watch: {
    'accept': function (val) {
      this.$emit('consent', val)
    }
  }
}
</script>

<style scoped>

</style>
