<template>
  <!--异地医疗备案-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="异地就医返款查询"></sino-title>
      <sino-form :model="addAndModifyForm" ref="addAndModifyForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="addAndModifyForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="addAndModifyForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="li-wid allom-li">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="custUrl"
                             :token="token"
                             :chooseName.sync="addAndModifyForm.custName"
                             :chooseId.sync="addAndModifyForm.custId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid allom-li">
              <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="suppUrl"
                             :token="token"
                             :chooseName.sync="addAndModifyForm.signSuppName"
                             :chooseId.sync="addAndModifyForm.signSuppId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
            <sino-form-item label="年度：" class="search-inner-item" prop="backCreYearNew">
              <sino-date-picker
                v-model="addAndModifyForm.backCreYearNew"
                type="year"
                :editable="false"
                :readonly="false">
              </sino-date-picker>
            </sino-form-item>
            </li>
            <li>
              <sino-form-item label="支付进度：" class="search-inner-item" prop="payScheduleName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="selUrl"
                             :data="{code:'PAY_SCHEDULE'}"
                             :chooseName.sync="addAndModifyForm.payScheduleName"
                             :chooseId.sync="addAndModifyForm.paySchedule"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" >
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('addAndModifyForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button  type="icon-text" @click="applyFun()"><i class="iconfont sino-add"></i>返款信息导入</sino-button>
          </div>
        </div>
        <sino-table :data="alloMediTable" border max-height="416" stripe v-on:viewAll="viewAll" v-on:select="selectCallBack">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="perNo" label="社保个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="95"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="120"></sino-table-column>
          <sino-table-column prop="backCreYear" label="年度" min-width="120"></sino-table-column>
          <sino-table-column prop="acctAmo" label="账户余额" min-width="120"></sino-table-column>
          <sino-table-column prop="payScheduleName" label="支付进度" min-width="120"></sino-table-column>
          <sino-table-column prop="isApplyPayName" label="是否可申请支付" min-width="120"></sino-table-column>
          <sino-table-column prop="bankAcctName" label="开户行" min-width="120"></sino-table-column>
          <sino-table-column prop="bankAcctNo" label="银行账号" min-width="120"></sino-table-column>
          <sino-table-column prop="applyPayTime" label="申请支付时间" min-width="120"></sino-table-column>
          <sino-table-column prop="payTime" label="支付时间" min-width="120"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <sino-dialog :visible.sync="applyFlag"  size="large" v-on:close="resetFun('allomeForm')" dialogHide :top="'10%'" class="accuman-add-layer">
      <sino-title slot="title" type="levelOne" title="返款信息导入" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="allomeForm"  ref="allomeForm" class="leadsAdd-Form">
          <ul class="search-inner-box">
            <li class="li-wid allom-li">
              <sino-form-item label="社保账户名称：" class="search-inner-item" prop="sinsAcctName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findSinsAcctName"
                             :chooseName.sync="allomeForm.sinsAcctName"
                             :chooseId.sync="allomeForm.sinsAcctId"
                             :data="areaSinsData"
                             @change="getSinsAcctNo"
                             :clear="true" >
                </sino-select>
              </sino-form-item>
            </li>
            <li >
              <sino-form-item label="单位社保账号：" class="search-inner-item" prop="sinsAcctNo">
                <sino-input class="fl" type="text"
                            v-model="allomeForm.sinsAcctNo"
                            :disabled="false" @change="getSinsAcc"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="类别：" class="search-inner-item" prop="paidTypeName">
                <sino-input class="fl" type="text"
                            v-model="allomeForm.paidTypeName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="拨付金额：" class="search-inner-item" prop="paidAmo">
                <sino-input class="fl" type="text"
                            v-model="allomeForm.paidAmo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="拨付日期：" class="search-inner-item" prop="paidDate">
                <sino-date-picker
                  type="date"
                  v-model="allomeForm.paidDate"
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>

              </sino-form-item>
            </li>
            <li class="billing-form-smallbox">
              <sino-form-item label="涉及人数：" class="search-inner-item" prop="paidInvoNum">
                <sino-input class="fl" type="text"
                            v-model="allomeForm.paidInvoNum"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="billing-form-smallbox">
              <sino-form-item label="拨付单文件：" class="search-inner-item" prop="paidFileName">
                <sino-upload
                  ref="paidFileName"
                  :action="uploadFilePublic"
                  :show-file-list="false"
                  :auto-upload="true"
                  :on-change="getFileName"
                  :on-success="fileSuccess"
                  :on-error="fileError"
                >
                  <div slot="trigger">
                    <input class="uploadFileBox" readonly="true" v-model="allomeForm.paidFileName"/>
                    <div class="chooseFileButton">上传</div>
                  </div>
                </sino-upload>
              </sino-form-item>
            </li>
            <li class="billing-form-smallbox">
              <sino-form-item label="明细数据文件：" class="search-inner-item" prop="detFileName">
                <sino-upload
                  ref="detFileName"
                  :action="uploadFilePublic"
                  :show-file-list="false"
                  :auto-upload="true"
                  :on-change="getFileName1"
                  :on-success="fileSuccess1"
                  :on-error="fileError1"
                >
                <div slot="trigger">
                  <input class="uploadFileBox" readonly="true" v-model="allomeForm.detFileName"/>
                  <div class="chooseFileButton">导入</div>
                </div>
                </sino-upload>
              </sino-form-item>
            </li>
          </ul>
        </sino-form>
        <div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm('allomeForm')">确 定</sino-button>
        </span>
    </sino-dialog>
    <sino-dialog :visible.sync="successFlag"  size="large" v-on:close="resetFun('MessageForm')" dialogHide :top="'10%'" class="accuman-add-layer clearPadding">
      <sino-title slot="title" type="levelOne" title="返款信息导入结果" class="sino-dialog-title "></sino-title>
        <sino-form :model="MessageForm"  ref="MessageForm" class="leadsAdd-Form">
          <div class="service-module-box  ">
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li >
                  <h6>数据明细文件名称</h6><span v-text="MessageForm.detFileName"></span>
                </li>
                <li>
                  <h6>导入结果</h6><span v-text="MessageForm.importResult"></span>
                </li>
                <li class="li-last">
                  <h6>导入说明</h6><span v-text="MessageForm.importDesc"></span>
                </li>
              </ul>
            </div>
          </div>

        </sino-form>
        <div>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="MessageFun('MessageForm')">{{MessageForm.MessageBtn}}</sino-button>
        </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.type.split("/")[1];
    let _arr = ['jpg', 'png', 'bmp', 'jpeg', 'pdf', 'JPG', 'PNG', 'BMP', 'JPEG', 'PDF'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    } else {
      _this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };
  let checkImgFileType2 = function (file, _this) {
    let _s = file.raw.name.split('.')[1];
    let _arr = ['xlsx', 'xls'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    }  else {
      _this.$alert('请上传excel文件！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };
  let linkSelectData = {
    abroadAlloSettleCity: '',
    abroadAlloSettleCityName: '',
    abroadAlloSettleDist: '',
    abroadAlloSettleDistName: ''
  };

  export default {
    components: {},
    data () {
      return {
        findAlloMediRecBackPaid: this.apiPath.sins.findAlloMediRecBackPaid,
        findSinsAcctNameAndUnitSinsNo: this.apiPath.sins.findSinsAcctNameAndUnitSinsNo,
        doImportAlloMediRecBackPaid: this.apiPath.sins.doImportAlloMediRecBackPaid,
        saveAlloMediRecBack: this.apiPath.sins.saveAlloMediRecBack,
        areaSelectBox: this.apiPath.hrsc.areaSelectBox,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        busiUrl: this.apiPath.author.findUserSelectBoxInfo,
        areaUrl: this.apiPath.hrsc.areaSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        unitUrl: this.apiPath.sins.selectUnitName,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        findSinsAcctName: this.apiPath.sins.findSinsAcctName,   //  社保账户名称、业务员下拉框
        token: Cookies.get('Token'),
        areaSinsData: {
          title: ''
        },
        apiPath: '',
        successFlag: false,
        addAndModifyForm: { // 查询
          certNo: '',
          empName: '',
          paidAmo: '',
          backCreYearNew: '',
          custId: '',
          custName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          paidFileName: '', // 上传文件的名字
          paidFileId: '',
          detFileName: '', // 导入的文件的名字
          detFileId: '',
          payChName: ''
        },
        allomeForm: {
          sinsAcctName: '',
          sinsAcctId: '',
          sinsAcctNo: '', // 单位社保账号
          paidTypeName: '异地医疗返款', // 类别
          paidAmo: '',
          detCreBatchNo: '',
          creId: '',
          creTime: '',
          operId: '',
          operTime: '',
          isEffect: '',
          failPath: '',
          MessageBtn: '',
          paidType: 4, // 类别
          paidInvoNum: '', // 涉及人数
          paidFileName: '', // 拨付单文件
          paidFileId: '', // 拨付单唯一号
          paidDate: '', // 拨付日期
          detFileId: '', // 唯一号
          importResult: '', // 导入结果
          detFileName: '', // 数据明细文件名称
          alloMediRecBackPaidDets: []
        },
        MessageForm: {
          sinsAcctName: '', // 社保账户名称
          sinsAcctNo: '',
          sinsAcctId: '',
          paidAmo: '',
          paidDate: '',
          paidInvoNum: '',
          paidFileId: '',
          paidFileName: '',
          paidType: 4,
          detCreBatchNo: '',
          creId: '',
          creTime: '',
          operId: '',
          operTime: '',
          isEffect: '',
          failPath: '',
          MessageBtn: '',
          importResult: '', // 导入结果
          detFileName: '', // 数据明细文件名称
          detFileId: '',
          alloMediRecBackPaidDets: [], // 需要保存的异地医疗返款明细集合
          importDesc: '' // 导入说明
        },
        selectFlag: false,
        roleFlag: false,
        updateFlag: '',
        activeRow: '',
        searchFlag: false,
        alloMediTable: null,
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
        applyCertNoForm: { // 申请
          certNo: ''
        },
        applyCertNoRules: {
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'}
          ]
        },
        applyForm: {
          applyDate: '',
          applyType: '',
          applyTypeName: '',
          sinsExecuArea: '',
          sinsExecuAreaName: '',
          empName: '',
          sex: '',
          age: '',
          perNo: '',
          tel: '',
          unitName: '',
          personState: '',
          personStateName: '',
          abroadAlloSettleProv: '',
          abroadAlloSettleProvName: '',
          abroadAlloSettleCity: '',
          abroadAlloSettleCityName: '',
          abroadAlloSettleDist: '',
          abroadAlloSettleDistName: '',
          alloCommunicationAddr: '',
          alloMediRecHospiList: [
            {
              hospiName: ''
            }
          ],
          alloMediRecMatList: null
        },
        applyRules: {
          applyDate: [
            {type: 'date', required: true, message: '请选择申请日期', trigger: 'change'}
          ],
          sinsExecuAreaName: [
            {required: true, message: '请选择执行地区', trigger: 'change'}
          ],
          applyTypeName: [
            {required: true, message: '请选择申请类型', trigger: 'change'}
          ],
          empName: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          sex: [
            {type: 'number', required: true, message: '请选择性别', trigger: 'change'}
          ],
          age: [
            {type: 'number', required: true, message: '请输入年龄', trigger: 'change'}
          ],
          unitName: [
            {required: true, message: '请输入单位名称', trigger: 'change'}
          ],
          personStateName: [
            {required: true, message: '请选择人员状态', trigger: 'change'}
          ]
        },
        uploadData: null,
        provData: {data: {level: 3}}, // 请求省下拉参数
        cityData: {data: {parentId: ''}}, // 请求市下拉参数
        distData: {data: {parentId: ''}}, // 请求区下拉参数
        checkedArr: [], // 列表选中数据集合
        applyFlag: false,
        sendSinsFlag: false, // 送社保
        sendSinsForm: {
          declDate: ''
        },
        sendSinsRules: {
          declDate: [
            { type: 'date', required: true, message: '请选择送社保日期', trigger: 'change' }
          ]
        },
        resaultFlag: false, // 结果反馈
        resaultForm: {
          handleResult: '',
          feekbackDate: '',
          failReason: ''
        },
        resaultRules: {
          failReason: [
            { required: true, message: '请输入失败原因', trigger: 'change' }
          ]
        },
        handleResultlist: [],
        sexlist: [],
        seeFlag: false, // 查看
        alloSeeList: {
          certNo: '',
          applyTypeName: '',
          applyDate: '',
          dataSourceName: '',
          sinsExecuAreaName: '',
          empName: '',
          sex: '',
          age: '',
          perNo: '',
          tel: '',
          personStateName: '',
          unitName: '',
          alloCommunicationAddr: '',
          alloMediRecHospiList: [{
            hospiName: ''
          }],
          alloMediRecMatList: [],
          retReason: '',
          fallReason: ''
        },
        activeNode: 3,
        eavFlag: false, // 审核
        eavForm: {
          applyDate: '',
          dataSource: '',
          dataSourceName: '',
          empName: '',
          perNo: '',
          sex: '',
          age: '',
          unitName: '',
          personStateName: '',
          abroadAlloSettleProvName: '',
          abroadAlloSettleCityName: '',
          abroadAlloSettleDistName: '',
          alloCommunicationAddr: '',
          tel: '',
          alloMediRecId: '',
          handleSchedule: ''
        }
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'SEX'}).then(res => {
        this.sexlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'HANDLE_RESULT'}).then(res => {
        this.handleResultlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      let _roleType = Cookies.get('roleType');
      if (_roleType === '5') {
        this.selectFlag = true;
      }
      if (_roleType === '16') {
        this.roleFlag = true;
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.allomeForm.paidFileName = file.name;
        } else {
          this.$refs.paidFileName.clearFiles();
        }
      },
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.allomeForm.paidFileId = res.data;
        } else {
          this.allomeForm.paidFileName = '';
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      fileError () {
        this.allomeForm.paidFileName = '';
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      // 手动选中checkBox回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      viewAll (pageNum, pageSize) {
        if (this.addAndModifyForm.backCreYearNew) {
          this.addAndModifyForm.backCreYearNew = Vue.filter('date')(this.addAndModifyForm.backCreYearNew, 'yyyy');
          this.addAndModifyForm.backCreYearNew = new Date(this.addAndModifyForm.backCreYearNew);
        };
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.addAndModifyForm
        };
        api.post(this.findAlloMediRecBackPaid, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.alloMediTable = res.data.list;
            this.total = res.data.total;
          } else {
            this.addAndModifyForm.backCreYearNew = new Date(this.addAndModifyForm.backCreYearNew);
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
      getSinsAcctNo () {
        let obj = {
          id: this.allomeForm.sinsAcctId,
          sinsAcctName: this.allomeForm.sinsAcctName
        };
        api.post(this.findSinsAcctNameAndUnitSinsNo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.allomeForm.sinsAcctNo = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getSinsAcc () {
        let obj = {
          unitSinsNo: this.allomeForm.sinsAcctNo
        };
        api.post(this.findSinsAcctNameAndUnitSinsNo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.allomeForm.sinsAcctId = res.data.id;
            this.allomeForm.sinsAcctName = res.data.title;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 申请
      applyFun () {
        this.applyFlag = true;
        this.updateFlag = 1;
      },
      // 根据证件号码查询 52212919750314406X
      applySearchFun () {
        let _this = this;
        _this.$refs.applyCertNoForm.validate((valid) => {
          if (valid) {
            _this.applyForm.certNo = _this.applyCertNoForm.cartNo;
            api.post(_this.apiPath.sins.findEmpInfoAndDetByNo, _this.applyCertNoForm).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.applyForm = res.data;
                if (_this.applyForm.alloMediRecHospiList === null) {
                  _this.applyForm.alloMediRecHospiList = [];
                  _this.applyForm.alloMediRecHospiList.push({hospiName: ''});
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      cityFinish () {
        this.applyForm.abroadAlloSettleDist = linkSelectData.abroadAlloSettleDist;
        this.applyForm.abroadAlloSettleDistName = linkSelectData.abroadAlloSettleDistName;
        linkSelectData = {};
      },
      changeProv () {
        this.cityData.data.parentId = this.applyForm.abroadAlloSettleProv;
      },
      changeCity () {
        this.distData.data.parentId = this.applyForm.abroadAlloSettleCity;
      },
      getFileName1 (file) {
        if (checkImgFileType2(file, this)) {
          this.allomeForm.detFileName = file.name;
        } else {
          this.$refs.detFileName.clearFiles();
        }
      },
      fileSuccess1 (res) {
        if (res.code === 'CPYY-00001') {
          this.allomeForm.detFileId = res.data;
        } else {
          this.allomeForm.detFileName = '';
        }
      },
      fileError1 () {
        this.allomeForm.detFileName = '';
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'info', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      currentUploadFun (row, index) {
        this.activeRow = index;
      },
      // 增加产品方案
      listAdd (index) {
        let _this = this;
        if (index === 0) {
          _this.applyForm.alloMediRecHospiList.push({
            hospiName: ''
          });
        } else {
          _this.applyForm.alloMediRecHospiList.splice(index, 1);
        }
      },
      areaFun (areaId) {
        if (areaId === '' || areaId === null) {
          return false;
        }
        api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, {confUse: 5, dimen: 1, dimenValue: areaId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.applyForm.alloMediRecMatList = res.data.matConfs;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 信息导入确定按钮
      submitForm () {
        api.post(this.doImportAlloMediRecBackPaid, this.allomeForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.applyFlag = false;
            this.MessageForm = res.data;
            if (res.data.importResult === '导入失败') {
              this.MessageForm.MessageBtn = '下 载';
              this.apiPath = res.data.failPath;
            } else {
              this.MessageForm.MessageBtn = '确 定';
            }
            this.successFlag = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      MessageFun () {
        /* 导入成功 */
        if (this.MessageForm.MessageBtn === '确 定') {
          api.post(this.saveAlloMediRecBack, this.MessageForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.successFlag = false;
              this.$message({message: '保存成功！', type: 'success'});
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (this.MessageForm.MessageBtn === '下 载') {
          api.download(this.apiPath);
          this.successFlag = false;
          this.applyFlag = true;
          this.allomeForm = this.MessageForm;
          this.allomeForm.paidTypeName = '异地医疗返款';
          this.allomeForm.detFileName = '';
          this.allomeForm.detFileId = '';

          /*  api.post(this.apiPath.sins.doImportAlloMediRecBackPaid, this.MessageForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.successFlag = false;
                this.applyFlag = true;
                api.download(res.data.failPath);
                this.allomeForm = res.data;
                this.$message({message: '保存成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            }); */
        }
      },
      // 提交经办员
      submitOperator () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _data = [];
        this.checkedArr.forEach(function (item) {
          _data.push({alloMediRecId: item.alloMediRecId, handleSchedule: item.handleSchedule});
        });
        api.post(this.apiPath.sins.updateSubmitBatch, {alloMediRecList: _data}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.checkedArr = [];
            this.$message({message: '提交成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 送社保
      sendSins () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.sendSinsFlag = true;
      },
      // 送社保确定
      sendSinsConfirm () {
        let _this = this;
        _this.$refs.sendSinsForm.validate((valid) => {
          if (valid) {
            _this.sendSinsForm.declDate = Vue.filter('date')(this.sendSinsForm.declDate, 'yyyy-MM-dd');
            let _data = [];
            _this.checkedArr.forEach(function (item) {
              _data.push({alloMediRecId: item.alloMediRecId, declDate: _this.sendSinsForm.declDate, handleSchedule: item.handleSchedule});
            });
            api.post(_this.apiPath.sins.updateBatchSendSins, {alloMediRecList: _data}).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.searchFun();
                _this.sendSinsFlag = false;
                _this.checkedArr = [];
                _this.$message({message: '操作成功！', type: 'success'});
              } else {
                _this.sendSinsForm.declDate = new Date(_this.sendSinsForm.declDate);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 结果反馈
      resultFeedback () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.resaultFlag = true;
      },
      // 结果反馈确定
      resaultConfirm () {
        let _this = this;
        _this.$refs.resaultForm.validate((valid) => {
          if (valid) {
            _this.resaultForm.feekbackDate = Vue.filter('date')(this.resaultForm.feekbackDate, 'yyyy-MM-dd');
            let _data = [];
            _this.checkedArr.forEach(function (item) {
              _data.push({alloMediRecId: item.alloMediRecId, handleResult: _this.resaultForm.handleResult, feekbackDate: _this.resaultForm.feekbackDate, failReason: _this.resaultForm.failReason, handleSchedule: item.handleSchedule});
            });
            api.post(_this.apiPath.sins.updateBatchResult, {alloMediRecList: _data}).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.resaultFlag = false;
                _this.searchFun();
                _this.checkedArr = [];
                _this.$message({message: '操作成功！', type: 'success'});
              } else {
                _this.resaultForm.feekbackDate = new Date(_this.resaultForm.feekbackDate);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 审核
      eavFun (_data) {
        let _this = this;
        _this.eavForm.alloMediRecId = _data.alloMediRecId;
        _this.eavForm.handleSchedule = _data.handleSchedule;
        api.post(_this.apiPath.sins.findRecInfoById, {alloMediRecId: _data.alloMediRecId}).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.eavFlag = true;
            _this.eavForm = res.data;
            res.data.sex === 2 ? _this.eavForm.sex = '女' : _this.eavForm.sex = '男';
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 返回申请
      eavBackConfirm () {
        let _this = this;
        let _obj = {
          alloMediRecId: _this.eavForm.alloMediRecId,
          handleSchedule: _this.eavForm.handleSchedule
        };
        api.post(_this.apiPath.sins.updateRetById, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.eavFlag = false;
            _this.searchFun();
            _this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核-提交经办员
      eavSubConfirm () {
        let _this = this;
        let _obj = {
          alloMediRecId: _this.eavForm.alloMediRecId,
          handleSchedule: _this.eavForm.handleSchedule
        };
        api.post(_this.apiPath.sins.updateEavById, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.eavFlag = false;
            _this.searchFun();
            _this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 打印
      confirm () {},
      // 查看
      seeFun (_data) {
        let _this = this;
        api.post(_this.apiPath.sins.findRecInfoById, {alloMediRecId: _data.alloMediRecId}).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.seeFlag = true;
            _this.alloSeeList = res.data;
            res.data.sex === 2 ? _this.alloSeeList.sex = '女' :  _this.alloSeeList.sex = '男';
            _this.activeNode = res.data.handleSchedule;
            if (_this.alloSeeList.alloMediRecHospiList.length === 0) {
              _this.alloSeeList.alloMediRecHospiList.push({
                hospiName: ''
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun (_data) {
        api.post(this.apiPath.sins.findRecInfoById, {alloMediRecId: _data.alloMediRecId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.updateFlag = 2;
            this.applyFlag = true;
            this.articletitle = '异地医疗备案修改';
            this.applyForm = res.data;
            this.applyCertNoForm.certNo = res.data.certNo;
            this.applyForm.applyDate = new Date(this.applyForm.applyDate);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 保存异地申请
      saveApplyForm () {
        let _this = this;
        _this.$refs.applyForm.validate((valid) => {
          if (valid) {
            _this.applyForm.applyDate = Vue.filter('date')(_this.applyForm.applyDate, 'yyyy-MM-dd');
            if (_this.updateFlag === 1) { // 新增
              api.post(_this.apiPath.sins.saveRecInfo, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            } else { // 修改
              api.post(_this.apiPath.sins.updateRecInfoByIdSave, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 申请弹层提交经办员
      submitApplyForm () {
        let _this = this;
        _this.$refs.applyForm.validate((valid) => {
          if (valid) {
            _this.applyForm.applyDate = Vue.filter('date')(_this.applyForm.applyDate, 'yyyy-MM-dd');
            if (_this.updateFlag === 1) { // 新增
              api.post(_this.apiPath.sins.saveRecInfoSubmit, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            } else { // 修改
              api.post(_this.apiPath.sins.updateRecInfoByIdSubmit, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // reset
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

