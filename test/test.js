'use strict';

/**
 * lei-download tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const os = require('os');
const getTmpDir = os.tmpdir || os.tmpDir;
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const download = require('../');

describe('download', function () {

  let FILE1, FILE2, FILE1_SIZE, FILE2_SIZE;

  it('download failed', function (done) {
    download('http://hahaha-xxx-yyy', function (err, filename) {
      assert.notEqual(err, null);
      assert.equal(err.code, 'ENOTFOUND');
      console.log(err);
      done();
    });
  });

  it('download from URL (random filename)', function (done) {
    download('http://avatars.githubusercontent.com/u/841625', function (err, filename) {
      assert.equal(err, null);
      assert.equal(typeof filename, 'string');
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        FILE1 = filename;
        fs.stat(filename, function (err, stats) {
          assert.equal(err, null);
          FILE1_SIZE = stats.size;
          done();
        });
      });
    });
  });

  it('download from URL (specified filename)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '-1');
    download('http://avatars.githubusercontent.com/u/841625', specFilename, function (err, filename) {
      assert.equal(err, null);
      assert.equal(filename, specFilename);
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        FILE2 = filename;
        fs.stat(filename, function (err, stats) {
          assert.equal(err, null);
          FILE2_SIZE = stats.size;
          done();
        });
      });
    });
  });

  it('download from URL (no protocol name)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '-1');
    download('//avatars.githubusercontent.com/u/841625', specFilename, function (err, filename) {
      assert.equal(err, null);
      assert.equal(filename, specFilename);
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        FILE2 = filename;
        fs.stat(filename, function (err, stats) {
          assert.equal(err, null);
          FILE2_SIZE = stats.size;
          done();
        });
      });
    });
  });

  it('download from local (random filename)', function (done) {
    download(FILE1, function (err, filename) {
      assert.equal(err, null);
      assert.equal(typeof filename, 'string');
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        done();
      });
    });
  });

  it('download from local (specified filename)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '-2');
    download(FILE2, specFilename, function (err, filename) {
      assert.equal(err, null);
      assert.equal(filename, specFilename);
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        done();
      });
    });
  });

  it('download from local (make parent dir)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '/1/2/3/4/5');
    download(FILE2, specFilename, function (err, filename) {
      assert.equal(err, null);
      assert.equal(filename, specFilename);
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        done();
      });
    });
  });

  it('download from local (source and target are the same name)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '-4');
    // make a copy
    download(FILE2, specFilename, function (err, filename) {
      assert.equal(err, null);
      assert.equal(filename, specFilename);
      fs.exists(filename, function (ok) {
        assert.equal(ok, true);
        // source and target are the same name
        download(specFilename, specFilename, function (err, filename) {
          assert.equal(err, null);
          assert.equal(filename, specFilename);
          fs.stat(filename, function (err, stats) {
            assert.equal(err, null);
            assert.equal(stats.size, FILE2_SIZE);
            done();
          });
        });
      });
    });
  });

});
