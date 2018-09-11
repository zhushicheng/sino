<template>
  <!--主页入口-->
  <div class="main" ref="mainForm" v-if="isLogin">
    <navbar :show="true"></navbar>
    <sidebar :show="true"></sidebar>
    <div class="content" id="content" ref="appMain">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from './index';
  import { mapGetters, mapActions } from 'vuex';
  import api from '../api';
  import apiPath from '../api/path';

  export default {
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    mounted () {
      let _height = window.innerHeight - 50;
      document.getElementById('content').style.height = _height + 'px';
    },
    data () {
      return  {
        isLogin: false
      };
    },
    beforeCreate () {
      api.post(apiPath.author.checkLogin).then(res => {
        if (res.code === 'CPYY-00001') {
          if (res.data) {
            this.isLogin = true;
            setTimeout(function () {
              let _height = window.innerHeight - 70;
              document.getElementById('content').style.height = _height + 'px';
            });
          } else {
            this.$router.push({path: '/login'});
            this.isLogin = false;
          }
        } else {
          this.$router.push({path: '/login'});
          this.isLogin = false;
        }
      });
    },
    beforeMount () {
//      const { body } = document
//      const WIDTH = 768
//      const RATIO = 3
//
//      const handler = () => {
//        if (!document.hidden) {
//          let rect = body.getBoundingClientRect()
//          let isMobile = rect.width - RATIO < WIDTH
//          this.toggleDevice(isMobile ? 'mobile' : 'other')
//          this.toggleSidebar(!isMobile)
//        }
//      }
//
//      document.addEventListener('visibilitychange', handler)
//      window.addEventListener('DOMContentLoaded', handler)
//      window.addEventListener('resize', handler)
    },

    computed: mapGetters({
      sidebar: 'sidebar'
    }),

    methods: mapActions([
      'toggleDevice',
      'toggleSidebar'
    ])
  };
</script>

<style lang="scss">
  @import '../assets/style/base.css';
  @import '../assets/font/iconfont.css';
  .main{width: 100%;min-height: 100%;height: 100%}
  .animated {
    animation-duration: .377s;
  }
  .content {
    margin-top: 0px;
    overflow-y: auto;
    margin-left: 220px;
  }
</style>
