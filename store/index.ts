import Vuex from 'vuex';
import commonModule from './common';
import dashboardModule from '~/store/dashboard';
const createStore = () => {
  return new Vuex.Store({
    modules: {
      common: commonModule,
      dashboard: dashboardModule
    }
  });
};

export default createStore;
