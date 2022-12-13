<template>
  <div>
    <label class="form-label">
      <i :class="`bx bx-${signature ? 'check-circle':'x-circle'}  check-appointment ml-1 text-${signature ? 'success':'danger'} mr-1`" style="font-size: 1.2rem"></i>Tu firma. <strong>firma y luego clic en guardar firma</strong>:</label>
    <div class="content-signature text-center">
      <VueSignaturePad
        height="250px"
        ref="signaturePad"
        :options="{ onBegin, onEnd }"
      />
    </div>
    <div class="d-flex justify-content-center">
      <div class="text-center">
        <button class="btn btn-secondary btn-sm mt-2" @click="clear()">Limpiar</button>
      </div>
      <div class="text-center ml-2">
        <button class="btn btn-success btn-sm mt-2" @click="save()">Guardar Firma</button>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../plugins/bus";

export default {
  name: "Signature",
  data(){
    return{
      signature: null,
    }
  },
  methods: {
    clear() {
      this.$refs.signaturePad.clearSignature();
      this.signature = null
      bus.$emit('clearSignature')
    },
    save() {
      let image = this.$refs.signaturePad.saveSignature()
      if (image.isEmpty) {
        this.$toast.error({
          title: 'Atención',
          message: 'Ingresa tu firma.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      } else {
        this.signature = image
        this.$toast.success({
          title: 'Confirmación',
          message: 'Firma guardada.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        bus.$emit('addSignature', image)
      }
    },
    onBegin() {
      console.log('=== Begin ===');
    },
    onEnd() {
      console.log('=== End ===');
    }
  },
}
</script>

<style scoped>

</style>
