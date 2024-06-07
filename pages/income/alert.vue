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
    <dashbaord-alert :trend="trend" />
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
          header-class="pt-1 pb-4  px-2"
          body-class="p-2 overflow-auto"
          class="bg-transparent h-100"
          border-variant="secondary"
        >
          <template #header>
            {{ $t('income.text.1') }}:
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
                color="orange"
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
import { colors } from '~/utils/constants';

export default Vue.extend({
  name: 'Alert',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      trend: {},
      modalShow: false,
      dashboardList: [],
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
      }
    };
  },
  computed: {
    dataSource() {
      const dataSource = {};
      const income = this.$store.getters['dashboard/getIncome'];
      Object.keys(income).forEach(key => {
        if (key.indexOf('率') > -1) {
          const data = income[key];
          if (data) {
            dataSource[key] = this.convertToBar(data, key);
          }
        }
      });
      return dataSource;
    },
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    }
  },
  watch: {
    dataSource(dataSource) {
      const length = Object.keys(dataSource).filter(
        key => dataSource[key].alertNum > 0
      ).length;

      this.trend = {
        color: colors[length >= 3 ? 3 : length],
        stroke: length > 0 ? colors[length >= 3 ? 3 : length] : 'white'
      };
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  methods: {
    convertToBar(data, name) {
      const grid = {
        left: '15%',
        right: '15%'
      };
      const yAxis = {
        axisLabel: {
          formatter(value) {
            return `${value} %`;
          }
        },
        type: 'value'
      };

      const xAxis = [
        {
          axisLabel: { interval: 0 },
          data: Object.keys(data),
          splitLine: { show: false },
          type: 'category'
        }
      ];

      const options = {
        grid,
        alertNum: 0,
        info: '點擊告警圖示可以查看詳細每月同期數值比較圖表',
        legend: {
          bottom: 10,
          data: [],
          orient: 'horizontal'
        },
        series: [],
        xAxis,
        yAxis
      };

      options.series.push({
        data: Object.keys(data).map(key => data[key]),
        label: {
          position: 'top',
          show: true
        },
        tooltip: {
          show: false
        },
        type: 'bar'
      });

      options.series.push({
        data: Object.keys(data).map(key => data[key]),
        label: {
          show: false
        },
        tooltip: {
          show: true
        },
        type: 'line'
      });

      if (options.series.length > 0) {
        const result = Object.keys(data)
          .map(key => data[key])
          .reduce((acc, curr, index, array) => {
            if (index > 0 && curr < array[index - 1]) {
              acc.push(index);
            }
            return acc;
          }, []);

        options.series[0].markPoint = {
          data: result.map((v, index) => {
            return {
              itemStyle: {
                color: colors[3]
              },
              name,
              symbol:
                'path://M10 10 L20 30 L0 30 Z M10 15 L10 25 M10 35 L10 40',
              symbolSize: [30, 40],
              value: options.series[0].data[index],
              xAxis: v,
              yAxis: options.series[0].data[index],
              year: options.xAxis[0].data[v]
            };
          })
        };

        result.forEach(index => {
          options.series[options.series.length - 1].data[index] = {
            ...options.series[options.series.length - 1].data[index],
            value: options.series[options.series.length - 1].data[index],
            itemStyle: {
              color: colors[3]
            },
            year: options.xAxis[0].data[index]
          };
        });
        options.alertNum = result.length;
      }
      return options;
    },
    onLayoutUpdated(list) {
      this.$fire.database.ref(`widgets${this.$route.path}`).update(list);
    },
    async click(param) {
      if (param.componentType === 'markPoint') {
        const res = await Promise.all([
          this.$fire.database
            .ref(
              `incomeMonthStatics/${param.data.name}/${Number(param.data.year) - 1}`
            )
            .once('value'),
          this.$fire.database
            .ref(`incomeMonthStatics/${param.data.name}/${param.data.year}`)
            .once('value'),
          this.$fire.database
            .ref(
              `incomeMonthStatics/${param.data.name}/${Number(param.data.year) + 1}`
            )
            .once('value')
        ]);

        this.option.title.text = param.data.name;
        this.option.series = res.map((snapshot, index) => {
          return {
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            data: snapshot.val() || [],
            name: param.data.year - 1 + index,
            showBackground: true,
            type: 'bar'
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
