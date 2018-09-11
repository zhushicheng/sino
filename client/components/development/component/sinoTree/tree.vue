<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Tree 树形控件</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tree style="width: 400px;" :data="data" @node-click="handleNodeClick" :props="defaultProps" ></sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-tree style=&quot;width: 400px;&quot; :data=&quot;data&quot; @node-click=&quot;handleNodeClick&quot; :props=&quot;defaultProps&quot; &gt;&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   data: [
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
          }
        ],
        defaultProps: {
          children: &#39;children&#39;,
          label: &#39;label&#39;
        }
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

    }
 }
};</pre>
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

    <h3 class="sino-compon-h3">禁用状态</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tree style="width: 400px;" :data="data" show-checkbox @node-click="handleNodeClick" :props="defaultProps" ></sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showDis">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-tree style=&quot;width: 400px;&quot; :data=&quot;data&quot; @node-click=&quot;handleNodeClick&quot; :props=&quot;defaultProps&quot; &gt;&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   data: [
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
          }
        ],
        defaultProps: {
          children: &#39;children&#39;,
          label: &#39;label&#39;
        }
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

    }
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showDis = !showDis">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showDis,'sino-angle-double-up':showDis}"></i>
        <span v-if="!showDis">显示代码</span>
        <span v-if="showDis">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">默认选中和展开</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tree style="width: 400px;" :data="data1" show-checkbox
                   node-key="id"
                   :default-expanded-keys="expandedkeys"
                   :default-checked-keys="defaultArr"
                   @node-click="handleNodeClick"
                   :isRadio="false"
                   :props="defaultProps">
        </sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showDeafult">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-tree style=&quot;width: 400px;&quot; :data=&quot;data1&quot; show-checkbox
           node-key=&quot;id&quot;
           :default-expanded-keys=&quot;expandedkeys&quot;
           :default-checked-keys=&quot;[5]&quot;
           @node-click=&quot;handleNodeClick&quot;
           :isRadio=&quot;false&quot;
           :props=&quot;defaultProps&quot;&gt;
&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
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
    },
    expandedkeys: [2, 3],
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

    }
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showDeafult = !showDeafult">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showDeafult,'sino-angle-double-up':showDeafult}"></i>
        <span v-if="!showDeafult">显示代码</span>
        <span v-if="showDeafult">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">多选-操作框不出现</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tree :data="data1" @node-click="handleNodeClick" show-checkbox
                   node-key="id"
                   :isRadio="false"
                   :props="defaultProps"
                   v-on:ascNode="ascNode"
                   ref="tree"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse"
        ></sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showMore">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-tree style=&quot;width: 400px;&quot; :data=&quot;data1&quot; show-checkbox
           node-key=&quot;id&quot;
           :default-expanded-keys=&quot;expandedkeys&quot;
           :default-checked-keys=&quot;[5]&quot;
           @node-click=&quot;handleNodeClick&quot;
           :isRadio=&quot;false&quot;
           :props=&quot;defaultProps&quot;&gt;
&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
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
    },
    expandedkeys: [2, 3],
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

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
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showMore = !showMore">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showMore,'sino-angle-double-up':showMore}"></i>
        <span v-if="!showMore">显示代码</span>
        <span v-if="showMore">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">单选-操作框出现</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tree :data="data1" @node-click="handleNodeClick" show-checkbox
                   node-key="id"
                   :props="defaultProps"
                   v-on:ascNode="ascNode"
                   ref="tree"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse"
                   check-strictly
                   @current-change = "checkChangeFun"
        ></sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showRadio">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-tree :data=&quot;data1&quot; @node-click=&quot;handleNodeClick&quot; show-checkbox
           node-key=&quot;id&quot;
           :props=&quot;defaultProps&quot;
           v-on:ascNode=&quot;ascNode&quot;
           ref=&quot;tree&quot;
           @node-expand=&quot;nodeExpand&quot;
           @node-collapse=&quot;nodeCollapse&quot;
           check-strictly
           @current-change = &quot;checkChangeFun&quot;
&gt;&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
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
    },
    expandedkeys: [2, 3],
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

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
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showRadio = !showRadio">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showRadio,'sino-angle-double-up':showRadio}"></i>
        <span v-if="!showRadio">显示代码</span>
        <span v-if="showRadio">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">手风琴树</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tree style="width: 400px;" :data="data1" @node-click="handleNodeClick" :props="defaultProps" accordion></sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showAcc">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-tree style=&quot;width: 400px;&quot; :data=&quot;data1&quot; @node-click=&quot;handleNodeClick&quot; :props=&quot;defaultProps&quot; accordion&gt;&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
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
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

   }
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showAcc = !showAcc">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showAcc,'sino-angle-double-up':showAcc}"></i>
        <span v-if="!showAcc">显示代码</span>
        <span v-if="showAcc">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">模糊查询</h3><!--  default-expand-all 展开全部-->
    <div class="demo-block">
      <div class="demo-source">
        <sino-input placeholder="输入关键字进行过滤" v-model="filterText"></sino-input>
        <sino-tree class="filter-tree"
                   :data="data2"
                   :props="defaultProps"
                   :filter-node-method="filterNode"
                   :showAsc="false"
                   :showDown="false"
                   ref="tree2"
                   show-checkbox
                   :isRadio="false"
        >
        </sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-input placeholder=&quot;输入关键字进行过滤&quot; v-model=&quot;filterText&quot;&gt;&lt;/sino-input&gt;
&lt;sino-tree class=&quot;filter-tree&quot;
           :data=&quot;data2&quot;
           :props=&quot;defaultProps&quot;
           :filter-node-method=&quot;filterNode&quot;
           :showAsc=&quot;false&quot;
           :showDown=&quot;false&quot;
           ref=&quot;tree2&quot;
           show-checkbox
           :isRadio=&quot;false&quot;
