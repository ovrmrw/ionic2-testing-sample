'use strict';

var maxWait = 5000;

module.exports = {
  'Facebook Login TEST': function (browser) {
    browser
      .url('http://localhost:8100')

      .waitForElementVisible('body', maxWait)
      .assert.title('Ionic')

      .waitForElementVisible('button[name="facebooklogin"]', maxWait)

      .click('button[name="facebooklogin"]', function () {
        this.window_handles(function (result) {
          console.log(result);
          var main = result.value[0];
          var popup = result.value[1];
          browser.switchWindow(popup); // ポップアップウインドウにswitchする。

          this.waitForElementVisible('input[name="email"]', maxWait);
          this.setValue('input[name="email"]', 'hjgflpi_fallerwitz_1467366806@tfbnw.net');
          this.setValue('input[name="pass"]', 'testuser');

          this.click('input[name="login"]', function () {
            browser.switchWindow(main); // メインウインドウにswitchする。

            this.waitForElementVisible('h2[name="welcome"]', maxWait);
            this.assert.containsText('h2[name="welcome"]', 'Welcome to Ionic');
          });
        });
      })

      .end();
  }
};
