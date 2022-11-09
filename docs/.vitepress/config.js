export default {
    title: 'Vue-source-read',
    description: '个人vue3设计与实现阅读笔记',
    themeConfig: {
        logo: '/logo.jpeg',
        sidebar: [
            {
                text: '响应系统',
                items: [
                    {text: '初识', link: '/reactive/hello', next: 'reactiveData'},
                    {text: '响应式数据', link: '/reactive/reactiveData', next: 'firstReactive'},
                    {text: '简单的响应系统', link: '/reactive/firstReactive'},
                    {text: '副作用的收集', link: '/reactive/effectBucket'},
                    {text: '分支切换与cleanup', link: '/reactive/cleanup'},
                    {text: '嵌套的effect与effect栈', link: '/reactive/effectStack'},
                    {text: '避免无限循环', link: '/reactive/noInfinityFor'},
                    {text: '调度执行', link: '/reactive/scheduler'},
                    {text: 'computed与lazy', link: '/reactive/computed'},
                    {text: 'watch的实现原理', link: '/reactive/watch'},
                ]
            },
            {
                text: '拓展',
                items: [
                    {text: 'WeakMap', link: '/extend/WeakMap'},
                    {text: 'Set的forEach与Array的forEach', link: '/extend/forEach'},
                ]
            },
            {
                text: '思考',
                items: [
                    {
                        text: '思考-20220906',
                        link: '/think/think-20220906'
                    }
                ]
            }
            
        ]
      }
  }