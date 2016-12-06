import { expect } from 'chai';
import { describe, it } from 'mocha';
import cartodbSql from 'cityxcity/utils/cartodb-sql';

// required setup for util.
let filters = [
   {  name: "booleanType", 
      type: "boolean", 
      table: "investments",
      alias: "booleanType" },
   {  name: "typeType", 
      type: "type", 
      table: "parcels",
      alias: "typeType" },
   {  name: "rangeType", 
      type: "range", 
      table: "features",
      alias: "rangeType" },
    {  name: "animalType", 
       type: "type", 
       table: "features",
       alias: "animalType" }
  ];

// let paramNames = filters.uniqBy('alias').mapBy('alias');

// function makeSql(table) {
//   return computed(...paramNames, function() {
//     //let cartodbMapFilters = this.get('cartodbMapFilters');

//     return cartodbSql(this, filters, table);
//   });
// }

describe('Unit | Utility | cartodb sql', function() {

  let testObject
  beforeEach(function() {
    testObject = Ember.Object.create({
      // booleanType: true,
      // typeType: 'cats',
      // rangeType: '[10,50]'
    });
  });
  // Replace this with your real tests.
  it('works', function() {
    let result = cartodbSql(testObject,filters,'investments');
    expect(result).to.be.ok;
  });

  it('generates sql', function() {
    let result = cartodbSql(testObject,filters,'investments');
    expect(result).to.equal("SELECT * FROM investments");
  });

  it('accepts booleanType', function() {
    testObject.set('booleanType', true)
    let result = cartodbSql(testObject,filters,'investments');
    expect(result).to.equal("SELECT * FROM investments WHERE (investments.booleanType = true)");
  });

  it('accepts regular type', function() {
    testObject.set('typeType', 'cats')
    let result = cartodbSql(testObject,filters,'parcels');
    expect(result).to.equal("SELECT * FROM parcels WHERE (parcels.typeType = 'cats')");
  });

  it('accepts rangeType', function() {
    testObject.set('rangeType', '[1,20]')
    let result = cartodbSql(testObject,filters,'features');
    expect(result).to.equal("SELECT * FROM features WHERE (features.rangeType BETWEEN 1 AND 20)");
  });

  it('accepts multiple', function() {
    testObject.set('rangeType', '[1,20]');
    testObject.set('animalType', 'mammal');
    let result = cartodbSql(testObject,filters,'features');
    expect(result).to.equal("SELECT * FROM features WHERE (features.rangeType BETWEEN 1 AND 20) AND (features.animalType = 'mammal')");
  });

  it('maps to correct table', function() {
    testObject.set('rangeType', '[1,20]');
    testObject.set('animalType', 'mammal');
    let result = cartodbSql(testObject,filters,'parcels');
    expect(result).to.equal("SELECT * FROM parcels");
  });

  it('updates the correct table when the object property changes', function() {
    // not quite sure how to write this. manual test shows this working.


    // testObject.set('booleanType', true);
    // let result = cartodbSql(testObject,filters,'investments');
    // expect(result).to.equal("SELECT * FROM investments WHERE (investments.booleanType = true)");
    // result = cartodbSql(testObject,filters,'investments');
    // testObject.set('booleanType', false);
    // expect(result).to.equal("SELECT * FROM investments WHERE (investments.booleanType = false)");
  });
});
