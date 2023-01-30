<template>
  <div>
    <div class="page-content-wrapper py-3">
      <div class="custom-container">
        <div class="card">
          <div class="card-body px-5 text-center">
            <img class="w-75 mb-3 mt-2" :src="require(`~/assets/img/saludwom/${$config.logo}`)" alt="">
            <h4>¡Página no encontrada! {{ error.statusCode }}</h4>
            <p class="mb-4">La página que buscas no se encuentra en nuestra aplicación. También este mensaje se muestra por algun error en la app. Consulta al administrador.</p>
            <a @click="$router.back()" class="btn btn-creative btn-danger" >Volver</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  props:['error']
}
</script>

<style scoped>

</style>
