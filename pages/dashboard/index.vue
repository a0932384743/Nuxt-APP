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
  name: 'Dashboard',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      dashboardList: []
    };
  },
  computed: {
    dataSource() {
      const loader = this.$store.getters['dashboard/getLoader'];
      const history = this.$store.getters['dashboard/getLoaderHistory'];
      const summary = this.$store.getters['dashboard/getLoaderSummary'];
      const byHarbor = this.$store.getters['dashboard/getLoaderByHarbor'];
      const growth = this.$store.getters['dashboard/getProductGrowth'];

      const legend = {
        data: [],
        orient: 'horizontal',
        textStyle: {
          color: 'white'
        }
      };

      const yAxis = {
        axisLabel: {
          formatter(value) {
            if (value >= 1000) {
              return `${value / 1000}k`;
            }
            return value;
          }
        },
        type: 'value'
      };

      const topTenLoader = {
        series: []
      };

      if (loader && Object.keys(loader).length > 0) {
        topTenLoader.series = [
          {
            data: Object.keys(loader).map(key => {
              return {
                name: key,
                value: loader[key].data1
              };
            })
          }
        ];
      }
      console.log(history);
      const topTenLoaderHistory = {
        series: [],
        xAxis: {
          boundaryGap: false,
          data: Object.keys(history),
          type: 'category'
        },
        yAxis
      };

      Object.keys(history).forEach(key => {
        Object.keys(history[key]).forEach((type, index) => {
          if (!topTenLoaderHistory.series[index]) {
            topTenLoaderHistory.series[index] = {
              data: [],
              name: type
            };
          }
          topTenLoaderHistory.series[index].data.push(history[key][type].data1);
        });
      });

      const loaderSummary = {
        legend: {
          ...legend,
          data: ['名稱', '同期增減', '成長率']
        },
        series: []
      };

      Object.keys(summary).forEach((key, index) => {
        loaderSummary.series[index] = {
          data: [
            summary[key].current,
            summary[key].change,
            summary[key].growthRate
          ],
          name: key
        };
      });

      const productGrowth = {
        series: []
      };

      Object.keys(growth).forEach((key, index) => {
        productGrowth.series[index] = {
          data: [
            growth[key].current,
            growth[key].change,
            growth[key].growthRate
          ],
          name: key
        };
      });

      const top3ProductGrowth = {
        legend: {
          ...legend,
          data: ['貨品名稱', '同期成長率', '同期增長量']
        },
        series: productGrowth.series
          .sort((a, b) => {
            return a.data[0] - b.data[0];
          })
          .slice(0, 3)
      };

      const last3ProductGrowth = {
        legend: {
          ...legend,
          data: ['貨品名稱', '同期成長率', '同期增長量']
        },
        series: productGrowth.series
          .sort((a, b) => {
            return b.data[0] - a.data[0];
          })
          .slice(0, 3)
      };

      const keys = Object.keys(byHarbor);
      const loaderByHarbor = {
        legend: {
          ...legend,
          data: keys.length > 0 ? Object.keys(byHarbor[keys[0]]) : []
        },
        series: [],
        xAxis: [
          {
            data: keys,
            type: 'category'
          }
        ],
        yAxis
      };

      keys.forEach(key => {
        Object.keys(byHarbor[key]).forEach((type, index) => {
          if (!loaderByHarbor.series[index]) {
            loaderByHarbor.series[index] = {
              data: [],
              name: type,
              type: 'bar'
            };
          }
          loaderByHarbor.series[index].data.push(byHarbor[key][type]);
        });
      });

      return {
        last3ProductGrowth,
        loaderByHarbor,
        loaderSummary,
        top3ProductGrowth,
        topTenLoader,
        topTenLoaderHistory
      };
    },
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  methods: {
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
