<template>
  <grid-layout
    :show="!loading"
    :layout="dashboardList"
    :col-num="1"
    :row-num="3"
    :row-height="300"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="true"
    :use-css-transforms="true"
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
import Vue from 'vue';

export default Vue.extend({
  name: 'Income',
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
      const dataSource = {};
      const incomeLoss = this.$store.getters['dashboard/getIncomeLoss'];
      const grid = {
        left: '5%',
        right: '5%'
      };
      const yAxis = [
        {
          type: 'value',
          name: '億元'
        }
      ];

      Object.keys(incomeLoss).forEach(key => {
        const xAxis = [
          {
            type: 'category',
            axisLabel: { interval: 0 },
            data: Object.keys(incomeLoss[key]),
            splitLine: { show: false }
          }
        ];
        const options = {
          grid,
          yAxis,
          xAxis,
          legend: {
            orient: 'horizontal',
            bottom: 10,
            textStyle: {
              color: 'white'
            },
            data: []
          },
          series: []
        };
        Object.keys(incomeLoss[key]).forEach(type => {
          options.legend.data = Object.keys(incomeLoss[key][type]);
          Object.keys(incomeLoss[key][type]).forEach(
            (category, index, array) => {
              if (!options.series[index]) {
                options.series[index] = {
                  name: category,
                  label: {
                    show: true,
                    position: 'top'
                  },
                  type: array.length - 1 > index ? 'bar' : 'line',
                  data: []
                };
              }
              options.series[index].data.push({
                value: incomeLoss[key][type][category],
                name: type
              });
            }
          );
        });
        dataSource[key] = options;
      });
      return dataSource;
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  updated() {
    console.log(this.dataSource);
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
