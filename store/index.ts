import Vuex from 'vuex';
import commonModule from './common';
const createStore = () => {
  return new Vuex.Store({
    modules: {
      common: commonModule
    }
  });
};

export default createStore;
