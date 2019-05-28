import * as URL from '../../api/api'
import axios from 'axios';
import querystring from 'querystring';

const state = {
  title: '',
  description: '',
  tags: [],
  collectionCount: null,
  replyCount: null,
  author: {},
  duration: null,
  playInfo: [],
  relatedVideo: {},
  replies: {}
}

const getters = {
  vtitle:(state,getters,rootState) => {return state.title},
  vdescription:(state,getters,rootState) => {return state.description},
  vtags:(state,getters,rootState) => {return state.tags},
  vcollectionCount:(state,getters,rootState) => {return state.collectionCount},
  vreplyCount:(state,getters,rootState) => {return state.replyCount},
  vauthor:(state,getters,rootState) => {return state.author},
  vduration:(state,getters,rootState) => {return state.duration},
  vplayInfo:(state,getters,rootState) => {return state.playInfo},
  vrelatedVideo:(state,getters,rootState) => {return state.relatedVideo},
  vreplies:(state,getters,rootState) => {return state.replies}
}

const actions = {
  getVideoInfo({ commit },{ id }) {
    const u = URL.VIDEO_DETAIL_URL + id
    axios.get(u).then(res => {
      commit('getVideoInfoSucceed',{res})
    })
  },
  // cCountUp({commit}) {
  //   commit('collectionCountUp')
  // },
  // cCountDown({commit}) {
  //   commit('collectionCountDown')
  // },
  getRelatedVideo({commit},{id}) {
    const u = URL.RELATE_VIDEO_LIST_URL + id +'?num=8'
    axios.get(u).then(res => {
      commit('getRelatedVideoSucceed',{res})
    })
  },
  getVideoReplies({commit},{id}) {
    const u = URL.REPLIES_VIDEO_LIST_URL + id +'&num=10'
    axios.get(u).then(res => {
      commit('getVideoRepliesSucceed',{res})
    })
  },
  addReply({commit},{user}) {
    commit('addReplySucceed',{user})
  }
}

const mutations = {
  getVideoInfoSucceed(state,{res}) {
    const data = res.data
     state.title = data.title
     state.description = data.description
     state.tags = data.tags
     state.collectionCount = data.consumption.collectionCount
     state.replyCount = data.consumption.replyCount
     state.author = data.author
     state.duration = data.duration
     state.playInfo = data.playInfo
  },
  // collectionCountUp(state) {
  //   state.collectionCount += 1
  // },
  // collectionCountDown(state) {
  //   state.collectionCount -=1
  // },
  getRelatedVideoSucceed(state,{res}) {
    const data = res.data
    state.relatedVideo = data
  },
  getVideoRepliesSucceed(state,{res}) {
    const data = res.data
    state.replies = data
  },
  addReplySucceed(state,{user}) {
    state.replies.replyList.unshift(user)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
