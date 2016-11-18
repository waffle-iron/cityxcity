import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);
window.mocha.setup({
  timeout: 60000,
  slow: 1000
});