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
          v-for="menu in (baseMenu || []).filter(m => !m.hidden)"
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
          class="position-absolute d-flex justify-content-between w-100 align-items-center"
          style="top: -10px"
        >
          <b-breadcrumb class="flex-nowrap">
            <b-breadcrumb-item href="/">
              {{ $t('home') }}
            </b-breadcrumb-item>
            <b-breadcrumb-item
              :href="currentPath"
              active
            >
              {{
                baseMenu.find(
                  m =>
                    m.url.indexOf(currentPath.split('/').filter(s => s)[0]) > -1
                )?.name || ''
              }}
            </b-breadcrumb-item>
          </b-breadcrumb>

          <b-nav
            v-if="subMenu?.length > 0"
            align="end"
            class="flex-nowrap"
            style="height: fit-content"
          >
            <b-nav-item
              v-for="sub in subMenu"
              :key="sub.name"
              class="sub-menu-item"
              :class="{
                active: currentPath === sub.url
              }"
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
import DashboardSideMenu from '~/components/DashboardSideMenu.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import Vue from 'vue';

export default Vue.extend({
  components: { DashboardSideMenu, DashboardHeader },
  layout: 'DashboardLayout',
  data() {
    return {
      isShowMenu: false,
      currentPath: '',
      isHasMenu: false
    };
  },
  computed: {
    baseMenu() {
      return this.$store.getters['common/getMenu'];
    },
    subMenu() {
      return this.$store.getters['common/getSubmenu'];
    }
  },
  watch: {
    $route(to) {
      this.currentPath = to.path;
      this.isHasMenu =
        this.baseMenu.find(
          m => m.url.indexOf(to.path.split('/').filter(s => s)[0]) > -1
        )?.filter || false;
      if (this.isHasMenu) {
        this.isShowMenu = true;
      } else {
        this.isShowMenu = false;
      }
      this.loadSubMenu(to.path.split('/').filter(s => s)[0]);
    }
  },
  created() {
    this.loadMenu();
  },
  mounted() {
    this.currentPath = this.$route.path;
    this.loadSubMenu(this.$route.path.split('/').filter(s => s)[0]);
  },
  methods: {
    async loadSubMenu(path: string = '') {
      this.$fire.database
        .ref(`subMenu/${path}`)
        .once('value')
        .then(ref => {
          let menu = [];
          if (ref && ref.val()) {
            menu = ref.val();
          }
          this.$store.dispatch('common/setSubMenu', menu);
          if (
            menu.length > 0 &&
            this.$route.path.split('/').filter(s => s).length <= 1
          ) {
            this.$router.push(menu[0].url);
          }
        });
    },
    async loadMenu() {
      try {
        const res = await this.$fire.firestore.collection('menus').get();
        const baseMenu = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.isHasMenu =
          baseMenu.find(
            m =>
              m.url.indexOf(this.$route.path.split('/').filter(s => s)[0]) > -1
          )?.filter || false;
        if (this.isHasMenu) {
          this.isShowMenu = true;
        } else {
          this.isShowMenu = false;
        }
        this.$store.dispatch('common/setMenu', baseMenu);
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

<style lang="scss">
.sub-menu-item {
  color: lightgray;
  font-size: 1rem;
  padding: 0px;

  & > a {
    color: gray;
  }

  &.active {
    border-bottom: 2px solid gray;
  }
}
</style>
