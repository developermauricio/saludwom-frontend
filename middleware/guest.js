export default function ({$auth, redirect}) {
  console.log('auth',$auth.loggedIn);
  // if (store.state.auth.loggedIn){
  //   return redirect('/webapp/inicio')
  // }
}
// export const guest = (loggedIn) =>{
//   // console.log(context.app.router)
//     if (loggedIn){
//     alert('holas')
//   }
// }
// import {isLoggedIn} from "./validator";
// const isAuthenticatedGuard = async(to, from, next) =>{
//
//   return new Promise(() =>{
//
//     console.log(to.meta)
//     const requiresAuth = to.meta.requiresAuth
//
//     if (!requiresAuth && !isLoggedIn()) next({name: 'Home'})
//
//     if (requiresAuth && !isLoggedIn()) next({name: 'Login'})
//     else next()
//   })
// }
//
// export default isAuthenticatedGuard
