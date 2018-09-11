<template>
  <!--薪酬支付申请-->
  <div>
    <div class="usermanage" >
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="薪酬支付查询"></sino-title>
        <sino-form :model="entOrderForm" ref="entOrderForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box invoice-ul">
              <li class="invoice-li">
                <span class="search-inner-name invoice-li-width">客户/供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="entOrderForm.custSuppName"
                             :chooseId.sync="entOrderForm.custSuppId"
                             :clear="true"
                             :token="token"
                             :url="costCenterUrl"
                             >
                </sino-select>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">雇员姓名：</span>
                <sino-input class="fl" type="text" v-model="entOrderForm.empName"
                            :disabled="false"></sino-input>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">证件号码：</span>
                <sino-input class="fl" type="text" v-model="entOrderForm.certNo"
                            :disabled="false"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">发放年月：</span>
                <sino-date-picker
                  v-model="entOrderForm.wageMonth"
                  type="month"
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
              </li>
              <li>
                <span class="search-inner-name">发放进度：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :data="{code: 'WAGE_MOUTH_PROCESS'}"
                             :url="getDictSelectBox"
                             :chooseName.sync="entOrderForm.processName"
                             :chooseId.sync="entOrderForm.process"
                             :clear="true" >
                </sino-select>
              </li>
              <li>
                <span class="search-inner-name">是否有卡：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :data="{code: 'YES_NO'}"
                             :url="getDictSelectBox"
                             :chooseName.sync="entOrderForm.isOwnCardName"
                             :chooseId.sync="entOrderForm.isOwnCard"
                             :clear="true" >
                </sino-select>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchButFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('entOrderForm')">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon bs-none">
            <div class="sino-table-icon-left">
              <sino-button class="fl" type="icon-text" @click="applyfnncpay"><i class="iconfont sino-qian"></i>申请支付
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="modifyTimeFun"><i class="iconfont sino-shuru"></i>修改费用所属期
              </sino-button>
            </div>
          </div>
          <sino-table :data="entTableData" max-height="416" stripe v-on:viewAll="searchButFun" border v-on:select="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="custSuppName" label="客户/供应商名称" min-width="150"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="100">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.empName }}</span>
                <i class="iconfont sino-gantanhao1" v-if="scope.row.isOwnCard === 0"></i>
              </template>
            </sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="wageMonth" label="发放年月" min-width="180"></sino-table-column>
            <sino-table-column prop="processName" label="发放进度" min-width="180"></sino-table-column>
            <sino-table-column prop="issuedTotal" label="应发合计" width="150" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="realTotal" label="实发合计" width="150" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="wageTaxAmo" label="个人所得税" width="150" type="money" text-align="center"></sino-table-column>
            <sino-table-column prop="bankTypeName" label="银行类型" min-width="100"></sino-table-column>
            <sino-table-column prop="bankNo" label="银行卡号" min-width="180"></sino-table-column>
            <sino-table-column prop="wageDay" label="工资日" min-width="100"></sino-table-column>
            <sino-table-column prop="isWageName" label="是否代发工资" min-width="120"></sino-table-column>
            <sino-table-column prop="isTaxName" label="是否代报税" min-width="100"></sino-table-column>
            <sino-table-column label="操作" align="center" width="90" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)">查看详情</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                     :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                     :total="page.total"></sino-page>
        </div>
      </div>
    </div>
    <!--申请财务支付结果-->
    <sino-dialog :visible.sync=batchLeadSeeFlag size="small" class="remi-dialog salaryPaymentApply-tip num-peo-main">
      <sino-title slot="title" type="levelOne" title="提示信息" class="sino-dialog-title"></sino-title>
      <div class="order-new" v-if="appPayBtnFalg === 1">
        <i class="iconfont sino-tip"></i><span>待维护人数：<span v-text="batchApplyResult.failNum"></span> 人</span><span v-if="batchApplyResult.failNum > 0">，<span calss="downPerNumBtn" @click="downloadButton(batchApplyResult.failFilePath)">点击下载</span></span>
      </div>
      <sino-form :model="batchLeadTimeForm" class="follow-form" ref="batchLeadTimeForm">
        <div class="follow-content" :class="{feeDate:appPayBtnFalg === 0}">
          <sino-form-item prop="feeDateNoString" label="费用所属期：" :rules="[{required: true, type: 'date', message: '费用所属期为必填项', trigger: 'change'}]">
            <sino-date-picker
              v-model="batchLeadTimeForm.feeDateNoString"
              type="month"
              :disabled="appPayBtnFalg === 0"
              :editable="false"
              :readonly="false">
            </sino-date-picker>
          </sino-form-item>
        </div>
      </sino-form>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>共申请人数</h6><span v-text="batchApplyResult.sumNum"></span>
          </li>
          <li>
            <h6>可申请人数</h6><span v-text="batchApplyResult.succNum"></span>
          </li>
          <li>
            <h6>可申请金额</h6><span class="text-left"> ￥ {{toMoney(batchApplyResult.applyAmo)}}</span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="createExpense" v-if="appPayBtnFalg === 1">生成报销单</sino-button>
        <sino-button type="primary" @click="conAppPay" v-if="appPayBtnFalg === 0">提交</sino-button>
        <sino-button :class="{'ml20':batchApplyResult.succNum && batchApplyResult.succNum > 0}" @click="batchLeadSeeFlag=false">取 消</sino-button>
      </span>
    </sino-dialog>,
    <!--查看明细-->
    <sino-dialog :visible.sync="seeItemFlag"  size="small" class="see-dirc" top="5%" dialogHide>
      <sino-title slot="title" type="levelOne" title="查看工资明细" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <div :style="{'margin-bottom':'10px'}">
          <sino-title type="levelTwo" title="基本信息"></sino-title>
        </div>
        <ul class="usermanagement-ul">
          <li>
            <h6>客户/供应商名称</h6><span v-text="seeForm.custSuppName"></span>
          </li>
          <li>
            <h6>发放年月</h6><span v-text="seeForm.wageMonth"></span>
          </li>
          <li>
            <h6>雇员姓名</h6><span v-text="seeForm.empName"></span>
          </li>
          <li>
            <h6>银行类型</h6><span v-text="seeForm.bankTypeName"></span>
          </li>
          <li class="li-last">
            <h6>开户行名称</h6><span v-text="seeForm.bankName"></span>
          </li>
          <li class="li-last">
            <h6>银行卡号</h6><span v-text="seeForm.bankNo"></span>
          </li>
        </ul>
        <div :style="{'margin':'10px 0px'}">
        <sino-title type="levelTwo" title="计算结果"></sino-title>
        </div>
        <ul class="usermanagement-ul">
          <li>
            <h6>应发合计</h6><span v-text="seeForm.issuedTotal"></span>
          </li>
          <li>
            <h6>实发合计</h6><span v-text="seeForm.realTotal"></span>
          </li>
          <li>
            <h6>应纳税所得额</h6><span v-text="seeForm.taxableIncome"></span>
          </li>
          <li>
            <h6>年终奖税率</h6><span v-text="seeForm.annuBonusTaxRate"></span>
          </li>
          <li>
            <h6>工资薪金税率</h6><span v-text="seeForm.wageTaxRate"></span>
          </li>
          <li>
            <h6>离职费税额</h6><span v-text="seeForm.quitFeeTaxAmo"></span>
          </li>
          <li>
            <h6>劳务费税额</h6><span v-text="seeForm.laborCostsTaxAmo"></span>
          </li>
          <li>
            <h6>年终奖税额</h6><span v-text="seeForm.annuBounsTaxAmo"></span>
          </li>
          <li>
            <h6>分红税额</h6><span v-text="seeForm.dividendsTaxAmo"></span>
          </li>
          <li>
            <h6>工资薪金税额</h6><span v-text="seeForm.wageTaxAmo"></span>
          </li>
          <li class="li-last">
            <h6>合计扣税</h6><span v-text="seeForm.totalDeductTax"></span>
          </li>
        </ul>
        <div :style="{'margin':'10px 0px'}">
        <sino-title type="levelTwo" title="工资明细"></sino-title>
        </div>
        <ul class="usermanagement-ul">
          <li v-for="(item, index) in seeForm.dets" :key="index" :class="{'li-last': (seeForm.dets.length%2 !== 0 && seeForm.dets.length === index + 1) }">
            <h6>{{item.bsTempletItemName}}</h6><span v-text="item.baseValue"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="onClose" >确 定</sino-button>
        </span>
    </sino-dialog>
    <!--生成报销单-->
    <sino-dialog :visible.sync="reimbFalg" size="large" class="mail-dialog see-dirc suppinfo-dialog-box big-supp-dialog can-input-supp" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="费用报销单" class="sino-dialog-title"></sino-title>
      <div class="remib" style="width: 99%;">
        <!--头部-->
        <div class="remib-top">
          <!--标题-->
          <div class="remib-title remib-title-no-margin">
            <h5>费用报销单</h5>
            <h3>报销日期
              <span>
                <input type="text" v-model="expenInfoData.reimTimeY"/>年
              </span>
              <span>
                <input class="small" type="text" v-model="expenInfoData.reimTimeM"/>月
              </span>
              <span>
                <input class="small" type="text" v-model="expenInfoData.reimTimeD"/>日
              </span>
            </h3>
          </div>
        <!--表格-->
        <div class="reminb-table">
          <ul class="table-left fl">
            <li class="fl width-med lef-co">
              <h6>费 用 项 目</h6>
            </li>
            <li class="fl lef-co">
              <h6>类 别</h6>
            </li>
            <li class="fl lef-co">
              <h6>金 额</h6>
            </li>
            <div v-for="(item, index) in expenInfoData.reimOrderItems" :key="index">
              <li class="fl width-med" ><input type="text" placeholder="可输入" v-model="item.reimOrderItem" v-if="!item.empty"/></li>
              <li class="fl">{{item.reimOrderTypeName}}</li>
              <li class="fl">{{item.reimOrderItemAmo}}</li>
            </div>
            <li class="fl width-med lef-co">
              <h6>报 销 金 额 合 计</h6>
            </li>
            <li class="fl"></li>
            <li class="fl"></li>
          </ul>
          <!--表格上右-->
          <ul class="table-right fl">
            <li class="fl right-tl right-t1">
              <h6>单 位 负 责 人</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              <div class="sign-container sino-menu" @click="openSignFun('chargePerId')">
                <img :src="expenInfoData.chargePerId" v-if="expenInfoData.chargePerId"/>
              </div>
            </li>
            <li class="fl right-tl">
              <h6>审 查 意 见</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <span>
                <input type="text" v-model="expenInfoData.reviewPerId"/>
              </span>
            </li>
            <li class="fl right-tl right-t1">
              <h6>财 务 审 核</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              <span>
                <input type="text" v-model="expenInfoData.fnncAppId"/>
              </span>
            </li>
            <li class="fl right-tl">
              <h6>部 门 审 查</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <span>
                <input type="text" v-model="expenInfoData.depAppId"/>
              </span>
            </li>
            <li class="fl right-meo bor-null">
              <span>￥</span><span>{{toMoney(expenInfoData.reimAmoTotal)}}</span>
            </li>
          </ul>
          <!--表格底部-->
          <ul class="table-bottom fl">
            <li class="fl bottom-f1 bor-null">
              <span class="fl meo-mar-le">核实金额（大写）
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 7)?toBigNum(expenInfoData.reimAmoTotal, 7):'零'}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 6)?toBigNum(expenInfoData.reimAmoTotal, 6):'零'}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 5)?toBigNum(expenInfoData.reimAmoTotal, 5):'零'}}</span>万
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 4)?toBigNum(expenInfoData.reimAmoTotal, 4):'零'}}</span>仟
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 3)?toBigNum(expenInfoData.reimAmoTotal, 3):'零'}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 2)?toBigNum(expenInfoData.reimAmoTotal, 2):'零'}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 1)?toBigNum(expenInfoData.reimAmoTotal, 1):'零'}}</span>元
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, -1)?toBigNum(expenInfoData.reimAmoTotal, -1):'零'}}</span>角
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, -2)?toBigNum(expenInfoData.reimAmoTotal, -2):'零'}}</span>分
              </span>
              <span class="fr mr10">￥ {{toMoney(expenInfoData.reimAmoTotal)}} 小写</span>
            </li>
            <li class="fl bottom-f2 bott-co">
              <h6>借款数</h6>
            </li>
            <li class="fl bottom-f3">
              <input type="text" v-model="expenInfoData.loanAmo"/>
            </li>
            <li class="fl bottom-f3 bott-co">
              <h6>应退金额</h6>
            </li>
            <li class="fl bottom-f3">
              <input type="text" v-model="expenInfoData.refundAmo"/>
            </li>
            <li class="fl bottom-f3 bott-co">
              <h6>应补金额</h6>
            </li>
            <li class="fl bottom-f3 bor-null">
              <input type="text" v-model="expenInfoData.patchAmo"/>
            </li>
            <li class="fl bottom-f1 bor-null bottom-t1 bottom-small-margin">
              <div class="fl">出纳：<span><input type="text" v-model="expenInfoData.cashierPerId"/></span></div>
              <div class="fl">经办人：<span><input type="text" v-model="expenInfoData.operatorId"/></span></div>
              <div class="fl">报销人：<span><input type="text" v-model="expenInfoData.reimPerId"/></span></div>
            </li>
          </ul>
        </div>
      </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="sureApplyPay">确认申请支付</sino-button>
      </span>
    </sino-dialog>
    <!--费用所属期-->
    <sino-dialog :visible.sync="modifyFlagVisible" class="leads-follow leads-follow-width-label">
      <sino-title slot="title" type="levelOne" title="修改费用所属期" class="sino-dialog-title"></sino-title>
      <div class="follow-select">
        <sino-form :model="modifyTimeForm" class="follow-form modifyTimeForm" ref="modifyTimeForm">
          <div class="follow-content">
            <sino-form-item prop="feeDateNoString" label="费用所属期：" :rules="[{required: true, type: 'date', message: '费用所属期为必填项', trigger: 'change'}]">
              <sino-date-picker
                v-model="modifyTimeForm.feeDateNoString"
                type="month"
                :editable="false"
                :readonly="false">
              </sino-date-picker>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitModifyTime">保 存</sino-button>
      </span>
    </sino-dialog>
    <!--签名-->
    <sino-dialog :visible.sync="signFlag" dialogHide class="dialog-sign" @open="singOpen" @close="signClose">
      <sino-title slot="title" type="levelOne" title="请签名" class="sino-dialog-title"></sino-title>
      <div id="sign-box">
        <span class="fr" @click="clearSign">清空</span>
        <canvas id="canvas" width="503" height="150"></canvas>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button @click="signSave(valueName)" class="sign-button">确 定</sino-button>
      </span>
    </sino-dialog>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        costCenterUrl: this.apiPath.hrsc.findCustAndSuppByConinfo,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        suppUrl: this.apiPath.hrsc.selectBox,
        roleUrl: this.apiPath.author.findUserRoleSelectBoxInfo,
        token: Cookies.get('Token'),
        routerView: false,
        batchLeadSeeFlag: false,
        appPayBtnFalg: null,
        checkedArr: [],
        entOrderForm: {
          custName: '',
          custSuppName: '',
          custId: '',
          custSuppId: '',
          empName: '',
          certNo: '',
          wageMonth: '',
          processName: '',
          process: '',
          isOwnCardName: '',
          isOwnCard: ''
        },
        bigNumArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        batchApplyResult: {},
        expenInfoData: {},
        seeForm: {
          custName: '',
          custSuppName: '',
          wageMonth: '',
          empName: '',
          bankName: '',
          bankNo: '',
          issuedTotal: '',
          certCode: '',
          realTotal: '',
          annuBonusTaxRate: '',
          wageTaxRate: '',
          quitFeeTaxAmo: '',
          laborCostsTaxAmo: '',
          annuBounsTaxAmo: '',
          dividendsTaxAmo: '',
          wageTaxAmo: '',
          totalDeductTax: '',
          sinsAcctName: '',
          unitSinsNo: '',
          retReason: '',
          taxableIncome: '',
          dets: {
            bsTempletItemName: '',
            baseValue: ''
          }
        },
        modifyTimeForm: {
          feeDateNoString: ''
        },
        batchLeadTimeForm: {
          feeDateNoString: ''
        },
        seeItemFlag: false,
        entTableData: null,
        page: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
        },
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        reimbFalg: false,
        // 申请支付---提交按钮发送的参数
        subButtPara: {
          reimAmoTotal: null,
          reimPerId: null,
          wageBaseIds: [],
          reimOrderItems: []
        },
        modifyFlagVisible: false,
        empFlag: true,
        emetFlag: true,
        bot: '', // 画布DOM
        coordinate: {
          x: '',
          y: '',
          x1: '',
          y1: ''
        },
        signContentFlag: 0,
        time: '',
        canvas: '',
        content: '',
        isMouseDown: false,
        signFlag: false,
        base64Str: ''
      };
    },
    watch: {
      $route: {
        handler: function (val) {
          if (val.path === "/entOrderSearch") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      openSignFun (item) {
        this.signFlag = true;
        this.valueName = item;
      },
      // 保存
      singOpen () {
        let that = this;
        setTimeout(function () {
          // 创建画布
          that.canvas = document.getElementById("canvas");
          that.canvas.width = '503';
          // 获取上下文
          that.context = that.canvas.getContext("2d");
          that.bot = document.getElementById("sign-box");
          that.bot.onmousedown = that.mouseDownAction;
          that.bot.onmousemove = that.mouseMoveAction;
          document.onmouseup = that.mouseUpAction;
        });
      },
      signClose () {
        this.clearSign();
      },
      clearSign () {
        this.context.clearRect(0, 0, 503, 150);
        this.base64Str = '';
      },
      // 签名保存
      signSave (value) {
        console.log(value, 'value');
        this.base64Str = this.canvas.toDataURL("image/png", 0.5);
        this.expenInfoData[value] = this.base64Str;
        this.signFlag = false;
      },
      mouseDownAction (e) {
        this.isMouseDown = true;
        // 记录下鼠标点击的时候的位置
        this.coordinate.x = e.offsetX;
        this.coordinate.y = e.offsetY;
      },
      mouseMoveAction (e) {
        if (this.isMouseDown) {
          this.coordinate.x1 = e.offsetX;
          this.coordinate.y1 = e.offsetY;
          this.drowline(this.coordinate.x, this.coordinate.y, this.coordinate.x1, this.coordinate.y1);
          this.signContentFlag++;
        }
      },
      mouseUpAction () {
        this.isMouseDown = false;
        this.signContentFlag = 0;
      },
      drowline (num1, num2, num3, num4) {
        if (this.signContentFlag) {
          this.context.beginPath();
        }
        // 移动画笔的初始位置
        this.context.moveTo(num1, num2);
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#000";
        // 移动画笔的结束位置
        this.context.lineTo(num3, num4);
        // 开始绘制
        this.context.stroke();
        if (this.signContentFlag != 0) {
          this.coordinate.x = this.coordinate.x1;
          this.coordinate.y = this.coordinate.y1;
        }
      },

      // 申请财务支付
      applyfnncpay () {
        if (this.checkedArr.length === 0) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          let arr = this.checkedArr.map(function (item) {
            return {wageBaseId: item.wageBaseId};
          });
          api.post(this.apiPath.salary.applyPay, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.appPayBtnFalg = res.data.flag;
              this.batchApplyResult = res.data;
              this.batchLeadTimeForm.feeDateNoString = new Date();
              this.batchLeadSeeFlag = true;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 申请支付---提交
      conAppPay () {
        api.post(this.apiPath.salary.findReimOrder, this.batchApplyResult.wageBaseIds).then(res => {
          if (res.code === 'CPYY-00001') {
            for (let item in this.subButtPara) {
              this.subButtPara[item] = res.data[item];
            }
            this.subButtPara.feeDateNoString = Vue.filter('date')(this.batchLeadTimeForm.feeDateNoString, 'yyyy-MM');
            this.subButtPara.reimDate = '2018-05-28';
            api.post(this.apiPath.salary.saveReimOrder, this.subButtPara).then(res => {
              if (res.code === 'CPYY-00001') {
                this.batchLeadSeeFlag = false;
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页回调
      pageHandler (page) {
        this.page.pageNum = page;
        this.searchFun();
      },
      // 改变显示条数回调
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.searchFun();
      },
      // 重置
      resetFun () {
        for (var key in this.entOrderForm) {
          this.entOrderForm[key] = '';
        }
      },
      // 复选框选择回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      // 转化财务数字
      toMoney (s, n) {
        if (!s && s !== 0) {
          return;
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },
      // 转化为大写数字
      toBigNum (num, index) {
        if (num || num === 0) {
          num = num.toFixed(2).toString();
          var numArr = num.split(".");
          if (index === -1) {
            return this.bigNumArr[parseInt(numArr[1][0])];
          } else if (index === -2) {
            return this.bigNumArr[parseInt(numArr[1][1])];
          } else {
            if (index > numArr[0].length) {
              return '';
            } else {
              return this.bigNumArr[parseInt(numArr[0].split("").reverse().join("")[index - 1])];
            }
          }
        }
      },
      // 生成报销单
      createExpense () {
        this.$refs.batchLeadTimeForm.validate((valid) => {
          if (valid) {
            this.batchLeadSeeFlag = false;
            let arr = this.checkedArr.map(function (item) {
              return item.wageBaseId;
            });
            api.post(this.apiPath.salary.findReimOrder, arr).then(res => {
              if (res.code === 'CPYY-00001') {
                let resData = res.data;
                let lengthNum = resData.reimOrderItems.length;
                if (lengthNum < 5) {
                  for (var i  = 0; i < 5 - lengthNum; i++) {
                    resData.reimOrderItems.push({empty: true});
                  }
                }
                this.expenInfoData = resData;
                this.expenInfoData.reimTimeY = new Date().getFullYear();
                this.expenInfoData.reimTimeM = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
                this.expenInfoData.reimTimeD = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
              }
            }).catch(err => {
              console.log(err);
            });
            this.reimbFalg = true;
          }
        });
      },
      // 修改费用所属期
      modifyTimeFun () {
        if (this.checkedArr.length === 0) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.modifyTimeForm.feeDateNoString = new Date();
          this.modifyFlagVisible = true;
        }
      },
      // 提交费用所属期
      submitModifyTime () {
        this.$refs.modifyTimeForm.validate((valid) => {
          let arr = this.checkedArr.map(function (item) {
            return item.wageBaseId;
          });
          api.post(this.apiPath.salary.updateFeeDateNo, {wageBaseIds: arr, feeDateNoString: Vue.filter('date')(this.modifyTimeForm.feeDateNoString, 'yyyy-MM')}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.modifyFlagVisible = false;
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      // 确认申请支付
      sureApplyPay () {
        let obj = {
          reimAmoTotal: this.expenInfoData.reimAmoTotal,
          reimPerId: this.expenInfoData.reimPerId,
          reimOrderItems: [],
          wageBaseIds: [],
          chargePerId: this.expenInfoData.chargePerId,
          reviewPerId: this.expenInfoData.reviewPerId,
          fnncAppId: this.expenInfoData.fnncAppId,
          depAppId: this.expenInfoData.depAppId,
          loanAmo: this.expenInfoData.loanAmo,
          refundAmo: this.expenInfoData.refundAmo,
          patchAmo: this.expenInfoData.patchAmo,
          cashierPerId: this.expenInfoData.cashierPerId,
          operatorId: this.expenInfoData.operatorId,
          feeDateNoString: Vue.filter('date')(this.batchLeadTimeForm.feeDateNoString, 'yyyy-MM')

        };
        for (var i = 0; i < this.expenInfoData.reimOrderItems.length; i++) {
          if (!this.expenInfoData.reimOrderItems[i].empty) {
            obj.reimOrderItems.push(this.expenInfoData.reimOrderItems[i]);
            obj.wageBaseIds.push(this.expenInfoData.reimOrderItems[i].wageBaseId);
          }
        }
        if (this.expenInfoData.reimTimeY && this.expenInfoData.reimTimeM && this.expenInfoData.reimTimeD) {
          obj.reimDate = this.expenInfoData.reimTimeY + '-' + this.expenInfoData.reimTimeM + '-' + this.expenInfoData.reimTimeD;
        }
        api.post(this.apiPath.salary.saveReimOrder, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$alert('您已成功申请支付，<br/>报销单编号：' + res.data, '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning',
              dragFlag: true,
              customClass: '',
              lockScroll: true,
              callback: action => {}
            });
            this.reimbFalg = false;
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 一级查询
      searchButFun () {
        this.page.pageNum = 1;
        this.searchFun();
      },
      // 查询
      searchFun () {
        var dataObj = JSON.parse(JSON.stringify(this.entOrderForm));
        dataObj.wageMonth = Vue.filter('date')(dataObj.wageMonth, 'yyyy-MM');
        var obj = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          data: dataObj
        };
        api.post(this.apiPath.salary.findPaySalary, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.entTableData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 待维护人数下载
      downloadButton (url) {
        api.download(url);
      },
      // 查看明细确定
      onClose () {
        this.seeItemFlag = false;
      },
      // 查看明细
      seeFun (scope) {
        let _this = this;
        api.post(_this.apiPath.salary.findWageDet, scope).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.seeItemFlag = true;
            _this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style scoped>
  .table-bottom li.bottom-small-margin div {
    margin: 0px 39px;
  }
  .sign-container {
    width: 232px;
    height: 62px;
  }
</style>
