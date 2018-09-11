<template>
  <!--查看账单明细-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="账单明细查询"></sino-title>
      <sino-form :model="billDetaForm" ref="billDetaForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="billDetaForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item class="search-inner-item" prop="creStartDate" label="费用所属年月：">
                <sino-date-picker class="fl"
                                  v-model="billDetaForm.busiYm"
                                  type="month"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun()"><i class="iconfont sino-add"></i>下载账单明细</sino-button>
          </div>
        </div>
        <sino-table :data="billData" style="width: 100%" v-on:viewAll="viewAll" border stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column :prop="item.colName" :label="item.chName" v-for="(item, index) in tableTitle" :key="index"
                             v-if="!item.isHaveGroupCodt" min-width="150"></sino-table-column>
          <sino-table-column prop="date" :label="item.chName" min-width="150" align="center" label-class-name="tab-hea-co"
                             v-if="item.isHaveGroupCodt" v-for="(item, index) in tableTitle" :key="index">
            <sino-table-column :prop="_item.colName" :label="_item.chName" min-width="150" label-class-name="tab-hea-co"
                               v-for="(_item, index) in item.secondHeadList" :key="index"></sino-table-column>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum"
                   v-bind:page-size="page.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api';
  import Vue from 'vue';
  export default {
    data () {
      return {
        isA: true,
        tableTitle: [],
        // 最上面的查询的数据
        billDetaForm: {
          chargeBillNo: '',
          chargeBillTempId: '',
          chargeBillId: '',
          certNo: '',
          busiYm: '',
          custOrSupp: true
        },
        // 表格数据
        billData: null,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
        },
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
    created () {
      this.billDetaForm.chargeBillId = this.$route.query.chargeBillId;
      this.billDetaForm.chargeBillTempId = this.$route.query.chargeBillTempId;
      this.billDetaForm.chargeBillNo = this.$route.query.chargeBillNo;
      this.searchFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      addFun () {
        let ChargeBilSupp = JSON.parse(JSON.stringify(this.billData));
        ChargeBilSupp.map(item => {
          item.SORT_NO = null;
          return item;
        });
        var obj = {
          chargeBillTempId: this.billDetaForm.chargeBillTempId,
          chargeBillNo: this.billDetaForm.chargeBillNo,
          chargeBillId: this.billDetaForm.chargeBillId,
          conSignObj: 2,
          list: ChargeBilSupp
        };
        // obj.chargeBillIdList.push(this.billDetaForm.chargeBillId);
        // ChargeBilSuppId.push(obj);
        api.post(this.apiPath.hrsc.downloadDet, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 最上面的查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.billDetaForm
        };
        this.billDetaForm.busiYm = Vue.filter('date')(this.billDetaForm.busiYm, 'yyyy-MM');
        api.post(this.apiPath.hrsc.findAllBillDet, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.billData = res.data.pageInfo.list;
            this.tableTitle = res.data.headList;
            this.page.total = res.data.pageInfo.total;
            console.log(this.tableTitle);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      choooseNum: function (pageSize) {
        this.page.pageSize = pageSize;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      }
    }
  };
</script>
