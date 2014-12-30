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
var fsExtra = require('fs-extra');
var debug = require('debug')('lei-download');
var getTmpDir = os.tmpdir || os.tmpDir;


function download (url, saveFilename, callback) {
  if (typeof saveFilename === 'function') {
    callback = saveFilename;
    saveFilename = randomFilename();
  }
  if (isURL(url)) {
    downloadFile(url, saveFilename, cb);
  } else {
    copyFile(url, saveFilename, cb);
  }
  function cb (err) {
    callback(err, saveFilename);
  }
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

function downloadFile (url, filename, callback) {
  debug('download file: %s => %s', url, filename);

  mkdirp(path.dirname(filename), function (err) {
    if (err) return callback(err);

    request.get({
      url: url,
      encoding: null
    }, function (err, res, body) {
      if (err) return callback(err);

      debug('file saved: %s', filename);
      fs.writeFile(filename, body, function (err) {
        callback(err, filename);
      });
    });
  })
}

function copyFile (file1, file2, callback) {
  debug('copy file: %s => %s', file1, file2);
  fsExtra.copy(file1, file2, callback);
}


module.exports = exports = download;
