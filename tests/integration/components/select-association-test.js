import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('select-association', 'Integration | Component | select association',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#select-association}}
      //     template content
      //   {{/select-association}}
      // `);

      this.render(hbs`{{select-association}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
