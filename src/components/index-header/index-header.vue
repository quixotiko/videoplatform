<template>
    <div class="container">
      <div class="index-wrapper">
        <ul>
            <router-link :to="{ name: 'home', params: {} }" exact tag="li">
              <a href="#"><span class="icon-home"></span><span>首页</span></a>
            </router-link>
            <router-link :to="{ name: 'hot', params: {} }" tag="li">
              <a href="#"><span class="icon-fire"></span><span>热门</span></a>
            </router-link>
            <router-link :to="{ name: 'category', params: {} }" tag="li">
              <a href="#"><span class="icon-list"></span><span>分类</span></a>
            </router-link>
            <router-link :to="{ name: 'movie', params: {} }" tag="li">
              <a href="#"><span class="icon-earth"></span><span>电影</span></a>
            </router-link>
        </ul>
        <div class="search">
          <div>
            <input type="text" name="search" v-model="searchQuery" placeholder="搜索你喜欢的视频" @keyup.enter="search">
            <span class="icon-search"></span>
          </div>
        </div>
        <div class="user-not-login" v-if="!userStatus">
          <div class="login-button" @click="loginPagePopUp">
            <span class="icon-happy">登录</span>
          </div>
          <div class="regis-button" @click="regisPagePopUp">
            <span class="icon-circle-right">注册</span>
          </div>
        </div>
        <div class="user-login" v-if="userStatus">
          <div class="user-avatar">
            <router-link :to="{ name: 'userpage'}">
              <img src="./default-avatar.jpeg" alt="image">
            </router-link>
            <span>{{this.nickName}}，欢迎回来</span>
          </div>
        </div>
        <div class="logout" @click="logout" v-if="userStatus">
          <span>退出</span>
        </div>
        <transition>
          <div class="login-page" v-if="loginPageShow">
            <div class="login-box">
              <form>
                  <div class="user-name">
                    <label for="userName"><span class="icon-happy"></span>用户名</label>
                    <input type="text" name="userName" v-model="un">
                  </div>
                  <div class="password">
                    <label for="psw"><span class="icon-file-text"></span>密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                    <input type="text" name="psw" v-model="psw">
                    <span class="icon-cross" v-if="wrong"></span>
                  </div>
                  <div>
                    <button type="button" name="login" @click="handleLoginClick">登录</button>
                    <button type="button" name="loginPageHide" @click="loginPageHide">游客</button>
                  </div>
              </form>
            </div>
          </div>
        </transition>
        <transition>
          <div class="regis-page" v-if="regisPageShow">
            <div class="regis-box">
              <form>
                  <div class="user-name">
                    <label for="userName"><span class="icon-happy"></span>用户名</label>
                    <input type="text" name="userName" v-model="un">
                  </div>
                  <div class="password">
                    <label for="psw"><span class="icon-file-text"></span>密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                    <input type="text" name="psw" v-model="psw">
                  </div>
                  <div>
                    <button type="button" name="login" @click="handleRegisClick">注册</button>
                    <button type="button" name="loginPageHide" @click="regisPageHide">游客</button>
                  </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      tags:[
        {
          routeName:'home',
          tagName:'首页'
        },
        {
          routeName:'hot',
          tagName:'热门'
        },
        {
          routeName:'category',
          tagName:'分类'
        },
        {
          routeName:'movie',
          tagName:'电影'
        },
      ],
      un: '',
      psw: '',
      loginPageShow: false,
      regisPageShow: false,
      userStatus: false,//是否登录
      nickName: '',
      searchQuery: '',
      wrong: false
    }
  },
  computed: {
    userName() {
      return this.un
    },
    password() {
      return this.psw
    }
  },
  watch: {
    psw() {
      this.wrong = false;
    }
  },
  methods: {
    loginPagePopUp() {
      this.loginPageShow = true
      this.$store.dispatch('home/getBlurred')
    },
    loginPageHide() {
      this.loginPageShow = false
      this.$store.dispatch('home/getClear')
    },
    regisPagePopUp() {
      this.regisPageShow = true
      this.$store.dispatch('home/getBlurred')
    },
    regisPageHide() {
      this.regisPageShow = false
      this.$store.dispatch('home/getClear')
    },
    handleRegisClick() {
      const name = this.userName
      const psw = this.password
      this.regisPageHide()
      this.loginPagePopUp()
      this.$store.dispatch('userdatabase/regisButtonClick',{name, psw})
      this.wrong = false
    },
    handleLoginClick() {
      const name = this.userName
      const psw = this.password
      if(window.localStorage.getItem('userMsg')) {
        this.$store.dispatch('userdatabase/loginButtonClick',{name,psw})
        if(JSON.parse(window.localStorage.getItem('userMsg')).loginSucceed)
        {
          this.loginPageHide()
          this.userStatus = true
          this.nickName = JSON.parse(window.localStorage.getItem('userMsg')).currentUser
        }//这里为什么不能是this.nickName = this.$store.state.userdatabase.currentUse啊啊？
        else {
          this.wrong = true;
        }
      }else{
        this.wrong = true
      }
    },
    logout() {
      let user = JSON.parse(window.localStorage.getItem('userMsg'))
      user.currentUser = ''
      user.loginSucceed = false
      window.localStorage.setItem('userMsg',JSON.stringify(user))
      this.userStatus = false
      this.$store.dispatch('userdatabase/logout')
      // this.$router.push({path: '/'})
    },
    search() {
      // this.$router.push({path: '/search',params: {q: this.searchQuery}}) this.$router.push() 方法中 path不能和params一起使用?什么鬼？
      const q = this.searchQuery
      this.$store.dispatch('search/fetchData',{q})
      this.$router.push({name: 'search',params: {q: this.searchQuery}})
    }
  },
  created() {
    // 没有注册之前不会执行,为了点击导航栏上的不同路由还是能找到当前已经登录的用户
    if(window.localStorage.getItem('userMsg')){
      const user = JSON.parse(window.localStorage.getItem('userMsg'))
      this.userStatus = user.loginSucceed
      this.nickName = user.currentUser
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  min-width: 1080px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  padding-top: 6px;
  width: 100%;
  border-bottom: 1px solid #C3D0DB;
  margin-bottom: 10px;
  background: url('./zwartevilt.png') repeat-x;
}
.index-wrapper {
  max-width: 1108px;
  margin:auto;
  display: flex;
}
ul {
  width:400px;
  height: 44px;
  float: left;
  padding-bottom: 6px;
  display: flex;
  text-align: center;
}
ul li {
  margin-top: 10px;
  display: block;
  flex: 1;
  position: relative;
}
ul li:before {
  content: '';
  height: 2px;
  width: 0;
  display: block;
  position: absolute;
  bottom: -2px;
  right: 50%;
  background-color: white;
  transition: all 0.6s ease 0s;
}
ul li:after {
  content: '';
  height: 2px;
  width: 0;
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  background-color: white;
  transition: all 0.6s ease 0s;
}
ul li:hover:after {
  width: 44%;
}
ul li:hover:before {
  width: 44%;
}
ul li.router-link-active:hover:after {
  background-color: red;
}
ul li.router-link-active:hover:before {
  background-color: red;
}
ul li.router-link-active span{
  color: #FF5230;
}
a {
  color: white;
  text-decoration: none;
}
ul span {
  margin-right: 10px;
}
span {
  color: white;
}
.search {
  flex: 1;
  padding-bottom: 6px;
  margin-left: 20px;
}
.search input {
  margin-top: 6px;
  padding-left: 10px;
  width: 200px;
  height: 32px;
  border-radius: 8px;
  outline: none;
}
.search input:focus::-webkit-input-placeholder {
color: transparent;
}
.search span {
  vertical-align: middle;
  display: inline-block;
  color: white;
}
.user-login {
  flex: 0.5;
  width: 200px;
  align-items: center;
}
.use-not-login {
  flex: 0.5;
  align-items: center;
}
.user-not-login div {
  display: inline-block;
  margin-top: 6px;
  margin-right: 8px;
  margin-bottom: 6px;
  padding: 4px;
}
.user-avatar{
  width: 300px;
  height: 100%;
  display: inline-block;
  padding-top: 2px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 18px;
}
.user-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #645268;
}
.user-avatar img:hover {
  box-shadow: 0 0 8px #645268;
}
.user-not-login .icon-happy:before {
  content: "\e9df";
  font-size: 30px;
  vertical-align: middle;
  padding-right: 8px;
  color: white;
}
.user-not-login .icon-circle-right:before {
  content: "\ea42";
  font-size: 30px;
  vertical-align: middle;
  padding-right: 8px;
  color: white;
}
.user-not-login div:hover {
  border-radius: 6px;
  box-shadow: 0 0 10px white;
}
.login-page {
  position: fixed;
  width: 100vw;
  height:100vh;
  top: 0;
  left: 0;
  z-index: 500;
  background-color: rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  position: absolute;
  margin: auto;
  width: 600px;
  height: 300px;
  border: 1px solid black;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
  background: url('./zwartevilt.png') repeat;
}
.regis-page {
  position: fixed;
  width: 100vw;
  height:100vh;
  top: 0;
  left: 0;
  z-index: 500;
  background-color: rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.regis-box {
  position: absolute;
  margin: auto;
  width: 600px;
  height: 300px;
  border: 1px solid black;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
  background: url('./zwartevilt.png') repeat;
}
.v-enter-active, .v-leave-active {
  transition: all 0.5s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: scale(0.1);
}
form div {
  margin-left: 10%;
}
form div:first-child {
  padding-top: 70px;
  padding-bottom: 90px;
  height: 130px;
}
form div:last-child {
  margin-top: 30px;
  height: 50px;
  margin-left: 40px;
}
form button {
  display: inline-block;
  width: 100px;
  height: 36px;
  margin-left: 120px;
  border-radius: 10px;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 20px;
}
form button:focus {
  outline: none;
}
form button:hover {
  background-color: rgba(255,255,255,1);
}
form label {
  margin-right: 10px;
  font-size: 24px;
  color: white;
}
form label span {
  padding-right: 10px;
}
form input {
  width: 300px;
  height: 36px;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  outline: none;
}
.logout {
  margin: 10px;
  padding: 4px;
  font-size: 18px;
  border-radius: 20px;
  box-shadow: 0 0 8px #799CB7;
}
.logout:hover {
  background-color: #A6C9E4;
}
.login-box .icon-cross:before {
  content: "\ea0f";
  color: red;
}
</style>
