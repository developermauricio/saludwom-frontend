<template>
  <div>
    <div class="d-flex mb-4 justify-content-center">
      <div class="m-auto">
        <h4 class="d-sm-block d-none">Parte Frontal</h4>
        <h6 class="d-sm-none d-block">Parte Frontal</h6>
      </div>
      <div class="m-auto">
        <h4 class="d-sm-block d-none">Parte Posterior</h4>
        <h6 class="d-sm-none d-block">Parte Posterior</h6>
      </div>
    </div>
    <vue-body-part-selector
      :selection.sync="selection"
      @click="handleClick"
      :disabled="disabled"
      :multiple="multiple"
      :body-colour="bodyColour"
      :selection-colour="selectionColour"
      :show-parts="{
          'cabeza': true,
          'rostro': true,
          'cuello': true,
          'hombro-izquierdo': true,
          'hombro-derecho': true,
          'brazo-izquierdo': true,
          'antebrazo-izquierdo': true,
          'brazo-derecho': true,
          'antebrazo-derecho': true,
          'pecho-izquierdo': true,
          'pecho-derecho': true,
          'vientre-izquierdo': true,
          'costillas-izquierdas': true,
          'vientre-derecho': true,
          'vientre': true,
          'costillas-derechas': true,
          'muslo-izquierdo': true,
          'interior-muslo-izquierdo': true,
          'pie-izquierdo': true,
          'pantorrilla-izquierda': true,
          'rodilla-izquierda': true,
          'muslo-derecho': true,
          'genitales': true,
          'interior-muslo-derecho': true,
          'pie-derecho': true,
          'pantorrilla-derecha': true,
          'rodilla-derecha': true,
          'codo-derecho': true,
          'mano-derecha': true,
          'codo-izquierdo': true,
          'mano-izquierda': true,
          'brazo-izquierdo-posterior': true,
          'pierna-izquierda': true,
          'gluteo-derecho': true,
          'gluteo-izquierdo': true,
          'lumbar-derecho': true,
          'columna': true,
          'cabeza-posterior': true,
          'nuca': true,
          'brazo-derecho-posterior': true,
          'pierna-derecha-posterior': true,
          'dorsal-derecho': true,
          'clavicula-derecha-posterior': true,
          'dorsal-izquierdo': true,
          'clavicula-izquierda-posterior': true,
          'sacro': true
        }"
    />
    <div>
<!--     Seleccionado {{ selection }}-->
    </div>
  </div>
</template>

<script>
export default {
  name: "HumanBody",
  data() {
    return {
      selection: [],
      disabled: false,
      multiple: true,
      bodyColour: "#817450",
      selectionColour: "#792141"
    };
  },
  methods: {
    handleClick(bodyPartClicked) {
      console.log(bodyPartClicked)
    }
  }
}
</script>

<style scoped>

</style>
