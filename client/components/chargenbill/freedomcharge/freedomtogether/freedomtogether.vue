<template>
  <div>
    <div class=" invinfo" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="可合并账单查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <span class="search-inner-name">账单模版名称：</span>
                <sino-input class="fl" type="text" v-model="searchForm.tempName"
                            :disabled="false"></sino-input>
              </li>
              <li class="search-inner-one">
                <span class="search-inner-name">账单编号：</span>
                <sino-input class="fl" type="text" v-model="searchForm.chargeBillNo"
                            :disabled="false"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">雇员唯一号：</span>
                <sino-input class="fl" type="text" v-model="searchForm.uniqNo"
                            :disabled="false"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">生成年月：</span>
                <sino-date-picker
                  v-model="searchForm.creYmBegin"
                  type="date"
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
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
      <!--搜索结果-->
      <div class=" sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="merge()"><i class="iconfont sino-Group"></i>合并
            </sino-button>
          </div>
        </div>
        <sino-table  :data="tableData" stripe height="356" v-on:viewAll="searchFun" border v-on:select="selectCallBack" @select-all='selectTabelRow'>
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column  type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="chargeBillNo" label="账单编号"></sino-table-column>
          <!--<sino-table-column prop="tempName" label="账单名称"></sino-table-column>-->
          <sino-table-column prop="tempName" label="账单模板名称" min-width="120"></sino-table-column>
          <sino-table-column prop="creYm" label="生成年月"></sino-table-column>
          <sino-table-column prop="busiReceeAmo" label="合计金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="chargeBillTempProdTypeName" label="涉及产品类型" min-width="120">
            <template scope="scope">
              <div class="oper-btns" v-if="scope.row.oper == true">
                <span v-for="(items, index) in scope.row.prodTypes" :key="index">{{items.chargeBillTempProdTypeName +' '}}</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
        <div class="conf-btn">
          <sino-button type="primary" @click="resetAddLocal">返 回</sino-button>
        </div>
      </div>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Vue from 'vue';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let checkedArr = '';
  let callTip = function (_this, type, msg) {
    _this.modifyAndAdd = false;
    _this.$alert(msg, '提示信息', {
      confirmButtonText: '确 定',
      type: type, // icon图标类型
      dragFlag: true,
      customClass: '', // 添加class
      lockScroll: true,
      callback: action => {
      }
    });
  };
  export default {
    components: {},
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        routerView: false,
        searchForm: { // 搜索条件;
          chargeBillId: null,  // 页面选中账单ID
          chargeBillNo: '', // 账单编号
          creYmBegin: '', // 生成年月
          tempName: '', // 账单模板名称
          uniqNo: null //  唯一号
        },
        tableData: null, // 表格数据
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
        seeDto: {
          suppNo: ''
        }, // 查看弹层的数据
        suppTypeData: {data: {}}
      };
    },
    created () {
      this.searchForm.chargeBillId = this.$route.query.custId;
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
      this.searchFun();
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/custInfo") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    methods: {
      selectCallBack (selection, row) {
        checkedArr = selection;
      },
      selectTabelRow (selection, row) {
        let arr = [];
        for (let item of selection) {
          if (item.chargeBillNo) {
            arr.push(item);
          }
        }
        this.selectCallBack(arr, row);
      },
      viewAll: function () {
        this.getList('all');
      },
      searchFun () {
        this.page.pageNum = 1;
        this.searchForm.creYmBegin = Vue.filter('date')(this.searchForm.creYmBegin, 'yyyy-MM-dd');
        this.getList();
      },
      getList (all) {
        let obj = {};
        obj.data = this.searchForm;
        if (all) {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.findMergeBillChargeCust, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      merge: function () {
        this.$confirm('确定合并?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          let chaBiIds = [];
          checkedArr.forEach(function (item) {
            if (item.chargeBillId) {
              chaBiIds.push(item.chargeBillId);
            };
          });
          api.post(this.apiPath.hrsc.mergeBillChargeCust, {chargeBillIds: chaBiIds, chargeBillId: this.searchForm.chargeBillId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$router.push({path: '/freedomcharge', query: {custId: this.searchForm.chargeBillId}});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {});
      },
      modify: function (data) {
        this.routerView = true;
        this.$router.push({path: '/custInfo/custinfoupdate', query: {custId: data.custId,  type: 'modify'}});
      },
      see: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.findCustInfo, {custId: data.custId}).then(res => {
          this.seeDto = {};
          this.seeDto = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      del: function (data) {
        let obj = {};
        obj.custId = data.custId;
        this.$alert('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action === 'cancel') { return; }
            api.post(this.apiPath.hrsc.deleteCustInfEo, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList();
                this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      modifyOpen: function () { // 修改对话框打开回调
        this.$refs.modifyAndAddForm.resetFields();
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      },
      resetAddLocal () {
        this.$router.push({path: '/freedomcharge'});
      }
    }
  };
</script>
