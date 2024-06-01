<template>
  <div class="px-2" style="font-size: 1rem">
    <b-row class="w-100 m-0 flex-wrap">
      <template v-for="key in Object.keys(data)">
        <b-col
          v-for="(d, index) in data[key]"
          :key="JSON.stringify(data[key]) + d + key"
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
            <small v-if="index === 0">{{ key }}</small>
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
              <font-awesome-icon v-if="d > 0" icon="sort-asc" />
              <font-awesome-icon v-if="d < 0" icon="sort-desc" />

              {{ d }} <small class="ml-2">%</small>
            </strong>
          </div>
        </b-col>
      </template>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardChartSummary',
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.$fire.database
      .ref('incomeLoss/公司損益情形總覽')
      .once('value')
      .then(ref => {
        if (ref && ref.val()) {
          this.data = ref.val();
        }
      });
  }
});
</script>
<style></style>
