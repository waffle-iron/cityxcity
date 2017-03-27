import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('file-field-progress', 'Integration | Component | file field progress',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#file-field-progress}}
      //     template content
      //   {{/file-field-progress}}
      // `);

      this.render(hbs`{{file-field-progress}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
