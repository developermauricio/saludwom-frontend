<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <TablePatients/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['doctor'],
  name: "IndexDoctorPatients"
}
</script>

<style scoped>

</style>
