<template>
  <!--在职管理单个维护-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item is-active">单个维护</div>
            <div class="sino-tabs-item" @click="prodScheFun">批量维护</div>
          </div>
        </div>
      </div>
      <sino-con class="sino-con-more">
        <sino-form :model="jobsingleForm" ref="jobsingleForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="jobsingleForm.empName"
                              :disabled="false" placeholder="输入姓名或者唯一号"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="jobsingleForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <sino-collapse-transition>
                <div class="sino-translate" v-if="searchFlag">
                  <li class="li-wid">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custIdName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCustSelectInfo"
                                   :token="token"
                                   :chooseName.sync="jobsingleForm.custIdName"
                                   :chooseId.sync="jobsingleForm.custId"
                                   @change="custChange"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid">
                    <sino-form-item label="产品服务模板：" class="search-inner-item" prop="prodServeTempName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findServeTempSelectBox"
                                   :linkage="true"
                                   :data="tempData"
                                   :chooseName.sync="jobsingleForm.prodServeTempName"
                                   :chooseId.sync="jobsingleForm.prodServeTempId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid">
                    <sino-form-item label="商务合同：" class="search-inner-item" prop="conName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="coninfoSelectBox"
                                   :linkage="true"
                                   :data="conData"
                                   :chooseName.sync="jobsingleForm.conName"
                                   :chooseId.sync="jobsingleForm.conId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="成本中心：" class="search-inner-item" prop="costCentName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCostCentSelectBox"
                                   :chooseName.sync="jobsingleForm.costCentName"
                                   :chooseId.sync="jobsingleForm.costCentId"

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
              <sino-button class="ressetButton" @click="resetFun('jobsingleForm')" v-if="searchFlag">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
          <div class="search-more">
            <div @click="searchFlag = !searchFlag">
              <i class="iconfont"
                 :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
              <span v-if="!searchFlag">高级查询</span>
              <span v-if="searchFlag">基本查询</span>
            </div>
          </div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <sino-table :data="jobsingleData" class="mail-table mt15" border max-height="416" stripe
                      v-on:viewAll="viewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="105"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="orderStateName" label="订单操作状态" min-width="120"></sino-table-column>
            <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="120"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="signSuppName" label="签约供应商简称" min-width="150"></sino-table-column>
            <sino-table-column prop="paySuppName" label="付费供应商简称" min-width="150"></sino-table-column>
            <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
            <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
            <sino-table-column label="操作" align="center" width="200" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="updateFun(scope.row)">订单修改</span><i class="table-i"
                                                                                       v-if="scope.row.orderState === 1">|</i>
                  <span class="table-span" v-if="scope.row.orderState === 1" @click="leafFun(scope.row)">撤离</span><i
                  class="table-i" v-if="scope.row.orderState === 2">|</i>
                  <span class="table-span" v-if="scope.row.orderState === 2" @click="cancelFun(scope.row)">取消撤离</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                     :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                     :total="total"></sino-page>
        </div>
      </div>
      <!--订单修改-->
      <sino-dialog :visible.sync="orderUpdateFlag" :top="'10%'">
        <sino-title slot="title" type="levelOne" title="选择修改内容" class="sino-dialog-title "></sino-title>
        <sino-title type="levelTwo" title="订单明细修改"></sino-title>
        <ul class="orderupdate-ul">
          <input type="hidden" v-model="orderOrderId">
          <li @click="serveUpdateFun">
            <span>服务费金额</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
          <li @click="dateUpdate">
            <span>起/止做日期</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
          <!--功能未开发，暂时隐藏（20180606）-->
          <li @click="jobUpdateFlag = true" v-if="false">
            <span>申报基数</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
          <li @click="updateYM">
            <span>收/付费账单年月</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
          <!--功能未开发-->
          <li @click="tempChangeFlag = true" v-if="false">
            <span>产品服务模板</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
        </ul>
        <sino-title type="levelTwo" title="订单修改"></sino-title>
        <ul class="orderupdate-ul">
          <li @click="quitUpdateFlag = true">
            <span>离职原因</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
          <li @click="costUpdateFun">
            <span>成本中心</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
          <li @click="orderDateUpdate">
            <span>订单起/止日期</span>
            <i class="iconfont sino-qiandai"></i>
          </li>
        </ul>
      </sino-dialog>
      <!--修改服务金额-->
      <sino-dialog :visible.sync="serveUpdateFlag" v-on:close="resetFun('serveUpdateForm')" :top="'5%'">
        <sino-title slot="title" type="levelOne" title="修改服务费金额" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="serveUpdateForm" :rules="serveUpdateRules" ref="serveUpdateForm" class="leadsAdd-Form">
            <ul class="serveupdate-ul">
              <li class="serveupdate-li">
                <span>雇员姓名：</span>
                <input type="text" readonly v-model="serveUpdateForm.empName">
              </li>
              <li class="serveupdate-li">
                <span>证件号码：</span>
                <input type="text" readonly v-model="serveUpdateForm.certNo">
              </li>
              <li class="serveupdate-li">
                <span>订单日期：</span>
                <em class="em-color">{{serveUpdateForm.orderBegDate}}</em>
                <em>至</em>
                <em class="em-color">{{serveUpdateForm.orderEndDate}}</em>
              </li>
            </ul>
            <sino-title type="levelTwo" title="基础服务" class="mb15 clear"></sino-title>
            <sino-auto-table :data="serveTable" :row-style="showTr" border max-height="235" stripe
                             v-on:viewAll="serveUpdateQuery">
              <sino-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text"
                                 min-width="120">
                <template scope="scope">
                  <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level"
                        class="ms-tree-space" :key="index"></span>
                  <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)"
                        @click="toggle(scope.$index)">
                <i v-if="!scope.row._expanded" class="iconfont sino-wenjianjia1" aria-hidden="true"></i>
                <i v-if="scope.row._expanded" class="iconfont sino-wenjianjia" aria-hidden="true"></i>
              </span>
                  {{scope.row[column.dataIndex]}}
                </template>
              </sino-table-column>
              <sino-table-column label="收费金额" type="money" width="180" align="center">
                <template scope="scope">
                  <i class="fl money-i">￥</i>
                  <sino-input v-if="scope.row._level == 0" v-model="scope.row.chargeAmo"></sino-input>
                  <!--<span v-show="!scope.row.edit && scope.row._level == 0" @click="scope.row.edit = true">{{ scope.row.chargeAmo }}</span>-->
                  <span class="fr money-span" v-if="scope.row._level !== 0">{{scope.row.chargeAmo}}</span>
                </template>
              </sino-table-column>
              <sino-table-column label="付费金额" type="money" width="150" align="center">
                <template scope="scope">
                  <i class="fl money-i">￥</i>
                  <sino-input v-if="scope.row._level == 0" v-model="scope.row.payAmo"></sino-input>
                  <span class="fr money-span" v-if="scope.row._level !== 0">{{scope.row.payAmo}}</span>
                </template>

              </sino-table-column>
            </sino-auto-table>
            <sino-form-item label="生效日期：" prop="begDate" class="mt15">
              <sino-date-picker class="fl"
                                v-model="serveUpdateForm.begDate"
                                type="date"
                                :editable="false"
                                :picker-options="endDateFun"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="备注：" class="sino-form-item-width" prop="remark">
              <sino-input type="textarea" v-model="serveUpdateForm.remark" :disabled="false"></sino-input>
            </sino-form-item>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button @click="resetForm('serveUpdateForm')" class="mr10">重置</sino-button>
          <sino-button type="primary" @click="servUpdateSave">保 存</sino-button>
        </span>
      </sino-dialog>

      <!--修改起/止做日期-->
      <sino-dialog :visible.sync="dateUpdateFlag" dialogHide v-on:close="resetFun('dateUpdateForm')" :top="'5%'"
                   class="dialog-maxauto">
        <sino-title slot="title" type="levelOne" title="修改起/止做日期" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="dateUpdateForm" ref="dateUpdateForm" class="leadsAdd-Form">
            <ul class="serveupdate-ul">
              <li class="serveupdate-li">
                <span>雇员姓名：</span>
                <input type="text" readonly v-model="dateUpdateForm.empName">
              </li>
              <li class="serveupdate-li">
                <span>证件号码：</span>
                <input type="text" readonly v-model="dateUpdateForm.certNo">
              </li>
              <li class="serveupdate-li">
                <span>订单日期：</span>
                <em class="em-color">{{dateUpdateForm.orderBegDate}}</em>
                <em>至</em>
                <em class="em-color">{{dateUpdateForm.orderEndDate}}</em>
              </li>
            </ul>
            <div class="adminent-bor clear">
              <div class="dateupdate-error">
                <i class="iconfont sino-tip"></i><span>请先勾选需要修改的信息，再设置起做日期、止做日期。</span>
              </div>
              <sino-auto-table v-if="serveList&&serveList.length>0" :data="serveList" :row-style="dateShowTr" border stripe
                               v-on:viewAll="dateUpdateQuery" v-on:selection-change="serveSelection">
                <sino-table-column type="selection"></sino-table-column>
                <sino-table-column v-for="(column, index) in dateColumns" :key="column.dataIndex" :label="column.text"
                                   min-width="120" fixed="left">
                  <template scope="scope">
                    <span v-if="dateSpaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level"
                          class="ms-tree-space" :key="index"></span>
                    <span class="button is-outlined is-primary is-small" v-if="dateToggleIconShow(index,scope.row)"
                          @click="dateToggle(scope.$index)">
                <i v-if="!scope.row._expanded" class="iconfont sino-wenjianjia1" aria-hidden="true"></i>
                <i v-if="scope.row._expanded" class="iconfont sino-wenjianjia" aria-hidden="true"></i>
              </span>
                    {{scope.row[column.dataIndex]}}
                  </template>
                </sino-table-column>
                <sino-table-column label="起做日期" min-width="120">
                  <template scope="scope">
                    <span :class="{'colorGreen': !scope.row.colorFlag, 'colorRed': scope.row.colorFlag}"
                          v-text="scope.row.publishBegDate"></span>
                  </template>
                </sino-table-column>
                <sino-table-column label="止做日期">
                  <template scope="scope">
                    <span :class="{'colorGreen': !scope.row.colorEndFlag, 'colorRed': scope.row.colorEndFlag}"
                          v-text="scope.row.publishEndDate"></span>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-auto-table v-if="sinsList&&sinsList.length>0" :data="sinsList" :row-style="dateShowTr1" border stripe v-on:viewAll="dateUpdateQuery"
                               class="mt15" v-on:selection-change="sinsSelection">
                <sino-table-column type="selection"></sino-table-column>
                <sino-table-column label="社保明细" min-width="120" prop="prodProPayName"></sino-table-column>
                <sino-table-column label="起做日期" min-width="120">
                  <template scope="scope">
                    <span :class="{'colorGreen': !scope.row.colorFlag, 'colorRed': scope.row.colorFlag}"
                          v-text="scope.row.publishBegDate"></span>
                  </template>
                </sino-table-column>
                <sino-table-column label="止做日期">
                  <template scope="scope">
                    <span :class="{'colorGreen': !scope.row.colorEndFlag, 'colorRed': scope.row.colorEndFlag}"
                          v-text="scope.row.publishEndDate"></span>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-auto-table v-if="accuList&&accuList.length>0" :data="accuList" :row-style="dateShowTr2" border stripe v-on:viewAll="dateUpdateQuery"
                               class="mt15" v-on:selection-change="accuSelection">
                <sino-table-column type="selection"></sino-table-column>
                <sino-table-column label="公积金明细" min-width="120" prop="prodProPayName"></sino-table-column>
                <sino-table-column label="起做日期">
                  <template scope="scope">
                    <span :class="{'colorGreen': !scope.row.colorFlag, 'colorRed': scope.row.colorFlag}"
                          v-text="scope.row.publishBegDate"></span>
                  </template>
                </sino-table-column>
                <sino-table-column label="止做日期">
                  <template scope="scope">
                    <span :class="{'colorGreen': !scope.row.colorEndFlag, 'colorRed': scope.row.colorEndFlag}"
                          v-text="scope.row.publishEndDate"></span>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-form-item label="起做日期改为：" prop="publishBegDate" class="mt15">
                <sino-date-picker class="fl"
                                  v-model="dateUpdateForm.publishBegDate"
                                  type="date"
                                  :disabled="publishBegFlag"
                                  :editable="false"
                                  @change="publishBegChange"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
              <sino-form-item label="止做日期改为：" prop="publishEndDate" class="mt15">
                <sino-date-picker class="fl"
                                  v-model="dateUpdateForm.publishEndDate"
                                  type="date"
                                  :disabled="publishEndFlag"
                                  @change="publishEndChange"
                                  :editable="false"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </div>
            <div class="adminent-bor mt15 clear">
              <sino-form-item label="备注：" class="sino-form-item-width" prop="remark">
                <sino-input type="textarea" v-model="dateUpdateForm.remark" :disabled="false"></sino-input>
              </sino-form-item>
            </div>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button @click="resetDateForm('dateUpdateForm');" class="mr10">重置</sino-button>
          <sino-button type="primary" @click="dateUpdateSave">保 存</sino-button>
        </span>
      </sino-dialog>

      <!--更换产品服务模板-->
      <sino-dialog :visible.sync="tempChangeFlag" v-on:close="resetFun('tempChangeForm')" :top="'10%'">
        <sino-title slot="title" type="levelOne" title="更换产品服务模板" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="tempChangeForm" :rules="tempChangeRules" ref="tempChangeForm" class="leadsAdd-Form">
            <ul class="serveupdate-ul">
              <li class="serveupdate-li li-wid">
                <span>客户名称：</span>
                <input type="text" readonly value="贵阳市外企人力资源服务有限公司">
              </li>
              <li class="serveupdate-li li-wid">
                <span>现产品服务模板：</span>
                <input type="text" readonly value=" IBM_贵阳市_社保代缴服务费-大库A-市标准_公积金代缴">
              </li>
            </ul>
            <sino-form-item label="新产品服务模板：" class="sino-form-item-width mt10" prop="EffectDate">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findCustSelectInfo"
                           :token="token"
                           :chooseName.sync="tempChangeForm.custIdName"
                           :chooseId.sync="tempChangeForm.custId"
                           :clear="true"></sino-select>
            </sino-form-item>
            <sino-form-item label="生效日期：" prop="takeEffectDate">
              <sino-date-picker class="fl"
                                v-model="tempChangeForm.takeEffectDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>

            <div class="adminent-bor mt15 clear">
              <sino-form-item label="备注：" class="sino-form-item-width"  prop="clueDesc">
                <sino-input type="textarea" v-model="tempChangeForm.clueDesc" :disabled="false"></sino-input>
              </sino-form-item>
            </div>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button @click="resetForm('tempChangeForm')" class="mr10">重置</sino-button>
          <sino-button type="primary" @click="tempChangeSave">保 存</sino-button>
        </span>
      </sino-dialog>

      <!--修改申报基数-->
      <sino-dialog :visible.sync="jobUpdateFlag" v-on:close="resetFun('jobUpdateForm')" :top="'10%'">
        <sino-title slot="title" type="levelOne" title="修改申报基数" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="jobUpdateForm" :rules="jobUpdateRules" ref="jobUpdateForm" class="leadsAdd-Form">
            <sino-title type="levelTwo" title="社保信息" class="mb15"></sino-title>
            <sino-form-item label="参保险种：" class="sino-form-item-width" prop="sinsState">
              <sino-checkbox-group v-model="jobUpdateForm.sinsState" class="mt5">
                <sino-checkbox :label="list.id" v-for="(list, index) in sinsStateList" :key="index">{{list.title}}
                </sino-checkbox>
              </sino-checkbox-group>
            </sino-form-item>
            <sino-form-item label="社保申报基数：" prop="corpAddr">
              <sino-input v-model="jobUpdateForm.corpAddr" class="leads-addr-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="社保生效日期：" prop="perScaleName">
              <sino-date-picker class="fl"
                                v-model="jobUpdateForm.creEndDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-title type="levelTwo" title="公积金" class="clear mb15"></sino-title>
            <sino-form-item label="公积金申报基数：" prop="induTypeName">
              <sino-input v-model="jobUpdateForm.corpName" class="leads-company-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="公积金生效日期：" prop="perScaleName">
              <sino-date-picker class="fl"
                                v-model="jobUpdateForm.creEndDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="修改说明：" class="sino-form-item-width"  prop="clueDesc">
              <sino-input type="textarea" v-model="jobUpdateForm.clueDesc" :disabled="false"></sino-input>
            </sino-form-item>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div class="order-new">
            <i class="iconfont sino-tip"></i><span>社保申报基数和公积金申报基数至少选其一填写。</span>
          </div>
          <sino-button @click="resetForm('jobUpdateForm')" class="mr10">重置</sino-button>
          <sino-button type="primary" @click="updateSave">保 存</sino-button>
        </span>
      </sino-dialog>
      <!--修改离职原因-->
      <sino-dialog :visible.sync="quitUpdateFlag" @open="quitUpdateOpen" v-on:close="resetFun('quitUpdateForm')" :top="'5%'">
        <sino-title slot="title" type="levelOne" title="修改离职原图" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="quitUpdateForm" :rules="quitUpdateRules" ref="quitUpdateForm" class="leadsAdd-Form">
            <ul class="serveupdate-ul">
              <li class="serveupdate-li">
                <span>雇员姓名：</span>
                <input type="text" readonly :value="quitUpdateForm.empName">
              </li>
              <li class="serveupdate-li">
                <span>证件号码：</span>
                <input type="text" readonly :value="quitUpdateForm.certNo">
              </li>
            </ul>
            <sino-form-item label="离职原因：" class="mt10 " prop="revokeReasonName" :rules="{required: true, message: '离职原因为必填项', trigger: 'change'}">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="apiPath.hrsc.dimReasonDrop"
                           :token="token"
                           :linkage="true"
                           :data="quitSelectData"
                           :chooseName.sync="quitUpdateForm.revokeReasonName"
                           :chooseId.sync="quitUpdateForm.revokeReason"
                           @change="revokeReasonChange(quitUpdateForm.revokeReasonName)"
                           :clear="false"></sino-select>
              <span class="span-pos" @click="detailFlag = true" v-if="detailFlag === false && quitShowDetail">查看明细</span>
              <span class="span-pos" @click="detailFlag = false" v-if="detailFlag === true && quitShowDetail">隐藏明细</span>
            </sino-form-item>
            <sino-form-item label="订单结束日期：" class="mt10" prop="orderEndDate" v-if="showQuitOrderDate">
              <sino-date-picker class="fl"
                                v-model="quitUpdateForm.orderEndDate"
                                type="date"
                                :editable="false"
                                :readonly="disabledQuitOrderDate"
                                :clearable="false"
                                @change="quitOrderEndDate"
              >
              </sino-date-picker>
            </sino-form-item>
            <div class="dateupdate-error dateupdate-error-mar clear" v-if="false">
              <i class="iconfont sino-tip"></i><span class="span-color">请先勾选需要修改的信息，再设置起做日期、止做日期。</span>
            </div>
            <template v-if="detailFlag">
              <sino-auto-table :data="quitEditTable.serveList" border stripe class="quit-edit-table" :row-style="rowServeFun">
                <sino-table-column prop="prodName" label="基础服务"></sino-table-column>
                <sino-table-column prop="publishBegDate" label="起做日期"></sino-table-column>
                <sino-table-column label="止做日期">
                  <template scope="scope">
                    <!--, 'alr-edit': transFormData(scope.row.publishEndDate) !== transFormData(copyEditTable.serveList[scope.$index].publishEndDate)-->
                    <div class="quit-edit-box" :class="{'can-edit': scope.row.canEdit, 'alr-edit': !scope.row.flag}">
                      <sino-date-picker v-if="scope.row.canEdit" v-show="scope.row.editDate" v-model="scope.row.publishEndDate" type="date" class="quit-edit-date"
                                        :editable="false" :readonly="false" format="yyyy-MM-dd"
                                        :clearable="false" @blur="scope.row.editDate = false" @change="changePublishDate(scope, 'serveList')">
                      </sino-date-picker>
                      <span v-if="scope.row.canEdit" v-show="!scope.row.editDate" @click="scope.row.editDate = true" class="quit-edit-span">{{ scope.row.publishEndDate | capitalize}}</span>
                      <span v-if="!scope.row.canEdit" class="quit-edit-span">{{ scope.row.publishEndDate | capitalize}}</span>
                    </div>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-auto-table :data="quitEditTable.sinsList" border stripe class="mt15 quit-edit-table" :row-style="rowsinsFun">
                <sino-table-column prop="prodProPayName" label="社保明细"></sino-table-column>
                <sino-table-column prop="publishBegDate" label="起做日期"></sino-table-column>
                <sino-table-column label="止做日期">
                  <template scope="scope">
                    <div class="quit-edit-box" :class="{'can-edit': scope.row.canEdit, 'alr-edit': !scope.row.flag}">
                      <sino-date-picker v-if="scope.row.canEdit" v-show="scope.row.editDate" v-model="scope.row.publishEndDate" type="date" class="quit-edit-date"
                                        :editable="false" :readonly="false" format="yyyy-MM-dd"
                                        :clearable="false" @blur="scope.row.editDate = false" @change="changePublishDate(scope, 'sinsList')">
                      </sino-date-picker>
                      <span v-if="scope.row.canEdit" v-show="!scope.row.editDate" @click="scope.row.editDate = true" class="quit-edit-span">{{ scope.row.publishEndDate | capitalize}}</span>
                      <span v-if="!scope.row.canEdit" class="quit-edit-span">{{ scope.row.publishEndDate | capitalize}}</span>
                    </div>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-auto-table :data="quitEditTable.accuList" border stripe class="mt15 quit-edit-table" :row-style="rowaccuFun">
                <sino-table-column prop="prodProPayName" label="公积金明细"></sino-table-column>
                <sino-table-column prop="publishBegDate" label="起做日期"></sino-table-column>
                <sino-table-column label="止做日期">
                  <template scope="scope">
                    <div class="quit-edit-box" :class="{'can-edit': scope.row.canEdit, 'alr-edit': !scope.row.flag}">
                      <sino-date-picker v-if="scope.row.canEdit" v-show="scope.row.editDate" v-model="scope.row.publishEndDate" type="date" class="quit-edit-date"
                                        :editable="false" :readonly="false" format="yyyy-MM-dd"
                                        :clearable="false" @blur="scope.row.editDate = false" @change="changePublishDate(scope, 'accuList')">
                      </sino-date-picker>
                      <span v-if="scope.row.canEdit" v-show="!scope.row.editDate" @click="scope.row.editDate = true" class="quit-edit-span">{{ scope.row.publishEndDate | capitalize}}</span>
                      <span v-if="!scope.row.canEdit" class="quit-edit-span">{{ scope.row.publishEndDate | capitalize}}</span>
                    </div>
                  </template>
                </sino-table-column>
              </sino-auto-table>
            </template>

            <sino-form-item label="备注：" class="sino-form-item-width mt15"  prop="clueDesc">
              <sino-input type="textarea" v-model="quitUpdateForm.remark" :disabled="false"></sino-input>
            </sino-form-item>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="quitUpdateSave">保 存</sino-button>
        </span>
      </sino-dialog>

      <!--修改成本中心-->
      <sino-dialog :visible.sync="costUpdateFlag" v-on:close="resetFun('costUpdateForm')" :top="'5%'">
        <sino-title slot="title" type="levelOne" title="修改成本中心" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="costUpdateForm" :rules="costUpdateRules" ref="costUpdateForm" class="leadsAdd-Form">
            <ul class="serveupdate-ul">
              <li class="serveupdate-li">
                <span>雇员姓名：</span>
                <input type="text" readonly v-model="costUpdateForm.empName">
              </li>
              <li class="serveupdate-li">
                <span>证件号码：</span>
                <input type="text" readonly v-model="costUpdateForm.certNo">
              </li>
              <li class="serveupdate-li">
                <span>现成本中心：</span>
                <input type="text" readonly v-model="costUpdateForm.oncostCentName">
              </li>
            </ul>
            <sino-form-item label="成本中心改为：" class="mt10" prop="costCentName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="costUrl"
                           :token="token"
                           :data="costData"
                           :chooseName.sync="costUpdateForm.costCentName"
                           :chooseId.sync="costUpdateForm.costCentId"
                           :clear="true"></sino-select>
            </sino-form-item>
            <sino-form-item label="备注：" class="sino-form-item-width" prop="remark">
              <sino-input type="textarea" v-model="costUpdateForm.remark" :disabled="false"></sino-input>
            </sino-form-item>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="costUpdateSave">保 存</sino-button>
        </span>
      </sino-dialog>

      <!--修改订单起/止日期-->
      <sino-dialog :visible.sync="orderDateUpdateFlag" dialogHide v-on:close="resetFun('orderDateUpdateForm')"
                   :top="'5%'">
        <sino-title slot="title" type="levelOne" title="修改订单起/止日期" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form">
          <sino-form :model="orderDateUpdateForm" :rules="orderDateUpdateRules" ref="orderDateUpdateForm"
                     class="leadsAdd-Form">
            <ul class="serveupdate-ul">
              <li class="serveupdate-li">
                <span>雇员姓名：</span>
                <input type="text" readonly v-model="orderDateUpdateForm.empName">
              </li>
              <li class="serveupdate-li">
                <span>证件号码：</span>
                <input type="text" readonly v-model="orderDateUpdateForm.certNo">
              </li>
            </ul>
            <sino-form-item label="订单开始日期：" class="mt10" prop="orderBegDate">
              <sino-date-picker class="fl"
                                v-model="orderDateUpdateForm.orderBegDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="订单结束日期：" class="mt10" prop="orderEndDate">
              <sino-date-picker class="fl"
                                v-model="orderDateUpdateForm.orderEndDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="备注：" class="sino-form-item-width" prop="remark">
              <sino-input type="textarea" v-model="orderDateUpdateForm.remark" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label=" " class="sino-form-item-width">
              <sino-checkbox v-model="orderDateUpdateForm.checked">前往修改明细起做止做日期</sino-checkbox>
            </sino-form-item>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="orderDateUpdateSave">保 存</sino-button>
        </span>
      </sino-dialog>

      <!--批量维护弹层-->
      <!--<sino-dialog :visible.sync="jobBatchFlag" :top="'10%'" class="jobbatch-dialog">-->
        <!--<sino-title slot="title" type="levelOne" title="维护类型选择" class="sino-dialog-title"></sino-title>-->
        <!--<span class="fr" @click="hisImportFun">历史导入查询</span>-->
        <!--<ul class="jobbatch-dialog-ul">-->
          <!--<li class="fl" @click="jobBatchFun">-->
            <!--<i class="iconfont sino-tuihui"></i>-->
            <!--<span>批量撤离</span>-->
          <!--</li>-->
          <!--<li class="fr" @click="jobBatchDeclFun">-->
            <!--<i class="iconfont sino-modify"></i>-->
            <!--<span>修改申报基数</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</sino-dialog>-->
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import Utils from '../../../development/component/sinoEdittable/utils/index.js';
  import api from '../../../../api/index';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  export default {
    components: {},
    data () {
      return {
        dicSelUrl: this.apiPath.hrsc.getDictSelectBox,
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo,
        findServeTempSelectBox: this.apiPath.hrsc.findServeTempSelectBox,
        coninfoSelectBox: this.apiPath.hrsc.coninfoSelectBox,
        findCostCentSelectBox: this.apiPath.hrsc.findCostCentSelectBox,
        costUrl: this.apiPath.hrsc.costCentSelectBox,
        token: Cookie.get('Token'),
        tempData: {custId: ''},
        quitSelectData: {orderId: ''},
        quiteOrderDate: true,
        quitShowDetail: false,
        showQuitOrderDate: true,
        disabledQuitOrderDate: true,
        quitEditTable: [],
        copyEditTable: [],
        initialRevokeReason: '',
        initialRevokeReasonName: '',
        initialQuiteOrderDate: '',
        conData: {id: ''},
        routerView: false,
        searchFlag: false,
        jobsingleForm: { // 搜索条件
          empName: '',
          certNo: '',
          custId: '',
          custIdName: '',
          prodServeTempName: '',
          prodServeTempId: '',
          conId: '',
          conName: '',
          costCentId: '',
          costCentName: ''
        },
        jobsingleData: null,
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
        jobUpdateFlag: false,
        jobUpdateForm: {
          sinsState: []
        },
        jobUpdateRules: {},
        sinsStateList: [],
        orderOrderId: '',
        jobBatchFlag: false,
        orderUpdateFlag: false,
        serveUpdateFlag: false,
        serveUpdateForm: {
          empName: '',
          certNo: '',
          orderBegDate: '',
          orderEndDate: '',
          begDate: '',
          remark: ''
        },
        serveUpdateRules: {
          begDate: [
            {type: 'date', required: true, message: '请选择成本中心', trigger: 'change'}
          ]
        },
        serveTable: null,
        serveList: null,
        sinsList: null,
        accuList: null,
        publishBegFlag: true,
        publishEndFlag: true,
        dateUpdateFlag: false,
        dateUpdateForm: {
          empName: '',
          certNo: '',
          orderBegDate: '',
          orderEndDate: '',
          publishEndDate: '',
          publishBegDate: '',
          remark: ''
        },
        tempChangeFlag: false,
        tempChangeForm: {
          takeEffectDate: '',
          clueDesc: '',
          EffectDate: ''
        },
        tempChangeRules: {},
        quitUpdateFlag: false,
        quitUpdateForm: {
          empName: '',
          certNo: '',
          revokeReasonName: '',
          revokeReason: '',
          orderEndDate: '',
          remark: ''
        },
        quitUpdateRules: {},
        detailFlag: false,
        costUpdateFlag: false,
        costUpdateForm: {
          empName: '',
          certNo: '',
          oncostCentName: '',
          costCentName: '',
          costCentId: '',
          remark: ''
        },
        costData: {
          custId: ''
        },
        costUpdateRules: {
          costCentName: [
            {required: true, message: '请选择成本中心', trigger: 'change'}
          ]
        },
        orderDateUpdateFlag: false,
        orderDateUpdateForm: {
          empName: '',
          certNo: '',
          orderBegDate: '',
          orderEndDate: '',
          remark: '',
          checked: false
        },
        orderDateUpdateRules: {},
        treeStructure: true,
        defaultExpandAll: false,
        columns: [ // 分组
          {
            text: '服务名称',
            dataIndex: 'prodName'
          }
        ],
        dateTreeStructure: true,
        dateDefaultExpandAll: false,
        dateColumns: [ // 分组
          {
            text: '基础服务',
            dataIndex: 'prodName'
          }
        ],
        serveSelectionList: [],
        sinsSelectionList: [],
        accuSelectionList: [],
        endDateFun: {
          disabledDate (time) {
            return time.toString().split(" ")[2] !== '01';
          }
        }
      };
    },
    created () {
      this.ruoteJudge();
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        const d = new Date(value);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day + ' ';
      }
    },
    mounted () {
      api.post(this.dicSelUrl, {code: 'REPORT_TYPE'}).then(res => {
        this.sinsStateList = res.data.list;
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/jobSingle") {
            this.routerView = false;
            this.searchFun();
          }
          if (this.$route.query.certNo && val.path === '/sinsQuestionPersAdmin/jobSingle') {
            this.routerView = false;
            this.jobsingleForm.certNo = this.$route.query.certNo;
            this.searchFun();
          }
        },
        deep: true
      }
    },

    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/jobSingle" && this.$route.path !== "/sinsQuestionPersAdmin/jobSingle") {
          this.routerView = true;
        }
        if (this.$route.path === "/sinsQuestionPersAdmin/jobSingle") {
          this.jobsingleForm.certNo = this.$route.query.certNo;
          this.searchFun();
        }
      },
      custChange () {
        this.tempData.custId = this.jobsingleForm.custId;
        this.conData.id = this.jobsingleForm.custId;
      },
      prodScheFun () {
        this.$router.push({path: '/jobBatch'});
//        this.jobBatchFlag = true;
      },
      // 修改起止日期服务费
      serveSelection (selection) {
        this.serveSelectionList = selection;
        if (this.serveSelectionList.length > 0) {
          this.publishBegFlag = false;
          this.publishEndFlag = false;
        }
        if (this.accuSelectionList.length === 0 && this.sinsSelectionList.length === 0 && this.serveSelectionList.length === 0) {
          this.publishBegFlag = true;
          this.publishEndFlag = true;
        }
      },
      sinsSelection (selection) {
        this.sinsSelectionList = selection;
        if (this.sinsSelectionList.length > 0) {
          this.publishBegFlag = false;
          this.publishEndFlag = false;
        }
        if (this.accuSelectionList.length === 0 && this.sinsSelectionList.length === 0 && this.serveSelectionList.length === 0) {
          this.publishBegFlag = true;
          this.publishEndFlag = true;
        }
      },
      accuSelection (selection) {
        this.accuSelectionList = selection;
        if (this.accuSelectionList.length > 0) {
          this.publishBegFlag = false;
          this.publishEndFlag = false;
        }
        if (this.accuSelectionList.length === 0 && this.sinsSelectionList.length === 0 && this.serveSelectionList.length === 0) {
          this.publishBegFlag = true;
          this.publishEndFlag = true;
        }
      },
      // 起做日期改为
      publishBegChange (str) {
        this.serveSelectionList.forEach(function (list) {
          this.serveList.forEach(function (item) {
            if (item.prodId === list.prodId) {
              if (str !== list.publishBegDate) {
                item.publishBegDate = str;
                item.colorFlag = true;
              }
            }
          }, this);
        }, this);
        this.sinsSelectionList.forEach(function (list) {
          this.sinsList.forEach(function (item) {
            if (item.proPayId === list.proPayId) {
              if (str !== list.publishBegDate) {
                item.publishBegDate = str;
                item.colorFlag = true;
              }
            }
          }, this);
        }, this);
        this.accuSelectionList.forEach(function (list) {
          this.accuList.forEach(function (item) {
            if (item.proPayId === list.proPayId) {
              if (str !== list.publishBegDate) {
                item.publishBegDate = str;
                item.colorFlag = true;
              }
            }
          }, this);
        }, this);
      },
      // 止做日期改为
      publishEndChange (str) {
        this.serveSelectionList.forEach(function (list) {
          this.serveList.forEach(function (item) {
            if (item.prodId === list.prodId) {
              if (str !== list.publishEndDate) {
                item.publishEndDate = str;
                item.colorEndFlag = true;
              }
            }
          }, this);
        }, this);
        this.sinsSelectionList.forEach(function (list) {
          this.sinsList.forEach(function (item) {
            if (item.proPayId === list.proPayId) {
              if (str !== list.publishEndDate) {
                item.publishEndDate = str;
                item.colorEndFlag = true;
              }
            }
          }, this);
        }, this);
        this.accuSelectionList.forEach(function (list) {
          this.accuList.forEach(function (item) {
            if (item.proPayId === list.proPayId) {
              if (str !== list.publishEndDate) {
                item.publishEndDate = str;
                item.colorEndFlag = true;
              }
            }
          }, this);
        }, this);
      },
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.jobsingleForm
        };
        api.post(this.apiPath.hrsc.autonomyJobManageSingle, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.jobsingleData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 订单修改
      updateFun (scope) {
        this.orderUpdateFlag = true;
        this.orderOrderId = scope.orderId;
      },
      // 修改申报基数保存
      updateSave () {
      },
      // 撤离
      leafFun (_data) {
        this.routerView = true;
        this.$router.push({path: '/jobSingle/leaveInfo', query: {orderId: _data.orderId}});
      },
      // 取消撤离
      cancelFun (_val) {
        let _t = this;
        this.$confirm('确定进行“取消撤离”操作吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.postsign(_t.apiPath.hrsc.cancelLeaveSingle, _val.orderId).then(res => {
            if (res.code === 'CPYY-00001') {
              _t.searchFun();
              _t.$message({message: '取消撤离成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 修改服务费金额
      serveUpdateFun () {
        api.postsign(this.apiPath.hrsc.orderDetail, this.orderOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderUpdateFlag = false;
            this.serveUpdateFlag = true;
            this.serveUpdateForm.empName = res.data.empName;
            this.serveUpdateForm.certNo = res.data.certNo;
            this.serveUpdateForm.orderBegDate = res.data.orderBegDate;
            this.serveUpdateForm.orderEndDate = res.data.orderEndDate;
            this.serveUpdateQuery();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改服务费金额查询
      serveUpdateQuery () {
        api.postsign(this.apiPath.hrsc.findServeByOrderId, this.orderOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.serveTable = res.data;
            let me = this;
            if (me.treeStructure) {
              me.serveTable = Utils.MSDataTransfer.treeToArray(JSON.parse(JSON.stringify(res.data)), null, null, me.defaultExpandAll);
            }
            me.serveTable.forEach(function (list) {
              list.edit = false;
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //  修改服务费金额保存
      servUpdateSave () {
        let _t = this;
        _t.$refs.serveUpdateForm.validate((valid) => {
          if (valid) {
            _t.serveUpdateForm.orderId = _t.orderOrderId;
            _t.serveUpdateForm.serveList = _t.serveTable;
//            _t.serveUpdateForm.begDate = Vue.filter('date')(_t.serveUpdateForm.begDate, 'yyyy-MM-dd');
            api.post(_t.apiPath.hrsc.updateOrderDetServeAmo, _t.serveUpdateForm).then(res => {
              if (res.code === 'CPYY-00001') {
                _t.serveUpdateFlag = false;
                _t.searchFun();
                _t.$message({message: '保存成功！', type: 'success'});
              } else {
                _t.serveUpdateForm.begDate = new Date(_t.serveUpdateForm.begDate);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 修改起/止做日期查询
      dateUpdate (isReset) {
        api.postsign(this.apiPath.hrsc.orderDetail, this.orderOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderUpdateFlag = false;
            if (isReset) {
              this.dateUpdateFlag = true;
            }
            this.dateUpdateForm.empName = res.data.empName;
            this.dateUpdateForm.certNo = res.data.certNo;
            this.dateUpdateForm.orderBegDate = res.data.orderBegDate;
            this.dateUpdateForm.orderEndDate = res.data.orderEndDate;
            api.postsign(this.apiPath.hrsc.findDetByOrderId, this.orderOrderId).then(res => {
              if (res.code === 'CPYY-00001') {
                this.serveList = res.data.serveList;
                this.sinsList = res.data.sinsList;
                this.accuList = res.data.accuList;
                let me = this;
                if (me.dateTreeStructure) {
                  me.serveList = Utils.MSDataTransfer.treeToArray(res.data.serveList, null, null, me.dateDefaultExpandAll);
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改起/止做日期
      dateUpdateQuery () {},
      dateUpdateSave () {
        let _data = {
          orderId: this.orderOrderId,
          serveList: this.serveList,
          sinsList: this.sinsList,
          accuList: this.accuList,
          remark: this.dateUpdateForm.remark
        };
        api.post(this.apiPath.hrsc.updateOrderDetBegEndDate, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.dateUpdateFlag = false;
            this.searchFun();
            this.$message({message: '保存成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 更换产品服务模板保存
      tempChangeSave () {},
      // 多余行数隐藏
      rowServeFun ({row, rowIndex}) {
        if (this.quitEditTable.serveList.length < 5) {
          if (rowIndex >= this.quitEditTable.serveList.length) {
            return {display: 'none'};
          }
        }
      },
      rowsinsFun ({row, rowIndex}) {
        if (this.quitEditTable.sinsList.length < 5) {
          if (rowIndex >= this.quitEditTable.sinsList.length) {
            return {display: 'none'};
          }
        }
      },
      rowaccuFun ({row, rowIndex}) {
        if (this.quitEditTable.accuList.length < 5) {
          if (rowIndex >= this.quitEditTable.accuList.length) {
            return {display: 'none'};
          }
        }
      },
      // 修改离职原因打开弹窗方法
      quitUpdateOpen () {
        api.postsign(this.apiPath.hrsc.orderDetail, this.orderOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.orderEndDate) {
              this.initialQuiteOrderDate = res.data.orderEndDate;
              res.data.orderEndDate = new Date(res.data.orderEndDate);
            }
            this.quitSelectData.orderId = this.orderOrderId;
            let that = this;
            setTimeout(function () {
              that.initialRevokeReasonName = res.data.revokeReasonName;
              that.initialRevokeReason = res.data.revokeReason;
              that.quitUpdateForm = res.data;
              if (that.initialRevokeReasonName === '撤销服务（不收费）') {
                that.showQuitOrderDate = false;
              } else {
                that.showQuitOrderDate = true;
              }
              this.disabledQuitOrderDate = true;
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改离职原因止做日期变化
      changePublishDate (obj, str) {
        if (this.transFormData(this.quitEditTable[str][obj.$index].publishEndDate) !== this.transFormData(this.copyEditTable[str][obj.$index].publishEndDate)) {
          this.quitEditTable[str][obj.$index].flag = false;
        } else {
          this.quitEditTable[str][obj.$index].flag = true;
        }
      },
      // 修改离职原因变化
      revokeReasonChange (name) {
        if ((name && this.initialRevokeReasonName && name !== this.initialRevokeReasonName)) {
          if (name === '撤销服务（不收费）') {
            this.quiteOrderDate = true;
            this.showQuitOrderDate = true;
            this.disabledQuitOrderDate = false;
            let obj = {
              orderId: this.orderOrderId,
              empName: this.quitUpdateForm.empName,
              certNo: this.quitUpdateForm.certNo,
              revokeReason: this.initialRevokeReason,
              orderEndDate: Vue.filter('date')(this.initialQuiteOrderDate, 'yyyy-MM-dd')
            };
            api.post(this.apiPath.hrsc.checkSinsAccuWage, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data.doneSins || res.data.doneAccu || res.data.doneWage) {
                  let str = res.data.doneSins ? '社保' : '' + res.data.doneAccu ? '公积金' : '' + res.data.doneWage ? '工资' : '' + '未实作！';
                  this.$alert(str, '提示信息', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    customClass: '', // 添加class
                    lockScroll: true,
                    callback: action => {}
                  });
                }
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (name !== '撤销服务（不收费）' && this.initialRevokeReasonName !== '撤销服务（不收费）') {
            this.quiteOrderDate = false;
            this.showQuitOrderDate = false;
            this.disabledQuitOrderDate = false;
          } else if (this.initialRevokeReasonName === '撤销服务（不收费）') {
            this.quitShowDetail = true;
            this.showQuitOrderDate = true;
            this.disabledQuitOrderDate = false;
            api.postsign(this.apiPath.hrsc.findDetDateByOrderId, this.orderOrderId).then(res => {
              if (res.code === 'CPYY-00001') {
                for (var i in res.data) {
                  if (Array.isArray(res.data[i])) {
                    res.data[i].forEach(function (item) {
                      if (item.publishEndDate) {
                        item.canEdit = false;
                        item.flag = true;
                        item.publishEndDate = new Date(item.publishEndDate);
                      } else {
                        item.editDate = false;
                        item.canEdit = true;
                        item.flag = true;
                      }
                    });
                  }
                }
                this.quitEditTable = res.data;
                this.copyEditTable = JSON.parse(JSON.stringify(res.data));
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          if (this.initialRevokeReasonName === '撤销服务（不收费）') {
            this.showQuitOrderDate = false;
          } else {
            this.showQuitOrderDate = true;
          }
          this.disabledQuitOrderDate = true;
        }
      },
      // 离职原因日期修改
      quitOrderEndDate (data) {
        if (data !== this.initialQuiteOrderDate && data) {
          api.post(this.apiPath.hrsc.getDetEndDateByOrderEndDate, {orderId: this.orderOrderId, orderEndDate: data}).then(res => {
            for (var i in this.quitEditTable) {
              if (Array.isArray(this.quitEditTable[i])) {
                if (i === 'serveList') {
                  this.quitEditTable[i].forEach(function (item) {
                    if (res.data.serveEndDateMap[item.prodPriceId] && item.canEdit) {
                      item.publishEndDate = new Date(res.data.serveEndDateMap[item.prodPriceId]);
                    }
                  });
                } else {
                  this.quitEditTable[i].forEach(function (item) {
                    if (res.data[i === 'accuList' ? 'accuEndDate' : 'sinsEndDate'] && item.canEdit) {
                      item.publishEndDate = new Date(res.data[i === 'accuList' ? 'accuEndDate' : 'sinsEndDate']);
                    }
                  });
                }
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 离职原因止做日期失去焦点
      blurDate (el, event) {
        console.log(el);
        console.log(this.copyEditTable.serveList[el.$index].publishEndDate);
      },
      // 修改离职原因日期转化
      transFormData (value) {
        if (!value) return '';
        const d = new Date(value);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day + ' ';
      },
      // 修改离职原因保存
      quitUpdateSave () {
        this.$refs.quitUpdateForm.validate((valid) => {
          let name = this.quitUpdateForm.revokeReasonName;
          if ((name && this.initialRevokeReasonName && name !== this.initialRevokeReasonName)) {
            if (name === '撤销服务（不收费）') {
              api.post(this.apiPath.hrsc.createOrderDetAmoZero, {
                orderId: this.orderOrderId,
                orderEndDate: Vue.filter('date')(this.quitUpdateForm.orderEndDate, 'yyyy-MM-dd'),
                remark: this.quitUpdateForm.remark,
                revokeReasonName: this.quitUpdateForm.revokeReasonName,
                revokeReason: this.quitUpdateForm.revokeReason
              }).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.quitUpdateFlag = false;
                  this.$alert('修改成功！', '提示信息', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    lockScroll: true
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (name !== '撤销服务（不收费）' && this.initialRevokeReasonName !== '撤销服务（不收费）') {
              api.post(this.apiPath.hrsc.updateOrderDimReasons, {
                orderId: this.orderOrderId,
                revokeReason: this.quitUpdateForm.revokeReason,
                revokeReasonName: this.quitUpdateForm.revokeReasonName
              }).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.quitUpdateFlag = false;
                  this.$alert('修改成功！', '提示信息', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    lockScroll: true
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (this.initialRevokeReasonName === '撤销服务（不收费）') {
              let obj = JSON.parse(JSON.stringify(this.quitEditTable));
              for (var i in obj) {
                if (Array.isArray(obj[i])) {
                  obj[i].forEach(function (item) {
                    if (item.publishEndDate) {
                      item.publishEndDate = Vue.filter('date')(item.publishEndDate);
                    }
                    item.flag = Number(item.flag);
                  });
                }
              }
              obj.revokeReasonName = this.quitUpdateForm.revokeReasonName;
              obj.revokeReason = this.quitUpdateForm.revokeReason;
              obj.orderId = this.orderOrderId;
              api.post(this.apiPath.hrsc.createOrderDetAmo, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.quitUpdateFlag = false;
                  this.$alert('修改成功！', '提示信息', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    lockScroll: true
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 修改成本中心查询
      costUpdateFun () {
        api.postsign(this.apiPath.hrsc.orderDetail, this.orderOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderUpdateFlag = false;
            this.costUpdateFlag = true;
            this.costUpdateForm.empName = res.data.empName;
            this.costUpdateForm.certNo = res.data.certNo;
            this.costUpdateForm.oncostCentName = res.data.costCentName;
            let _custId = res.data.custId;
            console.log(_custId);
            let _t = this;
            setTimeout(function () {
              _t.costData.custId = _custId;
            }, 1000);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改成本中心保存
      costUpdateSave () {
        this.$refs.costUpdateForm.validate((valid) => {
          if (valid) {
            this.costUpdateForm.orderId = this.orderOrderId;
            api.post(this.apiPath.hrsc.updateOrderCostCentById, this.costUpdateForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.costUpdateFlag = false;
                this.searchFun();
                this.$message({message: '保存成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 修改订单起/止日期查询
      orderDateUpdate () {
        api.postsign(this.apiPath.hrsc.orderDetail, this.orderOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderUpdateFlag = false;
            this.orderDateUpdateFlag = true;
            this.orderDateUpdateForm.empName = res.data.empName;
            this.orderDateUpdateForm.certNo = res.data.certNo;
            this.orderDateUpdateForm.orderBegDate = res.data.orderBegDate;
            this.orderDateUpdateForm.orderEndDate = res.data.orderEndDate;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改订单起/止日期
      orderDateUpdateSave () {
        if (this.orderDateUpdateForm.orderBegDate !== '') {
          this.orderDateUpdateForm.orderBegDate = Vue.filter('date')(this.orderDateUpdateForm.orderBegDate, 'yyyy-MM-dd');
        }
        if (this.orderDateUpdateForm.orderEndDate !== '') {
          this.orderDateUpdateForm.orderEndDate = Vue.filter('date')(this.orderDateUpdateForm.orderEndDate, 'yyyy-MM-dd');
        }
        this.orderDateUpdateForm.orderId = this.orderOrderId;
        api.post(this.apiPath.hrsc.updateOrderBegEndDate, this.orderDateUpdateForm).then(res => {
          if (res.code === 'CPYY-00001') { // findDetByOrderId
            if (this.orderDateUpdateForm.checked == true) {
              api.postsign(this.apiPath.hrsc.orderDetail, this.orderOrderId).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.orderDateUpdateFlag = false;
                  this.dateUpdateFlag = true;
                  this.dateUpdateForm.empName = res.data.empName;
                  this.dateUpdateForm.certNo = res.data.certNo;
                  this.dateUpdateForm.orderBegDate = res.data.orderBegDate;
                  this.dateUpdateForm.orderEndDate = res.data.orderEndDate;
                }
              }).catch(err => {
                console.log(err);
              });
              api.postsign(this.apiPath.hrsc.findDetByOrderId, this.orderOrderId).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.serveList = res.data.serveList;
                  this.sinsList = res.data.sinsList;
                  this.accuList = res.data.accuList;
                  let me = this;
                  if (me.dateTreeStructure) {
                    me.serveList = Utils.MSDataTransfer.treeToArray(res.data.serveList, null, null, me.dateDefaultExpandAll);
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              this.orderDateUpdateFlag = false;
              this.searchFun();
              this.orderDateUpdateForm.orderBegDate = new Date(this.orderDateUpdateForm.orderBegDate);
              this.orderDateUpdateForm.orderEndDate = new Date(this.orderDateUpdateForm.orderEndDate);
              this.$message({message: '保存成功！', type: 'success'});
            }
          } else {
            this.orderDateUpdateForm.orderBegDate = new Date(this.orderDateUpdateForm.orderBegDate);
            this.orderDateUpdateForm.orderEndDate = new Date(this.orderDateUpdateForm.orderEndDate);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改收/付费账单年月
      updateYM () {
        this.routerView = true;
        this.$router.push({path: '/jobSingle/updateChargeYm'});
      },
      // 封装
      commonFun (orderId, formName, flagName) {
        api.postsign(this.apiPath.hrsc.orderDetail, orderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderUpdateFlag = false;
            flagName = true;
            formName.empName = res.data.empName;
            formName.certNo = res.data.certNo;
            formName.oncostCentName = res.data.costCentName;
            let _custId = res.data.custId;
            let _t = this;
            setTimeout(function () {
              _t.costData.custId = _custId;
            }, 1000);
          }
        }).catch(err => {
          console.log(err);
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
      // 显示行
      showTr: function (row, index) {
        let show = (row.row._parent ? row.row._parent._expanded : true);
        row.row._show = show;
        return show ? '' : 'display:none';
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this;
        let record = me.serveTable[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this;
        if (me.treeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候， 图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      // 显示行
      dateShowTr: function (row, rowIndex) {
        if (this.serveList.length < 5) {
          if (row.rowIndex >= this.serveList.length) {
            return {display: 'none'};
          }
        }
        let show = (row.row._parent ? row.row._parent._expanded : true);
        row.row._show = show;
        return show ? '' : 'display:none';
      },
      dateShowTr1: function (row, rowIndex) {
        if (this.sinsList.length < 5) {
          if (row.rowIndex >= this.sinsList.length) {
            return {display: 'none'};
          }
        }
      },
      dateShowTr2: function (row, rowIndex) {
        if (this.accuList.length < 5) {
          if (row.rowIndex >= this.accuList.length) {
            return {display: 'none'};
          }
        }
      },
      // 展开下级
      dateToggle: function (trIndex) {
        let me = this;
        let record = me.serveList[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      dateSpaceIconShow (index) {
        let me = this;
        if (me.dateTreeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候， 图标的切换
      dateToggleIconShow (index, record) {
        let me = this;
        if (me.dateTreeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      // 历史导入查询
      hisImportFun () {
        this.$router.push({path: '/jobBatch/hisImportSearch'});
      },
      // 批量维护-撤离
      jobBatchFun () {
        this.$router.push({path: '/jobBatch'});
      },
      // 批量维护-申报基数
      jobBatchDeclFun () {
        this.$router.push({path: '/jobBatchDecl'});
      },
      // 不可删除--重置可关闭弹层
      resetFun (formName) {
        this.$refs[formName].resetFields();
        if (formName === 'quitUpdateForm') {
          this.initialRevokeReason = '';
          this.initialRevokeReasonName = '';
          this.quiteOrderDate = true;
          this.quitShowDetail = false;
          this.detailFlag = false;
        }
      },
      resetDateForm (formName) {
        this.$refs[formName].resetFields();
        this.dateUpdate();
      },
      // 不可删除-重置不关闭弹层
      resetForm (formName) {
        this.$refs[formName].resetFields();
        if (formName === 'serveUpdateForm') {
          this.dateUpdate(false);
          this.serveUpdateQuery();
        } else {
          this.dateUpdate();
        }
      }
    }
  };
</script>
