<template>
  <footer class="bg-light py-4">
    <div class="container px-4 px-lg-5">
      <p class="small text-center text-muted">
        <span class="d-inline-block">Copyright © {{ year }}</span>
        <span class="d-inline-block">
          <a
            href="https://www.creative-tim.com"
            class="font-weight-bold ml-1"
            target="_blank"
            rel="noopener"
          >
            Jr-Wei Chen
          </a>
        </span>
        <span class="d-inline-block float-sm-right">v{{ version }}</span>
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'CustomFooter',
  data () {
    return {
      year: '2022',
      version: this.$config.APP_VERSION,
    };
  },
};
</script>
<style></style>
