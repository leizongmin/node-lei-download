/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const utils = require('./utils');

module.exports = function copyFile(source, target, progress, callback) {
  callback = utils.callback(callback);
  const debug = utils.debug(`copy: ${ source } => ${ target }`);
  debug('start');

  // 如果 source = target 则不进行任何操作
  if (source === target) {
    debug('source and target are the same file: %s', source);
    return callback(null, target);
  }

  fs.stat(source, (err, stats) => {
    if (err) return callback(err);

    const ss = fs.createReadStream(source);
    const ts = fs.createWriteStream(target);
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
      ts.on('close', () => callback(null, target));
    });
  });
};
