<template>
  <!--<div>社保问题人员管理</div>-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="社保问题人员查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li>
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="searchForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="searchForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-name">
                <sino-form-item label="个人编号：" class="search-inner-item" prop="perComCode">
                  <sino-input class="fl" type="text"
                              v-model="searchForm.perComCode"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                  <sino-date-picker
                    v-model="searchForm.applyMon"
                    type="month"
                    :editable="false"
                    :readonly="false">
                  </sino-date-picker>
                </sino-form-item>
              </li>

              <sino-collapse-transition>
                <div class="sino-translate" v-show="searchFlag">
                  <li>
                    <sino-form-item label="来源：" class="search-inner-item" prop="dataSourceName">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="dataSourceParam"
                                   :chooseName.sync="searchForm.dataSourceName"
                                   :chooseId.sync="searchForm.dataSource"
                                   :clear="true"
                                   @clearChange="dataSourceClear"
                                   @contentChange="changeSource">
                      </sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="类型：" class="search-inner-item" prop="questionPerTypeName">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="questionTypeUrl"
                                   :data="questionTypeParam"
                                   :chooseName.sync="searchForm.questionPerTypeName"
                                   :chooseId.sync="searchForm.questionPerType"
                                   :clear="true"
                                   :linkage="true">
                      </sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="状态：" class="search-inner-item" prop="questionPerStateName">
                      <sino-select :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :url="getDictSelectBox"
                                   :data="{code: 'QUESTION_PER_STATE', ids: [2,3,5,6]}"
                                   :chooseName.sync="searchForm.questionPerStateName"
                                   :chooseId.sync="searchForm.questionPerState"
                                   :clear="true">
                      </sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="业务员：" class="search-inner-item" prop="busiperName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :token="token"
                                   :url="findUserByOrgIdsAndRoleType"
                                   :data="{userRoleId: userRoleId}"
                                   :chooseName.sync="searchForm.busiperName"
                                   :chooseId.sync="searchForm.busiper"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid search-inner-name">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCustSelectInfo"
                                   :chooseName.sync="searchForm.custName"
                                   :chooseId.sync="searchForm.custId"
                                   :clear="true"
                                   :token="token"
                                   class="multiple-choice"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid search-inner-name">
                    <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="apiPath.sins.findSinsAcctByIds"
                                   :chooseName.sync="searchForm.signSuppName"
                                   :chooseId.sync="searchForm.signSuppId"
                                   :clear="true"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                </div>
              </sino-collapse-transition>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-button-box-1">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('searchForm')">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
          <div class="search-more">
            <div @click="searchFlag = !searchFlag">
              <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
              <span v-if="!searchFlag">高级查询</span>
              <span v-if="searchFlag">基本查询</span>
            </div>
          </div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <sino-table :data="QuesPerData" border max-height="416" stripe @selection-change="selectCallBack" @viewAll="viewAll" class="mt15">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="perComCode" label="个人编号" min-width="120"></sino-table-column>
            <sino-table-column prop="applyMonth" label="申报年月" min-width="120"></sino-table-column>
            <sino-table-column prop="sinsStateName" label="申报类型" min-width="120"></sino-table-column>
            <sino-table-column prop="productName" label="参保险种" min-width="120"></sino-table-column>
            <sino-table-column prop="questionPerStateName" label="状态" min-width="100"></sino-table-column>
            <sino-table-column prop="dataSourceName" label="来源" min-width="120"></sino-table-column>
            <sino-table-column prop="questionPerTypeName" label="类型" min-width="180"></sino-table-column>
            <sino-table-column prop="unitPay" label="企业缴纳额" min-width="120"></sino-table-column>npm
            <sino-table-column prop="perPay" label="个人缴纳额" min-width="120"></sino-table-column>
            <sino-table-column prop="totalPay" label="缴纳合计"></sino-table-column>
            <sino-table-column prop="busiPerName" label="业务员"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="220"></sino-table-column>
            <sino-table-column prop="signSuppName" label="签约供应商" min-width="220"></sino-table-column>
            <sino-table-column prop="queDesc" label="失败原因" min-width="220"></sino-table-column>
            <sino-table-column label="操作" align="center" width="100" fixed="right">
              <template scope="scope" v-if="scope.row.oper == true">
                <span class="table-span" @click="operaTion(scope.row)">处理</span>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum"
                     v-bind:page-size="pageSize"
                     @pagehandler="pageHandler"
                     :pageArray="pageArray"
                     @choosePageFun="choooseNum"
                     v-bind:object="object"
                     :total="total"></sino-page>
        </div>
      </div>
      <!--处理弹层-->
      <sino-dialog :visible.sync="solvFalg"  size="small" @close="resetFun('solvFrom')"  :top="'5%'">
        <sino-title slot="title" type="levelOne" title="问题人员处理" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form lead-form">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <sino-form :model="solvFrom" :rules="solvFromRules" ref="solvFrom" class="leadsAdd-Form">
            <sino-form-item label="来源：" prop="dataSourceName">
              <sino-input v-model="solvFrom.dataSourceName" disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="类型：" class="sino-form-item-width" prop="questionPerTypeName">
              <sino-input v-model="solvFrom.questionPerTypeName" class="leads-company-input" disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="雇员姓名：" prop="empName">
              <sino-input v-model="solvFrom.empName" disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" prop="certNo">
              <sino-input v-model="solvFrom.certNo" disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="处理方式：" prop="procWayName">
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="true"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code:'PROC_WAY'}"
                           :chooseName.sync="solvFrom.procWayName"
                           :chooseId.sync="solvFrom.procWay"
                           :clear="true"
                           @contentChange="billFun(solvFrom.procWay)"
                           @clearChange="clearFun(selectVal)">
              </sino-select>
            </sino-form-item>
            <span class="sino-select-xg" v-if="selectVal === 1" @click="editOrderFun">修改订单</span>
            <span class="sino-select-xg" v-if="selectVal === 2" @click="jumpFun(selectVal)">修改雇员信息</span>
            <sino-form-item label="状态：" prop="questionPerStateName">
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code:'QUESTION_PER_STATE', ids: [3,5,6]}"
                           :chooseName.sync="solvFrom.questionPerStateName"
                           :chooseId.sync="solvFrom.questionPerState"
                           :clear="true">
              </sino-select>
            </sino-form-item>
            <sino-form-item label="手机号码：" prop="phone" v-if="solvFrom.procWay === 3">
              <sino-input v-model="solvFrom.phone" disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="联系结果：" class="sino-form-item-width" prop="contResults" v-if="solvFrom.procWay === 3">
              <sino-checkbox-group v-model="solvFrom.contResults"  class="sino-form-item-width-checkbox">
                <sino-checkbox v-for="(item, index) in contResultList" :key="index" :label="item.id">{{item.title}}</sino-checkbox>
              </sino-checkbox-group>
            </sino-form-item>
            <sino-form-item label="备注：" class="sino-form-item-width"  prop="remark">
              <sino-input type="textarea" v-model="solvFrom.remark"></sino-input>
            </sino-form-item>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm(solvFrom)">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>

