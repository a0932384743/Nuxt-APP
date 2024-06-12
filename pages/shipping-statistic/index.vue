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
  name: 'ShippingStatistic',
  components: { DashboardWidget },
  layout: 'DashboardLayout',
  data() {
    return {
      dashboardList: [],
      shipData: []
    };
  },
  computed: {
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
                value: ships[key]
              };
            })
          }
        ];
      } else {
        shipCount.series = [];
      }
      const shipMap = {
        geo: {
          itemStyle: {
            emphasis: {
              areaColor: 'gray'
            },
            normal: {
              areaColor: 'lightgray',
              borderColor: 'gray'
            }
          },
          label: {
            emphasis: {
              show: false
            }
          },
          map: 'world',
          roam: true,
          silent: true
        },
        grid: {
          left: '5%',
          right: '5%'
        },
        series: [
          {
            coordinateSystem: 'geo',
            data: this.flightRoutes,
            large: true,
            lineStyle: {
              normal: {
                color: '#313131',
                curveness: 0.2,
                opacity: 0.8,
                width: 1
              }
            },
            type: 'lines'
          }
        ]
      };
      const portMap = {
        geo: {
          center: [120.2885, 22.6163],
          itemStyle: {
            emphasis: {
              areaColor: 'gray'
            },
            normal: {
              areaColor: 'lightgray',
              borderColor: 'gray'
            }
          },
          label: {
            emphasis: {
              show: false
            }
          },
          map: 'kaoMap',
          roam: true,
          silent: true,
          zoom: 30
        },
        series: [
          {
            emphasis: {
              label: {
                show: true
              }
            },
            geoIndex: 0,
            map: 'kaoMap',
            roam: true,
            type: 'map'
          },
          {
            coordinateSystem: 'geo',
            data: this.shipData,
            label: {
              emphasis: {
                show: true
              },
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            name: '船隻分布',
            symbol:
              'path://M192 32c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V240l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-16.2 0-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zM160 218.7l107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z',
            symbolSize: 20,
            type: 'scatter'
          }
        ]
      };
      const pollutants = {
        legend: {
          data: ['CO2', 'NOx', 'SOx', 'PM2.5']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
          type: 'value'
        },
        series: [
          {
            name: 'CO2',
            type: 'line',
            smooth: 0.8,
            data: Array.from(
              { length: 12 },
              () => Math.floor(Math.random() * 801) + 400
            )
          },
          {
            name: 'NOx',
            type: 'line',
            smooth: 0.8,
            data: Array.from(
              { length: 12 },
              () => Math.floor(Math.random() * 801) + 400
            )
          },
          {
            name: 'SOx',
            type: 'line',
            smooth: 0.8,
            data: Array.from(
              { length: 12 },
              () => Math.floor(Math.random() * 801) + 400
            )
          },
          {
            name: 'PM2.5',
            type: 'line',
            smooth: 0.8,
            data: Array.from(
              { length: 12 },
              () => Math.floor(Math.random() * 801) + 400
            )
          }
        ]
      };

      const events = {
        xAxis: {
          type: 'category',
          data: [
            'Slips,Trips & Falls',
            'Machinery',
            'Cargo Handling Incident Type',
            'Fire',
            'Electrical'
          ],
          splitArea: {
            show: true
          }
        },
        yAxis: {
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
          ],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          color: ['#00609d', '#136a9c', '#27739b', '#3a7d9b', '#4d879a', '#619099', '#749a98', '#88a397', '#9bad96', '#aeb796', '#c2c095', '#d5ca94']
        },
        series: [
          {
            name: 'Punch Card',
            type: 'heatmap',
            data: [
              [0, 0, 89],
              [1, 0, 22],
              [2, 0, 77],
              [3, 0, 87],
              [4, 0, 52],
              [0, 1, 1],
              [1, 1, 94],
              [2, 1, 81],
              [3, 1, 73],
              [4, 1, 97],
              [0, 2, 37],
              [1, 2, 80],
              [2, 2, 40],
              [3, 2, 61],
              [4, 2, 37],
              [0, 3, 10],
              [1, 3, 49],
              [2, 3, 83],
              [3, 3, 44],
              [4, 3, 8],
              [0, 4, 86],
              [1, 4, 50],
              [2, 4, 91],
              [3, 4, 10],
              [4, 4, 39],
              [0, 5, 41],
              [1, 5, 23],
              [2, 5, 32],
              [3, 5, 33],
              [4, 5, 42],
              [0, 6, 75],
              [1, 6, 85],
              [2, 6, 26],
              [3, 6, 16],
              [4, 6, 74],
              [0, 7, 97],
              [1, 7, 61],
              [2, 7, 48],
              [3, 7, 59],
              [4, 7, 76],
              [0, 8, 3],
              [1, 8, 32],
              [2, 8, 83],
              [3, 8, 42],
              [4, 8, 70],
              [0, 9, 75],
              [1, 9, 52],
              [2, 9, 55],
              [3, 9, 22],
              [4, 9, 46],
              [0, 10, 54],
              [1, 10, 18],
              [2, 10, 89],
              [3, 10, 14],
              [4, 10, 85],
              [0, 11, 48],
              [1, 11, 90],
              [2, 11, 49],
              [3, 11, 72],
              [4, 11, 57]
            ],
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      return {
        portMap,
        shipCount,
        shipMap,
        pollutants,
        events
      };
    },
    flightRoutes() {
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
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    }
  },
  created() {
    this.onLoadDashboard(this.$route.path);
    this.onLoadShipTrace();
  },
  methods: {
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
    },
    async onLoadShipTrace() {
      const res = this.$fire.database.ref('shipsTrace');
      res.once('value', snapshot => {
        const data = snapshot.val();
        this.shipData = data
          .filter(d => d)
          .map(d => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return {
              itemStyle: {
                color
              },
              name: d?.properties?.ShipName,
              value: [
                Number(d?.properties?.Longitude || 0) - 0.028,
                Number(d?.properties?.Latitude || 0)
              ]
            };
          });
      });
    }
  }
});
</script>
