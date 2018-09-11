<template>
  <div class="procreg">
    <div class="index-remind">
      <ul class="index-quick-ul">
        <li @click="approvalFun('total')" :class="{ 'active': currentApproval === 'total'}">
          <div class="left-icon-box">
            <i class="total-approval"></i>
          </div>
          <div class="right-text">
            <p>总发起审批</p>
            <span class="info-num" v-text="procReg.countTotal"></span>
          </div>
        </li>
        <li @click="approvalFun('underway')" :class="{ 'active': currentApproval === 'underway'}">
          <div class="left-icon-box">
            <i class="underway-approval"></i>
          </div>
          <div class="right-text">
            <p>执行中审批</p>
            <span class="info-num" v-text="procReg.run"></span>
          </div>
        </li>
        <li @click="approvalFun('finish')" :class="{ 'active': currentApproval === 'finish'}">
          <div class="left-icon-box">
            <i class="finish-approval"></i>
          </div>
          <div class="right-text">
            <p>通过审批</p>
            <span class="info-num" v-text="procReg.pass"></span>
          </div>
        </li>
        <li class="fr" @click="approvalFun('fall')" :class="{ 'active': currentApproval === 'fall'}">
          <div class="left-icon-box">
            <i class="fall-approval"></i>
          </div>
          <div class="right-text">
            <p>未通过审批</p>
            <span class="info-num" v-text="procReg.unpass"></span>
          </div>
        </li>
      </ul>
    </div>
    <sino-con>
      <sino-title type="levelOne" title="流程监管查询"></sino-title>
      <sino-form :model="procRegForm" ref="procRegForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="流程名称：" class="search-inner-item" prop="flowName">
                <sino-select :tipText="''"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false" :totalNum="false"
                             :isPage="false" :isGroup="false"
                             :chooseName.sync="procRegForm.flowName"
                             :chooseId.sync="procRegForm.flowId" :clear="true"
                             :url="dropUrl"></sino-select>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="流程KEY：" class="search-inner-item" prop="key">
                <sino-input type="text" class="fl" v-model="procRegForm.key"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="状态：" class="search-inner-item" prop="stateName">
                <sino-select :tipText="''" :filterable="false"
                             :multiselect="false" :isshowTotol="false"
                             :disabled="false" :totalNum="false"
                             :isPage="false" :isGroup="false"
                             :chooseName.sync="procRegForm.stateName"
                             :chooseId.sync="procRegForm.state" :clear="true"
                             :url="dictSelUrl"
                             :data="{code: 'FLOW_EXEC_STATE'}"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="发起人：" class="search-inner-item" prop="starterNames">
                <sino-select :tipText="''"
                             :filterable="true"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false" :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="procRegForm.starterNames"
                             :chooseId.sync="procRegForm.starters" :clear="true"
                             :url="userUrl"
                             :token="headerToken"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="结果：" class="search-inner-item" prop="resultName">
                <sino-select :tipText="''"
                             :filterable="false"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="execStateDis" :totalNum="false"
                             :isPage="false" :isGroup="false"
                             :chooseName.sync="procRegForm.resultName"
                             :chooseId.sync="procRegForm.results" :clear="true"
                             :url="dictSelUrl"
                             :data="{code: 'FLOW_RESULT'}"></sino-select>

              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="参与人：" class="search-inner-item" prop="userNames">
                <sino-select :tipText="''" :filterable="true"
                             :multiselect="true" :isshowTotol="false"
                             :disabled="false" :totalNum="false"
                             :isPage="true" :isGroup="false"
                             :chooseName.sync="procRegForm.userNames"
                             :chooseId.sync="procRegForm.userIds" :clear="true"
                             :url="userUrl"
                             :token="headerToken"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="申请原因：" class="search-inner-item" prop="reason">
                <sino-input type="text" class="fl" v-model="procRegForm.reason"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('procRegForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clearfix"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll" class="procreg-table">
          <sino-table-column type="index" label="序号" align="center" width="60"></sino-table-column>
          <sino-table-column prop="flowName" label="流程名称" min-width="120"></sino-table-column>
          <sino-table-column prop="key" label="流程KEY" min-width="95"></sino-table-column>
          <sino-table-column prop="version" label="流程版本号" align="center" min-width="95"></sino-table-column>
          <sino-table-column prop="execStateStr" label="状态" align="center"></sino-table-column>
          <sino-table-column prop="starter" label="发起人" min-width="95"></sino-table-column>
          <sino-table-column prop="startTime" label="发起时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--弹层 --查看-->
    <sino-dialog :visible.sync="seeItem" class="dialog-width" :top="'10%'">
      <sino-title slot="title" type="levelOne" title="政府退税审批" class="sino-dialog-title"></sino-title>
      <div class="roleMange-list">
        <ul>
          <li>申请人</li>
          <li v-text="procRegSeeList.starter"></li>
        </ul>
        <ul>
          <li>申请时间</li>
          <li v-text="procRegSeeList.startTime"></li>
        </ul>
        <ul class="roleMange-list-last">
          <li>申请原因</li>
          <li v-text="procRegSeeList.reason"></li>
        </ul>
      </div>
      <div class="approval-info">
        <sino-title type="levelTwo" title="审批通过信息"></sino-title>
        <div>
          <sino-steps :space="195"><!--finish-status="success" -->
            <sino-step v-for="(list, index) in processNodes" :key="index" :title="list.taskName" :status="list.status"></sino-step>
            <!--<sino-step title="经理审批：马英" status="success"></sino-step>-->
            <!-- description="2016-07-12"-->
            <!--<sino-step title="总经理审批：王明亮" status="success"></sino-step>-->
            <!--<sino-step title="总监审批：张雷" status="success"></sino-step>-->
            <!--<sino-step title="执行总监：王建" status="finish"></sino-step>-->
          </sino-steps>
        </div>
      </div>
      <sino-auto-table :data="countSeeData" stripe border max-height="236" v-on:viewAll="viewAll" class="procreg-table">
        <sino-table-column prop="username" label="审批人"></sino-table-column>
        <sino-table-column prop="resultName" label="审批结果"></sino-table-column>
        <sino-table-column prop="taskName" label="流程名称"></sino-table-column>
        <sino-table-column prop="comment" label="审批意见"></sino-table-column>
        <sino-table-column prop="taskStartTime" label="审批时间"></sino-table-column>
      </sino-auto-table>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';

  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        dropUrl: this.apiPath.hrsc.countDrop,
        userUrl: this.apiPath.author.findUserSelectBoxInfo,
        headerToken: Cookie.get('Token'),
        currentApproval: '',
        active: 1,
        lists: [
          {title: '步骤1', description: '描述信息'},
          {title: '步骤2', description: '描述信息'},
          {title: '步骤3', description: '描述信息'},
          {title: '步骤4', description: '描述信息'},
          {title: '步骤5', description: '描述信息'},
          {title: '步骤6', description: '描述信息'}
        ],
        connt: false,
        procReg: {
          countTotal: '',
          run: '',
          pass: '',
          unpass: ''
        },
        statelist: [],
        execStatelist: [],
        procRegForm: { // 搜索条件
          flowId: '',
          flowName: '',
          key: '',
          state: '',
          stateName: '',
          starters: [],
          starterNames: [],
          results: [],
          resultName: [],
          reason: '',
          userIds: [],
          userNames: []
        },
        isA: true,
        tableData: null,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        alertTitle: '',
        countSeeData: null,
        execStateDis: false,
        procRegSeeList: {
          starter: '',
          startTime: '',
          reason: ''
        },
        processNodes: [],
        seeItem: false // 查看弹层控制显示
      };
    },
    watch: {
      'procRegForm.state': function (newValue) {
        if (newValue === 1) {
          this.execStateDis = true;
          this.procRegForm.execStateName = [];
          this.procRegForm.execState = [];
        } else {
          this.execStateDis = false;
        }
      }
    },
    mounted () {
      api.post(this.apiPath.hrsc.count).then(res => {
        if (res.code === 'CPYY-00001') {
          this.procReg = res.data;
          this.procReg.countTotal = res.data.total;
        }
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'FLOW_PROC_STATE'}).then(res => {
        this.statelist = res.data.list;
        this.statelist.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.procRegForm.state = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'FLOW_PROC_INST_STATE'}).then(res => {
        this.execStatelist = res.data.list;
        this.execStatelist.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.procRegForm.execState = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      approvalFun (type) {
        if (type === 'total') {
          this.currentApproval = 'total';
        } else if (type === 'underway') {
          this.currentApproval = 'underway';
        } else if (type === 'finish') {
          this.currentApproval = 'finish';
        } else {
          this.currentApproval = 'fall';
        }
      },
      moreIcon () {
        this.isA = !this.isA;
      },
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.procRegForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.countList, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      seeFun: function (val) {
        this.seeItem = true;
        api.postsign(this.apiPath.hrsc.countInfoList, val.processId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.procRegSeeList = res.data;
            console.log(res.data);
            this.countSeeData = res.data.nodes;
            for (let i = 0; i < res.data.processNodes.length; i++) {
              if (res.data.processNodes[i].state === 1) {
                res.data.processNodes[i].state = 'success';
              } else if (res.data.processNodes[i].state === 2) {
                res.data.processNodes[i].state = 'error';
              } else if (res.data.processNodes[i].state === null) {
                res.data.processNodes[i].state = 'wait';
              }
            }
            this.processNodes = res.data.processNodes;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.procRegForm.userIds = [];
        this.procRegForm.userNames = [];
        this.procRegForm.starters = [];
        this.procRegForm.starterNames = [];
        this.procRegForm.execState = [];
        this.procRegForm.execStateName = [];
      }
    }
  };
</script>
