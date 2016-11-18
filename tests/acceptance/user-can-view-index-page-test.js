import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const TEXT = '#text';

describe('Acceptance | user can view index page', function() {
  let application;

  beforeEach(function() {
    application = startApp();
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

  it('show some text on the homepage', function() {
    // expect()
    let text = find(TEXT).text();
    expect(text).to.include("Hello");
  });
});