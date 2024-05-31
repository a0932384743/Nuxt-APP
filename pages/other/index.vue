<template>
  <div class="h-100">
    <b-modal v-model="modalShow">
      <v-chart
        v-if="modalShow"
        class="w-100"
        :options="option"
        autoresize
      />
    </b-modal>
    <div
      class="d-flex px-2 text-white"
      style="gap: 1rem"
    >
      <div>
        <font-awesome-icon
          icon="circle"
          :style="performance"
          stroke-width="20"
        />
        績效
      </div>
      <div>
        <font-awesome-icon
          icon="circle"
          :style="trend"
          stroke-width="20"
        />
        趨勢
      </div>
      <div>
        <font-awesome-icon
          icon="circle"
          :style="alert"
          stroke-width="20"
        />
        預警
      </div>
    </div>
    <grid-layout
      :show="!loading"
      :layout="dashboardList"
      :col-num="3"
      :row-num="3"
      :row-height="300"
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
        :data-source="dataSource"
        @click="click"
      />
      <grid-item
        :x="2"
        :y="1"
        :w="1"
        :h="1"
        :i="6"
        :is-draggable="false"
      >
        <b-card
          text-variant="white"
          header-class="py-1 px-2"
          body-class="p-2 overflow-auto"
          class="bg-transparent h-100"
          border-variant="secondary"
        >
          <template #header>
            <h5 class="text-white">
              {{ $t('income.text.1') }}:
            </h5>
          </template>
          <div
            class="d-flex flex-column bg-white text-dark py-2 px-1"
            style="font-size: 1rem; gap: 0.8rem"
          >
            <div
              class="d-flex align-content-center"
              style="gap: 0.5rem"
            >
              <font-awesome-icon
                icon="circle"
                color="limegreen"
              />良好:無指標達2年衰退
            </div>
            <div
              class="d-flex align-content-center"
              style="gap: 0.5rem"
            >
              <font-awesome-icon
                icon="circle"
                color="cornflowerblue"
              />尚佳:1~2個指標達兩年衰退但知本支出低於80億元
            </div>
            <div
              class="d-flex align-content-center"
              style="gap: 0.5rem"
            >
              <font-awesome-icon
                icon="circle"
                color="yellow"
              />尚可:1~2個指標達兩年衰退但知本支出80億元以上
            </div>
            <div
              class="d-flex align-content-center"
              style="gap: 0.5rem"
            >
              <font-awesome-icon
                icon="circle"
                color="orange"
              />注意:半數以上指標達兩年衰退但支本支出低於80億元上
            </div>
            <div
              class="d-flex align-content-center"
              style="gap: 0.5rem"
            >
              <font-awesome-icon
                icon="circle"
                color="red"
              />警戒:半數以上指標達兩年衰退但支本支出80億元以上
            </div>
          </div>
        </b-card>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script lang="ts">
import DashboardWidget from '~/components/DashboardWidget.vue';
import Vue from 'vue';
const colors = [
  'transparent',
  'limegreen',
  'cornflowerblue',
  'yellow',
  'orange',
  'red'
];
export default Vue.extend({
  name: 'Other',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      modalShow: false,
      option: {
        title: {
          text: ''
        },
        xAxis: {
          type: 'category',
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter(value) {
              return `${value} k`;
            }
          }
        },
        series: []
      },
      dashboardList: [],
      performance: {
        color: 'limegreen',
        stroke: 'limegreen'
      },
      trend: {
        color: 'limegreen',
        stroke: 'limegreen'
      },
      alert: {
        color: colors[0],
        stroke: 'white'
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    },
    dataSource() {
      const incomeStatisc = this.$store.getters['dashboard/getIncomeStatics'];
      const dataSource = {};
      const xAxis = {
        type: 'category',
        data: Object.keys(incomeStatisc).filter(
          key => Object.keys(incomeStatisc[key]).length > 0
        )
      };
      const yAxis = {
        type: 'value',
        axisLabel: {
          formatter(value) {
            return `${value}%`;
          }
        }
      };
      Object.keys(incomeStatisc).forEach(key => {
        Object.keys(incomeStatisc[key]).forEach(type => {
          if (!dataSource[type]) {
            dataSource[type] = {
              xAxis,
              yAxis,
              series: [
                {
                  name: 'bar',
                  type: 'bar',
                  data: [],
                  tooltip: {
                    show: false
                  },
                  markLine: {
                    lineStyle: {
                      color: colors[3]
                    },
                    data: [{ type: 'average', name: '平均值' }]
                  }
                },
                {
                  name: type,
                  type: 'line',
                  data: [],
                  markPoint: {
                    data: [{ type: 'min', name: '最小值' }]
                  },
                  label: {
                    show: true,
                    position: 'top'
                  }
                }
              ]
            };
          }
          dataSource[type].series[0].data.push(incomeStatisc[key][type] || 0);
          dataSource[type].series[1].data.push(incomeStatisc[key][type] || 0);
        });
      });
      // find min
      Object.keys(dataSource).forEach((type, index) => {
        const min = Math.min(...dataSource[type].series[0].data);
        dataSource[type].series[0].data = (
          dataSource[type]?.series[0]?.data || []
        ).map(d => {
          if (d <= min) {
            return {
              value: d,
              name: type,
              year: xAxis.data[index],
              itemStyle: {
                color: colors[5]
              }
            };
          }
          return d;
        });
      });

      return dataSource;
    }
  },
  watch: {
    dataSource: {
      handler(newValue) {
        let trendCount: number = 0;
        let performanceCount: number = 0;

        Object.keys(newValue).forEach(type => {
          if (
            newValue[type].series &&
            newValue[type].series[0]?.data?.length > 1
          ) {
            const total = newValue[type].series[0]?.data?.length;
            if (
              newValue[type].series[0]?.data[total - 1] -
                newValue[type].series[0]?.data[0] <
              0
            ) {
              trendCount++;
            }

            let diffCount: number = 0;
            for (let i = 0; i < total - 1; i++) {
              if (
                newValue[type].series[0]?.data[i] >
                newValue[type].series[0]?.data[i + 1]
              ) {
                diffCount++;
              }
            }
            if (diffCount >= 2) {
              performanceCount++;
            }
          }
        });

        this.performance = {
          color: colors[performanceCount],
          stroke: performanceCount ? colors[performanceCount] : 'white'
        };

        this.trend = {
          color: colors[trendCount],
          stroke: trendCount ? colors[trendCount] : 'white'
        };

        this.alert = {
          color: performanceCount >= 3 ? colors[5] : colors[0],
          stroke: performanceCount >= 3 ? colors[5] : 'white'
        };
      },
      deep: false,
      immediate: true
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  methods: {
    click(param) {
      if (typeof param.data === 'object') {
        const res = this.$fire.database.ref(
          `incomeMonthStatics/${param.data.year}/${param.data.name}`
        );
        res.once('value', snapshot => {
          this.modalShow = true;
          this.option.title.text = param.data.name;
          this.option.series = [
            {
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              },
              name: param.data.name,
              data: snapshot.val()
            }
          ];
        });
      }
    },
    onLayoutUpdated(list) {
      this.$fire.database.ref('incomeWidgets').update(list);
    },
    async onLoadDashboard(path:string = '') {
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
<style>
.vue-grid-layout {
  min-height: 50px;
}
</style>
