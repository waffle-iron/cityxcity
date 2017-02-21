import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import CenterMapOnGeometryMixin from 'cityxcity/mixins/center-map-on-geometry';

describe('Unit | Mixin | center map on geometry', function() {
  // Replace this with your real tests.
  it('works', function() {
    let CenterMapOnGeometryObject = Ember.Object.extend(CenterMapOnGeometryMixin);
    let subject = CenterMapOnGeometryObject.create();
    expect(subject).to.be.ok;
  });
});
