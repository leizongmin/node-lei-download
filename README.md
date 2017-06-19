[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/lei-download.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lei-download
[travis-image]: https://img.shields.io/travis/leizongmin/node-lei-download.svg?style=flat-square
[travis-url]: https://travis-ci.org/leizongmin/node-lei-download
[coveralls-image]: https://img.shields.io/coveralls/leizongmin/node-lei-download.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/leizongmin/node-lei-download?branch=master
[david-image]: https://img.shields.io/david/leizongmin/node-lei-download.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/node-lei-download
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/lei-download.svg?style=flat-square
[download-url]: https://npmjs.org/package/lei-download
[license-image]: https://img.shields.io/npm/l/lei-download.svg

# lei-download

## 安装

模块安装方法（支持 TypeScript）：

```bash
$ npm install lei-download --save
```

**download** 命令安装方法：

```bash
$ npm install lei-download -g
```

## 模块使用方法

```javascript
'use strict';

const download = require('lei-download');

const source = '一个URL或者本地文件名';
const target = '要存储到的本地位置，null|false|undefined表示自动生成一个临时文件';
// 用于获取进度通知的函数，可以省略
const progress = (size, total) => console.log(`进度：${ size }/${ total }`);

download(source, target, progress, (err, filename) => {
  if (err) console.log(`出错：${ err }`);
  else console.log(`已保存到：${ filename }`);
});
```

## 命令使用方法

```bash
$ download <一个URL或者本地文件名> [要存储到的本地位置]
```

比如：

```bash
$ download http://avatars.githubusercontent.com/u/841625 logo.png
```

其中存储位置可省略。

## 授权协议

```
The MIT License (MIT)

Copyright (c) 2014-2017 Zongmin Lei <leizongmin@gmail.com>
http://ucdok.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

