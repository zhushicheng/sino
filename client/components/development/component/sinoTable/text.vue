<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Table 表格</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <div class="sino-table-total">
          <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text"><i class="iconfont sino-tianjia"></i>新增</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-modify"></i>修改</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-shanchu1"></i>删除</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-xiangqing1"></i>详情</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-guanlian"></i>关联业务单位</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-zhibiao08"></i>转化</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-shangchuan"></i>上传</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-download-copy"></i>下载</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-guanlian"></i>关联业务单位</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-zhibiao08"></i>转化</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-shangchuan"></i>上传</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-download-copy"></i>下载</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-guanlian"></i>关联业务单位</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-zhibiao08"></i>转化</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-shangchuan"></i>上传</sino-button>
              <sino-button type="icon-text"><i class="iconfont sino-download-copy"></i>下载</sino-button>
            </div>
            <sino-button type="icon-text" class="fr sino-table-icon-right" @click="moreIcon">
              <i class="iconfont" :class="{'sino-shuangjiantou-copy':isA,'sino-angle-double-up':!isA}"></i>
              <span v-if="isA">更多操作</span>
              <span v-if="!isA">收起操作</span>
            </sino-button>
          </div>
          <sino-table :data="tableData1" max-height="416" border>
            <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
            <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
            <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
            <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
            <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
            <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
            <sino-table-column label="操作" align="center">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="clickFun(scope.row,'see')">查看</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageParam1.pageNum"
                     v-bind:page-size="pageParam1.pageSize"
                     v-on:pagehandler="pageHandler1"
                     :pageArray="pageParam1.pageArray"
                     v-on:choosePageFun="choooseNum1"
                     v-bind:object="object1"
                     :total="total1"></sino-page>
        </div>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;div class=&quot;sino-table-total&quot;&gt;
  &lt;div class=&quot;sino-table-icon&quot; :class=&quot;{&#39;sino-table-icon&#39;:isA,&#39;sino-table-icon-auto&#39;:!isA}&quot;&gt;
    &lt;div class=&quot;sino-table-icon-left&quot;&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-tianjia&quot;&gt;&lt;/i&gt;添加&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-modify&quot;&gt;&lt;/i&gt;修改&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-shanchu1&quot;&gt;&lt;/i&gt;删除&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-xiangqing1&quot;&gt;&lt;/i&gt;详情&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-guanlian&quot;&gt;&lt;/i&gt;关联业务单位&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-zhibiao08&quot;&gt;&lt;/i&gt;转化&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-shangchuan&quot;&gt;&lt;/i&gt;上传&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-download-copy&quot;&gt;&lt;/i&gt;下载&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-guanlian&quot;&gt;&lt;/i&gt;关联业务单位&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-zhibiao08&quot;&gt;&lt;/i&gt;转化&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-shangchuan&quot;&gt;&lt;/i&gt;上传&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-download-copy&quot;&gt;&lt;/i&gt;下载&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-guanlian&quot;&gt;&lt;/i&gt;关联业务单位&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-zhibiao08&quot;&gt;&lt;/i&gt;转化&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-shangchuan&quot;&gt;&lt;/i&gt;上传&lt;/sino-button&gt;
      &lt;sino-button type=&quot;icon-text&quot;&gt;&lt;i class=&quot;iconfont sino-download-copy&quot;&gt;&lt;/i&gt;下载&lt;/sino-button&gt;
    &lt;/div&gt;
    &lt;sino-button type=&quot;icon-text&quot; class=&quot;fr sino-table-icon-right&quot; @click=&quot;moreIcon&quot;&gt;
      &lt;i class=&quot;iconfont&quot; :class=&quot;{&#39;sino-shuangjiantou-copy&#39;:isA,&#39;sino-angle-double-up&#39;:!isA}&quot;&gt;&lt;/i&gt;
      &lt;span v-if=&quot;isA&quot;&gt;更多操作&lt;/span&gt;
      &lt;span v-if=&quot;!isA&quot;&gt;收起操作&lt;/span&gt;
    &lt;/sino-button&gt;
  &lt;/div&gt;
  &lt;sino-table :data=&quot;tableData1&quot; height=&quot;356&quot; border&gt;
    &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
    &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
    &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
    &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
    &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
    &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
    &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
      &lt;template scope=&quot;scope&quot;&gt;
        &lt;template v-if=&quot;scope.row.oper == true&quot;&gt;
          &lt;span class=&quot;table-span&quot; @click=&quot;clickFun(scope.row,&#39;see&#39;)&quot;&gt;查看&lt;/span&gt;
        &lt;/template&gt;
      &lt;/template&gt;
    &lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
  &lt;sino-page v-bind:page=&quot;pageParam1.pageNum&quot;
                v-bind:page-size=&quot;pageParam1.pageSize&quot;
                v-on:pagehandler=&quot;pageHandler1&quot;
                :pageArray=&quot;pageParam1.pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum1&quot;
                v-bind:object=&quot;object1&quot;
                :total=&quot;total1&quot;&gt;&lt;/sino-page&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        isA: true,
        tableData1: [
                {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
                ],
        total1: null,
        object1: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageParam1: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        }
      };
    },
    created () {
     this.getList1(1, this.pageParam.pageSize);
    },
    methods: {
      getList1 (pageNum, pageSize) {
          let data = {
                data: {},
                pageNum: pageNum,
                pageSize: pageSize
                };
                api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res =&gt; {
                this.tableData1 = res.data.list;
                this.total1 = res.data.total;
                }).catch(err =&gt; {
                console.log(err);
                });
           },
      pageHandler1: function (pageNum) {
              this.pageParam1.pageNum = pageNum;
              this.getList1(pageNum, this.pageParam1.pageSize);
           },
          choooseNum1: function (pageSize) {
              this.pageParam1.pageSize = pageSize;
              this.getList1(this.pageParam1.pageNum, pageSize);
          },
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            当<code>sino-table</code>元素中注入
            <code>data</code>对象数组后，在
            <code>sino-table-column</code>中用
            <code>prop</code>属性来对应对象中的键名即可填入数据，用
            <code>label</code>属性来定义表格的列名。可以使用
            <code>width</code>属性来定义列宽。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">带斑马纹表格</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableData" max-height="416" stripe>
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="clickFun(scope.row,'see')">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'see')">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'see')">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageParam.pageNum"
                   v-bind:page-size="pageParam.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageParam.pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object" :total="total"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableData&quot; height=&quot;356&quot; stripe&gt;
      &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
      &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
      &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
     &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
     &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
     &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
     &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
      &lt;template scope=&quot;scope&quot;&gt;
        &lt;template v-if=&quot;scope.row.oper == true&quot;&gt;
          &lt;span class=&quot;table-span&quot;&gt;查看&lt;/span&gt;&lt;i class=&quot;table-i&quot;&gt;|&lt;/i&gt;
          &lt;span class=&quot;table-span&quot;&gt;修改&lt;/span&gt;&lt;i class=&quot;table-i&quot;&gt;|&lt;/i&gt;
          &lt;span class=&quot;table-span&quot;&gt;删除&lt;/span&gt;
        &lt;/template&gt;
      &lt;/template&gt;
     &lt;/sino-table-column&gt;
   &lt;/sino-table&gt;
   &lt;sino-page v-bind:page=&quot;pageParam.pageNum&quot;
                v-bind:page-size=&quot;pageParam.pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageParam.pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object&quot;
                :total=&quot;total&quot;&gt;&lt;/sino-page&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        tableData: null,
        total: null,
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        }
      };
    },
    created () {
      this.getList(1, this.pageParam.pageSize);
    },
    methods: {
      getList (pageNum, pageSize) {
        let data = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res =&gt; {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err =&gt; {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageParam.pageNum = pageNum;
        this.getList(pageNum, this.pageParam.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageParam.pageSize = pageSize;
        this.getList(this.pageParam.pageNum, pageSize);
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            <code>stripe</code>属性可以创建带斑马纹的表格。它接受一个
            <code>Boolean</code>，默认为<code>false</code>，设置为
            <code>true</code>即为启用。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">固定宽</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataJson" border max-height="416" style="width: 500px">
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center">
            <template scope="scope">
              <span class="table-span">查看</span>
            </template>
          </sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataJson&quot; border height=&quot;356&quot; style=&quot;width: 500px&quot;&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
    &lt;template scope=&quot;scope&quot;&gt;
      &lt;span class=&quot;table-span&quot;&gt;查看&lt;/span&gt;
    &lt;/template&gt;
   &lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
       tableDataJson: [
       {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
                ]
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"><code>width</code>属性</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2 = !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">带状态的表格</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataJson" max-height="416" border :row-class-name="tableRowClassName">
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showStatus">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataJson&quot; height=&quot;356&quot; border :row-class-name=&quot;tableRowClassName&quot;&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   tableDataJson: [
         {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
        ]
  };
 },
 methods: {
   tableRowClassName (row, index) {
      if (index === 1) {
        return &#39;info-row&#39;;
      } else if (index === 3) {
        return &#39;positive-row&#39;;
      }
        return &#39;&#39;;
      }
 }
};
&lt;/script&gt;
&lt;style&gt;
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
&lt;/style&gt;</pre>
            </code>
          </div>
          <div class="description">可以通过指定<code>Table</code>组件的 <code>row-class-name</code> 属性来为 <code>Table</code> 中的某一行添加 <code>class</code>，表明该行处于某种状态。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showStatus = !showStatus">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showStatus,'sino-angle-double-up':showStatus}"></i>
        <span v-if="!showStatus">显示代码</span>
        <span v-if="showStatus">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">固定列和表头</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataJson" border max-height="416" style="width: 500px">
          <sino-table-column prop="loginName" label="登录名称" fixed align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center" width="240"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center" width="240"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center" width="240"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center" width="240"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center" width="240"></sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showFixed">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataJson&quot; border height=&quot;356&quot; style=&quot;width: 500px&quot;&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; fixed align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot; width=&quot;240&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot; width=&quot;240&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot; width=&quot;240&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot; width=&quot;240&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot; width=&quot;240&quot;&gt;&lt;/sino-table-column&gt;
   &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   tableDataJson: [
          {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
        ]
  };
 }
};</pre>
            </code>
          </div>
          <div class="description">只要在
            <code>sino-table</code>元素中定义了
            <code>height</code>属性，即可实现固定表头的表格，而不需要额外的代码。固定列需要使用
            <code>fixed</code>属性，它接受
            <code>Boolean</code> 值或者<code>left</code>
            <code>right</code>，表示左边固定还是右边固定。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showFixed = !showFixed">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showFixed,'sino-angle-double-up':showFixed}"></i>
        <span v-if="!showFixed">显示代码</span>
        <span v-if="showFixed">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">复选表格</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataCheck" max-height="416" border>
          <sino-table-column type="selection" width="50"></sino-table-column>
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span">查看</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageParamCheck.pageNum"
                   v-bind:page-size="pageParamCheck.pageSize"
                   v-on:pagehandler="pageHandlerCheck"
                   :pageArray="pageParamCheck.pageArray"
                   v-on:choosePageFun="choooseNumCheck"
                   v-bind:object="objectCheck"
                   :total="totalCheck"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showCheck">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataCheck&quot; height=&quot;356&quot; border&gt;
   &lt;sino-table-column type=&quot;selection&quot; width=&quot;50&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
     &lt;template scope=&quot;scope&quot;&gt;
      &lt;template v-if=&quot;scope.row.oper == true&quot;&gt;
        &lt;span class=&quot;table-span&quot;&gt;查看&lt;/span&gt;
      &lt;/template&gt;
     &lt;/template&gt;
    &lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
  &lt;sino-page v-bind:page=&quot;pageParamCheck.pageNum&quot;
                v-bind:page-size=&quot;pageParamCheck.pageSize&quot;
                v-on:pagehandler=&quot;pageHandlerCheck&quot;
                :pageArray=&quot;pageParamCheck.pageArray&quot;
                v-on:choosePageFun=&quot;choooseNumCheck&quot;
                v-bind:object=&quot;objectCheck&quot;
                :total=&quot;totalCheck&quot;&gt;&lt;/sino-page&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   tableDataCheck: [
          {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
        ],
        pageParamCheck: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        totalCheck: null,
        objectCheck: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        }
    };
   }
};</pre>
            </code>
          </div>
          <div class="description">实现多选非常简单: 手动添加一个
            <code>sino-table-column</code>，设<code>type</code>属性为
            <code>selection</code>即可；默认情况下若内容过多会折行显示，若需要单行显示可以使用
            <code>show-overflow-tooltip</code>属性，它接受一个<code>Boolean</code>，为
            <code>true</code>时多余的内容会在 <code>hover</code> 时以
            <code>tooltip</code> 的形式显示出来。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showCheck = !showCheck">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showCheck,'sino-angle-double-up':showCheck}"></i>
        <span v-if="!showCheck">显示代码</span>
        <span v-if="showCheck">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">单选表格</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataJson" ref="singleTable" max-height="416" border highlight-current-row @current-change="handleCurrentChange" v-on:radioSelect="radioSelect">
          <sino-table-column type="radioSelection" width="50"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showRadio">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataJson&quot; ref=&quot;singleTable&quot; height=&quot;356&quot; border highlight-current-row @current-change=&quot;handleCurrentChange&quot; v-on:radioSelect=&quot;radioSelect&quot;&gt;
   &lt;sino-table-column type=&quot;radioSelection&quot; width=&quot;50&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column type=&quot;index&quot; label=&quot;序号&quot; width=&quot;70&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
   tableDataCheck: [
          {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
        ],
        pageParamCheck: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        totalCheck: null,
        objectCheck: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        currentRow: null
    };
   },
   methods: {
     handleCurrentChange (val) {
      this.currentRow = val;
    }
   }
};</pre>
            </code>
          </div>
          <div class="description">实现单选非常简单: 手动添加一个<code>sino-table-column</code>，设<code>type</code>属性为<code>radioSelection</code>即可。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showRadio = !showRadio">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showRadio,'sino-angle-double-up':showRadio}"></i>
        <span v-if="!showRadio">显示代码</span>
        <span v-if="showRadio">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">表格小于十条展示空数据</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataLess" max-height="416" border>
          <sino-table-column type="radioSelection" width="50"></sino-table-column>
          <sino-table-column type="selection" width="50"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span">查看</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageParamLess.pageNum"
                   v-bind:page-size="pageParamLess.pageSize"
                   v-on:pagehandler="pageHandlerLess"
                   :pageArray="pageParamLess.pageArray"
                   v-on:choosePageFun="choooseNumLess"
                   v-bind:object="objectLess"
                   :total="totalLess"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showLess">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataLess&quot; height=&quot;356&quot; border&gt;
   &lt;sino-table-column type=&quot;radioSelection&quot; width=&quot;50&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column type=&quot;selection&quot; width=&quot;50&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column type=&quot;index&quot; label=&quot;序号&quot; width=&quot;80&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
    &lt;template scope=&quot;scope&quot;&gt;
      &lt;template v-if=&quot;scope.row.oper == true&quot;&gt;
        &lt;span class=&quot;table-span&quot;&gt;查看&lt;/span&gt;
      &lt;/template&gt;
    &lt;/template&gt;
  &lt;/sino-table-column&gt;
