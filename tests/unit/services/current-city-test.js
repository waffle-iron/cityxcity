import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('service:current-city', 'Unit | Service | current city',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let service = this.subject();
      expect(service).to.be.ok;
    });
  }
);