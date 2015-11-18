/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var fs = require('fs');
var os = require('os');
var request = require('request');
var mkdirp = require('mkdirp');
var debug = require('debug')('lei-download');
var getTmpDir = os.tmpdir || os.tmpDir;


/*
 source, target => string
 progress, callback => function

 download(source, callback);
 download(source, progress, callback);
 download(source, target, callback);
 download(source, target, progress, callback);
*/
function download () {
  var source, target, progress, callback;
  if (arguments.length < 2) {
    throw new TypeError('invalid argument number');
  }
  source = arguments[0];
  callback = arguments[arguments.length - 1];
  if (arguments.length === 2) {
    callback = arguments[1];
  } else if (arguments.length === 3) {
    if (typeof arguments[1] === 'function') {
      progress = arguments[1];
    } else {
      target = arguments[1];
    }
  } else {
    target = arguments[1];
    progress = arguments[2];
  }
  progress = progress || function () { };
  target = target || randomFilename();

  mkdirp(path.dirname(target), function (err) {
    if (err) return callback(err);

    if (isURL(source)) {
      downloadFile(source, target, progress, cb);
    } else {
      copyFile(source, target, progress, cb);
    }

    var hasCallback = false;
    function cb (err) {
      if (hasCallback) return debug('has callback! err=%s', err);
      hasCallback = true;
      callback(err, target);
    }
  });
}

download.tmpDir = getTmpDir();

function randomString (size, chars) {
  size = size || 6;
  var code_string = chars || 'abcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}

function randomFilename () {
  return path.resolve(download.tmpDir, randomString(20));
}

function isURL (url) {
  if (url.substr(0, 7) === 'http://') return true;
  if (url.substr(0, 8) === 'https://') return true;
  return false;
}

function downloadFile (url, filename, progress, callback) {
  debug('download file: %s => %s', url, filename);
  var s = fs.createWriteStream(filename);
  s.on('error', function (err) {
    debug('open target file error: %s', err);
    callback(err);
  });

  var totalSize = 0;
  var downloadSize = 0;
  var req = request
    .get({
      url: url,
      encoding: null
    })
    .on('response', function (res) {
      if (res.statusCode !== 200) {
        return callback(new Error('status #' + res.statusCode));
      }
      totalSize = res.headers['content-length'] || null;
      debug('totalSize: %s', totalSize);

      res.on('data', function (data) {
        downloadSize += data.length;
        debug('download file progress: [%s/%s] %s => %s', downloadSize, totalSize, url, filename);
        progress(downloadSize, totalSize);
      });
      res.on('end', function () {
        callback(null, filename);
      });
    })
    .pipe(s);
}

function copyFile (source, target, progress, callback) {
  debug('copy file: %s => %s', source, target);
  fs.stat(source, function (err, stats) {
    if (err) return callback(err);

    var ss = fs.createReadStream(source);
    var ts = fs.createWriteStream(target);
    ss.on('error', function (err) {
      debug('open source file error: %s', err);
      callback(err);
    });
    ts.on('error', function (err) {
      debug('open target file error: %s', err);
      callback(err);
    });

    var copySize = 0;
    ss.on('data', function (data) {
      copySize += data.length;
      debug('copy file progress: [%s/%s] %s => %s', copySize, stats.size, source, target);
      progress(copySize, stats.size);
    });

    ss.on('end', function () {
      callback(null, target);
    });

    ss.pipe(ts);
  });
}


module.exports = exports = download;
