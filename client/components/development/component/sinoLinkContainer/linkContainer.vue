<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">树和三角联动</h2>
    <div>
      <div class="demo-block">
        <div class="demo-source">
          <sino-tree :data="data1" @node-click="handleNodeClick" show-checkbox
                     node-key="id"
                     :default-expanded-keys="expandedkeys"
                     :props="defaultProps"
                     v-on:ascNode="ascNode"
                     ref="tree"
                     @node-expand="nodeExpand"
                     @node-collapse="nodeCollapse"
                     check-strictly
                     @current-change = "checkChangeFun"
                     class="tree-linkBox"
          ></sino-tree>
          <sino-link-container :outBoxStyle="outBoxStyle" :innerBoxStyle="innerBoxStyle" :triangleStyle="triangleStyle"></sino-link-container>
          <sino-dialog :title="dialogTitle" :visible.sync ="dialogTableVisible" class="tree-edit-layer"  :show-close="true" :lock-scroll="false" @open="getQueryList">
            <ul class="tree-edit-layer-ul">
              <li>
                <div class="fl title">信息名称：</div>
                <div class="fl content-text">
                  <sino-input v-model="creatObj.label"></sino-input>
                </div>
                <div class="fl title">URL：</div>
                <div class="fl content-text">
                  <sino-input v-model="creatObj.url"></sino-input>
                </div>
              </li>
              <li>
                <div class="fl title">信息类型：</div>
                <div class="fl content-text">
                  <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :queryList="list" :chooseName="creatObj.type" :chooseId="creatObj.typeId" v-on:getValue="getValue1" :clear="true" @open=""></sino-select>
                </div>
                <div class="fl title">图标：</div>
                <div class="fl content-text">
                  <sino-radio v-model="creatObj.icon" label="1" >有</sino-radio>
                  <sino-radio v-model="creatObj.icon" label="0" >无</sino-radio>
                </div>
              </li>
              <li class="">
                <div class="fl title">信息描述：</div>
                <div class="fl content-textarea">
                  <sino-input type="textarea" v-model="creatObj.desc"></sino-input>
                </div>
              </li>
            </ul>
            <div slot="footer" class="dialog-footer" v-if="dialogTitle == '新增信息'">
              <button class="tree-button-save" @click="addNodeSave">保 存</button>
              <button class="tree-button-cancel" @click="addNodeCancel">取 消</button>
            </div>
            <div slot="footer" class="dialog-footer" v-else>
              <button class="tree-button-save" @click="addNodeSave1">保 存</button>
              <button class="tree-button-cancel" @click="addNodeCancel1">取 消</button>
            </div>
          </sino-dialog>
        </div>
        <sino-collapse-transition>
          <div class="demo-meta" v-show="show">
            <div class="demo-highlight">
              <code>
                <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;div&gt;
      &lt;sino-tree :data=&quot;data1&quot; @node-click=&quot;handleNodeClick&quot; show-checkbox
                 node-key=&quot;id&quot;
                 :default-expanded-keys=&quot;expandedkeys&quot;
                 :props=&quot;defaultProps&quot;
                 v-on:ascNode=&quot;ascNode&quot;
                 ref=&quot;tree&quot;
                 @node-expand=&quot;nodeExpand&quot;
                 @node-collapse=&quot;nodeCollapse&quot;
                 check-strictly
                 @current-change = &quot;checkChangeFun&quot;
                 class=&quot;tree-linkBox&quot;
      &gt;&lt;/sino-tree&gt;
      &lt;sino-link-container :outBoxStyle=&quot;outBoxStyle&quot; :innerBoxStyle=&quot;innerBoxStyle&quot;
                  :triangleStyle=&quot;triangleStyle&quot;&gt;&lt;/sino-link-container&gt;
                  &lt;sino-dialog :title=&quot;dialogTitle&quot;
                  :visible.sync =&quot;dialogTableVisible&quot; class=&quot;tree-edit-layer&quot;
                  :show-close=&quot;true&quot; :lock-scroll=&quot;false&quot; @open=&quot;getQueryList&quot;&gt;
        &lt;ul class=&quot;tree-edit-layer-ul&quot;&gt;
          &lt;li&gt;
            &lt;div class=&quot;fl title&quot;&gt;信息名称：&lt;/div&gt;
            &lt;div class=&quot;fl content-text&quot;&gt;
              &lt;sino-input v-model=&quot;creatObj.label&quot;&gt;&lt;/sino-input&gt;
            &lt;/div&gt;
            &lt;div class=&quot;fl title&quot;&gt;URL：&lt;/div&gt;
            &lt;div class=&quot;fl content-text&quot;&gt;
              &lt;sino-input v-model=&quot;creatObj.url&quot;&gt;&lt;/sino-input&gt;
            &lt;/div&gt;
          &lt;/li&gt;
          &lt;li&gt;
            &lt;div class=&quot;fl title&quot;&gt;信息类型：&lt;/div&gt;
            &lt;div class=&quot;fl content-text&quot;&gt;
                  &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                  :filterable=&quot;false&quot; :multiselect=&quot;false&quot; :isshowTotol=&quot;false&quot;
                  :disabled=&quot;false&quot; :totalNum=&quot;false&quot; :isPage=&quot;false&quot;
                  :isGroup=&quot;false&quot; :queryList=&quot;list&quot;
                  :chooseName=&quot;creatObj.type&quot;
                  :chooseId=&quot;creatObj.typeId&quot;
                  v-on:getValue=&quot;getValue1&quot;
                  :clear=&quot;true&quot; @open=&quot;&quot;&gt;&lt;/sino-select&gt;
            &lt;/div&gt;
            &lt;div class=&quot;fl title&quot;&gt;图标：&lt;/div&gt;
            &lt;div class=&quot;fl content-text&quot;&gt;
              &lt;sino-radio v-model=&quot;creatObj.icon&quot; label=&quot;1&quot; &gt;有&lt;/sino-radio&gt;
              &lt;sino-radio v-model=&quot;creatObj.icon&quot; label=&quot;0&quot; &gt;无&lt;/sino-radio&gt;
            &lt;/div&gt;
          &lt;/li&gt;
          &lt;li class=&quot;&quot;&gt;
            &lt;div class=&quot;fl title&quot;&gt;信息描述：&lt;/div&gt;
            &lt;div class=&quot;fl content-textarea&quot;&gt;
              &lt;sino-input type=&quot;textarea&quot; v-model=&quot;creatObj.desc&quot;&gt;&lt;/sino-input&gt;
            &lt;/div&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
        &lt;div slot=&quot;footer&quot; class=&quot;dialog-footer&quot; v-if=&quot;dialogTitle == &#39;新增信息&#39;&quot;&gt;
          &lt;button class=&quot;tree-button-save&quot; @click=&quot;addNodeSave&quot;&gt;保 存&lt;/button&gt;
          &lt;button class=&quot;tree-button-cancel&quot; @click=&quot;addNodeCancel&quot;&gt;取 消&lt;/button&gt;
        &lt;/div&gt;
        &lt;div slot=&quot;footer&quot; class=&quot;dialog-footer&quot; v-else&gt;
          &lt;button class=&quot;tree-button-save&quot; @click=&quot;addNodeSave1&quot;&gt;保 存&lt;/button&gt;
          &lt;button class=&quot;tree-button-cancel&quot; @click=&quot;addNodeCancel1&quot;&gt;取 消&lt;/button&gt;
        &lt;/div&gt;
      &lt;/sino-dialog&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  import api from &#39;../../../../api&#39;;
  import Vue from &#39;vue&#39;;
  let CHECKKEYS;
  let addParentNode;
  let treeDate;
  let wangjijun = 20;
  let CHECKEDFLAG = false;
  function addNode (tag, self, add) {
    for (var i in tag) {
      if (tag[i].id === self.id) {
        if (tag[i].children) {
          add.id = wangjijun;
          wangjijun++;
          tag[i].children.push(JSON.parse(JSON.stringify(add)));
        } else {
          tag[i].children = [];
          add.id = wangjijun;
          wangjijun++;
          tag[i].children.push(JSON.parse(JSON.stringify(add)));
        }
        break;
      } else {
        if (typeof (tag[i]) === &#39;object&#39;) {
          addNode(tag[i], self, add);
        }
      }
    }
  }
  function editNode (tag, self, add) {
    for (let i in tag) {
      if (tag[i].id === self.id) {
        tag[i] = add;
        break;
      } else {
        if (typeof (tag[i]) === &#39;object&#39;) {
          editNode(tag[i], self, add);
        }
      }
    }
  }
  function deleteNode (tag, self) {
    for (var i in tag) {
      if (tag[i].id === self.id) {
        tag.splice(i, 1);
        break;
      } else {
        if (typeof (tag[i]) === &#39;object&#39;) {
          deleteNode(tag[i], self);
        }
      }
    }
  }
  function offset (curEle) {
    var disTop = curEle.offsetTop;
    var par = curEle.offsetParent;
    while (par) {
      disTop += par.offsetTop;
      par = par.offsetParent;
    }
    return disTop;
  }
  export default {
    data: function () {
      return {
        outBoxStyle: {
          width: &#39;50%&#39;,
          float: &#39;left&#39;,
          height: &#39;600px&#39;
        },
        innerBoxStyle: {
          height: &#39;100%&#39;,
          boxSizing: &#39;border-box&#39;,
          marginLeft: &#39;10px&#39;
        },
        triangleStyle: {
          display: &#39;none&#39;,
          top: 0
        },
        dialogTableVisible: false,
        dialogTitle: &#39;新增信息&#39;,
        checkedkeys: [5],
        expandedkeys: [2, 3],
        creatObj: {
          label: &#39;&#39;,
          url: &#39;&#39;,
          type: &#39;&#39;,
          typeId: &#39;&#39;,
          icon: &#39;&#39;,
          desc: &#39;&#39;,
          id: &#39;&#39;
        },
        name1: &#39;&#39;,
        id1: &#39;&#39;,
        list: [],
        radio: &#39;&#39;,
        data1: [
          {
            id: 1,
            label: &#39;一级 1&#39;,
            level: 1,
            children: [{
              id: 4,
              label: &#39;二级 1-1&#39;,
              level: 2,
              children: [{
                id: 9,
                label: &#39;三级 1-1-1&#39;,
                level: 3,
                disabled: true
              }, {
                id: 10,
                level: 3,
                label: &#39;三级 1-1-2&#39;
              }]
            }, {
              id: 11,
              label: &#39;二级 1-2&#39;,
              level: 2,
              children: [{
                id: 12,
                label: &#39;三级 1-2-1&#39;,
                level: 3
              }, {
                id: 13,
                level: 3,
                label: &#39;三级 1-2-2&#39;
              }]
            }]
          }, {
            id: 2,
            label: &#39;一级 2&#39;,
            level: 1,
            children: [{
              id: 5,
              level: 2,
              label: &#39;二级 2-1&#39;
            }, {
              id: 6,
              level: 2,
              label: &#39;二级 2-2&#39;
            }]
          },
          {
            id: 3,
            label: &#39;一级 3&#39;,
            level: 1,
            children: [{
              id: 7,
              level: 2,
              label: &#39;二级 3-1&#39;
            }, {
              id: 8,
              level: 2,
              label: &#39;二级 3-2&#39;
            }]
          }],
        defaultProps: {
          children: &#39;children&#39;,
          label: &#39;label&#39;
        }
      };
    },
    watch: {
      dialogTableVisible (val) {
        if (!val) {
          this.creatObj = {
            label: &#39;&#39;,
            url: &#39;&#39;,
            type: &#39;&#39;,
            typeId: &#39;&#39;,
            icon: &#39;&#39;,
            desc: &#39;&#39;
          };
        }
      }
    },
    updated: function () {
      if (CHECKEDFLAG) {
        this.$refs.tree.setCheckedKeys(CHECKKEYS);
        this.$nextTick(function () {
          if (this.$refs.tree.getCheckedKeys()) {
            this.triangleStyle.display = &#39;block&#39;;
            this.triangleStyle.top = (offset(document.getElementsByClassName(&#39;is-checked&#39;)[0])
                  - offset(document.getElementsByClassName(&#39;sino-link-container&#39;)[0]))
                  + &#39;px&#39;;
          } else {
            this.triangleStyle.display = &#39;none&#39;;
          }
        });
        CHECKEDFLAG = false;
      }
    },
    methods: {
      getQueryList () {
        api.getSelectList().then(res =&gt; {
          this.list = res.list;
        }).catch(err =&gt; {
          console.log(err);
        });
      },
      getValue1 (name, id) {
        this.creatObj.type = name;
        this.creatObj.typeId = id;
      },
      ascNode (val, self, type) {
        CHECKKEYS = this.$refs.tree.getCheckedKeys();
        CHECKEDFLAG = true;
        if (type === &#39;add&#39;) {
          this.dialogTitle = &#39;新增信息&#39;;
          this.dialogTableVisible = true;
          addParentNode = self;
          treeDate = val;
        } else if (type === &#39;edit&#39;) {
          this.dialogTitle = &#39;编辑信息&#39;;
          this.creatObj.label = self.label;
          this.creatObj.id = self.id;
          if (self.children) {
            this.creatObj.children = JSON.parse(JSON.stringify(self.children));
          }
          this.dialogTableVisible = true;
          addParentNode = self;
          treeDate = val;
        } else if (type === &#39;delete&#39;) {
          deleteNode(val, self);
          for (let j = 0; j &lt; val.length; j++) {
            Vue.set(this.data1, j, val[j]);
          }
        } else {
          for (let j = 0; j &lt; val.length; j++) {
            Vue.set(this.data1, j, val[j]);
          }
        }
      },
      addNodeSave () {
        addNode(treeDate, addParentNode, this.creatObj);
        this.dialogTableVisible = false;
        for (var j = 0; j &lt; treeDate.length; j++) {
          Vue.set(this.data1, j, treeDate[j]);
        }
      },
      addNodeCancel () {
        this.dialogTableVisible = false;
      },
      addNodeSave1 () {
        editNode(treeDate, addParentNode, this.creatObj);
        this.dialogTableVisible = false;
        for (var j = 0; j &lt; treeDate.length; j++) {
          Vue.set(this.data1, j, treeDate[j]);
        }
      },
      addNodeCancel1 () {
        this.dialogTableVisible = false;
      },
      changeNodes (type, model) {
        console.log(type + model);
      },
      handleNodeClick (data, node, self) {

      },
      nodeExpand (data) {
        if (this.expandedkeys) {
          this.expandedkeys.push(data.id);
        } else {
          this.expandedkeys = [];
          this.expandedkeys.push(data.id);
        }
      },
      nodeCollapse (data) {
        this.expandedkeys.splice(this.expandedkeys.indexOf(data.id), 1);
      },
      checkChangeFun (data, node) {
        if (node.checked) {
          this.$refs.tree.setCheckedKeys([data.id]);
          this.triangleStyle.display = &#39;block&#39;;
          this.triangleStyle.top = (offset(document.getElementsByClassName(&#39;is-checked&#39;)[0])
                  - offset(document.getElementsByClassName(&#39;sino-link-container&#39;)[0]))
                  + &#39;px&#39;;
        } else {
          this.$refs.tree.setCheckedKeys([]);
          this.triangleStyle.display = &#39;none&#39;;
        }
      }
    }
  };
&lt;/script&gt;
&lt;style&gt;
  .tree-linkBox {
    float:left;
    width:50%;
    box-sizing:border-box;
  }
&lt;/style&gt;</pre>
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
    </div>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Vue from 'vue';
  let CHECKKEYS;
  let addParentNode;
  let treeDate;
  let wangjijun = 20;
  let CHECKEDFLAG = false;
  function addNode (tag, self, add) {
    for (var i in tag) {
      if (tag[i].id === self.id) {
        if (tag[i].children) {
          add.id = wangjijun;
          wangjijun++;
          tag[i].children.push(JSON.parse(JSON.stringify(add)));
        } else {
          tag[i].children = [];
          add.id = wangjijun;
          wangjijun++;
          tag[i].children.push(JSON.parse(JSON.stringify(add)));
        }
        break;
      } else {
        if (typeof (tag[i]) === 'object') {
          addNode(tag[i], self, add);
        }
      }
    }
  }
  function editNode (tag, self, add) {
    for (let i in tag) {
      if (tag[i].id === self.id) {
        tag[i] = add;
        break;
      } else {
        if (typeof (tag[i]) === 'object') {
          editNode(tag[i], self, add);
        }
      }
    }
  }
  function deleteNode (tag, self) {
    for (var i in tag) {
      if (tag[i].id === self.id) {
        tag.splice(i, 1);
        break;
      } else {
        if (typeof (tag[i]) === 'object') {
          deleteNode(tag[i], self);
        }
      }
    }
  }
  function offset (curEle) {
    var disTop = curEle.offsetTop;
    var par = curEle.offsetParent;
    while (par) {
      disTop += par.offsetTop;
      par = par.offsetParent;
    }
    return disTop;
  }
  export default {
    data: function () {
      return {
        show: false,
        outBoxStyle: {
          width: '50%',
          float: 'left',
          height: '600px'
        },
        innerBoxStyle: {
          height: '100%',
          boxSizing: 'border-box',
          marginLeft: '10px'
        },
        triangleStyle: {
          display: 'none',
          top: 0
        },
        dialogTableVisible: false,
        dialogTitle: '新增信息',
        checkedkeys: [5],
        expandedkeys: [2, 3],
        creatObj: {
          label: '',
          url: '',
          type: '',
          typeId: '',
          icon: '',
          desc: '',
          id: ''
        },
        name1: '',
        id1: '',
        list: [],
        radio: '',
        data1: [
          {
            id: 1,
            label: '一级 1',
            level: 1,
            children: [{
              id: 4,
              label: '二级 1-1',
              level: 2,
              children: [{
                id: 9,
                label: '三级 1-1-1',
                level: 3,
                disabled: true
              }, {
                id: 10,
                level: 3,
                label: '三级 1-1-2'
              }]
            }, {
              id: 11,
              label: '二级 1-2',
              level: 2,
              children: [{
                id: 12,
                label: '三级 1-2-1',
                level: 3
              }, {
                id: 13,
                level: 3,
                label: '三级 1-2-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            level: 1,
            children: [{
              id: 5,
              level: 2,
              label: '二级 2-1'
            }, {
              id: 6,
              level: 2,
              label: '二级 2-2'
            }]
          },
          {
            id: 3,
            label: '一级 3',
            level: 1,
            children: [{
              id: 7,
              level: 2,
              label: '二级 3-1'
            }, {
              id: 8,
              level: 2,
              label: '二级 3-2'
            }]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    watch: {
      dialogTableVisible (val) {
        if (!val) {
          this.creatObj = {
            label: '',
            url: '',
            type: '',
            typeId: '',
            icon: '',
            desc: ''
          };
        }
      }
    },
    updated: function () {
      if (CHECKEDFLAG) {
        this.$refs.tree.setCheckedKeys(CHECKKEYS);
        this.$nextTick(function () {
          if (this.$refs.tree.getCheckedKeys()) {
            this.triangleStyle.display = 'block';
            let off = offset(document.getElementsByClassName('is-checked')[0]);
            let off1 = offset(document.getElementsByClassName('sino-link-container')[0]);
            this.triangleStyle.top = (off - off1) + 'px';
          } else {
            this.triangleStyle.display = 'none';
          }
        });
        CHECKEDFLAG = false;
      }
    },
    methods: {
      getQueryList () {
        api.getSelectList().then(res => {
          this.list = res.list;
        }).catch(err => {
          console.log(err);
        });
      },
      getValue1 (name, id) {
        this.creatObj.type = name;
        this.creatObj.typeId = id;
      },
      ascNode (val, self, type) {
        CHECKKEYS = this.$refs.tree.getCheckedKeys();
        CHECKEDFLAG = true;
        if (type === 'add') {
          this.dialogTitle = '新增信息';
          this.dialogTableVisible = true;
          addParentNode = self;
          treeDate = val;
        } else if (type === 'edit') {
          this.dialogTitle = '编辑信息';
          this.creatObj.label = self.label;
          this.creatObj.id = self.id;
          if (self.children) {
            this.creatObj.children = JSON.parse(JSON.stringify(self.children));
          }
          this.dialogTableVisible = true;
          addParentNode = self;
          treeDate = val;
        } else if (type === 'delete') {
          deleteNode(val, self);
          for (let j = 0; j < val.length; j++) {
            Vue.set(this.data1, j, val[j]);
          }
        } else {
          for (let j = 0; j < val.length; j++) {
            Vue.set(this.data1, j, val[j]);
          }
        }
      },
      addNodeSave () {
        addNode(treeDate, addParentNode, this.creatObj);
        this.dialogTableVisible = false;
        for (var j = 0; j < treeDate.length; j++) {
          Vue.set(this.data1, j, treeDate[j]);
        }
      },
      addNodeCancel () {
        this.dialogTableVisible = false;
      },
      addNodeSave1 () {
        editNode(treeDate, addParentNode, this.creatObj);
        this.dialogTableVisible = false;
        for (var j = 0; j < treeDate.length; j++) {
          Vue.set(this.data1, j, treeDate[j]);
        }
      },
      addNodeCancel1 () {
        this.dialogTableVisible = false;
      },
      changeNodes (type, model) {
        console.log(type + model);
      },
      handleNodeClick (data, node, self) {

      },
      nodeExpand (data) {
        if (this.expandedkeys) {
          this.expandedkeys.push(data.id);
        } else {
          this.expandedkeys = [];
          this.expandedkeys.push(data.id);
        }
      },
      nodeCollapse (data) {
        this.expandedkeys.splice(this.expandedkeys.indexOf(data.id), 1);
      },
      checkChangeFun (data, node) {
        if (node.checked) {
          this.$refs.tree.setCheckedKeys([data.id]);
          this.triangleStyle.display = 'block';
          this.triangleStyle.top = (offset(document.getElementsByClassName('is-checked')[0]) - offset(document.getElementsByClassName('sino-link-container')[0])) + 'px';
        } else {
          this.$refs.tree.setCheckedKeys([]);
          this.triangleStyle.display = 'none';
        }
      }
    }
  };
</script>
<style>
  .tree-linkBox {
    float:left;
    width:50%;
    box-sizing:border-box;
  }
</style>
