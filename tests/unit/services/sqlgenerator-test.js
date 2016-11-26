import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('service:sqlgenerator', 'Unit | Service | sqlgenerator',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function() {
    // Replace this with your real tests.
    let filters = ["year_compl", "tothu", "commsf", "status", 
                { "redevelopment": { type: 'boolean' }}, 
                { "asofright": { type: 'boolean' }}, 
                { "age_restricted": { type: 'boolean' }}, 
                { "clusteros": { type: 'boolean' }}, 
                { "phased": { type: 'boolean' }}, 
                { "cancelled": { type: 'boolean' }}, 
                { "private": { type: 'boolean' }}, 
                "number", "size", "placeSearch"];

    it('exists', function() {
      let service = this.subject();
      expect(service).to.be.ok;
    });

    it('gets params', function() {
      let service = this.subject();
      service.set('filters', filters);
      expect(service.get('filters')).to.be.ok;

    });
  }
);
