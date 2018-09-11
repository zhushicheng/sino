<template>
  <div class="usermanage leads-follow">
    <sino-con>
      <sino-title type="levelOne" title="社保分摊表查询"></sino-title>
      <sino-form class="serch-form" :model="sinsShareForm" ref="sinsShareForm">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="li-wid">
              <sino-form-item label="文件名称：" class="search-inner-item" prop="fileName">
                <sino-input class="fl" type="text"
                            :disabled="false" v-model="sinsShareForm.fileName">
                </sino-input>
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
                             :chooseName.sync="sinsShareForm.areaName"
                             :chooseId.sync="sinsShareForm.areaId"
                             :clear="true"
                             :data="{data:{areaTypes:[4,5]}}"
                             :url="areaUrl"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                <sino-date-picker class="fl"
                                  v-model="sinsShareForm.applyMon"
                                  type="month"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box serch-button">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>

    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="makeFun"><i class="iconfont sino-zhangdan-copy"></i>生成分摊表
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" border max-height="416" stripe >
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="fileName" label="文件名称" min-width="120"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="120"></sino-table-column>
          <sino-table-column prop="applyMonDate" label="申报年月" min-width="120"></sino-table-column>
          <sino-table-column prop="productName" label="参保险种" min-width="150"></sino-table-column>
          <sino-table-column prop="creTime" label="生成时间" min-width="160"></sino-table-column>
          <sino-table-column prop="creName" label="操作人"></sino-table-column>
          <sino-table-column label="操作" align="center" width="80" fixed="right">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <span class="table-span" @click="downloadFun(scope.row)">下载</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>

    <!--生成分摊表-->
    <sino-dialog :visible.sync="makeFlag" size="small"  class="see-dirc" v-on:close="resetForm('makeForm')">
      <sino-title slot="title" type="levelOne" title="生成分摊表" class="sino-dialog-title"></sino-title>
      <sino-form :model="makeForm" :rules="makeRules" ref="makeForm">
        <sino-form-item label="执行地区：" prop="areaName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="areaUrl"
                       :chooseName.sync="makeForm.areaName"
                       :chooseId.sync="makeForm.areaId"
                       :data="{data:{areaTypes:[4,5]}}"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="申报年月：" prop="applyMon">
          <sino-date-picker class="fl"
                            v-model="makeForm.applyMon"
                            type="month"
                            :editable="false"
                            :readonly="false"
                            :clearable="true">
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
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  export default {
    data () {
      return {
        token: Cookie.get("Token"),
        areaUrl: this.apiPath.hrsc.findAreaList,
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
        tableData: null,
        sinsShareForm: {
          fileName: '',
          areaId: '',
          areaName: '',
          applyMon: ''
        },
        makeFlag: false,
        makeForm: {
          applyMon: '',
          areaName: '',
          areaId: ''
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
    created () {},
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        if (this.sinsShareForm.applyMon !== '') {
          this.sinsShareForm.applyMon = Vue.filter('date')(this.sinsShareForm.applyMon, 'yyyy-MM');
        }
        let _obj = {
          data: this.sinsShareForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.sins.findSinsMonthlyShareInfoAction, _obj).then(res => {
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
      // 生成分摊表
      makeFun () {
        this.makeFlag = true;
      },
      makeSubmit () {
        this.$refs.makeForm.validate((valid) => {
          if (valid) {
            this.makeForm.applyMon = Vue.filter('date')(this.makeForm.applyMon, 'yyyy-MM');
            api.post(this.apiPath.sins.createMonthlyShareInfoAction, this.makeForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.makeFlag = false;
                if (!res.data) {
                  this.makeForm.applyMon = new Date(this.makeForm.applyMon);
                  this.searchFun();
                  this.$message({message: '操作成功！', type: 'success'});
                } else {
                  this.makeForm.applyMon = new Date(this.makeForm.applyMon);
                  let data = res.data;
                  this.$alert('' + data.areaName + '申报年月为' + data.applyMon + '的' + data.sinsAcctIdName + '还未回单，请完成回单后再生成分摊表。', '提示信息', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    customClass: '', // 添加class
                    lockScroll: true
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
      // 控制翻页
      pageHandler: function (page) {
        this.pageNum = page;
        this.getList();
      },

      choooseNum (pageSize) {
        this.pageSize = pageSize;
        this.getList();
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
