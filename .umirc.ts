import { defineConfig } from 'umi';
import theme from './config/theme.config';
import px2viewport from 'postcss-px-to-viewport';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/VerifyCode' }],
  ssr: { staticMarkup: true },
  title: false,
  extraPostCSSPlugins: [px2viewport({ viewportWidth: 375 })],
  theme: theme(),
  chunks: ['umi'],
  chainWebpack: function (config) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 10,
          automaticNameDelimiter: '.',
          cacheGroups: {
            default: false,
          },
        },
      },
    });
  },
});
