<template>
  <div>
    <div class="team-member-wrapper direction-rtl">
      <div class="container">
        <div class="card service-card bg-gradient mb-3">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="service-text">
                <h5 class="text-primary">Especialistas</h5>
                <p class="mb-0 text-secondary">Profesionales de la salud de confianza a tu servicio.</p>
              </div>
              <div class="service-img"><img :src="require(`~/assets/img/saludwom/${$config.logo}`)" alt=""></div>
            </div>
          </div>
        </div>
        <div class="row g-3">
          <!-- Single Team Member-->
          <div class="col-6" v-for="(doctor, index) in doctors" :key="doctor.id">
            <div class="card team-member-card" @click="showDoctor(doctor)">
              <div class="card-body">
                <!-- Member Image-->
                <div class="team-member-img shadow-sm">
                  <img :src="userPicture(doctor.user.picture)" alt="">
                </div>
                <!-- Team Info-->
                <div class="team-info">
                  <h6 class="mb-1 fz-14">{{ doctor.user.name }} {{ doctor.user.last_name}} </h6>
                </div>
              </div>
              <!-- Contact Info-->
              <div class="contact-info bg-primary">
                <p class="mb-0 text-truncate">{{ doctor.user.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowDoctor from "./components/ShowDoctor";

export default {
  name: "IndexDoctors",
  data() {
    return {
      doctors: [],
      logoPrimary: ''
    }
  },
  methods: {
    getDoctors() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      this.$axios.get('/api/v1/get-doctors').then(resp => {
        this.doctors = resp.data.data
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.$vs.loading.close()
      })
    },

    showDoctor(doctor){
      this.$FModal.show(
        {
          width: 600,
          component: ShowDoctor
        },
        {
          doctor: doctor
        }
      )
    },
    userPicture(image) {
      if (image.includes('user-profile.png') || image.includes('storage')) {
        return `${this.$config.urlBack}${image}`
      }
      // Verifica si hay una imagen de usuario y devuelve la URL correspondiente
      return image
    }
  },

  mounted() {
    this.getDoctors()
    this.logoPrimary = process.env.logoPrimary
  }
}
</script>

<style scoped>

</style>
