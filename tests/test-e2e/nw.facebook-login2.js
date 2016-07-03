'use strict';

var maxWait = 5000;

module.exports = {
  'Facebook Login TEST': function (browser) {
    var mainWindow;
    var popupWindow;
    browser
      .url('http://localhost:8100')

      .waitForElementVisible('body', maxWait)
      .assert.title('Ionic')

      .waitForElementVisible('button[name="facebooklogin"]', maxWait)

      .click('button[name="facebooklogin"]')
      .window_handles(function (result) {
        console.log(result);
        mainWindow = result.value[0];
        popupWindow = result.value[1];
        browser.switchWindow(popupWindow); // ポップアップウインドウにswitchする。
      })

      .waitForElementVisible('input[name="email"]', maxWait)
      .setValue('input[name="email"]', 'hjgflpi_fallerwitz_1467366806@tfbnw.net')
      .setValue('input[name="pass"]', 'testuser')

      .click('input[name="login"]', () => {
        browser.switchWindow(mainWindow) // メインウインドウにswitchする。
      })

      .waitForElementVisible('h2[name="welcome"]', maxWait)
      .assert.containsText('h2[name="welcome"]', 'Welcome to Ionic')

      .end();
  }
};
