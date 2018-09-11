<template>
  <div class="usermanage">
    <!--用户管理-->
    <sino-con>
      <sino-title type="levelOne" title="纳税起征点查询"></sino-title>
      <sino-form :model="searchForm" ref="ruleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">类型：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="taxThrTypeName" :chooseId.sync="searchForm.taxThrType" :clear="true" :url="dicSelUrl" :data="{code:'TAX_THRESHOLD_TYPE'}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">政策生效日期：</span>
              <sino-date-picker
                v-model="searchForm.takeEffectDate"
                type="date"
                :editable="false"
                :readonly="false"
                :clearable="true"
              >
              </sino-date-picker>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchButFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="50"></sino-table-column>
          <sino-table-column prop="taxThrTypeName" label="纳税起征额类型" min-width="120"></sino-table-column>
          <sino-table-column prop="thr" label="起征金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="takeEffectDate" label="政策生效日期" min-width="105"></sino-table-column>
          <sino-table-column prop="execAreaName" label="执行城市"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" fixed="right" width="90">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modify(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="deleteFun(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!-- 新增-->
    <sino-dialog :visible.sync="taxAddFlag" size="large" :top="'10%'" class="dialog-height no-minheight special-dialog" @close ="cleanContent('taxAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="taxAddForm" ref="taxAddForm" :rules="taxAddFormRule" class="demo-sendAddrAddForm">
        <sino-form-item label="纳税起征额类型：" prop="taxThrTypeName" class="first-select-item">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="taxAddForm.taxThrTypeName" :chooseId.sync="taxAddForm.taxThrType" :clear="true" :url="dicSelUrl" :data="{code:'TAX_THRESHOLD_TYPE'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="政策生效日期：" prop="takeEffectDate">
          <sino-date-picker
            v-model="taxAddForm.takeEffectDate"
            type="date"
            :editable="false"
            :readonly="false"
            :clearable="true"
          >
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="起征金额：" prop="thr">
          <sino-input v-model.number="taxAddForm.thr" ></sino-input>
        </sino-form-item>
        <sino-form-item label="执行城市：" prop="execAreaName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="taxAddForm.execAreaName" :chooseId.sync="taxAddForm.execAreaId" :clear="true" :url="citySelUrl" :data="{data:{level:4}}" :disabled="taxAddForm.taxThrType===1 || taxAddForm.taxThrType===2 || !taxAddForm.taxThrType"></sino-select>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{alertButton}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import vald from '../../../validator/index.js';
  export default {
    components: {},
    data () {
      return {
        dicSelUrl: this.apiPath.hrsc.getDictSelectBox,
        citySelUrl: this.apiPath.hrsc.findAreaList,
        taxThrTypeName: '',
        searchForm: { // 搜索条件
          taxThrType: '',
          takeEffectDate: ''
        },
        isA: true,
        cityDisabled: false,
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
        alertButton: '',
        taxAddFlag: false,
        taxAddForm: {
          taxThrTypeName: '',
          taxThrType: '',
          takeEffectDate: '',
          thr: '',
          execAreaName: '',
          execAreaId: ''
        },
        taxAddFormRule: {
          taxThrTypeName: [
            {required: true, message: '纳税起征额类型为必填项', trigger: 'change'}
          ],
          takeEffectDate: [
            {required: true, type: 'date', message: '政策生效日期为必填项', trigger: 'change'}
          ],
          thr: [
            {required: true, type: 'number', message: '起征金额为数字类型，且为必填项', trigger: 'change'},
            {validator: vald.checkNum, trigger: 'change'}
          ],
          execAreaName: [
            {required: true, message: '执行城市为必填项', trigger: 'change'}
          ]
        }
      };
    },
    watch: {
      'taxAddForm.taxThrType': function (val, oldVal) {
        if (val === 1 || val === 2) {
          this.taxAddForm.execAreaId = 30;
          this.taxAddForm.execAreaName = '中国大陆';
        } else {
          this.taxAddForm.execAreaId = '';
          this.taxAddForm.execAreaName = '';
        }
      }
    },
    created () {
      this.searchButFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      moreIcon () {
        this.isA = !this.isA;
      },
      viewAll (pageNum, pageSize) {
        if (this.searchForm.takeEffectDate) {
          this.searchForm.takeEffectDate = Vue.filter('date')(this.searchForm.takeEffectDate, 'yyyy-MM-dd');
        }
        let data = {
          data: this.searchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.salary.findTaxThrList, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
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
      // 查询
      searchButFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      addFun () {
        this.taxAddFlag = true;
        this.alertTitle = '新增纳税起征额信息';
        this.alertButton = '确 定';
      },
      modify (data) {
        this.taxAddFlag = true;
        this.alertTitle = '修改纳税起征额信息';
        this.alertButton = '修 改';
        let _this = this;
        let areaId = data.execAreaId;
        let areaName = data.execAreaName;
        setTimeout(function () {
          _this.taxAddForm = JSON.parse(JSON.stringify(data));
          _this.taxAddForm.takeEffectDate = new Date(_this.taxAddForm.takeEffectDate);
        });
        setTimeout(function () {
          _this.taxAddForm.execAreaId = areaId;
          _this.taxAddForm.execAreaName = areaName;
        }, 50);
      },
      deleteFun (data) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.postsign(this.apiPath.salary.deleteTaxThrById, data.taxThrId).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchButFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      submitForm () {
        this.$refs.taxAddForm.validate((valid) => {
          if (valid) {
            this.taxAddForm.takeEffectDate = Vue.filter('date')(this.taxAddForm.takeEffectDate, 'yyyy-MM-dd');
            if (this.alertTitle === '新增纳税起征额信息') {
              api.post(this.apiPath.salary.saveTaxThr, this.taxAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.taxAddFlag = false;
                  this.searchButFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              });
            } else {
              this.taxAddForm.takeEffectDate = Vue.filter('date')(this.taxAddForm.takeEffectDate, 'yyyy-MM-dd');
              api.post(this.apiPath.salary.updateTaxThr, this.taxAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.taxAddFlag = false;
                  this.searchButFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              });
            }
          }
        });
      },
      cleanContent: function (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
