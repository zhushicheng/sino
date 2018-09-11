<template>
  <!--超截止日数据查询-->
  <div class="usermanage minWidth1000">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="订单查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-name more-than-half">
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
                             class="fixed-width"
                ></sino-select>
              </sino-form-item>
            </li>
            <li class="search-inner-name less-than-half">
              <sino-form-item label="受托供应商：" class="search-inner-item" prop="receSuppName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :token="token"
                             :url="apiPath.hrsc.selectBox"
                             :chooseName.sync="searchForm.receSuppName"
                             :chooseId.sync="searchForm.receSuppId"
                             :clear="true"
                ></sino-select>
              </sino-form-item>
            </li>
            <li class="more-than-half data-pick-box">
              <sino-form-item label="签约方确认时间：" class="search-inner-item">
                <sino-date-picker class="fl"
                                  v-model="searchForm.signConfirmBegDateStr"
                                  type="date"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
                <span  class="fl">至</span>
                <sino-date-picker class="fl"
                                  v-model="searchForm.signConfirmEndDateStr"
                                  type="date"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li class="less-than-half" v-if="searchFlag">
              <sino-form-item label="账单收费年月：" class="search-inner-item" prop="chargeBegYm">
                <sino-date-picker class="fl"
                                  v-model="searchForm.chargeBegYm"
                                  type="month"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true"
                ></sino-date-picker>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li class="more-than-half">
                  <sino-form-item label="账单付费年月：" class="search-inner-item" prop="payBegYm">
                    <sino-date-picker class="fl"
                                      v-model="searchForm.payBegYm"
                                      type="month"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true"
                    ></sino-date-picker>
                  </sino-form-item>
                </li>
                <li class="less-than-half">
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
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
                <li class="more-than-half">
                  <sino-form-item label="付费供应商：" class="search-inner-item" prop="paySuppName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="apiPath.hrsc.selectBox"
                                 :chooseName.sync="searchForm.paySuppName"
                                 :chooseId.sync="searchForm.paySuppId"
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
                <li class="less-than-half">
                  <sino-form-item label="执行地区：" class="search-inner-item" prop="execuAreaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="apiPath.hrsc.areaSelectBox"
                                 :chooseName.sync="searchForm.execuAreaName"
                                 :chooseId.sync="searchForm.execuAreaId"
                                 :clear="true">
                    </sino-select>
                  </sino-form-item>
                </li>
                <li class="more-than-half">
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input type="text" v-model="searchForm.empName"></sino-input>
                  </sino-form-item>
                </li>
                <li class="less-than-half">
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input type="text" v-model="searchForm.certNo"></sino-input>
                  </sino-form-item>
                </li>
                <li class="li-wid spe-width-write">
                  <sino-form-item label="产品服务模板：" class="search-inner-item" prop="prodServeTempName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="apiPath.hrsc.findServeTempSelectBoxByToken"
                                 :data="templateData"
                                 :chooseName.sync="searchForm.prodServeTempName"
                                 :chooseId.sync="searchForm.prodServeTempId"
                                 :clear="true"
                                 :token="token"
                                 class="multiple-choice"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid spe-width-write">
                  <sino-form-item label="产品名称：" class="search-inner-item" prop="prodNames">
                    <sino-select :filterable="true"
                                 :multiselect="true"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="apiPath.hrsc.getProdNameAndProPay"
                                 :chooseName.sync="searchForm.prodNames"
                                 :chooseId.sync="searchForm.otherProdIds"
                                 @contentChange="prodChange"
                                 :clear="true"
                                 :token="token"
                                 class="multiple-choice"
                    ></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" >
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
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
        <div class="second-con-box">
          <sino-title type="levelTwo" title="服务费"></sino-title>
          <span class="fr">共涉及&nbsp;<em>{{total? total:0}}</em>&nbsp;人</span>
        </div>
        <sino-table class="data-re-table" :row-style="showTr" :data="serveData" border max-height="416" stripe v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="60" align="center" fixed="left"></sino-table-column>
          <sino-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" min-width="180" fixed="left">
            <template scope="scope">
              <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="index"></span>
              <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                <i v-if="!scope.row._expanded" class="iconfont sino-wenjianjia1" aria-hidden="true"></i>
                <i v-if="scope.row._expanded" class="iconfont sino-wenjianjia" aria-hidden="true"></i>
              </span>
              {{scope.row[column.dataIndex]}}
            </template>
          </sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
          <sino-table-column prop="prodName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="signConfirmBegDate" label="签约方起做日期" min-width="180"></sino-table-column>
          <sino-table-column prop="chargeBegYm" label="账单收费年月" min-width="180"></sino-table-column>
          <sino-table-column prop="chargeAmo" label="收费金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="payBegYm" label="账单付费年月" min-width="120"></sino-table-column>
          <sino-table-column prop="chargeAmo" label="付费金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="signConfirmTime" label="签约方确认时间" width="180"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
        <div class="second-con-box">
          <sino-title type="levelTwo" title="社保公积金"></sino-title>
          <span class="fr">共涉及&nbsp;<em>{{total1? total1:0}}</em>人</span>
        </div>
        <sino-table class="data-re-table" :data="proPayData" border max-height="416" stripe v-on:viewAll="viewAll1">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
          <sino-table-column prop="proPayName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="signConfirmBegDate" label="签约方起做日期" min-width="180"></sino-table-column>
          <sino-table-column prop="chargeBegYm" label="账单收费年月" min-width="180"></sino-table-column>
          <sino-table-column prop="chargeAmo" label="收费金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="payBegYm" label="账单付费年月" min-width="120"></sino-table-column>
          <sino-table-column prop="chargeAmo" label="付费金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="signConfirmTime" label="签约方确认时间" width="180"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum1"
                   v-bind:page-size="pageSize1"
                   v-on:pagehandler="pageHandler1"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum1"
                   v-bind:object="object"
                   :total="total1"></sino-page>
        <sino-form :model="modifyForm" ref="searchForm">
          <ul class="search-inner-box have-bottom-line-box">
            <li class="search-inner-name">
              <sino-form-item label="修改账单收费年月：" class="search-inner-item" prop="custName">
                <sino-date-picker class="fl"
                                  v-model="modifyForm.chargeBegYm"
                                  type="month"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true"
                ></sino-date-picker>
              </sino-form-item>
            </li>
            <li class="search-inner-name">
              <sino-form-item label="修改账单付费年月：" class="search-inner-item" prop="custName">
                <sino-date-picker class="fl"
                                  v-model="modifyForm.payBegYm"
                                  type="month"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true"
                ></sino-date-picker>
              </sino-form-item>
            </li>
          </ul>
        </sino-form>
        <div class="conf-btn">
          <sino-button type="primary" @click="sureBtn" :disabled="isDisabled">确 定</sino-button>
          <span class="custT-back" @click="goBack">返回</span>
        </div>
      </div>
    </div>
    <!--申请-->
    <sino-dialog :visible.sync="seeFlag" size="small" class="leads-follow dialog-item">
      <sino-title slot="title" type="levelOne" title="提示信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6 class="width30">成功数量</h6>
            <span class="count-num" v-text="alloSeeList.successCount"></span>
          </li>
          <li class="li-last">
            <h6 class="width30">失败数量</h6>
            <span class="count-num">{{alloSeeList.failCount}}
              <em v-if="alloSeeList.failCount" class="ml20" @click="download(alloSeeList.url)">下载</em>
            </span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeFlag = false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookie from 'js-cookie';
  import Utils from '../../../development/component/sinoEdittable/utils/index.js';
  import Vue from 'vue';
  export default {
    created () {
      this.searchForm.orderIds.push(this.$route.query.orderId);
    },
    data () {
      return {
        token: Cookie.get("Token"),
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        templateData: {custId: ''},
        searchForm: {
          orderIds: [],
          custName: '',
          custId: '',
          receSuppName: '',
          receSuppId: '',
          signConfirmBegDateStr: '',
          signConfirmEndDateStr: '',
          chargeBegYm: '',
          payBegYm: '',
          signSuppName: '',
          signSuppId: '',
          paySuppName: '',
          paySuppId: '',
          execuAreaName: '',
          execuAreaId: '',
          empName: '',
          certNo: '',
          prodServeTempName: '',
          prodServeTempId: '',
          prodNames: [],
          otherProdIds: [],
          prodIds: []
        },
        serveData: null,
        proPayData: null,
        total: null,
        pageNum: 1,
        pageSize: 10,
        total1: null,
        pageNum1: 1,
        pageSize1: 10,
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
        seeFlag: false,
        applyForm: {
          exceedDeclTypes: [],
          appReason: ''
        },
        alloSeeList: {
          failCount: '',
          successCount: '',
          url: ''
        },
        modifyForm: {
          chargeBegYm: '',
          payBegYm: ''
        },
        isDisabled: false,
        treeStructure: true,
        defaultExpandAll: false,
        columns: [ // 分组
          {
            text: '服务内容',
            dataIndex: 'prodName'
          }
        ]
      };
    },
    methods: {
      // 查看全部方法
      viewAll (pageNum, pageSize) {
        let obj = JSON.parse(JSON.stringify(this.searchForm));
        if (obj.signConfirmBegDateStr) {
          obj.signConfirmBegDateStr = Vue.filter('date')(obj.signConfirmBegDateStr, 'yyyy-MM-dd');
        }
        if (obj.signConfirmEndDateStr) {
          obj.signConfirmEndDateStr = Vue.filter('date')(obj.signConfirmEndDateStr, 'yyyy-MM-dd');
        }
        if (obj.chargeBegYm) {
          obj.chargeBegYm = Vue.filter('date')(obj.chargeBegYm, 'yyyy-MM');
        }
        if (obj.payBegYm) {
          obj.payBegYm = Vue.filter('date')(obj.payBegYm, 'yyyy-MM');
        }

        let searchObj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: obj
        };
        // api.post(this.apiPath.hrsc.servePage4ModifyChargePayYm, searchObj).then(res => {
        api.post(this.apiPath.hrsc.servePage4ModifyChargePayYm, searchObj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.serveData = res.data.list;
            this.total = res.data.total;
            let me = this;
            if (me.treeStructure) {
              let _oldData = Utils.MSDataTransfer.treeToArray(JSON.parse(JSON.stringify(res.data.list)), null, null, me.defaultExpandAll);
//            me.dataOrg = _oldData;
              me.serveData = Utils.MSDataTransfer.treeToArray(res.data.list, null, null, me.defaultExpandAll);
            };
          }
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll1 (pageNum, pageSize) {
        let obj = JSON.parse(JSON.stringify(this.searchForm));
        if (obj.signConfirmBegDateStr) {
          obj.signConfirmBegDateStr = Vue.filter('date')(obj.signConfirmBegDateStr, 'yyyy-MM-dd');
        }
        if (obj.signConfirmEndDateStr) {
          obj.signConfirmEndDateStr = Vue.filter('date')(obj.signConfirmEndDateStr, 'yyyy-MM-dd');
        }
        if (obj.chargeBegYm) {
          obj.chargeBegYm = Vue.filter('date')(obj.chargeBegYm, 'yyyy-MM');
        }
        if (obj.payBegYm) {
          obj.payBegYm = Vue.filter('date')(obj.payBegYm, 'yyyy-MM');
        }

        let searchObj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: obj
        };
        // api.post(this.apiPath.hrsc.proPayPage4ModifyChargePayYm, searchObj).then(res => {
        api.post(this.apiPath.hrsc.proPayPage4ModifyChargePayYm, searchObj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.proPayData = res.data.list;
            this.total1 = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },

      resetFun () {
        for (var i in this.searchForm) {
          if (Array.isArray(this.searchForm[i])) {
            this.searchForm[i] = [];
          } else {
            this.searchForm[i] = '';
          }
        }
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.pageNum1 = 1;
        this.viewAll(this.pageNum, this.pageSize);
        this.viewAll1(this.pageNum1, this.pageSize1);
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
      // 条数变化回调
      pageHandler1: function (pageNum) {
        this.pageNum1 = pageNum;
        this.viewAll1(this.pageNum1, this.pageSize1);
      },
      // 分页
      choooseNum1: function (pageSize) {
        this.pageSize1 = pageSize;
        this.viewAll1(this.pageNum1, this.pageSize1);
      },
      // 确认按钮
      sureBtn () {
        let operationTime = this.modifyForm.chargeBegYm || this.modifyForm.payBegYm;
        let operationData = this.serveData || this.proPayData;
        if (operationData && operationTime) {
          if (!this.isDisabled) {
            let params = {};
            this.isDisabled = true;
            params.orderId = this.$route.query.orderId;
            let obj = JSON.parse(JSON.stringify(this.searchForm));
            if (obj.signConfirmBegDateStr) {
              obj.signConfirmBegDateStr = Vue.filter('date')(obj.signConfirmBegDateStr, 'yyyy-MM-dd');
            }
            if (obj.signConfirmEndDateStr) {
              obj.signConfirmEndDateStr = Vue.filter('date')(obj.signConfirmEndDateStr, 'yyyy-MM-dd');
            }
            if (obj.chargeBegYm) {
              obj.queryChargeBegYm = Vue.filter('date')(obj.chargeBegYm, 'yyyy-MM');
            }
            if (obj.payBegYm) {
              obj.queryPayBegYm = Vue.filter('date')(obj.payBegYm, 'yyyy-MM');
            }
            for (let key in obj) {
              params[key] = obj[key];
            };
            params.chargeBegYm = this.modifyForm.chargeBegYm ? Vue.filter('date')(this.modifyForm.chargeBegYm, 'yyyyMM') : '';
            params.payBegYm = this.modifyForm.payBegYm ? Vue.filter('date')(this.modifyForm.payBegYm, 'yyyyMM') : '';
            api.post(this.apiPath.hrsc.updateOrderDetChargePayBegYm, params).then(res => {
              this.isDisabled = false;
              if (res.code === 'CPYY-00001') {
                this.alloSeeList = res.data;
                this.modifyForm.chargeBegYm = '';
                this.modifyForm.payBegYm = '';
                this.seeFlag = true;
                console.log(this.alloSeeList);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          if (!operationData && !operationTime) {
            this.$alert('请查询需要操作的数据及修改时间！', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else if (!operationData) {
            this.$alert('请查询需要操作的数据！', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else if (!operationTime) {
            this.$alert('请至少填写一项修改账单收/付费年月时间！', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          }
        }
      },
      // 下载
      download (url) {
        api.download(url);
      },
      // 返回
      goBack () {
        this.$router.go(-1);
      },
      // 显示行
      showTr: function (row, index) {
        let show = (row.row._parent ? row.row._parent._expanded : true);
        row._show = show;
        return show ? '' : 'display:none';
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this;
        if (me.treeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候， 图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this;
        let record = me.serveData[trIndex];
        record._expanded = !record._expanded;
      },
      // 产品变化
      prodChange (data) {
        if (this.searchForm.otherProdIds.indexOf(data.id) === -1) {
          let arr = this.searchForm.prodIds.map(function (item) {
            return item.id;
          });
          this.searchForm.prodIds.splice(arr.indexOf(data.id), 1);
        } else {
          this.searchForm.prodIds.push({id: data.id, flag: data.flag});
        }
      }
    }
  };
</script>
