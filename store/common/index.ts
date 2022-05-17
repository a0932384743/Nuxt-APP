import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';

const getters: GetterTree<any, any> = {
  getLocales (state) {
    return state.locales;
  },
  getLang (state) {
    return state.lang;
  },
  getUser (state) {
    return state.user;
  },
  isLoggedIn (state) {
    return !!state.user;
  }
};

const mutations: MutationTree<any> = {
  'SET_LANG' (state, lang) {
    state.lang = lang;
  },
  'SET_USER' (state, user) {
    state.user = user;
  }
};

const actions: ActionTree<any, any> = {
  setLang ({ commit, dispatch }, lang) {
    commit('SET_LANG', lang);
  },
  setUser ({ commit, dispatch }, user) {
    commit('SET_USER', user);
  },
  loginByEmail ({ commit, dispatch }, { email, password }) {
    console.log(password, email);
  },

  async onAuthStateChangedAction (state, { user }) {
    if (!user) {
      state.commit('SET_USER', null);
    } else {
      state.commit('SET_USER', {
        user
      });
    }
  },

  async nuxtServerInit ({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...user } = res.locals.user;
      await dispatch('onAuthStateChangedAction', {
        user,
        claims,
        token
      });
    }
  }
};

const commonModule: Module<any, any> = {
  namespaced: true,
  state: () => {
    return {
      locales: ['en', 'zh-tw'],
      lang: 'zh-tw',
      user: null,
    };
  },
  getters,
  mutations,
  actions,
};

export default commonModule;
