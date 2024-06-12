<template>
  <div class="h-100">
    <b-modal
      v-model="modalShow"
      ok-only
      :ok-title="$t('close')"
      ok-variant="info"
    >
      <v-chart v-if="modalShow" class="w-100" :options="option" autoresize />
    </b-modal>
    <grid-layout
      :show="!loading"
      :layout="dashboardList"
      :col-num="1"
      :row-num="3"
      :row-height="250"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
      @layout-updated="onLayoutUpdated"
    >
      <dashboard-widget
        v-for="item in dashboardList"
        :key="item.name"
        :item="item"
        :data-source="dataSource"
        @click="click"
      />
    </grid-layout>
  </div>
</template>
<script lang="ts">
import DashboardWidget from '~/components/DashboardWidget.vue';
import Vue from 'vue';
import { colors } from '~/utils/constants';

export default Vue.extend({
  name: 'Income',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      dashboardList: [],
      modalShow: false,
      option: {
        grid: {
          bottom: '8%'
        },
        title: {
          text: ''
        },
        tooltip: {
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          trigger: 'axis',
          valueFormatter(value) {
            return `${value} k`;
          }
        },
        xAxis: {
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
          ],
          type: 'category'
        },
        series: [],
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter(value) {
              return `${value} k`;
            }
          }
        }
      }
    };
  },
  computed: {
    dataSource() {
      const dataSource = {};
      const income = this.$store.getters['dashboard/getIncome'];
      Object.keys(income).forEach(key => {
        const data = income[key];
        if (data) {
          if (key === '港口損益情形') {
            dataSource[key] = this.convertToBar(
              data[Object.keys(data).slice(-1)[0]],
              key
            );
          } else if (key === '公司損益情形總覽') {
            dataSource[key] = this.convertToPie(
              data[Object.keys(data).slice(-1)[0]]
            );
          } else {
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
  created() {
    this.onLoadDashboard(this.$route.path);
  },
  methods: {
    convertToPie(data = {}) {
      const pieData = [];
      Object.keys(data).forEach(key => {
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
    convertToBar(data, name) {
      const grid = {
        left: '5%',
        right: '5%'
      };
      const yAxis = {
        axisLabel: {
          formatter(value) {
            if (value >= 1000) {
              return `${value / 1000}k`;
            } else {
              return value;
            }
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
        trend: {},
        grid,
        info: '此圖表呈現每座港口損益數值，點擊告警圖示可以查看詳細每月同期數值比較圖表',
        legend: {
          bottom: 10,
          data: [],
          orient: 'horizontal'
        },
        series: [],
        xAxis,
        yAxis
      };
      Object.keys(data).forEach(type => {
        if (data[type]) {
          options.legend.data = Object.keys(data[type]);
          Object.keys(data[type]).forEach((category, index, array) => {
            if (!options.series[index]) {
              options.series[index] = {
                data: [],
                label: {
                  position: 'top',
                  show: true
                },
                name: category,
                type: array.length - 1 > index ? 'bar' : 'line'
              };
            }
            options.series[index].data.push({
              name: type,
              value: data[type][category]
            });
          });
        }
      });

      if (options.series.length > 0) {
        const result = options.series[options.series.length - 1].data.reduce(
          (acc, curr, index, array) => {
            if (index > 0 && curr.value < array[index - 1].value) {
              acc.push(index);
            }
            return acc;
          },
          []
        );
        options.series[options.series.length - 1].markPoint = {
          data: result.map((v, index) => {
            return {
              itemStyle: {
                color: colors[3]
              },
              name,
              symbol:
                'path://M10 10 L20 30 L0 30 Z M10 15 L10 25 M10 35 L10 40',
              symbolSize: [30, 40],
              value:
              options.series[options.series.length - 1].data[index].value,
              xAxis: v,
              yAxis:
              options.series[options.series.length - 1].data[index].value,
              year: options.xAxis[0].data[v]
            };
          })
        };

        options.trend = {
          color: colors[result.length],
          stroke: result.length > 0 ? colors[result.length] : 'white'
        };

        result.forEach(index => {
          options.series[options.series.length - 1].data[index] = {
            ...options.series[options.series.length - 1].data[index],
            itemStyle: {
              color: colors[2]
            },
            year: options.xAxis[0].data[index]
          };
        });
      }
      return options;
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
