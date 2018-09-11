<template>
  <div class="usermanage localinfo addBGC" id="localinfoId">
    <sino-form :model="particularForm"  class="serch-form" ref="particularForm">
      <sino-con class="first-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
        <sino-title type="levelOne" title="查看鉴定信息"></sino-title>
        <div class="crumbs style-crumb">
          <ul class="sixflex width-log">
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span @click="stepFun(1)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>提交申请</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2}"><span @click="stepFun(2)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>送鉴定中心</span></li>
            <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 3}"><span @click="stepFun(3)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 3}">{{activeNode > 3? '':3}}</i>审核未通过</span></li>
            <li :class="{'li-finish': activeNode > 4, 'li-active': activeNode === 4}"><span @click="stepFun(4)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 4}">{{activeNode > 4? '':4}}</i>维护鉴定日期</span></li>
            <li :class="{'li-finish': activeNode > 5, 'li-active': activeNode === 5}"><span @click="stepFun(5)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 5}">{{activeNode > 5? '':5}}</i>通知雇员鉴定</span></li>
            <li :class="{'li-finish': activeNode > 6, 'li-active': activeNode === 6}"><span @click="stepFun(6)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 6}">{{activeNode > 6? '':6}}</i>领取鉴定结果</span></li>
            <li :class="{'li-finish': activeNode > 7, 'li-active': activeNode === 7}"><span @click="stepFun(7)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 7}">{{activeNode > 7? '':7}}</i>已发放鉴定书</span></li>
          </ul>
        </div>
      </sino-con>
      <sino-con>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="雇员信息" class="service-module-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li>
                <h6>雇员姓名</h6><span v-text="injappr.empName"></span>
              </li>
              <li>
                <h6>证件号码</h6><span v-text="injappr.certNo"></span>
              </li>
              <li>
                <h6>社保执行地</h6><span v-text="injappr.areaName"></span>
              </li>
              <li>
                <h6>付费供应商</h6><span v-text="injappr.paySuppName"></span>
              </li>
              <li class="li-last">
                <h6>客户名称</h6><span v-text="injappr.custName"></span>
              </li>

            </ul>
          </div>
        </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="鉴定信息" class="service-module-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li>
                <h6>递交材料人姓名</h6><span v-text="injappr.applyName"></span>
              </li>
              <li>
                <h6>递交人电话</h6><span v-text="injappr.applyTel"></span>
              </li>
              <li>
                <h6>材料递交日期</h6><span v-text="injappr.declApprCenterDate"></span>
              </li>
              <li>
                <h6>材料收取日期</h6><span v-text="injappr.receMatDate"></span>
              </li>
              <li>
                <h6>鉴定结果</h6><span v-text="injappr.apprResultName"></span>
              </li>
              <li>
                <h6>申请人</h6><span v-text="injappr.creName"></span>
              </li>
              <li class="li-last">
                <h6>申请时间</h6><span v-text="injappr.creTime"></span>
              </li>
              <li class="li-last upload-fil" ref="upload" :style="{height: uploadFileStyle + 'px'}">
                <h6 :style="{height: uploadFileStyle + 'px', lineHeight: uploadFileStyle + 'px'}">上传文件</h6>
                <span v-for="(item, index) in bigArr" :class="{spanTwo: index !== 0}" :key="index">
                  <i v-for="item1 in item" class="i-wid" :key="item1">
                    {{item1.matName}}
                    <a href="javascript:void(0)" @click="batchAllPreview(item1.matEncId)" class="file-del-btn">浏览</a>
                    <i class="file-del-btn"> | </i>
                    <a href="javascript:void(0)" @click="batchAllDownload(item1.matEncId)" class="file-del-btn">下载</a>
                    &nbsp;
                  </i>
                </span>
              </li>
              <li class="li-last">
                <h6>备注</h6><span v-text="injappr.matRemark"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="鉴定通知书情况" class="service-module-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li>
                <h6>领取情况</h6><span v-text="injappr.issueCondition"></span>
              </li>
              <li>
                <h6>领取日期</h6><span v-text="injappr.receApprResultTime"></span>
              </li>
              <li>
                <h6>发放情况</h6><span v-text="injappr.giveOutCondition"></span>
              </li>
              <li>
                <h6>发放日期</h6><span v-text="injappr.issueTime"></span>
              </li>
              <li>
                <h6>领取人</h6><span v-text="injappr.issuePerName"></span>
              </li>
              <li>
                <h6>领取人姓名</h6><span v-text="injappr.issueSignId"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-footer">
          <sino-button type="primary" @click="retur">返 回</sino-button>
        </div>
      </sino-con>
    </sino-form>
    <!--预览大图-->
    <div class="busconeav-view-large bus-view-large-height" v-if="browseFlag">
      <sino-title slot="title" type="levelOne">
        <i class="iconfont fr sino-guanbi" @click="browseFlag=false"></i>
      </sino-title>
      <img :src="browImgPath" alt="">
    </div>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookies from 'js-cookie';

  export default {
    components: {},
    data () {
      return {
        browseFlag: false, // 浏览的弹层
        scrollDist: 0, // 距离顶部距离
        activeNode: 1,
        particularForm: {},
        injappr: {}, // 查询到的数据
        amoMater: null, // 返回的材料数量
        uploadFileStyle: null, // 控制li高
        bigArr: [],
        smallArr: [],
        browImgPath: ''  // 预览图片的地址
      };
    },
    created () {
      this.getData(this.$route.query.apprId);
    },
    methods: {
      stepFun (index) {
        if (index === 1) {
          document.getElementById("content").scrollTop = 0;
        } else if (index === 2) {
          document.getElementById("content").scrollTop = 170;
        } else {
          document.getElementById("content").scrollTop = 315;
        }
      },
      // 返回
      retur () {
        this.$router.push({path: '/apprLaboCapa'});
      },
      // 下载
      batchAllDownload (id) {
        api.get(this.apiPath.hrsc.invMatFileDownload, {fileUniqueNo: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 浏览
      batchAllPreview (id) {
        this.browseFlag = true;
        api.postsign(this.apiPath.sins.getPreview, id).then(res => {
          if (res.code === 'CPYY-00001') {
            this.browImgPath = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getData (id) {
        api.postsign(this.apiPath.sins.findSinsInjApprByApprId, id).then(res => {
          if (res.code === 'CPYY-00001') {
            let _this = this;
            this.injappr = res.data.injAppr;
            if (res.data.injApprMats.length !== 0) {
              this.amoMater = res.data.injApprMats.length;
              this.uploadFileStyle = Math.ceil(this.amoMater / 2) * 34;
              res.data.injApprMats.forEach((item, index) => {
                if (_this.smallArr.length !== 2) {
                  _this.smallArr.push(item);
                }
                if (_this.smallArr.length === 2 || index === this.amoMater - 1) {
                  _this.bigArr.push(_this.smallArr);
                  _this.smallArr = [];
                }
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
