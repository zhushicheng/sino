<template>
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="回盘导入查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="单位社保账号：" class="search-inner-item" prop="unitSinsNo">
                  <sino-input class="fl" type="text"
                              v-model="searchForm.unitSinsNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="社保账户名称：" class="search-inner-item" prop="sinsAcctId">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="findSinsAcctName"
                                 :chooseName.sync="searchForm.sinsAcctName"
                                 :chooseId.sync="searchForm.sinsAcctId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="areaId">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="findAreaList"
                                 :data="{data: {areaTypes:[4,5]}}"
                                 :chooseName.sync="searchForm.executeAreaName"
                                 :chooseId.sync="searchForm.executeAreaId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMonNew">
                  <sino-date-picker
                    v-model="searchForm.applyMonNew"
                    type="month"
                    placeholder=""
                    :editable="false"
                    :readonly="false"
                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>

      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <!--表格上面的操作-->
          <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="apply"><i class="iconfont sino-import"></i>回盘导入
              </sino-button>
            </div>
          </div>
          <!--表格数据-->
          <sino-table :data="applicationData" stripe class="invsubData" v-on:viewAll="searchFun" border max-height="475" >
            <sino-table-column type="radioSelection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="105"></sino-table-column>
            <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="105"></sino-table-column>
            <sino-table-column prop="applyMonth" label="申报年月" min-width="95"></sino-table-column>
            <sino-table-column prop="areaName" label="执行地区" min-width="105"></sino-table-column>
            <sino-table-column prop="proPayNames" label="参保险种" min-width="160"></sino-table-column>
            <sino-table-column prop="productNames" label="已导入险种" min-width="160"></sino-table-column>
            <sino-table-column prop="isHandled" label="差异数据" min-width="160"></sino-table-column>
            <sino-table-column label="操作" align="center" class="user-btns" min-width="150" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="difFun(scope.row)">差异处理 </span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page :page="pageNum"
                     v-bind:page-size="pageSize"
                     :pageArray="pageArray"
                     v-bind:object="object"
                     v-on:pagehandler="pageHandler"
                     v-on:choosePageFun="choooseNum"
                     :total="total"></sino-page>
        </div>
      </div>

      <!--回盘导入-->


      <sino-dialog :visible.sync="finaPaymentAdd" :top="'30%'"  class="conHeight" @close="modifyOpen('finaPaymentForm')">
        <sino-title slot="title" type="levelOne" title="回盘导入" class="sino-dialog-title"></sino-title>
        <sino-form :model="finaPaymentForm"  :rules="finaPaymentRules" ref="finaPaymentForm" class="serch-form">
          <sino-form-item prop="executeAreaName" label="执行地区：" class=" is-required">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="findAreaListByBusiAreaType"
                         :data="{data: {busiAreaTypes:[1,2]}}"
                         :chooseName.sync="finaPaymentForm.executeAreaName"
                         :chooseId.sync="finaPaymentForm.executeAreaId"
                         @contentChange="showTable"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item prop="applyMon" label="申报年月：" class="">
            <sino-date-picker
              v-model="finaPaymentForm.applyMon"
              type="month"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
        </sino-form>
        <sino-auto-table :data="AreaData" width="100%" stripe border v-if="showHide">
          <sino-table-column prop="productName" label="险种名称" align="center"></sino-table-column>
          <sino-table-column prop="fileName" label="已上传文件" align="center">
            <template scope="scope" v-if="scope.row.oper == true">
              <div class="clear" v-for="(list, index) in scope.row.fileInfos" :key="index">
              <input class="mater-style" readonly="true" v-model="list.fileName" />
              <span class="i-color" v-if="list.fileName" @click="deleFileFun(scope.$index, index)">
                <i class="iconfont sino-reduce"></i>
              </span>
              </div>
            </template>
          </sino-table-column>
          <sino-table-column label="操作" align="center" width="80">
              <template scope="scope" v-if="scope.row.oper == true">
                <sino-upload
                  ref="conFile"
                  :action="uploadFilePublic"
                  :show-file-list="false"
                  :auto-upload="true"
                  multiple
                  :on-success="fileSuccess"
                  :on-error="fileError"><div slot="trigger">
                  <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                </div></sino-upload>
              </template>
          </sino-table-column>
        </sino-auto-table>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitUpload">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--弹层-->
      <sino-dialog :visible.sync="lookBillFlag" size="samll" dialogHide  class="usermanage">
        <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="账单明细"></sino-title>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="lookBillFlag=false">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--<router-view v-if="routerView"></router-view>-->
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>

