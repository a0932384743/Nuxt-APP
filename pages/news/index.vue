<template>
  <b-row class="w-100 h-100">
    <b-col
      sm="12"
      style="max-width: 350px; flex: 0 0 400px"
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
        </template>
        <b-form-input
          v-model="filter.keyword"
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
      style="max-width: calc(100% - 350px); flex: 1 1 calc(100% - 400px)"
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
            sm="12"
            class="mb-2"
          >
            <div
              class="d-inline-flex flex-wrap mb-1 align-items-center"
              style="gap: 0.8rem"
            >
              <b-button
                v-for="c in condition.date"
                :key="JSON.stringify(c)"
                pill
                style="min-width: 80px"
                :variant="filter.date === c.value? 'info' : 'outline-secondary'"
                size="sm"
                @click="search({ date: c.value })"
              >
                {{ c.name }}
              </b-button>
              <font-awesome-icon
                id="date-button"
                icon="question-circle"
                class="mr-2"
              />
              <b-tooltip
                target="date-button"
                title="可依照需求篩選本日或本周新聞，其中本周新聞指的是七日內的新聞"
                triggers="hover"
              >
                可依照需求篩選本日或本周新聞，其中本周新聞指的是七日內的新聞
              </b-tooltip>
            </div>
            <div
              class="d-inline-flex flex-wrap mb-1 align-items-center"
              style="gap: 0.8rem"
            >
              <b-button
                v-for="c in condition.range"
                :key="JSON.stringify(c)"
                pill
                style="min-width: 80px"
                :variant="filter.range === c.value? 'info' : 'outline-secondary'"
                size="sm"
                @click="search({ range: c.value })"
              >
                {{ c.name }}
              </b-button>
              <font-awesome-icon
                id="range-button"
                icon="question-circle"
                class="mr-2"
              />
              <b-tooltip
                target="range-button"
                title="可依照需求篩選國內或國外的新聞，區分方式為新聞資料來源網站為國內或國外"
                triggers="hover"
              >
                可依照需求篩選國內或國外的新聞，區分方式為新聞資料來源網站為國內或國外
              </b-tooltip>
            </div>
            <div
              class="d-inline-flex flex-wrap mb-1 align-items-center"
              style="gap: 0.8rem"
            >
              <b-button
                v-for="c in condition.type"
                :key="JSON.stringify(c)"
                pill
                style="min-width: 80px"
                :variant="filter.type === c.value? 'info' : 'outline-secondary'"
                size="sm"
                @click="search({ type: c.value })"
              >
                {{ c.name }}
              </b-button>
              <font-awesome-icon
                id="type-button"
                icon="question-circle"
                class="mr-2"
              />
              <b-tooltip
                target="type-button"
                title="可依照需求篩選各類型的新聞，會依照新聞內文關鍵字進行過濾"
                triggers="hover"
              >
                可依照需求篩選各類型的新聞，會依照新聞內文關鍵字進行過濾
              </b-tooltip>
            </div>
          </b-col>
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
                  :src="news.url"
                  :alt="news.title"
                  style="width: 100px"
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
      newsList: [],
      filter: {
        keyword: '',
        date: 'day',
        range: '',
        type: ''
      },
      condition: {
        date: [
          { name: '本日', value: 'day' },
          { name: '本周', value: 'week' }
        ],
        range: [
          { name: '國內', value: '國內' },
          { name: '國外', value: '國外' },
          { name: '不限', value: '' }
        ],
        type: [
          { name: '全部', value: '' },
          { name: '港口', value: '港口' },
          { name: '航商', value: '航商' },
          { name: '船員', value: '船員' },
          { name: '船舶', value: '船舶' },
          { name: '環境', value: '環境' }
        ]
      },
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
    this.search(this.filter);
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
      this.filter.keyword = params.data.name;
    },
    async search(filter) {
      this.filter = { ...this.filter, ...filter };
      this.loading = true;
      const res = await this.$fire.database.ref('news/2024-05').once('value');
      this.newsList = res
        .val()
        .filter(r => JSON.stringify(r).indexOf(this.filter.keyword) > -1);
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
