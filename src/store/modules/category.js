import * as URL from '../../api/api'
import axios from 'axios';

const state = {
  npu: '',
  page: [],
  isLoading: true
}

const getters = {
  pages:(state,getters,rootState) => {return state.page},
  categoriesIsLoading:(state,getters,rootState) => {return state.isLoading}
}

const actions = {
  fetchPageOne({dispatch,commit}) {
    const u = URL.VIDEO_CATEGORY_URL
    axios.get(u).then( res => {
      commit('handleFetchData',{res})
      dispatch('fetchPageTwo')
    })
  },
  fetchPageTwo({dispatch,commit}) {
    const u = URL.BASE_URL + state.npu
    axios.get(u).then( res => {
      commit('handleFetchData',{res})
      dispatch('fetchPageThree')
    })
  },
  fetchPageThree({dispatch,commit}) {
    const u = URL.BASE_URL + state.npu
    axios.get(u).then( res => {
      commit('handleFetchData',{res})
      dispatch('fetchPageFour')
    })
  },
  fetchPageFour({commit}) {
    const u = URL.BASE_URL + state.npu
    axios.get(u).then( res => {
      commit('handleFetchData',{res})
    })
  },
}

const mutations = {
  handleFetchData(state,{res}) {
    state.isLoading = false
    let data  = res.data
    state.npu = data.nextPageUrl
    let r = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let color = 'rgb(' + r+','+g+','+b+')'
    const s = {
      styleObject: {
        color: color
      }
    }
    data = Object.assign({},data,s)//这里偷个懒，不一一给每个分类设置随机颜色了嘻嘻
    state.page.push(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
