const pkg = require('./package')

const { getConfigForKeys } = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])
const { createClient } = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

module.exports = {
  mode: 'universal',
  // mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP'
      // }
    ]
  },

  webfontloader: {
    google: {
      families: ['Noto+Sans+JP']
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00bc7e' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/global', ssr: false },
    { src: '~plugins/contentful' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    // ['@nuxtjs/google-analytics', { id: 'UA-xxxxxxxxx-x' }],
    // ['@nuxtjs/google-tag-manager', { id: 'GTM-xxxxxxx', pageTracking: true }]
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://xxx.com',
    generate: true,
    exclude: [
      // '/admin'
    ],
    async routes() {
      // contentful
      const contentful = require('contentful')
      const client = contentful.createClient({
        space: ctfConfig.CTF_SPACE_ID,
        accessToken: ctfConfig.CTF_CDA_ACCESS_TOKEN
      })
      const posts = await client.getEntries({
        content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })

      let urls = []
      posts.items.forEach((val, idx, arr) => {
        urls[idx] = val.fields.slug
      })

      return urls
    }
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    use: ['markdown-it-toc']
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    routes() {
      return cdaClient
        .getEntries({
          content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID
        })
        .then(entries => {
          return [...entries.items.map(entry => `/blog/${entry.fields.slug}`)]
        })
    }
  },

  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  }
}
