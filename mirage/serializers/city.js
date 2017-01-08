import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  // include: ['investments','parcels','features'],

  links(city) {
    return {
      'features': {
        related: `/api/cities/${city.id}/features`
      },
      'investments': {
        related: `/api/cities/${city.id}/investments`
      },
      'parcels': {
        related: `/api/cities/${city.id}/parcels`
      }
    };
  }
});
