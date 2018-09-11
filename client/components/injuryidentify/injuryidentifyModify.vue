<template>
  <div class="usermanage localinfo addBGC" id="localinfoId">
    <sino-form :model="modefyForm"  class="serch-form" ref="modefyForm">
      <sino-con class="first-con clearfix" id="first-con-id">
        <sino-title type="levelOne" title="修改工伤认定信息"></sino-title>
        <div class="crumb-box">
          <ul class="search-inner-box three-inner-box clear" >
            <li>
              <sino-form-item label="雇员姓名："  class="search-inner-item" prop="empName" :rules="[{required: true, message: '请输入雇员姓名', trigger: 'change'}]">
                <sino-input class="fl" v-model="modefyForm.empName"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码："  class="search-inner-item" prop="certNo" :rules="[{required: true, message: '请输入证件号码', trigger: 'change'}]">
                <sino-input class="fl" v-model="modefyForm.certNo" disabled></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保执行地："  class="search-inner-item" prop="sinsAreaIdName" :rules="[{required: true, message: '请输入社保执行地', trigger: 'change'}]">
                <sino-input class="fl" v-model="modefyForm.sinsAreaIdName" disabled></sino-input>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="付费供应商：" class="search-inner-item fl"  prop="paySuppName" :rules="[{required: true, message: '请输入付费供应商', trigger: 'change'}]">
                <sino-input class="fl" v-model="modefyForm.paySuppName" disabled></sino-input>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="客户名称：" class="search-inner-item fl" prop="custName" :rules="[{required: true, message: '请输入客户名称', trigger: 'change'}]">
                <sino-input class="fl" v-model="modefyForm.custName" disabled></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="service-module-box marTop" v-if="modefyForm.injRec === 1">
          <sino-title type="levelTwo" title="工伤备案信息" class="service-module-title"></sino-title>
          <div class="crumb-box">
            <ul class="local-info-ul" >
              <li>
                <sino-form-item label="工伤发生日期："  class="search-inner-item" prop="recInjDate" :rules="[{type: 'date',required: true, message: '请输入工伤发生日期', trigger: 'change'}]">
                  <sino-date-picker type="date"
                                    placeholder="请选择时间"
                                    v-model="modefyForm.recInjDate"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="材料收取日期："  class="search-inner-item" prop="recMatTime">
                  <sino-date-picker type="date"  placeholder="请选择时间"
                                    v-model="modefyForm.recMatTime"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li class="large-width" >
                <sino-form-item label="上传文件："  class="search-inner-item" prop="injRecMatList">
                  <sino-auto-table  :data="modefyForm.injRecMatList" width="100%" stripe border >
                    <sino-table-column type="selection" width="50"></sino-table-column>
                    <sino-table-column prop="confMatName" label="所需材料" align="center"></sino-table-column>
                    <sino-table-column prop="matEncId" label="已上传文件" align="center">
                      <template scope="scope" v-if="scope.row.oper == true">
                        <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                        <span class="i-color" v-if="scope.row.matName" @click="deleFileFun1(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                      </template>
                    </sino-table-column>

                    <sino-table-column label="操作" align="center">
                      <template scope="scope"  v-if="scope.row.oper == true">
                        <span class="table-span">
                           <sino-upload
                             ref="layUpload"
                             class="upload-demo"
                             :action="uploadFilePublic"
                             :show-file-list="false"
                             :auto-upload="true"
                             :on-change="getFileName"
                             :on-success="fileSuccess"
                             :on-error="fileError"
                           >
                          <div slot="trigger">
                            <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                          </div>
                        </sino-upload>
                        </span>
                      </template>
                    </sino-table-column>
                  </sino-auto-table>
                  <sino-input type="textarea"  placeholder="请输入备注" v-model="modefyForm.recRemark"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div class="salary-item clearfix">
          <sino-title type="levelTwo" :title='key' class="service-module-title"><span class="fr salary-item-oper" @click="showAndHide(key)"><i class="iconfont" :class="{'sino-angle-double-up':showAndHideArr.indexOf(key) !==-1, 'sino-shuangjiantou-copy':showAndHideArr.indexOf(key) ===-1}"></i>{{showAndHideArr.indexOf(key) !==-1?'收起':'展开'}}</span></sino-title>
          <div class="crumb-box">
            <ul class="local-info-ul" v-if="showAndHideArr.indexOf(key) !==-1">
              <li>
                <sino-form-item label="工伤类型："  class="search-inner-item" prop="injTypeName" :rules="[{required: true, message: '请输入工伤类型', trigger: 'change'}]">
                  <sino-select class="fl"  :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code: 'INJ_TYPE'}"
                               :chooseName.sync="modefyForm.injTypeName"
                               :chooseId.sync="modefyForm.injType"
                               :clear="true"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="工伤发生日期："  class="search-inner-item" prop="injDate" :rules="[{type: 'date',required: true, message: '请输入工伤发生日期', trigger: 'change'}]">
                  <sino-date-picker   type="date"
                                      placeholder="请选择时间"
                                      v-model="modefyForm.injDate"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="材料收取日期："  class="search-inner-item" prop="idenMatTime" :rules="[{type: 'date',required: true, message: '请输入地材料收取日期', trigger: 'change'}]">
                  <sino-date-picker  type="date"
                                     placeholder="请选择时间"
                                     v-model="modefyForm.idenMatTime"
                                     :editable="false"
                                     :readonly="false"
                                     :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="递交材料人姓名："  class="search-inner-item" prop="applyName" :rules="[{required: true, message: '请输入递交材料人姓名', trigger: 'change'}]">
                  <sino-input class="fl" v-model="modefyForm.applyName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="递交材料人电话："  class="search-inner-item" prop="applyTel" :rules="[{required: true, message: '请输入递交材料人电话', trigger: 'change'}]">
                  <sino-input class="fl" v-model="modefyForm.applyTel"></sino-input>
                </sino-form-item>
              </li>
              <li class="large-width" >
                <sino-form-item label="工伤经过："  class="search-inner-item" prop="injDesc">
                  <sino-input type="textarea" v-model="modefyForm.injDesc"></sino-input>
                </sino-form-item>
              </li>
              <li class="large-width" >
                <sino-form-item label="上传文件："  class="search-inner-item" >
                  <sino-auto-table  :data="modefyForm.injIdenMatList" width="100%" stripe border >
                    <sino-table-column type="selection" width="50"></sino-table-column>
                    <sino-table-column prop="confMatName" label="所需材料" align="center"></sino-table-column>
                    <sino-table-column prop="matName" label="已上传文件" align="center">
                      <template scope="scope" v-if="scope.row.oper == true">
                        <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                        <span class="i-color" v-if="scope.row.matName" @click="deleFileFun(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                      </template>
                    </sino-table-column>
                    <sino-table-column label="操作" align="center"  width="80">
                      <template scope="scope" v-if="scope.row.oper == true">
                        <span class="table-span">
                           <sino-upload
                             ref="uploadFile"
                             class="upload-demo"
                             :action="uploadFilePublic"
                             :show-file-list="false"
                             :auto-upload="true"
                             :on-change="getFileName1"
                             :on-success="fileSuccess1"
                             :on-error="fileError1"
                           >
                          <div slot="trigger">
                           <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                          </div>
                        </sino-upload>
                        </span>
                        </template>
                    </sino-table-column>
                  </sino-auto-table>
                  <sino-input type="textarea"  placeholder="请输入备注" v-model="modefyForm.remark"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div class="salary-item clearfix" v-if="modefyForm.injIdenDelayed  === 1">
          <sino-title type="levelTwo" title="延时申请"></sino-title>
          <div class="crumb-box clearfix">
            <ul class="local-info-ul" >
              <li>
                <sino-form-item label="提交日期："  class="search-inner-item" prop="applyDelayedDate" :rules="[{type: 'date',required: true, message: '请输入提交日期', trigger: 'change'}]">
                  <sino-date-picker type="date" placeholder="请选择时间" v-model="modefyForm.applyDelayedDate" :editable="false" :readonly="false" :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="延时天数："  class="search-inner-item" prop="num">
                  <sino-input class="fl" disabled v-model="modefyForm.num"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="截止日期："  class="search-inner-item" prop="delayedEndDate">
                  <sino-input class="fl" disabled v-model="modefyForm.delayedEndDate"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div class="conf-btn">
          <sino-button type="primary" v-model="modefyForm.handleState" @click="saveFun" >保 存</sino-button>
          <sino-button v-model="modefyForm.handleState" @click="submitFun" >提交审核</sino-button>
        </div>
      </sino-con>
    </sino-form>
  </div>
