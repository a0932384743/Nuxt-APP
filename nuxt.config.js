export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    port: 3000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    base: '/',
    linkExactActiveClass: 'active',
  },
  meta: {
    ogType: false,
    ogDescription: false,
    author: false,
    ogTitle: false,
    description: false,
    viewport: false,
    charset: false,
  },
  head: {
    title: 'vue-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'locale',
        content: 'zh_TW',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/img/shortIcon/favicon.ico',
      },
    ],
    bodyAttrs: {
      className: 'bg-default h-100',
    },
  },
  loading: { color: '#fff' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/asserts/scss/styles.scss'],

  plugins: ['~/plugins/directives', '~/plugins/font-awesome', '~/plugins/i18n'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.APP_API_KEY,
          authDomain: process.env.APP_AUTH_DOMAIN,
          projectId: process.env.APP_PROJECT_ID,
          storageBucket: process.env.APP_STORAGE_BUCKET,
          messagingSenderId: process.env.APP_MESSAGING_SENDERID,
          appId: process.env.APP_ID,
          measurementId: process.env.APP_MEASUREMENT_ID,
        },
        services: {
          auth: true, // Just as example. Can be any other service.
        },
      },
    ],
  ],
  publicRuntimeConfig: {
    APP_VERSION: process.env.APP_VERSION,
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {},
    extractCSS: process.env.NODE_ENV === 'production',
  },
};
