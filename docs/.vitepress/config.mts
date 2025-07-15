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
      {
        text: '前端基础',
        items: [
          { text: 'html', link: '/前端基础/html/H5开发FAQ' },
          { text: 'css', link: '/前端基础/css/盒模型及BFC' },
          { text: 'js', link: '/前端基础/js/基础/数据类型/数据类型的判断' },
          { text: '代码规范', link: '/前端基础/代码规范/变量命名' },
          { text: '适配', link: '/前端基础/适配/页面适配' }
        ]
      },
      {
        text: '前端进阶',
        items: [
          { text: 'vue3', link: '/前端进阶/vue3/Vue3开发注意事项' },
          { text: 'vue2', link: '/前端进阶/vue2/异步更新和nextTick' },
          { text: 'ts', link: '/前端进阶/ts/介绍' },
          { text: 'nuxt', link: '/前端进阶/nuxt/nuxt服务端渲染' },
          { text: '性能优化', link: '/前端进阶/性能优化/如何提升用户体验' },
          { text: '前端架构', link: '/前端进阶/前端架构/对BFF的理解' },
          { text: '网络请求', link: '/前端进阶/网络请求/http/http协议' },
          { text: '前端业务', link: '/前端进阶/前端业务/权限控制' },
          { text: '安全', link: '/前端进阶/安全/加密和签名' },
          { text: '动画', link: '/前端进阶/动画/css动画' },
          { text: '库', link: '/前端进阶/库/lodash常用函数' },
          { text: '手写代码', link: '/前端进阶/手写代码/写代码小技巧' }
        ]
      },
      {
        text: '解决方案',
        items: [
          {
            text: 'exceljs 导出表格数据为excel',
            link: 'https://github.com/wenfujie/demo/tree/main/use-download-excel'
          }
        ]
      },
      { text: '前端工程化', link: '/前端工程化/开发/git使用' },
      {
        text: '程序员储备',
        items: [
          { text: '正则', link: '/程序员储备/正则/学习正则表达式' },
          { text: '设计模式&架构', link: '/程序员储备/设计模式/设计模式' },
          { text: '算法', link: '/程序员储备/算法/基础算法' },
          { text: '浏览器', link: '/程序员储备/浏览器/谷歌浏览器开发者工具' },
          { text: '开发语言', link: '/程序员储备/开发语言/shell脚本编写' }
        ]
      },
      { text: '面试', link: '/面试/前端面试资源汇总' },
      {
        text: '生活',
        items: [
          { text: '积累', link: '/生活/积累/沟通' },
          { text: '书籍', link: '/生活/书籍/超级闲聊术' },
          { text: '随想', link: '/生活/随想/催眠自己去跑步的文章' },
          { text: '心理学', link: '/生活/心理学/需求层次理论' }
        ]
      }
    ],

    sidebar: {
      '/前端基础/html': [
        {
          text: 'html',
          items: [{ text: 'H5开发FAQ', link: '/前端基础/html/H5开发FAQ' }]
        }
      ],
      '/前端基础/css': [
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
        }
      ],
      '/前端基础/js': [
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
                },
                {
                  text: '代码片段',
                  link: '/前端基础/js/封装/代码片段'
                }
              ]
            },
            {
              text: 'ES6',
              items: [
                {
                  text: 'ESM和CommonJS',
                  link: '/前端基础/js/es6/esm/ESM和CommonJS'
                },
                {
                  text: 'Promise介绍和实现',
                  link: '/前端基础/js/es6/promise/介绍和实现'
                },
                {
                  text: '类',
                  link: '/前端基础/js/es6/类'
                },
                {
                  text: '新特性',
                  link: '/前端基础/js/es6/新特性'
                }
              ]
            }
          ]
        }
      ],
      '/前端基础/代码规范': [
        {
          text: '代码规范',
          items: [{ text: '变量命名', link: '/前端基础/代码规范/变量命名' }]
        }
      ],
      '/前端基础/适配': [
        {
          text: '适配',
          items: [
            { text: '页面适配', link: '/前端基础/适配/页面适配' },
            { text: 'PC适配', link: '/前端基础/适配/PC适配' },
            { text: '移动端适配', link: '/前端基础/适配/移动端适配' }
          ]
        }
      ],
      '/前端进阶/vue3': [
        {
          text: 'vue3',
          items: [
            {
              text: '基础',
              items: [
                {
                  text: 'Vue3开发注意事项',
                  link: '/前端进阶/vue3/Vue3开发注意事项'
                },
                { text: 'Vue3快速上手', link: '/前端进阶/vue3/Vue3快速上手' }
              ]
            },
            {
              text: '设计和原理',
              items: [
                {
                  text: 'computed实现',
                  link: '/前端进阶/vue3/设计和原理/computed实现'
                },
                {
                  text: 'Vue3做了哪些优化',
                  link: '/前端进阶/vue3/设计和原理/Vue3做了哪些优化'
                },
                {
                  text: 'reactive',
                  items: [
                    {
                      text: '响应系统的设计',
                      link: '/前端进阶/vue3/设计和原理/reactive/响应系统的设计'
                    },
                    {
                      text: 'proxy的工作原理',
                      link: '/前端进阶/vue3/设计和原理/reactive/proxy的工作原理'
                    },
                    {
                      text: 'ref原始值的响应式',
                      link: '/前端进阶/vue3/设计和原理/reactive/ref原始值的响应式'
                    }
                  ]
                },
                {
                  text: 'renderer',
                  items: [
                    {
                      text: '初始化组件实例过程',
                      link: '/前端进阶/vue3/设计和原理/renderer/初始化组件实例过程'
                    },
                    {
                      text: '渲染器的设计',
                      link: '/前端进阶/vue3/设计和原理/renderer/渲染器的设计'
                    },
                    {
                      text: '组件渲染成DOM的过程',
                      link: '/前端进阶/vue3/设计和原理/renderer/组件渲染成DOM的过程'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      '/前端进阶/vue2': [
        {
          text: 'vue2',
          items: [
            {
              text: '异步更新和nextTick',
              link: '/前端进阶/vue2/异步更新和nextTick'
            },
            { text: 'Vue-Cli使用说明', link: '/前端进阶/vue2/Vue-Cli使用说明' },
            { text: 'Vue高级特性', link: '/前端进阶/vue2/Vue高级特性' },
            {
              text: 'Vue和React横向对比',
              link: '/前端进阶/vue2/Vue和React横向对比'
            },
            { text: 'vue原理', link: '/前端进阶/vue2/vue原理' },
            {
              text: 'Vue中的渲染函数&JSX',
              link: '/前端进阶/vue2/Vue中的渲染函数&JSX'
            },
            { text: 'Vue中key的作用', link: '/前端进阶/vue2/Vue中key的作用' },
            { text: 'Vue组件', link: '/前端进阶/vue2/Vue组件' }
          ]
        }
      ],
      '/前端进阶/ts': [
        {
          text: 'ts',
          items: [
            { text: '介绍', link: '/前端进阶/ts/介绍' },
            { text: '类型', link: '/前端进阶/ts/类型' },
            { text: '类型工具', link: '/前端进阶/ts/类型工具' },
            { text: '实战', link: '/前端进阶/ts/实战' },
            { text: '常用配置', link: '/前端进阶/ts/常用配置' },
            { text: '编写声明文件', link: '/前端进阶/ts/编写声明文件' }
          ]
        }
      ],
      '/前端进阶/nuxt': [
        {
          text: 'nuxt',
          items: [
            { text: 'nuxt服务端渲染', link: '/前端进阶/nuxt/nuxt服务端渲染' }
          ]
        }
      ],
      '/前端进阶/性能优化': [
        {
          text: '性能优化',
          items: [
            {
              text: '如何提升用户体验',
              link: '/前端进阶/性能优化/如何提升用户体验'
            },
            { text: '性能优化', link: '/前端进阶/性能优化/性能优化' },
            {
              text: 'webpack打包优化',
              link: '/前端进阶/性能优化/webpack打包优化'
            }
          ]
        }
      ],
      '/前端进阶/前端架构': [
        {
          text: '前端架构',
          items: [
            { text: '对BFF的理解', link: '/前端进阶/前端架构/对BFF的理解' },
            { text: '函数式编程', link: '/前端进阶/前端架构/函数式编程' },
            { text: '跨平台方案', link: '/前端进阶/前端架构/跨平台方案' },
            {
              text: '大仓库',
              items: [
                { text: 'lerna', link: '/前端进阶/前端架构/大仓库/lerna' }
              ]
            }
          ]
        }
      ],
      '/前端进阶/网络请求': [
        {
          text: '网络请求',
          items: [
            {
              text: 'http',
              items: [
                { text: 'http协议', link: '/前端进阶/网络请求/http/http协议' }
              ]
            },
            { text: '本地域名映射', link: '/前端进阶/网络请求/本地域名映射' },
            { text: '跨域解决方案', link: '/前端进阶/网络请求/跨域解决方案' },
            {
              text: '跨域资源共享cors',
              link: '/前端进阶/网络请求/跨域资源共享cors'
            }
          ]
        }
      ],
      '/前端进阶/前端业务': [
        {
          text: '前端业务',
          items: [
            { text: '权限控制', link: '/前端进阶/前端业务/权限控制' },
            {
              text: '压缩文件并下载',
              link: '/前端进阶/前端业务/压缩文件并下载'
            },
            {
              text: '各种业务解决方案',
              link: '/前端进阶/前端业务/各种业务解决方案'
            },
            {
              text: '系统选择文件弹窗',
              link: '/前端进阶/前端业务/系统选择文件弹窗/'
            }
          ]
        }
      ],
      '/前端进阶/安全': [
        {
          text: '安全',
          items: [
            { text: '加密和签名', link: '/前端进阶/安全/加密和签名' },
            { text: 'CSP内容安全策略', link: '/前端进阶/安全/CSP内容安全策略' },
            { text: 'CSRF和XSS', link: '/前端进阶/安全/CSRF和XSS' }
          ]
        }
      ],
      '/前端进阶/动画': [
        {
          text: '动画',
          items: [{ text: 'css动画', link: '/前端进阶/动画/css动画' }]
        }
      ],
      '/前端进阶/库': [
        {
          text: '库',
          items: [
            { text: 'lodash常用函数', link: '/前端进阶/库/lodash常用函数' },
            { text: 'VueUse快速上手', link: '/前端进阶/库/VueUse快速上手' }
          ]
        }
      ],
      '/前端进阶/手写代码': [
        {
          text: '手写代码',
          items: [
            { text: '写代码小技巧', link: '/前端进阶/手写代码/写代码小技巧' },
            { text: 'js小技巧', link: '/前端进阶/手写代码/js小技巧' }
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
                {
                  text: '什么是预构建',
                  link: '/前端工程化/构建/vite/什么是预构建'
                },
                {
                  text: 'plugin-legacy插件',
                  link: '/前端工程化/构建/vite/plugin-legacy插件'
                },
                {
                  text: '如何做到冷启动、热更快',
                  link: '/前端工程化/构建/vite/如何做到冷启动、热更快'
                }
              ]
            },
            {
              text: 'webpack',
              items: [
                { text: '介绍', link: '/前端工程化/构建/webpack/介绍' },
                {
                  text: '热更新原理',
                  link: '/前端工程化/构建/webpack/热更新原理'
                },
                { text: 'Loader', link: '/前端工程化/构建/webpack/Loader' }
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
        }
      ],
      '/程序员储备/正则': [
        {
          text: '正则',
          items: [
            { text: '学习正则表达式', link: '/程序员储备/正则/学习正则表达式' },
            { text: '正则mini书笔记', link: '/程序员储备/正则/正则mini书笔记' }
          ]
        }
      ],
      '/程序员储备/设计模式': [
        {
          text: '设计模式',
          items: [{ text: '设计模式', link: '/程序员储备/设计模式/设计模式' }]
        },
        {
          text: '架构',
          items: [
            { text: '洋葱圈架构', link: '/程序员储备/设计模式/洋葱圈架构' }
          ]
        }
      ],
      '/程序员储备/算法': [
        {
          text: '算法',
          items: [
            { text: '基础算法', link: '/程序员储备/算法/基础算法' },
            { text: '算法深入', link: '/程序员储备/算法/算法深入' }
          ]
        }
      ],
      '/程序员储备/浏览器': [
        {
          text: '浏览器',
          items: [
            {
              text: '谷歌浏览器开发者工具',
              link: '/程序员储备/浏览器/谷歌浏览器开发者工具'
            },
            {
              text: '浏览器渲染机制',
              link: '/程序员储备/浏览器/浏览器渲染机制'
            },
            { text: 'BOM', link: '/程序员储备/浏览器/BOM' },
            { text: 'DOM事件总结', link: '/程序员储备/浏览器/DOM事件总结' },
            {
              text: 'V8引擎的垃圾回收',
              link: '/程序员储备/浏览器/V8引擎的垃圾回收'
            }
          ]
        }
      ],
      '/程序员储备/开发语言': [
        {
          text: '开发语言',
          items: [
            {
              text: 'shell脚本编写',
              link: '/程序员储备/开发语言/shell脚本编写'
            },
            {
              text: 'MarkDown',
              items: [
                {
                  text: 'markdown语法',
                  link: '/程序员储备/开发语言/MarkDown/markdown语法'
                },
                {
                  text: 'markdown转html',
                  link: '/程序员储备/开发语言/MarkDown/markdown转html'
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
      ],
      '/生活/': [
        {
          text: '积累',
          items: [
            { text: '沟通', link: '/生活/积累/沟通' },
            { text: '良句', link: '/生活/积累/良句' }
          ]
        },
        {
          text: '书籍',
          items: [
            { text: '超级闲聊术', link: '/生活/书籍/超级闲聊术' },
            { text: '金字塔原理', link: '/生活/书籍/金字塔原理' },
            { text: '刻意练习', link: '/生活/书籍/刻意练习' },
            { text: '亲密关系', link: '/生活/书籍/亲密关系' },
            { text: '人生的智慧', link: '/生活/书籍/人生的智慧' },
            { text: '如何阅读一本书', link: '/生活/书籍/如何阅读一本书' },
            { text: '小狗钱钱', link: '/生活/书籍/小狗钱钱' }
          ]
        },
        {
          text: '随想',
          items: [
            {
              text: '催眠自己去跑步的文章',
              link: '/生活/随想/催眠自己去跑步的文章'
            },
            { text: '零碎想法', link: '/生活/随想/零碎想法' },
            { text: '小事记录', link: '/生活/随想/小事记录' }
          ]
        },
        {
          text: '心理学',
          items: [{ text: '需求层次理论', link: '/生活/心理学/需求层次理论' }]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wenfujie/document-library' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 6],
      label: '大纲'
    }
  }
})
