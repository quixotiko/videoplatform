<template>
  <router-link :to="{ name: 'videopage', params: {vid: video.data.id} }" tag="div">
    <div class="video-item-container">
        <div class="image-box" :style="styleObject" v-if="video.data.cover.feed">
        </div>
        <div class="description">
          {{video.data.title}}
        </div>
        <div class="info">
          <span class="collectionCount"><span class="icon-heart"></span >&nbsp;{{video.data.consumption.collectionCount}}</span>
          <span class="replyCount"><span class="icon-file-text"></span >&nbsp;{{video.data.consumption.replyCount}}</span>
        </div>
      </div>
    </router-link>
    <!-- 为什么把router-link放在最外面背景图片就能显示？ -->
</template>

<script>
export default {
  props: {
     video:{
       type: Object,
       default: function() {
         return {}
       }
     }
  },
  data () {
    return {
      styleObject: {
        background: `url(${this.video.data.cover.feed}) no-repeat`,
        'background-size': 'cover'
      }
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-item-container {
  margin-top: 6px;
  /* border: 1px solid #A099CD; */
  margin-right: 10px;
  border-radius: 6px;
  width:160px;
  height: 160px;
  /* height: 120px; */
  /* border: 1px solid black; */
  /* flex:1; */
  flex-basis: 160px;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
}
.video-item-container:hover {
  background-color: #E7EBED;
  box-shadow: 4px 4px 5px #565656;
}
.image-box {
  width: 100%;
  /* height: 100px; */
  /* flex: 1; */
  border-radius: 4px;
  flex: 8;
  /* background-size: cover;在这里写没用 */
}
.description {
  /* width:160px; */
  /* height:22px; */
  text-align: center;
  font-size: 16px;
  color: #0A090B;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 2;
}
.info {
  /* height:20px; */
  /* margin-top:18px; */
  border-top: 1px solid #A099CD;
  flex: 1.5;
}
.info .collectionCount, .info .replyCount {
  font-size: 14px;
  display: inline-block;
  padding-right: 20px;
}
.info .collectionCount {
  margin-left: 10px;
}
.icon-youtube:before {
  content: "\ea9d";
  color: #322934;
}
.icon-file-text:before {
  content: "\e922";
  color: #322934;
}
</style>
