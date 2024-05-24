import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

interface StateInterface {
  prop: boolean;
}

type State = {
  locales: string[];
  lang: string;
  user:
    | any
    | {
        email: string;
        password: string;
      };
};

const getters: GetterTree<State, StateInterface> = {
  getLocales(state) {
    return state.locales;
  },
  getLang(state) {
    return state.lang;
  },
  getUser(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return !!state.user;
  },
};

const mutations: MutationTree<State> = {
  SET_LANG(state, lang) {
    state.lang = lang;
  },
  SET_USER(state, user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    state.user = user;
  },
};

const actions: ActionTree<State, StateInterface> = {
  setLang({ commit }, lang) {
    commit('SET_LANG', lang);
  },
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...user } = res.locals.user;
      await dispatch('onAuthStateChangedAction', {
        user,
        claims,
        token,
      });
    }
  },
};

const commonModule: Module<State, StateInterface> = {
  namespaced: true,
  state: {
    locales: ['en', 'zh-tw'],
    lang: 'zh-tw',
    user: JSON.parse(String(localStorage.getItem('user'))),
  },
  getters,
  mutations,
  actions,
};

export default commonModule;
