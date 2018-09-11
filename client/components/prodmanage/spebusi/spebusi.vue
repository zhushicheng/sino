<template>
  <div class="usermanage">
    <!--特殊业务说明-->
    <sino-con>
      <sino-title type="levelOne" title="特殊业务情况查询"></sino-title>
      <sino-form :model="speForm" ref="speForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">特殊情况名称：</span>
              <sino-input class="fl" type="text"
                          v-model="speForm.speName"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">地区：</span>
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="areaUrl"
                           :data="{data: {areaTypes:[4,5]}}"
                           :chooseName.sync="speForm.invoAreaIdName" class="fl"
                           :chooseId.sync="speForm.invoAreaId" :clear="true"></sino-select>
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
        <sino-table :data="speTableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="50" align="center"></sino-table-column>
          <sino-table-column prop="speName" label="特殊情况说明" min-width="105"></sino-table-column>
          <sino-table-column prop="speNo" label="特殊情况编号" min-width="105"></sino-table-column>
          <sino-table-column prop="invoAreaName" label="地区"></sino-table-column>
          <sino-table-column prop="suppId" label="受托供应商" min-width="95"></sino-table-column>
          <sino-table-column prop="busiRule" label="业务规则"></sino-table-column>
          <sino-table-column label="操作" align="center" width="90" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="delFun(scope.row)">删除</span>
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
    <sino-dialog :visible.sync="speAddFlag" size="large" :top="'10%'" class="dialog-height" v-on:close="resetFun('speAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="speAddForm" :rules="speAddRules" ref="speAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="特殊情况名称：" prop="speName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="speAddDisFlag"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="speNameUrl"
                       :chooseName.sync="speAddForm.speName" class="fl"
                       :chooseId.sync="speAddForm.ruleEngineId" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="speNo" label="特殊情况编号：">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="speAddDisFlag"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="speNoUrl"
                       :linkage="true"
                       :data="speAddForm.ruleEngineId" @contentChange="contentChange"
                       :chooseName.sync="speAddForm.speNo" class="fl"
                       :chooseId.sync="speAddForm.speNoId" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="suppName" label="受托供应商：">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="suppUrl"
                       :token="token"
                       :chooseName.sync="speAddForm.suppName" class="fl"
                       :chooseId.sync="speAddForm.suppId" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="invoAreaIdName" label="地区：">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="areaUrl"
                       :data="{data: {areaTypes:[4,5]}}"
                       :chooseName.sync="speAddForm.invoAreaName" class="fl"
                       :chooseId.sync="speAddForm.invoAreaId" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="busiRule" label="业务规则：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="speAddForm.busiRule" :disabled="true"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  export default {
    data () {
      return {
        areaUrl: this.apiPath.hrsc.findAreaList,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        speNameUrl: this.apiPath.hrsc.speDescDrop,
        speNoUrl: this.apiPath.hrsc.speDescInfoDrop,
        token: Cookie.get('Token'),
        speForm: {
          speName: '',
          invoAreaId: '',
          invoAreaIdName: ''
        },
        isA: true,
        speTableData: null,
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
        speAddFlag: false,
        alertTitle: '',
        speAddForm: {
          ruleEngineId: '',
          speName: '',
          speNo: '',
          speNoId: '',
          invoAreaId: '',
          invoAreaName: '',
          suppId: '',
          suppName: '',
          busiRule: ''
        },
        speAddDisFlag: false,
        speAddRules: {
          speName: [
            {required: true, message: '请选择特殊情况名称', trigger: 'change'}
          ],
          speNo: [
            {required: true, message: '请选择特殊情况编号', trigger: 'change'}
          ],
          suppName: [
            {required: true, message: '请选择受托供应商', trigger: 'change'}
          ],
          invoAreaName: [
            {required: true, message: '请选择地区', trigger: 'change'}
          ],
          busiRule: [
            {required: true, message: '请输入业务规则', trigger: 'change'}
          ]
        },
        btnText: ''
      };
    },
    created () {
      this.searchFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      contentChange (item) {
        this.speAddForm.busiRule = item.content;
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.speForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.listLocalStanSpeDescs, _data).then(res => {
          this.speTableData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      addFun () {
        this.speAddFlag = true;
        this.alertTitle = '新增特殊情况信息';
        this.btnText = '确 定';
        this.speAddDisFlag = false;
      },
      modifyFun (scope) {
        this.speAddFlag = true;
        this.alertTitle = '修改特殊情况信息';
        this.btnText = '修 改';
        let _this = this;
        _this.speAddDisFlag = true;
        api.post(this.apiPath.hrsc.getLocalStanSpeDesc, {speDescId: scope.speDescId}).then(res => {
          _this.speAddForm = res.data;
          let _data = JSON.parse(JSON.stringify(res.data));
          setTimeout(function () {
            _this.speAddForm.speNoId = _data.speNoId;
            _this.speAddForm.speNo = _data.speNo;
          }, 50);
        }).catch(err => {
          console.log(err);
        });
      },
      delFun (scope) {
        let _this = this;
        _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(_this.apiPath.hrsc.deleteLocalStanSpeDesc, {speDescId: scope.speDescId}).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
              return;
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      submitForm () {
        let _this = this;
        this.$refs['speAddForm'].validate((valid) => {
          if (valid) {
            if (_this.alertTitle === '新增特殊情况信息') {
              api.post(this.apiPath.hrsc.saveLocalStanSpeDesc, this.speAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.speAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(_this.apiPath.hrsc.updateLocalStanSpeDesc, _this.speAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.speAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      resetFun (formName) {
        this.$refs.speAddForm.resetFields();
      }
    }
  };
</script>
