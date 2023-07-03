<template>
    <div>
      <HumanBody :dataBody="dataBody"/>
    </div>
</template>

<script>
import HumanBody from "../HumanBody";
export default {
  name: "LocateYourPain",
  components: {HumanBody},
  props: ['dataBody']
}
</script>

<style scoped>

</style>
