<template>
  <!--社保实做查询-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="社保实做查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="searchForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人编号：" class="search-inner-item" prop="perComCode">
                <sino-input class="fl" type="text"
                            v-model="searchForm.perComCode"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="业务年度：" class="search-inner-item" prop="natYear">
                <sino-date-picker
                  v-model="searchForm.natYear"
                  type="year"
                  :picker-options="pickerOptionsEnd"
                  :editable="false"
                  :readonly="false">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-if="searchFlag">
                <li class="li-wid">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :token="token"
                                 :chooseName.sync="searchForm.custName"
                                 :chooseId.sync="searchForm.custId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :token="token"
                                 :chooseName.sync="searchForm.signSuppName"
                                 :chooseId.sync="searchForm.signSuppId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('searchForm')" v-if="searchFlag">重 置</sino-button>
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
        <sino-title type="levelTwo" title="年账户" class="year-data"></sino-title>
        <div class="sino-queryspan fl mt15">
          <span>年缴费基数合计：<em>￥{{perYearRadixTotal || 0}}</em>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            年缴纳合计：<em>￥{{payYearTotal || 0}}</em>
          </span>
        </div>
        <sino-auto-table :data="yearData" class="mail-table mt15 radio-style-table" border max-height="416" stripe v-on:viewAll="viewAllYear(yearPage.pageNum, yearPage.pageSize)" v-on:select="selectYear">
          <sino-table-column type="selection" min-width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="105"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="200"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="busiCustName" label="客户名称" min-width="120"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="150"></sino-table-column>
          <sino-table-column prop="natMon" label="业务年度"></sino-table-column>
          <sino-table-column prop="executeMon" label="缴费年度"></sino-table-column>
          <sino-table-column prop="monNum" label="月数"></sino-table-column>
          <sino-table-column prop="perYearRadix" label="年缴纳基数" type="money" width="120"></sino-table-column>
          <sino-table-column prop="perYearPay" align="center" type="money" label="个人缴纳额" width="150"></sino-table-column>
          <sino-table-column prop="unitYearPay" type="money" align="center" label="单位缴纳额" width="150"></sino-table-column>
          <sino-table-column prop="payTotal" type="money" align="center" label="缴纳总计" width="150"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="yearPage.pageNum"
                   v-bind:page-size="yearPage.pageSize"
                   v-on:pagehandler="pageHandlerYear"
                   :pageArray="yearPage.pageArray"
                   v-on:choosePageFun="choooseNumYear"
                   v-bind:object="object"
                   :total="yearPage.total"></sino-page>
        <!--月账户-->
        <sino-title type="levelTwo" title="月账户" class="year-data"></sino-title>
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="exportFun" v-if="false"><i class="iconfont sino-export"></i>导出</sino-button>
          </div>
        </div>
        <sino-auto-table :data="mothData" class="mail-table mt15 radio-style-table" border max-height="416" stripe v-on:viewAll="viewAllMoth(mothPage.pageNum, mothPage.pageSize)" v-on:select="selectMonth">
          <sino-table-column type="selection" min-width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="105"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="200"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="busiCustName" label="客户名称" min-width="150"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="120"></sino-table-column>
          <sino-table-column prop="natMon" label="业务年月" min-width="180"></sino-table-column>
          <sino-table-column prop="pensSinsState" label="养老申报类型" min-width="150"></sino-table-column>
          <sino-table-column prop="pensPerRadix" type="money" label="养老基数" width="150"></sino-table-column>
          <sino-table-column prop="pensPerPay" type="money" label="养老个人缴纳" width="120"></sino-table-column>
          <sino-table-column prop="pensUnitPay" type="money" label="养老单位缴纳" width="160"></sino-table-column>
          <sino-table-column prop="unempSinsState" label="失业申报类型" min-width="160"></sino-table-column>
          <sino-table-column prop="unempPerRadix" align="center" type="money" label="失业基数" width="150"></sino-table-column>
          <sino-table-column prop="unempPerPay" type="money" label="失业个人缴纳" width="160"></sino-table-column>
          <sino-table-column prop="unempUnitPay" type="money" label="失业单位缴纳" width="160"></sino-table-column>
          <sino-table-column prop="injSinsState" label="工伤申报类型" min-width="160"></sino-table-column>
          <sino-table-column prop="injPerRadix" align="center" type="money" label="工伤基数" width="150"></sino-table-column>
          <sino-table-column prop="injPerPay" type="money"  label="工伤个人缴纳" width="160"></sino-table-column>
          <sino-table-column prop="injUnitPay" type="money" label="工伤单位缴纳" width="160"></sino-table-column>
          <sino-table-column prop="mateSinsState" label="生育申报类型" min-width="160"></sino-table-column>
          <sino-table-column prop="metePerRadix" align="center" type="money" label="生育基数" width="150"></sino-table-column>
          <sino-table-column prop="metePerPay" type="money" label="生育个人缴纳" width="160"></sino-table-column>
          <sino-table-column prop="meteUnitPay" type="money" label="生育单位缴纳" width="160"></sino-table-column>
          <sino-table-column prop="mediSinsState" label="医疗申报类型" min-width="160"></sino-table-column>
          <sino-table-column prop="mediPerRadix" align="center" type="money" label="医疗基数" width="150"></sino-table-column>
          <sino-table-column prop="mediPerPay" type="money" label="医疗个人缴纳" width="160"></sino-table-column>
          <sino-table-column prop="mediUnitPay" type="money" label="医疗单位缴纳" width="160"></sino-table-column>
          <sino-table-column prop="busiName" label="业务员" min-width="160"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="mothPage.pageNum"
                   v-bind:page-size="mothPage.pageSize"
                   v-on:pagehandler="pageHandlerMoth"
                   :pageArray="mothPage.pageArray"
                   v-on:choosePageFun="choooseNumMoth"
                   v-bind:object="object"
                   :total="mothPage.total"></sino-page>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  export default {
    data () {
      return {
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox,  // g
        token: Cookie.get("Token"),
        searchFlag: false,
        searchForm: {
          empName: '',
          certNo: '',
          perComCode: '',
          natYear: '',
          custId: '',
          custName: '',
          signSuppId: '',
          signSuppName: ''
        },
        // 年账户数据
        yearData: null,
        // 月账户数据
        mothData: null,
        // 年账户数据翻页
        yearPage: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
        },
        // 月账户数据翻页
        mothPage: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
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
        checkedArr: [],
        checkedMonthArr: [],
        perYearRadixTotal: '',
        payYearTotal: '',
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.searchForm.natYear);
          }
        }
      };
    },
    mounted () {
      this.searchForm.natYear = new Date();
      this.searchForm.natYear = Vue.filter('date')(this.searchForm.natYear, 'yyyy');
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 选中列表中的一条数据
      selectYear (selectTion) {
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedArr = selectTion;
        this.mothPage.pageNum = 1;
        if (this.checkedArr.length !== 0) {
          this.viewAllMoth(this.mothPage.pageNum, this.mothPage.pageSize, this.checkedArr[0]);
        } else {
          this.mothData = [];
        }
      },
      selectMonth (selectTion) {
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedMonthArr = selectTion;
      },
      // 查询
      searchFun () {
        if (this.searchForm.certNo === '' && this.searchForm.perComCode === '' && this.searchForm.custId === '' && this.searchForm.signSuppId === '') {
          this.$alert('查询条件的证件号码、个人编号、客户名称、签约供应商必填其一', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
        this.yearPage.pageNum = 1;
        this.viewAllYear(this.yearPage.pageNum, this.yearPage.pageSize);
      },
      // 年
      viewAllYear (pageNum, pageSize) {
        if (this.searchForm.natYear !== '') {
          this.searchForm.natYear = Vue.filter('date')(this.searchForm.natYear, 'yyyy');
        }
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchForm
        };
        api.post(this.apiPath.sins.findImpleDataByYear, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.yearData = res.data.list;
            this.yearPage.total = res.data.total;
            this.perYearRadixTotal = this.toMoney(this.yearData[this.yearData.length - 1].perYearRadixTotal);
            this.payYearTotal = this.toMoney(this.yearData[this.yearData.length - 1].payYearTotal);
            if (this.searchForm.natYear !== '') {
              this.searchForm.natYear = new Date(this.searchForm.natYear);
            }
          } else {
            if (this.searchForm.natYear !== '') {
              this.searchForm.natYear = new Date(this.searchForm.natYear);
            }
          }
        });
      },
      // 月
      viewAllMoth (pageNum, pageSize, str) {
        console.log('进入月的搜索');
        if (str === '' || str === undefined) {
          this.$alert('请选择一条年账户信息', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: str
        };
        api.post(this.apiPath.sins.findImpleDataByMon, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mothData = res.data.list;
            this.mothPage.total = res.data.total;
          }
        });
      },
      pageHandlerYear (pageNum) {
        this.yearPage.pageNum = pageNum;
        this.viewAllYear(this.yearPage.pageNum, this.yearPage.pageSize);
      },
      choooseNumYear (pageSize) {
        this.yearPage.pageSize = pageSize;
        this.yearPage.pageNum = 1;
        this.viewAllYear(this.yearPage.pageNum, this.yearPage.pageSize);
      },
      pageHandlerMoth (pageNum) {
        this.mothPage.pageNum = pageNum;
        this.viewAllMoth(this.mothPage.pageNum, this.mothPage.pageSize, this.checkedArr[0]);
      },
      choooseNumMoth (pageSize) {
        this.mothPage.pageSize = pageSize;
        this.mothPage.pageNum = 1;
        this.viewAllMoth(this.mothPage.pageNum, this.mothPage.pageSize, this.checkedArr[0]);
      },
      // 导出
      exportFun () {},
      // 金额千位符
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
      // reset
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
