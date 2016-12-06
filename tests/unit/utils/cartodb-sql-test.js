import { expect } from 'chai';
import { describe, it } from 'mocha';
import cartodbSql from 'cityxcity/utils/cartodb-sql';

describe('Unit | Utility | cartodb sql', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = cartodbSql();
    expect(result).to.be.ok;
  });
});
