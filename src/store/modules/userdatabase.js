const state = {
  loginSucceed: false,
  currentUser:'',
  // userName: '',
  // password: '',
  userList: [],
  // likeVideo: []
  videoLiked: null
}

const getters = {
  // loginS:(state,getters,rootState) => {return state.loginSucceed}
  vVideoLiked:(state,getters,rootState) => {return state.videoLiked},
  vloginOK:(state,getters,rootstate) => {return state.loginSucceed}
}

const actions = {
  regisButtonClick({commit},{name,psw}) {
    commit('regisSucceed',{name,psw})
  },
  loginButtonClick({commit},{name,psw}) {
    commit('handleLogin',{name,psw})
  },
  like({commit},{id}) {
    commit('likeUp',{id})
  },
  dislike({commit},{id}) {
    commit('likeDown',{id})
  },
  check({commit},{id}) {
    commit('checkIfLiked',{id})
  },
  logout({commit}) {
    commit('logoutSucceed')
  },
  logined({commit}) {
    commit('hasLogined')
  }
}

const mutations = {
  regisSucceed(state,{name,psw}) {
    if(window.localStorage.getItem('userMsg')){
      let user = JSON.parse(window.localStorage.getItem('userMsg'))
      user.userList.push({name,psw,likeVideo:[]})
      window.localStorage.setItem('userMsg',JSON.stringify(user))
    }
    else
    {
      state.userList.push({name,psw,likeVideo:[]})
      const user = {
        loginSucceed: false,
        currentUser: '',
        userList: state.userList,
        // likeVideo: []
      }
      //保存注册过的用户
      window.localStorage.setItem('userMsg',JSON.stringify(user))
      console.log(user);
    }
  },
  handleLogin(state,{name,psw}) {
    const user = JSON.parse(window.localStorage.getItem('userMsg'))
    user.userList.map((item) => {
      if(item.psw === psw && item.name === name)
      {
        state.loginSucceed = true
        state.currentUser = name
        //登录成功要保存当前用户
        // const user = {
        //   loginSucceed: true,
        //   currentUser: state.currentUser,
        //   userList: state.userList,
        //   // likeVideo: state.likeVideo
        // }
        user.loginSucceed = true
        user.currentUser = state.currentUser
        window.localStorage.setItem('userMsg',JSON.stringify(user))
      }
    })
  },
  likeUp(state,{id}) {
    let user = JSON.parse(window.localStorage.getItem('userMsg'))
    const name = JSON.parse(window.localStorage.getItem('userMsg')).currentUser
    // user.userList.likeVideo.push({id})
    user.userList.map(item => {
      if(item.name === name)
      {
        item.likeVideo.push({id})
      }
    })
    window.localStorage.setItem('userMsg',JSON.stringify(user))
    state.videoLiked = true
  },
  likeDown(state,{id}) {
    let user = JSON.parse(window.localStorage.getItem('userMsg'))
    const name = JSON.parse(window.localStorage.getItem('userMsg')).currentUser
    // user.userList.likeVideo.push({id})
    user.userList.map(item => {
      if(item.name === name)
      {
        item.likeVideo.splice(item.likeVideo.findIndex(video => video.id === id),1)
      }
    })
    window.localStorage.setItem('userMsg',JSON.stringify(user))
    state.videoLiked = false
  },
  checkIfLiked(state,{id}) {
    let user = JSON.parse(window.localStorage.getItem('userMsg'))
    const name = JSON.parse(window.localStorage.getItem('userMsg')).currentUser
    // user.userList.likeVideo.push({id})
    user.userList.map(item => {
      if(item.name === name)
      {
        if(item.likeVideo.findIndex(video => video.id ===  id) > -1){
          state.videoLiked = true
        }else{
          state.videoLiked = false
        }
      }
    })
    window.localStorage.setItem('userMsg',JSON.stringify(user))
  },
  logoutSucceed(state) {
    state.loginSucceed = false
  },
  hasLogined(state) {
    state.loginSucceed = true
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
