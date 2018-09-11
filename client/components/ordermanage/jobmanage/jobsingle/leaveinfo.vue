<template>
  <!--撤离信息-->
  <div class="usermanage invinfo">
    <sino-con>
      <sino-title type="levelOne" title="撤离信息"></sino-title>
      <sino-form :model="leaveInfoForm" ref="leaveInfoForm" :rules="leaveInfoRules"  class="serch-form">
        <div class="search-box search-box-width search-box-width1">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input class="fl" type="text" v-model="leaveInfoForm.empName"
                          :disabled="true"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text" v-model="leaveInfoForm.certNo"
                          :disabled="true"></sino-input>
            </li>
            <li>
              <sino-form-item label="离职原因：" prop="leaveReasonName" class="search-inner-width " :rules="[{required: true, message: '离职原因为必填项', trigger: 'change'}]">
                <sino-select :filterable="true" class="fl"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="leaveUrl"
                             :chooseName.sync="leaveInfoForm.leaveReasonName"
                             :chooseId.sync="leaveInfoForm.leaveReason"
                             :data="leaveData"
                             @clearChange="leaveReasonFun1(leaveInfoForm.leaveReasonName)"
                             @contentChange="leaveReasonFun(leaveInfoForm.leaveReasonName)"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="订单结束日期：" class="search-inner-width " prop="orderEndDate">
                <sino-date-picker class="fl"
                                  v-model="leaveInfoForm.orderEndDate"
                                  type="date"
                                  @change="dateChange"
                                  :editable="false"
                                  :readonly="false"
                                  :disabled="endDateFlag"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li class="li-wid mb15">
              <sino-form-item label="备注：" class="search-inner-width " prop="remark">
                <sino-input class="fl" type="textarea" v-model="leaveInfoForm.remark"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <div class="emp-info-page mt15">
      <sino-form :model="leaveListForm" ref="leaveListForm" class="serch-form leaveinfo-form">
        <div>
          <div>
            <sino-title class="mt15 fl" type="levelTwo"  title="基础服务">
              <div class="demo-block-control emp-cop"   @click="show_one = !show_one" >
                <div class="fr">
                  <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show_one,'sino-angle-double-up':show_one}" ></i>
                  <span v-if="!show_one">展开</span>
                  <span v-if="show_one">收起</span>
                </div>
              </div>
            </sino-title>
          </div>
          <div class="local-info">
            <sino-collapse-transition>
              <div v-show="show_one">
                <ul class="leaveinfo-ul">
                  <li v-for="(item, index) in leaveListForm.serves" :key="index"  :class="{styHeight:chil_show&&item.children}">
                    <div class="perSonTop">
                      <div class="leaveinfo-ul-li">
                        <i v-if="item.children" class="iconfont sino-wenjianjia wjj" @click="chil_show = !chil_show"></i>
                        <span v-text="item.prodName"></span>
                      </div>
                      <div class="leaveinfo-ul-li">
                        <span class="fl">起做日期：</span>
                        <sino-date-picker class="fl"
                                          v-model="item.publishBegDate"
                                          type="date"
                                          :editable="false"
                                          :disabled="true"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </div>
                      <div class="leaveinfo-ul-li" :class="{'color-bor': item.isImpl === 1, '': item.isImpl !== 1}">
                        <span class="fl">止做日期：</span>
                        <sino-date-picker class="fl"
                                          v-model="item.publishEndDate"
                                          type="date"
                                          :editable="false"
                                          :disabled="endDateFlag"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </div>
                    </div>
                    <sino-collapse-transition>
                      <div class="perSonDown" v-show="chil_show" v-if="item.children">
                        <ul class="leaveinfo-ul" :class="{showSty:chil_show}">
                          <li v-for="(item1, index1) in item.children" :key="index1">
                            <div class="leaveinfo-ul-li">
                              <span v-text="item1.prodName"></span>
                            </div>
                            <div class="leaveinfo-ul-li">
                              <span class="fl">起做日期：</span>
                              <sino-date-picker class="fl"
                                                v-model="item1.publishBegDate"
                                                type="date"
                                                :editable="false"
                                                :disabled="true"
                                                :readonly="false"
                                                :clearable="true">
                              </sino-date-picker>
                            </div>
                            <div class="leaveinfo-ul-li" :class="{'color-bor': item1.isImpl === 1, '': item1.isImpl !== 1}">
                              <span class="fl">止做日期：</span>
                              <sino-date-picker class="fl"
                                                v-model="item1.publishEndDate"
                                                type="date"
                                                :editable="false"
                                                :disabled="endDateFlag"
                                                :readonly="false"
                                                :clearable="true">
                              </sino-date-picker>
                            </div>
                            <div class="clear"></div>
                          </li>
                        </ul>
                      </div>
                    </sino-collapse-transition>
                  </li>
                </ul>
              </div>
            </sino-collapse-transition>
          </div>
        </div>
        <div>
          <sino-title  type="levelTwo" class="fl"  title="社保">
            <div class="demo-block-control emp-cop"   @click="show_two = !show_two" >
              <div class="fr">
                <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show_two,'sino-angle-double-up':show_two}" ></i>
                <span v-if="!show_two">展开</span>
                <span v-if="show_two">收起</span>
              </div>
            </div>
          </sino-title>
        </div>
        <div class="local-info">
          <sino-collapse-transition >
            <div v-show="show_two">
              <ul class="leaveinfo-ul">
                <li v-for="(item, index) in leaveListForm.sinss" :key="index">
                  <div class="leaveinfo-ul-li">
                    <span v-text="item.proPayName"></span>
                  </div>
                  <div class="leaveinfo-ul-li">
                    <span class="fl">起做日期：</span>
                    <sino-date-picker class="fl"
                                      v-model="item.publishBegDate"
                                      type="date"
                                      :editable="false"
                                      :disabled="true"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </div>
                  <div class="leaveinfo-ul-li" :class="{'color-bor': item.isImpl === 1, '': item.isImpl !== 1}">
                    <span class="fl">止做日期：</span>
                    <sino-date-picker class="fl"
                                      v-model="item.publishEndDate"
                                      type="date"
                                      :editable="false"
                                      :disabled="endDateFlag"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </div>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
        <sino-title class="fl" type="levelTwo"  title="公积金">
          <div class="demo-block-control emp-cop" @click="show_three = !show_three" >
            <div class="fr">
              <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show_three,'sino-angle-double-up':show_three}" ></i>
              <span v-if="!show_three">展开</span>
              <span v-if="show_three">收起</span>
            </div>
          </div>
        </sino-title>
        <div class="local-info">
          <sino-collapse-transition >
            <div v-show="show_three">
              <ul class="leaveinfo-ul">
                <li v-for="(item, index) in leaveListForm.accus" :key="index">
                  <div class="leaveinfo-ul-li">
                    <span>公积金</span>
                  </div>
                  <div class="leaveinfo-ul-li">
                    <span class="fl">起做日期：</span>
                    <sino-date-picker class="fl"
                                      v-model="item.publishBegDate"
                                      type="date"
                                      :editable="false"
                                      :disabled="true"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </div>
                  <div class="leaveinfo-ul-li" :class="{'color-bor': item.isImpl === 1, '': item.isImpl !== 1}">
                    <span class="fl">止做日期：</span>
                    <sino-date-picker class="fl"
                                      v-model="item.publishEndDate"
                                      type="date"
                                      :editable="false"
                                      :disabled="endDateFlag"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </div>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
        <sino-title class="fl" type="levelTwo"  title="福利">
          <div class="demo-block-control emp-cop" @click="show_four = !show_four">
            <div class="fr">
              <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show_four,'sino-angle-double-up':show_four}" ></i>
              <span v-if="!show_four">展开</span>
              <span v-if="show_four">收起</span>
            </div>
          </div>
        </sino-title>
        <div class="local-info">
          <sino-collapse-transition >
            <div v-show="show_four">
              <ul class="leaveinfo-ul">
                <li v-for="(item, index) in leaveListForm.welfares" :key="index">
                  <div class="leaveinfo-ul-li">
                    <span v-text="item.prodName"></span>
                  </div>
                  <div class="leaveinfo-ul-li">
                    <span class="fl">起做日期：</span>
                    <sino-date-picker class="fl"
                                      v-model="item.publishBegDate"
                                      type="date"
                                      :editable="false"
                                      :disabled="true"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </div>
                  <div class="leaveinfo-ul-li">
                    <span class="fl">止做日期：</span>
                    <sino-date-picker class="fl"
                                      v-model="item.publishEndDate"
                                      type="date"
                                      :editable="false"
                                      :disabled="endDateFlag"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </div>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="sureFun">确 定</sino-button>
        </div>
      </sino-form>
    </div>
    <!--实做确认-->
    <sino-dialog :visible.sync ="dialogChooseFlag" :show-close="true" :lock-scroll="true" class="leaveinfo-dialog">
      <sino-title slot="title" type="levelOne" title="提示信息" class="sino-dialog-title"></sino-title>
      <div class="fl choose-div-menu">
        <h6 class="mb15">该雇员<span>{{ this.maxImplDate }}</span>的社保/公积金已“申报成功”，请确认</h6>
        <sino-radio v-model="radio" label="1">直接撤离到可停缴月份</sino-radio>
        <sino-radio v-model="radio" label="2">与经办员确认后在撤离</sino-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" class="clear" @click="leaveClick">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Vue from 'vue';
  import Cookies from 'js-cookie';
  import Utils from '../../../development/component/sinoEdittable/utils/index.js';

  export default {
    components: {},
    data () {
      return {
        dicSelUrl: this.apiPath.hrsc.getDictSelectBox,
        findAreaListGroup: this.apiPath.hrsc.findAreaListGroup,
        areaUrl: this.apiPath.hrsc.findAreaList,
        prodUrl: this.apiPath.hrsc.findpropayname,
        leaveUrl: this.apiPath.hrsc.dimReasonDrop,
        orderEndDate: '',
        endDate: '',
        leaveInfoForm: { // 搜索条件
          empName: '',
          certNo: '',
          leaveReason: '',
          leaveReasonName: '',
          orderEndDate: '',
          remark: '',
          orderId: '',
          sinsDetCount: {
            sinsCount: 0
          },
          orderFlag: false
        },
        leaveInfoRules: {
          orderEndDate: [
            {type: 'date', required: true, message: '请选择订单结束日期', trigger: 'change'}
          ]
        },
        show_one: true,
        chil_show: true,
        show_two: true,
        show_three: true,
        show_four: true,
        leaveListForm: {
          sinss: [],
          accus: [],
          welfares: []
        },
        serves: null,
        colorFlag: false,
        dialogChooseFlag: false,
        radio: '',
        leaveData: {
          orderId: this.$route.query.orderId
        },
        treeStructure: true,
        defaultExpandAll: false,
        columns: [ // 分组
          {
            text: '产品名称',
            dataIndex: 'prodName'
          }
        ],
        leaveListFlag: false,
        maxImplDate: null,
        endDateFlag: false
      };
    },
    mounted () {
      api.postsign(this.apiPath.hrsc.getLeaveInfo, this.$route.query.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.leaveInfoForm.empName = res.data.empName;
          this.leaveInfoForm.certNo = res.data.certNo;
          this.leaveInfoForm.sinsDetCount.sinsCount = res.data.sinsDetCount.sinsCount;
          this.leaveInfoForm.orderFlag = res.data.orderFlag;
          this.leaveListForm = res.data;
          this.endDate = res.data.endDate;
          if (res.data.serves && res.data.serves.length > 0) {
            this.leaveListFlag = true;
            this.serves = res.data.serves;
          }
        }
      }).catch(err => {
        console.log(err);
      });
      let aa = this.$route.query.orderId;
      this.leaveData.orderId = aa;
      this.leaveInfoForm.orderId = aa;
    },
    methods: {
      leaveReasonFun (Cts) {
        if (Cts !== '' && Cts !== undefined) {
          if (Cts.indexOf("撤销服务") >= 0 && Cts.indexOf("不收费") >= 0) {
            this.endDateFlag = true;
            if (this.leaveInfoForm.orderFlag === false) {
              this.leaveInfoForm.orderEndDate = new Date(this.endDate);
            } else {
              let _this = this;
              this.$alert('有实作数据，不能撤销服务!', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning',
                dragFlag: true,
                customClass: '',
                lockScroll: true,
                callback: action => {
                  _this.leaveInfoForm.leaveReason = '';
                  _this.leaveInfoForm.leaveReasonName = '';
                  return false;
                }
              });
            }
          } else {
            this.leaveInfoForm.orderEndDate = '';
            this.endDateFlag = false;
          }
        }
      },
      leaveReasonFun1 (Cts) {
        if (Cts.indexOf("撤销服务") >= 0 && Cts.indexOf("不收费") >= 0) {
          this.endDateFlag = true;
        } else {
          this.endDateFlag = false;
        }
      },
      dateChange (date) {
        if (date === '' || date === undefined) {
          return false;
        }
        let _obj = JSON.parse(JSON.stringify(this.leaveInfoForm));
        if (this.endDate === '') {
          _obj.orderEndDate = Vue.filter('date')(this.leaveInfoForm.orderEndDate, 'yyyy-MM-dd');
        }
        api.post(this.apiPath.hrsc.calLeaveBegDate, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.leaveListForm = res.data;
            this.maxImplDate = res.data.maxImplDate;
            this.serves = res.data.serves;
            if (this.serves.length && this.serves.length > 0) {
              this.leaveListFlag = true;
              let me = this;
              if (me.treeStructure) {
                me.serves = Utils.MSDataTransfer.treeToArray(res.data.serves, null, null, me.defaultExpandAll);
              };
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 确认撤离
      sureFun () {
        let _this = this;
        _this.$refs.leaveInfoForm.validate((valid) => {
          if (valid) {
            let _obj = _this.leaveInfoForm;
            _this.leaveListForm.accus.forEach(function (item) {
              if (item.isImpl === 1) {
                _this.dialogChooseFlag = true;
                return false;
              }
            });
            _this.leaveListForm.sinss.forEach(function (item) {
              if (item.isImpl === 1) {
                _this.dialogChooseFlag = true;
                return false;
              }
            });
            _obj.serves = _this.serves;
            _obj.sinss = _this.leaveListForm.sinss;
            _obj.accus = _this.leaveListForm.accus;
            _obj.welfares = _this.leaveListForm.welfares;
            if (!_this.dialogChooseFlag) {
//              _obj.orderEndDate = Vue.filter('date')(_this.leaveInfoForm.orderEndDate, 'yyyy-MM-dd');
              api.post(_this.apiPath.hrsc.leaveSingle, _obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.$message({message: '操作成功！',
                    type: 'success',
                    onClose: function () {
                      _this.$router.push({path: '/jobSingle'});
                    }
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      leaveClick () {
        if (this.radio === "1") {
          let _this = this;
          let _obj = _this.leaveInfoForm;
          _obj.serves = this.serves;
          _obj.orderEndDate = Vue.filter('date')(_this.leaveInfoForm.orderEndDate, 'yyyy-MM-dd');
          api.post(_this.apiPath.hrsc.leaveSingle, _obj).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.dialogChooseFlag = false;
              _this.$message({message: '操作成功！',
                type: 'success',
                onClose: function () {
                  _this.$router.push({path: '/jobSingle'});
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.$router.push({path: '/jobSingle'});
        }
      },
      // 显示行
      showTr: function (row, index) {
        let show = (row.row._parent ? row.row._parent._expanded : true);
        row.row._show = show;
        return show ? '' : 'display:none';
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this;
        let record = me.serves[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this;
        if (me.treeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候， 图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>
