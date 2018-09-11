<template>
  <div>
    <sino-con class="empass-con" v-if="!routerView">
      <img src="../../../assets/img/empbg.png" class="empass-bg"/>
      <sino-title type="levelOne" title="选择业务类型"></sino-title>
      <div class="empass">
        <ul class="empass-ul">
          <li @click="batchClick">
            <div class="empass-div">
              <img src="../../../assets/img/empicon.png" alt="">
              <span>自主业务类型</span>
            </div>
          </li>
          <li @click="busiType">
            <div class="empass-div">
              <img src="../../../assets/img/empicon1.png" alt="">
              <span>受托业务类型</span>
            </div>
          </li>
        </ul>
      </div>
    </sino-con>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        routerView: false
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/empAss") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/empAss") {
          this.routerView = true;
        }
      },
      batchClick () {
        this.routerView = true;
        this.$router.push({path: '/empAss/batchEmpAss'});
      },
      busiType () {
        this.routerView = true;
        this.$router.push({path: '/empAss/entrustedtasklistimp'});
      }
    }
  };
</script>
