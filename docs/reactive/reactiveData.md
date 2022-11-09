# 响应式数据
> 类比到数据上，其实就是这个数据能通知别人我有变化，也要知道这个数据谁会更新

具体的方法vue2 和vue3 有区别

  ### [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) @vue3
    
    生成一个代理对象，当代理数据发生变更时，会触发代理数据的 set方法；当代理数据被读取时，会触发代理数据的 get方法（我自己写的）。
    
    Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

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
        obj: {
            name: '123'
        },
        doing: ''
    };
    
    function reactive(target) {
        // Object.keys(target).forEach(key => {
        //     if (typeof target[key] === 'object') {
        //         reactive(target[key])
        //     }
        // });
        return new Proxy(target, {
            get: (target, key) => {
                // 当代理数据的某个值被读取的 时候，触发这个方法
                // 收集副作用
                console.log(key, '被读取了');
                if (typeof target[key] === 'object') {
                    reactive(target[key]);
                }
                return target[key];
            },
            set: (target, key, newValue) => {
                // 当代理数据的某个值被修改的时候，触发这个方法
                // 触发副作用
                console.log(key, '被修改了');
                target[key] = newValue;
            }
        })
    };

    const data = reactive(lizong)

    
    data.gender // genter被读取了
    data.height = 200 // height 被修改了
```


  ### [Object.definedProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) @vue2
    
    修改/增加一个对象的属性(直接对用户所生成的 源数据进行操作) (我自己写的)

    会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。（MDN）
```JavaScript
    let lizong = {
        height: 180,
        weight: 120,
        gender: 'man',
        motto: '向前一步',
        hobby: [
            '吃',
            '跑步',
            '学习'
        ]
    }

    const data = {
        lizong,
    }
    // 由于Object.defineProperty 方法只可以监听某个对象的属性,所以需要把李总用data包起来
    function observe(data) {
        if (typeof data !== 'object') return
        // 调用Observer
        new Observer(data)
    }

    class Observer {
        constructor(value) {
            this.value = value
            this.walk()
        }
        walk() {
            // 遍历该对象，并进行数据劫持
            Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
        }
    }

    function defineReactive(data, key, value = data[key]) {
        // 如果value是对象，递归调用observe来监测该对象
        // 如果value不是对象，observe函数会直接返回
        observe(value)
        Object.defineProperty(data, key, {
            get: function reactiveGetter() {
                // 当数据的某个值被读取的 时候，触发这个方法
                console.log(key, '被读取了');
                return value
            },
            set: function reactiveSetter(newValue) {
                if (newValue === value) return
                // 当数据的某个值被修改的时候，触发这个方法
                console.log(key, '被修改了');
                value = newValue
                observe(newValue) // 设置的新值也要被监听
            }
        })
    }

    observe(data)

    data.lizong.height
    data.lizong.height = 200
    
```
TODO: vue2 与 vue3 的区别