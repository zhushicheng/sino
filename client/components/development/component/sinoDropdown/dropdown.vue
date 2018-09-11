<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Dropdown 下拉菜单</h2>
    <h3 class="sino-compon-h3">滑上显示</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-dropdown class="touchArea">
          <span class="el-dropdown-link">
            滑上显示
          </span>
          <sino-dropdown-menu slot="dropdown">
            <sino-dropdown-item>切换角色实例</sino-dropdown-item>
            <sino-dropdown-item>修改密码</sino-dropdown-item>
            <sino-dropdown-item command="logout">退出登录</sino-dropdown-item>
          </sino-dropdown-menu>
        </sino-dropdown>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-dropdown class=&quot;touchArea&quot;&gt;
    &lt;span class=&quot;el-dropdown-link&quot;&gt;滑上显示&lt;/span&gt;
    &lt;sino-dropdown-menu slot=&quot;dropdown&quot;&gt;
       &lt;sino-dropdown-item&gt;切换角色实例&lt;/sino-dropdown-item&gt;
       &lt;sino-dropdown-item&gt;修改密码&lt;/sino-dropdown-item&gt;
       &lt;sino-dropdown-item command=&quot;logout&quot;&gt;退出登录&lt;/sino-dropdown-item&gt;
    &lt;/sino-dropdown-menu&gt;
  &lt;/sino-dropdown&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        dropdown: false
      };
    },
    methods: {
      handleCommand (command) {
        this.$message(&#39;click on item &#39; + command);
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



    <h3 class="sino-compon-h3">点击显示</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-dropdown trigger="click">
          <span class="el-dropdown-link">点击显示</span>
          <sino-dropdown-menu>
            <sino-dropdown-item>切换角色实例</sino-dropdown-item>
            <sino-dropdown-item disabled>修改密码</sino-dropdown-item>
            <sino-dropdown-item>退出登录</sino-dropdown-item>
          </sino-dropdown-menu>
        </sino-dropdown>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-dropdown trigger=&quot;click&quot;&gt;
  &lt;span class=&quot;el-dropdown-link&quot;&gt;点击显示&lt;/span&gt;
  &lt;sino-dropdown-menu&gt;
    &lt;sino-dropdown-item&gt;切换角色实例&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item disabled&gt;修改密码&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;退出登录&lt;/sino-dropdown-item&gt;
  &lt;/sino-dropdown-menu&gt;
&lt;/sino-dropdown&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        dropdown: false
      };
    },
    methods: {
      handleCommand (command) {
        this.$message(&#39;click on item &#39; + command);
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


    <h3 class="sino-compon-h3">模拟列表</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-dropdown class="touchArea">
          <sino-button class="el-dropdown-link">
            <i class="iconfont sino-rili"></i>
          </sino-button>
          <sino-dropdown-menu class="task_menu" slot="dropdown">
            <sino-dropdown-item type="task_title">进行中的任务</sino-dropdown-item>
            <sino-dropdown-item type="task_list">
              <i class="fl task_circle"></i>
              <span class="fl task_name">任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</span>
              <a class="fl task_todo">查看</a>
            </sino-dropdown-item>
            <sino-dropdown-item>
              <i class="fl task_circle"></i>
              <span class="fl task_name">任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</span>
              <a class="fl task_todo">查看</a>
            </sino-dropdown-item>
            <sino-dropdown-item>
              <i class="fl task_circle"></i>
              <span class="fl task_name">任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</span>
              <a class="fl task_todo">查看</a>
            </sino-dropdown-item>
          </sino-dropdown-menu>
        </sino-dropdown>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-dropdown class=&quot;touchArea&quot;&gt;
  &lt;sino-button class=&quot;el-dropdown-link&quot;&gt;
    &lt;i class=&quot;iconfont sino-rili&quot;&gt;&lt;/i&gt;
  &lt;/sino-button&gt;
  &lt;sino-dropdown-menu class=&quot;task_menu&quot; slot=&quot;dropdown&quot;&gt;
    &lt;sino-dropdown-item type=&quot;task_title&quot;&gt;进行中的任务&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item type=&quot;task_list&quot;&gt;
      &lt;i class=&quot;fl task_circle&quot;&gt;&lt;/i&gt;
      &lt;span class=&quot;fl task_name&quot;&gt;任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述&lt;/span&gt;
      &lt;a class=&quot;fl task_todo&quot;&gt;查看&lt;/a&gt;
    &lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;
      &lt;i class=&quot;fl task_circle&quot;&gt;&lt;/i&gt;
      &lt;span class=&quot;fl task_name&quot;&gt;任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述&lt;/span&gt;
      &lt;a class=&quot;fl task_todo&quot;&gt;查看&lt;/a&gt;
    &lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;
      &lt;i class=&quot;fl task_circle&quot;&gt;&lt;/i&gt;
      &lt;span class=&quot;fl task_name&quot;&gt;任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述&lt;/span&gt;
      &lt;a class=&quot;fl task_todo&quot;&gt;查看&lt;/a&gt;
    &lt;/sino-dropdown-item&gt;
  &lt;/sino-dropdown-menu&gt;
&lt;/sino-dropdown&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        dropdown: false
      };
    },
    methods: {
      handleCommand (command) {
        this.$message(&#39;click on item &#39; + command);
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
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



    <h3 class="sino-compon-h3">点击显示</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-dropdown trigger="click" @visible-change="dropdownDel">
      <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false" :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
        <i class="iconfont sino-20150825tubiaolianxizhuanhuan05"></i>权限管理<i class="iconfont sino-unie628"></i>
      </span>
          <sino-dropdown-menu class="role_menu">
            <sino-dropdown-item>菜单权限管理</sino-dropdown-item>
            <sino-dropdown-item>查询范围管理</sino-dropdown-item>
            <sino-dropdown-item>按钮权限管理</sino-dropdown-item>
            <sino-dropdown-item>手续权限管理</sino-dropdown-item>
            <sino-dropdown-item>材料包权限管理</sino-dropdown-item>
          </sino-dropdown-menu>
        </sino-dropdown>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-dropdown trigger=&quot;click&quot; @visible-change=&quot;dropdownDel&quot;&gt;
  &lt;
                span class=&quot;el-dropdown-link sino-dropdown-link&quot;
                @click=&quot;dropdown = false&quot; :class=&quot;{&#39;is-active&#39;:dropdown === true,&#39;is-delete&#39;:dropdown === false}&quot;
                &gt;
    &lt;i class=&quot;iconfont sino-20150825tubiaolianxizhuanhuan05&quot;&gt;&lt;/i&gt;权限管理&lt;i class=&quot;iconfont sino-unie628&quot;&gt;&lt;/i&gt;
  &lt;/span&gt;
  &lt;sino-dropdown-menu class=&quot;role_menu&quot;&gt;
    &lt;sino-dropdown-item&gt;菜单权限管理&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;查询范围管理&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;按钮权限管理&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;手续权限管理&lt;/sino-dropdown-item&gt;
    &lt;sino-dropdown-item&gt;材料包权限管理&lt;/sino-dropdown-item&gt;
  &lt;/sino-dropdown-menu&gt;
&lt;/sino-dropdown&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        dropdown: false
      };
    },
    methods: {
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      handleCommand (command) {
        this.$message(&#39;click on item &#39; + command);
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show3 = !show3">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show3,'sino-angle-double-up':show3}"></i>
        <span v-if="!show3">显示代码</span>
        <span v-if="show3">收起代码</span>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        dropdown: false,
        show: false,
        show1: false,
        show2: false,
        show3: false
      };
    },
    methods: {
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      handleCommand (command) {
        this.$message('click on item ' + command);
      }
    }
  };
</script>
