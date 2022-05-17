<template>
  <footer class="bg-light">
    <div class="container">
      <div class="small text-center text-muted">
        <span class="d-inline-block">Copyright © {{ year }}</span>
        <span class="d-inline-block">
          <a
            href="https://www.creative-tim.com"
            class="font-weight-bold ml-1"
            target="_blank"
            rel="noopener"
          >
            by Jr-Wei Chen
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
  name: 'CustomFooter',
  data () {
    return {
      year: '2022',
      version: this.$config.APP_VERSION,
    };
  },
});
</script>
<style></style>
