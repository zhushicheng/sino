<template>
  <div>
    <sino-con class="usermanage positionR">
      <sino-title type="levelOne" title="个税申报"></sino-title>
      <div class="levelOne-right money-limit">
        <h6 class="fl">费用所属期：</h6>
        <span class="fl">{{searchForm.feeDateNoString}}</span>
      </div>
      <div class="clearfloat">
      <div class="revenue-fl-Content fl">
        <ul class="revenue-fl-ul">
          <li>
            <h6>申报总人数（人）</h6>
            <span class="fl paddingTop15"> <i class="numData">{{searchForm.declSum}}</i>人</span>
            <span class="fr" ><i class="icon-big sino-ren1"></i></span>
          </li>
          <li class="two-banner">
            <span class="fl" ><i class="icon-left-position sino-add-member"></i></span>
            <div class="fl">
              <h6 class="">本月新增人数</h6>
              <span class=" paddingTop15"> <i class="numData">{{searchForm.addPeoples}}</i>人</span>
            </div>
          </li>
          <li class="two-banner">
            <span class="fl" ><i class="icon-left-position sino-del-member"></i></span>
            <div class="fl">
              <h6 class="">本月减少人数</h6>
              <span class=" paddingTop15"> <i class="numData">{{searchForm.reducePeoples}}</i>人</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="revenue-fr-Content fr">
        <ul class="revenue-fr-ul">
          <li class="fl income mr10">
            <h6>收入总金额<span class="clear-weight">单位：元</span></h6>
            <span class="numData-else fl">￥ &nbsp;&nbsp; {{toMoney(searchForm.incomeAmo)}}</span>
            <span class="fr"><i class="icon-big sino-caiwuguanli lineHeight58"></i></span>
          </li>
          <li class="fl income ml10">
            <h6>应纳税金额<span class="clear-weight">单位：元</span></h6>
            <span class="numData-else fl">￥ &nbsp;&nbsp; {{toMoney(searchForm.taxAmo)}}</span>
            <span class="fr"><i class="icon-big icon-small sino-caiwuguanli1 lineHeight58"></i></span>
          </li>
        </ul>
        <div class="steps-content paddingTop15 auto-width-steps">
          <sino-steps :active="active" finish-status="success" style="margin-left: 10px;">
            <sino-step title="" ></sino-step>
            <sino-step title="" ></sino-step>
            <sino-step title="" ></sino-step>
          </sino-steps>
          <span class="first-box fl first-child" :class="{'step-active': active === 0, 'step-finish': active > 0}">
            <i class="connect"></i>
            <div class="font"><span class="step-icon-box"><i class="sino-xiazai sino-icon"></i></span>下载申报表</div>
            <sino-button type="primary" @click="downloadFn" class="dowloadStyle" v-if="active === 0">下 载</sino-button>
            <sino-button type="primary" class="dowloadStyle" v-if="active !== 0">下 载</sino-button>
          </span>
          <span class="first-box two-child" :class="{'step-active': active === 1, 'step-finish': active > 1, 'step-wait': active < 1}">
            <i class="connect-two"></i>
            <div class="font"><span class="step-icon-box"><i class="sino-shangchuan sino-icon"></i></span>申报表上传中</div>
            <span class="mark">请到《金税》官网上传申报表</span>
          </span>
          <span class="first-box third-child" :class="{'step-active': active === 2, 'step-finish': active > 2, 'step-wait': active < 2}">
            <i class="connect-three"></i>
            <div class="font"><span class="step-icon-box"><i class="sino-qiandai sino-icon"></i></span>确认已报税</div>
            <sino-button type="primary" @click="query" class="dowloadStyle" v-if="active === 2">确 认</sino-button>
            <sino-button type="primary" :disabled="true" class="dowloadStyle" v-if="active !== 2">确 认</sino-button>
          </span>
        </div>
      </div>
      </div>
    </sino-con>
    <!--下载报盘-->
    <transition name="fade">
      <div v-if="toVoidForm" class="div-dialog">
        <h2>正在下载报盘文件</h2>
        <ul class="div-dialog-table">
          <li>xxxxx.xlsx</li>
          <li>wwwwww.xlsx</li>
        </ul>
        <sino-progress :percentage="50" :stroke-width="13" :text-inside="true" status="exception" class="sino-progress"></sino-progress>
      </div>
    </transition>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        active: 0,
        searchForm: {
          feeDateNoString: '',
          declSum: '',
          addPeoples: '',
          reducePeoples: '',
          incomeAmo: '',
          perIncomeTaxId: '',
          perIncomeTaxIds: [],
          taxAmo: ''
        },
        lists: [
        ],
        toVoidForm: false
      };
    },
    created () {
      api.post(this.apiPath.salary.findPerIncomeTaxDecl).then(res => {
        this.searchForm = res.data;
        this.active = res.data.flag - 1;
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      downloadFn () {
        this.toVoidForm = true;
        let obj = {
          feeDateNoString: this.searchForm.feeDateNoString
        };
        setTimeout(() => {
          this.toVoidForm = false;
        }, 1000);
        api.post(this.apiPath.salary.downloadPerIncomeTaxes, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchForm = res.data;
            api.download(res.data.downloadPath);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      query () {
        this.$confirm('确认本月已申报成功？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.salary.updateDeclTax, {perIncomeTaxIds: this.searchForm.perIncomeTaxIds}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '申报成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
        });
      },
      toMoney (s, n) {
        if (!s && s !== 0) {
          return;
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      }
    }
  };
</script>
<style scoped>
  .revenue-fl-Content{width: calc(27% - 25px)}
  .steps-content .first-box .mark {
    line-height: 20px;
  }
</style>
