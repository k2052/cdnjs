var cdnjs = require ('../cdn.js');
var should = require ('should');
var _ = require ('lodash');

describe ('cdn.js', function () {

  describe ('#apiUrl', function () {
    it ('should be cdnjs.com\'s API', function () {
      cdnjs.apiUrl.should.equal ('http://api.cdnjs.com/libraries');
    });
  });

  /*
  describe ('#libraries ()', function () {
    it ('should get the libraries from cdnjs.com (all libraries)', function (done) {
      cdnjs.libraries (function (err, results, total) {
        should.not.exist (err);
        total.should.be.type ('number');
        total.should.be.above (0);
        results.should.be.instanceof (Array);
        total.should.equal (results.length);

        results.forEach (function (lib) {
          lib.should.have.properties ('name', 'latest');
        });

        done (err);
      });
    });
    it ('should get the libraries from cdnjs.com (libraries with a search term)', function (done) {
      cdnjs.libraries ('knockout', function (err, results, total) {
        should.not.exist (err);
        total.should.be.type ('number');
        total.should.be.above (0);
        results.should.be.instanceof (Array);
        total.should.equal (results.length);

        results.forEach (function (lib) {
          lib.should.have.properties ('name', 'latest');
          should.exist (lib.name.match (/knockout/));
        });

        done (err);
      });
    });
    it ('should get the libraries from cdnjs.com (all libraries with an optional field)', function (done) {
      cdnjs.libraries (['version', 'keywords'], function (err, results, total) {
        should.not.exist (err);
        total.should.be.type ('number');
        total.should.be.above (0);
        results.should.be.instanceof (Array);
        total.should.equal (results.length);

        results.forEach (function (lib) {
          lib.should.have.properties ('name', 'latest', 'version', 'keywords');
        });

        done (err);
      });
    });
  });

  describe ('#_getLibraries ()', function () {
    it ('should get the libraries from cdnjs remote url', function (done) {
      cdnjs._getLibraries ('http://api.cdnjs.com/libraries?search=foobar', function (err, results, total) {
        should.not.exist (err);
        results.should.be.instanceof (Array);
        total.should.be.type ('number');
        results.length.should.equal (total);
        done (err);
      });
    });

    it ('should return an error', function (done) {
      cdnjs._getLibraries ('htp://example.org', function (err, results, total) {
        should.not.exist (results);
        should.not.exist (total);
        should.exist (err);
        done (null);
      });
    });
  });

  describe ('#_buildUrl ()', function () {
    it ('should return a cdnjs.com search url (no query and no field)', function (done) {
      var result = cdnjs._buildUrl ();
      var expected = 'http://api.cdnjs.com/libraries';
      expected.should.equal (result);
      done (null);
    });

    it ('should return a cdnjs.com search url (query and no field)', function (done) {
      var name = 'foobar';
      var fields = null;
      var result = cdnjs._buildUrl (name, fields);
      var expected = 'http://api.cdnjs.com/libraries?search=foobar';
      expected.should.equal (result);
      done (null);
    });

    it ('should return a cdnjs.com search url (no query and fields)', function (done) {
      var name = null;
      var fields = ['foo', 'bar', 'baz', 'boo'];
      var result = cdnjs._buildUrl (name, fields);
      var expected = 'http://api.cdnjs.com/libraries?fields=foo,bar,baz,boo';
      expected.should.equal (result);
      done (null);
    });

    it ('should return a cdnjs.com search url (query and fields)', function (done) {
      var name = 'foobar';
      var fields = ['foo', 'bar', 'baz', 'boo'];
      var result = cdnjs._buildUrl (name, fields);
      var expected = 'http://api.cdnjs.com/libraries?search=foobar&fields=foo,bar,baz,boo';
      expected.should.equal (result);
      done (null);
    });
  });
  */

  describe ('#search ()', function () {
    var libraries = [
      { name: 'knockout-bootstrap',
      latest: 'http://cdnjs.cloudflare.com/ajax/libs/knockout-bootstrap/0.2.1/knockout-bootstrap.js' },
      { name: 'knockout-sortable',
      latest: 'http://cdnjs.cloudflare.com/ajax/libs/knockout-sortable/0.8.1/knockout-sortable.min.js' },
      { name: 'knockout-validation',
      latest: 'http://cdnjs.cloudflare.com/ajax/libs/knockout-validation/2.0.1/knockout.validation.min.js' },
      { name: 'knockout.mapping',
      latest: 'http://cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.js' },
      { name: 'knockout',
      latest: 'http://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js' }
    ];

    it ('should search in an array of results (and find)', function (done) {
      cdnjs.search (libraries, 'knockout', function (err, results) {
        should.not.exist (err);
        results.should.have.properties ('exact', 'partials', 'longestName');
        results.partials.should.be.instanceof (Array);
        should.exist (results.exact);
        results.exact.should.be.type ('object');
        results.partials.length.should.be.above (0);
        results.longestName.should.equal (results.partials.reduce (function (memo, lib) {
          return lib.name.length > memo ? lib.name.length : memo;
        }, 0));
        done (err);
      });
    });

    it ('should search in an array of results (and not find anything)', function (done) {
      cdnjs.search (libraries, 'jquery', function (err, results) {
        should.not.exist (err);
        results.should.have.properties ('exact', 'partials', 'longestName');
        results.partials.should.be.instanceof (Array);
        should.not.exist (results.exact);
        results.partials.length.should.equal (0);
        results.longestName.should.equal (0);
        done (err);
      });
    });
  });

  describe ('#exractTerm ()', function () {
    it ('should separate the library name from the version (name@version)', function (done) {
      var term = 'foobar@1.2.3';
      var req = cdnjs.extractTerm (term);
      req.should.have.property ('name', 'foobar');
      req.should.have.property ('version', '1.2.3');
      done ();
    });
  });

});