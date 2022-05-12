import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => {
      return {
        locales: ['en', 'zh-tw'],
        lang: 'zh-tw'
      };
    },
    mutations: {
      setLang (state, lang) {
        state.lang = lang;
      }
    },
  });
};

export default createStore;
