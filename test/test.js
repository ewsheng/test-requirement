var assert = require('assert');
var tr = require('../');

describe('Test Requirement', function () {
  var TEST_DOCUMENT = {
    "id": "123",
    "x": "hello",
    "actors": [
      "tom hanks",
      "george clooney"
    ]
  };

  var TEST_AND_TRUE = {
    "and": [
      {
        "id": ["123"]
      },
      {
        "x": ["hello"]
      }
    ]
  };

  var TEST_AND_FALSE = {
    "and": [
      {
        "id": ["NOPE"]
      },
      {
        "x": ["hello"]
      }
    ]
  };

  var TEST_OR_TRUE = {
    "or": [
      {
        "id": ["123"]
      },
      {
        "x": ["helloa"]
      }
    ]
  };

  var TEST_OR_FALSE = {
    "or": [
      {
        "id": ["NOPE"]
      },
      {
        "x": ["NOPE"]
      }
    ]
  };

  var TEST_KV_TRUE = {
    "id": ["123"]
  };

  var TEST_KV_FALSE = {
    "id": ["NOPE"]
  };

  var TEST_KV_NO_KEY = {
    "otherKey": ["NOPE"]
  };


  describe('and tests', function () {
    it('should return true when all AND tests pass', function () {
      assert.equal(true, tr(TEST_DOCUMENT, TEST_AND_TRUE));
    });

    it('should return false when one AND test fails', function () {
      assert.equal(false, tr(TEST_DOCUMENT, TEST_AND_FALSE));
    });
  });

  describe('or tests', function () {
    it('should return true when all OR tests pass', function () {
      assert.equal(true, tr(TEST_DOCUMENT, TEST_OR_TRUE));
    });

    it('should return false when all OR tests fail', function () {
      assert.equal(false, tr(TEST_DOCUMENT, TEST_OR_FALSE));
    });
  });


  describe('key value tests', function () {
    it('should return true when a test contains an array of values and document does too', function () {
      assert.equal(true, tr(TEST_DOCUMENT, TEST_KV_TRUE));
    });

    it('should return false when a test contains an array of values and document does not', function () {
      assert.equal(false, tr(TEST_DOCUMENT, TEST_KV_FALSE));
    });

    it('should return false whe a document does not contain key specified in test', function () {
      assert.equal(false, tr(TEST_DOCUMENT, TEST_KV_NO_KEY));
    });
  });
});