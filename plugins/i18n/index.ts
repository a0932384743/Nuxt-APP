import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import en from '~/locales/en.json';
import zhTW from '~/locales/zh-tw.json';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const i18nPlugin: Plugin = ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.getters['common/getLang'],
    fallbackLocale: 'en',
    messages: {
      en,
      'zh-tw': zhTW,
    },
  });
};

export default i18nPlugin;
