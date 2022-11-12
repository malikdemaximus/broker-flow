module.exports = {
  publicPath: './',
  configureWebpack: {
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: '[id].chunk.[chunkhash].js',
    },
    resolve: {
      alias: {},
      extensions: ['.js', '.vue', '.json'],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/assets/styles/variables.scss";
                `,
      },
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/bg-merchant-offer': {
        target: 'https://sapi.airbapay.kz/bg-merchant-offer/api/v1/',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/bg-agree': {
        target: 'https://sapi.airbapay.kz/bg-agree/api/v1/',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
}
