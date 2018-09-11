<template>
  <div class="usermanage">
    <div class="invinfo">
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="账单收费查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box invoice-ul">
            <li class="invoice-li">
              <span class="search-inner-name invoice-li-width">客户/供应商名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="billSuppCust"
                           :chooseName.sync="billSuppCustFrom.suppOrCustName"
                           :chooseId.sync="billSuppCustFrom.suppIdOrCustId"
                           :clear="true"
                           @contentChange="contentChange">
              </sino-select>
            </li>
            <li class="search-inner-name">
              <span class="search-inner-name">账单编号：</span>
              <sino-input class="fl" type="text" v-model="billSuppCustFrom.chargeBillNo"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">生成年月：</span>
              <sino-date-picker
                v-model="billSuppCustFrom.creYm"
                type="month"
                placeholder=""
                :editable="false"
                :readonly="false">
              </sino-date-picker>
            </li>
            <li>
              <span class="search-inner-name">开票状态：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="{code: 'BILL_INV_STATE', ids: [1,2]}"
                           :url="getDictSelectBox"
                           :chooseName.sync="billSuppCustFrom.drawerStateName"
                           :chooseId.sync="billSuppCustFrom.drawerState"
                           :clear="true" >
              </sino-select>
            </li>
            <li>
              <span class="search-inner-name">票据类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="{code: 'BILL_TYPE', ids: [1,2,3]}"
                           :url="getDictSelectBox"
                           :chooseName.sync="billSuppCustFrom.billTypeName"
                           :chooseId.sync="billSuppCustFrom.billType"
                           :clear="true" >
              </sino-select>
            </li>
            <li>
              <span class="search-inner-name">收费状态：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="{code: 'CHARGE_STATE',ids: [1,3]}"
                           :url="getDictSelectBox"
                           :chooseName.sync="billSuppCustFrom.chargeStateName"
                           :chooseId.sync="billSuppCustFrom.chargeState"
                           :clear="true" >
              </sino-select>
            </li>
            <li  v-if="searchFlag">
              <span class="search-inner-name">业务员：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :token="token"
                           :url="findUserByOrgIdsAndRoleType"
                           :data="{orgIds:[], roleTypes:[5,16]}"
                           :chooseName.sync="billSuppCustFrom.busiCustName"
                           :chooseId.sync="billSuppCustFrom.busiCustId"
                           :clear="true" >
              </sino-select>
            </li>
            <li class="invoice-li-date" v-if="searchFlag">
              <span class="search-inner-name">开票年月：</span>
              <sino-date-picker
                v-model="billSuppCustFrom.startDrawerYm"
                type="date"
                :editable="false"
                :readonly="false"
                :clearable="false">
              </sino-date-picker>
              <span>至</span>
              <sino-date-picker
                v-model="billSuppCustFrom.endDrawerYm"
                type="date"
                :editable="true"
                :readonly="false"
                :clearable="false">
              </sino-date-picker>
            </li>
          </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('localInfoForm')">重 置</sino-button>
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
      <div class=" sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button class="fl" type="icon-text" @click="clickCharge()"><i class="iconfont sino-qian"></i>收费
            </sino-button>
            <sino-button class="fl" type="icon-text" @click="modify()"><i class="iconfont sino-daoru"></i>导入发票信息
            </sino-button>
            <sino-button class="fl" type="icon-text" @click="download()"><i class="iconfont sino-download-copy fs19"></i>下载模板
            </sino-button>
            <div class="fl cancel-operation">
              <sino-dropdown trigger="click" @visible-change="dropdownDel">
                <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false"
                      :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
    <i class="iconfont sino-invalid"></i>取消操作<i class="iconfont sino-unie628"></i>
  </span>
                <sino-dropdown-menu class="role_menu">
                  <sino-dropdown-item>
                    <div @click="cancelBillFun">取消开票</div>
                  </sino-dropdown-item>
                  <sino-dropdown-item>
                    <div @click="cancelCharge">取消收费</div>
                  </sino-dropdown-item>
                </sino-dropdown-menu>
              </sino-dropdown>
            </div>
          </div>
        </div>
        <div class="toll-bill-ul-box">
          <ul class="toll-bill-table-ul clearfix invoice-checked-box">
            <li>
              <sino-checkbox v-model="faTr.collecSocSec" @change="socSec">代收社保 :  <i>&yen;</i><span>{{collecSocSec}}</span></sino-checkbox>
            </li>
            <li>
              <sino-checkbox v-model="faTr.collecAccFund" @change="socSec">代收公积金 : <i>&yen;</i><span>{{collecAccFund}}</span></sino-checkbox>
            </li>
            <li>
              <sino-checkbox v-model="faTr.collecWages" @change="socSec">代收发工资 : <i>&yen;</i><span>{{collecWages}}</span></sino-checkbox>
            </li>
            <li>
              <sino-checkbox v-model="faTr.collecCharge" @change="socSec">服务费 : <i>&yen;</i><span>{{collecCharge}}</span></sino-checkbox>
            </li>
            <li class="invoice-fr-li">
              <h6>总金额:</h6>
              <i>&yen;</i>
              <span>{{totalAmount}}</span>
            </li>
          </ul>
        </div>
        <sino-table class="invoice-table-nomargin" :data="tableData" stripe max-height="416" v-on:viewAll="viewAll" border @select="selectTabelRow" @select-all='selectTabelRow'>
            <sino-table-column type="selection" width="40"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="suppOrCustName" label="客户/供应商名称" width="220"></sino-table-column>
            <sino-table-column prop="chargeBillNo" label="账单编号" min-width="140"></sino-table-column>
            <sino-table-column prop="busiReceeAmo" label="账单金额" width="130" type="money" align="center"></sino-table-column>
            <sino-table-column prop="proCharSinsAmo" label="代收社保" width="130" type="money" align="center"></sino-table-column>
            <sino-table-column prop="proCharAccuAmo" label="代收公积金" width="130" type="money" align="center"></sino-table-column>
            <sino-table-column prop="proPayWageAmo" label="代发工资" width="130" type="money" align="center"></sino-table-column>
            <sino-table-column prop="serveAmo" label="服务费" width="100" type="money" align="center"></sino-table-column>
            <sino-table-column prop="creYm" label="生成年月" min-width="100"></sino-table-column>
            <sino-table-column prop="drawerStateName" label="开票状态" min-width="100"></sino-table-column>
            <sino-table-column prop="billTypeName" label="票据类型" min-width="100"></sino-table-column>
            <sino-table-column prop="chargeStateName" label="收费状态" min-width="100"></sino-table-column>
            <sino-table-column prop="busiCustName" label="业务员" min-width="100"></sino-table-column>
            <sino-table-column label="操作" align="center" class="user-btns" width="194" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="modifyFun(scope.row)">发布退回</span><i class="table-i">|</i>
                  <span class="table-span" @click="billingFun(scope.row)">开票</span><i class="table-i">|</i>
                  <span class="table-span" @click="invoiceFun(scope.row)">发票信息</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!--开票弹层-->
    <sino-dialog :visible.sync="billingAdd" size="samll" dialogHide @close="billingAddClose('billingForm')" class="usermanage">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="开票信息"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="billingForm" :rules="billingRules" ref="billingForm" class="fl">
          <sino-form-item label="票据类型：" prop="id" class="billing-form-smallbox">
            <sino-radio v-for="item in billingList" v-model.number="billingForm.id" :label="item.id">{{item.title}}</sino-radio>
          </sino-form-item>
          <div class="sino-table-total" v-if="!hideShow">
            <sino-table :data="billingData" stripe style="width: 700px" height="365">
              <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
              <sino-table-column prop="invSubName" label="开票项目" align="center" min-width="161" ></sino-table-column>
              <sino-table-column prop="amountMoney" label="账单金额" align="center" min-width="161"></sino-table-column>
              <sino-table-column prop="invNo" label="发票号" align="center" min-width="161" :editType='true'>
                <template scope="scope">
                  <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false;"
                              v-model="scope.row.invNo"></sino-input>
                  <span v-show="!scope.row.edit" @click="scope.row.edit = true;" class="defaultVa">{{ scope.row.invNo }}</span>
                </template>
              </sino-table-column>
              <sino-table-column prop="InvAmount" label="发票金额" align="center" min-width="161" :editType='true'>
                <template scope="scope">
                  <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false;"
                              v-model="scope.row.InvAmount"></sino-input>
                  <span v-show="!scope.row.edit" @click="scope.row.edit = true;" class="defaultVa">{{ scope.row.InvAmount }}</span>
                </template>
              </sino-table-column>
              <sino-table-column prop="systemSummerInvSub" label="发票科目" align="center" min-width="161" :editType='true'>
                <template scope="scope">
                  <select v-show="scope.row.editSelect" v-model="scope.row.systemSummerInvSub"
                          @change="scope.row.editSelect = false;">
                    <option v-for="option in options" v-bind:value="option.title">
                      {{ option.title }}
                    </option>
                  </select>
                  <span v-show="!scope.row.editSelect"
                        @click="scope.row.editSelect = true;" class="defaultVa">{{ scope.row.systemSummerInvSub}}</span>
                </template>
              </sino-table-column>
              <sino-table-column prop="invTypeName" label="发票类型" align="center" min-width="161" :editType='true'>
                <template scope="scope">
                  <select v-show="scope.row.editSelect2" v-model="scope.row.invTypeName"
                          @change="scope.row.editSelect2 = false;">
                    <option v-for="option in invoiceOptions" v-bind:value="option.title">
                      {{ option.title }}
                    </option>
                  </select>
                  <span v-show="!scope.row.editSelect2"
                        @click="scope.row.editSelect2 = true;" class="defaultVa">{{ scope.row.invTypeName}}</span>
                </template>
              </sino-table-column>
              <sino-table-column prop="DrawerMan" label="开票人" align="center" min-width="161" :editType='true'>
                <template scope="scope">
                  <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false;"
                              v-model="scope.row.DrawerMan"></sino-input>
                  <span v-show="!scope.row.edit" @click="scope.row.edit = true;" class="defaultVa">{{ scope.row.DrawerMan }}</span>
                </template>
              </sino-table-column>
              <sino-table-column prop="drawerTime" label="开票日期" align="center" min-width="161" :editType='true'>
                <template scope="scope">
                  <sino-date-picker v-show="scope.row.editDate" v-model="scope.row.drawerTime" type="date"
                                    placeholder="请选择时间" :editable="false" :readonly="false" format="yyyy-MM-dd"
                                    :clearable="false" @blur="scope.row.editDate = false;">
                  </sino-date-picker>
                  <span v-show="!scope.row.editDate" @click="scope.row.editDate = true" class="defaultVa">{{ scope.row.drawerTime | capitalize}}</span>
                </template>
              </sino-table-column>
            </sino-table>
          </div>
          <div v-if="hideShow">
            <sino-form :model="receiptModu" :rules="receiptDataRules" ref="receiptModu" class="demo-sendAddrAddForm">
              <sino-form-item label="金额：" class="sino-form-item"  prop="InvAmount">
                <sino-input type="text" v-model="receipt.InvAmount" :disabled="false" ></sino-input>
              </sino-form-item>
              <sino-form-item label="开票人：" class="sino-form-item"  prop="DrawerMan">
                <sino-input v-model="receipt.DrawerMan" :disabled="false" ></sino-input>
              </sino-form-item>
              <sino-form-item label="开票日期：" class="sino-form-item"  prop="drawerTime">
                <sino-date-picker
                  v-model="receipt.drawerTime"
                  type="date"
                  placeholder=""
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </sino-form>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="billingSubmitFun('billingForm')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--领取弹层-->
    <sino-dialog :visible.sync="receiveAdd" size="samll"  @close="dialogClose('receiveForm')" class="usermanage">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="领取信息"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="receiveForm" :rules="receiveRules" ref="receiveForm" class="fl">
          <sino-form-item label="领取方式：" prop="id" class="billing-form-smallbox">
            <sino-radio v-for="item in receiveList"
                        :label="item.id"
                        v-model.number="receiveForm.id"
            >{{item.name}}</sino-radio>
          </sino-form-item>
          <sino-form-item label="领取人：" prop="custChName">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :data="{code: 'SUPP_TYPE'}"
                         :url="selectBox"
                         :chooseName.sync="receiveForm.custChName"
                         :chooseId.sync="receiveForm.custChId"
                         :clear="true" >
            </sino-select>
            <!--<sino-input v-model="receiveForm.custChName"></sino-input>-->
          </sino-form-item>
          <sino-form-item label="领取日期：" prop="custChName">
            <sino-date-picker
              v-model="receiveForm.begDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
            <sino-input type="textarea" v-model="receiveForm.remark"  :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="receiveSubmitFun('receiveForm')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--邮寄弹层-->
    <sino-dialog :visible.sync="mailAdd" size="samll"  @close="dialogClose('mailForm')" class="mail-dialog">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="邮寄信息"></sino-title>
      <div class="usermanagement-modify1 clearfix">
        <sino-form :model="mailForm" :rules="mailRules" ref="mailForm" class="fl mail-form-width">
          <sino-form-item label="快递公司：" prop="paySuppName" class="billing-form-smallbox">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'SUPP_TYPE'}"
                         :url="selectBox"
                         :chooseName.sync="mailForm.paySuppName"
                         :chooseId.sync="mailForm.paySuppId"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="快递单号：" prop="custChName">
            <sino-input v-model="mailForm.custChName"></sino-input>
          </sino-form-item>
          <sino-form-item label="邮寄日期：" prop="begDate">
            <sino-date-picker
              v-model="mailForm.begDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="false">
            </sino-date-picker>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="mailSubmitFun('mailForm')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--导入开票邮寄信息-->
    <sino-dialog :top="'30%'" :visible.sync="modifyAndAdd" size="small" class="remilead-wid" v-on:close="resetForm('modifyAndAddForm')">
      <sino-title slot="title" type="levelOne" title="导入开票数据文件" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm">
        <sino-form-item prop="fileName" label="上传文件：" class="sino-form-item-width is-required">
          <sino-upload
            class="upload-demo"
            ref="fileNameFile"
            :action="fileAction"
            :show-file-list="true"
            :auto-upload="true"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :headers="uploadHeader"
          >
            <div slot="trigger">
              <!--<input type="hidden" v-model="modifyAndAddForm.fileName">-->
              <!--<input class="uploadFileBox" type="text" readonly="true" placeholder="请选择上传文件"/> &lt;!&ndash;v-model="modifyAndAddForm.busLicName" &ndash;&gt;-->
              <!--<span class="chooseFileButton">上传</span>-->
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="sino-dialog-footer">
        <sino-button type="primary" @click="upBankData">确 定</sino-button>
      </span>
    </sino-dialog>
    <sino-dialog :visible.sync="importVisible">
      <sino-title slot="title" type="levelOne" title="批量导入"></sino-title>

      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>文件名称</h6>
            <span v-text="modifyAndAddForm.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span>
              <div class="file-upload-see">
                <i v-text="modifyAndAddForm.total" ></i>
              </div>
            </span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span>
              <div class="file-upload-see">
                <i v-text="modifyAndAddForm.succ" ></i>
                <a class="file-del-btn" v-if="modifyAndAddForm.succ !== 0" href="javascript:void(0)" @click="modifySuccDownload">
                下载
                </a>
              </div>
            </span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span>
              <div class="file-upload-see">
                <i v-text="modifyAndAddForm.fail" ></i>
                <a class="file-del-btn" v-if="modifyAndAddForm.fail !== 0" href="javascript:void(0)" @click="modifyFailDownload">
                下载
                </a>
              </div>
            </span>
          </li>
          <li>
            <h6>导入人</h6>
            <span v-text="modifyAndAddForm.drawerMan"></span>
          </li>
          <li>
            <h6>导入时间</h6>
            <span v-text="modifyAndAddForm.drawerTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer">
        <sino-button type="primary" @click="confirm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--发布退回弹层-->
    <sino-dialog :visible.sync="backFormFlag" size="large"  class="dialog-height" @close ="cleanContent('transForm')">
      <sino-title slot="title" type="levelOne" title="退回原因" class="sino-dialog-title"></sino-title>
      <sino-form :model="backForm" :rules="backRules" ref="backForm" class="demo-transForm">
        <sino-form-item label="退回原因：" class="sino-from-wid" prop="publishRetReason">
          <sino-input v-model="backForm.publishRetReason" type="textarea" class="text-area-min120"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitBackForm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--发票信息弹层-->
    <sino-dialog :visible.sync="invoiceFlag" size="small" @close ="invoiceContent('transForm')">
      <sino-title slot="title" type="levelOne" title="发票信息" class="sino-dialog-title"></sino-title>
      <div style="height: 300px; overflow: auto">
        <div v-for="item in remiSeeList"  v-if="choosedId.indexOf(item.invInfoId) === -1">
          <sino-button type="text" class="fr" @click="cancelTicket(item.invInfoId)">取消开票</sino-button>
          <div class="usermanagement-list marBo">
            <div v-if="item.billTypeName !== '收据'">
              <ul class="usermanagement-ul">
                <li class="li-last">
                  <h6>票据类型</h6><span v-text="item.billTypeName"></span>
                </li>
                <li class="li-last">
                  <h6>开票项目</h6><span v-text="item.systemSummaryInvSub"></span>
                </li>
                <li>
                  <h6>发票科目</h6><span v-text="item.systemSummaryInvSub"></span>
                </li>
                <li>
                  <h6>发票号</h6><span v-text="item.invNo"></span>
                </li>
                <li>
                  <h6>发票金额</h6><span v-text="item.invAmount"></span>
                </li>
                <li>
                  <h6>发票类型</h6><span v-text="item.invTypeName"></span>
                </li>
                <li>
                  <h6>开票人</h6><span v-text="item.drawerMan"></span>
                </li>
                <li>
                  <h6>开票时间</h6><span v-text="item.drawerTime"></span>
                </li>
              </ul>
            </div>
            <div v-if="item.billTypeName === '收据'">
              <ul class="usermanagement-ul">
                <li class="li-last">
                  <h6>票据类型</h6><span v-text="item.billTypeName"></span>
                </li>
                <li>
                  <h6>发票金额</h6><span v-text="item.invAmount"></span>
                </li>
                <li>
                  <h6>开票人</h6><span v-text="item.drawerMan"></span>
                </li>
                <li>
                  <h6>开票时间</h6><span v-text="item.drawerTime"  class="borderRig"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="invoiceEnter">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--取消信息弹层-->
    <sino-dialog :visible.sync="cancelBillAdd" size="samll"  @close="dialogClose('cancelBillForm')" class="usermanage">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="取消信息"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="cancelBillForm" :rules="cancelBillRules" ref="cancelBillForm" class="fl">
          <sino-form-item label="取消人：" prop="cancelInvMan">
            <sino-input v-model="cancelBillForm.cancelInvMan"></sino-input>
          </sino-form-item>
          <sino-form-item label="取消日期：" prop="cancelInvTime">
            <sino-date-picker
              v-model="cancelBillForm.cancelInvTime"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="cancelInvReason" label="原因：">
            <sino-input type="textarea" v-model="cancelBillForm.cancelInvReason"  :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="cancelBillSubmitFun('cancelBillForm')">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.name.split('.')[1];
    let _arr = ['xlsx', 'xls'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    }  else {
      _this.$alert('请上传excel文件！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
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
  let dDate = new Date();
  let checkedArr = [];
  let billingDeterData1 = {
    invSub: 1,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票日期
    invType: null, // 发票类型
    invTypeName: ''
  };
  let billingDeterData2 = {
    invSub: 2,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票时间
    invType: null, // 发票类型
    invTypeName: ''
  };
  let billingDeterData3 = {
    invSub: 3,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票时间
    invType: null, // 发票类型
    invTypeName: ''
  };
  let billingDeterData4 = {
    invSub: 4,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票时间
    invType: null, // 发票类型
    invTypeName: ''
  };
  let itemData;

  export default {
    components: {},
    data () {
      return {
        faTr: {
          collecSocSec: true,
          collecAccFund: true,
          collecWages: true,
          collecCharge: true
        },
        collecSocSec: 0,  // 代收社保
        collecAccFund: 0,  // 代收公积金
        collecWages: 0,  // 代收发工资
        collecCharge: 0,  // 服务费
        totalAmount: 0, // 总金额
        token: Cookie.get('Token'),
        cancelTi: true,
        receipt: {
          InvAmount: '',
          DrawerMan: '',
          drawerTime: '',
          billId: '',
          billNo: '',
          billType: null,
          invType: 1,
          custorsuppType: ''
        },
        receiptDataRules: {},
        receiptData: [], // 收据发送的数据
        receiptModu: {},
        options: [],   //  开票表格发票科目下拉框
        invoiceOptions: [], // 开票表格发票类型下拉框
        // hideShow: false,
        currentdate: '', // 当前日期
        userName: Cookie.get('CPYY-INFO-NAME'),
        hideShow: false, // 开票信息弹层内容的显示
        determineSentData: {
          billId: '',
          billNo: '',
          custorsuppType: '',
          billType: ''
        }, // 开票弹层确定发送的公共数据
        remiSeeList: [], // 发票信息
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        getDictInfoDetail: this.apiPath.hrsc.getDictInfoDetail,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        billSuppCust: this.apiPath.hrsc.billSuppCust, // 客户/供应商下拉框
        findBillCharge: this.apiPath.hrsc.findBillCharge, // 账单收费页面查询
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType, // 业务员
        saveInvInfo: this.apiPath.hrsc.saveInvInfo, // 开票
        selectBox: this.apiPath.hrsc.getDictSelectBox,
        uploadHeader: {Token: ""},
//        show: false,
        searchFlag: false,
        billingAdd: false, // 开票
        receiveAdd: false, // 领取
        mailAdd: false, // 邮寄
        invoiceFlag: false, // 发票信息弹层
        backFormFlag: false, // 发布退回
        backForm: {publishRetReason: ""},
        backRules: {
          publishRetReason: [
            {required: true, message: '请输入取消原因', trigger: 'blur'}
          ]
        },
        billSuppCustFrom: {
          type: '', // 类型：客户/供应商
          custId: '', // 客户ID
          suppId: '', // 供应商ID
          suppOrCustName: '', // 客户供应商名称
          suppIdOrCustId: '', //  供应商id/客户id
          chargeBillNo: '', // 账单编号
          creYm: '', // 账单年月
          drawerState: '', // 开票状态
          drawerStateName: '', // 开票状态名称
          billType: '', // 票据类型
          billTypeName: '', // 票据名称/票据类型转码
          chargeState: '', // 收费状态
          chargeStateName: '', // 收费状态名
          busiCustId: '', // 业务员 ID
          busiCustName: '', // 业务员名称
          startDrawerYm: '', // 开票开始年月
          endDrawerYm: '', // 开票结束年月
          chargeBillId: '', // 收费账单ID
          isEffect: '', // 是否有效
          serveAmo: '', // 服务费
          proPayWageAmo: '', //  代发工资
          proCharAccuAmo: '', //     代收公积金
          proCharSinsAmo: '', //    代收社保
          busiReceeAmo: '' //     账单金额
        },
        cancelBillAdd: false, // 取消操作弹层
        importVisible: false, // 导入完成后弹层
        dropdown: false,
        searchForm: { // 搜索条件
          custChName: '', // 客户名称
          custChId: '', // 客户ID
          chargeStateName: '', // 收费状态
          chargeState: '', // 收费状态ID
          chargeBillNo: '', // 账单编号
          custSource: '',
          custSourceName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppName: '',
          paySuppId: '',
          data: ''
        },
        // 导入
        modifyAndAdd: false,
        modifyAndAddForm: {
          // total: '', // 导入总数
          // succ: '', // 成功导入数量
          // fail: '', // 失败数量
          // fileName: '', // 导入文件名
          // drawerMan: '', // 导入人用户名
          // drawerTime: '', // 导入时间
          // succeFileNo:'', // 成功文件唯一号
          // failedFileNo:'',  //失败未见唯一号
        },
        modifyAndAddData: '', // 唯一号
        // 取消信息弹层数据
        cancelBillForm: {
          cancelInvMan: '',
          cancelInvTime: '',
          cancelInvReason: ''
        },
        cancelBillRules: {
          cancelInvMan: [
            {required: true, message: '请输入取消人', trigger: 'blur'}
          ],
          cancelInvTime: [
            {required: true, message: '请选择取消日期', trigger: 'change', type: 'date'}
          ],
          cancelInvReason: [
            {required: true, message: '请输入取消原因', trigger: 'blur'}
          ]
        },
        // 邮寄弹层数据
        mailForm: {
          paySuppName: '',
          paySuppId: '',
          custChName: '',
          begDate: ''
        },
        mailRules: {
          paySuppName: [
            {required: true, message: '请选择快递公司', trigger: 'blur'}
          ],
          custChName: [
            {required: true, message: '请输入快递单号', trigger: 'blur'}
          ],
          begDate: [
            {required: true, message: '请选择邮寄日期', trigger: 'blur'}
          ]
        },
        // 开票弹层数据
        billingList: [],
        receiveList: [
          {
            "id": 1,
            "name": "业务员代领"
          },
          {
            "id": 2,
            "name": "客户自领"
          }
        ],
        billingForm: {
          id: 1
        },
        billingRules: {
          id: [
            {required: true, message: '请选择票据类型', trigger: 'blur', type: 'number'}
          ],
          custChName: [
            {required: true, message: '请输入票号', trigger: 'blur'}
          ]
        },
        // 领取弹层数据
        receiveForm: {
          id: '',
          custChName: '',
          begDate: '',
          remark: ''
        },
        receiveRules: {
          id: [
            {required: true, message: '请选择已选方式', trigger: 'blur'}
          ],
          custChName: [
            {required: true, message: '请选择城市', trigger: 'blur'}
          ]
        },
        tableData: null, // 表格数据
        billingData: [], // 开票数据
        // billingDeterData: {
        //   billId:'',        //账单ID
        //   billNo:'',       // 账单号
        //   custorsuppType: '',//客户供应商类型
        //   billType:"",     // 票据类型
        //   invType: 1,     // 发票类型
        //   invSub:"",      // 开票项目
        //   amountMoney:"",  // 账单金额
        //   invNo:"",        // 发票号
        //   InvAmount:"",   //  发票金额
        //   systemSummerInvSub:"",  //系统合计发票科目
        //   DrawerMan:"",          //开票人
        //   drawerTime:"",         //开票时间
        // }, // 开票弹层确定数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
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
        billHang: '',  // 一行的数据；
        releaseDackData: {}, // 发布退回专用数据
        choosedId: [],
        ids: null
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/custInfo") {
            this.routerView = false;
          }
        },
        deep: true
      },
      billingForm: {
        handler: function (billingForm) {
          if (billingForm.id === 2) {
            this.hideShow = true;
            return;
          }
          this.billingData.forEach(function (item, index) {
            item.invNo = "";        // 发票号-----
            item.InvAmount = null;   //  发票金额-----
            item.systemSummerInvSub = ''; // 系统合计发票科目----
            item.DrawerMan = '';  // 开票人-----
            item.drawerTime = ''; // 开票时间------
            item.invType = null; // 发票类型-----
            item.invTypeName = '';
          });
          this.hideShow = false;
        },
        deep: true
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        const d = new Date(value);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day + ' ';
      }
    },
    created () {
      this.huoquData();
      this.getNowFormatDate();
      this.obtainingInvoice();
      this.invoiceTypeData();
      // this.receipt.drawerTime = this.currentdate;
    },
    methods: {
      // 勾选社保那一栏的操作
      checkFn () {

      },
      socSec () {
        // this.faTr.collecSocSec = !this.faTr.collecSocSec;
        this.selectTabelRow(checkedArr);
        for (var key in this.faTr) {
          if (!this.faTr[key]) {
            this.totalAmount = (this.totalAmount - this[key]).toFixed(2);
            this[key] = 0;
          };
        }
      },
      modifySuccDownload () {
        api.download(this.modifyAndAddForm.succeFileNo);
      },
      modifyFailDownload () {
        api.download(this.modifyAndAddForm.failedFileNo);
      },
      cancelTicket (id) {
        this.ids = id;
        this.cancelBillAdd = true;
        if (this.remiSeeList.length === this.choosedId.length) {
          this.invoiceFlag = false;
        }
      },
      // 获取发票科目
      obtainingInvoice () {
        api.post(this.getDictSelectBox, {code: 'SYSTEM_SUMMER_INV_EMU', ids: [1, 2, 3, 4, 5]}).then(res => {
          this.options = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      getNowFormatDate () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.currentdate = year + seperator1 + month + seperator1 + strDate;
      },
      huoquData () {
        api.post(this.getDictSelectBox, {code: 'BILL_TYPE', ids: [1, 2, 3]}).then(res => {
          this.billingList = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      // 获取发票类型数据
      invoiceTypeData () {
        api.post(this.getDictSelectBox, {code: 'INV_TYPE', ids: [1, 2]}).then(res => {
          this.invoiceOptions = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      contentChange (item) {
        this.billSuppCustFrom.type = item.flag;
      },
      // 取消收费
      cancelCharge () {
        api.post(this.apiPath.hrsc.updateCancelChargeState, checkedArr).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 选中表格数据
      selectTabelRow (selection, row) {
        this.collecSocSec = 0;  // 代收社保
        this.collecAccFund = 0;  // 代收公积金
        this.collecWages = 0;  // 代收发工资
        this.collecCharge = 0;  // 服务费
        this.totalAmount = 0; // 总金额
        checkedArr = selection;
        let _this = this;
        if (checkedArr.length > 0) {
          for (let i = 0; i < checkedArr.length; i++) {
            if (checkedArr[i].chargeBillNo) {
              _this.collecSocSec += Number(checkedArr[i].proCharSinsAmo);
              _this.collecAccFund += Number(checkedArr[i].proCharAccuAmo);
              _this.collecWages += Number(checkedArr[i].proPayWageAmo);
              _this.collecCharge += Number(checkedArr[i].serveAmo);
            }
          }
          _this.totalAmount = _this.collecSocSec + _this.collecAccFund + _this.collecWages + _this.collecCharge;
          _this.collecSocSec = _this.collecSocSec.toFixed(2);
          _this.collecAccFund = _this.collecAccFund.toFixed(2);
          _this.collecWages = _this.collecWages.toFixed(2);
          _this.collecCharge = _this.collecCharge.toFixed(2);
          _this.totalAmount = _this.totalAmount.toFixed(2);
        } else {
          _this.collecSocSec = 0;  // 代收社保
          _this.collecAccFund = 0;  // 代收公积金
          _this.collecWages = 0;  // 代收发工资
          _this.collecCharge = 0;  // 服务费
          _this.totalAmount = 0; // 总金额
        }
      },
      // 发布退回
      modifyFun (data) {
        this.backFormFlag = true;
        this.releaseDackData = data;
      },
      // 导入文件
      modify () {
        this.modifyAndAdd = true;
      },
      importErrDown () {
        api.post(this.apiPath.hrsc.epmExportExcelFail, {"batchNo": 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importNumDown () {
        api.post(this.apiPath.hrsc.empExportExcelAll, {"batchNo": 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importSuccDown () {
        api.post(this.apiPath.hrsc.epmExportExcelSucc, {"batchNo": 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      confirm () {
        this.importVisible = false;
        this.modifyAndAdd = false;
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.modifyAndAddForm.fileName = file.name;
//          this.$refs.fileNameFile.submit();
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.modifyAndAddData = res.data;
        } else {
          this.modifyAndAddForm.fileName = '';
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      // 点击收费调用的
      clickCharge () {
        if (checkedArr.length > 0) {
          this.$alert('是否确认收费？', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              let billNo = [];
              let obj = [];
              let _this = this;
              checkedArr.forEach(function (item, index) {
                billNo.push(item.chargeBillNo);
              });
              billNo.forEach(function (item1, index) {
                _this.tableData.forEach(function (item2, index) {
                  if (item1 === item2.chargeBillNo) {
                    obj.push(item2);
                  }
                });
              });
              api.post(this.apiPath.hrsc.updateBillChargeState, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                }
              });
            }
          });
        } else {
          this.$alert('请选择其中一项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      fileError () {
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      upBankData () {
        // if (this.modifyAndAddForm.fileName === '') {
        //   this.$alert('请选择文件！', '提示信息', {
        //     confirmButtonText: '确 定',
        //     type: 'warning',
        //     dragFlag: true,
        //     customClass: '', // 添加class
        //     lockScroll: true
        //   });
        //   return false;
        // }
        api.postsign(this.apiPath.hrsc.importInvInfoExcel, this.modifyAndAddData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.importVisible = true;
            this.modifyAndAddForm = res.data;
            this.modifyAndAdd = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 发布退回--确定
      submitBackForm () {
        this.releaseDackData.publishRetReason = this.backForm.publishRetReason;
        api.post(this.apiPath.hrsc.updatePublishRetState, this.releaseDackData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.backFormFlag = false;
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 发票信息--确定
      invoiceEnter () {
        this.invoiceFlag = false;
      },
      // 取消开票
      cancelBillFun () {
        this.cancelBillAdd = true;
      },
      // 取消开票 ---> 确定
      cancelBillSubmitFun () {
        this.$refs.cancelBillForm.validate((valid) => {
          let _this = this;
          _this.cancelBillForm.cancelInvTime = Vue.filter('date')(_this.cancelBillForm.cancelInvTime, 'yyyy-MM-dd');
          if (this.ids) {
            let obj = {};
            obj.billId = itemData.chargeBillId;
            obj.custorsuppType = itemData.type;
            obj.drawerState = itemData.drawerState;
            obj.billNo = itemData.chargeBillNo;
            obj.invInfoId = this.ids;
            for (var key in _this.cancelBillForm) {
              obj[key] = _this.cancelBillForm[key];
            }
            this.choosedId.push(this.ids);
            console.log(this.choosedId);
            api.post(this.apiPath.hrsc.updateCancelDrawer, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.cancelBillAdd = false;
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
            this.ids = null;
            return;
          };
          checkedArr.forEach(function (item, index) {
            for (var key in _this.cancelBillForm) {
              item[key] = _this.cancelBillForm[key];
            }
            item['billId'] = item.chargeBillId;
            item['custorsuppType'] = item.type;
            item['billNo'] = item.chargeBillNo;
            delete item.type;
            delete item.chargeBillNo;
            delete item.chargeBillId;
          });
          api.post(this.apiPath.hrsc.updateCancelDrawerList, checkedArr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.cancelBillAdd = false;
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      // 邮寄弹层
      mailFun () {
        this.mailAdd = true;
      },
      mailSubmitFun () {
        this.$refs.mailForm.validate((valid) => {
          if (valid) {
            this.mailAdd = false;
          }
        });
      },
      // 领取弹层
      receiveFun () {
        this.receiveAdd = true;
      },
      receiveSubmitFun () {
        this.$refs.receiveForm.validate((valid) => {
          if (valid) {
            this.receiveAdd = false;
          }
        });
      },
      // 开票弹层
      billingFun (data) {
        this.billingAdd = true;
        this.billHang = data;
        billingDeterData1 = {};
        billingDeterData2 = {};
        billingDeterData3 = {};
        billingDeterData4 = {};
        for (var key in data) {
          if (key === 'proCharSinsAmo') {
            billingDeterData1.invSubName = '社保';
            billingDeterData1.amountMoney = data[key];
            billingDeterData1.edit = false;
            billingDeterData1.editDate = false;
            billingDeterData1.editSelect = false;
            billingDeterData1.editSelect2 = false;
            billingDeterData1.DrawerMan = this.userName;
            billingDeterData1.drawerTime = Vue.filter('date')(dDate, 'yyyy-MM-dd');
            this.billingData.push(billingDeterData1);
          }
          if (key === 'proCharAccuAmo') {
            billingDeterData2.invSubName = '公积金';
            billingDeterData2.amountMoney = data[key];
            billingDeterData2.edit = false;
            billingDeterData2.editDate = false;
            billingDeterData2.editSelect = false;
            billingDeterData2.editSelect2 = false;
            billingDeterData2.DrawerMan = this.userName;
            billingDeterData2.drawerTime = Vue.filter('date')(dDate, 'yyyy-MM-dd');
            this.billingData.push(billingDeterData2);
          }
          if (key === 'proPayWageAmo') {
            billingDeterData3.invSubName = '工资';
            billingDeterData3.amountMoney = data[key];
            billingDeterData3.edit = false;
            billingDeterData3.editDate = false;
            billingDeterData3.editSelect = false;
            billingDeterData3.editSelect2 = false;
            billingDeterData3.DrawerMan = this.userName;
            billingDeterData3.drawerTime = Vue.filter('date')(dDate, 'yyyy-MM-dd');
            this.billingData.push(billingDeterData3);
          }
          if (key === 'serveAmo') {
            billingDeterData4.invSubName = '服务费';
            billingDeterData4.amountMoney = data['serveAmo'];
            billingDeterData4.edit = false;
            billingDeterData4.editDate = false;
            billingDeterData4.editSelect = false;
            billingDeterData4.editSelect2 = false;
            billingDeterData4.DrawerMan = this.userName;
            billingDeterData4.drawerTime = Vue.filter('date')(dDate, 'yyyy-MM-dd');
            this.billingData.push(billingDeterData4);
          }
        }
      },
      //  操作---》 发票信息
      invoiceFun (data) {
        itemData = data;
        api.post(this.apiPath.hrsc.findInvInfo, data).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.length) {
              this.invoiceFlag = true;
              this.remiSeeList = res.data;
              return;
            }
            this.$alert('暂无发票信息', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 开票信息弹层 --》确定
      billingSubmitFun () {
        this.$refs.billingForm.validate((valid) => {
          let _this = this;
          this.tableData.forEach(function (item1, index) {
            if (item1.chargeBillNo === _this.billHang.chargeBillNo) {
              itemData = item1;
            }
          });
          if (this.billingForm.id !== 2) {
            this.determineSentData.billId = itemData.chargeBillId;
            this.determineSentData.billNo = itemData.chargeBillNo;
            this.determineSentData.custorsuppType = itemData.type;
            // this.determineSentData.billType = itemData.billType;
            let sendData = [];
            sendData.push(billingDeterData1, billingDeterData2, billingDeterData3, billingDeterData4);
            sendData.forEach(function (item, index) {
              for (var key in _this.determineSentData) {
                item[key] = _this.determineSentData[key];
                item['billType'] = _this.billingForm.id;
                // item['drawerTime'] = Vue.filter('date')(dDate, 'yyyy-MM-dd');
              }
              if (item['invTypeName'] == '普票') {
                item['invType'] = _this.invoiceOptions[0].id;
              };
              if (item['invTypeName'] == '专票') {
                item['invType'] = _this.invoiceOptions[1].id;
              };
            });
            api.post(this.saveInvInfo, sendData).then(res => {
              if (res.code === 'CPYY-00001') {
                this.billingAdd = false;
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.receipt.billId = itemData.chargeBillId;
            this.receipt.billNo = itemData.chargeBillNo;
            this.receipt.custorsuppType = itemData.type;
            this.receipt.billType = _this.billingForm.id;
            this.receiptData.push(this.receipt);
            api.post(this.saveInvInfo, this.receiptData).then(res => {
              if (res.code === 'CPYY-00001') {
                this.billingAdd = false;
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 下载模版
      download () {
        let _this = this;
        // api.postsign(_this.apiPath.hrsc.bankCardDownTemplate, 'f12f4e47e3ce467f8e9cae07b3441865').then(res => {
        //   if (res.code === 'CPYY-00001') {
        //     api.download(res.data);
        //   }
        // }).catch(err => {
        //   console.log(err);
        // });
        // 下载模板
        api.post(_this.apiPath.hrsc.getInvModelExcel, _this.billSuppCustFrom).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll: function () {
        this.getList('all');
      },
      searchFun () {
        this.page.pageNum = 1;
        this.billSuppCustFrom.creYm = Vue.filter('date')(this.billSuppCustFrom.creYm, 'yyyy-MM');
        this.getList();
      },
      getList (all) {
        let obj = {};
        obj.data = this.billSuppCustFrom;
        if (all) {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.findBillCharge, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
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
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      dialogClose: function (formName) { // 修改对话框打开回调
        this.$refs[formName].resetFields();
      },
      billingAddClose: function (formName) { // 开票弹层关闭
        this.billingData = [];
        this.$refs[formName].resetFields();
      },
      invoiceContent () {}
    }
  };
</script>
