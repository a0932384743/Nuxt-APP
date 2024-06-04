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
  getIncomeLoss(state) {
    return state.incomeLoss;
  },
  getIncomeStatics(state) {
    return state.incomeStatics;
  },
  getLoader(state) {
    return state.topTenLoader;
  },
  getLoaderByHarbor(state) {
    return state.loaderByHarbor;
  },
  getLoaderHistory(state) {
    return state.topTenLoaderHistory;
  },
  getLoaderSummary(state) {
    return state.loaderSummary;
  },
  getLoading(state) {
    return state.loading;
  },
  getProductGrowth(state) {
    return state.productGrowth;
  },
  getShipCount(state) {
    return state.shipCount;
  }
};

const mutations: MutationTree<State> = {
  SET_INCOME_LOSS(state, income = {}) {
    state.incomeLoss = { ...state.incomeLoss, ...income };
  },
  SET_INCOME_STATICS(state, income = {}) {
    state.incomeStatics = income;
  },
  SET_LOADER(state, loader = {}) {
    state.topTenLoader = loader;
  },
  SET_LOADER_HARBOR(state, loader = {}) {
    state.loaderByHarbor = loader;
  },
  SET_LOADER_HISTORY(state, loader = {}) {
    state.topTenLoaderHistory = loader;
  },
  SET_LOADER_SUMMARY(state, summary = {}) {
    state.loaderSummary = summary;
  },
  SET_LOADING(state, loading: boolean = false) {
    state.loading = loading;
  },
  SET_PRODUCT_GROWTH(state, growth = {}) {
    state.productGrowth = growth;
  },
  SET_SHIP_COUNT(state, shipCount = {}) {
    state.shipCount = shipCount;
  },
};

const actions: ActionTree<State, StateInterface> = {
  setDashboard({ commit }, dashboard = []) {
    commit('SET_DASHBOARD', dashboard);
  },
  setIncomeLoss({ commit }, income = {}) {
    commit('SET_INCOME_LOSS', income);
  },
  setIncomeStatics({ commit }, income = {}) {
    commit('SET_INCOME_STATICS', income);
  },
  setLoader({ commit }, loader = {}) {
    commit('SET_LOADER', loader);
  },
  setLoaderByHarbor({ commit }, loader = {}) {
    commit('SET_LOADER_HARBOR', loader);
  },
  setLoaderHistory({ commit }, loaderHistory = {}) {
    commit('SET_LOADER_HISTORY', loaderHistory);
  },
  setLoaderSummary({ commit }, summary = {}) {
    commit('SET_LOADER_SUMMARY', summary);
  },
  setLoading({ commit }, loading = false) {
    commit('SET_LOADING', loading);
  },
  setProductGrowth({ commit }, growth = {}) {
    commit('SET_PRODUCT_GROWTH', growth);
  },
  setShipCount({ commit }, shipCount = {}) {
    commit('SET_SHIP_COUNT', shipCount);
  }
};

const dashboardModule: Module<State, StateInterface> = {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: {
    incomeLoss: {},
    incomeStatics: {},
    loaderByHarbor: {},
    loaderSummary: {},
    loading: false,
    productGrowth: {},
    shipCount: {},
    topTenLoader: {},
    topTenLoaderHistory: {}
  }
};

export default dashboardModule;
