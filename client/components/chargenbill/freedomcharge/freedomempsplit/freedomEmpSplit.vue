<template>
  <div class="roleMange">
    <div class="role-content">
      <sino-title type="levelOne" title="按雇员拆分查询"></sino-title>
      <sino-form :model="billMeterForm" ref="billMeterForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text" v-model="billMeterForm.certNos"></sino-input>
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
    </div>
    <div class="config-background-color">
      <div class="sino-table-icon-left configuration-table-title">
        <sino-button type="icon-text" class="already-btn" @click="billData()"><i class="iconfont sino-zhangdan-copy"></i>拆分到已有账单
        </sino-button>
        <sino-button type="icon-text" @click="splitNewbillFun"><i class="iconfont sino-xinjianzhangdan"></i>拆分到新账单
        </sino-button>
      </div>
      <!--请选择目标账单弹层-->
      <sino-dialog :visible.sync="lookBillFlag" size="samll" dialogHide v-on:close="lookBillClose('billData')" class="usermanage freebill-dialog">
        <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="请选择目标账单"></sino-title>
        <sino-form class="serch-form" :model="tarBillForm" ref="tarBillForm" :rules="tarBillRules">
          <div class="search-box marTop">
            <ul class="search-inner-box">
              <li style="margin-top: 0">
                <span class="search-inner-name">账单编号：</span>
                <sino-input class="fl" type="text" :disabled="false" v-model="tarBillForm.chargeBillNo"></sino-input>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-one-button-box button-box">
              <sino-button type="primary" @click="tarsBillFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
        <sino-table  stripe height="349" :data="tarBillData" v-on:select="selectCallBackTar" border>
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="chargeBillNo" label="帐单编号" align="center" width="130"></sino-table-column>
          <sino-table-column prop="busiReceeAmo" label="账单金额" align="center" min-width="161"></sino-table-column>
          <sino-table-column prop="costCentName" label="成本中心" align="center" min-width="161">
            <template scope="scope">
              <div class="oper-btns" v-if="scope.row.oper == true">
                <span v-for="(items, index) in scope.row.costCents" :key="index">{{items.costCentName +' '}}</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page
          v-bind:page="billPage.pageNum"
          v-bind:page-size="billPage.pageSize"
          v-on:pagehandler="pageHandlerB"
          :pageArray="billPage.pageArray"
          v-on:choosePageFun="choooseNumB"
          v-bind:object="object" :total="billPage.total">
        </sino-page>
        <span slot="footer" class="dialog-footer">
        <sino-button @click="tarBillDetFun()" type="primary">确 定</sino-button>
          <span class="dialog-split" @click="contiSplitFun()">继续拆分</span>
      </span>
      </sino-dialog>
      <div class="small-etyma-content fl configuration-table configuration-table-left">
        <div>
          <div class="clear"></div>
          <div class="configuration-table-box">
            <div class="configuration-table-box-child">未添加雇员</div>
            <!--<div class="configuration-table-box-childa"><sino-checkbox class="configuration-table-box-checkbox"></sino-checkbox>已选<span class="configuration-table-box-span">{{checkLenth}}/{{total}}</span>项</div>-->
            <sino-table :data="tableDataA" class="get-check-table" height="416" v-on:select="selectCallBack" @select-all="selectCallBackAll" border stripe v-on:viewAll="viewAll">
              <sino-table-column type="selection"></sino-table-column>
              <sino-table-column type="index" label="序号" width="50"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="160"></sino-table-column>
              <sino-table-column prop="amo" label="总金额" width="120" type="money" align="center"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                       :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                       :total="total"></sino-page>
          </div>
        </div>
      </div>
      <div class="configuration-table-btn">
        <sino-button class="configuration-table-btn-left"
                     @click="moveRight" :class="{'is-configuration-table-btn':isA, 'no-configuration-table-btn':!isA}">
          <i class="iconfont sino-you1"></i>
        </sino-button>
        <sino-button class="configuration-table-btn-right"
                     @click="moveLeft" :class="{'is-configuration-table-btn':isB, 'no-configuration-table-btn':!isB}">
          <i class="iconfont sino-zuo"></i>
        </sino-button>
      </div>
      <!--已添加雇员-->
      <div class="small-etyma-content fl configuration-table">
        <div class="etyma-content-box" >
          <div class="clear"></div>
          <div class="configuration-table-box" >
            <div class="configuration-table-box-child">已添加雇员</div>
            <!--<div class="configuration-table-box-childa"><sino-checkbox class="configuration-table-box-checkbox"></sino-checkbox>共<span class="configuration-table-box-span">{{total2}}</span>项</div>-->
            <sino-table :data="tableDataB" height="416" v-on:select="selectCallBack2" @select-all="selectCallBack2All" stripe border v-on:viewAll="viewAll">
              <sino-table-column  type="selection"></sino-table-column>
              <sino-table-column  type="index" label="序号" width="50"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
              <sino-table-column prop="amo" label="总金额" width="120" type="money" align="center"></sino-table-column>
            </sino-table>
            <sino-page :pageArray="page2.pageArray" v-bind:object="object"
                       :total="total2"></sino-page>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="conf-btn configuration-btn">
        <!--<sino-button type="primary" @click="resetAddLocal">返 回</sino-button>-->
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../../api';
  import vald from '../../../../validator/index.js';
  let checkedArr = [];
  let checkedArr2 = [];
  let checkedArr3 = [];
  let tipFun = function (_this, array, tipMessage) {
    if (array.length === 0) {
      _this.$alert(tipMessage, '提示信息', {
        confirmButtonText: '确 定',
        type: 'info', // icon图标类型
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    } else {
      return true;
    }
  };

  export default {
    components: {},
    data () {
      var checkNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error('不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      };
      return {
        tarBillData: [], // 请选择目标账单弹层--->表格数据
        tarBillForm: {
          chargeBillNo: ''
        }, // 请选择弹层---->数据
        tarBillRules: {}, // 请选择弹层---->校验
        modifyAndAdd: false,
        isA: false,
        isB: false,
        tableDataA: [], // 未添加雇员表格数据
        tableDataB: [], // 已添加雇员表格数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        checkLenth: 0,
        total: 0, // 分页总条数
        page2: { // 展示分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        total2: 0, // 分页总条数
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        billMeterForm: {
          certNos: null  // 证件号码
        },
        // tree
        treeList: [],
        modifyAndAddForm: {
          dictName: '',
          code: '',
          dictDesc: ''
        },
        lookBillFlag: false, // 拆分到已有账单弹层控制
        billPage: {      // 选择目标账单分页
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
        },
        uniqNos: [] // 点击右移的时候传的唯一号
      };
    },
    created () {
      this.searchFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 拆分到新的账单
      splitNewbillFun () {
        let obj = {
          chargeBillId: this.$route.query.chargeBillId,
          uniqNos: []
        };
        for (let item of checkedArr2) {
          if (item.uniqNo) {
            obj.uniqNos.push(item.uniqNo);
          };
        }
        api.post(this.apiPath.hrsc.splitNewChargeBill, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$router.push({path: '/freedomcharge'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 请选择目标账单 ----> 继续拆分
      contiSplitFun () {
        this.tarBillDetFun(1);
        this.lookBillFlag = false;
      },
      // 请选择目标账单 ----> 表格复选
      selectCallBackTar (selectTion, row) {
        checkedArr3 = selectTion;
      },
      // 请选择目标账单 ----> 确 定
      tarBillDetFun (id) {
        if (checkedArr3.length !== 1) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        let obj = {
          chargeBillId: this.$route.query.chargeBillId,
          oldChargeBillid: checkedArr3[0].chargeBillId,
          uniqNos: []
        };
        for (let item of checkedArr2) {
          obj.uniqNos.push(item.uniqNo);
        }
        api.post(this.apiPath.hrsc.splitByEmpNo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (id !== 1) {
              this.$router.push({path: '/freedomcharge'});
              return;
            }
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 请选择目标账单---> 查 询
      tarsBillFun () {
        this.tarBillFun(this.billPage.pageNum, this.billPage.pageSize);
      },
      tarBillFun (pageNum, pageSize) {
        let data = {};
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize
        };
        data.chargeBillId = this.$route.query.chargeBillId;
        data.chargeBillNo = this.tarBillForm.chargeBillNo;
        data.custId = this.$route.query.custId;
        obj.data = data;
        api.post(this.apiPath.hrsc.findExistChargeBill, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tarBillData = res.data.list;
            this.billPage.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      change (data, _data) {
        if (checkedArr2.length === 0) {
          this.$alert('请选择一项进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
        } else {
          let obj = {
            chargeBillTempHeadId: checkedArr2[0].chargeBillTempHeadId,
            showSort: data
          };
          api.post(this.apiPath.hrsc.chargeUpdate, obj).then(res => {
            _data = false;
          }).catch(err => {
            console.log(err);
          });
        }
//        console.log(checkedArr2);
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
        if ((checkedArr.length > 0)) {
          for (let i = 0; i < checkedArr.length; i++) {
            if (checkedArr[i].flag === 1) {
              checkedArr.splice(i);
              return;
            }
          }
        };
        this.checkLenth = checkedArr.length;
        if (checkedArr.length === 0) {
          this.isA = false;
        } else {
          this.isA = true;
        }
      },
      selectCallBackAll (selection, row) {
        console.log(selection);
        let all = [];
        for (let item of selection) {
          if (item.uniqNo) {
            all.push(item);
          }
        }
        this.selectCallBack(all, row);
      },
      selectCallBack2 (selectTion, row) { // 手动选中checkBox回调
        checkedArr2 = selectTion;
        if ((checkedArr2.length > 0)) {
          for (let i = 0; i < checkedArr2.length; i++) {
            if (checkedArr2[i].flag === 1) {
              checkedArr2.splice(i);
              return;
            }
          }
        };
        this.checkLenth2 = checkedArr2.length;
        if (checkedArr2.length === 0) {
          this.isB = false;
        } else {
          this.isB = true;
        }
      },
      selectCallBack2All (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.uniqNo) {
            all.push(item);
          }
        }
        this.selectCallBack2(all, row);
      },
      // 表格数据右移
      moveRight () {
        let _this = this;
        let indexArr = checkedArr.map(function (item) {
          return item.uniqNo;
        });
        for (var i = 0; i < _this.tableDataA.length; i++) {
          if (indexArr.indexOf(_this.tableDataA[i].uniqNo) !== -1) {
            _this.tableDataB.unshift(JSON.parse(JSON.stringify(_this.tableDataA[i])));
            _this.uniqNos.unshift(_this.tableDataA[i].uniqNo);
          }
        }
        this.checkLenth = 0;
        this.total2 = this.tableDataB.length;
        checkedArr.splice(0);
        if (this.tableDataA.length === 0) {
          this.tableDataA = [];
        }
        this.getList();
        // for (let item of checkedArr) {
        //   for (let item1 of this.tableDataA) {
        //     if (item.certNo === item1.certNo) {
        //       if (this.tableDataB.indexOf(item1) === -1) {
        //         this.tableDataB.unshift(item1);
        //         this.uniqNos.unshift(item1.uniqNo);
        //         this.tableDataA.splice(this.tableDataA.indexOf(item1), 1);
        //         this.checkLenth = 0;
        //         this.total2 = this.tableDataB.length;
        //       }
        //     }
        //   }
        // }
        // this.getList(this.page.pageNum, this.page.pageSize);
      },
      // 表格数据左移
      moveLeft () {
        let _this = this;
        this.tableDataA = [];
        for (let item of checkedArr2) {
          _this.tableDataB.forEach(function (item1, index) {
            if (item.certNo === item1.certNo) {
              if (_this.tableDataA.indexOf(item1) === -1) {
                _this.tableDataB.splice(index, 1);
                _this.checkLenth = checkedArr.length;
                _this.total2 = _this.tableDataB.length;
                _this.uniqNos.splice(index, 1);
              }
            }
          }, _this);
        }
        this.checkLenth = 0;
        this.total2 = this.tableDataB.length;
        checkedArr2.splice(0);
        if (this.tableDataB.length === 0) {
          this.tableDataB = [];
        }
        this.getList(this.page.pageNum, this.page.pageSize);
        // for (let item of checkedArr2) {
        //   for (let item1 of this.tableDataB) {
        //     if (item.certNo === item1.certNo) {
        //       if (this.tableDataA.indexOf(item1) === -1) {
        //         this.tableDataA.push(item1);
        //         this.tableDataB.splice(this.tableDataB.indexOf(item1), 1);
        //         this.checkLenth = checkedArr.length;
        //         this.total2 = this.tableDataB.length;
        //       }
        //     }
        //   }
        // }
      },
      // 最上面的查询
      searchFun () {
        this.page.pageNum = 1;
        this.page.pageSize = 10;
        this.tableDataB = [];
        this.uniqNos = [];
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      submitFun () {
        this.modifyAndAdd = false;
      },
      getList (pageNum, pageSize) {
        let certNosArr = [];
        if (this.billMeterForm.certNos) {
          let res = /\d{17}(\d{1}|x|X)/g;
          certNosArr = this.billMeterForm.certNos.match(res);
        };
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            chargeBillId: this.$route.query.chargeBillId,
            certNos: certNosArr,
            uniqNos: this.uniqNos
          }
        };
        api.post(this.apiPath.hrsc.findByEmp, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataA = res.data.list;
            this.total = res.data.total;
            this.total2 = this.tableDataB.length;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll () {
      },
      viewAll2 () {
      },
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.getList(page, this.page.pageSize);
      },
      pageHandler2: function (page) {
        this.page2.pageNum = page;
      },
      choooseNum2: function (pageSize) {
//        改变分页显示条数;
        this.page2.pageSize = pageSize;
      },
      clickFun: function (data, type) {
        this.modifyAndAdd = true;
      },
      // modifyClose: function (formName) { // 修改对话框打开回调
      //   this.$refs[formName].resetFields();
      // },
      resetAddLocal () {
        this.$router.push({path: '/freedomcharge'});
      },
      billData () {
        this.lookBillFlag = true;
        this.tarsBillFun();
      },
      pageHandlerB: function (page) {
        //        改变当前页
        this.billPage.pageNum = page;
        this.tarBillFun(page, this.billPage.pageSize);
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.viewAll(1, pageSize);
      },
      choooseNumB: function (pageSize) {
//        改变分页显示条数;
        this.billPage.pageSize = pageSize;
        this.tarBillFun(1, pageSize);
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      },
      lookBillClose (formName) {}
    }
  };
</script>

