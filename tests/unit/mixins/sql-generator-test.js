import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import SqlGeneratorMixin from 'cityxcity/mixins/sql-generator';

describe('Unit | Mixin | sql generator', function() {

  const object_config1 = 
    {
      cartodbMapFilters: [{ name: "redevelopment", 
                            type: "boolean", 
                            table: "developments" },
                          { name: "redevelopment", 
                            type: "boolean", 
                            table: "investments" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    };

  const object_config2 = 
    {
      cartodbMapFilters: [{ name: "redevelopment", 
                            type: "boolean", 
                            table: "developments" },
                          { name: "redevelopment", 
                            type: "boolean", 
                            table: "investments" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    };

  it('works', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    expect(subject).to.be.ok;
  });

  it('inherits defined query params', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    expect(!!subject.get('queryParams')).to.be.true;
  });

  it('returns sql string', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    expect(subject.get('tables')[0].get('sql')).to.be.a('string');

    console.log(subject.get('tables')[0].get('sql'));
  });

  it('clears out the squel for individual tables', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    let queryString = "SELECT WHERE (redevelopment = true)";
    expect(subject.get('tables')[0].get('sql')).
      to.equal(queryString);
  });

  it('updates the property values when they change in the controller', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    let queryString = "SELECT WHERE (redevelopment = true)";
    // expect(subject.get('tables')[1].get('sql')).
    //   to.equal(queryString);
    queryString = "SELECT WHERE (redevelopment = false)";
    subject.set('redevelopment', false);
    expect(subject.get('tables')[1].get('sql')).
      to.equal(queryString);
  });

  it('accepts a table parameter from parent', function() {
    // not sure yet... tables are column specific, so
    // the DSL needs to support a table property

    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    console.log(subject.get('tables')[0].get('sql'));
    expect(subject.get('tables')[0].get('sql')).to.be.a('string');
    // expect()
  });

  it('can receive controller property param values', function() {
    let SqlGeneratorObject = Ember.Object.extend(SqlGeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    expect(subject.get('redevelopment')).to.be.true;
  });
});
