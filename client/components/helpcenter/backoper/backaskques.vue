<template>
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">常见问题</div>
          <div class="sino-tabs-item" @click="prodScheFun('second')">学习资料</div>
          <div class="sino-tabs-item" @click="prodScheFun('third')">联系管理员</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="backAskForm" ref="backAskForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">问题：</span>
              <sino-input class="fl" type="text"
                          v-model="backAskForm.questionDesc"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">解决办法：</span>
              <sino-input type="text" class="fl"
                          v-model="backAskForm.solveDesc"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">是否有效：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="backAskForm.isEffectName"
                           :chooseId.sync="backAskForm.isEffect"
                           :clear="true"
                           :url="dictSelUrl"
                           :data="{code: 'IS_EFFECT'}"></sino-select>
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
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="questionDesc" label="问题"></sino-table-column>
          <sino-table-column prop="solveDesc" label="解决办法"></sino-table-column>
          <sino-table-column prop="isEffectName" label="状态"></sino-table-column>
          <sino-table-column prop="publishName" label="发布人"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" fixed="right" width="140">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i v-if="scope.row.isEffect !== 0" class="table-i">|</i>
                <span v-if="scope.row.isEffect !== 0" class="table-span" @click="delFun(scope.row)">失效</span>
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
    <!--新增-->
    <sino-dialog :visible.sync="backAskAddFlag" size="large" :top="'10%'" class="dialog-height" v-on:close="resetFun('backAskAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="backAskAddForm" :rules="backAskAddRules" ref="backAskAddForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="questionDesc" label="问题：" class="sino-form-item-width">
          <sino-input type="text" v-model="backAskAddForm.questionDesc"></sino-input>
        </sino-form-item>
        <sino-form-item prop="solveDesc" label="解决方法：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="backAskAddForm.solveDesc"></sino-input>
        </sino-form-item>
        <sino-form-item label="发布人：" prop="publishName">
          <sino-input v-model="backAskAddForm.publishName"></sino-input>
        </sino-form-item>
        <sino-form-item label="状态：" prop="sex">
          <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in isEffectlist" :key="index"
                        v-model="backAskAddForm.isEffect"
                        :label="item.id" :disabled="false">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnName}}</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看 -->
    <sino-dialog :visible.sync="backAskSeeFlag" class="dialog-height">
      <sino-title slot="title" type="levelOne" title="用户信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>问题</h6><input readonly v-model="backAskSeeList.questionDesc">
          </li>
          <li class="li-last">
            <h6>解决办法</h6><input readonly v-model="backAskSeeList.solveDesc">
          </li>
          <li>
            <h6>发布人</h6><input readonly v-model="backAskSeeList.publishName">
          </li>
          <li>
            <h6>发布时间</h6><input readonly v-model="backAskSeeList.creTime">
          </li>
          <li class="li-last">
            <h6>状态</h6><input readonly v-model="backAskSeeList.isEffectName">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="backAskSeeFlag=false">确 定</sino-button>
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
        backAskForm: {
          isEffect: '',
          isEffectName: '',
          questionDesc: '',
          solveDesc: ''
        },
        isEffectlist: [],
        tableData: null,
        object: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        total: null,
        pageSize: 10,
        pageArray: [10, 20, 30, 40],
        alertTitle: '',
        btnName: '',
        backAskAddFlag: false,
        backAskAddForm: {
          questionDesc: '',
          solveDesc: '',
          isEffect: '',
          publishName: ''
        },
        backAskAddRules: {
          questionDesc: [
            {required: true, message: '请输入问题名称', trigger: 'change'}
          ],
          solveDesc: [
            {required: true, message: '请输入解决办法', trigger: 'change'}
          ],
          publishName: [
            {required: true, message: '请输入发布人', trigger: 'change'}
          ]
        },
        backAskSeeFlag: false,
        backAskSeeList: {
          questionDesc: '',
          solveDesc: '',
          publishName: '',
          creTime: '',
          isEffect: ''
        }
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'IS_EFFECT'}).then(res => {
        this.isEffectlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'second') {
          this.$router.push({path: '/backLearnData'});
        } else if (order === 'third') {
          this.$router.push({path: '/backContAdmin'});
        }
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.backAskForm
        };
        api.post(this.apiPath.hrsc.findallquestion, _data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      addFun () {
        this.backAskAddFlag = true;
        this.alertTitle = '新增常见问题';
        this.btnName = '确 定';
      },
      seeFun (scope) {
        this.backAskSeeFlag = true;
        api.post(this.apiPath.hrsc.findbyidquestion, scope).then(res => {
          this.backAskSeeList = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      modifyFun (scope) {
        this.backAskAddFlag = true;
        this.alertTitle = '修改常见问题';
        this.btnName = '修 改';
        api.post(this.apiPath.hrsc.findbyidquestion, scope).then(res => {
          this.backAskAddForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      delFun (scope) {
        let _this = this;
        this.$confirm('确定将该条信息置为失效吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(_this.apiPath.hrsc.deletequestion, scope).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.searchFun();
              this.$message({message: '失效成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('失效失败!');
        });
      },
      submitForm () {
        let _this = this;
        _this.$refs.backAskAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增常见问题') {
              api.post(_this.apiPath.hrsc.addquestion, _this.backAskAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.backAskAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(_this.apiPath.hrsc.updatehelpquestion, _this.backAskAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.backAskAddFlag = false;
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
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
