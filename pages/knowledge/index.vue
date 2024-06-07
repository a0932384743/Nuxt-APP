<template>
  <grid-layout
    :show="!loading"
    :layout="dashboardList"
    :col-num="5"
    :row-num="12"
    :row-height="150"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="true"
    :use-css-transforms="true"
    @layout-updated="onLayoutUpdated"
  >
    <dashboard-widget
      v-for="item in dashboardList"
      :key="item.name"
      :item="item"
      :data-source="dataSource"
    />
  </grid-layout>
</template>
<script lang="ts">
import DashboardWidget from '~/components/DashboardWidget.vue';
import Vue from 'vue';
export default Vue.extend({
  name: 'Knowledge',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      dashboardList: [],
      dataSource: {}
    };
  },
  computed: {
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
    this.$fire.database
      .ref('card/keys')
      .once('value')
      .then(ref => {
        const keys = ref.val();
        keys.forEach(key => {
          this.$fire.database
            .ref(`card/${key}`)
            .once('value')
            .then(ref2 => {
              this.dataSource = { ...this.dataSource, [key]: ref2.val() };
            });
        });
      });
  },
  methods: {
    onLayoutUpdated(list) {
      this.$fire.database.ref(`widgets${this.$route.path}`).update(list);
    },
    async onLoadDashboard(path: string = '') {
      const res = this.$fire.database.ref(`widgets${path}`);
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
