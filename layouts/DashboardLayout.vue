<template>
  <div class="auth-layout">
    <dashboard-header>
      <template #menu-btn>
        <b-button
          v-if="baseMenu.find(m => m.url === currentPath)?.filter || false"
          class="mr-3 navbar-toggler d-block"
          @click="toggleMenu"
        >
          <font-awesome-icon icon="bars" />
        </b-button>
      </template>
      <template #menu>
        <b-nav-item
          v-for="menu in baseMenu"
          :key="menu.name"
          :to="menu.url"
        >
          <span>{{ menu.name }}</span>
        </b-nav-item>
      </template>
    </dashboard-header>
    <main class="masthead">
      <dashboard-side-menu
        v-if="baseMenu.find(m => m.url === currentPath)?.filter || false"
        :is-show-menu="isShowMenu"
      />
      <div
        class="dashboard-main"
        :style="{
          width: isShowMenu ? 'calc( 100% - 350px)' : '100%'
        }"
      >
        <b-breadcrumb
          class="position-absolute"
          style="top: -10px"
        >
          <b-breadcrumb-item href="/">
            {{ $t('home') }}
          </b-breadcrumb-item>
          <b-breadcrumb-item
            :href="currentPath"
            active
          >
            {{ baseMenu.find(m => m.url === currentPath)?.name || '' }}
          </b-breadcrumb-item>
        </b-breadcrumb>
        <nuxt />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardSideMenu from '~/components/DashboardSideMenu.vue';

export default Vue.extend({
  components: { DashboardSideMenu, DashboardHeader },
  layout: 'DashboardLayout',
  data() {
    return {
      isShowMenu: false,
      baseMenu: [],
      currentPath: ''
    };
  },
  watch: {
    $route(to) {
      this.currentPath = to.path;
      if (this.baseMenu.find(m => m.url === this.currentPath)?.filter) {
        this.isShowMenu = true;
      } else {
        this.isShowMenu = false;
      }
    }
  },
  created() {
    this.loadMenu();
  },
  mounted() {
    this.currentPath = this.$route.path;
  },
  methods: {
    async loadMenu() {
      try {
        const res = await this.$fire.firestore.collection('menus').get();
        this.baseMenu = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (this.baseMenu.find(m => m.url === this.currentPath)?.filter) {
          this.isShowMenu = true;
        } else {
          this.isShowMenu = false;
        }
      } catch (e) {
        console.warn('loadMenu', e);
      }
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    }
  }
});
</script>
