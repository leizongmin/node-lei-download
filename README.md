lei-download
=================

下载文件到本地

```JavaScript
var download = require('download');

var url = 'https://www.npmjs.com/static/images/npm-logo.png';
download(url, 'logo.png', function (err, filename) {
  if (err) throw err;
  // filename为实际保存到本地的文件名，本例中filename=logo.png
  // download()的第二个参数可省略，程序会自动生成一个临时文件
  // 临时文件存储在系统的临时文件夹，可以通过download.tmpDir来更改
  // download()的第一个参数可以为本地文件，此时相当于复制文件
});
```

授权协议
========

基于MIT协议发布
