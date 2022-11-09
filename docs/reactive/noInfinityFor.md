# 避免循环调用

## 场景
```JavaScript
const li = {
    runMileage: 0
}

const data = new Proxy({/*....*/})

effect(() => {
    data.runMileage++
})
```
> 执行会发现, 最终会导致内存溢出
## 问题原因
首先读取 runMileage，在track中，把这个副作用收集到 桶 里； 然后把这个值 +1 又会触发 trigger方法，然后又把刚收集的副作用调用。接着再出发读取，---> 收集 ---> trigger ---> track

就这样递归调用，直到栈溢出

## 解决方案
#### 如果trigger 中获取到的 副作用方法与正在执行的 副作用方法是一个，就不触发执行
```JavaScript
const li = {
    runMileage: 0
}

const trigger = (target, key) => {
    console.log('set',key)
    // 触发副作用
    const depsMap = buckect.get(target);
    if(!depsMap) return;
    const effects = depsMap.get(key);

    const effectToRun = new Set() // 新增

    // 但是这样不是会导致一直调用吗？ cleanup当时解决的问题
    // 不会，因为当时clean那个案例会导致的问题因为遍历之后，直接执行了副作用，导致的effects 导致的副作用长度变更

    effects && effects.forEach(effectFn => { // 新增
        if (effectFn !== activeEffect) {
            effectToRun.add(effect)
        }
    })
    effectToRun.forEach(fn => fn()) 
}

const data = new Proxy({/*....*/})

effect(() => {
    data.runMileage++
})
```
