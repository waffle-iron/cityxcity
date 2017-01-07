import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('current-city-features', 'Integration | Component | current city features',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#current-city-features}}
      //     template content
      //   {{/current-city-features}}
      // `);

      this.render(hbs`{{current-city-features}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
