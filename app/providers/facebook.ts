import {Injectable} from '@angular/core';
import {Facebook as ngFacebook} from 'ionic-native';
import './fbsdk.ts';
import { UserInfo } from '../store';

declare var cordova: any;

// package.jsonのcordovaPluginsからappIdを取得する。
const cordovaPlugins: any[] = require('../../package.json').cordovaPlugins;
const appId: string = cordovaPlugins
  .filter(plugin => plugin.id && plugin.id === 'cordova-plugin-facebook4')
  .filter(plugin => plugin.variables && plugin.variables.APP_ID)
  .map(plugin => plugin.variables.APP_ID as string)[0] || '';
console.log('Facebook AppId: ' + appId);


@Injectable()
export class Facebook {
  constructor() {
    // only browser
    if (typeof cordova === "undefined") {
      (<any>window).fbAsyncInit = function () {
        FB.init({
          // appId: '【input your facebook appID】',
          // xfbml: false
          // version: 'v2.5'
          appId: appId,
          status: true,
          xfbml: true,
          version: 'v2.6'
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      } (document, 'script', 'facebook-jssdk'));
    }
  }


  login(): Promise<fb.AuthResponse> {
    return new Promise<fb.AuthResponse>(function (resolve, reject) {
      if (typeof cordova === "undefined") {
        if (navigator.userAgent.match('CriOS')) {
          alert("don't work chrome for iOS.you should use safari.");
        } else {
          console.log("start login");
          FB.login(
            function (response) {
              console.log("login is resolve");
              resolve(response);
            },
            { scope: 'public_profile,user_friends,email' });
        }
      } else {
        // using native
        ngFacebook.login(['email', 'public_profile', 'user_friends']).then(
          (response) => {
            resolve(response);
          },
          (failed) => {
            reject(failed);
          }
        );
      }
    });
  }


  getLoginStatus(): Promise<fb.AuthResponse> {
    return new Promise<fb.AuthResponse>((resolve, reject) => {
      if (typeof cordova === 'undefined') {
        FB.getLoginStatus(response => {
          if (response && !response['error']) {
            console.log('status before login: ' + response.status);
            resolve(response);
          } else {
            reject(response);
          }
        });
      } else { // cordova
        ngFacebook.getLoginStatus()
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      }
    })
  }


  getUserInfo(userId: string, accessToken: string): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      if (typeof cordova === 'undefined') {
        (<any>FB).api(userId, response => {
          if (response && !response.error) {
            const userInfo: UserInfo = {
              userId: userId,
              name: response.name,
              accessToken: accessToken
            };
            resolve(userInfo);
          } else {
            reject(response);
          }
        });
      } else { // cordova
        ngFacebook.api(userId, [])
          .then(response => {
            const userInfo: UserInfo = {
              userId: userId,
              name: response.name,
              accessToken: accessToken
            };
            resolve(userInfo);
          })
          .catch(err => {
            reject(err);
          });
      }
    })
  }

}