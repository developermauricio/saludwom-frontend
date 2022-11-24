import $axios from "vuesax";

let subscription = null;

export const getSubscription = () => {
  fetch('https://saludwom.socket-aicode.art/api/v1/get-current-subscription').then((resp) =>{
    console.log(resp)
    subscription = resp.data.data
  })
  return subscription
}