&gt;
&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   filterText: &#39;&#39;,
   data2: [{
      id: 1,
      label: &#39;一级 1&#39;,
      children: [{
        id: 4,
        label: &#39;二级 1-1&#39;,
        children: [{
          id: 9,
          label: &#39;三级 1-1-1&#39;
        }, {
          id: 10,
          label: &#39;三级 1-1-2&#39;
        }]
      }]
    }, {
      id: 2,
      label: &#39;一级 2&#39;,
      children: [{
        id: 5,
        label: &#39;二级 2-1&#39;
      }, {
        id: 6,
        label: &#39;二级 2-2&#39;
      }]
    }, {
      id: 3,
      label: &#39;一级 3&#39;,
      children: [{
        id: 7,
        label: &#39;二级 3-1&#39;
      }, {
        id: 8,
        label: &#39;二级 3-2&#39;
      }]
    }],
    defaultProps: {
      children: &#39;children&#39;,
      label: &#39;label&#39;
    }
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

   },
   filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">显示减号提示未全部选中</h3><!--  default-expand-all 展开全部-->
    <div class="demo-block">
      <div class="demo-source">
        <sino-input placeholder="输入关键字进行过滤" v-model="filterText"></sino-input>
        <sino-tree class="filter-tree"
                   :data="data2"
                   :props="defaultProps"
                   :filter-node-method="filterNode"
                   :showAsc="false"
                   :showDown="false"
                   ref="tree2"
                   show-checkbox
                   :reduceFlag="true"
                   :isRadio="false"
        >
        </sino-tree>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-input placeholder=&quot;输入关键字进行过滤&quot; v-model=&quot;filterText&quot;&gt;&lt;/sino-input&gt;
&lt;sino-tree class=&quot;filter-tree&quot;
           :data=&quot;data2&quot;
           :props=&quot;defaultProps&quot;
           :filter-node-method=&quot;filterNode&quot;
           :showAsc=&quot;false&quot;
           :showDown=&quot;false&quot;
           ref=&quot;tree2&quot;
           show-checkbox
           :isRadio=&quot;false&quot;
&gt;
&lt;/sino-tree&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   filterText: &#39;&#39;,
   data2: [{
      id: 1,
      label: &#39;一级 1&#39;,
      children: [{
        id: 4,
        label: &#39;二级 1-1&#39;,
        children: [{
          id: 9,
          label: &#39;三级 1-1-1&#39;
        }, {
          id: 10,
          label: &#39;三级 1-1-2&#39;
        }]
      }]
    }, {
      id: 2,
      label: &#39;一级 2&#39;,
      children: [{
        id: 5,
        label: &#39;二级 2-1&#39;
      }, {
        id: 6,
        label: &#39;二级 2-2&#39;
      }]
    }, {
      id: 3,
      label: &#39;一级 3&#39;,
      children: [{
        id: 7,
        label: &#39;二级 3-1&#39;
      }, {
        id: 8,
        label: &#39;二级 3-2&#39;
      }]
    }],
    defaultProps: {
      children: &#39;children&#39;,
      label: &#39;label&#39;
    }
  }
 },
 methods: {
   handleNodeClick (data, node, self) {

   },
   filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>

    <sino-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" class="tree-edit-layer" :lock-scroll="true" :show-close="true">
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
            <sino-select :tipText="'请选择'" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :queryList="list" :chooseName="creatObj.type" :chooseId="creatObj.typeId" v-on:getValue="getValue1" :clear="true" @open="getQueryList"></sino-select>
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
  export default {
    data () {
      return {
        show: false,
        showDis: false,
        showDeafult: false,
        showMore: false,
        showRadio: false,
        showAcc: false,
        defaultArr: [5, 1, 2],
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
        data: [
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
          }
        ],
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
        },
        filterText: '',
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
      };
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val);
      },
      data1: {
        handler: function (val, oldVal) {
          console.log(1);
        },
        deep: true
      },
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
      filterNode (value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
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
        } else {
          this.$refs.tree.setCheckedKeys([]);
        }
      }
    }
  };
</script>
<style type="text/css">
  .tree-edit-layer .sino-dialog{
    width:603px;
    height:auto;
  }
  .tree-edit-layer .sino-dialog-header{
    width:572px;
  }
  .tree-edit-layer .sino-dialog-body{
    padding-left:0;
    height:auto;
  }
  .tree-edit-layer .title{
    line-height:22px;
    text-align:right;
    width:113px;
    color:#333;
  }
  .tree-edit-layer .sino-radio{
    width:70px;
    margin-top:4px;
  }
  .tree-edit-layer .content-text{
    width:160px;
  }
  .tree-edit-layer .content-textarea{
    width:434px;
    height:75px;
  }
  .tree-edit-layer-ul>li{
    overflow:hidden;
    margin-bottom:19px;
  }
  .tree-edit-layer-ul li>div:first-child{
    width:120px;
  }
  .tree-edit-layer-ul li>div:first-child{
    width:120px;
  }
  .tree-edit-layer .tree-button-save{
    width:130px;
    height:30px;
    line-height:30px;
    background:#f6b412;
    color:#fff;
    font-size:14px;
    text-align:center;
  }
  .tree-edit-layer .tree-button-cancel{
    line-height:30px;
    color:#399ff2;
    margin-left:20px;
    background:none;
  }
  .tree-edit-layer .sino-dialog-footer{
    margin-top:12px;
    margin-bottom:30px;
  }
</style>
