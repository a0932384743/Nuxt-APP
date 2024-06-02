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
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 100,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
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
              // 你可以添加更多的国家数据
            ]
          },
          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            effect: {
              show: true,
              trailWidth: 1,
              trailOpacity: 0.5,
              trailLength: 0.2,
              constantSpeed: 5
            },
            blendMode: 'lighter',
            lineStyle: {
              width: 0.2,
              opacity: 0.05
            },
            data: [
              [
                [-97.669889, 30.194528],
                [-0.461389, 51.4775]
              ],
              [
                [-97.669889, 30.194528],
                [-90.258028, 29.993389]
              ],
              [
                [-97.669889, 30.194528],
                [-87.904842, 41.978603]
              ],
              [
                [-97.669889, 30.194528],
                [-75.241139, 39.871944]
              ],
              [
                [-97.669889, 30.194528],
                [-112.011583, 33.434278]
              ],
              [
                [-82.541806, 35.436194],
                [-80.943139, 35.214]
              ],
              [
                [-75.723403, 41.338478],
                [-80.943139, 35.214]
              ],
              [
                [-75.723403, 41.338478],
                [-75.241139, 39.871944]
              ],
              [
                [-85.552058, 42.234875],
                [-87.904842, 41.978603]
              ],
              [
                [50.63361, 26.270834],
                [51.565056, 25.261125]
              ],
              [
                [50.63361, 26.270834],
                [-0.461389, 51.4775]
              ],
              [
                [2.078464, 41.297078],
                [-73.778925, 40.639751]
              ],
              [
                [2.078464, 41.297078],
                [-0.461389, 51.4775]
              ],
              [
                [2.078464, 41.297078],
                [-80.290556, 25.79325]
              ],
              [
                [2.078464, 41.297078],
                [-75.241139, 39.871944]
              ],
              [
                [-64.678703, 32.364042],
                [-73.778925, 40.639751]
              ],
              [
                [-64.678703, 32.364042],
                [-80.290556, 25.79325]
              ],
              [
                [-64.678703, 32.364042],
                [-75.241139, 39.871944]
              ],
              [
                [-72.683222, 41.938889],
                [-80.943139, 35.214]
              ],
              [
                [-72.683222, 41.938889],
                [-77.037722, 38.852083]
              ],
              [
                [-72.683222, 41.938889],
                [-97.037997, 32.896828]
              ],
              [
                [-72.683222, 41.938889],
                [-118.408075, 33.942536]
              ],
              [
                [-72.683222, 41.938889],
                [-80.290556, 25.79325]
              ],
              [
                [-72.683222, 41.938889],
                [-87.904842, 41.978603]
              ],
              [
                [-72.683222, 41.938889],
                [-75.241139, 39.871944]
              ],
              [
                [-72.683222, 41.938889],
                [-80.232872, 40.491467]
              ],
              [
                [-119.05677, 35.433598],
                [-112.011583, 33.434278]
              ],
              [
                [-59.492456, 13.074603],
                [-80.290556, 25.79325]
              ],
              [
                [-75.979839, 42.208689],
                [-75.241139, 39.871944]
              ],
              [
                [5.218142, 60.293386],
                [-0.461389, 51.4775]
              ],
              [
                [-68.828139, 44.807444],
                [-77.037722, 38.852083]
              ],
              [
                [-68.828139, 44.807444],
                [-75.241139, 39.871944]
              ],
              [
                [-5.8725, 54.618056],
                [-0.461389, 51.4775]
              ],
              [
                [-86.75355, 33.562942],
                [-80.943139, 35.214]
              ],
              [
                [-86.75355, 33.562942],
                [-77.037722, 38.852083]
              ],
              [
                [-86.75355, 33.562942],
                [-97.037997, 32.896828]
              ],
              [
                [-86.75355, 33.562942],
                [-80.290556, 25.79325]
              ],
              [
                [-86.75355, 33.562942],
                [-75.241139, 39.871944]
              ],
              [
                [-16.652206, 13.337961],
                [-17.490225, 14.739708]
              ],
              [
                [-101.480847, 20.993464],
                [-97.037997, 32.896828]
              ]
            ]
          }
        ]
      };

      return {
        shipCount,
        shipMap
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
