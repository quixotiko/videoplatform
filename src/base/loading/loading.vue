<template>
  <div class="container">
    <div class="loading">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background-color: white;
  margin-bottom: 100px;
}
.loading {
  position: fixed;
  top: 150px;
  left: 450px;
  width: 400px;
  height: 200px;
  background: url('./loading.gif') no-repeat;
}
</style>
