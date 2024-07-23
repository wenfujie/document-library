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
      { text: '前端工程化', link: '/前端工程化/开发/git使用' },
      { text: '浏览器', link: '/浏览器/谷歌浏览器开发者工具' },
      { text: '程序员储备', link: '/程序员储备/设计模式/设计模式' },
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
        },
        {
          text: '代码规范',
          items: [{ text: '变量命名', link: '/前端基础/代码规范/变量命名' }]
        },
        {
          text: '适配',
          items: [
            { text: '页面适配', link: '/前端基础/适配/页面适配' },
            { text: 'PC适配', link: '/前端基础/适配/PC适配' }
          ]
        }
      ],
      '/前端工程化/': [
        {
          text: '开发',
          items: [
            { text: 'git使用', link: '/前端工程化/开发/git使用' },
            { text: 'npm使用', link: '/前端工程化/开发/npm使用' },
            { text: 'pnpm介绍', link: '/前端工程化/开发/pnpm介绍' },
            {
              text: 'vscode快捷键和终端指令',
              link: '/前端工程化/开发/vscode快捷键和终端指令'
            },
            { text: '常用vscode插件', link: '/前端工程化/开发/常用vscode插件' },
            {
              text: '脚手架',
              items: [
                {
                  text: '搭建脚手架',
                  link: '/前端工程化/开发/脚手架/搭建脚手架'
                },
                {
                  text: 'commander使用',
                  link: '/前端工程化/开发/脚手架/commander使用'
                }
              ]
            },
            {
              text: '代码规范',
              items: [
                {
                  text: 'eslint+prettier',
                  link: '/前端工程化/开发/代码规范/eslint+prettier'
                },
                {
                  text: 'husky约束commit规范',
                  link: '/前端工程化/开发/代码规范/husky约束commit规范'
                }
              ]
            }
          ]
        },
        {
          text: '构建',
          items: [
            {
              text: 'babel+polyfill浏览器兼容',
              link: '/前端工程化/构建/babel+polyfill浏览器兼容'
            },
            { text: 'babel7', link: '/前端工程化/构建/babel7' },
            {
              text: 'vite',
              items: [
                { text: '插件', link: '/前端工程化/构建/vite/插件' },
                { text: '构建拆包', link: '/前端工程化/构建/vite/构建拆包' },
                { text: '什么是预构建', link: '/前端工程化/构建/vite/什么是预构建' },
                { text: 'plugin-legacy插件', link: '/前端工程化/构建/vite/plugin-legacy插件' },
                { text: '如何做到冷启动、热更快', link: '/前端工程化/构建/vite/如何做到冷启动、热更快' },
              ]
            },
            {
              text: 'webpack',
              items: [
                { text: '介绍', link: '/前端工程化/构建/webpack/介绍' },
                { text: '热更新原理', link: '/前端工程化/构建/webpack/热更新原理' },
                { text: 'Loader', link: '/前端工程化/构建/webpack/Loader' },
              ]
            }
          ]
        },
        {
          text: '测试',
          items: [{ text: '端到端测试', link: '/前端工程化/测试/端到端测试' }]
        },
        {
          text: '部署',
          items: [
            { text: 'Docker使用说明', link: '/前端工程化/部署/Docker使用说明' },
            { text: 'gitlab-ci', link: '/前端工程化/部署/gitlab-ci' },
            { text: 'nginx指南', link: '/前端工程化/部署/nginx指南' },
            { text: 'node自动化部署', link: '/前端工程化/部署/node自动化部署' }
          ]
        },
      ],
      '/浏览器/': [
        { text: '谷歌浏览器开发者工具', link: '/浏览器/谷歌浏览器开发者工具' },
        { text: '浏览器渲染机制', link: '/浏览器/浏览器渲染机制' },
        { text: 'BOM', link: '/浏览器/BOM' },
        { text: 'DOM事件总结', link: '/浏览器/DOM事件总结' },
        { text: 'V8引擎的垃圾回收', link: '/浏览器/V8引擎的垃圾回收' },
      ],
      '/程序员储备/': [
        // TODO: 这两篇添加后访问异常
        // { 
        //   text: '正则',
        //   items: [
        //     { text: '学习正则表达式', link: '/程序员储备/正则/学习正则表达式' },
        //     { text: '正则mini书笔记', link: '/程序员储备/正则/正则mini书笔记' },
        //   ]
        // },
        { 
          text: '设计模式',
          items: [
            { text: '设计模式', link: '/程序员储备/设计模式/设计模式' },
          ]
        },
        { 
          text: '算法',
          items: [
            { text: '基础算法', link: '/程序员储备/算法/基础算法' },
            { text: '算法深入', link: '/程序员储备/算法/算法深入' },
          ]
        },
        { 
          text: '开发语言',
          items: [
            { text: 'shell脚本编写', link: '/程序员储备/开发语言/shell脚本编写' },
            { 
              text: 'MarkDown',
              items: [
                { text: 'markdown语法', link: '/程序员储备/开发语言/MarkDown/markdown语法' },
                { text: 'markdown转html', link: '/程序员储备/开发语言/MarkDown/markdown转html' },
              ]
            },
          ]
        },
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
      { icon: 'github', link: 'https://github.com/wenfujie/document-library' }
    ]
  }
})
