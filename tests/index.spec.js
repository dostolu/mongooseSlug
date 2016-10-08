/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');
const mongooseSlug = require('../src');
const { SlugMongooseError } = require('../src');

const schema = {
  result: {
    a: 'slugish'
  },
  pre: (action, cb) => {
    cb.apply(schema, [() => {}]);
  },
  set: (a, b) => {
    schema.result[a] = b;
  },
  get: a => schema.result[a]
};

describe('Slug plugin', () => {
  it('should throw an exception if parameters are wrong', () => {
    const plugin = mongooseSlug({});
    try {
      plugin({});
    } catch (err) {
      expect(err).to.be.instanceof(SlugMongooseError);
    }
  });
  it('should slug', () => {
    const plugin = mongooseSlug({ from: 'a', to: 'b' });
    plugin(schema);
    expect(schema.result.a).to.be.equal(schema.result.b);
  });
});
