<template>
  <div>
    <div class=" invinfo" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="受托收费账单查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one search-inner-width">
                <span class="search-inner-name">签约供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="suppUrl"
                             :token="token"
                             :chooseName.sync="searchForm.custChName"
                             :chooseId.sync="searchForm.custChNameId"
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
            <sino-button type="icon-text" @click="tollBillManage"><i class="iconfont sino-guanli"></i>收费账单模版管理</sino-button>
          </div>
        </div>
        <sino-auto-table :data="tableData" stripe max-height="416" v-on:viewAll="viewAll" border v-on:select="selectCallBack">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="chName" label="签约供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="respPer" label="负责人" min-width="95"></sino-table-column>
          <sino-table-column prop="phone" label="手机号码" min-width="120"></sino-table-column>
          <sino-table-column prop="officeAddr" label="办公地址" min-width="180"></sino-table-column>
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
          <div class="sino-table-total sino-table-total-noborder">
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
                      <div @click="downloadFlag=true">拆单</div>
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
                <sino-button type="icon-text" @click="lookBillFun()" class="toll-bill-down"><i
                  class="iconfont sino-download-copy"></i>查看账单明细
                </sino-button>
                <sino-button type="icon-text" @click="downloadToll()" class="toll-bill-down"><i
                  class="iconfont sino-download-copy"></i>收费账单下载
                </sino-button>
                <sino-button type="icon-text" @click="downloadToll()" class="toll-bill-down"><i
                  class="iconfont sino-download-copy"></i>工资明细下载
                </sino-button>
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
                    <li class="search-inner-one toll-details-mt15 invoice-li-date">
                      <span class="search-inner-name">生成年月：</span>
                      <sino-date-picker
                        v-model="searchForm.startDrawerYm"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="false">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="searchForm.endDrawerYm"
                        type="date"
                        :editable="true"
                        :readonly="false"
                        :clearable="false">
                      </sino-date-picker>
                    </li>
                  </ul>
                </div>
                <div class="search-button">
                  <div class="search-button-box search-one-button-box">
                    <sino-button type="primary" @click="certSearchFun(1)">查 询</sino-button>
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
                                   :chooseName.sync="detailsForm.custIdName"
                                   :chooseId.sync="detailsForm.custId"
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
                        v-model="detailsForm.startDrawerYm"
                        type="date"
                        :editable="false"
                        :readonly="false"
                        :clearable="false">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="detailsForm.endDrawerYm"
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
                        class="toll-bill-table invoice-table-nomargin" v-on:select="thisMonthselectCallBack" @select-all="thisSelectAll">
              <sino-table-column type="selection"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="chargeBillNo" label="收费账单编号" min-width="140"></sino-table-column>
              <sino-table-column prop="paySuppName" label="付费供应商简称" min-width="180"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="creYm" label="费用生成年月" min-width="140"></sino-table-column>
              <sino-table-column prop="allAmo" label="账单金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="perNum" label="涉及人数"></sino-table-column>
              <sino-table-column prop="chargeStateName" label="收费状态"></sino-table-column>
              <sino-table-column prop="billInvStateName" label="开票状态"></sino-table-column>
              <sino-table-column prop="chargeBillStateName" label="账单状态"></sino-table-column>
              <sino-table-column prop="proCharSinsAmo" label="代收社保" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="proCharAccuAmo" label="代收公积金" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="proPayWageAmo" label="代发工资" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="otherAmo" label="其他费用" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="vatInvInfo" label="增值税发票单位名称+税号" min-width="200"></sino-table-column>
              <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="unpaBillPage.pageNum" v-bind:page-size="unpaBillPage.pageSize" v-on:pagehandler="pageHandlerA"
                       :pageArray="unpaBillPage.pageArray" v-on:choosePageFun="choooseNumA" v-bind:object="object"
                       :total="unpaBillPage.total"></sino-page>
          </div>
        </sino-tab-pane>
        <sino-tab-pane label="已收费账单" name="second" v-if="show">
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
                    <sino-dropdown-item>
                      <div @click="locksingle">锁单</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="unlock">解锁</div>
                    </sino-dropdown-item>
                    <sino-dropdown-item>
                      <div @click="downloadFlag=true">拆单</div>
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
                <sino-button type="icon-text" @click="downloadToll()" class="toll-bill-down"><i
                  class="iconfont sino-download-copy"></i>收费账单下载
                </sino-button>
                <sino-button type="icon-text" @click="downloadToll()" class="toll-bill-down" v-if="false"><i
                  class="iconfont sino-download-copy"></i>工资明细下载
                </sino-button>
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
                        v-model="searchForm.startDrawerYm"
                        type="date"
                        placeholder="请选择时间"
                        :editable="false"
                        :readonly="false"
                        :clearable="true">
                      </sino-date-picker>
                      <span>至</span>
                      <sino-date-picker
                        v-model="searchForm.endDrawerYm"
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
                    <sino-button type="primary" @click="certSearchFun(3)">查 询</sino-button>
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
                      <span class="search-inner-name">客户名称：</span>
                      <!--<sino-input class="fl" type="text" v-model="searchForm.custChName"-->
                      <!--:disabled="false"></sino-input>-->
                      <sino-select :tipText="'请选择'" class="fl"
                                   :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCustSelectInfo"
                                   :token="token"
                                   :chooseName.sync="detailsForm.custIdName"
                                   :chooseId.sync="detailsForm.custId"
                                   :clear="true">
                      </sino-select>
                    </li>
                    <!--<li class="search-inner-one toll-details-mt15">-->
                      <!--<span class="search-inner-name">收费状态：</span>-->
                      <!--&lt;!&ndash;<sino-input class="fl" type="text" v-model="searchForm.custChName"&ndash;&gt;-->
                      <!--&lt;!&ndash;:disabled="false"></sino-input>&ndash;&gt;-->
                      <!--<sino-select class="fl"-->
                                   <!--:filterable="false"-->
                                   <!--:multiselect="false"-->
                                   <!--:isshowTotol="false"-->
                                   <!--:totalNum="false"-->
                                   <!--:isPage="false"-->
                                   <!--:isGroup="false"-->
                                   <!--:data="{code: 'CHARGE_STATE'}"-->
                                   <!--:url="getDictSelectBox"-->
                                   <!--:chooseName.sync="detailsForm.chargeStateName"-->
                                   <!--:chooseId.sync="detailsForm.chargeState"-->
                                   <!--:clear="true">-->
                      <!--</sino-select>-->
                    <!--</li>-->
                    <li class="search-inner-one toll-details-mt15">
                      <span class="search-inner-name">账单状态：</span>
                      <!--<sino-input class="fl" type="text" v-model="searchForm.custChName"-->
                      <!--:disabled="false"></sino-input>-->
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
                        placeholder="请选择时间"
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
                        class="toll-bill-table invoice-table-nomargin" v-on:select="thisMonthselectCallBack" @select-all="thisSelectAll">
              <sino-table-column type="selection"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="chargeBillNo" label="收费账单编号" min-width="140"></sino-table-column>
              <sino-table-column prop="paySuppName" label="付费供应商简称" min-width="180"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="creYm" label="费用生成年月" min-width="140"></sino-table-column>
              <sino-table-column prop="allAmo" label="账单金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="perNum" label="涉及人数"></sino-table-column>
              <sino-table-column prop="chargeStateName" label="收费状态"></sino-table-column>
              <sino-table-column prop="billInvStateName" label="开票状态"></sino-table-column>
              <sino-table-column prop="chargeBillStateName" label="账单状态"></sino-table-column>
              <sino-table-column prop="proCharSinsAmo" label="代收社保" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="proCharAccuAmo" label="代收公积金" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="proPayWageAmo" label="代发工资" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="otherAmo" label="其他费用" type="money" width="150" align="center"></sino-table-column>
              <sino-table-column prop="vatInvInfo" label="增值税发票单位名称+税号" min-width="200"></sino-table-column>
              <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="alreCharPage.pageNum" v-bind:page-size="alreCharPage.pageSize" v-on:pagehandler="pageHandlerB"
                       :pageArray="alreCharPage.pageArray" v-on:choosePageFun="choooseNumB" v-bind:object="object"
                       :total="alreCharPage.total"></sino-page>
          </div>
        </sino-tab-pane>
      </sino-tabs>
    </div>
    <!-- 拆台弹层 -->
    <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow amount-split-box" v-on:close="resetForm('downloadForm')">
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
    <sino-dialog :visible.sync="releaeFlag" size="small" class="leads-follow publishFinal" v-on:close="resetForm('releaeForm')">
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
    <sino-dialog :visible.sync="prodInfoAdd" size="large" :top="'10%'" class="dialog-height modify-dialog" v-on:close="resetForm('prodInfoAddForm')">
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
                         :url="findInvInfoSuppids"
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
                    <sino-select :filterable="true"
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
                                 :filterable="true"
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
                <sino-button type="text" v-if="mailObj.mailAddForm[index].flag" @click="gray(index)" class="modify-btn-highlight-icon" :class="{'modify-btn-highlight-icon':defaultIndex === index,'modify-btn-gray-icon':defaultIndex !== index}"><i></i></sino-button>
                <sino-button type="text" v-if="!mailObj.mailAddForm[index].flag" @click="save(index)">保存</sino-button>
                <sino-button type="text" v-if="!mailObj.mailAddForm[index].flag && (index < mailAddLength)" @click="cancelFun(index)">取消</sino-button>
                <sino-button type="text" v-if="!mailObj.mailAddForm[index].flag && (index >= mailAddLength)" @click="del(index)">删除</sino-button>
              </div>
            </ul>
            <!--</sino-collapse-transition>-->
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
           <sino-button type="primary" @click="submitForm">修 改</sino-button>
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
  import Cookies from 'js-cookie';

  let checkedArr = '';
  let checkedBrr = '';
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
        allDown: true,
        suppInvInfoSelectbox: this.apiPath.hrsc.suppInvInfoSelectbox,
        findInvInfoSuppids: this.apiPath.hrsc.findInvInfoSuppids,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        suppUrl: this.apiPath.hrsc.findSuppInfoChargeBillSelectbox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo,
        token: Cookies.get('Token'),
        // 发票信息详情
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
        custData: {
          list: []
        },
        copyData: [],
        mailAddLength: '',
        activeFlagIndex: '',
        defaultIndex: 0,
        routerView: false,
        dropdown: false,
        summaryFlag: false, // 黄色数字
        uniqflag: false,
        detailsflag: false,
        releaseData: '', // 发布日期
        downloadFlag: false, // 拆单开关
        show: false,
        proCharSinsAmo: 0,
        proCharAccuAmo: 0,
        proPayWageAmo: 0,
        otherAmo: 0,
        totalAmo: 0,
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
          contName: [
            {required: true, message: '请输入收件人', trigger: 'change'}
          ],
          vatInvInfo: [
            {required: true, message: '请输入增值税发票信息', trigger: 'change'}
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
          radio: 2
        },
        downloadFormRules: {}, // 下载模板表单校验
        detailsForm: {
          chargeBillNo: '',
          custIdName: '',
          custId: '',
          chargeStateName: '',
          chargeState: '',
          chargeBillStateName: '', // 收费状态
          chargeBillState: '',
          startDrawerYm: '',
          endDrawerYm: '',
          remark: '',
          creYmBegin: '',
          billInvStateName: '',
          chargeStateList: [],
          billInvState: '',
          creYmEnd: ''
        },
        searchForm: { // 搜索条件
          certNo: '',
          empName: '',
          custChName: '',
          custChNameId: '',
          custSource: '',
          custSourceName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppName: '',
          startDrawerYm: '',
          endDrawerYm: '',
          paySuppId: ''
        },
        activeName2: '',
        tableData: null, // 表格数据
        tableDataA: null,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 15, 20],
          total: 0 // 分页总条数
        },
        unpaBillPage: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 40, 50],
          total: 0 // 分页总条数
        },
        alreCharPage: {
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
        seeItem: false, // 查看弹层控制显示
        seeDto: {
          suppNo: ''
        }, // 查看弹层的数据
        suppTypeData: {data: {}}
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === '/entrustedcharge') {
            this.routerView = false;
            if (checkedBrr.length !== 0 && this.$route.query.suppId) {
              checkedArr[0].suppId = this.$route.query.suppId;
              this.empDetailFuna();
              this.unpaBillData();
            };
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
      // 查看账单明细
      lookBillFun () {
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
        this.$router.push({
          path: '/entrustedcharge/viewBillDet',
          query: {chargeBillId: checkedBrr[0].chargeBillId, chargeBillTempId: checkedBrr[0].chargeBillTempId, chargeBillNo: checkedBrr[0].chargeBillNo}
        });
      },
      ruoteJudge () {
        if (this.$route.path !== "/entrustedcharge") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      amountSplitFun () {
        this.routerView = true;
        if (this.downloadForm.radio === 1) {
          this.$router.push({path: '/entrustedcharge/chargeAmountSplit'});
        }
        if (this.downloadForm.radio === 2) {
          this.$router.push({path: '/entrustedcharge/chargeEmpSplit', query: {chargeBillId: checkedBrr[0].chargeBillId, suppId: checkedArr[0].suppId}});
        };
        this.downloadFlag = false;
      },
      listAdd () {
        if (this.activeFlagIndex === '') {
          this.mailObj.mailAddForm.push({
            contName: '',
            contTel: '',
            provName: '',
            provId: '',
            cityName: '',
            cityId: '',
            distName: '',
            distId: '',
            flag: false,
            suppId: checkedBrr[0].signSuppId
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
      gray (index) {
        this.defaultIndex = index;
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
      /* 修改账单的确认 */
      submitForm (index) {
        let obj = {
          chargeBillId: checkedBrr[0].chargeBillId,
          vatInvId: this.prodInfoAddForm.vatInvId,
          remark: this.prodInfoAddForm.publishRemark,
          suppAddrs: this.mailObj.mailAddForm
        };
        if (this.mailObj.mailAddForm && this.mailObj.mailAddForm.length > 0) {
          console.log(this.defaultIndex);
          this.mailObj.mailAddForm.forEach(function (item, index) {
            if (this.defaultIndex === index) {
              item['flag'] = 1;
            } else {
              item['flag'] = 0;
            }
            item['isDefaultAddr'] = 0;
          }, this);
        }
        api.post(this.apiPath.hrsc.updateChargeBillSupp, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.prodInfoAdd = false;
            this.$message({message: '修改成功！', type: 'success'});
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
          this.releaeFlag = true;
        }
      },      // 发布财务
      releaeFun () {
        let obj = {
          chargeBillId: checkedBrr[0].chargeBillId,
          publishDate: this.releaeForm.publishDate,
          publishRemark: this.releaeForm.publishRemark
        };
        api.post(this.apiPath.hrsc.publishChargeBill, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.releaeFlag = false;
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
          // this.custData.id = checkedArr[0]['suppId'];
          let obj = {
            suppIds: []
          };
          // console.log(checkedArr[0]);
          obj.suppIds.push(checkedBrr[0].signSuppId);
          obj.suppIds.push(checkedBrr[0].paySuppId);
          this.custData.list = obj.suppIds;
          api.post(this.apiPath.hrsc.findSuppAddrSuppids, obj).then(res => {
            this.prodInfoAdd = true;
            this.mailObj.mailAddForm = res.data;
            for (var i = 0; i < this.mailObj.mailAddForm.length; i++) {
              this.mailObj.mailAddForm[i].flag = true;
            };
            this.mailAddLength = this.mailObj.mailAddForm.length;
            this.copyData = JSON.parse(JSON.stringify(this.mailObj.mailAddForm));
          });
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
      // 财务修改账单保存按钮
      subFun () {
        let obj = JSON.parse(JSON.stringify(this.empInfoForm));
        let ary = JSON.parse(JSON.stringify(this.list));
        obj.empMemberList = ary;
        api.post(this.apiPath.hrsc.empUpdate, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '保存成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 按明细查询按钮
      serarFun () {},
      /* 以收费明细 */
      empDetailFun () {
        let obj = {
          pageNum: this.alreCharPage.pageNum,
          pageSize: this.alreCharPage.pageSize,
          data: {
            signSuppId: checkedArr[0].suppId,
            chargeBillNo: this.detailsForm.chargeBillNo,
            custId: this.detailsForm.custId,
            chargeBillState: this.detailsForm.chargeBillState,
            chargeStateList: [3],
            billInvState: this.detailsForm.billInvState,
            creYmBegin: Vue.filter('date')(this.detailsForm.startDrawerYm, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.detailsForm.endDrawerYm, 'yyyy-MM')
          }
        };
        api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      certSearchFun (item) {
        let obj = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          data: {
            signSuppId: checkedArr[0].suppId,
            startDrawerYm: this.searchForm.startDrawerYm,
            certNo: this.searchForm.certNo,
            empName: this.searchForm.empName,
            chargeState: item,
            endDrawerYm: this.searchForm.endDrawerYm
          }
        };
        api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 未收费明细 */
      empDetailFuna () {
        if (this.detailsForm.chargeState) {
          this.detailsForm.chargeStateList = [];
          this.detailsForm.chargeStateList.push(this.detailsForm.chargeState);
        } else {
          this.detailsForm.chargeStateList = [1, 2, 4];
        }
        let obj = {
          pageNum: this.unpaBillPage.pageNum,
          pageSize: this.unpaBillPage.pageSize,
          data: {
            signSuppId: checkedArr[0].suppId,
            chargeBillNo: this.detailsForm.chargeBillNo,
            custId: this.detailsForm.custId,
            chargeBillState: this.detailsForm.chargeBillState,
            billInvState: this.detailsForm.billInvState,
            creYmBegin: Vue.filter('date')(this.detailsForm.startDrawerYm, 'yyyy-MM'),
            creYmEnd: Vue.filter('date')(this.detailsForm.endDrawerYm, 'yyyy-MM'),
            chargeState: this.detailsForm.chargeState,
            chargeStateList: this.detailsForm.chargeStateList
          }
        };
        api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
          if (res.data === null) {
            this.tableDataA = [];
          } else {
            this.tableDataA = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      submitFun () {
        this.downloadFlag = false;
      },
      thisSelectAll (selection, row) {
        let arr = [];
        for (let item of selection) {
          if (item.chargeBillId) {
            arr.push(item);
          }
        }
        this.thisMonthselectCallBack(arr);
        this.allDown = true;
      },
      thisMonthselectCallBack (selection, row) { // 本月选中回调
        checkedBrr = selection;
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
            this.proCharSinsAmo += checkedBrr[i].proCharSinsAmo;
            this.proCharAccuAmo += checkedBrr[i].proCharAccuAmo;
            this.proPayWageAmo += checkedBrr[i].proPayWageAmo;
            this.otherAmo += checkedBrr[i].otherAmo;
            this.totalAmo = (this.proCharSinsAmo + this.proCharAccuAmo + this.proPayWageAmo + this.otherAmo).toFixed(2);
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
      },
      // 第一个表格的
      selectCallBack (selection, row) { // 手动选中checkBox回调
        if (selection.length >= 2) {
          selection.splice(0, selection.length - 1);
        }
        checkedArr = selection;
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
      // 未收费账单数据
      unpaBillData () {
        let obj = {
          pageNum: this.unpaBillPage.pageNum,
          pageSize: this.unpaBillPage.pageSize,
          data: {signSuppId: checkedArr[0].suppId}
        };
        this.detailsflag = false;
        this.uniqflag = false;
        for (let key in this.detailsForm) {
          this.detailsForm[key] = '';
        }
        for (let key in this.searchForm) {
          this.searchForm[key] = '';
        }
        api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.activeName2 = 'first';
            this.summaryFlag = true;
            this.tableDataA = res.data.list;
            this.unpaBillPage.total = res.data.total;
            if (this.detailsForm.chargeState) {
              this.detailsForm.chargeStateList = [];
              this.detailsForm.chargeStateList.push(this.detailsForm.chargeState);
            } else {
              this.detailsForm.chargeStateList = [1, 2, 4];
            }
            let obj = {
              pageNum: this.unpaBillPage.pageNum,
              pageSize: this.unpaBillPage.pageSize,
              data: {
                signSuppId: checkedArr[0].suppId,
                chargeBillNo: this.detailsForm.chargeBillNo,
                custId: this.detailsForm.custId,
                chargeBillState: this.detailsForm.chargeBillState,
                chargeStateList: this.detailsForm.chargeStateList,
                creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
                creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
              }
            };
            api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
              if (res.data === null) {
                this.tableDataA = [];
              } else {
                this.tableDataA = res.data.list;
                this.unpaBillPage.total = res.data.total;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
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
          api.post(this.apiPath.hrsc.unlockChargeBill, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.unpaBillPage.pageNum = 1;
              this.unpaBillPage.pageSize = 10;
              this.alreCharPage.pageNum = 1;
              this.alreCharPage.pageSize = 10;
              this.empDetailFun();
              this.empDetailFuna();
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
          api.post(this.apiPath.hrsc.lockChargeBill, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.unpaBillPage.pageNum = 1;
              this.unpaBillPage.pageSize = 10;
              this.alreCharPage.pageNum = 1;
              this.alreCharPage.pageSize = 10;
              this.empDetailFun();
              this.empDetailFuna();
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
      resetForm (formName) {
        // this.$refs[formName].resetFields();
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      viewAll: function () {
        this.getList('all');
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      getList (all) {
        let obj = {};
        obj.data = {suppId: this.searchForm.custChNameId};
        if (all) {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.findByChName, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 收费账单下载
      downloadToll () {
        if (checkedBrr === '' || checkedBrr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
          return;
        }
        let list = {
          chargeBillSuppIds: []
        };
        for (var i = 0; i < checkedBrr.length; i++) {
          var obj = {
            chargeBillTempId: checkedBrr[i].chargeBillTempId,
            chargeBillNo: checkedBrr[i].chargeBillNo,
            chargeBillId: checkedBrr[i].chargeBillId,
            chargeBillIdList: [],
            isCustChargeBill: false
          };
          obj.chargeBillIdList.push(checkedBrr[i].chargeBillId);
          list.chargeBillSuppIds.push(obj);
        }
        api.post(this.apiPath.hrsc.chargeDownload, list).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 收费账单模版管理
      tollBillManage () {
        if (checkedArr.length <= 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
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
        this.$router.push({path: '/entrustedcharge/chargebilltemplate'});
        this.$router.push({path: '/entrustedcharge/chargebilltemplate', query: {objId: checkedArr[0].suppId}});  //  查询完  跳转传参
      },
      // 合单跳转新页面
      singlePage: function () {
        if (checkedBrr.length !== 1) {
          this.$alert('请选择一条操作项！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class；
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/entrustedcharge/entrustedtogether', query: {chargeBillId: checkedBrr[0].chargeBillId, suppId: checkedArr[0].suppId}});
        checkedBrr = [];
      },
      // tabs选项卡点击
      handleClick (tab, event) {
        for (let key in this.detailsForm) {
          this.detailsForm[key] = '';
        }
        for (let key in this.searchForm) {
          this.searchForm[key] = '';
        }
        /* this.detailsForm.chargeBillNo = '';
        this.detailsForm.custIdName = '';
        this.detailsForm.chargeStateName = '';
        this.detailsForm.chargeBillStateName = ''; */
        this.proCharSinsAmo = 0;
        this.proCharAccuAmo = 0;
        this.proPayWageAmo = 0;
        this.otherAmo = 0;
        this.totalAmo = 0;
        if (this.activeName2 === 'second') {
          let obj = {
            pageNum: this.alreCharPage.pageNum,
            pageSize: this.alreCharPage.pageSize,
            data: {
              signSuppId: checkedArr[0].suppId,
              chargeBillNo: this.detailsForm.chargeBillNo,
              custId: this.detailsForm.custId,
              chargeBillState: this.detailsForm.chargeBillState,
              chargeStateList: [3],
              creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
              creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
            }
          };
          api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
            if (res.data === null) {
              this.tableDataA = [];
            } else {
              this.tableDataA = res.data.list;
              this.alreCharPage.total = res.data.total;
            }
          }).catch(err => {
            console.log(err);
          });
        }
        if (this.activeName2 === 'first') {
          this.detailsForm.chargeBillNo = '';
          this.detailsForm.custIdName = '';
          this.detailsForm.chargeStateName = '';
          this.detailsForm.chargeBillStateName = '';
          let obj = {
            pageNum: this.unpaBillPage.pageNum,
            pageSize: this.unpaBillPage.pageSize,
            data: {
              signSuppId: checkedArr[0].suppId,
              chargeBillNo: this.detailsForm.chargeBillNo,
              custId: this.detailsForm.custId,
              chargeBillState: this.detailsForm.chargeBillState,
              chargeStateList: [1, 2, 4],
              creYmBegin: Vue.filter('date')(this.detailsForm.creYmBegin, 'yyyy-MM'),
              creYmEnd: Vue.filter('date')(this.detailsForm.creYmEnd, 'yyyy-MM')
            }
          };
          api.post(this.apiPath.hrsc.findChargeBillSupp, obj).then(res => {
            if (res.data === null) {
              this.tableDataA = [];
            } else {
              this.tableDataA = res.data.list;
              this.unpaBillPage.total = res.data.total;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      // 未收费账单的翻页
      pageHandlerA: function (page) {
        //        改变当前页
        this.unpaBillPage.pageNum = page;
        this.unpaBillData();
      },
      choooseNumA: function (pageSize) {
//        改变分页显示条数;
        this.unpaBillPage.pageSize = pageSize;
        this.unpaBillData();
      },
      // 已收费账单的翻页
      pageHandlerB: function (page) {
        //        改变当前页
        this.alreCharPage.pageNum = page;
        this.handleClick();
      },
      choooseNumB: function (pageSize) {
//        改变分页显示条数;
        this.alreCharPage.pageSize = pageSize;
        this.handleClick();
      }
    }
  };
</script>

