<template>
  <div>

    <div class="page-content-wrapper m-0">

      <div class="container">
        <h4 class="m-0">Checkout</h4>
        <!-- Cart Wrapper -->
        <div class="cart-wrapper-area">
          <div class="cart-table card">
            <div class="table-responsive card-body">
              <table class="table mb-0">
                <thead>
                <tr>
<!--                  <th scope="col">Image</th>-->
                  <th scope="col">Plan</th>
                  <th scope="col">Descripción</th>
<!--                  <th scope="col">Cantidad</th>-->
<!--                  <th scope="col">Remove</th>-->
                </tr>
                </thead>
                <tbody>
                <tr>
<!--                  <th scope="row"><img src="img/bg-img/p1.jpg" alt=""></th>-->
                  <td>
                    <h6 class="mb-1">{{ plan.name }}</h6><span>{{ plan.price }}€</span>
                  </td>
                  <td>
                    <p>{{ plan.description }}</p>
                  </td>
<!--                  <td>-->
<!--                    <div class="quantity">-->
<!--                      <input class="qty-text" disabled type="text" value="1">-->
<!--                    </div>-->
<!--                  </td>-->
<!--                  <td><a class="remove-product" href="#"><i class="bi bi-x-lg"></i></a></td>-->
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="!checkDocumentUser">
          <div class="mb-4">
            <label class="form-label" :class="{ 'text-danger': $v.document.documentType.$error }">Selecciona el tipo de documento <span class="text-danger">*</span></label>
            <multiselect
              :class="{ 'is-invalid': $v.document.documentType.$error }"
              v-model="document.documentType"
              :options="documentTypes"
              :searchable="true"
              :close-on-select="true"
              :custom-label="nameSelect"
              track-by="id"
              selectedLabel="Seleccionado"
              deselectLabel=""
              selectLabel="Seleccionar"
              :show-labels="true"
              placeholder="Selecciona"></multiselect>
            <!--          <p class="text-danger mt-1 font-weight-bold" v-if="$v.country.$error">El país es requerido</p>-->
          </div>
          <div class="form-group text-start mb-3">
            <label class="form-label" :class="{ 'text-danger': $v.document.number.$error }">Nº Documento <span class="text-danger">*</span></label>
            <input
              class="form-control"
              type="text"
              :class="{ 'is-invalid': $v.document.number.$error }"
              v-model.trim="document.number"
              placeholder="">
            <!--          <p class="text-danger mt-1 font-weight-bold" v-if="$v.form.name.$error">El nombre es requerido</p>-->
          </div>
        </div>

      </div>
    </div>


    <Stripe :planData="plan" :checkDocument="checkDocumentUser"/>
    <div class="pr-3 pl-3 m-0">
      <button class="btn btn-secondary btn-block" @click="closeModal">Cancelar</button>
    </div>

  </div>
</template>
<script>

import {bus} from "../../plugins/bus";
import {required} from "vuelidate/lib/validators";

export default {
  name: "Checkout",
  components: {},

  data() {
    return {
      document:{
        number: null,
        documentType: null,
      },

      checkDocumentUser: false,
      documentTypes: []
    };
  },
  validations: {
    document: {
      number: {required},
      documentType: {required},
    },
  },
  props: ['plan'],
  methods: {
    nameSelect({name}) {
      return `${name}`
    },
    closeModal(){
      this.$emit('closeModal')
    },
    validateData() {
      if (this.checkDocumentUser === false){
        this.$v.document.$touch();
        if (this.$v.$invalid) {
          return
        }
      }
    },
    async checkDocument(){
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      await this.$axios.get('/api/v1/check-document').then(resp =>{
        this.$vs.loading.close()
        console.log(resp.data.data.document)
        // this.checkDocumentUser = !!resp.data.data.document;
        if (resp.data.data.document){
          this.checkDocumentUser = true
          bus.$emit('checkDocumentUser', true)
        }else{
          this.checkDocumentUser = false
          bus.$emit('checkDocumentUser', false)
        }
      }).catch(e => {
        this.checkDocumentUser = false
        console.log('ERROR AL VERIFICAR EL DOCUMENTO DE IDENTIFICACIÓN', e)
      })
    },
    async getDocumentType(){
      await this.$axios.get('/api/v1/get-document-types').then(resp =>{
        this.documentTypes = resp.data.data
      }).catch(e => {
        console.log('ERROR AL OBTENER LOS TIPOS DE DOCUMENTO', e)
      })
    }
  },

  watch: {
    document: {
      handler(val) {
        setTimeout(() => {
          if (val) {
            bus.$emit('dataDocument', val);
          }
        }, 200)
      },
      deep: true
    }
  },
  mounted() {
    this.checkDocument()
    this.getDocumentType()
    bus.$on('validateDocument', () =>{
      this.validateData()
    })
    bus.$on('planSendStripe', (data) => {
      this.plan = data
    })

  },
}
</script>

<style scoped>

</style>

