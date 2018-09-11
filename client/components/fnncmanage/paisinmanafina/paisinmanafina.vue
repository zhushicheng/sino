<template>
  <!--拨付单管理-业务员-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="拨付单查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="searchForm.empName"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.certNo"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="拨付类型：" class="search-inner-item" prop="paidTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :data="{code:'PAID_TYPE'}"
                             :chooseName.sync="searchForm.paidTypeName"
                             :chooseId.sync="searchForm.paidType"
                             :clear="true"
                             @contentChange="paidFun(searchForm.paidType)"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="待遇类型：" class="search-inner-item" prop="treatTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :linkage="true"
                             :url="getDictSelectBox"
                             :data="paidDa"
                             :chooseName.sync="searchForm.treatTypeName"
                             :chooseId.sync="searchForm.treatType" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="支付进度：" class="search-inner-item" prop="payScheduleName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :data="{code:'PAY_SCHEDULE', ids: [2, 3]}"
                             :chooseName.sync="searchForm.payScheduleName"
                             :chooseId.sync="searchForm.paySchedule" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保个人编号：" class="search-inner-item" prop="sinsPerNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.sinsPerNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="收据编号：" class="search-inner-item" prop="refundReceiptNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.refundReceiptNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('searchForm')">重 置</sino-button>
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
            <sino-button type="icon-text" @click="addFun()"><i class="iconfont sino-zhangdan"></i>开收据</sino-button>
          </div>
        </div>
        <sino-table :data="paiSinManaData" max-height="416" v-on:viewAll="viewAll" border stripe v-on:select="selectCallBack" @select-all="selectAll">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="180"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="paidTypeName" label="拨付类型" min-width="80"></sino-table-column>
          <sino-table-column prop="treatTypeName" label="待遇类型" min-width="105"></sino-table-column>
          <sino-table-column prop="paidAmoTotal" label="金额" min-width="105"></sino-table-column>
          <sino-table-column prop="issuedDate" label="收据日期" min-width="120"></sino-table-column>
          <sino-table-column prop="payScheduleName" label="支付进度" min-width="120"></sino-table-column>
          <sino-table-column prop="userName" label="经办人" min-width="95"></sino-table-column>
          <sino-table-column prop="refundReceiptNo" label="收据编号" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看附件</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum"
                   v-bind:page-size="page.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!--开收据弹层-->
    <sino-dialog :visible.sync="openRecFalg"  size="small" v-on:close="lookBillClose('openRecFrom')" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="申请开收据" class="sino-dialog-title "></sino-title>
      <div class="order-new prompt-style">
        <i class="iconfont sino-tip"></i><span>拨付单张数： <i>{{payOrderSum}}</i> 张，拨付单总金额：<i>￥  {{payOrderAddSun}}</i></span>
      </div>
      <div class="leadsAdd-form">
        <sino-form :model="openRecFrom" :rules="openRecFromRules" ref="openRecFrom" class="leadsAdd-Form">
          <sino-form-item label="付款方名称：" class="sino-form-item-width" prop="payCorpName">
            <sino-input v-model="openRecFrom.payCorpName" class="leads-company-input" :disabled='payCorpFalg'></sino-input>
          </sino-form-item>
          <sino-form-item label="收据编号：" prop="refundReceiptNo">
            <sino-input v-model="openRecFrom.refundReceiptNo"></sino-input>
          </sino-form-item>
          <sino-form-item label="拨付类型：" prop="paidTypeName">
            <sino-input v-model="openRecFrom.paidTypeName" :disabled='paidFalg'></sino-input>
          </sino-form-item>
          <sino-form-item label="收据金额：" prop="refundReceiptAmo" class="yen-father">
            <i class="yen">&yen;</i>
            <sino-input v-model="openRecFrom.refundReceiptAmo" class="inco-padding"></sino-input>
          </sino-form-item>
          <sino-form-item label="出纳人：" prop="cashier">
            <sino-input v-model="openRecFrom.cashier"></sino-input>
          </sino-form-item>
          <sino-form-item label="开具日期：" prop="issuedDate">
            <sino-date-picker
              type="date"
              v-model="openRecFrom.issuedDate"
              :editable="false"
              :readonly="false"
              :clearable="true"
            >
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="备注：" class="sino-form-item-width"  prop="remark">
            <sino-input type="textarea" v-model="openRecFrom.remark"></sino-input>
          </sino-form-item>
        </sino-form>
        <div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看拨付单附件弹层-->
    <sino-dialog :visible.sync="annexFlag" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看拨付单附件" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last upload-fil">
            <h6>上传附件</h6>
            <span>
              <span>
                {{annexData.paidOrderEncFileName}}
                <a v-if="annexData.previewPaidOrderEncFilePath" href="javascript:void(0)" @click="batchAllPreview(annexData.previewPaidOrderEncFilePath)" class="file-del-btn">预览</a>
                <i v-if="annexData.previewPaidOrderEncFilePath" class="file-del-btn"> | </i>
                <a v-if="annexData.paidOrderEncFilePath" href="javascript:void(0)" @click="batchAllDownload(annexData.paidOrderEncFilePath)" class="file-del-btn">下载</a>
              </span>
              <span class="spanTwo span-dis">
                {{annexData.paidOrderEncDetFileName}}
                <a v-if="annexData.previewPaidOrderDetEncFilePath" href="javascript:void(0)" @click="batchAllPreview(annexData.previewPaidOrderDetEncFilePath)" class="file-del-btn">预览</a>
                <i v-if="annexData.previewPaidOrderDetEncFilePath" class="file-del-btn"> | </i>
                <a v-if="annexData.paidOrderDetEncFilePath" href="javascript:void(0)" @click="batchAllDownload(annexData.paidOrderDetEncFilePath)" class="file-del-btn">下载</a>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer see-item-sure">
          <sino-button type="primary"  @click="annexFlag = false">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--预览大图-->
    <div class="busconeav-view-large bus-view-large-height" v-if="largeImgFlag">
      <sino-title slot="title" type="levelOne">
        <i class="iconfont fr sino-guanbi" @click="largeImgFlag=false"></i>
      </sino-title>
      <img :src="uploadImgPath" alt="" class="img-wi-hi">
    </div>
  </div>
