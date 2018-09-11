<template>
  <div >
    <div v-if="!routerView">
      <!--账单认领-->
      <sino-con class="sino-con-more bill_box usermanage" >
        <sino-title type="levelOne" title="新闻查询"></sino-title>
        <sino-form :model="journadmForm" ref="journadmForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box invoice-ul">
              <li class="invoice-li sino-form-item-width">
                <span class="search-inner-name invoice-li-width">新闻标题：</span>
                <sino-input class="fl sino-form-item-content" type="text"
                            :disabled="false" v-model="journadmForm.newsTitle"></sino-input>
              </li>
              <li >
                <span class="search-inner-name">所属栏目：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :chooseName.sync="journadmForm.newsTypeName"
                             :chooseId.sync="journadmForm.newsType"
                             :data="{code: 'NEWS_TYPE'}"
                             :clear="true" >
                </sino-select>
              </li>
              <li >
                <span class="search-inner-name">创建人：</span>
                <sino-input class="fl" type="text"
                            :disabled="false" v-model="journadmForm.creName"></sino-input>
              </li>
              <li class="li-splice clear">
                <span class="two-dater-span">发布日期：</span>
                <div class="two-dater">
                  <sino-form-item class="search-inner-item" prop="begDate">
                    <sino-date-picker class="fl"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true"
                                      v-model="journadmForm.smallPubTime">
                    </sino-date-picker>
                  </sino-form-item>
                  <span class="fl">至</span>
                  <sino-form-item class="search-inner-item" prop="endDate">
                    <sino-date-picker class="fl"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true"v-model="journadmForm.bigPubTime">
                    </sino-date-picker>
                  </sino-form-item>
                </div>
              </li>
              <li >
                <span class="search-inner-name">新闻状态：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :chooseName.sync="journadmForm.newsStateName"
                             :chooseId.sync="journadmForm.newsState"
                             :data="{code: 'NEWS_STATE'}"
                             :clear="true" >
                </sino-select>
              </li>
              <li >
                <span class="search-inner-name">是否轮播：</span>
                <sino-radio v-for="(item, index) in yesNoList" :key="index"
                            v-model.number="journadmForm.isSwiper"
                            :label="item.id">{{item.title}}</sino-radio>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="search()">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun(this.journadmForm)" >重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--表格-->
      <div class=" sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button class="fl" type="icon-text"  @click="addjourn"><i class="iconfont sino-add"></i>新增</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" max-height="416"   border stripe>
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="newsTypeName" label="所属栏目" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="newsTitle" label="新闻标题" min-width="280"></sino-table-column>
          <sino-table-column prop="publishTime" label="发布日期" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="105"></sino-table-column>
          <sino-table-column prop="newsSource" label="内容来源" min-width="105"></sino-table-column>
          <sino-table-column prop="browseNum" label="阅读量" min-width="120"></sino-table-column>
          <sino-table-column prop="newsStateName" label="状态" min-width="95"></sino-table-column>
          <sino-table-column label="轮播" align="center" width="80" class-name="checbox-cell">
            <template scope="scope" v-if="scope.row.oper == true">
              <sino-checkbox  @change="uploadSwiper(scope.row)" :checked="Boolean(scope.row.isSwiper)"></sino-checkbox>
            </template>
          </sino-table-column>
          <sino-table-column label="操作" align="center" width="160" fixed="right">
            <template scope="scope">
              <template v-show="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.newsState !== 3">修改</span><i class="table-i"  v-if="scope.row.newsState === 1">|</i>
                <span class="table-span" @click="release(scope.row)" v-if="scope.row.newsState === 1">发布</span><i class="table-i" v-if="scope.row.newsState === 2">|</i>
                <span class="table-span" @click="soldOut(scope.row)" v-if="scope.row.newsState === 2">下架</span><i class="table-i" v-if="scope.row.newsState !== 3">|</i>
                <span class="table-span" @click="seeFN(scope.row)">预览</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page :page="page.pageNum"
                   v-bind:page-size="page.pageSize"
                   :pageArray="page.pageArray"
                   v-bind:object="object"
                   v-on:pagehandler="pageHandlerB"
                   v-on:choosePageFun="choooseNumB"
                   :total="page.total"></sino-page>
      </div>
        <!--导入-->
        <sino-dialog :visible.sync="remiLeadFlag" :top="'30%'" class="remilead-wid" @close ="cleanContent('remiLeadForm')">
          <sino-title slot="title" type="levelOne" title="导入轮播图" class="sino-dialog-title"></sino-title>
          <sino-form :model="remiLeadForm" ref="remiLeadForm">
            <sino-form-item prop="addr" label="上传图片：" class="sino-label is-required">
              <sino-upload
                class="upload-demo"
                ref="remiUpload"
                :action="uploadToCom"
                :show-file-list="false"
                :auto-upload="true"
                :on-change="getFileName"
                :on-success="fileSuccess"
                :headers="headerToken"
                :on-error="fileError"
              >
                <div slot="trigger">
                  <input class="uploadFileBox" type="text" v-model="fileName" readonly="true"/>
                  <span class="chooseFileButton">上传</span>
                </div>
              </sino-upload>
            </sino-form-item>
          </sino-form>
          <span slot="footer" class="dialog-footer">
            <sino-button type="primary" @click="notarize">确 定</sino-button>
          </span>
        </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>

