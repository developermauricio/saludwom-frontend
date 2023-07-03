<template>
    <div class="p-5">
      <h3 class="text-center mb-2">{{ question.question }}</h3>
      <img v-if="question.illustration" :src="$config.urlBack+question.illustration" alt="" style="width: 100%; height: 100%">
      <div v-else>
        <h4 class="text-center mt-5 text-light">No hay ilustración.</h4>
      </div>
    </div>
</template>

<script>
export default {
  name: "PreviewQuestionIlustration",
  props:[ 'question']
}
</script>

<style scoped>

</style>
