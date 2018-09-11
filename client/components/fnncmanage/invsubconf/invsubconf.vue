<template>
  <div class="usermanage">
    <!--发票科目配置-->
    <sino-con>
      <sino-title type="levelOne" title="发票科目配置查询"></sino-title>
      <sino-form :model="invForm" ref="ruleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">发票科目名称：</span>
              <sino-input class="fl" type="text" v-model="invForm.invSubName" :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">发票科目类型：</span>
              <sino-select :tipText="''"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="invForm.invSubTypeName"
                           :chooseId.sync="invForm.invSubType" :clear="true"
                           :url="dictSelUrl"
                           :data="{code: 'INV_SUB_TYPE'}" class="fl"></sino-select>
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
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="invsubData" stripe class="invsubData" border max-height="416" v-on:viewAll="viewAll">
          <!--<sino-table-column type="radioSelection"></sino-table-column>-->
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="invSubName" label="发票科目名称" min-width="105"></sino-table-column>
          <sino-table-column prop="invSubNo" label="发票科目编号" min-width="105"></sino-table-column>
          <sino-table-column prop="invSubTypeName" label="发票科目类型" min-width="105"></sino-table-column>
          <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" width="70" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)">修改</span>
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
    <!-- 新增-->
    <sino-dialog :visible.sync="invsubFlag" size="large" :top="'20%'" class="dialog-height" v-on:close="resetFun('invsubForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="invsubForm" :rules="invsubRules" ref="invsubForm" class="demo-sendAddrAddForm">
        <sino-form-item label="发票科目名称：" prop="invSubName">
          <sino-input v-model="invsubForm.invSubName"></sino-input>
        </sino-form-item>
        <sino-form-item label="发票科目类型：" prop="invSubType">
          <sino-radio v-for="(item, index) in invSubList" :key="index"
                      v-model.number="invsubForm.invSubType"
                      :label="item.id">{{item.title}}</sino-radio>
        </sino-form-item>

        <sino-form-item class="clear" label="发票科目编号：" prop="invSubNo" v-if="alertTitle == '修改发票科目信息'">
          <sino-input v-model="invsubForm.invSubNo" disabled></sino-input>
        </sino-form-item>

        <sino-form-item label="备注：" class="sino-form-item-width beizhu" prop="remark">
          <sino-input type="textarea" v-model="invsubForm.remark "></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';

  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        invForm: {
          invSubName: '',
          invSubType: '',
          invSubTypeName: ''
        },
        isA: true,
        invsubData: null,
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
        invsubForm: {
          invSubName: '',
          invSubType: '',
          invSubNo: '',
          remark: ''
        },
        invsubFlag: false,
        invsubRules: {
          invSubName: [
            {required: true, message: '请输入发票科目名称', trigger: 'change'}
          ],
          invSubType: [
            {type: 'number', required: true, message: '请选择发票科目类型', trigger: 'change'}
          ]
        },
        invSubList: []
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'INV_SUB_TYPE'}).then(res => {
        this.invSubList = res.data.list;
        this.invSubList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.invForm.invSubType = val.id;
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
      moreIcon () {
        this.isA = !this.isA;
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.invForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findInvSub, _data).then(res => {
          this.invsubData = res.data.list;
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
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      addFun () {
        this.invsubFlag = true;
        this.alertTitle = '新增发票科目信息';
      },
      modifyFun: function (scope) {
        this.alertTitle = '修改发票科目信息';
        this.invsubFlag = true;
        api.postsign(this.apiPath.hrsc.findInvSubById, scope.invSubId).then(res => {
          this.invsubForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      submitForm () {
        let _this = this;
        this.$refs['invsubForm'].validate((valid) => {
          if (valid) {
            if (_this.alertTitle === '新增发票科目信息') {
              api.post(_this.apiPath.hrsc.saveInvSub, _this.invsubForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.invsubFlag = false;
                  _this.searchFun();
                  _this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(_this.apiPath.hrsc.updateInvSub, _this.invsubForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.invsubFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
