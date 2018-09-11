<template>
  <!--底部--目前没有-->
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a :href="'https://github.com/' + repository">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>
          <a href="https://twitter.com/_fundon">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a>
        </p>
        <p>Code licensed under <a :href="'https://github.com/' + repository + '/blob/master/LICENSE'">{{ license }}</a>.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {

    data () {
      return this.$store.state.pkg;
    }
  };
</script>

<style lang="scss">

  .footer {
    margin-left: 180px;

    .social a {
      border-bottom: none !important;
    }

    .fa.fa-heart {
      color: red;
    }
  }
</style>
