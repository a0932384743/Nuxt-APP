import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => {
      return {
        result: '尚未查詢',
      };
    },
    mutations: {
      setResult(state, { result }) {
        state.result = result;
      },
    },
  });
};

export default createStore;
