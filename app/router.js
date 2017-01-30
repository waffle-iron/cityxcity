import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cities', function() {
    this.route('city', { path: '/:id' }, function() {
      this.route('features', { path: '/:id' });
      this.route('edit-feature', { path: '/features/:id/edit'});

      this.route('parcels', { path: '/:id' });
      this.route('investments', { path: '/:id' });
      // just have details view cover filters/list with CSS (position: absolute; left: 0;)

      // for edit, just have a component with an init that creates the map point through the service
    });
  });
  this.route('login');

  // admin
  // this.route('admin', function() {
  //   this.route('cities-edit', { path: 'cities/:id/edit'})
  // })
});

export default Router;
