const slug = require('slug');

class SlugMongooseError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Slug mongoose error';
    this.name = 'SlugMongooseError';
    this.stack = (new Error()).stack;
  }
}

const defaultOptions = {
  from: null,
  to: null
};

module.exports = opts => schema => {
  const options = Object.assign({}, defaultOptions, opts);
  if (options.from === null || options.to === null) {
    throw new SlugMongooseError('Parameters from and to are not defined');
  }
  /* eslint func-names: 0 */
  schema.pre('validate', function (next) {
    const doc = this;
    doc.set(options.to, slug(doc.get(options.from)).toLowerCase());
    next();
  });
};
module.exports.SlugMongooseError = SlugMongooseError;
