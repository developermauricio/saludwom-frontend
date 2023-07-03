<template>
  <div class="p-5">
    <!-- Titulo Cuestionario -->
    <div>
      <!-- Titulo  -->
      <h3 class="text-center">{{ questionnaire.name }}</h3>
      <!--  Descripción  -->
      <p>{{ questionnaire.description }}</p>
      <!--  Tratamientos   -->
      <div class="my-2">
        <div v-for="(treatment, index) in questionnaire.treatments" :key="index">
          <ul class="m-0">
            <li>
              <p class="font-italic text-light m-0" style="font-size: 13px !important;">{{ treatment.treatment }}. </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--  Cuestionario  -->
    <div>
      <div v-for="(question, index) in $v.questions.$each.$iter" :key="index">
        <!-- Campo tipo number-->
        <div v-if="question.$model.type_question.name === 'number'" class="mb-2">
          <label class="form-label" :class="{'text-danger': question.$model.required && question.$error }"
                 for="exampleFormControlTextarea1">{{ question.$model.question }}
            <span v-if="question.$model.required" class="text-danger">*</span>
            <a class="ml-2" v-if="question.$model.ilustration || question.$model.illustration"
               @click="showIllustration(question.$model)" href="#">Ilustración</a>
          </label>
          <input :disabled="questionnaire.solved" class="form-control w-100" type="number" min="0"
                 v-model="question.$model.value"
                 :name="'question_' + index" :class="{'is-invalid': question.$model.required && question.$error }">
          <div v-if="question.$model.required && question.$error"
               class="invalid-feedback">
            Este campo es requerido
          </div>
        </div>
        <!-- Campo tipo input-->
        <div v-if="question.$model.type_question.name === 'input'" class="mb-2">
          <label class="form-label" :class="{'text-danger': question.$model.required && question.$error }"
                 for="exampleFormControlTextarea1">{{ question.$model.question }} <span
            v-if="question.$model.required" class="text-danger">*</span>
            <a class="ml-2" v-if="question.$model.ilustration || question.$model.illustration"
               @click="showIllustration(question.$model)" href="#">Ilustración</a></label>
          <input :disabled="questionnaire.solved" class="form-control w-100" v-model="question.$model.value"
                 :class="{'is-invalid': question.$model.required && question.$error }" type="text">
          <div v-if="question.$model.required && question.$error"
               class="invalid-feedback">
            Este campo es requerido
          </div>
        </div>
        <!-- Campo tipo textarea-->
        <div v-if="question.$model.type_question.name === 'textarea'" class="mb-2">
          <label class="form-label" :class="{'text-danger': question.$model.required && question.$error }"
                 for="exampleFormControlTextarea1">{{ question.$model.question }} <span
            v-if="question.$model.required" class="text-danger">*</span>
            <a class="ml-2" v-if="question.$model.ilustration || question.$model.illustration"
               @click="showIllustration(question.$model)"
               href="#">Ilustración</a>
          </label>
          <textarea :disabled="questionnaire.solved" class="form-control"
                    :class="{'is-invalid': question.$model.required && question.$error }"
                    id="exampleFormControlTextarea1" rows="3" v-model="question.$model.value"></textarea>
          <div v-if="question.$model.required && question.$error"
               class="invalid-feedback">
            Este campo es requerido
          </div>
        </div>
        <!--  Campo tipo select -->
        <div v-if="question.$model.type_question.name === 'select'" class="mb-2">
          <label class="form-label" :class="{'text-danger': question.$model.required && question.$error }"
                 for="exampleFormControlTextarea1">{{ question.$model.question }} <span
            class="text-danger" v-if="question.$model.required">*</span>
            <a class="ml-2" v-if="question.$model.ilustration || question.$model.illustration"
               @click="showIllustration(question.$model)" href="#">Ilustración</a>
          </label>
          <br>
          <select :disabled="questionnaire.solved" class="form-select w-100" v-model="question.$model.value"
                  :class="{'is-invalid': question.$model.required && question.$error }">
            <option value="" class="text-light">Selecciona</option>
            <option v-for="(option, index) in jsonParse(question.$model)" :key="index">
              {{ option.option }}
            </option>
          </select>
          <div v-if="question.$model.required && question.$error"
               class="invalid-feedback">
            Este campo es requerido
          </div>
        </div>
        <!-- Campo tipo checkbox -->
        <div v-if="question.$model.type_question.name === 'checkbox'" class="mb-2">
          <div v-for="(question, questionIndex) in $v.questions.$each.$iter" :key="questionIndex">
            <!-- ... tu código anterior ... -->
            <!-- Campo tipo checkbox -->
            <div v-if="question.$model.type_question.name === 'checkbox'" class="mb-2">
              <label class="form-label" :class="{'text-danger': question.$model.required && question.$error }"
                     for="exampleFormControlTextarea1">{{ question.$model.question }}
                <span class="text-danger" v-if="question.$model.required">*</span>
                <a class="ml-2" v-if="question.$model.ilustration || question.$model.illustration"
                   @click="showIllustration(question.$model)" href="#">Ilustración</a>
              </label>
              <div>
                <div v-if="question.$model.value === undefined">
                  <!-- Inicializar question.$model.value como un arreglo vacío -->
                  <input :disabled="questionnaire.solved" type="hidden" v-model="question.$model.value">
                </div>
                <div class="form-check form-check-danger mb-1"
                     v-for="(option, optionIndex) in jsonParse(question.$model)" :key="optionIndex">
                  <input :disabled="questionnaire.solved" type="checkbox"
                         :class="{'is-invalid': question.$model.required && question.$error }"
                         :value="option"
                         :checked="isChecked(question, option.option)"
                         @change="(event) => handleCheckboxChange(question, option, event.target.checked)"
                         class="form-check-input"
                         id="colorCheck5">
                  <label class="form-check-label" for="colorCheck5">{{ option.option }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        <div v-if="question.$model.required && question.$error"-->
        <!--             class="invalid-feedback">-->
        <!--          Este campo es requerido-->
        <!--        </div>-->
      </div>
    </div>
    <!--    <div class="mt-1">-->
    <!--      <div class="mt-5">-->
    <!--        <div class="mb-2">-->
    <div class="mt-4">
      <button class="btn btn-success btn-block" @click="saveQuestionnaire()" v-if="!questionnaire.solved">
        Guardar
      </button>

      <div class="my-3">
        <button class="btn-secondary btn btn-block" @click="cancelQuestionnaire()"
                v-if="!questionnaire.solved">Cancelar
        </button>
      </div>
      <div>
        <button class="btn-secondary btn btn-block" @click="closeModal()" v-if="questionnaire.solved">
          Cerrar
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import {required, requiredIf} from "vuelidate/lib/validators";
import {bus} from "../../plugins/bus";
import PreviewQuestionIlustration from "./PreviewQuestionIlustration";

export default {
  name: "ModalQuestionnaire",
  props: ['questionnaire'],
  data() {
    return {
      questions: []
    }
  },

  validations: {
    questions: {
      required,
      $each: {
        value: {
          required: requiredIf(function (item) {
            return item.required === 1
          })
        }
      }
    }
  },
  beforeMount() {
    this.questions = this.$store.state.resource.questions
  },
  methods: {
    isChecked(question, option) {
      if (question.$model.value) {
        let questionAnswer = question.$model.value

        if (this.questionnaire.solved) {
          questionAnswer = JSON.parse(questionAnswer)
          return question.$model.value.includes(option);
        }

        if (Array.isArray(questionAnswer)) {
          question.$model.value.includes(option);
        }
        // return false;
      }
    },

    handleCheckboxChange(question, option, checked) {
      if (Array.isArray(question.$model.value)) {
        console.log(question.$model.value.some(item => item.option === option.option))
        console.log(option.option)
        if (checked && !question.$model.value.includes(option.option)) {
          question.$model.value.push(option);
        } else if (!checked && question.$model.value.some(item => item.option === option.option)) {
          let index =  question.$model.value.findIndex(item => item.option === option.option)
          console.log('ENTRO POR ACÁ', index)
          if (index !== -1){
            question.$model.value.splice(index, 1)
          }
          // question.$model.value = question.$model.value.filter(v => v !== option.option);
        }
      } else {
        question.$model.value = checked ? [option] : '';
      }
    },

    closeModal() {
      this.$FModal.hide()
    },
    showIllustration(question) {
      this.$FModal.show(
        {
          component: PreviewQuestionIlustration,
          // clickToClose: false,
          // escToClose: false,
          placement: 'center center',
        },
        {
          question: question
        }
      )
    },
    saveQuestionnaire() {
      // Forzamos la validación de todos los campos
      this.$v.questions.$touch();

      // Verificamos si hay campos inválidos
      if (this.$v.$invalid) {
        // Si hay campos inválidos, mostramos un mensaje de error o hacemos algo
        console.log('Hay campos inválidos');
        return;
      }
      let dataQuestions = {
        questionnaireId : this.questionnaire.id,
        questions: this.questions
      }

      // this.$store.dispatch('updateStateResolvedQuestionnaire', this.questionnaire.id)
      bus.$emit('resolvedQuestionnaire', dataQuestions)
      // Si todos los campos son válidos, guardamos los datos
      console.log('Todos los campos son válidos. Guardando datos...');
      this.$FModal.hide()
    },
    cancelQuestionnaire() {
      this.$FModal.hide()
    },
    jsonParse(question) {
      try {
        const parsedOptions = JSON.parse(question.options)
        return Array.isArray(parsedOptions) ? JSON.parse(question.options) : ''
      } catch (error) {
        return question.options
      }
    },
  },
  mounted() {
    // Inicializar el valor del v-model de la pregunta de tipo checkbox
    if (this.$refs.checkboxInput !== undefined) {
      this.$refs.checkboxInput.value = [];
    }
  }
}
</script>

<style>
.vs-checkbox-primary input:checked + .vs-checkbox {
  background: #D85C72 !important;
  border: 2px solid #D85C72 !important;
}
</style>
