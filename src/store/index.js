import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters';
import home from './modules/home'
import videopage from './modules/videopage'
import userdatabase from './modules/userdatabase'
import userpage from './modules/userpage'
import search from './modules/search'
import hot from './modules/hot'
import category from './modules/category'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    home,
    videopage,
    userdatabase,
    userpage,
    search,
    hot,
    category
  },
  strict: debug,
})
export default store
