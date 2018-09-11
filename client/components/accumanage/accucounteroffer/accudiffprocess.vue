<template>
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="差异处理"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <ul class="search-inner-box">
          <li class="">
            <sino-form-item label="公积金账户信息：" class="search-inner-item" prop="unitSinsNo">
              <!--<sino-input class="fl width400" type="text"-->
                          <!--v-model="searchForm.unitSinsNo"-->
                          <!--:disabled="true"></sino-input>-->
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :data="{title: '', accuAcctId: ''}"
                           :url="apiPath.accu.findAcctNameUnitNoSelectBox"
                           :chooseName.sync="searchForm.accuAcctName"
                           :chooseId.sync="searchForm.accuAcctId"
                           @change="applyMonth"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item label="申报年月：" class="search-inner-item" prop="executeMon">
              <sino-date-picker
                v-model="searchForm.executeMon"
                type="month"
                placeholder=""
                :editable="false"
                :readonly="false"
                :disabled="false"
                @change="applyMonth"
                :clearable="false">
              </sino-date-picker>
            </sino-form-item>
          </li>
        </ul>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl sino-tab-decl-empass">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon">
          <sino-button class="fl" type="icon-text" @click="exportFun"><i class="iconfont sino-export"></i>导出
          </sino-button>
          <sino-button class="fl" type="icon-text" @click="updateQuestionStateActionAll(5)"><i class="iconfont sino-shuru"></i>全部不处理
          </sino-button>
          <sino-button class="fl" type="icon-text" @click="updateQuestionStateActionAll(2)"><i class="iconfont sino-fabu fs19"></i>全部发布
          </sino-button>
          <div class="fr">
            <sino-button class="fl" type="icon-text"><i class="block"></i>应做数据
            </sino-button>
            <sino-button class="fl" type="icon-text"><i class="block2"></i>实做数据
            </sino-button>
          </div>
        </div>
      </div>
      <sino-tab-pane name="one" class="mt15">
        <span slot="label">雇员基本信息不符(<span class="tab-spe-red">{{baseInfo.firstTotal}}</span>)</span>
        <sino-table :data="tableDataA" max-height="416" stripe border @select="selectCallBackEmp">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120" align="center"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人账号" align="center" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label-class-name="feedMessage" label="雇员姓名" min-width="120" align="center"></sino-table-column>
          <sino-table-column prop="feedbackCertNo" label-class-name="feedMessage"  label="证件号码" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label-class-name="feedMessage" label="个人编号" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态" align="center" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 5)">不处理</span>
              <span class="table-span" v-if="scope.row.questionPerState==5"  @click="reDeal(scope.row, 1)">重新处理</span><i style="color:#399ff2;" v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1"  @click="updateQuestionStateActionOne(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageA.pageNum" v-bind:page-size="pageA.pageSize" v-on:pagehandler="pageHandler($event,1)"
                   :pageArray="pageArray" v-on:choosePageFun="choooseNum($event,1)" v-bind:object="object"
                   :total="pageA.total"></sino-page>
      </sino-tab-pane>
      <sino-tab-pane name="two" class="mt15">
        <span slot="label">应做未做(<span class="tab-spe-red">{{baseInfo.secondTotal}}</span>)</span>
        <sino-table :data="tableDataB"  max-height="416" stripe border @select="selectCallBackEmp">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人账号" min-width="180"></sino-table-column>
          <sino-table-column prop="perRadix" label="缴费基数"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label="雇员姓名" label-class-name="feedMessage" min-width="120"></sino-table-column>
          <sino-table-column prop="feedbackCertNo" label="证件号码" label-class-name="feedMessage" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label-class-name="feedMessage" label="个人账号" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackPerRadix" label-class-name="feedMessage" label="缴费基数"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 5)">不处理</span>
              <span class="table-span" v-if="scope.row.questionPerState==5" @click="reDeal(scope.row, 1)">重新处理</span><i style="color:#399ff2;" v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageB.pageNum" v-bind:page-size="pageB.pageSize" v-on:pagehandler="pageHandler($event,2)"
                   :pageArray="pageArray" v-on:choosePageFun="choooseNum($event,2)" v-bind:object="object"
                   :total="pageB.total"></sino-page>
      </sino-tab-pane>
      <sino-tab-pane name="three" class="mt15">
        <span slot="label">实做多出(<span class="tab-spe-red">{{baseInfo.thirdTotal}}</span>)</span>
        <sino-table :data="tableDataC"  max-height="416" stripe border @select="selectCallBackEmp">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人账号" min-width="180"></sino-table-column>
          <sino-table-column prop="perRadix" label="缴费基数"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label="雇员姓名" label-class-name="feedMessage" min-width="120"></sino-table-column>
          <sino-table-column prop="feedbackCertNo" label="证件号码" min-width="180" label-class-name="feedMessage"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label="个人账号" label-class-name="feedMessage" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackPerRadix" label="缴费基数" label-class-name="feedMessage"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 5)">不处理</span>
              <span class="table-span" v-if="scope.row.questionPerState==5" @click="reDeal(scope.row, 1)">重新处理</span><i style="color:#399ff2;" v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageC.pageNum" v-bind:page-size="pageC.pageSize" v-on:pagehandler="pageHandler($event,3)"
                   :pageArray="pageArray" v-on:choosePageFun="choooseNum($event,3)" v-bind:object="object"
                   :total="pageC.total"></sino-page>
      </sino-tab-pane>
      <sino-tab-pane name="four" class="mt15">
        <span slot="label">基数/缴纳金额不符(<span class="tab-spe-red">{{baseInfo.fourthTotal}}</span>)</span>
        <sino-table :data="tableDataD"  max-height="416" stripe border @select="selectCallBackEmp">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人账号" min-width="180"></sino-table-column>
          <sino-table-column prop="unitPay" label="缴费数据-企业"></sino-table-column>
          <sino-table-column prop="perPay" label="缴费数据-个人"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label="雇员姓名" label-class-name="feedMessage" min-width="120"></sino-table-column>
          <sino-table-column prop="feedbackCertNo" label="证件号码" label-class-name="feedMessage" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label="个人账号" label-class-name="feedMessage" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackUnitPay" label="缴费数据-企业" label-class-name="feedMessage"></sino-table-column>
          <sino-table-column prop="feedbackPerPay" label="缴费数据-个人" label-class-name="feedMessage" min-width="120"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 5)">不处理</span>
              <span class="table-span" v-if="scope.row.questionPerState==5" @click="reDeal(scope.row, 1)">重新处理</span><i style="color:#399ff2;" v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="updateQuestionStateActionOne(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageD.pageNum" v-bind:page-size="pageD.pageSize" v-on:pagehandler="pageHandler($event,4)"
                   :pageArray="pageArray" v-on:choosePageFun="choooseNum($event,4)" v-bind:object="object"
                   :total="pageD.total"></sino-page>
      </sino-tab-pane>
      <!--<slot>-->
        <!--<sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>-->
      <!--</slot>-->
    </sino-tabs>
  </div>
