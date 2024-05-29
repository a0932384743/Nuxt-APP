<template>
  <div class="px-2">
    <div
      class="d-flex justify-content-end"
      style="gap: 10px"
    >
      <font-awesome-icon
        role="button"
        icon="table-list"
        color="white"
        width="15px"
        height="15px"
        @click="chartType = 'table'"
      />
      <font-awesome-icon
        role="button"
        icon="pie-chart"
        color="white"
        width="15px"
        height="15px"
        @click="chartType = 'pie'"
      />
    </div>
    <b-row
      v-if="chartType === 'table'"
      class="w-100 m-0 flex-wrap"
    >
      <template v-for="data in datas">
        <b-col
          v-for="(d, index) in data.data"
          :key="JSON.stringify(data) + d"
          sm="4"
          style="min-width: 80px"
        >
          <div
            class="d-flex"
            :class="{
              'justify-content-start': index === 0,
              'justify-content-center': index === 1,
              'justify-content-end': index === 2
            }"
          >
            <small v-if="index === 0">{{ data.name }}</small>
            <small v-if="index === 1">{{ $t('period.compare') }}</small>
            <small v-if="index === 2">{{ $t('rate.compare') }}</small>
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
              <font-awesome-icon
                v-if="d > 0"
                icon="sort-asc"
              />
              <font-awesome-icon
                v-if="d < 0"
                icon="sort-desc"
              />

              {{ d }}
            </strong>
          </div>
        </b-col>
      </template>
    </b-row>
    <v-chart
      v-else
      ref="chart"
      class="w-100"
      :options="{
        ...option,
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: datas.map(d => {
              return { value: d.data[0], name: d.name };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }"
      autoresize
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardSummary',
  props: {
    datas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartType: 'table',
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        xAxis: [],
        yAxis: []
      }
    };
  }
});
</script>
<style></style>
