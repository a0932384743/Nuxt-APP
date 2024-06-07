<template>
  <div class="px-2">
    <font-awesome-icon
      icon="circle"
      :style="trend || {}"
      stroke-width="20"
    />
    預警
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'DashboardAlert',
  props: {
    trend: {
      type: Object
    }
  },
});
</script>
<style></style>
