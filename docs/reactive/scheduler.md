# 可调度性

当trigger触发副作用重新执行时，有能力决定副作用函数的执行时机，执行次数和执行方式

通俗一点，还拿点外卖举例子。 我们之前实现的系统里，只有李总是饿了 就直接点外卖了。但是这个动作，其实需要一些触发的时机。比如，在上午11点左右，而且不忙，这些外部条件控制着李总什么时候可以点外卖。但是我们现在的响应系统中还不存在这个功能。
这个根据外部条件去控制具体响应式执行的行为，在响应式系统中就是可调度性。


## 效果

为 effect函数设计一个 选项参数 opitons，用户可以指定调度器。
```JavaScript
data.doing = '点外卖'
// options
effect({
    // 调度器是一个函数
    scheduler(fn) {
        const timeout = setInterval(() => {
            // 伪代码，别骂
            if (time === '12:00') {
                fn();
                clearInterval(timeout)
            }
        }, 60 * 1000,);
    }  
})
```
## 怎么做呢？
```JavaScript
const effect = (fn, options) => {
    // deps
    const effectFn = () => {
        cleanup(effectFn);

        activeEffect = effectFn;

        effectStack.push(effectFn);
        fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
    }
    effectFn.options = options; //新增
    effectFn.deps = [];
    effectFn();
}

const trigger = (target, key) => {
    // 触发副作用
    const depsMap = buckect.get(target);

    if(!depsMap) return;

    const effects = depsMap.get(key);

    effects && effects.forEach(fn => {
        if (fn.options.scheduler) { // 新增
            fn.options.scheduler(fn) // 新增
        } else {
            fn()
        }
    })
}
```

# 响应次数
上面实现了一个最基础的调度器。之前提到还可以控制响应次数。

## 实际场景。
```JavaScript
effect(() => {
    console.log(obj.foo);
});

obj.foo++;
obj.foo++;
```
执行结果为
```
1
2
3
```

但是我们在实际场景中并不关注过程，只关注结果，所以第二次执行是没有意义的。

我们期待的结果是
```
1
3
```

## 解决方案
基于调度器，我们可以创建一个任务执行队列。用来去重重复的副作用。并在微队列中添加一个微任务用于等待所有主任务及宏队列任务执行完成，最后执行这个微任务

```JavaScript
const jobQueue = new Set();
// 用于把任务添加到微任务队列中
const p = Promise.resolve();

let isFlushing = false;

function flushJob() {
    if (isFlushing) return

    isFlushing = true;

    p.then(() => {
        jobQueue.forEach(job => job())
    }).finally(() => {
        isFlushing = false;
    })
}

effect(() => {
    console.log(obj.foo);
}, {
    scheduler(fn) {
        jobQueue.add(fn);

        flushJob()
    }
});

```
其实我们在使用vue 的时候，就可以发现。当我们对一个响应式数据进行修改，且这个修改是在同一个method中时。最终只会在最后一次更新的 时候触发。但是其实 在响应数据那里有一个更完整的实现，但是实现思路和这个一样

