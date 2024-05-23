<template>
  <div class="auth-layout d-flex flex-column">
    <dashboard-header>
      <template #menu-btn>
        <b-button
          class="mr-3 navbar-toggler d-block"
          @click="toggleMenu"
        >
          <font-awesome-icon icon="bars" />
        </b-button>
      </template>
      <template #menu>
        <b-nav-item
          v-for="menu in baseMenu"
          :key="menu.name"
          :to="menu.url"
        >
          <span>{{ menu.name }}</span>
        </b-nav-item>
      </template>
    </dashboard-header>
    <main
      class="flex-grow-1"
      style="background: #141844; padding-top: 80px; height: 100vh"
    >
      <div class="d-flex flex-row h-100">
        <div
          :style="{
            width: isShowMenu ? '350px' : '0px',
            padding: isShowMenu ? '20px 10px' : '20px 0px',
            overflowX: isShowMenu ? 'auto' : 'hidden',
          }"
          :class="{ close: !isShowMenu }"
          class="filter-condition"
          aria-label="Sidebar Menu"
        >
          <div class="text-white mb-2">
            {{ $t('condition.filter') }}
          </div>
          <div class="row mb-3 w-100">
            <b-form-group class="col-sm-12 col-md-6">
              <b-form-text>
                {{ $t('start.date') }}
              </b-form-text>
              <b-form-datepicker
                v-model="form.startDate"
                class="custom-datepicker"
                size="sm"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              />
            </b-form-group>
            <b-form-group class="col-sm-12 col-md-6">
              <b-form-text>
                {{ $t('end.date') }}
              </b-form-text>
              <b-form-datepicker
                v-model="form.endDate"
                class="custom-datepicker"
                size="sm"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              />
            </b-form-group>
          </div>
          <div class="text-white mb-2 d-flex">
            <div class="flex-grow-1">
              {{ $t('companies') }}
            </div>
            <div class="flex-grow-1">
              <b-form-checkbox
                :checked="
                  companies?.length > 0 &&
                    selectedCompanies
                      .map((c) => c.name)
                      .filter((c) => c)
                      .sort()
                      .join(',') ===
                    companies
                      .map((c) => c.name)
                      .filter((c) => c)
                      .sort()
                      .join(',')
                "
                @change="toggleAllCompanies"
              >
                全選
              </b-form-checkbox>
            </div>
          </div>
          <div class="row mb-3 w-100">
            <b-form-group
              v-for="company in companies"
              :key="company.name"
              class="col-sm-12 col-md-6"
            >
              <b-form-checkbox
                v-model="selectedCompanies"
                :value="company"
                :aria-describedby="company.name"
              >
                {{ company.name }}
              </b-form-checkbox>
            </b-form-group>
          </div>
          <div class="text-white mb-2 d-flex">
            <div class="flex-grow-1">
              {{ $t('harbors') }}
            </div>
            <div class="flex-grow-1">
              <b-form-checkbox
                :checked="
                  harbors?.length > 0 &&
                    selectedHarbor
                      .map((c) => c.name)
                      .filter((c) => c)
                      .sort()
                      .join(',') ===
                    harbors
                      .map((c) => c.name)
                      .filter((c) => c)
                      .sort()
                      .join(',')
                "
                @change="toggleAllHarbors"
              >
                全選
              </b-form-checkbox>
            </div>
          </div>
          <div class="row mb-3 w-100">
            <b-form-group
              v-for="harbor in harbors"
              :key="harbor.name"
              class="col-sm-12 col-md-6"
            >
              <b-form-checkbox
                v-model="selectedHarbor"
                :value="harbor"
                :aria-describedby="harbor.name"
              >
                {{ harbor.name }}
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
        <nuxt />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DashboardHeader from '../components/DashboardHeader.vue';

export default Vue.extend({
  components: { DashboardHeader },
  layout: 'DashboardLayout',
  data() {
    return {
      isShowMenu: true,
      form: {
        startDate: '',
        endDate: '',
      },
      baseMenu: [],
      companies: [],
      harbors: [],
      selectedCompanies: [],
      selectedHarbor: [],
    };
  },
  created() {
    this.loadMenu();
    this.loadCompanies();
    this.loadHarbors();
  },
  methods: {
    toggleAllCompanies() {
      if (
        this.selectedCompanies
          .map((c) => c.name)
          .filter((c) => c)
          .sort()
          .join(',') ===
        this.companies
          .map((c) => c.name)
          .filter((c) => c)
          .sort()
          .join(',')
      ) {
        this.selectedCompanies = [];
      } else {
        this.selectedCompanies = [...this.companies];
      }
    },
    toggleAllHarbors() {
      if (
        this.selectedHarbor
          .map((c) => c.name)
          .filter((c) => c)
          .sort()
          .join(',') ===
        this.harbors
          .map((c) => c.name)
          .filter((c) => c)
          .sort()
          .join(',')
      ) {
        this.selectedHarbor = [];
      } else {
        this.selectedHarbor = [...this.harbors];
      }
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    },
    async loadMenu() {
      try {
        const res = await this.$store.$fire.firestore.collection('menus').get();
        this.baseMenu = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadMenu', e);
      }
    },
    async loadCompanies() {
      try {
        const res = await this.$store.$fire.firestore.collection('company').get();
        this.companies = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadCompanies', e);
      }
    },
    async loadHarbors() {
      try {
        const res = await this.$store.$fire.firestore.collection('harbor').get();
        this.harbors = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('loadHarbors', e);
      }
    },
  },
});
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}

.filter-condition {
  height: 100%;
  color: white;
  font-size: 1rem;
  background: #19204d;
  border: 1px solid #363636;
  transition: width 0.5s ease-in-out;
  padding: 20px 10px;
  overflow-y: hidden;
}

.filter-condition.close * {
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  overflow: hidden;
}

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
