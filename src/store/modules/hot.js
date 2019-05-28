import * as URL from '../../api/api'
import axios from 'axios';

const state = {
  hv: [],
  npu: '',
  isLoading: true
}
const getters = {
  hotVideo:(state,getters,rootState) => {return state.hv},
  nextPageUrl:(state,getters,rootState) => {return state.npu},
  hotIsLoading:(state,getters,rootState) => {return state.isLoading}
}

const actions = {
  fetchData({commit}) {
    const u = URL.VIDEO_HOT
    axios.get(u).then( res => {
      commit('fetchDataSucceed',{res})
    })
  },
  fetchNextPage({commit},{url}){
  const u = URL.BASE_URL + url
  axios.get(u).then( res => {
    commit('fetchNextPageSucceed',{res})
   })
 }
}

const mutations = {
  fetchDataSucceed(state,{res}) {
    state.isLoading = false
    const data = res.data
    state.npu = data.nextPageUrl
    data.itemList.map(item => {
      if(item.type === 'video')
      {
        state.hv.push(item)
      }
    })
  },
  fetchNextPageSucceed(state,{res}) {
    state.hv = []
    const data = res.data
    state.npu = data.nextPageUrl
    setTimeout(function() {
      data.itemList.map(item => {
        if(item.type === 'video')
        {
          state.hv.push(item)
        }
      })
    },1000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
