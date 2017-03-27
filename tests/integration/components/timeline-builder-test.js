import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('timeline-builder', 'Integration | Component | timeline builder',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#timeline-builder}}
      //     template content
      //   {{/timeline-builder}}
      // `);

      this.render(hbs`{{timeline-builder}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
