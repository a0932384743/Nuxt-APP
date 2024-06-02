<template>
  <grid-layout
    :show="!loading"
    :layout="dashboardList"
    :col-num="5"
    :row-num="12"
    :row-height="150"
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
import DashboardWidget from '~/components/DashboardWidget.vue';
import Vue from 'vue';
export default Vue.extend({
  name: 'ShippingStatistic',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      dashboardList: []
    };
  },
  computed: {
    flightRoutes() {
      // 生成更多的航运轨迹点
      const routes = [];
      for (let i = 0; i < 20; i++) {
        routes.push({
          coords: [
            [Math.random() * 180 - 90, Math.random() * 90 - 45], // 随机生成经纬度坐标
            [Math.random() * 240 - 90, Math.random() * 120 - 45]
          ]
        });
      }
      return routes;
    },
    shipData() {
      return [
        { name: '船隻A', value: [120.2882, 22.6163] }, // 上海
        { name: '船隻B', value: [120.2881, 22.6162] }, // 香港
        { name: '船隻C', value: [120.2884, 22.6160] }, // 東京
        { name: '船隻D', value: [120.2885, 22.6161] } // 高
      ];
    },
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    },
    dataSource() {
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
      const shipMap = {
        grid: {
          left: '5%',
          right: '5%'
        },
        geo: {
          map: 'world',
          roam: true,
          label: {
            emphasis: {
              show: false
            }
          },
          silent: true,
          itemStyle: {
            normal: {
              areaColor: 'white',
              borderColor: 'gray'
            },
            emphasis: {
              areaColor: 'gray'
            }
          }
        },
        series: [
          {
            name: 'World Population',
            type: 'map',
            mapType: 'world',
            roam: true,
            itemStyle: {
              emphasis: { label: { show: true } }
            },
            data: [
              { name: 'China', value: 1380000000 },
              { name: 'India', value: 1310000000 },
              { name: 'United States', value: 324000000 },
              { name: 'Indonesia', value: 263000000 },
              { name: 'Brazil', value: 207000000 }
            ]
          },
          {
            type: 'lines',
            coordinateSystem: 'geo',
            data: this.flightRoutes, // 航运轨迹数据
            large: true,
            lineStyle: {
              normal: {
                color: '#76ffcf', // 调整线条颜色为橙色
                width: 1, // 调整线条宽度为3像素
                opacity: 0.8, // 调整线条透明度
                curveness: 0.2 // 调整曲线平滑度
              }
            }
          }
        ]
      };

      const portMap = {
        geo: {
          center: [120.2885, 22.6163],
          zoom: 20,
          map: 'kaoMap',
          roam: true,
          label: {
            emphasis: {
              show: false
            }
          },
          silent: true,
          itemStyle: {
            normal: {
              areaColor: 'white',
              borderColor: 'gray'
            },
            emphasis: {
              areaColor: 'gray'
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'kaoMap',
            geoIndex: 0,
            roam: true,
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: '船隻分布',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.shipData,
            symbolSize: 20,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          }
        ]
      };

      return {
        shipCount,
        shipMap,
        portMap
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
