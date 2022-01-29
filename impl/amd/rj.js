const def = new Map();

// AMD mini impl

// 默认配置
const defaultOptions = {
  paths: ''
}

// From CDN
const __import = (url) => {
  return new Promise((resove, reject) => {
    System.import(url).then(resove, reject)
  })
}

// normal script
const __load = (url) => {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    const node = document.createElement('script');
    node.type = 'text/javascript';
    node.src = url;
    node.async = true;
    node.onload = resolve;
    node.onerror = reject;
    head.appendChild(node)
  })
}

rj = {};

// 默认 config 就是配置 CDN 的依赖
rj.config = (options) => Object.assign(defaultOptions, options);

// 定义模块，触发的时机其实是在 require 的时候，所以我们只需要收集一下即可
define = (name, deps, factory) => {
  // todo 参数的判断，互换
  // 执行收集操作，找个地方先存起来
  def.set(name, { name, deps, factory });
}

// dep -> a -> a.js -> 'http:xxxx/xx/xx/a.js';
const __getUrl = (dep) => {
  const p = location.pathname;
  const temp = p.slice(0, p.lastIndexOf('/')) + '/' + dep + '.js';
  return temp;
}

// 其实才是触发加载依赖的地方
/**
 * @description require 方法实现
 * @param {Array} deps 要加载的模块
 * @param {Function} factory 要被执行的函数
 */
require = (deps, factory) => {
  return new Promise((resolve, reject) => {
    Promise.all(deps.map(dep => {
      // 走 CDN
      if (defaultOptions.paths[dep]) return __import(defaultOptions.paths[dep]);

      return __load(__getUrl(dep)).then(() => {
        const { deps, factory } = def.get(dep);
        if (deps.length === 0) return factory(null);
        return require(deps, factory)
      })
    })).then(resolve, reject)
  })
  .then(instances => {
    console.log('instances', instances)
    return factory(...instances)
  })
}




