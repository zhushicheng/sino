<template>
  <div>
    <div class="usermanage psuch clearfix" >
      <div class="invinfo">
        <!--head picture-->
        <div class="empass-middle-left psuch-middle">
          <ul class="left-bottom clearfix clearMargin">
            <li>
              <div>
                <i class="total-img"></i>
              </div>
              <div>
                <p>待提交</p>
                <p><span class="tip_num" ></span><span class="fontStyle">168</span></p>
              </div>
            </li>
            <li>
              <div>
                <i class="success-img"></i>
              </div>
              <div>
                <p>待送社保</p>
                <p><span class="tip_num" ></span><span class="fontStyle">50</span></p>
              </div>
            </li>
            <li>
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>待社保审核</p>
                <p><span class="tip_num" ></span><span class="fontStyle">36</span></p>
              </div>
            </li>
            <li>
              <div>
                <i class="success-img"></i>
              </div>
              <div>
                <p>审核不通过</p>
                <p><span class="tip_num" ></span><span class="fontStyle">21</span></p>
              </div>
            </li>
            <li>
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>待领取认定书</p>
                <p><span class="tip_num" ></span><span class="fontStyle">56</span></p>
              </div>
            </li>
          </ul>
        </div>
        <!--selectMessage-->
        <sino-con class="sino-con-more marginTop20">
          <sino-title type="levelOne" title="工伤认定查询"></sino-title>
          <sino-form :model="injuSearchForm" class="serch-form">
            <div class="search-box">
              <ul class="search-inner-box invoice-ul">
                <li class="search-inner-name">
                  <span class="search-inner-name">雇员姓名：</span>
                  <sino-input class="fl" type="text"
                              :disabled="false"></sino-input>
                </li>
                <li>
                  <span class="search-inner-name">证件号码：</span>
                  <sino-input class="fl" type="text"
                              :disabled="false"></sino-input>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">办理进度：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">延时申请情况：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">社保执行地：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">备案情况：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag" class="invoice-li">
                  <span class="search-inner-name invoice-li-width">付费供应商：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag" class="invoice-li">
                  <span class="search-inner-name invoice-li-width">客户名称：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">业务部门：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">业务员：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :clear="true" >
                  </sino-select>
                </li>

              </ul>
            </div>
            <div class="search-button">
              <div class="search-button-box">
                <sino-button type="primary">查 询</sino-button>
                <sino-button class="ressetButton" @click="resetFun('localInfoForm')" v-if="searchFlag">重 置</sino-button>
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
        <!--Search result -->
        <div class=" sino-table-total mt15">
          <div class="sino-table-icon bs-none">
            <div class="sino-table-icon-left">
              <sino-button class="fl" type="icon-text" @click="record"><i class="iconfont sino-qian"></i>工伤备案
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="apply"><i class="iconfont sino-daoru"></i>认定申请
              </sino-button>
              <sino-button class="fl" type="icon-text" ><i class="iconfont sino-daoru"></i>提交申请
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="send"><i class="iconfont sino-daoru"></i>送社保
              </sino-button>
              <sino-button class="fl" type="icon-text" ><i class="iconfont sino-daoru"></i>审核通过
              </sino-button>
              <sino-button class="fl" type="icon-text"><i class="iconfont sino-download-copy fs19"></i>导出
              </sino-button>
            </div>
          </div>

          <sino-table :data="tableData" max-height="416" v-on:viewAll="viewAll" border stripe>
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="conName" label="雇员姓名" min-width="180"></sino-table-column>
            <sino-table-column prop="custOrSuppName" label="证件号码" min-width="200"></sino-table-column>
            <sino-table-column prop="conTypeName" label="办理进度" min-width="80"></sino-table-column>
            <sino-table-column prop="conStateName" label="备案情况" min-width="105"></sino-table-column>
            <sino-table-column prop="conBusiStateName" label="延时申请情况" min-width="105"></sino-table-column>
            <sino-table-column prop="respBusiDepName" label="延时截止日期" min-width="120"></sino-table-column>
            <sino-table-column prop="saleConRespName" label="工伤认定结果" min-width="95"></sino-table-column>
            <sino-table-column prop="salespName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="name" label="付费供应商" min-width="180"></sino-table-column>
            <sino-table-column prop="bumen" label="负责业务部门" min-width="180"></sino-table-column>
            <sino-table-column label="操作" align="center" width="340" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="particular">详情</span><i class="table-i" >|</i>
                  <span class="table-span"  @click="modifyFun(scope.row)" >修改</span><i class="table-i" >|</i>
                  <span class="table-span"  @click="delay(scope.row)" >延时申请</span><i class="table-i" >|</i>
                  <span class="table-span"  @click="provide(scope.row)" >发放认定书</span><i class="table-i" >|</i>
                  <span class="table-span"  @click="giveUp(scope.row)">放弃认定</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page :page="page.pageNum"
                     v-bind:page-size="page.pageSize"
                     :pageArray="page.pageArray"
                     v-bind:object="object"
                     :total="page.total"></sino-page>
        </div>
      </div>
      <!--put on records dialog-->
      <sino-dialog :visible.sync="recordAndapply" top="5%" size="samll"  dialogHide class="accuman-add-layer clearPadding">
        <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
        <div class="suppcont-tip fl positionF" v-if="alertTitle=='工伤认定申请'">
          <i class="iconfont sino-tip"></i><span>手机号码、固定电话和邮箱地址至少任选其一填写。</span>
        </div>
        <div class="leadsAdd-form" :class="{ 'marginTop35': alertTitle=='工伤认定申请'}">
          <sino-form :model="recordAndapplyForm" ref="recordAndapplyForm" class="leadsAdd-Form">
            <sino-form-item label="雇员姓名：" >
              <sino-input  ></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" >
              <sino-input  ></sino-input>
            </sino-form-item>
            <sino-form-item v-if="alertTitle=='工伤备案'" label="工伤发生日期：" prop="enName">
              <sino-date-picker  type="date" placeholder="请选择时间" :editable="false" :readonly="false" :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item v-if="alertTitle=='工伤认定申请'" label="备案情况：" prop="enName">
              <sino-radio v-model="radio" label="1">是</sino-radio>
              <sino-radio v-model="radio" label="2">否</sino-radio>
            </sino-form-item>
            <sino-form-item label="社保执行地："  class="h25">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="付费供应商："   class="h25 sino-form-item-width">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="客户名称："  class="h25 sino-form-item-width">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="工伤类型："  v-if="alertTitle=='工伤认定申请'" class="h25 ">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="工伤发生日期：" v-if="alertTitle=='工伤认定申请'" prop="enName">
              <sino-date-picker type="date" placeholder="请选择时间" :editable="false" :readonly="false" :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="材料收取日期：" prop="enName">
              <sino-date-picker type="date" placeholder="请选择时间" :editable="false" :readonly="false" :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="递交材料人姓名：" v-if="alertTitle=='工伤认定申请'">
              <sino-input  ></sino-input>
            </sino-form-item>
            <sino-form-item label="递交材料人电话：" v-if="alertTitle=='工伤认定申请'">
              <sino-input  ></sino-input>
            </sino-form-item>
            <sino-form-item label="工伤经过：" v-if="alertTitle=='工伤认定申请'" class="sino-form-item-width">
              <sino-input  type="textarea"></sino-input>
            </sino-form-item>
            <!-- 其它信息 -->
            <sino-title type="levelTwo" title="上传文件" :style="{'overflow':'hidden'}"></sino-title>
            <div class="sino-table-total">
              <sino-auto-table :data="uploadData" stripe >
                <sino-table-column type="selection" width="50"></sino-table-column>
                <sino-table-column prop="loginName" label="所需材料" align="left"></sino-table-column>
                <sino-table-column prop="fullName" label="已上传文件" align="center"></sino-table-column>

                <sino-table-column label="操作" align="center">
                  <template scope="scope">
                    <template v-if="scope.row.oper == true">

                        <span class="table-span">
                           <sino-upload
                             class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :show-file-list="true"
                             :auto-upload="true"
                             :on-change="getFileName1"
                             :on-success="fileSuccess1"
                             :on-error="fileError1"
                           >
                          <div slot="trigger">
                            <input class="uploadFileBox" type="hidden" v-model="fileName1" readonly="true" placeholder="请选择上传的文件"/>
                            <button class="chooseFileButton">上传</button>
                          </div>
                        </sino-upload>
                        </span>
                    </template>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-input type="textarea"  placeholder="请输入备注"></sino-input>
            </div>

          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
         <sino-button @click="submitForm('recordAndapplyForm')" v-if="alertTitle=='工伤认定申请'">保 存</sino-button>
          <sino-button type="primary" @click="submitForm('recordAndapplyForm')">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--delay apply for-->
      <sino-dialog :visible.sync="conFlag" size="small" class="leads-follow dialog-item" >
        <sino-title slot="title" type="levelOne" title="延时申请" class="sino-dialog-title"></sino-title>
        <sino-form  >
          <sino-form-item label="提交日期："  class="search-inner-item" >
            <sino-date-picker type="date" placeholder="请选择时间" :editable="false" :readonly="false" :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="延时天数："  class="search-inner-item " >
            <sino-input disabled></sino-input>
          </sino-form-item>

        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" >提 交</sino-button>
      </span>
      </sino-dialog>
      <!--provide （发放认定书）-->
      <sino-dialog :visible.sync="provideBook" top="5%" size="samll" dialogHide  class="accuman-add-layer clearPadding">
        <sino-title slot="title" type="levelOne" title="发放认定书" class="sino-dialog-title"></sino-title>
        <div class="leadsAdd-form" >
          <sino-form :model="provideBookForm" ref="provideBookForm" class="leadsAdd-Form">
            <sino-form-item label="雇员姓名：" >
              <sino-input  disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" >
              <sino-input  disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="领取人">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="领取人签名："  class="sino-form-item-width">
              <sino-input  type="textarea"></sino-input>
            </sino-form-item>


          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
         <sino-button @click="submitForm('recordAndapplyForm')" v-if="alertTitle=='工伤认定申请'">保 存</sino-button>
          <sino-button type="primary" @click="submitForm('recordAndapplyForm')">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--give up book-->
      <sino-dialog :visible.sync="giveUpBook" size="small" class="leads-follow dialog-item" >
        <sino-title slot="title" type="levelOne" title="放弃认定" class="sino-dialog-title"></sino-title>
        <sino-form  class="demo-ruleForm">
          <sino-form-item label="放弃原因："  class="search-inner-item" >
            <sino-input type="textarea"></sino-input>
          </sino-form-item>


        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" >提 交</sino-button>
      </span>
      </sino-dialog>

    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        injuSearchForm: {},
        searchFlag: false,
        conFlag: false,
        giveUpBook: false,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        provideBook: false,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        recordAndapplyForm: '',
        radio: 1,
        routerView: false,
        provideBookForm: '',
        tableData: [
          {
            'conName': '测试测试',
            'custOrSuppName': '111',
            'conTypeName': 2,
            'conStateName': 'ldkfds',
            'conBusiStateName': 'huhuhuh',
            'respBusiDepName': '333333',
            'saleConRespName': 'zheshisha',
            'salespName': 'lalalalla',
            'name': 'nijiaosha',
            'bumen': 'kehutiyanzu'
          },
          {
            'conName': '测试2222测试',
            'custOrSuppName': 'wangxinyu',
            'conTypeName': 3,
            'conStateName': 'caibucai',
            'conBusiStateName': 'lululu',
            'respBusiDepName': 'lalala',
            'saleConRespName': 'zheshisha',
            'salespName': 'lalalalla',
            'name': 'nijiaosha',
            'bumen': 'kehutiyanzu'
          }
        ], // 表格数据
        recordAndapply: false,
        alertTitle: '',
        fileName1: '',
        uploadData: [
          {
            "loginName": 111,
            "fullName": "admin_0"
          },
          {
            "loginName": 222,
            "fullName": "admin_1"
          }
        ]
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/injuryidentifybusi") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    methods: {
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          data: {
            tempName: '',
            tempId: '',
            custName: '',
            custId: ''
          }
        };
        api.post(this.apiPath.hrsc.findServeTemps, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      ruoteJudge () {
        if (this.$route.path !== "/injuryidentifybusi") {
          this.routerView = true;
        }
      },
      record () {
        this.recordAndapply = true;
        this.alertTitle = '工伤备案';
      },
      apply () {
        this.recordAndapply = true;
        this.alertTitle = '工伤认定申请';
      },
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName1 (file) {
        this.fileName = file.name;
      },
      fileSuccess1 () {
        this.$alert('上传成功！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'info', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      fileError1 () {
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
      particular: function () {
        this.routerView = true;
        this.$router.push({path: '/injuryidentifybusi/injuryidentifyParticular'});
      },
      modifyFun: function () {
        this.routerView = true;
        this.$router.push({path: '/injuryidentifybusi/injuryidentifyModify'});
      },
      delay: function () {
        this.conFlag = true;
      },
      provide: function () {
        this.provideBook = true;
      },
      giveUp: function () {
        this.giveUpBook = true;
      },
      send: function () {
        this.stackTitle = '送社保';
        this.stackLable = '送社保日期：';
        this.noPassForm = true;
      }
    }
  };
</script>