</template>
<script>
  let checkedArr = [];
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        unitSinsNo: '',
        activeName: 'one',
        pageA: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          // pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageB: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          // pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageC: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          // pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageD: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          // pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        tableDataA: null,
        tableDataB: null,
        tableDataC: null,
        tableDataD: null,
        baseInfo: {
          firstTotal: 0,
          secondTotal: 0,
          thirdTotal: 0,
          fourthTotal: 0
        },
        type: 1,
        searchForm: {
          type: 1, // 类型
          accuAcctId: '', // 公积金账户id
          accuAcctName: '', // 公积金账户id
          executeMon: new Date(), // 申报年月
          unitSinsNo: ''

        }  // 查询条件
      };
    },
    created () {
      console.log(this.$route.query);
      this.searchForm.accuAcctName = this.$route.query.accuAcctName + ' - ' + this.$route.query.unitRegiNo;
      this.searchForm.accuAcctId = this.$route.query.accuAcctId;
      this.searchForm.executeMon = this.switchDateMonth(this.$route.query.executeMon);
    },
    mounted () {
      this.viewAll(1, 10, 1);
      // this.viewAll(1, 10, 2);
      // this.viewAll(1, 10, 3);
      // this.viewAll(1, 10, 4);
    },
    methods: {
      viewAll (pageNum, pageSize, type) {
        // this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonString, 'yyyy-MM');
        // let data = Number(this.searchForm.applyMon.replace(/-/g, ''));
        let date = (this.searchForm.executeMon + '').replace(/-/g, '');
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            accuAcctId: this.searchForm.accuAcctId,
            type: type,
            executeMon: date
          }
        };
        api.post(this.apiPath.accu.findDifferenceDateAction, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (type == 1) {
              this.tableDataA = res.data.pageInfo.list;
              this.pageA.total = res.data.pageInfo.total;
            } else if (type == 2) {
              this.tableDataB = res.data.pageInfo.list;
              this.pageB.total = res.data.pageInfo.total;
            } else if (type == 3) {
              this.tableDataC = res.data.pageInfo.list;
              this.pageC.total = res.data.pageInfo.total;
            } else if (type == 4) {
              this.tableDataD = res.data.pageInfo.list;
              this.pageD.total = res.data.pageInfo.total;
            };
            this.baseInfo.firstTotal = res.data.firstTotal;
            this.baseInfo.secondTotal = res.data.secondTotal;
            this.baseInfo.thirdTotal = res.data.thirdTotal;
            this.baseInfo.fourthTotal = res.data.fourthTotal;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      applyMonth () {
        // console.log(this.searchForm.executeMon);
        this.searchForm.executeMon = Vue.filter('date')(this.searchForm.executeMon, 'yyyy-MM');
        this.viewAll(1, 10, this.type);
      },
      handleClick (tab) {
        this.type = Number(tab.index) + 1;
        this.activeName = tab.name;
        let pageSize;
        if (this.type == 1) {
          this.pageA.pageNum = 1;
          pageSize = this.pageA.pageSize;
        } else if (this.type == 2) {
          this.pageB.pageNum = 1;
          pageSize = this.pageB.pageSize;
        } else if (this.type == 3) {
          this.pageC.pageNum = 1;
          pageSize = this.pageC.pageSize;
        } else if (this.type == 4) {
          this.pageD.pageNum = 1;
          pageSize = this.pageD.pageSize;
        };
        this.viewAll(1, pageSize, this.type);
      },
      pageHandler (pageNum, type) {
        let pageSize;
        if (type == 1) {
          this.pageA.pageNum = pageNum;
          pageSize = this.pageA.pageSize;
        } else if (type == 2) {
          this.pageB.pageNum = pageNum;
          pageSize = this.pageB.pageSize;
        } else if (type == 3) {
          this.pageC.pageNum = pageNum;
          pageSize = this.pageC.pageSize;
        } else if (type == 4) {
          this.pageD.pageNum = pageNum;
          pageSize = this.pageD.pageSize;
        };
        this.viewAll(pageNum, pageSize, type);
      },
      choooseNum (pageSize, type) {
        if (type == 1) {
          this.pageA.pageNum = 1;
          this.pageA.pageSize = pageSize;
        } else if (type == 2) {
          this.pageB.pageNum = 1;
          this.pageB.pageSize = pageSize;
        } else if (type == 3) {
          this.pageC.pageNum = 1;
          this.pageC.pageSize = pageSize;
        } else if (type == 4) {
          this.pageD.pageNum = 1;
          this.pageD.pageSize = pageSize;
        };
        this.viewAll(1, pageSize, type);
      },
      selectCallBackEmp (selectTion, row) {
        checkedArr = selectTion;
      },
      // 差异处理
      updateQuestionStateActionAll (state) {
        let questionPerIdList = [];
        let arrList = [];
        if (this.type == 1) {
          arrList = this.tableDataA;
        } else if (this.type == 2) {
          arrList = this.tableDataB;
        } else if (this.type == 3) {
          arrList = this.tableDataC;
        } else if (this.type == 4) {
          arrList = this.tableDataD;
        };
        if (!arrList || arrList.length == 0) {
          this.$alert('暂无数据可操作', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        };
        // arrList.forEach(item => {
        //   questionPerIdList.push(item.questionPerId);
        // });
        let date = (this.searchForm.executeMon + '').replace(/-/g, '');
        let params = {
          "questionPerState": state,      //    处理类型：       必传    不处理传 5，发布传 2
          "executeMon": date,    //    申报年月          必传
          "accuAcctId": this.searchForm.accuAcctId,             //        公积金账户ID  必传
          "type": this.type,                  //              页签                 必传
          "accuState": "",              //           申报类型          单个处理传      全部处理 不传
          "uniqNo": "",                //              雇员唯一号      单个处理传      全部处理 不传
          "feedbackPerComCode": ""  //  公积金中心反馈个人账户    单个处理传      全部处理 不传
        };
        api.post(this.apiPath.accu.updateQuestionStateAction, params).then(res => {
          if (res.code === 'CPYY-00001') {
            if (this.type == 1) {
              this.viewAll(1, this.pageA.pageSize, this.type);
            } else if (this.type == 2) {
              this.viewAll(1, this.pageB.pageSize, this.type);
            } else if (this.type == 3) {
              this.viewAll(1, this.pageC.pageSize, this.type);
            } else if (this.type == 4) {
              this.viewAll(1, this.pageD.pageSize, this.type);
            };
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      updateQuestionStateActionOne (item, state) {
        let date = (this.searchForm.executeMon + '').replace(/-/g, '');
        let params = {
          "questionPerState": state,      //    处理类型：       必传    不处理传 5，发布传 2
          "executeMon": date,    //    申报年月          必传
          "accuAcctId": this.searchForm.accuAcctId,             //        公积金账户ID  必传
          "type": this.type,                  //              页签                 必传
          "accuState": item.accuState,              //           申报类型          单个处理传      全部处理 不传
          "uniqNo": item.uniqNo,                //              雇员唯一号      单个处理传      全部处理 不传
          "feedbackPerComCode": item.feedbackPerComCode  //  公积金中心反馈个人账户    单个处理传      全部处理 不传
        };
        api.post(this.apiPath.accu.updateQuestionStateAction, params).then(res => {
          if (res.code === 'CPYY-00001') {
            if (this.type == 1) {
              this.viewAll(this.pageA.pageNum, this.pageA.pageSize, this.type);
            } else if (this.type == 2) {
              this.viewAll(this.pageB.pageNum, this.pageB.pageSize, this.type);
            } else if (this.type == 3) {
              this.viewAll(this.pageC.pageNum, this.pageC.pageSize, this.type);
            } else if (this.type == 4) {
              this.viewAll(this.pageD.pageNum, this.pageD.pageSize, this.type);
            };
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      reDeal (item, state) {
        let date = (this.searchForm.executeMon + '').replace(/-/g, '');
        let params = {
          "questionPerState": state,      //    处理类型：       必传    不处理传 5，发布传 2
          "executeMon": date,    //    申报年月          必传
          "accuAcctId": this.searchForm.accuAcctId,             //        公积金账户ID  必传
          "type": this.type,                  //              页签                 必传
          "accuState": item.accuState,              //           申报类型          单个处理传      全部处理 不传
          "uniqNo": item.uniqNo,                //              雇员唯一号      单个处理传      全部处理 不传
          "feedbackPerComCode": item.feedbackPerComCode  //  公积金中心反馈个人账户    单个处理传      全部处理 不传
        };
        api.post(this.apiPath.accu.redealQuestionPer, params).then(res => {
          if (res.code === 'CPYY-00001') {
            if (this.type == 1) {
              this.viewAll(this.pageA.pageNum, this.pageA.pageSize, this.type);
            } else if (this.type == 2) {
              this.viewAll(this.pageB.pageNum, this.pageB.pageSize, this.type);
            } else if (this.type == 3) {
              this.viewAll(this.pageC.pageNum, this.pageC.pageSize, this.type);
            } else if (this.type == 4) {
              this.viewAll(this.pageD.pageNum, this.pageD.pageSize, this.type);
            };
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 导出 */
      exportFun () {
        let date = (this.searchForm.executeMon + '').replace(/-/g, '');
        let obj = {
          accuAcctId: this.searchForm.accuAcctId,
          executeMon: date,
          type: this.type
        };
        api.post(this.apiPath.accu.exportQuestionPerAction, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      noPassFun: function (item) {
        let questionPerIdList = [];
        if (checkedArr.length !== 0) {
          checkedArr.forEach(function (_item, index) {
            questionPerIdList.push(_item.questionPerId);
          });
        } else {
          questionPerIdList.push(item.questionPerId);
        }
        let obj = {
          questionPerIdList: questionPerIdList,
          questionPerState: 5
        };
        api.post(this.apiPath.sins.updateQuestionStateAction, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '操作成功！', type: 'success'});
            this.mounted();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      switchDateMonth (monthValue) {
        if (monthValue) {
          let date = (monthValue + '').split('');
          date.splice(4, 0, '-');
          return date.join('');
        } else {
          return  '';
        }
      },
      sendFun: function (item) {
        let questionPerIdList = [];
        if (checkedArr.length !== 0) {
          checkedArr.forEach(function (_item, index) {
            questionPerIdList.push(_item.questionPerId);
          });
        } else {
          questionPerIdList.push(item.questionPerId);
        }
        let obj = {
          questionPerIdList: questionPerIdList,
          questionPerState: 2
        };
        api.post(this.apiPath.sins.updateQuestionStateAction, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '发布成功！', type: 'success'});
            this.mounted();
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

