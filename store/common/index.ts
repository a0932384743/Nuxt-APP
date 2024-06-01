import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

interface StateInterface {
  prop: boolean;
}

type Menu = {
  url:string;
  name:string;
  filter?:string;
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
  baseMenu: Array<Menu>,
  subMenu: Array<Menu>,
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
  getMenu(state) {
    return state.baseMenu;
  },
  getSubmenu(state) {
    return state.subMenu;
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
  SET_Menu(state, menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
    state.baseMenu = menu;
  },
  SET_SUB_MENU(state, menu) {
    state.subMenu = menu;
  },
};

const actions: ActionTree<State, StateInterface> = {
  setLang({ commit }, lang) {
    commit('SET_LANG', lang);
  },
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  setMenu({ commit }, menu) {
    commit('SET_Menu', menu);
  },
  setSubMenu({ commit }, menu) {
    commit('SET_SUB_MENU', menu);
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
    baseMenu: JSON.parse(String(localStorage.getItem('menu'))) || [],
    subMenu: []
  },
  getters,
  mutations,
  actions,
};

export default commonModule;
