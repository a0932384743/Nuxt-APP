import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';

const getters: GetterTree<any, any> = {
  getLocales (state) {
    return state.locales;
  },
  getLang (state) {
    return state.lang;
  }
};

const mutations: MutationTree<any> = {
  'SET_LANG' (state, lang) {
    state.lang = lang;
  }
};

const actions: ActionTree<any, any> = {
  setLang ({ commit, dispatch }, lang) {
    commit('SET_LANG', lang);
  },
};

const commonModule: Module<any, any> = {
  namespaced: true,
  state: () => {
    return {
      locales: ['en', 'zh-tw'],
      lang: 'zh-tw'
    };
  },
  getters,
  mutations,
  actions,
};

export default commonModule;
