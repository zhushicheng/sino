<template>
  <div id="app">
    <sino-msg-exchange></sino-msg-exchange>
    <nprogress-container v-show="flag"></nprogress-container>
    <router-view></router-view>
  </div>
</template>
<script>
import SinoMsgExchange from './msgexchange/SinoMsgExchange';
import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
import { Frame } from './framework/index.js';
export default {
  components: {
    Frame,
    SinoMsgExchange,
    NprogressContainer
  },
  data () {
    return {
      flag: true
    };
  },
  watch: {
    $route: {
      handler: function (val) {
        if (val.path === "/login") {
          this.flag = false;
        } else {
          this.flag = true;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
@import 'assets/style/base.css';
@import 'assets/style/public.css';
@import 'assets/font/iconfont.css';
.animated {
  animation-duration: .377s;
}
</style>
