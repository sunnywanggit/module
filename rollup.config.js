module.exports = {
  input: "./src/index.js",
  output: [
    {
      // dir: './dist',
      file: "./dist/index-cjs.js",
      format: "cjs",
    },
    {
      // dir: './dist',
      file: "./dist/index-amd.js",
      format: "amd",
    },
    {
      // dir: './dist',
      file: "./dist/index-esm.js",
      format: "es",
    },
    // not support code spliting 打包出来的东西都在一个文件里面，所以不能做代码分割
    // {
    //   dir: './dist/iife',
    //   // file: "./dist/index-iife.js",
    //   format: "iife",
    // },
    // {
    //   dir: './dist/umd',
    //   // file: "./dist/index-umd.js",
    //   format: "umd",
    //   name: 'res'
    // }
  ],
  // plugins,
};
