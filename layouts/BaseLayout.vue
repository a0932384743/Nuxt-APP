<template>
  <div
    :class="layoutClass"
    class="auth-layout d-flex flex-column"
  >
    <custom-header
      v-model="showMenu"
      type="light"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <b-navbar-nav class="ml-auto my-2 my-lg-0">
        <b-nav-item
          v-for="menu in baseMenu"
          :key="menu.name"
          :to="menu.url"
        >
          <span>{{ $t(menu.name.toLowerCase()) }}</span>
        </b-nav-item>
        <b-nav-item-dropdown
          :text="$t('language')"
          right
          menu-class="border-0"
        >
          <b-dropdown-item href="#">
            EN
          </b-dropdown-item>
          <b-dropdown-item href="#">
            ZH
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </custom-header>
    <main
      class="bg-primary flex-grow-1"
      :style="{ paddingTop: '120px', paddingBottom: '100px' }"
    >
      <div class="container">
        <nuxt />
      </div>
    </main>
    <custom-footer />
  </div>
</template>
<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  layout: 'BaseLayout',
  props: {
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  data () {
    return {
      showMenu: false,
      baseMenu: [
        {
          url: '/',
          name: 'Home',
        },
        {
          url: '/register',
          name: 'Register',
        },
        {
          url: '/login',
          name: 'Login',
        },
      ]
    };
  },
  computed: {
    layoutClass () {
      const exceptions = ['index', 'home'];
      if (this.$route && this.$route.name && !exceptions.includes(`${this.$route.name}`)) {
        return 'bg-default';
      } else {
        return '';
      }
    },
  },
  watch: {
    '$route.path' () {
      if (this.showMenu) {
        this.closeMenu();
      }
    },
  },
  mounted () {
    console.log(this);
  },
  methods: {
    closeMenu () {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    },
  },
});
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