</template>

<script>
  import api from '../../../api';
  import Vue from 'vue';

  let checkedArr = [];
  export default {
    data () {
      return {
        treatSelectBox: this.apiPath.hrsc.treatSelectBox, //  待遇类型下拉框
        getPaidCombination: this.apiPath.hrsc.getPaidCombination, // 拨付单查询
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        largeImgFlag: false,
        uploadImgPath: '',
        uploadFileStyle: null, // 控制li高
        payCorpFalg: true,    // 付款方是否可填
        paidFalg: true,
        bigArr: [],
        // 待遇类型下拉框
        paidDa: {
          code: ''
        },
        // 拨付单张数
        payOrderSum: 0,
        // 拨付单总金额
        payOrderAddSun: 0,
        // 查看拨付单附件弹层
        annexFlag: false,
        // 附件名字
        annexData: {},
        // 开收据弹层
        openRecFalg: false,
        // 开收据弹层--->数据
        openRecFrom: {
          refundReceiptNo: null, // 收据编号
          payCorpName: "", // 收款方名称
          paidType: '', // 拨付类型
          paidTypeName: '', // 拨付类型
          refundReceiptAmo: "", // 收据金额
          cashier: "", // 出纳人"
          issuedDate: "", // 出具日期
          paidIdS: [], // 勾选拨付单id数组
          paidDetIdS: [] // 勾选拨付单明细id数组
        },
        // 开收据弹层--->基本信息校验
        openRecFromRules: {
          refundReceiptNo: [
            {required: true, message: '请输入收据编号', trigger: 'blur'}
          ],
          refundReceiptAmo: [
            {required: true, message: '请输入收据金额', trigger: 'blur'}
          ],
          issuedDate: [
            {required: true, message: '请选择开具日期', trigger: 'change', type: 'date'}
          ],
          cashier: [
            {required: true, message: '请输入出纳人', trigger: 'blur'}
          ]
        },
        // 查询的数据
        searchForm: {
          empName: '',  // 雇员姓名
          certNo: '',  // 证件号码
          sinsPerNo: '', // 社保个人编号
          refundReceiptNo: '', // 收据编号
          treatType: '', // 待遇类型id
          treatTypeName: '', // 待遇类型
          paidType: '', // 支付类型id
          paidTypeName: '', // 支付类型
          paySchedule: '', // 支付进度id
          payScheduleName: '' // 支付进度
        },
        // 表格数据
        paiSinManaData: null,
        isA: true,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
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
        // 判断收款方名称是否有重复的
        ssbFalg: false
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      paidFun (val) {
        if (val === 1) {
          this.paidDa.code = 'REIM_CONTENT';
        } else if (val === 2) {
          this.paidDa.code = 'TREAT_TYPE';
        } else {
          this.paidDa.code = '';
        }
      },
      // 申请开数据----确 定
      submitForm () {
        this.$refs.openRecFrom.validate((valid) => {
          if (valid) {
            this.openRecFrom.issuedDate = Vue.filter('date')(this.openRecFrom.issuedDate, 'yyyy-MM-dd');
            api.post(this.apiPath.hrsc.applyForWriteOutReceipt, this.openRecFrom).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '已开收据！', type: 'success'});
                this.openRecFalg = false;
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          };
        });
      },
      // 最上面的查询
      searchFun () {
        this.page.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 最上面的重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      // 开收据
      addFun () {
        this.payCorpFalg = true;
        this.paidFalg = true;
        this.openRecFrom.paidTypeName = '';
        this.payOrderSum = checkedArr.length;
        if (checkedArr.length >= 1) {
          let arrList1 = checkedArr[0].ssbName;
          let arrList2 = checkedArr[0].paidType;
          let arrList3 = checkedArr[0].paidTypeName;
          let num = 0;
          for (let item of checkedArr) {
            if (arrList2 != item.paidType) {
              this.$alert('选择的拨付类型需要一致', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {}
              });
              return;
            }
            num += item.paidAmoTotal * 100;
            this.payOrderAddSun = num / 100;
            if (!item.ssbName || arrList1 != item.ssbName) {
              this.payCorpFalg = false;
            }
          }
          if (this.payCorpFalg) {
            this.openRecFrom.payCorpName = arrList1;
          };
          if (this.paidFalg) {
            this.openRecFrom.paidTypeName = arrList3;
            this.openRecFrom.paidType = arrList2;
          };
          this.openRecFalg = true;
          return;
        }
        this.$alert('最少选择一条操作项', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      // 提交
      subEav () {},
      // 查看全部
      viewAll (pageNum, pageSize) {
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchForm
        };
        api.post(this.getPaidCombination, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.paiSinManaData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectAll (selectTion, row) {
        let arr = [];
        for (let item of selectTion) {
          if (item.paidOrderId) {
            arr.push(item);
          };
        }
        this.selectCallBack(arr, row);
      },
      // 手动选中checkBox回调
      selectCallBack (selectTion, row) {
        let ssbArr = [];
        this.openRecFrom.paidIdS = [];
        this.openRecFrom.paidDetIdS = [];
        checkedArr = selectTion;
        this.openRecFrom.payCorpName = '';
        for (let item of checkedArr) {
          if (this.openRecFrom.paidIdS.indexOf(item.paidOrderId) === -1) {
            this.openRecFrom.paidIdS.push(item.paidOrderId);
          };
          if (this.openRecFrom.paidDetIdS.indexOf(item.paidOrderDetId) === -1) {
            this.openRecFrom.paidDetIdS.push(item.paidOrderDetId);
          };
          if (ssbArr.indexOf(item.ssbName) === -1) {
            ssbArr.push(item.ssbName);
          };
        };
        if (ssbArr.length === 1) {
          this.openRecFrom.payCorpName = ssbArr[0];
        };
      },
      // 查看附件
      seeFun (scope) {
        api.post(this.apiPath.hrsc.getPreviewLayerThickness, {paidOrderId: scope.paidOrderId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let _this = this;
            this.annexData = res.data;
            setTimeout(function () {
              _this.annexFlag = true;
            }, 100);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 预览和下载
      batchAllPreview (path) {
        this.uploadImgPath = path;
        this.largeImgFlag = true;
      },
      batchAllDownload (id) {
        api.download(id);
      },
      // 修改
      modifyFun () {},
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      choooseNum: function (pageSize) {
        //  改变分页显示条数;
        this.page.pageSize = pageSize;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 新增弹层----> 查询
      addSearchFun () {},
      lookBillClose (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
