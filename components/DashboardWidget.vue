<template>
  <b-card
    :class="{
      enlarge: isEnlarge
    }"
    text-variant="white"
    header-class="py-1 px-2"
    body-class="p-0"
    class="bg-transparent h-100"
    border-variant="secondary"
  >
    <template #header>
      <div class="d-flex pr-5 position-relative">
        <div><font-awesome-icon icon="chart-bar" /> {{ item.name }}</div>
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          menu-class="custom-dropdown-menu"
          class="position-absolute"
          style="right: 0px; top: 0px"
          :dropright="isEnlarge"
          right
        >
          <template #button-content>
            <font-awesome-icon
              icon="ellipsis-v"
              class="text-white"
            />
          </template>
          <b-dropdown-item
            tag="div"
            role="button"
            @click="downloadPic"
          >
            <font-awesome-icon icon="download" />
            {{ $t('download.pic') }}
          </b-dropdown-item>
          <b-dropdown-item
            tag="div"
            role="button"
            @click="enlargePic"
          >
            <font-awesome-icon :icon="!isEnlarge ? 'expand' : 'compress'" />
            {{ $t(!isEnlarge ? 'expand.pic' : 'compress.pic') }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <p>
        <small
          v-if="item.period"
          class="d-block"
        >({{ $t('period') }}: -)</small>
        <small
          v-if="item.unit"
          class="d-block"
        >({{ $t('unit') }}: {{ item.unit }})</small>
      </p>
    </template>
    <dashboard-summary
      v-if="item?.chartType === 'summary'"
      :datas="dataSource[item.dataSource]?.series || []"
    />
    <v-chart
      v-else
      ref="chart"
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
</template>
<script lang="ts">
import DashboardSummary from '~/components/DashbaordSummary.vue';
import Vue, { PropOptions } from 'vue';
import { DashboardType } from '~/store/dashboard';

const item: PropOptions<DashboardType> = {
  type: Object,
  required: true
};

export default Vue.extend({
  name: 'DashboardWidget',
  components: { DashboardSummary },
  props: {
    item
  },
  data() {
    return {
      isEnlarge: false,
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
    dataSource() {
      const loader = this.$store.getters['dashboard/getLoader'];
      const history = this.$store.getters['dashboard/getLoaderHistory'];
      const summary = this.$store.getters['dashboard/getLoaderSummary'];
      const byHarbor = this.$store.getters['dashboard/getLoaderByHarbor'];
      const ships = this.$store.getters['dashboard/getShipCount'];
      const shipCount = {
        series: []
      };
      if (ships && Object.keys(ships).length > 0) {
        shipCount.series = [
          {
            data: Object.keys(ships).map(key => {
              return {
                name: key,
                value: ships[key].data1
              };
            })
          }
        ];
      } else {
        shipCount.series = [];
      }

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
        loaderByHarbor,
        shipCount
      };
    }
  },
  mounted() {
    const chart: {
      resize: () => void;
    } = this.$refs.chart;

    if (chart) {
      chart.resize();
    }
  },
  methods: {
    enlargePic() {
      this.isEnlarge = !this.isEnlarge;
      const chart: {
        resize: () => void;
      } = this.$refs.chart;

      if (chart) {
        chart.resize();
      }
    },
    downloadPic() {
      const chart: {
        getDataURL: (props: any) => string;
      } = this.$refs.chart;
      if (chart) {
        const img = chart.getDataURL({
          type: 'png',
          pixelRatio: 5,
          backgroundColor: '#fff'
        });

        const link = document.createElement('a');
        link.href = img;
        link.download = this.item.name;
        link.click();
      }
    }
  }
});
</script>
<style lang="scss">
.enlarge {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100% !important;
  min-width: 100% !important;
  height: 100% !important;
  z-index: 99999;
  background-color: rgb(43 38 66) !important;
  transition:
    top 300ms ease-in,
    left 300ms ease-in;

  .echarts {
    height: 100% !important;
  }
}
</style>
