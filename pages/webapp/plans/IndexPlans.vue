<template>
  <div>
    <div class="container mb-4">
      <ListPlan @selectedPlan="selectedPlan"/>
      <div class="apply-coupon mt-4">
        <h6 class="mb-0">¿Tienes un cupón?</h6>
        <p class="mb-2">Introduce tu código de cupón aquí y obtén increíbles descuentos!</p>
        <div class="coupon-form">
          <form action="#">
            <div class="form-group">
              <div class="input-group">
                <input class="form-control input-group-text text-start" type="text" placeholder="INGRESA AQUÍ TU CUPÓN">
                <button class="btn btn-primary" >Aplicar</button>
              </div>
            </div>
          </form>
        </div>
        <div class="mb-3 d-flex">
          <vs-checkbox color="#792151" v-model="accept"></vs-checkbox>
          <label class="form-check-label text-muted fw-normal" for="checkedCheckbox">Aceptar términos y condiciones</label>
        </div>
        <button :disabled="!accept" class="btn btn-primary w-100" type="submit">Pagar {{ plan ? plan.title : '' }} <strong style="font-size: 1.2rem">{{ plan ? plan.price : '' }}</strong> & Registrar </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPlans",
  data(){
    return{
      plan: null,
      accept: false,
    }
  },
  methods:{
    selectedPlan(data){
      this.plan = data;
    }
  }
}
</script>

<style scoped>

</style>
