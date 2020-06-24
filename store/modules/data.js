import { assign, uniq, map } from 'lodash'
import axios from 'axios'
import { STATUS_IDLE, STATUS_LOADING, STATUS_LOADING_SUCCESS, PATH_CITIES, KEY_CONTINENT, KEY_RATIO, KEY_POPULATION, KEY_AREA } from '~/store/config'

const DEFAULT_DATA = {
  status: STATUS_IDLE,
  data: []
}

const state = () => {
  return {
    cities: DEFAULT_DATA
  }
}

const mutations = {
  DATA_CHANGE (state, data) {
    state.cities = assign(DEFAULT_DATA, data)
  }
}

const getters = {
  continents: (state) => {
    return uniq(map(state.cities.data, KEY_CONTINENT))
  }
}

function prepareData (data) {
  return map(data, (datum) => {
    return {
      ...datum,
      [KEY_RATIO]: datum[KEY_AREA] / datum[KEY_POPULATION]
    }
  })
}

const actions = {
  loadInvestments ({ commit, state }) {
    commit('DATA_CHANGE', { status: STATUS_LOADING })
    axios.get(PATH_CITIES)
      .then((response) => {
        const data = prepareData(response.data)
        commit('DATA_CHANGE', { status: STATUS_LOADING_SUCCESS, data })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
