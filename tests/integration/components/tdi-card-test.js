import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('tdi-card', 'Integration | Component | tdi card',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#tdi-card}}
      //     template content
      //   {{/tdi-card}}
      // `);

      this.render(hbs`{{tdi-card}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
