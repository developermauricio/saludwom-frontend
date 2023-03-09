<template>
  <div class="container p-4">
    <!-- Titulo-->
    <vue-confirm-dialog></vue-confirm-dialog>
    <div>
      <h5>Editar Objetivo</h5>
    </div>
    <!-- Formulario-->
    <div>
      <!--  NOMBRE DEL TRATAMIENTO -->
      <div class="mt-4">
        <div class="form-group">
          <label class="form-label" :class="{ 'text-danger': $v.valuation.valuationName.$error }" for="">
            Nombre de tu objetivo<span class="text-danger">*</span></label>
          <p class="m-0 text-light">Ejemplo: Mejoraré mi postura, quiero mi abdomen plano, etc.</p>
          <input
            class="form-control mt-2"
            type="text"
            v-model.trim="valuation.valuationName"
            :class="{ 'is-invalid': $v.valuation.valuationName.$error }"
            placeholder="">
        </div>
      </div>
      <!--  SELECCIONAR EL TIPO DE TRATAMIENTO -->
      <div>
        <label class="form-label" :class="{ 'text-danger': $v.valuation.valuationTreatment.$error }">Tipo
          de tratamiento<span class="text-danger">*</span></label>
        <multiselect
          disabled
          :class="{ 'is-invalid': $v.valuation.valuationTreatment.$error }"
          v-model="valuation.valuationTreatment"
          :options="treatments" :custom-label="nameSelect" :searchable="true" :close-on-select="true"
          selectedLabel="Seleccionado"
          deselectLabel="" selectLabel="Seleccionar" :show-labels="true"
          placeholder="Buscar tratamiento..."></multiselect>
      </div>
      <!--  DESCRIPCIÓN DE LOS OBJETIVOS -->
      <div class="mt-4">
        <div class="form-group">
          <label
            class="form-label"
            :class="{ 'text-danger': $v.valuation.valuationObjective.$error }"
            for="">Dinos los objetivos a los que quiere llegar con el tratamiento<span
            class="text-danger">*</span></label>
          <textarea
            class="form-control"
            v-model="valuation.valuationObjective"
            :class="{ 'is-invalid': $v.valuation.valuationObjective.$error }"
            name="textarea" cols="7" rows="7">
          </textarea>
        </div>
      </div>
    </div>

    <!-- Footer-->
    <div class="float-right py-3 d-none d-md-block d-lg-block mt-3">
      <div class="d-flex ">
        <button class="btn-secondary btn" @click="cancelClose">Cancelar</button>
        <button class="btn btn-success ml-2" @click="updateObjective">Guardar</button>
      </div>
    </div>
    <div class="mt-5 d-block d-md-none d-lg-none">
      <div class="mb-2">
        <button class="btn btn-success btn-block" @click="updateObjective">Guardar</button>
      </div>
      <div>
        <button class="btn-secondary btn btn-block" @click="cancelClose">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {bus} from "../../../../../../plugins/bus";

export default {
  name: "EditObjective",
  props: ['valuation'],
  data() {
    return {
      treatments: [],
      nameOriginal: ''
    }
  },
  validations: {
    valuation:{
      valuationName: {required},
      valuationObjective: {required},
      valuationTreatment: {required}
    }
  },
  methods: {
    nameSelect({treatment}) {
      return `${treatment}`
    },
    cancelClose() {
      this.$FModal.hide()
    },
   async updateObjective(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.error({
          title: 'Error',
          message: 'Verifique que todos los campos requeridos esten llenos.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }

      this.$confirm(
        {
          message: '¿Esta segur@ de actualizar tu objetivo?',
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
                  `api/v1/update-valoration-objetive/${this.valuation.valuationId}`, this.valuation
                );
                if (resp.status === 200) {
                  this.$vs.loading.close()
                  if (this.nameOriginal !== this.valuation.valuationName) {
                    this.$router.push({name: 'index.objectives'});
                  }
                  bus.$emit('updateDataValuation')
                  bus.$emit('closeAlert')
                  this.$FModal.hide()
                  this.$toast.success({
                    title: 'Confirmación',
                    message: 'Tu objetivo se actualizó exitosamente!',
                    showDuration: 1000,
                    hideDuration: 5000,
                  })
                }
              } catch (e) {
                this.$vs.loading.close()
                this.$toast.error({
                  title: 'Error',
                  message: 'Error al editar tu objetivo. Consulte con el administrador.',
                  showDuration: 1000,
                  hideDuration: 8000,
                })
              }
            }
          }
        })
    },
    /*Obtener todos los tratamientos*/
    getTreatments() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      this.$axios.get('/api/v1/get-treatments').then(resp => {
        this.treatments = resp.data.data
        this.$vs.loading.close()
      }).catch((e) => {
        console.log('ERROR', e);
        this.$toast.error({
          title: 'Error',
          message: 'Error al obtener los tratamientos. Consulte con el administrador.',
          showDuration: 1000,
          hideDuration: 8000,
        })
        this.$vs.loading.close()
      })
    },
  },
  mounted() {
    this.nameOriginal = this.valuation.valuationName
    this.getTreatments()
  }
}
</script>

<style scoped>

</style>
