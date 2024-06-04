<template>
  <b-row class="w-100 h-100">
    <b-col
      sm="12"
      style="max-width: 350px; flex: 0 0 350px"
    >
      <b-card
        text-variant="white"
        header-class="py-1 px-2"
        body-class="px-2"
        class="bg-transparent h-100"
        border-variant="secondary"
      >
        <template #header>
          <div class="d-flex pr-5 position-relative">
            <div><font-awesome-icon icon="key" /> {{ $t('keyword') }}</div>
          </div>
          <hr>
        </template>
        <b-form-input
          v-model="keyword"
          placeholder="請輸入關鍵字"
        />
        <v-chart
          style="min-height: 350px"
          class="w-100 mt-2"
          :options="options"
          autoresize
          @click="click"
        />
        <div>
          <b-button
            block
            variant="info"
            :disabled="loading"
            @click="search"
          >
            {{ $t('search') }}
            <b-spinner
              v-if="loading"
              small
            />
          </b-button>
        </div>
      </b-card>
    </b-col>
    <b-col
      sm="12"
      style="max-width: calc(100% - 350px); flex: 1 1 calc(100% - 350px);"
    >
      <b-card
        text-variant="white"
        header-class="py-1 px-2"
        body-class="px-2"
        class="bg-transparent h-100"
        border-variant="secondary"
      >
        <template #header>
          <div class="d-flex justify-content-end">
            <small> {{ $t('last.update.time') }}:{{ updateTime }}</small>
          </div>
        </template>
        <b-row>
          <b-col
            v-for="news in newsList"
            :key="JSON.stringify(news)"
            sm="12"
            class="mb-2"
            :style="{
              maxWidth: colWidth,
              flex: `1 1 ${colWidth}`
            }"
            style="transition: all 400ms ease"
          >
            <b-card
              text-variant="white"
              header-class="py-1 px-2"
              body-class="p-1 h-100"
              footer-class="bg-transparent text-right"
              class="bg-transparent h-100"
              border-variant="secondary"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="news.url "
                  :alt="news.title"
                  style="width: 100px;"
                >
                <div class="px-1">
                  <b-card-text class="text-overflow">
                    {{ news.title }}
                  </b-card-text>
                </div>
              </div>
              <template #footer>
                <small>{{ news.time }}</small>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
export default Vue.extend({
  name: 'News',
  layout: 'DashboardLayout',
  data() {
    return {
      colWidth: '33%',
      loading: false,
      updateTime: moment().format('YYYY/MM/DD HH:mm'),
      keyword: '',
      newsList: [],
      options: {
        grid: {
          left: '5%',
          right: '5%'
        },
        series: [
          {
            data: [],
            drawOutOfBound: false,
            emphasis: {
              textStyle: {
                color: '#528'
              }
            },
            gridSize: 0,
            keepAspect: true,
            layoutAnimation: true,
            rotationRange: [0, 0],
            shape: 'pentagon',
            sizeRange: [4, 150],
            textStyle: {
              color() {
                return `rgb(${[
                  Math.round(Math.random() * 200) + 50,
                  Math.round(Math.random() * 200),
                  Math.round(Math.random() * 200) + 50
                ].join(',')})`;
              },
              fontWeight: 'bold'
            },
            type: 'wordCloud'
          }
        ]
      }
    };
  },
  created() {
    this.loadKeyword();
    this.search();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth > 1020) {
        this.colWidth = '33%';
      } else if (window.innerWidth > 768) {
        this.colWidth = '50%';
      } else {
        this.colWidth = '100%';
      }
    },
    loadKeyword() {
      this.$fire.database
        .ref('keywords')
        .once('value')
        .then(res => {
          this.options.series[0].data = res.val();
        });
    },
    click(params) {
      this.keyword = params.data.name;
    },
    async search() {
      this.loading = true;
      const res = await this.$fire.database.ref('news/2024-05').once('value');

      this.newsList = res
        .val()
        .filter(r => JSON.stringify(r).indexOf(this.keyword) > -1);
      this.updateTime = moment().format('YYYY/MM/DD HH:mm');
      this.loading = false;
    }
  }
});
</script>
<style scoped>
.text-overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>
