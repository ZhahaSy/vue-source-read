# computed

## 目标
```js

/**
 * 调用 computed方法，传递一个回调，当回调中使用的值发生变换，重新执行回调。更新返回的ref值， 返回一个 ref的值。
 * getters
 * return  Ref<T>
*/

import computed from '../src/computed.js';
import {Reactive, effect} from '../src/index.js';

const data = {
    count: 0
}

const obj = Reactive(data)

// 通过computed方法对 一个响应式数据进行计算
const computedCount = computed(() => {
    const result = obj.count + 'count'
    return result
})



effect(() => {
    console.log(computedCount.value, 'effect');
})
obj.count++
```


## 拆分功能
1. computed 生成的也是一个 响应式的数据，既然是响应式数据，就要考虑 get与 set的操作
2. computed 所计算出来的值，应该是一个 Ref<T>

3. 

```js
function computed(fn) {
    // 真正fn 调用所返回的数据
    let value;

    // 计算属性所依赖的值 是否发生变化的标识（默认需要计算一次）
    let dirty = true;

    // 对计算属性所依赖的数据 进行副作用绑定，并存储 副作用方法， 
    // 当计算属性 被 get 时，重新执行这个方法 重新添加计算属性 的 副作用方法并获取真正的 副作用值
    const effctFn = effect(fn, {
        // 计算属性所依赖的数据 的 副作用方法是否默认执行
        lazy:  true,
        // 计算属性所依赖的数据发生变化时的自定义操作
        scheduler: function() {
            // 1. 重置dirty 标志位（标识 计算属性回调需要 重新计算）
            dirty = true
            // 2. 触发 计算属性 的 副作用方法
            trigger(result, 'value')
        }
    })

    // 计算属性方法调用所返回的 ref 对象
    const result = {
        // 当数据被 get 时，调用 get value 方法
        get value () {
            // 当计算数据所依赖的 数据发生变化时， 重新执行effectFn 方法，更新 计算属性值
            if (dirty) {
                // 为什么要用effectFn 而不是直接执行 fn？
                // 因为
                value = effctFn()
                // 把 dirty 标志位改为 已经是最新的状态
                dirty = false
            }
            // 收集 result 方法 的 effect 方法依赖
            track(result, 'value')
            return value
        }
    }
    return result
}
```

2. get：


