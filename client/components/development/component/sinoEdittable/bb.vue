<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Table 可编辑的表格</h2>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="data" border :row-style="showTr" max-height="205">
          <sino-table-column type="selection" width="50" align="center"></sino-table-column>
          <sino-table-column prop="id" label="序号" width="70" align="center"></sino-table-column>
          <!--<sino-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text">
            <template scope="scope">
              <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level"
                    class="ms-tree-space"></span>
              <span class="button is-outlined is-primary is-small" v-if="true" @click="toggle(scope.$index)">
                  <i v-if="!toggleIconShow(index,scope.row)" class="iconfont sino-nochild" aria-hidden="true"></i>
                  <i v-if="toggleIconShow(index,scope.row) && !scope.row._expanded" class="iconfont sino-wenjianjia1"
                     aria-hidden="true"></i>
                  <i v-if="toggleIconShow(index,scope.row) && scope.row._expanded" class="iconfont sino-wenjianjia"
                     aria-hidden="true"></i>
              </span>
              <span v-else-if="index===0" class="ms-tree-space"></span>
              {{scope.row[column.dataIndex]}}
            </template>
          </sino-table-column>-->
          <sino-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" min-width="180">
            <template scope="scope">
              <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" :key="space" class="ms-tree-space"></span>
              <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                <i v-if="!scope.row._expanded" class="iconfont sino-wenjianjia1" aria-hidden="true"></i>
                <i v-if="scope.row._expanded" class="iconfont sino-wenjianjia" aria-hidden="true"></i>
              </span>
              {{scope.row[column.dataIndex]}}
            </template>
          </sino-table-column>
          <sino-table-column label="执行地区" :editType='true'>
            <template scope="scope">
              <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false;blurInput(scope,$event)"
                          v-model="scope.row.address"></sino-input>
              <span v-show="!scope.row.edit" @click="scope.row.edit = true;">{{ scope.row.address }}</span>
            </template>
          </sino-table-column>
          <sino-table-column label="起做日期" :editType='true'>
            <template scope="scope">
              <sino-date-picker v-show="scope.row.editDate" v-model="scope.row.startDate" type="date"
                                placeholder="请选择时间" :editable="false" :readonly="false" format="yyyy-MM-dd"
                                :clearable="false" @blur="scope.row.editDate = false;blurDate(scope,$event)">
              </sino-date-picker>
              <span v-show="!scope.row.editDate" @click="scope.row.editDate = true">{{ scope.row.startDate | capitalize}}</span>
            </template>
          </sino-table-column>
          <sino-table-column label="止做日期" :editType='true'>
            <template scope="scope">
              <sino-date-picker v-show="scope.row.editEndDate" v-model="scope.row.endDate" type="date"
                                placeholder="请选择时间" :editable="false" :readonly="false" :clearable="false"
                                @blur="scope.row.editEndDate = false;blurEndDate(scope,$event)"></sino-date-picker>
              <span v-show="!scope.row.editEndDate"
                    @click="scope.row.editEndDate = true">{{ scope.row.endDate | capitalize }}</span>
            </template>
          </sino-table-column>
          <sino-table-column label="下拉选项" :editType='true'>
            <template scope="scope">
              <select v-show="scope.row.editSelect" v-model="scope.row.selectName"
                      @change="scope.row.editSelect = false;blurSelect(scope,$event)">
                <option v-for="option in options" v-bind:value="option.selectName">
                  {{ option.selectName }}
                </option>
              </select>
              <span v-show="!scope.row.editSelect"
                    @click="scope.row.editSelect = true;">{{ scope.row.selectName}}</span>
            </template>
          </sino-table-column>
          <sino-table-column align="center" label="操作" width="80">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span">查看</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-button @click="submit" style="margin: 10px auto 0 auto">提交</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        list: [],
        name1: &#39;&#39;,
        id1: &#39;&#39;,
        data: [],
        columns: [
          {
            text: &#39;产品名称&#39;,
            dataIndex: &#39;name&#39;
          }
        ],
        dataOrg: [],
        dataSource: [
          {
            id: 1,
            parentId: 0,
            name: &#39;员工管理基础服务&#39;,
            age: 18,
            sex: &#39;男&#39;,
            startDate: &#39;2016-05-02&#39;,
            endDate: &#39;2020-05-02&#39;,
            address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
            edit: false,
            editDate: false,
            editEndDate: false,
            children: [
              {
                id: &#39;2&#39;,
                parentId: 1,
                name: &#39;用工协议管理服务&#39;,
                age: 22,
                sex: &#39;男&#39;,
                startDate: &#39;2016-05-02&#39;,
                endDate: &#39;2020-05-02&#39;,
                address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
                edit: false,
                editDate: false,
                editEndDate: false
              }
            ]
          },
          {
            id: 3,
            parentId: 0,
            name: &#39;入职体检&#39;,
            age: 23,
            sex: &#39;女&#39;,
            startDate: &#39;2016-05-02&#39;,
            endDate: &#39;2020-05-02&#39;,
            address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
            edit: false,
            editDate: false,
            editEndDate: false,
            children: [
              {
                id: &#39;4&#39;,
                parentId: 3,
                name: &#39;测试4&#39;,
                age: 22,
                sex: &#39;男&#39;,
                startDate: &#39;2016-05-02&#39;,
                endDate: &#39;2020-05-02&#39;,
                address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
                edit: false,
                editDate: false,
                editEndDate: false
              },
              {
                id: &#39;5&#39;,
                parentId: 3,
                name: &#39;测试5&#39;,
                age: 25,
                sex: &#39;男&#39;,
                startDate: &#39;2016-05-02&#39;,
                endDate: &#39;2020-05-02&#39;,
                address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
                edit: false,
                editDate: false,
                editEndDate: false
              },
              {
                id: &#39;6&#39;,
                parentId: 3,
                name: &#39;测试6&#39;,
                age: 26,
                sex: &#39;女&#39;,
                startDate: &#39;2016-05-02&#39;,
                endDate: &#39;2020-05-02&#39;,
                address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
                edit: false,
                editDate: false,
                editEndDate: false,
                children: [
                  {
                    id: &#39;&#39;,
                    parentId: 6,
                    name: &#39;测试7&#39;,
                    age: 27,
                    sex: &#39;男&#39;,
                    startDate: &#39;2016-05-02&#39;,
                    endDate: &#39;2020-05-02&#39;,
                    address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
                    edit: false,
                    editDate: false,
                    editEndDate: false
                  }
                ]
              }
            ]
          },
          {
            id: 18,
            parentId: 0,
            name: &#39;人身意外保险&#39;,
            age: 18,
            sex: &#39;男&#39;,
            startDate: &#39;2016-05-02&#39;,
            endDate: &#39;2020-05-02&#39;,
            address: &#39;上海市普陀区金沙江路 1518 弄&#39;,
            edit: false,
            editDate: false,
            editEndDate: false
          }
        ],
        treeStructure: true,
        defaultExpandAll: false,
        options: [
          { selectName: &#39;吃饭&#39;, value: &#39;A&#39; },
          { selectName: &#39;很好&#39;, value: &#39;B&#39; },
          { selectName: &#39;哈哈&#39;, value: &#39;C&#39; },
          { selectName: &#39;爱吃&#39;, value: &#39;D&#39; },
          { selectName: &#39;地方&#39;, value: &#39;E&#39; },
          {selectName: &#39;阿萨德&#39;, value: &#39;F&#39;}
        ]
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>

    <h2 class="sino-compon-h2">table 可控制可编辑</h2>
    <div class="demo-block">
      <div class="demo-source">
        <div class="sino-queryList">
          <div class="sino-table-total">
            <div class="sino-table-icon">
              <div class="sino-table-icon-left">
                <sino-button type="icon-text" @click="configDialogFun"><i class="iconfont sino-modify"></i>维护执行结束日期</sino-button>
              </div>
            </div>
            <sino-table height="340" :data="confPkgOutData" stripe v-on:radioSelect="selectOutCallBack" border>
              <sino-table-column type="radioSelection" prop="conId"></sino-table-column>
              <sino-table-column type="index" label="序号" width="70" align="center"></sino-table-column>
              <sino-table-column prop="stanName" label="地方标准名称"></sino-table-column>
              <sino-table-column prop="takeEffectDate" label="开始执行日期" min-width="100"></sino-table-column>

              <sino-table-column label="执行结束日期" min-width="100" :editType="editTypeFlag">
                <template scope="scope">
                  <sino-date-picker v-show="scope.row.editDateSub" v-model="scope.row.takeEffectDateEnd" type="date" placeholder="请选择时间" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false" @blur="scope.row.editDateSub = false;blurDate(scope,$event)">
                  </sino-date-picker>
                  <span v-show="!scope.row.editDateSub" @click="editDateSubFun(scope)">{{ scope.row.takeEffectDateEnd | capitalize}}</span>
                </template>
              </sino-table-column>

              <sino-table-column prop="entPayProp" label="企业比例（%）"></sino-table-column>
              <sino-table-column prop="entRadixUpperLimit" label="企业基数上限"></sino-table-column>
              <sino-table-column prop="entRadixLowerLimit" label="企业基数下限"></sino-table-column>
              <sino-table-column prop="perPayProp" label="个人比例（%）"></sino-table-column>
              <sino-table-column prop="perRadixUpperLimit" label="个人基数上限"></sino-table-column>
              <sino-table-column prop="perRadixLowerLimit" label="个人基数下限"></sino-table-column>
            </sino-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import util from 'util';
  import Utils from './utils/index.js';
  import api from '../../../../api';

  //  let newDate;
  let checkedOutArr;
  function parents (ele, tagName) {
    if (ele.parentNode.nodeType === 1 && ele.parentNode.tagName === tagName) {
      return ele.parentNode;
    } else {
      if (ele.parentNode) {
        return parents(ele.parentNode, tagName);
      }
      return '';
    }
  }

  export default {
    components: {},
    data () {
      return {
        show: false,
        list: [],
        name1: '',
        id1: '',
        data: [],
        columns: [
          {
            text: '产品名称',
            dataIndex: 'name'
          }
        ],
        dataOrg: [],
        dataSource: [
          {
            id: 1,
            parentId: 0,
            name: '员工管理基础服务',
            age: 18,
            sex: '男',
            startDate: '2016-05-02',
            endDate: '2020-05-02',
            address: '上海市普陀区金沙江路 1518 弄',
            edit: false,
            editDate: false,
            editEndDate: false,
            children: [
              {
                id: '2',
                parentId: 1,
                name: '用工协议管理服务',
                age: 22,
                sex: '男',
                startDate: '2016-05-02',
                endDate: '2020-05-02',
                address: '上海市普陀区金沙江路 1518 弄',
                edit: false,
                editDate: false,
                editEndDate: false
              }
            ]
          },
          {
            id: 18,
            parentId: 0,
            name: '人身意外保险',
            age: 18,
            sex: '男',
            startDate: '2016-05-02',
            endDate: '2020-05-02',
            address: '上海市普陀区金沙江路 1518 弄',
            edit: false,
            editDate: false,
            editEndDate: false
          }
        ],
        treeStructure: false,
        defaultExpandAll: false,
        options: [
          {selectName: '吃饭', value: 'A'},
          {selectName: '很好', value: 'B'},
          {selectName: '阿萨德', value: 'F'}
        ],
        //
        editTypeFlag: false,
        confPkgOutData: [{
          "stanId": 90,
          "prodId": 1,
          "prodName": "生育保险",
          "areaId": 752254,
          "areaName": null,
          "stanType": 1,
          "stanTypeDict": null,
          "stanName": "北京地方标准",
          "payFeePerType": null,
          "socAvgWage": 11.0,
          "socAvgWageDesc": null,
          "perRadixUpperLimit": 1.11,
          "entRadixUpperLimit": 1.11,
          "perRadixLowerLimit": 1.0,
          "entRadixLowerLimit": 1.0,
          "perRadixAccuracy": 3,
          "perRadixAccuracyDict": null,
          "entRadixAccuracy": 2,
          "entRadixAccuracyDict": null,
          "perRadixRouPrin": 3,
          "perRadixRouPrinDict": null,
          "entRadixRouPrin": 2,
          "entRadixRouPrinDict": null,
          "parRadixParity": 2,
          "parRadixParityDict": null,
          "entRadixParity": 2,
          "entRadixParityDict": null,
          "accuDutyFreeRadix": null,
          "radixPayRule": null,
          "perPayProp": 1.11,
          "entPayProp": 1.11,
          "accuDutyFreeProp": null,
          "propDesc": null,
          "perAddiMoney": 0.0,
          "entAddiMoney": 0.0,
          "perPayUpperLimit": null,
          "entPayUpperLimit": null,
          "perPayLowerLimit": null,
          "entPayLowerLimit": null,
          "perPayAccuracy": 2,
          "perPayAccuracyDict": null,
          "entPayAccuracy": 2,
          "entPayAccuracyDict": null,
          "perPayRouPrin": 1,
          "perPayRouPrinDict": null,
          "entPayRouPrin": 2,
          "entPayRouPrinDict": null,
          "perPayParity": 2,
          "perPayParityDict": null,
          "entPayParity": 2,
          "entPayParityDict": null,
          "formulaType": 1,
          "formulaTypeDict": null,
          "begDate": "2017-11-01",
          "takeEffectDate": "2017-11-01",
          "takeEffectDateEnd": "2017-11-22",
          "endDate": "2017-11-30",
          "adjustSourceId": null,
          "isHasAddiStan": 0,
          "isAddiStan": 0,
          "state": 1,
          "stateDict": null,
          "sumPayAccuracy": null,
          "sumPayRouPrin": null,
          "sumPayParity": null,
          "sumPayUpperLimit": null,
          "sumPayLowerLimit": null,
          "chargeFre": 2,
          "chargeFreDict": null,
          "chargingFre": 2,
          "chargingFreDict": null,
          "creId": null,
          "creUserName": null,
          "operId": null,
          "remark": null,
          "creTime": "2017-11-02 18:11:27",
          "operTime": "2017-11-03 13:53:55",
          "isEffect": 1,
          "relAddiStanName": null,
          "relLocalStanName": null,
          "sumPayAccuracyDict": null,
          "sumPayRouPrinDict": null,
          "sumPayParityDict": null,
          "stanIds": null,
          "pkgId": null,
          "updateLocalStan": null,
          "editDateSub": false    //  默认显示
        }]
      };
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
      let me = this;
      api.getEditTable().then(res => {
        if (me.treeStructure) {
          let _oldData = Utils.MSDataTransfer.treeToArray(JSON.parse(JSON.stringify(res.data.items)), null, null, me.defaultExpandAll);
          me.dataOrg = _oldData;
          me.data = Utils.MSDataTransfer.treeToArray(res.data.items, null, null, me.defaultExpandAll);
        }
      }).catch(err => {
      });
    },
    mounted () {
      api.getSelectList().then(res => {
        this.list = res.list;
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      getValue1 (name, id, scope) {
        this.name1 = name;
        this.id1 = id;
//        scope = name;
      },
      blurFun (event) {
        let classAry = parents(event.target, 'TD');
        let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);
        for (let i = 0, len = ary.length; i < len; i++) {
          let curName = ary[i];
          if (curName === 'is-finish') {
            let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
            classAry.className = classAry.className.replace(reg, ' ');
          }
        }
      },
      blurInput (sc, event) {
        for (let i = 0; i < this.dataOrg.length; i++) {
          if (sc.row.id === this.dataOrg[i].id) {
            if (sc.row.address !== this.dataOrg[i].address) {
              parents(event.target, 'TD').className += ' is-finish';
            } else {
              this.blurFun(event);
            }
          }
        }
      },
      classAryFun (event) {
        let classAry = parents(event.$el, 'TD');
        let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);
        for (let i = 0, len = ary.length; i < len; i++) {
          let curName = ary[i];
          if (curName === 'is-finish') {
            let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
            classAry.className = classAry.className.replace(reg, ' ');
          }
        }
      },
      blurDate (sc, event) {
        let _this = this;
        setTimeout(function () {
          for (let i = 0; i < _this.dataOrg.length; i++) {
            if (sc.row.id === _this.dataOrg[i].id) {
              var d = new Date(sc.row.startDate);
              var year = d.getFullYear();
              var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
              var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
              sc.row.startDate = year + '-' + month + '-' + day;
              if (sc.row.startDate !== _this.dataOrg[i].startDate) {
                parents(event.$el, 'TD').className += ' is-finish';
              } else {
                this.classAryFun(event);
              }
            }
          }
        }, 100);
      },
      blurEndDate (sc, event) {
        let _this = this;
        setTimeout(function () {
          for (let i = 0; i < _this.dataOrg.length; i++) {
            if (sc.row.id === _this.dataOrg[i].id) {
              var d = new Date(sc.row.endDate);
              var year = d.getFullYear();
              var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
              var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
              sc.row.endDate = year + '-' + month + '-' + day;
              if (sc.row.endDate !== _this.dataOrg[i].endDate) {
                parents(event.$el, 'TD').className += ' is-finish';
              } else {
//                let classAry = parents(event.$el, 'TD');
//                let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);
//                for (let i = 0, len = ary.length; i < len; i++) {
//                  let curName = ary[i];
//                  if (curName === 'is-finish') {
//                    let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
//                    classAry.className = classAry.className.replace(reg, ' ');
//                  }
//                }
                this.classAryFun(event);
              }
            }
          }
        }, 100);
      },
      blurSelect (sc, event) {
        for (let i = 0; i < this.dataOrg.length; i++) {
          if (sc.row.id === this.dataOrg[i].id) {
            if (sc.row.selectName !== this.dataOrg[i].selectName) {
              parents(event.target, 'TD').className += ' is-finish';
            } else {
//              let classAry = parents(event.target, 'TD');
//              let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);
//              for (let i = 0, len = ary.length; i < len; i++) {
//                let curName = ary[i];
//                if (curName === 'is-finish') {
//                  let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
//                  classAry.className = classAry.className.replace(reg, ' ');
//                }
//              }
              this.classAryFun(event);
            }
          }
        }
      },
      submit () {
        const aa = this.data;
        console.log(aa);
      },
      // 显示行
      showTr: function (row, index) {
        let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true);
        row._show = show;
        return show ? '' : 'display:none;';
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this;
        let record = me.data[trIndex];
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
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        }
        return false;
      },
      // /*// 显示行
      // showTr: function (row, index) {
      //   let show = (row._parent ? (row._parent._expanded && row._parent._show) : true);
      //   row._show = show;
      //   return show ? '' : 'display:none';
      // },
      // // 展开下级
      // toggle: function (trIndex) {
      //   let me = this;
      //   let record = me.data[trIndex];
      //   record._expanded = !record._expanded;
      // },
      // // 显示层级关系的空格和图标
      // spaceIconShow (index) {
      //   let me = this;
      //   if (me.treeStructure && index === 0) {
      //     return true;
      //   }
      //   return false;
      // },
      // // 点击展开和关闭的时候，图标的切换
      // toggleIconShow (index, record) {
      //   let me = this;
      //   if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
      //     return true;
      //   }
      //   return false;
      // },*/
      //  表格
      selectOutCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedOutArr = selectTion;
      },
      configDialogFun () {
        if (!checkedOutArr || checkedOutArr.length < 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.editTypeFlag = true;
      },
      editDateSubFun (_scope) {
        if (checkedOutArr && checkedOutArr.length > 0) {
          if (checkedOutArr[0].stanId !== _scope.row.stanId) {
            this.$alert('请修改当前选中的数据', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true
            });
            return;
          }
        }
        if (this.editTypeFlag === true) {
          let ssss = JSON.parse(JSON.stringify(_scope.row));
          for (let j = 0; j < this.confPkgOutData.length; j++) {
            if (_scope.row.stanId === this.confPkgOutData[j].stanId) {
              this.confPkgOutData[j].stanName = '';
              this.confPkgOutData[j].editDateSub = true;
              this.confPkgOutData[j].stanName = ssss.stanName;
            }
          }
        }
      }
    }
  };
</script>
<style scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
</style>
