<template>
  <div class="usermanage localinfo addBGC" id="localinfoId">
    <sino-form :model="particularForm"  class="serch-form" ref="particularForm">
      <sino-con class="first-con"  id="first-con-id">
        <sino-title type="levelOne" title="查看工伤认定信息"></sino-title>
        <div class="crumbs">
          <ul class="sixflex" :class="{'li25': particularForm.handleState === 4}">
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>提交申请</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2}"><span><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>送社保</span></li>
            <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 3}"><span><i class="step-num iconfont" :class="{'sino-tick': activeNode > 3}">{{activeNode > 3? '':3}}</i>{{particularForm.handleState === 4? '审核不通过':'审核通过'}}</span></li>
            <li :class="{'li-finish': activeNode > 4, 'li-active': activeNode === 4}"><span><i class="step-num iconfont" :class="{'sino-tick': activeNode > 4}">{{activeNode > 4? '':4}}</i>已领取认定书</span></li>
            <li :class="{'li-finish': activeNode > 5, 'li-active': activeNode === 5}"><span><i class="step-num iconfont" :class="{'sino-tick': activeNode > 5}">{{activeNode > 5? '':5}}</i>已发放认定书</span></li>
          </ul>
        </div>
      </sino-con>
      <sino-con>
        <div class="service-module-box marTop">
        <sino-title type="levelTwo" title="模板名称" class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul flexThree">
            <li>
              <h6>雇员姓名</h6><span >{{particularForm.empName}}</span>
            </li>
             <li>
              <h6>证件号码</h6><span >{{particularForm.certNo}}</span>
            </li>
             <li>
              <h6>社保执行地</h6><span >{{particularForm.sinsAreaIdName}}</span>
            </li>
            <li class="li-last">
              <h6>付费供应商</h6><span>{{particularForm.paySuppName}}</span>
            </li>
           <li class="li-last">
              <h6>客户名称</h6><span>{{particularForm.custName}}</span>
            </li>
          </ul>
        </div>
      </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="工伤备案信息" class="service-module-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul flexThree">
              <li>
                <h6>工伤发生日期</h6><span >{{particularForm.recInjDate}}</span>
              </li>
              <li>
                <h6>材料收取日期</h6><span>{{particularForm.recMatTime}}</span>
              </li>
              <li>
                <h6>申请办理人</h6><span >{{particularForm.recApplyPeoName}}</span>
              </li>

              <li class="li-last">
                <h6>申请时间</h6><span>{{particularForm.recApplyTime}}</span>
              </li>
              <li class="li-last heightAuto">
                <h6 class="elseH6"><em class="fontHeightAuto">上传文件</em></h6>
                <span class="auto-height-span ml13">
                  <i v-for="item in  particularForm.injRecMatList" class="iStyle injury-download fl" v-if="item.matEncId">
                    <span>{{item.matName}}</span>
                    <em class="fr istrue" v-if="item.matName">
                      <a href="javascript:;"  @click="batchAllPreview(item.matEncId)">预览</a>|<a href="javascript:;"  @click="batchAllDownload(item.matEncId)">下载</a>
                    </em>
                  </i>
                </span>
              </li>
              <li class="li-last">
                <h6>备注</h6><span>{{particularForm.recRemark}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="工伤认定申请" class="service-module-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul flexThree">
              <li>
                <h6>工伤类型</h6><span >{{particularForm.injTypeName}}</span>
              </li>
              <li>
                <h6>工伤发生日期</h6><span >{{particularForm.injDate}}</span>
              </li>
              <li>
                <h6>材料收取日期</h6><span >{{particularForm.idenMatTime}}</span>
              </li>
              <li>
                <h6>递交材料人姓名</h6><span >{{particularForm.applyName}}</span>
              </li>
              <li class="sixsix">
                <h6>递交材料人电话</h6><span >{{particularForm.applyTel}}</span>
              </li>

              <li class="li-last">
                <h6>工伤经过</h6><span>{{particularForm.injDesc}}</span>
              </li>
              <li class="li-last heightAuto" >
                <h6 class="elseH6"><em class="fontHeightAuto">上传文件</em></h6>
                <span class="auto-height-span ml13">
                  <i v-for="item in particularForm.injIdenMatList" class="iStyle injury-download fl" v-if="item.matEncId">
                    <span>{{item.matName}}</span>
                    <em class="fr istrue" v-if="item.matName"><a href="javascript:;" @click="batchAllPreview(item.matEncId)" class="file-del-btn">预览</a> |
                      <a href="javascript:;" @click="batchAllDownload(item.matEncId)" class="file-del-btn">下载</a>
                    </em>
                  </i>
              </span>
              </li>
              <li class="li-last">
                <h6>备注</h6><span>{{particularForm.remark}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-box marTop" v-if="particularForm.injIdenDelayedName == '已延时'">
          <sino-title type="levelTwo" title="延时申请" class="service-module-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul flexThree">
              <li>
                <h6>提交日期</h6><span >{{particularForm.applyDelayedDate}}</span>
              </li>
              <li>
                <h6>延时天数</h6><span >{{particularForm.num}}</span>
              </li>
              <li>
                <h6>截止日期</h6><span >{{particularForm.delayedEndDate}}</span>
              </li>
              <li>
                <h6>申请办理人</h6><span >{{particularForm.delayedApplyPeoName}}</span>
              </li>
              <li class="sixsix">
                <h6>申请时间</h6><span >{{particularForm.delayedApplyTime}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-footer">
          <sino-button type="primary" @click="backFun">返 回</sino-button>
        </div>
      </sino-con>
    </sino-form>

    <!--预览-->
    <sino-dialog :visible.sync="browseFlag" size="small" class="seeImg">
      <sino-title slot="title" type="levelOne" title="预览图片" class="sino-dialog-title"></sino-title>
      <div class="img-margin">
        <img :src="browImgPath" style="width:100%;margin-bottom:10px;"/>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../api/index';
  import Cookies from 'js-cookie';
  import SinoCon from "sinoUI/packages/sinocon/src/index";
  export default {
    components: {SinoCon},
    data () {
      return {
        activeNode: 0,
        browseFlag: false, // 预览的弹层
        browImgPath: '',  // 预览图片的地址
        particularForm: {
          injIdenId: '', // 认定ID
          injDate: '', // 工伤发生日期
          applyName: '', // 递交材料人姓名
          applyTel: '', // 递交材料人电话
          injDesc: '', // 工伤经过描述
          uniqNo: '', // 唯一号
          empName: '', // 雇员姓名
          certType: '', // 证件类型
          certNo: '', // 证件号码
          signSuppId: '', // 签约供应商
          signSuppName: '', // 签约供应商名称
          paySuppId: '', // 付费供应商
          paySuppName: '', // 付费供应商名称
          custId: '', // 客户ID
          custName: '', // 客户名称
          handleState: '', // 办理状态
          handleStateName: '',
          injType: '', // 工伤类型
          injTypeName: '', // 工伤类型
          declSinsDate: '', // 送社保日期
          declPer: '', // 送社保办理人
          eavDate: '', // 审核日期
          eavFailDesc: '', // 审核不通过原因
          giveUpDesc: '', // 放弃原因
          injIdenResult: '', // 工伤认定结果
          injIdenResultName: '',
          injIdenResultFileName: '', // 工伤认定结果文件名称
          injIdenResultFileId: '', // 工伤认定结果文件ID
          issuePer: '', // 领取ren
          issueSignId: '', // 认定书领取人签字ID
          injIdenDelayed: '', // 延期情况
          injIdenDelayedName: '', // 延期情况翻译
          injRec: '', // 备案情况
          injRecName: '',
          sinsAreaIdName: '', // 社保执行地
          creId: '', // 创建人ID
          creTime: '', // 创建时间
          recApplyPeo: '', // 申请办理人（备案）
          recApplyPeoName: '', // 申请办理人（备案）
          recApplyTime: '', // 申请时间
          delayedApplyPeo: '', // 申请办理人
          delayedApplyPeoName: '', // 申请办理人
          delayedApplyTime: '',
          recInjDate: '', // 备案的日期
          applyDelayedDate: '', // 提交日期
          num: '', // 延时天数
          delayedEndDate: '', // 截止日期
          injIdenMatList: null,
          injRecMatList: null, // 备案材料
          operId: '', // 操作人ID
          remark: '', // 备注
          recMatTime: '', // 备案 材料收取日期
          idenMatTime: '' // 材料收取日期
        }
      };
    },
    mounted () {
      let res = this.$route.query;
      api.post(this.apiPath.sins.findInjEmpHandleAction, res).then(res => {
        if (res.code === 'CPYY-00001') {
          this.particularForm = res.data;
          if (this.particularForm.handleState === 1) {
            this.activeNode = 0;
          } else if (this.particularForm.handleState === 2) {
            this.activeNode = 1;
          } else if (this.particularForm.handleState === 3) {
            this.activeNode = 2;
          } else if (this.particularForm.handleState === 4) {
            this.activeNode = 3;
          } else if (this.particularForm.handleState === 6) {
            this.activeNode = 3;
          } else if (this.particularForm.handleState === 7) {
            this.activeNode = 4;
          } else if (this.particularForm.handleState === 8) {
            this.activeNode = 5;
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      /* 点击返回 */
      backFun () {
        this.$router.push({path: '/injuryidentifybusi'});
      },
      // 下载
      batchAllDownload (id) {
        var arr = ['bmp', 'jpeg', 'jpg', 'ico', 'png', 'gif', 'pcx', 'tga'];
        api.get(this.apiPath.hrsc.invMatFileDownload, {fileUniqueNo: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (arr.indexOf(res.data.substring(res.data.lastIndexOf('.') + 1)) !== -1) {
              api.downloadImg(res.data);
            } else {
              api.download(res.data);
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /*  预览 */
      batchAllPreview (id) {
        api.postsign(this.apiPath.sins.getPreview, id).then(res => {
          if (res.code === 'CPYY-00001') {
            this.browseFlag = true;
            this.browImgPath = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style scoped>
  .service-module-box {
    margin-top: -20px;
  }
</style>
