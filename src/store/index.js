import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import header_store from './modules/header';
import dialog_store from './modules/dialog_store';

export default new vuex.Store({
  modules: {
    headerStore: header_store,
    dialogStore: dialog_store
  }
})
