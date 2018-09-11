<template>
  <div class="usermanage">
    <!--后台管理-企业-->
    <sino-con>
      <sino-title type="levelOne" title="企业信息查询"></sino-title>
      <sino-form :model="userForm" ref="userForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="企业名称：" class="search-inner-item" prop="entName">
                <sino-input type="text" class="fl"
                            v-model="userForm.entName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="手机号码：" class="search-inner-item" prop="phone">
                <sino-input type="text" class="fl"
                            v-model="userForm.phone"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社会信用代码：" class="search-inner-item" prop="certCode">
                <sino-input type="text" class="fl"
                            v-model="userForm.certCode"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="用户状态：" class="search-inner-item" prop="userStateName">
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :chooseName.sync="userForm.userStateName"
                             :chooseId.sync="userForm.userState"
                             :clear="true"
                             :data="{code: 'REG_STATE'}"
                             :url="dictSelUrl"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="银行账号：" class="search-inner-item" prop="acctNo">
                <sino-input type="text" class="fl"
                            v-model="userForm.acctNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetForm('userForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-import"></i>导入企业
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" max-height="416" border v-on:viewAll="viewAll" stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="entName" label="企业名称" align="left" min-width="120"></sino-table-column>
          <sino-table-column prop="certCode" label="统一社会信用代码" min-width="150"></sino-table-column>
          <sino-table-column prop="acctBankName" label="银行开户名称" min-width="120"></sino-table-column>
          <sino-table-column prop="bankTypeName" label="开户银行" ></sino-table-column>
          <sino-table-column prop="acctNo" label="企业银行账号" min-width="120"></sino-table-column>
          <sino-table-column prop="phone" label="手机号码" min-width="120"></sino-table-column>
          <sino-table-column prop="userStateName" label="用户状态" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="280" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="operFun(scope.row)">操作记录</span><i class="table-i">|</i>
                <span class="table-span" @click="eavFun(scope.row)">认证审核</span><i class="table-i" v-if="scope.row.userState !== 3">|</i>
                <span class="table-span" v-if="scope.row.userState !== 3" @click="startFun(scope.row)">启用</span><i class="table-i" v-if="scope.row.userState !== 5">|</i>
                <span class="table-span" v-if="scope.row.userState !== 5" @click="stopFun(scope.row)">停用</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--导入-->
    <sino-dialog :visible.sync="importFlag" size="large" top="5%" v-on:close="resetForm('importForm')">
      <sino-title slot="title" type="levelOne" title="导入企业" class="sino-dialog-title"></sino-title>
      <sino-form :model="importForm" ref="importForm" class="serch-form clear allow-mt">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one li-wid">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custChName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="importForm.custChName"
                             :chooseId.sync="importForm.custId"
                             :clear="true"
                             :token="token"
                             :url="custUrl"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="importForm.signSuppName"
                             :chooseId.sync="importForm.signSuppId"
                             :clear="true"
                             :token="token"
                             :url="suppUrl"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="统一信用代码：" class="search-inner-item" prop="certCode">
                <sino-input type="text" class="fl"
                            v-model="importForm.certCode"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="负责人：" class="search-inner-item" prop="legalPer">
                <sino-input type="text" class="fl"
                            v-model="importForm.legalPer"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="importQuery">查 询</sino-button>
            <sino-button class="adminreset" @click="resetForm('importForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <div class="adminent-bor">
        <sino-auto-table :data="importData" border max-height="235" stripe v-on:viewAll="importViewAll">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="custChName" label="客户名称"></sino-table-column>
          <sino-table-column prop="certCode" label="统一信用代码" min-width="120"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="150"></sino-table-column>
          <sino-table-column prop="legalPer" label="负责人" min-width="150"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="importPage.pageNum" v-bind:page-size="importPage.pageSize" v-on:pagehandler="importPageHandler" :pageArray="importPage.pageArray" v-on:choosePageFun="importChoooseNum" v-bind:object="object" :total="importPage.total"></sino-page>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="importSubmit">导入平台</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeFlag" size="large" top="5%" v-on:close="resetForm('seeForm')">
      <sino-title slot="title" type="levelOne" title="查看信息" class="sino-dialog-title"></sino-title>
      <sino-title type="levelTwo" class="clear" title="企业认证信息"></sino-title>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>企业名称</h6><input readonly v-model="seeForm.entName">
          </li>
          <li>
            <h6>社会信用代码</h6><input readonly v-model="seeForm.certCode">
          </li>
          <li>
            <h6>银行开户名称</h6><input readonly v-model="seeForm.acctBankName">
          </li>
          <li>
            <h6>开户银行</h6><input readonly v-model="seeForm.bankTypeName">
          </li>
          <li>
            <h6>银行账号</h6><input readonly v-model="seeForm.acctNo">
          </li>
          <li class="li-last">
            <h6>手机号码</h6><input readonly v-model="seeForm.phone">
          </li>
        </ul>
      </div>
      <sino-title type="levelTwo" class="clear mt15" title="支付验证金额"></sino-title>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li>
            <h6>申请支付金额</h6><input readonly v-model="seeForm.corpName">
          </li>
          <li>
            <h6>申请事由</h6><input readonly v-model="seeForm.userTypeName">
          </li>
        </ul>
      </div>
      <sino-title type="levelTwo" class="clear mt15" title="支付结果"></sino-title>
      <table cellpadding="0" cellspacing="0" class="adminent-table mt15">
        <tr>
          <th>申请支付</th>
          <th>财务支付</th>
          <th>确认到账</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer"></span>
    </sino-dialog>
    <!--操作记录-->
    <sino-dialog :visible.sync="operFlag" size="large" top="5%" v-on:close="resetForm('operForm')">
      <sino-title slot="title" type="levelOne" title="操作记录" class="sino-dialog-title"></sino-title>
      <sino-form :model="operForm" ref="operForm" class="serch-form allow-out-dialog">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="two-dater-span">操作时间：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="startTime">
                  <sino-date-picker class="fl" popper-class="normal-dateTime"
                                    v-model="operForm.startTime"
                                    :picker-options="pickerOptionsBeg"
                                    type="datetime"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="endTime">
                  <sino-date-picker class="fl" popper-class="normal-dateTime"
                                    v-model="operForm.endTime"
                                    :picker-options="pickerOptionsEnd"
                                    type="datetime"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </div>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="operQuery">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <div class="adminent-bor">
        <sino-auto-table :data="operData" border max-height="235" stripe v-on:viewAll="operViewAll">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="operType" label="操作"></sino-table-column>
          <sino-table-column prop="operTime" label="操作时间" min-width="120"></sino-table-column>
          <sino-table-column prop="operName" label="操作人"></sino-table-column>
          <sino-table-column prop="loginIp" label="IP"></sino-table-column>
          <sino-table-column prop="loginBrowser" label="浏览器"></sino-table-column>
          <sino-table-column prop="loginMac" label="设备"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="operPage.pageNum" v-bind:page-size="operPage.pageSize" v-on:pagehandler="operPageHandler" :pageArray="operPage.pageArray" v-on:choosePageFun="operChoooseNum" v-bind:object="object" :total="operPage.total"></sino-page>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </sino-dialog>
    <!--审核-->
    <sino-dialog :visible.sync="eavFlag" size="large" top="5%" v-on:close="resetForm('eavForm')">
      <sino-title slot="title" type="levelOne" title="认证审核" class="sino-dialog-title"></sino-title>
      <sino-title type="levelTwo" class="clear" title="企业认证信息"></sino-title>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>企业名称</h6><input readonly v-model="eavForm.entName">
          </li>
          <li>
            <h6>社会信用代码</h6><input readonly v-model="eavForm.certCode">
          </li>
          <li>
            <h6>银行开户名称</h6><input readonly v-model="eavForm.acctBankName">
          </li>
          <li>
            <h6>开户银行</h6><input readonly v-model="eavForm.bankTypeName">
          </li>
          <li>
            <h6>银行账号</h6><input readonly v-model="eavForm.acctNo">
          </li>
          <li class="li-last">
            <h6>手机号码</h6><input readonly v-model="eavForm.phone">
          </li>
        </ul>
      </div>
      <sino-title type="levelTwo" class="clear mt15" title="支付验证金额"></sino-title>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li>
            <h6>申请支付金额</h6><input readonly v-model="eavForm.corpName">
          </li>
          <li>
            <h6>申请事由</h6><input readonly v-model="eavForm.userTypeName">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="eavSuc">申请财务支付</sino-button>
        <sino-button @click="eavFail" class="ml10">审核不通过</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox,  // g
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        userForm: { // 搜索条件
          entName: '',
          phone: '',
          certCode: '',
          userState: '',
          userStateName: '',
          acctNo: ''
        },
        token: Cookie.get("Token"),
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
        importFlag: false,
        importForm: {
          custId: '',
          custChName: '',
          certCode: '',
          signSuppId: '',
          signSuppName: '',
          legalPer: ''
        },
        importData: null,
        seeFlag: false,
        seeForm: {
          entName: '',
          acctBankName: '',
          bankTypeName: '',
          acctNo: '',
          phone: '',
          certCode: ''
        },
        eavFlag: false,
        eavForm: {
          entName: '',
          acctBankName: '',
          bankTypeName: '',
          acctNo: '',
          phone: '',
          certCode: ''
        },
        importPage: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        },
        operData: null,
        operPage: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        },
        operFlag: false,
        operForm: {
          startTime: '',
          endTime: ''
        },
        activeItem: '',
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() > new Date(this.operForm.endTime) - 8.64e7;
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() <  new Date(this.operForm.startTime) - 8.64e7;
          }
        }
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.userForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.lcAuthor.findEntUser, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
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
      // 导入
      importFun: function () {
        this.importFlag = true;
      },
      // 导入查询
      importViewAll (pageNum, pageSize) {
        let data = {
          data: this.importForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 5
        };
        api.post(this.apiPath.hrsc.findCustCert, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.importData = res.data.list;
            this.importPage.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      importQuery () {
        this.importPage.pageNum = 1;
        this.importViewAll(this.importPage.pageNum, this.importPage.pageSize);
      },
      // 导入平台
      importSubmit () {
        api.post(this.apiPath.lcAuthor.impCustInfo, this.importData).then(res => {
          if (res.code === 'CPYY-00001') {
            let arr = [];
            for (let item of this.importData) {
              arr.push(item.custId);
            }
            api.post(this.apiPath.hrsc.updateCustImpState, arr).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.importFlag = false;
                this.$message({message: '导入成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看
      seeFun: function (data) {
        api.postsign(this.apiPath.lcAuthor.findEntUserById, data.entUserId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeFlag = true;
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 操作记录
      operFun (data) {
        this.operFlag = true;
        this.activeItem = data.entUserId;
      },
      // 操作记录查询
      operQuery () {
        this.operPage.pageNum = 1;
        this.operViewAll(this.operPage.pageNum, this.operPage.pageSize);
      },
      operViewAll  (pageNum, pageSize) {
        let obj = JSON.parse(JSON.stringify(this.operForm));
        if (obj.startTime) {
          obj.startTime = Vue.filter('date')(obj.startTime, 'yyyy-MM-dd hh:mm:ss');
        }
        if (obj.endTime) {
          obj.endTime = Vue.filter('date')(obj.endTime, 'yyyy-MM-dd hh:mm:ss');
        }
        obj.entUserId = this.activeItem;
        let data = {
          data: obj,
          pageNum: pageNum || 1,
          pageSize: pageSize || 5
        };
        api.post(this.apiPath.lcEnterprise.findEntUserOperHis, data).then(res => {
          this.operData = res.data.list;
          this.operPage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核
      eavFun: function (data) {
        api.postsign(this.apiPath.lcAuthor.findEntUserById, data.entUserId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.eavFlag = true;
            this.eavForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核通过
      eavSuc () {},
      // 审核不通过
      eavFail () {
        this.eavFlag = false;
      },
      // 启用
      startFun: function (data) {
        let _data = {
          entUserId: data.entUserId,
          userState: 3
        };
        api.post(this.apiPath.lcAuthor.updateUserStateById, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.$message({message: '操作成功！', type: 'success'});
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 停用
      stopFun: function (data) {
        let _data = {
          entUserId: data.entUserId,
          userState: 5
        };
        api.post(this.apiPath.lcAuthor.updateUserStateById, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.$message({message: '操作成功！', type: 'success'});
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = pageSize;
        this.viewAll(this.pageNum, pageSize);
      },
      importPageHandler: function (page) {
        this.importPage.pageNum = page;
        this.importViewAll(page, this.importPage.pageSize);
      },
      importChoooseNum: function (pageSize) {
        this.importPage.pageSize = pageSize;
        this.importPage.pageNum = 1;
        this.importViewAll(this.importPage.pageNum, pageSize);
      },
      operPageHandler: function (page) {
        this.operPage.pageNum = page;
        this.operViewAll(page, this.operPage.pageSize);
      },
      operChoooseNum: function (pageSize) {
        this.operPage.pageSize = pageSize;
        this.operPage.pageNum = 1;
        this.operViewAll(this.operPage.pageNum, pageSize);
      },
      eavPageHandler: function (page) {
        this.pageNum = page;
        this.eavViewAll(page, this.pageSize);
      },
      eavChoooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.eavViewAll(1, pageSize);
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
        this.importData = null;
        this.importPage.total = 0;
        if (formName === 'operForm') {
          this.operPage.pageNum = 1;
          this.operPage.total = null;
          this.operData = null;
        }
      }
    }
  };
</script>
