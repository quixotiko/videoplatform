<template>
  <div class="video-page-container">
    <div class="video-area">
      <div class="video-play-area">
        <div class="video-title">
          {{videoTitle}}
          <span v-for="item in videoTags">#{{item.name}}</span>
        </div>
        <div class="video-box" v-if="videoPlayInfo">
          <video :src="videoPlayInfo[0].urlList[0].url" controls>
          </video>
        </div>
        <div class="video-info">
          <div class="video-info-row1">
            <div class="user">
              <div class="user-avatar">
                <img :src="videoAuthor.icon" alt="image">
              </div>
              <div class="user-info">
                <span>{{videoAuthor.name}}<span class="icon-happy" id="happy"></span></span>
                <span>/*{{videoAuthor.description}}*/</span>
              </div>
            </div>
            <div class="consumption">
              <span class="icon-heart" @click="collectionCountUp" :class="{liked: this.videoLiked}">&nbsp;{{videoCollectionCount + (this.videoLiked ? 1 : 0)}}</span>
              <span class="icon-file-text">&nbsp;{{videoReplyCount}}</span>
            </div>
          </div>
          <div class="video-info-row2">
            <p>{{videoDescription}}</p>
          </div>
        </div>
      </div>
      <div class="video-reply-area">
        <div class="comment">
          <form>
            <textarea name="comment" rows="4" cols="80" :placeholder="!loginOK ? '你还没有登录...' : '你的评论'" v-model="reply" :disabled="!loginOK"></textarea>
            <button type="button" name="button" @click="handleReply">发表评论</button>
          </form>
        </div>
        <!-- <reply-item v-for="item in videoReplies.replyList" :reply="item" :key="item.id"></reply-item> -->
        <transition-group>
          <component :is="replyComponent" v-for="item in videoReplies.replyList" :reply="item" :key="item.id" class="v-item"></component>
        </transition-group>
      </div>
    </div>
    <div class="relatedvideo-area">
      <video-list v-for="item in videoRelated.videoList" :video="item" :key="item.id"></video-list>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VideoList from '../../base/video-list/video-list'
import ReplyItem from '../../base/reply-item/reply-item'


export default {
  data () {
    return {
      reply: '',
      replyComponent: 'ReplyItem',
      replyCount: 0
    }
  },
  components: {
    VideoList,
    ReplyItem
  },
  computed: {
    ...mapGetters('videopage',{
      videoTitle: 'vtitle',
      videoDescription: 'vdescription',
      videoTags: 'vtags',
      videoCollectionCount: 'vcollectionCount',
      videoReplyCount: 'vreplyCount',
      videoAuthor: 'vauthor',
      videoDuration: 'vduration',
      videoPlayInfo: 'vplayInfo',
      videoRelated: 'vrelatedVideo',
      videoReplies: 'vreplies',
    }),
    ...mapGetters('userdatabase',{
      videoLiked: 'vVideoLiked',
      loginOK: 'vloginOK'
    })
  },
  watch: {
    '$route'() {
      this.fetchDataForVideoPage()
      this.checkIfLiked()
      window.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
      })
    }
  },
  methods: {
    fetchDataForVideoPage() {
      const id = this.$route.params.vid//传进来的视频id
      if(!id)
      {
        this.$router.go('/')
      }
      this.$store.dispatch('videopage/getVideoInfo',{ id })
      this.$store.dispatch('videopage/getVideoReplies',{ id })
      this.$store.dispatch('videopage/getRelatedVideo',{ id })
    },
    collectionCountUp() {
      if(this.loginOK){
        const id = this.$route.params.vid
        if(!this.videoLiked){
          // this.$store.dispatch('videopage/cCountUp')
          this.$store.dispatch('userdatabase/like',{id})
        }
        else{
          // this.$store.dispatch('videopage/cCountDown')
          this.vidioLiked = false//为了让收藏数回复正常值
          this.$store.dispatch('userdatabase/dislike',{id})
        }
      }else{
        alert("请先登录！");
      }
    },
    checkIfLiked() {
      const id = this.$route.params.vid
      this.$store.dispatch('userdatabase/check',{id})
    },
    handleReply() {
      if(this.loginOK){
        const name = JSON.parse(window.localStorage.getItem('userMsg')).currentUser
        const reply = this.reply
        const imageUrl = require("../index-header/default-avatar.jpeg")
        let user = {
                // id: 111111111111111,id应该为不同的值，transition-group才能正常应用动画
                id: this.replyCount,
                message: reply,
                user: {
                  nickname: name,
                  avatar: imageUrl
                },
                likeCount: 0,
            }
        this.reply = ''
        this.replyCount += 1;
        this.$store.dispatch('videopage/addReply',{user})
      }else{
        alert("请先登录！");
      }
    },
    checkIfLogin() {
      const user = JSON.parse(window.localStorage.getItem('userMsg'))
      if(user.loginSucceed){
        this.$store.dispatch('userdatabase/logined')
      }
    }
  },
  created() {
    this.fetchDataForVideoPage()
    this.checkIfLiked()
    this.checkIfLogin()//判断是否已经登录
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-page-container {
  max-width: 1080px;
  min-width: 1080px;
  margin: auto;
  margin: auto;
  display: flex;
}
.video-area {
  display: flex;
  flex: 3;
  flex-flow: column;
}
.relatedvideo-area {
  flex: 1;
}
.video-title {
  font-size: 24px;
  padding-left: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.video-title span:first-child {
  margin-left: 2%;
}
.video-title span {
  font-size: 16px;
  margin-left: 10px;
  color: #364652;
}
.video-box {
  margin:20px;
  margin-left: 30px;
}
.video-info {
  display: flex;
  flex-flow: column;
  margin-left: 30px;
}
.video-info-row1 {
  flex: 1;
  display: flex;
}
.video-info-row2 {
  flex: 4;
  margin-top: 10px;
  width: 90%;
  font-size: 18px;
}
.user {
  display: flex;
  flex:1;
}
.consumption {
  display: flex;
  flex:1;
}
.user-avatar {
  flex: 1;
  margin-right: 16px;
}
.user-avatar img {
  width: 80px;
  height: 80px;
  border: 1px solid #364652;
  border-radius: 4px;
}
.user-info {
  flex: 4;
  padding-top: 4px;
}
.user-info span {
  /* margin-top: 8px; */
  display: block;
}
.user-info span:first-child {
  font-size: 20px;
  margin-bottom: 6px;
}
.video-box video {
  width:712px;
  height: 400px;
  overflow: hidden;
}
.icon-happy:before,#happy {
  content: "\e9df";
  display: inline-block;
  color: #1E1920;
}
.consumption span {
  margin-left: 20%;
  text-align: center;
  font-size: 20px;
}
.consumption span.icon-heart:hover {
  color: red;
}
span.liked {
  color: red;
}
.relatedvideo-area {
  padding-top: 60px;
}
.video-reply-area {
  margin-top: 20px;
  display: flex;
  flex-flow: column;
}
.comment form {
  padding-left: 30px;
  margin-bottom: 20px;
}
textarea {
  padding: 10px;
  font-size: 16px;
}
button {
  padding: 8px;
  border-radius: 6px;
  outline: none;
  color: white;
  background-color: black;
}
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.v-item {
  transition: all 1s;
}
</style>
