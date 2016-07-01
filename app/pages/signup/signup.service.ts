import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '../../services/facebook';
import { TabsPage } from './../tabs/tabs';
import { Store, UserInfo } from '../../store';

@Injectable()
export class SignupService {
  constructor(
    private nav: NavController,
    private fb: Facebook,
    private store: Store
  ) { }


  login() {
    (async () => {
      const loginRes = await this.fb.login();
      console.log(loginRes);
      if (loginRes.status === 'connected') {
        this.nav.setRoot(TabsPage);
      } else {
        alert("can't using facebook login");
        return;
      }

      const userID = loginRes.authResponse.userID;
      const accessToken = loginRes.authResponse.accessToken;

      const userRes = await promiseWrapper<User>((<any>FB).api.bind(null, userID));
      if (userRes && !userRes.error) {
        console.log(userRes);
        const userInfo: UserInfo = {
          userId: userID,
          name: userRes.name,
          accessToken: accessToken
        };
        console.group('UserInfo');
        console.log(userInfo);
        console.groupEnd();
        this.store.putUserInfo(userInfo);
      }
    })();
    // return new Promise<fb.AuthResponse>((resolve, reject) => {
    //   this.fb.login()
    //     .then((response) => {
    //       console.log(response);
    //       if (response.status === 'connected') {
    //         this.nav.setRoot(TabsPage);
    //       } else {
    //         alert("can't using facebook login");
    //         reject();
    //       }
    //     })
    //     .then(() => {
    //       FB.getLoginStatus((response) => {
    //         if (response.status === 'connected') {
    //           console.log(response);
    //           // the user is logged in and has authenticated your
    //           // app, and response.authResponse supplies
    //           // the user's ID, a valid access token, a signed
    //           // request, and the time the access token 
    //           // and signed request each expire
    //           var uid = response.authResponse.userID;
    //           var accessToken = response.authResponse.accessToken;
    //           (<any>FB).api(
    //             uid,
    //             function (response) {
    //               if (response && !response.error) {
    //                 /* handle the result */
    //                 console.log(response);

    //               }
    //               resolve(response);
    //             }
    //           );

    //         } else if (response.status === 'not_authorized') {
    //           // the user is logged in to Facebook, 
    //           // but has not authenticated your app
    //           reject();
    //         } else {
    //           // the user isn't logged in to Facebook.
    //           reject();
    //         }
    //       });
    //     });;
  }

}


function promiseWrapper<T>(functionHasCallback: (response: any) => void): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    try {
      functionHasCallback(response => {
        resolve(response);
      });
    } catch (e) {
      reject();
    }
  });
}


interface User {
  name: string;
  id: string;
  error?: any;
}