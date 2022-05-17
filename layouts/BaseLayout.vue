<template>
  <div
    class="auth-layout d-flex flex-column"
  >
    <custom-header>
      <b-navbar-nav
        class="ml-auto my-2 my-lg-0"
      >
        <b-nav-item
          v-for="menu in baseMenu"
          :key="menu.name"
          :to="menu.url"
        >
          <span>{{ $t(menu.name.toLowerCase()) }}</span>
        </b-nav-item>
        <b-nav-item-dropdown
          :text="$t('language')"
          :right="isLocaleDropdownMenuRight"
          menu-class="position-absolute"
        >
          <b-dropdown-item
            v-for="locale in locales"
            :key="locale"
            href="#"
            :active="locale === currentLang"
            @click="setLang(locale)"
          >
            <i
              class="lang-flag"
              :class="locale"
            />
            <small class="align-text-top">{{ $t('lang.' + locale) }}</small>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </custom-header>
    <main
      class="bg-primary flex-grow-1 masthead"
    >
      <nuxt />
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
      isLocaleDropdownMenuRight: false,
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
    locales () {
      return this.$store.getters['common/getLocales'];
    },
    currentLang () {
      return this.$store.getters['common/getLang'];
    },
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.onResize();
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    setLang (lang: string = 'en') {
      this.$i18n.locale = lang;
      this.$store.dispatch('common/setLang', lang);
    },
    onResize () {
      if (window.innerWidth > 768) {
        this.isLocaleDropdownMenuRight = true;
      } else {
        this.isLocaleDropdownMenuRight = false;
      }
    }
  }

});
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
