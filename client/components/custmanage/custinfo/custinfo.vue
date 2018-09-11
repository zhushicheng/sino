<template>
  <div>
    <div class="invinfo" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="客户基本信息查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one li-wid">
                <sino-form-item label="客户名称：" class="search-inner-item" prop="empName">
                  <sino-select :filterable="true" class="fl"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="custInfoSelectBox"
                               :chooseName.sync="searchForm.custChName"
                               :chooseId.sync="searchForm.custChId"
                               :token="token"
                               :clear="true"></sino-select>

                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="签约供应商：" class="search-inner-item" prop="empName">
                  <sino-select class="fl"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :data="{code: 'SUPP_TYPE'}"
                               :url="selectBox"
                               :token="token"
                               :chooseName.sync="searchForm.signSuppName"
                               :chooseId.sync="searchForm.signSuppId"
                               :clear="true" >
                  </sino-select>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="付费供应商：" class="search-inner-item" prop="empName">
                  <sino-select class="fl"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :token="token"
                               :data="{code: 'SUPP_TYPE'}"
                               :url="selectBox"
                               :chooseName.sync="searchForm.paySuppName"
                               :chooseId.sync="searchForm.paySuppId"
                               :clear="true" >
                  </sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="客户来源：" class="search-inner-item" prop="empName">
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :data="{code:'CUST_SOURCE'}"
                               :url="getDictSelectBox"
                               :chooseName.sync="searchForm.custSourceName"
                               :chooseId.sync="searchForm.custSource"
                               :clear="true" >
                  </sino-select>
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
      <!--搜索结果-->
      <div class=" sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="add()"><i class="iconfont sino-add"></i>新增</sino-button>
          </div>
        </div>
        <sino-table  :data="tableData" stripe max-height="416" v-on:viewAll="viewAll" border>
          <sino-table-column  type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="custChName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="custSourceName" label="客户来源"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="paySuppName" label="付费供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" width="150" align="center" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="see(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modify(scope.row)">修改</span><i class="table-i" v-if="!scope.row.orderNum && !scope.row.taskNum">|</i>
                <span class="table-span" @click="del(scope.row)" v-if="!scope.row.orderNum && !scope.row.taskNum">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
      <!-- 查看 -->
      <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
        <sino-title slot="title" type="levelOne" title="客户基本信息" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <h6>关联销售线索</h6><input v-model="seeDto.saleClueName">
            </li>
            <li>
              <h6>客户名称</h6><input v-model="seeDto.custChName">
            </li>
            <li>
              <h6>客户来源</h6><input v-model="seeDto.custSourceName">
            </li>
            <li>
              <h6>证件类型</h6><input v-model="seeDto.certTypeName">
            </li>
            <li>
              <h6>{{seeDto.certType === 4 ? '注册号' : '统一社会信用代码'}}</h6><input v-model="seeDto.certName">
            </li>
            <li>
              <h6>经济类型</h6><input v-model="seeDto.ecoTypeName">
            </li>
            <li>
              <h6>行业类型</h6><input v-model="seeDto.induTypeName">
            </li>
            <li>
              <h6>客户电话</h6><input v-model="seeDto.tel">
            </li>
            <li>
              <h6>客户邮箱</h6><input v-model="seeDto.email">
            </li>
            <li>
              <h6>人员规模</h6><input v-model="seeDto.perScaleName">
            </li>
            <li>
              <h6>年营业额</h6><input v-model="seeDto.tru">
            </li>
            <li>
              <h6>公司网址</h6><input v-model="seeDto.webSite">
            </li>
            <li>
              <h6>办公地址</h6><input v-model="seeDto.addr">
            </li>
            <li v-if="seeDto.custSource === 1">
              <h6 class="sino-form-item-content">
                <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" style="width:45%;" trigger="hover" content="与客户或者签约供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月收费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月收费账单。"></sino-popover>
                <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover2 style="left:10px;top: 8px;"></i>
                <i style="margin-left: -5px;">收费截止日</i>
              </h6>
              <input v-model="seeDto.chargeEndDate">
            </li>
            <li :class="{'li-last': seeDto.custSource === 1}">
              <h6>创建人</h6><input v-model="seeDto.creName">
            </li>
            <li class="li-last">
              <h6>创建时间</h6><input v-model="seeDto.creTime">
            </li>
            <li class="li-last">
              <h6>备注</h6><input v-model="seeDto.remark">
            </li>
          </ul>
        </div>
      </sino-dialog>
      <!--删除确认-->
      <sino-dialog :visible.sync="deleteFlag" size="small" class="delete-tip-dialog">
        <sino-title slot="title" type="levelOne" title="提示信息" class="sino-dialog-title"></sino-title>
        <h6>除客户信息外，将同时删除关联信息<span>（成本中心、收费账单模板、商务合同、增值税发票信息、银行账户信息、公积金账户信息、联系人信息、邮寄地址），</span>是否确认删除？</h6>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sureDelete">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
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
  export default {
    components: {},
    data () {
      return {
        token: Cookie.get("Token"),
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        routerView: false,
        searchForm: { // 搜索条件
          custChName: '',
          custSource: '',
          custSourceName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppName: '',
          paySuppId: ''
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
        suppTypeData: {data: {}},
        deleteFlag: false,
        currentId: ''
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/custInfo") {
            this.routerView = false;
            this.searchFun();
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 解决刷新页面后退的bug
      ruoteJudge () {
        if (this.$route.path !== "/custInfo") {
          this.routerView = true;
        }
      },
      viewAll: function () {
        this.getList('all');
      },
      // 查询
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      getList (all) {
        let obj = {};
        obj.data = this.searchForm;
        if (all) {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.findPageInfos, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增
      add: function () {
        this.routerView = true;
        this.$router.push({path: '/custInfo/custinfoupdate', query: {type: 'add'}});
      },
      // 修改
      modify: function (data) {
        this.routerView = true;
        this.$router.push({path: '/custInfo/custinfoupdate', query: {custId: data.custId,  type: 'modify'}});
      },
      // 查看
      see: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.findCustInfo, {custId: data.custId}).then(res => {
          this.seeDto = {};
          this.seeDto = res.data;
          if (this.seeDto.chargeEndDate) {
            this.seeDto.chargeEndDate = '每月' +  this.seeDto.chargeEndDate + '号';
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 删除
      del: function (data) {
        this.currentId = data.custId;
        api.postsign(this.apiPath.hrsc.deleteCustInfoInformation, data.custId).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data) {
              this.deleteFlag = true;
            } else {
              this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                this.sureDelete();
              }).catch(err => {
                console.log(err);
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 删除确认
      sureDelete () {
        api.post(this.apiPath.hrsc.deleteCustInfEo, {custId: this.currentId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.deleteFlag = false;
            this.getList();
            this.$message({message: '删除成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改对话框打开回调
      modifyOpen: function () {
        this.$refs.modifyAndAddForm.resetFields();
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      },
      //        改变当前页
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.getList();
      },
      //      改变分页显示条数;
      choooseNum: function (pageSize) {
        this.page.pageSize = pageSize;
        this.getList();
      }
    }
  };
</script>
