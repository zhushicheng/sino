<template>
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">常见问题</div>
          <div class="sino-tabs-item" @click="prodScheFun('second')">学习资料</div>
          <div class="sino-tabs-item" @click="prodScheFun('third')">联系管理员</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="askQuesForm" ref="askQuesForm" class="serch-form leads-serch-form ask-ques">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">问题：</span>
              <sino-input v-model="askQuesForm.questionDesc"></sino-input>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <ul class="ask-ques-ul">
        <li v-for="list in proAskList">
          <div class="ask-ques-q"><i class="i-q"></i><h6>{{list.questionDesc}}</h6></div>
          <div class="ask-ques-a"><i class="i-a"></i><p>{{list.solveDesc}}</p>
            <sino-button type="icon-text" class="fl" v-if="btnFlag">
              <i class="iconfont sino-shuangjiantou-copy"></i>
              <span>查看更多</span>
            </sino-button>
          </div>
        </li>
      </ul>
      <sino-page v-bind:page="pageNum"
                 v-bind:page-size="pageSize"
                 v-on:pagehandler="pageHandler"
                 :pageArray="pageArray"
                 v-on:choosePageFun="choooseNum"
                 v-bind:object="object"
                 :total="total"></sino-page>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api';
  export default {
    data () {
      return {
        askQuesForm: {
          questionDesc: ''
        },
        object: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        total: null,
        pageSize: 5,
        pageArray: [10, 20, 30, 40],
        btnFlag: false,
        proAskList: []
      };
    },
    created () {
      this.searchFun();
    },
    methods: {
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'second') {
          this.$router.push({path: '/proLearnData'});
        } else if (order === 'third') {
          this.$router.push({path: '/proContAdmin'});
        }
      },
      viewAll (pageNum, pageSize) {
        this.askQuesForm.isEffect = 1;
        let _data = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.askQuesForm
        };
        api.post(this.apiPath.hrsc.findallquestion, _data).then(res => {
          this.proAskList = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      }
    }
  };
</script>
