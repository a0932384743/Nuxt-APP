import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

interface StateInterface {
  prop: boolean;
}

type State = {
  list: [];
  loading: boolean;
};

const getters: GetterTree<State, StateInterface> = {
  getList(state) {
    return state.list;
  },
  getLoading(state) {
    return state.loading;
  }
};

const mutations: MutationTree<State> = {
  SET_LIST(state, list: [] = []) {
    state.list = list;
    state.loading = false;
  },
  SET_LOADING(state, loading: boolean = false) {
    state.loading = loading;
  }
};

const actions: ActionTree<State, StateInterface> = {
  setList({ commit }, list) {
    commit('SET_LIST', list);
  },
  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading);
  }
};

const dashboardModule: Module<State, StateInterface> = {
  namespaced: true,
  state: {
    list: [],
    loading: false
  },
  getters,
  mutations,
  actions
};

export default dashboardModule;
