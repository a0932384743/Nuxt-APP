import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.getters['common/getLang'],
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en.json'),
      'zh-tw': require('~/locales/zh-tw.json'),
    },
  });
};
