<template>
  <div>
    <div class="leads usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="客户产品服务模板"></sino-title>
        <sino-form :model="templateSearchForm" ref="ruleForm" class="serch-form leads-serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one search-inner-width sep-search-inner-box" style="margin-bottom:20px">
                <span class="search-inner-name">客户名称：</span>
                <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                             :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                             :chooseName.sync="templateSearchForm.custName"
                             :chooseId.sync="templateSearchForm.custId" :clear="true" :url="custInfoSelectBoxSource" :token="token" @change="custChange"></sino-select>
              </li>
              <li class="search-inner-one search-inner-width sep-search-inner-box">
                <span class="search-inner-name">产品服务模板名称：</span>
                <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                             :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                             :chooseName.sync="templateSearchForm.tempName" :linkage="true"
                             :data="tempData"
                             :chooseId.sync="templateSearchForm.tempId" :clear="true" :url="findServeTempSelectBox" :token="token"></sino-select>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-one-button-box">
              <sino-button type="primary" @click="searchBtnFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            </div>
          </div>
          <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll" ref="searchTable" v-loading="templateLoading" element-loading-text="拼命加载中">
            <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
            <sino-table-column prop="tempName" label="产品服务模板名称" min-width="180"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
            <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
            <sino-table-column label="操作" align="center" class="user-btns" width="140" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)" >查看</span><i class="table-i">|</i>
                  <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                  <span class="table-span" @click="deleteFun(scope.row)">删除</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </div>
      </div>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  export default {
    components: {},
    data () {
      return {
        token: Cookies.get("Token"),
        routerView: false,
        invSubSelect: this.apiPath.hrsc.invSubSelectBox,
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        custInfoSelectBoxSource: this.apiPath.hrsc.custInfoSelectBoxSource, // 客户名称下拉框
        findServeTempSelectBox: this.apiPath.hrsc.findServeTempSelectBox, // 产品服务模板下拉框
        templateLoading: false,
        templateSearchForm: {
          tempName: '',
          tempId: '',
          custName: '',
          custId: ''
        },
        tempData: {
          custId: ''
        },
        trackStatus: [],
        isA: true,
        tableData: null,
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
        pageArray: [10, 20, 30, 50],
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        agentLayerAdd: false,
        agentAddForm: {
          proPayName: '',
          proPayTypeName: '',
          proPayType: '',
          proPayStateName: '未启用',
          proPayState: 1,
          invSubName: '',
          invSubId: '',
          remark: ''
        },
        // 校验
        agentAddRules: {
          proPayName: [
            {required: true, message: '代收代付项名称为必填项', trigger: 'change'}
          ],
          proPayTypeName: [
            {required: true, message: '代收代付类型为必填项', trigger: 'change'}
          ],
          proPayStateName: [
            {required: true, message: '启用状态为必填项', trigger: 'change'}
          ],
          invSubName: [
            {required: true, message: '发票科目为必填项', trigger: 'change'}
          ]
        }
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/custServTemplate") {
            this.routerView = false;
            this.pageNum = 1;
            this.searchFun();
          }
        },
        deep: true
      }
    },
//    beforeMounted () {
//      console.log(this);
//    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchBtnFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/custServTemplate") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      custChange () {
        this.tempData.custId = this.templateSearchForm.custId;
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: {
            tempName: '',
            tempId: '',
            custName: '',
            custId: ''
          }
        };
        api.post(this.apiPath.hrsc.findServeTemps, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchBtnFun () {
        this.pageNum = 1;
        this.templateLoading = true;
        this.searchFun();
      },
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.templateSearchForm
        };
        api.post(this.apiPath.hrsc.findServeTemps, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.templateLoading = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.searchFun();
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchFun();
      },
      // 新增
      addFun: function () {
        this.routerView = true;
        this.$router.push({path: '/custServTemplate/addcustservtemplate', name: '新增产品服务模板'});
      },
      // 查看
      seeFun: function (data) {
        this.routerView = true;
        this.$router.push({path: '/custServTemplate/seecustservtemplate', query: {tempId: data.tempId, serveChargingType: data.serveChargingType}});
      },
      // 修改
      modifyFun: function (data) {
        this.routerView = true;
        this.$router.push({path: '/custServTemplate/modifycustservtemplate', query: {tempId: data.tempId, serveChargingType: data.serveChargingType}});
      },
      // 删除
      deleteFun: function (data) {
        api.post(this.apiPath.hrsc.deleteServeTemp, {tempId: data.tempId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.$message({message: '删除成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
