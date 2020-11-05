export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  router: {
    base: process.env.NODE_ENV === 'production' ? '/morethanmetrics-testtask/' : ''
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Persona - Test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: (process.env.NODE_ENV === 'production' ? '/morethanmetrics-testtask/' : '/') + 'favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;700;900&display=swap'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/style/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/fontawesome.ts', ssr: true },
    { src: '~/plugins/axios.ts', ssr: true }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
