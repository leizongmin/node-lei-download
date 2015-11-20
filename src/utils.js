/**
 * lei-download
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import os from 'os';
import path from 'path';
import createDebug from 'debug';

const DEBUG_PREFIX = 'lei-download:';
let utilsDebug = createDebug(DEBUG_PREFIX + 'utils');

export function debug(name) {
  return createDebug(DEBUG_PREFIX + name);
}

export function callback(fn) {
  let hasCallback = false;
  return function (...args) {
    if (hasCallback) {
      utilsDebug('callback twice: %s', args);
    } else {
      utilsDebug('callback: %s', args);
      hasCallback = true;
      fn(...args);
    }
  }
}

let getTmpDir = os.tmpdir || os.tmpDir;

export function randomString(size = 6, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') {
  let max = chars.length + 1;
  let str = '';
  while (size > 0) {
    str += chars.charAt(Math.floor(Math.random() * max));
    size--;
  }
  return str;
}

export function randomFilename(tmpDir = getTmpDir()) {
  return path.resolve(tmpDir, randomString(20));
}

export function isURL (url) {
  if (url.substr(0, 7) === 'http://') return true;
  if (url.substr(0, 8) === 'https://') return true;
  return false;
}
