<template>
  <!--任务单汇总-->
  <div class="leads usermanage entrusted-box">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">任务单汇总</div>
          <div class="sino-tabs-item" @click="changeTabFun('first')">任务单明细</div>
        </div>
      </div>
    </div>
    <sino-con >
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
            <li>
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
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" v-if="!$route.query.hideButton=='1'">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="confirmFun"><i class="iconfont sino-queren"></i>接收</sino-button>
            <sino-button type="icon-text" @click="refuseFun"><i class="iconfont sino-invalid"></i>拒绝</sino-button>
            <sino-button type="icon-text" @click="curMonthExe"><i class="iconfont sino-zhihangjilu"></i>本月执行</sino-button>
            <sino-button type="icon-text" @click="nextMonthExe"><i class="iconfont sino-zhihangjilu"></i>下月执行</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border @selection-change="selectTabelAllRow"><!-- @select="selectTabelRow"-->
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="60"></sino-table-column>
          <sino-table-column prop="publishBatchId" label="发布批次" width="150"></sino-table-column>
          <sino-table-column prop="paySuppName" label="付费供应商简称" width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称"  width="180"></sino-table-column>
          <sino-table-column prop="entrustTypeDict" label="委托类型"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="120"></sino-table-column>
          <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="120"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="150"></sino-table-column>
          <sino-table-column prop="sinsDeclRadix" label="社保申报基数" min-width="120"></sino-table-column>
          <sino-table-column prop="sinsBegDate" label="社保起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="sinsEndDate" label="社保止做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="accuDeclRadix" label="公积金申报基数" min-width="120"></sino-table-column>
          <sino-table-column prop="accuProp" label="公积金比例" min-width="95"></sino-table-column>
          <sino-table-column prop="accuBegDate" label="公积金起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="accuEndDate" label="公积金止做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="certTypeDict" label="证件类型"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
          <sino-table-column prop="dimReason" label="离职原因"></sino-table-column>
          <sino-table-column prop="householdTypeDict" label="户口性质"></sino-table-column>
          <sino-table-column prop="leaveState" label="供应商撤离状态" min-width="180"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商简称" min-width="180"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!-- 确认 -->
    <sino-dialog :visible.sync="confirmFlag">
      <sino-title slot="title" type="levelOne" title="维护收费截止日" class="sino-dialog-title"></sino-title>
      <input type="hidden" v-model="publishBatchId">
      <sino-auto-table :data="confirmtableData" stripe class="mail-table" max-height="416" border>
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
</template>
<script>
  import Cookies from 'js-cookie';
  import api from '../../../../api/index';
  let checkedArr = [];
  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        token: Cookies.get('Token'),
        tableData: null,
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
        seeDirData: {}, // 查看弹层的数据
        personnelDataList: false,
        personnelData: [],
        changeData: [],
        commissionedData: [],
        personnelDataAll: true,
        changeDataAll: true,
        taskChgTypesFlag: false,
        taskChgOptions: [],
        entrustOptions: [],
        searchForm: { // 搜索条件
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          paySuppName: '',
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
        confirmFlag: false,
        confirmtableData: null,
        publishBatchId: '',
        confirmValidFlag: false,
        confirmData: {
          message: ''
        },
        confirmFlagValue: '',
        badgeValue: 0
      };
    },
    watch: {
      $route: {
        handler: function (val) {
          if (val.path === '/entrustedtasklistconfi/sinsaccuacctstan') {
            this.checkFun();
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
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
        });
      }).catch(err => {
        console.log(err);
      });
      this.searchFun();
    },
    destroyed () {
      window.onresize = null;
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/entrustedtasklistconfi/sinsaccuacctstan") {
          this.checkFun();
        }
      },
      checkFun () {
        api.post(this.apiPath.hrsc.getProdNumAndEmpNumByTaskIds, {taskIds: JSON.parse(this.$route.query.taskIds)}).then(res => {
          this.entrustOptions = res.data[0];
          this.taskChgOptions = res.data[1];
          this.taskChgOptions.forEach(function (item) {
            this.badgeValue += item.number;
          }, this);
        }).catch(err => {
          console.log(err);
        });
      },
      // Tab选项卡切换
      changeTabFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/entrustedtasklistconfi/entrustedtasklisdetails', query: {'taskIds': this.$route.query.taskIds, 'hideButton': this.$route.query.hideButton}});
        }
      },
      selectTabelAllRow (selection, row) {
        checkedArr = [];
        selection.forEach(function (list) {
          if (list.flag !== 1) {
            checkedArr.push(list);
          }
        });
      },
      // 变更类型全选
      handleCheck (event) {
        if (event.target.checked) {
          this.searchForm.taskChgTypes = this.taskChgOptions.map(function (ele) { return ele.id; });
        } else {
          this.searchForm.taskChgTypes = [];
        }
        this.changeDataAll = false;
      },
      handleChange (value) {
        let checkedCount = value.length;
        this.taskChgTypesFlag = checkedCount === this.taskChgOptions.length;
        this.changeDataAll = checkedCount > 0 && checkedCount < this.taskChgOptions.length;
      },
      // 查询
      searchFun () {
        this.page.pageNum = 1;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      getList (pageNum, pageSize) {
        this.searchForm.taskIds = JSON.parse(this.$route.query.taskIds);
        let _aa = JSON.parse(JSON.stringify(this.searchForm));
        let obj = {
          data: _aa,
          pageNum: pageNum,
          pageSize: pageSize
        };
//        obj.data.taskChgTypes = obj.data.taskChgTypes.map(function (ele) { return ele.id; });
        obj.data.taskState = 2;
        api.post(this.apiPath.hrsc.listTaskInfosByCondition, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 本月执行
      curMonthExeFun (obj, confirmFlagValue) {
        let _this = this;
        api.postsign(this.apiPath.hrsc.findPaySuppByTaskIds, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data && res.data.length > 0) { // 维护收费截止日
              this.confirmFlag = true;
              res.data.forEach(function (list) {
                list.edit = false;
              });
              this.confirmtableData = res.data;
              this.confirmtableCopy = JSON.parse(JSON.stringify(this.confirmtableData));
            } else {
              // A接口
              api.postsign(_this.apiPath.hrsc.findCustByTaskIds, {confirmFlag: confirmFlagValue, taskIds: obj}).then(res => {
                if (res.code === 'CPYY-00001') {
                  if (res.data === 1) {
                    _this.confirmFlag = false;
                    _this.searchFun();
                    _this.$message({message: '操作成功！', type: 'success'});
                    return;
                  }
                  if (res.data.length > 0) {
                    _this.confirmFlag = false;
                    _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(obj), oldtaskIds: _this.$route.query.taskIds, type: 'entrustedtasklistsum', confirmFlag: confirmFlagValue}});
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      curMonthExe () {
        let _this = this;
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.confirmValidFlag = false;
        let _obj = [];
        checkedArr.forEach(function (item) {
          _obj.push(item.taskId);
        });
        this.confirmFlagValue = 1;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {taskIds: _obj}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.curMonthExeFun(_obj, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                _this.curMonthExeFun(_obj, _this.confirmFlagValue);
              }).catch(() => {
                console.log('确定取消!');
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下月执行
      nextMonthExeFun (obj, confirmFlagValue) {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.findPaySuppByTaskIds, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data && res.data.length > 0) {
              _this.confirmFlag = true;
              res.data.forEach(function (list) {
                list.edit = false;
              });
              _this.confirmtableData = res.data;
              _this.confirmtableCopy = JSON.parse(JSON.stringify(_this.confirmtableData));
            } else {
              // A接口
              api.postsign(_this.apiPath.hrsc.findCustByTaskIds, {confirmFlag: confirmFlagValue, taskIds: obj}).then(res => {
                if (res.code === 'CPYY-00001') {
                  if (res.data === 1) {
                    _this.confirmFlag = false;
                    _this.searchFun();
                    _this.$message({message: '操作成功！', type: 'success'});
                    return;
                  }
                  if (res.data.length > 0) {
                    _this.confirmFlag = false;
                    _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(obj), oldtaskIds: _this.$route.query.taskIds, type: 'entrustedtasklistsum', confirmFlag: confirmFlagValue}});
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      nextMonthExe () {
        let _this = this;
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.confirmValidFlag = false;
        let _obj = [];
        checkedArr.forEach(function (item) {
          _obj.push(item.taskId);
        });
        this.confirmFlagValue = 2;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {taskIds: _obj}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.nextMonthExeFun(_obj, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                _this.nextMonthExeFun(_obj, _this.confirmFlagValue);
              }).catch(() => {
                console.log('确定取消!');
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 确认
      commonFun (obj, confirmFlagValue) {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.findPaySuppByTaskIds, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.length === 0) {
              // A接口
              api.postsign(_this.apiPath.hrsc.findCustByTaskIds, {confirmFlag: confirmFlagValue, taskIds: obj}).then(res => {
                if (res.code === 'CPYY-00001') {
                  if (res.data === 1) {
                    _this.confirmFlag = false;
                    _this.searchFun();
                    _this.checkFun();
                    _this.$message({message: '操作成功！', type: 'success'});
                    return;
                  }
                  if (res.data.length > 0) {
                    _this.confirmFlag = false;
                    _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(obj), oldtaskIds: this.$route.query.taskIds, type: 'entrustedtasklistsum', confirmFlag: confirmFlagValue}});
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              _this.confirmFlag = true;
              res.data.forEach(function (list) {
                list.edit = false;
              });
              _this.confirmtableData = res.data;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      confirmFun () {
        let _this = this;
        if (!checkedArr || checkedArr.length < 1) {
          _this.$alert('请选择一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
        }
        let _obj = [];
        checkedArr.forEach(function (item) {
          _obj.push(item.taskId);
        });
        _this.confirmFlagValue = 0;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {taskIds: _obj}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.commonFun(_obj, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                _this.commonFun(_obj, _this.confirmFlagValue);
              }).catch(() => {
                console.log('确定取消!');
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 确认-维护收费截止日
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
                // A接口
                let _obj = [];
                checkedArr.forEach(function (item) {
                  _obj.push(item.taskId);
                });
                api.postsign(_this.apiPath.hrsc.findCustByTaskIds, {confirmFlag: 0, taskIds: _obj}).then(res => {
                  if (res.code === 'CPYY-00001') {
                    if (res.data === 1) {
                      _this.confirmFlag = false;
                      _this.searchFun();
                      _this.checkFun();
                      _this.$message({message: '操作成功！', type: 'success'});
                    }
                    if (res.data.length > 0) {
                      _this.confirmFlag = false;
                      _this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan', query: {taskIds: JSON.stringify(_obj), type: 'entrustedtasklistsum', confirmFlag: _this.confirmFlagValue}});
                    }
                  }
                }).catch(err => {
                  console.log(err);
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 拒绝
      refuseFun () {
        let _this = this;
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _obj = [];
        checkedArr.forEach(function (item) {
          _obj.push(item.taskId);
        });
        api.postsign(_this.apiPath.hrsc.refuseTaskByTaskIds, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //  改变当前页
      pageHandler (pageNum) {
        this.page.pageNum = pageNum;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      //  改变分页显示条数;
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.page.pageNum = 1;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
