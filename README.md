# node-ecdict

Node.js Interface for ECDICT

[![npm version](https://img.shields.io/npm/v/node-ecdict.svg)](https://www.npmjs.com/package/node-ecdict) [![Build Status](https://travis-ci.org/HiuYanChong/node-ecdict.svg?branch=master)](https://travis-ci.org/HiuYanChong/node-ecdict) [![codecov](https://codecov.io/gh/HiuYanChong/node-ecdict/branch/master/graph/badge.svg)](https://codecov.io/gh/HiuYanChong/node-ecdict)

## 简介

提供了一个英汉字典 node 查询接口，
数据库为 [skywind3000/ECDICT](https://github.com/skywind3000/ECDICT)       
查询所得字段含义与引用的数据库保持完全一致

## 使用方法

```bash
npm install --save node-ecdict
```

```js
const { search, batchSearch } = require('node-ecdict');
search('test')
  .then(result => {
    console.log(result);
  });

batchSearch(['test', 'nothing', 'asjlfdjal'])
  .then(result => {
    console.log(result); // result is an Array
  });
```

## License

MIT