<template>
  <!--返款认领-->
  <sino-con class="sino-con-more bill_box">
    <sino-title type="levelOne" title="返款认领信息">
      <div class="top-colo fr" v-if="topCoFlag">
        <i class="iconfont sino-tip"></i>
        <span>剩余金额不能为负数，请重新选择</span>
      </div>
    </sino-title>
    <!--title ===> 三个模块-->
    <sino-con class="empass-sino-icon apprl-main bill">
      <div class="empass-middle-box clear apprl-clear bill_aarl">
        <div class="empass-middle-left fl rightbodr bill_title">
          <ul class="bill_ul left-bottom left-botton2">
            <li>
              <div>
                <i class="iconfont sino-qiandai"></i>
              </div>
              <div>
                <p>可认领金额</p>
                <p>
                  <span>￥</span>
                  <span class="tip_num" v-text="moneyFrom.totalNum || 0"></span>
                </p>
              </div>
            </li>
            <li>
              <div>
                <i class="iconfont  sino-gerenzhongxinwodeqianbao"></i>
              </div>
              <div>
                <p>账单金额</p>
                <p>
                  <span>￥</span>
                  <span class="tip_num" v-text="moneyFrom.succNum ||  0"></span>
                </p>
              </div>
            </li>
            <li>
              <div>
                <i class="iconfont  sino-jifen"></i>
              </div>
              <div>
                <p>剩余金额</p>
                <p>
                  <span :class="{'red-color': moneyFrom.failNum}">￥</span>
                  <span :class="{'red-color': moneyFrom.failNum}" class="tip_num" v-text="moneyFrom.failNum || 0"></span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </sino-con>

    <!--汇款和收据查询-->
    <div class="bill_the">
      <div class="bill_left">
        <sino-title class="fl" type="levelTwo"  title="汇款单查询">
          <sino-button type="icon-text" @click="add">高级查询>></sino-button>
        </sino-title>
        <!--高级查询弹层-->
        <sino-dialog :visible.sync="remiAdvFalg" top="5%" size="samll" @close="modifyOpen('remiAdvInpForm')" class="usermanage dialog-com-tree-look-box  bill_tc">
          <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
          <div class="usermanagement-modify1 clearfix">
            <sino-form :model="remiAdvInpForm"  ref="remiAdvInpForm" :rules="remiAdvInpFormRules" class="demo-ruleForm clearfix">
              <sino-form-item label="汇款单编号：" prop="remiNo" class=" billts">
                <sino-input v-model="remiAdvInpForm.remiNo"></sino-input>
              </sino-form-item>
              <sino-form-item label="汇款金额：" prop="remiMoney" class=" billts">
                <sino-input v-model="remiAdvInpForm.remiMoney"></sino-input>
              </sino-form-item>
              <sino-form-item label="汇款方名称："  prop="remiCorpName" class="h25 billinp">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="pageSelectRemiNameSelectBox"
                             :chooseName.sync="remiAdvInpForm.remiCorpName"
                             :chooseId.sync="remiAdvInpForm.remiCorpId"
                             :clear="true"></sino-select>
              </sino-form-item>
              <sino-form-item label="汇款单状态："  prop="stateName" class="h25">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :chooseName.sync="remiAdvInpForm.stateName"
                             :chooseId.sync="remiAdvInpForm.state"
                             :data="{code: 'REMI_STATE', ids: [2, 3]}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </sino-form>
          </div>
          <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="remiInpFun">查 询</sino-button>
      </span>
        </sino-dialog>
        <!--汇款方名称输入框-->
        <div class="local-info bill_shuru">
          <sino-form :model="remiAdvInpForm"  ref="remiAdvInpForm">
            <sino-form-item label="汇款方名称：" class="search-inner-item sino-from-wid" prop="certTypeName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="pageSelectRemiNameSelectBox"
                           :chooseName.sync="remitterFrom.remiCorpName"
                           :chooseId.sync="remitterFrom.remiCorpId"
                           :clear="true"
                           @change="remiInpFun2"></sino-select>
            </sino-form-item>
          </sino-form>
        </div>
        <!--列表-->
        <div class="sino-queryList">
          <div class="sino-table-total bill_list">
            <sino-table :data="remiAdvData" stripe border @select-all="selectTabelRowAll" max-height="416" @select="selectTabelRow" v-on:viewAll="viewAll">
              <sino-table-column type="selection" width="40"></sino-table-column>
              <sino-table-column prop="remiNo" label="汇款单编号"  width="80" align="center"></sino-table-column>
              <sino-table-column prop="remiCorpName" label="汇款方名称" min-width="180"></sino-table-column>
              <sino-table-column prop="remiableAmo" label="可认领金额" min-width="210"></sino-table-column>
              <sino-table-column prop="remiMoney" label="汇款金额" min-width="180"></sino-table-column>
              <sino-table-column prop="stateStr" label="汇款单状态" min-width="140"></sino-table-column>
              <sino-table-column prop="bankAcceDate" label="银行到帐日期" min-width="140"></sino-table-column>
              <sino-table-column prop="operTime" label="发布时间" min-width="140"></sino-table-column>
              <sino-table-column prop="tranPotp" label="备注" min-width="260"></sino-table-column>
            </sino-table>
            <div class="sino-queryspan bill_comb">
          <span>合计：<em>{{total ? total : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{cheTabLen ? cheTabLen : 0}}</em> 条
          </span>
            </div>
          </div>
        </div>

      </div>
      <!--收据编号-->
      <div class="bill_right">
        <sino-title class="fl" type="levelTwo"  title="收据查询">
          <sino-button type="icon-text" @click="receInpFalg = true">高级查询>></sino-button>
        </sino-title>
        <!--高级查询弹层-->
        <sino-dialog :visible.sync="receInpFalg" top="5%" size="samll" @close="modifyOpen('receInpForm')"  class="usermanage dialog-com-tree-look-box  bill_tc">
          <sino-title slot="title" type="levelOne" :title="alerTitle" class="sino-dialog-title"></sino-title>
          <div class="usermanagement-modify1 clearfix">
            <sino-form :model="receInpForm"  ref="receInpForm" class="demo-ruleForm clearfix">
              <sino-form-item label="收据编号：" prop="refundReceiptNo" class="billts">
                <sino-input v-model="receInpForm.refundReceiptNo" ></sino-input>
              </sino-form-item>
              <sino-form-item label="收据金额：" prop="refundReceiptAmo" class="billts">
                <sino-input v-model="receInpForm.refundReceiptAmo" ></sino-input>
              </sino-form-item>
              <sino-form-item label="付款方名称："  prop="payCorpName" class="h25 billinp">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="getFnncReceiptPayCorpName"
                             :chooseName.sync="receInpForm.payCorpName"
                             :chooseId.sync="receInpForm.payCorpId"
                             :clear="true"></sino-select>
              </sino-form-item>
              <sino-form-item label="开具年月：" class="search-inner-item" prop="issuedDate">
                <sino-date-picker class="fl"
                                  v-model="receInpForm.issuedDate"
                                  type="date"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </sino-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <sino-button type="primary" @click="receInpFun">查询</sino-button>
          </span>
        </sino-dialog>
        <!--收据编号输入框-->
        <div class="local-info bill_shuru">
          <sino-form :model="receInpForm"  ref="receInpForm" class="rebtc_shj">
            <sino-form-item label="收据编号：" prop="certTypeName">
              <sino-input v-model="receInpForm.refundReceiptNo"></sino-input>
            </sino-form-item>
          </sino-form>
          <span slot="footer" class="dialog-footer rebtc_btn">
            <sino-button type="primary" @click="receInpFun">查 询</sino-button>
          </span>
        </div>
        <!--列表-->
        <div class="sino-queryList">
          <div class="sino-table-total bill_list">
            <sino-table :data="receInpData" stripe border max-height="416" @select-all="selectTabelRowTwoAll" @select="selectTabelRowTwo">
              <sino-table-column type="selection" width="40"></sino-table-column>
              <sino-table-column prop="payCorpName" label="付款方名称"  width="80" align="center"></sino-table-column>
              <sino-table-column prop="paidTypeName" label="拨付类型" min-width="180"></sino-table-column>
              <sino-table-column prop="refundReceiptAmo" label="金额" min-width="180"></sino-table-column>
              <sino-table-column prop="refundReceiptNo" label="收据编号" min-width="100"></sino-table-column>
              <sino-table-column prop="cashier" label="出纳人" min-width="90"></sino-table-column>
              <sino-table-column prop="issuedDate" label="开具日期" min-width="90"></sino-table-column>
            </sino-table>
            <div class="sino-queryspan bill_comb">
          <span>合计：<em>{{totald? totald : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{cheTabLenTwo ? cheTabLenTwo : 0}}</em> 条
          </span>
            </div>
          </div>
        </div>

      </div>
      <div class="bill_btns">
        <sino-button type="primary" @click="submitForm" :disabled="moneyFrom.failNum < 0">提 交</sino-button>
      </div>
    </div>

  </sino-con>
</template>

<script>
  import api from '../../../api';

  let checkedArr = [];
  let checkedArrTwo = []; // 选中====》收据
  export default {
    data () {
      return {
        getFnncReceiptPayCorpName: this.apiPath.hrsc.getFnncReceiptPayCorpName, // 付款方名称下拉框
        pageSelectRemiNameSelectBox: this.apiPath.hrsc.pageSelectRemiNameSelectBox, // 汇款方名称下拉框
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        // 提交按钮的参数
        submitData: {
          remiList: [], // 汇款单Id集合
          fnncReceiptList: [] // 收费账单Id集合
        },
        remiAdvFalg: false, // 高级查询弹层显示====》汇款
        receInpFalg: false, // 高级查询弹层显示=====》账单
        dictSelUrl: '',
        total: null, // 合計=====>汇款单
        topCoFlag: false,  // 剩余金额为负数显示
        cheTabLen: null,
        cheTabLenTwo: null,
        totald: null, // 合计====》账单
        checkedArr: [ ], // 选中====》汇款单
        checkArr: [ ],  // 选中=====》账单
        findAreaList: '',
        alertTitle: '汇款单高级查询',
        alertsTitle: '账单高级查询',
        alerTitle: '收据高级查询',
        cityData: {}, // 汇款单状态
        // 汇款单列表
        remiAdvData: null,
        // 收据列表
        receInpData: null,
        // 账单列表
        tablesData: [{
          index: '16',
          outLine: '银天科技有限公司'
        }],
        // 账单认领信息title列表--->三小模块
        moneyFrom: {
          totalNum: 0,
          succNum: 0,
          failNum: 0
        },
        // 高级查询弹层=====>汇款
        remiAdvInpForm: {
          remiCorpName: '', // 汇款方名称
          remiCorpId: null,
          remiNo: '',  // 汇款单编号
          remiMoney: '', // 汇款单金额
          state: 2, // 汇款单状态：字典码 REMI_STATE
          stateName: '已发布' // 汇款单状态：字典码 REMI_STATE
        },
        remiAdvInpFormRules: {
          remiMoney: [
            { required: false, message: '请输入数字', trigger: 'change' },
            {validator: this.validator.checkNum, trigger: 'change'}
          ]
        },
        // 单个汇款方名称的数据
        remitterFrom: {
          remiCorpName: '',
          remiCorpId: null,
          remiNo: '',  // 汇款单编号
          remiMoney: '', // 汇款单金额
          state: '', // 汇款单状态：字典码 REMI_STATE
          stateName: '' // 汇款单状态：字典码 REMI_STATE
        },
        // 高级查询弹层=====>收据
        receInpForm: {
          cityName: '',
          payCorpId: null,
          enName: '',
          citaName: '',
          citName: '',
          receMatDate: ''
        },
        // 汇款方名称=====》汇款
        modifyAnForm: {
          certTypeName: ''
        },
        // 账单/供应商名称
        modiAnForm: {
          certTypeName: ''
        }
      };
    },
    mounted () {
      this.remiInpFun();
      this.receInpFun();
    },
    watch: {
      'moneyFrom.failNum' (val) {
        if (val < 0) {
          this.topCoFlag = true;
          return;
        }
        this.topCoFlag = false;
      }
    },
    methods: {
      // 提交
      submitForm () {
        if (this.moneyFrom.failNum < 0) {
          this.$message({message: '剩余金额不能为负数<br><i>请重新选择！</i>', type: 'warning', customClass: 'el-message-width'});
          return;
        }
        api.post(this.apiPath.hrsc.fnncReceiptClaim, this.submitData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '提交成功！', type: 'success'});
            this.remiInpFun();
            this.receInpFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectTabelRowTwo (selection, row) {
        checkedArrTwo = selection;
        this.moneyFrom.succNum = 0;
        this.submitData.fnncReceiptList = selection;
        this.cheTabLenTwo = checkedArrTwo.length;
        // 计算金额
        for (let item of checkedArrTwo) {
          let mm = item.refundReceiptAmo;
          mm = mm * 100;
          this.moneyFrom.succNum += mm;
        }
        this.moneyFrom.succNum = this.moneyFrom.succNum / 100;
        // 剩余金额
        this.moneyFrom.failNum = (this.moneyFrom.totalNum * 100 - this.moneyFrom.succNum * 100) / 100;
      },
      selectTabelRowTwoAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.refundReceiptId) {
            all.push(item);
          }
        }
        this.selectTabelRowTwo(all, row);
      },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.remiId) {
            all.push(item);
          }
        }
        this.selectTabelRow(all, row);
      },
      selectTabelRow (selection, row) {
        checkedArr = selection;
        this.moneyFrom.totalNum = 0;
        this.submitData.remiList = selection;
        this.cheTabLen = checkedArr.length;
        // 计算金额
        for (let item of checkedArr) {
          let mm = item.remiableAmo;
          mm = mm * 100;
          this.moneyFrom.totalNum += mm;
        }
        this.moneyFrom.totalNum = this.moneyFrom.totalNum / 100;
        // 剩余金额
        this.moneyFrom.failNum = (this.moneyFrom.totalNum * 100 - this.moneyFrom.succNum * 100) / 100;
      },
      // 收据查询
      receInpFun () {
        api.post(this.apiPath.hrsc.getFnncReceiptCombination, {data: this.receInpForm}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.receInpData = res.data.list;
            this.totald = res.data.total;
            this.receInpFalg = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 汇款方查询
      remiInpFun () {
        this.$refs.remiAdvInpForm.validate((valid) => {
          if (valid) {
            this.viewAll('str', this.remiAdvInpForm);
          }
        });
      },
      // 汇款单查询
      remiInpFun2 () {
        if (this.remitterFrom.remiCorpId) {
          this.viewAll('', this.remitterFrom);
        }
      },
      viewAll (str, data = this.remiAdvInpForm) {
        api.post(this.apiPath.hrsc.comboGetRemiInfo, {data: data}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiAdvData = res.data.list;
            this.total = res.data.total;
            if (str) {
              this.remitterFrom.remiCorpName = '';
              this.remitterFrom.remiCorpId = null;
              this.remiAdvFalg = false;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 高級查詢彈層顯示
      add () {
        this.remiAdvFalg = true;
      },
      // 账单高级查询
      aladd () {
        this.billsAdd = true;
      },
      // 高级查询弹层
      modifyOpen (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
