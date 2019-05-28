<template>
  <div class="container" v-if="loginSucceed">
    <span><span class="icon-circle-right"></span>我的收藏夹</span>
    <div class="video-area">
      <div class="menu">
        <ul>
          <li v-for="item in category" :class="{active: item === categoryName}" @click="selectCategory(item)" >{{item}}</li>
        </ul>
      </div>
      <div class="video-container">
        <video-list v-for="item in videoLiked" :video="item" :key="item.id"></video-list>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from '../../base/video-list/video-list'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      likeVideo: [],
      loginSucceed: false,
      categoryName: '全部'
    }
  },
  components:{
    VideoList
  },
  computed: {
    ...mapGetters('userpage',{
      videoLiked: 'likevideos',
      category: 'videoCatogery'
    })
  },
  methods: {
    fetchData() {
      const likeVideo = this.likeVideo
      const likeVideoObject = {
        likeVideo
      }
      this.$store.dispatch('userpage/fetchData',{likeVideoObject})
    },
    selectCategory(category) {
      this.categoryName = category
      this.$store.dispatch('userpage/select',{category})
    }
  },
  created() {
    const loginSucceed =  JSON.parse(window.localStorage.getItem('userMsg')).loginSucceed
    this.loginSucceed = loginSucceed
    const name = JSON.parse(window.localStorage.getItem('userMsg')).currentUser
    const user = JSON.parse(window.localStorage.getItem('userMsg')).userList
    user.map(item => {
      if(item.name === name)
      {
        this.likeVideo = item.likeVideo
      }
    })
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 80%;
  min-width: 1080px;
  margin: auto;
  margin: auto;
  background-color: rgba(255,255,255,.5);
  padding-left: 40px;
  padding-top: 20px;
  padding-bottom: 40px;
  margin-bottom: 40vh;
}
.container span:first-child {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 10px;
  vertical-align: baseline;
  font-size: 24px;
  color: #364652;
  font-family: cursive;
}
.video-area {
  display: flex;
  flex-flow: nowrap;
}
.menu {
  flex: 1;
}
.menu ul {
  margin-top: 10px;
}
.menu li {
  font-size: 18px;
  list-style: none;
  padding: 6px;
}
.menu li.active {
  color: white;
  background-color: black;
  border-radius: 8px;
}
.menu li:hover {
  color: white;
  background-color: black;
  border-radius: 8px;
}
.video-container {
  flex: 10;
  display: flex;
  flex-flow: wrap;
}
</style>
