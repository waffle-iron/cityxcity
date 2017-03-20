import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('over-time-chart', 'Integration | Component | over time chart',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#over-time-chart}}
      //     template content
      //   {{/over-time-chart}}
      // `);

      this.render(hbs`{{over-time-chart}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
