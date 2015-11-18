lei-download
=================

下载或复制文件

```javascript
var download = require('download');

var url = 'https://www.npmjs.com/static/images/npm-logo.png';
var target = __dirname + '/logo.png';
download(url, target, function (downloadSize, totalSize) {
  // downloadSize为已下载的文件字节数
  // totalSize为文件总字节数，为null表示无法获取
  // 此函数可省略
}, function (err, filename) {
  if (err) throw err;
  // filename为实际保存到本地的文件名，本例中filename=logo.png
  // download()的第二个参数可省略，程序会自动生成一个临时文件
  // 临时文件存储在系统的临时文件夹，可以通过download.tmpDir来更改
  // download()的第一个参数可以为本地文件，此时相当于复制文件
});
```

详细使用方法如下：

+ `download(source, callback);`
+ `download(source, progress, callback);`
+ `download(source, target, callback);`
+ `download(source, target, progress, callback);`

参数：

+ `source` 源文件，可以为本地文件或URL（`http://`或`https://`开头）
+ `target` 目标文件，可省略，默认生成一个在本地临时目录的随机文件名
+ `progress` 下载进度，可省略
+ `callback` 回调函数


授权协议
========

基于MIT协议发布
