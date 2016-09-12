/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import path from 'path';
import fs from 'fs';
import * as utils from './utils'

let debug = utils.debug('download');

export default function copyFile(source, target, progress, callback) {
  callback = utils.callback(callback);
  let debug = utils.debug(`copy: ${source} => ${target}`);
  debug('start');

  fs.stat(source, (err, stats) => {
    if (err) return callback(err);

    let ss = fs.createReadStream(source);
    let ts = fs.createWriteStream(target);
    ss.on('error', err => {
      debug('open source file error: %s', err);
      callback(err);
    });
    ts.on('error', err => {
      debug('open target file error: %s', err);
      callback(err);
    });

    let copySize = 0;
    ss.on('data', data => {
      copySize += data.length;
      ts.write(data);
      debug('copy file progress: %s/%s', copySize, stats.size);
      progress && progress(copySize, stats.size);
    });

    ss.on('end', _ => {
      ts.end();
      process.nextTick(() => callback(null, target));
    });
  });
}
