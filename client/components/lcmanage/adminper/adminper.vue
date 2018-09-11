<template>
  <div class="usermanage">
    <!--后台管理-个人-->
    <sino-con>
      <sino-title type="levelOne" title="查询条件"></sino-title>
      <sino-form :model="userForm" ref="userForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="登录名称：" class="search-inner-item" prop="loginName">
                <sino-input type="text" class="fl"
                            v-model="userForm.loginName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="用户名称：" class="search-inner-item" prop="fullName">
                <sino-input type="text" class="fl"
                            v-model="userForm.fullName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="身份证号：" class="search-inner-item" prop="certNo">
                <sino-input type="text" class="fl"
                            v-model="userForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="用户状态：" class="search-inner-item" prop="regStateName">
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :chooseName.sync="userForm.regStateName"
                             :chooseId.sync="userForm.regState"
                             :clear="true"
                             :data="{code: 'REG_STATE', ids: [2, 3, 5]}"
                             :url="dictSelUrl"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="corpName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="userForm.corpName"
                             :chooseId.sync="userForm.corpId"
                             :clear="true"
                             :token="token"
                             :url="custUrl"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box"><!--search-one-button-box-->
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
            <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-import"></i>导入
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" max-height="416" border v-on:viewAll="viewAll" stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="mobile" label="手机号" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="身份证号" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="所属客户" min-width="120"></sino-table-column>
          <sino-table-column prop="regStateName" label="用户状态" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="240" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看操作记录</span><i class="table-i" v-if="scope.row.regState === 2">|</i>
                <span class="table-span" v-if="scope.row.regState === 2" @click="eavFun(scope.row)">审核</span><i class="table-i" v-if="scope.row.regState === 5">|</i>
                <span class="table-span" v-if="scope.row.regState === 5" @click="startFun(scope.row)">启用</span><i class="table-i" v-if="scope.row.regState === 3">|</i>
                <span class="table-span" v-if="scope.row.regState === 3" @click="stopFun(scope.row)">停用</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--导入-->
    <sino-dialog :visible.sync="importFlag" size="large" top="5%" @close="resetForm('importForm')">
      <sino-title slot="title" type="levelOne" title="导入用户" class="sino-dialog-title"></sino-title>
      <!--<sino-form :model="importForm" ref="importForm" class="">-->
      <sino-form :model="importForm" ref="importForm" class="demo-transForm clear">
        <sino-form-item label="客户/供应商名称：" class="sino-from-wid import-select" prop="custName">
          <sino-select class="fl"
                       :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="importForm.custName"
                       :chooseId.sync="importForm.custId"
                       :clear="true"
                       :token="token"
                       :url="custAllUrl"
                       @contentChange="custAllChange"
          ></sino-select>
        </sino-form-item>
        <sino-title type="levelTwo" class="clear" title="查询员工信息"></sino-title>
        <div class="order-new mt15" v-if="importErr">
          <i class="iconfont sino-tip"></i><span>手机号码、固定电话和邮箱地址至少任选其一填写。</span>
        </div>
        <div class="serch-form serch-form-over">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="员工姓名：" class="search-inner-item" prop="empName">
                  <sino-input type="text" class="fl"
                              v-model="importForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="手机号：" class="search-inner-item" prop="phone">
                  <sino-input type="text" class="fl"
                              v-model="importForm.phone"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="身份证号：" class="search-inner-item" prop="certNo">
                  <sino-input type="text" class="fl"
                              v-model="importForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-one-button-box">
              <sino-button type="primary" @click="importQuery">查 询</sino-button>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <sino-auto-table :data="importData" border max-height="235" stripe v-on:viewAll="importQuery">
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="empName" label="员工姓名"></sino-table-column>
        <sino-table-column prop="phone" label="手机号" min-width="120"></sino-table-column>
        <sino-table-column prop="certNo" label="身份证号" min-width="150"></sino-table-column>
        <sino-table-column prop="custName" label="客户/供应商名称" min-width="150"></sino-table-column>
      </sino-auto-table>
      <sino-page v-bind:page="importPage.pageNum" v-bind:page-size="importPage.pageSize" v-on:pagehandler="importPageHandler" :pageArray="importPage.pageArray" v-on:choosePageFun="importChoooseNum" v-bind:object="object" :total="importPage.total"></sino-page>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="importSubmit">导入平台</sino-button>
      </span>
    </sino-dialog>
    <!--操作记录-->
    <sino-dialog :visible.sync="seeFlag" size="large" top="5%" v-on:close="resetForm('seeForm')">
      <sino-title slot="title" type="levelOne" title="操作记录" class="sino-dialog-title"></sino-title>
      <sino-form :model="seeForm" ref="seeForm" class="serch-form allow-out-dialog">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="two-dater-span">执行开始日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="takeEffectDate">
                  <sino-date-picker class="fl" popper-class="normal-dateTime"
                                    v-model="seeForm.startTime"
                                    :picker-options="pickerOptionsBeg"
                                    type="datetime"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="takeEffectDateEnd">
                  <sino-date-picker class="fl" popper-class="normal-dateTime"
                                    v-model="seeForm.endTime"
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
            <sino-button type="primary" @click="seeSearchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <sino-auto-table :data="seeData" border max-height="235" stripe v-on:viewAll="operHistory" class="mt15">
        <sino-table-column type="index" label="序号" width="60"></sino-table-column>
        <sino-table-column prop="operType" label="操作"></sino-table-column>
        <sino-table-column prop="operTime" label="操作时间" min-width="120"></sino-table-column>
        <sino-table-column prop="operName" label="操作人"></sino-table-column>
        <sino-table-column prop="loginIp" label="IP"></sino-table-column>
        <sino-table-column prop="loginBrowser" label="浏览器"></sino-table-column>
        <sino-table-column prop="loginMac" label="设备"></sino-table-column>
      </sino-auto-table>
      <sino-page v-bind:page="operPage.pageNum" v-bind:page-size="operPage.pageSize" v-on:pagehandler="operPageHandler" :pageArray="operPage.pageArray" v-on:choosePageFun="operChoooseNum" v-bind:object="object" :total="operPage.total"></sino-page>
      <span slot="footer" class="dialog-footer"></span>
    </sino-dialog>
    <!--审核-->
    <sino-dialog :visible.sync="eavFlag" size="large" top="5%" v-on:close="resetForm('eavForm')">
      <sino-title slot="title" type="levelOne" title="审核信息" class="sino-dialog-title"></sino-title>
      <sino-title type="levelTwo" class="clear" title="用户注册信息"></sino-title>
      <sino-form :model="eavForm" ref="eavForm" class="mt15">
        <input type="hidden" v-model="eavForm.userId">
        <sino-form-item label="姓名：" prop="empName" :class="{'color-green': empNameFlag === 1, 'color-red': empNameFlag === 2, '': empNameFlag === ''}">
          <sino-input v-model="eavForm.empName" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="电话号：" prop="phone" :class="{'color-green': phoneFlag === 1, 'color-red': phoneFlag === 2, '': phoneFlag === ''}">
          <sino-input v-model="eavForm.phone" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="身份证号：" prop="certNo" :class="{'color-green': certNoFlag === 1, 'color-red': certNoFlag === 2, '': certNoFlag === ''}">
          <sino-input v-model="eavForm.certNo" :disabled="true"></sino-input>
        </sino-form-item>
      </sino-form>
      <sino-title type="levelTwo" class="clear" title="系统订单情况"></sino-title>
      <sino-auto-table :data="eavData" border max-height="235" stripe v-on:viewAll="eavViewAll" class="mt15">
        <sino-table-column type="index" label="序号" width="60"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称" min-width="120"></sino-table-column>
        <sino-table-column prop="orderBegDate" label="订单开始" min-width="120"></sino-table-column>
        <sino-table-column prop="orderEndDate" label="订单结束" min-width="120"></sino-table-column>
        <sino-table-column prop="empName" label="姓名"></sino-table-column>
        <sino-table-column prop="phone" label="电话" min-width="120"></sino-table-column>
        <sino-table-column prop="certNo" label="身份证号" min-width="180"></sino-table-column>
      </sino-auto-table>
      <sino-page v-bind:page="eavPage.pageNum" v-bind:page-size="eavPage.pageSize" v-on:pagehandler="eavPageHandler" :pageArray="eavPage.pageArray" v-on:choosePageFun="eavChoooseNum" v-bind:object="object" :total="eavPage.total"></sino-page>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="eavSuc">审核通过</sino-button>
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
        custAllUrl: this.apiPath.hrsc.findCustAndSuppSelectBox,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        userForm: { // 搜索条件
          loginName: '',
          fullName: '',
          certNo: '',
          regState: 2,
          regStateName: '待审核',
          corpId: '',
          corpName: ''
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
        importStrForm: {
          custId: '',
          custName: ''
        },
        importForm: {
          empName: '',
          phone: '',
          certNo: '',
          custId: '',
          custName: ''
        },
        importData: null,
        seeFlag: false,
        seeData: null,
        seeForm: {
          startTime: '',
          endTime: ''
        },
        eavFlag: false,
        eavData: null,
        eavForm: {
          userId: '',
          empName: '',
          phone: '',
          certNo: ''
        },
        eavPage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        importPage: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        },
        operPage: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        },
        importErr: false,
        empNameFlag: '',
        phoneFlag: '',
        certNoFlag: '',
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() > new Date(this.seeForm.endTime) - 8.64e7;
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.seeForm.startTime) - 8.64e7;
          }
        },
        activeNode: ''
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
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.lcAuthor.findUserInfo, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
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
        this.importErr = false;
      },
      custAllChange () {
        let _obj = {
          data: this.importForm,
          pageNum: this.importPage.pageNum,
          pageSize: this.importPage.pageSize
        };
        api.post(this.apiPath.hrsc.getEmpInfo, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.importErr = false;
            this.importData = res.data.list;
            this.importPage.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      importQuery () {
        if (this.importForm.custId !== '') {
          this.importErr = false;
        } else {
          if (this.importForm.empName === '' && this.importForm.phone === '' && this.importForm.certNo === '') {
            this.importErr = true;
            return;
          }
        }
        this.importPage.pageNum = 1;
        this.importViewAll(this.importPage.pageNum, this.importPage.pageSize);
      },
      importViewAll (pageNum, pageSize) {
        let _obj = {
          data: this.importForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 5
        };
        api.post(this.apiPath.hrsc.getEmpInfo, _obj).then(res => {
          this.importData = res.data.list;
          this.importPage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 导入平台
      importSubmit () {
        api.post(this.apiPath.lcAuthor.impUserInfo, this.importData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            let arr = [];
            for (let item of this.importData) {
              arr.push(item.uniqNo);
            }
            api.post(this.apiPath.hrsc.updateEmpState, arr).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '导入成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
            this.importFlag = false;
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看操作记录
      seeFun: function (data) {
        this.seeFlag = true;
        this.activeNode = data.userId;
      },
      operHistory (pageNum, pageSize) {
        let obj = JSON.parse(JSON.stringify(this.seeForm));
        if (obj.startTime) {
          obj.startTime = Vue.filter('date')(obj.startTime, 'yyyy-MM-dd hh:mm:ss');
        }
        if (obj.endTime) {
          obj.endTime = Vue.filter('date')(obj.endTime, 'yyyy-MM-dd hh:mm:ss');
        }
        obj.perUserId = this.activeNode;
        let data = {
          data: obj,
          pageNum: pageNum || 1,
          pageSize: pageSize || 5
        };
        api.post(this.apiPath.lcEMP.findPerUserOperHis, data).then(res => {
          this.seeData = res.data.list;
          this.operPage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看查询
      seeSearchFun () {
        this.operPage.pageNum = 1;
        this.operHistory(this.operPage.pageNum, this.operPage.pageSize);
      },
      // 审核
      eavFun: function (data) {
        let _t = this;
        this.eavFlag = true;
        this.eavForm.certNo = data.certNo;
        this.eavForm.empName = data.fullName;
        this.eavForm.phone = data.mobile;
        this.eavForm.userId = data.userId;
        api.postsign(this.apiPath.hrsc.findOrderEmpByCertNo, this.eavForm.certNo).then(res => {
          if (res.code === 'CPYY-00001') {
            this.eavData = res.data;
            res.data.forEach(function (list) {
              // 证件号码比对
              if (list.certNo !== _t.eavForm.certNo) {
                _t.certNoFlag = 2;
              } else {
                _t.certNoFlag = 1;
              }
              // 姓名比对
              if (list.empName !== _t.eavForm.empName) {
                _t.empNameFlag = 2;
              } else {
                _t.empNameFlag = 1;
              }
              // 电话号码比对
              if (list.phone !== _t.eavForm.phone) {
                _t.phoneFlag = 2;
              } else {
                _t.phoneFlag = 1;
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核查询
      eavViewAll (pageNum, pageSize) {
        let data = {
          data: this.userForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核通过
      eavSuc () {
        if (this.empNameFlag === 2 && this.certNoFlag === 2 && this.phoneFlag === 2) {
          this.$alert('订单信息与用户注册信息应该保持一致！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        let _data = {
          userId: this.eavForm.userId,
          regState: 3,
          uniqNo: this.eavData[0].uniqNo,
          custId: this.eavData[0].custId
        };
        api.post(this.apiPath.lcAuthor.updateRegState, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.eavFlag = false;
            this.searchFun();
            this.$message({message: '操作成功！', type: 'success'});
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核不通过
      eavFail () {
        if (this.empNameFlag === 2 && this.certNoFlag === 2 && this.phoneFlag === 2) {
          this.$alert('订单信息与用户注册信息应该保持一致！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        let _data = {
          userId: this.eavForm.userId,
          regState: 4
        };
        api.post(this.apiPath.lcAuthor.updateRegState, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.eavFlag = false;
            this.searchFun();
            this.$message({message: '操作成功！', type: 'success'});
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 启用
      startFun: function (data) {
        let _data = {
          userId: data.userId,
          regState: 3
        };
        api.post(this.apiPath.lcAuthor.updateRegState, _data).then(res => {
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
          userId: data.userId,
          regState: 5
        };
        api.post(this.apiPath.lcAuthor.updateRegState, _data).then(res => {
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
        this.viewAll(1, pageSize);
      },
      eavPageHandler: function (page) {
        this.eavPage.pageNum = page;
        this.eavViewAll(page, this.eavPage.pageSize);
      },
      eavChoooseNum: function (pageSize) {
        this.eavPage.pageSize = pageSize;
        this.eavPage.pageNum = 1;
        this.eavViewAll(this.eavPage.pageNum, pageSize);
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
        this.operHistory(page, this.operPage.pageSize);
      },
      operChoooseNum: function (pageSize) {
        this.operPage.pageSize = pageSize;
        this.operPage.pageNum = 1;
        this.operHistory(this.operPage.pageNum, pageSize);
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
        this.importData = null;
        this.importPage.total = 0;
        if (formName === 'seeForm') {
          this.operPage.pageNum = 1;
          this.operPage.total = null;
          this.seeData = null;
        }
      }
    }
  };
</script>
