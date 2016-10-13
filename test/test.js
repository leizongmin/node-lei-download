/**
 * lei-download tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const os = require('os');
const getTmpDir = os.tmpdir || os.tmpDir;
const fs = require('fs');
const path = require('path');
const should = require('should');
const download = require('../');


describe('download', function () {

  let FILE1, FILE2;

  it('download from URL (random filename)', function (done) {
    download('http://avatars.githubusercontent.com/u/841625', function (err, filename) {
      should.equal(err, null);
      filename.should.be.type('string');
      fs.exists(filename, function (ok) {
        ok.should.be.true;
        FILE1 = filename;
        done();
      });
    });
  });

  it('download from URL (specified filename)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '-1');
    download('http://avatars.githubusercontent.com/u/841625', specFilename, function (err, filename) {
      should.equal(err, null);
      filename.should.equal(specFilename);
      fs.exists(filename, function (ok) {
        ok.should.be.true;
        FILE2 = filename;
        done();
      });
    });
  });

  it('download from local (random filename)', function (done) {
    download(FILE1, function (err, filename) {
      should.equal(err, null);
      filename.should.be.type('string');
      fs.exists(filename, function (ok) {
        ok.should.be.true;
        done();
      });
    });
  });

  it('download from local (specified filename)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '-2');
    download(FILE2, specFilename, function (err, filename) {
      should.equal(err, null);
      filename.should.equal(specFilename);
      fs.exists(filename, function (ok) {
        ok.should.be.true;
        done();
      });
    });
  });

  it('download from local (make parent dir)', function (done) {
    const specFilename = path.resolve(getTmpDir(), Date.now() + '/1/2/3/4/5');
    download(FILE2, specFilename, function (err, filename) {
      should.equal(err, null);
      filename.should.equal(specFilename);
      fs.exists(filename, function (ok) {
        ok.should.be.true;
        done();
      });
    });
  });

});
