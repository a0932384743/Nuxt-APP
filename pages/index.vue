<template>
  <div
    class="container"
    :style="{height:'100vh'}"
  >
    <b-row class="align-items-center justify-content-center text-center h-100">
      <div class="col-lg-6 align-self-end">
        <h1 class="text-white font-weight-bold">
          Your Favorite Place for Free Bootstrap Themes
        </h1>
        <hr class="divider">
      </div>
      <div class="col-lg-8 align-self-baseline">
        <p class="text-light mb-5">
          Start Bootstrap can help you build better websites using the Bootstrap framework! Just
          download a theme and start customizing, no strings attached!
        </p>
        <a
          class="btn btn-outline-light rounded"
          :style="{minWidth: '150px' }"
          href="#about"
        >{{ $t('find.more') }}</a>
      </div>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
  layout: 'BaseLayout',
});
</script>

<style lang="scss">
.page-section {
  padding: 8rem 0;
}
</style>
