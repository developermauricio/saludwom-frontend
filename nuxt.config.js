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
    ]
  },
  publicRuntimeConfig: {
    logo: process.env.LOGO_PRIMARY,
    url: process.env.BASE_URL_API_MONITOR_FRONT,
    recaptcha: {
      hideBadge: true,
      siteKey: process.env.RECAPTCHA_SITE_KEY,    // Site key for requests
      version: 2,    // Version
      size: 'normal' // Size: 'compact', 'normal', 'invisible' (v2)
    },
    axios: {
      baseURL: process.env.BASE_URL_API_MONITOR_BACK
    },
  },
  env: {
    logoPrimary: process.env.LOGO_PRIMARY
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/application.scss',
    'boxicons/css/boxicons.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus',
    '~/plugins/vue-sax',
    '~/plugins/vuelidate',
    '~/plugins/vue-multiselect',
    { src: '~/assets/js/active.js', mode: 'client'},
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/vue-timepicker', ssr: false },
    { src: '~/plugins/vue2-dropzone' , ssr: false },
    { src: '~/plugins/vue-social-chat' , ssr: false },
    // { src: '~/plugins/vue-body-part-selector' , ssr: false },
    { src: '~/assets/js/dark-rtl.js', mode: 'client'},
    { src: '~plugins/vue-full-calendar', ssr: false },
    { src: '~/plugins/splideplugin' , mode: 'client' },
    { src: '~/plugins/cxlt-vue2-toastr' , mode: 'client' },
    { src: '~/assets/js/tiny-slider.js', mode: 'client'},
    { src: '~/plugins/vue-file-agent.js', mode: 'client'},
    { src: '~/plugins/vue-signature-pad' , mode: 'client' },
    { src: '~/assets/js/slideToggle.min.js', mode: 'client'},
    { src: '~/assets/js/internet-status.js', mode: 'client'},
    { src: '~/assets/js/rangeslider.min.js', mode: 'client'},
    { src: '~/plugins/vue-phone-number-input.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: [
  //   '~/components',
  //   { path: '~/components/calendars/', extensions: ['vue'], prefix: 'calendar' },
  //   { path: '~/components/plans/', extensions: ['vue'], prefix: 'plans' }
  // ],components: [
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/plans/'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/recaptcha',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'SaludWom',
      author: 'SaludWom'
    },
    manifest: {
      name: 'SaludWom',
      lang: 'en',
      display: 'standalone',
      start_url: '',
      /*workbox: {
        exclude: ['_redirects'],
        enabled: false,
        cacheAssets: false, // for /*
        offline: false, // for /_nuxt/*
        cleanupOutdatedCaches: true
      }*/
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
