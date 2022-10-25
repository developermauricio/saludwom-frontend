<template>
    <div>
      <label class="form-label">Tu firma:</label>
      <div class="content-signature text-center">
        <VueSignaturePad
          height="250px"
          ref="signaturePad"
          :options="{ onBegin, onEnd }"
        />
      </div>
      <div class="text-center">
        <a class="btn btn-primary btn-sm mt-2" @click="clear()">Limpiar</a>
      </div>
    </div>
</template>

<script>
export default {
  name: "Signature",
  methods: {
    clear(){
      this.$refs.signaturePad.clearSignature();
    },
    onBegin() {
      console.log('=== Begin ===');
    },
    onEnd() {
      console.log('=== End ===');
    }
  }
}
</script>

<style scoped>

</style>
