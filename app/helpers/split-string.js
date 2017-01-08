import Ember from 'ember';

export function splitString(params, delimiter) {
  if (!(typeof params === 'string')) return params;
  return params.split(delimiter);
}

export default Ember.Helper.helper(splitString);
