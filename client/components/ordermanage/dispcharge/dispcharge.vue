<template>
  <!--一次性收费管理-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="一次性收费查询"></sino-title>
        <sino-form :model="dispQueryForm" ref="dispQueryForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li>
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="dispQueryForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="dispQueryForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="executeAreaName">
                  <sino-select :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :token="token"
                               :isGroup="false"
                               :url="areaUrl"
                               :data="{data: {areaId: '',title:''}}"
                               :chooseName.sync="dispQueryForm.executeAreaName"
                               :chooseId.sync="dispQueryForm.executeAreaId"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="服务内容：" class="search-inner-item" prop="prodPriceScheName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               dispQueryForm                    :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :token="token"
                               :url="serviceUrl"
                               :data="{title: ''}"
                               :chooseName.sync="dispQueryForm.prodPriceScheName"
                               :chooseId.sync="dispQueryForm.prodPriceScheId"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <sino-collapse-transition>
                <div class="sino-translate" v-show="searchFlag">
                  <li class="search-inner-name">
                    <sino-form-item label="付费供应商：" class="search-inner-item" prop="payFeeSuppName">
                      <sino-select :filterable="true" class=""
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :token="token"
                                   :url="suppUrl"
                                   :chooseName.sync="dispQueryForm.payFeeSuppName"
                                   :chooseId.sync="dispQueryForm.payFeeSuppId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="search-inner-name">
                    <sino-form-item label="受托供应商：" class="search-inner-item" prop="execSuppName">
                      <sino-select :filterable="true" class=""
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :token="token"
                                   :url="suppUrl"
                                   :chooseName.sync="dispQueryForm.execSuppName"
                                   :chooseId.sync="dispQueryForm.execSuppId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid search-inner-name">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="custUrl"
                                   :chooseName.sync="dispQueryForm.custName"
                                   :chooseId.sync="dispQueryForm.custId"
                                   :clear="true"
                                   :token="token"
                                   class="multiple-choice"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="办理进度：" class="search-inner-item" prop="dispChargeStateName">
                      <sino-select :filterable="true" class=""
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :token="token"
                                   :url="dictSelUrl"
                                   :data="{code: 'DISP_CHARGE_STATE'}"
                                   :chooseName.sync="dispQueryForm.dispChargeStateName"
                                   :chooseId.sync="dispQueryForm.dispChargeState"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                </div>
              </sino-collapse-transition>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-button-box-1">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetForm('dispQueryForm')">重 置</sino-button>
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
      <!-- 列表 -->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="addEmpFun"><i class="iconfont sino-add"></i>按雇员新增</sino-button>
              <sino-button type="icon-text" @click="addCustFun"><i class="iconfont sino-add"></i>按客户新增</sino-button>
              <sino-button type="icon-text" @click="addBatchFun"><i class="iconfont sino-xinjianzhangdan"></i>批量新增</sino-button>
              <!--<sino-button type="icon-text" @click="exportFun"><i class="iconfont sino-export"></i>导出</sino-button>-->
            </div>
          </div>
          <sino-table :data="dispTableData" max-height="416" border v-on:viewAll="viewAll" stripe v-on:selection-change="selectCallBack">
            <!--<sino-table-column type="selection" min-width="40"></sino-table-column>-->
            <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
            <sino-table-column prop="dispChargeStateName" label="办理进度"></sino-table-column>
            <sino-table-column prop="prodPriceScheName" label="服务内容"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="150"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="chargeAmoTotal" label="收费金额" ></sino-table-column>
            <sino-table-column prop="busiYm" label="费用所属年月"  min-width="130"></sino-table-column>
            <sino-table-column prop="execAreaName" label="执行地区" min-width="150"></sino-table-column>
            <!--<sino-table-column prop="execSuppName" label="执行供应商" min-width="180"></sino-table-column>-->
            <!--<sino-table-column prop="chargeAmoTotal" label="收费合计" type="money" width="150"></sino-table-column>-->
            <!--<sino-table-column prop="feeAmoTotal" label="付费合计" type="money" width="150"></sino-table-column>-->
            <!--<sino-table-column prop="remark" label="备注" min-width="120"></sino-table-column>-->
            <!--<sino-table-column prop="creTime" label="创建时间" min-width="180"></sino-table-column>-->
            <!--<sino-table-column prop="creId" label="创建人"></sino-table-column>-->
            <sino-table-column label="操作" align="center" width="150" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)">查看</span><i v-if="scope.row.dispChargeState == 4 || scope.row.dispChargeState == 3" class="table-i">|</i>
                  <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.dispChargeState == 4 || scope.row.dispChargeState == 3">修改</span><i v-if="scope.row.dispChargeState == 4 || scope.row.dispChargeState == 3" class="table-i">|</i>
                  <span class="table-span" @click="delFun(scope.row)" v-if="scope.row.dispChargeState == 4 || scope.row.dispChargeState == 3">作废</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </div>
      </div>
      <!--按雇员新增-->
      <sino-dialog :visible.sync="addEmpFlag" :top="'5%'" class="dispcharge"  v-on:close="resetForm('addEmpForm')">
        <sino-title slot="title" type="levelOne" :title="isModify?'按雇员修改':'按雇员新增'" class="sino-dialog-title"></sino-title>
        <sino-form :model="addEmpForm" :rules="addEmpRules" ref="addEmpForm" class="demo-sendAddrAddForm clear mt15">
          <sino-form-item label="雇员姓名：" prop="empName" style="width: 47%;">
            <sino-input :disabled="isModify" v-model="addEmpForm.empName"></sino-input>
          </sino-form-item>
          <sino-form-item label="证件号码：" prop="certNo" style="width: 47%;">
            <sino-input :disabled="isModify" v-model="addEmpForm.certNo" @blur="queryOtherInfo"></sino-input>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" label="付费供应商：" prop="payFeeSuppName" style="width: 94%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         @contentChange="payFeeSuppNameChange"
                         :token="token"
                         :url="paySupUrl"
                         :data="{ title:''}"
                         :chooseName.sync="addEmpForm.payFeeSuppName"
                         :chooseId.sync="addEmpForm.payFeeSuppId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" label="客户名称：" prop="custName" style="width: 94%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         :url="custNameUrl"
                         :data="isDispatchPar"
                         :linkage="true"
                         :chooseName.sync="addEmpForm.custName"
                         :chooseId.sync="addEmpForm.custId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="服务内容：" prop="prodPriceScheName" style="width: 47%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         :url="serviceUrl"
                         :data="{title: ''}"
                         :chooseName.sync="addEmpForm.prodPriceScheName"
                         :chooseId.sync="addEmpForm.prodPriceScheId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="收费金额：" style="height:27px;width: 47%;" prop="chargeAmoTotal">
            <sino-input v-model.number="addEmpForm.chargeAmoTotal" class="before"></sino-input>
          </sino-form-item>
          <sino-form-item label="费用所属年月：" prop="chargeBegYm" style="width: 47%;">
            <sino-date-picker
              v-model="addEmpForm.chargeBegYm"
              type="month"
              :editable="false"
              :readonly="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="账单年月：" prop="busiYm" style="width: 47%;">
            <sino-date-picker
              v-model="addEmpForm.busiYm"
              type="month"
              :editable="false"
              :readonly="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" label="受托供应商：" prop="execSuppName" style="width: 94%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         @contentChange="execSuppChange"
                         :url="suppUrl"
                         :token="token"
                         :chooseName.sync="addEmpForm.execSuppName"
                         :chooseId.sync="addEmpForm.execSuppId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item prop="execAreaName" label="执行地区：" style="width: 47%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         :url="addAreaUrl"
                         :data="{id : '', title:''}"
                         :chooseName.sync="addEmpForm.execAreaName"
                         :chooseId.sync="addEmpForm.execAreaId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item prop="feeAmoTotal" v-if="addEmpForm.execSuppId != compId" label="付费金额：" style="height:27px;width: 46%;">
            <sino-input v-model.number="addEmpForm.feeAmoTotal" class="before"></sino-input>
          </sino-form-item>
          <sino-form-item prop="isPush" v-if="addEmpForm.execSuppId == compId" label="  " style="height:27px;width: 46%;">
            <sino-checkbox v-model="addEmpForm.isPush">经办员办理</sino-checkbox>
          </sino-form-item>
          <sino-form-item label="账单生成方式：" prop="createType" style="width: 47%;">
            <sino-radio-group v-model="addEmpForm.createType">
              <sino-radio :label="1">单独生成</sino-radio>
              <sino-radio :label="0">进雇员账单</sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-form-item label="支付金额：" v-if="addEmpForm.isPush" prop="payAmoTotal" style="width: 46%;">
            <sino-input v-model.number="addEmpForm.payAmoTotal" class="before"></sino-input>
          </sino-form-item>
          <sino-form-item prop="remark" label="备注：" class="sino-form-item-width" style="width: 94%;">
            <sino-input type="textarea" v-model="addEmpForm.remark"></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" v-if="!isModify" @click="addEmpSubmit('addEmpForm')">确 定</sino-button>
          <sino-button type="primary" v-if="isModify" @click="submitForm('addEmpForm')">修 改</sino-button>
      </span>
      </sino-dialog>
      <!--按客户新增-->
      <sino-dialog :visible.sync="addCustFlag" :top="'5%'" class="dispcharge"  v-on:close="resetForm('addCustForm')">
        <sino-title slot="title" type="levelOne" :title="isModify?'按客户修改':'按客户新增'" class="sino-dialog-title"></sino-title>
        <sino-form :model="addCustForm" :rules="addCustRules" ref="addCustForm" class="demo-sendAddrAddForm clear mt15">
          <sino-form-item class="sino-form-item-width" label="付费供应商：" prop="payFeeSuppName" style="width: 94%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         @contentChange="payFeeSuppChangeByctm"
                         :url="paySupUrl"
                         :data="{title:''}"
                         :chooseName.sync="addCustForm.payFeeSuppName"
                         :chooseId.sync="addCustForm.payFeeSuppId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" label="客户名称：" prop="custName" style="width: 94%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         :linkage="true"
                         :url="custNameUrl"
                         :data="isDispatchParByCustom"
                         :chooseName.sync="addCustForm.custName"
                         :chooseId.sync="addCustForm.custId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="服务内容：" prop="prodPriceScheName" style="width: 47%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :token="token"
                         :isGroup="false"
                         :url="serviceUrl"
                         :data="{title: ''}"
                         :chooseName.sync="addCustForm.prodPriceScheName"
                         :chooseId.sync="addCustForm.prodPriceScheId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="收费金额：" style="height:27px;width: 47%;" prop="chargeAmoTotal">
            <sino-input v-model.number="addCustForm.chargeAmoTotal" class="before"></sino-input>
          </sino-form-item>
          <sino-form-item label="费用所属年月：" prop="chargeBegYm" style="width: 47%;">
            <sino-date-picker
              v-model="addCustForm.chargeBegYm"
              type="month"
              :editable="false"
              :readonly="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="账单年月：" prop="busiYm" style="width: 47%;">
            <sino-date-picker
              v-model="addCustForm.busiYm"
              type="month"
              :editable="false"
              :readonly="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" label="受托供应商：" prop="execSuppName" style="width: 94%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         @contentChange="execSuppChangeByCustom"
                         :token="token"
                         :url="suppUrl"
                         :chooseName.sync="addCustForm.execSuppName"
                         :chooseId.sync="addCustForm.execSuppId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item prop="execAreaName" label="执行地区：" style="width: 47%;">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="isModify"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="addAreaUrl"
                         :token="token"
                         :data="{id : '', title:''}"
                         :chooseName.sync="addCustForm.execAreaName"
                         :chooseId.sync="addCustForm.execAreaId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item prop="feeAmoTotal" v-if="addCustForm.execSuppId != compId" label="付费金额：" style="height:27px;width: 46%;">
            <sino-input v-model.number="addCustForm.feeAmoTotal" class="before"></sino-input>
          </sino-form-item>
          <sino-form-item prop="isPush" v-if="addCustForm.execSuppId == compId" label="  " style="height:27px;width: 46%;">
            <sino-checkbox v-model="addCustForm.isPush">经办员办理</sino-checkbox>
          </sino-form-item>
          <sino-form-item label="账单生成方式：" prop="createType" style="width: 47%;">
            <sino-radio-group v-model="addCustForm.createType">
              <sino-radio :label="1">单独生成</sino-radio>
              <sino-radio :label="0">进雇员账单</sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-form-item label="支付金额：" v-if="addCustForm.isPush" prop="payAmoTotal" style="width: 46%;">
            <sino-input v-model.number="addCustForm.payAmoTotal" class="before"></sino-input>
          </sino-form-item>
          <sino-form-item prop="remark" label="备注：" class="sino-form-item-width" style="width: 94%;">
            <sino-input type="textarea" v-model="addCustForm.remark"></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" v-if="!isModify" @click="addCustSubmit('addCustForm')">确 定</sino-button>
          <sino-button type="primary" v-if="isModify" @click="submitForm('addCustForm')">修 改</sino-button>
      </span>
      </sino-dialog>
      <!--查看-->
      <sino-dialog :visible.sync="seeFlag" dialogHide top="5%" v-on:close="resetForm('seeForm')">
        <sino-title slot="title" type="levelOne" title="查看详情" class="sino-dialog-title"></sino-title>
        <sino-title type="levelTwo" title="基本信息"></sino-title>
        <div class="usermanagement-list mt15">
          <ul class="usermanagement-ul">
            <li>
              <h6>雇员姓名</h6><input readonly v-model="seeForm.empName">
            </li>
            <li>
              <h6>证件号码</h6><input readonly v-model="seeForm.certNo">
            </li>
            <li class="li-last">
              <h6>付费供应商</h6><input readonly v-model="seeForm.payFeeSuppName">
            </li>
            <li class="li-last">
              <h6>客户名称</h6><input readonly v-model="seeForm.custName">
            </li>
            <li class="li-last">
              <h6>受托供应商</h6><input readonly v-model="seeForm.execSuppName">
            </li>
            <li>
              <h6>服务内容</h6><input readonly v-model="seeForm.prodPriceScheName">
            </li>
            <li>
              <h6>支付进度</h6><input readonly v-model="seeForm.dispChargeState">
            </li>
            <li>
              <h6>执行地区</h6><input readonly v-model="seeForm.execAreaName">
            </li>
            <li>
              <h6>收费金额</h6><input readonly v-model="seeForm.chargeAmoTotal">
            </li>
            <li>
              <h6>费用所属年月</h6><input readonly v-model="seeForm.chargeBegYm">
            </li>
            <li>
              <h6>支付金额</h6><input readonly v-model="seeForm.payAmoTotal">
            </li>
            <li class="li-last">
              <h6>账单年月</h6><input readonly v-model="seeForm.busiYm">
            </li>
            <li class="li-last">
              <h6>备注</h6><input readonly v-model="seeForm.remark">
            </li>
          </ul>
        </div>
        <sino-title type="levelTwo" class="clear mt15" title="办理情况"></sino-title>
        <div class="usermanagement-list mt15" style="border: none">
          <ul class="dispchargeHandle-ul">
            <li class="dispchargeHandle-li" :key="index" v-for="(item,index) in dispchargeHandleList">
              <span :class="{active : !item.active}"><i></i></span>
              <p><span>{{item.date}}</span><b>{{item.title}}</b></p>
            </li>

          </ul>
        </div>

        <!--<span slot="footer" class="dialog-footer" v-if="!isModify">-->
           <!--<sino-button type="primary" @click="submitForm">修  改</sino-button>-->
        <!--</span>-->
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  function switchDateMonth (monthValue) {
    if (monthValue) {
      let date = (monthValue + '').split('');
      date.splice(4, 0, '-');
      return date.join('');
    } else {
      return  '';
    }
  }
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import vald from '../../../validator/index.js';
  import Vue from 'vue';

  export default {
    components: {},
    data () {
      return {
        paySupUrl: this.apiPath.hrsc.findByTokenSelectbox,
        custNameUrl: this.apiPath.hrsc.findCustInfoSelectBoxBySuppInfoId,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.selectBoxSuppBusiArea,
        addAreaUrl: this.apiPath.hrsc.findSuppBusiAreaBySuppId,
        serviceUrl: this.apiPath.hrsc.findPriceSelectBoxByPayFre,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox,  // g
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        routerView: false,
        token: Cookie.get("Token"),
        searchFlag: false,
        dispQueryForm: {
          empName: '',
          certNo: '',
          executeAreaName: '',
          executeAreaId: '',
          prodPriceScheName: '',
          prodPriceScheId: '',
          payFeeSuppName: '',
          payFeeSuppId: '',
          execSuppName: '',
          execSuppId: '',
          custName: '',
          custId: '',
          dispChargeStateName: '',
          dispChargeState: ''
        },
        dispchargeHandleList: [
          {title: '8ds789732usdasjhjsdk', date: '2018-4-9 ', active: true},
          {title: '8ds789732usdasjhjsdk', date: '2018-4-9 ', active: false},
          {title: '8ds789732usdasjhjsdk', date: '2018-4-9', active: false}
        ],
        dispTableData: null,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        checkedArr: [],
        seeFlag: false,
        isModify: false,
        isModifyTitle: '',
        seeForm: {},
        addEmpFlag: false,
        addEmpForm: {
          'empName': '',
          'certNo': '',
          'payFeeSuppId': '',
          'payFeeSuppName': '',
          'dispChargeType': 1,
          'custId': '',
          'custName': '',
          'prodPriceScheId': '',
          'prodPriceScheName': '',
          'sugPrice': '',
          'execSuppId': '',
          'execSuppName': '',
          'payAmoTotal': '',
          'execAreaId': '',
          'execAreaName': '',
          'feeAmoTotal': '',
          'chargeAmoTotal': '',
          'busiYm': '',
          'chargeBegYm': '',
          'isPush': false,
          'remark': '',
          createType: 1
        },
        addEmpRules: {
          empName: [
            { required: true, message: '请输入雇员姓名', trigger: 'change' }
          ],
          certNo: [
            { required: true, message: '请输入证件号码', trigger: 'change' }
          ],
          payFeeSuppName: [
            { required: true, message: '请选择付费供应商', trigger: 'change' }
          ],
          custName: [
            { required: true, message: '请选择客户名称', trigger: 'change' }
          ],
          prodPriceScheName: [
            { required: true, message: '请选择服务内容', trigger: 'change' }
          ],
          execSuppName: [
            { required: true, message: '请选择受托供应商', trigger: 'change' }
          ],
          execAreaName: [
            { required: true, message: '请选择执行地区', trigger: 'change' }
          ],
          chargeAmoTotal: [
            { type: 'number', required: true, message: '请输入收费金额，且为数字类型', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          // chargeAmoTotal: [
          //   { type: 'number', required: true, message: '请输入付费金额，且为数字类型', trigger: 'change' },
          //   {validator: vald.checkNum, trigger: 'change'}
          // ],
          busiYm: [
            { type: 'date', required: true, message: '请选择账单年月', trigger: 'change' }
          ],
          chargeBegYm: [
            { type: 'date', required: true, message: '请选择费用所属年月为必填项', trigger: 'change' }
          ],
          createType: [
            { type: 'number', required: true, message: '请选择账单生成方式', trigger: 'change' }
          ]

        },
        addCustFlag: false,
        addCustForm: {
          'payFeeSuppId': '',
          'payFeeSuppName': '',
          'dispChargeType': 2,
          'custId': '',
          'custName': '',
          'prodPriceScheId': '',
          'prodPriceScheName': '',
          'sugPrice': '',
          'execSuppId': '',
          'execSuppName': '',
          'payAmoTotal': '',
          'execAreaId': '',
          'execAreaName': '',
          'feeAmoTotal': '',
          'chargeAmoTotal': '',
          'busiYm': '',
          'chargeBegYm': '',
          'isPush': false,
          'remark': '',
          createType: 1
        },
        addCustRules: {
          payFeeSuppName: [
            { required: true, message: '请选择付费供应商', trigger: 'change' }
          ],
          custName: [
            { required: true, message: '请选择客户名称', trigger: 'change' }
          ],
          prodPriceScheName: [
            { required: true, message: '请选择服务内容', trigger: 'change' }
          ],
          execSuppName: [
            { required: true, message: '请选择受托供应商', trigger: 'change' }
          ],
          execAreaName: [
            { required: true, message: '请选择执行地区', trigger: 'change' }
          ],
          chargeAmoTotal: [
            { type: 'number', required: true, message: '请输入收费金额，且为数字类型', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          // chargeAmoTotal: [
          //   { type: 'number', required: true, message: '请输入付费金额，且为数字类型', trigger: 'change' },
          //   {validator: vald.checkNum, trigger: 'change'}
          // ],
          busiYm: [
            { type: 'date', required: true, message: '请选择账单年月', trigger: 'change' }
          ],
          chargeBegYm: [
            { type: 'date', required: true, message: '请选择费用所属年月', trigger: 'change' }
          ],
          createType: [
            { type: 'number', required: true, message: '请选择账单生成方式', trigger: 'change' }
          ]
          // isPush: [
          //   { required: true, message: '请选择经办员办理', trigger: 'change' }
          // ]
        },
        compId: Cookie.get("CorpId"), // 公司id
        isPayMoney: true, // 是否付费金额
        isPayMoneyByCustom: true, // 是否付费金额by客户
        // isDispatchUrl: '',
        isDispatchPar: {creSuppId: '', title: ''},
        // isDispatchUrlByCustom: '',
        isDispatchParByCustom: {creSuppId: '', title: ''}
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/dispCharge") {
            this.routerView = false;
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
      ruoteJudge () {
        if (this.$route.path !== "/dispCharge") {
          this.routerView = true;
        }
      },
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.dispQueryForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.hrsc.getDispchargeManage, data).then(res => {
          this.dispTableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 按雇员新增
      addEmpFun () {
        this.addEmpFlag = true;
        this.isModify = false;
      },
      // 受托供应商
      execSuppChange (item) {
        if (item.id != this.compId) {
          this.addEmpForm.isPush = "";
          this.addEmpForm.payAmoTotal = '';
        }
      },
      // 受托供应商
      execSuppChangeByCustom (item) {
        if (item.id != this.compId) {
          this.addCustForm.isPush = "";
          this.addCustForm.payAmoTotal = '';
        }
      },
      // 按照身份证查出连带信息
      queryOtherInfo () {
        api.post(this.apiPath.hrsc.getOrderByEmpNameAndCertNo, {certNo: this.addEmpForm.certNo, empName: this.addEmpForm.empName, certType: '1'}).then(res => {
          if (res.code === 'CPYY-00001' && res.data) {
            // this.addEmpForm.uniqNo = res.data.uniqNo;
            this.addEmpForm.payFeeSuppId = res.data.paySuppId;
            this.addEmpForm.payFeeSuppName = res.data.paySuppName;
            this.addEmpForm.custId = res.data.custId;
            this.addEmpForm.custName = res.data.custName;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 付费供应商改变
      payFeeSuppNameChange (item) {
        // this.isDispatchUrl = this.custNameUrl;
        this.isDispatchPar = {creSuppId: item.id, title: ''};
        // api.post(this.apiPath.hrsc.findCustInfoSelectBoxBySuppInfoId, { creSuppId: item.id, title: '' }).then(res => {
        //   if (res.code === 'CPYY-00001' && res.data) {
        //     debugger;
        //     // this.addEmpForm.uniqNo = res.data.uniqNo;
        //     this.addEmpForm.custId = res.data.custId;
        //     this.addEmpForm.custName = res.data.custName;
        //   }
        // }).catch(err => {
        //   console.log(err);
        // });
      },
      payFeeSuppChangeByctm (item) {
        // this.isDispatchUrlByCustom = this.custNameUrl;
        this.isDispatchParByCustom = {creSuppId: item.id, title: ''};
      },
      // 按雇员新增确认
      addEmpSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = JSON.parse(JSON.stringify(this.addEmpForm));
            params.busiYm = Vue.filter('date')(params.busiYm, 'yyyyMM');
            params.chargeBegYm = Vue.filter('date')(params.chargeBegYm, 'yyyyMM');
            params.dispChargeType = 1;
            params.isPush = params.isPush ? 1 : 0;
            api.post(this.apiPath.hrsc.saveByCustom, params).then(res => {
              if (res.code === 'CPYY-00001') {
                this.addEmpFlag = false;
                this.searchFun();
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          };
        });
      },
      // 按客户新增
      addCustFun () {
        this.addCustFlag = true;
        this.isModify = false;
      },
      // 按客户新增确认
      addCustSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = JSON.parse(JSON.stringify(this.addCustForm));
            params.busiYm = Vue.filter('date')(params.busiYm, 'yyyyMM');
            params.chargeBegYm = Vue.filter('date')(params.chargeBegYm, 'yyyyMM');
            params.dispChargeType = 2;
            params.isPush = params.isPush ? 1 : 0;
            api.post(this.apiPath.hrsc.saveByCustom, params).then(res => {
              if (res.code === 'CPYY-00001') {
                this.addCustFlag = false;
                this.searchFun();
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          };
        });
      },
      // 批量新增
      addBatchFun () {
        this.routerView = true;
        this.$router.push({path: '/dispCharge/batchAdd'});
      },
      // 导出
      exportFun () {
        this.$message({message: '导出成功！', type: 'success'});
      },
      // 查看
      seeFun (data) {
        api.post(this.apiPath.hrsc.findDispchargeById, {dispChargeId: data.dispChargeId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeFlag = true;
            // this.isModify = true;
            // this.isModifyTitle = '查看详情';
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看modifyFun
      modifyFun (data) {
        api.post(this.apiPath.hrsc.findDispchargeById, {dispChargeId: data.dispChargeId}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.dispChargeType == '1') {
              this.addEmpFlag = true;
              this.isModify = true;
              this.addEmpForm = res.data;
              this.addEmpForm.isPush = this.addEmpForm.isPush == '1';
              this.addEmpForm.chargeBegYm = switchDateMonth(this.addEmpForm.chargeBegYm);
              this.addEmpForm.busiYm = switchDateMonth(this.addEmpForm.busiYm);
            } else if (res.data.dispChargeType == '2') {
              this.addCustFlag = true;
              this.isModify = true;
              this.addCustForm = res.data;
              this.addCustForm.isPush = this.addEmpForm.isPush == '1';
              this.addCustForm.chargeBegYm = switchDateMonth(this.addCustForm.chargeBegYm);
              this.addCustForm.busiYm = switchDateMonth(this.addCustForm.busiYm);
            };
            // this.seeFlag = true;
            // this.isModify = false;
            // this.isModifyTitle = '修改详情';
            // this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 提交修改数据
      submitForm (formName) {
        let data = {
          dispChargeType: this[formName].dispChargeType,
          dispChargeId: this[formName].dispChargeId,
          chargeAmoTotal: this[formName].chargeAmoTotal,
          busiYm: Vue.filter('date')(this[formName].busiYm, 'yyyyMM'),
          chargeBegYm: Vue.filter('date')(this[formName].chargeBegYm, 'yyyyMM'),
          payAmoTotal: this[formName].payAmoTotal,
          dispChargeState: this[formName].dispChargeState,
          createType: this[formName].createType,
          isPush: this[formName].isPush ? 1 : 0,
          remark: this[formName].remark
        };
        // this.addEmpForm.isPush = this.addEmpForm.isPush ? 1 : 0;
        api.post(this.apiPath.hrsc.findDispchargeModify, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            if (this[formName].dispChargeType == '1') {
              this.addEmpFlag = false;
            } else if (this[formName].dispChargeType == '2') {
              this.addCustFlag = false;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 作废
      delFun (data) {
        this.$confirm('认作废该费用吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          let param = {
            dispChargeId: data.dispChargeId,
            isPush: data.isPush,
            dispChargeState: data.dispChargeState
          };
          api.post(this.apiPath.hrsc.findDispchargeCencel, param).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '费用已作废！', type: 'success'});
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
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
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>


