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
      <ul class="navbar-nav ms-auto my-2 my-lg-0">
        <li
          v-for="menu in baseMenu"
          :key="menu.name"
          class="nav-item"
        >
          <nuxt-link
            :to="menu.url"
            class="nav-link"
          >
            <span>{{ menu.name }}</span>
          </nuxt-link>
        </li>
      </ul>
      <hr class="d-lg-none">
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li
          v-for="menu in socialMenu"
          :key="menu.name"
          class="nav-item"
        >
          <a
            class="nav-link nav-link-icon"
            :href="menu.url"
            target="_blank"
            rel="noopener"
            :aria-label="menu.name"
          >
            <font-awesome-icon :icon="menu.icon" />
            <span class="d-lg-none">{{ menu.name }}</span>
          </a>
        </li>
      </ul>
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
<script>
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';

export default {
  components: {
    CustomHeader,
    CustomFooter,
  },
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
      ],
      socialMenu: [
        {
          url: 'https://www.instagram.com/creativetimofficial',
          name: 'Instagram',
          icon: 'fa-brands fa-instagram',
        },
        {
          url: 'https://www.facebook.com/creativetim',
          name: 'Facebook',
          icon: 'fa-brands fa-facebook',
        },
        {
          url: 'https://twitter.com/creativetim',
          name: 'Twitter',
          icon: 'fa-brands fa-twitter',
        },
        {
          url: 'https://github.com/creativetimofficial',
          name: 'Github',
          icon: 'fa-brands fa-github',
        },
      ],
    };
  },
  computed: {
    layoutClass () {
      const exceptions = ['index', 'home'];
      if (!exceptions.includes(this.$route.name)) {
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
  methods: {
    closeMenu () {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    },
  },
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
