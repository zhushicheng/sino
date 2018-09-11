<template>
  <!--产品信息管理-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="tabChange('first')">全部</div>
          <div class="sino-tabs-item" @click="tabChange('second')">申报</div>
          <div class="sino-tabs-item" @click="tabChange('third')">申报反馈</div>
          <div class="sino-tabs-item is-active">回单</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">执行地区：</span>
              <sino-select
                class="fl"
                :filterable="true"
                :multiselect="false"
                :isshowTotol="false"
                :disabled="false"
                :totalNum="true"
                :isPage="true"
                :isGroup="false"
                :chooseName.sync="searchForm.areaName"
                :chooseId.sync="searchForm.areaId"
                :clear="true"
                :url="findAreaListByBusiAreaType"
                :data="{data: {busiAreaTypes:[1]}}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">单位账号：</span>
              <sino-input type="text" class="fl" v-model="searchForm.unitRegiNo"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">账户名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findAccuAcctSelect"
                           :chooseName.sync="searchForm.accuAcctName"
                           :chooseId.sync="searchForm.accuAcctId"
                           :clear="true" >
              </sino-select>
            </li>
            <li>
              <span class="search-inner-name">缴费方式：</span>
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           class="fl"
                           :url="getDictSelectBox"
                           :data="{code: 'PAY_FEE_WAY'}"
                           :chooseName.sync="searchForm.payFeeWayName"
                           :chooseId.sync="searchForm.payFeeWay"
                           :clear="true"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchTotalFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-icon">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="backReceiptAarrFun"><i class="iconfont sino-huizhi"></i>批量回单</sino-button>
        </div>
      </div>
      <sino-table :data="tableDataTotal" border max-height="416" stripe v-on:select="selectCallBack" v-on:viewAll="viewAll">
        <sino-table-column type="selection" width="40"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="unitRegiNo" label="单位账号" min-width="180"></sino-table-column>
        <sino-table-column prop="accuAcctName" label="账户名称"></sino-table-column>
        <sino-table-column prop="areaName" label="执行地区" min-width="105"></sino-table-column>
        <sino-table-column prop="payFeeWayName" label="缴费方式"></sino-table-column>
        <sino-table-column prop="applyPerNum" label="申报人数" min-width="180"></sino-table-column>
        <sino-table-column prop="applySuccPerNum" label="申报成功" min-width="95"></sino-table-column>
        <sino-table-column prop="quesPerNum" label="问题人员" min-width="180"></sino-table-column>
        <sino-table-column label="操作" align="center" class="user-btns" width="150" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="backReceiptFun(scope.row)">回单</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
    </div>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  let checkedArr = [];
  export default {
    components: {},
    data () {
      return {
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        findAccuAcctSelect: this.apiPath.accu.findAccuAcctSelect,
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        searchFlag: true,
        searchForm: {
          areaId: '',
          areaName: '',
          unitRegiNo: '',
          payFeeWay: '',
          payFeeWayName: '',
          accuAcctName: '',
          accuAcctId: ''
        },
        trackStatus: [],
        checkedArr: [],
        activeNameTab: 'one',
        tableDataTotal: null,
        tableDataDetail: null,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50]
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchTotalFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // tab 选项卡点击回调事件
      tabChange (order) {
        if (order === 'first') {
          this.$router.push({path: '/accuDeclareAll'});
        } else if (order === 'second') {
          this.$router.push({path: '/accuDeclarePage'});
        } else {
          this.$router.push({path: '/accuDeclareFeed'});
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        this.checkedArr = selectTion;
        checkedArr = selectTion;
      },
      handleClick (name) {
      },
      resetForm: function () { // 修改对话框打开回调
      },
      searchDetailFun () {},
      searchTotalFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchForm
        };
        api.post(this.apiPath.accu.findApplyPerNumReturn, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataTotal = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      backReceiptFun (item) {
        let obj = {
          accuAcctId: item.accuAcctId
        };
        api.post(this.apiPath.accu.declReturn, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data) {
              this.$alert(res.data, '温馨提示', {
                confirmButtonText: '确 定',
                type: 'error', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  return;
                }
              });
            } else {
              this.$message({message: '回单成功！', type: 'success'});
            }
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      backReceiptAarrFun () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请至少选择一条', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let data = {
          accuAcctIds: []
        };
        checkedArr.forEach(function (item) {
          data.accuAcctIds.push(item.accuAcctId);
        }, this);
        api.post(this.apiPath.accu.declReturn, data).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data) {
              this.$alert(res.data, '温馨提示', {
                confirmButtonText: '确 定',
                type: 'error', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  return;
                }
              });
            } else {
              this.$message({message: '回单成功！', type: 'success'});
            }
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
