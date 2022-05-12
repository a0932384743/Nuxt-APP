import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.lang,
    fallbackLocale: 'zh-tw',
    messages: {
      en: require('~/locales/en.json'),
      'zh-tw': require('~/locales/zh-tw.json'),
    },
  });
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  };
};
