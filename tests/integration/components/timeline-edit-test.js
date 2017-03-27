import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('timeline-edit', 'Integration | Component | timeline edit',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#timeline-edit}}
      //     template content
      //   {{/timeline-edit}}
      // `);

      this.render(hbs`{{timeline-edit}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
