export default function() {
  this.namespace = '/api';

  this.get('cities');

  this.get('features');

  // this.get('features/:id', (schema, request) => {
  //   let feature = schema.features.find(request.params.id);
  //   return feature;
  // });

  // this.get('cities/:id/features', (schema, request) => {
  //   let city = schema.cities.find(request.params.id);

  //   return city.features;
  // });
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
