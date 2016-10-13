/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const os = require('os');
const path = require('path');
const createDebug = require('debug');

const DEBUG_PREFIX = 'lei-download:';
const utilsDebug = createDebug(DEBUG_PREFIX + 'utils');

exports.debug = function debug(name) {
  return createDebug(DEBUG_PREFIX + name);
};

exports.callback = function callback(fn) {
  let hasCallback = false;
  return function (...args) {
    if (hasCallback) {
      utilsDebug('callback twice: %s', args);
    } else {
      utilsDebug('callback: %s', args);
      hasCallback = true;
      fn(...args);
    }
  };
};

const getTmpDir = os.tmpdir || os.tmpDir;

exports.randomString = function randomString(size = 6, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') {
  const max = chars.length + 1;
  let str = '';
  while (size > 0) {
    str += chars.charAt(Math.floor(Math.random() * max));
    size -= 1;
  }
  return str;
};

exports.randomFilename = function randomFilename(tmpDir = getTmpDir()) {
  return path.resolve(tmpDir, exports.randomString(20));
};

exports.isURL = function isURL(url) {
  if (url.substr(0, 7) === 'http://') return true;
  if (url.substr(0, 8) === 'https://') return true;
  return false;
};
