<template>
  <div>
<!--    <div v-if="!subscription" class="container">-->
<!--      <h2 class="text-center">No tienes suscripción</h2>-->
<!--    </div>-->
    <NotSubscription v-if="notSubscription"/>
    <div v-if="subscription && !notSubscription" class="container">
      <CardWelcome :subscription="subscription"/>
      <vue-confirm-dialog></vue-confirm-dialog>
      <div class="card mb-4">
        <div class="card-body">

          <!--  NOMBRE DEL TRATAMIENTO -->
          <div class="mt-4">
            <div class="form-group">
              <label class="form-label" :class="{ 'text-danger': $v.valuation.name.$error }" for="">Agrega un nombre a
                tu
                objetivo<span class="text-danger">*</span></label>
              <p class="m-0 text-light">Ejemplo: Mejoraré mi postura, quiero mi abdomen plano, etc.</p>
              <input
                class="form-control mt-2"
                type="text"
                v-model.trim="valuation.name"
                :class="{ 'is-invalid': $v.valuation.name.$error }"
                placeholder="">
            </div>
          </div>
          <!--  SELECCIONAR EL TIPO DE TRATAMIENTO -->
          <div>
            <label class="form-label" :class="{ 'text-danger': $v.valuation.selectedTreatment.$error }">Seleccione el
              tipo
              de tratamiento<span class="text-danger">*</span></label>
            <multiselect
              :class="{ 'is-invalid': $v.valuation.selectedTreatment.$error }"
              v-model="valuation.selectedTreatment"
              @input="changeSelectedTreatment"
              :options="treatments" :custom-label="nameSelect" :searchable="true" :close-on-select="true"
              selectedLabel="Seleccionado"
              deselectLabel="" selectLabel="Seleccionar" :show-labels="true"
              placeholder="Buscar tratamiento..."></multiselect>
          </div>
          <!--  DESCRIPCIÓN DE LOS OBJETIVOS -->
          <div class="mt-4">
            <div class="form-group">
              <label class="form-label"
                     :class="{ 'text-danger': $v.valuation.objectives.$error }"
                     for="">Dinos los objetivos a los que quiere llegar con el tratamiento<span
                class="text-danger">*</span></label>
              <textarea class="form-control"
                        v-model="valuation.objectives"
                        :class="{ 'is-invalid': $v.valuation.objectives.$error }"
                        name="textarea" cols="7" rows="7"></textarea>
            </div>
          </div>
          <!--  CARGAR ARCHIVOS -->
          <div class="mt-4 text-justify">
            <label class="form-label" for="">Subir fotos o documentos necesarios (Opcional)</label>
            <p class="text-light">Opcionalmente, puedes enviar hasta <strong>10</strong> archivos. Envianos documentos o
              fotos que creas necesarias para comprender más tu
              objetivo. Como historias clínicas, fotos de ecografías, de alguna zona de tu cuerpo. Etc. <strong>(si
                grabas
                un video, por favor que no dure más de un minuto).</strong></p>
            <UploadFilesValuation/>
          </div>
          <!--  CALENDARIO CON LA AGENDA -->
          <div v-if="subscription.plan.number_appointments > 0">
            <div class="mt-4" v-if="doctors && doctors.length > 0">
              <label class="form-label" for="">Selecciona el especialista para <strong class="text-danger">agendar tu
                cita:</strong></label>
            </div>
            <div class="text-justify" v-if="doctors && doctors.length > 0">
              <p style="font-size: 0.7rem"><span class="text-danger font-weight-bold">IMPORTANTE: </span>
                El pago del programa se realizará en nuestro portal online, tienes que registrarte y acceder al pago.
                Tendrás el calendario para agendar las citas, puedes anular o pedir cambio de tu cita con <span
                  class="text-danger font-italic">7 días de antelación</span> sin ningún problema.
                En caso de que nos avises con menos tiempo, no te garantizamos el reintegro de tu pago (o que lo
                mantengamos
                para la nueva hora),
                ya que dependerá de si podemos llenar tu espacio con otra persona.
              </p>
              <p style="font-size: 0.7rem">
                Si no puedes agendar tu cita, escríbenos a nuestra atención al cliente por whatsapp (640 847 411)
                responderemos
                cuanto antes a tu sugerencia.
              </p>
            </div>
            <div class="mt-2" v-for="doctor in doctors" :key="doctor.id">
              <div class="card border select-doctor-schedule">
                <div class="card-body">
                  <div class="d-flex" @click="openDoctorSchedule(doctor)">
                    <div class="d-flex justify-content-end align-items-end">
                      <img class="avatar-profile" width="60" :src="`${$config.urlBack}${doctor.user.picture}`" alt="">
                    </div>
                    <div class="ml-2 mt-2">
                      <div class="d-flex">
                        <h5 class="mb-1">{{ doctor.user.name }} {{ doctor.user.last_name }}</h5>
                      </div>
                      <p class="mb-0 text-primary">Profesional Especialista</p>
                      <span class="badge bg-warning ms-2 text-white" v-if="doctor.doctor_schedule.length === 0">Agenda no disponible</span>
                      <span class="badge bg-success ms-2 text-white" v-if="doctor.doctor_schedule.length > 0">Agenda disponible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <!--  Si no tiene para agendar citas el plan, seleccione un doctor  -->
          <div v-else>
            <div class="mt-4" v-if="doctors && doctors.length > 0">
              <label class="form-label" for="">Selecciona el especialista<span class="text-danger">*</span></label>
            </div>
            <div class="mt-2" v-for="doctor in doctors" :key="doctor.id">
              <div :class="doctor.id === (valuation ? valuation.doctorId : 0) ? 'selected' : '' " class="card border select-doctor-schedule" @click="selectDoctor(doctor.id)">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="d-flex justify-content-end align-items-end">
                      <img class="avatar-profile" width="60" :src="`${$config.urlBack}${doctor.user.picture}`" alt="">
                    </div>
                    <div class="ml-2 mt-2">
                      <div class="d-flex">
                        <h5 class="mb-1">{{ doctor.user.name }} {{ doctor.user.last_name }}</h5>
                      </div>
                      <p class="mb-0 text-primary">Profesional Especialista</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4" v-if="valuation.appointments.length > 0">
            <label class="form-label" for="">Tu cita{{ this.valuation.appointments.length >= 1 ? 's' : '' }}
              son:</label>
            <ul>
              <li v-for="(appointment, index) in this.valuation.appointments" :key="'appoint-'+appointment.date"
                  class="font-weight-bold">
                <i class="bx bx-check-circle check-appointment ml-1 text-success mr-1"></i>
                Cita {{ index + 1 }}
                <br>
                <!--              {{ $dateFns.format(appointment.date, 'PPPP') }}-->
                <!--              {{ appointment.hour }}-->
                <span class="badge bg-success ms-2 text-white">{{
                    transformTimezone(appointment.date + ' ' + appointment.hour) + ' ' + timezoneUser
                  }}</span><br>
                <span
                  class="badge bg-light ms-2 text-light">{{
                    $moment(appointment.date + ' ' + appointment.hour).format('LLL') + ' ' + $config.timezone
                  }}</span>
                <p style="margin-top: 5px">Esp. {{ appointment.doctor.name }} {{ appointment.doctor.last_name }}</p>
              </li>
            </ul>
          </div>
          <!--  ACEPTAR CONSENTIMIENTOS -->
          <div class="mt-4" v-if="!checkVerifySignature">
            <hr>
            <ConsentForms @consent="consent"/>
          </div>
          <!--  GUARDAR Y AGENDAR -->
          <div class="mt-4">
            <button class="btn btn-primary btn-block mt-2" @click="saveValuation">Crear y enviar al especialista
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConsentForms from "../../../../components/legal/ConsentForms";
import CardWelcome from "./components/CardWelcome";
import VueDropzone from 'nuxt-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'nuxt-dropzone/dropzone.css'
import PatientSchedule from "../../../../components/calendar/PatientSchedule";
import DoctorSchedule from "./components/DoctorSchedule";
import {bus} from "../../../../plugins/bus";
import {required} from "vuelidate/lib/validators";
import {publishMQTT} from "../../../../plugins/mqtt";
import NotSubscription from "../../../../components/NotSubscription";

