<template>
  <div class="home-container" :style="styleObject">
    <div class="home-header">
      <div class="slider">
        <Slider :videoForSlider="vfs"></Slider>
      </div>
      <div class="home-header-video-list">
        <div class="row1">
          <video-item  v-for="(item,index) in vft_1.videoList" :video="item" :key="item.data.id"></video-item>
        </div>
        <div class="row2">
          <video-item  v-for="(item,index) in vft_2.videoList" :video="item" :key="item.data.id"></video-item>
        </div>
      </div>
    </div>
    <div class="tags">
      <span v-for="tag in tags" @click="fetchTagVideo(tag.actionUrl)">{{tag.name}}</span>
    </div>
    <div class="video-for-tag-wrapper">
      <transition-group tag="div" class="video-for-tag" name="slide">
        <video-item v-for="item in tagVideo" :video="item" :key="item.data.id" class="slide-move"></video-item>
      </transition-group>
    </div>
    <div class="divider" v-if="!homeIsLoading">
      <span class="icon-list"><span>视频合集</span></span>
    </div>
    <div class="home-body-one" v-if="vcwc.videoList">
      <div class="video-list" v-if="vcwc.videoList">
        <video-item v-for="(item,index) in vcwc.videoList[0].data.itemList" :video="item" :key="item.data.id"></video-item>
      </div>
      <div class="video-list-cover">
        <video-cover :vcwc="vcwc.videoList"></video-cover>
      </div>
    </div>
    <div class="home-body-two" v-if="vcwc.videoList2">
      <div class="video-list-cover">
        <video-cover :vcwc="vcwc.videoList2"></video-cover>
      </div>
      <div class="video-list">
        <video-item v-for="(item,index) in vcwc.videoList2[0].data.itemList" :video="item" :key="item.data.id"></video-item>
      </div>
    </div>
    <div class="video-follow">
      <span class="icon-list" v-if="!homeIsLoading"><span>编辑精选</span></span>
      <div class="video-follow-container" v-if="vcof.videoList">
        <icon-list :iconList="vcof.videoList[0].data.header.iconList"></icon-list>
      </div>
      <transition-group tag="div" class="video-follow-list" v-if="vcof.videoList">
        <video-item v-for="item in vcof.videoList[0].data.itemList" :video="item" :key="item.data.id"></video-item>
        <component :is="videoItemComponent" v-for="item in vfh.videoList2" :video="item" :key="item.data.id"></component>
      </transition-group>
      <div class="more" @click="handleGetMore" v-if="!homeIsLoading">
        get more
      </div>
    </div>
    <loading v-if="homeIsLoading"></loading>
  </div>
</template>

<script>
import axios from 'axios'
import Slider from '../../base/slider/slider'
import VideoList from '../../base/video-list/video-list'
import VideoItem from '../../base/video-item/video-item'
import VideoCover from '../../base/video-cover/video-cover'
import IconList from '../../base/icon-list/icon-list'
import Loading from '../../base/loading/loading'
import {mapGetters} from 'vuex'


export default {
  name: 'home',
  components: {
    Slider,
    VideoList,
    VideoItem,
    VideoCover,
    IconList,
    Loading
  },
  data () {
    return {
      content:'',
      videoItemComponent: 'VideoItem'
    }
  },
  computed: {
    // videoForSlider() {
    //   return this.$store.state.home.vForSlider
    // }这个直接获取state的值先放着
    //分模块之后mapGetters要提供第一个模块名的参数！！！！
    ...mapGetters('home',{
      vfs: 'videoForSlider',
      vfh: 'videoForHome',
      vcof: 'videoCollectionOfFollow',
      vcwc: 'videoCollectionWithCover',
      vft_1: 'videoForToday_1',
      vft_2: 'videoForToday_2',
      homeIsLoading: 'homeIsLoading',
      tags: 'videoTags',
      tagVideo: 'vTagVideo'
    }),
    styleObject() {
      return this.$store.state.home.styleObject
    }
  },
  methods: {
    fetchdataForHome() {
      this.$store.dispatch('home/getVideoForHome')
    },
    handleGetMore() {
      this.$store.dispatch('home/handleGetMore')
    },
    fetchTagVideo(actionUrl) {
      this.$store.dispatch('home/fetchTagVideo',{actionUrl})
    }
  },
  created() {
    this.fetchdataForHome()
    this.fetchTagVideo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
  max-width: 1080px;
  min-width: 1080px;
  margin: auto;
  position: relative;
  /* border:1px solid black; */
}
.home-header {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  margin-bottom: 30px;
}
.slider {
  height:325px;
  width: 550px;
  flex: 1;
  justify-content: space-around;
  display: flex;
  padding: 10px;
  padding-bottom: 16px;
}
.home-header-video-list {
  height: 300px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}
.row1,.row2 {
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.tags{
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  padding-left: 10px;
}
.tags span {
  font-size: 16px;
  display: inline-block;
  margin: 2px 8px;
  padding: 6px;
  color: black;
  border: 2px solid #1B2329;
  border-radius: 6px;
}
.tags span:hover {
  background-color: #1B2329;
  color: white;
}
.video-for-tag-wrapper {
  position: relative;
  height: 350px;
  overflow: hidden;
}
.video-for-tag {
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  margin-left: 20px;
  margin-top: 20px;
  position: absolute;
}
.slide-enter {
  /* opacity: 0; */
  transform: translateX(-1080px);
}
.slide-leave-to {
  /* opacity: 0; */
  transform: translateX(1080px);
}
.slide-leave-active {
  transition: all 0.8s;
}
.slide-enter-active {
  transition: all 2s;
}

.divider {
  height: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 30px;
  font-size: 18px;
}
.divider span span {
  display: inline-block;
  padding-left: 10px;
  vertical-align: top;
}
.home-body-one {
  display: flex;
  padding-left: 20px;
  align-items: center;
  margin-bottom: 26px;
}
.home-body-two {
  display: flex;
  padding-right: 20px;
  align-items: center;
}
.home-body-one .video-list-cover, .home-body-two .video-list-cover {
  flex: 1;
  margin: 20px;
  height: 332px;
  display: flex;
  align-items: center;
}
.home-body-one .video-list {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home-body-two .video-list {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.video-follow-container {
  display: flex;
}
.video-follow {
  margin-top: 20px;
  padding-left: 20px;
  font-size: 24px;
}
.video-follow span {
  padding-left: 10px;
  font-size: 18px;
}
.video-follow-list {
  margin-top: 20px;
  /* height:160px; */
  display: flex;
  flex-wrap: wrap;
}
.more {
  margin-top: 10px;
  padding: 6px;
  text-align: center;
  border: 1px solid #1B2329;
  border-radius: 6px;
  background-color: #29343D;
  color: white;
}
.more:hover {
  box-shadow: 2px 2px 6px #29343D;
}
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: scale(0.1);
}
</style>
