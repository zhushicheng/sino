<template>
  <sino-con class="suppcont">
    <sino-title type="levelOne" title="查看商务合同"></sino-title>
    <div class="buscon">
      <sino-form :model="busconForm" :rules="busconRules" ref="busconForm" class="fl buscon-form">
        <sino-form-item label="签署对象：" prop="conSignObj">
          <sino-radio v-for="(item, index) in conSignObjlist" :key="index"
                      :label="item.id" :disabled="true"
                      v-model="busconForm.conSignObj"
          >{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="客户名称：" prop="custChName" v-if="busconForm.conSignObj === 2">
          <sino-input v-model="busconForm.custChName" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="供应商名称：" prop="chName" v-if="busconForm.conSignObj === 1">
          <sino-input v-model="busconForm.chName" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="销售线索摘要：" prop="outline">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="true"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="saleClueUrl"
                       :data="{}"
                       :chooseName.sync="busconForm.outline"
                       :chooseId.sync="busconForm.saleClueId"
                       :clear="false"></sino-select>
        </sino-form-item>
        <sino-form-item label="合同名称：" prop="conName">
          <sino-input v-model="busconForm.conName" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="合同编号：" prop="contNo">
          <sino-input v-model="busconForm.contNo" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="合同类型：" prop="conTypeName">
          <sino-select :tipText="'请选择'"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="true"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="selectUrl"
                       :data="{code: 'CON_TYPE'}"
                       :chooseName.sync="busconForm.conTypeName"
                       :chooseId.sync="busconForm.conType"
                       :clear="false"></sino-select>
        </sino-form-item>
        <sino-form-item label="合同开始日期：" prop="begDate">
          <sino-date-picker
            v-model="busconForm.begDate"
            type="date"
            :editable="false" :disabled="true"
            :readonly="false"
            :clearable="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="合同结束日期：" prop="endDate">
          <sino-date-picker
            v-model="busconForm.endDate"
            type="date"
            :editable="false" :disabled="true"
            :readonly="false"
            :clearable="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="签约日期：" prop="signDate">
          <sino-date-picker
            v-model="busconForm.signDate"
            type="date"
            :editable="false" :disabled="true"
            :readonly="false"
            :clearable="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="是否自动延顺：" prop="isPostpone">
          <sino-radio v-for="(item, index) in isPostponeList" :key="index"
                      :label="item.id" :disabled="true"
                      v-model="busconForm.isPostpone"
          >{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="顺延月数：" prop="postponeMonth" v-if="busconForm.isPostpone !== 0">
          <sino-input v-model="busconForm.postponeMonth" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="是否以此类推：" prop="isSuchAnal" v-if="busconForm.isPostpone !== 0">
          <sino-radio v-for="(item, index) in isSuchAnalList" :key="index"
                      v-model="busconForm.isSuchAnal" :disabled="true"
                      :label="item.id">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="约定付款日：" prop="payDate">
          <sino-input v-model="busconForm.payDate" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="合同总份数：" prop="conTotalAmo">
          <sino-input type="text" v-model="busconForm.conTotalAmo" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="公司留存份数：" prop="corpKeepAmo">
          <sino-input type="text" v-model="busconForm.corpKeepAmo" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="合同联系人：" prop="contName">
          <sino-input v-model="busconForm.contName" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="销售负责人："  prop="saleConRespName" >
          <sino-input v-model="busconForm.saleConRespName" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width clear" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="busconForm.remark" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="指派业务部门：" prop="respBusiDepName" v-if="busconForm.conBusiState < 3">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="orgSelectUrl"
                       :data="orgSelectData"
                       :chooseName.sync="busconForm.respBusiDepName"
                       :chooseId.sync="busconForm.respBusiDepId"
                       :clear="false"></sino-select>
        </sino-form-item>
        <div class="bus-btn">
          <div class="bus-btn1">
            <sino-button type="primary" class="fl" @click="submitFun" :disabled="submitBtnFlag">审核通过</sino-button>
            <sino-button type="primary" class="fl" @click="submitErr">审核不通过</sino-button>
            <sino-button type="text" class="fl" @click="reback">返 回</sino-button>
          </div>
        </div>
      </sino-form>
      <div class="busconeav-enclosure">
        <div class="text fl">附件：</div>
        <div class="busconeav-enclosure-div">
          <ul class="clearfix fl">
            <li v-for="(list, index) in uploadList" :key="index">
              <div class="fl" @click="tabImg(list)">
                <template v-if="list.conEncRelType == 'pdf'">
                  <i class="iconfont sino-pdf fl"></i>
                </template>
                <template v-else>
                  <img :src="list.conEncRelPath" alt="">
                </template>
                <i class="iconfont sino-qubiezhen"></i>
                <span class="buscon-span">{{list.encName}}</span>
              </div>
            </li>
          </ul>
          <div class="big-img">
            <img :src="uploadImgPath" alt="">
            <span v-if="uploadImgPathFlag" @click="largeImgFlag = !largeImgFlag">预览大图</span>
            <!--<span v-if="uploadList.length >= 1" @click="seeImg(uploadImgPath)">预览</span>-->
          </div>
          <!--预览大图-->
          <!--<div class="busconeav-view-large" v-if="largeImgFlag">
            <sino-title slot="title" type="levelOne" title="预览大图">
              <i class="iconfont fr sino-guanbi" @click="largeImgFlag=false"></i>
            </sino-title>
            <img :src="uploadImgPath" alt="">
          </div>-->
          <sino-img :imgurl="uploadImgPath" :isshowimg="largeImgFlag" v-show="largeImgFlag" @closeimg="closeimg"></sino-img>
          <!--pdf 预览-->
          <sino-pdf @closepdf="closepdf" :isshowpdf="isshowpdf" v-show="isshowpdf" :pdfurl="pdfurls" :maxscale='4' :minscale='0.6' :scale='1.1' ></sino-pdf>
        </div>
      </div>
    </div>
    <sino-dialog :visible.sync="supAdd" v-on:close="resetForm('supAddForm')" size="samll"  class="see-dirc usermanage">
      <sino-title slot="title" type="levelOne" :title="'商务合同审核'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify13">
        <sino-form :model="supAddForm"  ref="supAddForm" :rules="supAddRules" class="demo-ruleForm mt15">
          <sino-form-item prop="eavRemark" label="审核不通过原因：" class="sino-from-wid">
            <sino-input type="textarea" v-model="supAddForm.eavRemark"></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="supAddSubmit" :disabled="submitErrFlag">确 定</sino-button>
      </span>
    </sino-dialog>
  </sino-con>
</template>

<script>
  import api from '../../api';
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        selectUrl: this.apiPath.hrsc.getDictSelectBox,
        saleClueUrl: this.apiPath.crm.findSaleClueSelectBox,
        orgSelectUrl: this.apiPath.author.findOrgSelectBoxByCorpId,
        respBusUrl: this.apiPath.author.findUserRoleByOrgAndRoleType,
        respBusData: Cookies.get('userRoleId'),
        custUrl: this.apiPath.hrsc.all,
        chUrl: this.apiPath.hrsc.selectBox,  // g
        isshowpdf: false,
        pdfurls: '',
        supAdd: false,
        busconForm: {
          conSignObj: '',
          custChType: '',
          custChName: '',
          suppId: '',
          chName: '',
          saleClueId: '',
          outline: '',
          conName: '',
          contNo: '',
          respBusiDepId: '',
          respBusiDepName: '',
          begDate: '',
          endDate: '',
          signDate: '',
          isPostpone: '',
          postponeMonth: '',
          isSuchAnal: '',
          payDate: '',
          conTotalAmo: '',
          corpKeepAmo: '',
          contName: '',
          saleConRespName: '',
          remark: ''
        },
        busconRules: {
          conTypeName: [
            {required: true, message: '请选择指派业务部门', trigger: 'change'}
          ]
        },
        conSignObjlist: [],
        isPostponeList: [],
        isSuchAnalList: [],
        supAddForm: {
          eavRemark: ''
        },
        supAddRules: {
          eavRemark: [
            {required: true, message: '请输入审核不通过原因', trigger: 'change'}
          ]
        },
        conSignObjFlag: true, // 指派业务部
        alertTitle: '',
        orgSelectData: {
          corpId: JSON.parse(Cookies.get('CorpId')),
          orgTypes: this.$route.params.orgTypes
        },
        uploadList: [],
        uploadImgPath: '',
        largeImgFlag: false,
        uploadImgPathFlag: true,
        submitBtnFlag: false, // 商务合同审核禁用按钮判断
        submitErrFlag: false // 商务合同审核不通过禁用按钮判断
      };
    },
    mounted () {
      api.post(this.selectUrl, {code: 'CON_SIGN_OBJ', defaultValue: '1'}).then(res => {
        this.conSignObjlist = res.data.list;
        this.conSignObjlist.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.busconForm.conSignObj = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      api.post(this.selectUrl, {code: 'YES_NO', defaultValue: '1'}).then(res => {
        this.isPostponeList = res.data.list;
        this.isPostponeList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.busconForm.isPostpone = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      api.post(this.selectUrl, {code: 'YES_NO', defaultValue: '1'}).then(res => {
        this.isSuchAnalList = res.data.list;
        this.isSuchAnalList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.busconForm.isSuchAnal = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      let _scope = {
        conId: this.$route.params.conId
      };
      api.post(this.apiPath.hrsc.find, _scope).then(res => {
        this.busconForm = res.data;
      }).catch(() => {
        console.log('失败!');
      });
      api.post(this.apiPath.hrsc.preEnc, _scope).then(res => {
        this.uploadList = res.data;
        this.uploadImgPath = res.data[0].conEncRelPath;
        if (res.data[0].conEncRelType === 'pdf') {
          this.uploadImgPathFlag = false;
        } else {
          this.uploadImgPathFlag = true;
          this.uploadImgPath = res.data[0].conEncRelPath;
        }
      }).catch(() => {
        console.log('失败!');
      });
    },
    watch: {
      'busconForm.conSignObj': function (val, oldval) {
        this.conSignObjFlag = !this.conSignObjFlag;
      }
    },
    methods: {
      sucFun () {
        let _this = this;
        _this.submitBtnFlag = true;
        if (_this.busconForm.respBusiDepId === null && _this.busconForm.respBusiDepName === null) {
          this.$confirm('该商务合同未指派业务部门，确认审核通过并生效合同?', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            this.busconForm.conId = this.$route.params.conId;
            api.post(this.apiPath.hrsc.checkcustconinfo, this.busconForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$alert('审核完成', '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'success',
                  dragFlag: true,
                  customClass: '', // 添加class
                  lockScroll: true,
                  callback: action => {
                    _this.submitBtnFlag = false;
                    _this.$router.push({path: '/custBusCon', query: {type: 'busconeav'}});
                  }
                });
              } else {
                _this.submitBtnFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            _this.submitBtnFlag = false;
            console.log('审核失败!');
          });
        } else {
          this.busconForm.conId = this.$route.params.conId;
          api.post(this.apiPath.hrsc.checkcustconinfo, this.busconForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$alert('审核完成', '提示信息', {
                confirmButtonText: '确 定',
                type: 'success',
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  _this.submitBtnFlag = false;
                  _this.$router.push({path: '/custBusCon', query: {type: 'busconeav'}});
                }
              });
              return;
            } else {
              _this.submitBtnFlag = false;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      submitFun () {
        let _this = this;
        if (_this.submitBtnFlag === true) {
          return;
        }
        _this.$refs.busconForm.validate((valid) => {
          if (valid) {
            _this.sucFun();
          } else {
            console.log('error submit!!');
          }
        });
      },
      submitErr () {
        this.supAdd = true;
      },
      supAddSubmit () {
        if (this.submitErrFlag) {
          return;
        }
        this.$refs.supAddForm.validate((valid) => {
          if (valid) {
            let _data = {
              conId: this.$route.params.conId,
              eavRemark: this.supAddForm.eavRemark
            };
            this.submitErrFlag = true;
            api.post(this.apiPath.hrsc.nonapprova, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.supAdd = false;
                this.$alert('审核完成', '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'success',
                  dragFlag: true,
                  customClass: '', // 添加class
                  lockScroll: true,
                  callback: action => {
                    this.submitErrFlag = false;
                    this.$router.push({path: '/custBusCon', query: {type: 'busconeav'}});
                  }
                });
                return;
              } else {
                this.submitErrFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
          }
        });
      },
      reback () {
        window.history.back();
      },
      tabImg (list) {
        if (list.conEncRelType === 'pdf') {
          this.pdfurls = list.conEncRelPath;
          this.isshowpdf = true;
        } else {
          this.uploadImgPath = list.conEncRelPath;
          this.uploadImgPathFlag = true;
        }
      },
      // pdf 预览
      closepdf () {
        this.isshowpdf = false;
      },
      // 图片预览
      closeimg () {
        this.isshowimg = false;
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped>
  .suppcont{min-width: 1160px;overflow: hidden}
</style>
