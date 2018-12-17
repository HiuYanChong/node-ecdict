# node-ecdict

Node.js Interface for ECDICT

## 简介

提供了一个英汉字典 node 查询接口，
数据库为 [skywind3000/ECDICT](https://github.com/skywind3000/ECDICT)       
查询所得字段含义与引用的数据库保持完全一致

## 使用方法

```bash
npm install --save node-ecdict
```

```js
const { search } = require('node-ecdict');
search('test')
  .then(result => {
    console.log(result);
  })
```

## License

MIT