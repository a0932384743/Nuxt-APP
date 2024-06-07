<template>
  <b-navbar
    tag="header"
    :class="classes"
    class="header-nav px-2 px-lg-3"
    toggleable="lg"
    type="dark"
    variant="faded"
  >
    <slot name="menu-btn" />
    <b-navbar-brand href="/" class="mr-auto">
      <img src="/img/brand/logo-2.png" alt="Logo" height="50" />
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse">
      <template #default>
        <font-awesome-icon icon="bars" />
      </template>
    </b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-3 my-2 my-lg-0 ml-lg-auto">
        <b-nav-item :to="'/'">
          <span><font-awesome-icon icon="home" /></span>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="mx-3 my-2 my-lg-0 flex-wrap">
        <slot name="menu" />
      </b-navbar-nav>
      <b-navbar-nav class="mx-3 my-2 my-lg-0">
        <b-nav-item-dropdown
          :right="isLocaleDropdownMenuRight"
          menu-class="position-absolute"
        >
          <template #button-content>
            <font-awesome-icon icon="user-circle" />
            <span>{{ 'User' }} </span>
          </template>
          <b-dropdown-header> {{ $t('language') }} </b-dropdown-header>
          <b-dropdown-item
            v-for="locale in locales"
            :key="locale"
            href="#"
            :active="locale === currentLang"
            @click="setLang(locale)"
          >
            <i class="lang-flag" :class="locale" />
            <small class="align-text-top">
              {{ $t('lang.' + locale) }}
            </small>
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item href="#" @click="logout()">
            <font-awesome-icon icon="sign-out" />
            {{ $t('logout') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardHeader',
  data() {
    return {
      classes: [],
      isLocaleDropdownMenuRight: false
    };
  },
  computed: {
    locales() {
      return this.$store.getters['common/getLocales'];
    },
    currentLang() {
      return this.$store.getters['common/getLang'];
    },
    currentUser() {
      return this.$store.getters['common/getUser'];
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut();
        this.$store.dispatch('common/setUser', null);
        this.$router.push('/');
      } catch (e) {
        console.warn('logout', e);
      }
    },
    onScroll() {
      if (window.scrollY > 150) {
        this.classes = ['is-fixed', 'is-visible'];
      } else {
        this.classes = [];
      }
    },
    setLang(lang: string = 'en') {
      this.$i18n.locale = lang;
      this.$store.dispatch('common/setLang', lang);
    },
    onResize() {
      if (window.innerWidth > 768) {
        this.isLocaleDropdownMenuRight = true;
      } else {
        this.isLocaleDropdownMenuRight = false;
      }
    }
  }
});
</script>
<style></style>
