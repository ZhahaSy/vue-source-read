# 实现一个简单的响应系统
## get和set 里到底要做些什么呢？
```JavaScript
const lizong = {
        height: 180,
        weight: 120,
        gender: 'man',
        motto: '向前一步',
        hobby: [
            '吃',
            '跑步',
            '学习'
        ],
        doing: ''
    }
    

    const effectList = new Set();
    

    const data = new Proxy(lizong, {
        get: (target, key) => {
            // 当代理数据的某个值被读取的 时候，触发这个方法
            // 收集副作用
            console.log(key, '被读取了');
            // console.log(activeEffect, 'activeEffect');
            // console.log(effectList, 'effectList');
            effectList.add(activeEffect)
            return target[key];
        },
        set: (target, key, newValue) => {
            // 当代理数据的某个值被修改的时候，触发这个方法
            // 触发副作用
            console.log(key, '被修改了');
            target[key] = newValue;
            effectList.forEach(fn => fn())
            return target[key]
        }
    })

    const yao = () => {
        if (data.doing === '点外卖') {
            console.log('我要吃') 
        }
    }
    const dong = () => {
        if (data.doing === '点外卖') {
            console.log('我不饿') 
        }
    }
    const fang = () => {
        if (data.doing === '点外卖') {
            console.log('我吃减脂餐') 
        }
    }
    const zhang = () => {
        if (data.doing === '点外卖') {
            console.log('我要吃东北菜') 
        }
    }

    let activeEffect;

    const effect = (fn) => {
        activeEffect = fn
        fn()
    }

    effect(yao)
    effect(dong)
    effect(fang)
    effect(zhang)

    // data.gender // genter被读取了
    // data.height = 200 // height 被修改了
    data.doing = '点外卖' // doing 被修改了
```
### 到这里，我们已经实现了一个最简单的 响应式系统。副作用


这样会导致一个问题，单个副作用方法被多次收集导致重复触发， 解决方案是把收集副作用的数组改为Set对象，用于去重
```JavaScript
const effectList = new Set(); //修改

const data = new Proxy(lizong, {
    get: (target, key) => {
        // 当代理数据的某个值被读取的 时候，触发这个方法
        // 收集副作用
        
        effectList.add(activeEffect) //修改
        return target[key];
    },
    set: (target, key, newValue) => {
        // 当代理数据的某个值被修改的时候，触发这个方法
        // 触发副作用
        console.log(key, '被修改了');
        target[key] = newValue;
        effectList.forEach(fn => fn())
    }
})

```

### 有什么疑问吗？？？

### 接下来的几个章节会基于上面的副作用系统，做一些特殊逻辑的处理，尽情期待～～
