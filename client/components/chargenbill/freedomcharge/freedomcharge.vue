<template>
  <div>
    <div class=" invinfo" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="自主收费账单查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one search-inner-width">
                <span class="search-inner-name">客户名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findCustSelectInfo"
                             :token="token"
                             :chooseName.sync="searchForm.custIdName"
                             :chooseId.sync="searchForm.custId"
                             :clear="true">
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
      <!--搜索结果-->
      <div class=" sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="add"><i class="iconfont sino-guanli"></i>收费账单模版管理
            </sino-button>
          </div>
        </div>
        <sino-auto-table :data="tableData" stripe max-height="416" v-on:viewAll="viewAll" border v-on:select="selectCallBack">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="custNo" label="客户编号"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="countEmp" label="在职雇员人数"></sino-table-column>
          <!--<sino-table-column prop="officeAddr" label="办公地址"></sino-table-column>-->
          <sino-table-column type="index" label="排序" align="center" width="80"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!-- 本月账单 -->
    <div class="mt15 sino-tabs-nav tabs-this-month" v-if="!routerView">
      <sino-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <sino-tab-pane label="未收费账单" name="first" v-if="show">
          <div class=" sino-table-total sino-table-total-noborder">
            <div class="sino-table-icon bs-none">
              <div class="sino-table-icon-left">
                <sino-dropdown trigger="click" @visible-change="dropdownDel">
  <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false">
    <i class="iconfont sino-xiazai4"></i>收费账单查询<i class="iconfont sino-unie628"></i>
  </span>
                  <sino-dropdown-menu class="role_menu">
                    <sino-dropdown-item>
                      <div @click="empnameinquire">按雇员查询</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="detailsinquire">按明细查询</div>
                    </sino-dropdown-item>
                  </sino-dropdown-menu>
                </sino-dropdown>

                <sino-dropdown trigger="click" @visible-change="dropdownDel">
  <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false">
    <i class="iconfont sino-zhangdan"></i>收费账单管理<i class="iconfont sino-unie628"></i>
  </span>
                  <sino-dropdown-menu class="role_menu">
                    <sino-dropdown-item>
                      <div @click="locksingle">锁单</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="unlock">解锁</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="demBillFun">拆单</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="singlePage()">合单</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="relFun">发布财务</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="modifyBillsFun">修改账单信息</div>
                    </sino-dropdown-item>
                  </sino-dropdown-menu>
                </sino-dropdown>
                <sino-button type="icon-text" @click="lookBill()" class="toll-bill-down" v-show="true" ><i
                  class="iconfont sino-zhangdan-copy"></i>查看账单明细
                </sino-button>
                <sino-button type="icon-text" @click="downFun()" class="toll-bill-down" v-show="true" ><i
                  class="iconfont sino-download-copy"></i>收费账单下载
                </sino-button>
                <!--<sino-button type="icon-text" @click="add()" class="toll-bill-down"  v-show="true"><i-->
                  <!--class="iconfont sino-download-copy"></i>工资明细下载-->
                <!--</sino-button>-->
              </div>
            </div>
            <!-- 按雇员查询弹条 -->
            <sino-con v-if="uniqflag" class="uniq-inquire">
              <sino-form :model="searchForm" ref="searchForm" class="serch-form">
                <div class="search-box">
                  <ul class="search-inner-box">
                    <li class="search-inner-one">
                      <span class="search-inner-name">雇员姓名：</span>
                      <sino-input class="fl" type="text" v-model="searchForm.empName"
                                  :disabled="false"></sino-input>
                    </li>
                    <li class="search-inner-one">
                      <span class="search-inner-name">证件号码：</span>
                      <sino-input class="fl" type="text" v-model="searchForm.certNo"
                                  :disabled="false"></sino-input>
                    </li>
                    <li class="search-inner-one mt15">
                      <span class="search-inner-name">生成年月：</span>
                      <sino-date-picker
                        v-model="searchForm.creYmBegin"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="searchForm.creYmEnd"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                    </li>
                  </ul>
                </div>
                <div class="search-button">
                  <div class="search-button-box search-one-button-box">
                    <sino-button type="primary" @click="twoTable2([1, 2, 4])">查 询</sino-button>
                    <sino-button type="text" @click="uniqflag=false" class="put-away-btn">收起</sino-button>
                  </div>
                </div>
                <div class="clear"></div>
              </sino-form>
            </sino-con>
            <!-- 按明细查询弹条 -->
            <sino-con v-if="detailsflag" class="uniq-inquire">
              <sino-form :model="detailsForm" ref="detailsForm" class="serch-form">
                <div class="search-box">
                  <ul class="search-inner-box">
                    <li class="search-inner-one">
                      <span class="search-inner-name">账单编号：</span>
                      <sino-input class="fl" type="text" v-model="detailsForm.chargeBillNo"
                                  :disabled="false"></sino-input>
                    </li>
                    <li class="search-inner-one">
                      <span class="search-inner-name">成本中心：</span>
                      <sino-select class="fl"
                                   :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCostCentSelectBox"
                                   :chooseName.sync="detailsForm.costCentIdName"
                                   :chooseId.sync="detailsForm.costCentId"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <li class="search-inner-one toll-details-mt15">
                      <span class="search-inner-name">收费状态：</span>
                      <sino-select :tipText="'请选择'" class="fl"
                                   :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :data="{code: 'CHARGE_STATE', ids:[1, 2, 4]}"
                                   :url="getDictSelectBox"
                                   :chooseName.sync="detailsForm.chargeStateName"
                                   :chooseId.sync="detailsForm.chargeState"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <li class="search-inner-one toll-details-mt15">
                      <span class="search-inner-name">账单状态：</span>
                      <sino-select class="fl"
                                   :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :data="{code: 'CHARGE_BILL_STATE'}"
                                   :url="getDictSelectBox"
                                   :chooseName.sync="detailsForm.chargeBillStateName"
                                   :chooseId.sync="detailsForm.chargeBillState"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <li class="search-inner-one toll-details-mt15 invoice-li-date">
                      <span class="search-inner-name">生成年月：</span>
                      <sino-date-picker
                        v-model="detailsForm.creYmBegin"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="false">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="detailsForm.creYmEnd"
                        type="date"
                        :editable="true"
                        :readonly="false"
                        :clearable="false">
                      </sino-date-picker>
                    </li>
                    <li class="search-inner-one toll-details-mt15">
                      <span class="search-inner-name">开票状态：</span>
                      <sino-select class="fl"
                                   :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :data="{code: 'BILL_INV_STATE'}"
                                   :url="getDictSelectBox"
                                   :chooseName.sync="detailsForm.billInvStateName"
                                   :chooseId.sync="detailsForm.billInvState"
                                   :clear="true">
                      </sino-select>
                    </li>
                  </ul>
                </div>
                <div class="search-button">
                  <div class="search-button-box search-one-button-box">
                    <sino-button type="primary" @click="empDetailFuna">查 询</sino-button>
                    <sino-button type="text" @click="detailsflag=false" class="put-away-btn">收起</sino-button>
                  </div>
                </div>
                <div class="clear"></div>
              </sino-form>
            </sino-con>
            <div class="toll-bill-ul-box">
              <ul class="toll-bill-table-ul clearfix" v-if="summaryFlag">
                <li>
                  <h6>代收社保:</h6>
                  <span v-text="proCharSinsAmo"></span>
                  元
                </li>
                <li>
                  <h6>代收公积金:</h6>
                  <span v-text="proCharAccuAmo"></span>
                  元
                </li>
                <li>
                  <h6>代发工资:</h6>
                  <span v-text="proPayWageAmo"></span>
                  元
                </li>
                <li>
                  <h6>其他费用:</h6>
                  <span v-text="otherAmo"></span>
                  元
                </li>
                <li>
                  <h6>总金额:</h6>
                  <span v-text="totalAmo"></span>
                  元
                </li>
              </ul>
            </div>
            <sino-table :data="tableDataA" stripe max-height="416" border
                        class="toll-bill-table invoice-table-nomargin" v-on:select="thisMonthselectCallBack" @select-all='selectTabelRow'>
              <sino-table-column type="selection"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="chargeBillNo" label="收费账单编号" min-width="140"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="creYm" label="生成年月" min-width="90"></sino-table-column>
              <sino-table-column prop="allAmo" label="账单金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="perNum" label="涉及人数"></sino-table-column>
              <sino-table-column prop="chargeStateName" label="收费状态"></sino-table-column>
              <sino-table-column prop="billInvStateName" label="开票状态"></sino-table-column>
              <sino-table-column prop="chargeBillStateName" label="账单状态" min-width="130"></sino-table-column>
              <!--<sino-table-column prop="chargeBillStateName" label="开票状态"></sino-table-column>-->
              <sino-table-column prop="proCharSinsAmo" label="代收社保" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="proCharAccuAmo" label="代收公积金" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="proPayWageAmo" label="代发工资" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="otherAmo" label="其他费用" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="tempName" label="账单模板名称" width="120"></sino-table-column>
              <sino-table-column prop="vatInvInfo" label="增值税发票单位名称+税号" min-width="200"></sino-table-column>
              <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageA.pageNum" v-bind:page-size="pageA.pageSize" v-on:pagehandler="pageHandlerA"
                       :pageArray="page.pageArray" v-on:choosePageFun="choooseNumA" v-bind:object="object"
                       :total="pageA.total"></sino-page>
          </div>
        </sino-tab-pane>
        <sino-tab-pane label="已收费账单" name="second" v-if="show" >
          <div class=" sino-table-total sino-table-total-noborder">
            <div class="sino-table-icon bs-none">
              <div class="sino-table-icon-left">
                <sino-dropdown trigger="click" @visible-change="dropdownDel">
                  <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false">
                    <i class="iconfont sino-xiazai4"></i>收费账单查询<i class="iconfont sino-unie628"></i>
                  </span>
                  <sino-dropdown-menu class="role_menu">
                    <sino-dropdown-item>
                      <div @click="empnameinquire">按雇员查询</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="detailsinquire">按明细查询</div>
                    </sino-dropdown-item>
                  </sino-dropdown-menu>
                </sino-dropdown>
                <sino-dropdown trigger="click" @visible-change="dropdownDel" v-if="false">
  <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false">
    <i class="iconfont sino-zhangdan"></i>收费账单管理<i class="iconfont sino-unie628"></i>
  </span>
                  <sino-dropdown-menu class="role_menu">
                    <!--<sino-dropdown-item>-->
                      <!--<div @click="locksingle">锁单</div>-->
                    <!--</sino-dropdown-item>-->
                    <!--<sino-dropdown-item>-->
                      <!--<div @click="unlock">解锁</div>-->
                    <!--</sino-dropdown-item>-->
                    <!--<sino-dropdown-item>-->
                      <!--<div @click="demBillFun">拆单</div>-->
                    <!--</sino-dropdown-item>-->
                    <!--<sino-dropdown-item>-->
                      <!--<div @click="singlePage()">合单</div>-->
                    <!--</sino-dropdown-item>-->
                    <sino-dropdown-item>
                      <div @click="relFun">发布财务</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="modifyBillsFun">修改账单信息</div>
                    </sino-dropdown-item>
                  </sino-dropdown-menu>
                </sino-dropdown>
                <sino-button type="icon-text" @click="downFun()" class="toll-bill-down"><i
                  class="iconfont sino-download-copy"></i>收费账单下载
                </sino-button>
                <sino-button type="icon-text" @click="add()" class="toll-bill-down" v-if="false"><i
                  class="iconfont sino-download-copy"></i>工资明细下载
                </sino-button>
              </div>
            </div>
            <!-- 按雇员查询弹条（） -->
            <sino-con v-if="uniqflag" class="uniq-inquire">
              <sino-form :model="searchForm" ref="searchForm" class="serch-form">
                <div class="search-box">
                  <ul class="search-inner-box">
                    <li class="search-inner-one">
                      <span class="search-inner-name">雇员姓名：</span>
                      <sino-input class="fl" type="text" v-model="searchForm.empName"
                                  :disabled="false"></sino-input>
                    </li>
                    <li class="search-inner-one">
                      <span class="search-inner-name">证件号码：</span>
                      <sino-input class="fl" type="text" v-model="searchForm.certNo"
                                  :disabled="false"></sino-input>
                    </li>
                    <li class="search-inner-one mt15">
                      <span class="search-inner-name">生成年月：</span>
                      <sino-date-picker
                        v-model="searchForm.creYmBegin"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="searchForm.creYmEnd"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                    </li>
                  </ul>
                </div>
                <div class="search-button">
                  <div class="search-button-box search-one-button-box">
                    <sino-button type="primary" @click="twoTable2([3])">查 询</sino-button>
                    <sino-button type="text" @click="uniqflag=false" class="put-away-btn">收起</sino-button>
                  </div>
                </div>
                <div class="clear"></div>
              </sino-form>
            </sino-con>
            <!-- 按明细查询弹条 -->
            <sino-con v-if="detailsflag" class="uniq-inquire">
              <sino-form :model="detailsForm" ref="detailsForm" class="serch-form">
                <div class="search-box">
                  <ul class="search-inner-box">
                    <li class="search-inner-one">
                      <span class="search-inner-name">账单编号：</span>
                      <sino-input class="fl" type="text" v-model="detailsForm.chargeBillNo"
                                  :disabled="false"></sino-input>
                    </li>
                    <li class="search-inner-one">
                      <span class="search-inner-name">成本中心：</span>
                      <sino-select :tipText="'请选择'" class="fl"
                                   :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCustSelectInfo"
                                   :chooseName.sync="detailsForm.costCentName"
                                   :chooseId.sync="detailsForm.costCentId"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <!--<li class="search-inner-one toll-details-mt15">-->
                      <!--<span class="search-inner-name">收费状态：</span>-->
                      <!--<sino-select class="fl"-->
                                   <!--:filterable="false"-->
                                   <!--:multiselect="false"-->
                                   <!--:isshowTotol="false"-->
                                   <!--:totalNum="false"-->
                                   <!--:isPage="false"-->
                                   <!--:isGroup="false"-->
                                   <!--:data="{code: 'CHARGE_STATE',ids: [1,3]}"-->
                                   <!--:url="getDictSelectBox"-->
                                   <!--:chooseName.sync="detailsForm.chargeStateName"-->
                                   <!--:chooseId.sync="detailsForm.chargeState"-->
                                   <!--:clear="true">-->
                      <!--</sino-select>-->
                    <!--</li>-->
                    <li class="search-inner-one toll-details-mt15">
                      <span class="search-inner-name">账单状态：</span>
                      <sino-select :tipText="'请选择'" class="fl"
                                   :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :data="{code: 'CHARGE_BILL_STATE'}"
                                   :url="getDictSelectBox"
                                   :chooseName.sync="detailsForm.chargeBillStateName"
                                   :chooseId.sync="detailsForm.chargeBillState"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <li class="search-inner-one toll-details-mt15">
                      <span class="search-inner-name">开票状态：</span>
                      <sino-select class="fl"
                                   :filterable="false"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="false"
                                   :isGroup="false"
                                   :data="{code: 'BILL_INV_STATE'}"
                                   :url="getDictSelectBox"
                                   :chooseName.sync="detailsForm.billInvStateName"
                                   :chooseId.sync="detailsForm.billInvState"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <li class="search-inner-one mt15">
                      <span class="search-inner-name">生成年月：</span>
                      <sino-date-picker
                        v-model="detailsForm.creYmBegin"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="detailsForm.creYmEnd"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                    </li>
                  </ul>
                </div>
                <div class="search-button">
                  <div class="search-button-box search-one-button-box">
                    <sino-button type="primary" @click="empDetailFun">查 询</sino-button>
                    <sino-button type="text" @click="detailsflag=false" class="put-away-btn">收起</sino-button>
                  </div>
                </div>
                <div class="clear"></div>
              </sino-form>
            </sino-con>
            <div class="toll-bill-ul-box">
              <ul class="toll-bill-table-ul clearfix" v-if="summaryFlag">
                <li>
                  <h6>代收社保:</h6>
                  <span v-text="proCharSinsAmo"></span>
                  元
                </li>
                <li>
                  <h6>代收公积金:</h6>
                  <span v-text="proCharAccuAmo"></span>
                  元
                </li>
                <li>
                  <h6>代发工资:</h6>
                  <span v-text="proPayWageAmo"></span>
                  元
                </li>
                <li>
                  <h6>其他费用:</h6>
                  <span v-text="otherAmo"></span>
                  元
                </li>
                <li>
                  <h6>总金额:</h6>
                  <span v-text="totalAmo"></span>
                  元
                </li>
              </ul>
            </div>
            <sino-table :data="tableDataA" stripe max-height="416" border
                        class="toll-bill-table invoice-table-nomargin" v-on:select="thisMonthselectCallBack" @select-all='selectTabelRow'>
              <sino-table-column type="selection"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="chargeBillNo" label="收费账单编号" min-width="140"></sino-table-column>
              <sino-table-column prop="tempName" width="120" label="账单模板名称"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="creYm" label="生成年月" min-width="90"></sino-table-column>
              <sino-table-column prop="allAmo" label="账单金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="perNum" label="涉及人数"></sino-table-column>
              <sino-table-column prop="chargeStateName" label="收费状态"></sino-table-column>
              <sino-table-column prop="billInvStateName" label="开票状态"></sino-table-column>
              <sino-table-column prop="chargeBillStateName" label="账单状态" min-width="130"></sino-table-column>
              <sino-table-column prop="proCharSinsAmo" label="代收社保" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="proCharAccuAmo" label="代收公积金" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="proPayWageAmo" label="代发工资" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="otherAmo" label="其他费用" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="vatInvInfo" label="增值税发票单位名称+税号" min-width="200"></sino-table-column>
              <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageB.pageNum" v-bind:page-size="pageB.pageSize" v-on:pagehandler="pageHandlerB"
                       :pageArray="pageB.pageArray" v-on:choosePageFun="choooseNumB" v-bind:object="object"
                       :total="pageB.total"></sino-page>
          </div>
        </sino-tab-pane>
      </sino-tabs>
    </div>
    <!-- 拆台弹层 -->
    <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow amount-split-box">
      <sino-title slot="title" type="levelOne" title="收费账单拆分" class="sino-dialog-title"></sino-title>
      <sino-form :model="downloadForm" ref="downloadForm" :rules="downloadFormRules"
                 class="follow-select amount-split-form">
        <div class="follow-content">
          <sino-form-item label="选择拆分类型：" class="" prop="chargeBillTempProdType">
            <sino-radio-group v-model="downloadForm.radio">
              <!--<sino-radio v-model="downloadForm.radio" :label="1">按金额拆分</sino-radio>-->
              <sino-radio v-model="downloadForm.radio" :label="2">按雇员拆分</sino-radio>
            </sino-radio-group>
          </sino-form-item>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="amountSplitFun">确 定</sino-button>
      </span>
    </sino-dialog>
    <!-- 发布财务弹层 -->
    <sino-dialog :visible.sync="releaeFlag" size="small" class="leads-follow publishFinal">
      <sino-title slot="title" type="levelOne" title="发布财务" class="sino-dialog-title"></sino-title>
      <sino-form :model="releaeForm" ref="releaeForm" :rules="releaeFormRules" class="follow-select follow-select1">
        <div class="follow-content">
        <sino-form-item label="备注：" prop="publishRemark" class="ml15">
          <sino-input
            type="textarea"
            v-model="releaeForm.publishRemark"
            :disabled="false"
            tipMessage="提示信息提示信息">
          </sino-input>
        </sino-form-item>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="releaeFun">确 定</sino-button>
      </span>
    </sino-dialog>
    <!-- 修改财务弹层 -->
    <sino-dialog :visible.sync="prodInfoAdd" :top="'5%'" class="dialog-height modify-dialog" v-on:close="resetForm('prodInfoAddForm')">
      <sino-title slot="title" type="levelOne" title="修改账单信息" class="sino-dialog-title"></sino-title>
      <div class="bugXiu">
        <sino-form :model="prodInfoAddForm" :rules="prodInfoAddRules" ref="prodInfoAddForm" class="demo-sendAddrAddForm">
          <sino-form-item label="增值税发票信息：" prop="vatInvInfo" class="vat-invoice-inform">
            <sino-select :tipText="'请选择'" class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="custInvInfoSelectbox"
                         :data="custData"
                         :chooseName.sync="prodInfoAddForm.vatInvInfo"
                         :chooseId.sync="prodInfoAddForm.vatInvId"
                         :clear="true">
            </sino-select>
            <sino-button type="text" @click="invInfoFun(prodInfoAddForm.vatInvId)">发票信息详情</sino-button>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width vat-invoice-inform" prop="publishRemark" label="账单备注：">
            <sino-input type="textarea" v-model="prodInfoAddForm.publishRemark" :disabled="false"></sino-input>
          </sino-form-item>
        </sino-form>
        <sino-form :model="mailObj" :rules="mailAddFormRules" ref="mailObj" class="demo-sendAddrAddForm mailing-address-box bugBox">
          <div class="local-info clearfix">
            <!--<sino-collapse-transition>-->
            <sino-title type="levelTwo" title="邮寄地址">
              <sino-button type="text" @click="listAdd()" class="fr add-adrres"><i class="iconfont sino-add"></i>新增</sino-button>
            </sino-title>
            <!-- 原数据可修改 -->
            <!--<div class="yewanHeight">-->
            <ul class="clearfix mailing-address-one" :class="{'is-background':defaultIndex === index}" v-for="(items, index) in mailObj.mailAddForm" :key="index">
              <li v-if="!items.flag">
                <sino-form-item label="收件人：" class="search-inner-item itme-tanhao" :prop="'mailAddForm[' + index + '].contName'" :rules="[{ required: true, message: '收件人必填项', trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="mailObj.mailAddForm[index].contName"></sino-input>
                </sino-form-item>
              </li>
              <li v-if="!mailObj.mailAddForm[index].flag">
                <sino-form-item label="联系电话：" class="search-inner-item itme-tanhao" :prop="'mailAddForm[' + index + '].contTel'" :rules="[{ required: true, message: '联系人必填项', trigger: 'change'}]">
                  <sino-input class="fl" type="text"
                              v-model="mailObj.mailAddForm[index].contTel"
                  ></sino-input>
                </sino-form-item>
              </li>
              <li class="trustee-mail-li" v-if="!mailObj.mailAddForm[index].flag">
                <sino-form-item label="邮寄地址：" class="is-required sino-from-address adrr-fl">
                  <sino-form-item :prop= "'mailAddForm[' + index + '].provName'" :rules="[{ required: true, message: '省级必填项', trigger: 'change'}]" class="address-tanhao">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :data='provData'
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="findAreaList"
                                 :chooseName.sync="mailObj.mailAddForm[index].provName"
                                 :chooseId.sync="mailObj.mailAddForm[index].provId" :clear="true"
                                 @change="changeProv"
                    ></sino-select>
                  </sino-form-item>
                  <sino-form-item :prop= "'mailAddForm[' + index + '].cityName'" :rules="[{ required: true, message: '市级必填项', trigger: 'change'}]" class="address-tanhao">
                    <sino-select :tipText="'请选择'"
                                 :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url='findAreaList'
                                 :data="cityData"
                                 :chooseName.sync="mailObj.mailAddForm[index].cityName"
                                 :linkage="true" :chooseId.sync="mailObj.mailAddForm[index].cityId"
                                 :clear="true"
                                 @change="changeCity"
                    ></sino-select>
                  </sino-form-item>
                  <sino-form-item :prop= "'mailAddForm[' + index + '].distName'" :rules="[{ required: true, message: '区级必填项', trigger: 'change'}]" class="address-tanhao">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :linkage="true"
                                 :isGroup="false"
                                 :url="findAreaList"
                                 :data='distData'
                                 :chooseName.sync="mailObj.mailAddForm[index].distName"
                                 :chooseId.sync="mailObj.mailAddForm[index].distId"
                                 :clear="true"
                                 @finish="cityFinish"
                    ></sino-select>
                  </sino-form-item>
                </sino-form-item>
              </li>
              <li v-if="!mailObj.mailAddForm[index].flag">
                <sino-form-item label="详细地址：" class="search-inner-item detailed-tanhao" :prop="'mailAddForm[' + index + '].addrDet'" :rules="[{ required: true, message: '详细地址必填项', trigger: 'change'}]">
                  <sino-input class="fl address-domain" type="text"
                              v-model="mailObj.mailAddForm[index].addrDet"
                  ></sino-input>
                </sino-form-item>
              </li>
              <!--覆盖数据-->
              <li v-if="items.flag">
                <sino-form-item label="收件人：" class="search-inner-item" prop="contName">
                  <span :style="{'color':'#333','line-height':'25px'}">{{items.contName}}</span>
                </sino-form-item>
              </li>
              <li v-if="mailObj.mailAddForm[index].flag" :style="{'color':'#333','line-height':'25px'}">
                <sino-form-item label="联系电话：" class="search-inner-item" prop="contTel">
                  <span>{{items.contTel}}</span>
                </sino-form-item>
              </li>
              <li class="trustee-mail-li" v-if="mailObj.mailAddForm[index].flag">
                <sino-form-item label="邮寄地址：" class="search-inner-item mailing-address-input sino-from-address">
                  <span>{{mailObj.mailAddForm[index].provName}}{{mailObj.mailAddForm[index].cityName}}{{mailObj.mailAddForm[index].distName}}{{mailObj.mailAddForm[index].addrDet}}</span>
                </sino-form-item>
              </li>
              <div class="mailing-address-modify-btn">
                <sino-button type="text" v-if="mailObj.mailAddForm[index].flag" @click="dataModify(index)">修改</sino-button>
                <!--class="modify-btn-highlight-icon"-->
                <sino-button type="text" v-if="mailObj.mailAddForm[index].flag" @click="gray(index)" class="modify-btn-highlight-icon" :class="{'modify-btn-highlight-icon':mailObj.mailAddForm[index].seleFlag === 1,'modify-btn-gray-icon':mailObj.mailAddForm[index].seleFlag === 0}"><i></i></sino-button>
                <sino-button type="text" v-if="!mailObj.mailAddForm[index].flag" @click="save(index)">保存</sino-button>
                <sino-button type="text" v-if="!mailObj.mailAddForm[index].flag && (index < mailAddLength)" @click="cancelFun(index)">取消</sino-button>
                <sino-button type="text" v-if="!mailObj.mailAddForm[index].flag && (index >= mailAddLength)" @click="del(index)">删除</sino-button>
              </div>
            </ul>
            <!--</div>-->
            <!--</sino-collapse-transition>-->
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
           <sino-button type="primary" @click="submitForm">修 改</sino-button>
      </span>
    </sino-dialog>
    <!--查看账单明细弹层-->
    <sino-dialog :visible.sync="lookBillFlag" size="samll" top="5%" dialogHide v-on:close="lookBillClose('billData')" class="usermanage freebill-dialog">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="账单明细"></sino-title>
      <sino-form :model="billFrom" ref="billFrom" class="serch-form">
        <div class="search-box marTop">
          <ul class="search-inner-box">
            <li style="margin-top: 0">
              <span class="search-inner-name">唯一号：</span>
              <sino-input class="fl" type="text" v-model="billFrom.uniqNo"
                          :disabled="false"></sino-input>
            </li>
            <li style="margin-top: 0">
              <span class="search-inner-name">费用所属年月：</span>
              <sino-date-picker
                v-model="billFrom.busiYm"
                type="month"
                placeholder="请选择月"
                :editable="false"
                :readonly="false">
              </sino-date-picker>
            </li>
            <li class="search-inner-width">
              <span class="search-inner-name">产品名称：</span>
              <sino-select class="fl"
                           style="width: 78%"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findProdInfoAndProPaySelectBox"
                           :chooseName.sync="billFrom.signProdScheName"
                           :chooseId.sync="billFrom.id"
                           :clear="true"
                           @contentChange="contentChange">
              </sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="billFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <sino-auto-table :data="billData" stripe max-height="235" border>
        <sino-table-column type="index" label="序号" align="center" width="50" fixed="left"></sino-table-column>
        <sino-table-column prop="signProdPriceName" label="产品名称" align="center" width="130" fixed="left"></sino-table-column>
        <!--<sino-table-column prop="orderDetSourceName" label="订单明细来源" align="center" min-width="161"></sino-table-column>-->
        <!--<sino-table-column prop="prodTypeName" label="产品类型" align="center" min-width="161"></sino-table-column>-->
        <!--<sino-table-column prop="receSuppName" label="接单方供应商" align="center" min-width="161"></sino-table-column>-->
        <!--<sino-table-column prop="signSuppName" label="签约方供应商" align="center" min-width="161"></sino-table-column>-->
        <sino-table-column prop="uniqNo" label="唯一号" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="certTypeName" label="证件类型" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="certNo" label="证件号码" align="center" min-width="180"></sino-table-column>
        <sino-table-column prop="areaName" label="执行地区" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="custName" label="客户" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="conName" label="商务合同" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="costCentName" label="成本中心" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="busiYm" label="费用所属年月" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="execuYm" label="执行年月" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="payWayName" label="支付方式" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="perRadix" label="个人基数" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="entRadix" label="企业基数" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="perProp" label="个人缴纳比例(%)" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="entProp" label="企业缴纳比例(%)" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="perAddiMoney" label="个人附加金额" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="entAddiMoney" label="企业附加金额" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="amo" label="收费金额" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="creTime" label="创建时间" align="center" min-width="161"></sino-table-column>
      </sino-auto-table>
      <sino-page
        v-bind:page="billDataPage.pageNum"
        v-bind:page-size="billDataPage.pageSize"
        v-on:pagehandler="pageHandlerC"
        :pageArray="billDataPage.pageArray"
        v-on:choosePageFun="choooseNumC"
        v-bind:object="object"
        :total="billDataPage.total">
      </sino-page>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="lookBillFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--发票信息详情-->
    <sino-dialog :visible.sync="invInfoDeflag" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="发票信息详情" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>客户名称</h6><span v-text="invInfoDe.name"></span>
          </li>
          <li>
            <h6>纳税人类型</h6><span v-text="invInfoDe.taxpayerTypeDict"></span>
          </li>
          <li>
            <h6>纳税人识别号</h6><span v-text="invInfoDe.taxPayerNo"></span>
          </li>
          <li>
            <h6>单位名称</h6><span v-text="invInfoDe.vatUnitName"></span>
          </li>
          <li>
            <h6>单位地址</h6><span v-text="invInfoDe.vatInvAddr"></span>
          </li>
          <li>
            <h6>单位电话</h6><input v-model="invInfoDe.vatInvTel"><span v-text="invInfoDe.vatInvTel"></span>
          </li>
          <li>
            <h6>开户行</h6><span v-text="invInfoDe.acctBankName"></span>
          </li>
          <li>
            <h6>银行账号</h6><span v-text="invInfoDe.vatAcctNo"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="invInfoDe.creTime"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="invInfoDe.creUserName"></span>
          </li>
          <li>
            <h6>银行开户许可证副本</h6>
            <span>
              <div class="file-upload-see" v-show="invInfoDe.bankAcctPermitName">
                <i class="iconfont sino-iconfonticonfonticonfonticonfonticonfonticonfontweibiaoti1015332"></i>
                <i>{{ invInfoDe.bankAcctPermitName }}</i>
              </div>
            </span>
            <!--<span>-->
            <!--<div class="file-upload-see" v-show="seeDirData.bankAcctPermitName" >-->
            <!--<i class="iconfont sino-clip"></i> -->
            <!--<i>{{seeDirData.bankAcctPermitName}}</i> -->
            <!--<i class="file-del-btn" v-on:click="downloadFile('bankAcctPermit')">下载</i> -->
            <!--</div>-->
            <!--</span>-->
          </li>
          <li>
            <h6>营业执照副本</h6>
            <span>
              <div class="file-upload-see" v-show="invInfoDe.busLicName">
                <i class="iconfont sino-iconfonticonfonticonfonticonfonticonfonticonfontweibiaoti1015332"></i>
                <i>{{ invInfoDe.busLicName }}</i>
              </div>
            </span>
          </li>
          <li>
            <h6>一般纳税人资质证明</h6>
            <span>
              <div class="file-upload-see" v-show="invInfoDe.taxPayerTrcName">
                <i class="iconfont sino-iconfonticonfonticonfonticonfonticonfonticonfontweibiaoti1015332"></i>
                <i>{{ invInfoDe.taxPayerTrcName }}</i>
              </div>
            </span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="invInfoDe.remark"></span>
          </li>
        </ul>
      </div>
    </sino-dialog>
    <router-view v-if="routerView"></router-view>
  </div>
