<template>
  <!--左侧内容区域-->
  <section class="app-main" id="appMain">
    <levelbar></levelbar>
    <transition
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class=""
      appear>
      <router-view class="animated"></router-view>
    </transition>
  </section>
</template>

<script>
  import Levelbar from './Levelbar.vue';

  export default {
    components: {
      Levelbar
    },
    data () {
      return {};
    }
  };
</script>

<style lang="scss">
  @import "../assets/font/iconfont.css";
  @import "../assets/style/layout.css";
  @import "../assets/style/menu.css";

  .app-main {
    /*margin-left: 219px;*/
    padding: 15px;
    transition: all 0.15s;
  }
</style>
