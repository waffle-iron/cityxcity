import Ember from 'ember';

export function replaceWith(params/*, hash*/) {
  return params[0].replace(params[1],params[2]);
}

export default Ember.Helper.helper(replaceWith);
