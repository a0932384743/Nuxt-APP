<template>
  <b-navbar
    :class="classes"
    class="header-nav g navbar-light fixed-top  px-4 px-lg-5"
    toggleable="lg"
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
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      description: 'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)'
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent'
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand'
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container',
      description:
        'Container classes. Can be used to control container classes (contains both navbar brand and menu items)'
    },
    type: {
      type: String,
      default: '',
      validator (value) {
        return ['', 'dark', 'success', 'danger', 'warning', 'white', 'primary', 'light', 'info', 'vue'].includes(value);
      },
      description: 'Navbar color type'
    }
  },
  computed: {
    classes () {
      const color = `bg-${this.type}`;
      const classes = [{ 'navbar-transparent': this.transparent }, { [`navbar-expand-${this.expand}`]: this.expand }];
      if (this.position) {
        classes.push(`navbar-${this.position}`);
      }
      if (!this.transparent) {
        classes.push(color);
      }
      return classes;
    },
    hasMenu () {
      return this.$slots.default;
    }
  },
});
</script>
<style></style>
