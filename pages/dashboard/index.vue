<template>
  <b-container
    fluid
    class="overflow-auto h-100"
  >
    <b-overlay
      :show="loading"
      rounded="lg"
      opacity="0.6"
      class="h-100"
    >
      <draggable
        class="w-100 m-0 row"
        @change="onDrag"
      >
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
                    <font-awesome-icon
                      icon="ellipsis-v"
                      class="text-white"
                    />
                  </template>
                  <b-dropdown-item href="#">
                    Action
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    Another action
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    Something else here...
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <p>
                <small
                  v-if="item.period"
                  class="d-block"
                >({{ $t('period') }}: {{ item.period }})</small>
                <small
                  v-if="item.unit"
                  class="d-block"
                >({{ $t('unit') }}: {{ item.unit }})</small>
              </p>
            </template>
            <dashboard-summary
              v-if="item.type === 'summary'"
              :datas="item?.series || []"
            />
            <v-chart
              v-else
              class="w-100"
              :options="{ ...option, ...item }"
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
        grid: {
          x: 40,
          x2: 40
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: 'white'
            }
          }
        ],
        textStyle: {
          color: 'white'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        }
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters['dashboard/getLoading'];
    },
    dashboardList() {
      return this.$store.getters['dashboard/getList'];
    }
  },
  methods: {
    onDrag({ moved }) {
      const list = [...this.dashboardList];
      const temp = list[moved.oldIndex];
      list[moved.oldIndex] = list[moved.newIndex];
      list[moved.newIndex] = temp;
      this.$store.dispatch('dashboard/setList', list);
    }
  }
});
</script>
