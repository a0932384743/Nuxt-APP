<template>
  <b-navbar
    :class="classes"
    tag="header"
    class="header-nav px-2 px-lg-3"
    variant="faded"
    toggleable="lg"
    type="dark"
  >
    <b-navbar-brand href="/">
      <img
        src="/img/brand/logo-2.png"
        alt="Logo"
        height="50"
      >
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse">
      <template #default>
        <font-awesome-icon icon="bars" />
      </template>
    </b-navbar-toggle>
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
  name: 'BasicHeader',
  data() {
    return {
      classes: [],
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);

    this.onScroll();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll() {
      if (window.scrollY > 150) {
        this.classes = ['is-fixed', 'is-visible'];
      } else {
        this.classes = [];
      }
    },
  },
});
</script>
<style></style>
