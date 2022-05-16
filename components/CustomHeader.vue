<template>
  <b-navbar
    :class="classes"
    class="header-nav px-4 px-lg-5"
    toggleable="md"
    variant="faded"
  >
    <b-navbar-brand href="/">
      <img
        src="/img/brand/logo.png"
        alt="Logo"
        width="50"
        height="50"
      >
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse
      id="nav-collapse"
      is-nav
    >
      <slot />
    </b-collapse>
  </b-navbar>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomHeader',
  data () {
    return {
      classes: []
    };
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll);

    this.onScroll();
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll () {
      if (window.scrollY > 150) {
        this.classes = ['is-fixed', 'is-visible'];
      } else {
        this.classes = [];
      }
    }
  }
});
</script>
<style></style>
