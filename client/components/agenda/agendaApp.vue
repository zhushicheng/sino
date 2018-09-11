<template>
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header clearTration">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item " :class="{'is-active':titleName===1}" @click="startagenda(1)">我参与的审批</div>
          <div class="sino-tabs-item" :class="{'is-active':titleName===2}" @click="startagenda(2)">我发起的审批</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="agendaForm" ref="agendaForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box contractor-inquire invoice-ul ">
            <li class="search-inner-one">
              <span class="search-inner-name" prop="starterName">{{titleName===1 ? '申请人：': '流程名称：'}}</span>
              <sino-select class="fl" v-show="titleName===1"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :token="token"
                           :url="busiUrl"
                           :data="{id: '', title: ''}"
                           :chooseName.sync="agendaForm.starterName"
                           :chooseId.sync="agendaForm.starter"
                           :clear="true">
              </sino-select>
              <sino-select v-show="titleName===2" class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="dropUrl"
                           :chooseName.sync="agendaForm.flowName"
                           :chooseId.sync="agendaForm.flowId"
                           :clear="true">
              </sino-select>
            </li>
            <li class="search-inner-one contractor-inquire-li">
              <span class="search-inner-name">申请日期：</span>
              <sino-date-picker
                v-model="agendaForm.startDate"
                type="date"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
              至
              <sino-date-picker
                v-model="agendaForm.endDate"
                type="date"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
            </li>
            <li v-if="titleName===1">
              <span class="search-inner-name" prop="flowName">流程名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="dropUrl"
                           :chooseName.sync="agendaForm.flowName"
                           :chooseId.sync="agendaForm.flowId"
                           :clear="true">
              </sino-select>
            </li>
            <li class="contractor-inquire-li" :class="{'invoice-li': titleName===2}">
              <span class="search-inner-name invoice-li-width">审批状态：</span>
              <sino-checkbox-group v-model="agendaForm.states" v-if="titleName===1" class="mt5 checkbox-label-mr1">
                <sino-checkbox :label="list.state" v-for="(list, index) in mystateslist" :key="index">{{list.stateName}}
                  <sino-badge :value="list.num"></sino-badge>
                </sino-checkbox>
              </sino-checkbox-group>
              <sino-checkbox-group v-model="agendaForm.results" v-if="titleName===2" class="mt5 checkbox-label-mr1">
                <sino-checkbox :label="list.result" v-for="(list, index) in stateslist" :key="index">{{list.resultName}}
                  <sino-badge :value="list.num"></sino-badge>
                </sino-checkbox>
              </sino-checkbox-group>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="findFun(titleName)">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--无数据展示的-->
    <div class=" sino-table-total sino-table-total mt15" v-if="!dataPage.total">
      <sino-table :data="[]" max-height="416" border stripe class="no-data-mar-top">
      </sino-table>
      <sino-page
        class="page-style"
        v-bind:page="dataPage.pageNum"
        v-bind:page-size="dataPage.pageSize"
        v-on:pagehandler="pageHandlerB"
        :pageArray="dataPage.pageArray"
        v-on:choosePageFun="choooseNumB"
        v-bind:object="object"
        :total="null">
      </sino-page>
    </div>
    <!--有数据展示的-->
    <div class="emp-info-page mt15 min-wid-back" v-if="dataPage.total">
      <div class="local-info">
        <div class="emp-link-card else-link-card tit-min-wit" v-for="(item,index) in queryData" :key="index" v-if="titleName===1"
             :class="{'no-bor-bon':item.show, 'first-card-top':index === 0}">
          <div class="emp-link-card-title title-border-none else-card">
            <div class="fl fontBox tit-font-box">
              <div class="title-right fl">
                <span class="color-world fl"><i class="title-line"></i>{{item.flowName}}</span>
              </div>
              <div class="title-right2 fl">
                <div class="fl">
                  <span class="color-world fl tit-app-sty">申请人：</span>
                  <span class="fl">{{item.starter}}</span>
                </div>
                <div class="fr">
                  <span class="fl">{{item.stateName}}</span>
                  <!--<span class="fl">{{item.stateName}}</span>-->
                </div>
              </div>
              <div class="fr">
                <div class="fl padding5 tit-time-padding tit-app-sty"><span>{{item.startTime}}</span></div>
                <sino-button class="fl" type="icon-text" @click="approve(item)" v-show="!item.todo"><i
                  class="iconfont sino-eav"></i>审批
                </sino-button>
                <sino-button class="fl" type="icon-text" @click="examine(item)" v-show="item.todo"><i
                  class="iconfont sino-doc"></i>查看
                </sino-button>
              </div>
            </div>
            <div class="fr iconFontStyle" @click="item.show = !item.show">
              <sino-button class="fl isShow" v-if="!item.show">
                <i class="iconfont sino-jiantouxia"></i>
              </sino-button>
              <sino-button class="fl isShow" :class="{'showBon':item.show}" v-if="item.show">
                <i class="iconfont sino-jiantoushang"></i>
              </sino-button>
              <!--</div>-->
            </div>
          </div>
          <sino-collapse-transition>
            <div class="data-style2 clearfix" v-show="item.show">
              <!--<span class="color-world fl">申请内容</span>-->
              <ul class="clearfix fl ul-style">
                <li>{{item.reason}}</li>
                <!--<li v-for="(item2, index) in item.matConfs">
                  <span>{{index + 1}}、{{item2.matName}}<i v-if="item2.matRemark">&nbsp;—&nbsp;</i>{{item2.matRemark}}</span>
                </li>-->
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
        <div class="emp-link-card else-link-card" v-for="(item,index) in issueData" :key="index" v-if="titleName===2"
             :class="{'no-bor-bon':item.show, 'first-card-top':index === 0}">
          <div class="emp-link-card-title title-border-none else-card">
            <div class="fl fontBox tit-font-box">
              <div class="title-right fl">
                <span class="color-world fl"><i class="title-line"></i>{{item.flowName}}</span>
              </div>
              <div class="title-right2 fl">
                <div class="fl">
                  <span class="color-world fl tit-app-sty">申请人：</span>
                  <span class="fl">{{item.starter}}</span>
                </div>
                <div class="fr">
                  <span class="fl">{{item.resultName}}</span>
                  <!--<span class="fl">{{item.stateName}}</span>-->
                </div>
              </div>
              <div class="fr">
                <div class="fl padding5 tit-time-padding tit-app-sty"><span>{{item.startTime}}</span></div>
                <sino-button class="fl" type="icon-text" @click="examine(item)"><i
                  class="iconfont sino-doc"></i>查看
                </sino-button>
              </div>
            </div>
            <div class="fr iconFontStyle" @click="item.show = !item.show">
              <sino-button class="fl isShow" v-if="!item.show">
                <i class="iconfont sino-jiantouxia"></i>
              </sino-button>
              <sino-button class="fl isShow" :class="{'showBon':item.show}" v-if="item.show">
                <i class="iconfont sino-jiantoushang"></i>
              </sino-button>
              <!--</div>-->
            </div>
          </div>
          <sino-collapse-transition>
            <div class="data-style2 clearfix" v-show="item.show">
              <!--<span class="color-world fl">申请内容</span>-->
              <ul class="clearfix fl ul-style">
                <li>{{item.reason}}</li>
                <!--<li v-for="(item2, index) in item.matConfs">
                  <span>{{index + 1}}、{{item2.matName}}<i v-if="item2.matRemark">&nbsp;—&nbsp;</i>{{item2.matRemark}}</span>
                </li>-->
              </ul>
            </div>
          </sino-collapse-transition>
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
    </div>
  </div>