<script>
  import api from '../../../api';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  let _conEncName = [];
  let _conEncId = [];

  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,   //  数据字典
        findSinsAcctName: this.apiPath.sins.findSinsAcctName,   //  社保账户名称、业务员下拉框
        findAreaList: this.apiPath.hrsc.findAreaList,   //  地区下拉框
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,   //  地区下拉框
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 上传文件
        dataFileName: '',   // 以上传文件的名字
        index: '',
        fileName: '',
        searchForm: {
          unitSinsNo: '', // 单位社保账号
          sinsAcctId: null, // 社保账户id
          sinsAcctName: '',
          executeAreaId: null, // 执行地区id
          executeAreaName: '', // 执行地区
          applyMonNew: new Date(),
          applyMon: '' // 申报年月
        },  // 查询条件
        finaPaymentForm: {
          executeAreaName: '',
          executeAreaId: '',
          applyMon: '',
          productFileUniqNos: [] // 险种及对应文件的集合
        },
        routerView: false,
        AreaData: [],
        showHide: false,
        applicationData: null, // 申请财务支付查询数据
        lookBillFlag: false,
        // 翻页
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        total: null,    // 控制翻页的显示与否
        comparison: {
          counterofferMsg: '',
          executeAreaId: '', // 执行地
          applyMonDate: '', // 申报年月
          productFileInfos: []
        },
        // 申请财务支付弹层
        finaPaymentAdd: false, // 申请财务支付弹层显示与否
        finaPaymentAddForm: {}, // 申请财务支付弹层数据
        finaPaymentAddFormRules: {}, // 申请财务支付弹层参数是否必填
        finaPaymentRules: {
          executeAreaName: [
            {required: true, message: '请选择执行地区', trigger: 'change'}
          ]
        },
        isA: true
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/counterofferImport") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      fileSuccess (res, file, filelist) {
        if (res.code === 'CPYY-00001') {
          this.AreaData[this.index].fileInfos.push({
            fileName: file.name,
            fileNo: file.response.data
          });
        } else {
          this.AreaData[this.index].fileName = '';
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
        }
      },
      fileError () {
        this.AreaData[this.index].fileName = '';
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'info', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      currentUploadFun (row, index) {
        this.index = index;
      },
      deleFileFun (data, index) {
        // console.log(this.AreaData[this.index].fileInfos[index].fileName);
        /* this.AreaData[data].fileInfos[index].fileName = '';
        this.AreaData[data].fileInfos[index].fileNo = ''; */
        this.AreaData[data].fileInfos.splice(index, 1);
      },
      showTable (item) {
        if (item.id === 2110746 || item.id === 2110751 || item.id === 2145259 || item.id === 2144973 || item.id === 2146062 || item.id === 2144957) {
          this.showHide = true;
          let obj = {
            executeAreaId: item.id
          };
          api.post(this.apiPath.sins.findExecuteAreaPruductIdAction, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              if (Array.isArray(res.data)) {
                res.data.forEach(function (item) {
                  item.fileInfos = [];
                });
              }
              this.AreaData = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.showHide = false;
        }
      },
      // 导入确认
      submitUpload () {
        this.$refs.finaPaymentForm.validate((valid) => {
          if (valid) {
            this.finaPaymentForm.applyMon = Vue.filter('date')(this.finaPaymentForm.applyMon, 'yyyy-MM');
            let data = Number(this.finaPaymentForm.applyMon.replace(/-/g, ''));
            let obj = {
              executeAreaId: this.finaPaymentForm.executeAreaId,
              applyMon: data,
              productFileInfos: this.AreaData
            };
            api.post(this.apiPath.sins.counterofferImp, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.finaPaymentAdd = false;
                this.comparison.counterofferMsg = res.data.counterofferMsg;
                this.comparison = res.data.counterofferImpInfo;
                this.comparison.applyMonDate = res.data.counterofferImpInfo.applyMon;
                /* counterofferMsg === null,就掉张炎的接口，如果是信息展示出来如果客户点击是掉接口，否关闭 */
                if (res.data.counterofferMsg === null) {
                  // 掉张炎的接口
                  api.post(this.apiPath.sins.compareDataAction, this.comparison).then(res => {
                    if (res.data.sinsAcctId !== 0)  {
                      this.$confirm('数据存在差异，请进行差异处理', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: ' ',
                        type: 'warning'
                      }).then(() => {
                        this.difFun(res.data);
                      }).catch(err => {
                        console.log(err);
                      });
                    } else {
                      this.$message({message: '对比的数据无差异！', type: 'success'});
                      this.serachFun();
                    }
                  }).catch(err => {
                    console.log(err);
                  });
                } else {
                  this.$confirm(res.data.counterofferMsg, '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                  }).then(() => {
                    api.post(this.apiPath.sins.compareDataAction, this.comparison).then(res => {
                      if (res.data.sinsAcctId !== 0) {
                        this.$confirm('数据存在差异，请进行差异处理', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: ' ',
                          type: 'warning'
                        }).then(() => {
                          this.difFun(res.data);
                        }).catch(err => {
                          console.log(err);
                        });
                      } else {
                        this.serachFun();
                      }
                    }).catch(err => {
                      console.log(err);
                    });
                  });
                }
                console.log(res.data);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 主查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchForm
        };
        this.searchForm.applyMon = Vue.filter('date')(this.searchForm.applyMonNew, 'yyyy-MM');
        this.searchForm.applyMon = this.searchForm.applyMon.replace(/-/g, '');
        api.post(this.apiPath.sins.findCounterofferImpTotal, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.applicationData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      difFun (data) {
        this.routerView = true;
        this.$router.push({path: '/counterofferImport/diverpading', query: {sinsAcctId: data.sinsAcctId, unitSinsNo: data.unitSinsNo, sinsAcctName: data.sinsAcctName}});
      },
      // 主重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      // 控制翻页
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.page, this.pageSize);
      },

      choooseNum (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },

      // 申请财务支付弹层关闭
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 申请财务支付弹层 --> 确定
      submitForm () {
        this.finaPaymentAdd = false;
        this.$message(
          {
            message: '操作成功<br><i>下一个审核人：部门经理-王亮</i>',
            type: 'success',
            customClass: 'el-message-width'
          }
        );
      },
      // 表格--> 申请财务支付
      apply () {
        this.finaPaymentAdd = true;
        this.finaPaymentForm.applyMon = new Date();
      },
      modifyOpen (formName) {
        this.$refs[formName].resetFields();
        this.AreaData = null;
        this.showHide = false;
      },
      // 表格--> 导出费用报销单
      exportCost () {}
    }
  };
</script>

