import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const LOGIN_LINK = '.login-link';
const EMAIL_FIELD = '.login-username';
const PASSWORD_FIELD = '.login-password';
const LOGIN_BUTTON = '.login-submit';
const LOGOUT_LINK = '.logout-link';

describe('Acceptance | user logs in and logs out successfully', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('show index', function() {
    beforeEach(function() {
      server.createList('user', 2);
      visit('/');
    });

    describe('click login link', function() {
      beforeEach(function() {
        click(LOGIN_LINK);
        fillIn(EMAIL_FIELD, 'user@email.com');
        fillIn(PASSWORD_FIELD, 'user@email.com');
      });

      it("shows login boxes", function() {
        expect(currentURL()).to.equal("/login");
      });

      describe('logging in', function() {
        beforeEach(function() {
          click(LOGIN_BUTTON);
        });

        it('logs the user in', function() {
          expect(currentURL()).to.equal('/');
          expect(find(LOGOUT_LINK).text(), 'Logout');
        });
      });
    });
  });
});
