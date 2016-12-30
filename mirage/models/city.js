import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  features: hasMany(),
  investments: hasMany(),
  parcels: hasMany()
});
