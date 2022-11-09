# 数组forEach 与 Set forEach 的区别

## [数组forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

在执行第一个回调之前就确定了forEach的范围，后续就算数组长度增加，也不会修改

## [Set forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)

在每一次callback执行完成后，都会重新获取一下元素长度