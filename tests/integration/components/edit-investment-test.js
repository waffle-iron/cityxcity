import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('edit-investment', 'Integration | Component | edit investment',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#edit-investment}}
      //     template content
      //   {{/edit-investment}}
      // `);

      this.render(hbs`{{edit-investment}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
