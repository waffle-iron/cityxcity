import Ember from 'ember';

export function isNotEmpty(params/*, hash*/) {
  let type = Ember.typeOf(params[0]);
  return (type !== 'undefined') && (type !== 'null') && (params[0] !== "");
}

export default Ember.Helper.helper(isNotEmpty);
