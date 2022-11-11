# 分支切换 和 cleanup

> 分支切换: 在一个副作用函数中，判断条件的变换，导致的副作用函数执行所依赖的响应数据切换


之前的案例中，副作用是最直接的读取，没有额外的逻辑处理。如果是下面的场景，还可以正常运行吗

```JavaScript
// 李总新增了 isHungry
const lizong = {
    gender: 'man',
    motto: '向前一步',
    isHungry: true,
    doing: '点外卖'
}
// 李总自己的副作用函数
// 李总饿了 就点外卖
// 李总不饿 就随便吧，最好 出去吃（别问我为啥，实在想不到更好的案例了😂）
const li = () => {
    const result = data.isHungry ? data.doing : '出去吃'
    console.log('effect li')
} // isHungry doing? | isHungry

effect(li)

data.isHungry = false;


data.doing = '随便吧'
// change end

```

![运行代码结果](../images/effect-%E5%88%86%E6%94%AF%E5%88%87%E6%8D%A2%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C.jpg)

执行上面会发现，在我们修改完 isHungry为false 后，修改doing属性，依旧调用了li这个副作用。但是，isHungry为false 后，不期望触发副作用，因为并没有在副作用中使用doing。

解决方案为：在每一次副作用方法执行前，会先把所有与之关联的依赖集合，清除掉，等到执行完成后，会重新建立联系，而新的关联关系中，不会包含遗留的副作用函数

```JavaScript
const track = (target, key) => {
    console.log('get',key)
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

    activeEffect.deps.push(deps) // 新增
}
// 触发
const trigger = (target, key) => {
    console.log('set',key)
    // 触发副作用
    const depsMap = buckect.get(target);

    if(!depsMap) return;

    const effects = depsMap.get(key);

    effects && effects.forEach(fn => fn()) // 会导致无限循环
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

let activeEffect;

// 新增
const cleanup = (effectFn) => {
    for (let i = 0; i < effectFn.deps.length; i++) {
        const depsMap = effectFn.deps[i] // 这个depsMap 是当执行track时，存储的key 的 Set集合
        depsMap.delete(effectFn); // 删除Set集合中的 当前副作用方法
    }
    effectFn.deps.length = 0
}

const effect = (fn) => {
    // deps
    const effectFn = () => {// 新增
        cleanup(effectFn) // 新增
        activeEffect = effectFn
        fn()
    }
    effectFn.deps = [];// 新增
    effectFn()    // 新增
}
```

修改之后，执行会发现，会陷入死循环。 原因在于，每次触发 trigger之后，都会cleanup，而cleanup之后，<b style="color: red">执行副作用</b>，都会重新在Set中添加一个新的会重新在 副作用List 中 添加一个新的副作用。 而Set的forEach 循环会在每次callback执行完成之后重新获取一下长度。然后重新访问这个副作用函数。

解决方案就是，在trigger方法执行副作用之前，构造一个新的 Set 集合，然后遍历这个新的集合。
```JavaScript
// 触发
const trigger = (target, key) => {
    console.log('set',key)
    // 触发副作用
    const depsMap = buckect.get(target);
    if(!depsMap) return;
    const effects = depsMap.get(key);

    const effectToRun = new Set(effects) // 新增 防止无限循环
    effectToRun.forEach(fn => fn()) // 新增 防止无限循环
}
```

拓展：[forEach](/extend/forEach)

ToDO：之前的 ForEach总结的与书上说的不一样