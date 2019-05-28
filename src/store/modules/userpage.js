import * as URL from '../../api/api'
import axios from 'axios';
var _ = require('lodash');

const state = {
  videoSet: [],
  category: ['全部'],
  videoSorted: []
}

const getters = {
  likevideos:(state,getters,rootState) => {return state.videoSorted},
  videoCatogery:(state,getters,rootState) => {return _.uniq(state.category)},

}

const actions = {
  fetchData({commit},{likeVideoObject}) {
    likeVideoObject.likeVideo.map(item => {
      const u = URL.VIDEO_DETAIL_URL + item.id
      axios.get(u).then(res => {
        commit('fetchDataSucceed',{res})
      })
    })
  },
  select({commit},{category}) {
    commit('selectCategory',{category})
  }
}

const mutations = {
  fetchDataSucceed(state,{res}) {
    const data = res.data
    state.videoSet.push(data)
    state.videoSorted.push(data)
    state.category.push(data.category)
  },
  selectCategory(state,{category}) {
    if(category === '全部'){
      state.videoSorted = state.videoSet
    }else{
      const v = []
      state.videoSet.map(item => {
        if(item.category === category) {
          v.push(item)
        }
      })
      state.videoSorted = v
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
