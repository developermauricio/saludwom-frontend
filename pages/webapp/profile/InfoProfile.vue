<template>
  <div>
    <div class="container">
      <!--=====================================
		    COMPONENTE CARD PROFILE
    ======================================-->
      <CardProfile/>

      <!--=====================================
		    COMPONENTE USUARIO INFORMACIÓN
    ======================================-->
      <div class="card user-data-card">
        <div class="card-body">
          <form action="#">
            <div class="form-group mb-3">
              <label class="form-label" for="namesProfile">Nombres</label>
              <input class="form-control" id="namesProfile" type="text" placeholder="Nombres">
            </div>
            <div class="form-group mb-3">
              <label class="form-label" for="lastNameProfile">Apellidos</label>
              <input class="form-control" id="lastNameProfile" type="text" placeholder="Apellidos">
            </div>
            <div class="form-group mb-3">
              <label class="form-label" for="emailProfile">Correo electrónico</label>
              <input class="form-control" id="emailProfile" type="email" placeholder="Correo Electrónico">
            </div>
            <div class="form-group mb-3">
              <label class="form-label" for="phoneProfile">Teléfono</label>
              <input class="form-control" id="phoneProfile" type="text" placeholder="Teléfono">
            </div>
            <button class="btn btn-primary w-100" type="submit">Actualizar Ahora</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProfile from "./components/CardProfile";
export default {
  name: "InfoProfile",
  components:{
    CardProfile
  },
}
</script>

<style scoped>

</style>
