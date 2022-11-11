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
      </div>
    </div>


    <Stripe :planData="plan"/>
    <div class="pr-3 pl-3 m-0">
      <button class="btn btn-secondary btn-block" @click="closeModal">Cancelar</button>
    </div>

  </div>
</template>
<script>

import {bus} from "../../plugins/bus";

export default {
  name: "Checkout",
  components: {},

  data() {
    return {
    };
  },
  props: ['plan'],
  methods: {
    closeModal(){
      this.$emit('closeModal')
    }
  },
  mounted() {
    bus.$on('planSendStripe', (data) => {
      this.plan = data
    })
  },
}
</script>

<style scoped>

</style>

