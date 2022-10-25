<template>
  <div>
    <SocialChat
      icon
      :attendants="attendants"
    >
      <p slot="header">Escríbenos, estamos atentos para atender tus dudas.</p>
      <template v-slot:button>
        <img
          src="https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/icons/whatsapp.svg"
          alt="icon whatsapp"
          aria-hidden="true"
        >
      </template>
<!--      <small slot="footer">Horario de atención: 8am to 6pm</small>-->
    </SocialChat>
  </div>
</template>

<script>
export default {
  name: "ChatFloat",
  data(){
    return{
      attendants: [
        {
          app: 'whatsapp',
          label: 'Soporte & Ayuda',
          name: 'Mailyn Solarte',
          number: '573187731734',
          avatar: {
            src: 'https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4',
            alt: 'Alan Ktquez avatar'
          }
        },

        // ...
      ]
    }
  }
}
</script>

<style scoped>

</style>
