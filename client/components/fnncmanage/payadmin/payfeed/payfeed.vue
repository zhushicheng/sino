<template>
    <!--<div>支付反馈</div>-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="退汇查询"></sino-title>
      <sino-form :model="refInqForm" ref="refInqForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="li-wid search-inner-one">
              <sino-form-item label="客户/供应商名称：" class="search-inner-item" prop="custSuppName">
                <!--<sino-input class="fl" type="text"-->
                            <!--v-model="refInqForm.custSuppName"-->
                            <!--:disabled="false"></sino-input>-->
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="apiPath.hrsc.findCustAndSuppSelectBox"
                             :chooseName.sync="refInqForm.custSuppName"
                             :chooseId.sync="refInqForm.custSuppId" :clear="true"
                ></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="refInqForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="refInqForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li class="search-inner-name">
                  <sino-form-item label="类别：" class="search-inner-item" prop="reimOrderTypeName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'REIM_ORDER_TYPE'}"
                                 :chooseName.sync="refInqForm.reimOrderTypeName"
                                 :chooseId.sync="refInqForm.reimOrderType"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="search-inner-name">
                  <sino-form-item label="支付进度：" class="search-inner-item" prop="reimPayStateName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'PAY_SCHEDULE', ids:[7, 8, 9, 11]}"
                                 :chooseName.sync="refInqForm.reimPayStateName"
                                 :chooseId.sync="refInqForm.reimPayState"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="search-inner-name">
                  <sino-form-item label="报销单编号：" class="search-inner-item" prop="reimOrderNo">
                    <sino-input class="fl" type="text"
                                v-model="refInqForm.reimOrderNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li class="search-inner-name">
                  <sino-form-item label="银行所属：" class="search-inner-item" prop="bankOfferTypeName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'BABK_OFFER_TYPE'}"
                                 :chooseName.sync="refInqForm.bankOfferTypeName"
                                 :chooseId.sync="refInqForm.bankOfferType"
                                 :clear="true"
                    ></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-button-box-1">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetForm('refInqForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
        <div class="search-more">
          <div @click="searchFlag = !searchFlag">
            <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
            <span v-if="!searchFlag">高级查询</span>
            <span v-if="searchFlag">基本查询</span>
          </div>
        </div>
      </sino-form>
    </sino-con>
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="retu()"><i class="iconfont sino-tuihui1"></i>退回</sino-button>
            <sino-button type="icon-text" @click="refund()"><i class="iconfont sino-biji"></i>退汇</sino-button>
            <sino-button type="icon-text" @click="conPay()"><i class="iconfont sino-qian"></i>确认支付</sino-button>
            <sino-button type="icon-text" @click="downOff()"><i class="iconfont sino-download-copy"></i>下载报盘</sino-button>
          </div>
        </div>
        <sino-table :data="refInqData" max-height="416" v-on:viewAll="viewAll" border stripe v-on:select="selectCallBack" @select-all="selectAll">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="custSuppName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="180"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="reimOrderNo" label="报销单编号" min-width="105"></sino-table-column>
          <sino-table-column prop="reimOrderTypeName" label="类别" min-width="120"></sino-table-column>
          <sino-table-column prop="reimOrderItemAmo" label="金额" type="money" width="120"></sino-table-column>
          <sino-table-column prop="bankNameP" label="银行类型" min-width="120"></sino-table-column>
          <sino-table-column prop="bankNoP" label="银行卡号" min-width="120"></sino-table-column>
          <sino-table-column prop="acctBankNameP" label="开户行名称" min-width="120"></sino-table-column>
          <sino-table-column prop="applyDate" label="申请日期" min-width="120"></sino-table-column>
          <sino-table-column prop="reimPayStateName" label="支付进度" min-width="120"></sino-table-column>
          <sino-table-column prop="isLoadOfferName" label="是否下载报盘" min-width="120"></sino-table-column>
          <sino-table-column prop="payDate" label="支付日期" min-width="120"></sino-table-column>
          <sino-table-column prop="busiRespName" label="申请人" min-width="120"></sino-table-column>
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
    <!--退回弹层-->
    <sino-dialog :visible.sync="retuFlag" :top="'15%'" class="retu" size="small"  v-on:close="resetForm('retuFrom')">
      <sino-title slot="title" type="levelOne" title="退回" class="sino-dialog-title"></sino-title>
      <sino-form :model="retuFrom" :rules="retuFromRules" ref="retuFrom" class="demo-sendAddrAddForm clear mt15">
        <sino-form-item label="退回数量：" prop="rebackCount" style="width: 47%;">
          <sino-input v-model="retuFrom.rebackCount"></sino-input>
        </sino-form-item>
        <sino-form-item label="退回金额：" prop="rebackAmo" style="width: 47%;">
          <sino-input v-model="retuFrom.rebackAmo"></sino-input>
        </sino-form-item>
        <sino-form-item prop="remark" label="反馈内容：" class="sino-form-item-width" style="width: 94%;">
          <sino-input type="textarea" v-model="retuFrom.remark"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="retuSubmit">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--退汇弹层-->
    <sino-dialog :visible.sync="refundFlag" :top="'15%'" class="retu" size="small"  v-on:close="resetForm('refundFrom')">
      <sino-title slot="title" type="levelOne" title="退汇" class="sino-dialog-title"></sino-title>
      <sino-form :model="refundFrom" :rules="refundFromRules" ref="refundFrom" class="demo-sendAddrAddForm clear mt15">
        <sino-form-item label="退汇数量：" prop="rebackCount" style="width: 47%;">
          <sino-input v-model="refundFrom.rebackCount"></sino-input>
        </sino-form-item>
        <sino-form-item label="退汇金额：" prop="rebackAmo" style="width: 47%;">
          <sino-input v-model="refundFrom.rebackAmo"></sino-input>
        </sino-form-item>
        <sino-form-item prop="remark" label="反馈内容：" class="sino-form-item-width" style="width: 94%;">
          <sino-input type="textarea" v-model="refundFrom.remark"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="refundSubmit('refundFrom')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--确认支付-->
    <sino-dialog :visible.sync="conPayFlag" :top="'15%'" size="small" class="leads-follow " @close="resetForm('conPayFrom')">
      <sino-title slot="title" type="levelOne" title="确认支付" class="sino-dialog-title"></sino-title>
      <sino-form class="demo-ruleForm" :model="conPayFrom"  :rules="conPayFromRules" ref="conPayFrom">
        <sino-form-item prop="payDate" label="支付日期：" >
          <sino-date-picker class="fl"
                            type="date"
                            v-model="conPayFrom.payDate"
                            :editable="false"
                            :readonly="false"
                            :clearable="true">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item prop="payAccvEncName" label="上传凭证：" >
          <sino-upload
            ref="fileNameFile"
            :action="uploadFilePublic"
            :show-file-list="false"
            :auto-upload="true"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError">
            <div slot="trigger">
              <input class="uploadFileBox" readonly="true" v-model="conPayFrom.payAccvEncName"/>
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
        <sino-button class="clear mgauto" type="primary" @click="conPaySubmit">确 定</sino-button>
      </sino-form>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../../api';
  import Vue from 'vue';

  let checkedArr = [];
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        // 退汇查询
        refInqForm: {
          custSuppName: '',      // 客户供应商名称
          empName: '',       // 雇员名称
          certNo: '',      // 证件号码
          reimOrderType: null,       // 类型  PAID_TYPE
          reimOrderTypeName: '',       // 类型  PAID_TYPE
          reimPayState: null,     // 支付状态  PAY_SCHEDULE（7,8,9,10）
          reimPayStateName: '',     // 支付状态  PAY_SCHEDULE（7,8,9,10）
          bankOfferType: null,       // 银行所属YES_NO
          bankOfferTypeName: '',       // 银行所属YES_NO
          sourceId: 1,      // 默认1 必传
          reimOrderNo: ''
        },
        searchFlag: false,
        // 表格数据
        refInqData: null,
        // 退回弹层
        retuFrom: {
          rebackCount: null, // 数量
          rebackAmo: null, // 金额
          remark: '' // 反馈内容
        },
        retuFlag: false,
        retuFromRules: {},
        // 退汇弹层
        refundFrom: {
          rebackCount: null, // 数量
          rebackAmo: null, // 金额
          remark: '' // 反馈内容
        },
        refundFlag: false,
        refundFromRules: {},
        // 确认支付弹层
        conPayFrom: {
          reimOrderIdS: [], // 报销单明细数组  必传
          payDate: '',  // 日期 必传
          payAccvEncName: '', // 附件名称
          payAccvEncId: '' // 凭证唯一号
        },
        conPayFlag: false,
        conPayFromRules: {
          payDate: [
            {required: true, message: '请选择支付日期', trigger: 'change', type: 'date'}
          ]
        },
        // 分页信息
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
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
      // 最上面的查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      /**
       * 获取表格中报销单明细id
       */
      billId () {
        let arr = [];
        for (let item of checkedArr) {
          arr.push(item.reimDetId);
        }
        return arr;
      },
      // 查看全部
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.refInqForm
        };
        api.post(this.apiPath.hrsc.getRemiOrderDetCombination, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.refInqData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectAll (selectTion, row) {
        let arr = [];
        for (let item of selectTion) {
          if (item.custSuppName) {
            arr.push(item);
          }
        }
        this.selectCallBack(arr);
      },
      selectCallBack (selectTion, row) {
        checkedArr = selectTion;
      },
      /**
       * 退回
       */
      retu () {
        if (checkedArr.length === 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        api.post(this.apiPath.hrsc.previwReback, {reimOrderDetList: this.billId()}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.retuFlag = true;
            for (let item in res.data) {
              this.retuFrom[item] = res.data[item];
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 退回弹层---》确定
       */
      retuSubmit () {
        let obj = {
          reimOrderDetList: this.billId(),
          remark: this.retuFrom.remark,
          invoiceId: 0
        };
        api.post(this.apiPath.hrsc.reback, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '已退回', type: 'success'});
            this.retuFlag = false;
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 退汇
       */
      refund () {
        if (checkedArr.length === 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        api.post(this.apiPath.hrsc.previwReback, {reimOrderDetList: this.billId()}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.refundFlag = true;
            for (let item in res.data) {
              this.refundFrom[item] = res.data[item];
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 退汇弹层---》确定
       */
      refundSubmit () {
        let obj = {
          reimOrderDetList: this.billId(),
          remark: this.refundFrom.remark,
          invoiceId: 1
        };
        api.post(this.apiPath.hrsc.reback, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '已退汇', type: 'success'});
            this.refundFlag = false;
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 确认支付
       */
      conPay () {
        if (checkedArr.length === 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        this.conPayFlag = true;
      },
      /**
       * 确认支付---》确定
       */
      conPaySubmit () {
        this.$refs.conPayFrom.validate((valid) => {
          if (valid) {
            this.conPayFrom.reimOrderIdS = this.billId();
            this.conPayFrom.payDate = Vue.filter('date')(this.conPayFrom.payDate, 'yyyy-MM-dd');
            api.post(this.apiPath.hrsc.doDetApply, this.conPayFrom).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '已支付！', type: 'success'});
                this.conPayFlag = false;
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      /**
       * 下载报盘
       */
      downOff () {
        if (checkedArr.length === 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        api.post(this.apiPath.hrsc.downDetLoadOffer, this.billId()).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.samPath) {
              api.download(res.data.samPat);
            }
            if (res.data.diffPath) {
              api.download(res.data.diffPath);
            }
            if (res.data.qiYePath) {
              api.download(res.data.qiYePath);
            }
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getFileName (file) {
        this.conPayFrom.payAccvEncName = file.name;
      },
      fileSuccess (res) {
        this.conPayFrom.payAccvEncId = res.data;
      },
      fileError () {},
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      }
    }
  };
</script>
