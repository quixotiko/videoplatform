import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Hot from '../components/hot/hot'
import Category from '../components/category/category'
import Movie from '../components/movie/movie'
import VideoPage from '../components/video-page/video-page'
import UserPage from '../components/user-page/user-page'
import SearchPage from '../components/search-page/search-page'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'home',
      path:'/',
      component:Home
    },
    {
      name:'hot',
      path:'/hot',
      component:Hot
    },
    {
      name:'category',
      path:'/category',
      component:Category
    },
    {
      name:'movie',
      path:'/movie',
      component:Movie
    },
    {
      name: 'videopage',
      path: '/videopage/:vid',
      component: VideoPage
    },
    {
      name: 'userpage',
      path: '/userpage',
      component: UserPage
    },
    {
      name: 'search',
      path: '/search/:q',
      component: SearchPage
    }
  ]
})
