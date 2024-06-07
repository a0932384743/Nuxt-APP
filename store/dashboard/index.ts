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
};

interface StateInterface {
  prop: boolean;
}

type State = {
  income: {
    [key: string]: {
      [key: string]: {
        [key: string]: number;
      };
    };
  };
  productGrowth: {
    [key: string]: {
      change: number;
      current: number;
      growthRate: number;
    };
  };
  loaders: {
    [key: string]: {
      [key: string]: {
        [key: string]: number;
      };
    };
  };
  shipCount: {
    [key: string]: {
      [key: string]: number;
    };
  };
  loading: boolean;
};

const getters: GetterTree<State, StateInterface> = {
  getIncome(state) {
    return state.income;
  },
  getLoaders(state) {
    return state.loaders;
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
  SET_INCOME(state, income = {}) {
    state.income = income;
  },
  SET_LOADERS(state, loaders = {}) {
    state.loaders = loaders;
  },
  SET_LOADING(state, loading: boolean = false) {
    state.loading = loading;
  },
  SET_PRODUCT_GROWTH(state, growth = {}) {
    state.productGrowth = growth;
  },
  SET_SHIP_COUNT(state, shipCount = {}) {
    state.shipCount = shipCount;
  }
};

const actions: ActionTree<State, StateInterface> = {
  setDashboard({ commit }, dashboard = []) {
    commit('SET_DASHBOARD', dashboard);
  },
  setIncome({ commit }, income = {}) {
    commit('SET_INCOME', income);
  },
  setLoaders({ commit }, loaders = {}) {
    commit('SET_LOADERS', loaders);
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
    income: {},
    loaders: {},
    loading: false,
    productGrowth: {},
    shipCount: {}
  }
};

export default dashboardModule;
