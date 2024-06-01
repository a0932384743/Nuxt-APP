import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

export type WidgetType = {
  [key: string]: any;
  chartType: string;
  dataSource: string;
  seriesProps: {
    [key: string]: any;
  };
  w?: number;
  h?: number;
  x?: number;
  y?: number;
}

interface StateInterface {
  prop: boolean;
}

type State = {
  incomeStatics: {
    [key: string]: {
      [key: string]: number;
    };
  };
  topTenLoader: {
    [key: string]: {
      [key: string]: number;
    };
  };
  incomeLoss: {
    [key: string]: {
      [key: string]: number;
    };
  };
  loaderSummary: {
    [key: string]: {
      change: number;
      current: number;
      growthRate: number;
    };
  };
  productGrowth: {
    [key: string]: {
      change: number;
      current: number;
      growthRate: number;
    };
  };
  loaderByHarbor: {
    [key: string]: {
      [key: string]: number;
    };
  };
  shipCount: {
    [key: string]: {
      [key: string]: number;
    };
  };
  topTenLoaderHistory: {
    [key: string]: number;
  };
  loading: boolean;
};

const getters: GetterTree<State, StateInterface> = {
  getLoader(state) {
    return state.topTenLoader;
  },
  getLoaderHistory(state) {
    return state.topTenLoaderHistory;
  },
  getIncomeLoss(state) {
    return state.incomeLoss;
  },
  getLoaderSummary(state) {
    return state.loaderSummary;
  },
  getProductGrowth(state) {
    return state.productGrowth;
  },
  getLoaderByHarbor(state) {
    return state.loaderByHarbor;
  },
  getShipCount(state) {
    return state.shipCount;
  },
  getLoading(state) {
    return state.loading;
  },
  getIncomeStatics(state) {
    return state.incomeStatics;
  }
};

const mutations: MutationTree<State> = {
  SET_LOADER(state, loader = {}) {
    state.topTenLoader = loader;
  },
  SET_LOADER_HISTORY(state, loader = {}) {
    state.topTenLoaderHistory = loader;
  },
  SET_LOADER_SUMMARY(state, summary = {}) {
    state.loaderSummary = summary;
  },
  SET_PRODUCT_GROWTH(state, growth = {}) {
    state.productGrowth = growth;
  },
  SET_LOADING(state, loading: boolean = false) {
    state.loading = loading;
  },
  SET_SHIP_COUNT(state, shipCount = {}) {
    state.shipCount = shipCount;
  },
  SET_LOADER_HARBOR(state, loader = {}) {
    state.loaderByHarbor = loader;
  },
  SET_INCOME_STATICS(state, income = {}) {
    state.incomeStatics = income;
  },
  SET_INCOME_LOSS(state, income = {}) {
    state.incomeLoss = { ...state.incomeLoss, ...income };
  },
};

const actions: ActionTree<State, StateInterface> = {
  setDashboard({ commit }, dashboard = []) {
    commit('SET_DASHBOARD', dashboard);
  },
  setLoading({ commit }, loading = false) {
    commit('SET_LOADING', loading);
  },
  setLoader({ commit }, loader = {}) {
    commit('SET_LOADER', loader);
  },
  setLoaderHistory({ commit }, loaderHistory = {}) {
    commit('SET_LOADER_HISTORY', loaderHistory);
  },
  setLoaderSummary({ commit }, summary = {}) {
    commit('SET_LOADER_SUMMARY', summary);
  },
  setProductGrowth({ commit }, growth = {}) {
    commit('SET_PRODUCT_GROWTH', growth);
  },
  setShipCount({ commit }, shipCount = {}) {
    commit('SET_SHIP_COUNT', shipCount);
  },
  setLoaderByHarbor({ commit }, loader = {}) {
    commit('SET_LOADER_HARBOR', loader);
  },
  setIncomeStatics({ commit }, income = {}) {
    commit('SET_INCOME_STATICS', income);
  },
  setIncomeLoss({ commit }, income = {}) {
    commit('SET_INCOME_LOSS', income);
  }
};

const dashboardModule: Module<State, StateInterface> = {
  namespaced: true,
  state: {
    incomeStatics: {},
    topTenLoader: {},
    topTenLoaderHistory: {},
    loaderSummary: {},
    productGrowth: {},
    loaderByHarbor: {},
    shipCount: {},
    incomeLoss: {},
    loading: false
  },
  getters,
  mutations,
  actions
};

export default dashboardModule;
