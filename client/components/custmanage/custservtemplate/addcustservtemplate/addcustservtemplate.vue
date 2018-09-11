<template>
  <!--<div>新增产品服务模板</div>-->
  <div class="usermanage localinfo" id="localinfoId">
    <sino-form :model="addForm"  class="serch-form" ref="addForm">
      <sino-con class="first-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
        <sino-title type="levelOne" title="新增产品服务模板"></sino-title>
        <div class="crumbs">
          <ul>
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span @click="stepFun(1)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>选择服务费计费方式</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2}"><span @click="stepFun(2)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>选择服务产品</span></li>
            <li :class="{'li-active': activeNode === 3}"><span @click="stepFun(3)"><i class="step-num iconfont">3</i>设置产品服务要求</span></li>
          </ul>
        </div>
      </sino-con>
      <sino-con class="second-con" v-if="scrollDist > 37" id="second-con-id">
      </sino-con>
      <sino-con class="third-con" id="third-con-id">
        <div class="crumb-box clearfix" v-if="activeNode >= 1">
          <sino-title type="levelTwo" title="选择服务费计费方式"></sino-title>
          <div class="local-info">
            <ul class="local-info-ul cust-template-ul">
              <li class="content-big-box ml33">
                <sino-form-item label="客户名称：" prop="serviceCharge.custName" class="search-inner-item"  :rules="[{ required: true, message: '客户名称为必填项', trigger: 'change'}]">
                  <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                               :disabled="custDisFlag" :totalNum="false" :isPage="true" :isGroup="false"
                               :chooseName.sync="addForm.serviceCharge.custName"
                               :chooseId.sync="addForm.serviceCharge.custId" :clear="true" :url="custInfoSelectBoxSource" :token="token" @change="custChange"></sino-select>
                </sino-form-item>
              </li>
              <li class="content-big-box ml33 serveChargingType-li">
                <sino-form-item label="服务费计费方式："  prop="serviceCharge.serveChargingType" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费计费方式为必填项', trigger: 'change'}]">
                  <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start"
                                trigger="hover">
                    <p>服务费计费方式：服务费的收取方式。</p>
                    <p>按明细计算：各项服务的服务费分开计算。</p>
                    <p>按汇总计算：各项服务的服务费一起计算。</p>
                    <i class="iconfont sino-fangxingwenhao"
                       style="float:left;margin-top:4px;margin-left:-143px;color:#399ff2" slot="reference"></i>
                  </sino-popover>
                  <sino-radio-group v-model.number="addForm.serviceCharge.serveChargingType" @change="serviceChargeChange">
                    <sino-radio v-for="(item, index) in billingMethodArr" :key="index"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-radio-group>
                </sino-form-item>
              </li>
            </ul>
            <div class="conf-btn">
              <sino-button type="primary" @click="addlocalFun1" v-if="activeNode === 1">下一步</sino-button>
            </div>
          </div>
        </div>
        <div class="crumb-box clearfix" v-if="activeNode >= 2">
          <sino-title type="levelTwo" title="选择服务产品"></sino-title>
          <div class="local-info">
            <ul class="local-info-ul cust-template-ul">
              <li class="content-big-box">
                <sino-form-item label="选择服务内容：" prop="serviceProduct.priceNames" class="search-inner-item" :rules="[{ required: true, type: 'array', message: '服务内容为必填项', trigger: 'change'}]">
                  <sino-popover :popper-class="'questionTip'"placement="bottom-start"
                                trigger="hover">
                    <p>选择需要向雇员提供的服务。</p>
                    <i class="iconfont sino-fangxingwenhao"
                       style="float:left;margin-top:4px;margin-left:-130px;color:#399ff2" slot="reference"></i>
                  </sino-popover>
                  <sino-select class="fl" :filterable="true" :multiselect="true" :isshowTotol="false"
                               :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                               :chooseName.sync="addForm.serviceProduct.priceNames"
                               :chooseId.sync="addForm.serviceProduct.priceIds" :clear="true"
                               :url="prodPriceScheSelectBox"
                               v-if="addForm.serviceCharge.serveChargingType === 1"
                               @change="serviceChange"
                  ></sino-select>
                  <sino-select class="fl" :filterable="true" :multiselect="true" :isshowTotol="false"
                               :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                               :chooseName.sync="addForm.serviceProduct.priceNames"
                               :chooseId.sync="addForm.serviceProduct.priceIds" :clear="true"
                               :url="findServeContent"
                               v-if="addForm.serviceCharge.serveChargingType !== 1"
                               @change="serviceChange"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行地区：" prop="serviceProduct.areaName" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                  <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                               :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                               :chooseName.sync="addForm.serviceProduct.areaName"
                               :chooseId.sync="addForm.serviceProduct.areaId" :clear="true" :url="areaSelectBox"
                               @change="areaChange"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li class="content-big-box">
                <sino-form-item label="受托供应商：" prop="serviceProduct.receSuppName" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                  <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                               :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                               :chooseName.sync="addForm.serviceProduct.receSuppName" :linkage="true" :data="secondData"
                               :chooseId.sync="addForm.serviceProduct.receSuppId" :clear="true" :url="selectBox" :autoChoose="true"
                               @change="receSuppChange"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li class="clearfix">
                <sino-form-item label="起做止做原则：" prop="serviceProduct.begEndPrinName" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                  <sino-popover :popper-class="'questionTip'"placement="bottom-start"
                                trigger="hover">
                    <p>约定订单开始日期与服务开始执行日期的关系，分为：15号原则、当月做。</p>
                    <img src="../../../../assets/img/instance15.png"  style="width:100%;margin-bottom:10px;"/>
                    <img src="../../../../assets/img/duringMonth.png" style="width:100%;"/>
                    <i class="iconfont sino-fangxingwenhao"
                       style="float:left;margin-top:4px;margin-left:-130px;color:#399ff2" slot="reference"></i>
                  </sino-popover>
                  <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                               :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                               :chooseName.sync="addForm.serviceProduct.begEndPrinName"
                               :chooseId.sync="addForm.serviceProduct.begEndPrin " :clear="true" :url="selUrl"
                               :data="{code:'BEG_END_PRIN '}" @change="begEndPrinChange"></sino-select>
                </sino-form-item>
              </li>
            </ul>
            <div class="conf-btn">
              <sino-button type="primary" @click="addlocalFun2" v-if="activeNode === 2">下一步</sino-button>
            </div>
          </div>
        </div>
        <div class="crumb-box clearfix" v-if="activeNode >= 3">
          <sino-title type="levelTwo" title="设置产品要求"></sino-title>
          <!--社保-->
          <div class="crumb-box-child clearfix" v-for="(item, index) in addForm.serviceRequire.serveTempDetSinses" :key="item.priceId">
            <h6>{{addForm.serviceRequire.serveTempDetSinses[index].priceName}}</h6>
            <div class="local-info">
              <ul class="local-info-ul cust-template-ul" >
                <li v-if="addForm.serviceCharge.serveChargingType === 1">
                  <sino-form-item label="服务费收费金额：" :prop="'serviceRequire.serveTempDetSinses['+index+'].serveTempDetServe.chargeMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为必填项', trigger: 'change'}]">
                    <sino-input v-model.number="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetServe.chargeMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="addForm.serviceCharge.serveChargingType === 1 && serveTempDetSinses[index]">
                  <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetSinses['+index+'].serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, message: '付费金额为必填项', trigger: 'change'},{ validator: validator.checkNum, message:'付费金额为数字类型', trigger: 'change'}]">
                    <sino-input v-model="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="addForm.serviceCharge.serveChargingType === 1 && !serveTempDetSinses[index]" >
                  <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetSinses['+index+'].serveTempDetServe.payMoney'" class="search-inner-item">
                    <sino-input v-model="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="addForm.serviceCharge.serveChargingType === 1">
                  <sino-form-item label="服务费发票科目：" :prop="'serviceRequire.serveTempDetSinses['+index+'].serveTempDetServe.invSubName'" class="search-inner-item" :rules="[{ required: true, message: '服务费发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetServe.invSubName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetServe.invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{data:{invSubType:1}}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].areaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].areaName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].areaId" :clear="true" :url="areaSelectBox"
                                 @change="sinsAreaChange(index)"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="受托供应商：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].receSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" @change="sinsSuppChange(addForm.serviceRequire.serveTempDetSinses[index].receSuppId, index)"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].receSuppName" :linkage="true"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].receSuppId" :clear="true" :url="selectBox"  :data="watchObj['sinsAreaObj'+index]"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="起做止做原则：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].begEndPrinName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].begEndPrin" :clear="true" :url="selUrl"
                                 :data="{code:'BEG_END_PRIN '}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="缴费方式：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].payFeeWay'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '缴费方式为必填项', trigger: 'change'}]">
                    <sino-popover :popper-class="'questionTip'"placement="bottom-start"
                                  trigger="hover">
                      <p>大库：将雇员的社保缴纳在受托供应商的社保账户下，也称“大盘”。</p>
                      <p>单立户：将雇员的社保缴纳在客户/企业自己的社保账户下，也称“小盘”/“独立户”。</p>
                      <i class="iconfont sino-fangxingwenhao"
                         style="float:left;margin-top:4px;margin-left:-102px;color:#399ff2" slot="reference"></i>
                    </sino-popover>
                    <sino-radio-group v-model.number="addForm.serviceRequire.serveTempDetSinses[index].payFeeWay" @change="sinsPayFreeChange(index,addForm.serviceRequire.serveTempDetSinses[index].payFeeWay)">
                      <sino-radio v-for="(item, _index) in payFeeArr" :key="_index"
                                  :label="item.id">{{item.title}}</sino-radio>
                    </sino-radio-group>
                  </sino-form-item>
                </li>
                <li class="content-big-box">
                  <sino-form-item label="社保企业账户：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].acctNames'" class="search-inner-item add-acount-jump" :rules="[{ required: true, type: 'array', message: '社保账户为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="true" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].acctNames" :autoChoose="true"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].acctIds" :clear="true" :url="AcctSelectBox"
                                 :data="watchObj['sinsAcctObj'+index]" @change="checkSinsFun(index)"></sino-select>
                    <sino-button type="icon-text cust-template-icon-text" @click="jumpSinsFun(index)"><i class="iconfont sino-add"></i>新增</sino-button>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口性质：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[0].householdType'" class="search-inner-item">
                    <sino-checkbox v-for="(item, _index) in registeredArr" :key="_index" class="mt5"
                                v-model="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[0].householdType" @change="householdTypeOneChange(index, 0)"
                                :label="item.id" v-if="item.id === 1">{{item.title}}</sino-checkbox>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保缴费标准：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[0].pkgName'" class="search-inner-item" :rules="[{ required: Boolean(addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[0].householdType.length), message: '地方标准组合为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[0].pkgName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[0].pkgId" :clear="true" :url="localStanPkgSelectBox" :autoChoose="true"
                                 :data="watchObj['sinsPkg0Obj'+index]"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item :label="addForm.serviceCharge.serveChargingType === 1? '社保发票科目：':'发票科目：'" :prop="'serviceRequire.serveTempDetSinses['+ index + '].invSubName'"  class="search-inner-item" :rules="[{ required: true, message: '发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].invSubName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].invsubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{replaceType:1, data:{invSubType:2}}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口性质：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[1].householdType'" class="search-inner-item">
                    <sino-checkbox v-for="(item, _index) in registeredArr" :key="item" class="mt5"
                                v-model="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[1].householdType" @change="householdTypeTwoChange(index, 1)"
                                :label="item.id" v-show="item.id === 2">{{item.title}}</sino-checkbox>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保缴费标准：" :prop="'serviceRequire.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[1].pkgName'" class="search-inner-item" :rules="[{ required: Boolean(addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[1].householdType.length), message: '地方标准组合为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[1].pkgName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetSinses[index].serveTempDetSinsPkgs[1].pkgId" :clear="true" :url="localStanPkgSelectBox" :autoChoose="true"
                                 :data="watchObj['sinsPkg1Obj'+index]"></sino-select>
                  </sino-form-item>
                </li>
                <li class="clearfix"></li>
              </ul>
            </div>
          </div>
          <!--公积金-->
          <div class="crumb-box-child clearfix" v-for="(item, index) in addForm.serviceRequire.serveTempDetAccus" :key="item.priceId">
            <h6>{{addForm.serviceRequire.serveTempDetAccus[index].priceName}}</h6>
            <div class="local-info">
              <ul class="local-info-ul cust-template-ul" >
                <li v-if="addForm.serviceCharge.serveChargingType === 1">
                  <sino-form-item label="服务费收费金额：" :prop="'serviceRequire.serveTempDetAccus['+index+'].serveTempDetServe.chargeMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为必填项', trigger: 'change'}]">
                    <sino-input v-model.number="addForm.serviceRequire.serveTempDetAccus[index].serveTempDetServe.chargeMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="addForm.serviceCharge.serveChargingType === 1 && serveTempDetAccus[index]">
                  <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetAccus['+index+'].serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, message: '付费金额为必填项', trigger: 'change'},{ validator: validator.checkNum, message:'付费金额为数字类型', trigger: 'change'}]">
                    <sino-input v-model="addForm.serviceRequire.serveTempDetAccus[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="addForm.serviceCharge.serveChargingType === 1 && !serveTempDetAccus[index]">
                  <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetAccus['+index+'].serveTempDetServe.payMoney'" class="search-inner-item">
                    <sino-input v-model="addForm.serviceRequire.serveTempDetAccus[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="addForm.serviceCharge.serveChargingType === 1">
                  <sino-form-item label="服务费发票科目：" :prop="'serviceRequire.serveTempDetAccus['+index+'].serveTempDetServe.invSubName'" class="search-inner-item" :rules="[{ required: true, message: '服务费发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].serveTempDetServe.invSubName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].serveTempDetServe.invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{data:{invSubType:1}}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].areaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].areaName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].areaId" :clear="true" :url="areaSelectBox"
                                 @change="accuAreaChange(index)"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="受托供应商：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].receSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" @change="accuSuppChange(addForm.serviceRequire.serveTempDetAccus[index].receSuppId, index)"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].receSuppName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].receSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['accuAreaObj'+index]"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="起做止做原则：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].begEndPrinName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].begEndPrin" :clear="true" :url="selUrl"
                                 :data="{code:'BEG_END_PRIN '}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="缴费方式：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].payFeeWay'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '缴费方式为必填项', trigger: 'change'}]">
                    <sino-popover :popper-class="'questionTip'"placement="bottom-start"
                                  trigger="hover">
                      <p>大库：将雇员的社保缴纳在受托供应商的社保账户下，也称“大盘”。</p>
                      <p>单立户：将雇员的社保缴纳在客户/企业自己的社保账户下，也称“小盘”/“独立户”。</p>
                      <i class="iconfont sino-fangxingwenhao"
                         style="float:left;margin-top:4px;margin-left:-102px;color:#399ff2" slot="reference"></i>
                    </sino-popover>
                    <sino-radio-group v-model.number="addForm.serviceRequire.serveTempDetAccus[index].payFeeWay" @change="accuPayFreeChange(index,addForm.serviceRequire.serveTempDetAccus[index].payFeeWay)">
                      <sino-radio v-for="(item, _index) in payFeeArr" :key="_index"
                                  :label="item.id">{{item.title}}</sino-radio>
                    </sino-radio-group>
                  </sino-form-item>
                </li>
                <li class="content-big-box">
                  <sino-form-item label="公积金企业账户：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].acctName'" class="search-inner-item add-acount-jump" :rules="[{ required: true, message: '社保账户为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].acctName" :autoChoose="true"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].acctId" :clear="true" :url="accuAcctSelectBox"
                                 :data="watchObj['accuAcctObj'+index]" @change="accuAcctChange(index)"></sino-select>
                    <sino-button type="icon-text cust-template-icon-text" @click="jumpAccuFun(index)"><i class="iconfont sino-add"></i>新增</sino-button>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公积金缴费标准：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].pkgName'" class="search-inner-item" :rules="[{ required: true, message: '地方标准组合为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].pkgName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].pkgId" :clear="true" :url="localStanPkgSelectBox" :autoChoose="true"
                                 :data="watchObj['accuPkgObj'+index]"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公积金比例：" :prop="'serviceRequire.serveTempDetAccus['+ index + '].accuPerName'" class="search-inner-item" :rules="[{ required: true, message: '公积金比例为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].accuPerName" :autoChoose="true" @change="accuPerChange(index)"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].accuPerId" :clear="true" :data="watchObj['accuPerObj'+index]" :url="findAccuPropSelect"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item :label="addForm.serviceCharge.serveChargingType === 1? '公积金发票科目：':'发票科目：'" :prop="'serviceRequire.serveTempDetAccus['+ index + '].invSubName'"  class="search-inner-item" :rules="[{ required: true, message: '发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetAccus[index].invSubName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetAccus[index].invsubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{replaceType:2, data:{invSubType:2}}"></sino-select>
                  </sino-form-item>
                </li>
                <li class="clearfix"></li>
              </ul>
            </div>
          </div>
          <!--工资-->
          <div v-for="(item, index) in addForm.serviceRequire.serveTempDetWages" :key="item.serveTempDetGongZi.priceId">
            <div class="crumb-box-child clearfix">
              <h6>{{addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.priceName}}</h6>
              <div class="local-info">
                <ul class="local-info-ul cust-template-ul" >
                  <li v-if="addForm.serviceCharge.serveChargingType === 1">
                    <sino-form-item label="服务费收费金额：" :prop="'serviceRequire.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.chargeMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为必填项', trigger: 'change'}]">
                      <sino-input v-model.number="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.chargeMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="addForm.serviceCharge.serveChargingType === 1 && serveTempDetWagesGongzi[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, message: '付费金额为必填项', trigger: 'change'},{ validator: validator.checkNum, message:'付费金额为数字类型', trigger: 'change'}]">
                      <sino-input v-model="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="addForm.serviceCharge.serveChargingType === 1 && !serveTempDetWagesGongzi[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.payMoney'" class="search-inner-item">
                      <sino-input v-model="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="addForm.serviceCharge.serveChargingType === 1">
                    <sino-form-item label="服务费发票科目：" :prop="'serviceRequire.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.invSubName'" class="search-inner-item" :rules="[{ required: true, message: '服务费发票科目为必填项', trigger: 'change'}]">
                      <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                   :totalNum="false" :isPage="true" :isGroup="false"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.invSubName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                   :data="{data:{invSubType:1}}"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="执行地区：" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetGongZi.wageAreaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageAreaName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageAreaId" :clear="true" :url="areaSelectBox"
                                   @change="salaryAreaChange(index)"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="受托供应商：" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetGongZi.wageReceSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" @change="wageGongziSuppChange(addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageReceSuppId, index)"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageReceSuppName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageReceSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['salaryAreaObj'+index]"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="起做止做原则：" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetGongZi.begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                   :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.begEndPrinName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.begEndPrin" :clear="true" :url="selUrl"
                                   :data="{code:'BEG_END_PRIN '}"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item :label="addForm.serviceCharge.serveChargingType === 1? '工资项发票科目：':'发票科目'" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetGongZi.wageInvsubName'" class="search-inner-item" :rules="[{ required: true, message: '缴费方式为必填项', trigger: 'change'}]">
                      <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false"
                                   :totalNum="false" :isPage="false" :isGroup="false"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageInvsubName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageInvsubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                   :data="{replaceType:3, data:{invSubType:2}}"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="是否异地报税：" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetGongZi.isAlloTax'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '社保账户为必填项', trigger: 'change'}]" v-if="addForm.serviceCharge.serveChargingType === 1">
                      <sino-radio v-for="(item, _index) in yesNoArr" :key="_index"
                                  v-model.number="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.isAlloTax"
                                  :label="item.id">{{item.title}}</sino-radio>
                    </sino-form-item>
                  </li>
                  <li class="clearfix"></li>
                </ul>
              </div>
            </div>
            <div class="crumb-box-child clearfix" v-if="addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.isAlloTax === 1">
              <h6>代报个税服务</h6>
              <div class="local-info">
                <ul class="local-info-ul cust-template-ul" >
                  <li>
                    <sino-form-item label="执行地区：" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetDeclare.taxAreaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.taxAreaName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.taxAreaId" :clear="true" :url="areaSelectBox" @change="taxAreaChange(index)"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="受托供应商：" :prop="'serviceRequire.serveTempDetWages['+ index + '].serveTempDetDeclare.taxReceSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" @change="wageTaxSuppChange(addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.taxReceSuppId, index)"
                                   :chooseName.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.taxReceSuppName"
                                   :chooseId.sync="addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.taxReceSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['taxAreaObj'+index]"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li v-if="serveTempDetWagesTax[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetWages['+index+'].serveTempDetDeclare.serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, message: '付费金额为必填项', trigger: 'change'},{ validator: validator.checkNum, message:'付费金额为数字类型', trigger: 'change'}]">
                      <sino-input v-model="addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="!serveTempDetWagesTax[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'serviceRequire.serveTempDetWages['+index+'].serveTempDetDeclare.serveTempDetServe.payMoney'" class="search-inner-item">
                      <sino-input v-model="addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--服务费-->
          <div class="crumb-box-child clearfix" v-for="(item, index) in addForm.serviceRequire.serveTempDetServes" :key="item.priceId">
            <h6>{{addForm.serviceRequire.serveTempDetServes[index].priceName}}</h6>
            <div class="local-info">
              <ul class="local-info-ul cust-template-ul">
                <li>
                  <sino-form-item label="执行地区：" :prop="'serviceRequire.serveTempDetServes['+ index + '].areaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetServes[index].areaName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetServes[index].areaId" :clear="true" :url="areaSelectBox" @change="serverAreaChange(index)"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="受托供应商：" :prop="'serviceRequire.serveTempDetServes['+ index + '].receSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false" :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetServes[index].receSuppName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetServes[index].receSuppId"
                                 :clear="true"
                                 :url="selectBox"
                                 :linkage="true"
                                 :data="watchObj['serverAreaObj'+index]"
                                 @change="serveSuppChange(addForm.serviceRequire.serveTempDetServes[index].receSuppId, index)"
                    ></sino-select>
                  </sino-form-item>
                <li>
                  <sino-form-item label="起做止做原则：" :prop="'serviceRequire.serveTempDetServes['+ index + '].begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetServes[index].begEndPrinName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetServes[index].begEndPrin " :clear="true" :url="selUrl"
                                 :data="{code:'BEG_END_PRIN '}"></sino-select>
                  </sino-form-item>
                </li>
                <li v-if="!((addForm.serviceCharge.serveChargingType !== 1) && (addForm.serviceRequire.serveTempDetServes[index].priceId !== 47))">
                  <sino-form-item label="收费金额：" :prop="'serviceRequire.serveTempDetServes['+ index + '].chargeMoney'" class="search-inner-item" :rules="[{required: true, type: 'number', message: '收费金额为数字类型,且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="addForm.serviceRequire.serveTempDetServes[index].chargeMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="!((addForm.serviceCharge.serveChargingType !== 1) && (addForm.serviceRequire.serveTempDetServes[index].priceId !== 47)) && serveTempDetServes[index]">
                  <sino-form-item label="付费金额：" :prop="'serviceRequire.serveTempDetServes['+ index + '].payMoney'" class="search-inner-item" :rules="[{ required: true, message: '付费金额为必填项', trigger: 'change'},{ validator: validator.checkNum, message:'付费金额为数字类型', trigger: 'change'}]">
                    <sino-input v-model="addForm.serviceRequire.serveTempDetServes[index].payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="!((addForm.serviceCharge.serveChargingType !== 1) && (addForm.serviceRequire.serveTempDetServes[index].priceId !== 47)) && !serveTempDetServes[index]">
                  <sino-form-item label="付费金额：" :prop="'serviceRequire.serveTempDetServes['+ index + '].payMoney'" class="search-inner-item" :rules="[{trigger: 'change'}]">
                    <sino-input v-model="addForm.serviceRequire.serveTempDetServes[index].payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li class="clearfix">
                  <sino-form-item label="发票科目：" :prop="'serviceRequire.serveTempDetServes['+ index + '].invSubName'" class="search-inner-item" :rules="[{ required: true, message: '发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="addForm.serviceRequire.serveTempDetServes[index].invSubName"
                                 :chooseId.sync="addForm.serviceRequire.serveTempDetServes[index].invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{data:{invSubType:1}}"></sino-select>
                  </sino-form-item>
                </li>
                <li v-if="(addForm.serviceCharge.serveChargingType !== 1) && (addForm.serviceRequire.serveTempDetServes[index].priceId !== 47)"></li>
                <li v-if="(addForm.serviceCharge.serveChargingType !== 1) && (addForm.serviceRequire.serveTempDetServes[index].priceId !== 47)"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="conf-btn">
          <sino-button type="primary" @click="sureFun" v-if="activeNode === 3">确 定</sino-button>
        </div>
      </sino-con>
    </sino-form>
    <sino-dialog :visible.sync="produceAddForm" size="large"  class="dialog-height no-minheight" @close ="cleanContent">
      <sino-title slot="title" type="levelOne" title="新增产品服务模板名称" class="sino-dialog-title"></sino-title>
      <sino-form :model="addTemplateForm" ref="addTemplateForm" class="demo-sendAddrAddForm">
        <sino-form-item label="产品服务模板名称：" class="sino-from-wid" prop="tempName" :rules="[{ required: true, message: '产品服务模板名称为必填项', trigger: 'change'}]">
          <sino-input v-model="addTemplateForm.tempName"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" :disabled="submitDeadlineFlag" @click="submitForm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--账单截止日-->
    <sino-dialog :visible.sync="deadlineVisible" class="leads-follow leads-follow-width-label" @close ="resetForm">
      <sino-title slot="title" type="levelOne" title="维护收费截止日" class="sino-dialog-title"></sino-title>
      <div class="follow-select">
        <sino-form :model="deadlineForm" class="follow-form" ref="deadlineForm" :rules="deadlineRule">
          <div class="follow-content">
            <sino-form-item prop="chargeEndDate" label="收费截止日：">
              <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" trigger="hover" content="与客户或者签约供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月收费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月收费账单。"></sino-popover>
              <i class="iconfont sino-fangxingwenhao chargeTipbox" v-popover:popover2 style="left:-120px"></i>
              <sino-input v-model.number="deadlineForm.chargeEndDate"></sino-input>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitDeadline">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import Cookies from 'js-cookie';
  import api from '../../../../api';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        token: Cookies.get("Token"),
        custInfoSelectBoxSource: this.apiPath.hrsc.custInfoSelectBoxSource, // 客户名称下拉框
        prodPriceScheSelectBox: this.apiPath.hrsc.prodPriceScheSelectBox, // 明细服务内容下拉框
        findServeContent: this.apiPath.hrsc.findServeContent, // 汇总服务内容下拉框
        selectBox: this.apiPath.hrsc.selectBoxSuppBusiArea, // 受托供应商下拉框
        areaSelectBox: this.apiPath.hrsc.areaSelectBox, // 执行地区下拉框
        accuAcctSelectBox: this.apiPath.accu.accuAcctSelectBox, // 公积金下拉框
        AcctSelectBox: this.apiPath.sins.AcctSelectBox, // 社保账户下拉框
        localStanPkgSelectBox: this.apiPath.hrsc.localStanPkgSelectBox, // 地区标准组合
        findAccuPropSelect: this.apiPath.accu.findAccuPropSelect, // 公积金比例下拉框
        watchObj: {},
        secondData: {
          data: {
            areaId: undefined
          }
        },
        billingMethodArr: [], // 服务费计费方式
        totalSerList: [], // 汇总服务内容数据
        payFeeArr: [], // 缴费方式
        registeredArr: [], // 户口性质
        yesNoArr: [], // yes or no
        moduleWidthFlag: true,
        scrollDist: 0, // 距离顶部距离
        activeNode: 1,
        secondFlag: false,
        serviceGroup: [{}],
        routerView: false,
        produceAddForm: false,
        invSubSelect: this.apiPath.hrsc.invSubSelectBox,
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        agentSearchForm: {
          proPayName: '',
          proPayTypeName: '',
          proPayType: '',
          proPayStateName: '',
          proPayState: ''
        },
        trackStatus: [],
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
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        agentLayerAdd: false,
        agentAddForm: {
          proPayName: '',
          proPayTypeName: '',
          proPayType: '',
          proPayStateName: '未启用',
          proPayState: 1,
          invSubName: '',
          invSubId: '',
          remark: ''
        },
        // 校验
        agentAddRules: {
          proPayName: [
            {required: true, message: '代收代付项名称为必填项', trigger: 'change'}
          ],
          proPayTypeName: [
            {required: true, message: '代收代付类型为必填项', trigger: 'change'}
          ],
          proPayStateName: [
            {required: true, message: '启用状态为必填项', trigger: 'change'}
          ],
          invSubName: [
            {required: true, message: '发票科目为必填项', trigger: 'change'}
          ]
        },
        deadlineRule: {
          chargeEndDate: [
            {required: true, type: 'number', message: '收费截止日为必填项', trigger: 'change'},
            {validator: this.validator.checkDateNum, trigger: 'change'}
          ]
        },
        submitDeadlineFlag: false,
        addForm: {
          serviceCharge: {
            custId: '',
            custName: '',
            serveChargingType: '',
            tempName: ''
          },
          serviceProduct: {
            priceIds: [],
            priceNames: [],
            areaId: '',
            areaName: '',
            receSuppId: '',
            receSuppName: '',
            begEndPrin: '',
            begEndPrinName: ''
          },
          serviceRequire: {
            // 社保
            serveTempDetSinses: [],
            // 公积金
            serveTempDetAccus: [],
            // 工资
            serveTempDetWages: [],
            // 服务费
            serveTempDetServes: []
          }
        },
        // 是否为必填项
        // 社保
        serveTempDetSinses: [],
        // 公积金
        serveTempDetAccus: [],
        // 工资
        serveTempDetWagesGongzi: [],
        serveTempDetWagesTax: [],
        // 服务费
        serveTempDetServes: [],
        addTemplateForm: {
          tempName: ''
        },
        items: [],
        deadlineVisible: false,
        deadlineForm: {
          chargeEndDate: ''
        },
        isEmptyFlag: false,
        totalSerTypeArr: [],
        addSerTypeArr: [],
        deleteSerTypeArr: [],
        custDisFlag: false
      };
    },
    created () {
      // 收费明细
      api.post(this.selUrl, {code: 'SERVE_CHARGING_TYPE'}).then(res => {
        this.billingMethodArr = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      // 缴费方式
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'PAY_FEE_WAY'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.payFeeArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      // 户口性质
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'HOUSEHOLD_TYPE'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.registeredArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      // yes OR no
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'YES_NO'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.yesNoArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      if (this.$route.query.type === 'singleEmpAss') {
        this.custDisFlag = true;
        this.addForm.serviceCharge.custName = this.$route.query.custName;
        this.addForm.serviceCharge.custId = this.$route.query.custId;
      }
    },
    methods: {
      // 户口性质变化-城镇
      householdTypeOneChange (index1, index2) {
        this.watchObj['sinsPkg0Obj' + index1].householdType = this.addForm.serviceRequire.serveTempDetSinses[index1].serveTempDetSinsPkgs[index2].householdType;
      },
      // 户口性质变化-农村
      householdTypeTwoChange (index1, index2) {
        this.watchObj['sinsPkg1Obj' + index1].householdType = this.addForm.serviceRequire.serveTempDetSinses[index1].serveTempDetSinsPkgs[index2].householdType;
      },
      // 受托供应商change
      sinsSuppChange (data, index) {
        if (data === 0 || data) {
          api.postsign(this.apiPath.hrsc.findReceSuppIdRequired, data).then(res => {
            if (res.code === 'CPYY-00001') {
              Vue.set(this.serveTempDetSinses, index, res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      accuSuppChange (data, index) {
        if (data === 0 || data) {
          api.postsign(this.apiPath.hrsc.findReceSuppIdRequired, data).then(res => {
            if (res.code === 'CPYY-00001') {
              Vue.set(this.serveTempDetAccus, index, res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      wageGongziSuppChange (data, index) {
        if (data === 0 || data) {
          api.postsign(this.apiPath.hrsc.findReceSuppIdRequired, data).then(res => {
            if (res.code === 'CPYY-00001') {
              Vue.set(this.serveTempDetWagesGongzi, index, res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      wageTaxSuppChange (data, index) {
        if (data === 0 || data) {
          api.postsign(this.apiPath.hrsc.findReceSuppIdRequired, data).then(res => {
            if (res.code === 'CPYY-00001') {
              Vue.set(this.serveTempDetWagesTax, index, res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      serveSuppChange (data, index) {
        if (data === 0 || data) {
          api.postsign(this.apiPath.hrsc.findReceSuppIdRequired, data).then(res => {
            if (res.code === 'CPYY-00001') {
              Vue.set(this.serveTempDetServes, index, res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 社保及公积金跳转
      jumpSinsFun (index) {
        let hash = new Date().getTime();
        let hashFlag = 'flag' + hash;
        let hashIndex = 'index' + hash;
        window.sessionStorage.setItem(hashFlag, JSON.stringify(this.addForm));
        window.sessionStorage.setItem(hashIndex, index);
        this.$router.push({path: '/custSinsAcct', query: {hashFlag: hashFlag}});
      },
      jumpAccuFun (index) {
        let hash = new Date().getTime();
        let hashFlag = 'flag' + hash;
        let hashIndex = 'index' + hash;
        window.sessionStorage.setItem(hashFlag, JSON.stringify(this.addForm));
        window.sessionStorage.setItem(hashIndex, index);
        this.$router.push({path: '/custAccuAcct', query: {hashFlag: hashFlag}});
      },
      // 校验社保账户是否重复
      checkSinsFun (index) {
        let arr;
        if (Array.isArray(this.addForm.serviceRequire.serveTempDetSinses[index].acctIds)) {
          arr = this.addForm.serviceRequire.serveTempDetSinses[index].acctIds;
        } else {
          arr = [];
        }
        api.post(this.apiPath.sins.findIsSameProduct, {sinsAcctIdList: arr}).then(res => {
          if (res.code !== 'CPYY-00001') {
            this.$alert(res.data, '提示信息', {
              confirmButtonText: '确 定',
              type: 'success', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
            this.addForm.serviceRequire.serveTempDetSinses[index].acctIds = [];
            this.addForm.serviceRequire.serveTempDetSinses[index].acctNames = [];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 收费截止日提交方法
      submitDeadline () {
        this.$refs.deadlineForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.updateChargeEndDate, {custId: this.addForm.serviceCharge.custId, chargeEndDate: this.deadlineForm.chargeEndDate}).then(res => {
              if (res.code !== 'CPYY-00001') {
                this.addForm.serviceCharge.custId = '';
                this.addForm.serviceCharge.custName = '';
              } else {
                this.isEmptyFlag = false;
                this.deadlineVisible = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 客户change 方法
      custChange () {
        if (this.addForm.serviceCharge.custId) {
          api.postsign(this.apiPath.hrsc.checkChargeEndDate, this.addForm.serviceCharge.custId).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data === 0) {
                this.deadlineVisible = true;
                this.isEmptyFlag = true;
              } else {
                this.isEmptyFlag = false;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
        this.activeNode = 1;
        this.addForm.serviceCharge.tempName = '';
        this.addForm.serviceProduct.priceIds.splice(0, this.addForm.serviceProduct.priceIds.length);
        this.addForm.serviceProduct.priceNames.splice(0, this.addForm.serviceProduct.priceNames.length);
        this.addForm.serviceProduct.areaId = '';
        this.addForm.serviceProduct.areaName = '';
        this.addForm.serviceProduct.receSuppId = '';
        this.addForm.serviceProduct.receSuppName = '';
        this.addForm.serviceProduct.begEndPrin = '';
        this.addForm.serviceProduct.begEndPrinName = '';
        this.addForm.serviceRequire.serveTempDetSinses.splice(0, this.addForm.serviceRequire.serveTempDetSinses.length);
        this.addForm.serviceRequire.serveTempDetAccus.splice(0, this.addForm.serviceRequire.serveTempDetAccus.length);
        this.addForm.serviceRequire.serveTempDetWages.splice(0, this.addForm.serviceRequire.serveTempDetWages.length);
        this.addForm.serviceRequire.serveTempDetServes.splice(0, this.addForm.serviceRequire.serveTempDetServes.length);
        this.serveTempDetSinses.splice(0);
        this.serveTempDetAccus.splice(0);
        this.serveTempDetWagesGongzi.splice(0);
        this.serveTempDetWagesTax.splice(0);
        this.serveTempDetServes.splice(0);
      },
      serviceChargeChange () {
        this.activeNode = 1;
        this.addForm.serviceCharge.tempName = '';
        this.addForm.serviceProduct.priceIds.splice(0, this.addForm.serviceProduct.priceIds.length);
        this.addForm.serviceProduct.priceNames.splice(0, this.addForm.serviceProduct.priceNames.length);
        this.addForm.serviceProduct.areaId = '';
        this.addForm.serviceProduct.areaName = '';
        this.addForm.serviceProduct.receSuppId = '';
        this.addForm.serviceProduct.receSuppName = '';
        this.addForm.serviceProduct.begEndPrin = '';
        this.addForm.serviceProduct.begEndPrinName = '';
        this.addForm.serviceRequire.serveTempDetSinses.splice(0, this.addForm.serviceRequire.serveTempDetSinses.length);
        this.addForm.serviceRequire.serveTempDetAccus.splice(0, this.addForm.serviceRequire.serveTempDetAccus.length);
        this.addForm.serviceRequire.serveTempDetWages.splice(0, this.addForm.serviceRequire.serveTempDetWages.length);
        this.addForm.serviceRequire.serveTempDetServes.splice(0, this.addForm.serviceRequire.serveTempDetServes.length);
        this.serveTempDetSinses.splice(0);
        this.serveTempDetAccus.splice(0);
        this.serveTempDetWagesGongzi.splice(0);
        this.serveTempDetWagesTax.splice(0);
        this.serveTempDetServes.splice(0);
      },
      // 选择服务内容出现相对应的模块
      serviceChange () {
        if (this.activeNode === 3) {
          let obj;
          let url;
          if (this.addForm.serviceCharge.serveChargingType === 2) {
            obj = {prodTypes: []};
            for (var k = 0; k < this.totalSerList.length; k++) {
              if (this.addForm.serviceProduct.priceIds.indexOf(this.totalSerList[k].id) !== -1) {
                obj.prodTypes.push({priceId: this.totalSerList[k].id, flag: this.totalSerList[k].flag});
              }
            }
            url = this.apiPath.hrsc.findPriceProPayTypes;
          } else {
            obj = {priceIds: this.addForm.serviceProduct.priceIds};
            url = this.apiPath.hrsc.findProdTypes;
          };
          api.post(url, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              var resData;
              if (this.addForm.serviceCharge.serveChargingType === 1) {
                if (res.data && res.data.prodTypes && res.data.prodTypes.length > 0) {
                  resData = JSON.parse(JSON.stringify(res.data.prodTypes));
                  let markArr = res.data.prodTypes.map(function (item) {
                    return item.priceId;
                  });
                  if (markArr.indexOf(47) !== -1) {
                    resData.push(JSON.parse(JSON.stringify(res.data.prodTypes[markArr.indexOf(47)])));
                    resData.splice(res.data.prodTypes[markArr.indexOf(47)], 1);
                  }
                } else {
                  resData = null;
                }
              } else {
                if (res.data && res.data.length > 0) {
                  resData = JSON.parse(JSON.stringify(res.data));
                  let markArr = res.data.map(function (item) {
                    return item.priceId;
                  });
                  if (markArr.indexOf(47) === -1) {
                    resData.push({priceId: 47, prodType: 6, priceName: "服务费", flag: null, chargeMoney: null});
                  } else {
                    resData.push(JSON.parse(JSON.stringify(res.data[markArr.indexOf(47)])));
                    resData.splice(res.data[markArr.indexOf(47)], 1);
                  }
                } else {
                  resData = null;
                }
              }
              if (resData && resData.length > 0) {
                this.addSerTypeArr = [];
                this.deleteSerTypeArr = [];
                var temPriceIds = JSON.parse(JSON.stringify(this.totalSerTypeArr)).map(function (item) {
                  return item.priceId;
                });
                var resDataPriceIds = JSON.parse(JSON.stringify(resData)).map(function (item) {
                  return item.priceId;
                });
                if (this.totalSerTypeArr.length > 0) {
                  for (var m = 0; m < resData.length; m++) {
                    if (temPriceIds.indexOf(resData[m].priceId) === -1) {
                      this.addSerTypeArr.push(JSON.parse(JSON.stringify(resData[m])));
                    }
                  };
                  for (var n = 0; n < this.totalSerTypeArr.length; n++) {
                    if (resDataPriceIds.indexOf(this.totalSerTypeArr[n].priceId) === -1) {
                      this.deleteSerTypeArr.push(JSON.parse(JSON.stringify(this.totalSerTypeArr[n])));
                    }
                  };
                } else {
                  for (var p = 0; p < resData.length; p++) {
                    this.addSerTypeArr.push(JSON.parse(JSON.stringify(resData[p])));
                  };
                }
                this.totalSerTypeArr = JSON.parse(JSON.stringify(resData));
                this.deleteSerTypeArr.forEach(function (item) {
                  if (item.prodType === 1) {
                    this.addForm.serviceRequire.serveTempDetSinses.forEach(function (item1, index) {
                      if (item.priceId === item1.priceId) {
                        this.addForm.serviceRequire.serveTempDetSinses.splice(index, 1);
                        this.serveTempDetSinses.splice(index, 1);
                      }
                    }, this);
                  } else if (item.prodType === 2) {
                    this.addForm.serviceRequire.serveTempDetAccus.forEach(function (item1, index) {
                      if (item.priceId === item1.priceId) {
                        this.addForm.serviceRequire.serveTempDetAccus.splice(index, 1);
                        this.serveTempDetAccus.splice(index, 1);
                      }
                    }, this);
                  } else if (item.prodType === 3) {
                    this.addForm.serviceRequire.serveTempDetWages.forEach(function (item1, index) {
                      if (item.priceId === item1.serveTempDetDeclare.priceId) {
                        this.addForm.serviceRequire.serveTempDetWages.splice(index, 1);
                        this.serveTempDetWagesGongzi.splice(index, 1);
                        this.serveTempDetWagesTax.splice(index, 1);
                      }
                    }, this);
                  } else if (item.prodType === 5 || item.prodType === 6) {
                    let templateObj = JSON.parse(JSON.stringify(this.addForm.serviceRequire.serveTempDetServes));
                    this.addForm.serviceRequire.serveTempDetServes.forEach(function (item1, index) {
                      if (item.priceId === item1.priceId) {
                        this.addForm.serviceRequire.serveTempDetServes.splice(index, 1);
                        this.serveTempDetServes.splice(index, 1);
                        templateObj.splice(index, 1);
                      }
                    }, this);
                    let that = this;
                    setTimeout(function () {
                      that.addForm.serviceRequire.serveTempDetServes = templateObj;
                    });
                  }
                }, this);
                let that = this;
                this.addSerTypeArr.forEach(function (item) {
                  if (item.prodType === 1) {
                    this.addForm.serviceRequire.serveTempDetSinses.push({
                      priceId: item.priceId,
                      priceName: item.priceName,
                      payFeeWay: '',
                      areaId: this.addForm.serviceProduct.areaId,
                      areaName: this.addForm.serviceProduct.areaName,
                      acctIds: [],
                      acctNames: [],
                      invsubId: '',
                      invsubName: '',
                      begEndPrin: this.addForm.serviceProduct.begEndPrin,
                      begEndPrinName: this.addForm.serviceProduct.begEndPrinName,
                      receSuppId: '',
                      receSuppName: '',
                      serveTempDetSinsPkgs: [
                        {
                          householdType: [1],
                          pkgId: '',
                          pkgName: ''
                        },
                        {
                          householdType: [2],
                          pkgId: '',
                          pkgName: ''
                        }
                      ],
                      serveTempDetServe: {
                        priceId: item.priceId,
                        priceName: item.priceName,
                        chargeMoney: item.chargeMoney,
                        payMoney: '',
                        invSubId: '',
                        invSubName: ''
                      }
                    });
                    this.serveTempDetSinses.push('');
                    let num = JSON.parse(JSON.stringify(this.addForm.serviceRequire.serveTempDetSinses.length)) - 1;
                    this.$set(this.watchObj, ("sinsAcctObj" + (num)), {custId: this.addForm.serviceCharge.custId, payFeeWay: '', areaId: this.addForm.serviceProduct.areaId});
                    this.$set(this.watchObj, ("sinsPkg0Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
                    this.$set(this.watchObj, ("sinsPkg1Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
                    this.$set(this.watchObj, ("sinsAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      that.watchObj["sinsPkg0Obj" + (num)].householdType = [1];
                      that.watchObj["sinsPkg0Obj" + (num)].areaId = that.addForm.serviceProduct.areaId;
                      that.watchObj["sinsPkg1Obj" + (num)].householdType = [2];
                      that.watchObj["sinsPkg1Obj" + (num)].areaId = that.addForm.serviceProduct.areaId;
                      that.watchObj["sinsAreaObj" + (num)].data.areaId = that.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        that.addForm.serviceRequire.serveTempDetSinses[num].receSuppName = that.addForm.serviceProduct.receSuppName;
                        that.addForm.serviceRequire.serveTempDetSinses[num].receSuppId = that.addForm.serviceProduct.receSuppId;
                      }, 200);
                    });
                  } else if (item.prodType === 2) {
                    this.addForm.serviceRequire.serveTempDetAccus.push({
                      priceId: item.priceId,
                      priceName: item.priceName,
                      areaId: this.addForm.serviceProduct.areaId,
                      areaName: this.addForm.serviceProduct.areaName,
                      receSuppName: '',
                      receSuppId: '',
                      begEndPrinName: this.addForm.serviceProduct.begEndPrinName,
                      begEndPrin: this.addForm.serviceProduct.begEndPrin,
                      payFeeWay: '',
                      acctName: '',
                      acctId: '',
                      pkgName: '',
                      pkgId: '',
                      accuPerName: '',
                      accuPerId: '',
                      invSubName: '',
                      invsubId: '',
                      serveTempDetServe: {
                        priceId: item.priceId,
                        priceName: item.priceName,
                        chargeMoney: item.chargeMoney,
                        payMoney: '',
                        invSubId: '',
                        invSubName: ''
                      }
                    });
                    this.serveTempDetAccus.push('');
                    let num = JSON.parse(JSON.stringify(this.addForm.serviceRequire.serveTempDetAccus.length)) - 1;
                    this.$set(this.watchObj, ("accuAcctObj" + (num)), {custId: this.addForm.serviceCharge.custId, payFeeWay: '', areaId: this.addForm.serviceProduct.areaId});
                    this.$set(this.watchObj, ("accuPkgObj" + (num)), {areaId: '', localStanType: 2, accuProp: '', accuPropId: ''});
                    this.$set(this.watchObj, ("accuPerObj" + (num)), {accuAcctId: ''});
                    this.$set(this.watchObj, ("accuAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      that.watchObj["accuPkgObj" + (num)].areaId = that.addForm.serviceProduct.areaId;
                      that.watchObj["accuAreaObj" + (num)].data.areaId = that.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        that.addForm.serviceRequire.serveTempDetAccus[num].receSuppName = that.addForm.serviceProduct.receSuppName;
                        that.addForm.serviceRequire.serveTempDetAccus[num].receSuppId = that.addForm.serviceProduct.receSuppId;
                      }, 200);
                    });
                  } else if (item.prodType === 3) {
                    this.addForm.serviceRequire.serveTempDetWages.push({
                      serveTempDetGongZi: {
                        priceId: item.priceId,
                        priceName: item.priceName,
                        wageAreaName: this.addForm.serviceProduct.areaName,
                        wageAreaId: this.addForm.serviceProduct.areaId,
                        wageReceSuppName: '',
                        wageReceSuppId: '',
                        begEndPrinName: this.addForm.serviceProduct.begEndPrinName,
                        begEndPrin: this.addForm.serviceProduct.begEndPrin,
                        wageInvsubName: '',
                        wageInvsubId: '',
                        isAlloTax: 0,
                        serveTempDetServe: {
                          priceId: item.priceId,
                          priceName: item.priceName,
                          chargeMoney: item.chargeMoney,
                          payMoney: '',
                          invSubName: '',
                          invSubId: ''
                        }
                      },
                      serveTempDetDeclare: {
                        priceId: item.priceId,
                        priceName: item.priceName,
                        taxAreaName: this.addForm.serviceProduct.areaName,
                        taxAreaId: this.addForm.serviceProduct.areaId,
                        taxReceSuppName: '',
                        taxReceSuppId: '',
                        serveTempDetServe: {
                          payMoney: ''
                        }
                      }
                    });
                    this.serveTempDetWagesGongzi.push('');
                    this.serveTempDetWagesTax.push('');
                    let num = JSON.parse(JSON.stringify(this.addForm.serviceRequire.serveTempDetWages.length)) - 1;
                    this.$set(this.watchObj, ("salaryAreaObj" + (num)), {data: {areaId: ''}});
                    this.$set(this.watchObj, ("taxAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      that.watchObj["salaryAreaObj" + (num)].data.areaId = that.addForm.serviceProduct.areaId;
                      that.watchObj["taxAreaObj" + (num)].data.areaId = that.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        that.addForm.serviceRequire.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppName = that.addForm.serviceProduct.receSuppName;
                        that.addForm.serviceRequire.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppId = that.addForm.serviceProduct.receSuppId;
                        that.addForm.serviceRequire.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppName = that.addForm.serviceProduct.receSuppName;
                        that.addForm.serviceRequire.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppId = that.addForm.serviceProduct.receSuppId;
                      }, 200);
                    });
                  } else if (item.prodType === 5 || item.prodType === 6) {
                    let serveTempIds = this.addForm.serviceRequire.serveTempDetServes.map(function (item) {
                      return item.priceId;
                    });
                    if (serveTempIds.indexOf(47) === -1) {
                      this.addForm.serviceRequire.serveTempDetServes.push({
                        priceId: item.priceId,
                        priceName: item.priceName,
                        areaId: this.addForm.serviceProduct.areaId,
                        areaName: this.addForm.serviceProduct.areaName,
                        chargeMoney: item.chargeMoney,
                        payMoney: '',
                        receSuppId: '',
                        receSuppName: '',
                        invSubId: '',
                        invSubName: '',
                        begEndPrin: this.addForm.serviceProduct.begEndPrin,
                        begEndPrinName: this.addForm.serviceProduct.begEndPrinName
                      });
                      this.serveTempDetServes.push('');
                      let that = this;
                      let num = JSON.parse(JSON.stringify(this.addForm.serviceRequire.serveTempDetServes.length)) - 1;
                      this.$set(this.watchObj, ("serverAreaObj" + (num)), {data: {areaId: ''}});
                      setTimeout(function () {
                        that.watchObj["serverAreaObj" + (num)].data.areaId = that.addForm.serviceProduct.areaId;
                        setTimeout(function () {
                          that.addForm.serviceRequire.serveTempDetServes[num].receSuppName = that.addForm.serviceProduct.receSuppName;
                          that.addForm.serviceRequire.serveTempDetServes[num].receSuppId = that.addForm.serviceProduct.receSuppId;
                        }, 200);
                      });
                    } else {
                      this.addForm.serviceRequire.serveTempDetServes.splice(
                        (this.addForm.serviceRequire.serveTempDetServes.length - 1), 0, {
                          priceId: item.priceId,
                          priceName: item.priceName,
                          areaId: this.addForm.serviceProduct.areaId,
                          areaName: this.addForm.serviceProduct.areaName,
                          chargeMoney: item.chargeMoney,
                          payMoney: '',
                          receSuppId: '',
                          receSuppName: '',
                          invSubId: '',
                          invSubName: '',
                          begEndPrin: this.addForm.serviceProduct.begEndPrin,
                          begEndPrinName: this.addForm.serviceProduct.begEndPrinName
                        }
                      );
                      let temporaryName = this.addForm.serviceRequire.serveTempDetServes[this.addForm.serviceRequire.serveTempDetServes.length - 1].receSuppName;
                      let temporaryId = this.addForm.serviceRequire.serveTempDetServes[this.addForm.serviceRequire.serveTempDetServes.length - 1].receSuppId;
                      this.serveTempDetServes.splice(this.serveTempDetServes.length - 1, 0, '');
                      let num = JSON.parse(JSON.stringify(this.addForm.serviceRequire.serveTempDetServes)).length - 1;
                      this.$set(this.watchObj, ("serverAreaObj" + (num)), {data: {areaId: ''}});
                      this.watchObj['serverAreaObj' + num].data.areaId = this.watchObj['serverAreaObj' + (num - 1)].data.areaId;
                      setTimeout(function () {
                        that.watchObj["serverAreaObj" + (num - 1)].data.areaId = '';
                        that.watchObj["serverAreaObj" + (num - 1)].data.areaId = that.addForm.serviceProduct.areaId;
                        setTimeout(function () {
                          that.addForm.serviceRequire.serveTempDetServes[num - 1].receSuppName = that.addForm.serviceProduct.receSuppName;
                          that.addForm.serviceRequire.serveTempDetServes[num - 1].receSuppId = that.addForm.serviceProduct.receSuppId;
                          that.addForm.serviceRequire.serveTempDetServes[num].receSuppName = temporaryName;
                          that.addForm.serviceRequire.serveTempDetServes[num].receSuppId = temporaryId;
                        }, 200);
                      });
                    }
                  }
                }, this);
              } else {
                this.addForm.serviceRequire.serveTempDetSinses.splice(0);
                this.addForm.serviceRequire.serveTempDetAccus.splice(0);
                this.addForm.serviceRequire.serveTempDetWages.splice(0);
                this.addForm.serviceRequire.serveTempDetServes.splice(0);
                this.serveTempDetSinses.splice(0);
                this.serveTempDetAccus.splice(0);
                this.serveTempDetWagesGongzi.splice(0);
                this.serveTempDetWagesTax.splice(0);
                this.serveTempDetServes.splice(0);
                this.totalSerTypeArr = [];
              };
            }
          });
        }
      },
      areaChange () {
        for (var a = 0; a < this.addForm.serviceRequire.serveTempDetSinses.length; a++) {
          this.addForm.serviceRequire.serveTempDetSinses[a].areaName = this.addForm.serviceProduct.areaName;
          this.addForm.serviceRequire.serveTempDetSinses[a].areaId = this.addForm.serviceProduct.areaId;
        };
        for (var b = 0; b < this.addForm.serviceRequire.serveTempDetAccus.length; b++)  {
          this.addForm.serviceRequire.serveTempDetAccus[b].areaName = this.addForm.serviceProduct.areaName;
          this.addForm.serviceRequire.serveTempDetAccus[b].areaId = this.addForm.serviceProduct.areaId;
        };
        for (var c = 0; c < this.addForm.serviceRequire.serveTempDetWages.length; c++) {
          this.addForm.serviceRequire.serveTempDetWages[c].serveTempDetGongZi.wageAreaName = this.addForm.serviceProduct.areaName;
          this.addForm.serviceRequire.serveTempDetWages[b].serveTempDetGongZi.wageAreaId = this.addForm.serviceProduct.areaId;
          this.addForm.serviceRequire.serveTempDetWages[c].serveTempDetGongZi.taxAreaName = this.addForm.serviceProduct.areaName;
          this.addForm.serviceRequire.serveTempDetWages[b].serveTempDetGongZi.taxAreaId = this.addForm.serviceProduct.areaId;
        };
        for (var d = 0; d < this.addForm.serviceRequire.serveTempDetServes.length; d++) {
          this.addForm.serviceRequire.serveTempDetServes[d].areaName = this.addForm.serviceProduct.areaName;
          this.addForm.serviceRequire.serveTempDetServes[d].areaId = this.addForm.serviceProduct.areaId;
        };
        this.secondData.data.areaId = this.addForm.serviceProduct.areaId;
      },
      receSuppChange () {
        for (var a = 0; a < this.addForm.serviceRequire.serveTempDetSinses.length; a++) {
          this.addForm.serviceRequire.serveTempDetSinses[a].receSuppName = this.addForm.serviceProduct.receSuppName;
          this.addForm.serviceRequire.serveTempDetSinses[a].receSuppId = this.addForm.serviceProduct.receSuppId;
        }
        ;
        for (var b = 0; b < this.addForm.serviceRequire.serveTempDetAccus.length; b++) {
          this.addForm.serviceRequire.serveTempDetAccus[b].receSuppName = this.addForm.serviceProduct.receSuppName;
          this.addForm.serviceRequire.serveTempDetAccus[b].receSuppId = this.addForm.serviceProduct.receSuppId;
        }
        ;
        for (var c = 0; c < this.addForm.serviceRequire.serveTempDetWages.length; c++) {
          this.addForm.serviceRequire.serveTempDetWages[c].serveTempDetGongZi.wageReceSuppName = this.addForm.serviceProduct.receSuppName;
          this.addForm.serviceRequire.serveTempDetWages[b].serveTempDetGongZi.wageReceSuppId = this.addForm.serviceProduct.receSuppId;
          this.addForm.serviceRequire.serveTempDetWages[c].serveTempDetGongZi.taxReceSuppName = this.addForm.serviceProduct.receSuppName;
          this.addForm.serviceRequire.serveTempDetWages[b].serveTempDetGongZi.taxReceSuppId = this.addForm.serviceProduct.receSuppId;
        }
        ;
        for (var d = 0; d < this.addForm.serviceRequire.serveTempDetServes.length; d++) {
          this.addForm.serviceRequire.serveTempDetServes[d].receSuppName = this.addForm.serviceProduct.receSuppName;
          this.addForm.serviceRequire.serveTempDetServes[d].receSuppId = this.addForm.serviceProduct.receSuppId;
        };
      },
      begEndPrinChange () {
        for (var a = 0; a < this.addForm.serviceRequire.serveTempDetSinses.length; a++) {
          this.addForm.serviceRequire.serveTempDetSinses[a].begEndPrinName = this.addForm.serviceProduct.begEndPrinName;
          this.addForm.serviceRequire.serveTempDetSinses[a].begEndPrin = this.addForm.serviceProduct.begEndPrin;
        }
        ;
        for (var b = 0; b < this.addForm.serviceRequire.serveTempDetAccus.length; b++) {
          this.addForm.serviceRequire.serveTempDetAccus[b].begEndPrinName = this.addForm.serviceProduct.begEndPrinName;
          this.addForm.serviceRequire.serveTempDetAccus[b].begEndPrin = this.addForm.serviceProduct.begEndPrin;
        }
        ;
        for (var c = 0; c < this.addForm.serviceRequire.serveTempDetWages.length; c++) {
          this.addForm.serviceRequire.serveTempDetWages[c].serveTempDetGongZi.begEndPrinName = this.addForm.serviceProduct.begEndPrinName;
          this.addForm.serviceRequire.serveTempDetWages[c].serveTempDetGongZi.begEndPrin = this.addForm.serviceProduct.begEndPrin;
        }
        ;
        for (var d = 0; d < this.addForm.serviceRequire.serveTempDetServes.length; d++) {
          this.addForm.serviceRequire.serveTempDetServes[d].begEndPrinName = this.addForm.serviceProduct.begEndPrinName;
          this.addForm.serviceRequire.serveTempDetServes[d].begEndPrin = this.addForm.serviceProduct.begEndPrin;
        };
      },
      // 社保缴费方式切换
      sinsPayFreeChange (index, val) {
        this.watchObj['sinsAcctObj' + index].payFeeWay = this.addForm.serviceRequire.serveTempDetSinses[index].payFeeWay;
      },
      accuPayFreeChange (index, val) {
        this.watchObj['accuAcctObj' + index].payFeeWay = this.addForm.serviceRequire.serveTempDetAccus[index].payFeeWay;
      },
      // 执行地区
      sinsAreaChange (index) {
        this.watchObj['sinsAcctObj' + index].areaId = this.addForm.serviceRequire.serveTempDetSinses[index].areaId;
        this.watchObj['sinsPkg0Obj' + index].areaId = this.addForm.serviceRequire.serveTempDetSinses[index].areaId;
        this.watchObj['sinsPkg1Obj' + index].areaId = this.addForm.serviceRequire.serveTempDetSinses[index].areaId;
        this.watchObj['sinsAreaObj' + index].data.areaId = this.addForm.serviceRequire.serveTempDetSinses[index].areaId;
      },
      accuAreaChange (index) {
        this.watchObj['accuAcctObj' + index].areaId = this.addForm.serviceRequire.serveTempDetAccus[index].areaId;
        this.watchObj['accuPkgObj' + index].areaId = this.addForm.serviceRequire.serveTempDetAccus[index].areaId;
        this.watchObj['accuAreaObj' + index].data.areaId = this.addForm.serviceRequire.serveTempDetAccus[index].areaId;
      },
      salaryAreaChange (index) {
        this.watchObj['salaryAreaObj' + index].data.areaId = this.addForm.serviceRequire.serveTempDetWages[index].serveTempDetGongZi.wageAreaId;
      },
      taxAreaChange (index) {
        this.watchObj['taxAreaObj' + index].data.areaId = this.addForm.serviceRequire.serveTempDetWages[index].serveTempDetDeclare.taxAreaId;
      },
      serverAreaChange (index) {
        this.watchObj['serverAreaObj' + index].data.areaId = this.addForm.serviceRequire.serveTempDetServes[index].areaId;
      },
      // 公积金变化调取
      accuAcctChange (index) {
        this.watchObj['accuPerObj' + index].accuAcctId = this.addForm.serviceRequire.serveTempDetAccus[index].acctId;
        api.post(this.findAccuPropSelect, {accuAcctId: this.addForm.serviceRequire.serveTempDetAccus[index].acctId}).then(res => {
          this.addForm.serviceRequire.serveTempDetAccus[index].accuPerName = res.data.list[0].title;
          this.addForm.serviceRequire.serveTempDetAccus[index].accuPerId = res.data.list[0].id;
        }).catch(err => {
          console.log(err);
        });
      },
      // 公积金比例变化调取
      accuPerChange (index) {
        this.watchObj['accuPkgObj' + index].accuProp = this.addForm.serviceRequire.serveTempDetAccus[index].accuPerName;
        this.watchObj['accuPkgObj' + index].accuPropId = this.addForm.serviceRequire.serveTempDetAccus[index].accuPerId;
      },
      addlocalFun1 () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.activeNode = 2;
            api.post(this.findServeContent, {}).then(res => {
              this.totalSerList = res.data.list;
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      addlocalFun2 () {
        let _this = this;
        _this.$refs.addForm.validate((valid) => {
          if (valid) {
            let obj;
            let url;
            if (_this.addForm.serviceCharge.serveChargingType === 2) {
              obj = {prodTypes: []};
              for (var k = 0; k < _this.totalSerList.length; k++) {
                if (this.addForm.serviceProduct.priceIds.indexOf(_this.totalSerList[k].id) !== -1) {
                  obj.prodTypes.push({priceId: _this.totalSerList[k].id, flag: _this.totalSerList[k].flag});
                }
              }
              url = _this.apiPath.hrsc.findPriceProPayTypes;
            } else {
              obj = {priceIds: _this.addForm.serviceProduct.priceIds};
              url = _this.apiPath.hrsc.findProdTypes;
            };
            api.post(url, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                var resData;
                if (_this.addForm.serviceCharge.serveChargingType === 1) {
                  resData = JSON.parse(JSON.stringify(res.data.prodTypes));
                  let markArr = res.data.prodTypes.map(function (item) {
                    return item.priceId;
                  });
                  if (markArr.indexOf(47) !== -1) {
                    resData.push(JSON.parse(JSON.stringify(res.data.prodTypes[markArr.indexOf(47)])));
                    resData.splice(res.data.prodTypes[markArr.indexOf(47)], 1);
                  }
                } else {
                  resData = JSON.parse(JSON.stringify(res.data));
                  let markArr = res.data.map(function (item) {
                    return item.priceId;
                  });
                  if (markArr.indexOf(47) === -1) {
                    resData.push({priceId: 47, prodType: 6, priceName: "服务费", flag: null, chargeMoney: null});
                  } else {
                    resData.push(JSON.parse(JSON.stringify(res.data[markArr.indexOf(47)])));
                    resData.splice(res.data[markArr.indexOf(47)], 1);
                  }
                }
                _this.totalSerTypeArr = JSON.parse(JSON.stringify(resData));
                for (var i = 0; i < resData.length; i++) {
                  if (resData[i].prodType === 1) {
                    _this.addForm.serviceRequire.serveTempDetSinses.push({
                      priceId: resData[i].priceId,
                      priceName: resData[i].priceName,
                      payFeeWay: '',
                      areaId: _this.addForm.serviceProduct.areaId,
                      areaName: _this.addForm.serviceProduct.areaName,
                      acctIds: [],
                      acctNames: [],
                      invsubId: '',
                      invsubName: '',
                      begEndPrin: _this.addForm.serviceProduct.begEndPrin,
                      begEndPrinName: _this.addForm.serviceProduct.begEndPrinName,
                      receSuppId: '',
                      receSuppName: '',
                      serveTempDetSinsPkgs: [
                        {
                          householdType: [1],
                          pkgId: '',
                          pkgName: ''
                        },
                        {
                          householdType: [2],
                          pkgId: '',
                          pkgName: ''
                        }
                      ],
                      serveTempDetServe: {
                        priceId: resData[i].priceId,
                        priceName: resData[i].priceName,
                        chargeMoney: resData[i].chargeMoney,
                        payMoney: '',
                        invSubId: '',
                        invSubName: ''
                      }
                    });
                    _this.serveTempDetSinses.push('');
                    let num = _this.addForm.serviceRequire.serveTempDetSinses.length - 1;
                    _this.$set(_this.watchObj, ("sinsAcctObj" + (num)), {custId: _this.addForm.serviceCharge.custId, payFeeWay: '', areaId: _this.addForm.serviceProduct.areaId});
                    _this.$set(_this.watchObj, ("sinsPkg0Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
                    _this.$set(_this.watchObj, ("sinsPkg1Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
                    _this.$set(_this.watchObj, ("sinsAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      _this.watchObj["sinsPkg0Obj" + (num)].householdType = [1];
                      _this.watchObj["sinsPkg0Obj" + (num)].areaId = _this.addForm.serviceProduct.areaId;
                      _this.watchObj["sinsPkg1Obj" + (num)].householdType = [2];
                      _this.watchObj["sinsPkg1Obj" + (num)].areaId = _this.addForm.serviceProduct.areaId;
                      _this.watchObj["sinsAreaObj" + (num)].data.areaId = _this.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        _this.addForm.serviceRequire.serveTempDetSinses[num].receSuppName = _this.addForm.serviceProduct.receSuppName;
                        _this.addForm.serviceRequire.serveTempDetSinses[num].receSuppId = _this.addForm.serviceProduct.receSuppId;
                      }, 200);
                    }, 200);
                  } else if (resData[i].prodType === 2) {
                    _this.addForm.serviceRequire.serveTempDetAccus.push({
                      priceId: resData[i].priceId,
                      priceName: resData[i].priceName,
                      areaId: _this.addForm.serviceProduct.areaId,
                      areaName: _this.addForm.serviceProduct.areaName,
                      receSuppName: '',
                      receSuppId: '',
                      begEndPrinName: _this.addForm.serviceProduct.begEndPrinName,
                      begEndPrin: _this.addForm.serviceProduct.begEndPrin,
                      payFeeWay: '',
                      acctName: '',
                      acctId: '',
                      pkgName: '',
                      pkgId: '',
                      accuPerName: '',
                      accuPerId: '',
                      invSubName: '',
                      invsubId: '',
                      serveTempDetServe: {
                        priceId: resData[i].priceId,
                        priceName: resData[i].priceName,
                        chargeMoney: resData[i].chargeMoney,
                        payMoney: '',
                        invSubId: '',
                        invSubName: ''
                      }
                    });
                    _this.serveTempDetAccus.push('');
                    let num = _this.addForm.serviceRequire.serveTempDetAccus.length - 1;
                    _this.$set(_this.watchObj, ("accuAcctObj" + (num)), {custId: _this.addForm.serviceCharge.custId, payFeeWay: '', areaId: _this.addForm.serviceProduct.areaId});
                    _this.$set(_this.watchObj, ("accuPkgObj" + (num)), {areaId: '', localStanType: 2, accuProp: '', accuPropId: ''});
                    _this.$set(_this.watchObj, ("accuPerObj" + (num)), {accuAcctId: ''});
                    _this.$set(_this.watchObj, ("accuAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      _this.watchObj["accuPkgObj" + (num)].areaId = _this.addForm.serviceProduct.areaId;
                      _this.watchObj["accuAreaObj" + (num)].data.areaId = _this.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        _this.addForm.serviceRequire.serveTempDetAccus[num].receSuppName = _this.addForm.serviceProduct.receSuppName;
                        _this.addForm.serviceRequire.serveTempDetAccus[num].receSuppId = _this.addForm.serviceProduct.receSuppId;
                      }, 200);
                    }, 200);
                  } else if (resData[i].prodType === 3) {
                    _this.addForm.serviceRequire.serveTempDetWages.push({
                      serveTempDetGongZi: {
                        priceId: resData[i].priceId,
                        priceName: resData[i].priceName,
                        wageAreaName: _this.addForm.serviceProduct.areaName,
                        wageAreaId: _this.addForm.serviceProduct.areaId,
                        wageReceSuppName: '',
                        wageReceSuppId: '',
                        begEndPrinName: _this.addForm.serviceProduct.begEndPrinName,
                        begEndPrin: _this.addForm.serviceProduct.begEndPrin,
                        wageInvsubName: '',
                        wageInvsubId: '',
                        isAlloTax: 0,
                        serveTempDetServe: {
                          priceId: resData[i].priceId,
                          priceName: resData[i].priceName,
                          chargeMoney: resData[i].chargeMoney,
                          payMoney: '',
                          invSubName: '',
                          invSubId: ''
                        }
                      },
                      serveTempDetDeclare: {
                        priceId: resData[i].priceId,
                        priceName: resData[i].priceName,
                        taxAreaName: _this.addForm.serviceProduct.areaName,
                        taxAreaId: _this.addForm.serviceProduct.areaId,
                        taxReceSuppName: '',
                        taxReceSuppId: '',
                        serveTempDetServe: {
                          payMoney: ''
                        }
                      }
                    });
                    _this.serveTempDetWagesGongzi.push('');
                    _this.serveTempDetWagesTax.push('');
                    let num = _this.addForm.serviceRequire.serveTempDetWages.length - 1;
                    _this.$set(_this.watchObj, ("salaryAreaObj" + (num)), {data: {areaId: ''}});
                    _this.$set(_this.watchObj, ("taxAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      _this.watchObj["salaryAreaObj" + (num)].data.areaId = _this.addForm.serviceProduct.areaId;
                      _this.watchObj["taxAreaObj" + (num)].data.areaId = _this.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        _this.addForm.serviceRequire.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppName = _this.addForm.serviceProduct.receSuppName;
                        _this.addForm.serviceRequire.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppId = _this.addForm.serviceProduct.receSuppId;
                        _this.addForm.serviceRequire.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppName = _this.addForm.serviceProduct.receSuppName;
                        _this.addForm.serviceRequire.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppId = _this.addForm.serviceProduct.receSuppId;
                      }, 200);
                    }, 200);
                  } else if (resData[i].prodType === 5 || resData[i].prodType === 6) {
                    _this.addForm.serviceRequire.serveTempDetServes.push({
                      priceId: resData[i].priceId,
                      priceName: resData[i].priceName,
                      areaId: _this.addForm.serviceProduct.areaId,
                      areaName: _this.addForm.serviceProduct.areaName,
                      chargeMoney: resData[i].chargeMoney,
                      payMoney: '',
                      receSuppId: '',
                      receSuppName: '',
                      invSubId: '',
                      invSubName: '',
                      begEndPrin: _this.addForm.serviceProduct.begEndPrin,
                      begEndPrinName: _this.addForm.serviceProduct.begEndPrinName
                    });
                    _this.serveTempDetServes.push('');
                    let num = _this.addForm.serviceRequire.serveTempDetServes.length - 1;
                    _this.$set(_this.watchObj, ("serverAreaObj" + (num)), {data: {areaId: ''}});
                    setTimeout(function () {
                      _this.watchObj["serverAreaObj" + (num)].data.areaId = _this.addForm.serviceProduct.areaId;
                      setTimeout(function () {
                        _this.addForm.serviceRequire.serveTempDetServes[num].receSuppName = _this.addForm.serviceProduct.receSuppName;
                        _this.addForm.serviceRequire.serveTempDetServes[num].receSuppId = _this.addForm.serviceProduct.receSuppId;
                      }, 200);
                    }, 200);
                  }
                }
              };
              _this.activeNode = 3;
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      sureFun () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.produceAddForm = true;
          }
        });
      },
      submitForm () {
        let _this = this;
        if (_this.submitDeadlineFlag === true) { return; }
        _this.$refs.addTemplateForm.validate((valid) => {
          if (valid) {
            _this.submitDeadlineFlag = true;
            _this.addForm.serviceCharge.tempName = _this.addTemplateForm.tempName;
            api.post(_this.apiPath.hrsc.saveServeTemp, _this.addForm).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.produceAddForm = false;
                _this.$message({message: '新增成功！',
                  type: 'success',
                  onClose: function () {
                    _this.$router.push({path: '/custServTemplate'});
                    _this.submitDeadlineFlag = false;
                  }
                });
              } else {
                _this.submitDeadlineFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      cleanContent () {
        this.$refs.addTemplateForm.resetFields();
      },
      stepFun (index) {
        if (index === 1) {
          document.getElementById("content").scrollTop = 0;
        } else if (index === 2) {
          document.getElementById("content").scrollTop = 170;
        } else {
          document.getElementById("content").scrollTop = 315;
        }
      },
      resetForm () {
        this.$refs.deadlineForm.resetFields();
        if (this.isEmptyFlag) {
          this.addForm.serviceCharge.custId = '';
          this.addForm.serviceCharge.custName = '';
        }
      }
    },
    mounted () {
      let that = this;
      var monitorEle = document.getElementById("content");
      monitorEle.addEventListener('scroll', function () {
        if (document.getElementById('first-con-id')) {
          that.scrollDist = monitorEle.scrollTop;
          if (that.scrollDist > 37) {
            document.getElementById('first-con-id').style.top = that.scrollDist - 37 + 'px';
          } else {
            document.getElementById('first-con-id').style.top = 0;
          }
        }
      }, false);
      if (this.$route.query.hashFlag) {
        let that = this;
        this.$route.query.resData = JSON.parse(this.$route.query.resData);
        this.$route.query.saveData = JSON.parse(this.$route.query.saveData);
        var index = parseInt(window.sessionStorage.getItem('index' + this.$route.query.hashFlag.substring(4)));
        var localData = JSON.parse(window.sessionStorage.getItem(this.$route.query.hashFlag));
        if (this.$route.query.type === 'sins') {
          if (localData.serviceRequire.serveTempDetSinses[index].acctNames.length === 0) {
            if (localData.serviceRequire.serveTempDetSinses[index].payFeeWay === 1) {
              if (localData.serviceRequire.serveTempDetSinses[index].areaId === this.$route.query.saveData.areaId && this.$route.query.saveData.payFeeWay === 1) {
                localData.serviceRequire.serveTempDetSinses[index].acctNames.push(this.$route.query.resData.sinsAcctName + '-' + this.$route.query.resData.unitSinsNo);
                localData.serviceRequire.serveTempDetSinses[index].acctIds.push(this.$route.query.resData.sinsAcctId);
              }
            } else if (localData.serviceRequire.serveTempDetSinses[index].payFeeWay === 2) {
              if (localData.serviceRequire.serveTempDetSinses[index].areaId === this.$route.query.saveData.areaId && this.$route.query.saveData.payFeeWay === 2 && this.$route.query.saveData.custId === localData.serviceCharge.custId) {
                localData.serviceRequire.serveTempDetSinses[index].acctNames.push(this.$route.query.resData.sinsAcctName + '-' + this.$route.query.resData.unitSinsNo);
                localData.serviceRequire.serveTempDetSinses[index].acctIds.push(this.$route.query.resData.sinsAcctId);
              }
            }
          }
        } else {
          if (!localData.serviceRequire.serveTempDetAccus[index].acctName) {
            if (localData.serviceRequire.serveTempDetAccus[index].payFeeWay === 1) {
              if (localData.serviceRequire.serveTempDetAccus[index].areaId === this.$route.query.saveData.areaId && this.$route.query.saveData.payFeeWay === 1) {
                localData.serviceRequire.serveTempDetAccus[index].acctName = this.$route.query.resData.accuAcctName + '-' + this.$route.query.saveData.unitRegiNo;
                localData.serviceRequire.serveTempDetAccus[index].acctId = this.$route.query.resData.accuAcctId;
              }
            } else if (localData.serviceRequire.serveTempDetAccus[index].payFeeWay === 2) {
              if (localData.serviceRequire.serveTempDetAccus[index].areaId === this.$route.query.saveData.areaId && this.$route.query.saveData.payFeeWay === 2 && this.$route.query.saveData.custId === localData.serviceCharge.custId) {
                localData.serviceRequire.serveTempDetAccus[index].acctName = this.$route.query.resData.accuAcctName + '-' + this.$route.query.resData.unitRegiNo;
                localData.serviceRequire.serveTempDetAccus[index].acctId = this.$route.query.resData.accuAcctId;
              }
            }
          }
        }
        this.addForm.serviceCharge = JSON.parse(JSON.stringify(localData.serviceCharge));
        setTimeout(function () {
          that.activeNode = 2;
          setTimeout(
            function () {
              that.addForm.serviceProduct = JSON.parse(JSON.stringify(localData.serviceProduct));
              setTimeout(function () {
                that.addForm.serviceProduct = JSON.parse(JSON.stringify(localData.serviceProduct));
                that.addlocalFun2();
                setTimeout(function () {
                  that.addForm.serviceRequire.serveTempDetSinses = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetSinses;
                  that.addForm.serviceRequire.serveTempDetAccus = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetAccus;
                  that.addForm.serviceRequire.serveTempDetWages = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetWages;
                  that.addForm.serviceRequire.serveTempDetServes = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetServes;
                  setTimeout(function () {
                    that.addForm.serviceRequire.serveTempDetSinses = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetSinses;
                    that.addForm.serviceRequire.serveTempDetAccus = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetAccus;
                    that.addForm.serviceRequire.serveTempDetWages = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetWages;
                    that.addForm.serviceRequire.serveTempDetServes = JSON.parse(JSON.stringify(localData.serviceRequire)).serveTempDetServes;
                  });
                }, 900);
              });
            }
          );
        });
      }
    }
  };
</script>
