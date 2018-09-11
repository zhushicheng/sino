<template>
  <!--异地医疗备案-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="异地医疗备案查询"></sino-title>
      <sino-form :model="alloMediForm" ref="alloMediForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="alloMediForm.empName"
                            :disabled="false" placeholder="输入姓名或者唯一号"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="alloMediForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="办理进度：" class="search-inner-item" prop="handleScheduleName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'HANDLE_SCHEDULE'}"
                             :token="token"
                             :chooseName.sync="alloMediForm.handleScheduleName"
                             :chooseId.sync="alloMediForm.handleSchedule"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="办理结果：" class="search-inner-item" prop="handleResultName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'EAV_RESULT'}"
                             :token="token"
                             :chooseName.sync="alloMediForm.handleResultName"
                             :chooseId.sync="alloMediForm.handleResult"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-if="searchFlag">
                <li>
                  <sino-form-item label="社保个人编号：" class="search-inner-item" prop="perNo">
                    <sino-input class="fl" type="text"
                                v-model="alloMediForm.perNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="busiRespName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="busiUrl"
                                 :chooseName.sync="alloMediForm.busiRespName"
                                 :chooseId.sync="alloMediForm.busiResp"

                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="数据来源：" class="search-inner-item" prop="dataSourceName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code: 'DATA_SOURCE'}"
                                 :chooseName.sync="alloMediForm.dataSourceName"
                                 :chooseId.sync="alloMediForm.dataSource"

                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="申请类型：" class="search-inner-item" prop="applyTypeName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code: 'APPLY_TYPE'}"
                                 :chooseName.sync="alloMediForm.applyTypeName"
                                 :chooseId.sync="alloMediForm.applyType"

                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :token="token"
                                 :chooseName.sync="alloMediForm.custName"
                                 :chooseId.sync="alloMediForm.custId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="单位名称：" class="search-inner-item" prop="unitName">
                    <sino-input class="fl" type="text"
                                v-model="alloMediForm.unitName"
                                :disabled="false"></sino-input>
                    <!--<sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="unitUrl"
                                 :chooseName.sync="alloMediForm.unitName"
                                 :chooseId.sync="alloMediForm.sinsAcct"
                                 :clear="true"></sino-select>-->
                    <!--<sino-autocomplete
                      v-model="alloMediForm.unitName"
                      placeholder="请输入内容"
                      :url="unitUrl"
                      :token="token"
                      @select="handleSelect"
                    ></sino-autocomplete>-->
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :token="token"
                                 :chooseName.sync="alloMediForm.signSuppName"
                                 :chooseId.sync="alloMediForm.signSuppId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="付费供应商：" class="search-inner-item" prop="payChName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :token="token"
                                 :chooseName.sync="alloMediForm.payChName"
                                 :chooseId.sync="alloMediForm.paySuppId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('alloMediForm')" v-if="searchFlag">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
        <div class="search-more">
          <div @click="searchFlag = !searchFlag">
            <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
            <span v-if="!searchFlag">高级查询</span>
            <span v-if="searchFlag">基本查询</span>
          </div>
        </div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button v-if="selectFlag" type="icon-text" @click="applyFun()"><i class="iconfont sino-add"></i>申请</sino-button>
            <sino-button v-if="selectFlag" type="icon-text" @click="submitOperator()"><i class="iconfont sino-subaudit"></i>提交经办员</sino-button>
            <sino-button v-if="roleFlag" type="icon-text" @click="sendSins()"><i class="iconfont sino-qianbi"></i>送社保</sino-button>
            <sino-button v-if="roleFlag" type="icon-text" @click="resultFeedback()"><i class="iconfont sino-shuru"></i>结果反馈</sino-button>
          </div>
        </div>
        <sino-table :data="alloMediTable" border max-height="416" stripe v-on:viewAll="viewAll" v-on:select="selectCallBack" @select-all="selectAllBack">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="perNo" label="社保个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="sinsExecuAreaName" label="执行地区" min-width="180"></sino-table-column>
          <sino-table-column prop="unitName" label="单位名称" min-width="180"></sino-table-column>
          <sino-table-column prop="applyTypeName" label="申请类型" min-width="100"></sino-table-column>
          <sino-table-column prop="dataSourceName" label="数据来源" min-width="100"></sino-table-column>
          <sino-table-column prop="handleScheduleName" label="办理进度" min-width="100"></sino-table-column>
          <sino-table-column prop="handleResultName" label="办理结果" min-width="100"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="95"></sino-table-column>
          <sino-table-column prop="signSuppName" label="签约供应商" min-width="120"></sino-table-column>
          <sino-table-column prop="payChName" label="付费供应商" min-width="120"></sino-table-column>
          <sino-table-column prop="busiRespName" label="业务员"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" v-if="selectFlag && scope.row.dataSource ===2 && (scope.row.handleSchedule ===1 || scope.row.handleSchedule ===2 || scope.row.handleSchedule ===3)" @click="eavFun(scope.row)">审核</span>
                <span class="table-span" v-if="selectFlag && scope.row.dataSource ===1 && (scope.row.handleSchedule ===1 || scope.row.handleSchedule ===2 || scope.row.handleSchedule ===3)" @click="eavSubConfirm(scope.row)">提交</span>
                <i class="table-i" v-if="selectFlag && (scope.row.handleSchedule ===1 || scope.row.handleSchedule ===2 || scope.row.handleSchedule ===3)">|</i>
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="selectFlag && scope.row.dataSource ===1 && (scope.row.handleSchedule ===1 || scope.row.handleSchedule ===2 || scope.row.handleSchedule ===3)">|</i>
                <span class="table-span" v-if="selectFlag && scope.row.dataSource ===1 && (scope.row.handleSchedule ===1 || scope.row.handleSchedule ===2 || scope.row.handleSchedule ===3)" @click="modifyFun(scope.row)">修改</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--异地医疗备案申请-->
    <sino-dialog :visible.sync="applyFlag" top="5%" size="samll" dialogHide class="accuman-add-layer clearPadding clearPadding-width-che" v-on:close="resetFun('applyForm')">
      <sino-title slot="title" type="levelOne" :title="articletitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="applyForm" ref="applyForm" :rules="applyRules" class="serch-form">
        <div class="search-bor">
          <div class="search-box mt10 search-wi">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form :model="applyCertNoForm" ref="applyCertNoForm" :rules="applyCertNoRules" class="serch-form">
                  <sino-form-item label="证件号码：" class="search-inner-item search-item-certno" :rules="[{required: true, message: '请输入证件号码', trigger: 'blur'}]" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="applyCertNoForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </sino-form>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-search-wi">
              <sino-button type="primary" @click="applySearchFun" class="ser-btn-che">查 询</sino-button>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <input type="hidden" v-model="applyForm.certNo">
        <sino-form-item label="申请日期：" prop="applyDate" :rules="[{type: 'date', required: true, message: '请选择申请日期', trigger: 'change'}]">
          <sino-date-picker v-model="applyForm.applyDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false"></sino-date-picker>
        </sino-form-item>
        <sino-form-item label="申请类型：" prop="applyTypeName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'APPLY_TYPE'}"
                       :token="token"
                       :chooseName.sync="applyForm.applyTypeName"
                       :chooseId.sync="applyForm.applyType"
                       @change="applyChange(applyForm.applyType)"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="执行地区：" prop="sinsExecuAreaName" :rules="[{required: true, message: '请选择执行地区', trigger: 'change'}]">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="areaUrl"
                       :token="token"
                       :chooseName.sync="applyForm.sinsExecuAreaName"
                       :chooseId.sync="applyForm.sinsExecuArea"
                       @change="areaFun(applyForm.sinsExecuArea)"
                       @clearChange="clearAreaChange"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="姓名：" prop="empName" :rules="[{required: true, message: '请输入姓名', trigger: 'change'}]">
          <sino-input class="fl" type="text"
                      v-model="applyForm.empName"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="性别：" prop="sex" v-if="applyTypeFlag" :rules="[{type: 'number', required: true, message: '请选择性别', trigger: 'change'}]">
           <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in sexlist" :key="index" v-model.number="applyForm.sex" :label="item.id">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
        <sino-form-item label="性别：" prop="sex" v-if="!applyTypeFlag">
           <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in sexlist" :key="index" v-model="applyForm.sex" :label="item.id">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
        <sino-form-item label="年龄：" prop="age" v-if="applyTypeFlag" :rules="[{type: 'number', required: true, message: '请输入年龄', trigger: 'change'}]">
          <sino-input class="fl" type="text"
                      v-model.number="applyForm.age"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="年龄：" prop="age" v-if="!applyTypeFlag">
          <sino-input class="fl" type="text"
                      v-model.number="applyForm.age"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="个人编号：" prop="perNo" v-if="applyTypeFlag">
          <sino-input class="fl" type="text"
                      v-model="applyForm.perNo"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="个人编号：" prop="perNo" v-if="!applyTypeFlag" :rules="[{required: true, message: '请输入个人编号', trigger: 'change'}]">
          <sino-input class="fl" type="text"
                      v-model="applyForm.perNo"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="通讯电话：" v-if="applyTypeFlag" prop="tel" :rules="[{required: true, message: '请输入通讯电话', trigger: 'change'}]">
          <sino-input class="fl" type="text"
                      v-model="applyForm.tel"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item prop="unitName" label="单位名称：" v-if="applyTypeFlag" class="sino-form-item-width" :rules="[{required: true, message: '请输入单位名称', trigger: 'change'}]">
          <sino-input type="text" v-model="applyForm.unitName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="unitName" label="单位名称：" v-if="!applyTypeFlag" class="sino-form-item-width">
          <sino-input type="text" v-model="applyForm.unitName"></sino-input>
        </sino-form-item>
        <sino-form-item label="人员状态：" prop="personStateName" v-if="applyTypeFlag" :rules="[{required: true, message: '请选择人员状态', trigger: 'change'}]">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :data="{code: 'PERSON_STATE'}"
                       :url="dictSelUrl"
                       :chooseName.sync="applyForm.personStateName"
                       :chooseId.sync="applyForm.personState" :clear="true"
          ></sino-select>
        </sino-form-item>
        <sino-form-item label="人员状态：" prop="personStateName" v-if="!applyTypeFlag">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :data="{code: 'PERSON_STATE'}"
                       :url="dictSelUrl"
                       :chooseName.sync="applyForm.personStateName"
                       :chooseId.sync="applyForm.personState" :clear="true"
          ></sino-select>
        </sino-form-item>
        <sino-form-item label="驻外或异地定居：" v-if="applyTypeFlag" class="sino-from-address is-required">
          <sino-form-item prop="abroadAlloSettleProvName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :data='provData'
                         :isPage="true"
                         :isGroup="false"
                         :url="findAreaList"
                         :chooseName.sync="applyForm.abroadAlloSettleProvName"
                         :chooseId.sync="applyForm.abroadAlloSettleProv" :clear="true"
                         @change="changeProv"
            ></sino-select>
          </sino-form-item>
          <sino-form-item prop="abroadAlloSettleCityName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url='findAreaList'
                         :data="cityData"
                         :chooseName.sync="applyForm.abroadAlloSettleCityName"
                         :chooseId.sync="applyForm.abroadAlloSettleCity"
                         :linkage="true"
                         :clear="true"
                         @change="changeCity"
            ></sino-select>
          </sino-form-item>
          <sino-form-item prop="abroadAlloSettleDistName" class="sino-select-last" >
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :linkage="true"
                         :isGroup="false"
                         :url="findAreaList"
                         :data='distData'
                         :chooseName.sync="applyForm.abroadAlloSettleDistName"
                         :chooseId.sync="applyForm.abroadAlloSettleDist"
                         :clear="true"
                         @finish="cityFinish"
            ></sino-select>
          </sino-form-item>
        </sino-form-item>
        <sino-form-item prop="alloCommunicationAddr" v-if="applyTypeFlag" label="异地通讯地址：" class="sino-form-item-width">
          <sino-input type="text" v-model="applyForm.alloCommunicationAddr"></sino-input>
        </sino-form-item>
        <div v-for="(list, index) in applyForm.alloMediRecHospiList" :key="index" v-if="applyTypeFlag">
          <sino-form-item v-if="index === 0" :prop="'alloMediRecHospiList['+index+'].hospiName'" :label="'异地医院全称'+(index+1)+'：'" class="sino-form-item-width sino-form-pos" :rules="[{required: true, message: '异地医院全称必填第一项', trigger: 'change'}]">
            <sino-input type="text" v-model="list.hospiName"></sino-input>
            <div class="adddimreason-btn fl ml20" @click="listAdd(index)">
              <i class="iconfont" :class="{'sino-add' : index === 0, 'sino-reduce': index !== 0}"></i><span class="ml5">{{index === 0 ? '新增' : '删除'}}</span></div>
          </sino-form-item>
          <sino-form-item v-else prop="hospiName" :label="'异地医院全称'+(index+1)+'：'" class="sino-form-item-width sino-form-pos">
            <sino-input type="text" v-model="list.hospiName"></sino-input>
            <div class="adddimreason-btn fl ml20" @click="listAdd(index)">
              <i class="iconfont" :class="{'sino-add' : index === 0, 'sino-reduce': index !== 0}"></i><span class="ml5">{{index === 0 ? '新增' : '删除'}}</span></div>
          </sino-form-item>
        </div>
        <sino-title class="fl" type="levelTwo" title="上传文件"></sino-title>
        <div class="clear"></div>
        <div class="upload updata-box">
          <sino-auto-table :data="applyForm.alloMediRecMatList" stripe max-height="235" border>
            <sino-table-column type="selection" width="50"></sino-table-column>
            <sino-table-column prop="confMatName" label="所需材料" align="left"></sino-table-column>
            <sino-table-column label="已上传文件" align="center">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <i class="iconfont sino-qubiezhen fl" v-if="scope.row.matName"></i>
                  <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                  <span class="i-color" v-if="scope.row.matName"><i class="iconfont sino-reduce" @click="deleFileFun(scope.row)"></i></span>
                </template>
              </template>
            </sino-table-column>
            <sino-table-column label="操作" align="center">
              <template scope="scope" v-if="scope.row.oper == true">
                <sino-upload
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
              </template>
            </sino-table-column>
          </sino-auto-table>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
          <sino-button @click="saveApplyForm('applyForm')" class="mr10">保 存</sino-button>
        <sino-button type="primary" @click="submitApplyForm('applyForm')">提交经办员</sino-button>
      </span>
    </sino-dialog>
    <!--送社保-->
    <sino-dialog :visible.sync="sendSinsFlag" class="leads-follow" v-on:close="resetFun('sendSinsForm')">
      <sino-title slot="title" type="levelOne" title="送社保" class="sino-dialog-title"></sino-title>
      <div class="follow-select">
        <sino-form :model="sendSinsForm" class="follow-form" ref="sendSinsForm" :rules="sendSinsRules">
          <div class="follow-content">
            <sino-form-item label="执行结束日期：" prop="declDate">
              <sino-date-picker v-model="sendSinsForm.declDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false">
              </sino-date-picker>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sendSinsConfirm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--结果反馈-->
    <sino-dialog :visible.sync="resaultFlag" size="large" :top="'10%'" class="dialog-height" v-on:close="resetFun('resaultForm')">
      <sino-title slot="title" type="levelOne" title="结果反馈" class="sino-dialog-title"></sino-title>
      <sino-form :model="resaultForm" :rules="resaultRules" ref="resaultForm" class="demo-sendAddrAddForm">
        <sino-form-item label="办理结果：" prop="handleResult">
          <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in handleResultlist" :key="index" v-model.number="resaultForm.handleResult" :label="item.id">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
        <sino-form-item label="反馈日期：" prop="feekbackDate">
          <sino-date-picker v-model="resaultForm.feekbackDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item prop="failReason" label="失败原因：" class="sino-form-item-width" v-if="resaultForm.handleResult === 2">
          <sino-input type="textarea" v-model="resaultForm.failReason"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="resaultConfirm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeFlag" top="5%" size="samll" v-on:close="resetFun('alloSeeList')"  class="usermanage dialog-com-tree-look-box toview-box">
      <sino-title slot="title" type="levelOne" title="查看详情" class="sino-dialog-title"></sino-title>
      <div class="crumbs">
        <ul>
          <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 3, 'li-notthr': activeNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 3}">{{activeNode > 3? '':1}}</i>待提交</span></li>
          <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 4, 'li-notthr': activeNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 4}">{{activeNode > 4? '':2}}</i>待办理</span></li>
          <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 5, 'li-notthr': activeNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 5}">{{activeNode > 5? '':3}}</i>办理中</span></li>
          <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 9, 'li-notthr': activeNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 9}">{{activeNode > 9? '':4}}</i>办理完成</span></li>
        </ul>
      </div>
      <div class="elastic-layer">
        <div class="userm mt0">
          <ul class="userm-ul">
            <li class="customer-li">
              <h6>证件号码</h6><input readonly v-model="alloSeeList.certNo">
            </li>
            <li class="customer-li">
              <h6>申请类型</h6><input readonly v-model="alloSeeList.applyTypeName">
            </li>
            <li class="customer-li">
              <h6>申请日期</h6><input readonly v-model="alloSeeList.applyDate">
            </li>
            <li class="customer-li">
              <h6>数据来源</h6><input readonly v-model="alloSeeList.dataSourceName">
            </li>
            <li class="customer-sp">
              <h6>执行地区</h6><input readonly v-model="alloSeeList.sinsExecuAreaName">
            </li>
          </ul>
        </div>
        <div class="hr"></div>
        <div class="userm">
          <ul class="userm-ul">
            <li class="customer-li">
              <h6>姓名</h6><input readonly v-model="alloSeeList.empName">
            </li>
            <li class="customer-li">
              <h6>性别</h6><input readonly v-model="alloSeeList.sex">
            </li>
            <li class="customer-li">
              <h6>年龄</h6><input readonly v-model="alloSeeList.age">
            </li>
            <li class="customer-li">
              <h6>个人编号</h6><input readonly v-model="alloSeeList.perNo">
            </li>
            <li class="customer-li">
              <h6>通讯电话</h6><input readonly v-model="alloSeeList.tel">
            </li>
            <li class="customer-li">
              <h6>人员状态</h6><input readonly v-model="alloSeeList.personStateName">
            </li>
            <li class="customer-sp">
              <h6>单位名称</h6><input readonly v-model="alloSeeList.unitName">
            </li>
            <li class="customer-sp">
              <h6>驻外或异地定居</h6>
              <!-- <span v-text="alloSeeList.abroadAlloSettleProvName"></span>
               <span v-text="alloSeeList.abroadAlloSettleCityName"></span>
               <span v-text="alloSeeList.abroadAlloSettleDistName"></span>-->
              <input readonly v-model="alloSeeList.sinsExecuAreaName">
            </li>
            <li class="customer-sp">
              <h6>异地通讯地址</h6><input readonly v-model="alloSeeList.alloCommunicationAddr">
            </li>
            <li class="customer-sp" v-for="(list, index) in alloSeeList.alloMediRecHospiList" :key="index">
              <h6>异地医院全称{{index+1}}</h6><input readonly v-model="list.hospiName">
            </li>
            <table class="customer-sp-table clear">
              <tr>
                <td class="td-one">
                  <h6>上传文件</h6>
                </td>
                <td>
                  <div class="cus-sp" v-for="(list, index) in alloSeeList.alloMediRecMatList" :key="index">
                    <i class="iconfont sino-qubiezhen"></i>
                    <em class="em-font">{{list.matName}}</em>
                    <em class="maincolor">预览</em><em class="maincolor"> | </em><em class="maincolor">下载</em>
                  </div>
                </td>
              </tr>
            </table>
            <li class="customer-sp" v-if="proProg === 8 || proRes === 2">
              <h6>退回原因</h6><input readonly v-model="alloSeeList.retReason">
            </li>
            <li class="customer-sp">
              <h6>失败原因</h6><input readonly v-model="alloSeeList.failReason">
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<sino-button type="primary" @click="seeFlag = false">确 定</sino-button>-->
      </span>
    </sino-dialog>
    <!--审核-->
    <sino-dialog :visible.sync="eavFlag" size="large" :top="'5%'" dialogHide class="dialog-height eav-dialog" v-on:close="resetFun('eavForm')">
      <sino-title slot="title" type="levelOne" title="异地医疗备案审核" class="sino-dialog-title"></sino-title>
      <sino-form :model="eavForm" ref="resaultForm" class="demo-sendAddrAddForm">
        <sino-con class="eav-border">
          <input type="hidden" v-model="eavForm.alloMediRecId">
          <input type="hidden" v-model="eavForm.handleSchedule">
          <sino-form-item label="申请日期：" prop="applyDate">
            <sino-date-picker v-model="eavForm.applyDate" type="date" :editable="false" :readonly="true" :disabled="true" format="yyyy-MM-dd" :clearable="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="数据来源：" prop="dataSourceName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="true"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="dictSelUrl"
                         :data="{code: 'DATA_SOURCE'}"
                         :token="token"
                         :chooseName.sync="eavForm.dataSourceName"
                         :chooseId.sync="eavForm.dataSource"
                         :clear="true"></sino-select>
          </sino-form-item>
        </sino-con>
        <div class="eav-table">
          <h3>贵阳市驻外和异地定居参保人员就诊定点医院备案表</h3>
          <ul class="eav-ul">
            <li>
              <span>姓名</span>
              <input readonly v-model="eavForm.empName"/>
            </li>
            <li>
              <span>个人编号</span>
              <input readonly v-model="eavForm.perNo"/>
            </li>
            <li>
              <span>性别</span>
              <input readonly v-model="eavForm.sex"/>
            </li>
            <li>
              <span>年龄</span>
              <input readonly v-model="eavForm.age"/>
            </li>
          </ul>
          <ul class="eav-ul eav-ul-two">
            <li>
              <span>单位名称</span>
              <input readonly v-model="eavForm.unitName"/>
            </li>
            <li>
              <span>人员状态（在职或退休）</span>
              <input readonly v-model="eavForm.personStateName"/>
            </li>
          </ul>
          <ul class="eav-ul eav-ul-one">
            <li>
              <span>驻外或异地定居</span>
              <div class="citylist">
                <dl>
                  <dt><input readonly v-model="eavForm.abroadAlloSettleProvName"/>省</dt>
                  <dt><input readonly v-model="eavForm.abroadAlloSettleCityName"/>市</dt>
                  <dt><input readonly v-model="eavForm.abroadAlloSettleDistName"/>区</dt>
                </dl>
              </div>
            </li>
          </ul>
          <ul class="eav-ul eav-ul-normal">
            <li>
              <span>异地通讯地址</span>
              <input readonly readonly v-model="eavForm.alloCommunicationAddr"/>
            </li>
            <li>
              <span>通讯电话</span>
              <input readonly v-model="eavForm.tel"/>
            </li>
          </ul>
          <table class="eav-ul-list">
            <tr>
              <td>
                <span>异地拟选点<br>医院全称</span>
              </td>
              <td>
                <div class="eav-message">
                  <h6>提醒：以下所选医院不需要盖章，只需填写医院名称。医院名称必须是全程，避免因与费用发票上名称不一致而影响医疗费用的报销。</h6>
                  <ol>
                    <li v-for="(list, index) in eavForm.alloMediRecHospiList" :key="index">{{index+1}}、{{list.hospiName}}</li>
                  </ol>
                </div>
              </td>
            </tr>
          </table>
          <table class="eav-ul-seal">
            <tr>
              <td>
                <span>贵阳市医疗<br>保险经办机构<br>意见</span>
              </td>
              <td>
                <div class="eav-seal">
                  <h6 class="span-confirm">贵阳市医疗保险经办机构盖章确认：</h6>
                  <em>经办人：</em>
                  <div class="eav-seal-pos">
                    <i>年</i>
                    <i>月</i>
                    <i>日</i>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <ul class="eav-ul eav-ul-bom">
            <li>
              <span>代办人员姓名：</span>
            </li>
            <li class="li-middle">
              <span>身份证号：</span>
            </li>
            <li>
              <span>联系电话：</span>
            </li>
          </ul>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button class="mr20" @click="eavBackConfirm">返回申请</sino-button>
        <sino-button type="primary" @click="eavSubConfirm">提交经办员</sino-button>
        <sino-button class="eav-btn" type="text" @click="confirm">打 印</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';

  let linkSelectData = {
    abroadAlloSettleCity: '',
    abroadAlloSettleCityName: '',
    abroadAlloSettleDist: '',
    abroadAlloSettleDistName: ''
  };
  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        busiUrl: this.apiPath.author.findUserSelectBoxInfo,
        areaUrl: this.apiPath.hrsc.areaSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        unitUrl: this.apiPath.sins.selectUnitName,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        // 办理进度
        proProg: null,
        // 办理结果
        proRes: null,
        token: Cookies.get('Token'),
        selectFlag: false,
        roleFlag: false,
        updateFlag: '',
        activeRow: '',
        searchFlag: false,
        alloMediForm: { // 查询
          empName: '',
          certNo: '',
          handleSchedule: '',
          handleScheduleName: '',
          handleResult: '',
          handleResultName: '',
          perNo: '',
          busiResp: '',
          busiRespName: '',
          dataSource: '',
          dataSourceName: '',
          applyType: '',
          applyTypeName: '',
          custId: '',
          custName: '',
          sinsAcct: '',
          unitName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          payChName: ''
        },
        alloMediTable: null,
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
        applyCertNoForm: { // 申请
          certNo: ''
        },
        applyCertNoRules: {
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'}
          ]
        },
        applyForm: {
          applyDate: new Date(),
          applyType: '',
          applyTypeName: '',
          sinsExecuArea: '',
          sinsExecuAreaName: '',
          empName: '',
          sex: '',
          age: '',
          perNo: '',
          tel: '',
          unitName: '',
          personState: '',
          personStateName: '',
          abroadAlloSettleProv: '',
          abroadAlloSettleProvName: '',
          abroadAlloSettleCity: '',
          abroadAlloSettleCityName: '',
          abroadAlloSettleDist: '',
          abroadAlloSettleDistName: '',
          alloCommunicationAddr: '',
          alloMediRecHospiList: [
            {
              hospiName: ''
            }
          ],
          alloMediRecMatList: null
        },
        applyRules: {
          applyTypeName: [
            {required: true, message: '请选择申请类型', trigger: 'blur'}
          ],
          abroadAlloSettleProvName: [
            {required: true, message: '请输入省', trigger: 'change'}
          ],
          abroadAlloSettleCityName: [
            {required: true, message: '请输入市', trigger: 'change'}
          ],
          abroadAlloSettleDistName: [
            {required: true, message: '请输入区', trigger: 'change'}
          ],
          alloCommunicationAddr: [
            {required: true, message: '请输入异地通讯地址', trigger: 'change'}
          ]
        },
        uploadData: null,
        provData: {data: {level: 3}}, // 请求省下拉参数
        cityData: {data: {parentId: ''}}, // 请求市下拉参数
        distData: {data: {parentId: ''}}, // 请求区下拉参数
        checkedArr: [], // 列表选中数据集合
        applyFlag: false,
        sendSinsFlag: false, // 送社保
        sendSinsForm: {
          declDate: ''
        },
        sendSinsRules: {
          declDate: [
            { type: 'date', required: true, message: '请选择送社保日期', trigger: 'change' }
          ]
        },
        resaultFlag: false, // 结果反馈
        resaultForm: {
          handleResult: '',
          feekbackDate: '',
          failReason: ''
        },
        resaultRules: {
          failReason: [
            { required: true, message: '请输入失败原因', trigger: 'change' }
          ]
        },
        handleResultlist: [],
        sexlist: [],
        seeFlag: false, // 查看
        alloSeeList: {
          certNo: '',
          applyType: '',
          applyTypeName: '',
          applyDate: '',
          dataSourceName: '',
          sinsExecuAreaName: '',
          empName: '',
          sex: '',
          age: '',
          perNo: '',
          tel: '',
          personStateName: '',
          unitName: '',
          alloCommunicationAddr: '',
          alloMediRecHospiList: [{
            hospiName: ''
          }],
          alloMediRecMatList: [],
          retReason: '',
          fallReason: ''
        },
        activeNode: 3,
        eavFlag: false, // 审核
        eavForm: {
          applyDate: '',
          dataSource: '',
          dataSourceName: '',
          empName: '',
          perNo: '',
          sex: '',
          age: '',
          unitName: '',
          personStateName: '',
          abroadAlloSettleProvName: '',
          abroadAlloSettleCityName: '',
          abroadAlloSettleDistName: '',
          alloCommunicationAddr: '',
          tel: '',
          alloMediRecId: '',
          handleSchedule: ''
        },
        articletitle: '',
        applyTypeFlag: true
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'SEX'}).then(res => {
        this.sexlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'EAV_RESULT'}).then(res => {
        this.handleResultlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      let _roleType = Cookies.get('roleType');
      if (_roleType === '5') {
        this.selectFlag = true;
      }
      if (_roleType === '16' || _roleType === '14') {
        this.roleFlag = true;
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 删除上传的文件
      deleFileFun (scopeRow) {
        // this.applyForm.alloMediRecMatList[this.activeRow].matName = '';
        scopeRow.matName = '';
      },
      // 手动选中checkBox回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      selectAllBack (selectTion, row) {
        let arr = [];
        for (let item of selectTion) {
          if (item.certNo) {
            arr.push(item);
          }
        }
        this.selectCallBack(arr, row);
      },
      applyChange (item) {
        console.log(item);
        var itemId = item;
//        this.$refs['applyForm'].resetFields();
        let that = this;
        setTimeout(function () {
          if (item === 2) {
            that.applyTypeFlag = false;
            that.applyForm.applyType = 2;
            that.applyForm.applyTypeName = '取消备案';
          } else {
            that.applyTypeFlag = true;
            that.applyForm.applyType = 1;
            that.applyForm.applyTypeName = '申请备案';
          }
        }, 300);
      },
      clearAreaChange () {
        this.applyForm.alloMediRecMatList = null;
      },
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.alloMediForm
        };
        api.post(this.apiPath.sins.findAllRecInfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.alloMediTable = res.data.list;
            this.total = res.data.total;
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
      // 申请
      applyFun () {
        this.articletitle = '异地医疗备案申请';
        this.applyFlag = true;
        this.updateFlag = 1;
        this.applyForm.applyType = 1;
        this.applyForm.applyTypeName = '申请备案';
        this.applyForm.alloMediRecHospiList = [];
        this.applyForm.alloMediRecHospiList.push({
          hospiName: ''
        });
        this.applyForm.alloMediRecMatList = null;
        this.applyTypeFlag = true;
      },
      // 根据证件号码查询 52212919750314406X
      applySearchFun () {
        let _this = this;
        _this.$refs.applyCertNoForm.validate((valid) => {
          if (valid) {
            let _aa = JSON.parse(JSON.stringify(_this.applyForm));
            _this.applyForm.certNo = _this.applyCertNoForm.cartNo;
            api.post(_this.apiPath.sins.findEmpInfoAndDetByNo, _this.applyCertNoForm).then(res => {
              if (res.code === 'CPYY-00001') {
                // _this.applyForm = res.data;
                for (let item in _this.applyForm) {
                  if (res.data[item]) {
                    _this.applyForm[item] = res.data[item];
                  }
                }
                _this.applyForm.personState = res.data.personState;
                _this.applyForm.personStateName = res.data.personStateName;
                if (_this.applyForm.alloMediRecHospiList === null) {
                  _this.applyForm.alloMediRecHospiList = [];
                  _this.applyForm.alloMediRecHospiList.push({hospiName: ''});
                }
                if (_aa.applyType === 1) {
                  _this.applyForm.applyType = 1;
                  _this.applyForm.applyTypeName = '申请备案';
                } else {
                  _this.applyForm.applyType = 2;
                  _this.applyForm.applyTypeName = '取消备案';
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      cityFinish () {
        this.applyForm.abroadAlloSettleDist = linkSelectData.abroadAlloSettleDist;
        this.applyForm.abroadAlloSettleDistName = linkSelectData.abroadAlloSettleDistName;
        linkSelectData = {};
      },
      changeProv () {
        this.cityData.data.parentId = this.applyForm.abroadAlloSettleProv;
      },
      changeCity () {
        this.distData.data.parentId = this.applyForm.abroadAlloSettleCity;
      },
      getFileName (file) {
        this.applyForm.alloMediRecMatList[this.activeRow].matName = file.name;
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.applyForm.alloMediRecMatList[this.activeRow].matEncId = res.data;
        } else {
          this.applyForm.alloMediRecMatList[this.activeRow].matName = '';
        }
      },
      fileError () {
        this.applyForm.alloMediRecMatList[this.activeRow].matName = '';
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
      currentUploadFun (row, index) {
        this.activeRow = index;
      },
      // 增加产品方案
      listAdd (index) {
        let _this = this;
        if (index === 0) {
          _this.applyForm.alloMediRecHospiList.push({
            hospiName: ''
          });
        } else {
          _this.applyForm.alloMediRecHospiList.splice(index, 1);
        }
      },
      areaFun (areaId) {
        if (areaId === '' || areaId === null) {
          return false;
        }
        if (this.articletitle === '异地医疗备案申请') {
          api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, {confUse: 5, dimen: 1, dimenValue: areaId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.applyForm.alloMediRecMatList = res.data.matConfs;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 异地备案申请确定
      submitForm () {},
      // 提交经办员
      submitOperator () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _data = [];
        this.checkedArr.forEach(function (item) {
          _data.push({alloMediRecId: item.alloMediRecId, handleSchedule: item.handleSchedule});
        });
        api.post(this.apiPath.sins.updateSubmitBatch, {alloMediRecList: _data}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            this.checkedArr = [];
            this.$message({message: '提交成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 送社保
      sendSins () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.sendSinsFlag = true;
      },
      // 送社保确定
      sendSinsConfirm () {
        let _this = this;
        _this.$refs.sendSinsForm.validate((valid) => {
          if (valid) {
            _this.sendSinsForm.declDate = Vue.filter('date')(this.sendSinsForm.declDate, 'yyyy-MM-dd');
            let _data = [];
            _this.checkedArr.forEach(function (item) {
              _data.push({alloMediRecId: item.alloMediRecId, declDate: _this.sendSinsForm.declDate, handleSchedule: item.handleSchedule});
            });
            api.post(_this.apiPath.sins.updateBatchSendSins, {alloMediRecList: _data}).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.searchFun();
                _this.sendSinsFlag = false;
                _this.checkedArr = [];
                _this.$message({message: '操作成功！', type: 'success'});
              } else {
                _this.sendSinsForm.declDate = new Date(_this.sendSinsForm.declDate);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 结果反馈
      resultFeedback () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.resaultFlag = true;
      },
      // 结果反馈确定
      resaultConfirm () {
        let _this = this;
        _this.$refs.resaultForm.validate((valid) => {
          if (valid) {
            _this.resaultForm.feekbackDate = Vue.filter('date')(this.resaultForm.feekbackDate, 'yyyy-MM-dd');
            let _data = [];
            _this.checkedArr.forEach(function (item) {
              _data.push({alloMediRecId: item.alloMediRecId, handleResult: _this.resaultForm.handleResult, feekbackDate: _this.resaultForm.feekbackDate, failReason: _this.resaultForm.failReason, handleSchedule: item.handleSchedule});
            });
            api.post(_this.apiPath.sins.updateBatchResult, {alloMediRecList: _data}).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.resaultFlag = false;
                _this.searchFun();
                _this.checkedArr = [];
                _this.$message({message: '操作成功！', type: 'success'});
              } else {
                _this.resaultForm.feekbackDate = new Date(_this.resaultForm.feekbackDate);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 审核
      eavFun (_data) {
        let _this = this;
        _this.eavForm.alloMediRecId = _data.alloMediRecId;
        _this.eavForm.handleSchedule = _data.handleSchedule;
        api.post(_this.apiPath.sins.findRecInfoById, {alloMediRecId: _data.alloMediRecId}).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.eavFlag = true;
            _this.eavForm = res.data;
            res.data.sex === 2 ? _this.eavForm.sex = '女' : _this.eavForm.sex = '男';
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 返回申请
      eavBackConfirm () {
        let _this = this;
        let _obj = {
          alloMediRecId: _this.eavForm.alloMediRecId,
          handleSchedule: _this.eavForm.handleSchedule
        };
        api.post(_this.apiPath.sins.updateRetById, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.eavFlag = false;
            _this.searchFun();
            _this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 审核-提交经办员
      eavSubConfirm (scopeRow) {
        let _this = this;
        let obj = {};
        if (scopeRow) {
          obj = {
            alloMediRecId: scopeRow.alloMediRecId,
            handleSchedule: scopeRow.handleSchedule
          };
        } else {
          obj = {
            alloMediRecId: _this.eavForm.alloMediRecId,
            handleSchedule: _this.eavForm.handleSchedule
          };
        }
        api.post(_this.apiPath.sins.updateEavById, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.eavFlag = false;
            _this.searchFun();
            _this.$message({message: '操作成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 打印
      confirm () {},
      // 查看
      seeFun (_data) {
        this.proProg = _data.handleSchedule;
        this.proRes = _data.handleResult;
        let _this = this;
        api.post(_this.apiPath.sins.findRecInfoById, {alloMediRecId: _data.alloMediRecId}).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.seeFlag = true;
            _this.alloSeeList = res.data;
            res.data.sex === 2 ? _this.alloSeeList.sex = '女' :  _this.alloSeeList.sex = '男';
            _this.activeNode = res.data.handleSchedule;
            if (_this.alloSeeList.alloMediRecHospiList.length === 0) {
              _this.alloSeeList.alloMediRecHospiList.push({
                hospiName: ''
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun (_data) {
        this.updateFlag = 2;
        this.applyFlag = true;
        this.articletitle = '异地医疗备案修改';
        api.post(this.apiPath.sins.findRecInfoById, {alloMediRecId: _data.alloMediRecId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.applyForm = res.data;
            this.applyCertNoForm.certNo = res.data.certNo;
            this.applyForm.applyDate = new Date(this.applyForm.applyDate);
            if (res.data.applyType === 2) {
              this.applyTypeFlag = false;
            } else {
              this.applyTypeFlag = true;
            }
            let _this = this;
            let _copyData = JSON.parse(JSON.stringify(res.data));
            setTimeout(function () {
              _this.applyForm = res.data;
              _this.applyForm.abroadAlloSettleCity = _copyData.abroadAlloSettleCity;
              _this.applyForm.abroadAlloSettleCityName = _copyData.abroadAlloSettleCityName;
              setTimeout(function () {
                _this.applyForm.abroadAlloSettleDist = _copyData.abroadAlloSettleDist;
                _this.applyForm.abroadAlloSettleDistName = _copyData.abroadAlloSettleDistName;
              }, 300);
              _this.applyForm.alloMediRecMatList = _copyData.alloMediRecMatList;
            }, 100);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 保存异地申请
      saveApplyForm () {
        let _this = this;
        _this.$refs.applyCertNoForm.validate((valid) => {
          if (!valid) {
            return false;
          }
        });
        _this.$refs.applyForm.validate((valid) => {
          if (valid) {
            _this.applyForm.applyDate = Vue.filter('date')(_this.applyForm.applyDate, 'yyyy-MM-dd');
            _this.applyForm.certNo = _this.applyCertNoForm.certNo;
            if (_this.updateFlag === 1) { // 新增
              api.post(_this.apiPath.sins.saveRecInfo, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            } else { // 修改
              api.post(_this.apiPath.sins.updateRecInfoByIdSave, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 申请弹层提交经办员
      submitApplyForm () {
        let _this = this;
        _this.$refs.applyCertNoForm.validate((valid) => {
          if (!valid) {
            return false;
          }
        });
        _this.$refs.applyForm.validate((valid) => {
          if (valid) {
            _this.applyForm.applyDate = Vue.filter('date')(_this.applyForm.applyDate, 'yyyy-MM-dd');
            _this.applyForm.certNo = _this.applyCertNoForm.certNo;
            if (_this.updateFlag === 1) { // 新增
              api.post(_this.apiPath.sins.saveRecInfoSubmit, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            } else { // 修改
              api.post(_this.apiPath.sins.updateRecInfoByIdSubmit, _this.applyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.applyFlag = false;
                  _this.searchFun();
                  _this.$message({message: '操作成功！', type: 'success'});
                } else {
                  _this.applyForm.applyDate = new Date(_this.applyForm.applyDate);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // reset
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.$refs['applyCertNoForm'].resetFields();
        this.applyForm.alloMediRecMatList = null;
        this.applyCertNoForm.certNo = '';
        this.applyForm.applyType = 1;
        this.applyForm.applyTypeName = '申请备案';
      }
    }
  };
</script>
