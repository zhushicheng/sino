<template>
  <!--公积金个人信息维护-->
    <div class="usermanage">
      <!--查询-->
      <sino-con>
        <sino-title type="levelOne" title="公积金个人信息查询"></sino-title>
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
                <sino-form-item label="公积金职工账号：" class="search-inner-item" prop="perNo">
                  <sino-input class="fl" type="text"
                              v-model="searchForm.perNo"
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
                                  v-model="empInfoForm.certNo"
                      ></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="姓名全拼：" class="search-inner-item" prop="empFullName">
                      <sino-input class="fl" type="text"
                                  v-model="empInfoForm.empFullName	"
                      ></sino-input>
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
                    <sino-form-item label="手机号码：" class="search-inner-item" prop="phone">
                      <sino-input class="fl" type="text"
                                  v-model="empInfoForm.phone"
                      ></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="户口性质：" class="search-inner-item" prop="householdType">
                      <sino-radio v-for="(item, index) in householdList" :key="index"
                                  v-model.number="empInfoForm.householdType"
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
                    <sino-form-item label="学历：" class="search-inner-item" prop="edu">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code: 'EDU'}"
                                   :chooseName.sync="empInfoForm.eduName"
                                   :chooseId.sync="empInfoForm.edu" :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                </ul>
              </div>
            </sino-collapse-transition>
          </div>
        </sino-form>
        <!--社保信息-->
        <sino-form :model="socInfoForm" :rules="socInfoRules" ref="socInfoForm" class="serch-form">
          <sino-title  type="levelTwo" class="fl"  title="公积金信息">
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
                    <sino-form-item label="公积金职工账号：" class="search-inner-item" prop="perNo">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.perNo"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="账户状态：" class="search-inner-item" prop="accuAcctState">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code: 'ACCU_ACCT_STATE'}"
                                   :chooseName.sync="socInfoForm.accuAcctStateName"
                                   :chooseId.sync="socInfoForm.accuAcctState" :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label=" " class="search-inner-item" prop="perComCode"></sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="职务：" class="search-inner-item" prop="adminJob">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.adminJob"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="职称：" class="search-inner-item" prop="skillJob">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.skillJob"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="职业：" class="search-inner-item" prop="occu">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.occu"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="存款账户开户银行：" class="search-inner-item" prop="bankType">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code: 'BANK_TYPE'}"
                                   :chooseName.sync="socInfoForm.bankTypeName"
                                   :chooseId.sync="socInfoForm.bankType" :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="emp-address">
                    <sino-form-item label="存款账户开户银行名称：" class="search-inner-item" prop="bankName">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.bankName"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="存款账户号码：" class="search-inner-item" prop="acctNo">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.acctNo"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="婚姻状况：" class="search-inner-item" prop="mariStatus">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code: 'MARI_STATUS'}"
                                   :chooseName.sync="socInfoForm.mariStatusName"
                                   :chooseId.sync="socInfoForm.mariStatus" :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="yen-father">
                    <sino-form-item label="家庭月收入：" class="search-inner-item" prop="monthIncome">
                      <i class="yen">&yen;</i>
                      <sino-input class="fl inco-padding" type="text"
                                  v-model="socInfoForm.monthIncome"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="邮政编码：" class="search-inner-item" prop="postCode">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.postCode"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                  <li class="emp-address">
                    <sino-form-item label="家庭住址：" class="search-inner-item" prop="addr">
                      <sino-input class="fl" type="text"
                                  v-model="socInfoForm.addr"
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
        <sino-table :data="empData" stripe height="349" @select="selectCallBackEmp" border>
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" align="center" min-width="100"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" align="center" min-width="180"></sino-table-column>
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
                <sino-checkbox label="社保个人信息"></sino-checkbox>
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

  let checkedArr = []; // 查询出来的那个表格
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,  // 字典下拉框
        sexList: [], // 性别单选框
        householdList: [], // 户口性质单选框
        // 查询信息
        searchForm: {
          certNo: null,   // 证件号
          empName: '',    // 雇员姓名
          perNo: null,     // 公积金职工账号
          questionPerId: ''
        },
        // 基本信息
        empInfoForm: {
          edu: null,    // 学历ID
          eduName: '',  // 学历
          nationName: '', // 民族
          nation: null,  // 民族ID
          empName: '', // 雇员姓名
          certNo: null, // 证件号码
          empFullName: '', // 姓名全拼
          sex: null, // 性别
          phone: null, // 手机号码
          householdType: null, // 户口性质
          household: '', // 户口所在地
          uniqNo: null  //  唯一号
        },
        // 基本信息校验
        empInfoRules: {},
        // 社保信息
        socInfoForm: {
          accuAcctStateName: '封存', // 账户状态
          accuAcctState: 1, // 账户状态ID
          bankTypeName: '', // 存款账户开户银行
          bankType: null, // 存款账户开户银行id
          mariStatusName: '', //  婚姻状况
          mariStatus: null, //  婚姻状况id
          perNo: null, // 公积金职工账号
          adminJob: '职员', // 职务
          skillJob: '初级职称', // 职称
          occu: '职员', // 职业
          bankName: '', // 存款账户开户银行名称
          acctNo: null, // 存款账户号码
          monthIncome: null, // 家庭月收入
          postCode: null, // 邮政编码
          addr: '' // 家庭住址
        },
        // 社保信息校验
        socInfoRules: {
          postCode: [
            {validator: this.validator.checkNum, trigger: 'change'}
          ]
        },
        show: true, // 基本信息--->展开收起
        show1: false, // 公积金信息--->展开收起
        employeeFlag: false, // 请选择雇员弹层--->显示与隐藏
        empData: '', // 请选择雇员弹层--->雇员信息
        synForm: {
          checksdf: [] // 同步信息弹层----->复选框
        }, // 同步信息弹层----->信息
        synRules: {}, // 同步信息弹层----->校验
        synFlag: false, // 同步信息弹层----->显示与隐藏
        returnedData: '',  // 最下面确定返回的数据
        commonField: {
          empName: null,
          certNo: null,
          sex: null,
          nation: null,
          householdType: null
        }   // 五个数据
      };
    },
    created () {
      this.sexFun();
      this.householdFun();
    },
    mounted () {
      this.searchForm.empName = this.$route.query.empName;
      this.searchForm.certNo = this.$route.query.certNo;
      this.searchForm.questionPerId = this.$route.query.questionPerId;
      if (this.$route.query.certNo) {
        this.searchFun();
        this.chooseEmp();
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
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
            callback: action => {}
          });
          return;
        }
        this.searchForm.empName = checkedArr[0].empName;
        this.searchForm.certNo = checkedArr[0].certNo;
        this.searchFun();
        this.employeeFlag = false;
      },
      // 同步信息弹层----->  确定按钮
      downSubmitFun () {
        this.returnedData.uniqNo = this.empInfoForm.uniqNo;
        if (this.synForm.checksdf.indexOf('雇员基本信息') !== -1 && this.returnedData) {
          api.post(this.apiPath.hrsc.empUpdateSynchro, this.returnedData).then(res => {
            if (res.code === 'CPYY-00001') {
              this.synFlag = false;
              this.$message({message: '同步成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 最下面的 ----> 确定按钮
      subFun () {
        let obj = {};
        for (var key in this.empInfoForm) {
          obj[key] = this.empInfoForm[key];
        }
        for (var key1 in this.socInfoForm) {
          obj[key1] = this.socInfoForm[key1];
        }
        obj.commonField = this.commonField;
        api.post(this.apiPath.accu.updateAccuEmpInfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.returnedData = res.data;
            if (res.data) {
              this.synFlag = true;
              return;
            };
            if (this.$route.query.certNo) {
              this.$router.push({path: '/accuQuestionPersAdmin', query: {state: 'modify', questionPerId: this.searchForm.questionPerId}});
            }
            this.$message({message: '修改成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询按钮
      forFun (res) {
        let _this = this;
        res.data.forEach(function (item) {
          for (let key in _this.commonField) {
            _this.commonField[key] = item[key];
          };
          for (var key in _this.empInfoForm) {
            if (item[key]) {
              _this.empInfoForm[key] = item[key];
            }
          };
          for (var key2 in _this.socInfoForm) {
            if (item[key]) {
              _this.socInfoForm[key2] = item[key2];
            }
          }
        });
      },
      flagFun (data) {
        api.post(this.apiPath.accu.featureFindAccuEmpInfo, data).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.length > 1) {
              this.employeeFlag = true;
              this.empData = res.data;
              return;
            }
            this.forFun(res);
          }
        }).catch(err => {
          console.log(err);
        });
        return;
      },
      searchFun () {
        let _this = this;
        let flag = false;
        for (var key in this.searchForm) {
          if (this.searchForm[key]) {
            flag = true;
          }
        }
        if (flag) {
          _this.flagFun(this.searchForm);
        } else {
          this.$alert('请任意输入一条查询条件！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
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
      // 户口性质单选框
      householdFun () {
        api.post(this.getDictSelectBox, {code: 'HOUSEHOLD_TYPE'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.householdList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
