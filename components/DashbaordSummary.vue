<template>
  <b-row class="w-100 m-0 flex-wrap">
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
  }
});
</script>
<style></style>
