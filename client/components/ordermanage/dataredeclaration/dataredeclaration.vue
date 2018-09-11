<template>
  <!--超截止日数据查询-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="超截止日数据查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="li-wid search-inner-name">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="apiPath.hrsc.findCustInfoSelectBoxAll"
                             :data="{title:''}"
                             :chooseName.sync="searchForm.custName"
                             :chooseId.sync="searchForm.custId"
                             :clear="true"
                             :token="token"
                             class="multiple-choice"
                ></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid search-inner-name">
              <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :token="token"
                             :url="apiPath.hrsc.selectBox"
                             :chooseName.sync="searchForm.signSuppName"
                             :chooseId.sync="searchForm.signSuppId"
                             :clear="true"
                ></sino-select>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="searchForm.empName"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="searchForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" class="search-inner-item" prop="accrAreaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="apiPath.hrsc.areaSelectBox"
                                 :chooseName.sync="searchForm.accrAreaName"
                                 :chooseId.sync="searchForm.accrAreaId"
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="respBusiRepName">
                    <!--<sino-input class="fl" type="text"-->
                                <!--v-model="searchForm.respBusiRepId"-->
                                <!--:disabled="false"></sino-input>-->
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :data="{roleTypes:[5], orgIds:[]}"
                                 :url="apiPath.author.findUserRoleSelectBoxInfo"
                                 :chooseName.sync="searchForm.respBusiRepName"
                                 :chooseId.sync="searchForm.respBusiRepId"
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保申请进度：" class="search-inner-item" prop="sinsAppScheduleName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :token="token"
                                 :data="{code: 'APP_SCHEDULE'}"
                                 :chooseName.sync="searchForm.sinsAppScheduleName"
                                 :chooseId.sync="searchForm.sinsAppSchedule"
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公积金申请进度：" class="search-inner-item" prop="accuAppScheduleName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'APP_SCHEDULE'}"
                                 :token="token"
                                 :chooseName.sync="searchForm.accuAppScheduleName"
                                 :chooseId.sync="searchForm.accuAppSchedule"
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" >
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('searchForm')">重 置</sino-button>
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
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div>
          <sino-button type="icon-text" @click="applyFun"><i class="iconfont sino-xinjianzhangdan"></i>申请</sino-button>
        </div>
        <sino-table class="data-re-table" :data="QuesPerData" border max-height="416" @selection-change="changeCheck" stripe v-on:viewAll="viewAll">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="accrAreaName" label="执行地区" min-width="100"></sino-table-column>
          <sino-table-column prop="sinsEndDay" label="截单日" min-width="100"></sino-table-column>
          <sino-table-column prop="sinsAppScheduleName" label="社保申请进度" width="150"></sino-table-column>
          <sino-table-column prop="sinsDeclWage" label="社保申报基数" width="150" type="money"></sino-table-column>
          <sino-table-column prop="sinsBegDate" label="社保起做日期" width="150"></sino-table-column>
          <sino-table-column prop="accuAppScheduleName" label="公积金申请进度" width="150"></sino-table-column>
          <sino-table-column prop="accuDeclWage" label="公积金申报基数" width="150" type="money"></sino-table-column>
          <sino-table-column prop="accuBegDate" label="公积金起做日期" width="150"></sino-table-column>
          <sino-table-column prop="respBusiRepName" label="业务员" width="150"></sino-table-column>
          <sino-table-column label="操作" align="center" width="90" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
    <!--申请-->
    <sino-dialog :visible.sync="applyDialog" size="small" class="leads-follow dialog-item" @close="resetFun('applyForm')">
      <sino-title slot="title" type="levelOne" title="申请信息" class="sino-dialog-title"></sino-title>
      <sino-form  class="demo-ruleForm delayStyle" :model="applyForm" ref="applyForm" :rules="applyFormRule" >
        <sino-form-item label="申请类型："  class="search-inner-item" prop="exceedDeclTypes">
          <sino-checkbox-group v-model="applyForm.exceedDeclTypes" style="margin-top: 5px">
            <sino-checkbox :label="list.id" v-for="(list, index) in checkList" :key="index" checked="checked">{{list.title}}</sino-checkbox>
            <!--<sino-checkbox label="复选框 A"></sino-checkbox>-->
          </sino-checkbox-group>
        </sino-form-item>
        <sino-form-item label="申请原因：" class="search-inner-item search-inner-item-width-text" prop="appReason">
          <sino-input type="textarea" v-model="applyForm.appReason"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sendFun('applyForm')" >提 交</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeFlag" top="5%" class="medimat-see" @close="resetFun('alloSeeList')">
      <sino-title slot="title" type="levelOne" title="查看详情" class="sino-dialog-title"></sino-title>
      <div class="userm mt10">
      <ul class="userm-ul">
        <li class="customer-sp">
          <h6>客户名称</h6><input readonly v-model="alloSeeList.custName">
        </li>
        <li class="customer-sp">
          <h6>签约供应商</h6><input readonly v-model="alloSeeList.signSuppName">
        </li>
        <li class="customer-li">
          <h6>雇员姓名</h6><input readonly v-model="alloSeeList.empName">
        </li>
        <li class="customer-li">
          <h6>证件号码</h6><input readonly v-model="alloSeeList.certNo">
        </li>
        <li class="customer-li">
          <h6>执行地区</h6><input readonly v-model="alloSeeList.accrAreaName">
        </li>
        <li class="customer-li">
          <h6>截单日</h6><input readonly v-model="alloSeeList.sinsEndDay">
        </li>
      </ul>
      </div>
      <div class="userm mt0">
        <sino-title slot="title" type="levelTwo" title="社保信息" class="sino-dialog-title" style="height: inherit;"></sino-title>
        <div class="usermanage dialog-com-tree-look-box toview-box toview-box-three">
          <div class="crumbs">
            <ul>
              <li :class="{'li-finish': sinsActiveNode > 1, 'li-active': sinsActiveNode === 1, 'li-notthr': sinsActiveNode  < 1}"><span><i class="step-num iconfont" :class="{'sino-duigou': sinsActiveNode > 1}">{{sinsActiveNode > 1? '':1}}</i>提交申请</span></li>
              <li :class="{'li-finish': sinsActiveNode > 2, 'li-active': sinsActiveNode === 2, 'li-notthr': sinsActiveNode  < 2}"><span><i class="step-num iconfont" :class="{'sino-duigou': sinsActiveNode > 2}">{{sinsActiveNode > 2? '':2}}</i>审批中</span></li>
              <li v-if="sinsActiveNode!=4" :class="{'li-finish': sinsActiveNode > 3, 'li-active': sinsActiveNode === 3, 'li-notthr': sinsActiveNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': sinsActiveNode > 3}">{{sinsActiveNode > 3? '':3}}</i>审批通过</span></li>
              <li v-if="sinsActiveNode==4" :class="{'li-finish': sinsActiveNode > 4, 'li-active': sinsActiveNode === 4, 'li-notthr': sinsActiveNode  < 4}"><span><i class="step-num iconfont" :class="{'sino-duigou': sinsActiveNode > 4}">{{sinsActiveNode > 4? '':4}}</i>审批未通过</span></li>
            </ul>
          </div>
        </div>
        <ul class="userm-ul">
          <li class="customer-li">
            <h6>社保申报基数</h6><input readonly v-model="alloSeeList.sinsDeclWage">
          </li>
          <li class="customer-li">
            <h6>社保起做日期</h6><input readonly v-model="alloSeeList.sinsBegDate">
          </li>
          <!--<li class="customer-li">-->
            <!--<h6>公积金申报基数</h6><input readonly v-model="alloSeeList.accuDeclWage">-->
          <!--</li>-->
          <!--<li class="customer-li">-->
            <!--<h6>公积金起做日期</h6><input readonly v-model="alloSeeList.accuBegDate">-->
          <!--</li>-->
          <li class="customer-li">
            <h6>申请时间</h6><input readonly v-model="alloSeeList.sinsAppTime">
          </li>
          <li class="customer-li">
            <h6>申请人</h6><input readonly v-model="alloSeeList.sinsAppName">
          </li>
          <li class="customer-sp">
            <h6>申请原因</h6><input readonly v-model="alloSeeList.sinsAppReason">
          </li>
          <li class="customer-sp" v-if="sinsActiveNode==4">
            <h6>失败原因</h6><input readonly v-model="alloSeeList.sinsComment">
          </li>
        </ul>
      </div>
      <div class="userm mt0">
        <sino-title slot="title" type="levelTwo" title="公积金信息" class="sino-dialog-title" style="height: inherit;"></sino-title>
        <div class="usermanage dialog-com-tree-look-box toview-box toview-box-three">
          <div class="crumbs">
            <ul>
              <li :class="{'li-finish': accuActiveNode > 1, 'li-active': accuActiveNode === 1, 'li-notthr': accuActiveNode  < 1}"><span><i class="step-num iconfont" :class="{'sino-duigou': accuActiveNode > 1}">{{accuActiveNode > 1? '':1}}</i>提交申请</span></li>
              <li :class="{'li-finish': accuActiveNode > 2, 'li-active': accuActiveNode === 2, 'li-notthr': accuActiveNode  < 2}"><span><i class="step-num iconfont" :class="{'sino-duigou': accuActiveNode > 2}">{{accuActiveNode > 2? '':2}}</i>审批中</span></li>
              <li v-if="accuActiveNode!=4" :class="{'li-finish': accuActiveNode > 3, 'li-active': accuActiveNode === 3, 'li-notthr': accuActiveNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': accuActiveNode > 3}">{{accuActiveNode > 3? '':3}}</i>审批通过</span></li>
              <li v-if="accuActiveNode==4" :class="{'li-finish': accuActiveNode > 4, 'li-active': accuActiveNode === 4, 'li-notthr': accuActiveNode  < 4}"><span><i class="step-num iconfont" :class="{'sino-duigou': accuActiveNode > 4}">{{accuActiveNode > 4? '':4}}</i>审批未通过</span></li>
            </ul>
          </div>
        </div>
        <ul class="userm-ul">
          <!--<li class="customer-li">-->
            <!--<h6>社保申报基数</h6><input readonly v-model="alloSeeList.sinsDeclWage">-->
          <!--</li>-->
          <!--<li class="customer-li">-->
            <!--<h6>社保起做日期</h6><input readonly v-model="alloSeeList.sinsBegDate">-->
          <!--</li>-->
          <li class="customer-li">
            <h6>公积金申报基数</h6><input readonly v-model="alloSeeList.accuDeclWage">
          </li>
          <li class="customer-li">
            <h6>公积金起做日期</h6><input readonly v-model="alloSeeList.accuBegDate">
          </li>
          <li class="customer-li">
            <h6>申请时间</h6><input readonly v-model="alloSeeList.accuAppTime">
          </li>
          <li class="customer-li">
            <h6>申请人</h6><input readonly v-model="alloSeeList.accuAppName">
          </li>
          <li class="customer-sp">
            <h6>申请原因</h6><input readonly v-model="alloSeeList.accuAppReason">
          </li>
          <li class="customer-sp" v-if="accuActiveNode==4">
            <h6>失败原因</h6><input readonly v-model="alloSeeList.accuComment">
          </li>
        </ul>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        checked: true,
        findSalesmanSelectBox: '',
        token: Cookie.get("Token"),
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        checkList: [1, 2],
        checkedArr: [],
        searchForm: {
          custId: '',
          custName: '',
          signSuppId: '',
          signSuppName: '',
          empName: '',
          certNo: '',
          accrAreaId: '',
          accrAreaName: '',
          respBusiRepName: '',
          respBusiRepId: '',
          sinsAppSchedule: 1,
          sinsAppScheduleName: '待申请',
          accuAppSchedule: 1,
          accuAppScheduleName: '待申请'
        },
        QuesPerData: null, // 问题人员列表
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        searchFlag: false,
        applyDialog: false,
        seeFlag: false,
        applyForm: {
          exceedDeclTypes: [],
          appReason: ''
        },
        applyFormRule: {
          exceedDeclTypes: [
            {type: 'array', required: true, trigger: 'change', message: '请选择申请类型'}
          ],
          appReason: [
            {required: true, trigger: 'blur', message: '请填写申请原因'}
          ]
        },
        alloSeeList: {
          custName: '',
          signSuppName: '',
          empName: '',
          certNo: '',
          accrAreaName: '',
          sinsEndDay: '',
          sinsDeclWage: '',
          sinsBegDate: '',
          accuDeclWage: '',
          accuBegDate: '',
          appName: '',
          appTime: '',
          appReason: ''
        },
        sinsActiveNode: '',
        accuActiveNode: ''
      };
    },
    mounted () {
      let _array = JSON.parse(Cookie.get('loginUser'));
      _array.forEach(function (list) {
        if (list.userRoleId === JSON.parse(Cookie.get('userRoleId'))) {
          this.searchForm.respBusiRepId = list.userRoleId;
          this.searchForm.respBusiRepName = list.userName + '-' + list.roleName;
        }
      }, this);
      api.post(this.getDictSelectBox, {code: 'EXCEED_DECL_TYPE'}).then(res => {
        this.checkList = res.data.list;
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 申请
      applyFun () {
        if (this.checkedArr.length == 0) {
          this.$alert('请选中一条数据', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        };
        let result = this.checkedArr.some((item) => {
          return item.sinsAppSchedule != 1 && item.accuAppSchedule != 1;
        });
        if (result) {
          this.$alert('所选行中有一行或多行已申请请重新选择', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
        this.applyDialog = true;
      },
      // 复选框
      changeCheck (selections) {
        this.checkedArr = selections.filter((item) => {
          if (item.orderId) {
            return item;
          }
        });
      },
      importCardFun () {},
      // 重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      // 查看全部方法
      viewAll (pageNum, pageSize) {
        let objJson = JSON.parse(JSON.stringify(this.searchForm));
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: objJson
        };
        api.post(this.apiPath.hrsc.findAllOrderExceedDecl, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.QuesPerData = res.data.list;
            this.total = res.data.total;
            this.checkedArr = [];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 条数变化回调
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      seeFun (item) {
        api.postsign(this.apiPath.hrsc.findOrderExceedDeclByOrderId, item.orderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeFlag = true;
            // this.activeNode = res.data.appSchedule;
            this.alloSeeList = res.data;
            if (!res.data.sinsAppId) {
              // 全灰
              this.sinsActiveNode = '';
            } else if (!res.data.sinsFlowUserRoleId) {
              // 提交申请 亮了
              this.sinsActiveNode = 1;
            } else if (!res.data.sinsFlowEndUserRoleId) {
              if (res.data.sinsAppSchedule == 3) {
                // 审批不通过
                this.sinsActiveNode = 4;
              } else {
                // 审批中
                this.sinsActiveNode = 2;
              }
            } else {
              if (res.data.sinsAppSchedule == 3) {
                // 审批不通过，
                this.sinsActiveNode = 4;
              } else {
                // 审批通过
                this.sinsActiveNode = 3;
              }
            };
            if (!res.data.accuAppId) {
              // 全灰
              this.accuActiveNode = '';
            } else if (!res.data.accuFlowUserRoleId) {
              // 提交申请 亮了
              this.accuActiveNode = 1;
            } else if (!res.data.accuFlowEndUserRoleId) {
              if (res.data.accuAppSchedule == 3) {
                // 审批不通过
                this.accuActiveNode = 4;
              } else {
                // 审批中
                this.accuActiveNode = 2;
              }
            } else {
              if (res.data.accuAppSchedule == 3) {
                // 审批不通过，
                this.accuActiveNode = 4;
              } else {
                // 审批通过
                this.accuActiveNode = 3;
              }
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 提交
      sendFun (formName) {
        this.$refs[formName].validate((valid) => { // 回盘导入--导入文件校验
          if (valid) {
            let orderIds = [];
            this.checkedArr.forEach(item => {
              if (item.orderId) {
                orderIds.push(item.orderId);
              }
            });
            let param = {
              exceedDeclTypes: this.applyForm.exceedDeclTypes,
              appReason: this.applyForm.appReason,
              orderIds: orderIds
            };
            api.post(this.apiPath.hrsc.updateOrderExceedDecl, param).then(res => {
              if (res.code === 'CPYY-00001') {
                this.applyDialog = false;
                this.$message({message: '申请成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
<style scoped>
  .userm .userm-ul li{background-color: transparent}
</style>

