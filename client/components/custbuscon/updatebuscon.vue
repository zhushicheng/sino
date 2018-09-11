<template>
  <!--新增商务合同-->
  <div>
    <div class="addbuscon" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" :title="stateFlag === 'add' ? '新增商务合同' : '修改商务合同'"></sino-title>
        <sino-form :model="addBusConForm" :rules="addBusConRules" ref="addBusConForm" class="addbuscon-search">
          <sino-form-item label="签署对象：" prop="conSignObj" class="addbuswid">
            <sino-radio-group v-model.number="addBusConForm.conSignObj">
              <sino-radio v-for="(item, index) in conSignObjlist" :key="index"
                          :label="item.id"
                          :disabled="outlineDisFlag"
              >{{item.title}}</sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-form-item label="证件号码：" prop="certNo" v-if="addBusConForm.conSignObj === 3">
            <sino-input v-model="addBusConForm.certNo"></sino-input>
          </sino-form-item>
          <sino-form-item label="客户名称：" class="sino-form-item-width"  prop="custChName" v-if="conSignObjFlag">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="outlineDisFlag"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="custUrl"
                         :token="token"
                         :chooseName.sync="addBusConForm.custChName"
                         :chooseId.sync="addBusConForm.custChType"
                         :clear="true" class="fl"></sino-select>
            <sino-button type="icon-text" @click="addCustFun" class="fl"><i class="iconfont sino-add"></i>新增</sino-button>
          </sino-form-item>
          <sino-form-item label="供应商名称：" class="sino-form-item-width"  prop="chName" v-if="!conSignObjFlag">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="chUrl"
                         :token="token"
                         :linkage="true"
                         :data="chData"
                         :chooseName.sync="addBusConForm.chName"
                         :chooseId.sync="addBusConForm.suppId"
                         :clear="true" class="fl"></sino-select>
          </sino-form-item>
          <sino-form-item label="销售线索摘要：" class="sino-form-item-width"  prop="outline">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="outlineDisFlag"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="saleClueUrl"
                         :data="{trackResult: 1}"
                         :chooseName.sync="addBusConForm.outline"
                         :chooseId.sync="addBusConForm.saleClueId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="合同名称：" prop="conName" class="sino-form-item-width">
            <sino-input v-model="addBusConForm.conName" ></sino-input>
          </sino-form-item>
          <sino-form-item label="合同类型：" prop="conTypeName">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :url="conStateUrl"
                         :data="{code: 'CON_TYPE'}"
                         :chooseName.sync="addBusConForm.conTypeName"
                         :chooseId.sync="addBusConForm.conType"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="签约日期：" prop="signDate">
            <sino-date-picker
              v-model="addBusConForm.signDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="合同开始日期：" prop="begDate">
            <sino-date-picker
              v-model="addBusConForm.begDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="合同结束日期：" prop="endDate">
            <sino-date-picker
              v-model="addBusConForm.endDate"
              type="date"
              :editable="false"
              :readonly="false"
              :picker-options="endDateFun"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="自动顺延：" prop="isPostpone" class="radio-item">
            <sino-radio-group v-model.number="addBusConForm.isPostpone"  @change="changeClick">
              <sino-radio v-for="(item, index) in isPostponeList" :key="index"
                          :label="item.id"
              >{{item.title}}</sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-form-item label="顺延月数：" prop="postponeMonth" v-if="addBusConForm.isPostpone !== 0">
            <sino-input v-model.number="addBusConForm.postponeMonth"></sino-input>
          </sino-form-item>
          <sino-form-item label="是否以此类推：" prop="isSuchAnal" class="radio-item" v-if="addBusConForm.isPostpone !== 0">
            <sino-radio-group v-model.number="addBusConForm.isSuchAnal">
              <sino-radio v-for="(item, index) in isSuchAnalList" :key="index"
                          :label="item.id">{{item.title}}</sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-form-item label="约定付款日：" prop="payDate">
            <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" trigger="hover" content="与客户签订商务合同时，所约定的每月客户付款的日期。"></sino-popover>
            <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover2 style="left:-148px;"></i>
            <sino-input v-model.number="addBusConForm.payDate"></sino-input>
          </sino-form-item>
          <sino-form-item label="销售负责人："  prop="saleConRespName" >
            <sino-input v-model="addBusConForm.saleConRespName" ></sino-input>
          </sino-form-item>
          <!--<sino-form-item label="合同联系人：" prop="contName">-->
            <!--<sino-input v-model="addBusConForm.contName" ></sino-input>-->
          <!--</sino-form-item>-->
          <sino-form-item label="合同联系人：" prop="contName">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="true"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         :url="conContUrl"
                         :data="{}"
                         :chooseName.sync="addBusConForm.contName"
                         :chooseId.sync="addBusConForm.conContId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="合同总份数：" prop="conTotalAmo">
            <sino-input v-model.number="addBusConForm.conTotalAmo"></sino-input>
          </sino-form-item>
          <sino-form-item label="公司留存份数：" prop="corpKeepAmo" ref="corpKeepAmo">
            <sino-input v-model.number="addBusConForm.corpKeepAmo" ></sino-input>
          </sino-form-item>
          <sino-form-item prop="conEncId" label="商务合同上传：" class="sino-form-item1">
            <sino-upload
              ref="conFile"
              :action="fileAction"
              :show-file-list="false"
              :auto-upload="false"
              multiple
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError"
              :before-upload="fileBefore"
            >
              <div slot="trigger">
                <input type="hidden" v-model="addBusConForm.conEncId">
                <input class="uploadFileBox" type="text" readonly="true"/>
                <div class="chooseFileButton">上传</div>
              </div>
              <div class="cust-file-upload">
                <div class="file-upload-div" v-for="(list, index) in addBusConForm.conEncList" :key="index" v-show="addBusConForm.conEncFlag">
                  <i class="iconfont sino-qubiezhen fl"></i>
                  <span class="fl file-span">{{list.encName}}</span>
                  <span class="file-del-btn fl" v-on:click="delConFile('conFile', list)">删除</span>
                </div>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-form-item prop="otherEncId" label="其他附件上传：" class="sino-form-item1">
            <sino-upload ref="otherFile"
                         :action="fileAction"
                         :show-file-list="false"
                         :auto-upload="false" multiple
                         :on-change="getFileName1"
                         :on-success="fileSuccess1"
                         :on-error="fileError1"
                         :before-upload="fileBefore1"
            >
              <div slot="trigger">
                <input type="hidden" v-model="addBusConForm.otherEncId"/>
                <!--<input type="hidden" v-model="addBusConForm.otherEncName"/>-->
                <input class="uploadFileBox" type="text" readonly="true"/>
                <div class="chooseFileButton">上传</div>
              </div>
              <div class="cust-file-upload clear">
                <div class="file-upload-div" v-for="(list, index) in addBusConForm.otherEncList" :key="index" v-show="addBusConForm.otherEncFlag">
                  <i class="iconfont sino-qubiezhen fl"></i>
                  <span class="fl file-span">{{list.encName}}</span>
                  <span class="file-del-btn fl" v-on:click="delOtherFile('otherFile', list)">删除</span>
                </div>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
            <sino-input type="textarea" v-model="addBusConForm.remark" :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="addSureFun">确 定</sino-button>
          <sino-button type="text" @click="resetFun">取 消</sino-button>
        </div>
      </sino-con>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  let _conEncId = [];
  let _conEncName = [];
  let _otherEncId = [];
  let _otherEncName = [];
  let _filelist = {};
  let _otherfilelist = {};
  let _finishCallback;
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

  export default {
    data () {
      var LowerLimit = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.addBusConForm.corpKeepAmo) {
          if (value > this.addBusConForm.conTotalAmo) {
            callback(new Error('公司留存份数应该小于等于合同总数！'));
          } else {
            callback();
          }
        }
      };
      var LowerLimit1 = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.addBusConForm.corpKeepAmo) {
          if (value > this.addBusConForm.corpKeepAmo) {
            this.$refs.corpKeepAmo.validateState = 'success';
            callback();
          } else if (value < this.addBusConForm.corpKeepAmo) {
            this.$refs.corpKeepAmo.validateState = 'error';
            this.$refs.corpKeepAmo.validateMessage = '公司留存份数应该小于等于合同总数';
          } else {
            callback();
          }
        }
      };
      let _that = this;
      return {
        conStateUrl: this.apiPath.hrsc.getDictSelectBox,
        conContUrl: this.apiPath.author.findUserSelectBoxInfo,
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        saleClueUrl: this.apiPath.crm.findSaleClueRadioBox,
        custUrl: this.apiPath.hrsc.findCustSelectInfo1,
        chUrl: this.apiPath.hrsc.selectBox,  // g
        respBusUrl: this.apiPath.author.findUserRoleByOrgAndRoleType,
        token: Cookies.get('Token'),
        routerView: false,
        conSignObjFlag: true,
        stateFlag: '',
        custData: {},
        chData: {},
        outlineDisFlag: false,
        addBusConForm: {
          conSignObj: '',
          certNo: '',
          conName: '',
          contNo: '',
          begDate: '',
          endDate: '',
          conType: '',
          conTypeName: '',
          custChType: '',
          custChName: '',
          suppId: '',
          chName: '',
          signDate: '',
          postponeMonth: '',
          payDate: '',
          conTotalAmo: '',
          corpKeepAmo: '',
          isPostpone: '',
          isSuchAnal: '',
          // contName: Cookies.get('CPYY-INFO-NAME'),
          conContId: Cookies.get('UserId'),
          contName: Cookies.get('CPYY-INFO-NAME'),
          saleConRespName: Cookies.get('CPYY-INFO-NAME'),
          conEncId: [],
          saleClueId: '',
          outline: '',
          otherEncId: [],
          conEnc: [],
          conEncFlag: false,
          otherEncFlag: false,
          conEncList: [],
          otherEncList: []
        },
        addBusConRules: {
          conSignObj: [
            {required: true, type: 'number', message: '请选择签署对象', trigger: 'change'}
          ],
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'}
          ],
          custChName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          chName: [
            {required: true, message: '请选择供应商名称', trigger: 'change'}
          ],
          conName: [
            {required: true, message: '请输入合同名称', trigger: 'change'}
          ],
          outline: [
            {required: true, message: '请选择销售线索摘要', trigger: 'change'}
          ],
          contNo: [
            {required: true, message: '请输入合同编号', trigger: 'change'}
          ],
          begDate: [
            {type: 'date', required: true, message: '请选择合同开始日期', trigger: 'change'}
          ],
          endDate: [
            {type: 'date', required: true, message: '请选择合同结束日期', trigger: 'change'}
          ],
          conTypeName: [
            {required: true, message: '请选择合同类型', trigger: 'change'}
          ],
          signDate: [
            {type: 'date', required: true, message: '请选择签约日期', trigger: 'change'}
          ],
          postponeMonth: [
            {required: true, type: 'number', message: '请选择顺延月数', trigger: 'change'}
          ],
          isPostpone: [
            {required: true, type: 'number', message: '请选择是否自动顺延', trigger: 'change'}
          ],
          payDate: [
            {type: 'number', required: true, message: '请输入约定付款日', trigger: 'change'},
            {validator: this.validator.checkDateNum, trigger: 'change'}
          ],
          conTotalAmo: [
            {type: 'number', required: true, message: '请输入合同总份数', trigger: 'change'},
            {validator: LowerLimit1, trigger: 'change'}
          ],
          corpKeepAmo: [
            {type: 'number', required: true, message: '请输入公司留存份数', trigger: 'change'},
            {validator: LowerLimit, trigger: 'change'}
          ],
          contName: [
            {required: true, message: '请选择合同联系人', trigger: 'change'}
          ],
          saleConRespName: [
            {required: true, message: '请输入销售负责人', trigger: 'change'}
          ],
          conEncId: [
            {type: 'array', required: true, message: '请上传商务合同附件', trigger: 'change'}
          ]
        },
        conSignObjlist: [],
        isPostponeList: [],
        isSuchAnalList: [],
        endDateFun: {
          disabledDate (time) {
            return time.getTime() < _that.addBusConForm.begDate;
          }
        }
      };
    },
    watch: {
      'addBusConForm.conSignObj': function (val, oldval) {
        if (val === 1) {
          this.conSignObjFlag = false;
        }
        if (val === 2 || val === 3) {
          this.conSignObjFlag = true;
        }
      },
      'addBusConForm.isPostpone': function (val) {
        if (val === 0) {
          this.addBusConForm.postponeMonth = '';
          this.addBusConForm.isSuchAnal = '';
        }
      },
      $route: {
        handler: function (val) {
          if (val.path === "/custBusCon/updateBusCon" ||  val.path === "/custBusCon/addBusCon") {
            this.routerView = false;
            if (this.$route.query.custId && this.$route.query.custName) {
              this.addBusConForm.custChName = this.$route.query.custName;
              this.addBusConForm.custChType = this.$route.query.custId;
            }
          }
        },
        deep: true
      }
    },
    created () {
      this.stateFlag = this.$route.query.type || 'add';
      this.ruoteJudge();
    },
    mounted () {
      api.post(this.conStateUrl, {code: 'CON_SIGN_OBJ', defaultValue: '1'}).then(res => {
        this.conSignObjlist = res.data.list;
        this.conSignObjlist.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.addBusConForm.conSignObj = val.id;
          } else {
            this.addBusConForm.conSignObj = 2;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      api.post(this.conStateUrl, {code: 'YES_NO', defaultValue: '1'}).then(res => {
        this.isPostponeList = res.data.list;
        this.isPostponeList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.addBusConForm.isPostpone = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      api.post(this.conStateUrl, {code: 'YES_NO', defaultValue: '1'}).then(res => {
        this.isSuchAnalList = res.data.list;
        this.isSuchAnalList.forEach(function (val) {
          if (val.isDefault) {
            this.addBusConForm.isSuchAnal = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      if (this.$route.query.saleClueId !== undefined) {
        this.stateFlag = 'add';
        this.addBusConForm.outline = this.$route.query.outline;
        this.addBusConForm.saleClueId = this.$route.query.saleClueId;
        this.addBusConForm.conSignObj = 2;
        this.outlineDisFlag = true;
      }
      if (this.$route.query.type === 'modify') {
        let _t = this;
        let _conId = {
          conId: this.$route.query.conId
        };
        api.post(_t.apiPath.hrsc.find, _conId).then(res => {
          res.data.conEncList = [];
          res.data.otherEncList = [];
          _t.addBusConForm = JSON.parse(JSON.stringify(res.data));
          _t.addBusConForm.contName = Cookies.get('CPYY-INFO-NAME');
          _t.addBusConForm.conContId = Cookies.get('UserId');
          _t.addBusConForm.otherEncFlag = true;
          _t.addBusConForm.conEncFlag = true;
          res.data.conEnc.forEach(function (item) {
            _t.addBusConForm.conEncList.push(item);
          });
          this.addBusConForm.begDate = new Date(res.data.begDate);
          this.addBusConForm.endDate = new Date(res.data.endDate);
          this.addBusConForm.signDate = new Date(res.data.signDate);

          this.addBusConForm.conEncId = [];
          _conEncId = [];
          _conEncName = [];
          for (let i = 0; i < res.data.conEnc.length; i++) {
            _t.addBusConForm.conEncId.push(res.data.conEnc[i].encId);
            _conEncId.push(res.data.conEnc[i].encId);
            _conEncName.push(res.data.conEnc[i].encName);
          }
          _t.addBusConForm.otherEncList = res.data.otherEnc;
          this.addBusConForm.otherEncId = [];
          _otherEncId = [];
          _otherEncName = [];
          for (let i = 0; i < res.data.otherEnc.length; i++) {
            _t.addBusConForm.otherEncId.push(res.data.otherEnc[i].encId);
            _otherEncId.push(res.data.otherEnc[i].encId);
            _otherEncName.push(res.data.otherEnc[i].encName);
          }
          _t.addBusConForm.suppId = '';
          _t.addBusConForm.chName = '';
          _t.addBusConForm.custChType = '';
          _t.addBusConForm.custChName = '';
          _finishCallback = JSON.parse(JSON.stringify(res.data));
          setTimeout(function () {
            if (_finishCallback.conSignObj === 1) {
              _t.addBusConForm.suppId = _finishCallback.custOrSuppId;
              _t.addBusConForm.chName = _finishCallback.chName;
            } else {
              _t.addBusConForm.custChType = _finishCallback.custOrSuppId;
              _t.addBusConForm.custChName = _finishCallback.custChName;
            }
          }, 100);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    updated () {
      if (this.$route.query.custChType && this.$route.query.custChName) {
        this.addBusConForm.custChType = this.$route.query.custChType;
        this.addBusConForm.custChName = this.$route.query.custChName;
      }
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/custBusCon/updateBusCon" && this.$route.path !== "/custBusCon/addBusCon") {
          this.routerView = true;
          if (this.$route.query.custId && this.$route.query.custName) {
            this.custData = {};
            this.addBusConForm.custChName = this.$route.query.custName;
            this.addBusConForm.custChType = this.$route.query.custId;
          }
        }
      },
      // 自动顺延判断11
      changeClick () {
        if (this.addBusConForm.isPostpone === 1) {
          this.addBusConForm.isSuchAnal = 1;
        }
      },
      addSureFun () {
        let _this = this;
        _this.$refs.addBusConForm.validate((valid) => {
          if (valid) {
            if (_this.addBusConForm.suppId) {
              _this.addBusConForm.custOrSuppId = _this.addBusConForm.suppId;
            } else {
              _this.addBusConForm.custOrSuppId = _this.addBusConForm.custChType;
            }
            _this.addBusConForm.begDate = Vue.filter('date')(_this.addBusConForm.begDate, 'yyyy-MM-dd');
            _this.addBusConForm.endDate = Vue.filter('date')(_this.addBusConForm.endDate, 'yyyy-MM-dd');
            _this.addBusConForm.signDate = Vue.filter('date')(_this.addBusConForm.signDate, 'yyyy-MM-dd');
            _this.addBusConForm.conEnc = _this.addBusConForm.conEncList;
            _this.addBusConForm.otherEnc = _this.addBusConForm.otherEncList;
            _this.saveFun();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveFun () {
        let _this = this;
        _this.addBusConForm.dateRepeat = true;
        api.post(_this.apiPath.hrsc.update, _this.addBusConForm).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.$message({message: '修改成功！', type: 'success'});
            _this.$router.push({path: '/custBusCon', query: {type: 'updatebuscon'}});
            return;
          } else if (res.code === 'CPYY-04451') {
            _this.$confirm(res.message, '提示', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
              _this.addBusConForm.dateRepeat = false;
              api.post(_this.apiPath.hrsc.update, _this.addBusConForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.$message({message: '新增成功！', type: 'success'});
                  _this.$router.push({path: '/custBusCon', query: {type: 'addbuscon'}});
                  return;
                } else {
                  _this.addBusConForm.begDate = new Date(_this.addBusConForm.begDate);
                  _this.addBusConForm.endDate = new Date(_this.addBusConForm.endDate);
                  _this.addBusConForm.signDate = new Date(_this.addBusConForm.signDate);
                }
              }).catch(err => {
                console.log(err);
              });
            }).catch(() => {
              _this.addBusConForm.begDate = new Date(_this.addBusConForm.begDate);
              _this.addBusConForm.endDate = new Date(_this.addBusConForm.endDate);
              _this.addBusConForm.signDate = new Date(_this.addBusConForm.signDate);
            });
          } else {
            _this.addBusConForm.begDate = new Date(_this.addBusConForm.begDate);
            _this.addBusConForm.endDate = new Date(_this.addBusConForm.endDate);
            _this.addBusConForm.signDate = new Date(_this.addBusConForm.signDate);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      fileError: function (error) {
        this.addBusConForm.conEncFlag = false;
      },
      fileBefore (file) {
        if (this.addBusConForm.conEncList && this.addBusConForm.conEncList.length > 0) {
          for (let i = 0; i < this.addBusConForm.conEncList.length; i++) {
            if (file.name === this.addBusConForm.conEncList[i].encName) {
              this.$alert('不能上传重复文件，请重新上传。', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning',
                dragFlag: true,
                customClass: '',
                lockScroll: true,
                callback: action => {}
              });
              return false;
            }
          }
        }
      },
      getFileName: function (file, filelist) {
        let _this = this;
        _conEncName = [];
        for (let i = 0; i < filelist.length; i++) {
          _conEncName.push(filelist[i].name);
        }
        if (checkImgFileType(file, this)) {
          _this.$refs.conFile.submit();
        } else {
          filelist.splice(filelist.indexOf(file), 1);
          _this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
      },
      fileSuccess: function (res, file, filelist) {
        _filelist = filelist;
        if (res.code === 'CPYY-00001') {
          _conEncId.push(res.data);
          this.addBusConForm.conEncId.push(res.data);
          this.addBusConForm.conEncFlag = true;
          this.addBusConForm.conEncList.push({encId: res.data, encName: file.name});
          this.addBusConForm.conEnc =  this.addBusConForm.conEncList;
        }
      },
      delConFile (form, list) {
        let _this = this;
        _conEncId.splice(_conEncId.indexOf(list.encId), 1);
        _conEncName.splice(_conEncName.indexOf(list.encName), 1);
        for (let i = 0; i < _this.addBusConForm.conEncList.length; i++) {
          if (_this.addBusConForm.conEncList[i].encId === list.encId) {
            _this.addBusConForm.conEncList.splice(i, 1);
          }
        }
        for (let i = 0; i < _filelist.length; i++) {
          if (_filelist[i].response.data === list.encId) {
            _filelist.splice(i, 1);
          }
        }
        _this.addBusConForm.conEncId = _conEncId;
      },
      //  其他附件上传
      fileError1: function (error) {
        this.addBusConForm.otherEncFlag = false;
      },
      fileBefore1 (file) {
        if (this.addBusConForm.otherEncList && this.addBusConForm.otherEncList.length > 0) {
          for (let i = 0; i < this.addBusConForm.otherEncList.length; i++) {
            if (file.name === this.addBusConForm.otherEncList[i].encName) {
              this.$alert('不能上传重复文件，请重新上传。', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning',
                dragFlag: true,
                customClass: '',
                lockScroll: true,
                callback: action => {}
              });
              return false;
            }
          }
        }
      },
      getFileName1: function (file, filelist) {
        let _this = this;
        _otherEncName = [];
        for (let i = 0; i < filelist.length; i++) {
          _otherEncName.push(filelist[i].name);
        }
        if (checkImgFileType(file, this)) {
          this.$refs.otherFile.submit();
        } else {
          filelist.splice(filelist.indexOf(file), 1);
          _this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
      },
      fileSuccess1: function (res, file, filelist) {
        _otherfilelist = filelist;
        if (res.code === 'CPYY-00001') {
          _otherEncId.push(res.data);
          this.addBusConForm.otherEncId.push(res.data);
          this.addBusConForm.otherEncFlag = true;
          this.addBusConForm.otherEncList.push({encId: res.data, encName: file.name});
          this.addBusConForm.otherEnc = this.addBusConForm.otherEncList;
        }
      },
      delOtherFile (form, list) {
        let _this = this;
        _otherEncId.splice(_otherEncId.indexOf(list.encId), 1);
        _otherEncName.splice(_otherEncName.indexOf(list.encName), 1);
        for (let i = 0; i < _this.addBusConForm.otherEncList.length; i++) {
          if (_this.addBusConForm.otherEncList[i].encId === list.encId) {
            _this.addBusConForm.otherEncList.splice(i, 1);
          }
        }
        for (let i = 0; i < _otherfilelist.length; i++) {
          if (_otherfilelist[i].response.data === list.encId) {
            _otherfilelist.splice(i, 1);
          }
        }
        _this.addBusConForm.otherEncId = _otherEncId;
      },
      addCustFun () {
        this.routerView = true;
        this.$router.push({path: '/custBusCon/addBusCon/custinfoupdate', query: {type: 'add', backType: 'buscon'}});
      },
      resetFun () {
        this.$router.push({path: '/custBusCon'});
        this.addBusConForm.conEncId = []; // 商务合同id
        this.addBusConForm.otherEncId = [];
        this.addBusConForm.conEncList = [];
        this.addBusConForm.otherEncList = [];
//        this.addBusConForm.outline.splice(0);
//        this.addBusConForm.saleClueId.splice(0);
      }
    }
  };
</script>
