import { expect } from 'chai';

import { describe, it } from 'mocha';
import { humanizeString } from 'cityxcity/helpers/humanize-string';

describe('Unit | Helper | humanize string', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = humanizeString(42);
    expect(result).to.be.ok;
  });
});

