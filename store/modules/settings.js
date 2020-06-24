import { has, get, set, isUndefined, isNaN } from 'lodash'
import { KEY_POPULATION } from '~/store/config'

const DEFAULTS = {
  key: KEY_POPULATION,
  isColored: true,
  isSorted: false
}

const state = () => {
  return {
    key: DEFAULTS.key,
    isColored: DEFAULTS.isColored,
    isSorted: DEFAULTS.isSorted
  }
}

const mutations = {
  SETTINGS_CHANGE (state, { key, value }) {
    if (has(state, key)) {
      let val = value
      if (isUndefined(value) || isNaN(value)) {
        val = get(DEFAULTS, key)
      }
      set(state, key, val)
    }
  }
}

const actions = {
  changeSettings ({ commit }, params) {
    commit('SETTINGS_CHANGE', params)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
