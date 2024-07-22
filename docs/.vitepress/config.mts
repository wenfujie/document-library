import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'wfj blog',
  description: 'wfj的笔记',
  vite: {
    assetsInclude: ['**/*.awebp'],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端基础', link: '/前端基础/html/html面试题' }
    ],

    sidebar: {
      '/前端基础/': [
        {
          text: 'html',
          items: [
            { text: 'html面试题', link: '/前端基础/html/html面试题' },
            { text: 'H5开发FAQ', link: '/前端基础/html/H5开发FAQ' }
          ]
        },
        {
          text: 'css',
          items: [
            { text: '盒模型及BFC', link: '/前端基础/css/盒模型及BFC' },
            { text: '面试题', link: '/前端基础/css/面试题' },
            { text: '有趣的css', link: '/前端基础/css/有趣的css' },
            { text: '自适应和响应式布局', link: '/前端基础/css/自适应和响应式布局' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
