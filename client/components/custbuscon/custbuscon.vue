<template>
  <!--商务合同管理-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="商务合同查询"></sino-title>
        <sino-form :model="cusForm" ref="cusForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="商务合同名称：" class="search-inner-item" prop="conName">
                  <sino-input class="fl" type="text"
                              v-model="cusForm.conName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="合同生效状态：" class="search-inner-item" prop="conStateName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="conStateUrl"
                                 :data="{code:'CON_STATE'}"
                                 :chooseName.sync="cusForm.conStateName"
                                 :chooseId.sync="cusForm.conState"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="客户名称：" class="search-inner-item" prop="custChName">
                  <sino-input class="fl" type="text"
                              v-model="cusForm.custChName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="合同流转状态：" class="search-inner-item" prop="conBusiStateName">
                  <sino-select :filterable="false"
                               :multiselect="true"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="conStateUrl"
                               :data="{code:'CON_BUSI_STATE'}"
                               :chooseName.sync="cusForm.conBusiStateName"
                               :chooseId.sync="cusForm.conBusiState" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="供应商名称：" class="search-inner-item" prop="chName">
                  <sino-input type="text" v-model="cusForm.chName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="签署对象：" class="search-inner-item" prop="conSignObjName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="conStateUrl"
                               :data="{code:'CON_SIGN_OBJ'}"
                               :chooseName.sync="cusForm.conSignObjName"
                               :chooseId.sync="cusForm.conSignObj"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="审核状态：" class="search-inner-item" prop="auditStateName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="false"
                                 :multiselect="true"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="conStateUrl"
                                 :data="{code:'AUDIT_STATE'}"
                                 :chooseName.sync="cusForm.auditStateName"
                                 :chooseId.sync="cusForm.auditState"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
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
              <sino-button type="icon-text" @click="addFun()"><i class="iconfont sino-add"></i>新增</sino-button>
              <sino-button type="icon-text" @click="subEav()"><i class="iconfont sino-subaudit"></i>提交审核</sino-button>
              <sino-button type="icon-text" v-if="selectFlag" @click="busConEav()"><i class="iconfont sino-eav"></i>商务合同审核</sino-button>
              <sino-button type="icon-text" @click="encDownload()"><i class="iconfont sino-download-copy"></i>下载附件</sino-button>
              <sino-button type="icon-text" @click="respBusiFun()" v-if="selectFlag"><i class="iconfont sino-follow"></i>指派业务部门</sino-button>
              <sino-button type="icon-text" @click="assSale()" v-if="saaSaleFlag"><i class="iconfont sino-follow"></i>指派业务员</sino-button>
            </div>
          </div>
          <sino-table :data="cusTableData" max-height="416" v-on:viewAll="viewAll" border stripe @select-all="selectAllBack" v-on:select="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="conName" label="商务合同名称" min-width="180"></sino-table-column>
            <sino-table-column prop="custOrSuppName" label="客户/供应商名称" min-width="180"></sino-table-column>
            <sino-table-column prop="conTypeName" label="合同类型" min-width="80"></sino-table-column>
            <sino-table-column prop="conStateName" label="合同生效状态" min-width="105"></sino-table-column>
            <sino-table-column prop="conBusiStateName" label="合同流转状态" min-width="105"></sino-table-column>
            <sino-table-column prop="auditStateName" label="审核状态" min-width="105"></sino-table-column>
            <sino-table-column prop="respBusiDepName" label="业务部" min-width="120"></sino-table-column>
            <sino-table-column prop="saleConRespName" label="当前负责人" min-width="95"></sino-table-column>
            <sino-table-column label="操作" align="center" width="140" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.conBusiState === 1 || scope.row.conBusiState === 3">|</i>
                  <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.conBusiState === 1 || scope.row.conBusiState === 3">修改</span><i class="table-i" v-if=" scope.row.conState === 2 ?false : (scope.row.conBusiState === 1 || scope.row.conBusiState === 3 || scope.row.conBusiState === 2 ? (roleType === '4'? true : false) : false) ">|</i>
                  <span class="table-span" v-if=" scope.row.conState === 2 ?false : (scope.row.conBusiState === 1 || scope.row.conBusiState === 3 || scope.row.conBusiState === 2 ? (roleType === '4'? true : false) : false) " @click="toVoid(scope.row)">作废</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum"
                     v-bind:page-size="pageSize"
                     v-on:pagehandler="pageHandler"
                     :pageArray="pageArray"
                     v-on:choosePageFun="choooseNum"
                     v-bind:object="object"
                     :total="total"></sino-page>
        </div>
      </div>
      <!--指派业务员-->
      <sino-dialog :visible.sync="clerkFlag" class="leads-follow">
        <sino-title slot="title" type="levelOne" title="指派业务员" class="sino-dialog-title"></sino-title>
        <div class="follow-select">
          <sino-form :model="clerkForm" class="follow-form" ref="clerkForm" :rules="clerkRules">
            <div class="follow-content">
              <sino-form-item label="业务员：" prop="userName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="findUserRoleInfoOfBusiPerAndOperator"
                             :data="{userRoleId: respBusData}"
                             :chooseName.sync="clerkForm.userName"
                             :chooseId.sync="clerkForm.userRoleId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </div>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="clerkConfirm" :disabled="clerkBtnFlag">确 定</sino-button>
        </span>
      </sino-dialog>
      <!--指派业务部门-->
      <sino-dialog :visible.sync="respBusiFlag" class="leads-follow" v-on:close="resetForm('respBusiForm')">
        <sino-title slot="title" type="levelOne" title="指派业务部门" class="sino-dialog-title"></sino-title>
        <div class="follow-select">
          <sino-form :model="respBusiForm" class="follow-form" ref="respBusiForm" :rules="respBusiRules">
            <div class="follow-content">
              <sino-form-item label="业务部门：" prop="respBusiDepName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="orgSelectUrl"
                             :data="orgSelectData"
                             :chooseName.sync="respBusiForm.respBusiDepName"
                             :chooseId.sync="respBusiForm.respBusiDepId"
                             :clear="false"></sino-select>
              </sino-form-item>
            </div>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="respBusiConfirm" :disabled="respBusiConFlag">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../api';
  import Cookies from 'js-cookie';

  let checkedArr;
  export default {
    components: {
    },
    data () {
      let _that = this;
      return {
        custData: {},
        chData: {},
        routerView: false,
        conStateUrl: this.apiPath.hrsc.getDictSelectBox,
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        saleClueUrl: this.apiPath.crm.findSaleClueSelectBox,
        orgSelectUrl: this.apiPath.author.findOrgSelectBoxByCorpId,
        custUrl: this.apiPath.hrsc.findCustSelectInfo1,
        chUrl: this.apiPath.hrsc.selectBox,  // g
        respBusUrl: this.apiPath.author.findUserRoleByOrgAndRoleType,
        findUserRoleInfoOfBusiPerAndOperator: this.apiPath.author.findUserRoleInfoOfBusiPerAndOperator,
        respBusData: Cookies.get('userRoleId'),
        roleType: Cookies.get('roleType'),
        token: Cookies.get('Token'),
        orgSelectData: {
          corpId: JSON.parse(Cookies.get('CorpId')),
          orgTypes: ''
        },
        respBusiFlag: false,
        respFlag: false,
        outlineDisFlag: false,
        cusForm: {
          conName: '',
          custChName: '',
          conState: '',
          conStateName: '',
          conBusiState: [],
          conBusiStateName: [],
          chName: '',
          conSignObj: '',
          conSignObjName: '',
          auditState: [],
          auditStateName: []
        },
        cropList: [],
        supTypeList: '',
        cusTableData: null,
        isA: true,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [5, 10, 20, 30, 50],
        seeItem: false,
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        cusAdd: false, // 弹层
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层按钮
        clerkFlag: false, // 指派业务部
        clerkForm: { // 指派业务部
          userRoleId: '',
          userName: ''
        },
        clerkRules: {
          userName: [
            { required: true, message: '请选择指派业务员', trigger: 'change' }
          ]
        },
        conSignObjFlag: false, // 指派业务部
        selectFlag: '',
        saaSaleFlag: '',
        conEnc: [],
        otherEnc: [],
        btnText: '',
//        endDateFun: {
//          disabledDate (time) {
//            return time.getTime() < _that.cusAddForm.begDate;
//          }
//        },
        conBusiStateFlag: '',
        respBusiForm: {
          respBusiDepId: '',
          respBusiDepName: ''
        },
        respBusiRules: {
          respBusiDepName: [
            { required: true, message: '请选择指派业务部门', trigger: 'change' }
          ]
        },
        clerkBtnFlag: false, // 指派业务员
        respBusiConFlag: false // 指派业务部门
      };
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
      if (this.$route.query.type === 'addbuscon' || this.$route.query.type === 'updatebuscon') {
        this.searchFun();
      }
      let _roleType = Cookies.get('roleType');
      if (_roleType === '4') {
        this.selectFlag = true;
        this.cusForm.conBusiState = [1, 2, 5, 6];
        this.cusForm.conBusiStateName = ['待提交', '待审核', '待指派业务员', '已指派业务员'];
        this.searchFun();
      } else {
        this.selectFlag = false;
      }
      if (_roleType === '6' || _roleType === '7') {
        this.saaSaleFlag = true;
        this.cusForm.conBusiState = [5];
        this.cusForm.conBusiStateName = ['待指派业务员'];
        this.searchFun();
      } else {
        this.saaSaleFlag = false;
      }
      if (_roleType !== '5' && _roleType !== '6' && _roleType !== '3' && _roleType !== '7') {
        this.cusForm.auditState = [0];
        this.cusForm.auditStateName = ['未审核'];
      }
      if (_roleType === '3') {
        this.cusForm.conBusiState = [1, 3];
        this.cusForm.conBusiStateName = ['待提交', '审核不通过'];
        this.searchFun();
      }
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/custBusCon") {
            this.routerView = false;
            if (this.$route.query.type === 'busconeav' || this.$route.query.type === 'addbuscon' || this.$route.query.type === 'updatebuscon') {
              this.searchFun();
            }
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/custBusCon") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
      },
      selectAllBack (selectTion, row) {
        checkedArr = selectTion;
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
        this.viewAll2();
      },
      resetFun () {
        this.$refs.cusForm.resetFields();
      },
      viewAll2 () {
        if (this.conStateName) {
          if (this.conStateName === '已作废') {
            this.roleType = '5';
          }
        } else {
          console.log('this.constateName null');
        }
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.cusForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findConSuppCust, _data).then(res => {
          this.cusTableData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      addFun: function () { // 添加
        this.routerView = true;
        this.$router.push({path: '/custBusCon/addBusCon', query: {type: 'add'}});
      },
      subEav: function () { // 提交审核
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条商务合同', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _conId = checkedArr;
        api.post(this.apiPath.hrsc.chanallbusistate, _conId).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            this.searchFun();
            this.$message({message: '提交成功！', type: 'success'});
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      seeFun: function (scopeData) { // 商务合同审核查看
        this.routerView = true;
        this.$router.push({path: '/custBusCon/seeBusCon', name: '商务合同查看', params: {'seeConId': scopeData.conId}});
      },
      busConEav: function () { // 商务合同审核
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条商务合同', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/custBusCon/busConEav', name: '商务合同审核', params: {'conId': checkedArr[0].conId, 'orgTypes': checkedArr[0].orgTypes}});
      },
      encDownload: function () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条商务合同', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _conId = {
          conId: checkedArr[0].conId
        };
        api.post(this.apiPath.hrsc.downLoadEnc, _conId).then(res => {
          if (res.code === 'CPYY-00001') {
            let _data = JSON.parse(res.data);
            api.download(_data.downloadlink);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 指派业务员
      assSale: function () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条商务合同', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.clerkFlag = true;
        this.clerkBtnFlag = false;
      },
      // 指派业务员确认
      clerkConfirm () {
        let _this = this;
        if (_this.clerkBtnFlag) {
          return;
        }
        _this.$refs.clerkForm.validate((valid) => {
          if (valid) {
            _this.clerkBtnFlag = true;
            let _data = {
              conId: checkedArr[0].conId,
              respBusiRepId: _this.clerkForm.userRoleId
            };
            api.post(_this.apiPath.hrsc.respbusirepid, _data).then(res => {
              if (res.code === "CPYY-00001") {
                _this.clerkFlag = false;
                _this.clerkBtnFlag = false;
                _this.searchFun();
                _this.$message({message: '指派成功！', type: 'success'});
              } else {
                _this.clerkBtnFlag = false;
              }
            }).catch(err => {
              _this.clerkBtnFlag = false;
            });
          } else {
            _this.clerkBtnFlag = false;
          }
        });
      },
      // 修改
      modifyFun: function (scope) {
        this.routerView = true;
        this.$router.push({path: '/custBusCon/updateBusCon', query: {type: 'modify', conId: scope.conId}});
      },
      // 作废
      toVoid: function (scopeData) {
        let _this = this;
        _this.$confirm('确定作废该条数据吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(_this.apiPath.hrsc.delete, scopeData).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.searchFun();
              _this.$message({message: '作废成功！', type: 'success'});
            }
          }).catch(() => {
          });
        }).catch(() => {
          console.log('作废失败!');
        });
      },
      // 指派业务部门
      respBusiFun () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条商务合同', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.orgSelectData.orgTypes = checkedArr[0].orgTypes;
        this.respBusiFlag = true;
      },
      respBusiConfirm () {
        const _this = this;
        if (_this.respBusiConFlag) {
          return;
        }
        _this.$refs.respBusiForm.validate((valid) => {
          if (valid) {
            let _data = {
              conId: checkedArr[0].conId,
              respBusiDepId: this.respBusiForm.respBusiDepId
            };
            _this.respBusiConFlag = true;
            api.post(this.apiPath.hrsc.respbusidepid, _data).then(res => {
              if (res.code === "CPYY-00001") {
                this.respBusiFlag = false;
                _this.respBusiConFlag = false;
                this.searchFun();
                this.$message({message: '指派成功！', type: 'success'});
              } else {
                _this.respBusiConFlag = false;
              }
            }).catch(err => {
              _this.respBusiConFlag = false;
            });
          } else {
            _this.respBusiConFlag = false;
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

