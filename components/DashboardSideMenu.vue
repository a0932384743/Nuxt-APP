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
          全選
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
    <div class="d-flex" style="gap: 0.5rem">
      <b-button variant="info" pill class="flex-grow-1" @click="onApply">
        {{ $t('apply') }}
      </b-button>
      <b-button
        variant="outline-secondary"
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
      form: {
        startDate: moment().subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        selectedCompanies: [],
        selectedHarbor: []
      },
      companies: [],
      harbors: []
    };
  },
  computed: {
    maxDate() {
      return moment().endOf('day').toDate();
    }
  },
  created() {
    this.loadCompanies();
    this.loadHarbors();
    this.onApply();
  },
  methods: {
    onReset() {
      this.form = {
        startDate: moment().subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        selectedCompanies: [],
        selectedHarbor: []
      };
      this.$store.dispatch('dashboard/setLoading', true);
      const res = this.$fire.database.ref('dashboard');
      res.once('value', snapshot => {
        const data = snapshot.val();
        this.$store.dispatch('dashboard/setList', data);
      });
    },
    onApply() {
      this.$store.dispatch('dashboard/setLoading', true);
      const res = this.$fire.database.ref('dashboard');
      res.once('value', snapshot => {
        const data = snapshot.val();
        this.$store.dispatch('dashboard/setList', data);
      });
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
    async loadCompanies() {
      try {
        const res = await this.$fire.firestore.collection('company').get();
        this.companies = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadCompanies', e);
      }
    },
    async loadHarbors() {
      try {
        const res = await this.$fire.firestore.collection('harbor').get();
        this.harbors = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadHarbors', e);
      }
    }
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
.custom-datepicker svg {
  color: white;
}
</style>