<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        questionTypeUrl: this.apiPath.hrsc.getDictSelectBox,
        dataSourceParam: {code: 'QUESTION_PER_DATA_SOURCE'},
        questionTypeParam: {},
        quesType: { data: { quesType: '' } }, // 来源下拉参数
        dataSource: { data: { dataSource: '' } }, // 类型下拉参数
        routerView: false,
        userRoleId: 5,
        selectVal: null,
        contResultList: null,    // 联系结果
        solvFalg: false,   // 处理弹层
        solvFrom: {
          questionPerIdsString: [],
          questionPerId: '',        // 问题人员主键ID
          procWay: '',                 //      --处理方式
          procWayName: '',
          contResults: [],              //     --联系结果集合
          remark: '',              //   --备注
          questionPerState: 3,          //  --状态
          questionPerStateName: '',          //  --状态
          uniqNo: '',
          certNo: ''
        },
        solvFromRules: {
          procWayName: [
            {required: true, message: '请选择处理方式', trigger: 'change'}
          ],
          questionPerStateName: [
            {required: true, message: '请选择状态', trigger: 'change'}
          ],
          contResults: [
            {type: 'array', required: true, message: '联系结果不能为空', trigger: 'change'}
          ]
        },
        findQuestypeSelectbox: this.apiPath.sins.findQuestypeSelectbox,
        findDatasourceSelectbox: this.apiPath.sins.findDatasourceSelectbox,
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType,
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo,
        token: Cookie.get("Token"),
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        checkedArr: [],
        searchForm: {
          type: 1,
          empName: "",                    //   --姓名
          certNo: "",                    //  --证件号
          perComCode: "",                      //  --个人编号
          applyMon: "",                        // --申报年月
          dataSource: null,                     // --数据来源id
          dataSourceName: "",               //    -数据来源
          questionPerType: null,               // --问题人员类型id
          questionPerTypeName: '',               // --问题人员类型
          questionPerState: 2,    // --问题人员状态id
          questionPerStateName: '已发布',    // --问题人员状态
          custId: null,           //  --客户id
          custName: '',           //  --客户
          signSuppId: null,   // --签约供应商id
          signSuppName: '',   // --签约供应商
          busiper: null,           //  --业务员id
          busiperName: ''          //  --业务员
        },
        QuesPerData: null, // 问题人员列表
        total: null,
        pageNum: 1,
        pageSize: 10,
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
        searchFlag: false
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/sinsQuestionPersAdmin") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      if (this.$route.query.state === 'modify') {
        this.solvFalg = true;
        this.searchFun();
        let obj = this.$route.query;
        this.operaTion(obj);
      }
      this.ruoteJudge();
    },
    mounted () {
      this.dataSourceClear();
      this.searchForm.applyMon = new Date();
      this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMon, 'yyyy-MM');
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/sinsQuestionPersAdmin") {
          this.routerView = true;
        }
      },
      dataSourceClear () {
        this.questionTypeParam = { code: 'QUESTION_PER_TYPE' };
        this.questionTypeUrl =  this.apiPath.hrsc.getDictSelectBox;
      },
      changeSource (item) {
        this.questionTypeParam = {data: {dataSource: item.id}};
        this.questionTypeUrl =  this.apiPath.sins.findQuestypeSelectbox;
      },
      contResultFun () {
        api.post(this.getDictSelectBox, {code: 'CONT_RESULT'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.contResultList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 下拉框选择值 */
      billFun (id) {
        this.selectVal = this.solvFrom.procWay;
      },
      clearFun () {
        this.selectVal = '';
      },
      /*  跳转个人信息查询 */
      jumpFun () {
        this.routerView = true;
        this.$router.push({path: '/sinsQuestionPersAdmin/sinsPerInfoMai', query: {type: 'add', uniqNo: this.solvFrom.uniqNo, questionPerIdsString: this.solvFrom.questionPerIdsString}});
      },
      // 修改订单
      editOrderFun () {
        this.routerView = true;
        this.$router.push({path: '/sinsQuestionPersAdmin/jobSingle', query: {type: 'edit', certNo: this.solvFrom.certNo}});
      },
      /* 收索结果 */
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      viewAll (pageNum, pageSize) {
        let requestData = JSON.parse(JSON.stringify(this.searchForm));
        requestData.applyMon = Vue.filter('date')(this.searchForm.applyMon, 'yyyyMM');
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: requestData
        };
        api.post(this.apiPath.sins.findSinsQuesPers, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.QuesPerData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 重置
      resetFun (fe) {
        this.$refs[fe].resetFields();
        this.$router.push({path: '/sinsQuestionPersAdmin'});
        this.searchForm.applyMon = new Date();
        this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMon, 'yyyy-MM');
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 操作-处理接口
      operaTion (data) {
        this.contResultFun();
        api.post(this.apiPath.sins.findQuesPerById, { questionPerIdsString: data.questionPerIdsString }).then(res => {
          if (res.code === 'CPYY-00001') {
            this.solvFrom = res.data;
            /* 处理中 */
            if (res.data.questionPerState === 6) {
              this.solvFrom.questionPerStateName = res.data.questionPerStateName;
              this.solvFrom.procWay = res.data.procWay;
              this.solvFrom.procWayName = res.data.procWayName;
              this.solvFrom.contResults = res.data.contResults;
            } else if (res.data.questionPerState !== 6) {
              if (res.data.questionPerState === 2) {
                res.data.questionPerState = 3;
                res.data.questionPerStateName = '处理完';
              }
              this.solvFrom.questionPerState = res.data.questionPerState;
              this.solvFrom.questionPerStateName = res.data.questionPerStateName;
            }
            // if (res.data.contResults === undefined || res.data.contResults === null) {
            //   this.solvFrom.contResults =  [];
            // }
            this.solvFrom.uniqNo = data.uniqNo;
            let _this = this;
            setTimeout(function () {
              _this.solvFalg = true;
            }, 100);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 弹框-确定
      submitForm () {
        this.$refs.solvFrom.validate((valid) => {
          if (valid) {
            let dataPer = {
              questionPerIdsString: this.solvFrom.questionPerIdsString,
              procWay: this.solvFrom.procWay,
              contResults: this.solvFrom.contResults,
              remark: this.solvFrom.remark,
              questionPerState: this.solvFrom.questionPerState
            };
            api.post(this.apiPath.sins.handleSinsQuesPer, dataPer).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '操作成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
            this.solvFalg = false;
          }
        });
      }
    }
  };
</script>
