<template>
  <!--支付管理-->
  <div>
    <div class="usermanage">
      <sino-con>
        <sino-title type="levelOne" title="邮寄信息查询"></sino-title>
        <sino-form :model="searchForm" ref="ruleForm" class="serch-form leads-serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one costcenter-width">
                <span class="search-inner-name">客户/供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :token="token"
                             :url="apiPath.hrsc.billSuppCust"
                             :chooseName.sync="searchForm.custOrSuppName"
                             :chooseId.sync="searchForm.custOrSuppId" :clear="true"
                             :contentChange="contentChange"
                ></sino-select>
              </li>
              <li>
                <span class="search-inner-name">快递公司：</span>
                <sino-select class="fl special-select-color"
                             :filterable="true"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="searchForm.trackingCompanyNameList"
                             :chooseId.sync="searchForm.trackingCompanyList"
                             :clear="true"
                             :data="{code: 'TRACKING_COMPANY'}"
                             :url="selUrl"
                ></sino-select>
              </li>
              <li>
                <span class="search-inner-name">快递单号：</span>
                <sino-input class="fl" v-model="searchForm.trackingNumber"></sino-input>
              </li>
              <li class="costcenter-width">
                <span class="search-inner-name">快递日期：</span>
                <sino-date-picker class="fl"
                                  type="date"
                                  :picker-options="pickerOptionsBeg"
                                  v-model="searchForm.trackingDateBeg"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
                <span class="fl string-zhi">至</span>
                <sino-date-picker class="fl"
                                  type="date"
                                  :picker-options="pickerOptionsEnd"
                                  v-model="searchForm.trackingDateEnd"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchButFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetForm">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <ul class="string-post-ul">
              <li class="fl" v-if="tableData.trackingCompanyRe">快递公司：<span v-text="tableData.trackingCompanyRe"></span></li>
              <li class="fl" v-if="tableData.trackingNum">快递份数：<span class="post-num" v-text="tableData.trackingNum"></span></li>
              <li class="fr" v-if="tableData.trackingAmoTotal">总计金额：<span class="post-money">￥{{toMoney(tableData.trackingAmoTotal)}}</span></li>
            </ul>
          </div>
          <sino-table :data="tableData.trackingInfoPageInfo.list" max-height="416" v-on:viewAll="viewAll" border stripe>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="trackingCompanyName" label="快递公司" min-width="100"></sino-table-column>
            <sino-table-column prop="trackingNumber" label="快递单号" min-width="120"></sino-table-column>
            <sino-table-column prop="ownAreaName" label="所属地区" min-width="80"></sino-table-column>
            <sino-table-column prop="trackingMoney" label="快递金额" width="150" type="money"></sino-table-column>
            <sino-table-column prop="trackingMan" label="邮寄人" min-width="100"></sino-table-column>
            <sino-table-column prop="trackingDate" label="邮寄日期" min-width="100"></sino-table-column>
            <sino-table-column prop="custOrSuppName" label="客户/供应商名称" min-width="180"></sino-table-column>
            <sino-table-column prop="recipients" label="收件人" min-width="100"></sino-table-column>
            <sino-table-column prop="telephoneNumber" label="联系电话" min-width="100"></sino-table-column>
            <sino-table-column prop="deliveryAddress" label="邮寄地址" min-width="300"></sino-table-column>
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
    </div>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  let checkedArr = '';
  export default {
    data () {
      return {
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() > new Date(this.searchForm.trackingDateEnd);
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.searchForm.trackingDateBeg);
          }
        },
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookie.get('Token'),
        searchForm: {
          custOrSuppName: '',
          custOrSuppId: '',
          custOrSuppType: '',
          trackingCompanyNameList: [],
          trackingCompanyList: [],
          trackingNumber: '',
          trackingDateBeg: '',
          trackingDateEnd: ''
        },
        tableData: {
          trackingCompanyRe: '',
          trackingNum: '',
          trackingAmoTotal: '',
          trackingInfoPageInfo: {list: null}
        },
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: { // 表格配置
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
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      contentChange (item) {
        this.searchForm.custOrSuppType = item.flag;
      },
      viewAll () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: {}
        };
        api.post(this.apiPath.hrsc.getCtrackingInvCombiantion, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data;
            this.total = res.data.trackingInfoPageInfo.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchButFun () {
        this.pageNum = 1;
        this.searchFun();
      },
      searchFun () {
        let objJson = JSON.parse(JSON.stringify(this.searchForm));
        if (objJson.trackingDateBeg) {
          objJson.trackingDateBeg = Vue.filter('date')(objJson.trackingDateBeg, 'yyyy-MM-dd');
        }
        if (objJson.trackingDateEnd) {
          objJson.trackingDateEnd = Vue.filter('date')(objJson.trackingDateEnd, 'yyyy-MM-dd');
        }
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: objJson
        };
        api.post(this.apiPath.hrsc.getCtrackingInvCombiantion, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data;
            this.total = res.data.trackingInfoPageInfo.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.searchFun();
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchFun();
      },
      // 重置表单
      resetForm () {
        for (var i in this.searchForm) {
          if (Array.isArray(this.searchForm[i])) {
            this.searchForm[i] = [];
          } else {
            this.searchForm[i] = '';
          }
          this.searchButFun();
        }
      },
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
      }
    }
  };
</script>
