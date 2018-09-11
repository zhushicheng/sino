<template>
  <!--公告-->
  <div class="invinfo">
    <sino-con>
      <sino-title type="levelOne" title="公告查询"></sino-title>
      <div class="notice-tab">
        <div class="" :class="{'index-bottom-active-tab': !activeTab}" @click="activeTabFun(false)">
          未读公告
        </div>
        <div :class="{'index-bottom-active-tab': activeTab}" @click="activeTabFun(true)">
          全部公告
        </div>
      </div>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <ul class="search-inner-box notice-search-box">
          <li>
            <span class="fl">发送人：</span>
            <sino-input class="fl" v-model="searchForm.publishPerName"></sino-input>
          </li>
          <li class="second-li-notice">
            <span class="fl">公告标题：</span>
            <sino-input class="fl" v-model="searchForm.noticeTitle"></sino-input>
          </li>
          <sino-button type="primary" @click="searchFun">查 询</sino-button>
        </ul>
        <div class="clear"></div>
      </sino-form>
      <div class="emp-link-card-title title-border-none tit-flex notice-detail-list" v-for="item in queryData" :key="item">
        <div class="title-right fl">
          <span class="color-world fl"><i class="title-line"></i></span>
          <span class="fl">{{item.noticeTitle}}</span>
        </div>
        <div class="fr">
          <sino-button class="fr" type="icon-text" @click="ignoreFun(item)" :class="{'ignore-button': item.noticeIsReadName === '已读' || item.isIgnore}">忽略</sino-button><i class="splite-line fr splite-line-color">|</i>
          <sino-button class="fr" type="icon-text" @click="getNoticeDetail(item)">查看</sino-button><i class="splite-line fr">|</i>
          <span class="notice-time fr">{{item.publishTime}}</span>
          <span class="notice-state fr" v-if="activeTab ">{{item.noticeIsReadName}}</span>
          <span class="publish-box fr"><i>发布人：</i>{{item.publishPerName}}</span>
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
    <!--系统公告详细内容-->
    <sino-dialog :visible.sync ="noticeFlag" :show-close="true"  class="notice-layer" @close="layerClose">
      <sino-title slot="title" type="levelOne" :title="noticeDetail.noticeTitle" class="sino-dialog-title"></sino-title>
      <ul class="title-box">
        <li>
          <span>发布人：</span>{{noticeDetail.publishPerName}}
        </li>
        <li>
          <span>发布时间：</span>{{noticeDetail.publishTime}}
        </li>
      </ul>
      <div class="detail-box" v-text="noticeDetail.noticeContent">
      </div>
    </sino-dialog>
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
          publishPerName: '',
          noticeTitle: ''
        },
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
        obj.data.noticeIsRead = this.activeTab;
        api.post(this.apiPath.hrsc.findAllNoticeToHead, obj).then(res => {
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
        if (!(item.noticeIsReadName === '已读' || item.isIgnore)) {
          api.post(this.apiPath.hrsc.updateIsIgnoreById, {noticeId: item.noticeId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$alert('已忽略', '温馨提示', {
                confirmButtonText: '确 定',
                type: 'success', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {}
              });
              this.getList(this.dataPage.pageNum, this.dataPage.pageSize);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
