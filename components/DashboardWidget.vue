<template>
  <grid-item
    :x="item.x"
    :y="item.y"
    :w="item.w"
    :h="item.h"
    :i="item.i"
    :class="{
      enlarge: isEnlarge
    }"
  >
    <dashboard-news v-if="item?.chartType === 'news'" />
    <dashboard-index v-else-if="item?.chartType === 'index'" />
    <dashboard-predict
      v-else-if="item?.chartType === 'predict'"
      :data-source="item.dataSource"
    />
    <b-card
      v-else
      text-variant="white"
      header-class="py-1 px-2"
      body-class="p-0 h-100"
      class="bg-transparent h-100"
      border-variant="secondary"
    >
      <template #header>
        <div class="d-flex pr-5 position-relative">
          <div>
            <font-awesome-icon icon="chart-bar" />
            {{ item.name }}
            <font-awesome-icon
              v-if="dataSource && dataSource[item.dataSource]?.info"
              :id="item.name"
              icon="info-circle"
              width="15px"
              height="15px"
            />
            <b-tooltip
              v-if="dataSource && dataSource[item.dataSource]?.info"
              :target="item.name"
              :title="dataSource && dataSource[item.dataSource]?.info"
            />
          </div>
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
              @click="enableFavorites"
            >
              <font-awesome-icon
                icon="star"
                :style="{
                  color: isFavorite ? 'orange' : 'transparent',
                  stroke: isFavorite ? 'transparent' : 'white'
                }"
                style="stroke-width: 20px"
              />
              {{ $t('favorite') }}
            </b-dropdown-item>
            <b-dropdown-item
              v-if="
                item?.chartType !== 'summary' &&
                  item?.chartType !== 'growth' &&
                  item?.chartType !== 'card'
              "
              tag="div"
              role="button"
              @click="downloadPic"
            >
              <font-awesome-icon icon="download" />
              {{ $t('download.pic') }}
            </b-dropdown-item>
            <b-dropdown-item
              v-if="
                item?.chartType !== 'summary' &&
                  item?.chartType !== 'growth' &&
                  item?.chartType !== 'card'
              "
              tag="div"
              role="button"
              @click="enlargePic"
            >
              <font-awesome-icon :icon="!isEnlarge ? 'expand' : 'compress'" />
              {{ $t(!isEnlarge ? 'expand.pic' : 'compress.pic') }}
            </b-dropdown-item>
            <b-dropdown-item
              v-if="item?.chartType !== 'card'"
              tag="div"
              role="button"
              @click="exportCSV"
            >
              <font-awesome-icon icon="file-export" />
              {{ $t('export.csv') }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <p>
          <small
            v-if="
              dataSource &&
                dataSource[item.dataSource] &&
                dataSource[item.dataSource].xAxis &&
                dataSource[item.dataSource].xAxis[0] &&
                dataSource[item.dataSource].xAxis[0].data?.length > 0
            "
            class="d-block"
          >({{ $t('period') }}:
            {{ dataSource[item.dataSource].xAxis[0].data[0] }} -
            {{ dataSource[item.dataSource].xAxis[0].data.slice(-1)[0] }})</small>
          <small
            v-if="item.unit"
            class="d-block"
          >({{ $t('unit') }}: {{ item.unit }})</small>
        </p>
      </template>
      <dashboard-summary
        v-if="item?.chartType === 'summary'"
        :datas="dataSource ? dataSource[item.dataSource]?.series || [] : []"
      />
      <dashboard-growth
        v-else-if="item?.chartType === 'growth'"
        :datas="dataSource ? dataSource[item.dataSource]?.series || [] : []"
      />
      <dashboard-card
        v-else-if="item?.chartType === 'card'"
        :data-source="item.dataSource"
      />
      <div
        v-else-if="item?.chartType === 'chartSummary'"
        class="w-100 h-100 flex-nowrap d-flex flex-sm-row flex-column"
      >
        <div style="flex: 0 0 500px">
          <dashboard-chart-summary
            :options="(dataSource && dataSource[item.dataSource]) || {}"
          />
        </div>
        <div
          style="flex: 1 1 calc(100% - 450px); max-width: calc(100% - 500px)"
        >
          <v-chart
            ref="chart"
            class="w-100 h-100"
            :options="{
              ...option,
              grid:
                item.grid ||
                (dataSource &&
                  dataSource[item.dataSource] &&
                  dataSource[item.dataSource]?.grid) ||
                null,
              visualMap:
                item.visualMap ||
                (dataSource &&
                  dataSource[item.dataSource] &&
                  dataSource[item.dataSource]?.visualMap) ||
                null,
              legend:
                item.legend ||
                (dataSource &&
                  dataSource[item.dataSource] &&
                  dataSource[item.dataSource]?.legend) ||
                null,
              geo3D:
                item.geo3D ||
                (dataSource && dataSource[item.dataSource]?.geo3D) ||
                null,
              geo:
                item.geo ||
                (dataSource && dataSource[item.dataSource]?.geo) ||
                null,
              tooltip: item.tooltip || option.tooltip,
              xAxis:
                item.xAxis ||
                (dataSource &&
                  dataSource[item.dataSource] &&
                  dataSource[item.dataSource]?.xAxis) ||
                null,
              yAxis:
                item.yAxis ||
                (dataSource &&
                  dataSource[item.dataSource] &&
                  dataSource[item.dataSource]?.yAxis) ||
                null,
              series: (
                (dataSource && dataSource[item.dataSource]?.series) ||
                []
              ).map(d => {
                return {
                  ...d,
                  ...item.seriesProps
                };
              })
            }"
            autoresize
            @click="click"
          />
        </div>
      </div>
      <slot v-else-if="item?.chartType === 'text'" />
      <v-chart
        v-else
        ref="chart"
        class="w-100 h-100"
        :options="{
          ...option,
          grid:
            item.grid ||
            (dataSource &&
              dataSource[item.dataSource] &&
              dataSource[item.dataSource]?.grid) ||
            null,
          visualMap:
            item.visualMap ||
            (dataSource &&
              dataSource[item.dataSource] &&
              dataSource[item.dataSource]?.visualMap) ||
            null,
          legend:
            item.legend ||
            (dataSource &&
              dataSource[item.dataSource] &&
              dataSource[item.dataSource]?.legend) ||
            null,
          geo3D:
            item.geo3D ||
            (dataSource && dataSource[item.dataSource]?.geo3D) ||
            null,
          geo:
            item.geo ||
            (dataSource && dataSource[item.dataSource]?.geo) ||
            null,
          tooltip: item.tooltip || option.tooltip,
          xAxis:
            item.xAxis ||
            (dataSource &&
              dataSource[item.dataSource] &&
              dataSource[item.dataSource]?.xAxis) ||
            null,
          yAxis:
            item.yAxis ||
            (dataSource &&
              dataSource[item.dataSource] &&
              dataSource[item.dataSource]?.yAxis) ||
            null,
          series: (
            (dataSource && dataSource[item.dataSource]?.series) ||
            []
          ).map(d => {
            return {
              ...d,
              ...item.seriesProps
            };
          })
        }"
        autoresize
        @click="click"
      />
    </b-card>
  </grid-item>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue';
