var
  KuzzleRole = require('./KuzzleRole'),
  KuzzleProfile = require('./kuzzleProfile'),
  KuzzleUser = require('./kuzzleUser');

/**
 * Kuzzle security constructor
 *
 * @param kuzzle
 * @returns {KuzzleSecurity}
 * @constructor
 */
function KuzzleSecurity(kuzzle) {

  Object.defineProperties(this, {
    kuzzle: {
      value: kuzzle,
      enumerable: true
    },
    // writable properties
    headers: {
      value: JSON.parse(JSON.stringify(kuzzle.headers)),
      enumerable: true,
      writable: true
    }
  });

  Object.defineProperty(this, 'buildQueryArgs', {
    value: function (action) {
      return {
        controller: 'security',
        action: action
      };
    }
  });

  if (this.kuzzle.bluebird) {
    return this.kuzzle.bluebird.promisifyAll(this, {
      suffix: 'Promise',
      filter: function (name, func, target, passes) {
        var blacklist = [];

        return passes && blacklist.indexOf(name) === -1;
      }
    });
  }

  return this;
}


/**
 * @param {string} name
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.fetchRole = function (name, cb) {

};
/**
 *
 * @param {object} filters
 * @param {object} [options] - Optional parameters
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.searchRoles = function (filters, options, cb) {
  var
    query,
    self = this;

  if (!cb && typeof options === 'function') {
    cb = options;
    options = null;
  }

  self.kuzzle.callbackRequired('KuzzleSecurity.searchRoles', cb);

  query = self.kuzzle.addHeaders({body: filters}, this.headers);

  self.kuzzle.query(this.buildQueryArgs('security', 'searchRoles'), query, options, function (error, result) {
    var documents;

    if (error) {
      return cb(error);
    }

    documents = result.result.hits.map(function (doc) {
      return new KuzzleRole(doc._id, doc._source);
    });

    cb(null, { total: result.result.total, documents: documents });
  });

  return this;
};

/**
 * 
 * @param {object} role
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.createRole = function (role, cb) {

};

/**
 * @param {string} name
 * @param {Boolean} hydrate
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.fetchProfile = function (name, hydrate, cb) {

};
/**
 *
 * @param {object} filters
 * @param {Boolean} hydrate
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.searchProfiles = function (filters, hydrate, cb) {

};

/**
 *
 * @param {object} profile
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.createProfile = function (profile, cb) {

};

/**
 * @param {string} name
 * @param {Boolean} hydrate
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.fetchUser = function (name, hydrate, cb) {

};
/**
 *
 * @param {object} filters
 * @param {Boolean} hydrate
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.searchUsers = function (filters, hydrate, cb) {

};

/**
 *
 * @param {object} profile
 * @param {responseCallback} [cb] - returns Kuzzle's response
 *
 * @returns {Object} this
 */
KuzzleSecurity.prototype.createUser = function (profile, cb) {

};


module.exports = KuzzleSecurity;