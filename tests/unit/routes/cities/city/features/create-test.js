import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('route:cities/city/features/create', 'Unit | Route | cities/city/features/create',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });
  }
);
