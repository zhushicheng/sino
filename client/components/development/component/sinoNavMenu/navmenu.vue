<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">NavMenu 导航菜单</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-menu :router="true"
                   class="menu el-menu-vertical-demo"
                   style="position: inherit"
                   @open="handleOpen"
                   @close="handleClose"
                   uniqueOpened
                   mode="vertical"
                   :collapse="isCollapse">
          <sino-menu-item index="main"><i class="iconfont sino-shouye_shouye"></i><span slot="title">首页</span></sino-menu-item>
          <sino-submenu index="systemManage">
            <template slot="title"><i class="iconfont sino-i"></i><span slot="title">系统管理</span></template>
            <sino-menu-item class="sino-sunmenu-title"><span>系统管理</span></sino-menu-item>
            <sino-menu-item index="userManage"><i class="iconfont sino-iconfontyuan"></i><span slot="title">用户管理</span></sino-menu-item>
            <sino-menu-item index="roleManage"><i class="iconfont sino-iconfontyuan"></i><span slot="title">角色管理</span></sino-menu-item>
            <sino-menu-item index="organizeManage"><i class="iconfont sino-iconfontyuan"></i><span slot="title">机构管理</span></sino-menu-item>
            <sino-menu-item index="functionManage"><i class="iconfont sino-iconfontyuan"></i><span slot="title">功能管理</span></sino-menu-item>
            <sino-menu-item index="authManage"><i class="iconfont sino-iconfontyuan"></i><span slot="title">权限管理</span></sino-menu-item>
          </sino-submenu>
        </sino-menu>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-menu :router=&quot;true&quot;
                class=&quot;menu el-menu-vertical-demo&quot;
                style=&quot;position: inherit&quot;
                @open=&quot;handleOpen&quot;
                @close=&quot;handleClose&quot; uniqueOpened mode=&quot;vertical&quot; :collapse=&quot;isCollapse&quot;&gt;
      &lt;sino-menu-item index=&quot;main&quot;&gt;
                &lt;i class=&quot;iconfont sino-shouye_shouye&quot;&gt;&lt;/i&gt;
                &lt;span slot=&quot;title&quot;&gt;首页&lt;/span&gt;&lt;/sino-menu-item&gt;
      &lt;sino-submenu index=&quot;systemManage&quot;&gt;
        &lt;template slot=&quot;title&quot;&gt;&lt;i class=&quot;iconfont sino-i&quot;&gt;
                &lt;/i&gt;&lt;span slot=&quot;title&quot;&gt;系统管理&lt;/span&gt;&lt;/template&gt;
        &lt;sino-menu-item class=&quot;sino-sunmenu-title&quot;&gt;&lt;span&gt;系统管理&lt;/span&gt;&lt;/sino-menu-item&gt;
        &lt;sino-menu-item index=&quot;userManage&quot;&gt;
                &lt;i class=&quot;iconfont sino-iconfontyuan&quot;&gt;&lt;/i&gt;
                &lt;span slot=&quot;title&quot;&gt;用户管理&lt;/span&gt;&lt;/sino-menu-item&gt;
        &lt;sino-menu-item index=&quot;roleManage&quot;&gt;
                &lt;i class=&quot;iconfont sino-iconfontyuan&quot;&gt;&lt;/i&gt;
                &lt;span slot=&quot;title&quot;&gt;角色管理&lt;/span&gt;&lt;/sino-menu-item&gt;
        &lt;sino-menu-item index=&quot;organizeManage&quot;&gt;
                &lt;i class=&quot;iconfont sino-iconfontyuan&quot;&gt;&lt;/i&gt;
                &lt;span slot=&quot;title&quot;&gt;机构管理&lt;/span&gt;&lt;/sino-menu-item&gt;
        &lt;sino-menu-item index=&quot;functionManage&quot;&gt;
                &lt;i class=&quot;iconfont sino-iconfontyuan&quot;&gt;&lt;/i&gt;
                &lt;span slot=&quot;title&quot;&gt;功能管理&lt;/span&gt;&lt;/sino-menu-item&gt;
        &lt;sino-menu-item index=&quot;authManage&quot;&gt;
                &lt;i class=&quot;iconfont sino-iconfontyuan&quot;&gt;&lt;/i&gt;
                &lt;span slot=&quot;title&quot;&gt;权限管理&lt;/span&gt;&lt;/sino-menu-item&gt;
      &lt;/sino-submenu&gt;
    &lt;/sino-menu&gt;
