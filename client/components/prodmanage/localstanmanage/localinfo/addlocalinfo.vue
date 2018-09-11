<template>
  <!--新增地方基本信息-->
  <div class="usermanage localinfo">
    <sino-con>
      <sino-title type="levelOne" title="新增地方标准基本信息"></sino-title>
      <sino-form :model="addlocalInfoForm" :rules="addlocalInfoRules" ref="addlocalInfoForm" class="serch-form">
        <sino-title type="levelTwo" title="基础信息"></sino-title>
        <div class="local-info">
          <ul class="local-info-ul">
            <li>
              <sino-form-item label="地区：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="addlocalInfoForm.areaName"
                             :chooseId.sync="addlocalInfoForm.areaId"
                             :data="{'data': {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="政策发布日期：" class="search-inner-item" prop="begDate">
                <sino-date-picker class="fl"
                                  v-model="addlocalInfoForm.begDate"
                                  type="date"
                                  :editable="false"
                                  @change="dataCallback"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="执行开始日期：" class="search-inner-item" prop="takeEffectDate">
                <sino-date-picker class="fl"
                                  v-model="addlocalInfoForm.takeEffectDate"
                                  type="date"
                                  :editable="false"
                                  @change="takeDateCallback"
                                  :picker-options="endDateFun"
                                  :readonly="false"
                                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社平：" class="search-inner-item" prop="socAvgWage">
                <sino-input class="fl" type="text"
                            v-model="addlocalInfoForm.socAvgWage"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="地方标准类别：" class="search-inner-item" prop="stanType">
                <sino-radio v-for="(item, index) in pkgStateList" :key="index"
                            v-model.number="addlocalInfoForm.stanType"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="地方标准项：" class="search-inner-item" prop="prodName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="prodUrl"
                             :data="prodData"
                             :linkage="true"
                             :chooseName.sync="addlocalInfoForm.prodName"
                             :chooseId.sync="addlocalInfoForm.prodId" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="地方标准名称：" class="search-inner-item" prop="stanName">
                <sino-input class="fl" type="text"
                            v-model="addlocalInfoForm.stanName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业比例（%）：" class="search-inner-item" prop="entPayProp">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.entPayProp"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人比例（%）：" class="search-inner-item" prop="perPayProp">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.perPayProp"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业基数上限：" class="search-inner-item" prop="entRadixUpperLimit">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.entRadixUpperLimit"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业基数下限：" class="search-inner-item" prop="entRadixLowerLimit">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.entRadixLowerLimit"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>

            <li>
              <sino-form-item label="企业附加（元）：" class="search-inner-item" prop="entAddiMoney">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.entAddiMoney"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人基数上限：" class="search-inner-item" prop="perRadixUpperLimit">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.perRadixUpperLimit"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人基数下限：" class="search-inner-item" prop="perRadixLowerLimit">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.perRadixLowerLimit"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人附加（元）：" class="search-inner-item" prop="perAddiMoney">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.perAddiMoney"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <sino-title type="levelTwo" title="基数取值原则"></sino-title>
        <div class="local-info">
          <ul class="local-info-ul">
            <li>
              <sino-form-item label="企业基数精度：" class="search-inner-item" prop="entRadixAccuracyDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PAY_ACCURACY'}"
                             :chooseName.sync="addlocalInfoForm.entRadixAccuracyDict"
                             :chooseId.sync="addlocalInfoForm.entRadixAccuracy" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业基数舍入原则：" class="search-inner-item" prop="entRadixRouPrinDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_ROU_PRIN'}"
                             :chooseName.sync="addlocalInfoForm.entRadixRouPrinDict"
                             :chooseId.sync="addlocalInfoForm.entRadixRouPrin" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业基数奇偶限定：" class="search-inner-item" prop="entRadixParityDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_PARITY'}"
                             :chooseName.sync="addlocalInfoForm.entRadixParityDict"
                             :chooseId.sync="addlocalInfoForm.entRadixParity" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人基数精度：" class="search-inner-item" prop="perRadixAccuracyDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PAY_ACCURACY'}"
                             :chooseName.sync="addlocalInfoForm.perRadixAccuracyDict"
                             :chooseId.sync="addlocalInfoForm.perRadixAccuracy" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人基数舍入原则：" class="search-inner-item" prop="perRadixRouPrinDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_ROU_PRIN'}"
                             :chooseName.sync="addlocalInfoForm.perRadixRouPrinDict"
                             :chooseId.sync="addlocalInfoForm.perRadixRouPrin" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人基数奇偶限定：" class="search-inner-item" prop="parRadixParityDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_PARITY'}"
                             :chooseName.sync="addlocalInfoForm.parRadixParityDict"
                             :chooseId.sync="addlocalInfoForm.parRadixParity" :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <sino-title type="levelTwo" title="缴纳额取值原则"></sino-title>
        <div class="local-info">
          <ul class="local-info-ul">
            <li>
              <sino-form-item label="企业缴纳额精度：" class="search-inner-item" prop="entPayAccuracyDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PAY_ACCURACY'}"
                             :chooseName.sync="addlocalInfoForm.entPayAccuracyDict"
                             :chooseId.sync="addlocalInfoForm.entPayAccuracy" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业缴纳额舍入原则：" class="search-inner-item" prop="entPayRouPrinDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_ROU_PRIN'}"
                             :chooseName.sync="addlocalInfoForm.entPayRouPrinDict"
                             :chooseId.sync="addlocalInfoForm.entPayRouPrin" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="企业缴纳额奇偶限定：" class="search-inner-item" prop="entPayParityDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_PARITY'}"
                             :chooseName.sync="addlocalInfoForm.entPayParityDict"
                             :chooseId.sync="addlocalInfoForm.entPayParity" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人缴纳额精度：" class="search-inner-item" prop="perPayAccuracyDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PAY_ACCURACY'}"
                             :chooseName.sync="addlocalInfoForm.perPayAccuracyDict"
                             :chooseId.sync="addlocalInfoForm.perPayAccuracy" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人缴纳额舍入原则：" class="search-inner-item" prop="perPayRouPrinDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_ROU_PRIN'}"
                             :chooseName.sync="addlocalInfoForm.perPayRouPrinDict"
                             :chooseId.sync="addlocalInfoForm.perPayRouPrin" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="个人缴纳额奇偶限定：" class="search-inner-item" prop="perPayParityDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_PARITY'}"
                             :chooseName.sync="addlocalInfoForm.perPayParityDict"
                             :chooseId.sync="addlocalInfoForm.perPayParity" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="计算公式类型：" class="search-inner-item" prop="formulaTypeDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PROD_FORMULA_TYPE'}"
                             :chooseName.sync="addlocalInfoForm.formulaTypeDict"
                             :chooseId.sync="addlocalInfoForm.formulaType" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="收费频率单位：" class="search-inner-item" prop="chargeFreUnitName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'CHARGE_FRE_UNIT'}"
                             :chooseName.sync="addlocalInfoForm.chargeFreUnitName"
                             :chooseId.sync="addlocalInfoForm.chargeFreUnit" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="收费频率：" class="search-inner-item" prop="chargeFre">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.chargeFre"
                            :disabled="false"></sino-input>
               <!-- <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'CHARGE_FRE_UNIT'}"
                             :chooseName.sync="addlocalInfoForm.chargeFreDict"
                             :chooseId.sync="addlocalInfoForm.chargeFre" :clear="true"></sino-select>-->
              </sino-form-item>
            </li>
            <li></li>
            <li>
              <sino-form-item label="计费频率单位：" class="search-inner-item" prop="chargingFreUnitName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'CHARGE_FRE_UNIT'}"
                             :chooseName.sync="addlocalInfoForm.chargingFreUnitName"
                             :chooseId.sync="addlocalInfoForm.chargingFreUnit" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="计费频率：" class="search-inner-item" prop="chargingFre">
                <sino-input class="fl" type="text"
                            v-model.number="addlocalInfoForm.chargingFre"
                            :disabled="false"></sino-input>
                <!--<sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'CHARGE_FRE_UNIT'}"
                             :chooseName.sync="addlocalInfoForm.chargingFreDict"
                             :chooseId.sync="addlocalInfoForm.chargingFre" :clear="true"></sino-select>-->
              </sino-form-item>
            </li>
            <li v-if="formulaFlag">
              <sino-form-item label="总缴纳额精度：" class="search-inner-item" prop="sumPayAccuracyDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'PAY_ACCURACY'}"
                             :chooseName.sync="addlocalInfoForm.sumPayAccuracyDict"
                             :chooseId.sync="addlocalInfoForm.sumPayAccuracy" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li v-if="formulaFlag">
              <sino-form-item label="总缴纳额舍入原则：" class="search-inner-item" prop="sumPayRouPrinDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_ROU_PRIN'}"
                             :chooseName.sync="addlocalInfoForm.sumPayRouPrinDict"
                             :chooseId.sync="addlocalInfoForm.sumPayRouPrin" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li v-if="formulaFlag">
              <sino-form-item label="总缴纳额奇偶限定：" class="search-inner-item" prop="sumPayParityDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'STAN_PARITY'}"
                             :chooseName.sync="addlocalInfoForm.sumPayParityDict"
                             :chooseId.sync="addlocalInfoForm.sumPayParity" :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="addlocalFun">确 定</sino-button>
          <sino-button type="text" @click="resetAddLocal">取 消</sino-button>
        </div>
      </sino-form>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
