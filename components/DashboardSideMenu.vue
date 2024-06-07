<template>
  <aside
    :style="{
      marginLeft: isShowMenu ? '0px' : '-350px'
    }"
    class="side-menu"
    aria-label="Side Menu"
  >
    <div class="text-white mb-2">
      {{ $t('condition.filter') }}
    </div>
    <b-row class="mx-0 mb-3 w-100">
      <b-form-group class="col-sm-12 col-md-6">
        <b-form-text>
          {{ $t('start.date') }}
        </b-form-text>
        <b-form-datepicker
          v-model="form.startDate"
          class="custom-datepicker"
          size="sm"
          :max="form.endDate"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }"
        />
      </b-form-group>
      <b-form-group class="col-sm-12 col-md-6">
        <b-form-text>
          {{ $t('end.date') }}
        </b-form-text>
        <b-form-datepicker
          v-model="form.endDate"
          class="custom-datepicker"
          :min="form.startDate"
          :max="maxDate"
          size="sm"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }"
        />
      </b-form-group>
    </b-row>
    <div class="text-white mb-2 d-flex">
      <div class="flex-grow-1">
        {{ $t('companies') }}
      </div>
      <div class="flex-grow-1">
        <b-form-checkbox
          :checked="
            companies?.length > 0 &&
              form.selectedCompanies
                .map(c => c.name)
                .filter(c => c)
                .sort()
                .join(',') ===
              companies
                .map(c => c.name)
                .filter(c => c)
                .sort()
                .join(',')
          "
          @change="toggleAllCompanies"
        >
          {{ $t('select.all') }}
        </b-form-checkbox>
      </div>
    </div>
    <b-row class="mx-0 mb-3 w-100">
      <b-form-group
        v-for="company in companies"
        :key="company.name"
        class="col-sm-12 col-md-6"
      >
        <b-form-checkbox
          v-model="form.selectedCompanies"
          :value="company"
          :aria-describedby="company.name"
        >
          {{ company.name }}
        </b-form-checkbox>
      </b-form-group>
    </b-row>
    <div class="text-white mb-2 d-flex">
      <div class="flex-grow-1">
        {{ $t('harbors') }}
      </div>
      <div class="flex-grow-1">
        <b-form-checkbox
          :checked="
            harbors?.length > 0 &&
              form.selectedHarbor
                .map(c => c.name)
                .filter(c => c)
                .sort()
                .join(',') ===
              harbors
                .map(c => c.name)
                .filter(c => c)
                .sort()
                .join(',')
          "
          @change="toggleAllHarbors"
        >
          全選
        </b-form-checkbox>
      </div>
    </div>
    <b-row class="mx-0 mb-3 w-100">
      <b-form-group
        v-for="harbor in harbors"
        :key="harbor.name"
        class="col-sm-12 col-md-6"
      >
        <b-form-checkbox
          v-model="form.selectedHarbor"
          :value="harbor"
          :aria-describedby="harbor.name"
        >
          {{ harbor.name }}
        </b-form-checkbox>
      </b-form-group>
    </b-row>
    <hr>
    <div
      v-if="isShowSubMenu"
      class="text-white mb-2"
    >
      單頁篩選器
    </div>
    <div
      v-if="isShowSubMenu"
      class="text-white mb-2 d-flex"
    >
      <div class="flex-grow-1">
        收入別
      </div>
      <div class="flex-grow-1">
        <b-form-checkbox
          :checked="
            types?.length > 0 &&
              form.selectedType
                .map(c => c.name)
                .filter(c => c)
                .sort()
                .join(',') ===
              types
                .map(c => c.name)
                .filter(c => c)
                .sort()
                .join(',')
          "
          @change="toggleAllTypes"
        >
          全選
        </b-form-checkbox>
      </div>
    </div>
    <b-row
      v-if="isShowSubMenu"
      class="mx-0 mb-3 w-100"
    >
      <b-form-group
        v-for="type in types"
        :key="type.name"
        class="col-sm-12 col-md-6"
      >
        <b-form-checkbox
          v-model="form.selectedType"
          :value="type"
          :aria-describedby="type.name"
        >
          {{ type.name }}
        </b-form-checkbox>
      </b-form-group>
    </b-row>
    <div
      class="d-flex"
      style="gap: 0.5rem"
    >
      <b-button
        variant="info"
        pill
        class="flex-grow-1"
        @click="onApply"
      >
        {{ $t('apply') }}
      </b-button>
      <b-button
        variant="outline-light"
        pill
        class="flex-grow-1"
        @click="onReset"
      >
        {{ $t('reset') }}
      </b-button>
    </div>
  </aside>
