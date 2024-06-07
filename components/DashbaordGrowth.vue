<template>
  <div class="px-3">
    <b-table-simple
      hover
      small
      caption-top
      responsive
    >
      <b-thead>
        <b-tr>
          <b-th class="border-top-0 text-left py-3">
            <small>{{ $t('product.name') }}</small>
          </b-th>
          <b-th class="border-top-0 text-center py-3">
            <small>{{ $t('period.compare.value') }}</small>
          </b-th>
          <b-th class="border-top-0 text-right py-3">
            <small>{{ $t('period.compare.rate') }}</small>
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr
          v-for="(d, index) in ({ series: [], ...options }.series[0]?.data || [])"
          :key="JSON.stringify(d) + index"
        >
          <b-td class="text-left align-middle">
            <small class="mr-2">{{ index + 1 }}</small> {{ d.name }}
          </b-td>
          <b-td class="text-center align-middle">
            {{ d.value[1] }}<small class="ml-2">百萬計費頓</small>
          </b-td>
          <b-td class="text-right align-middle">
            <strong
              :class="{
                'text-danger': d.value[2] > 0,
                'text-success': d.value[2] < 0
              }"
            >
              <font-awesome-icon
                v-if="d.value[2] > 0"
                icon="sort-asc"
              />
              <font-awesome-icon
                v-if="d.value[2] < 0"
                icon="sort-desc"
              />

              {{ d.value[2] }}
              <small class="ml-2">%</small>
            </strong>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardGrowth',
  props: {
    options: {
      type: Object,
    }
  }
});
</script>
<style></style>
