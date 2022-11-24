import Vue from "vue";
import Router from 'vue-router';

Vue.use(Router);

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m);

const routes = [
  /*=============================================
      RUTAS WEBAPP
    =============================================*/
  { path: '/webapp',
    name: 'webapp',
    component: page('webapp/Index.vue'),
    children: [
      { path: '/webapp/inicio', name: 'index.home', component: page('webapp/home/IndexHome.vue') },
      { path: '/webapp/citas', name: 'index.quotes', component: page('webapp/quotes/IndexQuotes.vue') },
      /* Rutas para los doctores*/
      { path: '/webapp/doctores', name: 'index.doctors', component: page('webapp/doctors/IndexDoctors.vue') },
      /* Rutas del perfil del usuario*/
      { path: '/webapp/perfil', name: 'index.profile', component: page('webapp/profile/IndexProfile.vue')},
      { path: '/webapp/perfil/info', name: 'profile.info', component: page('webapp/profile/InfoProfile.vue') },
      /* Rutas para las valoraciones*/
      { path: '/webapp/valoracion/crear', name: 'valuation.create', component: page('webapp/valuations/create/CreateValuation.vue')},
      /* Rutas para los planes*/
      { path: '/webapp/planes', name: 'index.plans', component: page('webapp/plans/IndexPlans.vue')},
      /* Rutas para las suscripciones*/
      { path: '/webapp/perfil/suscripciones', name: 'index.subscriptions', component: page('webapp/subscriptions/IndexSubscriptions.vue')},
      /* Rutas para el historial de pagos*/
      { path: '/webapp/perfil/historial-pagos', name: 'index.payment.history', component: page('webapp/paymentHistory/IndexPaymentHistory.vue')},
    ]
  },

  /*=============================================
      RUTAS AUTH
    =============================================*/
  { path: '/login', name: 'login', component: page('auth/login/Login.vue')},

  { path: '/register', name: 'register', component: page('auth/register/Register.vue') },
  { path: '/api/v1/verification/verify/:id', name: 'verification.verify', component: page('auth/verification/Verify.vue') },
  { path: '/resend', name: 'verification.resend', component: page('auth/verification/Resend.vue') },
  { path: '/password/email', name: 'password.email', component: page('auth/password/ResetEmail.vue') },
  { path: '/password-reset/:token', name: 'password.reset', component: page('auth/password/PasswordReset.vue') },

  // { path: '/logout', name: 'logout', component: page('auth/Logout.vue')},
  { path: '/test', name: 'test', component: page('webapp/Test.vue') },
];

export function createRouter(){
  return new Router({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
  })
}
