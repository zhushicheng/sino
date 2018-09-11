<template>
  <div class="procreg">
    <sino-con>
      <sino-title type="levelOne" title="流程配置查询"></sino-title>
      <sino-form :model="confForm" ref="confForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">流程名称：</span>
              <sino-input class="fl" type="text" v-model="confForm.flowName"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">流程KEY：</span>
              <sino-input type="text" class="fl" v-model="confForm.key"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">状态：</span>
              <sino-select class="fl" :filterable="false"
                           :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="confForm.stateStr"
                           :chooseId.sync="confForm.state" :clear="true"
                           :data="{code: 'FLOW_DEP_STATE'}"
                           :url="dictSelUrl"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clearfix"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="flowName" label="流程名称"></sino-table-column>
          <sino-table-column prop="key" label="流程KEY"></sino-table-column>
          <sino-table-column label="流程版本号" align="center">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="versionFun(scope.row)">{{scope.row.version}}</span>
              </template>
            </template>
          </sino-table-column>
          <sino-table-column prop="stateStr" label="状态"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" width="220" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" v-if="scope.row.state !== 2" @click="publishFun(scope.row)">发布</span><i
                class="table-i" v-if="scope.row.state !== 2">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" v-if="scope.row.state !== 1 && scope.row.state !== 3"
                      @click="stopFun(scope.row)">停用</span>
                <!--<i v-if="scope.row.state !== 1 && scope.row.state !== 3" class="table-i">|</i>-->
                <span class="table-span" v-if="scope.row.state !== 2" @click="delFun(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
    <!--弹层 --查看详情-->
    <sino-dialog :visible.sync="seeItem" size="small">
      <sino-title slot="title" type="levelOne" title="查看系统消息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <input type="hidden" v-model="confSeeList.modelId">
          <li>
            <h6>流程名称</h6><input readonly v-model="confSeeList.flowName">
          </li>
          <li>
            <h6>流程KEY</h6><input readonly v-model="confSeeList.key">
          </li>
          <li>
            <h6>创建人</h6><input readonly v-model="confSeeList.creName">
          </li>
          <li>
            <h6>创建时间</h6><input readonly v-model="confSeeList.creTime">
          </li>
          <li>
            <h6>操作人</h6><input readonly v-model="confSeeList.operName">
          </li>
          <li>
            <h6>操作时间</h6><input readonly v-model="confSeeList.operTime">
          </li>
          <li class="li-last">
            <h6>描述</h6><input readonly v-model="confSeeList.describe">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
        <sino-button type="text" @click="seeNode">查看节点</sino-button>
      </span>
    </sino-dialog>
    <!--弹层 --查看版本信息-->
    <sino-dialog :visible.sync="seeVersion" class="batch-error procconf-label" v-on:close="resetFun('versionForm')">
      <sino-title slot="title" type="levelOne" title="查看版本信息" class="sino-dialog-title"></sino-title>
      <sino-form :model="versionForm" :rules="versionFormRule" ref="versionForm">
        <sino-form-item prop="versionName" label="选择查看版本号：" class="sino-form-item-width">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="versionForm.versionName"
                       :chooseId.sync="versionForm.versionId"
                       :clear="true"
                       :url="versionsUrl"
                       :data="modelData"
                       :linkage="true"
          ></sino-select>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="versionSubmit">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--弹层 --新增&&修改-->
    <sino-dialog :visible.sync="modifyAddFlag" class="sino-dialog-modify etyma-dialog" size="small"
                 v-on:close="resetFun('modifyAndAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="role-title-second">
        <sino-form :model="modifyAndAddForm" :rules="modifyAndAddFormRule" class="role-form-modify"
                   ref="modifyAndAddForm">
          <input type="hidden" v-model="modifyAndAddForm.modelId">
          <div class="rule-form-content">
            <ul class="rule-content-list">
              <li>
                <sino-form-item label="流程名称：" prop="flowName" class="role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.flowName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="流程KEY：" prop="key" class="role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.key"></sino-input>
                </sino-form-item>
              </li>
              <li style="width: 100%">
                <sino-form-item label="描述：" prop="describe" class="role-form-modify-item">
                  <sino-input type="textarea" class="" style="width: 532px;"
                              v-model="modifyAndAddForm.describe"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <sino-button class="alert-btn" type="primary" @click="submitFun">{{btnText}}</sino-button>
        <span class="button-right-ctrl" @click="updateNode">修改节点</span>
      </div>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';

  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        versionsUrl: this.apiPath.hrsc.versions,
        confForm: { // 搜索条件
          flowName: '',
          key: '',
          state: '',
          stateStr: ''
        },
        isA: true,
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
        seeItem: false, // 查看弹层控制显示
        localHref: window.location.href.split('#')[0],
        modifyAddFlag: false,
        modifyAndAddForm: {
          flowName: '',
          key: '',
          describe: '',
          modelId: ''
        },
        modifyAndAddFormRule: {
          flowName: [
            {required: true, message: '请输入流程名称', trigger: 'change'}
          ],
          key: [
            {required: true, message: '请输入流程KEY', trigger: 'change'}
          ]
        },
        seeVersion: false,
        versionForm: {
          versionName: '',
          versionId: ''
        },
        versionFormRule: {
          versionName: [
            {type: 'number', required: true, message: '请选择流程版本', trigger: 'change'}
          ]
        },
        btnText: '',
        confSeeList: {
          flowName: '',
          key: '',
          describe: '',
          creName: '',
          creTime: '',
          operName: '',
          operTime: '',
          modelId: ''
        },
        modelData: {
          modelId: ''
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
        let data = {
          data: this.confForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.conList, data).then(res => {
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
      addFun () {
        this.alertTitle = '发布新流程';
        this.modifyAddFlag = true;
        this.btnText = '确 定';
      },
      seeFun (value) {
        api.post(this.apiPath.hrsc.conGetById, {modelId: value.modelId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = true;
            this.confSeeList = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      publishFun (val) {
        this.$confirm('您确认发布这条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.conDeployment, {modelId: val.modelId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '发布成功！', type: 'success'});
            }
          }).catch(err => {
          });
        });
      },
      modifyFun (value) {
        this.alertTitle = '修改流程';
        this.modifyAddFlag = true;
        this.btnText = '修 改';
        api.post(this.apiPath.hrsc.conGetById, {modelId: value.modelId}).then(res => {
          this.modifyAndAddForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      delFun (val) {
        this.$confirm('您确认删除这条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.conDelete, {modelId: val.modelId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      stopFun (val) {
        this.$confirm('您确认停用这条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.conDisable, {modelId: val.modelId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '停用成功！', type: 'success'});
            }
          }).catch(err => {
          });
        });
      },
      submitFun () {
        let _this = this;
        _this.$refs.modifyAndAddForm.validate((valid) => {
          if (valid) {
            if (_this.alertTitle === '发布新流程') {
              api.post(_this.apiPath.hrsc.conInsert, _this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.modifyAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(_this.apiPath.hrsc.conUpdate, _this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.modifyAddFlag = false;
                  _this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
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
      // 查看版本
      versionFun (data) {
        this.seeVersion = true;
        let t = this;
        setTimeout(function () {
          t.modelData.modelId = JSON.parse(data.modelId);
        }, 100);
      },
      versionSubmit () {
        this.$refs.versionForm.validate((valid) => {
          if (valid) {
            api.postsign(this.apiPath.hrsc.previewflow, this.versionForm.versionId).then(res => {
              if (res.code === 'CPYY-00001') {
                this.seeVersion = false;
                window.open(res.data);
              }
            }).catch(err => {
            });
          }
        });
      },
      // 查看节点
      seeNode () {
        api.postsign(this.apiPath.hrsc.previewflow, this.confSeeList.modelId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = false;
            window.open(res.data);
          }
        }).catch(err => {
        });
      },
      // 修改节点
      updateNode () {
        window.open(this.apiPath.WORKFLOW_URI + '?modelId=' + this.modifyAndAddForm.modelId);
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
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
