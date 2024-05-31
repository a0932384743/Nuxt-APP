<template>
  <b-tabs
    content-class="mt-3"
    class="custom-tab"
    nav-wrapper-class="mt-0"
  >
    <b-tab
      title="新聞"
      active
    >
      <div class="d-flex h-100 w-100 justify-content-between">
        <div
          class="d-flex flex-column w-100"
          style="flex: 0 0 40%"
        >
          <h4 class="text-info">
            <strong>{{ newsList[index]?.title || '-' }}</strong>
          </h4>
          <p><small>{{ newsList[index]?.time || '-' }}</small></p>
          <div
            class="overflow-auto flex-grow-1 text-white"
            style="font-size: 1rem;"
          >
            {{ newsList[index]?.content || '-' }}
          </div>
        </div>
        <div
          class="overflow-auto"
          style="flex: 1 1 50%"
        >
          <b-list-group class="bg-transparent">
            <b-list-group-item
              v-for="(news , i) in newsList"
              :key="JSON.stringify(news)"
              class="d-flex justify-content-between bg-transparent border-0 p-1"
            >
              <a @click="index=i"><strong class="text-info"><small>{{ news.title }}</small></strong></a>
              <small class="text-nowrap">{{ news.time }}</small>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </b-tab>
    <b-tab title="專欄">
      帶增加
    </b-tab>
  </b-tabs>
</template>
<script lang="ts">
import moment from 'moment';
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardNews',
  data() {
    return {
      newsList: [],
      index: 0
    };
  },
  mounted() {
    const date = moment().format('YYYY-MM');
    this.$fire.database.ref(`news/${date}`).once('value')
      .then(ref => {
        if (ref && ref.val()) {
          this.newsList = ref.val().sort((a, b) => {
            return a.time > b.time ? -1 : 1;
          });
          this.index = (this.newsList.length - 1) < 0 ? 0 : (this.newsList.length - 1);
        }
      });
  }
});
</script>
<style></style>
