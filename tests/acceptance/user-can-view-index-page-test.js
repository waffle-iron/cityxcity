import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | user can view index page', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    server.createList('city', 10);
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function() {
    visit('/');
  });

  it('can visit /', function() {
    expect(currentURL()).to.equal('/');
  });

  it('show a grid of city names on home page');
});
