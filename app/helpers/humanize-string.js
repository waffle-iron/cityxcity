import Ember from 'ember';
import stringHumanize from 'npm:string-humanize';

export function humanizeString(params/*, hash*/) {
  return stringHumanize(params[0]);
}

export default Ember.Helper.helper(humanizeString);
