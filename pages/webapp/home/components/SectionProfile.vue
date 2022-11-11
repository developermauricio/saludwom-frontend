<template>
  <div>
    <CardProfile/>
    <div class="content-services-section-profile">
      <splide :slides="items" :options="options">
        <splide-slide v-for="item in items" :key="item.id">
          <a v-if="item.typeLink" :href="item.link" :target="item.typeLink">
            <div class="card bg-primary bg-img bg-cards" style="cursor: pointer">
              <div class="card-body p-3 direction-rtl">
                <h6 class="text-white">{{ item.title }}</h6>
              </div>
            </div>
          </a>
          <nuxt-link v-else :to="item.link" :target="item.typeLink">
            <div :class="`card bg-${item.color} bg-cards`" style="cursor: pointer">
              <div class="card-body p-3 direction-rtl">
                <h6 class="text-white">{{ item.title }}</h6>
              </div>
            </div>
          </nuxt-link>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import CardProfile from "../../profile/components/CardProfile";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {bus} from "../../../../plugins/bus";

export default {
  name: "SectionProfile",
  components: {
    CardProfile,
  },
  data() {
    return {
      options: {
        // type   : 'slide',
        drag: true,
        padding: '0.5rem',
        gap: '0.2rem',
        focus: 0,
        autoplay: true,
        height: '5rem',
        perPage: 3,
        arrows: false,
        // autoWidth: true,
        pagination: false,
        trimSpace: true,
        breakpoints: {
          480: {
            autoplay: true,
            autoWidth: false,
            drag: true,
            // type   : 'loop',
            perPage: 2,
            gap: '0.2rem',
          },
        },
      },
      items: [
        {id: 1, title: 'Descargar la app', link: '#',  typeLink:'', color: 'secondary'},
        {id: 2, title: 'Servicios', link: 'https://vuejsexamples.com/tag/drag/', typeLink:'_blank'},
        {id: 3, title: 'Salud WoM', link: '#',  typeLink:'', color: 'info'},
        {id: 4, title: 'Equipo Médico', link: '/webapp/doctors',  typeLink:'', color: 'warning'},
      ]
    }
  },
  watch: {
    /* Nos permite validar controlar cuando estamos en el componente del perfil y luego emitimos un evento que permite agregar o quitar la flecha que indica más información*/
    '$route'(to, from) {
      bus.$emit('backFromInfoProfil', to);
    }
  },
}
</script>

<style scoped>
/*.content-services-section-profile {*/
/*  margin-top: -2rem;*/
/*}*/

.bg-cards {
  background-image: url('assets/img/core-img/2.png')
}
</style>
