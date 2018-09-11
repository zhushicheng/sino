<template>
  <!--联系管理员-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('first')">常见问题</div>
          <div class="sino-tabs-item" @click="prodScheFun('second')">学习资料</div>
          <div class="sino-tabs-item is-active">联系管理员</div>
        </div>
      </div>
    </div>
    <sino-con>
      <div class="back-cont">
        <sino-input type="textarea" v-model="contWay" :disabled="true"></sino-input>
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api';
  export default {
    data () {
      return {
        contWay: ''
      };
    },
    mounted () {
      this.searchFun();
    },
    methods: {
      searchFun () {
        api.post(this.apiPath.hrsc.findhelpadmin, {}).then(res => {
          this.contWay = res.data.contWay;
        }).catch(err => {
          console.log(err);
        });
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/proAskQues'});
        } else if (order === 'second') {
          this.$router.push({path: '/proLearnData'});
        }
      }
    }
  };
</script>
