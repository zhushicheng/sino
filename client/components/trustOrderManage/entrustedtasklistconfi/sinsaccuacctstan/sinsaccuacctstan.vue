<template>
  <div>
    <div class="usermanage emp-Info invinfo" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="社保公积金账户及标准"></sino-title>
        <sino-form :model="empInfoForm" ref="empInfoForm" class="serch-form empinfo-form">
          <div v-for="(list, index) in empInfoForm.empInfoList" :key="index">
            <sino-title class="mt15 fl" type="levelTwo" :title="'客户名称：' + list.custName">
              <div class="demo-block-control emp-cop" @click="showFun(index)" >
                <div class="fr">
                  <i class="iconfont " :class="{'sino-shuangjiantou-copy': showList.indexOf(index) === -1,'sino-angle-double-up':showList.indexOf(index) !== -1}" ></i>
                  <span v-if="showList.indexOf(index) === -1">展开</span>
                  <span  v-if="showList.indexOf(index) !== -1">收起</span>
                </div>
              </div>
            </sino-title>
            <div class="local-info">
              <sino-collapse-transition >
                <div v-show="showList.indexOf(index) !== -1">
                  <div v-for="(sublist, _index) in empInfoForm.empInfoList[index].areaList" :key="_index">
                    <ul class="sins-stan-ul">
                      <li>
                        <sino-form-item label="社保缴费方式：" v-if="sublist.taskConfirm.sinsDeclRadix !== '' && sublist.taskConfirm.sinsDeclRadix !== null" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.sinsPayFeeWayDict'" :rules="[{required: true, message: '请选择社保缴费方式', trigger: 'change'}]">
                          <sino-select :filterable="false"
                                       :multiselect="false"
                                       :isshowTotol="false"
                                       :disabled="sublist.sinsPayFeeWayDis"
                                       :totalNum="false"
                                       :isPage="true"
                                       :isGroup="false"
                                       :autoChoose="true"
                                       :url="getDictSelectBox"
                                       :data="{code: 'PAY_FEE_WAY'}"
                                       :chooseName.sync="sublist.taskConfirm.sinsPayFeeWayDict"
                                       :chooseId.sync="sublist.taskConfirm.sinsPayFeeWay"
                                       @change="sinsPayChange(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsPayFeeWay, index, _index)"
                                       :clear="true"></sino-select>
                        </sino-form-item>
                        <sino-form-item label="社保缴费方式：" v-if="sublist.taskConfirm.sinsDeclRadix === '' || sublist.taskConfirm.sinsDeclRadix === null" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.sinsPayFeeWayDict'">
                          <sino-select :filterable="false"
                                       :multiselect="false"
                                       :isshowTotol="false"
                                       :disabled="true"
                                       :totalNum="false"
                                       :isPage="true"
                                       :isGroup="false"
                                       :autoChoose="true"
                                       :url="getDictSelectBox"
                                       :data="{code: 'PAY_FEE_WAY'}"
                                       :chooseName.sync="sublist.taskConfirm.sinsPayFeeWayDict"
                                       :chooseId.sync="sublist.taskConfirm.sinsPayFeeWay"
                                       @change="sinsPayChange(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsPayFeeWay, index, _index)"
                                       :clear="true"></sino-select>
                        </sino-form-item>
                      </li>
                      <li>
                        <sino-form-item label="公积金缴费方式：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.accuPayFeeWayDict'" :rules="[{required: true, message: '请选择公积金缴费方式', trigger: 'change'}]" v-if="sublist.taskConfirm.accuDeclRadix !== '' && sublist.taskConfirm.accuDeclRadix !== null">
                          <sino-select class="fl"
                                       :filterable="true"
                                       :multiselect="false"
                                       :isshowTotol="false"
                                       :disabled="false"
                                       :totalNum="false"
                                       :isPage="true"
                                       :autoChoose="true"
                                       :isGroup="false"
                                       :url="getDictSelectBox"
                                       :data="{code: 'PAY_FEE_WAY'}"
                                       :chooseName.sync="sublist.taskConfirm.accuPayFeeWayDict"
                                       :chooseId.sync="sublist.taskConfirm.accuPayFeeWay"
                                       @change="accuPayChange(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuPayFeeWay, index, _index)"
                                       :clear="true"></sino-select>
                        </sino-form-item>
                        <sino-form-item label="公积金缴费方式：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.accuPayFeeWayDict'" v-if="sublist.taskConfirm.accuDeclRadix === '' || sublist.taskConfirm.accuDeclRadix === null">
                          <sino-select class="fl"
                                       :filterable="true"
                                       :multiselect="false"
                                       :isshowTotol="false"
                                       :disabled="true"
                                       :totalNum="false"
                                       :isPage="true"
                                       :autoChoose="true"
                                       :isGroup="false"
                                       :url="getDictSelectBox"
                                       :data="{code: 'PAY_FEE_WAY'}"
                                       :chooseName.sync="sublist.taskConfirm.accuPayFeeWayDict"
                                       :chooseId.sync="sublist.taskConfirm.accuPayFeeWay"
                                       @change="accuPayChange(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuPayFeeWay, index, _index)"
                                       :clear="true"></sino-select>
                        </sino-form-item>
                      </li>
                    </ul>
                    <ul class="sins-stan-ul clearfix sins-acct">
                      <template v-if="list.areaList[_index].taskConfirm.sinsDeclRadix !== null && list.areaList[_index].taskConfirm.sinsDeclRadix !== ''">
                        <li>
                          <sino-form-item label="社保执行地区：" class="search-inner-item" :prop="sublist.execuAreaName">
                            <sino-select :filterable="false"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="true"
                                         :totalNum="false"
                                         :isPage="true"
                                         :isGroup="false"
                                         :autoChoose="true"
                                         :url="areaUrl"
                                         :data="{data: {areaTypes: [4, 5]}}"
                                         :chooseName.sync="sublist.execuAreaName"
                                         :chooseId.sync="sublist.execuArea" :clear="true"></sino-select>
                          </sino-form-item>
                        </li>
                        <li>
                          <sino-form-item label="关联社保账户：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.sinsAcctNameList'" :rules="[{required: true, type: 'array', message: '请选择关联社保账户', trigger: 'change'}]">
                            <sino-select class="fl"
                                         :filterable="true"
                                         :multiselect="true"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :isPage="true"
                                         :autoChoose="true"
                                         :isGroup="false"
                                         :url="sinsUrl"
                                         :linkage="true"
                                         :data="watchObj['sinsAcct'+index+_index]"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctNameList"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctIdList"
                                         :clear="true"
                                         @change="sinsChange(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctIdList, index, _index)"
                            ></sino-select><!--areaId: sublist.execuArea, custId: list.custId, payFeeWay: sublist.taskConfirm.sinsPayFeeWay-->
                            <div class="adddimreason-btn adddimreason-btn1 fl ml20"  @click="addSinsAcct"><i class="iconfont sino-add"></i><span class="ml5">新增社保账户</span></div>
                          </sino-form-item>
                        </li>
                        <!--<li v-if="sublist.taskConfirm.sinsPayFeeWay !== null">
                          <sino-form-item label="关联社保账户：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.sinsAcctNameList'" :rules="[{required: true, type: 'array', message: '请选择关联社保账户', trigger: 'change'}]">
                            <sino-select class="fl"
                                         :filterable="true"
                                         :multiselect="true"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :isPage="true"
                                         :autoChoose="true"
                                         :isGroup="false"
                                         :url="sinsUrl"
                                         :data="{areaId: sublist.execuArea, custId: list.custId, payFeeWay: sublist.taskConfirm.sinsPayFeeWay}"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctNameList"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctIdList" :clear="true"></sino-select>
                            <div class="adddimreason-btn adddimreason-btn1 fl ml20"  @click="addSinsAcct"><i class="iconfont sino-add"></i><span class="ml5">新增社保账户</span></div>
                          </sino-form-item>
                        </li>-->
                        <li v-if="sublist.taskConfirm.householdTypeCity !== null">
                          <sino-form-item label="户口性质：" class="search-inner-item" :prop="sublist.householdTypeCity">
                            <sino-radio v-for="(item, inx) in householdTypeList" :disabled="true" :key="inx"
                                        v-model.number="sublist.taskConfirm.householdTypeCity"
                                        :label="item.id">{{item.title}}</sino-radio>
                          </sino-form-item>
                        </li>
                        <li v-if="sublist.taskConfirm.householdTypeCity !== null">
                          <sino-form-item label="社保缴费标准：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.sinsPkgNameCity'" :rules="[{required: true, message: '请选择社保缴费标准', trigger: 'change'}]">
                            <sino-select :filterable="false"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :isPage="true"
                                         :isGroup="false"
                                         :autoChoose="true"
                                         :url="localUrl"
                                         :data="{data: {areaId: sublist.execuArea, householdType: sublist.taskConfirm.householdTypeCity, localStanType: 1, isAddiPkg: 0}}"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsPkgNameCity"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsPkgIdCity" :clear="true"></sino-select>
                          </sino-form-item>
                        </li>
                        <li v-if="sublist.taskConfirm.householsTypeCountry !== null">
                          <sino-form-item label="户口性质：" class="search-inner-item" :prop="sublist.householsTypeCountry">
                            <sino-radio v-for="(item, inex) in householdTypeList" :disabled="true" :key="inex"
                                        v-model.number="sublist.taskConfirm.householsTypeCountry"
                                        :label="item.id">{{item.title}}</sino-radio>
                          </sino-form-item>
                        </li>
                        <li v-if="sublist.taskConfirm.householsTypeCountry !== null">
                          <sino-form-item label="社保缴费标准：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.sinsPkgNameCountry'" :rules="[{required: true, message: '社保缴费标准', trigger: 'change'}]">
                            <sino-select :filterable="false"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :isPage="true"
                                         :isGroup="false"
                                         :autoChoose="true"
                                         :url="localUrl"
                                         :data="{data: {areaId: empInfoForm.empInfoList[index].areaList[_index].execuArea, householdType: empInfoForm.empInfoList[index].areaList[_index].taskConfirm.householsTypeCountry, localStanType: 1, isAddiPkg: 0}}"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsPkgNameCountry"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsPkgIdCountry" :clear="true"></sino-select>
                          </sino-form-item>
                        </li>
                      </template>
                      <ul class="sins-stan-ul clearfix sins-acct-dashed" v-if="sublist.taskConfirm.accuDeclRadix !== null && sublist.taskConfirm.accuDeclRadix !== ''">
                        <li>
                          <sino-form-item label="公积金执行地区：" class="search-inner-item" :prop="sublist.execuAreaName">
                            <sino-select :filterable="false"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="true"
                                         :totalNum="false"
                                         :autoChoose="true"
                                         :isPage="true"
                                         :isGroup="false"
                                         :url="areaUrl"
                                         :data="{data: {areaTypes: [4, 5]}}"
                                         :chooseName.sync="sublist.execuAreaName"
                                         :chooseId.sync="sublist.execuArea" :clear="true"></sino-select>
                          </sino-form-item>
                        </li>
                        <li>
                          <sino-form-item label="关联公积金账户：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.accuAcctName'" :rules="[{required: true, message: '请选择关联公积金账户', trigger: 'change'}]" :ref="'accuAcct'+ index ">
                            <sino-select class="fl"
                                         :filterable="true"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :autoChoose="true"
                                         :isPage="true"
                                         :isGroup="false"
                                         :url="accuUrl"
                                         :linkage="true"
                                         :data="watchObj['accuAcct'+index+_index]"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuAcctName"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuAcctId"
                                         :clear="true"
                                         @change="accuAcctFun(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuAcctId, index, _index)"
                            ></sino-select><!--{payFeeWay: sublist.taskConfirm.accuPayFeeWay, custId: list.custId, areaId: sublist.execuArea}-->
                            <div class="adddimreason-btn adddimreason-btn1 fl ml20 pos-left"  @click="addAccuAcct"><i class="iconfont sino-add"></i><span class="ml5">新增公积金账户</span></div>
                          </sino-form-item>
                        </li>
                        <!--<li v-if="sublist.taskConfirm.accuPayFeeWay !== null">
                          <sino-form-item label="关联公积金账户：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.accuAcctName'" :rules="[{required: true, message: '请选择关联公积金账户', trigger: 'change'}]">
                            <sino-select class="fl"
                                         :filterable="true"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :autoChoose="true"
                                         :isPage="true"
                                         :isGroup="false"
                                         :url="accuUrl"
                                         :data="{payFeeWay: sublist.taskConfirm.accuPayFeeWay, custId: list.custId, areaId: sublist.execuArea}"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuAcctName"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuAcctId"
                                         :clear="true"
                                         @change="accuAcctFun(empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuAcctId, index, _index)"
                            ></sino-select>
                            <div class="adddimreason-btn adddimreason-btn1 fl ml20 pos-left"  @click="addAccuAcct"><i class="iconfont sino-add"></i><span class="ml5">新增公积金账户</span></div>
                          </sino-form-item>
                        </li>-->
                        <li>
                          <sino-form-item label="公积金缴费标准：" class="search-inner-item" :prop="'empInfoList['+index+'].areaList['+_index+'].taskConfirm.accuPkgName'" :rules="[{required: true, message: '公积金缴费标准', trigger: 'change'}]">
                            <sino-select :filterable="false"
                                         :multiselect="false"
                                         :isshowTotol="false"
                                         :disabled="false"
                                         :totalNum="false"
                                         :isPage="true"
                                         :isGroup="false"
                                         :autoChoose="true"
                                         :linkage="true"
                                         :url="localUrl"
                                         :data="watchObj['accuObj'+index+_index]"
                                         :chooseName.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuPkgName"
                                         :chooseId.sync="empInfoForm.empInfoList[index].areaList[_index].taskConfirm.accuPkgId" :clear="true"></sino-select>
                          </sino-form-item>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </div>
              </sino-collapse-transition>
            </div>
            <div class="clear"></div>
          </div>
        </sino-form>
        <div class="conf-btn">
          <sino-button type="primary" @click="subFun" :disabled="btnFlag">确 定</sino-button>
          <sino-button type="text" @click="resetAddLocal">取 消</sino-button>
        </div>
      </sino-con>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api/index';
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
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaListGroup: this.apiPath.hrsc.findAreaListGroup,
        areaUrl: this.apiPath.hrsc.findAreaList,
        prodUrl: this.apiPath.hrsc.findpropayname,
        sinsUrl: this.apiPath.sins.AcctSelectBox, // 关联社保账户
        accuUrl: this.apiPath.accu.accuAcctSelectBox, // 关联公积金
        localUrl: this.apiPath.hrsc.getLocalStanPkgSelectBox, // 标准组合
        localData: {areaId: '', householdType: ''},
        routerView: false,
        showList: [0],
        searchForm: { // 搜索条件
          empName: '',
          certNo: '',
          uniqNo: ''
        },
        sexList: [],
        householdTypeList: [],
        show: true,
        show1: false,
        show2: false,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        empInfoForm: {
          empInfoList: []
        },
        watchObj: {},
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
        pkgStateList: [],
        suppTypeData: {code: 'SUPP_TYPE'},
        cityData: {'data': {'level': 2}},
        accuPropData: '',
        btnFlag: false
