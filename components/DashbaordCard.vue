<template>
  <div
    class="mb-4 d-flex flex-column text-secondary"
    style="gap: 0.5rem"
  >
    <h1 class="text-center mb-0">
      {{ data.value ?? '-' }}{{ data.unit||'' }}
    </h1>
    <p
      class="text-center"
      :class="{
        'text-danger': data.rate > 0,
        'text-success': data.rate < 0
      }"
    >
      {{ data.rate ?? '-' }}%
      <font-awesome-icon
        v-if="data.rate > 0"
        icon="sort-asc"
      />
      <font-awesome-icon
        v-if="data.rate < 0"
        icon="sort-desc"
      />
    </p>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
export default Vue.extend({
  name: 'DashboardCard',
  props: {
    dataSource: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: {
        value: 0,
        rate: 0,
        unit: ''
      }
    };
  },
  mounted() {
    const year = moment().year();
    this.$fire.database
      .ref(`economic/${year}/${this.dataSource}`)
      .once('value')
      .then(ref => {
        this.data = ref.val();
      });
  }
});
</script>
<style></style>