&lt;/template&gt;
&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        data:[
          {
            &quot;id&quot;:1,
            &quot;label&quot;:&quot;首页&quot;,
            &quot;name&quot;:&quot;main&quot;,
            &quot;icon&quot;:&quot;sino-shouye_shouye&quot;,
            &quot;haveChild&quot;:false,
            &quot;path&quot;:&quot;/main&quot;,
            &quot;children&quot;:null
          },
          {
            &quot;id&quot;:2,
            &quot;label&quot;:&quot;快捷功能&quot;,
            &quot;name&quot;:&quot;shortcuts&quot;,
            &quot;path&quot;:&quot;&quot;,
            &quot;icon&quot;:&quot;sino-diqu&quot;,
            &quot;haveChild&quot;:true,
            &quot;children&quot;:null
          },
          {
            &quot;id&quot;:3,
            &quot;label&quot;:&quot;系统管理&quot;,
            &quot;icon&quot;:&quot;sino-i&quot;,
            &quot;haveChild&quot;:true,
            &quot;name&quot;:&quot;systemManage&quot;,
            &quot;labelname&quot;:&quot;系统管理&quot;,
            &quot;path&quot;:&quot;&quot;,
            &quot;children&quot;:[
              {
                &quot;id&quot;:31,
                &quot;label&quot;:&quot;用户管理&quot;,
                &quot;name&quot;:&quot;userManage&quot;,
                &quot;path&quot;:&quot;/userManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:32,
                &quot;label&quot;:&quot;角色管理&quot;,
                &quot;name&quot;:&quot;roleManage&quot;,
                &quot;path&quot;:&quot;/roleManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:33,
                &quot;label&quot;:&quot;机构管理&quot;,
                &quot;name&quot;:&quot;organizeManage&quot;,
                &quot;path&quot;:&quot;/organizeManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:34,
                &quot;label&quot;:&quot;功能管理&quot;,
                &quot;name&quot;:&quot;functionManage&quot;,
                &quot;path&quot;:&quot;/functionManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:35,
                &quot;label&quot;:&quot;权限管理&quot;,
                &quot;name&quot;:&quot;authManage&quot;,
                &quot;path&quot;:&quot;/authManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              }
            ]
          },
          {
            &quot;id&quot;:4,
            &quot;label&quot;:&quot;系统基础信息&quot;,
            &quot;icon&quot;:&quot;sino-sanren&quot;,
            &quot;path&quot;:&quot;&quot;,
            &quot;labelname&quot;:&quot;系统基础信息&quot;,
            &quot;name&quot;:&quot;systemInform&quot;,
            &quot;haveChild&quot;:true,
            &quot;children&quot;:[
              {
                &quot;id&quot;:41,
                &quot;label&quot;:&quot;数据字典&quot;,
                &quot;name&quot;:&quot;dictionary&quot;,
                &quot;path&quot;:&quot;/dictionary&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:42,
                &quot;label&quot;:&quot;地区管理&quot;,
                &quot;name&quot;:&quot;areaManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;path&quot;:&quot;/areaManage&quot;,
                &quot;children&quot;:null
              }
            ]
          },
          {
              &quot;id&quot;:74,
              &quot;label&quot;:&quot;系统监控&quot;,
              &quot;icon&quot;:&quot;sino-sanren&quot;,
              &quot;path&quot;:&quot;&quot;,
              &quot;labelname&quot;:&quot;系统监控&quot;,
              &quot;name&quot;:&quot;sysMon&quot;,
              &quot;haveChild&quot;:true,
              &quot;children&quot;:[
                {
                  &quot;id&quot;:741,
                  &quot;label&quot;:&quot;流程配置&quot;,
                  &quot;name&quot;:&quot;procConf&quot;,
                  &quot;path&quot;:&quot;/procConf&quot;,
                  &quot;haveChild&quot;:false,
                  &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                  &quot;children&quot;:null
                },
                {
                          &quot;id&quot;:745,
                          &quot;label&quot;:&quot;流程监管&quot;,
                          &quot;name&quot;:&quot;procReg&quot;,
                          &quot;path&quot;:&quot;/procReg&quot;,
                          &quot;haveChild&quot;:false,
                          &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                          &quot;children&quot;:null
                        },
                {
                  &quot;id&quot;:742,
                  &quot;label&quot;:&quot;系统消息&quot;,
                  &quot;name&quot;:&quot;sysMess&quot;,
                  &quot;haveChild&quot;:false,
                  &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                  &quot;path&quot;:&quot;/sysMess&quot;,
                  &quot;children&quot;:null
                },
                {
                          &quot;id&quot;:743,
                          &quot;label&quot;:&quot;系统公告&quot;,
                          &quot;name&quot;:&quot;sysNotice&quot;,
                          &quot;haveChild&quot;:false,
                          &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                          &quot;path&quot;:&quot;/sysNotice&quot;,
                          &quot;children&quot;:null
                        },
                        {
                                  &quot;id&quot;:744,
                                  &quot;label&quot;:&quot;邮件管理&quot;,
                                  &quot;name&quot;:&quot;emailManage&quot;,
                                  &quot;haveChild&quot;:false,
                                  &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                                  &quot;path&quot;:&quot;/emailManage&quot;,
                                  &quot;children&quot;:null
                                }
              ]
            },
          {
            &quot;id&quot;:5,
            &quot;label&quot;:&quot;开发辅助&quot;,
            &quot;icon&quot;:&quot;sino-icon-technology-rocket&quot;,
            &quot;labelname&quot;:&quot;开发辅助&quot;,
            &quot;path&quot;:&quot;&quot;,
            &quot;name&quot;:&quot;development&quot;,
            &quot;haveChild&quot;:true,
            &quot;children&quot;:[
              {
                &quot;id&quot;:51,
                &quot;label&quot;:&quot;词根管理&quot;,
                &quot;name&quot;:&quot;rootManage&quot;,
                &quot;path&quot;:&quot;/rootManage&quot;,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;haveChild&quot;:false,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:52,
                &quot;label&quot;:&quot;数据结构管理&quot;,
                &quot;path&quot;:&quot;/dataStructure&quot;,
                &quot;name&quot;:&quot;dataStructure&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:53,
                &quot;label&quot;:&quot;前端组件库&quot;,
                &quot;path&quot;:&quot;/component&quot;,
                &quot;name&quot;:&quot;component&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:54,
                &quot;label&quot;:&quot;样本程序库&quot;,
                &quot;name&quot;:&quot;sampleLibrary&quot;,
                &quot;path&quot;:&quot;/sampleLibrary&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              },
              {
                &quot;id&quot;:55,
                &quot;name&quot;:&quot;relationManage&quot;,
                &quot;label&quot;:&quot;字段血缘关系管理&quot;,
                &quot;path&quot;:&quot;/relationManage&quot;,
                &quot;haveChild&quot;:false,
                &quot;icon&quot;:&quot;sino-iconfontyuan&quot;,
                &quot;children&quot;:null
              }
            ]
          }
        ]
        permission: {
          component: false,
          userManager: false,
          orderManager: false
        },
        isCollapse: false
      };
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      leftCol () {
        this.isCollapse = true;
      },
      rightCol () {
        this.isCollapse = false;
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

  </div>
</template>
<script>
  import API from '../../../../api/index';
  export default{
    components: {},
    data () {
      return {
        permission: {
          component: false,
          userManager: false,
          orderManager: false
        },
        isCollapse: false,
        show: false
      };
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      leftCol () {
        this.isCollapse = true;
      },
      rightCol () {
        this.isCollapse = false;
      }
    },
    mounted: function () {
      let _this = this;
      API.getLeftMenuInfo().then(res => {
        console.log(res);
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            _this.permission[key] = res[key];
            console.log(_this.permission[key]);
          }
        }
      }).catch(err => {
      });
    }
  };

</script>
