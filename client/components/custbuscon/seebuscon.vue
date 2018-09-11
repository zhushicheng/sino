<template>
  <sino-con class="suppcont">
    <sino-title type="levelOne" title="查看商务合同"></sino-title>
    <div class="buscon">
      <sino-form :model="busconForm" ref="busconForm" class="fl buscon-form">
          <sino-form-item label="签署对象：" prop="conSignObj" class="conSignObjstyle" >
              <sino-radio v-for="(item, index) in conSignObjlist" :key="index"
                          :label="item.id" :disabled="true"
                          v-model="busconForm.conSignObj"
              >{{item.title}}</sino-radio>
          </sino-form-item>
        <sino-form-item label="证件号码：" prop="certNo" class="certNostyle" v-if="busconForm.conSignObj === 3">
          <sino-input v-model="busconForm.certNo" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item  class="custChNamecss" label="客户名称：" prop="custChName" v-if="busconForm.conSignObj === 2">
          <sino-input  class="custChNameinput" v-model="busconForm.custChName" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item class="outlinecss" label="销售线索摘要：" prop="outline">
          <sino-select class="outlineinputcss" :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="true"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :data="{}"
                       :url="saleClueUrl"
                       :chooseName.sync="busconForm.outline"
                       :chooseId.sync="busconForm.saleClueId"
                       :clear="false"></sino-select>
        </sino-form-item>
        <sino-form-item class="custChNamecss" label="合同名称：" prop="conName">
          <sino-input class="custChNameinput" v-model="busconForm.conName" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="供应商名称：" prop="chName" v-if="busconForm.conSignObj === 1">
          <sino-input v-model="busconForm.chName" :disabled="true" ></sino-input>
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
        <sino-form-item label="销售负责人："  prop="saleConRespName" >
          <sino-input v-model="busconForm.saleConRespName" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="合同联系人：" prop="contName">
          <sino-input v-model="busconForm.contName" :disabled="true"></sino-input>
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
        <sino-form-item label="自动延顺：" prop="isPostpone">
          <sino-radio v-for="(item, index) in isPostponeList" :key="index"
                      :label="item.id" :disabled="true"
                      v-model="busconForm.isPostpone"
          >{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="合同份数：" prop="conTotalAmo">
          <sino-input type="text" v-model="busconForm.conTotalAmo" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="公司留存份数：" prop="corpKeepAmo">
          <sino-input type="text" v-model="busconForm.corpKeepAmo" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="约定付款日：" prop="payDate">
          <sino-input v-model="busconForm.payDate" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="次月付款：" prop="payNextMonth">
          <sino-radio v-for="(item, index) in isPostponeList" :key="index"
                      :label="item.id" :disabled="true"
                      v-model="busconForm.payNextMonth"
          >{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width clear" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="busconForm.remark" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="合同流转状态："  prop="conBusiStateName" >
          <sino-input v-model="busconForm.conBusiStateName" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="指派业务部门：" v-if="busconForm.conBusiState === 5"  prop="respBusiDepName" >
          <sino-input v-model="busconForm.respBusiDepName" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="顺延月数：" prop="postponeMonth" v-if="busconForm.isPostpone !== 0">
          <sino-input v-model="busconForm.postponeMonth" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="是否以此类推：" prop="isSuchAnal" v-if="busconForm.isPostpone !== 0">
          <sino-radio v-for="(list, index) in isSuchAnalList" :key="index"
                      v-model="busconForm.isSuchAnal" :disabled="true"
                      :label="list.id">{{list.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width clear" v-if="busconForm.conBusiState === 3" prop="eavRemark" label="审核不通过原因：">
          <sino-input type="textarea" v-model="busconForm.eavRemark" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-button type="primary" @click="submitForm">返 回</sino-button>
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
                <i class=" iconfont sino-qubiezhen"></i>
                <span class="buscon-span">{{list.encName}}</span>
              </div>
            </li>
          </ul>
          <div class="big-img">
            <img :src="uploadImgPath" alt="">
            <span v-if="uploadImgPathFlag" @click="largeImgFlag = !largeImgFlag;">预览大图</span>
            <!--<span v-if="uploadList.length >= 1" @click="seeImg(uploadImgPath)">预览</span>-->
          </div>
        </div>
        <!--预览大图-->
        <!--<div class="busconeav-view-large">
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
    <!--<sino-dialog :visible.sync="supAdd" v-on:close="resetForm('supAddForm')" size="samll"  class="see-dirc usermanage">
      <sino-title slot="title" type="levelOne" :title="'商务合同审核'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify13">
        <sino-form :model="supAddForm"  ref="supAddForm" class="demo-ruleForm">
          <sino-form-item prop="remark" label="审核不通过原因：" class="sino-from-wid">
            <sino-input type="textarea" v-model="supAddForm.remark"></sino-input>
          </sino-form-item>
          <sino-form-item class="usermanage-button">
            <sino-button type="primary" @click="submitForm">确 定</sino-button>
          </sino-form-item>
        </sino-form>
      </div>
    </sino-dialog>-->
  </sino-con>
</template>

<script>
  import api from '../../api';

  export default {
    components: {},
    data () {
      return {
        selectUrl: this.apiPath.hrsc.getDictSelectBox,
        saleClueUrl: this.apiPath.crm.findSaleClueSelectBox,
        custUrl: this.apiPath.hrsc.all,
        chUrl: this.apiPath.hrsc.selectBox,  // g
        isshowpdf: false,
        pdfurls: '',
        busconForm: {
          conSignObj: '',
          certNo: '',
          custChType: '',
          custChName: '',
          suppId: '',
          chName: '',
          saleClueId: '',
          outline: '',
          conName: '',
          contNo: '',
          conType: '',
          conTypeName: '',
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
          payNextMonth: '',
          remark: ''
        },
        conSignObjlist: [],
        isPostponeList: [],
        isSuchAnalList: [],
        uploadList: [],
        uploadImgPath: '',
        uploadImgPathFlag: true,
        conSignObjFlag: true, // 指派业务部
        largeImgFlag: false,
        alertTitle: '' // 弹层title
      };
    },
    created () {
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
        conId: this.$route.params.seeConId
      };
      api.post(this.apiPath.hrsc.find, _scope).then(res => {
        this.busconForm = res.data;
      }).catch(() => {
        console.log('失败!');
      });
      api.post(this.apiPath.hrsc.preEnc, _scope).then(res => {
        if (res.code === 'CPYY-00001') {
          if (res.data.length === 0) {
            this.uploadImgPathFlag = false;
          }
          this.uploadList = res.data;
          if (res.data[0].conEncRelType === 'pdf') {
            this.uploadImgPathFlag = false;
          } else {
            this.uploadImgPathFlag = true;
            this.uploadImgPath = res.data[0].conEncRelPath;
          }
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
      // pdf 预览
      closepdf () {
        this.isshowpdf = false;
      },
      closeimg () {
        this.isshowimg = false;
      },
      adopt: function () {
        this.$alert('该商务合同未指派业务部门，确认审核通过并生效合同？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      noAdopt: function () {
        this.supAdd = true;
      },
      tabImg (list) {
        if (list.conEncRelType === 'pdf') {
//          this.pdfurls = '/2018-01-11@c523cb10728c45b7994884a713000d62.pdf';
          this.pdfurls = list.conEncRelPath;
          this.isshowpdf = true;
        } else {
          this.uploadImgPath = list.conEncRelPath;
          this.uploadImgPathFlag = true;
        }
      },
      submitForm () {
        window.history.back();
      }
    }
  };
</script>

<style>
  .suppcont{min-width: 1300px;overflow: hidden}
  .buscon-form .conSignObjstyle {
    width: 67%;
  }
  .conSignObjstyle .sino-form-item-label {
    width: 24%;
  }
  .certNostyle {
    width: 33% !important;
  }
  .certNostyle .sino-form-item-label {
    margin-left: -32%;
  }
  .custChNamecss {
    width: 100% !important;
  }
  .custChNamecss .sino-form-item-label {
    width: 20%;
  }
  .custChNameinput{
    width: 480px;
  }
  .custChNameinput .sino-input-inner {
    width: 100%;
  }
  .outlinecss {
    width: 100% !important;
  }
  .outlinecss .sino-form-item-label {
    width: 20%;
  }
  .outlineinputcss{
    width: 480px;
  }
  .outlineinputcss .sino-input-inner {
    width: 100%;
  }
</style>
