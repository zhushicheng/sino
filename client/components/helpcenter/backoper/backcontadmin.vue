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
        <div class="back-cont-admin">
          <sino-button class="fr" v-if="!btnFlag" type="text" @click="backFun">取消</sino-button>
          <sino-button class="fr" v-if="btnFlag" type="text" @click="submitFun">编辑</sino-button>
          <sino-button class="fr" v-if="!btnFlag" @click="saveFun">保 存</sino-button>
        </div>
        <sino-input type="textarea" class="fl"
                    v-model="contWay"
                    :disabled="backConDis"></sino-input>
      </div>

    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api';
  export default {
    data () {
      return {
        contWay: "",
        backConDis: true,
        btnFlag: true
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
      submitFun () {
        this.backConDis = false;
        this.btnFlag = false;
      },
      tipFun (res) {
        if (res.code === 'CPYY-00001') {
          let _this = this;
          _this.backConDis = true;
          _this.btnFlag = true;
          _this.$message({message: '保存成功！', type: 'success'});
        }
      },
      saveFun () {
        let _this = this;
        api.post(this.apiPath.hrsc.findhelpadmin, {}).then(res => {
          if (res.data === null || res.data === {}) {
            api.post(_this.apiPath.hrsc.addhelpadmin, {contWay: _this.contWay}).then(res => {
              _this.tipFun();
            }).catch(err => {
              console.log(err);
            });
          } else {
            api.post(_this.apiPath.hrsc.updatehelpadmin, {adminId: res.data.adminId, contWay: _this.contWay}).then(res => {
              _this.tipFun();
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      backFun () {
        this.backConDis = true;
        this.btnFlag = true;
        this.searchFun();
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/backAskQues'});
        } else if (order === 'second') {
          this.$router.push({path: '/backLearnData'});
        }
      }
    }
  };
</script>
