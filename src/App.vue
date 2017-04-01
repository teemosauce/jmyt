<template>
  <div id="app">
    <transition name="fade" model="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;
    font-family:  Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    //border:1px solid #dfe6ec;
    margin: 10px 0px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
