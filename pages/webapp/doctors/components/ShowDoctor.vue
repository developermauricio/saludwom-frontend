<template>
  <div class="p-4">
    <div class="text-center">
      <div class="team-member-img">
        <img width="100" :src="userPicture(doctor.user.picture)" alt="">
      </div>
      <div class="team-info mt-3">
        <h5 class="mb-1">{{ doctor.user.name }} {{ doctor.user.last_name}} </h5>
        <p class="text-light">{{ doctor.user.email }}</p>
      </div>
    </div>
    <div class="mt-2 text-justify">
      {{ doctor.biography }}
    </div>
    <div class="mt-4">
      <div>
        <p><strong>Especialidad{{ doctor.treatments.length > 1 ? 'es': ''}}:</strong></p>
      </div>
      <ul>
        <li v-for="treatment in doctor.treatments" :key="treatment.id" class="fz-14 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg> {{ treatment.treatment }}.</li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "ShowDoctor",
  props: ['doctor'],
  methods: {
    userPicture(image) {
      if (image.includes('user-profile.png') || image.includes('storage')) {
        return `${this.$config.urlBack}${image}`
      }
      // Verifica si hay una imagen de usuario y devuelve la URL correspondiente
      return image
    }
  }
}
</script>

<style scoped>

</style>
