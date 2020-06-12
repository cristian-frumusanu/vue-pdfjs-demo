import Vue from 'vue';
import VueI18n from 'vue-i18n';

import messages from './strings/index';

// Internationalization
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'it', // set locale
  fallbackLocale: 'it',
  messages, // set locale messages
});

export default i18n;
