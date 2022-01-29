# CMJ

文件是一个模块，私有。内置两个变量 module require (exports = module.exports)

exports 其实就等于 module.exports ，这个其实就是在转化成 IFFE 的时候在最上面写了 exports = module.exports

所以当你在写 export 等于另外一个东西的时候，这个引用关系就断了。

一个引入一个导出，就构成了通信的基本结构

## 需要注意的两个问题

1. 缓存，require 会缓存一下，所以

```js
// a.js
var name = 'morrain'
var age = 18
exports.name = name
exports.getAge = function(){
    return age
}
// b.js
var a = require('a.js') // 会把引入的对象缓存起来
console.log(a.name) // 'morrain'
a.name = 'rename'
var b = require('a.js') // 第二次引用的时候会把第一次缓存的对象抛给你
console.log(b.name) // 'rename'
```

2. 引用拷贝还是值拷贝的问题(CMJ 是值拷贝)

```js
// a.js
var name = 'morrain'
var age = 18
exports.name = name
exports.age = age
exports.setAge = function(a){
    age = a
}
// b.js
var a = require('a.js')
console.log(a.age) // 18
a.setAge(19)
console.log(a.age) // 18
```

3. 运行时加载 / 编译时加载（多阶段，异步）ESM

cms 运行时加载，因为函数最终要变成一个文件执行，

esm 是静态分析的，也就是编译时加载-> 决定了几个特性-> import 一定是会有提升的，所以通常我们被要求 import 写在最上面；里面是不能写表达式的，你不可能 import 一个变量；因为是静态编译，所以我们可以知道哪些东西是使用了的，哪些东西是内有使用的，这个东西可以做 tree shaking；
1.分析所有文件的 import export default，构建出依赖图
2.图上的每一个节点会构建出一个module.record 这样的一个记录，记录了这个文件的一些基本的信息还有对应的内存地址


循环依赖？

这个自己下来再好好理解一下。01:58:15