<script>
  import api from '../../../api';
  import filter from '../../../filters/index';
  import Vue from 'vue';
  import Cookies from 'js-cookie';
  let checkedArr = [];
  let checkedArrTwo = []; // 选中====》收据
  export default {
    data () {
      return {
        getFnncReceiptPayCorpName: this.apiPath.hrsc.getFnncReceiptPayCorpName, // 付款方名称下拉框
        pageSelectRemiNameSelectBox: this.apiPath.hrsc.pageSelectRemiNameSelectBox, // 汇款方名称下拉框
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        uploadToCom: this.apiPath.hrsc.uploadToCom, // 文件上传
        headerToken: {"Token": Cookies.get('Token')},
        warr: false,
        journadmForm: {
          newsType: '',
          newsTitle: '',
          newsState: '',
          creName: '',
          newsTypeName: '',
          smallPubTime: '',
          bigPubTime: '',
          isSwiper: '',
          newsStateName: ''
        },
        yesNoList: [], // 是否已有照片单选框
        routerView: false,
        isSwiper: 0,
        remiLeadFlag: false,
        tableData: [],
        remiLeadForm: {
          newsId: '',
          swiperUrl: '' // 图片唯一号
        },
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 100 // 分页总条数
        },
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        fileName: '',
        // 提交按钮的参数
        submitData: {
          remiList: [], // 汇款单Id集合
          fnncReceiptList: [] // 收费账单Id集合
        },
        remiAdvFalg: false, // 高级查询弹层显示====》汇款
        receInpFalg: false, // 高级查询弹层显示=====》账单
        dictSelUrl: '',
        total: null, // 合計=====>汇款单
        cheTabLen: null,
        cheTabLenTwo: null,
        totald: null, // 合计====》账单
        checkedArr: [ ], // 选中====》汇款单
        checkArr: [ ],  // 选中=====》账单
        findAreaList: '',
        alertTitle: '汇款单高级查询',
        alertsTitle: '账单高级查询',
        alerTitle: '收据高级查询',
        cityData: {}, // 汇款单状态
        // 汇款单列表
        remiAdvData: null,
        // 收据列表
        receInpData: null,
        // 账单列表
        tablesData: [{
          index: '16',
          outLine: '银天科技有限公司'
        }],
        // 账单认领信息title列表--->三小模块
        moneyFrom: {
          totalNum: 0,
          succNum: 0,
          failNum: 0
        },
        // 高级查询弹层=====>汇款
        remiAdvInpForm: {
          remiCorpName: '', // 汇款方名称
          remiCorpId: null,
          remiNo: '',  // 汇款单编号
          remiMoney: '', // 汇款单金额
          state: 2, // 汇款单状态：字典码 REMI_STATE
          stateName: '已发布' // 汇款单状态：字典码 REMI_STATE
        },
        remiAdvInpFormRules: {
          remiMoney: [
            { required: false, message: '请输入数字', trigger: 'change' },
            {validator: this.validator.checkNum, trigger: 'change'}
          ]
        },
        // 单个汇款方名称的数据
        remitterFrom: {
          remiCorpName: '',
          remiCorpId: null,
          remiNo: '',  // 汇款单编号
          remiMoney: '', // 汇款单金额
          state: '', // 汇款单状态：字典码 REMI_STATE
          stateName: '' // 汇款单状态：字典码 REMI_STATE
        },
        // 高级查询弹层=====>收据
        receInpForm: {
          cityName: '',
          payCorpId: null,
          enName: '',
          citaName: '',
          citName: '',
          receMatDate: ''
        },
        // 汇款方名称=====》汇款
        modifyAnForm: {
          certTypeName: ''
        },
        // 账单/供应商名称
        modiAnForm: {
          certTypeName: ''
        }
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/journAdmin") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.search();
      this.yesNoFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.search);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      yesNoFun () {
        api.post(this.getDictSelectBox, {code: 'YES_NO'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.yesNoList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandlerB: function (page) {
        this.page.pageNum = page;
        this.getTableList(page, this.page.pageSize);
      },
      choooseNumB: function (pageSize) {
        this.page.pageSize = pageSize;
        this.getTableList(1, pageSize);
      },
      cleanContent: function (formName) {
        this.$refs[formName].resetFields();
        this.$refs.remiUpload.uploadFiles = [];
        this.fileName = '';
        this.isSwiper = false;
        /* 需要刷新一下列表 */
        if (formName === 'remiLeadForm') {
          this.search();
        }
      },
      uploadSwiper: function (item) {
        if (item.isSwiper === 1) { /* 已经被选中的情况下 */
          let obj = {
            newsId: item.newsId,
            isSwiper: 0
          };
          api.post(this.apiPath.lcPlat.doMarkIsSwiper, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '取消成功！', type: 'success'});
              this.search();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (item.isSwiper === 0) { /* 没有被选中的情况下 */
          api.post(this.apiPath.lcPlat.selectMaxSwiperNum).then(res => {
            if (res.code === 'CPYY-00001') { /* 可以上传文件 */
              item.isSwiper = 1;
              this.remiLeadFlag = true;
              this.remiLeadForm.newsId = item.newsId;
            } else {
              this.search();
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      getFileName (file, filelist) {
        this.fileName = file.name;
      },
      fileSuccess (res) {
        let _this = this;
        if (res.code === 'CPYY-00001') {
          _this.remiLeadForm.swiperUrl = res.data;
          // this.$message({message: '上传成功！', type: 'success', onClose: function () {
          //   // _this.remiLeadFlag = false;
          //   _this.$refs.remiUpload.clearFiles();
          //   _this.fileName = '';
          //   // _this.remiLeadSeeFlag = true;
          //   _this.remiLeadSeeList = res.data;
          // }});
        } else {
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
      },
      fileError () {
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            return;
          }
        });
      },
      addjourn () {
        this.$router.push({path: '/journissue'});
      },
      /* 一级查询 */
      search () {
        this.page.pageNum = 1;
        this.getTableList(this.page.pageNum, this.page.pageSize);
      },
      getTableList (pageNum, pageSize, all) {
        pageNum ?  '' : pageNum = this.page.pageNum;
        if (this.journadmForm.smallPubTime) {
          this.journadmForm.smallPubTime = Vue.filter('date')(this.journadmForm.smallPubTime, 'yyyy-MM-dd hh:mm:ss');
        }
        if  (this.journadmForm.bigPubTime) {
          this.journadmForm.bigPubTime = Vue.filter('date')(this.journadmForm.bigPubTime, 'yyyy-MM-dd hh:mm:ss');
        }
        let obj = {
          data: this.journadmForm,
          pageNum: pageNum,
          pageSize: this.page.pageSize
        };
        this.tableData = null;
        api.post(this.apiPath.lcPlat.selectNewsInfoByCondition, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resetFun (formName) {
        for (var key in this.journadmForm) {
          this.journadmForm[key] = '';
        }
      },
      /* 修改 */
      modifyFun (item) {
        this.$router.push({path: '/journissue', query: {newsId: item.newsId, state: 0}});
      },
      /* 发布 */
      release (item) {
        let obj = {
          newsId: item.newsId,
          newsState: 2,
          loginUserId: Cookies.get('UserId'),
          loginUserName: Cookies.get('CPYY-INFO-NAME')
        };
        api.post(this.apiPath.lcPlat.updateNewsState, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '发布成功！', type: 'success'});
            this.search();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 下架 */
      soldOut (item) {
        let obj = {
          newsId: item.newsId,
          newsState: 3,
          loginUserId: Cookies.get('UserId'),
          loginUserName: Cookies.get('CPYY-INFO-NAME')
        };
        api.post(this.apiPath.lcPlat.updateNewsState, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '下架成功！', type: 'success'});
            this.search();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 轮播上传文件 */
      notarize () {
        api.post(this.apiPath.lcPlat.doMarkSwiperPicture, this.remiLeadForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiLeadFlag = false;
            this.$message({message: '上传成功！', type: 'success'});
            /* 标记轮播 */
            let obj = {
              newsId: this.remiLeadForm.newsId,
              isSwiper: 1
            };
            api.post(this.apiPath.lcPlat.doMarkIsSwiper, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                // this.$message({message: '操作成功！', type: 'success'});
                this.search();
              }
            }).catch(err => {
              console.log(err);
            });
            this.search();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 提交
      submitForm () {
        if (this.moneyFrom.failNum < 0) {
          this.$message({message: '剩余金额不能为负数<br><i>请重新选择！</i>', type: 'warning', customClass: 'el-message-width'});
          return;
        }
        api.post(this.apiPath.hrsc.fnncReceiptClaim, this.submitData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '提交成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectTabelRowTwo (selection, row) {
        checkedArrTwo = selection;
        this.moneyFrom.succNum = 0;
        this.submitData.fnncReceiptList = selection;
        this.cheTabLenTwo = checkedArrTwo.length;
        // 计算金额
        for (let item of checkedArrTwo) {
          let mm = item.refundReceiptAmo;
          mm = mm * 100;
          this.moneyFrom.succNum += mm;
        }
        this.moneyFrom.succNum = this.moneyFrom.succNum / 100;
        // 剩余金额
        this.moneyFrom.failNum = (this.moneyFrom.totalNum * 100 - this.moneyFrom.succNum * 100) / 100;
      },
      selectTabelRowTwoAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.refundReceiptId) {
            all.push(item);
          }
        }
        this.selectTabelRowTwo(all, row);
      },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.remiId) {
            all.push(item);
          }
        }
        this.selectTabelRow(all, row);
      },
      selectTabelRow (selection, row) {
        checkedArr = selection;
        this.moneyFrom.totalNum = 0;
        this.submitData.remiList = selection;
        this.cheTabLen = checkedArr.length;
        // 计算金额
        for (let item of checkedArr) {
          let mm = item.remiableAmo;
          mm = mm * 100;
          this.moneyFrom.totalNum += mm;
        }
        this.moneyFrom.totalNum = this.moneyFrom.totalNum / 100;
        // 剩余金额
        this.moneyFrom.failNum = (this.moneyFrom.totalNum * 100 - this.moneyFrom.succNum * 100) / 100;
      },
      // 收据查询
      receInpFun () {
        api.post(this.apiPath.hrsc.getFnncReceiptCombination, {data: this.receInpForm}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.receInpData = res.data.list;
            this.totald = res.data.total;
            this.receInpFalg = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      remiInpFun2 () {
        if (this.remitterFrom.remiCorpId) {
          this.viewAll('', this.remitterFrom);
        }
      },
      viewAll (str, data = this.remiAdvInpForm) {
        api.post(this.apiPath.hrsc.comboGetRemiInfo, {data: data}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiAdvData = res.data.list;
            this.total = res.data.total;
            if (str) {
              this.remitterFrom.remiCorpName = '';
              this.remitterFrom.remiCorpId = null;
              this.remiAdvFalg = false;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 高級查詢彈層顯示
      add () {
        this.remiAdvFalg = true;
        this.warr = false;
      },
      // 账单高级查询
      aladd () {
        this.billsAdd = true;
      },
      seeFN (item) {
        this.$router.push({path: '/journAdmin/journPreview', query: {newsId: item.newsId}});
        this.routerView = true;
      },
      // 高级查询弹层
      modifyOpen (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
