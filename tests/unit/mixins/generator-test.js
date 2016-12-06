import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import GeneratorMixin from 'cityxcity/mixins/generator';

describe('Unit | Mixin | generator', function() {

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
                            table: "developments" }],
      queryParams: ['redevelopment'],
      redevelopment: true
    };

  // Replace this with your real tests.
  it('works', function() {
    let GeneratorObject = Ember.Object.extend(GeneratorMixin);
    let subject = GeneratorObject.create();
    expect(subject).to.be.ok;
  });

  it('inherits defined query params', function() {
    let SqlGeneratorObject = Ember.Object.extend(GeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    expect(!!subject.get('queryParams')).to.be.true;
  });

  it('returns sql string', function() {
    let SqlGeneratorObject = Ember.Object.extend(GeneratorMixin, object_config1);
    let subject = SqlGeneratorObject.create();
    expect(subject.get('tables')[0].get('sql')).to.be.a('string');
  });

  it('updates the property values when they change in the controller', function() {
    // this could pass if there's a setTimeout. Could this be something to do with the runloop?
    Ember.run(() => {    
      let SqlGeneratorObject = Ember.Object.extend(GeneratorMixin, {
        cartodbMapFilters: [{ name: "redevelopment", 
                              type: "boolean", 
                              table: "developments" }],
        queryParams: ['redevelopment'],
        redevelopment: true
      });
      let subject = SqlGeneratorObject.create();
      let queryString = "SELECT WHERE (redevelopment = false)";

      // console.log(subject.get('tables.0.sql'));
      subject.set('redevelopment', false);

      expect(subject.get('tables.0.sql')).
        to.equal(queryString);
    });

  });
});
