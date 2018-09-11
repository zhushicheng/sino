<template>
  <!--任务单明细-->
  <div class="leads usermanage entrusted-box">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="changeTabFun('second')">任务单汇总</div>
          <div class="sino-tabs-item is-active">任务单明细</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box clearfix">
            <li class="search-inner-one">
              <sino-form-item label="签约供应商简称：" class="search-inner-item" prop="signSuppName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :token="token"
                             :url="selectBox"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="searchForm.signSuppName"
                             :chooseId.sync="searchForm.signSuppId"
                             :clear="true"
                ></sino-select>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="付费供应商名称：" class="search-inner-item" prop="paySuppName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :token="token"
                             :isGroup="false"
                             :chooseName.sync="searchForm.paySuppName"
                             :chooseId.sync="searchForm.paySuppId"
                             :clear="true"
                             :url="selectBox"></sino-select>
              </sino-form-item>
            </li>
            <li >
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :token="token"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="searchForm.custName"
                             :chooseId.sync="searchForm.custId"
                             :clear="true"
                             :url="custUrl"></sino-select>
              </sino-form-item>
            </li>
            <li >
              <sino-form-item label="产品名称：" class="search-inner-item" prop="prodName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :token="token"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="prodUrl"
                             :chooseName.sync="searchForm.prodName"
                             :chooseId.sync="searchForm.prodId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li >
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text" v-model="searchForm.empName"></sino-input>
              </sino-form-item>
            </li>
            <li >
              <sino-form-item label="证件类型：" class="search-inner-item" prop="certTypeDict">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :token="token"
                             :isGroup="false"
                             :chooseName.sync="searchForm.certTypeDict"
                             :chooseId.sync="searchForm.certType"
                             :clear="true"
                             :url="dictSelUrl"
                             :data="{code:'CERT_TYPE'}"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text" v-model="searchForm.certNo"></sino-input>
              </sino-form-item>
            </li>
          </ul>
          <ul class="multiple-choice inquire-btn-box">
            <li>
              <sino-form-item label="委托类型：" class="search-inner-item" prop="entrustTypes">
                <sino-checkbox-group v-model="searchForm.entrustTypes" class="entrusted-multiple-chekck mt5">
                  <sino-checkbox v-for="(commissioned, index) in entrustOptions" :key="index" :label="commissioned.id">{{commissioned.name}}<sino-badge :value=commissioned.number></sino-badge></sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="调整类型：" class="search-inner-item" prop="taskChgTypes">
                <sino-checkbox class="mt5" :indeterminate="changeDataAll" v-model="taskChgTypesFlag" @change="handleCheck">全部<sino-badge :value='badgeValue'></sino-badge></sino-checkbox>
                <sino-checkbox-group v-model="searchForm.taskChgTypes" @change="handleChange" class="entrusted-multiple-chekck mt5">
                  <sino-checkbox v-for="(changep, index) in taskChgOptions" :key="index" :label="changep.id">{{changep.name}}<sino-badge :value=changep.number></sino-badge></sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
          </ul>

        </div>
        <div class="search-button">
          <div class="search-button-box search-two-button-box">
            <sino-button type="primary" class="inquire-btn" @click="searchFun">查 询</sino-button>
            <sino-button @click="resetFun('searchForm')">重置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList sino-mission">
      <div class="sino-table-total">
        <sino-title type="levelTwo" title="服务费"></sino-title>
        <sino-table :data="tableDataOne" max-height="416" v-on:viewAll="getList" stripe @select="selectTabelRow" border>
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="60"></sino-table-column>
          <sino-table-column prop="publishBatchId" label="发布批次"></sino-table-column>
          <sino-table-column prop="paySuppName" label="付费供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="entrustTypeDict" label="委托类型"></sino-table-column>
          <sino-table-column prop="taskChgTypeDict" label="变更类型"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="prodName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="money" label="金额（元）" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="begDate" label="起做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="endDate" label="止做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区"></sino-table-column>
          <sino-table-column prop="certTypeDict" label="证件类型"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
          <sino-table-column prop="dimReason" label="离职原因"></sino-table-column>
          <sino-table-column prop="leaveState" label="上海外服撤离状态" min-width="150"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="custNo" label="供应商客户编号" min-width="130"></sino-table-column>
          <sino-table-column prop="custShortName" label="客户简称"></sino-table-column>
          <sino-table-column prop="custTel" label="客户电话" min-width="120"></sino-table-column>
          <sino-table-column prop="suppEmpNo" label="供应商员工编号" min-width="130"></sino-table-column>
          <sino-table-column prop="nationalityName" label="国籍"></sino-table-column>
          <sino-table-column prop="sexDict" label="性别"></sino-table-column>
          <sino-table-column prop="phone" label="手机号码" min-width="120"></sino-table-column>
          <sino-table-column prop="email" label="雇员邮箱" min-width="180"></sino-table-column>
          <sino-table-column prop="householdTypeDict" label="户口性质"></sino-table-column>
          <sino-table-column prop="induTypeDict" label="行业类型"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="120"></sino-table-column>
          <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="130"></sino-table-column>
          <sino-table-column prop="entrustDep" label="委托方业务部" min-width="120"></sino-table-column>
          <sino-table-column prop="entrustCont" label="委托方联系人" min-width="120"></sino-table-column>
          <sino-table-column prop="entrustRemark" label="委托方备注" min-width="180"></sino-table-column>
          <!--<sino-table-column label="操作" align="center" width="60" fixed="right">
            <template scope="scope">
              <template>
                <span class="table-span">删除</span>
              </template>
            </template>
          </sino-table-column>-->
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>

        <sino-title type="levelTwo" title="代收代付"></sino-title>
        <sino-table :data="tableDataTwo" max-height="416" v-on:viewAll="getTask" stripe @select="selectTabelRow" border>
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="60"></sino-table-column>
          <sino-table-column prop="publishBatchId" label="发布批次" width="150"></sino-table-column>
          <sino-table-column prop="paySuppName" label="付费供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="entrustTypeDict" label="委托类型"></sino-table-column>
          <sino-table-column prop="taskChgTypeDict" label="变更类型"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="prodName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="money" label="金额（元）" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="begDate" label="起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="endDate" label="止做日期" min-width="130"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="180"></sino-table-column>
          <sino-table-column prop="certTypeDict" label="证件类型"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
          <sino-table-column prop="dimReason" label="离职原因"></sino-table-column>
          <sino-table-column prop="leaveState" label="上海外服撤离状态" min-width="150"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="custNo" label="供应商客户编号" min-width="150"></sino-table-column>
          <sino-table-column prop="custShortName" label="客户简称"></sino-table-column>
          <sino-table-column prop="custTel" label="客户电话" min-width="120"></sino-table-column>
          <sino-table-column prop="suppEmpNo" label="供应商员工编号" min-width="150"></sino-table-column>
          <sino-table-column prop="nationalityName" label="国籍"></sino-table-column>
          <sino-table-column prop="sexDict" label="性别"></sino-table-column>
          <sino-table-column prop="phone" label="手机号码" min-width="120"></sino-table-column>
          <sino-table-column prop="email" label="雇员邮箱" min-width="180"></sino-table-column>
          <sino-table-column prop="householdTypeDict" label="户口性质"></sino-table-column>
          <sino-table-column prop="induTypeDict" label="行业类型"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="120"></sino-table-column>
          <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="130"></sino-table-column>
          <sino-table-column prop="entrustDep" label="委托方业务部" min-width="120"></sino-table-column>
          <sino-table-column prop="entrustCont" label="委托方联系人" min-width="120"></sino-table-column>
          <sino-table-column prop="entrustRemark" label="委托方备注" min-width="180"></sino-table-column>
          <!--<sino-table-column label="操作" align="center" width="60" fixed="right">
            <template scope="scope">
              <template>
                <span class="table-span">删除</span>
              </template>
            </template>
          </sino-table-column>-->
        </sino-table>
        <sino-page v-bind:page="taskPage.pageNum" v-bind:page-size="taskPage.pageSize" v-on:pagehandler="pageTaskHandler"
                   :pageArray="taskPage.pageArray" v-on:choosePageFun="choooseTaskNum" v-bind:object="object"
                   :total="taskPage.total"></sino-page>
      </div>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie';
  import api from '../../../../api/index';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        prodUrl: this.apiPath.hrsc.findprodinfoselectbox,
        token: Cookies.get('Token'),
        tableDataOne: null,
        tableDataTwo: null,
        page: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
        },
        taskPage: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
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
        taskChgTypesFlag: false,
        personnelData: [],
        changeData: [],
        commissionedData: [],
        entrustOptions: [],
        taskChgOptions: [],
        personnelDataAll: true,
        changeDataAll: true,
        searchForm: { // 搜索条件
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          paySuppName: '',
          prodId: '',
          prodName: '',
          custId: '',
          custName: '',
          empName: '',
          certType: '',
          certTypeDict: '',
          certNo: '',
          entrustTypes: [],
          taskChgTypes: [],
          taskIds: []
        },
        badgeValue: 0
      };
    },
    mounted () {
      let that = this;
      window.onresize = () => {
        that.screeWidth = document.body.clientWidth;
      };
      api.post(this.apiPath.hrsc.getProdNumAndEmpNumByTaskIds, {taskIds: JSON.parse(this.$route.query.taskIds)}).then(res => {
        this.entrustOptions = res.data[0];
        this.entrustOptions.forEach(function (item) {
          if (item.number > 0) {
            this.searchForm.entrustTypes.push(item.id);
          }
        }, this);
        this.taskChgOptions = res.data[1];
        this.taskChgOptions.forEach(function (item) {
          that.badgeValue += item.number;
          if (item.number > 0) {
            this.searchForm.taskChgTypes.push(item.id);
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      this.searchFun();
    },
    destroyed () {
      window.onresize = null;
    },
    methods: {
      changeTabFun (order) {
        if (order === 'second') {
          this.$router.push({path: '/empAss/entrustedtasklistimp/entrustedtasklistsum', query: {'taskIds': this.$route.query.taskIds, 'hideButton': this.$route.query.hideButton}});
        }
      },
      selectTabelRow (selection, row) {
        checkedArr = selection;
      },
      handleCheck (event) {
        this.searchForm.taskChgTypes = event.target.checked ? this.taskChgOptions.map(function (ele) {
          return ele.id;
        }) : [];
        this.changeDataAll = false;
      },
      handleChange (value) {
        let checkedCount = value.length;
        this.taskChgTypesFlag = checkedCount === this.taskChgOptions.length;
        this.changeDataAll = checkedCount > 0 && checkedCount < this.taskChgOptions.length;
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList(this.page.pageNum, this.page.pageSize);
        this.taskPage.pageNum = 1;
        this.getTask(this.taskPage.pageNum, this.taskPage.pageSize);
      },
      getList (pageNum, pageSize) {
        this.searchForm.taskIds = JSON.parse(this.$route.query.taskIds);
        let _aa = JSON.parse(JSON.stringify(this.searchForm));
        let obj = {
          data: _aa,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.hrsc.listTaskDetServeByTaskIds, obj).then(res => {
          this.tableDataOne = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getTask (pageNum, pageSize) {
        this.searchForm.taskIds = JSON.parse(this.$route.query.taskIds);
        let _aa = JSON.parse(JSON.stringify(this.searchForm));
        let obj = {
          data: _aa,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.hrsc.listTaskDetProdPayByTaskIds, obj).then(res => {
          this.tableDataTwo = res.data.list;
          this.taskPage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      //  改变当前页
      pageHandler (page) {
        this.page.pageNum = page;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      //   改变分页显示条数;
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.page.pageNum = 1;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      pageTaskHandler (page) {
        this.taskPage.pageNum = page;
        this.getTask(this.taskPage.pageNum, this.taskPage.pageSize);
      },
      choooseTaskNum (pageSize) {
        this.taskPage.pageSize = pageSize;
        this.taskPage.pageNum = 1;
        this.getTask(this.taskPage.pageNum, this.taskPage.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
