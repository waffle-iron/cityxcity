import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cities', function() {
    this.route('city', { path: '/:id' }, function() {
      this.route('details');

      this.route('features', function() {
        this.route('create');
      });
    });
  });
  this.route('login');
});

export default Router;
