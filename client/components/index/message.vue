<template>
  <!--公告-->
  <div class="invinfo">
    <sino-con>
      <sino-title type="levelOne" title="系统消息查询"></sino-title>
      <div class="notice-tab">
        <div class="" :class="{'index-bottom-active-tab': !activeTab}" @click="activeTabFun(false)">
          未读消息
        </div>
        <div :class="{'index-bottom-active-tab': activeTab}" @click="activeTabFun(true)">
          全部消息
        </div>
      </div>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <ul class="search-inner-box notice-search-box">
          <li>
            <span class="fl">发送人：</span>
            <sino-select class="fl message-select-box"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :chooseName.sync="searchForm.sendPerName"
                         :chooseId.sync="searchForm.sendPerId"
                         :clear="true"
                         :token="token"
                         :url="apiPath.author.findUserSelectBoxInfo"
                         :data="{code:'USER_TYPE'}"></sino-select>
          </li>
          <li class="second-li-notice">
            <span class="fl">消息内容：</span>
            <sino-input class="fl" v-model="searchForm.messContent"></sino-input>
          </li>
          <sino-button type="primary" @click="searchFun">查 询</sino-button>
        </ul>
        <div class="clear"></div>
      </sino-form>
      <div class="emp-link-card-title title-border-none tit-flex notice-detail-list" v-for="item in queryData" :key="item">
        <div class="title-right fl">
          <span class="color-world fl"><i class="title-line"></i></span>
          <span class="fl">{{item.messContent}}</span>
        </div>
        <div class="fr">
          <sino-button class="fr" type="icon-text" @click="ignoreFun(item)" :class="{'ignore-button': item.state === 2}">标记已读</sino-button>
          <i class="splite-line fr">|</i>
          <span class="notice-time fr">{{item.sendTime}}</span>
          <span class="notice-state fr" v-if="activeTab ">{{item.state===1?'未读':'已读'}}</span>
          <span class="publish-box fr"><i>发布人：</i>{{item.sendPerName}}</span>
        </div>
      </div>
      <sino-page
        class="page-style"
        v-bind:page="dataPage.pageNum"
        v-bind:page-size="dataPage.pageSize"
        v-on:pagehandler="pageHandlerB"
        :pageArray="dataPage.pageArray"
        v-on:choosePageFun="choooseNumB"
        v-bind:object="object"
        :total="dataPage.total">
      </sino-page>
      <div class="clear"></div>
    </sino-con>
  </div>
</template>

<script>
  import api from '../../api';
  import Cookie from 'js-cookie';

  export default {
    data () {
      return {
        activeTab: false,
        searchForm: {
          sendPerName: '',
          sendPerId: '',
          messContent: ''
        },
        token: Cookie.get('Token'),
        queryData: [],
        dataPage: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null
        },
        // 数据配置
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        noticeFlag: false,
        noticeDetail: {}
      };
    },
    mounted () {
      this.getList(this.dataPage.pageNum, this.dataPage.pageSize);
    },
    methods: {
      getList (pageNum, pageSize) {
        let obj = {
          data: JSON.parse(JSON.stringify(this.searchForm)),
          pageNum: pageNum,
          pageSize: pageSize
        };
        obj.data.state = this.activeTab ? '' : 1;
        obj.data.homePage = 1;
        api.post(this.apiPath.hrsc.findSysMessList, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.dataPage.total = res.data.total;
            this.queryData = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      layerClose () {
        this.getList(this.dataPage.pageNum, this.dataPage.pageSize);
      },
      activeTabFun (bool) {
        this.activeTab = bool;
        this.searchFun();
      },
      searchFun () {
        this.dataPage.pageNum = 1;
        this.getList(this.dataPage.pageNum, this.dataPage.pageSize);
      },
      pageHandlerB: function (page) {
        this.dataPage.pageNum = page;
        this.getList(page, this.dataPage.pageSize);
      },
      // 改变分页显示条数;
      choooseNumB: function (pageSize) {
        this.dataPage.pageSize = pageSize;
        this.dataPage.pageNum = 1;
        this.getList(1, pageSize);
      },
      getNoticeDetail (item) {
        api.post(this.apiPath.hrsc.sysFind, {noticeId: item.noticeId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.noticeFlag = true;
            this.noticeDetail = res.data;
            api.post(this.apiPath.hrsc.sysSaveRead, {noticeId: item.noticeId}).then(res => {
              if (res.code === 'CPYY-00001') {
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      ignoreFun (item) {
        if (item.state === 1) {
          api.post(this.apiPath.hrsc.updateMessState, {messId: item.messId, state: 2}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$alert('标记已读', '温馨提示', {
                confirmButtonText: '确 定',
                type: 'success', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  this.getList(this.dataPage.pageNum, this.dataPage.pageSize);
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
