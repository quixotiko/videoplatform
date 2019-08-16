import * as URL from '../../api/api'
import axios from 'axios';
import querystring from 'querystring';
var _ = require('lodash');

const state = {
  vForHome: {},
  vForSlider: {},
  vForToday_1: {},
  vForToday_2: {},
  vcOfFollow: {},
  vcWithCover: {},
  url:'',
  nextTagUrl: '',
  tags: [],
  tagVideo: [],
  styleObject: {},
  isLoading: true
}
//这里不要把getters写错，复数
//modules里面的getters的回调函数要加上return！！
 const getters = {
  videoForHome:(state,getters,rootState) => {return state.vForHome},
  videoForSlider:(state,getters,rootState) => {return state.vForSlider},
  videoForToday_1:(state,getters,rootState) => {return state.vForToday_1},
  videoForToday_2:(state,getters,rootState) => {return state.vForToday_2},
  videoCollectionOfFollow:(state,getters,rootState) => {return state.vcOfFollow},
  videoCollectionWithCover:(state,getters,rootState) => {return state.vcWithCover},
  homeIsLoading:(state,getters,rootState) => {return state.isLoading},
  videoTags:(state,getters,rootstate) => {return _.uniqWith(state.tags, _.isEqual)},
  vTagVideo:(state,getters,rootState) => {return state.tagVideo}
}

const actions = {
  getVideoForHome({dispatch,commit}) {
    axios.get(URL.HOME_PAGE_URL).then(res => {
      commit('getVideoForHomeSucceed',{res})//getVideoForHomeSucceed执行完成后才会执行dispatch？
      dispatch('getMoreVideoForHome')
    })
  },
  getMoreVideoForHome({dispatch,commit}) {
      const u = URL.BASE_URL + state.url
      axios.get(u).then(res => {
      commit('getMoreVideoForHomeSucceed',{res})
    })
  },
  getBlurred({commit}) {
    commit('getHomePageBlurred')
  },
  getClear({commit}) {
    commit('getPageClear')
  },
  handleGetMore({commit}) {
    const u = URL.BASE_URL + state.url
    axios.get(u).then(res => {
      commit('handleGetMoreSucceed',{res})
    })
  },
  fetchTagVideo({commit},{actionUrl}) {
    let u
    if(!state.nextTagUrl){
      u = URL.VIDEO_HOT//为了模拟加载新数据，借用热门视频的api
    }else{
      u = URL.BASE_URL + state.nextTagUrl
    }
    axios.get(u).then(res => {
      commit('fetchTagVideoSucceed', {res})
    })
  }
}

const mutations ={
  getVideoForHomeSucceed(state,{res}) {
    const data = res.data
    state.isLoading = false
    state.url = data.nextPageUrl
    let vfh = [],vcof = [],vcwc = []
    let vfs = [],vft_1 = [],vft_2 = []
    data.itemList.map((item) => {
      if(item.type === 'video')
      {
        vfh.push(item)
        item.data.tags.map((tag) => {
          state.tags.push(tag)
        })
      }
      else if(item.type === 'videoCollectionOfFollow')
      {
        vcof.push(item)
      }
      else if(item.type === 'videoCollectionWithCover')
      {
        vcwc.push(item)
      }
    })
    while(vfh.length < 10){
      vfh.push(vfh[_.random(0,4)])
    }
    var v = vcwc[0].data.itemList
    v = _.concat(v, vfh.slice(0, 3))
    vcwc[0].data.itemList = v
    vfs = vfh.splice(0,4)
    vft_1 = vfh.splice(0,3)
    vft_2 = vfh.splice(0,3)
    vfs.map((video,index) => {
      video.id =  index
     })
    state.vForHome = Object.assign({},state.vForHome,{videoList:vfh})
    state.vForSlider = Object.assign({},state.vForSlider,{videoList:vfs})
    state.vForToday_1 = Object.assign({},state.vForToday_1,{videoList:vft_1})
    state.vForToday_2 = Object.assign({},state.vForToday_2,{videoList:vft_2})
    state.vcOfFollow = Object.assign({},state.vcOfFollow,{videoList:vcof})
    state.vcWithCover = Object.assign({},state.vcWithCover,{videoList:vcwc})
    console.log(state.videoForSlider);//返回undefined说明mutations执行完成后getters才会重新计算？
  },
  getMoreVideoForHomeSucceed(state,{res}) {
    const data = res.data
    state.url = data.nextPageUrl
    let vfh = [],vcof = [],vcwc = []
    data.itemList.map((item) => {
      if(item.type === 'video')
      {
        vfh.push(item)
        // item.data.tags.map((tag) => {
        //   state.tags.push(tag)
        // })
      }
      else if(item.type === 'videoCollectionOfFollow')
      {
        vcof.push(item)
      }
      else if(item.type === 'videoCollectionWithCover')
      {
        vcwc.push(item)
      }
    })
    var v = vcwc[0].data.itemList
    v = _.concat(v, vfh.slice(0, 3))
    vcwc[0].data.itemList = v
    state.vForHome = Object.assign({},state.vForHome,{videoList2:vfh})
    state.vcOfFollow = Object.assign({},state.vcOfFollow,{videoList2:vcof})
    state.vcWithCover = Object.assign({},state.vcWithCover,{videoList2:vcwc})
  },
  handleGetMoreSucceed(state,{res}) {
    const data = res.data
    state.url = data.nextPageUrl
    data.itemList.map(item => {
      if(item.type === 'video')
      {
        state.vForHome.videoList2.push(item)
      }
    })
  },
  getHomePageBlurred(state) {
    state.styleObject = {
      filter: 'blur(2px)'
    }
  },
  getPageClear(state) {
    state.styleObject = {
      filter: 'blur(0)'
    }
  },
  fetchTagVideoSucceed(state,{res}) {
    const data = res.data
    state.nextTagUrl = data.nextPageUrl
    let tv = []
    data.itemList.map(item => {
      if(item.type === 'video')
      {
        tv.push(item)
        // state.tagVideo.push(item)
      }
    })
    state.tagVideo = tv.slice(0, 12)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