&lt;/sino-table&gt;
&lt;sino-page v-bind:page=&quot;pageParamLess.pageNum&quot;
                v-bind:page-size=&quot;pageParamLess.pageSize&quot;
                v-on:pagehandler=&quot;pageHandlerLess&quot;
                :pageArray=&quot;pageParamLess.pageArray&quot;
                v-on:choosePageFun=&quot;choooseNumLess&quot;
                v-bind:object=&quot;objectLess&quot;
                :total=&quot;totalLess&quot;&gt;&lt;/sino-page&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
    totalLess: null,
    objectLess: {
      maxPage: 3,
      issmallPage: false,
      isPage: true,
      isTotal: true,
      isSelect: true,
      isjumper: false,
      isSelectPage: false
    },
    pageParamLess: {
      pageNum: 1,
      pageSize: 10,
      pageArray: [10, 20, 30, 50]
    },
   tableDataLess: null
   };
   },
 created () {
   this.getListLess(1, this.pageParamLess.pageSize);
 },
 methods: {
   getListLess (pageNum, pageSize) {
     let data = {
      data: {},
      pageNum: pageNum,
        pageSize: pageSize
      };
      api.post(url, data).then(res =&gt; {
        this.tableDataLess = res.data.list;
        this.totalLess = res.data.total;
      }).catch(err =&gt; {
        console.log(err);
      });
    },
  pageHandlerLess: function (pageNum) {
    this.pageParamLess.pageNum = pageNum;
    this.getListLess(pageNum, this.pageParamLess.pageSize);
  },
  choooseNumLess: function (pageSize) {
    this.pageParamLess.pageSize = pageSize;
    this.getListLess(this.pageParamLess.pageNum, pageSize);
  },
 }
};</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showLess = !showLess">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showLess,'sino-angle-double-up':showLess}"></i>
        <span v-if="!showLess">显示代码</span>
        <span v-if="showLess">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">表格排序</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataJson" ref="singleTable" max-height="416" border>
          <sino-table-column prop="loginName" label="登录名称" sortable align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" sortable align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" sortable align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" sortable  align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showSort">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataJson&quot; ref=&quot;singleTable&quot; height=&quot;356&quot; border&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; sortable align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; sortable align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; sortable align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; sortable  align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
 components: {},
 data () {
  return {
    tableDataJson: [
          {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
        ],
  }
 }
};</pre>
            </code>
          </div>
          <div class="description">在列中设置<code>sortable</code>属性即可实现以该列为基准的排序，接受一个<code>Boolean</code>，默认为<code>false</code>。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showSort = !showSort">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showSort,'sino-angle-double-up':showSort}"></i>
        <span v-if="!showSort">显示代码</span>
        <span v-if="showSort">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">默认不查询数据</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataNull" max-height="416" border v-on:viewAll="viewAll">
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center">
            <template scope="scope">
              <span class="table-span">查看</span>
            </template>
          </sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showNull">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataNull&quot; height=&quot;356&quot; border v-on:viewAll=&quot;viewAll&quot;&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
    &lt;template scope=&quot;scope&quot;&gt;
      &lt;span class=&quot;table-span&quot;&gt;查看&lt;/span&gt;
    &lt;/template&gt;
   &lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
       tableDataNull: null
      };
    },
    methods: {
      viewAll () {
        this.tableDataNull = [
          {
            &quot;userId&quot;: 1,
            &quot;fullName&quot;: &quot;admin_0&quot;
          },
          {
            &quot;userId&quot;: 2,
            &quot;fullName&quot;: &quot;admin_1&quot;
          }
        ]
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">默认<code>tableDataNull</code>数据为<code>null</code></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showNull = !showNull">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showNull,'sino-angle-double-up':showNull}"></i>
        <span v-if="!showNull">显示代码</span>
        <span v-if="showNull">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">空数据</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableDataK" max-height="416" border>
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffect" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userType" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center">
            <template scope="scope">
              <span class="table-span">查看</span>
            </template>
          </sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showK">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;div class=&quot;sino-table-total&quot;&gt;
   &lt;sino-table :data=&quot;tableDataK&quot; height=&quot;356&quot; border&gt;
   &lt;sino-table-column prop=&quot;loginName&quot; label=&quot;登录名称&quot; align=&quot;left&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;fullName&quot; label=&quot;用户名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;innerNum&quot; label=&quot;员工编号&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;isEffect&quot; label=&quot;是否有效&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;userType&quot; label=&quot;用户类型&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column prop=&quot;corpName&quot; label=&quot;公司名称&quot; align=&quot;center&quot;&gt;&lt;/sino-table-column&gt;
   &lt;sino-table-column label=&quot;操作&quot; align=&quot;center&quot;&gt;
    &lt;template scope=&quot;scope&quot;&gt;
      &lt;span class=&quot;table-span&quot;&gt;查看&lt;/span&gt;
    &lt;/template&gt;
   &lt;/sino-table-column&gt;
  &lt;/sino-table&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
       tableDataK: []
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">默认<code>tableDataNull</code>数据为<code>[]</code></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showK = !showK">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showK,'sino-angle-double-up':showK}"></i>
        <span v-if="!showK">显示代码</span>
        <span v-if="showK">收起代码</span>
      </div>
    </div>


  </div>
