<template>
  <div>
    <div class="card service-card bg-gradient mb-3">
      <div class="card-body mt-1">
        <div class="text-center mb-3">
          <img width="150" :src="require(`~/assets/img/saludwom/${$config.logo}`)" alt="">
        </div>
        <p>Gracias por adquirir nuestro <span
          class="text-primary font-italic font-weight-bold">{{ subscription.plan.name }}</span>
          Vamos hacer un gran equipo para cumplir tus objetivos.</p>
<!--        <vs-collapse>-->
<!--          <vs-collapse-item>-->
<!--            <div slot="header">-->
<!--              <p style="font-size: 0.7rem"><span class="text-danger font-weight-bold">IMPORTANTE: </span>-->
<!--                El pago del programa... <span class="font-italic text-primary">Continuar leyendo</span>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="text-justify">-->
<!--              <p style="font-size: 0.7rem"><span class="text-danger font-weight-bold">IMPORTANTE: </span>-->
<!--                El pago del programa se realizará en nuestro portal online, tienes que registrarte y acceder al pago.-->
<!--                Tendrás el calendario para agendar las citas, puedes anular o pedir cambio de tu cita con <span-->
<!--                  class="text-danger font-italic">7 días de antelación</span> sin ningún problema.-->
<!--                En caso de que nos avises con menos tiempo, no te garantizamos el reintegro de tu pago (o que lo-->
<!--                mantengamos-->
<!--                para la nueva hora),-->
<!--                ya que dependerá de si podemos llenar tu espacio con otra persona.-->
<!--              </p>-->
<!--              <p style="font-size: 0.7rem">-->
<!--                Si no puedes agendar tu cita, escríbenos a nuestra atención al cliente por whatsapp (640 847 411)-->
<!--                responderemos-->
<!--                cuanto antes a tu sugerencia.-->
<!--              </p>-->
<!--            </div>-->
<!--          </vs-collapse-item>-->
<!--        </vs-collapse>-->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CardWelcome",
  props:['subscription'],
  data() {
    return {
      // subscription: {
      //   plan: {
      //     id: null,
      //     name: null,
      //   },
      // }
    }
  },
  mounted() {
    // this.subscription = JSON.parse(localStorage.getItem('subscription'))
  }
}
</script>

<style scoped>

</style>
