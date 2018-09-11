<template>
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="差异处理"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <ul class="search-inner-box">
            <li class="">
              <sino-form-item label="社保账户信息：" class="search-inner-item" prop="unitSinsNo">
                <sino-input class="fl width400" type="text"
                            v-model="searchForm.unitSinsNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMonString">
                <sino-date-picker
                  v-model="searchForm.applyMonString"
                  type="month"
                  placeholder=""
                  :editable="false"
                  :readonly="false"
                  :clearable="true"
                @change="searchFun(type)">
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
          <sino-button class="fl" type="icon-text" @click="exportFun"><i class="iconfont sino-daoru"></i>导出
          </sino-button>
          <sino-button class="fl" type="icon-text" @click="noPassFun(5)" ><i class="iconfont sino-daoru"></i>全部不处理
          </sino-button>
          <sino-button class="fl" type="icon-text" @click="noPassFun(2)"><i class="iconfont sino-download-copy fs19"></i>全部发布
          </sino-button>
          <div class="fr">
            <sino-button class="fl" type="icon-text"><i class="block"></i>应做数据
            </sino-button>
            <sino-button class="fl" type="icon-text"><i class="block2"></i>实做数据
            </sino-button>
          </div>
        </div>
      </div>
      <sino-tab-pane  name="one" class="mt15">
        <span slot="label">雇员基本信息不符 <i>(<span class="tab-spe-red">{{pageA.total}}</span>)</i></span>
        <sino-table :data="oneTableData" max-height="416" stripe border @select="selectCallBackEmp" @select-all="selectTabelRowAll">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120" align="center"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人编号" align="center"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label-class-name="feedMessage" label="雇员姓名" min-width="170" align="center"></sino-table-column>
          <sino-table-column prop="certNo" label-class-name="feedMessage"  label="证件号码" min-width="200" align="center"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label-class-name="feedMessage" label="个人编号" min-width="200" align="center"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态" min-width="180" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="OnlyFun(scope.row, 5)">不处理</span><i v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="OnlyFun(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-if="oneTableData" v-bind:page="pageA.pageNum" v-bind:page-size="pageA.pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="pageA.total"></sino-page>
      </sino-tab-pane>
      <sino-tab-pane  name="two" class="mt15">
        <span slot="label">应做未做/实做多出 <i>(<span class="tab-spe-red">{{losePage.total}}</span>)</i></span>
        <sino-table :data="twoTableData"  max-height="416" stripe border @select="selectCallBackEmp" @select-all="selectTabelRowAll">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="productName" label="险种" min-width="120"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="150"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人编号"></sino-table-column>
          <sino-table-column prop="perRadix" label="缴费基数" min-width="170"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label="雇员姓名" label-class-name="feedMessage" min-width="180"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" label-class-name="feedMessage" min-width="200"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label-class-name="feedMessage" label="个人编号" min-width="200"></sino-table-column>
          <sino-table-column prop="feedbackPerRadix" label-class-name="feedMessage" label="缴费基数" min-width="200"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="OnlyFun(scope.row, 5)">不处理</span><i v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="OnlyFun(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-if="twoTableData" v-bind:page="losePage.pageNum" v-bind:page-size="losePage.pageSize" v-on:pagehandler="pageHandlerLose" :pageArray="losePage.pageArray" v-on:choosePageFun="choooseNumLose" v-bind:object="object" :total="losePage.total"></sino-page>
      </sino-tab-pane>
      <sino-tab-pane label="（25）" name="three" class="mt15">
        <span slot="label">基数/缴纳金额不符 <i>(<span class="tab-spe-red">{{losePage2.total}}</span>)</i></span>
        <sino-table :data="threeTableData"  max-height="416" stripe border @select="selectCallBackEmp" @select-all="selectTabelRowAll">
          <!--<sino-table-column type="selection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="productName" label="险种" min-width="120"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="差异类型" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="perComCode" label="个人编号"></sino-table-column>
          <sino-table-column prop="unitPay" label="缴费数据-企业" min-width="170"></sino-table-column>
          <sino-table-column prop="perPay" label="缴费数据-个人" min-width="180"></sino-table-column>
          <sino-table-column prop="feedbackEmpName" label="雇员姓名" label-class-name="feedMessage" min-width="150"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" label-class-name="feedMessage" min-width="200"></sino-table-column>
          <sino-table-column prop="feedbackPerComCode" label="个人编号" label-class-name="feedMessage" min-width="200"></sino-table-column>
          <sino-table-column prop="feedbackUnitPay" label="缴费数据-企业" label-class-name="feedMessage" min-width="200"></sino-table-column>
          <sino-table-column prop="feedbackPerPay" label="缴费数据-个人" label-class-name="feedMessage" min-width="200"></sino-table-column>
          <sino-table-column prop="questionPerStateName" label="状态" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="OnlyFun(scope.row, 5)">不处理</span><i v-if="scope.row.questionPerState==1"> | </i>
              <span class="table-span" v-if="scope.row.questionPerState==1" @click="OnlyFun(scope.row, 2)">发布</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-if="threeTableData" v-bind:page="losePage2.pageNum" v-bind:page-size="losePage2.pageSize" v-on:pagehandler="pageHandlerLose2" :pageArray="losePage2.pageArray" v-on:choosePageFun="choooseNumLose2" v-bind:object="object2" :total="losePage2.total"></sino-page>
      </sino-tab-pane>
    </sino-tabs>

  </div>
</template>
<script>
  let checkedArr = [];
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';

  export default {
    components: {},
    data () {
      return {
        sinsAcctId: '',
        activeName: 'one',
        pageA: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          // pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
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
        object2: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        losePage: {
          total: 0,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        losePage2: {
          total: 0,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        oneTableData: [],
        twoTableData: [],
        threeTableData: [],
        type: 1,
        searchForm: {
          unitSinsNo: '', // 单位社保账号
          sinsAcctId: null, // 社保账户id
          sinsAcctName: '',
          executeAreaId: null, // 执行地区id
          executeAreaName: '', // 执行地区
          applyMonString: new Date(), // 申报年月
          applyMon: ''  // 申报年月
        }  // 查询条件
      };
    },
    created () {
      if (this.$route.query.unitSinsNo !== '') {
        this.searchForm.unitSinsNo = this.$route.query.unitSinsNo + '+ ' + this.$route.query.sinsAcctName;
      } else {
        this.searchForm.unitSinsNo = this.$route.query.sinsAcctName;
      }
      this.sinsAcctId = this.$route.query.sinsAcctId;
      this.searchFun(this.type);
    },
    mounted () {
      this.viewAll(1, 10, 1);
    },
    methods: {
      switchDateMonth (monthValue) {
        if (monthValue) {
          let date = (monthValue + '').split('');
          date.splice(4, 0, '-');
          return date.join('');
        } else {
          return  '';
        }
      },
      handleClick (tab, event) {
        this.type = tab.index - 0 + 1;
        this.pageNum = 1;
        checkedArr.splice(0);
        this.viewAll(this.pageNum, this.pageSize, this.type);
      },
      searchFun (type) {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize, type);
      },
      viewAll (pageNum, pageSize, type) {
        this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonString, 'yyyy-MM');
        let data = Number(this.searchForm.applyMon.replace(/-/g, ''));
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            sinsAcctId: this.$route.query.sinsAcctId,
            type: type,
            applyMon: data
          }
        };
        api.post(this.apiPath.sins.findDifferenceDateAction, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (type == 1) {
              this.oneTableData = res.data.pageInfo.list;
              this.pageA.total = res.data.pageInfo.total;
              this.losePage.total = res.data.secondTotal;
              this.losePage2.total = res.data.thirdTotal;
            } else if (type == 2) {
              this.twoTableData = res.data.pageInfo.list;
              this.losePage.total = res.data.pageInfo.total;
              this.pageA.total = res.data.firstTotal;
              this.losePage2.total = res.data.thirdTotal;
            } else if (type == 3) {
              this.threeTableData = res.data.pageInfo.list;
              this.losePage2.total = res.data.pageInfo.total;
              this.pageA.total = res.data.firstTotal;
              this.losePage.total = res.data.secondTotal;
            }
            this.baseInfo.firstTotal = res.data.firstTotal;
            this.baseInfo.secondTotal = res.data.secondTotal;
            this.baseInfo.thirdTotal = res.data.thirdTotal;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // viewAll (pageNum, pageSize, type) {
      //   this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonString, 'yyyy-MM');
      //   let data = Number(this.searchForm.applyMon.replace(/-/g, ''));
      //   let obj = {
      //     pageNum: pageNum,
      //     pageSize: pageSize,
      //     data: {
      //       sinsAcctId: this.$route.query.sinsAcctId,
      //       type: type,
      //       applyMon: data
      //     }
      //   };
      //   api.post(this.apiPath.sins.findDifferenceDateAction, obj).then(res => {
      //     if (res.code === 'CPYY-00001') {
      //       if (this.activeName === 'one') {
      //         this.oneTableData = res.data.pageInfo.list;
      //         this.total = res.data.pageInfo.total;
      //         this.losePage.total = res.data.secondTotal;
      //         this.losePage2.total = res.data.thirdTotal;
      //       }
      //       if (this.activeName === 'two') {
      //         this.twoTableData = res.data.pageInfo.list;
      //         this.losePage.total = res.data.pageInfo.total;
      //         this.total = res.data.firstTotal;
      //         this.losePage2.total = res.data.thirdTotal;
      //       }
      //       if  (this.activeName === 'three') {
      //         this.threeTableData = res.data.pageInfo.list;
      //         this.losePage2.total = res.data.pageInfo.total;
      //         this.total = res.data.firstTotal;
      //         this.losePage.total = res.data.secondTotal;
      //       }
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      pageHandler: function (pageNum) {
        this.pageA.pageNum = pageNum;
        this.viewAll(this.pageA.pageNum, this.pageA.pageSize, this.type);
      },
      choooseNum: function (pageSize) {
        this.pageA.pageSize = pageSize;
        this.viewAll(this.pageA.pageNum, this.pageA.pageSize, this.type);
      },
      pageHandlerLose: function (pageNum) {
        this.losePage.pageNum = pageNum;
        this.viewAll(this.losePage.pageNum, this.losePage.pageSize, this.type);
      },
      choooseNumLose: function (pageSize) {
        this.losePage.pageSize = pageSize;
        // this.losePage.pageNum = 1;
        this.viewAll(this.losePage.pageNum, this.losePage.pageSize, this.type);
      },
      pageHandlerLose2: function (pageNum) {
        this.losePage2.pageNum = pageNum;
        this.viewAll(this.losePage2.pageNum, this.losePage2.pageSize, this.type);
      },
      choooseNumLose2: function (pageSize) {
        this.losePage2.pageSize = pageSize;
        this.viewAll(this.losePage2.pageNum, this.losePage2.pageSize, this.type);
      },
      selectCallBackEmp (selectTion, row) {
        checkedArr = selectTion;
      },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.questionPerId) {
            all.push(item);
          }
        }
        this.selectCallBackEmp(all, row);
      },
      /* 导出 */
      exportFun: function () {
        let questionPerIdsStrings = [];
        if (checkedArr.length !== 0) {
          checkedArr.forEach(function (item, index) {
            questionPerIdsStrings.push(item.questionPerIdsString);
          });
        }
        this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonString, 'yyyyMM');
        let obj = {
          "sinsAcctId": this.$route.query.sinsAcctId,
          applyMon: this.searchForm.applyMon,
          type: this.type
        };
        api.post(this.apiPath.sins.exportQuestionPerAction, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 差异处理
      noPassFun: function (state) {
        let questionPerIdsStrings = [];
        let arrList = [];
        if (this.type == 1) {
          arrList = this.oneTableData;
        } else if (this.type == 2) {
          arrList = this.twoTableData;
        } else if (this.type == 3) {
          arrList = this.threeTableData;
        }
        arrList.forEach(function (_item, index) {
          questionPerIdsStrings.push(_item.questionPerIdsString);
        });
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
        let date = (this.searchForm.executeMon + '').replace(/-/g, '');
        this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonString, 'yyyyMM');
        let params = {
          "sinsAcctId": this.$route.query.sinsAcctId,
          "type": this.type,
          "applyMon": this.searchForm.applyMon,
          "questionPerState": state,
          "questionPerIdsStrings": []
        };
        api.post(this.apiPath.sins.updateQuestionStateAction, params).then(res => {
          if (res.code === 'CPYY-00001') {
            if (this.type == 1) {
              this.viewAll(1, this.pageA.pageSize, this.type);
            } else if (this.type == 2) {
              this.viewAll(1, this.losePage.pageSize, this.type);
            } else if (this.type == 3) {
              this.viewAll(1, this.losePage2.pageSize, this.type);
            };
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      OnlyFun (item, state) {
        this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonString, 'yyyyMM');
        let params = {
          "sinsAcctId": this.$route.query.sinsAcctId,
          "type": this.type,
          "applyMon": this.searchForm.applyMon,
          "questionPerState": state,
          "questionPerIdsStrings": [item.questionPerIdsString]
        };
        api.post(this.apiPath.sins.updateQuestionStateAction, params).then(res => {
          if (res.code === 'CPYY-00001') {
            if (this.type == 1) {
              this.viewAll(this.pageA.pageNum, this.pageA.pageSize, this.type);
            } else if (this.type == 2) {
              this.viewAll(this.losePage.pageNum, this.losePage.pageSize, this.type);
            } else if (this.type == 3) {
              this.viewAll(this.losePage2.pageNum, this.losePage2.pageSize, this.type);
            };
            this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

