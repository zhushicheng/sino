<template>
  <!--社保个人信息维护-->
  <div class="usermanage">
    <!--查询-->
    <sino-con>
      <sino-title type="levelOne" title="社保个人信息查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="searchForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保个人编号：" class="search-inner-item" prop="idCard">
                <sino-input class="fl" type="text"
                            v-model="searchForm.idCard"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="雇员唯一号：" class="search-inner-item" prop="uniqNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.uniqNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
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

    <div class="emp-info-page mt15">
      <!--基本信息-->
      <sino-form :model="empInfoForm" :rules="empInfoRules" ref="empInfoForm" class="serch-form">
        <sino-title class="mt15 fl" type="levelTwo"  title="基本信息">
          <div class="demo-block-control emp-cop"   @click="show = !show" >
            <div class="fr">
              <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}" ></i>
              <span v-if="!show">展开</span>
              <span v-if="show">收起</span>
            </div>
          </div>
        </sino-title>
        <div class="local-info">
          <sino-collapse-transition >
            <div  v-show="show">
              <ul class="local-info-ul clearfix" >
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.empName">
                    </sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.certNo"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="性别：" class="search-inner-item" prop="sex">
                    <sino-radio v-for="(item, index) in sexList" :key="index"
                                v-model.number="empInfoForm.sex"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="民族：" class="search-inner-item" prop="nation">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'NATION'}"
                                 :chooseName.sync="empInfoForm.nationName"
                                 :chooseId.sync="empInfoForm.nation" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="出生地：" class="search-inner-item" prop="birthAddr">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.birthAddr">
                    </sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="出生日期：" class="search-inner-item" prop="birthDate">
                    <sino-date-picker class="fl"
                                      v-model="empInfoForm.birthDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口性质：" class="search-inner-item" prop="householdProy">
                    <sino-radio v-for="(item, index) in householdList" :key="index"
                                v-model.number="empInfoForm.householdProy"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口所在地：" class="search-inner-item" prop="household">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.household">
                    </sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="电话号码：" class="search-inner-item" prop="tel">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.tel"></sino-input>
                  </sino-form-item>
                </li>
                <li class="emp-address" >
                  <sino-form-item label="常住地址：" class="search-inner-item" prop="addr">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.addr"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="邮政编码：" class="search-inner-item" prop="postCode">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.postCode"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="用工形式：" class="search-inner-item" prop="labType">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'LAB_TYPE'}"
                                 :chooseName.sync="empInfoForm.labTypeName"
                                 :chooseId.sync="empInfoForm.labType"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="参加工作日期：" class="search-inner-item" prop="workTime">
                    <sino-date-picker class="fl"
                                      v-model="empInfoForm.workTime"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="人员状态：" class="search-inner-item" prop="state">
                    <sino-radio v-for="(item, index) in personStateList" :key="index"
                                v-model.number="empInfoForm.state"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
      </sino-form>
      <!--社保信息-->
      <sino-form :model="socInfoForm" :rules="socInfoRules" ref="socInfoForm" class="serch-form">
        <sino-title  type="levelTwo" class="fl"  title="社保信息">
          <div class="demo-block-control emp-cop"   @click="show1 = !show1" >
            <div class="fr">
              <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}" ></i>
              <span v-if="!show1">展开</span>
              <span v-if="show1">收起</span>
            </div>
          </div>
        </sino-title>
        <div class="local-info">
          <sino-collapse-transition >
            <div  v-show="show1">
              <ul class="local-info-ul clearfix">
                <li>
                  <sino-form-item label="社会保障号：" class="search-inner-item" prop="idCard">
                    <sino-input class="fl" type="text"
                                v-model="socInfoForm.idCard"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保个人编号：" class="search-inner-item" prop="perComCode">
                    <sino-input class="fl" type="text"
                                v-model="socInfoForm.perComCode"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="账户状态：" class="search-inner-item" prop="acctState">
                    <sino-radio v-for="(item, index) in acctStateList" :key="index"
                                v-model.number="socInfoForm.acctState"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="个人身份：" class="search-inner-item" prop="perIdentity">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'PER_IDENTITY_TYPE'}"
                                 :chooseName.sync="socInfoForm.perIdentityName"
                                 :chooseId.sync="socInfoForm.perIdentity" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="职工类型：" class="search-inner-item" prop="workersType">
                    <sino-radio v-for="(item, index) in workersList" :key="index"
                                v-model.number="socInfoForm.workersType"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="行政职务：" class="search-inner-item" prop="adminJob">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'ADMIN_JOB'}"
                                 :chooseName.sync="socInfoForm.adminJobName"
                                 :chooseId.sync="socInfoForm.adminJob" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公务员标识：" class="search-inner-item" prop="civilServantTag">
                    <sino-radio v-for="(item, index) in civilSerTagList" :key="index"
                                v-model.number="socInfoForm.civilServantTag"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="农民工标识：" class="search-inner-item" prop="farmerTag">
                    <sino-radio v-for="(item, index) in farmerList" :key="index"
                                v-model.number="socInfoForm.farmerTag"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="编制情况：" class="search-inner-item" prop="compiled">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'COMPILED_TYPE'}"
                                 :chooseName.sync="socInfoForm.compiledName"
                                 :chooseId.sync="socInfoForm.compiled" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="专业技术职务：" class="search-inner-item" prop="skillJob">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'SKILL_JOB'}"
                                 :chooseName.sync="socInfoForm.skillJobName"
                                 :chooseId.sync="socInfoForm.skillJob" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="工人技术等级：" class="search-inner-item" prop="skillLevel">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'SKILL_LEVEL'}"
                                 :chooseName.sync="socInfoForm.skillLevelName"
                                 :chooseId.sync="socInfoForm.skillLevel" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="医疗社会保险号：" class="search-inner-item" prop="mediSinsNo">
                    <sino-input class="fl" type="text"
                                v-model="socInfoForm.mediSinsNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="是否已有照片：" class="search-inner-item" prop="isPhoto">
                    <sino-radio v-for="(item, index) in yesNoList" :key="index"
                                v-model.number="socInfoForm.isPhoto"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="照片回执编号：" class="search-inner-item" prop="photoReceipt">
                    <sino-input class="fl" type="text"
                                v-model="socInfoForm.photoReceipt"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="原养老号：" class="search-inner-item" prop="pensSinsNo">
                    <sino-input class="fl" type="text"
                                v-model="socInfoForm.pensSinsNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
      </sino-form>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="subFun">确 定</sino-button>
        </div>
    </div>

    <!--请选择雇员弹层-->
    <sino-dialog :visible.sync="employeeFlag" size="samll" dialogHide class="usermanage freebill-dialog">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="请选择雇员"></sino-title>
      <sino-table :data="empData" stripe height="349" @select="selectCallBackEmp">
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名" align="center" min-width="100"></sino-table-column>
        <sino-table-column prop="idCard" label="证件号码" align="center" min-width="100"></sino-table-column>
        <!--<sino-table-column prop="creTime" label="客户名称" align="center" min-width="161"></sino-table-column>-->
      </sino-table>
      <!--<sino-page-->
        <!--v-bind:page="billDataPage.pageNum"-->
        <!--v-bind:page-size="billDataPage.pageSize"-->
        <!--v-on:pagehandler="pageHandlerB"-->
        <!--:pageArray="billDataPage.pageArray"-->
        <!--v-on:choosePageFun="choooseNumB"-->
        <!--v-bind:object="object"-->
        <!--:total="billDataPage.total">-->
      <!--</sino-page>-->
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="chooseEmp">确 定</sino-button>
      </span>
    </sino-dialog>

    <!--同步信息弹层-->
    <sino-dialog :visible.sync="synFlag" size="small" class="syn-follow dialog-item">
      <sino-title slot="title" type="levelOne" title="同步信息" class="sino-dialog-title"></sino-title>
      <sino-form :model="synForm" ref="synForm" :rules="synRules" class="follow-select">
        <div class="follow-content">
          <sino-form-item label="同步信息至：" prop="checksdf" class="search-inner-item">
            <sino-checkbox-group v-model="synForm.checksdf" class="mt5">
              <sino-checkbox label="雇员基本信息"></sino-checkbox>
              <sino-checkbox label="公积金个人信息"></sino-checkbox>
            </sino-checkbox-group>
          </sino-form-item>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downSubmitFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';

  let checkedArr = []; // 查询出来的那个表格
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,  // 字典下拉框
        sexList: [], // 性别单选框
        workersList: [], // 职工类型单选框
        personStateList: [], // 人员状态单选框
        householdList: [], // 户口性质单选框
        civilSerTagList: [], // 公务员标识单选框
        yesNoList: [], // 是否已有照片单选框
        farmerList: [], // 农民工标识单选框
        acctStateList: [], // 账户状态单选框
        // 查询条件
        searchForm: {
          uniqNo: '', // 雇员唯一号
          certNo: '', // 证件号
          empName: '',  // 雇员姓名
          questionPerId: '',
          questionPerIdsString: [],
          idCard: ''  // 社会保障号：
        },
        // 基本信息
        empInfoForm: {
          empName: '', // 雇员姓名
          certNo: '', // 证件号码
          sex: '', // 性别
          nation: null, // 民族ID
          nationName: '', // 民族
          birthAddr: '', // 出生地
          birthDate: '', // 出生日期
          householdProy: 1, // 户口性质
          household: '', // 户口所在地
          addr: '', // 常住地址
          postCode: '', // 邮政编码
          labType: '', // 用工形式ID
          labTypeName: '', // 用工形式
          workTime: '', // 参加工作时间
          tel: null, // 电话号码
          state: 1, // 人员状态
          uniqNo: '' // 唯一号
        },
        // 基本信息校验
        empInfoRules: {
          empName: [
            {required: true, message: '请输入雇员姓名', trigger: 'change'}
          ],
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change', type: 'number'}
          ],
          birthDate: [
            {required: true, message: '请选择出生日期', trigger: 'change', type: 'date'}
          ],
          householdProy: [
            {required: true, message: '请选择户口性质', trigger: 'change', type: 'number'}
          ],
          tel: [
            {required: true, message: '请输入电话号码', trigger: 'change'},
            {validator: this.validator.checkPhone, trigger: 'change'}
          ],
          labType: [
            {required: true, message: '请选择用工形式', trigger: 'change', type: 'number'}
          ],
          workTime: [
            {required: true, message: '请选择参加工作日期', trigger: 'change', type: 'date'}
          ],
          state: [
            {required: true, message: '请选择人员状态', trigger: 'change', type: 'number'}
          ]
        },
        // 社保信息
        socInfoForm: {
          idCard: '', // 社会保障号
          perComCode: '', // 社保个人编号
          acctState: 1, // 账户状态
          adminJob: '', // 行政职务ID
          adminJobName: '', // 行政职务
          perIdentity: 2, // 个人身份ID
          perIdentityName: '工人', // 个人身份
          workersType: 1, // 职工类型
          compiled: '', // 编制情况ID
          compiledName: '', // 编制情况
          civilServantTag: 1, // 公务员标识
          farmerTag: 2, // 农民工标识
          skillLevel: 1, // 工人技术等级ID
          skillLevelName: '初级工', // 工人技术等级
          skillJob: 5, // 专业技术职务ID
          skillJobName: '无技术职务', // 专业技术职务
          pensSinsNo: '', // 原养老号
          mediSinsNo: '', // 医疗社会保险号
          isPhoto: 1, // 是否已有照片
          photoReceipt: '' // 照片回执编号
        },
        // 社保信息校验
        socInfoRules: {
          acctState: [
            {required: true, message: '请选择账户状态', trigger: 'change', type: 'number'}
          ],
          civilServantTag: [
            {required: true, message: '请选择公务员标识', trigger: 'change', type: 'number'}
          ],
          farmerTag: [
            {required: true, message: '请选择农民工标识', trigger: 'change', type: 'number'}
          ]
        },
        show: true, // 基本信息--->展开收起
        show1: false, // 社保信息--->展开收起
        employeeFlag: false, // 请选择雇员弹层--->显示与隐藏
        empData: '', // 请选择雇员弹层--->雇员信息
        synForm: {
          checksdf: [] // 同步信息弹层----->复选框
        }, // 同步信息弹层----->信息
        synRules: {}, // 同步信息弹层----->校验
        synFlag: false, // 同步信息弹层----->显示与隐藏
        returnedData: '',  // 最下面确定返回的数据
        fiveData: {}   // 五个数据
      };
    },
    created () {
      this.sexFun();
      this.householdFun();
      this.civilSerTagFun();
      this.yesNoFun();
      this.personStateFun();
      this.workersFun();
      this.farmerFun();
      this.acctStateFun();
    },
    mounted () {
      this.searchForm.uniqNo = this.$route.query.uniqNo;
      this.searchForm.questionPerId = this.$route.query.questionPerId;
      this.searchForm.questionPerIdsString = this.$route.query.questionPerIdsString;
      if (this.$route.query.uniqNo) {
        this.searchFun();
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
   // 查询按钮
      searchFun () {
        for (var item1 in this.empInfoForm) {
          if (item1 === 'tel') {
            if (this.empInfoForm.tel) {
              this.empInfoForm[item1] = '';
            } else {
            }
          } else {
            this.empInfoForm[item1] = '';
          }
        }
        for (var item2 in this.socInfoForm) {
          this.socInfoForm[item2] = '';
        }
        let flag = false;
        for (var key in this.searchForm) {
          if (this.searchForm[key]) {
            flag = true;
          }
        }
        if (flag) {
          api.post(this.apiPath.sins.featureFindSinsEmpInfo, this.searchForm).then(res => {
            if (res.code === 'CPYY-00001') {
              let _this = this;
              if (res.data.length > 1) {
                this.employeeFlag = true;
                this.empData = res.data;
                return;
              }
              this.show1 = true;
              res.data.forEach(function (item) {
                _this.fiveData.empName = item.empName;
                _this.fiveData.certNo = item.certNo;
                _this.fiveData.sex = item.sex;
                _this.fiveData.nation = item.nation;
                _this.fiveData.householdProy = item.householdProy;
                for (var key in _this.empInfoForm) {
                  if (item[key]) {
                    if (key === 'workTime' || key === 'birthDate') {
                      _this.empInfoForm[key] = new Date(item[key]);
                    } else {
                      _this.empInfoForm[key] = item[key];
                    }
                  }
                };
                for (var key2 in _this.socInfoForm) {
                  if (item[key2]) {
                    _this.socInfoForm[key2] = item[key2];
                  }
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
        this.$alert('请任意输入一条查询条件！', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      // 请选择雇员弹层---->复选
      selectCallBackEmp (selectTion, row) {
        checkedArr = selectTion;
      },
      // 请选择雇员弹层----> 确定
      chooseEmp () {
        if (checkedArr.length !== 1) {
          this.$alert('只能选择一条数据！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class；
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        this.searchForm.empName = checkedArr[0].empName;
        this.searchForm.certNo = checkedArr[0].certNo;
        this.searchFun();
        this.employeeFlag = false;
      },
      // 最下面的 ----> 确定按钮
      subFun () {
        this.$refs.empInfoForm.validate((valid) => {
          if (valid) {
            this.$refs.socInfoForm.validate((valid1) => {
              if (valid1) {
                let obj = {};
                for (var key in this.empInfoForm) {
                  obj[key] = this.empInfoForm[key];
                }
                for (var key1 in this.socInfoForm) {
                  obj[key1] = this.socInfoForm[key1];
                }
                obj.tel = Number(this.empInfoForm.tel);
                obj.commonField = this.fiveData;
                api.post(this.apiPath.sins.updateSinsEmpInfo, obj).then(res => {
                  if (res.code === 'CPYY-00001') {
                    if (res.data) {
                      this.returnedData = res.data;
                      this.synFlag = true;
                      return;
                    }
                    if (this.$route.query.uniqNo) {
                      this.$router.push({path: '/sinsQuestionPersAdmin', query: {state: 'modify', questionPerIdsString: this.searchForm.questionPerIdsString}});
                    }
                    this.$message({message: '修改成功！', type: 'success'});
                  }
                }).catch(err => {
                  console.log(err);
                });
              }
            });
          }
        });
      },
      // 同步信息弹层----->  确定按钮
      downSubmitFun () {
        this.returnedData.uniqNo = this.empInfoForm.uniqNo;
        if (this.synForm.checksdf.indexOf('雇员基本信息') !== -1 && this.returnedData) {
          api.post(this.apiPath.hrsc.empUpdateSynchro, this.returnedData).then(res => {
            if (res.code === 'CPYY-00001') {
              this.synFlag = false;
              this.$message({message: '修改并同步成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 性别单选框
      sexFun () {
        api.post(this.getDictSelectBox, {code: 'SEX'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sexList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 职工类型单选框
      workersFun () {
        api.post(this.getDictSelectBox, {code: 'WORKERS_TYPE'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.workersList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 人员状态单选框
      personStateFun () {
        api.post(this.getDictSelectBox, {code: 'PERSON_STATE'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.personStateList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 户口性质单选框
      householdFun () {
        api.post(this.getDictSelectBox, {code: 'HOUSEHOLD_TYPE'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.householdList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 公务员标识单选框；
      civilSerTagFun () {
        api.post(this.getDictSelectBox, {code: 'CIVIL_SERVANT_TAG'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.civilSerTagList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 是否已有照片单选框
      yesNoFun () {
        api.post(this.getDictSelectBox, {code: 'YES_NO'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.yesNoList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 农民工标识单选框
      farmerFun () {
        api.post(this.getDictSelectBox, {code: 'FARMER_TAG'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.farmerList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 农民工标识单选框
      acctStateFun () {
        api.post(this.getDictSelectBox, {code: 'ACCT_STATE'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.acctStateList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

<style scoped>

</style>
