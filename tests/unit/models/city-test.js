import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel(
  'city',
  'Unit | Model | city',
  {
    // Specify the other units that are required for this test.
      needs: ['model:feature', 'model:investment', 'model:parcel']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let model = this.subject();
      // var store = this.store();
      expect(model).to.be.ok;
    });
  }
);
