<template>
  <div class=" invinfo">
    <sino-con>
      <sino-title type="levelOne" title="按金额拆分"></sino-title>
          <div class="freed-split-box">
            <sino-button type="icon-text"><i class="iconfont sino-zhangdan-copy"></i>拆分到已有账单
            </sino-button>
            <sino-button type="icon-text"><i class="iconfont sino-xinjianzhangdan"></i>拆分到新账单
            </sino-button>
          </div>
          <div class="clear"></div>
          <div class="configuration-table-box" >
            <div class="configuration-table-box-child">
              <span>拆出到已有账单 :<span class="config-span-color"> 50,000.00</span>元</span>
              <span class="ml20">拆出到新账单 :<span class="config-span-color"> 50,000.00</span>元</span>
            </div>
          <sino-table :data="tableData" stripe @select="selectTabelRow">
            <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
            <sino-table-column prop="custName" label="发票科目"></sino-table-column>
            <sino-table-column prop="taxpayerTypeDict" label="当前金额" width="150" type="money" align="center"></sino-table-column>
            <sino-table-column prop="taxPayerNo" label="拆出金额（元）" width="150" type="money" align="center"></sino-table-column>
            <sino-table-column prop="vatUnitName" label="剩余金额（元）" width="150" type="money" align="center"></sino-table-column>
          </sino-table>
          <!--<sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"-->
                   <!--:pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"-->
                   <!--:total="page.total"></sino-page>-->
          </div>
      <div class="conf-btn">
        <sino-button type="primary" @click="resetAddLocal">返 回</sino-button>
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../../api';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
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
  let checkedArr = [];
  export default {
    data () {
      return {
        tableData: null // 表格数据
//        page: { // 分页数据
//          pageNum: 1,
//          pageSize: 10,
//          pageArray: [10, 20, 30, 50],
//          total: 0 // 分页总条数
//        },
//        object: { // 表格配置
//          maxPage: 3,
//          issmallPage: false,
//          isPage: true,
//          isTotal: true,
//          isSelect: true,
//          isjumper: false,
//          isSelectPage: false
//        }
      };
    },
    created () {
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'YES_NO'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.yesNoArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      selectTabelRow (selection, row) {
        checkedArr = selection;
      },
      searchFun () {
//        console.log(this.searchForm);
//        this.page.pageNum = 1;
        this.getList();
      },
      getList () {

      },
      resetAddLocal () {
        this.$router.push({path: '/freedomcharge'});
      }
//      pageHandler (page) {
//        改变当前页
//        this.page.pageNum = page;
//        this.getList();
//      },
//      choooseNum (pageSize) {
//        改变分页显示条数;
//        this.page.pageSize = pageSize;
//        this.getList();
//      }
    }
  };
</script>
