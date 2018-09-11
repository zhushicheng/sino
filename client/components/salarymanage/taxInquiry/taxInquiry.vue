<template>
  <!--薪酬支付申请-->
  <div>
    <div class="usermanage" >
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="个税查询"></sino-title>
        <sino-form :model="entOrderForm" ref="entOrderForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box invoice-ul">
              <li class="search-inner-name">
                <span class="search-inner-name invoice-li-width">客户 / 供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="entOrderForm.custSuppName"
                             :chooseId.sync="entOrderForm.custSuppId"
                             :clear="true"
                             :token="token"
                             :data="{title:''}"
                             :url="apiPath.hrsc.findCustAndSuppByConinfo"
                             @contentChange="customChange"
                             @clearChange="customChange1"
                             >
                </sino-select>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">雇员姓名：</span>
                <sino-input class="fl" type="text" v-model="entOrderForm.empName"
                            :disabled="false"></sino-input>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">证件号码：</span>
                <sino-input class="fl" type="text" v-model="entOrderForm.certNo"
                            :disabled="false"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">费用所属期：</span>
                <sino-date-picker
                  v-model="entOrderForm.feeDateNo"
                  type="month"
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
              </li>
              <sino-collapse-transition>
                <div class="sino-translate" v-show="searchFlag">
                  <li>
                    <span class="search-inner-name">报税类型：</span>
                    <sino-select class="fl"
                                 :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :data="{code: 'DECL_TYPE'}"
                                 :url="apiPath.hrsc.getDictSelectBox"
                                 :chooseName.sync="entOrderForm.declName"
                                 :chooseId.sync="entOrderForm.declType"
                                 :clear="true" >
                    </sino-select>
                  </li>
                  <!--<li>-->
                    <!--<span class="search-inner-name">工资年月：</span>-->
                    <!--<sino-date-picker-->
                      <!--v-model="entOrderForm.creYm"-->
                      <!--type="month"-->
                      <!--:editable="false"-->
                      <!--:readonly="false"-->
                      <!--:clearable="true">-->
                    <!--</sino-date-picker>-->
                  <!--</li>-->
                  <li>
                    <span class="search-inner-name">申报进度：</span>
                    <sino-select class="fl"
                                 :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :data="{code: 'DECL_SCHEDULE'}"
                                 :url="apiPath.hrsc.getDictSelectBox"
                                 :chooseName.sync="entOrderForm.declScheduleName"
                                 :chooseId.sync="entOrderForm.declSchedule"
                                 :clear="true" >
                    </sino-select>
                  </li>
                  <li class="invoice-li">
                    <span class="search-inner-name  invoice-li-width">申报日期：</span>
                    <sino-date-picker
                      v-model="entOrderForm.declDateStart"
                      type="date"
                      :editable="false"
                      :readonly="false"
                      :clearable="true">
                    </sino-date-picker> 至
                    <sino-date-picker
                      v-model="entOrderForm.declDateEnd"
                      type="date"
                      :editable="false"
                      :readonly="false"
                      :clearable="true">
                    </sino-date-picker>
                  </li>
                </div>
              </sino-collapse-transition>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchButFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('entOrderForm')">重 置</sino-button>
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
          <div class="sino-table-icon bs-none">
            <div class="sino-table-icon-left">
              <sino-button class="fl" type="icon-text" @click="exportExc"><i class="iconfont sino-export"></i>导出
              </sino-button>
            </div>
          </div>
          <sino-table :data="entTableData" max-height="416" stripe v-on:viewAll="searchButFun" border v-on:select="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="custName" label="客户 / 供应商名称" min-width="120"></sino-table-column>
            <!--<sino-table-column prop="signChName" label="签约供应商名称" min-width="120"></sino-table-column>-->
            <sino-table-column prop="empName" label="雇员姓名" ></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="120"></sino-table-column>
            <!--<sino-table-column prop="processName" label="工资年月" min-width="100"></sino-table-column>-->
            <sino-table-column prop="issuedTotal" label="应发金额" width="120" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="perTaxAmo" label="税额" width="120" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="taxRateName" label="个税税目" min-width="120"></sino-table-column>
            <sino-table-column prop="taxableIncome" label="应纳税所得额" width="120" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="realTotal" label="实发金额" width="120" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="declScheduleName" label="申报进度" min-width="100"></sino-table-column>
            <sino-table-column prop="feeDateNo" label="费用所属期" min-width="100"></sino-table-column>
            <sino-table-column prop="declDate" label="申报日期" min-width="100"></sino-table-column>
            <sino-table-column prop="declTypeName" label="报税类型" min-width="120"></sino-table-column>
            <sino-table-column prop="respBusiRepName" label="业务员" min-width="100"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                     :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                     :total="page.total"></sino-page>
        </div>
      </div>
      <!--导出-->
      <sino-dialog :visible.sync="seeItemFlag" top="30%" size="small" class="leads-follow dialog-item" @close="resetFun('applyForm')">
        <sino-title slot="title" type="levelOne" title="导出" class="sino-dialog-title"></sino-title>
        <sino-form  class="demo-ruleForm delayStyle exportExc" :model="applyForm" ref="applyForm" :rules="applyFormRule" >
          <sino-form-item label="费用所属期："  class="search-inner-item" prop="feeDateNo">
            <sino-date-picker
              v-model="applyForm.feeDateNo"
              type="month"
              :editable="false"
              :readonly="false"
              :picker-options="pickerOptions"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sendFun" >确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        searchFlag: false,
        pickerOptions: {
          disabledDate (time) {
            let date = new Date();
            let querymonth = date.getMonth();
            let queryYear = date.getFullYear();
            if (querymonth < 10) { querymonth = '0' + querymonth; };
            let yearMoth = queryYear + '-' + querymonth;
            return time.getTime() > new Date(yearMoth);
          }
        },
        token: Cookies.get('Token'),
        entOrderForm: {
          custSuppType: '',
          custSuppId: '',
          custSuppName: '',
          empName: '',
          certNo: '',
          declType: '',
          declName: '',
          creYm: '',
          declSchedule: '',
          declScheduleName: '',
          feeDateNo: new Date(new Date().getFullYear() + '-' + new Date().getMonth()),
          declDateStart: '',
          declDateEnd: ''
        },
        seeItemFlag: false,
        entTableData: null,
        page: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
        },
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        applyForm: {
          feeDateNo: ''
        },
        applyFormRule: {
          feeDateNo: [
            {required: true, trigger: 'change', message: '请输入日期', type: 'date'}
          ]
        },
        reimbFalg: false,
        modifyFlagVisible: false
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      sendFun () {
        this.$refs.applyForm.validate((valid) => {
          if (valid) {
            var dataObj = JSON.parse(JSON.stringify(this.entOrderForm));
            // dataObj.creYm = Vue.filter('date')(dataObj.creYm, 'yyyyMM');
            dataObj.feeDateNo = Vue.filter('date')(this.applyForm.feeDateNo, 'yyyyMM');
            dataObj.declDateStart = Vue.filter('date')(dataObj.declDateStart, 'yyyyMMdd');
            dataObj.declDateEnd = Vue.filter('date')(dataObj.declDateEnd, 'yyyyMMdd');
            var obj = {
              pageNum: this.page.pageNum,
              pageSize: this.page.pageSize,
              data: dataObj
            };
            api.post(this.apiPath.salary.downloadThreePerIncomeTaxExcels, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.seeItemFlag = false;
                api.download(res.data.downloadPath);
              }
            });
          }
        });
      },
      sendFun1 () {
          // if (valid) {
        var dataObj = JSON.parse(JSON.stringify(this.entOrderForm));
        // dataObj.creYm = Vue.filter('date')(dataObj.creYm, 'yyyyMM');
        // dataObj.feeDateNo = Vue.filter('date')(this.applyForm.feeDateNo, 'yyyyMM');
        dataObj.feeDateNo = Vue.filter('date')(dataObj.feeDateNo, 'yyyyMM');
        // dataObj.declDateStart = Vue.filter('date')(dataObj.declDateStart, 'yyyyMMdd');
        // dataObj.declDateEnd = Vue.filter('date')(dataObj.declDateEnd, 'yyyyMMdd');
        dataObj.pageNum = this.page.pageNum;
        dataObj.pageSize = this.page.pageSize;
          // var obj = {
        //   pageNum: this.page.pageNum,
        //   pageSize: this.page.pageSize,
        //   data: dataObj
        // };
        api.post(this.apiPath.salary.downloadThreePerIncomeTaxExcels, dataObj).then(res => {
          if (res.code === 'CPYY-00001') {
            // this.seeItemFlag = false;
            if (!res.data.perTaxIsNull) {
              api.download(res.data.downloadPath);
            } else {
              this.$alert('当前导出内容为空是否继续导出', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  if (action === 'confirm') {
                    api.download(res.data.downloadPath);
                  }
                }
              });
            }
          }
        });
          // }
      },
      customChange (item) {
        this.entOrderForm.custSuppType = item.flag;
      },
      customChange1 (item) {
        this.entOrderForm.custSuppType = '';
      },
      // 导出
      exportExc () {
        this.sendFun1();
        // this.seeItemFlag = true;
      },
      // 申请财务支付
      applyfnncpay () {
        if (this.checkedArr.length === 0) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          let arr = this.checkedArr.map(function (item) {
            return {wageBaseId: item.wageBaseId};
          });
          api.post(this.apiPath.salary.applyPay, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.batchApplyResult = res.data;
              this.batchLeadTimeForm.feeDateNoString = new Date();
              this.batchLeadSeeFlag = true;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 分页回调
      pageHandler (page) {
        this.page.pageNum = page;
        this.searchFun();
      },
      // 改变显示条数回调
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.searchFun();
      },
      // 重置
      resetFun () {
        for (var key in this.entOrderForm) {
          this.entOrderForm[key] = '';
        }
      },
      // 复选框选择回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      // 转化财务数字
      toMoney (s, n) {
        if (!s && s !== 0) {
          return;
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },
      // 转化为大写数字
      toBigNum (num, index) {
        if (num || num === 0) {
          num = num.toFixed(2).toString();
          var numArr = num.split(".");
          if (index === -1) {
            return this.bigNumArr[parseInt(numArr[1][0])];
          } else if (index === -2) {
            return this.bigNumArr[parseInt(numArr[1][1])];
          } else {
            if (index > numArr[0].length) {
              return '';
            } else {
              return this.bigNumArr[parseInt(numArr[0].split("").reverse().join("")[index - 1])];
            }
          }
        }
      },
      // 生成报销单
      createExpense () {
        this.$refs.batchLeadTimeForm.validate((valid) => {
          if (valid) {
            this.batchLeadSeeFlag = false;
            api.post(this.apiPath.salary.findReimOrder, this.batchApplyResult.wageBaseIds).then(res => {
              if (res.code === 'CPYY-00001') {
                let resData = res.data;
                let lengthNum = resData.reimOrderItems.length;
                if (lengthNum < 5) {
                  for (var i  = 0; i < 5 - lengthNum; i++) {
                    resData.reimOrderItems.push({empty: true});
                  }
                }
                this.expenInfoData = resData;
              }
            }).catch(err => {
              console.log(err);
            });
            this.reimbFalg = true;
          }
        });
      },
      // 修改费用所属期
      modifyTimeFun () {
        if (this.checkedArr.length === 0) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.modifyTimeForm.feeDateNoString = new Date();
          this.modifyFlagVisible = true;
        }
      },
      // 提交费用所属期
      submitModifyTime () {
        this.$refs.modifyTimeForm.validate((valid) => {
          let arr = this.checkedArr.map(function (item) {
            return item.wageBaseId;
          });
          api.post(this.apiPath.salary.updateFeeDateNo, {wageBaseIds: arr, feeDateNoString: Vue.filter('date')(this.modifyTimeForm.feeDateNoString, 'yyyy-MM')}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.modifyFlagVisible = false;
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      // 确认申请支付
      sureApplyPay () {
        let obj = {
          reimAmoTotal: this.expenInfoData.reimAmoTotal,
          reimPerId: this.expenInfoData.reimPerId,
          reimOrderItems: [],
          wageBaseIds: [],
          chargePerId: this.expenInfoData.chargePerId,
          reviewPerId: this.expenInfoData.reviewPerId,
          fnncAppId: this.expenInfoData.fnncAppId,
          depAppId: this.expenInfoData.depAppId,
          loanAmo: this.expenInfoData.loanAmo,
          refundAmo: this.expenInfoData.refundAmo,
          patchAmo: this.expenInfoData.patchAmo,
          cashierPerId: this.expenInfoData.cashierPerId,
          operatorId: this.expenInfoData.operatorId,
          feeDateNoString: Vue.filter('date')(this.batchLeadTimeForm.feeDateNoString, 'yyyy-MM')

        };
        for (var i = 0; i < this.expenInfoData.reimOrderItems.length; i++) {
          if (!this.expenInfoData.reimOrderItems[i].empty) {
            obj.reimOrderItems.push(this.expenInfoData.reimOrderItems[i]);
            obj.wageBaseIds.push(this.expenInfoData.reimOrderItems[i].wageBaseId);
          }
        }
        if (this.expenInfoData.reimTimeY && this.expenInfoData.reimTimeM && this.expenInfoData.reimTimeD) {
          obj.reimDate = this.expenInfoData.reimTimeY + '-' + this.expenInfoData.reimTimeM + '-' + this.expenInfoData.reimTimeD;
        }
        api.post(this.apiPath.salary.saveReimOrder, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$alert('您已成功申请支付，<br/>报销单编号：' + res.data, '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning',
              dragFlag: true,
              customClass: '',
              lockScroll: true,
              callback: action => {}
            });
            this.reimbFalg = false;
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 一级查询
      searchButFun () {
        this.page.pageNum = 1;
        this.searchFun();
      },
      // 查询
      searchFun () {
        var dataObj = JSON.parse(JSON.stringify(this.entOrderForm));
        // dataObj.creYm = Vue.filter('date')(dataObj.creYm, 'yyyyMM');
        dataObj.feeDateNo = Vue.filter('date')(dataObj.feeDateNo, 'yyyyMM');
        // dataObj.declDateStart = Vue.filter('date')(dataObj.declDateStart, 'yyyyMMdd');
        // dataObj.declDateEnd = Vue.filter('date')(dataObj.declDateEnd, 'yyyyMMdd');
        var obj = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          data: dataObj
        };
        console.log(dataObj);
        api.post(this.apiPath.salary.findPerIncomeTaxAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.entTableData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 待维护人数下载
      downloadButton (url) {
        api.download(url);
      },
      // 查看明细确定
      onClose () {
        this.seeItemFlag = false;
      },
      // 查看明细
      seeFun (scope) {
        let _this = this;
        api.post(_this.apiPath.salary.findWageDet, scope).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.seeItemFlag = true;
            _this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style scoped>
 .usermanage .sino-translate li{margin-bottom: 20px}
</style>
