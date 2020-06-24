import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'
import settings from './modules/settings'

Vue.use(Vuex)

export const modules = {
  data,
  settings
}
