export default {
  ssr: true,
  image: {
    // baseURL: 'https://that-test.site'
    provider: 'twicpics',
    twicpics: {
      baseURL: 'https://aicode.sfo3.digitaloceanspaces.com'
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
      // { src: 'https://js.stripe.com/v3' },
      {dev: "export NODE_TLS_REJECT_UNAUTHORIZED=0 && nuxt --env.NODE_TLS_REJECT_UNAUTHORIZED=0",}
    ],
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
  generate: {
    routes: require('./router.js')
  },
  publicRuntimeConfig: {
    timezone: process.env.TIME_ZONE,
    logo: process.env.LOGO_PRIMARY,
    // url: process.env.BASE_URL_API_MONITOR_FRONT,
    urlBack: process.env.BASE_URL_API_MONITOR_BACK,
    urlDigitalOcean: process.env.DIGITALOCEAN_SPACES_ENDPOINT,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_ACCOUNT: process.env.STRIPE_ACCOUNT,
    recaptcha: {
      hideBadge: true,
      siteKey: process.env.RECAPTCHA_SITE_KEY,    // Site key for requests
      version: 2,    // Version
      size: 'normal' // Size: 'compact', 'normal', 'invisible' (v2)
    },
    axios: {
      baseURL: process.env.BASE_URL_API_MONITOR_BACK
    }
  },
  env: {
    logoPrimary: process.env.LOGO_PRIMARY
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/application.scss',
    'boxicons/css/boxicons.min.css'
  ],

  auth: {
    redirect: {
      home: '/webapp/inicio',
      logout: '/login'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: {url: '/login', method: 'post'},
          logout: {url: '/logout', method: 'post'},
          user: {url: '/api/v1/user', method: 'get'}
        }
      }
    }
  },


  // router: {
  //   middleware: ['auth']
  // },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus',
    '~/plugins/axios',
    '~/plugins/vue-sax',
    '~/plugins/vuelidate',
    '~/plugins/is-subscription',
    '~/plugins/vue-multiselect',
    '~/plugins/laravel-permissions',
    {src: '~/plugins/vue-easytable', ssr: false},
    {src: '~/plugins/vuex-persist', ssr: false, mode: 'client'},
    {src: '~/plugins/idle-vue', ssr: false, mode: 'client'},
    // {src: '~/plugins/k-pop', ssr: false},
    {src: '~/assets/js/active.js', mode: 'client'},
    {src: '~/plugins/vue-datepicker', ssr: false},
    {src: '~/plugins/vue-timepicker', ssr: false},
    {src: '~/plugins/vue2-dropzone', ssr: false},
    {src: '~/plugins/vue-social-chat', ssr: false},
    {src: '~/plugins/mqtt', mode: 'client', ssr: false},
    // { src: '~/plugins/vue-body-part-selector' , ssr: false },
    {src: '~/assets/js/dark-rtl.js', mode: 'client'},
    {src: '~plugins/vue-full-calendar', ssr: false},
    {src: '~/plugins/splideplugin', mode: 'client'},
    {src: '~/plugins/cxlt-vue2-toastr', mode: 'client'},
    {src: '~/assets/js/tiny-slider.js', mode: 'client'},
    {src: '~/plugins/vue-file-agent.js', mode: 'client', ssr: false},
    // { src: '~/plugins/vue-number-format.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-signature-pad', mode: 'client'},
    {src: '~/assets/js/slideToggle.min.js', mode: 'client'},
    {src: '~/assets/js/internet-status.js', mode: 'client'},
    {src: '~/assets/js/rangeslider.min.js', mode: 'client'},
    {src: '~/plugins/vue-phone-number-input.js', ssr: false},
    { src: '~/plugins/infiniteloading.js', ssr: false },
    // { src: '~/plugins/stripe-elements.js', mode: 'client', ssr: false},
    {src: '~/plugins/v-money.js', mode: 'client', ssr: false},
    {src: '~/plugins/vuejs-smart-table.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-functional-calendar.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-currency-filter.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-fullpage-modal.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-confirm-dialog.js', mode: 'client', ssr: false},
    {src: '~/plugins/vuejs-datepicker.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-load-image.js', mode: 'client', ssr: false},
    // { src: '~/plugins/vue-loadmore-simple.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-credit-card-validation.js', mode: 'client', ssr: false},
    {src: '~/plugins/vuejs-loadmore.js'}
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
      '~/components/plans/',
      '~/components/alert/',
      '~/components/checkout/',
      '~/components/checkout/payments'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
    '@nuxtjs/router',
    '@nuxtjs/dotenv'
  ],
  moment: {
    defaultLocale: 'es',
    locales: ['es'],
    timezone: true,
    defaultTimezone: 'Europe/Madrid'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/image',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    ['@nuxtjs/date-fns', {defaultLocale: 'es'}],
    '@nuxtjs/auth-next',
    '@nuxtjs/recaptcha',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    'vue-scrollto/nuxt',
    '@nuxtjs/pwa',
    'vue-scrollto/nuxt',

    // Or if you have custom options...
    ['vue-scrollto/nuxt', { duration: 300 }]
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'SaludWoM',
      author: 'SaludWoM'
    },
    icons: {
      /* icon options */
      iconFileName: 'icon.png'
    },
    manifest: {
      name: 'SaludWoM',
      short_name: 'SaludWoM',
      lang: 'es',
      display: 'standalone',
      start_url: '/',
      workbox: {
        dev: true // or use a global variable to track the current NODE_ENV, etc to determine dev mode
      }
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
  build: {
    babel: {
      compact: true
    }
  }
}
