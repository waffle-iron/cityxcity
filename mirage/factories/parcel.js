import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.company.companyName(); },
  address: faker.address.streetAddress,
  contact: faker.internet.email,
  yearBuilt: faker.date.past,
  forLease: faker.random.boolean,
  forSale: faker.random.boolean,
  landUseType(i) {
    return faker.list.cycle('Residential',
                            'Commercial Office',
                            'Commercial Other',
                            'Industrial',
                            'Institutional, Other, or Unknown')(i);
  },
  geom() {
    let latitude = parseFloat(faker.address.latitude());
    let longitude = parseFloat(faker.address.longitude());
    let offset = 0.5;

    let latlngs = [ [latitude, longitude], 
                  [(latitude + offset), longitude], 
                  [(latitude + offset), (longitude - offset)], 
                  [latitude, (longitude - offset)] ];

    return latlngs;
  }
});
