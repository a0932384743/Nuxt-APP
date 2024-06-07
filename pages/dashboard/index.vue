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
      const loaders = this.$store.getters['dashboard/getLoaders'];
      const dataSource = {};
      Object.keys(loaders).forEach(type => {
        let key = type;
        const data = loaders[type];
        if (type === '歷年裝卸量') {
          key = '散雜貨前十大貨品歷年裝卸量';
          dataSource[key] = this.convertToLine(data);
        }
        if (type === '各港貨物裝卸量') {
          dataSource[key] = this.convertToBar(
            data[Object.keys(data).slice(-1)[0]]
          );
        }
        if (type === '歷年裝卸量') {
          key = '前十大貨物裝卸量';
          dataSource[key] = this.convertToPie(
            data[Object.keys(data).slice(-1)[0]]
          );
        }
        if (type === '貨物裝卸量') {
          dataSource[key] = this.convertToPie(
            data[Object.keys(data).slice(-1)[0]]
          );
        }
        if (type === '貨品成長數') {
          const options = this.convertToPie(
            data[Object.keys(data).slice(-1)[0]]
          );
          key = '成長前三大貨品';
          dataSource[key] = {
            ...options,
            series: [{
              ...options.series[0],
              data: options
                .series[0].data
                ?.sort((a, b) => {
                  return b.value[2] - a.value[2];
                })
                .slice(0, 3)
            }]
          };
          key = '衰退前三大貨品';
          dataSource[key] = {
            ...options,
            series: [{
              ...options.series[0],
              data: options
                .series[0].data
                ?.sort((a, b) => {
                  return a.value[2] - b.value[2];
                })
                .slice(0, 3)
            }]
          };
        }
      });
      return dataSource;
    },
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  methods: {
    convertToLine(data) {
      const legend = {
        orient: 'horizontal',
        bottom: 0
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

      const option = {
        yAxis,
        legend,
        series: [],
        xAxis: {
          boundaryGap: false,
          type: 'category',
          data: Object.keys(data)
        }
      };
      const categories = Object.keys(data);
      const legends = Object.keys(data[Object.keys(data)[0]]);
      legends.forEach(legend => {
        const seriesItem = {
          name: legend,
          type: 'line',
          data: []
        };
        categories.forEach(category => {
          seriesItem.data.push(data[category][legend]);
        });
        option.series.push(seriesItem);
      });
      return option;
    },
    convertToBar(data) {
      const portNames = Object.keys(data);
      const series = [];
      portNames.forEach(port => {
        Object.keys(data[port]).forEach((type, index) => {
          if (!series[index]) {
            series[index] = {
              data: [],
              name: type,
              type: 'bar',
              label: {
                show: true,
                position: 'top'
              }
            };
          }
          series[index].data.push(data[port][type]);
        });
      });
      const option = {
        legend: {
          orient: 'horizontal',
          bottom: 0,
          data: Object.keys(data[portNames[0]])
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: portNames
        },
        yAxis: {
          type: 'value'
        },
        series
      };

      return option;
    },
    convertToPie(data = {}) {
      const pieData = [];
      Object.keys(data)
        .slice(0, 10)
        .forEach(key => {
          pieData.push({ value: data[key], name: key });
        });

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: Object.keys(data)
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: pieData
          }
        ]
      };
      return option;
    },
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
