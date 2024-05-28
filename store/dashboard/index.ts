import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

interface StateInterface {
  prop: boolean;
}

type State = {
  dashboard: Array<{
    [key: string]: any;
    chartType: string;
    dataSource: string;
    seriesProps: {
      [key: string]: any;
    };
    lg?: number;
    md?: number;
    sm?: number;
  }>;
  topTenLoader: {
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
  loaderByHarbor: {
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
  getDashboard(state) {
    return state.dashboard;
  },
  getLoader(state) {
    return state.topTenLoader;
  },
  getLoaderHistory(state) {
    return state.topTenLoaderHistory;
  },
  getLoaderSummary(state) {
    return state.loaderSummary;
  },
  getLoaderByHarbor(state) {
    return state.loaderByHarbor;
  },
  getLoading(state) {
    return state.loading;
  }
};

const mutations: MutationTree<State> = {
  SET_DASHBOARD(state, dashboard = []) {
    state.dashboard = dashboard;
  },
  SET_LOADER(state, loader = {}) {
    state.topTenLoader = loader;
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
  SET_LOADER_HARBOR(state, loader = {}) {
    state.loaderByHarbor = loader;
  }
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
  setLoaderByHarbor({ commit }, loader = {}) {
    commit('SET_LOADER_HARBOR', loader);
  }
};

const dashboardModule: Module<State, StateInterface> = {
  namespaced: true,
  state: {
    dashboard: [],
    topTenLoader: {},
    topTenLoaderHistory: {},
    loaderSummary: {},
    loaderByHarbor: {},
    loading: false
  },
  getters,
  mutations,
  actions
};

export default dashboardModule;
