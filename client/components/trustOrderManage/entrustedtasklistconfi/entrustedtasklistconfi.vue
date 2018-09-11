<template>
  <!--任务单确认-->
  <div>
    <div class="suppcont usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="接收任务单查询"></sino-title>
        <sino-form :model="suppcontForm" ref="suppcontForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <span class="search-inner-name">签约供应商名称：</span>
                <sino-select :filterable="true" class="fl"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="selectBox"
                             :token="token"
                             :chooseName.sync="suppcontForm.signSuppName"
                             :chooseId.sync="suppcontForm.signSuppId"
                             :clear="true" >
                </sino-select>
              </li>
              <li class="search-inner-one">
                <span class="search-inner-name">付费供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="selectBox"
                             :token="token"
                             :chooseName.sync="suppcontForm.paySuppName"
                             :chooseId.sync="suppcontForm.paySuppId"
                             :clear="true" >
                </sino-select>
              </li>
              <li>
                <span class="search-inner-name">数据来源：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :data="{code: 'TASK_DATA_SOURCE'}"
                             :url="getDictSelectBox"
                             :chooseName.sync="suppcontForm.taskDataSourceDict"
                             :chooseId.sync="suppcontForm.taskDataSource"
                             :clear="true" >
                </sino-select>
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

      <div class="sup-content2 mt15">
        <div class="sino-table-total">
          <sino-table :data="tableData" class="mail-table" stripe  v-on:viewAll="viewAll" max-height="416" border>
            <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
            <sino-table-column prop="publishBatchId" label="批次号"></sino-table-column>
            <sino-table-column prop="signSuppName" label="签约供应商名称" min-width="180"></sino-table-column>
            <sino-table-column prop="paySuppName" label="付费供应商名称" min-width="180"></sino-table-column>
            <sino-table-column prop="taskDataSourceDict" label="数据来源" min-width="95"></sino-table-column>
            <sino-table-column prop="sumAmo" label="总雇员"  ></sino-table-column>
            <sino-table-column prop="addAmo" label="增加雇员" ></sino-table-column>
            <sino-table-column prop="reduceAmo" label="减少雇员"></sino-table-column>
            <sino-table-column prop="chanAmo" label="变更雇员"></sino-table-column>
            <sino-table-column prop="dispAmo" label="一次性收费雇员" min-width="120"></sino-table-column>
            <sino-table-column label="操作" align="center" width="320" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span :class="{isGray:acceptFlag}" class="table-span" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1" @click="confirm(scope.row)">接收</span><i class="table-i" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1">|</i>
                  <span class="table-span" v-if="scope.row.isConfirm === 0 && scope.row.isRefuse !== 1" @click="refuse(scope.row)">拒绝</span><i class="table-i" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1">|</i>
                  <span class="table-span" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1" @click="curMonthExe(scope.row)">本月执行</span><i class="table-i" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1">|</i>
                  <span class="table-span" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1" @click="nextMonthExe(scope.row)">下月执行</span><i class="table-i" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1">|</i>
                  <span class="table-span" v-if="scope.row.isConfirm === 0 && scope.row.isIncludedTaskDet == 1 && scope.row.isRefuse !== 1" @click="detaiHand(scope.row)">按明细处理</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </div>
      </div>
      <!-- 确认 -->
      <sino-dialog :visible.sync="confirmFlag">
        <sino-title slot="title" type="levelOne" title="维护收费截止日" class="sino-dialog-title"></sino-title>
        <input type="hidden" v-model="publishBatchId">
        <sino-auto-table :data="confirmtableData" stripe class="mail-table" v-on:viewAll="viewAll" max-height="416" border>
          <sino-auto-table-column type="index" label="序号"  width="60" align="center"></sino-auto-table-column>
          <sino-auto-table-column prop="chName" label="付费供应商名称" min-width="180"></sino-auto-table-column>
          <sino-auto-table-column label="收费截止日" :editType='true'>
            <template scope="scope">
              <!--<sino-input v-show="!scope.row.edit" @blur="scope.row.edit = false;blurInput(scope,$event)" v-model="scope.row.chargeEndDate"></sino-input>
              <span v-show="scope.row.edit" @click="scope.row.edit = true" style="width:100%;float: left">{{ scope.row.chargeEndDate }}</span>-->
              <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false;"
                          v-model="scope.row.chargeEndDate"></sino-input>
              <span v-show="!scope.row.edit" @click="scope.row.edit = true;" class="defaultVa">{{ scope.row.chargeEndDate }}</span>
            </template>
          </sino-auto-table-column>
        </sino-auto-table>
        <span slot="footer" class="dialog-footer">
          <div class="order-new" v-if="confirmValidFlag">
            <i class="iconfont sino-tip"></i><span v-text="confirmData.message"></span>
          </div>
          <sino-button type="primary" @click="confirmDayFun">确 定</sino-button>
        </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  function parents (ele, tagName) {
    if (ele.parentNode.nodeType === 1 && ele.parentNode.tagName === tagName) {
      return ele.parentNode;
    } else {
      if (ele.parentNode) {
        return parents(ele.parentNode, tagName);
      }
    }
  }
  export default {
    data () {
      return {
        routerView: false,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        token: Cookie.get('Token'),
        publishBatchId: '',
        taskIds: '',
        suppcontForm: {
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          paySuppName: '',
          taskDataSource: '',
          taskDataSourceDict: ''
        },
        supTypeList: '', // 供应商类型下拉下拉列表
        tableData: null,
        isA: true,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        supAdd: false, // 弹层
        formState: "", // 弹层状态
        leadsbtn: '', // 弹层按钮
        rules: { // 验证
          chName: [
            { required: true, message: '请选择供应商名称', trigger: 'change' }
          ],
          contName: [
            { required: true, message: '请输入联系人名称', trigger: 'blur' }
          ],
          isDefaultCont: [
            { required: true, type: 'number', message: '请选是否默认联系人', trigger: 'blur' }
          ],
          mobile: [
            {validator: this.validator.checkPhone, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ]
        },
        supAddForm: {
          chName: '',
          suppId: '',
          contName: '',
          mobile: '',
          tel: '',
          email: '',
          respBusi: '',
          isDefaultCont: 0,
          addr: '',
          remark: ''
        },
        acceptFlag: false,
        downloadFlag: false,
        downloadForm: {}, // 下载模板的表单
        downloadFormRules: {}, // 下载模板表单校验
        importFormFlag: false, // 导入表单开关
        importForm: {}, // 导入的表单
        importFormRules: {}, // 导入表单校验
        fileDownloadFlag: false, // 下载原文件弹层开关
        confirmFlag: false,
        confirmValidFlag: false,
        confirmtableData: null,
        confirmtableCopy: [],
        accuPayFeeWayFlag: true, // 公积金缴费方式判断
        sinsPayFeeWayFlag: true, // 社保缴费方式判断
        confirmData: {
          message: ''
        },
        confirmFlagValue: '',
        prodData: {} // 产品方案默认取值,
      };
    },
    watch: {
      $route: {
        handler: function (val) {
          if (val.path === "/entrustedtasklistconfi") {
            this.routerView = false;
            this.viewAllAgain();
          }
//          if (val.query.type && (val.query.type === 'entrustedtasklistconfi' || val.query.type === 'sinsaccustan')) {
//            this.searchFun();
//          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.viewAllAgain();
    },
    methods: {
      ruoteJudge () { // 解决刷新页面后退的bug
        if (this.$route.path !== "/entrustedtasklistconfi") {
          this.routerView = true;
          this.viewAllAgain();
        }
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      viewAll (pageNum, pageSize) {
        let obj = {
          data: this.suppcontForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.listTaskInfos, obj).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      viewAllAgain () {
        let obj = {
          data: {
            selectReceFlag: 1
          },
          pageNum: this.pageNum || 1,
          pageSize: this.pageSize || 10
        };
        api.post(this.apiPath.hrsc.listTaskInfos, obj).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      clickFun: function (data, type) {
      },
      imp: function () {
        this.importFormFlag = true;
      },
      dow: function () {
        this.downloadFlag = true;
      },
      del: function (data) {
        let dto = {
          suppContId: data.suppContId
        };
        this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.findDelete, dto).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(() => {
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      // 确认
      confirmFun (taskIds, confirmFlagValue) {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.findPaySuppByTaskIds, taskIds).then(res => {
          if (res.data && res.data.length > 0) {
            _this.confirmFlag = true;
            res.data.forEach(function (list) {
              list.edit = false;
            });
            _this.confirmtableData = res.data;
            _this.confirmtableCopy = JSON.parse(JSON.stringify(_this.confirmtableData));
            _this.acceptFlag = false;
          } else {
            api.post(_this.apiPath.hrsc.findCustByTaskIds, {taskIds: taskIds, confirmFlag: confirmFlagValue}).then(res => {
              _this.acceptFlag = false;
              if (res.code === 'CPYY-00001') {
                if (res.data === 1) {
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                  return;
                } else {
                  _this.routerView = true;
                  _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(taskIds), type: 'entrustedtasklistconfi', confirmFlag: confirmFlagValue}});
                }
              }
            }).catch(err => {
              _this.acceptFlag = false;
              console.log(err);
            });
          }
        }).catch(err => {
          this.acceptFlag = false;
          console.log(err);
        });
      },
      confirm (data) {
        if (this.acceptFlag) return;
        let _this = this;
        _this.taskIds = data.taskIds;
        _this.confirmValidFlag = false;
        _this.confirmFlagValue = 0;
        this.acceptFlag = true;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {taskIds: data.taskIds}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.confirmFun(_this.taskIds, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                _this.confirmFun(_this.taskIds, _this.confirmFlagValue);
              }).catch(() => {
                this.acceptFlag = false;
                console.log('确定取消!');
              });
            }
          } else {
            this.acceptFlag = false;
          }
        }).catch(err => {
          this.acceptFlag = false;
        });
      },
      // 拒绝
      refuse (data) {
        this.taskIds = data.taskIds;
        api.postsign(this.apiPath.hrsc.refuseTaskByTaskIds, this.taskIds).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 本月执行
      curMonthExeFun (taskIds, confirmFlagValue) {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.findPaySuppByTaskIds, taskIds).then(res => {
          if (res.data && res.data.length > 0) {
            _this.confirmFlag = true;
            res.data.forEach(function (list) {
              list.edit = false;
            });
            _this.confirmtableData = res.data;
            _this.confirmtableCopy = JSON.parse(JSON.stringify(_this.confirmtableData));
          } else {
            api.post(_this.apiPath.hrsc.findCustByTaskIds, {taskIds: taskIds, confirmFlag: confirmFlagValue}).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data === 1) {
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.routerView = true;
                  _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(taskIds), type: 'curMonthExe', confirmFlag: confirmFlagValue}});
                }
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      curMonthExe (data) {
        let _this = this;
        this.confirmValidFlag = false;
        this.taskIds = data.taskIds;
        this.confirmFlagValue = 1;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {taskIds: data.taskIds}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.curMonthExeFun(_this.taskIds, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                _this.curMonthExeFun(_this.taskIds, _this.confirmFlagValue);
              }).catch(() => {
                console.log('确定取消!');
              });
            }
          }
        });
      },
      // 下月执行
      nextMonthExeFun (taskIds, confirmFlagValue) {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.findPaySuppByTaskIds, taskIds).then(res => {
          if (res.data && res.data.length > 0) {
            _this.confirmFlag = true;
            res.data.forEach(function (list) {
              list.edit = false;
            });
            _this.confirmtableData = res.data;
            _this.confirmtableCopy = JSON.parse(JSON.stringify(_this.confirmtableData));
          } else {
            api.post(_this.apiPath.hrsc.findCustByTaskIds, {taskIds: taskIds, confirmFlag: confirmFlagValue}).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data === 1) {
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  this.routerView = true;
                  this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(taskIds), type: 'nextMonthExe', confirmFlag: confirmFlagValue}});
                }
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      nextMonthExe (data) {
        let _this = this;
        this.confirmValidFlag = false;
        this.taskIds = data.taskIds;
        this.confirmFlagValue = 2;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {taskIds: data.taskIds}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.nextMonthExeFun(_this.taskIds, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                _this.nextMonthExeFun(_this.taskIds, _this.confirmFlagValue);
              }).catch(() => {
                console.log('确定取消!');
              });
            }
          }
        });
      },
      // 按明细处理
      detaiHand (data) {
        this.routerView = true;
        this.$router.push({path: '/entrustedtasklistconfi/entrustedtasklistsum', query: {'taskIds': JSON.stringify(data.taskIds)}});
      },
      // 可编辑表格样式
      blurInput (sc, event) {
        for (let i = 0; i < this.confirmtableData.length; i++) {
          if (sc.row.suppId === this.confirmtableData[i].suppId) {
            if (sc.row.chargeEndDate !== this.confirmtableCopy[i].chargeEndDate) {
              parents(event.target, 'TD').className += ' is-finish';
            } else {
              let classAry = parents(event.target, 'TD');
              let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);

              for (let i = 0, len = ary.length; i < len; i++) {
                let curName = ary[i];
                if (curName === 'is-finish') {
                  let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
                  classAry.className = classAry.className.replace(reg, ' ');
                }
              }
            }
          }
        }
      },
      // 收费截止日确定
      confirmDayFun () {
        let _this = this;
        let _data = [];
        var reg = /^([12]{0,1}[1-9]|30|31|20|10)$/;
        _this.confirmtableData.forEach(function (list) {
          if (list.chargeEndDate === null || list.chargeEndDate === '') {
            _this.confirmValidFlag = true;
            _this.confirmData.message = '收费截止日为必填项。';
            return false;
          } else if (isNaN(list.chargeEndDate)) {
            _this.confirmData.message = '请输入数字值';
            return false;
          } else if (!reg.test(list.chargeEndDate)) {
            _this.confirmData.message = '请输入1-31之间的整数';
            return false;
          } else {
            _data.push({chargeEndDate: list.chargeEndDate, suppId: list.suppId});
            _this.confirmValidFlag = false;
            api.post(_this.apiPath.hrsc.suppUpdateChargeEndDate, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.confirmFlag = false;
                _this.routerView = true;
                _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {publishBatchId: _this.publishBatchId}});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
<style scoped>
  .el-table td > .cell .isGray{color: gray}
</style>
