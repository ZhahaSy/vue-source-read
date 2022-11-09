# 副作用的收集
## 多个数据源，不同属性 如何监听

[WeakMap](/extend/WeakMap.md)

> 点外卖，有副作用。但是如果李总长高了，我们不需要触发监听，但是现在的系统是会触发的.
如果想设计一个完整的 响应系统，只考虑一个数据肯定是不可行的。
![alt](./images/%E5%89%AF%E4%BD%9C%E7%94%A8%E5%87%BD%E6%95%B0%E5%AD%98%E5%82%A8%E6%A1%B6.jpg)

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


const buckect = new WeakMap();

// 追踪
const track = (target, key) => {
    // 收集副作用
    if (!activeEffect) return target[key];

    let depsMap = buckect.get(target)

    if (!depsMap) {
        buckect.set(target, (depsMap = new Map()))
    }

    let deps = depsMap.get(key)

    if (!deps) {
        depsMap.set(key, deps = new Set());
    }

    deps.add(activeEffect)
}
// 触发
const trigger = (target, key) => {
    // 触发副作用
    const depsMap = buckect.get(target);

    if(!depsMap) return;

    const effects = depsMap.get(key);

    effects && effects.forEach(fn => fn())
}


const data = new Proxy(lizong, {
    get: (target, key) => {
        // 当代理数据的某个值被读取的 时候，触发这个方法
        track(target, key)

        return target[key];
    },
    set: (target, key, newValue) => {
        // 当代理数据的某个值被修改的时候，触发这个方法
        target[key] = newValue;

        trigger(target, key)
    }
})

const yao = () => {
    console.log('遥妹听到了', data.doing)
    return data.doing
}

const li = () => {
    const oldHeight = 180;
    if (oldHeight < data.height) {
        console.log('李总：我长高了呀')
    }
}

let activeEffect;

const effect = (fn) => {
    activeEffect = fn
    fn()
}

effect(yao)

effect(li)

setTimeout(() => {
    data.height = 200 // height 被修改了
},3000)

data.doing = '点外卖' // doing 被修改了

```
