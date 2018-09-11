<template>
  <!--材料配置管理-->
  <div class="invinfo">
    <!--查询-->
    <sino-con>
      <sino-title type="levelOne" title="材料配置查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one search-inner-width">
              <span class="search-inner-name">材料用途：</span>
              <sino-select class="fl sino-select-group"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :disabled="false"
                           :isGroup="false"
                           :data="{code: 'MAT_CONF_USE'}"
                           :chooseName.sync="searchForm.confUseName"
                           :chooseId.sync="searchForm.confUse"
                           :clear="true" :url="getDictSelectBox">
              </sino-select>
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

    <!--数据展示-->
    <div class="emp-info-page mt15">
      <div class="sino-table-icon">
        <sino-button type="icon-text" @click="clickFun"><i class="iconfont sino-add"></i>新增</sino-button>
      </div>
      <div class="local-info">
        <div class="emp-link-card emp-list-hei" v-for="(item, index) in queryData" :key="index">
          <div class="emp-link-card-title title-border-none tit-flex">
            <div class="title-right fl">
              <span class="color-world fl"><i class="title-line"></i>材料用途</span>
              <span class="fl">{{item.confUseName}}</span>
            </div>
            <div class="fl area-left">
              <span class="color-world fl">{{item.dimenName}}</span>
                <ul style=" margin-top: 0px;margin-left: 37px;width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  <li style="display: inline-block" v-for="(item1, index) in item.matDimenValueConfs" :key="item1">{{item1.dimenValueName}}<i v-if="index !== item.matDimenValueConfs.length-1">、</i></li>
                </ul>
            </div>
            <div>
              <div class="fr bor-left" @click="item.show = !item.show">
                <span class="color-line">|</span>
                <i class="iconfont " :class="{'sino-shuangjiantou-copy':!item.show,'sino-angle-double-up':item.show}" ></i>
                <sino-button class="fr" type="icon-text" v-if="!item.show">展开</sino-button>
                <sino-button class="fr" type="icon-text" v-if="item.show">收起</sino-button>
              </div>
              <sino-button class="fr" type="icon-text" @click="delDataFun(item.dimenConfId)"><i class="iconfont sino-shanchu1"></i>删除</sino-button>
              <sino-button class="fr" type="icon-text" @click="changeFun(item)"><i class="iconfont sino-modify"></i>修改</sino-button>
            </div>
          </div>
          <sino-collapse-transition>
            <div class="data-style" v-show="item.show">
              <span class="color-world fl">所需材料</span>
              <ul class="clearfix fl ul-style">
                <li v-for="(item2, index) in item.matConfs" :key="index">
                  <span>{{index + 1}}、{{item2.matName}}<i v-if="item2.matRemark">&nbsp;—&nbsp;</i>{{item2.matRemark}}</span>
                </li>
              </ul>
            </div>
          </sino-collapse-transition>
        </div>
      </div>
      <sino-page
        class="page-style"
        v-bind:page="dataPage.pageNum"
        v-bind:page-size="dataPage.pageSize"
        v-on:pagehandler="pageHandlerB"
        :pageArray="dataPage.pageArray"
        v-on:choosePageFun="choooseNumB"
        v-bind:object="object"
        :total="dataPage.total">
      </sino-page>
      <div class="clear"></div>
    </div>

    <!--新增/修改材料配置弹层;-->
    <sino-dialog :visible.sync="matConFalg" top="5%" size="samll" @close="matResFieFun('matConForm')"  class="usermanage dialog-com-tree-look-box">
      <sino-title slot="title" type="levelOne" :title="conTitle === true ? '新增材料配置' : '修改材料配置'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1 clearfix">
        <sino-form :model="matConForm" :rules="matConFormRules" ref="matConForm" class="clearfix">
          <sino-form-item label="材料用途：" prop="confUseName">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'MAT_CONF_USE'}"
                         :url="getDictSelectBox"
                         :chooseName.sync="matConForm.confUseName"
                         :chooseId.sync="matConForm.confUse"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="维度：" prop="dimenName">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'MAT_CONF_DIMEN'}"
                         :url="getDictSelectBox"
                         :chooseName.sync="matConForm.dimenName"
                         :chooseId.sync="matConForm.dimen"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="维度值：" prop="dimenValuesName" class="sino-form-item-width">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="true"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :data="{data: {busiAreaTypes: [1]}}"
                         :url="findAreaListByBusiAreaType"
                         :chooseName.sync="matConForm.dimenValuesName"
                         :chooseId.sync="matConForm.dimenValues"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-title type="levelTwo" title="所需材料" :style="{'overflow':'hidden'}">
            <div class="fr req-mat-title">
              <sino-button type="icon-text" @click="matConFun"><i class="iconfont sino-add"></i>新增材料</sino-button>
            </div>
          </sino-title>
          <div class="req-mat-data">
            <table class="table-style">
              <tr>
                <th class="ser-num">序号</th>
                <th class="mat-name">材料名称</th>
                <th class="remarks">备注</th>
                <th class="operating">操作</th>
              </tr>
              <tr v-for="(item, index) in needMatData" :key="index">
                <td class="td-left" :class="{'td-top':index !== 0}">{{index + 1}}</td>
                <td class="td-left" :class="{'td-top':index !== 0}">
                  <sino-select class="fl td-sino-select"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="matInfoSelectBox"
                               :chooseName.sync="item.matName"
                               :chooseId.sync="item.matId"
                               :clear="true" >
                  </sino-select>
                </td>
                <td class="td-left" :class="{'td-top':index !== 0}">
                  <sino-input type="text" v-model="item.matRemark" :disabled="false"></sino-input>
                </td>
                <td class="td-reset" :class="{'td-top':index !== 0}" @click="tabResetFun(index)">{{index === 0? '重置':'删除'}}</td>
              </tr>
            </table>
            <div class="table-added">
              <sino-button type="text" @click="addTabFun" style="display: inline-block">新增</sino-button>
            </div>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="newMatConFun">确 定</sino-button>
      </span>
    </sino-dialog>

    <!--新增材料-->
    <sino-dialog :visible.sync="matAddFalg" v-on:close="matResFieFun('matAddDataForm')" size="samll" class="see-dirc usermanage adddimreason-dialog">
      <sino-title slot="title" type="levelOne" title="新增材料" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="matAddDataForm" ref="matAddDataForm" :rules="matAddDataFormRules"  class="demo-ruleForm">
          <sino-form-item label="材料名称：" class="adddimreason-from-item clearfix mat-name-err" v-for="(item, index) in this.matAddDataForm.matAddForm" prop="matAddForm" :key="index">
            <sino-input v-model="item.matName"></sino-input>
            <div class="ml15 fl" @click="operatingFun(index)"><span class="adddimreason reset-style">{{index === 0? '重置':'删除'}}</span></div>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer">
        <sino-button @click="addFileFun()">新增材料</sino-button>
        <sino-button class="ml10" type="primary" @click="matAddFun()">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../api';

  export default {
    data () {
      return {
        matInfoSelectBox: this.apiPath.hrsc.matInfoSelectBox, // 材料名称下拉框
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,  // 字典下拉框
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,  // 维度值，多选
        // 查询条件
        searchForm: {
          confUse: null,
          confUseName: ''
        },
        show: true, // 材料用途--->展开收起
        // 数据翻页
        dataPage: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null
        },
        // 数据配置
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        matConFalg: false, // 新增材料配置弹层--->显示与消失
        // 新增材料配置弹层 ---> 三个下拉框
        matConForm: {
          dimenValuesName: [],
          dimenValues: [],
          confUseName: null,
          confUse: null,
          dimenName: null,
          dimen: null
        }, // 新增材料配置弹层---->数据
        matConFormRules: {
          confUseName: [
            {required: true, message: '请选择材料用途', trigger: 'change'}
          ],
          dimenName: [
            {required: true, message: '请选择维度', trigger: 'change'}
          ],
          dimenValuesName: [
            {required: true, message: '请选择维度值', trigger: 'change', type: 'array'}
          ]
        }, // 新增材料弹层---->校验
        matAddDataFormRules: {
          matAddForm: [
            {required: true, message: '请输入材料名称', trigger: 'change', type: 'array'}
          ]
        },
        // 新增材料配置弹层---->表格
        needMatData: [
          {matId: null, matRemark: '', matName: ''}
        ],
        options: [],  // 新增材料配置弹层--->材料名称下拉框
        matAddFalg: false, // 新增材料弹层--->显示与消失
        // 新增材料弹层数据
        matAddDataForm: {
          matAddForm: [
            {matName: ''}
          ]
        },
        conTitle: false,   // 控制材料配置弹层是新增还是修改
        queryData: [],  //  查询的数据
        matConfs: [], // // 新增材料配置弹层--->表格数据
        systemSummerInvSub: []
      };
    },
    created () {
      this.matNameFun();
      this.searchFun();
    },
    methods: {
      // 新增材料弹层 ---> 重置/删除
      operatingFun (id) {
        if (id === 0) {
          this.matAddDataForm.matAddForm[id].matName = null;
        } else {
          this.matAddDataForm.matAddForm.splice(id, 1);
        }
      },
      // 重置
      tabResetFun (id) {
        if (id === 0) {
          for (var key in this.needMatData[id]) {
            this.needMatData[id][key] = null;
          }
        } else {
          this.needMatData.splice(id, 1);
        }
      },
      // 增加表格
      addTabFun () {
        let obj = {
          matId: null,
          matRemark: '',
          matName: ''
        };
        this.needMatData.push(obj);
      },
      // 新增材料配置弹层--->确定
      newMatConFun () {
        this.$refs.matConForm.validate((valid) => {
          if (valid) {
            this.matConForm.matConfs = this.needMatData;
            if (this.conTitle === true) {
              api.post(this.apiPath.hrsc.addMatConf, this.matConForm).then(res => {
                let _this = this;
                if (res.code === 'CPYY-00001') {
                  _this.matConFalg = false;
                  _this.$message({message: '添加成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(this.apiPath.hrsc.updateConfByDimenId, this.matConForm).then(res => {
                let _this = this;
                if (res.code === 'CPYY-00001') {
                  _this.matConFalg = false;
                  _this.$message({message: '修改成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 材料名称下拉框
      matNameFun () {
        api.post(this.apiPath.hrsc.matInfoSelectBox, {}).then(res => {
          let _this = this;
          if (res.code === 'CPYY-00001') {
            _this.options = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增材料弹层-->新增材料按钮
      addFileFun () {
        let mn = {matName: ''};
        this.matAddDataForm.matAddForm.push(mn);
      },
      // 最上面的查询
      searchFun () {
        this.gitList(this.dataPage.pageNum, this.dataPage.pageSize);
      },
      gitList (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            confUse: this.searchForm.confUse
          }
        };
        api.post(this.apiPath.hrsc.findAllMatConfs, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.queryData = res.data.list;
            this.dataPage.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增
      clickFun () {
        this.matConFalg = true;
        this.conTitle = true;
        this.matConForm = {
          dimenValuesName: [],
          dimenValues: [],
          confUseName: null,
          confUse: null,
          dimenName: null,
          dimen: null
        };
        this.needMatData = [
          {matId: null, matRemark: '', matName: ''}
        ];
      },
      // 改变当前页
      pageHandlerB: function (page) {
        this.dataPage.pageNum = page;
        this.gitList(page, this.dataPage.pageSize);
      },
      // 改变分页显示条数;
      choooseNumB: function (pageSize) {
        this.dataPage.pageSize = pageSize;
        this.gitList(1, pageSize);
      },
      // 新增材料配置弹层---->重置；
      reset (data) {},
      // 新增材料配置弹层---->新增材料；
      matConFun () {
        this.matAddFalg = true;
        this.matAddDataForm.matAddForm = [
          {matName: ''}
        ];
      },
      matResFieFun (from) {
        this.$refs[from].resetFields();
      },
      // 新增材料弹层---->确定；
      matAddFun () {
        this.$refs.matAddDataForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.addMatInfos, {matInfos: this.matAddDataForm.matAddForm}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.matAddFalg = false;
                this.$message({message: '添加成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 修改
      changeFun (data) {
        this.matConFalg = true;
        this.conTitle = false;
        let arr1 = [];
        let arr2 = [];
        for (let key in data) {
          for (let key1 in this.matConForm) {
            this.matConForm[key1] = data[key1];
          }
        }
        for (let item of data.matDimenValueConfs) {
          arr1.push(item.dimenValueName);
          arr2.push(item.dimenValue);
        }
        this.matConForm.dimenValuesName = arr1;
        this.matConForm.dimenValues = arr2;
        this.needMatData = data.matConfs;
        this.matConForm.dimenConfId = data.dimenConfId;
      },
      // 删除
      delDataFun (id) {
        this.$alert('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            api.postsign(this.apiPath.hrsc.deleteByDimenId, id).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
