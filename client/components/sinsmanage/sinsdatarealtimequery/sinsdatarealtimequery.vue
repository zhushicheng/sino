<template>
  <!--<div>社保数据实时查询</div>-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="社保数据查询"></sino-title>
      <sino-form :model="sinsCardForm" ref="sinsCardForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li>
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="sinsCardForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="sinsCardForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="参保险种：" class="search-inner-item" prop="productIdList">
                <sino-checkbox-group v-model="sinsCardForm.productIdList" class="mt5">
                  <sino-checkbox class="mr10" :label="list.id" v-for="(list, index) in productIdList" :key="index">{{list.title}}</sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="业务年月：" class="search-inner-item" prop="natMon">
                <sino-date-picker
                  v-model="sinsCardForm.natMon"
                  type="month"
                  :editable="false"
                  :readonly="false">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                <sino-date-picker
                  v-model="sinsCardForm.applyMon"
                  type="month"
                  :editable="false"
                  :readonly="false">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li>
                  <sino-form-item label="执行地区：" class="search-inner-item" prop="executeAreaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="areaUrl"
                                 :data="{data: {busiAreaTypes: [1]}}"
                                 :chooseName.sync="sinsCardForm.executeAreaName"
                                 :chooseId.sync="sinsCardForm.executeAreaId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="申报状态：" class="search-inner-item" prop="stateName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code: 'APPLY_STATE'}"
                                 :chooseName.sync="sinsCardForm.stateName"
                                 :chooseId.sync="sinsCardForm.state"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid search-inner-name">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :chooseName.sync="sinsCardForm.custName"
                                 :chooseId.sync="sinsCardForm.custId"
                                 :clear="true"
                                 :token="token"
                                 class="multiple-choice"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid search-inner-name">
                  <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :token="token"
                                 :chooseName.sync="sinsCardForm.signSuppName"
                                 :chooseId.sync="sinsCardForm.signSuppId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid search-inner-name">
                  <sino-form-item label="社保账户名称：" class="search-inner-item" prop="custSinsName">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="sinsUrl"
                                 :chooseName.sync="sinsCardForm.custSinsName"
                                 :chooseId.sync="sinsCardForm.custSinsId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="search-inner-one">
                  <sino-form-item label="单位社保账号：" class="search-inner-item" prop="unitSinsNo">
                    <sino-input class="fl" type="text"
                                v-model="sinsCardForm.unitSinsNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-button-box-1">
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
        <sino-table :data="sinsDeclData" stripe border max-height="416" v-on:viewAll="viewAll" class="mt15">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="householdProyName" label="户口性质"></sino-table-column>
          <sino-table-column prop="executeAreaName" label="执行地区"></sino-table-column>
          <sino-table-column prop="natMonNew" label="业务年月"></sino-table-column>
          <sino-table-column prop="applyMonNew" label="申报年月"></sino-table-column>
          <sino-table-column prop="sinsStateName" label="申报类型" min-width="100"></sino-table-column>
          <sino-table-column prop="productName" label="参保险种" min-width="100"></sino-table-column>
          <sino-table-column prop="stateName" label="申报状态"></sino-table-column>
          <sino-table-column prop="perRadix" label="申报基数" type="money" width="120"></sino-table-column>
          <sino-table-column prop="unitPay" label="企业缴纳" type="money" width="120"></sino-table-column>
          <sino-table-column prop="perPay" label="个人缴纳" type="money" width="120"></sino-table-column>
          <sino-table-column prop="payFeeWayName" label="缴费方式"></sino-table-column>
          <sino-table-column prop="unitSinsNo" label="单位社保帐号" min-width="180"></sino-table-column>
          <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="120"></sino-table-column>
          <sino-table-column prop="dataSourceName" label="问题人员来源" min-width="120"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="问题人员类型" min-width="120"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="busiName" label="业务员" min-width="100"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
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
        token: Cookie.get("Token"),
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        sinsUrl: this.apiPath.sins.findSinsAcctName,
        areaUrl: this.apiPath.hrsc.findAreaListByBusiAreaType,
        sinsCardForm: {
          empName: '',
          certNo: '',
          natMon: '',
          applyMon: '',
          executeAreaId: '',
          executeAreaName: '',
          state: '',
          stateName: '',
          custId: '',
          custName: '',
          signSuppId: '',
          signSuppName: '',
          custSinsId: '',
          custSinsName: '',
          unitSinsNo: '',
          productIdList: []
        },
        productIdList: [],
        searchFlag: false,
        sinsDeclData: null, // 养老
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
        }
      };
    },
    mounted () {
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'SINS_PRO_PAY_TYPE'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.productIdList = res.data.list;
          this.sinsCardForm.productIdList = [4];
        }
      });
      this.sinsCardForm.applyMon = new Date();
      this.sinsCardForm.applyMon = Vue.filter('date')(this.sinsCardForm.applyMon, 'yyyy-MM');
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.sinsCardForm
        };
        obj.data.natMon = Vue.filter('date')(this.sinsCardForm.natMon, 'yyyy-MM');
        obj.data.applyMon = Vue.filter('date')(this.sinsCardForm.applyMon, 'yyyy-MM');
        api.post(this.apiPath.sins.findActualData, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          }
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun () {
        this.$refs.sinsCardForm.resetFields();
      }
    }
  };
</script>

