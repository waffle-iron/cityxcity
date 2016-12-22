import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import SqlGeneratorMixin from 'cityxcity/mixins/sql-generator';

describe('Unit | Mixin | sql generator', function() {

  it('works', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, {
      cartodbMapFilters: [{ name: "redevelopment", type: "boolean" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    });
    let subject = SqlGeneratorObject.create();
    expect(subject).to.be.ok;
  });

  it('inherits defined query params', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, {
      cartodbMapFilters: [{ name: "redevelopment", type: "boolean" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    });
    let subject = SqlGeneratorObject.create();
    expect(!!subject.get('queryParams')).to.be.true;
  });

  it('returns sql string', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, {
      cartodbMapFilters: [{ name: "redevelopment", type: "boolean" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    });
    let subject = SqlGeneratorObject.create();
    expect(subject.get('sql')).to.be.a('string');
  });

  it('accepts a table parameter from parent', function() {
    // not sure yet... tables are column specific, so
    // the DSL needs to support a table property

    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, {
      cartodbMapFilters: [{ name: "redevelopment",
                            type: "boolean",
                            table: "developments" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    });
    let subject = SqlGeneratorObject.create();
    expect(subject.get('sql')).to.be.a('string');
  });

  it('can receive controller property param values', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, {
      cartodbMapFilters: [{ name: "redevelopment", type: "boolean" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    });
    let subject = SqlGeneratorObject.create();
    expect(subject.get('redevelopment')).to.be.true;
  });
});
