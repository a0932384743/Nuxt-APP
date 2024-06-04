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
  getLang(state) {
    return state.lang;
  },
  getLocales(state) {
    return state.locales;
  },
  getMenu(state) {
    return state.baseMenu;
  },
  getSubmenu(state) {
    return state.subMenu;
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
  SET_Menu(state, menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
    state.baseMenu = menu;
  },
  SET_SUB_MENU(state, menu) {
    state.subMenu = menu;
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
  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...user } = res.locals.user;
      await dispatch('onAuthStateChangedAction', {
        claims,
        token,
        user,
      });
    }
  },
  setLang({ commit }, lang) {
    commit('SET_LANG', lang);
  },
  setMenu({ commit }, menu) {
    commit('SET_Menu', menu);
  },
  setSubMenu({ commit }, menu) {
    commit('SET_SUB_MENU', menu);
  },
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
};

const commonModule: Module<State, StateInterface> = {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: {
    baseMenu: JSON.parse(String(localStorage.getItem('menu'))) || [],
    lang: 'zh-tw',
    locales: ['en', 'zh-tw'],
    subMenu: [],
    user: JSON.parse(String(localStorage.getItem('user')))
  },
};

export default commonModule;
