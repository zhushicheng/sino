<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Pagination 分页</h2>
    <h3 class="sino-compon-h3">大分页</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-page v-bind:page="page"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object" :total="total"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-page v-bind:page=&quot;page&quot;
                v-bind:page-size=&quot;pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object&quot;
                :total=&quot;total&quot;&gt;&lt;/sino-page&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        object: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: true,
          isSelectPage: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
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


    <h3 class="sino-compon-h3">小分页</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-page v-bind:page="page"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object1" :total="total"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-page v-bind:page=&quot;page&quot;
                v-bind:page-size=&quot;pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object&quot; :total=&quot;total&quot;&gt;&lt;/sino-page&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        object1: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: true,
          isSelectPage: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
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


    <h3 class="sino-compon-h3">中分页</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-page v-bind:page="page"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object2" :total="total"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-page v-bind:page=&quot;page&quot;
                v-bind:page-size=&quot;pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object2&quot;
                :total=&quot;total&quot;&gt;&lt;/sino-page&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        object2: {
          maxPage: 2,
          isSmallpage: true,
          isPage: true,
          isTotal: true,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
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


    <h3 class="sino-compon-h3">最小分页</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-page v-bind:page="page"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object3" :total="total"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-page v-bind:page=&quot;page&quot;
                v-bind:page-size=&quot;pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object3&quot;
                :total=&quot;total&quot;&gt;&lt;/sino-page&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        object3: {
          maxPage: 2,
          isSmallpage: true,
          isPage: true,
          isTotal: false,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
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


    <h3 class="sino-compon-h3">最小分页</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-page v-bind:page="page"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object4" :total="total"></sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show4">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-page v-bind:page=&quot;page&quot;
                v-bind:page-size=&quot;pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageArray&quot;
                v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object4&quot;
                :total=&quot;total&quot;&gt;&lt;/sino-page&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        object4: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show4 = !show4">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show4,'sino-angle-double-up':show4}"></i>
        <span v-if="!show4">显示代码</span>
        <span v-if="show4">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">下拉框分页</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-page v-bind:page="page"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object5" :total="total">
        </sino-page>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show5">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-page v-bind:page=&quot;page&quot;
                v-bind:page-size=&quot;pageSize&quot;
                v-on:pagehandler=&quot;pageHandler&quot;
                :pageArray=&quot;pageArray&quot; v-on:choosePageFun=&quot;choooseNum&quot;
                v-bind:object=&quot;object5&quot; :total=&quot;total&quot;&gt;
&lt;/sino-page&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        object5: {
          maxPage: 2,
          selectPage: true,
          isTotal: false,
          isSelect: false,
          isjumper: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show5 = !show5">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show5,'sino-angle-double-up':show5}"></i>
        <span v-if="!show5">显示代码</span>
        <span v-if="show5">收起代码</span>
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
        show3: false,
        show4: false,
        show5: false,
        object: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: true,
          isSelectPage: false
        },

        object1: {
          maxPage: 2,
          isSmallpage: true,
          isPage: true,
          isTotal: false,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },

        object2: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        object3: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: false,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        object4: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        object5: {
          maxPage: 2,
          selectPage: true,
          isTotal: false,
          isSelect: false,
          isjumper: false
        },
        page: 1,
        total: 1000,
        pageSize: 10,
        pageArray: [10, 20, 30, 40]
      };
    },
    methods: {
      pageHandler: function (page) {
        this.page = page;
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
      }
    }
  };
</script>

