import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/document-library/',
  title: 'wfj blog',
  description: 'wfj的笔记',
  vite: {
    assetsInclude: ['**/*.awebp']
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端基础', link: '/前端基础/html/H5开发FAQ' },
      { text: '面试', link: '/面试/前端面试资源汇总' }
    ],

    sidebar: {
      '/前端基础/': [
        {
          text: 'html',
          items: [{ text: 'H5开发FAQ', link: '/前端基础/html/H5开发FAQ' }]
        },
        {
          text: 'css',
          items: [
            { text: '盒模型及BFC', link: '/前端基础/css/盒模型及BFC' },
            { text: '面试题', link: '/前端基础/css/面试题' },
            { text: '有趣的css', link: '/前端基础/css/有趣的css' },
            {
              text: '自适应和响应式布局',
              link: '/前端基础/css/自适应和响应式布局'
            }
          ]
        },
        {
          text: 'js',
          items: [
            {
              text: '基础',
              items: [
                {
                  text: '数据类型的判断',
                  link: '/前端基础/js/基础/数据类型/数据类型的判断'
                },
                {
                  text: '数据类型的转换',
                  link: '/前端基础/js/基础/数据类型/数据类型的转换'
                },
                {
                  text: '闭包',
                  link: '/前端基础/js/基础/闭包'
                },
                {
                  text: '事件循环',
                  link: '/前端基础/js/基础/事件循环'
                },
                {
                  text: '原型链',
                  link: '/前端基础/js/基础/原型链'
                },
                {
                  text: 'this指向',
                  link: '/前端基础/js/基础/this指向'
                }
              ]
            },
            {
              text: '封装',
              items: [
                {
                  text: '防抖与节流',
                  link: '/前端基础/js/封装/防抖与节流/'
                },
                {
                  text: '深拷贝',
                  link: '/前端基础/js/封装/深拷贝'
                },
                {
                  text: '数组扁平化',
                  link: '/前端基础/js/封装/数组扁平化'
                }
              ]
            },
            {
              text: 'ES6',
              items: [
                {
                  text: 'ESM和CommonJS',
                  link: '/前端基础/js/ES6/ESM/ESM和CommonJS'
                },
                {
                  text: 'Promise介绍和实现',
                  link: '/前端基础/js/ES6/Promise/介绍和实现'
                },
                {
                  text: '类',
                  link: '/前端基础/js/ES6/类'
                },
                {
                  text: '新特性',
                  link: '/前端基础/js/ES6/新特性'
                }
              ]
            }
          ]
        }
      ],
      '/面试/': [
        { text: '前端面试资源汇总', link: '/面试/前端面试资源汇总' },
        { text: '与面试官的较量', link: '/面试/与面试官的较量' },
        { text: '做好面试官', link: '/面试/做好面试官' },
        { text: 'html面试题', link: '/面试/html面试题' },
        { text: '学习规划', link: '/面试/学习规划' }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
