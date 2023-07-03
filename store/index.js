import Vue from 'vue'
import Vuex from 'vuex'

import * as resource from "./modules/resources/resource";

Vue.use (Vuex)

export default () => new Vuex.Store({
  modules: {
    resource
  }
})