</template>
<script>
  import api from '../../../../api/index';

  let tableDataJson = [
    {
      "userId": 1,
      "fullName": "admin_0",
      "corpId": 1,
      "loginName": "ywy01",
      "loginPwd": "0e3d7a76344c3f085eb43dd52bbcf90a",
      "userType": 1,
      "innerNum": "1",
      "nation": null,
      "sex": 1,
      "phone": "11111111111",
      "mobile": "13211112222",
      "email": "1111",
      "addr": "222",
      "isLocked": 0,
      "userDesc": "22222",
      "isEffect": 1,
      "creId": 1,
      "creTime": 1502805676000,
      "operId": 3,
      "operTime": 1505916456000,
      "remark": null,
      "corpName": "公司_1",
      "creUserName": "admin_0"
    },
    {
      "userId": 2,
      "fullName": "admin_1",
      "corpId": 2,
      "loginName": "ywy11",
      "loginPwd": "0e3d7a76344c3f085eb43dd52bbcf90a",
      "userType": 1,
      "innerNum": "2",
      "nation": null,
      "sex": 2,
      "phone": "121122",
      "mobile": "13422222222",
      "email": null,
      "addr": "111111111111",
      "isLocked": 0,
      "userDesc": "22222222",
      "isEffect": 1,
      "creId": 1,
      "creTime": 1502805678000,
      "operId": 3,
      "operTime": 1505916456000,
      "remark": null,
      "corpName": "公司_0",
      "creUserName": "admin_0"
    },
    {
      "userId": 3,
      "fullName": "admin",
      "corpId": 3,
      "loginName": "lihao",
      "loginPwd": "0e3d7a76344c3f085eb43dd52bbcf90a",
      "userType": 1,
      "innerNum": "3",
      "nation": null,
      "sex": 1,
      "phone": null,
      "mobile": null,
      "email": "812080908@qq.com",
      "addr": null,
      "isLocked": 0,
      "userDesc": null,
      "isEffect": 1,
      "creId": 1,
      "creTime": 1502805678000,
      "operId": 3,
      "operTime": 1505917303000,
      "remark": "3637",
      "corpName": null,
      "creUserName": "admin_0"
    }
  ];
  export default {
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        show2: false,
        showNull: false,
        showK: false,
        showStatus: false,
        showFixed: false,
        showCheck: false,
        showRadio: false,
        showLess: false,
        showSort: false,
        currentRow: null,
        isA: true,
        tableData: null,
        tableData1: null,
        tableDataJson: tableDataJson,
        tableData2: null,
        tableDataState: null,
        tableDataNull: null,
        tableDataCheck: null,
        tableDataLess: null,
        tableDataK: [],
        total: null,
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        total1: null,
        object1: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageParam1: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        pageParam2: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        pageParamCheck: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        totalCheck: null,
        objectCheck: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        total2: null,
        object2: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        totalLess: null,
        objectLess: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageParamLess: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        tableDataNuafca: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }]
      };
    },
    created () {
      this.getList(1, this.pageParam.pageSize);
      this.getList1(1, this.pageParam1.pageSize);
      this.getList2(1, this.pageParam2.pageSize);
      this.getListCheck(1, this.pageParamCheck.pageSize);
      this.getListLess(1, this.pageParamLess.pageSize);
    },
    methods: {
      radioSelect (selection, row) {
        console.log(selection);
      },
      moreIcon () {
        this.isA = !this.isA;
      },
      getList (pageNum, pageSize) {
        let data = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getListLess (pageNum, pageSize) {
        let data = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableDataLess = res.data.list;
          this.totalLess = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getList1 (pageNum, pageSize) {
        let data = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableData1 = res.data.list;
          this.total1 = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getList2 (pageNum, pageSize) {
        let data = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableData2 = res.data.list;
          this.total2 = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getListCheck (pageNum, pageSize) {
        let data = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableDataCheck = res.data.list;
          this.totalCheck = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageParam.pageNum = pageNum;
        this.getList(pageNum, this.pageParam.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageParam.pageSize = pageSize;
        this.getList(this.pageParam.pageNum, pageSize);
      },
      pageHandler1: function (pageNum) {
        this.pageParam1.pageNum = pageNum;
        this.getList1(pageNum, this.pageParam1.pageSize);
      },
      choooseNum1: function (pageSize) {
        this.pageParam1.pageSize = pageSize;
        this.getList1(this.pageParam1.pageNum, pageSize);
      },
      pageHandler2: function (pageNum) {
        this.pageParam2.pageNum = pageNum;
        this.getList2(pageNum, this.pageParam2.pageSize);
      },
      choooseNum2: function (pageSize) {
        this.pageParam2.pageSize = pageSize;
        this.getList2(this.pageParam2.pageNum, pageSize);
      },
      pageHandlerCheck: function (pageNum) {
        this.pageParamCheck.pageNum = pageNum;
        this.getListCheck(pageNum, this.pageParamCheck.pageSize);
      },
      choooseNumCheck: function (pageSize) {
        this.pageParamCheck.pageSize = pageSize;
        this.getListCheck(this.pageParamCheck.pageNum, pageSize);
      },
      pageHandlerLess: function (pageNum) {
        this.pageParamLess.pageNum = pageNum;
        this.getListLess(pageNum, this.pageParamLess.pageSize);
      },
      choooseNumLess: function (pageSize) {
        this.pageParamLess.pageSize = pageSize;
        this.getListLess(this.pageParamLess.pageNum, pageSize);
      },
      viewAll () {
        let data = {
          data: {},
          pageNum: 1,
          pageSize: 10
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableDataNull = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      tableRowClassName (row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      handleCurrentChange (val) {
        this.currentRow = val;
      }
    }
  };
</script>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
