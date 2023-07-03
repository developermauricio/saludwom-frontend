<template>
  <div class="my-4">
    <vue-confirm-dialog></vue-confirm-dialog>
    <!--=====================================
     MENSAJE DEL DOCTOR
   ======================================-->
    <div v-if="resource.message_doctor">
      <div>
        <h6>Mensaje del Especialista:</h6>
      </div>
      <MessageDoctor :messageDoctor="resource.message_doctor"/>
    </div>
    <!--=====================================
      LOCALIZA TU DOLOR
    ======================================-->
    <div v-if="resource.enable__touch_data === 1">
      <div>
        <h6 class="mb-4">Localiza tu Dolor:</h6>
      </div>
      <LocateYourPain :dataBody="resource.dataBody"/>
    </div>
    <!--=====================================
      CUESTIONARIOS
    ======================================-->
    <div class="mt-4">
      <div>
        <h6 class="mb-2">Cuestionario{{ resource.questionnaires.length > 1 ? 's' : '' }}:</h6>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-6 mb-3 mb-lg-0" v-for="(questionnaire, index) in resource.questionnaires"
             :key="index">
          <div class="card border-1">
            <!--  Icon resuelto  -->
            <div class="d-flex justify-content-end" v-if="questionnaire.solved || questionnaire.resolved">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                   class="bi bi-check-circle-fill text-success" viewBox="0 0 16 16" style="margin-top: -0.6rem">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>
            <div class="card-body">
              <h6>{{ questionnaire.name }}</h6>
              <a href="#" @click="openQuestionnaire(resource.id, questionnaire)">Ver Cuestionario</a><br>
              <span class="badge bg-success ms-2 text-white" v-if="questionnaire.solved || questionnaire.resolved">Resuelto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--=====================================
      RECURSOS DE VIDEO
    ======================================-->
    <div class="mt-4">
      <div>
        <h6 class="mb-2">Recursos de Video:</h6>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-6 mb-3 mb-lg-0" v-for="(resourceVideo, index) in resource.resource_videos"
             :key="index">
          <div class="card border-1">
            <div class="card-body">
              <h6>{{ resourceVideo.name | truncate(5) }}</h6>
              <a href="#" @click="showResource(resourceVideo)">Ver Recurso</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--=====================================
      GUARDAR Y ENVIAR RECURSO
    ======================================-->

    <div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="btn btn-success btn-block" @click="sendAnswer" v-if="resource.state !== '2'">Enviar Respuesta
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MessageDoctor from "./MessageDoctor";
import LocateYourPain from "./LocateYourPain";
import ModalQuestionnaire from "./ModalQuestionnaire";
import {bus} from "../../plugins/bus";
import Vue from "vue";
import ShowResourceQuestionnaire from "./ShowResourceQuestionnaire";

export default {
  name: "ContentResource",
  components: {LocateYourPain, MessageDoctor},
  props: ['resource', 'valuationId'],
  created() {
    /* Datos de los cuestionarios*/
    this.resource.questionnaires = Vue.observable(this.resource.questionnaires);
    bus.$on('resolvedQuestionnaire', (dataQuestions) => {

      this.resource.questionnaires.forEach(q => {
        if (q.id === dataQuestions.questionnaireId) {
          q.questions = dataQuestions.questions
        }
      })
      let index = this.resource.questionnaires.findIndex(q => {
        return q.id === dataQuestions.questionnaireId
      })
      Vue.set(this.resource.questionnaires[index], 'resolved', true);
      // Vue.set(this.resource.questionnaires[index], 'solved', true);
      this.$forceUpdate()
    })
    /*Datos del body*/
    bus.$on('selectedHumanBody', (data) => {
      this.resource.dataBody = data
    })
  },
  methods: {
    showResource(resource) {
      this.$FModal.show(
        {
          component: ShowResourceQuestionnaire,
          // clickToClose: false,
          // escToClose: false,
          placement: 'center center',
        },
        {
          resource: resource
        }
      )
    },
    sendAnswer() {
      let validateDataBody = false
      let validateQuestionnaire = false

      if (this.resource.enable__touch_data === 1) {
        if (this.resource.dataBody.length === 0) {
          this.$toast.error({
            title: 'Error',
            message: 'Debes localizar tu dolor.',
            showDuration: 1000,
            hideDuration: 8000,
          })
          validateDataBody = true
        }
      }

      this.resource.questionnaires.map(q => {
        validateQuestionnaire = q.resolved === false;
      })

      if (validateQuestionnaire) {
        this.$toast.error({
          title: 'Error',
          message: `Completa ${this.resource.questionnaires.length > 1 ? 'los' : 'el'} cuestionario${this.resource.questionnaires.length > 1 ? 's' : ''}.`,
          showDuration: 1000,
          hideDuration: 8000,
        })
      }

      if (validateDataBody || validateQuestionnaire) return

      this.$confirm(
        {
          message: '¿Esta segur@ de enviar el recurso?',
          button: {
            no: 'No',
            yes: 'Si'
          },
          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: async confirm => {
            if (confirm) {
              this.$vs.loading({
                color: process.env.COLOR_BASE,
                text: 'Espere por favor...'
              })
              let response = await this.$store.dispatch('sendResource', this.resource)
              console.log('LA RESPUESTA ', response)
              if (response){
                this.$vs.loading.close()
                this.$toast.success({
                  title: 'Confirmación',
                  message: 'Tu recurso ha sido enviado exitosamente!',
                  showDuration: 1000,
                  hideDuration: 5000,
                })
                this.resource.state = '2'
              }else {
                this.$vs.loading.close()
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al enviar el recurso. Consulte a soporte SaludWom.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
              }
            }
          }
        })


    },
    async openQuestionnaire(resource, questionnaire) {
      let data = {
        resourceId: resource,
        questionnaireId: questionnaire.id
      }
      await this.$store.dispatch('answerQuestionResource', data)

      this.$FModal.show(
        {
          component: ModalQuestionnaire,
          clickToClose: false,
          escToClose: false,
          placement: 'center top',
        },
        {
          questionnaire: questionnaire
        }
      )
    }
  },
}
</script>

<style scoped>

</style>
