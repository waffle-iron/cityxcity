import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if(serialized) {
      return JSON.parse(serialized);  
    } else {
      return [];
    }
  },

  serialize(deserialized) {
    if(deserialized) {
      return JSON.stringify(deserialized);  
    } else {
      return '[]';
    }
  }
});
