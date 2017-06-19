/**
 * lei-download test d.ts
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import * as download from './';

download('url', (err, save) => {});
download('url', (size, total) => {}, (err, save) => {});
download('url', 'save', (err, save) => {});
download('url', 'save', (size, total) => {}, (err, save) => {});
