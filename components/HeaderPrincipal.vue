<template>
  <div>
    <div class="header-area" id="headerArea">
      <div class="container">
        <!-- Header Content -->
        <div class="header-content position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <div class="logo-wrapper offline-url">
            <nuxt-link to="/webapp/inicio">
              <img class="w-70" :src="require(`~/assets/img/saludwom/${$config.logo}`)" alt="">
            </nuxt-link>
          </div>

          <div :class="`page-heading mr-5 text-truncate`">
            <slot name="title-header"></slot>
          </div>
          <!-- Back Button -->
          <Notifications/>
        </div>
        <!-- # Header Five Layout End -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderPrincipal"
}
</script>

<style scoped>

</style>
