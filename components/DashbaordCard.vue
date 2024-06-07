<template>
  <div class="mb-4 d-flex flex-column text-secondary" style="gap: 0.5rem">
    <h1 class="text-center mb-0">
      {{ { ...obj, ...data }.value ?? '-' }}{{ { ...obj, ...data }.unit || '' }}
    </h1>
    <p
      class="text-center"
      :class="{
        'text-danger': { ...obj, ...data }.rate > 0,
        'text-success': { ...obj, ...data }.rate < 0
      }"
    >
      {{ { ...obj, ...data }.rate ?? '-' }}%
      <font-awesome-icon v-if="{ ...obj, ...data }.rate > 0" icon="sort-asc" />
      <font-awesome-icon v-if="{ ...obj, ...data }.rate < 0" icon="sort-desc" />
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'DashboardCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      obj: {
        rate: 0,
        value: 0,
        unit: 0
      }
    };
  }
});
</script>
<style></style>
