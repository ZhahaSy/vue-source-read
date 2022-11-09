# [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)


### what
> WeakMap 对象是一组键/值对的集合，其中的键是<b>弱引用</b>的。其键必须是对象，而值可以是任意的。
### 注意
> WeakMap 的 key **只能是 Object 类型**。 原始数据类型 是不能作为 key 的（比如 Symbol）。


## Why WeakMap?
选择 WeakMap 最关键的原因就是 因为它的键是 弱引用的。等到 他的表达式被执行完后，会被垃圾回收掉。

根据这个特性可知，一旦key 被垃圾回收器回收，那么对应的键和值就访问不到了。

## Where
WeakMap经常用于存储那些只有当key所引用的对象存在时（没有被回收）才有价值的信息。例如我们之前的例子，如果target对象没有任何引用了，说明用户侧是不需要的，就会进行垃圾回收。
但是使用Map就算没有引用，也不会回收，最终可能会导致内存溢出


```JavaScript
// 举个🌰
const map = new Map();

const weakMap = new WeakMap();

(function() {
    const foo = { foo: 1 };
    const bar = {bar: 1};
    map.set(foo, 1)
    weakMap.set(bar, 1)
})();
console.log(map.size); // 1
console.log(weakMap.size); // undefined
```

## 延伸一下
#### js [垃圾回收机制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management#garbage_collection)







