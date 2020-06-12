import Vue from 'vue';
import Vuex from 'vuex';

import * as Action from './types/action-types';

interface AppState {
  isLoading: boolean;
  currentPage: number | null;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    currentPage: null,
  },

  mutations: {
    [Action.API_REQUEST](state: AppState) {
      state.isLoading = true;
    },

    [Action.API_SUCCESS](state: AppState) {
      state.isLoading = false;
    },

    [Action.API_FAIL](state: AppState, error = 'Generic APP error') {
      state.isLoading = false;
      // eslint-disable-next-line
      alert(error);
    },

    [Action.SET_CURRENT_PAGE](state: AppState, currentPage) {
      state.currentPage = currentPage;
    },
  },

  actions: {},
});
