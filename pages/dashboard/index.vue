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
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    },
    dataSource() {
      const loader = this.$store.getters['dashboard/getLoader'];
      const history = this.$store.getters['dashboard/getLoaderHistory'];
      const summary = this.$store.getters['dashboard/getLoaderSummary'];
      const byHarbor = this.$store.getters['dashboard/getLoaderByHarbor'];
      const growth = this.$store.getters['dashboard/getProductGrowth'];

      const legend = {
        orient: 'horizontal',
        textStyle: {
          color: 'white'
        },
        data: []
      };

      const yAxis = {
        type: 'value',
        axisLabel: {
          formatter(value) {
            if (value >= 1000) {
              return `${value / 1000}k`;
            }
            return value;
          }
        }
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Object.keys(history)
        },
        yAxis,
        series: []
      };

      Object.keys(history).forEach(key => {
        Object.keys(history[key]).forEach((type, index) => {
          if (!topTenLoaderHistory.series[index]) {
            topTenLoaderHistory.series[index] = {
              name: type,
              data: []
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
          name: key,
          data: [
            summary[key].current,
            summary[key].change,
            summary[key].growthRate
          ]
        };
      });

      const productGrowth = {
        series: []
      };

      Object.keys(growth).forEach((key, index) => {
        productGrowth.series[index] = {
          name: key,
          data: [
            growth[key].current,
            growth[key].change,
            growth[key].growthRate
          ]
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
        xAxis: [
          {
            type: 'category',
            data: keys
          }
        ],
        yAxis,
        series: []
      };

      keys.forEach(key => {
        Object.keys(byHarbor[key]).forEach((type, index) => {
          if (!loaderByHarbor.series[index]) {
            loaderByHarbor.series[index] = {
              type: 'bar',
              name: type,
              data: []
            };
          }
          loaderByHarbor.series[index].data.push(byHarbor[key][type]);
        });
      });

      return {
        topTenLoader,
        topTenLoaderHistory,
        loaderSummary,
        loaderByHarbor,
        top3ProductGrowth,
        last3ProductGrowth
      };
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