</template>
<script>
  import api from '../../api/index';
  import Cookies from 'js-cookie';
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.type.split("/")[1];
    let _arr = ['jpg', 'png', 'bmp', 'jpeg', 'pdf', 'JPG', 'PNG', 'BMP', 'JPEG', 'PDF'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  export default {
    components: {},
    data () {
      return {
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        findSalesmanSelectBox: this.apiPath.hrsc.findSalesmanSelectBox,
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        findCertNoAndAreaId: this.apiPath.hrsc.findCertNoAndAreaId,
        findCustSelectBoxByCertNoAndAreaId: this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId,
        token: Cookies.get('Token'),
        paySuppData: {
          title: '',
          areaId: '',
          cerNo: ''
        },
        custData: {
          pageSize: 10,
          pageNum: 1,
          title: '',
          certNo: '',
          areaId: ''
        },
        key: "工伤认定申请",
        injList: [],
        showAndHideArr: [],
        modefyForm: {
          injIdenId: '', // 认定ID
          injDate: '', // 工伤发生日期
          recInjDate: '', // 工伤发生日期（备案）
          applyName: '', // 递交材料人姓名
          applyTel: '', // 递交材料人电话
          injDesc: '', // 工伤经过描述
          uniqNo: '', // 唯一号
          empName: '', // 雇员姓名
          certType: '', // 证件类型
          certNo: '', // 证件号码
          signSuppId: '', // 签约供应商
          signSuppName: '', // 签约供应商名称
          paySuppId: '', // 付费供应商
          paySuppName: '', // 付费供应商名称
          custId: '', // 客户ID
          custName: '', // 客户名称
          handleState: '', // 办理状态
          handleStateName: '',
          injType: '', // 工伤类型
          injTypeName: '', // 工伤类型
          declSinsDate: '', // 送社保日期
          declPer: '', // 送社保办理人
          eavDate: '', // 审核日期
          eavFailDesc: '', // 审核不通过原因
          giveUpDesc: '', // 放弃原因
          injIdenResult: '', // 工伤认定结果
          injIdenResultName: '',
          injIdenResultFileName: '', // 工伤认定结果文件名称
          injIdenResultFileId: '', // 工伤认定结果文件ID
          issuePer: '', // 领取ren
          issueSignId: '', // 认定书领取人签字ID
          injIdenDelayed: '', // 延期情况
          injIdenDelayedName: '', // 延期情况翻译
          injRec: '', // 备案情况
          injRecId: '',
          injRecName: '',
          sinsAreaIdName: '', // 社保执行地
          creId: '', // 创建人ID
          creTime: '', // 创建时间
          recApplyPeo: '', // 申请办理人
          recApplyTime: '', // 申请时间
          applyDelayedDate: '', // 提交日期
          recMatTime: '', // 材料收取日期(工伤备案)
          recRemark: '', // 工伤备案的备注
          num: '', // 延时天数
          delayedEndDate: '', // 截止日期
          injIdenMatList: [],
          injRecMatList: [],
          remark: '',
          operId: '', // 操作人ID
          idenMatTime: '' // 材料收取日期(工伤认证)
        }
      };
    },
    mounted () {
      let res = this.$route.query;
      api.post(this.apiPath.sins.findInjEmpHandleAction, res).then(res => {
        if (res.code === 'CPYY-00001') {
          if (res.data.delayedApplyTime) {
            res.data.delayedApplyTime = new Date(res.data.delayedApplyTime);
          }
          if (res.data.injDate) {
            res.data.injDate = new Date(res.data.injDate);
          }
          if (res.data.recInjDate) {
            res.data.recInjDate = new Date(res.data.recInjDate);
          }
          if (res.data.idenMatTime) {
            res.data.idenMatTime = new Date(res.data.idenMatTime);
          }
          if (res.data.recMatTime) {
            res.data.recMatTime = new Date(res.data.recMatTime);
          }
          if (res.data.applyDelayedDate) {
            res.data.applyDelayedDate = new Date(res.data.applyDelayedDate);
          }
          if (!res.data.injRecMatList) {
            res.data.injRecMatList = [];
          }
          if (!res.data.injIdenMatList) {
            res.data.injIdenMatList = [];
          }
          if (!res.data.handleStateList) {
            res.data.handleStateList = [];
          }
          this.modefyForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      getFileName1 (file) {
        if (checkImgFileType(file, this)) {
          this.modefyForm.injIdenMatList[this.activeRow].matName = file.name;
        } else {
          this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          this.$refs.uploadFile.clearFiles();
        }
      },
      fileSuccess1 (res, file) {
        if (checkImgFileType(file, this)) {
          if (res.code === 'CPYY-00001') {
            this.modefyForm.injIdenMatList[this.activeRow].matEncId = res.data;
            this.$alert('上传成功！', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'info', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            this.modefyForm.injIdenMatList[this.activeRow].matName = '';
          }
        }
        return;
      },
      fileError1 () {
        this.modefyForm.injIdenMatList[this.activeRow].matName = '';
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
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.modefyForm.injRecMatList[this.activeRow].matName = file.name;
        } else {
          this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          this.$refs.layUpload.clearFiles();
        }
      },
      fileSuccess (res, file) {
        if (checkImgFileType(file, this)) {
          if (res.code === 'CPYY-00001') {
            this.modefyForm.injRecMatList[this.activeRow].matEncId = res.data;
            this.$alert('上传成功！', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'info', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            this.modefyForm.injRecMatList[this.activeRow].matName = '';
          }
        }
        return;
      },
      fileError () {
        this.modefyForm.injIdenMatList[this.activeRow].matName = '';
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
      showAndHide (key) {
        if (this.showAndHideArr.indexOf(key) !== -1) {
          this.showAndHideArr.splice(this.showAndHideArr.indexOf(key), 1);
        } else {
          this.showAndHideArr.push(key);
        }
      },
      /* 通过证件号码来确定地区以及姓名 */
      // getSinsArea () {
      //   /* 通过证件号码获得姓名和地区 */
      //   if (this.modefyForm.certNo) {
      //     let obj = {
      //       empName: this.modefyForm.empName,
      //       certNo: this.modefyForm.certNo,
      //       certType: 1,
      //       proPayId: 2,
      //       orderState: 1
      //     };
      //     api.post(this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo, obj).then(res => {
      //       if (res.code === 'CPYY-00001') {
      //         this.modefyForm.sinsAreaName = res.data[0].accrAreaName;
      //         this.modefyForm.sinsAreaId = res.data[0].accrAreaId;
      //         this.modefyForm.empName = res.data[0].empName;
      //       }
      //     }).catch(err => {
      //       console.log(err);
      //     });
      //   }
      // },
      /* 修改保存  */
      saveFun () {
        this.modefyForm.handleState = 1;
        api.post(this.apiPath.sins.updateInjIdenAction, this.modefyForm).then(res => {
          if (res.code === 'CPYY-00001') {
            console.log(res.data);
            this.$router.push({path: '/injuryidentifybusi'});
            this.$message({message: '保存成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 删除上传文件 */
      deleFileFun (index) {
        this.modefyForm.injIdenMatList[index].matName = '';
      },
      deleFileFun1 (index) {
        this.modefyForm.injRecMatList[index].matName = '';
      },
      /* 文件上传 */
      currentUploadFun (data, index) {
        this.activeRow = index;
      },
      /* 修改提交审核 */
      submitFun () {
        this.modefyForm.handleState = 2;
        api.post(this.apiPath.sins.updateInjIdenAction, this.modefyForm).then(res => {
          if (res.code === 'CPYY-00001') {
            console.log(res.data);
            this.$router.push({path: '/injuryidentifybusi'});
            this.$message({message: '保存成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
