import * as URL from '../../api/api'
import axios from 'axios';

const state = {
  sResult: {},
  npu: ''
}

const getters = {
  searchResult:(state,getters,rootState) => {return state.sResult},
  nextPageUrl:(state,getters,rootState) => {return state.npu}
}

const actions = {
  fetchData({commit},{q}) {
    const u = URL.SEARCH_URL + q
    axios.get(u).then(res => {
      commit('fetchDataSucceed',{res})
    })
  },
  fetchNextPage({commit},{url}) {
    const u = URL.BASE_URL + url
    axios.get(u).then(res => {
      commit('fetchNextPageSucceed',{res})
    })
  }
}

const mutations = {
  fetchDataSucceed(state,{res}) {
    const data = res.data
    state.sResult = data
    state.npu = data.nextPageUrl
  },
  fetchNextPageSucceed(state,{res}) {
    const data = res.data
    state.sResult = data
    state.npu = data.nextPageUrl
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