</template>
<script>
  import api from '../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';

  let sessionStorage = window.sessionStorage;
  export default {
    data () {
      return {
        busiUrl: this.apiPath.author.findUserRoleSelectBoxInfo,
        dropUrl: this.apiPath.hrsc.countDrop,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookies.get('Token'),
        titleName: 1,
        stateslist: [],
        mystateslist: [],
        show: true, // 材料用途--->展开收起
        agendaForm: {
          starter: '', // 申请人
          starterName: '', // 申请人
          flowName: '', // 流程名称
          flowId: null,
          startDate: '',
          states: [1],
          results: [],
          endDate: ''
        },
        dataPage: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
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
        issueData: [],
        queryData: [] // 展示数据
      };
    },
    created () {
      if (this.$route.query.id && this.$route.query.name) {
        this.agendaForm.flowId = this.$route.query.id;
        this.agendaForm.flowName = this.$route.query.name;
        this.findFun(this.titleName);
      }
      if (this.$route.query.stater) {
        this.agendaForm = JSON.parse(sessionStorage.agendaForm);
        this.findFun(this.titleName);
      }
    },
    mounted () {
      api.post(this.apiPath.hrsc.getParticipateStateCount).then(res => {
        this.mystateslist = res.data;
      });
      api.post(this.apiPath.hrsc.getByStarterResultCount).then(res => {
        this.stateslist = res.data;
      });
      this.findFun(1);
    },
    methods: {
      pageHandlerB: function (page) {
        this.dataPage.pageNum = page;
        if (this.titleName === 1) {
          this.gitList(page, this.dataPage.pageSize, 1);
        }
        if (this.titleName === 2) {
          this.gitList(page, this.dataPage.pageSize, 2);
        }
      },
      choooseNumB: function (pageSize) {
        this.dataPage.pageSize = pageSize;
        if (this.titleName === 1) {
          this.gitList(1, pageSize, 1);
        }
        if (this.titleName === 2) {
          this.gitList(1, pageSize, 2);
        }
      },
      approve: function (item) {
        /* 告诉页面按什么展示传参 审批 */
        this.$router.push({path: '/approverApp', query: {titleName: 1, processId: item.processId}});
      },
      examine: function (item) {
        /* 查看 */
        this.$router.push({path: '/approverApp', query: {titleName: 2, processId: item.processId}});
      },
      startagenda (item) {
        this.titleName = item;
        this.findFun(this.titleName);
      },
      /* 一级查询 */
      findFun (item) {
        this.gitList(this.dataPage.pageNum, this.dataPage.pageSize, item);
      },
      gitList (pageNum, pageSize, item) {
        sessionStorage.setItem("agendaForm", JSON.stringify(this.agendaForm));
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.agendaForm
        };
        if (item === 1) {
          api.post(this.apiPath.hrsc.getParticipate, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.queryData = res.data.list;
              let _this = this;
              this.queryData.forEach(function (item) {
                _this.$set(item, 'show', false);
              });
              this.dataPage.total = res.data.total;
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (item === 2) {
          api.post(this.apiPath.hrsc.getByStarter, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.issueData = res.data.list;
              let _this = this;
              this.issueData.forEach(function (item) {
                _this.$set(item, 'show', false);
              });
              this.dataPage.total = res.data.total;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
