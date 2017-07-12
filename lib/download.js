'use strict';

/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const request = require('request');
const utils = require('./utils');

module.exports = function downloadFile(url, target, progress, callback) {
  callback = utils.callback(callback);
  url = utils.fixURL(url);
  const debug = utils.debug(`download: ${ url } => ${ target }`);
  debug('start');

  const s = fs.createWriteStream(target);
  s.on('error', err => {
    debug('open target file error: %s', err);
    callback(err);
  });

  let totalSize = 0;
  let downloadSize = 0;
  request
    .get({
      url,
      encoding: null,
    })
    .on('response', res => {
      if (res.statusCode !== 200) {
        const err = new Error('status #' + res.statusCode + ' (' + url + ')');
        err.url = url;
        err.statusCode = res.statusCode;
        err.response = res;
        err.target = target;
        return callback(err);
      }
      totalSize = Number(res.headers['content-length'] || null);
      debug('totalSize: %s', totalSize);

      res.on('data', data => {
        downloadSize += data.length;
        debug('progress: %s/%s', downloadSize, totalSize);
        progress && progress(downloadSize, totalSize);
      });
    })
    .on('error', err => {
      debug('error: %s', err);
      callback(err);
    })
    .pipe(s);

  s.on('close', () => callback(null, target));
};
