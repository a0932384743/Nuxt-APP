<template>
  <grid-layout
    :show="!loading"
    :layout="dashboardList"
    :col-num="4"
    :row-num="12"
    :row-height="150"
    is-draggable
    is-resizable
    vertical-compact
    use-css-transforms
    :draggable-handle="'.vue-grid-item'"
    @layout-updated="onLayoutUpdated"
  >
    <dashboard-widget
      v-for="item in dashboardList"
      :key="item.name"
      :item="item"
    />
  </grid-layout>
</template>
<script lang="ts">
import DashboardWidget from '~/components/DashboardWidget.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Dashboard',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      dashboardList: []
    };
  },
  computed: {
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    }
  },
  created() {
    this.onLoadDashboard();
  },
  methods: {
    onLayoutUpdated(list) {
      this.$fire.database.ref('loaderWidgets').update(list);
    },
    async onLoadDashboard() {
      const res = this.$fire.database.ref('loaderWidgets');
      res.once('value', snapshot => {
        const data = snapshot.val();
        this.dashboardList = data
          .filter(d => d)
          .map((d, index) => {
            return {
              ...d,
              i: index
            };
          });
      });
    }
  }
});
</script>
<style>
.vue-grid-layout {
  min-height: 50px;
}
</style>