import DashboardCard from '~/components/DashbaordCard.vue';
import DashboardGrowth from '~/components/DashbaordGrowth.vue';
import DashboardIndex from '~/components/DashbaordIndex.vue';
import DashboardNews from '~/components/DashbaordNews.vue';
import DashboardPredict from '~/components/DashbaordPredict.vue';
import DashboardSummary from '~/components/DashbaordSummary.vue';
import { WidgetType } from '~/store/dashboard';
import DashboardChartSummary from '~/components/DashbaordChartSummary.vue';

const item: PropOptions<WidgetType> = {
  type: Object,
  required: true
};
const dataSource: PropOptions<{
  [key: string]: {
    [key: string]: number;
  };
}> = {
  type: Object,
  required: true
};

export default Vue.extend({
  name: 'DashboardWidget',
  components: {
    DashboardChartSummary,
    DashboardPredict,
    DashboardIndex,
    DashboardCard,
    DashboardNews,
    DashboardGrowth,
    DashboardSummary
  },
  props: {
    item,
    dataSource
  },
  data() {
    return {
      isEnlarge: false,
      isFavorite: false,
      option: {
        toolbox: {
          show: true,
          feature: {
            restore: {
              show: true,
              title: '還原',
              icon: '<path fill="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" class=""></path>'
            },
            dataView: {
              show: false,
              readOnly: false,
              title: '表格',
              icon: '<path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" class=""></path>',
              lang: ['表格', '關閉', '刷新'],
              textareaColor: '#131022',
              backgroundColor: '#131022',
              buttonColor: '#17a2b8'
            },
            magicType: {
              show: this.item.chartType !== 'pie',
              type: ['line', 'bar'],
              title: {
                line: '折線圖',
                bar: '柱狀圖'
              }
            }
          },

        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
      }
    };
  },

  mounted() {
    const chart: {
      resize: () => void;
      on: (name: string, fuc: (param: any) => void) => void;
    } = this.$refs.chart;

    if (chart) {
      chart.resize();
    }
  },
  methods: {
    click(params) {
      this.$emit('click', params);
    },
    enableFavorites() {
      this.isFavorite = !this.isFavorite;
    },
    exportCSV() {
      let csvContent = '';
      if (this.dataSource) {
        const series = this.dataSource[this.item.dataSource]?.series;
        // Add the data rows
        series.forEach(s => {
          const row = `,${s.data.join(',')}`;
          csvContent += `${row}\n`;
        });
        // Create a download link and trigger the download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${this.item.name}.csv`);
        document.body.appendChild(link); // Required for FF
        link.click();
      }
    },
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
  position: fixed !important;
  top: 0px !important;
  left: 0px !important;
  width: 100% !important;
  min-width: 100% !important;
  height: 100% !important;
  z-index: 99999 !important;
  background-color: rgb(43 38 66) !important;
  transform: translate3d(0px, 0px, 0px) !important;

  .card {
    height: 100%;
    width: 100%;
  }

  .echarts {
    height: 100% !important;
  }
}
</style>
