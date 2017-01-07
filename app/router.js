import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cities', function() {
    this.route('city', { path: '/:id' }, function() {
      // todo: shouldn't need details, move up
      this.route('details');
    });
  });
  this.route('login');

  // admin
  // this.route('admin', function() {
  //   this.route('cities-edit', { path: 'cities/:id/edit'})
  // })
});

export default Router;
