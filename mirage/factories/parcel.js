import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.company.companyName(); },
  address() { return faker.address.streetAddress(); },
  contact() { return faker.internet.email(); },
  geom() {
    let latitude = parseFloat(faker.address.latitude());
    let longitude = parseFloat(faker.address.longitude());
    let offset = 0.5;

    let latlngs = [ [latitude, longitude], 
                  [(latitude + offset), longitude], 
                  [(latitude + offset), (longitude - offset)], 
                  [latitude, (longitude - offset)] ];
                  
    let box = L.polygon(latlngs);

    return latlngs;
  }
});
