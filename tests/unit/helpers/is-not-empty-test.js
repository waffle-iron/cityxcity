import { expect } from 'chai';

import { describe, it } from 'mocha';
import { isNotEmpty } from 'cityxcity/helpers/is-not-empty';

describe('Unit | Helper | is not empty', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = isNotEmpty(42);
    expect(result).to.be.ok;
  });
});