//        areaUrl: this.apiPath.hrsc.findAreaListGroup,
        areaUrl: this.apiPath.hrsc.findAreaList,
        prodUrl: this.apiPath.hrsc.findpropayname,
        formulaFlag: false,
        prodData: {},
        addlocalInfoForm: {
          areaId: '',
          areaName: '',
          begDate: '',
          takeEffectDate: '',
          socAvgWage: '',
          stanType: '',
          prodId: '',
          prodName: '',
          stanName: '',
          entPayProp: '',
          perPayProp: '',
          entRadixUpperLimit: '',
          entRadixLowerLimit: '',
          entAddiMoney: 0,
          perRadixUpperLimit: '',
          perRadixLowerLimit: '',
          perAddiMoney: 0,
          entRadixAccuracy: '', //
          entRadixAccuracyDict: '',
          entRadixRouPrin: '',
          entRadixRouPrinDict: '',
          entRadixParity: '',
          entRadixParityDict: '',
          perRadixAccuracy: '',
          perRadixAccuracyDict: '',
          perRadixRouPrin: '',
          perRadixRouPrinDict: '',
          parRadixParity: '',
          parRadixParityDict: '',
          entPayAccuracy: '', //
          entPayAccuracyDict: '',
          entPayRouPrin: '',
          entPayRouPrinDict: '',
          entPayParity: '',
          entPayParityDict: '',
          perPayAccuracy: '',
          perPayAccuracyDict: '',
          perPayRouPrin: '',
          perPayRouPrinDict: '',
          perPayParity: '',
          perPayParityDict: '',
          formulaType: '',
          formulaTypeDict: '',
          chargeFre: '',
          chargeFreUnit: 1,
          chargeFreUnitName: '自然月',
          chargingFre: '',
          chargingFreUnit: 1,
          chargingFreUnitName: '自然月',
          sumPayAccuracy: '',
          sumPayAccuracyDict: '',
          sumPayRouPrin: '',
          sumPayRouPrinDict: '',
          sumPayParity: '',
          sumPayParityDict: ''
        },
        addlocalInfoRules: {
          areaName: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          begDate: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
          takeEffectDate: [
            {required: true, message: '请选择执行日期', trigger: 'change'}
          ],
          stanType: [
            {type: 'number', required: true, message: '请选择地方标准类别', trigger: 'change'}
          ],
          prodName: [
            {required: true, message: '请选择地方标准项', trigger: 'change'}
          ],
          stanName: [
            {required: true, message: '请选择地方标准名称', trigger: 'change'}
          ],
          entPayProp: [
            {type: 'number', required: true, message: '请输入企业比例（%）', trigger: 'change'},
            {validator: this.validator.checkPointNum, trigger: 'change'}
          ],
          perPayProp: [
            {type: 'number', required: true, message: '请输入个人比例（%）', trigger: 'change'},
            {validator: this.validator.checkPointNum, trigger: 'change'}
          ],
          entRadixUpperLimit: [
            {type: 'number', required: true, message: '请输入企业基数上限', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          entRadixLowerLimit: [
//            {type: 'number', validator: this.validator.checkReNum, trigger: 'change'}
            {type: 'number', required: true, message: '请输入企业基数下限', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          entAddiMoney: [
            {type: 'number', required: true, message: '请输入企业附加（元）', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          perRadixUpperLimit: [
            {type: 'number', required: true, message: '请输入个人基数上限', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          perRadixLowerLimit: [
            {type: 'number', required: true, message: '请输入个人基数下限', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          perAddiMoney: [
            {type: 'number', required: true, message: '请输入个人附加（元）', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          entRadixAccuracyDict: [
            {required: true, message: '请选择企业基数精度', trigger: 'change'}
          ],
          entRadixRouPrinDict: [
            {required: true, message: '请选择企业基数舍入原则', trigger: 'change'}
          ],
          entRadixParityDict: [
            {required: true, message: '请选择企业基数奇偶限定', trigger: 'change'}
          ],
          perRadixAccuracyDict: [
            {required: true, message: '请选择个人基数精度', trigger: 'change'}
          ],
          perRadixRouPrinDict: [
            {required: true, message: '请选择个人基数舍入原则', trigger: 'change'}
          ],
          parRadixParityDict: [
            {required: true, message: '请选择个人基数奇偶限定', trigger: 'change'}
          ],
          entPayAccuracyDict: [
            {required: true, message: '请选择企业缴纳额精度', trigger: 'change'}
          ],
          entPayRouPrinDict: [
            {required: true, message: '请选择企业缴纳额舍入原则', trigger: 'change'}
          ],
          entPayParityDict: [
            {required: true, message: '请选择企业缴纳额奇偶限定', trigger: 'change'}
          ],
          perPayAccuracyDict: [
            {required: true, message: '请选择个人缴纳额精度', trigger: 'change'}
          ],
          perPayRouPrinDict: [
            {required: true, message: '请选择个人缴纳额舍入原则', trigger: 'change'}
          ],
          perPayParityDict: [
            {required: true, message: '请选择个人缴纳额奇偶限定', trigger: 'change'}
          ],
          formulaTypeDict: [
            {required: true, message: '请选择计算公式类型', trigger: 'change'}
          ],
          chargeFre: [
            {type: 'number', required: true, message: '请输入收费频率', trigger: 'change'}
          ],
          chargeFreUnitName: [
            {required: true, message: '请选择收费频率单位', trigger: 'change'}
          ],
          chargingFre: [
            {type: 'number', required: true, message: '请输入计费频率', trigger: 'change'}
          ],
          chargingFreUnitName: [
            {required: true, message: '请选择计费频率单位', trigger: 'change'}
          ],
          sumPayRouPrinDict: [
            {required: true, message: '请选择总缴纳额舍入原则', trigger: 'change'}
          ],
          sumPayParityDict: [
            {required: true, message: '请选择总缴纳额就限定', trigger: 'change'}
          ]
        },
        pkgStateList: [],
        endDateFun: {
          disabledDate (time) {
            return time.toString().split(" ")[2] !== '01';
          }
        }
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'LOCAL_STAN_CATE', defaultValue: '1'}).then(res => {
        this.pkgStateList = res.data.list;
        this.pkgStateList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.addlocalInfoForm.stanType = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      let _this = this;
      setTimeout(function () {
        if (_this.$route.params.type === 'modifyLocal') {
          _this.modifyFun();
        }
      }, 100);
      this.addlocalInfoForm.chargeFre = 1;
      this.addlocalInfoForm.chargingFre = 1;
    },
    watch: {
      'addlocalInfoForm.formulaType': function (curVal, oldVal) {
        if (curVal === 2) {
          this.formulaFlag = true;
        } else {
          this.formulaFlag = false;
        }
      },
      'addlocalInfoForm.stanType': function (curVal, oldVal) {
        this.prodData = {
          proPayType: curVal
        };
      },
      'addlocalInfoForm.prodName': function (curVal, oldVal) {
        if (this.$route.params.type === 'addLocal') {
          this.addlocalInfoForm.stanName = curVal;
        }
      }
    },
    methods: {
      dataCallback (val) {
        this.addlocalInfoForm.begDate = val;
      },
      takeDateCallback (val) {
        this.addlocalInfoForm.takeEffectDate = val;
      },
      modifyFun () {
        let _data = {
          stanId: this.$route.params.stanId
        };
        api.post(this.apiPath.hrsc.getLocalStan, _data).then(res => {
          let prodName = res.data.prodName;
          let prodId = res.data.prodId;
          this.addlocalInfoForm = res.data;
          let that = this;
          setTimeout(function () {
            that.addlocalInfoForm.prodName = prodName;
            that.addlocalInfoForm.prodId = prodId;
          });
        }).catch(err => {
          console.log(err);
        });
      },
      // 确 定
      saveAddiFun () {
        let _this = this;
        this.addlocalInfoForm.stanId = this.$route.params.stanId;
        api.post(this.apiPath.hrsc.saveAddiStan, this.addlocalInfoForm).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.$message({
              message: '新增补缴成功！',
              type: 'success',
              onClose: function () {
                _this.$router.push({path: '/localInfo', query: {type: 'addlocal'}});
              }});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      saveLocalFun () {
        let _this = this;
        api.post(this.apiPath.hrsc.saveLocalStan, this.addlocalInfoForm).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.$message({message: '新增成功！',
              type: 'success',
              onClose: function () {
                _this.$router.push({path: '/localInfo', query: {type: 'addlocal'}});
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      updateLocalFun () {
        let _this = this;
        api.post(this.apiPath.hrsc.updateLocalStan, this.addlocalInfoForm).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.$message({message: '修改成功！',
              type: 'success',
              onClose: function () {
                _this.$router.push({path: '/localInfo', query: {type: 'updatelocal'}});
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      addlocalFun () {
        let _this = this;
        this.$refs.addlocalInfoForm.validate((valid) => {
          if (valid) {
            if (this.$route.params.type === 'addPay') {
              this.saveAddiFun();
            } else if (this.$route.params.type === 'addLocal') {
              this.saveLocalFun();
            } else {
              this.updateLocalFun();
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      resetAddLocal () {
        this.$router.push({path: '/localInfo'});
      }
    }
  };
</script>
