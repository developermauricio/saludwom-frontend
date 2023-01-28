import {bus} from "../plugins/bus";

export default function ({app, redirect}) {
  console.log(app.$auth.user.role_names)
  if (!app.$auth.user.role_names.includes('Doctor')){
    bus.$emit('accessNotAllowed', true)
    return redirect('/webapp/inicio')
  }
}
