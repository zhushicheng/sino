<template>
  <!--公积金公摊表-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="查询条件"></sino-title>
      <sino-form :model="accuShareForm" ref="accuShareForm" class="serch-form">
        <div class="search-box">
          <ul class=" search-inner-one search-inner-box">
            <li class="li-wid">
              <sino-form-item label="文件名称：" class="search-inner-item" prop="fileName">
                <sino-input type="text" class="fl"
                            v-model="accuShareForm.fileName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="执行地区：" class="search-inner-item" prop="areaName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="accuShareForm.areaName"
                             :chooseId.sync="accuShareForm.areaId"
                             :clear="true"
                             :data="{data:{areaTypes:[4,5]}}"
                             :url="areaUrl"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                <sino-date-picker class="fl"
                  v-model="accuShareForm.applyMon"
                  type="month"
                  :editable="false"
                  :readonly="false">
                </sino-date-picker>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="makeFun"><i class="iconfont sino-zhangdan-copy"></i>生成分摊表
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" max-height="416" border v-on:viewAll="viewAll" stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="fileName" label="文件名称" min-width="180"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="150"></sino-table-column>
          <sino-table-column prop="applyMonDate" label="申报年月"></sino-table-column>
          <sino-table-column prop="creTime" label="生成时间" min-width="160"></sino-table-column>
          <sino-table-column prop="creName" label="操作人"></sino-table-column>
          <sino-table-column label="操作" align="center" width="80" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="downloadFun(scope.row)">下载</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
    <!--生成分摊表-->
    <sino-dialog :visible.sync="makeFlag" class="dialog-input" v-on:close="resetFun('makeForm')">
      <sino-title slot="title" type="levelOne" title="生成分摊表" class="sino-dialog-title"></sino-title>
      <sino-form :model="makeForm" :rules="makeRules" ref="makeForm">
        <sino-form-item prop="areaName" label="执行地区：">
          <sino-select class="fl"
                       :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="makeForm.areaName"
                       :chooseId.sync="makeForm.areaId"
                       :clear="true"
                       :data="{data:{areaTypes:[4,5]}}"
                       :url="areaUrl"></sino-select>
        </sino-form-item>
        <sino-form-item prop="applyMon" label="申报年月：">
          <sino-date-picker v-model="makeForm.applyMon" type="month" :editable="false" :readonly="false" format="yyyy-MM" :clearable="false">
          </sino-date-picker>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="makeSubmit">生成分摊表</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  export default {
    components: {},
    data () {
      return {
        areaUrl: this.apiPath.hrsc.findAreaList,
        accuShareForm: { // 搜索条件
          fileName: '',
          areaId: '',
          areaName: '',
          applyMon: ''
        },
        token: Cookie.get("Token"),
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
        makeFlag: false,
        makeForm: {
          areaId: '',
          areaName: '',
          applyMon: ''
        },
        makeRules: {
          areaName: [
            {required: true, message: '请选择执行地区', trigger: 'change'}
          ],
          applyMon: [
            {type: 'date', required: true, message: '请选择申报年月', trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        if (this.accuShareForm.applyMon !== '') {
          this.accuShareForm.applyMon = Vue.filter('date')(this.accuShareForm.applyMon, 'yyyy-MM');
        }
        let _data = {
          data: this.accuShareForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.accu.findAccuMonthlyShareInfoAction, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
            if (this.accuShareForm.applyMon) {
              this.accuShareForm.applyMon = new Date(this.accuShareForm.applyMon);
            }
          } else {
            this.accuShareForm.applyMon = new Date(this.accuShareForm.applyMon);
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
      // 生成分摊表
      makeFun () {
        this.makeFlag = true;
      },
      makeSubmit () {
        let _this = this;
        this.$refs.makeForm.validate((valid) => {
          if (valid) {
            this.makeForm.applyMon = Vue.filter('date')(this.makeForm.applyMon, 'yyyy-MM');
            api.post(this.apiPath.accu.createAccuMonthlyShareInfoAction, this.makeForm).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data === null) {
                  this.makeFlag = false;
                  this.makeForm.applyMon = new Date(this.makeForm.applyMon);
                  this.searchFun();
                  this.$message({message: '操作成功！', type: 'success'});
                } else {
                  this.makeFlag = false;
                  this.makeForm.applyMon = new Date(this.makeForm.applyMon);
                  _this.$alert('' + res.data.areaName + '申报年月为' + res.data.applyMon + '的' + res.data.accuAcctName + '还未回单，请完成回单后再生成分摊表。', '提示信息', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    customClass: '', // 添加class
                    lockScroll: true,
                    callback: action => {
                      return;
                    }
                  });
                }
              } else {
                this.makeForm.applyMon = new Date(this.makeForm.applyMon);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 下载
      downloadFun (str) {
        var obj = {
          fileUniqueNo: str.fileId
        };
        api.get(this.apiPath.hrsc.invMatFileDownload, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
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
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
