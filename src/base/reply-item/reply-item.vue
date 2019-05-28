<template>
    <div class="reply-container">
      <div class="avatar">
        <img :src="reply.user.avatar" alt="image">
      </div>
      <div class="user-info">
        <div class="user-name">
          <span>
            {{reply.user.nickname}}
          </span>
        </div>
        <div class="massage">
          <div>
            {{reply.message}}
          </div>
          <div class="like-count">
            <span class="icon-heart"></span>
            {{reply.likeCount}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
     reply:{
       type: Object,
       default: function() {
         return {}
       }
     }
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reply-container {
  flex: 1;
  width: 750px;
  margin-left: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #799CB7;
}
.avatar {
  width: 60px;
}
.user-info {
  flex:1;
  display: flex;
  flex-flow: column;
  padding: 6px;
  margin-left: 10px;
  height: 100%;
  overflow: auto;
}
.user-info .user-name {
  margin-bottom: 10px;
}
.user-info .massage {
  margin-bottom: 20px;
  display: flex;
}
.user-info .massage div:first-child {
  flex: 12;
}
.user-info .massage .like-count {
  flex: 1;
}
.user-name {
  width: 200px;
}
.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #364652;
  vertical-align: top;
}

</style>
