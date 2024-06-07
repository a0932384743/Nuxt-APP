<template>
  <div class="text-center">
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <h1>
            404
          </h1>
          <p>
            Oops! The page you are looking for does not exist.
          </p>
          <b-button
            variant="info"
            @click="goHome"
          >
            Go Home
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'error',
  layout: 'DashboardLayout',
  methods: {
    goHome() {
      const menu = this.$store.getters['common/getMenu'];
      this.$router.push(menu[0].url);
    }
  }
});
</script>

<style scoped>
.display-1 {
  font-size: 10rem;
}
</style>