</template>

<script>
  import api from '../../../api/index';
  import Vue from 'vue';
  import Cookie from 'js-cookie';

  let checkedArr = '';
  let checkedBrr = '';
  let selection1 = '';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let callTip = function (_this, type, msg) {
    _this.modifyAndAdd = false;
    _this.$alert(msg, '提示信息', {
      confirmButtonText: '确 定',
      type: type, // icon图标类型
      dragFlag: true,
      customClass: '', // 添加class
      lockScroll: true,
      callback: action => {
      }
    });
  };
  export default {
    data () {
      return {
        // 发票信息详情
        allDown: false,
        invInfoDeflag: false,
        invInfoDe: {
          name: '', // 客户供应商名称
          taxPayerTrcName: '', // 资质证明名称
          busLicName: '', // 营业执照副本名称
          bankAcctPermitName: '', // 银行许可副本 名称
          creUserName: '', // 创建人
          creTime: '', // 创建时间
          vatAcctNo: '', // 银行账号
          acctBankName: '', // 开户行
          vatInvTel: '', // 单位电话
          taxPayerNo: '', // 纳税人识别号
          taxpayerTypeDict: '', // 纳税人类别
          vatInvAddr: '' // 单位地址
        },
        billFrom: {
          signProdScheName: '',  // 产品名称
          id: null,  // 产品ID
          uniqNo: null,  // 唯一号
          busiYm: '', // 费用所属年月
          type: null
        }, // 查看账单明细-->查询条件
        billData: null, // 查看账单明细弹层数据
        lookBillFlag: false, // 查看账单明细弹层
        billDataPage: {      // 查看账单明细翻页
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50],
          total: null
        },
        custData: {id: ''},
        token: Cookie.get('Token'),
        findCostCentSelectBox: this.apiPath.hrsc.findCostCentSelectBox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        custInvInfoSelectbox: this.apiPath.hrsc.custInvInfoSelectbox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        findAreaList: this.apiPath.hrsc.findAreaList,
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo,
        findprodinfoselectbox: this.apiPath.hrsc.findprodinfoselectbox,
        // findServeContent: this.apiPath.hrsc.findServeContent,
        findProdInfoAndProPaySelectBox: this.apiPath.hrsc.findProdInfoAndProPaySelectBox,
        // prodNameDrop: this.apiPath.hrsc.prodNameDrop,
        copyData: [],
        mailAddLength: '',
        activeFlagIndex: '',
        defaultIndex: 0,
        proCharSinsAmo: 0,
        proCharAccuAmo: 0,
        proPayWageAmo: 0,
        otherAmo: 0,
        totalAmo: 0,
        routerView: false,
        dropdown: false,
        summaryFlag: false, // 黄色数字
        uniqflag: false,
        detailsflag: false,
        releaseData: '', // 发布日期
        downloadFlag: false, // 拆台开关
        show: false,
        sendAddrAddForm: {
          contName: '',
          contTel: '',
          remark: '',
          custId: '',
          custName: '',
          provId: '',
          provName: '',
          cityId: '',
          cityName: '',
          distId: '',
          distName: ''
        },
        provData: {data: {level: 3}}, // 请求省下拉参数
        cityData: {data: {parentId: ''}}, // 请求市下拉参数
        distData: {data: {parentId: ''}},
        prodInfoAdd: false,
        list: [
          {
            relation: '',
            relationName: '',
            memberName: '',
            sex: '',
            certType: '',
            certTypeName: '',
            certNo: '',
            birthDate: ''
          }
        ],
        prodInfoAddForm: {
          vatInvInfo: '',
          vatInvId: '',
          titleName: '',
          titleId: '',
          publishRemark: ''
        },
        mailObj: {
          mailAddForm: []
        },
        linkSelectData: {
          cityId: '',
          cityName: '',
          distId: '',
          distName: ''
        },
        mailAddFormRules: {},
        // 校验
        prodInfoAddRules: {
          vatInvInfo: [
            {required: true, message: '请输入增值税发票信息', trigger: 'change'}
          ],
          contName: [
            {required: true, message: '请输入收件人', trigger: 'change'}
          ],
          contTel: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'}
          ],
          provName: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          cityName: [
            {required: true, message: '请选择市', trigger: 'change'}
          ],
          distName: [
            {required: true, message: '请选择区', trigger: 'change'}
          ],
          addrDet: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ]
        },
        releaeFlag: false, // 发布财务开关
        releaeForm: {
          publishDate: '',
          publishRemark: ''
        },
        releaeFormRules: {},
        downloadForm: {
          radio: 2             //  暂时默认为2，待完善后为1；
        },
        downloadFormRules: {}, // 按金额雇员拆分
        detailsForm: {
          costCentId: '', // 成本中心
          costCentIdName: '',
          chargeBillNo: '', // 账单编号
          custIdName: '',
          custId: '', // 客户ID
          chargeStateName: '',
          chargeStateList: '',
          chargeState: '', // 收费状态
          chargeBillStateName: '',
          chargeBillState: '', // 账单状态
          remark: '',
          creYmBegin: '',
          creYmEnd: ''
        },
        searchForm: { // 搜索条件
          custId: '',
          custIdName: '',
          empName: '',
          certNo: '',
          custNo: '',
          custChName: '',
          custChNameId: '',
          custSource: '',
          custSourceName: '',
          creYmBegin: '',
          creYmEnd: '',
          signSuppId: '',
          signSuppName: '',
          paySuppName: '',
          paySuppId: ''
        },
        activeName2: '',
        tableData: null, // 表格数据
        tableDataA: null,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 15, 20, 25],
          total: 0 // 分页总条数
        },
        pageA: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 40, 50],
          total: 0 // 分页总条数
        },
        pageB: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 40, 50],
          total: 0 // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        chargeBillId: null, // 返回给拆单的数组
        custId: null // 返回给拆单的数组
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === '/freedomcharge') {
            this.routerView = false;
            this.selectCallBack();
            if (checkedBrr.length !== 0 && this.$route.query.custId === checkedBrr[0].chargeBillId) {
              this.selectCallBack();
            }
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      //  发票信息详情
      invInfoFun (id) {
        api.post(this.apiPath.hrsc.findCustInvInfo, {custOrSuppInvId: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.invInfoDeflag = true;
            this.invInfoDe = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 表格全选调用的函数
      selectTabelRow (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.chargeBillId) {
            all.push(item);
          }
        }
        this.thisMonthselectCallBack(all, row);
        this.allDown = true;
      },
      // 拆单
      demBillFun () {
        if (checkedBrr.length !== 1) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        this.downloadFlag = true;
      },
      // 申请帐单明细弹层 --> 查询
      billFun () {
        this.viewAllBill(this.billDataPage.pageNum, this.billDataPage.pageSize);
      },
      contentChange (item) {
        this.billFrom.type = item.flag;
      },
      // 显示订单明细弹层
      lookBill () {
        if (checkedBrr.length <= 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/freedomcharge/viewBillDet', query: {chargeBillId: checkedBrr[0].chargeBillId, chargeBillTempId: checkedBrr[0].chargeBillTempId, chargeBillNo: checkedBrr[0].chargeBillNo}});
        checkedBrr = [];
      },
      viewAllBill (pageNum, pageSize) {
        this.billFrom.busiYm = Vue.filter('date')(this.billFrom.busiYm, 'yyyy-MM');
        this.lookBillFlag = true;
        let _this = this;
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            busiYm: _this.billFrom.busiYm,
            uniqNo: _this.billFrom.uniqNo,
            id: _this.billFrom.id,
            chargeBillId: checkedBrr[0].chargeBillId
            // type: _this.billFrom.type
          }
        };
        api.post(this.apiPath.hrsc.findByChargeBillDetCustId, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.billData = res.data.list;
            this.billDataPage.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 订单明细弹层关闭
      lookBillClose (formName) {
        this.$refs[formName].resetFields();
      },
      del2 () {
        this.searchForm.empName = '';
        this.searchForm.certNo = '';
      },
      ruoteJudge () {
        if (this.$route.path !== "/freedomcharge") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      listAdd () {
        if (this.activeFlagIndex === '') {
          this.mailObj.mailAddForm.push({
            custId: '',
            contName: '',
            contTel: '',
            provName: '',
            provId: '',
            cityName: '',
            cityId: '',
            distName: '',
            distId: '',
            flag: false,
            seleFlag: 0   // 控制是否被选中
          });
          this.activeFlagIndex = this.mailObj.mailAddForm.length - 1;
        }
      },
      dataModify (index) {
        if (this.activeFlagIndex === '') {
          this.activeFlagIndex = index;
          var obj = JSON.parse(JSON.stringify(this.mailObj.mailAddForm[index]));
          obj.flag = false;
          this.$set(this.mailObj.mailAddForm, index, obj);
        }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      gray (index) {
        this.defaultIndex = index;
        for (let item of this.mailObj.mailAddForm) {
          item.seleFlag = 0;
        }
        this.mailObj.mailAddForm[index].seleFlag = 1;
      },
      del (index) {
        if (this.activeFlagIndex === index) {
          this.activeFlagIndex = '';
        }
        this.mailObj.mailAddForm.splice(index, 1);
      },
      save (index) {
        this.$refs.mailObj.validate((valid) => {
          if (valid) {
            this.activeFlagIndex = '';
            var obj = JSON.parse(JSON.stringify(this.mailObj.mailAddForm[index]));
            obj.flag = true;
            this.$set(this.mailObj.mailAddForm, index, obj);
          }
        });
      },
      cancelFun (index) {
        if (this.activeFlagIndex === index) {
          var cityName = this.copyData[index].cityName;
          var cityId = this.copyData[index].cityId;
          var distName = this.copyData[index].distName;
          var distId = this.copyData[index].distId;
          var obj = JSON.parse(JSON.stringify(this.copyData[index]));
          obj.flag = false;
          this.$set(this.mailObj.mailAddForm, index, obj);
          let that = this;
          setTimeout(function () {
            obj.cityName = cityName;
            obj.cityId = cityId;
            that.$set(that.mailObj.mailAddForm, index, obj);
          }, 50);
          setTimeout(function () {
            obj.distName = distName;
            obj.distId = distId;
            that.$set(that.mailObj.mailAddForm, index, obj);
          }, 50);
        }
      },
      submitForm (index) {
        let obj = {
          chargeBillId: checkedBrr[0].chargeBillId,
          vatInvId: this.prodInfoAddForm.vatInvId,
          postAddrId: (this.mailObj.mailAddForm && this.mailObj.mailAddForm.length > 0) ? this.mailObj.mailAddForm[this.defaultIndex].addrId : '',
          remark: this.detailsForm.remark,
          custAddrList: this.mailObj.mailAddForm
        };
        if (this.mailObj.mailAddForm && this.mailObj.mailAddForm.length > 0) {
          this.mailObj.mailAddForm.forEach(function (item, index) {
            item.custId = checkedBrr[0].custId;
            if (!item['custAddrId']) {
              item['isDefault'] = 0;
            }
          });
        }
        api.post(this.apiPath.hrsc.updateCustBill, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.prodInfoAdd = false;
            this.selectCallBack();
            this.$message({message: '修改成功！', type: 'success'});
            // api.post(this.apiPath.hrsc.saveOrUpdateCustAddr, this.mailObj.mailAddForm).then(res => {
            //   if (res.code === 'CPYY-00001') {
            //     this.prodInfoAdd = false;
            //     this.selectCallBack();
            //     this.$message({message: '修改成功！', type: 'success'});
            //   }
            // }).catch(err => {
            //   console.log(err);
            // });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下载
      downFun () {
        if (!checkedBrr || checkedBrr.length < 1) {
          this.$alert('至少选择一条账单信息！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let list = {
          chargeBillSuppIds: []
        };
        checkedBrr.forEach(function (item) {
          list.chargeBillSuppIds.push({
            chargeBillId: item.chargeBillId,
            chargeBillNo: item.chargeBillNo,
            chargeBillTempId: item.chargeBillTempId,
            chargeBillIdList: [item.chargeBillId]
          });
        }, this);
        api.post(this.apiPath.hrsc.chargeDownload, list).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 发布财务按钮
      relFun () {
        if (checkedBrr === '' || checkedBrr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        if (checkedBrr.length > 1) {
          this.$alert('最多选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          console.log(checkedBrr[0]);
          let chargeBillState = checkedBrr[0].chargeBillState;
          let vatInvId = checkedBrr[0].vatInvId;
          if (chargeBillState == 3) {
            this.$alert('只有未发布状态才能发布', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
            return;
          }
          if (!vatInvId) {
            this.$alert('请先维护发票信息', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
            return;
          }
          this.releaeFlag = true;
        }
      },
      // 发布财务
      releaeFun () {
        let obj = {
          chargeBillId: checkedBrr[0].chargeBillId,
          publishDate: this.releaeForm.publishDate,
          publishRemark: this.releaeForm.publishRemark
        };
        api.post(this.apiPath.hrsc.publishCustBill, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.releaeFlag = false;
            if (this.activeName2 === 'first') {
              this.twoTable([1, 2, 4]);
            } else {
              this.twoTable([3]);
            }
            this.$message({message: '发布成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改账单信息
      modifyBillsFun () {
        if (checkedBrr === '' || checkedBrr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        if (checkedBrr.length > 1) {
          this.$alert('最多选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.custData.id = checkedArr[0]['custId'];
          let obj = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            data: {
              custId: checkedArr[0].custId
            },
            chargeBillId: this.chargeBillId
          };
          api.post(this.apiPath.hrsc.findCustAddr, obj).then(res => {
            this.prodInfoAdd = true;
            // this.mailObj.mailAddForm = res.data.list;
            this.mailObj.mailAddForm = res.data;
            for (var i = 0; i < this.mailObj.mailAddForm.length; i++) {
              this.mailObj.mailAddForm[i].flag = true;
              this.mailObj.mailAddForm[i].seleFlag = res.data[i].seleFlag;
            }
            this.mailAddLength = this.mailObj.mailAddForm.length;
            this.copyData = JSON.parse(JSON.stringify(this.mailObj.mailAddForm));
          });
          api.post(this.apiPath.hrsc.custInvInfoSelectbox, obj).then(res => {});
        }
      },
      changeProv () {
        this.cityData.data.parentId = this.mailObj.mailAddForm[this.activeFlagIndex].provId;
      },
      changeCity () {
        this.distData.data.parentId = this.mailObj.mailAddForm[this.activeFlagIndex].cityId;
      },
      cityFinish () {
        this.mailObj.mailAddForm.distId = this.linkSelectData.distId;
        this.mailObj.mailAddForm.distName = this.linkSelectData.distName;
        this.linkSelectData = {
          cityId: '',
          cityName: '',
          distId: '',
          distName: ''};
      },
      // 按明细查询按钮
      empDetailFun () {
        let obj = {
          pageNum: 1,
          pageSize: 10,
          data: {
            custId: checkedArr[0].custId,
            costCentId: this.detailsForm.costCentId,
            chargeBillNo: this.detailsForm.chargeBillNo,
            chargeBillState: this.detailsForm.chargeBillState,
            chargeStateList: [3],
            creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
          }
        };
        api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
            this.pageA.total = res.data.total;
            this.pageA.pageNum = res.data.pageNum;
            this.pageA.pageSize = res.data.pageSize;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      empDetailFuna () {
        if (this.detailsForm.chargeState) {
          this.detailsForm.chargeStateList = [];
          this.detailsForm.chargeStateList.push(this.detailsForm.chargeState);
        } else {
          this.detailsForm.chargeStateList = [1, 2, 4];
        }
        let obj = {
          pageNum: 1,
          pageSize: 10,
          data: {
            custId: checkedArr[0].custId,
            costCentId: this.detailsForm.costCentId,
            chargeBillNo: this.detailsForm.chargeBillNo,
            chargeBillState: this.detailsForm.chargeBillState,
            billInvState: this.detailsForm.billInvState,
            creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM'),
            chargeStateList: this.detailsForm.chargeStateList
          }
        };
        api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
            this.pageA.total = res.data.total;
            this.pageA.pageNum = res.data.pageNum;
            this.pageA.pageSize = res.data.pageSize;
          }
        }).catch(err => {
          console.log(err);
        });
      },
//      拆单
      amountSplitFun () {
        this.routerView = true;
        // if (this.downloadForm.radio === 1) {
        //   this.$router.push({path: '/freedomcharge/freedomAmountSplit'});
        // }
        if (this.downloadForm.radio === 2) {
          this.$router.push({path: '/freedomcharge/freedomEmpSplit', query: {'chargeBillId': this.chargeBillId, 'custId': this.custId}});
        }
        this.downloadFlag = false;
      },
      thisMonthselectCallBack (selection, row) { // 本月选中回调(有待优化)
        checkedBrr = selection;
        let empDataFlag = true;
        if (checkedBrr.length !== 0) {
          for (let item of checkedBrr) {
            if (item.chargeBillNo) {
              for (let item1 of this.tableDataA) {
                if (item.chargeBillNo === item1.chargeBillNo) {
                  this.chargeBillId = item1.chargeBillId;
                  this.custId = item1.custId;
                }
              }
              if (checkedBrr.length > 0) {
                this.prodInfoAddForm.vatInvInfo = checkedBrr[0].vatInvInfo;
                this.prodInfoAddForm.vatInvId = checkedBrr[0].vatInvId;
                this.prodInfoAddForm.publishRemark = checkedBrr[0].publishRemark;
                this.proCharSinsAmo = 0;
                this.proCharAccuAmo = 0;
                this.proPayWageAmo = 0;
                this.otherAmo = 0;
                this.totalAmo = 0;
                for (var i = 0; i < checkedBrr.length; i++) {
                  if (checkedBrr[i].chargeBillNo) {
                    this.proCharSinsAmo += checkedBrr[i].proCharSinsAmo;
                    this.proCharAccuAmo += checkedBrr[i].proCharAccuAmo;
                    this.proPayWageAmo += checkedBrr[i].proPayWageAmo;
                    this.otherAmo += checkedBrr[i].otherAmo;
                    this.totalAmo = (this.proCharSinsAmo + this.proCharAccuAmo + this.proPayWageAmo + this.otherAmo).toFixed(2);
                  }
                }
                this.proCharSinsAmo = this.proCharSinsAmo.toFixed(2);
                this.proCharAccuAmo = this.proCharAccuAmo.toFixed(2);
                this.proPayWageAmo = this.proPayWageAmo.toFixed(2);
                this.otherAmo = this.otherAmo.toFixed(2);
              } else {
                this.proCharSinsAmo = 0;
                this.proCharAccuAmo = 0;
                this.proPayWageAmo = 0;
                this.otherAmo = 0;
                this.totalAmo = 0;
              }
              empDataFlag = false;
            };
            if (empDataFlag) {
              this.proCharSinsAmo = 0;
              this.proCharAccuAmo = 0;
              this.proPayWageAmo = 0;
              this.otherAmo = 0;
              this.totalAmo = 0;
            };
          }
          return;
        }
        this.proCharSinsAmo = 0;
        this.proCharAccuAmo = 0;
        this.proPayWageAmo = 0;
        this.otherAmo = 0;
        this.totalAmo = 0;
      },
      selectCallBack (selection, row) { // 手动选中checkBox回调
        if (selection) {
          if (selection.length >= 2) {
            selection.splice(0, selection.length - 1);
          }
          checkedArr = selection;
          selection1 = selection;
        }
        if (checkedArr.length > 0) {
          this.proCharSinsAmo = 0;
          this.proCharAccuAmo = 0;
          this.proPayWageAmo = 0;
          this.otherAmo = 0;
          this.totalAmo = 0;
          this.show = true;
          this.unpaBillData();
        }
      },
      // 未收费账单查询的数据
      unpaBillData () {
        let obj = {
          pageNum: this.pageA.pageNum,
          pageSize: this.pageA.pageSize,
          data: {custId: selection1[0].custId}
        };
        this.detailsflag = false;
        this.uniqflag = false;
        for (let key in this.detailsForm) {
          this.detailsForm[key] = '';
        }
        for (let key in this.searchForm) {
          this.searchForm[key] = '';
        }
        this.activeName2 = 'first';
        this.summaryFlag = true;
        this.twoTable([1, 2, 4]);
        // api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
        //   if (res.data === null) {
        //     this.tableDataA = [];
        //   }
        //   if (res.code === 'CPYY-00001') {
        //     this.activeName2 = 'first';
        //     this.summaryFlag = true;
        //     this.twoTable([1, 2, 4]);
        //   }
        // }).catch(err => {
        //   console.log(err);
        // });
      },
      // 解锁
      unlock () {
        if (checkedBrr === '' || checkedBrr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          var arr = [];
          if (checkedBrr && checkedBrr.length > 0) {
            checkedBrr.forEach(function (item, index) {
              arr.push({chargeBillId: item.chargeBillId});
            });
          }
          api.post(this.apiPath.hrsc.unlockChargeBillCust, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.pageA.pageNum = 1;
              this.pageA.pageSize = 10;
              this.pageB.pageNum = 1;
              this.pageB.pageSize = 10;
              if (this.activeName2 === 'first') {
                // this.searchFun2(1);
                this.twoTable([1, 2, 4]);
              } else {
                // this.searchFun2(3);
                this.twoTable([3]);
              }
              // this.empDetailFun();/*有他就跳转*/
              this.viewAll();
              this.$message({message: '解锁成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      //      锁单
      locksingle () {
        if (checkedBrr === '' || checkedBrr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          var arr = [];
          if (checkedBrr && checkedBrr.length > 0) {
            checkedBrr.forEach(function (item, index) {
              arr.push({chargeBillId: item.chargeBillId});
            });
          }
          api.post(this.apiPath.hrsc.lockChargeBillCust, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.pageA.pageNum = 1;
              this.pageA.pageSize = 10;
              this.pageB.pageNum = 1;
              this.pageB.pageSize = 10;
              if (this.activeName2 === 'first') {
                // this.searchFun2(1);
                this.twoTable([1, 2, 4]);
              } else {
                // this.searchFun2(3);
                this.twoTable([3]);
              }
              this.$message({message: '锁单成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 按雇员查询
      empnameinquire () {
        for (let key in this.detailsForm) {
          this.detailsForm[key] = '';
        }
        this.uniqflag = true;
        this.detailsflag = false;
      },
      // 按明细查询
      detailsinquire () {
        for (let key in this.searchForm) {
          this.searchForm[key] = '';
        }
        this.detailsflag = true;
        this.uniqflag = false;
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      handleCommand (command) {
        this.$message('click on item ' + command);
      },
      viewAll: function () {
        this.getList('all');
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      searchFun2 (aguments) {
        this.page.pageNum = 1;
        this.getList2(aguments);
      },
      getList2 (state) {
        // this.empDetailFun();
        let obj = {
          pageNum: this.pageA.pageNum,
          pageSize: this.pageA.pageSize,
          data: {
            custId: checkedArr[0].custId,
            creYmBegin: Vue.filter('date')(this.searchForm.creYmBegin, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.searchForm.creYmEnd, 'yyyy-MM'),
            empName: this.searchForm.empName,
            certNo: this.searchForm.certNo,
            chargeState: state
          }
        };
        api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getList (all) {
        let obj = {};
        obj.data = {custId: this.searchForm.custId};
        // obj.data = {custId: checkedArr[0].custId};
        if (all) {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        // this.apiPath.hrsc.billFindCustInfo
        api.post(this.apiPath.hrsc.billFindCustInfo, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 收费账单模版管理
      add: function () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条客户信息', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/freedomcharge/freedomtemplate', query: {type: 'add', custId: checkedArr[0].custId}});
        checkedArr = [];
      },
      // 合单跳转
      singlePage: function () {
        if (checkedBrr.length !== 1) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/freedomcharge/freedomtogether', query: {type: 'add', custId: checkedBrr[0].chargeBillId}});
        checkedBrr = [];
      },
      // 第二个表格查询数据
      twoTable (listArr) {
        let obj = {
          pageNum: this.pageA.pageNum,
          pageSize: this.pageA.pageSize,
          data: {
            custId: selection1[0].custId,
            costCentId: this.detailsForm.costCentId,
            chargeBillNo: this.detailsForm.chargeBillNo,
            chargeBillState: this.detailsForm.chargeBillState,
            empName: this.searchForm.empName,
            certNo: this.searchForm.certNo,
            chargeStateList: listArr,
            creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
          }
        };
        api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
            this.pageA.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      twoTable2 (listArr) {
        let obj = {
          data: {
            custId: selection1[0].custId,
            costCentId: this.detailsForm.costCentId,
            chargeBillNo: this.detailsForm.chargeBillNo,
            chargeBillState: this.detailsForm.chargeBillState,
            empName: this.searchForm.empName,
            certNo: this.searchForm.certNo,
            chargeStateList: listArr,
            creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
          }
        };
        api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
            this.pageA.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // tabs选项卡点击
      handleClick (tab, event) {
        for (let key in this.detailsForm) {
          this.detailsForm[key] = '';
        }
        for (let key in this.searchForm) {
          this.searchForm[key] = '';
        }
        if (this.activeName2 === 'second') {
          this.searchForm.empName = '';
          this.searchForm.certNo = '';
          this.detailsForm.chargeBillNo = '';
          this.detailsForm.custIdName = '';
          this.detailsForm.chargeStateName = '';
          this.detailsForm.chargeBillStateName = '';
          let obj = {
            pageNum: this.pageB.pageNum,
            pageSize: this.pageB.pageSize,
            data: {
              custId: selection1[0].custId,
              costCentId: this.detailsForm.costCentId,
              chargeBillNo: this.detailsForm.chargeBillNo,
              chargeBillState: this.detailsForm.chargeBillState,
              chargeStateList: [3],
              creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
              creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
            }
          };
          api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
            if (res.data === null) {
              this.tableDataA = [];
            } else {
              this.tableDataA = res.data.list;
              this.pageB.total = res.data.total;
            }
          }).catch(err => {
            console.log(err);
          });
        }
        if (this.activeName2 === 'first') {
          this.searchForm.empName = '';
          this.searchForm.certNo = '';
          this.detailsForm.chargeBillNo = '';
          this.detailsForm.custIdName = '';
          this.detailsForm.chargeStateName = '';
          this.detailsForm.chargeBillStateName = '';
          let obj = {
            pageNum: this.pageA.pageNum,
            pageSize: this.pageA.pageSize,
            data: {
              custId: selection1[0].custId,
              costCentId: this.detailsForm.costCentId,
              chargeBillNo: this.detailsForm.chargeBillNo,
              chargeBillState: this.detailsForm.chargeBillState,
              chargeStateList: [1, 2, 4],
              creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
              creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
            }
          };
          api.post(this.apiPath.hrsc.findByCustId, obj).then(res => {
            if (res.data === null) {
              this.tableDataA = [];
            } else {
              this.tableDataA = res.data.list;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      pageHandlerA: function (page) {
        //        改变当前页
        this.pageA.pageNum = page;
        this.twoTable([1, 2, 4]);
      },
      pageHandlerB: function (page) {
        //        改变当前页
        this.pageB.pageNum = page;
        // this.viewAllBill(page, this.billDataPage.pageSize);
        this.handleClick();
      },
      pageHandlerC: function (page) {
        //        改变当前页
        this.billDataPage.pageNum = page;
        this.viewAllBill(page, this.billDataPage.pageSize);
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.viewAll(1, pageSize);
      },
      choooseNumA: function (pageSize) {
//        改变分页显示条数;
        this.pageA.pageSize = pageSize;
        this.twoTable([1, 2, 4]);
      },
      choooseNumB: function (pageSize) {
//        改变分页显示条数;
        this.pageB.pageSize = pageSize;
        this.handleClick();
      },
      choooseNumC: function (pageSize) {
//        改变分页显示条数;
        this.billDataPage.pageSize = pageSize;
        this.viewAllBill(1, pageSize);
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      }
    }
  };
</script>
