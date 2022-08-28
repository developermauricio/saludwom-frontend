<template>
  <div>
    <div class="team-member-wrapper direction-rtl">
      <div class="container">
        <div class="card service-card bg-gradient mb-3">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="service-text">
                <h5 class="text-primary">Doctores</h5>
                <p class="mb-0 text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div class="service-img"><img :src="logoPrimary" alt=""></div>
            </div>
          </div>
        </div>
        <div class="row g-3">
          <!-- Single Team Member-->
          <div class="col-6">
            <div class="card team-member-card">
              <div class="card-body">
                <!-- Member Image-->
                <div class="team-member-img shadow-sm"><img src="@/assets/img/avatars/carlos-vives.jpg" alt=""></div>
                <!-- Team Info-->
                <div class="team-info">
                  <h6 class="mb-1 fz-14">Carlos Vives</h6>
                  <p class="mb-0 fz-12">Fisioterapeuta</p>
                </div>
              </div>
              <!-- Contact Info-->
              <div class="contact-info bg-primary">
                <p class="mb-0 text-truncate">carlovives@saludwom.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../../plugins/bus";

export default {
  name: "IndexDoctors",
  data(){
    return{
      logoPrimary: ''
    }
  },
  mounted() {
    this.logoPrimary = process.env.logoPrimary
  }
}
</script>

<style scoped>

</style>