export default {
  name: "CreateValuation",
  components: {
    NotSubscription,
    PatientSchedule,
    CardWelcome,
    VueDropzone,
    ConsentForms
  },
  // props: ['subscription'],
  data() {
    return {
      notSubscription: false,
      timezoneUser: null,
      checkVerifySignature: false,
      signature: null,
      doctors: [],
      valuation: {
        name: '',
        consent: '',
        signature: null,
        objectives: '',
        subscriptionId: null,
        patientId: null,
        doctorId: null,
        selectedTreatment: null,
        appointments: [],
      },
      treatments: [],
      subscription: null,
      openModalSchedule: false,
      fileOptions: {
        addRemoveLinks: true,
        url: 'ao',
        // thumbnailWidth: 150,
        headers: {"My-Awesome-Header": "header value"},
        maxFiles: 1, // Cantidad maxima que se puede subir
        paramName: 'files',
        dictRemoveFile: 'X',
        maxFilesize: 5,  //Tamaño en MB
        acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
        autoProcessQueue: false,
      },
      // treatments: ['Mejora Postura', 'Embarazo/Preparto/Postparto', 'Cáncer: Rehabilitación Funcional', 'Stop Dolor Abdominoperineal', 'Fortalecimiento Abdominal y del Suelo Pélvico']
    }
  },
  validations: {
    valuation: {
      name: {required},
      objectives: {required},
      selectedTreatment: {required},
    }
  },
  methods: {
    //Seleccionar el tipo de post
    selectDoctor(doctorId) {
      this.valuation.doctorId = doctorId
    },
    changeSelectedTreatment(treatment) {
      if (treatment) {
        this.doctors = treatment.doctors
      } else {
        this.doctors = []
      }
    },
    transformTimezone(date) {
      // const defaultTimezone = new Date(date)
      // const dateStr = defaultTimezone.toLocaleString('es-Es', {
      //   timeZone: 'Europe/Madrid',
      //   day:'numeric', month:'long', year:"numeric", hour: "numeric", minute: "numeric", second:"numeric", hour12: false
      // })
      // return dateStr
      return this.$moment(date).tz(this.timezoneUser).format('LLL')
    },
    consent(data) {
      if (data === true) {
        this.valuation.consent = 'accept'
      } else {
        this.valuation.consent = 'not_accept'
      }
    },
    async saveValuation() {
      this.$v.valuation.$touch();
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Error',
          message: 'Verifíque que todos los campos requeridos esten llenos.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }

      if (this.signature === null) {
        this.$toast.error({
          title: 'Error',
          message: 'Firma y guarda',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      console.log(this.valuation.appointments.length)
      if (this.subscription.plan.number_appointments > 0 && this.valuation.appointments.length === 0) {
        this.$toast.error({
          title: 'Error',
          message: 'Selecciona un doctor y agenda tu cita.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      this.valuation.subscriptionId = this.subscription.id
      this.valuation.patientId
      this.valuation.appointments.forEach((item) => {
        this.valuation.doctorId = item.doctor.id
      })
      this.$confirm(
        {
          message: '¿Esta segur@ de crear tu objetivo?',
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
              try {
                const resp = await this.$axios.post(
                  'api/v1/create-valoration',
                  this.valuation
                );
                if (resp.status === 200) {
                  this.$vs.loading.close()
                  bus.$emit('saveFiles');
                  this.$toast.success({
                    title: 'Confirmación',
                    message: 'Tu objetivo se creo exitosamente!',
                    showDuration: 1000,
                    hideDuration: 5000,
                  })
                  setTimeout(() => {
                    this.$router.push({name: 'index.objectives'});
                  }, 1000)
                }
              } catch (e) {
                this.$vs.loading.close()
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al crear tu objetivo. Consulte a soporte SaludWom.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
              }
            }
          }
        })
      // this.validations.subscriptionId = this.subscription.id
    },
    nameSelect({treatment}) {
      return `${treatment}`
    },
    openDoctorSchedule(doctor) {
      if (doctor.doctor_schedule && doctor.doctor_schedule.length === 0) {
        this.$toast.error({
          title: 'Atención',
          message: 'El especialista no tiene agenda disponible.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      this.$FModal.show(
        {
          component: DoctorSchedule,
          clickToClose: false,
          escToClose: false
          // placement: 'center top',
        },
        {
          data: doctor,
        }
      )
    },
    async currentSubscription() {
      await this.$axios.get(`/api/v1/get-current-subscription`).then(async resp => {
        this.subscription = resp.data.data
        if (!this.subscription){
          this.notSubscription = true
        }
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        // this.stateSubscription = true
        this.$toast.error({
          title: 'Error',
          message: 'Error al validar la suscripción. Consulte a soporte SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
    async checkSignature() {
      await this.$axios.get('/api/v1/check-signature').then(resp => {
        if (resp.data !== 'no check signature') {
          this.checkVerifySignature = true
          this.signature = resp.data
        }
      }).catch(e => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al verificar firma del paciente. Consulte a soporte SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
      })
    },
    /*Obtener todos los tratamientos*/
    async getTreatments() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      await this.$axios.get('/api/v1/get-treatments').then(resp => {
        this.treatments = resp.data.data
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener los tratamientos. Consulte a soporte SaludWom.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
    closeModal() {
      this.openModalSchedule = false
      this.$root.$emit("bv::hide::modal", "modal-schedule");
    },
    onHideModal(evt) {
      if (evt.trigger === "backdrop") {
        evt.preventDefault();
        this.handleBackdrop();
      }
      if (evt.trigger === "headerclose") {
        this.openModalSchedule = false;
      }
    },
    handleBackdrop() {
      console.log("Backdrop clicked");
    },
  },

  mounted() {
    this.timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.currentSubscription()
    this.getTreatments()
    this.checkSignature()

    setTimeout(() => {
      bus.$on('sendSubscription', (data) => {
        this.subscription = data
      })
    }, 500)
    // this.subscription = JSON.parse(localStorage.getItem('subscription'))
    setTimeout(() => {
      bus.$on('appointments', (appointment) => {
        this.valuation.appointments = appointment
      })
    }, 200)
    setTimeout(() => {
      bus.$on('addSignature', (signature) => {
        this.valuation.signature = signature
        this.signature = signature
      })
    }, 200)
    setTimeout(() => {
      bus.$on('clearSignature', () => {
        this.valuation.signature = null
        this.signature = null
      })
    }, 200)
  }
}
</script>

<style scoped>

</style>
