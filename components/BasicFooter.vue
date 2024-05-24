<template>
  <footer class="bg-light d-none">
    <div class="container">
      <div class="small text-center text-muted">
        <span class="d-inline-block">Copyright © {{ year }}</span>
        <span class="d-inline-block">
          <a
            href="https://www.cht.com.tw/"
            class="font-weight-bold ml-1"
            target="_blank"
            rel="noopener"
          >
            by 中華電信
          </a>
        </span>
        <span class="d-inline-block float-sm-right"> v{{ version }}</span>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BasicFooter',
  data() {
    return {
      year: '2022',
      version: this.$config.APP_VERSION,
    };
  },
});
</script>
<style></style>
