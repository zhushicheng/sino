<template>
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" :title="topTitle"></sino-title>
      <div class="steps">
        <sino-steps :space="200" center style="margin-left: 70px;">
          <sino-step :status="list.status" :title="list.display" :description="list.taskEndTime"
                     v-for="(list,index) in lists" :key="index">
          </sino-step>
        </sino-steps>
      </div>
      <div class="approver-info service-module-box">
        <ul class="usermanagement-ul flexThree">
          <li v-if="titleName===2" class="appro-li">
            <h6>申请人</h6><input type="text" v-model="tableForm.starter">
          </li>
          <li v-if="titleName===2" class="appro-li">
            <h6>申请时间</h6><input type="text" v-model="tableForm.startTime">
          </li>
          <li class="li-last heightAuto" v-if="titleName===2">
            <h6 class="label-h6"><em class="fontHeightAuto">申请信息</em></h6>
            <span class="auto-height-span2">
            <i class="iStyle1 fl" v-text="tableForm.reason"></i>
          </span>
          </li>
          <li class="li-last heightAuto">
            <h6 class="label-h6"><em class="fontHeightAuto">申请附件</em></h6>
            <span class="auto-height-span2">
            <i class="iStyle1 fl">
            </i>
          </span>
          </li>
        </ul>
        <sino-title type="levelTwo" title="审批意见" class="service-module-title1 clearBgc"
                    v-if="titleName===1"></sino-title>
        <sino-input type="textarea" v-if="titleName===1" v-model="tableForm.comment" :rows="4" placeholder="请输入您的审批意见"></sino-input>
        <sino-title type="levelTwo" :title='key' class="service-module-title1" v-if="titleName === 2">
          <span class="fr salary-item-oper" @click="showAndHide(key)">
            <i class="iconfont"
               :class="{'sino-angle-double-up':showAndHideArr.indexOf(key) !==-1, 'sino-shuangjiantou-copy':showAndHideArr.indexOf(key) ===-1}"></i>
            {{showAndHideArr.indexOf(key) !==-1?'收起':'展开'}}
          </span>
        </sino-title>
        <div class="crumb-box">
          <ul class="usermanagement-ul flexThree" v-if="showAndHideArr.indexOf(key) !==-1"
              v-for="(item, index) in newLis" :key="index">
            <li v-if="titleName===2" class="appro-li">
              <h6>审批人</h6><input type="text" v-model="item.username">
            </li>
            <li v-if="titleName===2" class="appro-li">
              <h6>审批时间</h6><input type="text" v-model="item.taskEndTime">
            </li>
            <li class="li-last heightAuto" v-if="titleName===2">
              <h6 class="label-h6"><em class="fontHeightAuto">审批结果</em></h6>
              <span class="auto-height-span2"><i class="iStyle1 fl">{{item.resultName}} </i> </span>
            </li>
            <li class="li-last heightAuto" v-if="titleName===2">
              <h6 class="label-h6"><em class="fontHeightAuto">审批意见</em></h6>
              <span class="auto-height-span2"><i class="iStyle1 fl">{{item.comment}} </i> </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="conf-btn">
        <sino-button type="primary" v-if="titleName===1" @click='result(false)'>不通过</sino-button>
        <sino-button v-if="titleName===1" @click='result(true)'>通 过</sino-button>
        <span @click="comeback" class="backStyle" v-if="titleName===1">返回</span>
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  export default {
    data () {
      return {
        topTitle: '',
        active: 0,
        titleName: '',
        key: "审批人信息",
        processId: '',
        showAndHideArr: [],
        tableForm: {
          starter: '', // 申请人
          startTime: '', //  申请时间
          reason: '', // 申请信息
          comment: '', // 审批意见
          currTaskId: '' // 当前节点 ID
        },
        lists: [
          {display: '发起人：马英', taskStartTime: '2016-07-09 22：08：07'},
          {display: '业务部门经历：王建', taskStartTime: '2016-07-09 22：08：07'},
          {display: '总经理：王建'},
          {display: '总监：王明亮'},
          {display: '执行总监：张磊'},
          {display: '业务部经历：王建'}
        ],
        newLis: []
      };
    },
    mounted () {
      let res = this.$route.query;
      /* 根据res中的titleName来判断是审批还是查看 */
      this.titleName = res.titleName;
      this.processId = res.processId;
      api.postsign(this.apiPath.hrsc.taskList, res.processId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.lists = res.data.nodes;
          this.tableForm = res.data;
          this.topTitle = res.data.flowName;
          let _this = this;
          res.data.nodes.forEach(function (item, index) {
            if (item.status === 'success' && index !== 0) {
              _this.newLis.push(item);
            }
          });
          console.log(this.newLis);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      comeback () {
        this.$router.push({path: '/agendaApp', query: {'stater': this.tableForm.starter}});
      },
      showAndHide (key) {
        if (this.showAndHideArr.indexOf(key) !== -1) {
          this.showAndHideArr.splice(this.showAndHideArr.indexOf(key), 1);
        } else {
          this.showAndHideArr.push(key);
        }
      },
      result (item) {
        let obj = {
          id: this.tableForm.currTaskId,
          flag: item,
          comment: this.tableForm.comment
        };
        api.post(this.apiPath.hrsc.approve, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '操作成功！', type: 'success'});
            this.$router.push({path: '/agendaApp', query: {stater: 1}});
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
