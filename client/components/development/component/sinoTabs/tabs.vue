<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Tabs 标签页</h2>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <sino-tab-pane label="用户管理" name="first">用户管理</sino-tab-pane>
          <sino-tab-pane label="配置管理" name="second">配置管理</sino-tab-pane>
          <sino-tab-pane label="角色管理" name="third">角色管理</sino-tab-pane>
          <sino-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</sino-tab-pane>
        </sino-tabs>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-tabs v-model=&quot;activeName2&quot; type=&quot;card&quot; @tab-click=&quot;handleClick&quot;&gt;
      &lt;sino-tab-pane label=&quot;用户管理&quot; name=&quot;first&quot;&gt;用户管理&lt;/sino-tab-pane&gt;
      &lt;sino-tab-pane label=&quot;配置管理&quot; name=&quot;second&quot;&gt;配置管理&lt;/sino-tab-pane&gt;
      &lt;sino-tab-pane label=&quot;角色管理&quot; name=&quot;third&quot;&gt;角色管理&lt;/sino-tab-pane&gt;
      &lt;sino-tab-pane label=&quot;定时任务补偿&quot; name=&quot;fourth&quot;&gt;定时任务补偿&lt;/sino-tab-pane&gt;
    &lt;/sino-tabs&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        activeName2: &#39;first&#39;
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      }
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


    <h2 class="sino-compon-h2">Tabs 基础用法</h2>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tabs v-model="activeName1"  @tab-click="handleClick">
          <sino-tab-pane label="用户管理" name="first">用户管理</sino-tab-pane>
          <sino-tab-pane label="配置管理" name="second">配置管理</sino-tab-pane>
          <sino-tab-pane label="角色管理" name="third">角色管理</sino-tab-pane>
          <sino-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</sino-tab-pane>
        </sino-tabs>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-tabs v-model=&quot;activeName1&quot;  @tab-click=&quot;handleClick&quot;&gt;
  &lt;sino-tab-pane label=&quot;用户管理&quot; name=&quot;first&quot;&gt;用户管理&lt;/sino-tab-pane&gt;
  &lt;sino-tab-pane label=&quot;配置管理&quot; name=&quot;second&quot;&gt;配置管理&lt;/sino-tab-pane&gt;
  &lt;sino-tab-pane label=&quot;角色管理&quot; name=&quot;third&quot;&gt;角色管理&lt;/sino-tab-pane&gt;
  &lt;sino-tab-pane label=&quot;定时任务补偿&quot; name=&quot;fourth&quot;&gt;定时任务补偿&lt;/sino-tab-pane&gt;
&lt;/sino-tabs&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        activeName1: &#39;first&#39;
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      }
    }
  };
&lt;/script&gt;</pre>
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

    <h2 class="sino-compon-h2">Tabs 基础用法</h2>
    <sino-tabs v-model="activeNameTab" type="tick" @tab-click="handleClick">
      <sino-tab-pane name="first">
        <span slot="label"><i class="iconfont sino-wenjian2"></i> 术语表</span>
        术语表
      </sino-tab-pane>
      <sino-tab-pane name="second">
        <span slot="label"><i class="iconfont sino-shipin"></i> 公积金视频</span>
        公积金视频
      </sino-tab-pane>
      <sino-tab-pane name="third">
        <span slot="label"><i class="iconfont sino-shu"></i> 社保教学资料</span>
        社保教学资料</sino-tab-pane>
    </sino-tabs>
    <!--<h2 class="sino-compon-h2">Tabs 基础用法</h2>
    <sino-tabs v-model="activeName3" type="border-card" @tab-click="handleClick">
      <sino-tab-pane label="用户管理" name="first">用户管理</sino-tab-pane>
      <sino-tab-pane label="配置管理" name="second">配置管理</sino-tab-pane>
      <sino-tab-pane label="角色管理" name="third">角色管理</sino-tab-pane>
      <sino-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</sino-tab-pane>
    </sino-tabs>-->
    <h2 class="sino-compon-h2">Tabs 带增删功能</h2>
    <div class="demo-block">
      <div class="demo-source">
        <sino-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
          <sino-tab-pane
            :key="item.name"
            v-for="(item, index) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
            {{item.content}}
          </sino-tab-pane>
        </sino-tabs>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code></code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2 = !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        show2: false,
        activeName2: 'first',
        activeName1: 'first',
        activeName3: 'first',
        activeNameTab: 'first',

        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      },
      handleTabsEdit (targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  };
</script>
