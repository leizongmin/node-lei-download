/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import fs from 'fs';
import request from 'request';
import * as utils from './utils';

const debug = utils.debug('download');

export default function downloadFile(url, target, progress, callback) {
  callback = utils.callback(callback);
  const debug = utils.debug(`download: ${ url } => ${ target }`);
  debug('start');

  const s = fs.createWriteStream(target);
  s.on('error', err => {
    debug('open target file error: %s', err);
    callback(err);
  });

  let totalSize = 0;
  let downloadSize = 0;
  const req = request
    .get({
      url,
      encoding: null,
    })
    .on('response', res => {
      if (res.statusCode !== 200) {
        return callback(new Error('status #' + res.statusCode));
      }
      totalSize = res.headers['content-length'] || null;
      debug('totalSize: %s', totalSize);

      res.on('data', data => {
        downloadSize += data.length;
        debug('progress: %s/%s', downloadSize, totalSize);
        progress && progress(downloadSize, totalSize);
      });
    })
    .pipe(s);

  s.on('close', () => callback(null, target));
}
