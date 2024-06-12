<template>
  <div class="px-2 py-2">
    <div class="d-flex justify-content-end mb-2" style="gap: 10px">
      <font-awesome-icon
        role="button"
        icon="table-list"
        width="25px"
        height="25px"
        @click="chartType = 'table'"
      />
      <font-awesome-icon
        role="button"
        icon="pie-chart"
        width="25px"
        height="25px"
        @click="chartType = 'pie'"
      />
    </div>
    <b-row v-if="chartType === 'table'" class="w-100 m-0 flex-wrap fade-in">
      <template
        v-for="data in { series: [{ data: [] }], ...options }.series[0]?.data ||
        []"
      >
        <b-col
          v-for="(d, index) in data.value"
          :key="JSON.stringify(data) + d + index"
          sm="4"
          style="min-width: 80px"
        >
          <div
            class="d-flex"
            style="font-size: 1.1rem"
            :class="{
              'justify-content-start': index === 0,
              'justify-content-center': index === 1,
              'justify-content-end': index === 2
            }"
          >
            <span v-if="index === 0">{{ data.name }}</span>
            <span v-if="index === 1">{{ $t('period.compare') }}</span>
            <span v-if="index === 2">{{ $t('rate.compare') }}</span>
          </div>
          <div
            class="d-flex flex-nowrap"
            :class="{
              'justify-content-start': index === 0,
              'justify-content-center': index === 1,
              'justify-content-end': index === 2
            }"
          >
            <strong v-if="index === 0">{{ Number(d).toLocaleString() }}</strong>
            <strong v-if="index === 1">{{ d }}</strong>
            <strong
              v-if="index === 2"
              :class="{
                'text-danger': d > 0,
                'text-success': d < 0
              }"
            >
              <font-awesome-icon v-if="d > 0" icon="sort-asc" />
              <font-awesome-icon v-if="d < 0" icon="sort-desc" />

              {{ d }} <small class="ml-2">%</small>
            </strong>
          </div>
        </b-col>
      </template>
    </b-row>
    <v-chart v-else ref="chart" class="w-100" :options="options" autoresize />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardSummary',
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      chartType: 'table'
    };
  }
});
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s forwards;
}
</style>
