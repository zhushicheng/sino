<template>
  <!--面包屑-->
  <nav class="level app-levelbar">
    <div class="level-right is-hidden-mobile">
      <sino-breadcrumb separator=">">
        <i class="iconfont sino-dingwei" v-if="list && list.length > 0"></i>
        <sino-breadcrumb-item v-for="(item, index) in list" :key="index">
          <router-link v-if='(item.redirect === "noredirect" || index == list.length - 1) && item.name !== "首页"' to="" class="no-redirect">{{item.name}}</router-link>
          <router-link v-else-if='item.name === "首页"' to="/main" class="no-redirect">{{item.name}}</router-link>
          <router-link v-else :to="item.path">{{item.name}}</router-link>
        </sino-breadcrumb-item>
      </sino-breadcrumb>
    </div>
  </nav>
</template>

<script>
export default {

  data () {
    return {
      list: null
    };
  },

  created () {
    this.getList();
  },

  computed: {
    name () {
      return this.$route.name;
    }
  },

  methods: {
    getList () {
      let matched = this.$route.matched.filter(item => item.name);
      if (matched[1].name === '首页') {
        this.list = [];
        return;
      }
      let first = matched[0];
      if (first && first.name !== '首页') {
        matched = [{ name: '首页', path: '/main' }].concat(matched);
      }
      this.list = matched;
    }
  },

  watch: {
    $route () {
      this.getList();
    }
  }
};
</script>

<style>
  .breadcrumb{justify-content:flex-start !important;}
  .level{width:100%;overflow: hidden;}
  .level .sino-breadcrumb .sino-dingwei{color: #989796;margin-right: 10px;font-size: 15px;float: left}
  .sino-breadcrumb__item{margin-bottom: 10px;}
</style>
