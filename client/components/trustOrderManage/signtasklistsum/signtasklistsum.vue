<template>
  <div class="leads usermanage entrusted-box">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">任务单汇总</div>
          <div class="sino-tabs-item" @click="changeTabFun('first')">任务单明细</div>
        </div>
      </div>
    </div>
    <sino-con >
      <sino-form :model="searchForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">签约供应商简称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchForm.orgName" :chooseId.sync="searchForm.orgId"  :clear="true" :url="bankTypeUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">付费供应商名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchForm.orgName" :chooseId.sync="searchForm.orgId"  :clear="true" :url="bankTypeUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li >
              <span class="search-inner-name">客户名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :token="token"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchForm.orgName" :chooseId.sync="searchForm.orgId" :clear="true" :url="bankTypeUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li >
              <span class="search-inner-name">雇员姓名：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchForm.orgName" :chooseId.sync="searchForm.orgId"  :clear="true" :url="bankTypeUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li >
              <span class="search-inner-name">证件类型：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchForm.orgName" :chooseId.sync="searchForm.orgId" :clear="true" :url="bankTypeUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text" v-model="searchForm.orgName"></sino-input>
            </li>
          </ul>
          <ul class="multiple-choice inquire-btn-box">
            <li>
              <span>委托类型：</span>
              <sino-checkbox-group v-model="commissionedData" class="entrusted-multiple-chekck ">
                <sino-checkbox v-for="(commissioned, index) in commissioneditems" :key="index" :label="commissioned">{{commissioned.name}}<sino-badge :value=commissioned.number></sino-badge></sino-checkbox>
              </sino-checkbox-group>
            </li>
            <li>
              <span>重复数据：</span>
              <sino-checkbox-group v-model="personnelData" @change="handlepersonnelDataChange" class="entrusted-multiple-chekck">
                <sino-checkbox :indeterminate="personnelDataAll" v-model="personnelDataList" @change="handleCheckAllChange">全部<sino-badge :value='6'></sino-badge></sino-checkbox>
                <sino-checkbox v-for="(personnel, index) in personnelitems" :label="personnel" :key="index">{{personnel.name}}<sino-badge :value=personnel.number></sino-badge></sino-checkbox>
              </sino-checkbox-group>
            </li>
            <li>
              <span>变更类型：</span>
              <sino-checkbox-group v-model="changeData" @change="handleChange" class="entrusted-multiple-chekck">
                <sino-checkbox :indeterminate="changeDataAll" v-model="changeDataList" @change="handleCheck">全部<sino-badge :value='7'></sino-badge></sino-checkbox>
                <sino-checkbox v-for="(changep, index) in changeitems" :label="changep" :key="index">{{changep.name}}<sino-badge :value=changep.number></sino-badge></sino-checkbox>
              </sino-checkbox-group>
            </li>
          </ul>

        </div>
        <div class="search-button">
          <div class="search-button-box search-two-button-box">
            <sino-button type="primary" class="inquire-btn" @click="searchFun">查 询</sino-button>
            <sino-button>重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" >
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" ><i class="iconfont sino-queren"></i>确认</sino-button>
            <sino-button type="icon-text" ><i class="iconfont sino-invalid"></i>拒绝</sino-button>
            <sino-button type="icon-text" ><i class="iconfont sino-zhihangjilu"></i>本月执行</sino-button>
            <sino-button type="icon-text" ><i class="iconfont sino-zhihangjilu"></i>下月执行</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" style="width:100%" stripe @select="selectTabelRow">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="60"></sino-table-column>
          <sino-table-column prop="acctBankName" label="发布批次"></sino-table-column>
          <sino-table-column prop="suppName" label="付费供应商简称" width="180"></sino-table-column>
          <sino-table-column prop="suppNo" label="客户名称"  width="180"></sino-table-column>
          <sino-table-column prop="taxPayerNo" label="委托类型"></sino-table-column>
          <sino-table-column prop="taxpayerTypeDict" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="vatBankName" label="订单开始日期" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="订单结束日期" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="执行地区"></sino-table-column>
          <sino-table-column prop="acctBankName" label="社保申报基数" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="社保起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="社保止做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="公积金申报基数" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="公积金比例"></sino-table-column>
          <sino-table-column prop="acctBankName" label="公积金起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="公积金止做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="证件类型"></sino-table-column>
          <sino-table-column prop="acctBankName" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="acctBankName" label="离职原因"></sino-table-column>
          <sino-table-column prop="acctBankName" label="户口性质"></sino-table-column>
          <sino-table-column prop="acctBankName" label="供应商撤离状态" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankName" label="签约供应商简称" min-width="180"></sino-table-column>
          <sino-table-column label="操作" align="center" width="60" fixed="right">
            <template scope="scope">
              <template>
                <span class="table-span">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie';
  import api from '../../../api/index';
  let checkedArr = '';
  const personnelOptions = [
    {
      name: '增员',
      number: 1
    },
    {
      name: '减员',
      number: 2
    },
    {
      name: '变更',
      number: 3}
  ];
  const commissionedOptions = [
    {
      name: '增员',
      number: 1
    },
    {
      name: '减员',
      number: 2
    },
    {
      name: '变更',
      number: 3
    },
    {
      name: '年度调整',
      number: 4
    },
    {
      name: '一次性收费',
      number: 5
    }
  ];
  const changeOptions = [
    {
      name: '新增产品',
      number: 1
    },
    {
      name: '减少产品',
      number: 2
    },
    {
      name: '调整价格',
      number: 3
    },
    {
      name: '调整基数',
      number: 4
    }];
  export default {
    components: {},
    data () {
      return {
        bankTypeUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        token: Cookies.get('Token'),
        tableData: null,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        seeItem: false, // 查看弹层控制显示
        seeDirData: {}, // 查看弹层的数据
        personnelDataList: false,
        changeDataList: false,
        personnelData: [],
        changeData: [],
        commissionedData: [],
        personnelitems: personnelOptions,
        changeitems: changeOptions,
        commissioneditems: commissionedOptions,
        personnelDataAll: true,
        changeDataAll: true,
        searchForm: { // 搜索条件
          suppName: '',
          suppId: '',
          bankName: ''
        }
      };
    },
//    created () {
//      api.post(this.dictSelUrl, {code: 'SCREEN_DIMENSION'}).then(res => {
//        this.trackStatus = res.data.list;
//        console.log(JSON.stringify(this.trackStatus));
//      }).catch(err => {
//        console.log(err);
//      });
//    },
    mounted () {
      let that = this;
      window.onresize = () => {
        that.screeWidth = document.body.clientWidth;
      };
    },
    destroyed () {
      window.onresize = null;
    },
    methods: {
      changeTabFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/signtasklistdetail'});
        }
      },
      selectTabelRow (selection, row) {
        checkedArr = selection;
      },
      handleCheckAllChange (val) {
        this.personnelData = val ? personnelOptions : [];
        this.personnelDataAll = false;
      },
      handlepersonnelDataChange (value) {
        let checkedCount = value.length;
        this.personnelDataList = checkedCount === this.personnelitems.length;
        this.personnelDataAll = checkedCount > 0 && checkedCount < this.personnelitems.length;
      },
      handleCheck (val) {
        this.changeData = val ? changeOptions : [];
        this.changeDataAll = false;
      },
      handleChange (value) {
        let checkedCount = value.length;
        this.changeDataList = checkedCount === this.changeitems.length;
        this.changeDataAll = checkedCount > 0 && checkedCount < this.changeitems.length;
      },
      searchFun () {
        console.log(this.searchForm);
        this.page.pageNum = 1;
        this.getList();
      },
      getList () {
        let obj = {};
        obj.data = this.searchForm;
//        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.listSuppInvInfo, obj).then(res => {
//          console.log(res.data.list);
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum (pageSize) {
        //        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      }
    }
  };
</script>
