<template>
  <div class="h-100">
    <b-modal
      v-model="modalShow"
      ok-only
      :ok-title="$t('close')"
      ok-variant="info"
    >
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
          :style="trend"
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
                color="yellow"
              />尚可:1~2個指標達兩年衰退
            </div>
            <div
              class="d-flex align-content-center"
              style="gap: 0.5rem"
            >
              <font-awesome-icon
                icon="circle"
                color="red"
              />警戒:半數以上指標達兩年衰退
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
const colors = ['transparent', 'limegreen', 'orange', 'red'];
export default Vue.extend({
  name: 'Alert',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      modalShow: false,
      option: {
        grid: {
          bottom: '8%'
        },
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          valueFormatter(value) {
            return `${value} k`;
          }
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
      dashboardList: []
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
                  }
                },
                {
                  name: type,
                  type: 'line',
                  data: [],
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
      Object.keys(dataSource).forEach(type => {
        const result = dataSource[type].series[0].data.reduce(
          (acc, curr, index, array) => {
            if (index > 0 && curr < array[index - 1]) {
              acc.push(index);
            }
            return acc;
          },
          []
        );

        dataSource[type].series[0].markPoint = {
          data: result.map((v, index) => {
            return {
              symbol:
                'path://M10 10 L20 30 L0 30 Z M10 15 L10 25 M10 35 L10 40',
              symbolSize: [30, 40],
              itemStyle: {
                color: colors[3]
              },
              name: type,
              value: dataSource[type].series[0].data[index],
              xAxis: v,
              yAxis: dataSource[type].series[0].data[index] / 2,
              year: xAxis.data[index]
            };
          })
        };
        console.log(xAxis);

        result.forEach(index => {
          dataSource[type].series[0].data[index] = {
            value: dataSource[type].series[0].data[index],
            name: type,
            year: xAxis.data[index],
            itemStyle: {
              color: colors[2]
            }
          };
        });
      });
      return dataSource;
    },
    trend() {
      let trendCount = 0;
      const incomeStatisc = this.$store.getters['dashboard/getIncomeStatics'];
      const dataSource = {};
      Object.keys(incomeStatisc).forEach(key => {
        Object.keys(incomeStatisc[key]).forEach(type => {
          if (!dataSource[type]) {
            dataSource[type] = {
              series: [
                {
                  name: 'bar',
                  type: 'bar',
                  data: [],
                  tooltip: {
                    show: false
                  }
                }
              ]
            };
          }
          dataSource[type].series[0].data.push(incomeStatisc[key][type] || 0);
        });
      });

      Object.keys(dataSource).forEach(type => {
        const result = dataSource[type].series[0].data.reduce(
          (acc, curr, index, array) => {
            if (index > 0 && curr < array[index - 1]) {
              acc.push(index);
            }
            return acc;
          },
          []
        );
        if (result.length > 0 && trendCount < 3) {
          trendCount++;
        }
      });

      return {
        color: colors[trendCount],
        stroke: trendCount > 0 ? colors[trendCount] : 'white'
      };
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  methods: {
    async click(param) {
      if (param.componentType === 'markPoint') {
        const res = await Promise.all([
          this.$fire.database
            .ref(
              `incomeMonthStatics/${Number(param.data.year) - 1}/${param.data.name}`
            )
            .once('value'),
          this.$fire.database
            .ref(`incomeMonthStatics/${param.data.year}/${param.data.name}`)
            .once('value'),
          this.$fire.database
            .ref(
              `incomeMonthStatics/${Number(param.data.year) + 1}/${param.data.name}`
            )
            .once('value')
        ]);

        this.option.title.text = param.data.name;
        this.option.series = res.map((snapshot, index) => {
          return {
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            name: param.data.year - 1 + index,
            data: snapshot.val() || []
          };
        });
        this.modalShow = true;
      }
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
<style>
.vue-grid-layout {
  min-height: 50px;
}
</style>
