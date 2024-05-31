<template>
  <div class="auth-layout">
    <dashboard-header>
      <template #menu-btn>
        <b-button
          v-if="isHasMenu"
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
        v-if="isHasMenu"
        :is-show-menu="isShowMenu"
      />
      <div
        class="dashboard-main"
        :style="{
          width: isShowMenu ? 'calc( 100% - 350px)' : '100%'
        }"
      >
        <div
          class="position-absolute d-flex justify-content-between w-100"
          style="top: -10px"
        >
          <b-breadcrumb>
            <b-breadcrumb-item href="/">
              {{ $t('home') }}
            </b-breadcrumb-item>
            <b-breadcrumb-item
              :href="currentPath"
              active
            >
              {{
                baseMenu.find(
                  m => m.url.indexOf(currentPath.split('/').filter(s=>s)[0]) > -1
                )?.name || ''
              }}
            </b-breadcrumb-item>
          </b-breadcrumb>

          <b-nav
            v-if="subMenu?.length > 0"
            align="end"
          >
            <b-nav-item
              v-for="sub in subMenu"
              :key="sub.name"
              tag="a"
              :to="sub.url"
            >
              {{ sub.name }}
            </b-nav-item>
          </b-nav>
        </div>

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
      subMenu: [],
      currentPath: '',
      isHasMenu: false
    };
  },

  watch: {
    $route(to) {
      this.currentPath = to.path;
      this.isHasMenu = this.baseMenu.find(
        m => m.url.indexOf(to.path.split('/').filter(s => s)[0]) > -1
      )?.filter || false;
      if (this.isHasMenu) {
        this.isShowMenu = true;
      } else {
        this.isShowMenu = false;
      }

      this.loadSubMenu(to.path);
    }
  },
  created() {
    this.loadMenu();
  },
  mounted() {
    this.currentPath = this.$route.path;
    this.loadSubMenu(this.$route.path);
  },
  methods: {
    async loadSubMenu(path: string = '') {
      this.$fire.database
        .ref(`subMenu/${path}`)
        .once('value')
        .then(ref => {
          if (ref && ref.val()) {
            this.subMenu = ref.val();
          } else {
            this.subMenu = [];
          }
        });
    },
    async loadMenu() {
      try {
        const res = await this.$fire.firestore.collection('menus').get();
        this.baseMenu = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(this.$route.path);
        this.isHasMenu = this.baseMenu.find(
          m => m.url.indexOf(this.$route.path.split('/').filter(s => s)[0]) > -1
        )?.filter || false;
        if (this.isHasMenu) {
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
