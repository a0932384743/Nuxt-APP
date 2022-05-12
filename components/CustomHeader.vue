<template>
  <nav
    :class="classes"
    class="header-nav navbar navbar-expand-lg navbar-light fixed-top py-3"
  >
    <div
      :class="containerClasses"
      class="container px-4 px-lg-5"
    >
      <nuxt-link
        class="navbar-brand"
        to="/dashboard"
      >
        <img
          src="/img/brand/logo.png"
          alt="Logo"
          width="50"
          height="50"
        >
      </nuxt-link>
      <button
        class="navbar-toggler"
        @click.stop="toggleMenu"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        v-show="show"
        v-click-outside="closeMenu"
        class="navbar-collapse collapse show"
        :class="menuClasses"
      >
        <slot :close-menu="closeMenu" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'CustomHeader',
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      description: 'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)',
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent',
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand',
    },
    menuClasses: {
      type: [String, Object, Array],
      default: '',
      description: 'Navbar menu (items) classes. Can be used to align menu items to the right/left',
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container',
      description:
        'Container classes. Can be used to control container classes (contains both navbar brand and menu items)',
    },
    type: {
      type: String,
      default: '',
      validator (value) {
        return ['', 'dark', 'success', 'danger', 'warning', 'white', 'primary', 'light', 'info', 'vue'].includes(value);
      },
      description: 'Navbar color type',
    },
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
    },
  },
  methods: {
    toggleMenu () {
      this.$emit('change', !this.show);
    },
    closeMenu () {
      this.$emit('change', false);
    },
  },
};
</script>
<style></style>
