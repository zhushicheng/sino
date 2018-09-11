<template>
  <!--新增地方基本信息-->
  <div class="usermanage localinfo">
    <sino-con>
      <sino-title type="levelOne" :title="stateFlag === 'add'?'新增客户信息':'修改客户信息'"></sino-title>
      <sino-form :model="custInfoForm" ref="custInfoForm" class="serch-form">
        <!--<sino-title type="levelTwo" title="基础信息">dddd: '',</sino-title>-->
        <div class="local-info">
          <ul class="local-info-ul">
            <li>
              <sino-form-item label="关联销售线索：" class="search-inner-item" prop="saleClueName">
                <sino-select :filterable="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findSaleClueSelectBox"
                             :data="{}"
                             :chooseName.sync="custInfoForm.saleClueName"
                             :chooseId.sync="custInfoForm.saleClueId"
                             @change="getInteger"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="emp-address" >
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custChName" :rules="[{ required: true, message: '请输入客户名称', trigger: 'change'}]">
                <sino-input class="fl" type="text"
                            v-model="custInfoForm.custChName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="客户来源：" class="search-inner-item" prop="custSource">
                <sino-radio v-for="(item, index) in sourceList" :key="index"
                            v-model.number="custInfoForm.custSource"
                            :label="item.id" @click="custFn">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.custSource === 2" class="emp-address">
              <sino-form-item label="签约供应商：" class="search-inner-item " prop="signSuppName" :rules="[{ required: true, message: '请选择签约供应商', trigger: 'change'}]">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :data="{code: 'SUPP_TYPE'}"
                             :url="selectBox"
                             :token="token"
                             :chooseName.sync="custInfoForm.signSuppName"
                             :chooseId.sync="custInfoForm.signSuppId"
                             @change="signSuppChange"
                             :clear="true" >
                </sino-select>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.custSource === 2" class="emp-address" >
              <sino-form-item label="付费供应商：" class="search-inner-item" prop="paySuppName" :rules="[{ required: true, message: '请选择付费供应商', trigger: 'change'}]">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :data="{code: 'SUPP_TYPE'}"
                             :url="selectBox"
                             :token="token"
                             :chooseName.sync="custInfoForm.paySuppName"
                             :chooseId.sync="custInfoForm.paySuppId"
                             :clear="true" >
                </sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <sino-title type="levelTwo" title="客户法定信息"></sino-title>
        <div class="local-info">
          <ul class="local-info-ul">
            <li  class="emp-address">
              <sino-form-item label="证件类型：" class="search-inner-item sino-from-wid" prop="certTypeName" :rules="[{ required: Boolean(custInfoForm.custSource === 1) && custInfoForm.certType, message: '地方标准组合为必填项', trigger: 'change'}]">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'CUST_REG_CERT_TYPE'}"
                             :chooseName.sync="custInfoForm.certTypeName"
                             :chooseId.sync="custInfoForm.certType" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.certType === 5">
              <sino-form-item label="证件号码：" class="search-inner-item sino-from-wid" prop="custCertPer.certNo" :rules="[{ required: Boolean(custInfoForm.certType === 5), message: '请输入证件号码', trigger: 'blur'}, {validator: this.validator.checkcerNoCode, trigger: 'blur'}]">
                <sino-input v-model="custInfoForm.custCertPer.certNo"></sino-input>
              </sino-form-item>
            </li>
            <!--证件类为： 事业单位法人证书-->
            <div v-if="custInfoForm.certType === 1">
              <li>
                <sino-form-item label="统一社会信用代码：" class="search-inner-item" prop="custCertInsti.certCode" :rules="[{ required: Boolean(custInfoForm.certType === 1), message: '请输入统一社会信用代码', trigger: 'change'}, {validator: this.validator.checkCode, trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.certCode"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="名称：" class="search-inner-item" prop="custCertInsti.name">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.name"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="经费来源：" class="search-inner-item" prop="custCertInsti.capSource">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.capSource"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="住所：" class="search-inner-item" prop="custCertInsti.addr">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.addr"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="法定代表人：" class="search-inner-item" prop="custCertInsti.legalPer">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.legalPer"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address">
                <sino-form-item label="宗旨和业务范围：" class="search-inner-item" prop="custCertInsti.busiRange">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.busiRange"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="开办单位：" class="search-inner-item" prop="custCertInsti.unit">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.unit"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li  class="emp-date">
                <sino-form-item label="有效期自：" class="sup-form-item fr ml-15" prop="custCertInsti.begDate">
                  <sino-date-picker
                    v-model="custInfoForm.custCertInsti.begDate"
                    :picker-options="pickerOptionsBeg"
                    type="date"
                    :editable="false"
                    :readonly="false"
                    :clearable="true"
                  >
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl special-span">至</span>
                <sino-form-item class="sup-form-item fr ml-15 near-sino-form-item" prop="custCertInsti.endDate">
                  <sino-date-picker
                    v-model="custInfoForm.custCertInsti.endDate"
                    :picker-options="pickerOptionsEnd"
                    type="date"
                    :editable="false"
                    :readonly="false"
                    :clearable="true"
                  >
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="开办资金：" class="search-inner-item" prop="custCertInsti.cap">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertInsti.cap"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
            </div>
            <!--证件类型 为 ：企业法人营业执照 -->
            <div v-if="custInfoForm.certType === 2">
              <li>
                <sino-form-item label="统一社会信用代码：" class="search-inner-item" prop="custCertLic.certCode" :rules="[{ required: Boolean(custInfoForm.custSource === 1), message: '请输入统一社会信用代码', trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertLic.certCode"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="单位注册名称：" class="search-inner-item" prop="custCertLic.name" :rules="[{ required: Boolean(custInfoForm.custSource === 1), message: '请输入单位注册名称', trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertLic.name"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="法定代表人姓名：" class="search-inner-item" prop="custCertLic.legalPer">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertLic.legalPer"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-sino-radio-date" style="width: 66.5%">
                <sino-form-item label="营业期限：" class="search-inner-item sino-form-item-radio sino-form-item-radio2" prop="custCertLic.licTov" style="width: 44%">
                  <!--<sino-radio v-for="item in pkgStateList"-->
                  <!--v-model.number="custInfoForm.stanType"-->
                  <!--:label="item.id">{{item.title}}</sino-radio>-->
                  <sino-radio v-model="custInfoForm.custCertLic.licTov" :label="1">长期</sino-radio>
                  <sino-radio v-model="custInfoForm.custCertLic.licTov" :label="0">非长期</sino-radio>
                </sino-form-item>
                <div class="sino-radio-date clearfix" v-if="custInfoForm.custCertLic.licTov === 0">
                  <sino-form-item class="sup-form-item near-sino-form-item fr ml-15" prop="custCertLic.begDate">
                    <sino-date-picker
                      v-model="custInfoForm.custCertLic.begDate"
                      :picker-options="pickerOptionsBeg"
                      type="date"
                      :editable="false"
                      :readonly="false"
                      :clearable="true"
                    >
                    </sino-date-picker>
                  </sino-form-item>
                  <span class="fl special-span">至</span>
                  <sino-form-item class="sup-form-item fr ml-15 near-sino-form-item" prop="custCertLic.endDate">
                    <sino-date-picker
                      v-model="custInfoForm.custCertLic.endDate"
                      :picker-options="pickerOptionsEnd"
                      type="date"
                      :editable="false"
                      :readonly="false"
                      :clearable="true"
                    >
                    </sino-date-picker>
                  </sino-form-item>
                </div>
              </li>
              <li>
                <sino-form-item label="注册资本：" class="search-inner-item " prop="custCertLic.cap">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertLic.cap"
                              :disabled="false">

                  </sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="住所：" class="search-inner-item" prop="custCertLic.addr">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertLic.addr"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="经营范围：" class="search-inner-item" prop="custCertLic.busiRange">
                  <sino-input class="fl" type="textarea"
                              v-model="custInfoForm.custCertLic.busiRange"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>


            </div>
            <!--证件类为： 社会团体登记证书-->
            <div v-if="custInfoForm.certType === 3">
              <li>
                <sino-form-item label="统一社会信用代码：" class="search-inner-item" prop="custCertSocOrg.certCode" :rules="[{ required: Boolean(custInfoForm.custSource === 1), message: '请输入统一社会信用代码', trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.certCode"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="名称：" class="search-inner-item" prop="custCertSocOrg.name">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.name"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="业务范围：" class="search-inner-item" prop="custCertSocOrg.busiRange">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.busiRange"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="住所：" class="search-inner-item" prop="custCertSocOrg.addr">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.addr"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="法定代表人：" class="search-inner-item" prop="custCertSocOrg.legalPer">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.legalPer"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="注册资金：" class="search-inner-item" prop="custCertSocOrg.cap">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.cap"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="活动区域：" class="search-inner-item" prop="custCertSocOrg.region">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.region"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="业务主管单位：" class="search-inner-item" prop="custCertSocOrg.unit">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertSocOrg.unit"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li  class="emp-date">
                <sino-form-item label="有效期自：" class="sup-form-item fr ml-15" prop="custCertSocOrg.begDate">
                  <sino-date-picker
                    v-model="custInfoForm.custCertSocOrg.begDate"
                    :picker-options="pickerOptionsBeg"
                    type="date"
                    :editable="false"
                    :readonly="false"
                    :clearable="true"
                  >
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl special-span">至</span>
                <sino-form-item class="sup-form-item fr ml-15 near-sino-form-item" prop="custCertSocOrg.endDate">
                  <sino-date-picker
                    v-model="custInfoForm.custCertSocOrg.endDate"
                    :picker-options="pickerOptionsEnd"
                    type="date"
                    :editable="false"
                    :readonly="false"
                    :clearable="true"
                  >
                  </sino-date-picker>
                </sino-form-item>
              </li>
            </div>
            <!--证件类型 为 ：外国地区企业长驻代表机构登记证 -->
            <div v-if="custInfoForm.certType === 4">
              <li>
                <sino-form-item label="注册号：" class="search-inner-item" prop="custCertRepo.regNo" :rules="[{ required: Boolean(custInfoForm.custSource === 1), message: '请输入注册号', trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.regNo"
                              :disabled="false" ></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="机构名称（中文）：" class="search-inner-item" prop="custCertRepo.orgNameCh">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.orgNameCh"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="首席代表姓名：" class="search-inner-item" prop="custCertRepo.legalPer">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.legalPer"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="emp-address" >
                <sino-form-item label="机构名称（英文）：" class="search-inner-item" prop="custCertRepo.orgNameEn">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.orgNameEn"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="国籍：" class="search-inner-item" prop="custCertRepo.nationalityName">
                  <sino-select :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'GM_COUNTRY'}"
                               :chooseName.sync="custInfoForm.custCertRepo.nationalityName"
                               :chooseId.sync="custInfoForm.custCertRepo.nationality" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li  >
                <sino-form-item label="派出企业名称：" class="search-inner-item" prop="custCertRepo.assCorpName">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.assCorpName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li >
                <sino-form-item label="派出企业注册地：" class="search-inner-item" prop="custCertRepo.assCorpAddr">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.assCorpAddr"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="业务范围：" class="search-inner-item" prop="custCertRepo.busiRange">
                  <sino-input class="fl" type="text"
                              v-model="custInfoForm.custCertRepo.busiRange"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="本机构设立日期：" class="search-inner-item" prop="custCertRepo.foundDate">
                  <sino-date-picker class="fl"
                                    v-model="custInfoForm.custCertRepo.foundDate"
                                    type="date"
                                    :editable="false"
                                    @change="takeDateCallback"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li  class="emp-date">
                <sino-form-item label="本证有效期限自：" class="sup-form-item fr ml-15" prop="custCertRepo.begDate">
                  <sino-date-picker
                    v-model="custInfoForm.custCertRepo.begDate"
                    :picker-options="pickerOptionsBeg"
                    type="date"
                    :editable="false"
                    :readonly="false"
                    :clearable="true"
                  >
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl special-span">至</span>
                <sino-form-item class="sup-form-item fr ml-15 near-sino-form-item" prop="custCertRepo.endDate">
                  <sino-date-picker
                    v-model="custInfoForm.custCertRepo.endDate"
                    :picker-options="pickerOptionsEnd"
                    type="date"
                    :editable="false"
                    :readonly="false"
                    :clearable="true"
                  >
                  </sino-date-picker>
                </sino-form-item>
              </li>
            </div>
            <!--证件类型 为 ：个人证件 -->
            <div v-if="custInfoForm.certType === 5"></div>
          </ul>
        </div>
        <!--客户基本信息页面-->
        <sino-title type="levelTwo" title="客户业务信息"></sino-title>
        <div class="local-info">
          <ul class="local-info-ul">
            <li v-if="custInfoForm.certType !== 5">
              <sino-form-item label="经济类型：" class="search-inner-item" prop="ecoTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'ECO_TYPE'}"
                             :chooseName.sync="custInfoForm.ecoTypeName"
                             :chooseId.sync="custInfoForm.ecoType" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.certType !== 5">
              <sino-form-item label="行业类型：" class="search-inner-item" prop="induTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'INDU_TYPE'}"
                             :chooseName.sync="custInfoForm.induTypeName"
                             :chooseId.sync="custInfoForm.induType" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.certType !== 5">
              <sino-form-item label="客户电话：" class="search-inner-item" prop="tel">
                <sino-input class="fl" type="text"
                            v-model="custInfoForm.tel"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="emp-address" v-if="custInfoForm.certType !== 5">
              <sino-form-item label="客户邮箱：" class="search-inner-item" prop="email">
                <sino-input class="fl" type="text"
                            v-model="custInfoForm.email"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.certType !== 5">
              <sino-form-item label="人员规模：" class="search-inner-item" prop="perScaleName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PER_SCALE'}"
                             :chooseName.sync="custInfoForm.perScaleName"
                             :chooseId.sync="custInfoForm.perScale" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="emp-address" v-if="custInfoForm.certType !== 5">
              <sino-form-item label="公司网址：" class="search-inner-item" prop="webSite">
                <sino-input class="fl" type="text"
                            v-model="custInfoForm.webSite"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li v-if="custInfoForm.certType !== 5">
              <sino-form-item label="年营业额：" class="search-inner-item" prop="tru">
                <sino-input class="fl" type="text"
                            v-model="custInfoForm.tru"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="emp-address" v-if="custInfoForm.certType !== 5">
              <sino-form-item label="办公地址：" class="search-inner-item" prop="addr">
                <sino-input class="fl" type="text"
                            v-model="custInfoForm.addr"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="收费截止日：" class="search-inner-item" prop="chargeEndDate" v-if="custInfoForm.custSource === 1">
                <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" trigger="hover" content="与客户或者签约供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月收费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月收费账单。"></sino-popover>
                <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover2 style="left:-130px;"></i>
                <sino-input class="fl" type="text"
                            v-model.number="custInfoForm.chargeEndDate"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="remak" v-if="custInfoForm.certType !== 5">
              <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
                <sino-input type="textarea" v-model="custInfoForm.remark" :disabled="false" ></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="addlocalFun">确 定</sino-button>
          <sino-button type="text" @click="resetAddLocal">返 回</sino-button>
        </div>
      </sino-form>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        token: Cookie.get('Token'),
        areaUrl: this.apiPath.hrsc.findAreaList,
        findSaleClueSelectBox: this.apiPath.crm.findSaleClueSelectBox,
        dddd: '',
        custInfoForm: {
          saleClueId: '', // 销售线索
          saleClueName: '',
          certTypeName: '', // 证件类型名称
          certType: '', // 证件类型
          custSource: 1, // 客户来源
          custChName: '', // 客户名称
          signSuppId: '', // 签约供应商
          signSuppName: '', // 签约供应商
          paySuppName: '', // 付费供应商
          paySuppId: '', // 付费供应商
          chargeEndDate: '', // 收费截止日
          custCertPer: {
            certNo: ''   // 证件号码
          },
          custCertInsti: { // <事业单位> 《隐藏》
            certCode: '', // 社会统一信用代码
            name: '', // 名称
            busiRange: '', // 宗旨业务范围
            addr: '', // 住所
            legalPer: '', // 法定代表人
            capSource: '', // 经费来源
            cap: '', //  开办资金
            unit: '', //  开办单位
            begDate: '', // 开始日期
            endDate: '' // 结束日期
          },
          custCertLic: { // 企业法人 《隐藏》
            certCode: '', // 社会统一信用代码
            name: '', // 名称
            legalPer: '', // 法定代表人
            busiRange: '', // 宗旨业务范围
            cap: '', //  开办资金
            addr: '', // 住所
            foundDate: '', //  本机构设立日期
            licTov: '', //  营业期限长期 非长期
            begDate: '', // 开始日期
            endDate: '' // 结束日期
          },
          custCertRepo: { //  * 外国（地区）企业常驻代表机构登记证实体类《隐藏》
            regNo: '', // 注册号
            orgNameCh: '', // 机构名称 中文
            legalPer: '', // 法定代表人
            orgNameEn: '', // 机构名称 英文
            nationality: '', // 国籍
            nationalityName: '', // 国籍名
            assCorpName: '', // 派出企业名称
            assCorpAddr: '', // 派出企业注册地
            busiRange: '', // 宗旨业务范围
            foundDate: '', //  本机构设立日期
            begDate: '', // 开始日期
            endDate: '' // 结束日期
          },
          custCertSocOrg: { //  *  社会团体登记证书实体类 《隐藏》
            certCode: '', // 社会统一信用代码
            name: '', // 名称
            busiRange: '', // 宗旨业务范围
            addr: '', // 住所
            legalPer: '', // 法定代表人
            cap: '', //  开办资金
            region: '', // 活动地域
            unit: '', //  业务主管单位
            begDate: '', // 开始日期
            endDate: '' // 结束日期
          },
          ecoTypeName: '', //  《————客户信息————》 经纪类型名
          ecoType: '', // 经济类型
          induTypeName: '', // 行业类型名
          induType: '', // 行业类型
          tel: '', // 客户电话
          email: '', // 客户邮箱
          perScaleName: '', // 人员规模
          perScale: '', // 人员规模
          tru: '', // 年营业额
          webSite: '', // 客户公司网址
          remark: '' // 备注
        },
        addlocalInfoRules: {
          custChName: [
            {required: true, message: '请输入客户名称', trigger: 'change'}
          ],
          signSuppName: [
            {required: true, message: '请选择签约供应商', trigger: 'blur'}
          ],
          paySuppName: [
            {required: true, message: '请选择付费供应商', trigger: 'blur'}
          ],
          certTypeName: [
            {required: true, message: '请选择证件类型', trigger: 'change'}
          ],
          // "custCertInsti.certCode": [ // 事业单位
          //   {required: true, message: '请输入统一社会信用代码', trigger: 'blur'},
          //   {validator: this.validator.checkCode, trigger: 'blur'}
          // ],
          // "custCertLic.certCode": [ // 企业法人营业执照
          //   {required: true, message: '请输入统一社会信用代码', trigger: 'blur'},
          //    {validator: this.validator.checkCode, trigger: 'blur'}
          // ],
          // "custCertLic.name": [
          //   {required: true, message: '请输入单位注册名称', trigger: 'blur'}
          // ],
          // "custCertSocOrg.certCode": [ // 社会团体登记证书
          //   {required: true, message: '请输入统一社会信用代码', trigger: 'blur'},
          //   {validator: this.validator.checkCode, trigger: 'blur'}
          // ],
          // "custCertRepo.regNo": [ // 外国 常住机构
          //   {required: true, message: '请输入注册号', trigger: 'blur'}
          // ],
          chargeEndDate: [
            {validator: this.validator.checkDateNum, type: 'number', trigger: 'blur'}
          ],
          "custCertPer.certNo": [
            {required: true, message: '请输入证件号码', trigger: 'blur'}
          ],
          tru: [ // 外国 常住机构
            {validator: this.validator.checkNum}
          ]
        },
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() > new Date(this.custInfoForm.endDate);
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.custInfoForm.begDate);
          }
        },
        pkgStateList: [],
        sourceList: [],
        stateFlag: '',
        saveData: '',
        initFlag: false // 判断修改初始化进来不让其触发销售线索改变的标志；
      };
    },
    mounted: function () {
      api.post(this.dictSelUrl, {code: 'CUST_SOURCE'}).then(res => {
        this.sourceList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      if (this.stateFlag === 'modify') {
        let _data = {
          custId: this.$route.query.custId
        };
        api.post(this.apiPath.hrsc.findCustInfo, _data).then(res => {
          this.custInfoForm = res.data;
          if (res.data.certType === 1) { // 事业单位法人证书
//              this.saveData = this.custInfoForm.custCertInsti;
            this.custInfoForm.custCertLic = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              legalPer: '', // 法定代表人
              busiRange: '', // 宗旨业务范围
              cap: '', //  开办资金
              addr: '', // 住所
              foundDate: '', //  本机构设立日期
              licTov: '', //  营业期限长期 非长期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertSocOrg = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              cap: '', //  开办资金
              region: '', // 活动地域
              unit: '', //  业务主管单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertRepo = {
              regNo: '', // 注册号
              orgNameCh: '', // 机构名称 中文
              legalPer: '', // 法定代表人
              orgNameEn: '', // 机构名称 英文
              nationality: '', // 国籍
              nationalityName: '', // 国籍名
              assCorpName: '', // 派出企业名称
              assCorpAddr: '', // 派出企业注册地
              busiRange: '', // 宗旨业务范围
              foundDate: '', //  本机构设立日期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertPer = {
              certNo: '' // 注册号
            };
          } else
          if (res.data.certType === 2) { // 企业法人营业执照实体类
//            this.custCertLic = this.custInfoForm.custCertLic;
            this.custInfoForm.custCertInsti = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              capSource: '', // 经费来源
              cap: '', //  开办资金
              unit: '', //  开办单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertSocOrg = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              cap: '', //  开办资金
              region: '', // 活动地域
              unit: '', //  业务主管单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertRepo = {
              regNo: '', // 注册号
              orgNameCh: '', // 机构名称 中文
              legalPer: '', // 法定代表人
              orgNameEn: '', // 机构名称 英文
              nationality: '', // 国籍
              nationalityName: '', // 国籍名
              assCorpName: '', // 派出企业名称
              assCorpAddr: '', // 派出企业注册地
              busiRange: '', // 宗旨业务范围
              foundDate: '', //  本机构设立日期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertPer = {
              certNo: '' // 注册号
            };
          } else
          if (res.data.certType === 3) { // 社会团体登记证书
//            this.custCertSocOrg = this.custInfoForm.custCertSocOrg;
            this.custInfoForm.custCertInsti = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              capSource: '', // 经费来源
              cap: '', //  开办资金
              unit: '', //  开办单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertLic = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              legalPer: '', // 法定代表人
              busiRange: '', // 宗旨业务范围
              cap: '', //  开办资金
              addr: '', // 住所
              foundDate: '', //  本机构设立日期
              licTov: '', //  营业期限长期 非长期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertRepo = {
              regNo: '', // 注册号
              orgNameCh: '', // 机构名称 中文
              legalPer: '', // 法定代表人
              orgNameEn: '', // 机构名称 英文
              nationality: '', // 国籍
              nationalityName: '', // 国籍名
              assCorpName: '', // 派出企业名称
              assCorpAddr: '', // 派出企业注册地
              busiRange: '', // 宗旨业务范围
              foundDate: '', //  本机构设立日期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertPer = {
              certNo: '' // 注册号
            };
          } else
          if (res.data.certType === 4) { // 外国（地区）企业常驻代表机构登记证实体类
//            this.custCertRepo = this.custInfoForm.custCertRepo;
            this.custInfoForm.custCertInsti = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              capSource: '', // 经费来源
              cap: '', //  开办资金
              unit: '', //  开办单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertLic = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              legalPer: '', // 法定代表人
              busiRange: '', // 宗旨业务范围
              cap: '', //  开办资金
              addr: '', // 住所
              foundDate: '', //  本机构设立日期
              licTov: '', //  营业期限长期 非长期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertSocOrg = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              cap: '', //  开办资金
              region: '', // 活动地域
              unit: '', //  业务主管单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertPer = {
              certNo: '' // 注册号
            };
          } else
          if (res.data.certType === 5) { // 外国（地区）企业常驻代表机构登记证实体类
//            this.custCertRepo = this.custInfoForm.custCertRepo;
            this.custInfoForm.custCertInsti = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              capSource: '', // 经费来源
              cap: '', //  开办资金
              unit: '', //  开办单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertLic = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              legalPer: '', // 法定代表人
              busiRange: '', // 宗旨业务范围
              cap: '', //  开办资金
              addr: '', // 住所
              foundDate: '', //  本机构设立日期
              licTov: '', //  营业期限长期 非长期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertSocOrg = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              cap: '', //  开办资金
              region: '', // 活动地域
              unit: '', //  业务主管单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertRepo = {
              regNo: '', // 注册号
              orgNameCh: '', // 机构名称 中文
              legalPer: '', // 法定代表人
              orgNameEn: '', // 机构名称 英文
              nationality: '', // 国籍
              nationalityName: '', // 国籍名
              assCorpName: '', // 派出企业名称
              assCorpAddr: '', // 派出企业注册地
              busiRange: '', // 宗旨业务范围
              foundDate: '', //  本机构设立日期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
          } else {
            this.custInfoForm.custCertInsti = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              capSource: '', // 经费来源
              cap: '', //  开办资金
              unit: '', //  开办单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertLic = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              legalPer: '', // 法定代表人
              busiRange: '', // 宗旨业务范围
              cap: '', //  开办资金
              addr: '', // 住所
              foundDate: '', //  本机构设立日期
              licTov: '', //  营业期限长期 非长期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertSocOrg = {
              certCode: '', // 社会统一信用代码
              name: '', // 名称
              busiRange: '', // 宗旨业务范围
              addr: '', // 住所
              legalPer: '', // 法定代表人
              cap: '', //  开办资金
              region: '', // 活动地域
              unit: '', //  业务主管单位
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertRepo = {
              regNo: '', // 注册号
              orgNameCh: '', // 机构名称 中文
              legalPer: '', // 法定代表人
              orgNameEn: '', // 机构名称 英文
              nationality: '', // 国籍
              nationalityName: '', // 国籍名
              assCorpName: '', // 派出企业名称
              assCorpAddr: '', // 派出企业注册地
              busiRange: '', // 宗旨业务范围
              foundDate: '', //  本机构设立日期
              begDate: '', // 开始日期
              endDate: '' // 结束日期
            };
            this.custInfoForm.custCertPer = {
              certNo: '' // 注册号
            };
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    created: function () {
      this.stateFlag = this.$route.query.type;
      if (this.stateFlag === 'modify') {
        this.initFlag = true;
      }
    },
    methods: {
      signSuppChange () {
        this.custInfoForm.paySuppName = this.custInfoForm.signSuppName;
        this.custInfoForm.paySuppId = this.custInfoForm.signSuppId;
        console.log(this.custInfoForm.paySuppName);
      },
      custFn () {
        if (this.custInfoForm.custSource === 2) {
          this.istrue = false;
        } else {
          this.istrue = true;
        }
      },
      getInteger () {
        if (this.initFlag === true) {
          this.initFlag = false;
          return;
        }
        if (this.custInfoForm.saleClueId === '') {
          return;
        }
        api.postsign(this.apiPath.crm.findSaleClueById, this.custInfoForm.saleClueId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.custInfoForm.induType = res.data.induType; // 行业类型
            this.custInfoForm.induTypeName = res.data.induTypeName;
            this.custInfoForm.tel = res.data.tel; // 公司电话
            this.custInfoForm.email = res.data.email; // 公司邮箱
            this.custInfoForm.perScale = res.data.perScale; // 人员规模
            this.custInfoForm.perScaleName = res.data.perScaleName;
            this.custInfoForm.custChName = res.data.corpName; // 带出客户名称 ->公司名称
          }
        }).catch(err => {
          console.log(err);
        });
      },
      takeDateCallback (val) {
        this.custInfoForm.takeEffectDate = val;
      },
      // 确 定
      addlocalFun () {
        this.$refs.custInfoForm.validate((valid) => {
          if (valid) {
            if (this.stateFlag === 'add') {
              if (this.custInfoForm.certType === 1) { // 事业单位法人证书
                this.custInfoForm.custCertInsti.begDate = Vue.filter('date')(this.custInfoForm.custCertInsti.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertInsti.endDate = Vue.filter('date')(this.custInfoForm.custCertInsti.endDate, 'yyyy-MM-dd');
              }
              if (this.custInfoForm.certType === 2) { // 企业法人营业执照实体类
                this.custInfoForm.custCertLic.begDate = Vue.filter('date')(this.custInfoForm.custCertLic.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertLic.endDate = Vue.filter('date')(this.custInfoForm.custCertLic.endDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertLic.foundDate = Vue.filter('date')(this.custInfoForm.custCertLic.foundDate, 'yyyy-MM-dd');
              }
              if (this.custInfoForm.certType === 3) { // 社会团体登记证书
                this.custInfoForm.custCertSocOrg.begDate = Vue.filter('date')(this.custInfoForm.custCertSocOrg.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertSocOrg.endDate = Vue.filter('date')(this.custInfoForm.custCertSocOrg.endDate, 'yyyy-MM-dd');
              }
              if (this.custInfoForm.certType === 4) { // 外国（地区）企业常驻代表机构登记证实体类
                this.custInfoForm.custCertRepo.begDate = Vue.filter('date')(this.custInfoForm.custCertRepo.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertRepo.endDate = Vue.filter('date')(this.custInfoForm.custCertRepo.endDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertRepo.foundDate = Vue.filter('date')(this.custInfoForm.custCertRepo.foundDate, 'yyyy-MM-dd');
              }
              api.post(this.apiPath.hrsc.saveCust, this.custInfoForm).then(res => {
                if (res.code == 'CPYY-00001') {
                  let _this = this;
                  this.$message({message: '新增成功！',
                    type: 'success',
                    onClose: function () {
                      if (_this.$route.query.backType && _this.$route.query.backType === 'buscon') {
                        _this.$router.push({path: '/custBusCon/addBusCon', query: {custId: res.data.custId, custName: res.data.custChName}});
                      } else {
                        _this.$router.push({path: '/custInfo', cache: false});
                      }
                    }
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (this.stateFlag === 'modify') {
              // 新增
              this.custInfoForm.custId = this.$route.query.custId;
              if (this.custInfoForm.certType === 1) { // 事业单位法人证书
                this.custInfoForm.custCertInsti.begDate = Vue.filter('date')(this.custInfoForm.custCertInsti.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertInsti.endDate = Vue.filter('date')(this.custInfoForm.custCertInsti.endDate, 'yyyy-MM-dd');
              }
              if (this.custInfoForm.certType === 2) { // 企业法人营业执照实体类
                this.custInfoForm.custCertLic.begDate = Vue.filter('date')(this.custInfoForm.custCertLic.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertLic.endDate = Vue.filter('date')(this.custInfoForm.custCertLic.endDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertLic.foundDate = Vue.filter('date')(this.custInfoForm.custCertLic.foundDate, 'yyyy-MM-dd');
              }
              if (this.custInfoForm.certType === 3) { // 社会团体登记证书
                this.custInfoForm.custCertSocOrg.begDate = Vue.filter('date')(this.custInfoForm.custCertSocOrg.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertSocOrg.endDate = Vue.filter('date')(this.custInfoForm.custCertSocOrg.endDate, 'yyyy-MM-dd');
              }
              if (this.custInfoForm.certType === 4) { // 外国（地区）企业常驻代表机构登记证实体类
                this.custInfoForm.custCertRepo.begDate = Vue.filter('date')(this.custInfoForm.custCertRepo.begDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertRepo.endDate = Vue.filter('date')(this.custInfoForm.custCertRepo.endDate, 'yyyy-MM-dd');
                this.custInfoForm.custCertRepo.foundDate = Vue.filter('date')(this.custInfoForm.custCertRepo.foundDate, 'yyyy-MM-dd');
              }
              api.post(this.apiPath.hrsc.updateCustInfEo, this.custInfoForm).then(res => {
                if (res.code == 'CPYY-00001') {
                  let _this = this;
                  this.$message({message: '修改成功！',
                    type: 'success',
                    onClose: function () {
                      _this.$router.push({path: '/custInfo', cache: false});
                    }
                  });
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
      resetAddLocal () {
        this.$router.push({path: '/custInfo'});
      }
    }
  };
</script>
