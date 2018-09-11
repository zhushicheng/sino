<template>
  <div class="funMange">
    <div class="fun-content">
      <sino-title type="levelOne" title="机构管理"></sino-title>
      <div class="fun-tree-linkBox org-tree-linkBox">
        <div class="org-tree-container">
          <p class="org-tree-linkBox-title">
            <sino-button type="icon-text" @click="dialogLayerTreeFun('','company')"><i class="iconfont sino-floor"></i>调整公司层级
            </sino-button>
          </p>
          <sino-tree :data="leftCompTreeData" show-checkbox node-key="id"
                     :default-expanded-keys="leftexpandedkeys"
                     :props="defaultProps"
                     v-on:ascNode="leftAscNode"
                     ref="leftTree"
                     @node-expand="leftNodeExpand"
                     @node-collapse="leftNodeCollapse"
                     check-strictly
                     @current-change = "leftCheckChangeFun"
                     class="org-tree-content"
                     @check-change = "checkedChange"
          ></sino-tree>
        </div>
        <sino-link-container :outBoxStyle="outBoxStyle" :innerBoxStyle="innerBoxStyle" :triangleStyle="triangleStyle" class="fun-link-content">
          <div class="fun-link-content-box">
            <div class="fun-link-content-box-table-icon">
              <sino-button type="icon-text" @click="dialogLayerTreeFun('','organization')"><i class="iconfont sino-org"></i>调整机构层级
              </sino-button>
            </div>
            <sino-tree :data="rightOrgTreeData"  show-checkbox
                       node-key="id"
                       :default-expanded-keys="rightexpandedkeys"
                       :props="defaultProps"
                       v-on:ascNode="rightAscNode"
                       ref="rightTree"
                       @node-expand="rightNodeExpand"
                       @node-collapse="rightNodeCollapse"
                       @current-change = "rightCheckChangeFun"
                       check-strictly
            ></sino-tree>
          </div>
        </sino-link-container>
        <!--调整公司层级弹层&& 调整机构层级 (顶部点击)-->
        <sino-dialog :title="dialogAdjustTitle" :visible.sync ="dialogAdjustLelve"  dialogHide :show-close="true" :lock-scroll="false" class="adjust-company-dialog no-minheight" @close="closeLayerF">
          <sino-tree :data="treeLevData" show-checkbox
                     :showTreeHover="false"
                     node-key="id"
                     ref="layerTree"
                     :props="defaultProps"
                     check-strictly
                     class="adjust-company-dialog-button-cancel"
                     @current-change = "layerCheckChangeFun"
          >
          </sino-tree>
          <span slot="footer" class="dialog-footer">
            <sino-button class="tree-button-cancel" type="primary"  @click="dialogAdjustLelveFun">确 定</sino-button>
          </span>
        </sino-dialog>
        <!--左侧树=》查看弹层-->
        <sino-dialog :visible.sync ="dialogComTreeLook"  :show-close="true" :lock-scroll="true" class="dialog-com-tree-look-box">
          <sino-title slot="title" type="levelOne" title="公司信息"></sino-title>
          <div class="dialog-com-tree-look-box-table">
            <ul class="dialog-com-tree-look-ul">
              <li>
                <span class="look-title">公司全称</span>
                <span class="look-text" v-text="corpForm.fullName"></span>
              </li>
              <li>
                <span class="look-title">公司简称</span>
                <span class="look-text" v-text="corpForm.shortName"></span>
              </li>
              <li>
                <span class="look-title">公司编码</span>
                <span class="look-text" v-text="corpForm.corpCode"></span>
              </li>
              <li>
                <span class="look-title">公司网址</span>
                <span class="look-text" v-text="corpForm.website"></span>
              </li>
              <li>
                <span class="look-title">公司类型</span>
                <span class="look-text" v-text="corpForm.corpTypeName"></span>
              </li>
              <li>
                <span class="look-title">邮政编码</span>
                <span class="look-text" v-text="corpForm.postCode"></span>
              </li>
              <li class="look-high-li-two">
                <ul>
                  <li>
                    <span class="look-title">显示顺序</span>
                    <span class="look-text" v-text="corpForm.showSort"></span>
                  </li>
                  <li>
                    <span class="look-title">注册地区</span>
                    <span class="look-text"> {{corpForm.regAreaName}} {{corpForm.regSecAreaName}}</span>
                  </li>
                </ul>
              </li>
              <li class="look-high-li-one">
                <span class="look-title">公司logo</span>
                <span class="look-text" v-text="corpForm.logo"></span>
              </li>
              <li class="look-long-ul">
                <span class="look-title">注册地址</span>
                <span class="look-text" v-text="corpForm.regAddr"></span>
              </li>
              <li class="look-long-ul">
                <span class="look-title">描述</span>
                <span class="look-text" v-text="corpForm.corpDesc"></span>
              </li>
              <li class="look-long-ul">
                <span class="look-title">备注</span>
                <span class="look-text" v-text="corpForm.remark"></span>
              </li>
            </ul>
          </div>

          <span slot="footer" class="dialog-footer">
            <sino-button class="tree-button-cancel" type="primary"  @click="dialogComTreeLook = false">确 定</sino-button>
          </span>
        </sino-dialog>
        <!--左侧树=>树添加及修改弹层-->
        <sino-dialog :visible.sync ="leftTreeCompileDiaVisible" :show-close="true" :lock-scroll="false" class="dialog-com-tree-look-box dialog-com-tree-add-box" @close="DiaCloseCorFormReset">
          <sino-title slot="title" type="levelOne" :title="leftTreeCompileTitle"></sino-title>
          <sino-form :model="companyForm" :rules="companyRules" ref="corForm">
            <sino-form-item label="公司全称：" prop="fullName" class="long-sino-item">
              <sino-input v-model="companyForm.fullName" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="公司简称：" prop="shortName" class="long-sino-item">
              <sino-input v-model="companyForm.shortName" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="公司编码：" prop="corpCode" class="short-sino-item">
              <sino-input v-model="companyForm.corpCode"></sino-input>
            </sino-form-item>
            <sino-form-item label="公司logo：" prop="logo" class="short-sino-item">
              <sino-upload :action="uploadUrl" ref="leftTreeUpload"
                :data="uploadData"
                :headers="uploadHeader"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="getFileName"
                :on-success="fileSuccess"
                :on-error="fileError">
                <div slot="trigger">
                  <input class="uploadFileBox" type="text" v-model="companyForm.logo" readonly="true"/>
                  <div class="chooseFileButton chooseFileButton1">选择</div>
                </div>
              </sino-upload>
            </sino-form-item>
            <sino-form-item label="公司类型：" prop="corpTypeName" class="short-sino-item">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="companyForm.corpTypeName" :chooseId.sync="companyForm.corpType" :clear="true" :url="dicSelUrl" :data="{code:'CORP_TYPE'}"></sino-select>
            </sino-form-item>
            <sino-form-item label="公司网址：" prop="website" class="short-sino-item">
              <sino-input v-model="companyForm.website"></sino-input>
            </sino-form-item>
            <sino-form-item label="邮政编码：" prop="postCode" class="short-sino-item">
              <sino-input v-model="companyForm.postCode"></sino-input>
            </sino-form-item>
            <sino-form-item class="short-sino-item">
            </sino-form-item>
            <sino-form-item label="注册地区：" prop="regAreaName" class="short-sino-item">
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="companyForm.regAreaName"
                           :chooseId.sync="companyForm.regAreaId"
                           :clear="true"
                           :url="addressUrl"
                           :data="{data:{level:2}}"
                           @change="changeProvince">
              </sino-select>
            </sino-form-item>
            <sino-form-item prop="regSecAreaName" class="short-sino-item">
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="companyForm.regSecAreaName"
                           :chooseId.sync="companyForm.regSecAreaId"
                           :clear="true" style="margin-left:20px;"
                           :linkage="true"
                           :url="addressUrl"
                           :data="cityData"></sino-select>
            </sino-form-item>
            <sino-form-item label="注册地址：" prop="regAddr" class="long-sino-item">
              <sino-input v-model="companyForm.regAddr" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="描述：" prop="corpDesc" class="long-sino-item">
              <sino-input v-model="companyForm.corpDesc" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="备注：" prop="remark" class="long-sino-item">
              <sino-input v-model="companyForm.remark" class="long-sino-input"></sino-input>
            </sino-form-item>
          </sino-form>
          <span slot="footer" class="dialog-footer long-sino-item">
            <sino-button  @click="submitCompanyForm('corForm',leftTreeCompileTitle)" class="tree-button-cancel" type="primary" >确 定</sino-button>
          </span>
        </sino-dialog>
        <!--右侧树=》查看弹层-->
        <sino-dialog title="机构信息" :visible.sync ="dialogOrgTreeLook"  :show-close="true" :lock-scroll="true" class="dialog-com-tree-look-box">
          <div class="dialog-com-tree-look-box-table">
            <ul class="dialog-com-tree-look-ul">
              <li>
                <span class="look-title">机构名称</span>
                <span class="look-text" v-text="orgLayerForm.fullName"></span>
              </li>
              <li>
                <span class="look-title">机构简称</span>
                <span class="look-text" v-text="orgLayerForm.shortName"></span>
              </li>
              <li>
                <span class="look-title">机构类型</span>
                <span class="look-text" v-text="orgLayerForm.orgTypeName"></span>
              </li>
              <li>
                <span class="look-title">机构代码</span>
                <span class="look-text" v-text="orgLayerForm.orgCode"></span>
              </li>
              <li>
                <span class="look-title">显示排序</span>
                <span class="look-text" v-text="orgLayerForm.showSort"></span>
              </li>
              <li>
                <span class="look-title">邮政编码</span>
                <span class="look-text" v-text="orgLayerForm.postCode"></span>
              </li>
              <li class="look-long-ul">
                <span class="look-title">地址</span>
                <span class="look-text" v-text="orgLayerForm.addr"></span>
              </li>
              <li class="look-long-ul">
                <span class="look-title">描述</span>
                <span class="look-text" v-text="orgLayerForm.orgDesc"></span>
              </li>
              <li class="look-long-ul">
                <span class="look-title">备注</span>
                <span class="look-text" v-text="orgLayerForm.remark"></span>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <sino-button class="tree-button-cancel" type="primary"  @click="dialogOrgTreeLook = false">确 定</sino-button>
          </span>
        </sino-dialog>
        <!--右侧树=>树添加及修改弹层-->
        <sino-dialog :title="rightTreeCompileTitle" :visible.sync ="rightTreeCompileDiaVisible" :show-close="true" :lock-scroll="false" class="dialog-com-tree-look-box dialog-com-tree-add-box" @close="DiaCloseOrgFormReset">
          <sino-form :model="orgForm" :rules="orgRules" ref="orgForm">
            <sino-form-item label="机构名称：" prop="fullName" class="long-sino-item">
              <sino-input v-model="orgForm.fullName" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="机构简称：" prop="shortName" class="long-sino-item">
              <sino-input v-model="orgForm.shortName" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="机构类型：" prop="orgTypeName" class="short-sino-item">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="orgForm.orgTypeName" :chooseId.sync="orgForm.orgType" :clear="true" :url="dicSelUrl" :data="{code:'ORG_TYPE'}"></sino-select>
            </sino-form-item>
            <sino-form-item label="机构代码：" prop="orgCode" class="short-sino-item">
              <sino-input v-model="orgForm.orgCode"></sino-input>
            </sino-form-item>
            <sino-form-item label="邮政编码：" prop="postCode" class="short-sino-item">
              <sino-input v-model="orgForm.postCode"></sino-input>
            </sino-form-item>
            <sino-form-item label="地址：" prop="addr">
              <sino-input v-model="orgForm.addr" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="描述：" prop="orgDesc">
              <sino-input v-model="orgForm.orgDesc" class="long-sino-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="备注：" prop="remark">
              <sino-input v-model="orgForm.remark" class="long-sino-input"></sino-input>
            </sino-form-item>
          </sino-form>
          <span slot="footer" class="dialog-footer long-sino-item">
            <sino-button  type="primary" @click="submitOrgForm('orgForm',rightTreeCompileTitle)">{{rightTreeCompileButton}}</sino-button>
          </span>
        </sino-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  let LEFTCHECKKEYS;
  let LEFTCHECKEDFLAG = false;
  let RIGHTCHECKKEYS;
  let RIGHTCHECKEDFLAG = false;
  function offset (curEle) {
    var disTop = curEle.offsetTop;
    var par = curEle.offsetParent;
    while (par) {
      disTop += par.offsetTop;
      par = par.offsetParent;
    }
    return disTop;
  }
  export default {
    data: function () {
      return {
        uploadUrl: '',
        dicSelUrl: this.apiPath.hrsc.getDictSelectBox,
        addressUrl: this.apiPath.hrsc.findAreaList,
        cityData: {},
        uploadData: {
          parentId: '',
          fullName: '',
          shortName: '',
          corpCode: '',
          logo: '',
          corpType: '',
          website: '',
          postCode: '',
          regAreaId: '',
          regSecAreaId: '',
          regAddr: '',
          corpDesc: '',
          remark: ''
        },
        uploadHeader: {Token: ""},
// ========联动容器设置=============
        outBoxStyle: {
          width: '50%',
          float: 'left'
        },
        innerBoxStyle: {
          height: '100%',
          boxSizing: 'border-box',
          marginLeft: '10px'
        },
        triangleStyle: {
          display: 'none',
          top: 0
        },
// ============调整公司层级弹层===================
        dialogAdjustLelve: false,
        dialogAdjustTitle: '调整公司',
        // 查看机构对应用户弹层
        dialogOrgCorrUser: false,
        // 查看机构对应用户弹层=》表格分页
        page: { // 分页数据
          pageNo: 1,
          pageSize: 5,
          pageArray: [10, 20, 30, 50]
        },
        object: { // 表格配置
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        total: 100, // 分页总条数
// ======查看机构对应用户弹层=》表格数据=======
        tableData: [
          {
            userName: '北京外企服务总公司',
            roleName: '北京外国企业人力资源管理单位'
          }, {
            userName: '贵州外企服务总公司',
            roleName: '贵州外国企业人力资源管理单位'
          }
        ],
// =======右侧树查看dialog========
        dialogOrgTreeLook: false,
// =======公司树=》查看弹层=======
        dialogComTreeLook: false,
        corpForm: {},
// =======左侧公司树=》添加及修改弹层=======
        leftTreeCompileDiaVisible: false,
        leftTreeCompileTitle: '新增信息',
        leftTreeCompileButton: '',
        companyForm: {
          fullName: '',
          shortName: '',
          corpCode: '',
          logo: '',
          corpTypeName: '',
          corpType: '',
          website: '',
          postCode: '',
          regAreaName: '',
          regAreaId: '',
          regSecAreaName: '',
          regSecAreaId: '',
          regAddr: '',
          corpDesc: '',
          remark: ''
        },
        companyRules: {
          fullName: [
            {required: true, message: '公司名称为必填项', trigger: 'blur'}
          ],
          shortName: [
            {required: true, message: '公司简称为必填项', trigger: 'blur'}
          ],
          corpCode: [
            {required: true, message: '公司编码为必填项', trigger: 'blur'}
          ],
          corpTypeName: [
            {required: true, message: '公司类型为必填项', trigger: 'change'}
          ]
        },
        leftexpandedkeys: [],
// =======右侧机构树=》添加及修改弹层=======
        rightTreeCompileDiaVisible: false,
        rightTreeCompileTitle: '新增信息',
        rightTreeCompileButton: '',
        orgForm: {
          fullName: '',
          shortName: '',
          orgTypeName: '',
          orgType: '',
          orgCode: '',
          postCode: '',
          addr: '',
          orgDesc: '',
          remark: ''
        },
        orgRules: {
          fullName: [
            {required: true, message: '机构名称为必填项', trigger: 'blur'}
          ],
          shortName: [
            {required: true, message: '机构简称为必填项', trigger: 'blur'}
          ],
          orgTypeName: [
            {required: true, message: '请选择机构类型', trigger: 'blur'}
          ],
          orgCode: [
            {required: true, message: '请选择机构代码', trigger: 'blur'}
          ]
        },
        orgLayerForm: {},
        rightexpandedkeys: [],
        creatObj: {
          label: '',
          url: '',
          type: '',
          typeId: '',
          icon: '',
          desc: '',
          id: ''
        },
        name1: '',
        id1: '',
        list: [],
        radio: '',
        leftCompTreeData: [],
        rightOrgTreeData: [],
        treeLevData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    watch: {
      dialogTableVisible (val) {
        if (!val) {
          this.creatObj = {
            label: '',
            url: '',
            type: '',
            typeId: '',
            icon: '',
            desc: ''
          };
        }
      }
    },
    updated: function () {
      if (LEFTCHECKEDFLAG) {
        this.$refs.leftTree.setCheckedKeys(LEFTCHECKKEYS);
        this.$nextTick(function () {
          if (this.$refs.leftTree.getCheckedKeys()) {
            this.triangleStyle.display = 'block';
            this.triangleStyle.top = (offset(document.getElementsByClassName('is-checked')[0]) - offset(document.getElementsByClassName('sino-link-container')[0])) + 'px';
          } else {
            this.triangleStyle.display = 'none';
          }
        });
        LEFTCHECKEDFLAG = false;
      }
      if (RIGHTCHECKEDFLAG) {
        this.$refs.rightTree.setCheckedKeys(RIGHTCHECKKEYS);
        RIGHTCHECKEDFLAG = false;
      }
    },
    mounted: function () {
      api.post(this.apiPath.author.findCorpTreeNodeList, {corpId: null}).then(res => {
        this.leftCompTreeData = JSON.parse(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      // 左侧树调取
      getLeftTreeList () {
        api.post(this.apiPath.author.findCorpTreeNodeList, {corpId: null}).then(res => {
          this.leftCompTreeData = JSON.parse(res.data);
        }).catch(err => {
          console.log(err);
        });
      },
      // 右侧树调取
      getRightTreeList (corpId) {
        api.post(this.apiPath.author.findOrgTreeNodeList, {corpId: corpId}).then(res => {
          this.rightOrgTreeData = JSON.parse(res.data);
        }).catch(err => {
          console.log(err);
        });
      },
      // 地区联动方法
      changeProvince () {
        this.cityData = {
          data: {
            parentId: this.companyForm.regAreaId
          }
        };
      },
// ======================左侧树=》添加弹层方法===============================
      getFileName (file) {
        this.companyForm.logo = file.name;
      },
      fileSuccess (res) {
        this.leftTreeCompileDiaVisible = false;
        this.rightTreeCompileDiaVisible = false;
        if (this.leftTreeCompileTitle === '新增信息') {
          if (res.code === 'CPYY-00001') {
            this.getLeftTreeList();
            this.$message({message: '新增成功！', type: 'success'});
          }
        } else {
          if (res.code === 'CPYY-00001') {
            this.getLeftTreeList();
            this.$message({message: '修改成功！', type: 'success'});
          }
        }
      },
      fileError (res) {
        this.leftTreeCompileDiaVisible = false;
        this.rightTreeCompileDiaVisible = false;
        this.$alert(res.message, '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      DiaCloseCorFormReset () {
        this.$refs.corForm.resetFields();
      },
      DiaCloseOrgFormReset () {
        this.$refs.orgForm.resetFields();
      },
// ==================调整公司层级 && 调增机构层级弹层=====================
      dialogLayerTreeFun: function (data, type) {
        if (type === 'company') {
          if (this.$refs.leftTree.getCheckedKeys().length === 0) {
            this.$alert('请选择一个公司项！', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            this.dialogAdjustLelve = true;
            this.dialogAdjustTitle = '调整公司';
            api.post(this.apiPath.author.findCorpTreeNodeList, {corpId: null}).then(res => {
              this.treeLevData = JSON.parse(res.data);
              return JSON.parse(res.data);
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          if (this.$refs.rightTree.getCheckedKeys().length === 0) {
            this.$alert('请选择一个机构项！', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            this.dialogAdjustLelve = true;
            this.dialogAdjustTitle = '调整机构';
            api.post(this.apiPath.author.findOrgTreeNodeList, {corpId: this.$refs.leftTree.getCheckedKeys()[0]}).then(res => {
              this.treeLevData = JSON.parse(res.data);
            }).catch(err => {
              console.log(err);
            });
          }
        }
      },
      pageHandler: function (page) {
        // 改变当前页
        this.page.pageNo = page;
        // this.getList();
      },
      choooseNum: function (pageSize) {
        // 改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      getQueryList () {
        api.getSelectList().then(res => {
          this.list = res.list;
        }).catch(err => {
          console.log(err);
        });
      },
      getValue1 (name, id) {
        this.creatObj.type = name;
        this.creatObj.typeId = id;
      },
// ============================左侧公司树=》方法================================
      leftAscNode (val, self, type) {
        if (type !== 'delete') {
          LEFTCHECKKEYS = this.$refs.leftTree.getCheckedKeys();
          LEFTCHECKEDFLAG = true;
        }
        if (type === 'up') {
          api.post(this.apiPath.author.updateUpCorpOrderById, {corpId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getLeftTreeList();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'down') {
          api.post(this.apiPath.author.updateDownCorpOrderById, {corpId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getLeftTreeList();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'look') {
          this.dialogComTreeLook = true;
          api.post(this.apiPath.author.findBaseCorpInfoById, {corpId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.corpForm = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'add') {
          this.leftTreeCompileTitle = '新增信息';
          this.leftTreeCompileButton = '确 定';
          this.leftTreeCompileDiaVisible = true;
          this.uploadUrl = this.apiPath.author.createBaseCorpInfo;
        } else if (type === 'edit') {
          this.leftTreeCompileTitle = '编辑信息';
          this.leftTreeCompileButton = '修 改';
          this.leftTreeCompileDiaVisible = true;
          this.uploadUrl = this.apiPath.author.updateBaseCorpInfoById;
          api.post(this.apiPath.author.findBaseCorpInfoById, {corpId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              let secId = res.data.regSecAreaId;
              let secName = res.data.regSecAreaName;
              this.companyForm = res.data;
              let _this = this;
              setTimeout(function () {
                _this.companyForm.regSecAreaId = secId;
                _this.companyForm.regSecAreaName = secName;
              });
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'delete') {
          api.post(this.apiPath.author.updateBaseCorpIsEffectById, {corpId: self.id, isEffect: 0}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getLeftTreeList();
              this.rightOrgTreeData = [];
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      submitCompanyForm (formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (type === '新增信息') {
              if (this.companyForm.logo) {
                this.uploadData.parentId = this.$refs.leftTree.getCheckedKeys()[0];
                this.uploadData.fullName = this.companyForm.fullName;
                this.uploadData.shortName = this.companyForm.shortName;
                this.uploadData.corpCode = this.companyForm.corpCode;
                this.uploadData.logo = this.companyForm.logo;
                this.uploadData.corpType = this.companyForm.corpType;
                this.uploadData.website = this.companyForm.website;
                this.uploadData.postCode = this.companyForm.postCode;
                this.uploadData.regAreaId = this.companyForm.regAreaId;
                this.uploadData.regSecAreaId = this.companyForm.regSecAreaId;
                this.uploadData.regAddr = this.companyForm.regAddr;
                this.uploadData.corpDesc = this.companyForm.corpDesc;
                this.uploadData.remark = this.companyForm.remark;
                this.uploadHeader.Token = Cookie.get('Token');
                this.$refs.leftTreeUpload.submit();
              } else {
                let obj = this.companyForm;
                obj.parentId = this.$refs.leftTree.getCheckedKeys()[0];
                obj.corpId = "";
                obj.showSort = "";
                api.post(this.apiPath.author.createBaseCorpInfo, obj).then(res => {
                  this.leftTreeCompileDiaVisible = false;
                  if (res.code === 'CPYY-00001') {
                    this.getLeftTreeList();
                    this.$message({message: '新增成功！', type: 'success'});
                  }
                });
              }
            } else {
              if (this.companyForm.logo) {
                this.uploadData.parentId = this.$refs.leftTree.getCheckedKeys()[0];
                this.uploadData.fullName = this.companyForm.fullName;
                this.uploadData.shortName = this.companyForm.shortName;
                this.uploadData.corpCode = this.companyForm.corpCode;
                this.uploadData.logo = this.companyForm.logo;
                this.uploadData.corpType = this.companyForm.corpType;
                this.uploadData.website = this.companyForm.website;
                this.uploadData.postCode = this.companyForm.postCode;
                this.uploadData.regAreaId = this.companyForm.regAreaId;
                this.uploadData.regSecAreaId = this.companyForm.regSecAreaId;
                this.uploadData.regAddr = this.companyForm.regAddr;
                this.uploadData.corpDesc = this.companyForm.corpDesc;
                this.uploadData.remark = this.companyForm.remark;
                this.uploadHeader.Token = Cookie.get('Token');
                this.$refs.leftTreeUpload.submit();
              } else {
                let obj = this.companyForm;
                api.post(this.apiPath.author.updateBaseCorpInfoById, obj).then(res => {
                  this.leftTreeCompileDiaVisible = false;
                  if (res.code === 'CPYY-00001') {
                    this.getLeftTreeList();
                    this.$message({message: '修改成功！', type: 'success'});
                  }
                });
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      leftNodeExpand (data) {
        if (this.leftexpandedkeys) {
          this.leftexpandedkeys.push(data.id);
        } else {
          this.leftexpandedkeys = [];
          this.leftexpandedkeys.push(data.id);
        }
      },
      leftNodeCollapse (data) {
        this.leftexpandedkeys.splice(this.leftexpandedkeys.indexOf(data.id), 1);
      },
      leftCheckChangeFun (data, node) {
        if (node.checked) {
          this.$refs.leftTree.setCheckedKeys([data.id]);
          this.triangleStyle.display = 'block';
          this.triangleStyle.top = (offset(document.getElementsByClassName('is-checked')[0]) - offset(document.getElementsByClassName('sino-link-container')[0])) + 'px';
        } else {
          this.$refs.leftTree.setCheckedKeys([]);
          this.triangleStyle.display = 'none';
        }
      },
      checkedChange (data, checked) {
        if (checked) {
          this.getRightTreeList(data.id);
        } else {
//          checkedTableArr = [];
//          this.tableData = [];
//          this.total = null;
        }
      },
// ==============================右侧机构树=》方法================================
      rightAscNode (val, self, type) {
        RIGHTCHECKKEYS = this.$refs.rightTree.getCheckedKeys();
        RIGHTCHECKEDFLAG = true;
        if (type === 'up') {
          api.post(this.apiPath.author.updateUpOrgOrderById, {orgId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getRightTreeList(this.$refs.leftTree.getCheckedKeys()[0]);
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'down') {
          api.post(this.apiPath.author.updateDownOrgOrderById, {orgId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getRightTreeList(this.$refs.leftTree.getCheckedKeys()[0]);
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'look') {
          this.dialogOrgTreeLook = true;
          api.post(this.apiPath.author.findOrgInfoById, {orgId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.orgLayerForm = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'add') {
          this.rightTreeCompileTitle = '新增机构信息';
          this.rightTreeCompileButton = "确 认";
          this.rightTreeCompileDiaVisible = true;
        } else if (type === 'edit') {
          this.rightTreeCompileTitle = '编辑机构信息';
          this.rightTreeCompileButton = "修 改";
          this.rightTreeCompileDiaVisible = true;
          api.post(this.apiPath.author.findOrgInfoById, {orgId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.orgForm = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'delete') {
          api.post(this.apiPath.author.updateOrgIsEffectById, {orgId: self.id, isEffect: 0}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getRightTreeList(this.$refs.leftTree.getCheckedKeys()[0]);
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      submitOrgForm (formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (type === '新增机构信息') {
              let obj = {
                corpId: this.$refs.leftTree.getCheckedKeys()[0],
                parentId: this.$refs.rightTree.getCheckedKeys()[0],
                fullName: this.orgForm.fullName,
                shortName: this.orgForm.shortName,
                orgType: this.orgForm.orgType,
                orgCode: this.orgForm.orgCode,
                showSort: '',
                addr: this.orgForm.addr,
                orgDesc: this.orgForm.orgDesc,
                remark: this.orgForm.remark,
                postCode: this.orgForm.postCode
              };
//              let obj = this.orgForm;
//              obj.parentId = this.$refs.rightTree.getCheckedKeys()[0];
//              obj.corpId = this.$refs.leftTree.getCheckedKeys()[0];
//              obj.orgId = "";
//              obj.showSort = "";
              api.post(this.apiPath.author.createOrgInfo, obj).then(res => {
                this.rightTreeCompileDiaVisible = false;
                if (res.code === 'CPYY-00001') {
                  this.getRightTreeList(this.$refs.leftTree.getCheckedKeys()[0]);
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              let obj = {
                corpId: this.$refs.leftTree.getCheckedKeys()[0],
                orgId: this.$refs.rightTree.getCheckedKeys()[0],
                parentId: this.orgForm.parentId,
                fullName: this.orgForm.fullName,
                shortName: this.orgForm.shortName,
                orgType: this.orgForm.orgType,
                orgCode: this.orgForm.orgCode,
                showSort: '',
                addr: this.orgForm.addr,
                orgDesc: this.orgForm.orgDesc,
                remark: this.orgForm.remark,
                postCode: this.orgForm.postCode
              };
//              let obj = this.orgForm;
//              obj.corpId = this.$refs.leftTree.getCheckedKeys()[0];
//              obj.orgId = this.$refs.rightTree.getCheckedKeys()[0];
              api.post(this.apiPath.author.updateOrgInfoById, obj).then(res => {
                this.rightTreeCompileDiaVisible = false;
                if (res.code === 'CPYY-00001') {
                  this.getRightTreeList(this.$refs.leftTree.getCheckedKeys()[0]);
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      rightNodeExpand (data) {
        if (this.rightexpandedkeys) {
          this.rightexpandedkeys.push(data.id);
        } else {
          this.rightexpandedkeys = [];
          this.rightexpandedkeys.push(data.id);
        }
      },
      rightNodeCollapse (data) {
        this.rightexpandedkeys.splice(this.rightexpandedkeys.indexOf(data.id), 1);
      },
      rightCheckChangeFun (data, node) {
        if (node.checked) {
          this.$refs.rightTree.setCheckedKeys([data.id]);
        } else {
          this.$refs.rightTree.setCheckedKeys([]);
        }
      },
      // 控制弹层只能选择一个
      layerCheckChangeFun (data, node) {
        if (node.checked) {
          this.$refs.layerTree.setCheckedKeys([data.id]);
        } else {
          this.$refs.layerTree.setCheckedKeys([]);
        }
      },
      // 弹层关闭回调
      closeLayerF () {
        this.$refs.layerTree.setCheckedKeys([]);
      },
      // 调整层级弹层方法
      dialogAdjustLelveFun () {
        if (this.dialogAdjustTitle === '调整公司') {
          if (this.$refs.layerTree.getCheckedKeys().length === 0) {
            this.$alert('请选择目标公司', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            api.post(this.apiPath.author.updateCorpParent, {corpId: this.$refs.leftTree.getCheckedKeys()[0], parentId: this.$refs.layerTree.getCheckedKeys()[0]}).then(res => {
              this.dialogAdjustLelve = false;
              if (res.code !== 'CPYY-00001') {
                this.$alert(res.message, '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'success', // icon图标类型
                  dragFlag: true,
                  lockScroll: true,
                  callback: action => {
                  }
                });
              } else {
                this.getLeftTreeList();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          if (this.$refs.layerTree.getCheckedKeys().length === 0) {
            this.$alert('请选择目标机构', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            api.post(this.apiPath.author.updateOrgParent, {orgId: this.$refs.rightTree.getCheckedKeys()[0], parentId: this.$refs.layerTree.getCheckedKeys()[0]}).then(res => {
              this.dialogAdjustLelve = false;
              if (res.code !== 'CPYY-00001') {
                this.$alert(res.message, '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'success', // icon图标类型
                  dragFlag: true,
                  lockScroll: true,
                  callback: action => {
                  }
                });
              } else {
                this.getRightTreeList(this.$refs.leftTree.getCheckedKeys()[0]);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }
      }
    }
  };
</script>
