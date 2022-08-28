export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'saludwom',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
  },
  publicRuntimeConfig: {
    logo: process.env.LOGO_PRIMARY
  },
  env: {
    logoPrimary: process.env.LOGO_PRIMARY
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/application.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus',
    { src: '~/assets/js/internet-status.js', mode: 'client'},
    { src: '~/assets/js/dark-rtl.js', mode: 'client'},
    { src: '~/assets/js/rangeslider.min.js', mode: 'client'},
    { src: '~/assets/js/slideToggle.min.js', mode: 'client'},
    { src: '~/assets/js/tiny-slider.js', mode: 'client'},
    { src: '~/assets/js/active.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'SaludWom',
      author: 'SaludWom',
    },
    manifest: {
      name: 'SaludWom',
      lang: 'en',
      display: 'standalone',
      workboxOptions: {
        exclude: ['_redirects'],
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
