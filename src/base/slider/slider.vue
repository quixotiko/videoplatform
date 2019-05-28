<template>
  <div class="container" v-if="videoForSlider.videoList">
    <router-link :to="{ name: 'videopage', params: {vid: videoForSlider.videoList[sliderOnIndex].data.id} }">
      <transition-group tag="div">
          <img v-for="(item,index) in videoForSlider.videoList" v-if="index === sliderOnIndex" :key="item.data.id" :src="item.data.cover.feed" alt="imageForSlider" @mouseover="stopSlider" @mouseleave="sliderLoop">
          <div class="desciption" v-for="(item,index) in videoForSlider.videoList" v-if="index === sliderOnIndex" :key="item.id">
            <div class="title-slogan">
              <span class="title">{{item.data.title}}</span>
              <span class="slogan">{{item.data.slogan}}</span>
            </div>
            <span class="tag">#{{item.data.category}}</span>
          </div>
      </transition-group>
    </router-link>
    <div class="dots">
      <span :class="classObjectOne" @click="sliderOnIndex = 0,dotOnIndex = 0"></span>
      <span :class="classObjectTwo" @click="sliderOnIndex = 1,dotOnIndex = 1"></span>
      <span :class="classObjectThree" @click="sliderOnIndex = 2, dotOnIndex = 2"></span>
      <span :class="classObjectFour" @click="sliderOnIndex = 3,dotOnIndex = 3"></span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    videoForSlider:{
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data () {
    return {
      sliderOnIndex: 0,
      stop: null,
      dotOnIndex:0
    }
  },
  computed: {
    classObjectOne() {
      return {
        'icon-circle-right': 0 !== this.dotOnIndex,
        'icon-happy': 0 === this.dotOnIndex
      }
    },
    classObjectTwo() {
      return {
        'icon-circle-right': 1 !== this.dotOnIndex,
        'icon-happy': 1 === this.dotOnIndex
      }
    },
    classObjectThree() {
      return {
        'icon-circle-right': 2 !== this.dotOnIndex,
        'icon-happy': 2 === this.dotOnIndex
      }
    },
    classObjectFour() {
      return {
        'icon-circle-right': 3 !== this.dotOnIndex,
        'icon-happy': 3 === this.dotOnIndex
      }
    },
  },
  methods:{
    // nextVideoRight () {
    //   if(this.sliderOnIndex < 3)
    //   {
    //     this.videoForSlider.videoList[this.sliderOnIndex].show = false;
    //     this.sliderOnIndex++;
    //     this.videoForSlider.videoList[this.sliderOnIndex].show = true;
    //   }
    //   else
    //   {
    //     this.videoForSlider.videoList[this.sliderOnIndex].show = false;
    //     this.sliderOnIndex = 0;
    //     this.videoForSlider.videoList[this.sliderOnIndex].show = true;
    //   }
    nextSlider() {
      this.sliderOnIndex++
      this.dotOnIndex++
      if(this.sliderOnIndex === this.videoForSlider.videoList.length)
      {
        this.sliderOnIndex = 0
        this.dotOnIndex = 0
      }
    },
    sliderLoop() {
      this.stop = setInterval(this.nextSlider,6000)
    },
    stopSlider() {
      clearInterval(this.stop)
    }
  },
  mounted: function() {
    this.sliderLoop();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height:100%;
  width:100%;
  overflow: hidden;
  position: relative; /*添加了这个和img的position:absolute之后轮播图的空白问题解决了为什么？*/
  margin: 4px;
  border-radius: 4px;
  border: 1px solid #8E98A0;
  box-shadow: 2px 2px 2px #8E98A0;
}
img {
  width: 100%;
  height: 100%;
  position: absolute;
}
.desciption {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
  width:100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
}
.desciption .title-slogan, .desciption {
  display: block;
  float: right;
}
.title-slogan {
  margin:4px;
  margin-right: 20px;
  padding-bottom: 4px;
}
.title-slogan span {
  display: block;
}
.title {
  font-size: 20px;
  color: #BAC1C7;
  margin-bottom: 2px;
}
.slogan {
  font-size: 16px;
  text-align: center;
  padding-top: 4px;
  color: #A9B2B9;
}
.tag {
  color: #C4DBED;
  display: block;
  float: left;
  margin-top: 20px;
  margin-left: 50px;
  font-size: 20px;
  color: white;
}
.dots {
  position: absolute;
  padding-top: 6px;
  padding-bottom: 4px;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 300;
  background: linear-gradient(rgba(0,0,0,.5),rgba(255,255,255,.1))
}
.dots span {
  font-size: 24px;
  padding: 10px;
}
.icon-happy:before {
  content: "\e9df";
  color: white;
}
.icon-circle-right:before {
  content: "\ea42";
  color: #BAC1C7;
}
.v-enter-active,.v-leave-active {
  transition: all 1s
}
.v-enter{
  opacity: 0;
  transform: translate(-400px);
}
.v-leave-to{
  opacity: 0;
  transform: translate(400px);
}

</style>
