'use strict';

var maxWait = 5000;

module.exports = {
  'Nightwatch test 1': function (browser) {
    browser
      .url('http://localhost:8100')

      .waitForElementVisible('body', maxWait)
      .assert.title('Ionic')

      .waitForElementVisible('button#facebooklogin', maxWait)

      // TODO: このテストが通るようにする。
      .click('button#facebooklogin', function () {
        this.pause(5000);
        this.assert.containsText('h2', 'Welcome to Ionic')
      })

      .end();
  }
};
