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

const schema1 = {
  result: {
    a: 'slugish',
    b: 'already-slugged'
  },
  pre: (action, cb) => {
    cb.apply(schema1, [() => {}]);
  },
  set: (a, b) => {
    schema1.result[a] = b;
  },
  get: a => schema1.result[a]
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
  it('shoud not slug if data exists', () => {
    const plugin = mongooseSlug({ from: 'a', to: 'b' });
    plugin(schema1);
    expect(schema1.result.a).to.be.not.equal(schema1.result.b);
  });
});
