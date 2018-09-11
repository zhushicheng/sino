<template>
  <!--产品信息管理-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">全部</div>
          <div class="sino-tabs-item" @click="tabChange('second')">申报</div>
          <div class="sino-tabs-item" @click="tabChange('third')">申报反馈</div>
          <div class="sino-tabs-item" @click="tabChange('four')">回单</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="searchDetailForm" ref="ruleForm" class="serch-form leads-serch-form">
        <sino-tabs v-model="activeNameTab" type="tick" @tab-click="handleClick">
          <sino-tab-pane name="one">
            <span slot="label"><i class="iconfont sino-tongji"></i>合计</span>
            <div class="search-box">
              <ul class="search-inner-box"  v-if="activeNameTab === 'one'">
                <li class="search-inner-one">
                  <span class="search-inner-name">单位公积金账号：</span>
                  <sino-input class="fl" v-model="searchDetailForm.unitRegiNo"></sino-input>
                </li>
                <li class="search-inner-one">
                  <span class="search-inner-name">公积金账户名称：</span>
                  <sino-select
                    class="fl"
                    :filterable="true"
                    :multiselect="false"
                    :isshowTotol="false"
                    :disabled="false"
                    :totalNum="false"
                    :isPage="true"
                    :isGroup="false"
                    :token="token"
                    :url="findAccuAcctSelect"
                    :chooseName.sync="searchDetailForm.accuAcctName"
                    :chooseId.sync="searchDetailForm.accuAcctId"
                    :clear="true"
                  ></sino-select>
                </li>
                <li>
                  <span class="search-inner-name">执行地区：</span>
                  <sino-select
                    class="fl"
                    :filterable="true"
                    :multiselect="false"
                    :isshowTotol="false"
                    :disabled="false"
                    :totalNum="true"
                    :isPage="true"
                    :isGroup="false"
                    :chooseName.sync="searchDetailForm.areaName"
                    :chooseId.sync="searchDetailForm.areaId"
                    :clear="true"
                    :url="findAreaListByBusiAreaType"
                    :data="{data: {busiAreaTypes:[1]}}"></sino-select>
                </li>
                <li>
                  <span class="search-inner-name">公积金管理中心：</span>
                  <sino-select
                    class="fl"
                    :filterable="true"
                    :multiselect="false"
                    :isshowTotol="false"
                    :disabled="false"
                    :totalNum="true"
                    :isPage="true"
                    :isGroup="false"
                    :chooseName.sync="searchDetailForm.centerName"
                    :chooseId.sync="searchDetailForm.centerId"
                    :clear="true"
                    :url="findCenterSelectBox"
                    :data="{title:''}"></sino-select>
                </li>
              </ul>
            </div>
            <div class="search-button">
              <div class="search-button-box search-one-button-box">
                <sino-button type="primary" @click="searchTotalFun">查 询</sino-button>
              </div>
            </div>
            <div class="clear"></div>
          </sino-tab-pane>
          <sino-tab-pane name="two">
            <span slot="label"><i class="iconfont sino-zhihangjilu"></i>详情</span>
            <div class="search-box">
              <ul class="search-inner-box" v-if="activeNameTab === 'two'">
                <li class="search-inner-one li-wid">
                  <sino-form-item label="公积金账户名称：" class="search-inner-item">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="true"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="findAcctNameUnitNoSelectBox"
                                 :chooseName.sync="searchEmpForm.accuAcctNames"
                                 :chooseId.sync="searchEmpForm.accuAcctIds"
                                 :data="{title:'', accuAcctIdList: null}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="申报类型：" class="search-inner-item">
                    <sino-checkbox-group v-model="searchEmpForm.payTypes" class="mt5">
                      <sino-checkbox :label="list.id" v-for="(list, index) in sinsStateList" :key="index">{{list.title}}</sino-checkbox>
                    </sino-checkbox-group>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="申报状态：" class="search-inner-item">
                    <sino-checkbox-group v-model="searchEmpForm.appStates" class="mt5">
                      <sino-checkbox :label="list.id" v-for="(list, index) in appStatesList" :key="index">{{list.title}}</sino-checkbox>
                    </sino-checkbox-group>
                  </sino-form-item>
                </li>
                <sino-collapse-transition>
                  <div class="sino-translate" v-if="searchFlag">
                    <li class="li-wid">
                      <sino-form-item label="客户名称：" class="search-inner-item">
                        <sino-select class="fl"
                                     :filterable="true"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :totalNum="false"
                                     :isPage="true"
                                     :isGroup="false"
                                     :token="token"
                                     :url="custUrl"
                                     :chooseName.sync="searchEmpForm.custName"
                                     :chooseId.sync="searchEmpForm.custId"
                                     :clear="true"
                        >
                        </sino-select>
                      </sino-form-item>
                    </li>
                    <li class="li-wid">
                      <sino-form-item label="签约供应商名称：" class="search-inner-item">
                        <sino-select class="fl"
                                     :filterable="true"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :totalNum="false"
                                     :isPage="true"
                                     :isGroup="false"
                                     :url="signUrl"
                                     :token="selectToken"
                                     :chooseName.sync="searchEmpForm.signSuppName"
                                     :chooseId.sync="searchEmpForm.signSuppId"
                                     :clear="true"
                        >
                        </sino-select>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="雇员姓名：" class="search-inner-item">
                        <sino-input class="fl" type="text"
                                    v-model="searchEmpForm.empName"
                                    :disabled="false"></sino-input>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="证件号码：" class="search-inner-item">
                        <sino-input class="fl" type="text"
                                    v-model="searchEmpForm.certNo"
                                    :disabled="false"></sino-input>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="公积金个人账号：" class="search-inner-item">
                        <sino-input class="fl" type="text"
                                    v-model="searchEmpForm.perNo"
                                    :disabled="false"></sino-input>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="业务年月：" class="search-inner-item">
                        <sino-date-picker
                          v-model="searchEmpForm.natMonString"
                          type="month"
                          :editable="false"
                          :readonly="false"
                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="申报年月：" class="search-inner-item">
                        <sino-date-picker
                          v-model="searchEmpForm.applyMonString"
                          type="month"
                          :editable="false"
                          :readonly="false"
                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="业务员：" class="search-inner-item">
                        <sino-select :filterable="true"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :disabled="false"
                                     :totalNum="false"
                                     :isPage="true"
                                     :isGroup="false"
                                     :token="token"
                                     :url="findUserByOrgIdsAndRoleType"
                                     :chooseId.sync="searchEmpForm.busiPerId"
                                     :chooseName.sync="searchEmpForm.busiPerName"
                                     :data="{userRoleId: userRoleId}"
                                     :clear="true"></sino-select>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="问题人员状态：" class="search-inner-item">
                        <sino-select :filterable="false"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :disabled="false"
                                     :totalNum="false"
                                     :isPage="false"
                                     :isGroup="false"
                                     :url="dictSelUrl"
                                     :chooseName.sync="searchEmpForm.quesPerStateName"
                                     :chooseId.sync="searchEmpForm.quesPerState"
                                     :data="{code: 'QUESTION_PER_STATE'}"
                                     :clear="true"></sino-select>
                      </sino-form-item>
                    </li>
                    <li>
                      <sino-form-item label="问题人员类型：" class="search-inner-item">
                        <sino-select :filterable="false"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :disabled="false"
                                     :totalNum="false"
                                     :isPage="false"
                                     :isGroup="false"
                                     :url="dictSelUrl"
                                     :chooseName.sync="searchEmpForm.quesPerTypeName"
                                     :chooseId.sync="searchEmpForm.quesPerType"
                                     :data="{code: 'QUESTION_PER_TYPE'}"
                                     :clear="true"></sino-select>
                      </sino-form-item>
                    </li>
                  </div>
                </sino-collapse-transition>
              </ul>
            </div>
            <div class="search-button">
              <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
                <sino-button type="primary" @click="searchDetailFun">查 询</sino-button>
                <sino-button class="ressetButton" @click="resetFun" v-if="searchFlag">重 置</sino-button>
              </div>
            </div>
            <div class="clear"></div>
            <div class="search-more">
              <div @click="searchFlag = !searchFlag">
                <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
                <span v-if="!searchFlag">高级查询</span>
                <span v-if="searchFlag">基本查询</span>
              </div>
            </div>
          </sino-tab-pane>
        </sino-tabs>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="declareFun(1)"><i class="iconfont sino-huizhi"></i>审核退回</sino-button>
            <sino-button type="icon-text" @click="declareFun(2)"><i class="iconfont sino-invalid"></i>取消申报</sino-button>
            <sino-button type="icon-text" @click="declareFun(3)"><i class="iconfont sino-invalid"></i>取消申报成功</sino-button>
            <sino-button type="icon-text" @click="declareFun(4)" v-if="activeNameTab === 'one'"><i class="iconfont sino-invalid"></i>取消回单</sino-button>
          </div>
        </div>
        <div class="sino-queryspan">
              <span>合计：<em>{{total === null ? 0:total}}</em> 条
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                已勾选：<em>{{checkLength ? checkLength: 0}}</em> 条
              </span>
        </div>
        <sino-table :data="tableDataTotal" border max-height="416" stripe @select-all="selectCallBackAll" v-on:select="selectCallBack" v-on:viewAll="viewAll" v-if="activeNameTab === 'one'">
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="unitRegiNo" label="单位公积金账号" min-width="180"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="accuProp" label="比例（%）" min-width="105"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区"></sino-table-column>
          <sino-table-column prop="addPerCount" label="新增人数" min-width="180"></sino-table-column>
          <sino-table-column prop="delPerCount" label="减少人数" min-width="95"></sino-table-column>
          <sino-table-column prop="waitApplyPerCount" label="待申报" min-width="180"></sino-table-column>
          <sino-table-column prop="applingPerCount" label="申报中" min-width="95"></sino-table-column>
          <sino-table-column prop="applySussPercount" label="申报成功" min-width="180"></sino-table-column>
          <sino-table-column prop="problemPeopleCount" label="问题人员" min-width="95"></sino-table-column>
          <sino-table-column prop="isReturnName" label="回单" min-width="95"></sino-table-column>
        </sino-table>
        <sino-table :data="tableDataDetail" border max-height="416" stripe @select-all="selectCallBackAll" v-on:select="selectCallBack" v-on:viewAll="viewAll" v-show="activeNameTab === 'two'">
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="unitRegiNo" label="单位公积金账号" min-width="180"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="105"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perNo" label="公积金职工账号" min-width="180"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="95"></sino-table-column>
          <sino-table-column prop="natMonString" label="业务年月" min-width="180"></sino-table-column>
          <sino-table-column prop="applyMonString" label="申报年月" min-width="95"></sino-table-column>
          <sino-table-column prop="payTypeName" label="申报类型" min-width="180"></sino-table-column>
          <sino-table-column prop="appStateName" label="申报状态" min-width="95"></sino-table-column>
          <sino-table-column prop="accuBase" label="申报基数" type="money" width="150"></sino-table-column>
          <sino-table-column prop="perBase" label="个人基数" type="money" width="150"></sino-table-column>
          <sino-table-column prop="perProp" label="个人比例（%）" min-width="95"></sino-table-column>
          <sino-table-column prop="perPayAmo" label="个人缴纳" type="money" width="120"></sino-table-column>
          <sino-table-column prop="unitBase" label="企业基数" type="money" width="120"></sino-table-column>
          <sino-table-column prop="corpProp" label="企业比例（%）" min-width="95"></sino-table-column>
          <sino-table-column prop="unitPayAmo" label="企业缴纳" type="money" width="150"></sino-table-column>
          <sino-table-column prop="isQuesPerName" label="是否问题人员" min-width="95"></sino-table-column>
          <sino-table-column prop="quesPerStateName" label="问题人员状态" min-width="105"></sino-table-column>
          <sino-table-column prop="queDesc" label="问题人员描述" min-width="105"></sino-table-column>
          <sino-table-column prop="busiPerName" label="业务员" min-width="105"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="180"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total">
        </sino-page>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  let checkedArr = [];

  export default {
    components: {},
    data () {
      return {
        token: Cookie.get("Token"),
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        findAccuAcctSelect: this.apiPath.accu.findAccuAcctSelect,
        findCenterSelect: this.apiPath.accu.findCenterSelect,
        findCenterSelectBox: this.apiPath.accu.findCenterSelectBox,
        findAcctNameUnitNoSelectBox: this.apiPath.accu.findAcctNameUnitNoSelectBox,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        signUrl: this.apiPath.hrsc.findByOrderSignSupp,
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType,
        searchFlag: true,
        checkLength: '',
        userRoleId: '5',
        sinsStateList: [],
        appStatesList: [],
        selectToken: Cookie.get('Token'),
        searchEmpForm: {
          accuAcctNames: [],
          accuAcctIds: [],
          payTypes: [], // 申报类型
          appStates: [],
          custId: '',
          custName: '',
          signSuppId: '',
          signSuppName: '',
          empName: '',
          certNo: '',
          perNo: '',
          natMon: '',
          applyMon: '',
          applyMonString: '',
          natMonString: '',
          busiPerId: '',
          busiPerName: '',
          quesPerState: '',
          quesPerStateName: '',
          quesPerType: ''
        },
        searchDetailForm: {
          areaId: '',
          centerId: '', // 公积金管理中心
          centerName: '',
          areaName: '', // 执行地区名称
          perProp: '', // 个人比例
          corpProp: '', // 企业比例（隐藏）
          accuProp: '', // 个人+企业（隐藏）
          addPerCount: '', // 增加人数
          delPerCount: '', // 减少人数
          waitApplyPerCount: '', // 待申报人数
          applingPerCount: '', // 申报中人数
          applySussPercount: '', // 申报成功人数
          returnPerCount: '', // 回单人数（隐藏）
          problemPeopleCount: '', // 问题人员人数
          isReturn: '', // 是否回单（隐藏）
          isReturnName: '', // 是否回单翻译（对应页面回单）
          natMon: '',
          natMonString: '',
          applyMon: '',
          quesPerState: '',
          quesPerType: '',
          busiPerName: '',
          busiPerId: '',
          unitRegiNo: '', // 单位公积金账号
          accuAcctName: '', // 公积金账户名称
          accuAcctId: ''
        },
        searchTotalForm: {},
        trackStatus: [],
        checkedArr: [],
        activeNameTab: 'one',
        tableDataTotal: null,
        tableDataDetail: null,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        isMult: false
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchTotalFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      contResultFun () {
        if (this.sinsStateList.length === 0) {
          api.post(this.getDictSelectBox, {code: 'REPORT_TYPE', ids: [1, 2, 4, 5]}).then(res => {
            if (res.code === 'CPYY-00001') {
              let arr = res.data.list;
              arr.forEach(function (item, index) {
                this.sinsStateList.push(item);
              }, this);
            }
          }).catch(err => {
            console.log(err);
          });
        };
        if (this.appStatesList.length === 0) {
          api.post(this.getDictSelectBox, {code: 'APPLY_STATE', ids: [2, 3, 4, 5]}).then(res => {
            if (res.code === 'CPYY-00001') {
              let arr = res.data.list;
              arr.forEach(function (item, index) {
                this.appStatesList.push(item);
              }, this);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // tab 选项卡点击回调事件
      tabChange (order) {
        if (order === 'second') {
          this.$router.push({path: '/accuDeclarePage'});
        } else if (order === 'third') {
          this.$router.push({path: '/accuDeclareFeed'});
        } else {
          this.$router.push({path: '/accuDeclareReceipt'});
        }
      },
      resetFun () {
        for (var key in this.searchEmpForm) {
          this.searchEmpForm[key] = '';
        }
      },
      handleClick (item) {
        let accuAcctNames = [];
        let accuAcctIds = [];
        checkedArr.forEach(function (item) {
          if (accuAcctNames.indexOf(item.accuAcctNames) === -1) {
            accuAcctNames.push(item.accuAcctName);
            accuAcctIds.push(item.accuAcctId);
          }
          return;
        });
        this.contResultFun();
        this.checkLength = '';
        if (this.activeNameTab === 'two') {
          this.searchEmpForm.accuAcctNames = accuAcctNames;
          this.searchEmpForm.accuAcctIds = accuAcctIds;
          this.searchDetailFun();
        } else {
          this.searchTotalFun();
        }
        //   this.searchDetailForm.accuAcctName = [];
        //   this.searchDetailForm.accuAcctId = [];
        //   this.isMult = true;
        // }
      },
      selectCallBackAll (selectTion, row) {
        let arr = [];
        if (this.activeNameTab === 'one') {
          for (let item of selectTion) {
            if (item.accuAcctId) {
              arr.push(item);
            }
          }
        }
        if (this.activeNameTab === 'two') {
          for (let item of selectTion) {
            if (item.empName) {
              arr.push(item);
            }
          }
        }
        this.selectCallBack(arr);
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
        this.checkLength = checkedArr.length;
      },
      resetForm: function () { // 修改对话框打开回调
      },
      /*   详细页面条件查询 */
      searchDetailFun () {
        this.pageNum = 1;
        this.viewAll2();
      },
      viewAll2 (pageNum, pageSize) {
        if (this.searchEmpForm.natMonString) {
          this.searchEmpForm.natMon = Vue.filter('date')(this.searchEmpForm.natMonString, 'yyyy-MM');
          this.searchEmpForm.natMon = Number(this.searchEmpForm.natMon.replace(/-/g, ''));
        } else {
          /* 组件里面的日期为空 */
          this.searchEmpForm.natMon = '';
        }
        if (this.searchEmpForm.applyMonString) {
          this.searchEmpForm.applyMon = Vue.filter('date')(this.searchEmpForm.applyMonString, 'yyyy-MM');
          this.searchEmpForm.applyMon = Number(this.searchEmpForm.applyMon.replace(/-/g, ''));
        } else {
          /* 组件里面的日期为空 */
          this.searchEmpForm.applyMon = '';
        }
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchEmpForm
        };
        api.post(this.apiPath.accu.findAllApplyByEmp, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataDetail = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 全部页面-合计查询 */
      searchTotalFun () {
        this.pageNum = 1;
        this.viewAll();
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchDetailForm
        };
        api.post(this.apiPath.accu.findAllApplyByAcct, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataTotal = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
        this.viewAll2(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
        this.viewAll2(this.pageNum, this.pageSize);
      },
      // 审核退回
      declareNum1 (data) {
        api.post(this.apiPath.accu.eavRetTotal, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '退回成功！', type: 'success'});
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消申报
      declareNum2 (data) {
        api.post(this.apiPath.accu.cancelDeclTotal, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '取消成功！', type: 'success'});
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消申报成功
      declareNum3 (data) {
        api.post(this.apiPath.accu.cancelDeclSuccTotal, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '取消成功！', type: 'success'});
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消回单
      declareNum4 (data) {
        api.post(this.apiPath.accu.cancelReturn, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '取消成功！', type: 'success'});
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      declareFun (num) {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请至少选择一条', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let data = {
          accuAcctIds: []
        };
        let obj = {
          empPayTypes: []
        };
        checkedArr.forEach(function (item) {
          let el = {
            uniqNo: item.uniqNo,
            payType: item.payType
          };
          obj.empPayTypes.push(el);
        }, this);
        checkedArr.forEach(function (item) {
          data.accuAcctIds.push(item.accuAcctId);
        }, this);
        if (this.activeNameTab === 'one') {
          if (num === 1) {
            this.declareNum1(data);
          }
          if (num === 2) {
            this.declareNum2(data);
          }
          if (num === 3) {
            this.declareNum3(data);
          }
          if (num === 4) {
            this.declareNum4(data);
          }
        } else {
          if (num === 1) {
            this.declareNum1(obj);
          }
          if (num === 2) {
            this.declareNum2(obj);
          }
          if (num === 3) {
            this.declareNum3(obj);
          }
          if (num === 4) {
            this.declareNum4(obj);
          }
        }
      }
    }
  };
</script>
