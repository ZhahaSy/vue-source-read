# 嵌套的effect与effect栈

## vue的生命周期钩子
![vue的生命周期](./images/lifecycle.png)

### 父子组件的生命周期呢？？？
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted->父beforeUpdate->子beforeUpdate->子updated->父updated->父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## 嵌套的场景

为啥要先聊一下生命周期呢。其实是为了更好的理解下面这个案例。

一个组件中，嵌套了另一个组件。外部组件变更，内部组件也会变更，且触发按照从内到外的顺序执行副作用。

```JavaScript
const Foo = {
    render() {
        return ....
    }
}

const Bar = {
    render() {
        return ....
    }
}

effect(() => {
    effect(() => {
        Bar.render()
    })
    Foo.render
})
```
#### 把上面的逻辑改造的简单一点就是下面这样

```JavaScript
const data = {
    foo: '1',
    bar: '1'
}

const obj = new Proxy(data, {
    /*****/
})
let temp1, temp2
effect(() => {
    console.log('父组件更新了')
    effect(() => {
        console.log('子组件更新了')
        temp2 = obj.bar
    })
    temp1 = obj.foo
})

obj.foo = '2'
```

## 期待的效果 
就是父组件更新，子组件会随之更新，最后更新父组件
```JavaScript
// hope
父组件更新了
子组件更新了
父组件更新了
子组件更新了
```


## 现在的响应式逻辑会怎样？

```JavaScript
// result
父组件更新了
子组件更新了
子组件更新了
```

## 解决方案
<b>原因很简单：问题出在activeEffect 和 effect函数上。</b>
当副作用在 首次触发track，把副作用放到桶里时，由于每次触发都会触发子的副作用方法调用，就会把activeEffect修改为最后一个。所以我们每个key其实绑定的都是最里层的副作用。但是真正在修改后触发trrigger其实执行的 也是里面的副作用，而且就算再次触发依赖收集，收集的还是里面的依赖。

解决方案就是：创建一个副作用栈。在副作用执行的时候把副作用函数压到栈里，执行完成，就弹出栈。并且始终把activeEffect指向正在执行的函数。
```JavaScript
let effectStack = [];// 用数组表示栈 数组的最后一个元素，表示栈顶 使用 push 入栈， pop出栈

const effect = (fn) => {
    // deps
    const effectFn = () => {
        cleanup(effectFn);

        activeEffect = effectFn;

        effectStack.push(effectFn);
        fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
    }
    effectFn.deps = [];
    effectFn();
}
```
