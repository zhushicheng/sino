<template>
  <!--<div>新增产品服务模板</div>-->
  <div class="usermanage localinfo" id="localinfoId">
    <sino-form :model="modifyObj"  class="serch-form" ref="modifyObj">
      <sino-con class="first-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
        <sino-title type="levelOne" title="修改产品服务模板"></sino-title>
        <div class="crumbs modify-crumbs">
          <ul>
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span @click="stepFun(1)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>选择产品进行修改</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2}"><span @click="stepFun(2)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>确认变化明细</span></li>
            <li :class="{'li-active': activeNode === 3}"><span @click="stepFun(3)"><i class="step-num iconfont">3</i>选择生效日期及人员范围</span></li>
          </ul>
        </div>
      </sino-con>
      <sino-con class="second-con" v-if="scrollDist > 37" id="second-con-id">
      </sino-con>
      <sino-con class="third-con" id="third-con-id">
        <div class="crumb-box clearfix">
          <div class="local-info" :class="{'step2-underline': activeNode >= 2}">
            <ul class="local-info-ul">
              <li class="content-big-box">
                <sino-form-item label="客户名称：" prop="custName" class="search-inner-item"  :rules="[{ required: true, message: '客户名称为必填项', trigger: 'change'}]">
                  <sino-input type="text" :disabled="true" class="modify-custName-long" v-model="modifyObj.custName"></sino-input>
                </sino-form-item>
              </li>
              <li class="serveChargingType-li serveChargingType-li1">
                <sino-form-item label="服务费计费方式："  prop="serveChargingTypeName" class="search-inner-item" :rules="[{ required: true, message: '服务费计费方式为必填项', trigger: 'change'}]">
                  <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start"
                                trigger="hover">
                    <p>服务费计费方式：服务费的收取方式。</p>
                    <p>按明细计算：各项服务的服务费分开计算。</p>
                    <p>按汇总计算：各项服务的服务费一起计算。</p>
                    <i class="iconfont sino-fangxingwenhao"
                       style="float:left;margin-top:4px;margin-left:-143px;color:#399ff2" slot="reference"></i>
                  </sino-popover>
                  <sino-input type="text" :disabled="true" v-model="modifyObj.serveChargingTypeName"></sino-input>
                </sino-form-item>
              </li>
              <li class="content-big-box ml33">
                <sino-form-item label="产品服务模板名称：" prop="tempName" class="search-inner-item"  :rules="[{ required: true, message: '产品服务模板名称为必填项', trigger: 'change'}]">
                  <sino-input type="text" class="modify-custName-long" v-model="modifyObj.tempName" :disabled="activeNode > 1"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div class="crumb-box clearfix" v-show="activeNode === 1">
          <sino-title type="levelTwo" title="服务内容"></sino-title>
          <ul class="choosed-content-box">
            <li class="fl" :class="{'choosed-ser-tab' : activedServeObjIds.indexOf(item.priceId) !== -1, 'deleted-ser-tab': deletedServeObjIds.indexOf(item.priceId) !== -1}" v-for="(item, index) in choosedServeObj" :key="index"><span v-text="item.priceName" @click="activedServeObjFun(item)"></span><i class="fr iconfont sino-cuo" @click="deleteServeFun(item)"></i></li>
            <li class="fl" @click="modifyAdd">新增</li>
          </ul>
        </div>
        <div class="crumb-box clearfix" v-show="activeNode === 1">
          <!--社保-->
          <div class="crumb-box-child clearfix" v-for="(item, index) in modifyObj.addServeTemp.serveTempDetSinses" :key="item.priceId" v-show="activedServeObjIds.indexOf(item.priceId) !== -1" v-if="deletedServeObjIds.indexOf(item.priceId) == -1">
            <h6>{{item.serveTempDetServe.priceName}}</h6>
            <div class="local-info">
              <ul class="local-info-ul" >
                <li v-if="modifyObj.serveChargingType === 1">
                  <sino-form-item label="服务费收费金额：" :prop="'addServeTemp.serveTempDetSinses['+index+'].serveTempDetServe.chargeMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为数字类型且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetServe.chargeMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="modifyObj.serveChargingType === 1 && serveTempDetSinses[index]">
                  <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetSinses['+index+'].serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '付费金额为数字且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="modifyObj.serveChargingType === 1 && !serveTempDetSinses[index]" >
                  <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetSinses['+index+'].serveTempDetServe.payMoney'" class="search-inner-item">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="modifyObj.serveChargingType === 1">
                  <sino-form-item label="服务费发票科目：" :prop="'addServeTemp.serveTempDetSinses['+index+'].serveTempDetServe.invSubName'" class="search-inner-item" :rules="[{ required: true, message: '服务费发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetServe.invSubName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetServe.invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{data:{invSubType:1}}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].areaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].areaName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].areaId" :clear="true" :url="areaSelectBox"
                                 @change="sinsAreaChange(index)"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="受托供应商：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].receSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" @change="sinsSuppChange(modifyObj.addServeTemp.serveTempDetSinses[index].receSuppId, index)"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].receSuppName" :linkage="true"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].receSuppId" :clear="true" :url="selectBox"  :data="watchObj['sinsAreaObj'+index]"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="起做止做原则：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].begEndPrinName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].begEndPrin" :clear="true" :url="selUrl"
                                 :data="{code:'BEG_END_PRIN '}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="缴费方式：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].payFeeWay'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '缴费方式为必填项', trigger: 'change'}]">
                    <sino-popover :popper-class="'questionTip'"placement="bottom-start"
                                  trigger="hover">
                      <p>大库：将雇员的社保缴纳在受托供应商的社保账户下，也称“大盘”。</p>
                      <p>单立户：将雇员的社保缴纳在客户/企业自己的社保账户下，也称“小盘”/“独立户”。</p>
                      <i class="iconfont sino-fangxingwenhao"
                         style="float:left;margin-top:4px;margin-left:-102px;color:#399ff2" slot="reference"></i>
                    </sino-popover>
                    <sino-radio-group v-model.number="modifyObj.addServeTemp.serveTempDetSinses[index].payFeeWay" @change="sinsPayFreeChange(index,modifyObj.addServeTemp.serveTempDetSinses[index].payFeeWay)">
                      <sino-radio v-for="(child, _index) in payFeeArr" :key="child" :disabled="alreadyAddIds.indexOf(item.priceId)===-1"
                                  :label="child.id">{{child.title}}</sino-radio>
                    </sino-radio-group>
                  </sino-form-item>
                </li>
                <li class="content-big-box">
                  <sino-form-item label="社保企业账户：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].acctNames'" class="search-inner-item add-acount-jump" :rules="[{ required: true, type: 'array', message: '社保账户为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="true" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].acctNames" :autoChoose="true"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].acctIds" :clear="true" :url="AcctSelectBox"
                                 :data="watchObj['sinsAcctObj'+index]" @change="checkSinsFun(index)"></sino-select>
                    <sino-button type="icon-text" @click="jumpSinsFun(index)" v-if="false"><i class="iconfont sino-add"></i>新增</sino-button>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口性质：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[0].householdType'" class="search-inner-item">
                    <sino-checkbox v-for="(child, ind) in registeredArr" :key="ind" class="mt5"
                                v-model="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[0].householdType" @change="householdTypeOneChange(index, 0)"
                                :label="child.id" v-if="child.id === 1" :disabled="alreadyAddIds.indexOf(item.priceId)===-1">{{child.title}}</sino-checkbox>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保缴费标准：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[0].pkgName'" class="search-inner-item" :rules="[{ required: Boolean(modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[0].householdType.length), message: '地方标准组合为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[0].pkgName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[0].pkgId" :clear="true" :url="localStanPkgSelectBox" :autoChoose="true"
                                 :data="watchObj['sinsPkg0Obj'+index]"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item :label="modifyObj.serveChargingType === 1 ? '社保发票科目：':'发票科目：'" :prop="'addServeTemp.serveTempDetSinses['+ index + '].invsubName'"  class="search-inner-item" :rules="[{ required: true, message: '发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].invsubName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].invsubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{replaceType:1, data:{invSubType:2}}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口性质：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[1].householdType'" class="search-inner-item">
                    <sino-checkbox v-for="(child, inde) in registeredArr" :key="inde" class="mt5"
                                v-model="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[1].householdType" @change="householdTypeTwoChange(index, 1)"
                                :label="child.id" v-if="child.id === 2" :disabled="alreadyAddIds.indexOf(item.priceId)===-1">{{child.title}}</sino-checkbox>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保缴费标准：" :prop="'addServeTemp.serveTempDetSinses['+ index + '].serveTempDetSinsPkgs[1].pkgName'" class="search-inner-item" :rules="[{ required: Boolean(modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[1].householdType.length), message: '地方标准组合为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[1].pkgName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetSinses[index].serveTempDetSinsPkgs[1].pkgId" :clear="true" :url="localStanPkgSelectBox" :autoChoose="true"
                                 :data="watchObj['sinsPkg1Obj'+index]"></sino-select>
                  </sino-form-item>
                </li>
                <li class="clearfix"></li>
              </ul>
            </div>
          </div>
          <!--公积金-->
          <div class="crumb-box-child clearfix" v-for="(item, index) in modifyObj.addServeTemp.serveTempDetAccus" v-show="activedServeObjIds.indexOf(item.priceId) !== -1" v-if="deletedServeObjIds.indexOf(item.priceId) === -1" :key="item.priceId">
            <h6>{{item.serveTempDetServe.priceName}}</h6>
            <div class="local-info">
              <ul class="local-info-ul" >
                <li v-if="modifyObj.serveChargingType === 1">
                  <sino-form-item label="服务费收费金额：" :prop="'addServeTemp.serveTempDetAccus['+index+'].serveTempDetServe.chargeMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为数字且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetAccus[index].serveTempDetServe.chargeMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="modifyObj.serveChargingType === 1 && serveTempDetAccus[index]">
                  <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetAccus['+index+'].serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为数字且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetAccus[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="modifyObj.serveChargingType === 1 && !serveTempDetAccus[index]">
                  <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetAccus['+index+'].serveTempDetServe.payMoney'" class="search-inner-item">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetAccus[index].serveTempDetServe.payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="modifyObj.serveChargingType === 1">
                  <sino-form-item label="服务费发票科目：" :prop="'addServeTemp.serveTempDetAccus['+index+'].serveTempDetServe.invSubName'" class="search-inner-item" :rules="[{ required: true, message: '服务费发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].serveTempDetServe.invSubName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].serveTempDetServe.invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{data:{invSubType:1}}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].areaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].areaName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].areaId" :clear="true" :url="areaSelectBox"
                                 @change="accuAreaChange(index)"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="受托供应商：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].receSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" @change="accuSuppChange(modifyObj.addServeTemp.serveTempDetAccus[index].receSuppId, index)"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].receSuppName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].receSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['accuAreaObj'+index]"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="起做止做原则：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].begEndPrinName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].begEndPrin" :clear="true" :url="selUrl"
                                 :data="{code:'BEG_END_PRIN '}"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="缴费方式：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].payFeeWay'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '缴费方式为必填项', trigger: 'change'}]">
                    <sino-popover :popper-class="'questionTip'"placement="bottom-start"
                                  trigger="hover">
                      <p>大库：将雇员的社保缴纳在受托供应商的社保账户下，也称“大盘”。</p>
                      <p>单立户：将雇员的社保缴纳在客户/企业自己的社保账户下，也称“小盘”/“独立户”。</p>
                      <i class="iconfont sino-fangxingwenhao"
                         style="float:left;margin-top:4px;margin-left:-102px;color:#399ff2" slot="reference"></i>
                    </sino-popover>
                    <sino-radio-group v-model.number="modifyObj.addServeTemp.serveTempDetAccus[index].payFeeWay" @change="accuPayFreeChange(index,modifyObj.addServeTemp.serveTempDetAccus[index].payFeeWay)">
                      <sino-radio v-for="(child, inde) in payFeeArr" :key="inde" :disabled="alreadyAddIds.indexOf(item.priceId)===-1"
                                  :label="child.id">{{child.title}}</sino-radio>
                    </sino-radio-group>
                  </sino-form-item>
                </li>
                <li class="content-big-box">
                  <sino-form-item label="公积金企业账户：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].acctName'" class="search-inner-item add-acount-jump" :rules="[{ required: true, message: '社保账户为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].acctName" :autoChoose="true"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].acctId" :clear="true" :url="accuAcctSelectBox"
                                 :data="watchObj['accuAcctObj'+index]" @change="accuAcctChange(index)"></sino-select>
                    <sino-button type="icon-text" @click="jumpAccuFun(index)" v-if="false"><i class="iconfont sino-add"></i>新增</sino-button>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公积金缴费标准：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].pkgName'" class="search-inner-item" :rules="[{ required: true, message: '地方标准组合为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].pkgName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].pkgId" :clear="true" :url="localStanPkgSelectBox" :autoChoose="true"
                                 :data="watchObj['accuPkgObj'+index]"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公积金比例：" :prop="'addServeTemp.serveTempDetAccus['+ index + '].accuPerName'" class="search-inner-item" :rules="[{ required: true, message: '公积金比例为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].accuPerName" :autoChoose="true" @change="accuPerChange(index)"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].accuPerId" :clear="true" :data="watchObj['accuPerObj'+index]" :url="findAccuPropSelect"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item :label="modifyObj.serveChargingType === 1 ? '社保发票科目：':'发票科目：'" :prop="'addServeTemp.serveTempDetAccus['+ index + '].invsubName'"  class="search-inner-item" :rules="[{ required: true, message: '发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetAccus[index].invsubName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetAccus[index].invsubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{replaceType:2, data:{invSubType:2}}"></sino-select>
                  </sino-form-item>
                </li>
                <li class="clearfix"></li>
              </ul>
            </div>
          </div>
          <!--工资-->
          <div v-for="(item, index) in modifyObj.addServeTemp.serveTempDetWages" :key="item.priceId">
            <div class="crumb-box-child clearfix" v-show="activedServeObjIds.indexOf(item.priceId) !== -1" v-if="deletedServeObjIds.indexOf(item.priceId) === -1">
              <h6>{{item.priceName}}</h6>
              <div class="local-info">
                <ul class="local-info-ul" >
                  <li v-if="modifyObj.serveChargingType === 1">
                    <sino-form-item label="服务费收费金额：" :prop="'addServeTemp.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.chargeMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费收费金额为数字类型且必填项', trigger: 'change'}]">
                      <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.chargeMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="modifyObj.serveChargingType === 1 && serveTempDetWagesGongzi[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '服务费付费金额为数字类型且必填项', trigger: 'change'}]">
                      <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="modifyObj.serveChargingType === 1 && !serveTempDetWagesGongzi[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.payMoney'" class="search-inner-item">
                      <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="modifyObj.serveChargingType === 1">
                    <sino-form-item label="服务费发票科目：" :prop="'addServeTemp.serveTempDetWages['+index+'].serveTempDetGongZi.serveTempDetServe.invSubName'" class="search-inner-item" :rules="[{ required: true, message: '服务费发票科目为必填项', trigger: 'change'}]">
                      <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                   :totalNum="false" :isPage="true" :isGroup="false"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.invSubName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.serveTempDetServe.invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                   :data="{data:{invSubType:1}}"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="执行地区：" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetGongZi.wageAreaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageAreaName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageAreaId" :clear="true" :url="areaSelectBox"
                                   @change="salaryAreaChange(index)"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="受托供应商：" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetGongZi.wageReceSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" @change="wageGongziSuppChange(modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageReceSuppId, index)"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageReceSuppName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageReceSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['salaryAreaObj'+index]"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="起做止做原则：" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetGongZi.begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                   :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.begEndPrinName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.begEndPrin" :clear="true" :url="selUrl"
                                   :data="{code:'BEG_END_PRIN '}"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item :label="modifyObj.serveChargingType === 1? '工资项发票科目：':'发票科目'" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetGongZi.wageInvsubName'" class="search-inner-item" :rules="[{ required: true, message: '缴费方式为必填项', trigger: 'change'}]">
                      <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false"
                                   :totalNum="false" :isPage="false" :isGroup="false"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageInvsubName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageInvsubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                   :data="{replaceType:3, data:{invSubType:2}}"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="是否异地报税：" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetGongZi.isAlloTax'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '社保账户为必填项', trigger: 'change'}]" v-if="modifyObj.serveChargingType === 1">
                      <sino-radio v-for="(child, _index) in yesNoArr" :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :key="_index"
                                  v-model.number="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.isAlloTax"
                                  :label="child.id">{{child.title}}</sino-radio>
                    </sino-form-item>
                  </li>
                  <li class="clearfix"></li>
                </ul>
              </div>
            </div>
            <div class="crumb-box-child clearfix" v-show="activedServeObjIds.indexOf(item.priceId) !== -1" v-if="deletedServeObjIds.indexOf(item.priceId) === -1 && modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.isAlloTax === 1">
              <h6>代报个税服务</h6>
              <div class="local-info">
                <ul class="local-info-ul" >
                  <li>
                    <sino-form-item label="执行地区：" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetDeclare.taxAreaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.taxAreaName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.taxAreaId" :clear="true" :url="areaSelectBox" @change="taxAreaChange(index)"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="受托供应商：" :prop="'addServeTemp.serveTempDetWages['+ index + '].serveTempDetDeclare.taxReceSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                      <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                   :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false" @change="wageTaxSuppChange(modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.taxReceSuppId, index)"
                                   :chooseName.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.taxReceSuppName"
                                   :chooseId.sync="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.taxReceSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['taxAreaObj'+index]"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li v-if="serveTempDetWagesTax[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetWages['+index+'].serveTempDetDeclare.serveTempDetServe.payMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '付费金额为必填项', trigger: 'change'},{ validator: validator.checkNum, message:'付费金额为数字类型', trigger: 'change'}]">
                      <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                  <li v-if="!serveTempDetWagesTax[index]">
                    <sino-form-item label="服务费付费金额：" :prop="'addServeTemp.serveTempDetWages['+index+'].serveTempDetDeclare.serveTempDetServe.payMoney'" class="search-inner-item">
                      <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.serveTempDetServe.payMoney"></sino-input>
                    </sino-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--服务费-->
          <div class="crumb-box-child clearfix" v-for="(item, index) in modifyObj.addServeTemp.serveTempDetServes" v-show="activedServeObjIds.indexOf(item.priceId) !== -1" v-if="deletedServeObjIds.indexOf(item.priceId) === -1" :key="item.priceId">
            <h6>{{item.priceName}}</h6>
            <div class="local-info">
              <ul class="local-info-ul">
                <li>
                  <sino-form-item label="执行地区：" :prop="'addServeTemp.serveTempDetServes['+ index + '].areaName'" class="search-inner-item" :rules="[{ required: true, message: '执行地区为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetServes[index].areaName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetServes[index].areaId" :clear="true" :url="areaSelectBox" @change="serverAreaChange(index)"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="受托供应商：" :prop="'addServeTemp.serveTempDetServes['+ index + '].receSuppName'" class="search-inner-item" :rules="[{ required: true, message: '受托供应商为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                                 :disabled="alreadyAddIds.indexOf(item.priceId)===-1" :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetServes[index].receSuppName" @change="serveSuppChange(modifyObj.addServeTemp.serveTempDetServes[index].receSuppId, index)"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetServes[index].receSuppId" :clear="true" :url="selectBox" :linkage="true" :data="watchObj['serverAreaObj'+index]"
                    ></sino-select>
                  </sino-form-item>
                <li>
                  <sino-form-item label="起做止做原则：" :prop="'addServeTemp.serveTempDetServes['+ index + '].begEndPrinName'" class="search-inner-item" :rules="[{ required: true, message: '起做止做原则为必填项', trigger: 'change'}]">
                    <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                                 :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetServes[index].begEndPrinName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetServes[index].begEndPrin " :clear="true" :url="selUrl"
                                 :data="{code:'BEG_END_PRIN '}"></sino-select>
                  </sino-form-item>
                </li>
                <li v-if="!((modifyObj.serveChargingType !== 1) && (modifyObj.addServeTemp.serveTempDetServes[index].priceId !== 47))">
                  <sino-form-item label="收费金额：" :prop="'addServeTemp.serveTempDetServes['+ index + '].chargeMoney'" class="search-inner-item" :rules="[{required: true, type: 'number', message: '收费金额为数字类型,且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetServes[index].chargeMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="!((modifyObj.serveChargingType !== 1) && (modifyObj.addServeTemp.serveTempDetServes[index].priceId !== 47)) && serveTempDetServes[index]">
                  <sino-form-item label="付费金额：" :prop="'addServeTemp.serveTempDetServes['+ index + '].payMoney'" class="search-inner-item" :rules="[{ required: true, type: 'number', message: '付费金额为数字类型，且必填项', trigger: 'change'}]">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetServes[index].payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="!((modifyObj.serveChargingType !== 1) && (modifyObj.addServeTemp.serveTempDetServes[index].priceId !== 47)) && !serveTempDetServes[index]" :rules="[{trigger: 'change'}]">
                  <sino-form-item label="付费金额：" :prop="'addServeTemp.serveTempDetServes['+ index + '].payMoney'" class="search-inner-item">
                    <sino-input v-model.number="modifyObj.addServeTemp.serveTempDetServes[index].payMoney"></sino-input>
                  </sino-form-item>
                </li>
                <li class="clearfix">
                  <sino-form-item label="发票科目：" :prop="'addServeTemp.serveTempDetServes['+ index + '].invSubName'" class="search-inner-item" :rules="[{ required: true, message: '发票科目为必填项', trigger: 'change'}]">
                    <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false"
                                 :totalNum="false" :isPage="true" :isGroup="false"
                                 :chooseName.sync="modifyObj.addServeTemp.serveTempDetServes[index].invSubName"
                                 :chooseId.sync="modifyObj.addServeTemp.serveTempDetServes[index].invSubId" :url="invSubSelect" :clear="true" :autoChoose="true"
                                 :data="{data:{invSubType:1}}"></sino-select>
                  </sino-form-item>
                </li>
                <li v-if="(modifyObj.serveChargingType !== 1) && (modifyObj.addServeTemp.serveTempDetServes[index].priceId !== 47)"></li>
                <li v-if="(modifyObj.serveChargingType !== 1) && (modifyObj.addServeTemp.serveTempDetServes[index].priceId !== 47)"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="crumb-box clearfix" v-show="activeNode === 2">
          <sino-auto-table :data="tableData" stripe border ref="searchTable" :span-method="objectSpanMethod" :row-style="rowStyleFun">
            <sino-table-column prop="chanContent" label="变更内容"></sino-table-column>
            <sino-table-column prop="chanTypeName" label="变更信息"></sino-table-column>
            <sino-table-column prop="chanBefore" label="变更前"></sino-table-column>
            <sino-table-column prop="chanAfter" label="变更后"></sino-table-column>
          </sino-auto-table>
        </div>
        <div class="crumb-box clearfix" v-if="activeNode === 3">
          <div class="local-info" style="margin-top:-20px">
            <ul class="local-info-ul">
              <li>
                <sino-form-item label="生效原则：" class="search-inner-item">
                  <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false"
                               :disabled="custDisFlag" :totalNum="false" :isPage="false" :isGroup="false"
                               :data="{code: 'SERVE_TEMP_CHAN_FEE_TYPE'}"
                               :chooseName.sync="modifyObj.takeEffectPrinName"
                               :chooseId.sync="modifyObj.takeEffectPrin" :clear="true" :url="apiPath.hrsc.getDictSelectBox" :token="token" @change="takeEffectPrinChange(modifyObj.takeEffectPrin)"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="生效日期：" class="search-inner-item" v-if="modifyObj.takeEffectPrin === 1">
                  <sino-date-picker
                    v-model="modifyObj.takeEffectDate"
                    :picker-options="disabledData"
                    type="date"
                    format="yyyy-MM-dd"
                    :editable="false"
                    :readonly="false"
                    @change="takeEffectDateChange(modifyObj.takeEffectDate)"
                  >
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li class="content-big-box serveChargingType-li" v-if="modifyObj.takeEffectPrin === 3">
                <sino-form-item label="指定产品：" class="search-inner-item sino-radio-long-width">
                  <sino-radio-group v-model.number="modifyObj.takeEffectRefeProd" @change="takeEffectRefeProdChange(modifyObj.takeEffectRefeProd)">
                    <sino-radio v-if="[54, 55, 56].indexOf(item.priceId) !== -1" v-for="(item, inex) in detailServeObj" :key="inex"
                                :label="item.priceId">{{item.priceName}}</sino-radio>
                  </sino-radio-group>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div class="crumb-box clearfix" v-show="activeNode === 3 && effectData">
          <div class="effect-person-scope">
            <sino-title type="levelTwo" title="设置生效人员范围"></sino-title>
            <ul class="effect-person-scope-title" v-if="(modifyObj.takeEffectPrin === 1 &&  modifyObj.takeEffectDate) || modifyObj.takeEffectPrin === 2 || (modifyObj.takeEffectPrin === 3 && modifyObj.takeEffectRefeProd)">
              <li><span><i class="scope-i"></i>影响范围</span></li>
              <li><i class="total-scope-i"></i>总计范围</li>
              <li><i class="break-num-i"></i>突破人数</li>
              <li><i class="effect-num-i"></i>影响人数</li>
              <li><i class="total-num-i"></i>总计人数</li>
              <li><i class="effect-data-i"><div class="effect-data-circle"></div></i>生效日期</li>
            </ul >
            <div class="effect-person-img" v-if="(modifyObj.takeEffectPrin === 1 &&  modifyObj.takeEffectDate) || modifyObj.takeEffectPrin === 2 || (modifyObj.takeEffectPrin === 3 && modifyObj.takeEffectRefeProd)">
              <ul class="effect-person-left" v-if="effectData">
                <li v-if="effectData.ONJOB">
                  <p>
                    在职人员
                  </p>
                  <div class="echart-line-box-parent">
                    <div class="echart-line-box">
                      <div class="echart-line have-bl have-br">
                        <div class="echart-line-inner">
                          <div class="effect-echart-line fr" :style="{'width': modifyObj.takeEffectPrin === 1?'60%':'100%'}" v-if="modifyEffect.ONJOBFlag"></div>
                        </div>
                        <div class="effect-ground-box position-l" :style="{'left': modifyObj.takeEffectPrin === 1?'40%':'-6px'}" v-if="modifyEffect.ONJOBFlag"></div>
                        <div class="effect-ground-box position-r" v-if="modifyEffect.ONJOBFlag"></div>
                      </div>
                    </div>
                  </div>
                  <em><span @click="modifyEffect.ONJOBFlag = !modifyEffect.ONJOBFlag">{{modifyEffect.ONJOBFlag?'不修改':'修改'}}</span></em>
                  <div class="effect-num-tip" v-if="modifyObj.takeEffectPrin !== 1"><span>{{effectData.ONJOB}}人</span><div class="triangle-down"></div></div>
                </li>
                <li v-if="effectData.WAITJOB">
                  <p>
                    <sino-popover ref="popover1" :popper-class="'questionTip'" placement="bottom-start" trigger="hover" content="雇员已撤离，但订单结束日期晚于当前日期"></sino-popover>
                    <i class="iconfont sino-fangxingwenhao" style="display:inline-block;margin-top:10px;color:#399ff2" v-popover:popover1></i>
                    即将离职人员
                  </p>
                  <div class="echart-line-box-parent">
                    <div class="echart-line-box">
                      <div class="echart-line have-bl have-br">
                        <div class="echart-line-inner">
                          <div class="effect-echart-line fr" :style="{'width': modifyObj.takeEffectPrin === 1?'60%':'100%'}" v-if="modifyEffect.WAITJOBFlag"></div>
                        </div>
                        <div class="effect-ground-box position-l" :style="{'left': modifyObj.takeEffectPrin === 1?'40%':'-6px'}" v-if="modifyEffect.WAITJOBFlag"></div>
                        <div class="effect-ground-box position-r" v-if="modifyEffect.WAITJOBFlag"></div>
                      </div>
                    </div>
                  </div>
                  <em><span @click="modifyEffect.WAITJOBFlag = !modifyEffect.WAITJOBFlag">{{modifyEffect.WAITJOBFlag?'不修改':'修改'}}</span></em>
                  <div class="effect-num-tip" v-if="modifyObj.takeEffectPrin !== 1"><span>{{effectData.WAITJOB}}人</span><div class="triangle-down"></div></div>
                </li>
                <li v-if="effectData.UNJOB">
                  <p>
                    <sino-popover ref="popover2" :popper-class="'questionTip'" placement="bottom-start" trigger="hover" content="雇员已撤离，但订单结束日期早于或等于当前日期"></sino-popover>
                    <i class="iconfont sino-fangxingwenhao" style="display:inline-block;margin-top:10px;color:#399ff2" v-popover:popover2></i>
                    已离职人员
                  </p>
                  <div class="echart-line-box-parent">
                    <div class="echart-line-box">
                      <div class="echart-line have-bl have-br" :style="{'width': modifyObj.takeEffectPrin === 1?'35%':effectData.UNJOB/effectData.ONJOB}">
                        <div class="echart-line-inner">
                          <div class="effect-echart-line" v-if="modifyEffect.UNJOBFlag"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <em v-if="modifyObj.takeEffectPrin !== 1"><span @click="modifyEffect.UNJOBFlag = !modifyEffect.UNJOBFlag">{{modifyEffect.UNJOBFlag?'不修改':'修改'}}</span></em>
                  <div class="effect-num-tip" v-if="modifyObj.takeEffectPrin !== 1"><span>{{effectData.UNJOB}}人</span><div class="triangle-down"></div></div>
                </li>
                <li v-if="effectData.PREONJOB">
                  <p>
                    <sino-popover ref="popover3" :popper-class="'questionTip'" placement="bottom-start" trigger="hover" content="雇员已派出，但订单结束日期晚于当前日期"></sino-popover>
                    <i class="iconfont sino-fangxingwenhao" style="display:inline-block;margin-top:10px;color:#399ff2" v-popover:popover3></i>
                    即将入职人员
                  </p>
                  <div class="echart-line-box-parent">
                    <div class="echart-line-box" :style="{'width':isBreak? '60%':'42%'}" :class="{'fr': modifyObj.takeEffectPrin === 1,'fl': modifyObj.takeEffectPrin !== 1}">
                      <div class="echart-line have-bl">
                        <div class="echart-line-inner">
                          <div class="break-effect-echart-line fl" :style="{'width': modifyObj.takeEffectPrin === 1?'30%':effectData.UNJOB/effectData.ONJOB}" v-if="isBreak && modifyEffect.PREONJOBFlag">
                          </div>
                          <div class="effect-echart-line fr" :style="{'width':isBreak? '70%':'100%'}" v-if="modifyEffect.PREONJOBFlag && modifyObj.takeEffectPrin === 1">
                            <span @click="isBreak = !isBreak">{{isBreak? '取消突破&gt;&gt;':'&lt;&lt;突破'}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <em><span @click="modifyEffect.PREONJOBFlag = !modifyEffect.PREONJOBFlag;isBreak = false">{{modifyEffect.PREONJOBFlag?'不修改':'修改'}}</span></em>
                  <div class="effect-num-tip" v-if="modifyObj.takeEffectPrin !== 1"><span>{{effectData.PREONJOB}}人</span><div class="triangle-down"></div></div>
                </li>
              </ul>
              <ul class="effect-person-right" v-if="modifyObj.takeEffectPrin === 1 && effectData">
                <li v-if="effectData.ONJOB">
                  <div class="effect-data-circle"></div>
                  <div class="effect-num-tip" v-if="modifyEffect.ONJOBFlag"><span>{{effectData.ONJOB}}人</span><div class="triangle-down"></div></div>
                </li>
                <li v-if="effectData.WAITJOB">
                  <div class="effect-num-tip" v-if="modifyEffect.WAITJOBFlag"><span>{{effectData.WAITJOB}}人</span><div class="triangle-down"></div></div>
                </li>
                <li v-if="effectData.UNJOB">
                </li>
                <li v-if="effectData.PREONJOB">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="conf-btn">
          <sino-button type="primary" @click="sureFun(activeNode)">{{(activeNode === 3 || jumpFlag !== 1)? '确 定':'下一步'}}</sino-button>
          <span @click="backFun(activeNode)" class="custT-back" v-if="activeNode > 1">返回</span>
        </div>
      </sino-con>
    </sino-form>
    <sino-dialog :visible.sync="layerFlag" size="samll" dialogHide class="accuman-add-layer clearPadding modify-template-layer template-server-item" v-on:close="resetFun('applyForm')">
      <sino-title slot="title" type="levelOne" title="新增服务内容" class="sino-dialog-title"></sino-title>
      <sino-form  ref="batchForm" class="his-serch-form serch-form ">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="服务内容：" class="search-inner-item" prop="custName">
                <sino-input type="text" v-model="searchContent" :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary right-ser-btn" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <div class="server-content-box">
        <div class="server-content-item" :class="{'server-content-item-active': willChooseObjIds.indexOf(item.priceId) !== -1}" v-for="(item, inx) in allServeObj" :key="inx" v-if="choosedServeObjIds.indexOf(item.priceId) === -1" @click="willChooseFun(item)">{{item.priceName}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitApplyForm()">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import Cookies from 'js-cookie';
  import api from '../../../../api';
  import Vue from 'vue';
  import SinoCheckbox from "../../../../../node_modules/sinoUI/packages/sinocheckbox/src/index.vue";
  export default {
    components: {SinoCheckbox},
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
        // 修改对象
        sourceObj: '', // 获取后的最原始数据
        modifyObj: {
          takeEffectPrinName: '',
          takeEffectPrin: '',
          takeEffectDate: '',
          takeEffectRefeProd: '',
          tempName: '',
          serveTempId: '',
          custName: '',
          custId: '',
          serveChargingTypeName: '',
          serveChargingType: '',
          addServeTemp: {
            serveTempDetSinses: [],
            // 公积金
            serveTempDetAccus: [],
            // 工资
            serveTempDetWages: [],
            // 服务费
            serveTempDetServes: []
          },
          deleteServeTemp: {
            serveTempDetSinses: [],
            // 公积金
            serveTempDetAccus: [],
            // 工资
            serveTempDetWages: [],
            // 服务费
            serveTempDetServes: []
          }
        },
        copyAllServeObj: [],
        allServeObj: [],
        choosedServeObjIds: [],
        choosedServeObj: [],
        activedServeObjIds: [],
        deletedServeObj: [],
        deletedServeObjIds: [],
        willChooseObj: [],
        willChooseObjIds: [],
        alreadyAddIds: [],
        watchObj: {},
        mapObj: {},
        indexArr: [],
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
        producemodifyObj: false,
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
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        agentLayerAdd: false,
        agentmodifyObj: {
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
        detailServeObj: [],
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
        custDisFlag: false,
        batchForm: {},
        layerFlag: false,
        jumpFlag: 1,
        effectData: null,
        modifyEffect: {
          PREONJOBFlag: true,
          ONJOBFlag: true,
          UNJOBFlag: true,
          WAITJOBFlag: true
        },
        isBreak: false,
        willSureObj: {},
        searchContent: '',
        disabledData: {
          disabledDate (time) {
            return time.toString().split(" ")[2] !== '01';
          }
        }
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
        this.modifyObj.custName = this.$route.query.custName;
        this.modifyObj.custId = this.$route.query.custId;
      }
    },
    beforeMount () {
      api.post(this.apiPath.hrsc.findServeTempContent, {serveChargingType: this.$route.query.serveChargingType}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.allServeObj = res.data;
          this.copyAllServeObj = JSON.parse(JSON.stringify(res.data));
        }
      }).catch(err => {
        console.log(err);
      });
      api.post(this.apiPath.hrsc.findServeTempContent, {serveChargingType: 1}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.detailServeObj = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      api.post(this.apiPath.hrsc.findServeTempById, this.$route.query).then(res => {
        if (res.code === 'CPYY-00001') {
          let resData = JSON.parse(JSON.stringify(res.data));
          this.modifyObj.serveTempId = resData.serviceCharge.serveTempId;
          this.modifyObj.custName = resData.serviceCharge.custName;
          this.modifyObj.custId = resData.serviceCharge.custId;
          this.modifyObj.serveChargingTypeName = resData.serviceCharge.serveChargingTypeName;
          this.modifyObj.serveChargingType = resData.serviceCharge.serveChargingType;
          this.modifyObj.tempName = resData.serviceCharge.tempName;
          this.modifyObj.serveTempId = resData.serviceCharge.tempId;
          this.sourceObj = {
            serveTempDetSinses: [],
            serveTempDetAccus: [],
            serveTempDetWages: [],
            serveTempDetServes: []
          };
          if (resData.serveTempDetSins) {
            this.sourceObj.serveTempDetSinses.push(resData.serveTempDetSins);
          }
          if (resData.serveTempDetAccu) {
            this.sourceObj.serveTempDetAccus.push(resData.serveTempDetAccu);
          }
          if (resData.serveTempDetWage) {
            this.sourceObj.serveTempDetWages.push(resData.serveTempDetWage);
          }
          if (resData.serveTempDetServes) {
            this.sourceObj.serveTempDetServes = resData.serveTempDetServes;
          }
          this.getChoosedObj(this.sourceObj);
          this.buildSerDom();
        }
      }).catch(err => {
        console.log(err);
      });
      window.onunload = this.destoryFun();
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
    },
    beforeDestroy () {
      this.destoryFun();
    },
    methods: {
      // 户口性质变化-城镇
      householdTypeOneChange (index1, index2) {
        this.watchObj['sinsPkg0Obj' + index1].householdType = this.modifyObj.addServeTemp.serveTempDetSinses[index1].serveTempDetSinsPkgs[index2].householdType;
      },
      // 户口性质变化-农村
      householdTypeTwoChange (index1, index2) {
        this.watchObj['sinsPkg1Obj' + index1].householdType = this.modifyObj.addServeTemp.serveTempDetSinses[index1].serveTempDetSinsPkgs[index2].householdType;
      },
      // 生效日期
      takeEffectDateChange (data) {
        if (data) {
          this.getEffectNum({effectDate: Vue.filter('date')(data, 'yyyy-MM')});
        }
      },
      takeEffectRefeProdChange (type) {
        if (type) {
          this.getEffectNum({prodType: type});
        }
      },
      // 生效原则变化
      takeEffectPrinChange (id) {
        this.modifyEffect = {
          PREONJOBFlag: true,
          ONJOBFlag: true,
          UNJOBFlag: true,
          WAITJOBFlag: true
        };
        if (id === 2) {
          this.getEffectNum({});
        } else if (id === 1) {
          this.modifyEffect.UNJOBFlag = false;
          this.modifyObj.takeEffectDate = new Date(Vue.filter('date')(new Date(), 'yyyy-MM') + '-01');
        }
      },
      // 调取影响人数公共方法
      getEffectNum (obj) {
        var objBox = {
          custId: this.modifyObj.custId,
          serveTempId: this.modifyObj.serveTempId,
          prodType: obj.prodType - 53,
          effectDate: obj.effectDate
        };
        api.postsign(this.apiPath.hrsc.findOrderCountByCustAndTempId, objBox).then(res => {
          if (res.code === 'CPYY-00001') {
            this.effectData = res.data;
            if (this.effectData === null) {
              this.$alert('该模板下无订单！', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                }
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      buildSerDom () {
        let that = this;
        this.addlocalFun2();
        setTimeout(
          function () {
            setTimeout(function () {
              setTimeout(function () {
                setTimeout(function () {
                  that.modifyObj.addServeTemp.serveTempDetSinses = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetSinses;
                  that.modifyObj.addServeTemp.serveTempDetAccus = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetAccus;
                  that.modifyObj.addServeTemp.serveTempDetWages = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetWages;
                  that.modifyObj.addServeTemp.serveTempDetServes = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetServes;
                  setTimeout(function () {
                    that.modifyObj.addServeTemp.serveTempDetSinses = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetSinses;
                    that.modifyObj.addServeTemp.serveTempDetAccus = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetAccus;
                    that.modifyObj.addServeTemp.serveTempDetWages = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetWages;
                    that.modifyObj.addServeTemp.serveTempDetServes = JSON.parse(JSON.stringify(that.sourceObj)).serveTempDetServes;
                    if (that.modifyObj.addServeTemp.serveTempDetSinses && that.modifyObj.addServeTemp.serveTempDetSinses.length > 0) {
                      for (var i = 0; i < that.modifyObj.addServeTemp.serveTempDetSinses.length; i++) {
                        that.householdTypeOneChange(i, 0);
                        that.householdTypeTwoChange(i, 1);
                      }
                    }
                    setTimeout(function () {
                      if (that.modifyObj.addServeTemp.serveTempDetSinses && that.modifyObj.addServeTemp.serveTempDetSinses.length > 0) {
                        for (var i = 0; i < that.modifyObj.addServeTemp.serveTempDetSinses.length; i++) {
                          that.modifyObj.addServeTemp.serveTempDetSinses[i].serveTempDetSinsPkgs[0].pkgId = that.sourceObj.serveTempDetSinses[i].serveTempDetSinsPkgs[0].pkgId;
                          that.modifyObj.addServeTemp.serveTempDetSinses[i].serveTempDetSinsPkgs[1].pkgId = that.sourceObj.serveTempDetSinses[i].serveTempDetSinsPkgs[1].pkgId;
                          that.modifyObj.addServeTemp.serveTempDetSinses[i].serveTempDetSinsPkgs[0].pkgName = that.sourceObj.serveTempDetSinses[i].serveTempDetSinsPkgs[0].pkgName;
                          that.modifyObj.addServeTemp.serveTempDetSinses[i].serveTempDetSinsPkgs[1].pkgName = that.sourceObj.serveTempDetSinses[i].serveTempDetSinsPkgs[1].pkgName;
                        }
                      }
                      setTimeout(function () {
                        if (Array.isArray(that.modifyObj.addServeTemp.serveTempDetAccus) && that.modifyObj.addServeTemp.serveTempDetAccus.length > 0) {
                          for (var j = 0; j < that.modifyObj.addServeTemp.serveTempDetAccus.length; j++) {
                            that.modifyObj.addServeTemp.serveTempDetAccus[j].pkgId = that.sourceObj.serveTempDetAccus[j].pkgId;
                            that.modifyObj.addServeTemp.serveTempDetAccus[j].pkgName = that.sourceObj.serveTempDetAccus[j].pkgName;
                          }
                        }
                      }, 100);
                    });
                  }, 200);
                });
              }, 800);
            });
          }
        );
      },
      activedServeObjFun (item) {
        if (this.deletedServeObjIds.indexOf(item.priceId) === -1) {
          if (this.activedServeObjIds.indexOf(item.priceId) === -1) {
            this.activedServeObjIds.push(item.priceId);
          } else {
            this.activedServeObjIds.splice(this.activedServeObjIds.indexOf(item.priceId), 1);
          }
        }
      },
      getChoosedObj (obj1) {
        var obj = JSON.parse(JSON.stringify(obj1));
        for (var index in obj) {
          if (Array.isArray(obj[index])) {
            obj[index].forEach(function (item) {
              this.choosedServeObj.push({priceId: item.priceId, priceName: item.priceName, prodType: item.prodType});
              this.choosedServeObjIds.push(item.priceId);
            }, this);
          }
        }
      },
      willChooseFun (item) {
        if (this.willChooseObjIds.indexOf(item.priceId) === -1) {
          this.willChooseObj.push(item);
          this.willChooseObjIds.push(item.priceId);
        } else {
          this.willChooseObj.splice(this.willChooseObjIds.indexOf(item.priceId), 1);
          this.willChooseObjIds.splice(this.willChooseObjIds.indexOf(item.priceId), 1);
        }
      },
      deleteServeFun (item) {
        if (this.deletedServeObjIds.indexOf(item.priceId) === -1) {
          this.deletedServeObj.push(item);
          this.deletedServeObjIds.push(item.priceId);
        } else {
          this.deletedServeObj.splice(this.deletedServeObjIds.indexOf(item.priceId), 1);
          this.deletedServeObjIds.splice(this.deletedServeObjIds.indexOf(item.priceId), 1);
        }
        if (this.activedServeObjIds.indexOf(item.priceId) !== -1) {
          this.activedServeObjIds.splice(this.activedServeObjIds.indexOf(item.priceId), 1);
        }
      },
      modifyAdd () {
        this.layerFlag = true;
      },
      submitApplyForm () {
        this.willChooseObj.forEach(function (item, index) {
          let that = this;
          if (item.prodType === 1) {
            this.modifyObj.addServeTemp.serveTempDetSinses.push({
              priceId: item.priceId,
              priceName: item.priceName,
              prodType: item.prodType,
              payFeeWay: '',
              areaId: '',
              areaName: '',
              acctIds: [],
              acctNames: [],
              invsubId: '',
              invsubName: '',
              begEndPrin: '',
              begEndPrinName: '',
              receSuppId: '',
              receSuppName: '',
              serveTempDetSinsPkgs: [
                {
                  householdType: [],
                  pkgId: '',
                  pkgName: ''
                },
                {
                  householdType: [],
                  pkgId: '',
                  pkgName: ''
                }
              ],
              serveTempDetServe: {
                priceId: item.priceId,
                priceName: item.priceName,
                chargeMoney: '',
                payMoney: '',
                invSubId: '',
                invSubName: ''
              }
            });
            this.choosedServeObjIds.push(this.willChooseObjIds[index]);
            this.activedServeObjIds.push(this.willChooseObjIds[index]);
            this.alreadyAddIds.push(this.willChooseObjIds[index]);
            this.choosedServeObj.push(JSON.parse(JSON.stringify(this.willChooseObj[index])));
            let num = this.modifyObj.addServeTemp.serveTempDetSinses.length - 1;
            this.$set(this.watchObj, ("sinsAcctObj" + (num)), {custId: '', payFeeWay: '', areaId: ''});
            this.$set(this.watchObj, ("sinsPkg0Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
            this.$set(this.watchObj, ("sinsPkg1Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
            this.$set(this.watchObj, ("sinsAreaObj" + (num)), {data: {areaId: ''}});
            setTimeout(function () {
              that.watchObj["sinsPkg0Obj" + (num)].householdType = [];
              that.watchObj["sinsPkg0Obj" + (num)].areaId = '';
              that.watchObj["sinsPkg1Obj" + (num)].householdType = [];
              that.watchObj["sinsPkg1Obj" + (num)].areaId = '';
              that.watchObj["sinsAreaObj" + (num)].data.areaId = '';
              setTimeout(function () {
                that.modifyObj.addServeTemp.serveTempDetSinses[num].receSuppName = '';
                that.modifyObj.addServeTemp.serveTempDetSinses[num].receSuppId = '';
              }, 100);
            }, 100);
          } else if (item.prodType === 2) {
            this.modifyObj.addServeTemp.serveTempDetAccus.push({
              priceId: item.priceId,
              priceName: item.priceName,
              prodType: item.prodType,
              areaId: '',
              areaName: '',
              receSuppName: '',
              receSuppId: '',
              begEndPrinName: '',
              begEndPrin: '',
              payFeeWay: '',
              acctName: '',
              acctId: '',
              pkgName: '',
              pkgId: '',
              accuPerName: '',
              accuPerId: '',
              invsubName: '',
              invsubId: '',
              serveTempDetServe: {
                priceId: item.priceId,
                priceName: item.priceName,
                chargeMoney: '',
                payMoney: '',
                invSubId: '',
                invSubName: ''
              }
            });
            this.choosedServeObjIds.push(this.willChooseObjIds[index]);
            this.activedServeObjIds.push(this.willChooseObjIds[index]);
            this.alreadyAddIds.push(this.willChooseObjIds[index]);
            this.choosedServeObj.push(JSON.parse(JSON.stringify(this.willChooseObj[index])));
            let num = this.modifyObj.addServeTemp.serveTempDetAccus.length - 1;
            this.$set(this.watchObj, ("accuAcctObj" + (num)), {custId: '', payFeeWay: '', areaId: ''});
            this.$set(this.watchObj, ("accuPkgObj" + (num)), {areaId: '', localStanType: 2, accuProp: '', accuPropId: ''});
            this.$set(this.watchObj, ("accuPerObj" + (num)), {accuAcctId: ''});
            this.$set(this.watchObj, ("accuAreaObj" + (num)), {data: {areaId: ''}});
            setTimeout(function () {
              that.watchObj["accuPkgObj" + (num)].areaId = '';
              that.watchObj["accuAreaObj" + (num)].data.areaId = '';
              setTimeout(function () {
                that.modifyObj.addServeTemp.serveTempDetAccus[num].receSuppName = '';
                that.modifyObj.addServeTemp.serveTempDetAccus[num].receSuppId = '';
              }, 100);
            }, 100);
          } else if (item.prodType === 3) {
            this.modifyObj.addServeTemp.serveTempDetWages.push({
              priceId: item.priceId,
              priceName: item.priceName,
              prodType: item.prodType,
              serveTempDetGongZi: {
                priceId: item.priceName,
                priceName: item.priceId,
                wageAreaName: '',
                wageAreaId: '',
                wageReceSuppName: '',
                wageReceSuppId: '',
                begEndPrinName: '',
                begEndPrin: '',
                wageInvsubName: '',
                wageInvsubId: '',
                isAlloTax: 0,
                serveTempDetServe: {
                  priceId: '',
                  priceName: '',
                  chargeMoney: '',
                  payMoney: '',
                  invSubName: '',
                  invSubId: ''
                }
              },
              serveTempDetDeclare: {
                priceId: item.priceId,
                priceName: item.priceName,
                taxAreaName: '',
                taxAreaId: '',
                taxReceSuppName: '',
                taxReceSuppId: '',
                serveTempDetServe: {
                  payMoney: ''
                }
              }
            });
            this.choosedServeObjIds.push(this.willChooseObjIds[index]);
            this.activedServeObjIds.push(this.willChooseObjIds[index]);
            this.alreadyAddIds.push(this.willChooseObjIds[index]);
            this.choosedServeObj.push(JSON.parse(JSON.stringify(this.willChooseObj[index])));
            let num = this.modifyObj.addServeTemp.serveTempDetWages.length - 1;
            this.$set(this.watchObj, ("salaryAreaObj" + (num)), {data: {areaId: ''}});
            this.$set(this.watchObj, ("taxAreaObj" + (num)), {data: {areaId: ''}});
            setTimeout(function () {
              that.watchObj["salaryAreaObj" + (num)].data.areaId = '';
              that.watchObj["taxAreaObj" + (num)].data.areaId = '';
              setTimeout(function () {
                that.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppName = '';
                that.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppId = '';
                that.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppName = '';
                that.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppId = '';
              }, 100);
            }, 100);
          } else if (item.prodType === 5 || item.prodType === 6) {
            if (this.choosedServeObjIds.indexOf(47) === -1) {
              this.modifyObj.addServeTemp.serveTempDetServes.push({
                priceId: item.priceId,
                priceName: item.priceName,
                prodType: item.prodType,
                areaId: '',
                areaName: '',
                chargeMoney: '',
                payMoney: '',
                receSuppId: '',
                receSuppName: '',
                invSubId: '',
                invSubName: '',
                begEndPrin: '',
                begEndPrinName: ''
              });
              this.choosedServeObjIds.push(this.willChooseObjIds[index]);
              this.activedServeObjIds.push(this.willChooseObjIds[index]);
              this.alreadyAddIds.push(this.willChooseObjIds[index]);
              this.choosedServeObj.push(JSON.parse(JSON.stringify(this.willChooseObj[index])));
              let num = this.modifyObj.addServeTemp.serveTempDetServes.length - 1;
              this.$set(this.watchObj, ("serverAreaObj" + (num)), {data: {areaId: ''}});
              that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppName = '';
              that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppId = '';
              setTimeout(function () {
                that.watchObj["serverAreaObj" + (num)].data.areaId = '';
                // setTimeout(function () {
                //   that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppName = '';
                //   that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppId = '';
                // }, 100);
              }, 100);
            } else {
              let lengthNum = this.modifyObj.addServeTemp.serveTempDetServes.length - 1;
              this.modifyObj.addServeTemp.serveTempDetServes.splice(lengthNum, 0, {
                priceId: item.priceId,
                priceName: item.priceName,
                prodType: item.prodType,
                areaId: '',
                areaName: '',
                chargeMoney: '',
                payMoney: '',
                receSuppId: '',
                receSuppName: '',
                invSubId: '',

                invSubName: '',
                begEndPrin: '',
                begEndPrinName: ''
              });
              this.choosedServeObjIds.push(this.willChooseObjIds[index]);
              this.activedServeObjIds.push(this.willChooseObjIds[index]);
              this.alreadyAddIds.push(this.willChooseObjIds[index]);
              this.choosedServeObj.push(JSON.parse(JSON.stringify(this.willChooseObj[index])));
              let temporaryName = this.modifyObj.addServeTemp.serveTempDetServes[this.modifyObj.addServeTemp.serveTempDetServes.length - 1].receSuppName;
              let temporaryId = this.modifyObj.addServeTemp.serveTempDetServes[this.modifyObj.addServeTemp.serveTempDetServes.length - 1].receSuppId;
              this.serveTempDetServes.splice(this.serveTempDetServes.length - 1, 0, '');
              let num = JSON.parse(JSON.stringify(this.modifyObj.addServeTemp.serveTempDetServes)).length - 1;
              this.$set(this.watchObj, ("serverAreaObj" + (num)), {data: {areaId: ''}});
              this.watchObj['serverAreaObj' + num].data.areaId = this.watchObj['serverAreaObj' + (num - 1)].data.areaId;
              that.modifyObj.addServeTemp.serveTempDetServes[num - 1].receSuppName = '';
              that.modifyObj.addServeTemp.serveTempDetServes[num - 1].receSuppId = '';
              that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppName = temporaryName;
              that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppId = temporaryId;
              setTimeout(function () {
                that.watchObj["serverAreaObj" + (num - 1)].data.areaId = '';
                // setTimeout(function () {
                //   that.modifyObj.addServeTemp.serveTempDetServes[num - 1].receSuppName = '';
                //   that.modifyObj.addServeTemp.serveTempDetServes[num - 1].receSuppId = '';
                //   that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppName = temporaryName;
                //   that.modifyObj.addServeTemp.serveTempDetServes[num].receSuppId = temporaryId;
                // }, 100);
              }, 100);
            }
          }
        }, this);
        this.resetFun();
        this.layerFlag = false;
      },
      // 弹窗重置
      resetFun () {
        this.willChooseObj = [];
        this.willChooseObjIds = [];
        this.searchContent = '';
        this.searchFun();
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
        window.sessionStorage.setItem(hashFlag, JSON.stringify(this.modifyObj));
        window.sessionStorage.setItem(hashIndex, index);
        this.$router.push({path: '/custAccuAcct', query: {hashFlag: hashFlag}});
      },
      jumpAccuFun (index) {
        let hash = new Date().getTime();
        let hashFlag = 'flag' + hash;
        let hashIndex = 'index' + hash;
        window.sessionStorage.setItem(hashFlag, JSON.stringify(this.modifyObj));
        window.sessionStorage.setItem(hashIndex, index);
        this.$router.push({path: '/custAccuAcct', query: {hashFlag: hashFlag}});
      },

      // 校验社保账户是否重复
      checkSinsFun (index) {
        api.post(this.apiPath.sins.findIsSameProduct, {sinsAcctIdList: this.modifyObj.addServeTemp.serveTempDetSinses[index].acctIds}).then(res => {
          if (res.data) {
            this.$alert(res.data, '提示信息', {
              confirmButtonText: '确 定',
              type: 'success', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
                this.modifyObj.addServeTemp.serveTempDetSinses[index].acctIds = [];
                this.modifyObj.addServeTemp.serveTempDetSinses[index].acctNames = [];
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 社保缴费方式切换
      sinsPayFreeChange (index, val) {
        this.watchObj['sinsAcctObj' + index].payFeeWay = this.modifyObj.addServeTemp.serveTempDetSinses[index].payFeeWay;
      },
      accuPayFreeChange (index, val) {
        this.watchObj['accuAcctObj' + index].payFeeWay = this.modifyObj.addServeTemp.serveTempDetAccus[index].payFeeWay;
      },
      // 执行地区
      sinsAreaChange (index) {
        this.watchObj['sinsAcctObj' + index].areaId = this.modifyObj.addServeTemp.serveTempDetSinses[index].areaId;
        this.watchObj['sinsPkg0Obj' + index].areaId = this.modifyObj.addServeTemp.serveTempDetSinses[index].areaId;
        this.watchObj['sinsPkg1Obj' + index].areaId = this.modifyObj.addServeTemp.serveTempDetSinses[index].areaId;
        this.watchObj['sinsAreaObj' + index].data.areaId = this.modifyObj.addServeTemp.serveTempDetSinses[index].areaId;
      },
      accuAreaChange (index) {
        this.watchObj['accuAcctObj' + index].areaId = this.modifyObj.addServeTemp.serveTempDetAccus[index].areaId;
        this.watchObj['accuPkgObj' + index].areaId = this.modifyObj.addServeTemp.serveTempDetAccus[index].areaId;
        this.watchObj['accuAreaObj' + index].data.areaId = this.modifyObj.addServeTemp.serveTempDetAccus[index].areaId;
      },
      salaryAreaChange (index) {
        this.watchObj['salaryAreaObj' + index].data.areaId = this.modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetGongZi.wageAreaId;
      },
      taxAreaChange (index) {
        this.watchObj['taxAreaObj' + index].data.areaId = this.modifyObj.addServeTemp.serveTempDetWages[index].serveTempDetDeclare.taxAreaId;
      },
      serverAreaChange (index) {
        this.watchObj['serverAreaObj' + index].data.areaId = this.modifyObj.addServeTemp.serveTempDetServes[index].areaId;
      },
      // 公积金变化调取
      accuAcctChange (index) {
        this.watchObj['accuPerObj' + index].accuAcctId = this.modifyObj.addServeTemp.serveTempDetAccus[index].acctId;
        api.post(this.findAccuPropSelect, {accuAcctId: this.modifyObj.addServeTemp.serveTempDetAccus[index].acctId}).then(res => {
          this.modifyObj.addServeTemp.serveTempDetAccus[index].accuPerName = res.data.list[0].title;
          this.modifyObj.addServeTemp.serveTempDetAccus[index].accuPerId = res.data.list[0].id;
        }).catch(err => {
          console.log(err);
        });
      },
      // 公积金比例变化调取
      accuPerChange (index) {
        this.watchObj['accuPkgObj' + index].accuProp = this.modifyObj.addServeTemp.serveTempDetAccus[index].accuPerName;
        this.watchObj['accuPkgObj' + index].accuPropId = this.modifyObj.addServeTemp.serveTempDetAccus[index].accuPerId;
      },
      addlocalFun2 () {
        let _this = this;
        let idArr = this.sourceObj.serveTempDetServes.map(function (item) {
          return item.priceId;
        });
        if (_this.modifyObj.serveChargingType === 1) {
          if (this.choosedServeObjIds.indexOf(47) !== -1) {
            this.choosedServeObj.push(JSON.parse(JSON.stringify(this.choosedServeObj[this.choosedServeObjIds.indexOf(47)])));
            this.choosedServeObjIds.push(47);
            this.sourceObj.serveTempDetServes.push(JSON.parse(JSON.stringify(this.sourceObj.serveTempDetServes[idArr.indexOf(47)])));
            this.choosedServeObj.splice(this.choosedServeObjIds.indexOf(47), 1);
            this.choosedServeObjIds.splice(this.choosedServeObjIds.indexOf(47), 1);
            this.sourceObj.serveTempDetServes.splice(idArr.indexOf(47), 1);
          }
        } else {
          this.choosedServeObj.push(JSON.parse(JSON.stringify(this.choosedServeObj[this.choosedServeObjIds.indexOf(47)])));
          this.choosedServeObjIds.push(47);
          this.sourceObj.serveTempDetServes.push(JSON.parse(JSON.stringify(this.sourceObj.serveTempDetServes[idArr.indexOf(47)])));
          this.choosedServeObj.splice(this.choosedServeObjIds.indexOf(47), 1);
          this.choosedServeObjIds.splice(this.choosedServeObjIds.indexOf(47), 1);
          this.sourceObj.serveTempDetServes.splice(idArr.indexOf(47), 1);
        }
        for (var i = 0; i < this.choosedServeObj.length; i++) {
          if (this.choosedServeObj[i].prodType === 1) {
            _this.modifyObj.addServeTemp.serveTempDetSinses.push({
              priceId: this.choosedServeObj[i].priceId,
              priceName: this.choosedServeObj[i].priceName,
              payFeeWay: '',
              areaId: '',
              areaName: '',
              acctIds: [],
              acctNames: [],
              invsubId: '',
              invsubName: '',
              begEndPrin: '',
              begEndPrinName: '',
              receSuppId: '',
              receSuppName: '',
              serveTempDetSinsPkgs: [
                {
                  householdType: [],
                  pkgId: '',
                  pkgName: ''
                },
                {
                  householdType: [],
                  pkgId: '',
                  pkgName: ''
                }
              ],
              serveTempDetServe: {
                priceId: '',
                priceName: '',
                chargeMoney: '',
                payMoney: '',
                invSubId: '',
                invSubName: ''
              }
            });
            let num = _this.modifyObj.addServeTemp.serveTempDetSinses.length - 1;
            _this.$set(_this.watchObj, ("sinsAcctObj" + (num)), {custId: '', payFeeWay: '', areaId: ''});
            _this.$set(_this.watchObj, ("sinsPkg0Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
            _this.$set(_this.watchObj, ("sinsPkg1Obj" + (num)), {householdType: '', areaId: '', localStanType: 1});
            _this.$set(_this.watchObj, ("sinsAreaObj" + (num)), {data: {areaId: ''}});
            setTimeout(function () {
              _this.watchObj["sinsPkg0Obj" + (num)].householdType = [];
              _this.watchObj["sinsPkg0Obj" + (num)].areaId = '';
              _this.watchObj["sinsPkg1Obj" + (num)].householdType = [];
              _this.watchObj["sinsPkg1Obj" + (num)].areaId = '';
              _this.watchObj["sinsAreaObj" + (num)].data.areaId = '';
              setTimeout(function () {
                _this.modifyObj.addServeTemp.serveTempDetSinses[num].receSuppName = '';
                _this.modifyObj.addServeTemp.serveTempDetSinses[num].receSuppId = '';
              });
            });
          } else if (this.choosedServeObj[i].prodType === 2) {
            _this.modifyObj.addServeTemp.serveTempDetAccus.push({
              priceId: this.choosedServeObj[i].priceId,
              priceName: this.choosedServeObj[i].priceName,
              areaId: '',
              areaName: '',
              receSuppName: '',
              receSuppId: '',
              begEndPrinName: '',
              begEndPrin: '',
              payFeeWay: '',
              acctName: '',
              acctId: '',
              pkgName: '',
              pkgId: '',
              accuPerName: '',
              accuPerId: '',
              invsubName: '',
              invsubId: '',
              serveTempDetServe: {
                priceId: '',
                priceName: '',
                chargeMoney: '',
                payMoney: '',
                invSubId: '',
                invSubName: ''
              }
            });
            let num = _this.modifyObj.addServeTemp.serveTempDetAccus.length - 1;
            _this.$set(_this.watchObj, ("accuAcctObj" + (num)), {custId: '', payFeeWay: '', areaId: ''});
            _this.$set(_this.watchObj, ("accuPkgObj" + (num)), {areaId: '', localStanType: 2, accuProp: '', accuPropId: ''});
            _this.$set(_this.watchObj, ("accuPerObj" + (num)), {accuAcctId: ''});
            _this.$set(_this.watchObj, ("accuAreaObj" + (num)), {data: {areaId: ''}});
            setTimeout(function () {
              _this.watchObj["accuPkgObj" + (num)].areaId = '';
              _this.watchObj["accuAreaObj" + (num)].data.areaId = '';
              setTimeout(function () {
                _this.modifyObj.addServeTemp.serveTempDetAccus[num].receSuppName = '';
                _this.modifyObj.addServeTemp.serveTempDetAccus[num].receSuppId = '';
              });
            });
          } else if (this.choosedServeObj[i].prodType === 3) {
            _this.modifyObj.addServeTemp.serveTempDetWages.push({
              priceId: this.choosedServeObj[i].priceId,
              priceName: this.choosedServeObj[i].priceName,
              serveTempDetGongZi: {
                priceId: this.choosedServeObj[i].priceId,
                priceName: this.choosedServeObj[i].priceName,
                wageAreaName: '',
                wageAreaId: '',
                wageReceSuppName: '',
                wageReceSuppId: '',
                begEndPrinName: '',
                begEndPrin: '',
                wageInvsubName: '',
                wageInvsubId: '',
                isAlloTax: 0,
                serveTempDetServe: {
                  priceId: '',
                  priceName: '',
                  chargeMoney: '',
                  payMoney: '',
                  invSubName: '',
                  invSubId: ''
                }
              },
              serveTempDetDeclare: {
                priceId: this.choosedServeObj[i].priceId,
                priceName: this.choosedServeObj[i].priceName,
                taxAreaName: '',
                taxAreaId: '',
                taxReceSuppName: '',
                taxReceSuppId: '',
                serveTempDetServe: {
                  payMoney: ''
                }
              }
            });
            let num = _this.modifyObj.addServeTemp.serveTempDetWages.length - 1;
            _this.$set(_this.watchObj, ("salaryAreaObj" + (num)), {data: {areaId: ''}});
            _this.$set(_this.watchObj, ("taxAreaObj" + (num)), {data: {areaId: ''}});
            setTimeout(function () {
              _this.watchObj["salaryAreaObj" + (num)].data.areaId = '';
              _this.watchObj["taxAreaObj" + (num)].data.areaId = '';
              setTimeout(function () {
                _this.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppName = '';
                _this.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetGongZi.wageReceSuppId = '';
                _this.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppName = '';
                _this.modifyObj.addServeTemp.serveTempDetWages[num].serveTempDetDeclare.taxReceSuppId = '';
              });
            });
          } else if (this.choosedServeObj[i].prodType === 5 || this.choosedServeObj[i].prodType === 6) {
            _this.modifyObj.addServeTemp.serveTempDetServes.push({
              priceId: this.choosedServeObj[i].priceId,
              priceName: this.choosedServeObj[i].priceName,
              areaId: '',
              areaName: '',
              chargeMoney: '',
              payMoney: '',
              receSuppId: '',
              receSuppName: '',
              invSubId: '',
              invSubName: '',
              begEndPrin: '',
              begEndPrinName: ''
            });
            let num = _this.modifyObj.addServeTemp.serveTempDetServes.length - 1;
            _this.$set(_this.watchObj, ("serverAreaObj" + (num)), {data: {areaId: ''}});
            _this.modifyObj.addServeTemp.serveTempDetServes[num].receSuppName = '';
            _this.modifyObj.addServeTemp.serveTempDetServes[num].receSuppId = '';
            setTimeout(function () {
              _this.watchObj["serverAreaObj" + (num)].data.areaId = '';
              // setTimeout(function () {
              //   _this.modifyObj.addServeTemp.serveTempDetServes[num].receSuppName = '';
              //   _this.modifyObj.addServeTemp.serveTempDetServes[num].receSuppId = '';
              // });
            });
          }
        }
      },
      sureFun (num) {
        if (num === 1) {
          this.$refs.modifyObj.validate((valid) => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.modifyObj));
              let temporary = ['', 'serveTempDetSinses', 'serveTempDetAccus', 'serveTempDetWages', '', 'serveTempDetServes', 'serveTempDetServes'];
              this.deletedServeObj.forEach(function (item) {
                for (var a = 0; a < obj.addServeTemp[temporary[item.prodType]].length;) {
                  if (obj.addServeTemp[temporary[item.prodType]][a].priceId === item.priceId) {
                    if (this.alreadyAddIds.indexOf(obj.addServeTemp[temporary[item.prodType]][a].priceId) === -1) {
                      obj.deleteServeTemp[temporary[item.prodType]].push(JSON.parse(JSON.stringify(obj.addServeTemp[temporary[item.prodType]].splice(a, 1)))[0]);
                    } else {
                      obj.addServeTemp[temporary[item.prodType]].splice(a, 1);
                    }
                  } else {
                    a++;
                  }
                }
              }, this);
              if (obj.addServeTemp.serveTempDetSinses.length === 0) {
                obj.addServeTemp.serveTempDetSins = null;
                delete obj.addServeTemp.serveTempDetSinses;
              } else {
                obj.addServeTemp.serveTempDetSins = JSON.parse(JSON.stringify(obj.addServeTemp.serveTempDetSinses[0]));
                delete obj.addServeTemp.serveTempDetSinses;
              }
              if (obj.addServeTemp.serveTempDetAccus.length === 0) {
                obj.addServeTemp.serveTempDetAccu = null;
                delete obj.addServeTemp.serveTempDetAccus;
              } else {
                obj.addServeTemp.serveTempDetAccu = JSON.parse(JSON.stringify(obj.addServeTemp.serveTempDetAccus[0]));
                delete obj.addServeTemp.serveTempDetAccus;
              }
              if (obj.addServeTemp.serveTempDetWages.length === 0) {
                obj.addServeTemp.serveTempDetWage = null;
                delete obj.addServeTemp.serveTempDetWages;
              } else {
                obj.addServeTemp.serveTempDetWage = JSON.parse(JSON.stringify(obj.addServeTemp.serveTempDetWages[0]));
                delete obj.addServeTemp.serveTempDetWages;
              }
              if (obj.deleteServeTemp.serveTempDetSinses.length === 0) {
                obj.deleteServeTemp.serveTempDetSins = null;
                delete obj.deleteServeTemp.serveTempDetSinses;
              } else {
                obj.deleteServeTemp.serveTempDetSins = JSON.parse(JSON.stringify(obj.deleteServeTemp.serveTempDetSinses[0]));
                delete obj.deleteServeTemp.serveTempDetSinses;
              }
              if (obj.deleteServeTemp.serveTempDetAccus.length === 0) {
                obj.deleteServeTemp.serveTempDetAccu = null;
                delete obj.deleteServeTemp.serveTempDetAccus;
              } else {
                obj.deleteServeTemp.serveTempDetAccu = JSON.parse(JSON.stringify(obj.deleteServeTemp.serveTempDetAccus[0]));
                delete obj.deleteServeTemp.serveTempDetAccus;
              }
              if (obj.deleteServeTemp.serveTempDetWages.length === 0) {
                obj.deleteServeTemp.serveTempDetWage = null;
                delete obj.deleteServeTemp.serveTempDetWages;
              } else {
                obj.deleteServeTemp.serveTempDetWage = JSON.parse(JSON.stringify(obj.deleteServeTemp.serveTempDetWages[0]));
                delete obj.deleteServeTemp.serveTempDetWages;
              }
              obj.state = 0;
              obj.flag = 0;
              this.willSureObj = obj;
              api.post(this.apiPath.hrsc.addServeTempChan, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  api.postsign(this.apiPath.hrsc.findServeTempChanByServeTempId, obj.serveTempId).then(res => {
                    if (res.code === 'CPYY-00001') {
                      this.jumpFlag = res.data.flag;
                      this.tableData = res.data.list;
                      let arr;
                      if (Array.isArray(this.tableData)) {
                        arr = this.tableData.map(function (item) {
                          return item.chanContent;
                        });
                      }
                      this.mapObj = {};
                      this.indexArr = [];
                      let setObj = new Set(arr);
                      setObj.forEach(function (n) {
                        this.mapObj[n] = 0;
                        this.indexArr.push(arr.indexOf(n));
                        arr.forEach(function (item) {
                          if (n === item) {
                            this.mapObj[n]++;
                          }
                        }, this);
                      }, this);
                      this.activeNode++;
                    }
                  }).catch(err => {
                    console.log(err);
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        } else if (num === 2) {
          if (this.jumpFlag === 1) {
            this.activeNode++;
          } else {
            this.willSureObj.state = 1;
            this.willSureObj.flag = 0;
            api.post(this.apiPath.hrsc.addServeTempChan, this.willSureObj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '修改成功！',
                  type: 'success'
                });
                let that = this;
                setTimeout(function () {
                  that.$router.push({path: '/custServTemplate'});
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          this.willSureObj.state = 1;
          this.willSureObj.flag = 1;
          if (this.modifyObj.takeEffectPrin === 1) {
            this.willSureObj.takeEffectPrin = this.modifyObj.takeEffectPrin;
            this.willSureObj.takeEffectDate = Vue.filter('date')(this.modifyObj.takeEffectDate, 'yyyy-MM-dd');
            this.willSureObj.isBreakOrder = Number(this.isBreak);
          } else if (this.modifyObj.takeEffectPrin === 3) {
            this.willSureObj.takeEffectPrin = this.modifyObj.takeEffectPrin;
            this.willSureObj.takeEffectRefeProd = this.modifyObj.takeEffectRefeProd - 53;
          } else {
            this.willSureObj.takeEffectPrin = this.modifyObj.takeEffectPrin;
          }
          this.willSureObj.jobPerIsChan = Number(this.modifyEffect.ONJOBFlag);
          this.willSureObj.soonQuitPerIsChan = Number(this.modifyEffect.WAITJOBFlag);
          this.willSureObj.quitPerIsChan = Number(this.modifyEffect.UNJOBFlag);
          this.willSureObj.soonEntryPerIsChan = Number(this.modifyEffect.PREONJOBFlag);
          api.post(this.apiPath.hrsc.addServeTempChan, this.willSureObj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '修改成功！',
                type: 'success'
              });
              let that = this;
              setTimeout(function () {
                that.$router.push({path: '/custServTemplate'});
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      backFun (num) {
        if (num === 2) {
          this.destoryFun();
        }
        this.activeNode--;
        this.jumpFlag = 1;
        ;
      },
      destoryFun () {
        if (this.$route.query.tempId || this.$route.query.tempId === 0) {
          api.postsign(this.apiPath.hrsc.deleteServeTempChan, this.$route.query.tempId).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
        }
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
      searchFun () {
        if (this.searchContent || this.searchContent === '0') {
//          this.copyAllServeObj
          this.allServeObj = [];
          this.copyAllServeObj.forEach(function (item) {
            if (item.priceName.indexOf(this.searchContent) !== -1) {
              this.allServeObj.push(JSON.parse(JSON.stringify(item)));
            }
          }, this);
        } else {
          this.allServeObj = this.copyAllServeObj;
        }
      },
      objectSpanMethod ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (this.indexArr.indexOf(rowIndex) !== -1) {
            return {
              rowspan: this.mapObj[row.chanContent],
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      rowStyleFun ({row, rowIndex}) {
        if (this.tableData.length < 5) {
          if (rowIndex >= this.tableData.length) {
            return {display: 'none'};
          }
        }
      }
    }
  };
</script>
