<template>
  <!--<div>公积金缴纳查询</div>-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="公积金缴纳查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
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
            <li class="search-inner-name">
              <sino-form-item label="个人帐号：" class="search-inner-item" prop="perNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.perNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="执行地区：" class="search-inner-item" prop="execuAreaName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="apiPath.hrsc.findAreaListByBusiAreaType"
                             :data="{data: {busiAreaTypes:[1]}}"
                             :chooseName.sync="searchForm.execuAreaName"
                             :chooseId.sync="searchForm.execuAreaId"
                             :clear="true">
                </sino-select>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li>
                  <sino-form-item label="业务年度：" class="search-inner-item" prop="paymentYear">
                    <sino-date-picker
                      v-model="searchForm.paymentYear"
                      type="year"
                      format="yyyy"
                      :editable="false"
                      :readonly="false">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务月份：" class="search-inner-item" prop="paymentMon">
                    <sino-date-picker
                      popper-class="no-have-year"
                      v-model="searchForm.paymentMon"
                      type="month"
                      format="MM"
                      :editable="false"
                      :readonly="false">
                    </sino-date-picker>
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
                                 :url="apiPath.hrsc.findCustSelectInfo1"
                                 :chooseName.sync="searchForm.custName"
                                 :chooseId.sync="searchForm.custId"
                                 :clear="true"
                                 :token="token"
                                 class="multiple-choice"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid search-inner-name">
                  <sino-form-item label="签约供应商：" class="search-inner-item" prop="ordSendSuppName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="apiPath.hrsc.selectBox"
                                 :chooseName.sync="searchForm.ordSendSuppName"
                                 :chooseId.sync="searchForm.ordSendSuppId"
                                 :clear="true"
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
            <sino-button class="ressetButton" @click="resetFun()">重 置</sino-button>
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
         <div class="sino-table-icon-button">
            <sino-button type="icon-text" @click="exportFun"><i class="iconfont sino-export"></i>导出</sino-button>
         </div>
         <div class="sino-queryspan-vla">
          <span>合计：<em>{{total? total : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{checkedArr.length}}</em> 条
          </span>
         </div>
        <sino-table :data="QuesPerData" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perNo" label="个人帐号" min-width="120"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="ordSendSuppName" label="签约供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="paymentYear" label="业务年度" min-width="100"></sino-table-column>
          <sino-table-column prop="natMon" label="业务月份" min-width="100"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="100"></sino-table-column>
          <sino-table-column prop="accuProp" label="比例（%）" min-width="100"></sino-table-column>
          <sino-table-column prop="perBase" label="申报基数" width="150" type="money"></sino-table-column>
          <sino-table-column prop="entPayAmo" label="企业缴纳" width="150" type="money"></sino-table-column>
          <sino-table-column prop="perPayAmo" label="个人缴纳" width="150" type="money"></sino-table-column>
          <sino-table-column prop="payAmoTotal" label="缴纳合计" width="150" type="money"></sino-table-column>
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
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        findSalesmanSelectBox: '',
        token: Cookie.get("Token"),
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        checkedArr: [],
        searchForm: {
          empName: '',
          certNo: '',
          perNo: '',
          execuAreaName: '',
          execuAreaId: '',
          paymentYear: new Date(),
          paymentMon: '',
          custName: '',
          custId: '',
          ordSendSuppName: '',
          ordSendSuppId: ''
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
        searchFlag: false
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 导入
      exportFun () {
        let objJson = JSON.parse(JSON.stringify(this.searchForm));
        if (objJson.paymentYear) {
          objJson.paymentYear = Vue.filter('date')(objJson.paymentYear, 'yyyy');
        }
        if (objJson.paymentMon) {
          objJson.paymentMon = Vue.filter('date')(objJson.paymentMon, 'MM');
        }
        var obj = {
          impleDataDto: objJson,
          impleDataList: this.checkedArr
        };
        api.post(this.apiPath.accu.doExportAccuPay, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      importCardFun () {  },
      // 选中回调
      selectCallBack (selectTion) {
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      // 重置
      resetFun () {
        this.$refs.searchForm.resetFields();
      },
      // 查看全部方法
      viewAll (pageNum, pageSize) {
        let objJson = JSON.parse(JSON.stringify(this.searchForm));
        if (objJson.paymentYear) {
          objJson.paymentYear = Vue.filter('date')(objJson.paymentYear, 'yyyy');
        }
        if (objJson.paymentMon) {
          objJson.paymentMon = Vue.filter('date')(objJson.paymentMon, 'MM');
        }
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: objJson
        };
        api.post(this.apiPath.accu.findAccuPay, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.QuesPerData = res.data.list;
            this.total = res.data.total;
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
      }
    }
  };
</script>

