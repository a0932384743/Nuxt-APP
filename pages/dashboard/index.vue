<template>
  <b-container fluid class="overflow-auto h-100">
    <b-overlay :show="loading" rounded="lg" opacity="0.6" class="h-100">
      <draggable class="w-100 m-0 row" @change="onDrag">
        <b-col
          v-for="item in dashboardList"
          :key="JSON.stringify(item)"
          :sm="item?.sm ?? 12"
          :lg="item?.lg ?? 12"
          :md="item?.md ?? 12"
          class="px-1 pb-1"
        >
          <b-card
            text-variant="white"
            header-class="py-1 px-2"
            body-class="p-0"
            class="bg-transparent h-100"
            border-variant="secondary"
          >
            <template #header>
              <div class="d-flex pr-5 position-relative">
                <div>
                  <font-awesome-icon icon="chart-bar" /> {{ item.name }}
                </div>
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                  class="position-absolute"
                  style="right: 0px; top: 0px"
                  right
                >
                  <template #button-content>
                    <font-awesome-icon icon="ellipsis-v" class="text-white" />
                  </template>
                  <b-dropdown-item href="#"> Action </b-dropdown-item>
                  <b-dropdown-item href="#"> Another action </b-dropdown-item>
                  <b-dropdown-item href="#">
                    Something else here...
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <p>
                <small v-if="item.period" class="d-block"
                  >({{ $t('period') }}: -)</small
                >
                <small v-if="item.unit" class="d-block"
                  >({{ $t('unit') }}: {{ item.unit }})</small
                >
              </p>
            </template>
            <dashboard-summary
              v-if="item?.chartType === 'summary'"
              :datas="dataSource[item.dataSource]?.series || []"
            />
            <v-chart
              v-else
              class="w-100"
              :options="{
                ...option,
                ...item,
                xAxis: dataSource[item.dataSource]?.xAxis || item.xAxis,
                yAxis: dataSource[item.dataSource]?.yAxis || item.yAxis,
                series: (dataSource[item.dataSource]?.series || []).map(d => {
                  return {
                    ...d,
                    ...item.seriesProps
                  };
                })
              }"
              autoresize
            />
          </b-card>
        </b-col>
      </draggable>
    </b-overlay>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue';
import DashboardSummary from '~/components/DashbaordSummary.vue';
export default Vue.extend({
  name: 'Dashboard',
  components: { DashboardSummary },
  layout: 'DashboardLayout',
  data() {
    return {
      list: [],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        textStyle: {
          color: 'white'
        }
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    },
    dashboardList() {
      return this.$store.getters['dashboard/getDashboard'];
    },
    dataSource() {
      const loader = this.$store.getters['dashboard/getLoader'];
      const history = this.$store.getters['dashboard/getLoaderHistory'];
      const summary = this.$store.getters['dashboard/getLoaderSummary'];
      const byHarbor = this.$store.getters['dashboard/getLoaderByHarbor'];
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
      } else {
        topTenLoader.series = [];
      }

      const topTenLoaderHistory = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Object.keys(history)
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter(value) {
              if (value >= 1000) {
                return `${value / 1000}k`;
              }
              return value;
            }
          }
        },
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

      const keys = Object.keys(byHarbor);
      const loaderByHarbor = {
        legend: {
          data: keys.length > 0 ? Object.keys(byHarbor[keys[0]]) : []
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: keys
          }
        ],
        series: []
      };

      keys.forEach(key => {
        Object.keys(byHarbor[key]).forEach((type, index) => {
          if (!loaderByHarbor.series[index]) {
            loaderByHarbor.series[index] = {
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
        loaderByHarbor
      };
    }
  },
  created() {
    this.onLoadDashboard();
  },
  methods: {
    onDrag({ moved }) {
      const list = [...this.dashboardList];
      const temp = list[moved.oldIndex];
      list[moved.oldIndex] = list[moved.newIndex];
      list[moved.newIndex] = temp;
      this.$store.dispatch('dashboard/setList', list);
    },
    async onLoadDashboard() {
      const res = this.$fire.database.ref('dashboard');
      res.once('value', snapshot => {
        const data = snapshot.val();
        this.$store.dispatch(
          'dashboard/setDashboard',
          data.filter(d => d)
        );
      });
    }
  }
});
</script>
