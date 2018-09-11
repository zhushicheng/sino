<template>
  <div class="usermanage emp-Info invinfo">
    <sino-con>
      <sino-title type="levelOne" title="雇员基本信息维护"></sino-title>
      <sino-form :model="searchForm" :rules="addlocalInfoRules" ref="searchForm"  class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <!--<li class="search-inner-one">-->
              <!--<span class="search-inner-name">雇员唯一号：</span>-->
              <!--<sino-input class="fl" type="text" v-model="
              .uniqNo" :disabled="false" maxlength="5"></sino-input>-->
            <!--</li>-->
            <li class="search-inner-one">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input class="fl" type="text" v-model="searchForm.empName" :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-width " prop="certNo">
              <sino-input class="fl" type="text" v-model="searchForm.certNo" :disabled="false"></sino-input>
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
      <sino-form :model="empInfoForm" :rules="addlocalInfoRules" ref="empInfoForm" class="serch-form">
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
                  <sino-form-item label="雇员唯一号：" class="search-inner-item" prop="uniqNo">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.uniqNo"
                                :disabled="true">
                    </sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.empName"
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
                  <sino-form-item label="证件类型：" class="search-inner-item" prop="certTypeName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'CERT_TYPE'}"
                                 :chooseName.sync="empInfoForm.certTypeName"
                                 :chooseId.sync="empInfoForm.certType" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="手机号码：" class="search-inner-item" prop="phone">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.phone"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="固定电话：" class="search-inner-item" prop="tel">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.tel"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="邮箱地址：" class="search-inner-item" prop="email">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.email"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <!--<li class="clear"></li>-->
                <li class="emp-address" >
                  <sino-form-item label="联系地址：" class="search-inner-item" prop="addr">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.addr"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                </ul>
            </div>
          </sino-collapse-transition>
        </div>
        <div>
          <sino-title  type="levelTwo" class="fl"  title="婚姻户口信息">
            <div class="demo-block-control emp-cop"   @click="show1 = !show1" >
              <div class="fr">
                <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}" ></i>
                <span v-if="!show1">展开</span>
                <span v-if="show1">收起</span>
              </div>
            </div>
          </sino-title>
        </div>
        <div class="local-info">
          <sino-collapse-transition >
            <div  v-show="show1">
              <ul class="local-info-ul clearfix">
                <li>
                  <sino-form-item label="国籍：" class="search-inner-item" prop="countryName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'GM_COUNTRY'}"
                                 :chooseName.sync="empInfoForm.countryName"
                                 :chooseId.sync="empInfoForm.country" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="民族：" class="search-inner-item" prop="nation">
                    <sino-select :filterable="true"
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
                  <sino-form-item label="户口性质：" class="search-inner-item" prop="householdProy">
                    <sino-radio v-for="(item, index) in householdProyList" :key="index"
                                v-model.number="empInfoForm.householdProy"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="政治面貌：" class="search-inner-item" prop="poliStatusName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'POLI_STATUS'}"
                                 :chooseName.sync="empInfoForm.poliStatusName"
                                 :chooseId.sync="empInfoForm.poliStatus" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="婚姻状况：" class="search-inner-item" prop="mariStatusName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code: 'MARI_STATUS'}"
                                 :chooseName.sync="empInfoForm.mariStatusName"
                                 :chooseId.sync="empInfoForm.mariStatus" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户籍所在地：" class="search-inner-item" prop="householdAddr">
                  <sino-input class="fl" type="text"
                  v-model="empInfoForm.householdAddr"
                  :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li class="emp-address" >
                  <sino-form-item label="户籍详细地址：" class="search-inner-item" prop="householdAddrDet">
                    <sino-input class="fl" type="text"
                                v-model="empInfoForm.householdAddrDet"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
        <sino-title class="fl" type="levelTwo"  title="成员信息">
          <div class="demo-block-control emp-cop"   @click="openEmpInfo()" >
            <div class="fr">
              <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}" ></i>
              <span v-if="!show2">展开</span>
              <span v-if="show2">收起</span>
            </div>
          </div>
        </sino-title>
        <div class="local-info">
          <sino-collapse-transition >
            <div  v-show="show2">
              <div class="emp-link-card" v-for="(item, index) in list" :key="index">
                <div class="emp-link-card-title">
                  <span>成员信息</span>
                  <sino-button class="fr" type="icon-text"  v-if="list[0] === item" @click="listAdd()"><i class="iconfont sino-add"></i>新增</sino-button>
                  <sino-button class="fr" type="icon-text" @click="restItem(item)"><i class="iconfont sino-reset"></i>重置</sino-button>
                </div>
                <ul class="local-info-ul clearfix">
                  <li>
                    <sino-form-item label="与雇员关系：" class="search-inner-item" prop="relationName">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code: 'RELATION_TYPE'}"
                                   :chooseName.sync="item.relationName"
                                   :chooseId.sync="item.relation" :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="成员姓名：" class="search-inner-item" prop="memberName">
                        <sino-input class="fl" type="text"
                                    v-model="item.memberName"
                                    :disabled="false"></sino-input>
                      </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="性别：" class="search-inner-item" prop="sex">
                      <sino-radio v-for="(item1, index) in sexList" :key="index"
                                  v-model.number="item.sex"
                                  :label="item1.id">{{item1.title}}</sino-radio>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="出生日期：" class="search-inner-item" prop="birthDate">
                      <sino-date-picker class="fl"
                                        v-model="item.birthDate"
                                        type="date"
                                        :editable="false"
                                        :readonly="false"
                                        :clearable="true">
                      </sino-date-picker>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="证件类型：" class="search-inner-item" prop="certTypeName">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code:'CERT_TYPE'}"
                                   :chooseName.sync="item.certTypeName"
                                   :chooseId.sync="item.certType" :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                      <sino-input class="fl" type="text"
                                  v-model="item.certNo"
                                  :disabled="false"></sino-input>
                    </sino-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </sino-collapse-transition>
        </div>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="subFun">确 定</sino-button>
          <sino-button type="text" @click="resetAddLocal">取 消</sino-button>
        </div>
      </sino-form>
    </div>
    <!-- 查询身份证号是否有重复 450821199405052176-->
    <sino-dialog :visible.sync="empInfoIdFlag" size="small">
      <sino-title slot="title" type="levelOne" title="查询结果" class="sino-dialog-title"></sino-title>
      <sino-table :data="empInfoIdData" max-height="416" stripe border v-on:select="selectCallBack" class="radio-style-table">
        <sino-table-column type="selection" width="45" align="center"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="uniqNo" label="雇员唯一号"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
        <sino-table-column prop="certType" label="证件类型"></sino-table-column>
        <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
      </sino-table>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="empInfoIdFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let callTip = function (_this, type, msg) {
    _this.modifyAndAdd = false;
    _this.$alert(msg, '提示信息', {
      confirmButtonText: '确 定',
      type: type, // icon图标类型
      dragFlag: true,
      customClass: '', // 添加class
      lockScroll: true,
      callback: action => {

      }
    });
  };
  export default {
    components: {},
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaListGroup: this.apiPath.hrsc.findAreaListGroup,
        areaUrl: this.apiPath.hrsc.findAreaList,
        prodUrl: this.apiPath.hrsc.findpropayname,
        searchForm: { // 搜索条件
          empName: '',
          certNo: '',
          uniqNo: ''
        },
        sexList: [],
        householdProyList: [],
        show: false,
        show1: false,
        show2: false,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        empInfoForm: {
          uniqNo: '',
          empName: '',
          sex: '',
          certType: '',
          certTypeName: '',
          certNo: '',
          phone: '',
          tel: '',
          email: '',
          addr: '',
          countryName: '',
          country: '',
          nationName: '',
          nation: '',
          householdProy: '',
          poliStatusName: '',
          poliStatus: '',
          mariStatusName: '',
          mariStatus: '',
          householdAddr: '',
          householdAddrDet: ''
        },
        list: [
          {
            relation: '',
            relationName: '',
            memberName: '',
            sex: '',
            certType: '',
            certTypeName: '',
            certNo: '',
            birthDate: ''
          }
        ],
        addlocalInfoRules: {
          certNo: [
            {required: false, trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'blur'}
          ],
          phone: [
            {required: false, message: '请输入手机号码', trigger: 'blur'},
            {validator: this.validator.checkPhone, trigger: 'blur'}
          ]

        },

        pkgStateList: [],
        suppTypeData: {code: 'SUPP_TYPE'},
        cityData: {'data': {'level': 2}},
        empInfoIdFlag: false,
        empInfoIdData: null,
        checkedArr: []
      };
    },
    created: function () {
      api.post(this.getDictSelectBox, {code: 'SEX'}).then(res => {
        this.sexList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.getDictSelectBox, {code: 'HOUSEHOLD_TYPE'}).then(res => {
        this.householdProyList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedArr = selectTion;
      },
      openEmpInfo () {
        this.show2 = !this.show2;
      },
      restItem (data) {
        data.relation = '';
        data.relationName = '';
        data.memberName = '';
        data.sex = '';
        data.certType = '';
        data.certTypeName = '';
        data.certNo = '';
        data.birthDate = '';
      },
      listAdd () {
        this.list.push({
          relation: '',
          relationName: '',
          memberName: '',
          sex: '',
          certType: '',
          certTypeName: '',
          certNo: '',
          birthDate: ''
        });
        console.log(this.list);
      },
      searchFun () {
        if (this.searchForm.empName === '' && this.searchForm.certNo === '' && this.searchForm.uniqNo === '') {
          callTip(this, 'warning', '请输入至少一项搜索条件');
          return;
        }
        api.post(this.apiPath.hrsc.empAll, this.searchForm).then(res => {
          if (res.data.length > 1) {
            this.empInfoIdFlag = true;
            this.empInfoIdData = res.data;
          } else if (res.data.length === 1) {
            this.empInfoForm = res.data[0];
            if (res.data[0].empMemberList.length === 0) {
              res.data[0].empMemberList.push({
                relation: '',
                relationName: '',
                memberName: '',
                sex: '',
                certType: '',
                certTypeName: '',
                certNo: '',
                birthDate: ''
              });
            }
            this.list = res.data[0].empMemberList;
            this.show = true;
          } else {
            this.empInfoForm = {};
            this.list = [];
            this.show = false;
            this.show1 = false;
            this.show2 = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      empInfoIdFun () {
        if (this.checkedArr.length !== 1) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
        api.post(this.apiPath.hrsc.empAll, this.checkedArr[0]).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchForm = this.checkedArr[0];
            this.empInfoIdFlag = false;
            this.empInfoForm = res.data[0];
            if (res.data[0].empMemberList.length === 0) {
              res.data[0].empMemberList.push({
                relation: '',
                relationName: '',
                memberName: '',
                sex: '',
                certType: '',
                certTypeName: '',
                certNo: '',
                birthDate: ''
              });
            }
            this.list = res.data[0].empMemberList;
            this.show = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      subFun () {
        let obj = JSON.parse(JSON.stringify(this.empInfoForm));
        let ary = JSON.parse(JSON.stringify(this.list));
        obj.empMemberList = ary;
        api.post(this.apiPath.hrsc.empUpdate, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '保存成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resetAddLocal () {

      }
    }
  };
</script>