//        sinsPayFeeWayDis: false,
//        accuPayFeeWayDis: false
      };
    },
    mounted () {
      api.post(this.getDictSelectBox, {code: 'SEX'}).then(res => {
        this.sexList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.getDictSelectBox, {code: 'HOUSEHOLD_TYPE'}).then(res => {
        this.householdTypeList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.getDictSelectBox, {code: 'HOUSEHOLD_TYPE'}).then(res => {
        this.householdProyList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      let _t = this;
      if (_t.$route.query.type === 'entrustedtasklistsum' || _t.$route.query.type === 'entrustedtasklistconfi' || _t.$route.query.type === 'curMonthExe' || _t.$route.query.type === 'nextMonthExe') {
        // A接口
        api.postsign(_t.apiPath.hrsc.findCustByTaskIds, {confirmFlag: _t.$route.query.confirmFlag, taskIds: JSON.parse(_t.$route.query.taskIds)}).then(res => {
          if (res.code === 'CPYY-00001') {
            _t.empInfoForm.empInfoList = res.data;
            _t.empInfoForm.empInfoList.forEach(function (list, index, array) {
              array[index].areaList.forEach(function (item, _index, array) {
                if (item.taskConfirm.accuDeclRadix !== null) {
                  _t.$set(_t.watchObj, ('accuObj' + index + _index), {data: {areaId: item.execuArea, localStanType: 2, accuProp: '', isAddiPkg: 0}});
                }
                _t.$set(_t.watchObj, ('accuAcct' + index + _index), {areaId: item.execuArea, custId: list.custId, payFeeWay: ''});
                _t.$set(_t.watchObj, ('sinsAcct' + index + _index), {areaId: item.execuArea, custId: list.custId, payFeeWay: ''});
                if (item.taskConfirm.sinsPayFeeWay !== null) {
                  item.sinsPayFeeWayDis = true;
                  setTimeout(function () {
                    _t.watchObj['sinsAcct' + index + _index].payFeeWay = item.taskConfirm.sinsPayFeeWay;
                  }, 100);
                } else {
                  item.sinsPayFeeWayDis = false;
                }
                if (item.taskConfirm.accuPayFeeWay !== null) {
                  item.accuPayFeeWayDis = true;
                  setTimeout(function () {
                    _t.watchObj['accuAcct' + index + _index].payFeeWay = item.taskConfirm.accuPayFeeWay;
                    // setTimeout(function () {
                    //   _t.$refs['accuAcct' + index][0].validateState = 'success';
                    //   _t.$refs['accuAcct' + index][0].validateMessage = '';
                    // });
                  }, 100);
                } else {
                  item.accuPayFeeWayDis = false;
                }
              });
            });
            // setTimeout(function () {
            //   if (_t.$refs.empInfoForm !== undefined) {
            //     _t.$refs.empInfoForm.$children[8].validateState = '';
            //     _t.$refs.empInfoForm.$children[8].validateMessage = '';
            //   }
            // }, 500);
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        api.post(_t.apiPath.hrsc.findCustByPubBatchId, {publishBatchId: _t.$route.query.publishBatchId, confirmFlag: _t.$route.query.confirmFlag}).then(res => {
          if (res.code === 'CPYY-00001') {
            _t.empInfoForm.empInfoList = res.data;
            _t.empInfoForm.empInfoList.forEach(function (list, index, array) {
              array[index].areaList.forEach(function (item, _index, array) {
                if (item.taskConfirm.accuDeclRadix !== null) {
                  _t.$set(_t.watchObj, ('accuObj' + index + _index), {data: {areaId: item.execuArea, localStanType: 2, accuProp: ''}});
                }
                _t.$set(_t.watchObj, ('accuAcct' + index + _index), {areaId: item.execuArea, custId: list.custId, payFeeWay: ''});
                _t.$set(_t.watchObj, ('sinsAcct' + index + _index), {areaId: item.execuArea, custId: list.custId, payFeeWay: ''});
                if (item.taskConfirm.sinsPayFeeWay !== null) {
                  item.sinsPayFeeWayDis = true;
                  setTimeout(function () {
                    _t.watchObj['sinsAcct' + index + _index].payFeeWay = item.taskConfirm.sinsPayFeeWay;
                  }, 100);
//                  _t.$set(_t.watchObj['sinsAcct' + index + _index], 'payFeeWay',  item.taskConfirm.sinsPayFeeWay)
                } else {
                  item.sinsPayFeeWayDis = false;
                }
                if (item.taskConfirm.accuPayFeeWay !== null) {
                  item.accuPayFeeWayDis = true;
                  setTimeout(function () {
                    _t.watchObj['accuAcct' + index + _index].payFeeWay = item.taskConfirm.accuPayFeeWay;
                    // setTimeout(function () {
                    //   _t.$refs['accuAcct' + index][0].validateState = 'success';
                    //   _t.$refs['accuAcct' + index][0].validateMessage = '';
                    // });
                  }, 100);
                } else {
                  item.accuPayFeeWayDis = false;
                }
              });
            });
            // setTimeout(function () {
            //   if (_t.$refs.empInfoForm !== undefined) {
            //     _t.$refs.empInfoForm.$children[8].validateState = '';
            //     _t.$refs.empInfoForm.$children[8].validateMessage = '';
            //   }
            // }, 500);
            console.log(_t.$refs);
          }
        }).catch(err => {
          console.log(err);
        });
      }
      _t.ruoteJudge();
    },
    watch: {
      $route: {
        handler: function (val) {
          let _t = this;
          if (val.path === "/empAss/entrustedtasklistimp/sinsaccuacctstan" || val.path === "/entrustedtasklistconfi/sinsaccuacctstan") {
            this.routerView = false;
            let _t = this;
            setTimeout(function () {
              _t.empInfoForm.empInfoList.forEach(function (list, index, array) {
                array[index].areaList.forEach(function (item, _index) {
                  _t.watchObj['sinsAcct' + index + _index].payFeeWay = item.taskConfirm.sinsPayFeeWay;
                  _t.watchObj['accuAcct' + index + _index].payFeeWay = item.taskConfirm.accuPayFeeWay;
                });
              });
            }, 300);
          }
        },
        deep: true
      }
    },
    methods: {
      // 解决刷新页面后退的bug
      ruoteJudge () {
        if (this.$route.path !== "/empAss/entrustedtasklistimp/sinsaccuacctstan" && this.$route.path !== "/entrustedtasklistconfi/sinsaccuacctstan") {
          this.routerView = true;
        }
      },
      // 客户名称信息展开收起
      showFun (_index) {
        if (this.showList.indexOf(_index) === -1) {
          this.showList.push(_index);
        } else {
          this.showList.splice(this.showList.indexOf(_index), 1);
        }
      },
      // 确定
      subFun () {
        let _this = this;
        if (_this.btnFlag === true) {
          return;
        }
        _this.$refs.empInfoForm.validate(function (valid) {
          if (valid) {
            if (_this.$route.query.type === 'entrustedtasklistsum' || _this.$route.query.type === 'entrustedtasklistconfi' || _this.$route.query.type === 'curMonthExe' || _this.$route.query.type === 'nextMonthExe') { // 任务单汇总
              _this.empInfoForm.empInfoList.forEach(function (list) {
                list.publishBatchId = _this.$route.query.publishBatchId;
              });
              _this.btnFlag = true;
              let _obj = {
                confirmFlag: _this.$route.query.confirmFlag || 0,
                taskIds: JSON.parse(_this.$route.query.taskIds),
                taskCustList: _this.empInfoForm.empInfoList
              };
              api.post(_this.apiPath.hrsc.saveServeTempDetAndTaskDetAndOrderDet, _obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.$message({message: '保存成功！',
                    type: 'success',
                    onClose: function () {
                      _this.btnFlag = false;
                      if (_this.$route.query.type === 'entrustedtasklistconfi' || _this.$route.query.type === 'curMonthExe' || _this.$route.query.type === 'nextMonthExe') {
                        _this.$router.push({path: '/entrustedtasklistconfi', query: {type: 'sinsaccustan', taskIds: _this.$route.query.oldtaskIds}});
                      } else {
                        _this.$router.push({path: '/entrustedtasklistconfi/entrustedtasklistsum', query: {type: 'sinsaccustan', taskIds: _this.$route.query.oldtaskIds}});
                      }
                    }
                  });
                } else {
                  _this.btnFlag = false;
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              _this.empInfoForm.empInfoList.forEach(function (list) {
                list.publishBatchId = _this.$route.query.publishBatchId;
              });
              _this.btnFlag = true;
              api.post(_this.apiPath.hrsc.saveServeTempDet, {confirmFlag: _this.$route.query.confirmFlag, taskCustList: _this.empInfoForm.empInfoList}).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.$message({message: '保存成功！',
                    type: 'success',
                    onClose: function () {
                      _this.btnFlag = false;
                      if (_this.$route.path === '/empAss/entrustedtasklistimp/sinsaccuacctstan') {
                        _this.$router.push({path: '/empAss/entrustedtasklistimp', query: {type: 'entrustedtasklistimp'}});
                        return false;
                      } else {
                        _this.$router.push({path: '/entrustedtasklistconfi', query: {type: 'entrustedtasklistconfi'}});
                        return false;
                      }
                    }
                  });
                } else {
                  _this.btnFlag = false;
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error');
            return false;
          }
        });
      },
      // 关联公积金账户下拉框根据返回ID查询调取公积金地区标准组合
      accuAcctFun (_id, index, _index) {
        let _this = this;
        api.post(_this.apiPath.accu.findAccuPropSelect, {accuAcctId: _id}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.list.length === 1) {
              _this.watchObj['accuObj' + index + _index].data.accuProp = res.data.list[0].title;
            } else {
              _this.watchObj['accuObj' + index + _index].data.accuProp = '';
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 根据公积金缴纳方式调取关联公积金账户
      accuPayChange (_id, index, _index) {
        this.watchObj['accuAcct' + index + _index].payFeeWay = _id;
        let _this = this;
        // setTimeout(function () {
        //   _this.$refs['accuAcct' + index][0].validateState = 'success';
        //   _this.$refs['accuAcct' + index][0].validateMessage = '';
        // }, 100);
      },
      sinsPayChange (_id, index, _index) {
        this.watchObj['sinsAcct' + index + _index].payFeeWay = _id;
      },
      // 点击新增社保账户
      addSinsAcct () {
        for (var i in this.watchObj) {
          this.watchObj[i].payFeeWay = '';
        }
        this.routerView = true;
        if (this.$route.path === '/empAss/entrustedtasklistimp/sinsaccuacctstan') {
          this.$router.push({path: '/empAss/entrustedtasklistimp/sinsaccuacctstan/custSinsAcct'});
          return false;
        } else {
          this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan/custSinsAcct'});
          return false;
        }
      },
      // 新增公积金账户
      addAccuAcct () {
        for (var i in this.watchObj) {
          this.watchObj[i].payFeeWay = '';
        }
        this.routerView = true;
        if (this.$route.path === '/empAss/entrustedtasklistimp/sinsaccuacctstan') {
          this.$router.push({path: '/empAss/entrustedtasklistimp/sinsaccuacctstan/custAccuAcct'});
          return false;
        } else {
          this.$router.push({path: '/entrustedtasklistconfi/sinsaccuacctstan/custAccuAcct'});
          return false;
        }
      },
      // 判断社保代收代付项是否有重复
      sinsChange (ids, index, _index) {
        api.post(this.apiPath.sins.findIsSameProduct, {sinsAcctIdList: ids}).then(res => {
          if (res.code === 'CPYY-00001') {
          } else {
            this.empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctNameList = [];
            this.empInfoForm.empInfoList[index].areaList[_index].taskConfirm.sinsAcctIdList = [];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消
      resetAddLocal () {
        // if (this.$route.path === '/empAss/entrustedtasklistimp/sinsaccuacctstan') {
        //   this.$router.push({path: '/empAss/entrustedtasklistimp'});
        //   return false;
        // } else {
        //   this.$router.push({path: '/entrustedtasklistconfi'});
        //   return false;
        // }
        this.$router.go(-1);
      }
    }
  };
</script>