</template>
<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

export default Vue.extend({
  name: 'DashboardSideMenu',
  props: {
    isShowMenu: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isShowSubMenu: false,
      form: {
        startDate: moment().subtract(5, 'years').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        selectedCompanies: [],
        selectedType: [],
        selectedHarbor: [{ name: '臺北港' }]
      },
      companies: [],
      harbors: [],
      types: [
        { name: '營業外收入' },
        { name: '營業外費用' },
        { name: '營業成本及費用' },
        { name: '營業收入' },
        { name: '稅前淨利' }
      ]
    };
  },
  computed: {
    maxDate() {
      return moment().endOf('day').toDate();
    }
  },
  watch: {
    $route(to) {
      this.isShowSubMenu = to.path.indexOf('overview') > -1;
    }
  },
  created() {
    this.loadCompanies();
    this.loadHarbors();
    this.onApply();
  },
  mounted() {
    const path = this.$route.path;
    this.isShowSubMenu = path.indexOf('overview') > -1;
  },
  methods: {
    async onReset() {
      this.form = {
        startDate: moment().subtract(5, 'years').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        selectedCompanies: [],
        selectedType: [],
        selectedHarbor: [{ name: '臺北港' }]
      };
      this.$store.dispatch('dashboard/setLoading', true);
      await Promise.all([
        this.loadLoaders(
          moment(this.form.startDate).year(),
          moment(this.form.endDate).year(),
          this.form.selectedHarbor
        ),
        this.loadIncome(
          moment(this.form.startDate).year(),
          moment(this.form.endDate).year(),
          this.form.selectedHarbor,
          this.form.selectedType,
        ),
        this.loadProductGrowth(moment(this.form.startDate).year()),
        this.loadShipCount(moment(this.form.startDate).year())
      ]);
      this.$store.dispatch('dashboard/setLoading', false);
    },
    async onApply() {
      this.$store.dispatch('dashboard/setLoading', true);
      await Promise.all([
        this.loadLoaders(
          moment(this.form.startDate).year(),
          moment(this.form.endDate).year(),
          this.form.selectedHarbor
        ),
        this.loadIncome(
          moment(this.form.startDate).year(),
          moment(this.form.endDate).year(),
          this.form.selectedHarbor,
          this.form.selectedType,
        ),
        this.loadProductGrowth(moment(this.form.startDate).year()),
        this.loadShipCount(moment(this.form.startDate).year())
      ]);
      this.$store.dispatch('dashboard/setLoading', false);
    },
    toggleAllCompanies() {
      if (
        this.form.selectedCompanies
          .map(c => c.name)
          .filter(c => c)
          .sort()
          .join(',') ===
        this.companies
          .map(c => c.name)
          .filter(c => c)
          .sort()
          .join(',')
      ) {
        this.form.selectedCompanies = [];
      } else {
        this.form.selectedCompanies = [...this.companies];
      }
    },
    toggleAllTypes() {
      if (
        this.form.selectedType
          .map(c => c.name)
          .filter(c => c)
          .sort()
          .join(',') ===
        this.types
          .map(c => c.name)
          .filter(c => c)
          .sort()
          .join(',')
      ) {
        this.form.selectedType = [];
      } else {
        this.form.selectedType = [...this.types];
      }
    },
    toggleAllHarbors() {
      if (
        this.form.selectedHarbor
          .map(c => c.name)
          .filter(c => c)
          .sort()
          .join(',') ===
        this.harbors
          .map(c => c.name)
          .filter(c => c)
          .sort()
          .join(',')
      ) {
        this.form.selectedHarbor = [];
      } else {
        this.form.selectedHarbor = [...this.harbors];
      }
    },
    async loadHarbors() {
      try {
        const res = await this.$fire.firestore.collection('harbor').get();
        this.harbors = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadHarbors', e);
      }
    },
    async loadCompanies() {
      try {
        const res = await this.$fire.firestore.collection('company').get();
        this.companies = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadCompanies', e);
      }
    },
    async loadProductGrowth(year: number) {
      const ref = await this.$fire.database
        .ref(`productGrowth/${year}`)
        .once('value');
      this.$store.dispatch('dashboard/setProductGrowth', ref.val());
      return ref.val();
    },
    async loadShipCount(y: number) {
      const ref = await this.$fire.database.ref(`shipCount/${y}`).once('value');
      this.$store.dispatch('dashboard/setShipCount', ref.val());
      return ref.val();
    },
    async loadLoaders(startDate: number, endDate: number, habors = []) {
      const keys = await this.$fire.database.ref('loaders/keys').once('value');
      const loaders = {};
      const years = Array.from(
        {
          length: endDate - startDate + 1
        },
        (_, i) => startDate + i
      );
      await Promise.all(
        keys.val().map(async key => {
          if (!loaders[key.name]) {
            loaders[key.name] = {};
          }
          if (key.column.indexOf('habor') > -1) {
            return await Promise.all(
              years.map(async year => {
                return await Promise.all(
                  habors.map(async habor => {
                    const ref = await this.$fire.database
                      .ref(`loaders/${key.name}/${year}/${habor.name}`)
                      .once('value');
                    if (!loaders[key.name][year]) {
                      loaders[key.name][year] = {};
                    }
                    loaders[key.name][year][habor.name] = ref.val();
                    return ref;
                  })
                );
              })
            );
          } else {
            return await Promise.all(
              years.map(async year => {
                const ref = await this.$fire.database
                  .ref(`loaders/${key.name}/${year}`)
                  .once('value');
                loaders[key.name][year] = ref.val();
                return ref;
              })
            );
          }
        })
      );
      this.$store.dispatch('dashboard/setLoaders', loaders);
      return loaders;
    },
    async loadIncome(startDate: number, endDate: number, habors = [], types = []) {
      const keys = await this.$fire.database.ref('income/keys').once('value');
      const loaders = {};
      const years = Array.from(
        {
          length: endDate - startDate + 1
        },
        (_, i) => startDate + i
      );
      await Promise.all(
        keys.val().map(async key => {
          if (!loaders[key.name]) {
            loaders[key.name] = {};
          }
          if (key.column.indexOf('habor') > -1) {
            return await Promise.all(
              years.map(async year => {
                return await Promise.all(
                  habors.map(async habor => {
                    const ref = await this.$fire.database
                      .ref(`income/${key.name}/${year}/${habor.name}`)
                      .once('value');
                    if (!loaders[key.name][year]) {
                      loaders[key.name][year] = {};
                    }
                    loaders[key.name][year][habor.name] = ref.val();
                    return ref;
                  })
                );
              })
            );
          } else if (key.column.indexOf('type') > -1) {
            return await Promise.all(
              years.map(async year => {
                return await Promise.all(
                  types.map(async type => {
                    const ref = await this.$fire.database
                      .ref(`income/${key.name}/${year}/${type.name}`)
                      .once('value');
                    if (!loaders[key.name][year]) {
                      loaders[key.name][year] = {};
                    }
                    loaders[key.name][year][type.name] = ref.val();
                    return ref;
                  })
                );
              })
            );
          } else {
            return await Promise.all(
              years.map(async year => {
                const ref = await this.$fire.database
                  .ref(`income/${key.name}/${year}`)
                  .once('value');
                loaders[key.name][year] = ref.val();
                return ref;
              })
            );
          }
        })
      );
      this.$store.dispatch('dashboard/setIncome', loaders);
      return loaders;
    },
  }
});
</script>

<style lang="scss">
.custom-datepicker,
.custom-datepicker:active .custom-datepicker:focus {
  background-color: transparent !important;
  color: white;
  border: 0px;
  border-bottom: 1px solid white;
  border-radius: 0px;
}
.custom-datepicker label,
.custom-datepicker svg[aria-label='calendar'] {
  color: white;
}
</style>
