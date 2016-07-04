import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '../../providers/facebook';
import { TabsPage } from './../tabs/tabs';
import { Store, UserInfo } from '../../store';


@Injectable()
export class SignupService {
  constructor(
    private nav: NavController,
    private fb: Facebook,
    private store: Store
  ) { }


  getLoginStatus() {
    return this.fb.getLoginStatus().then(res => res.status);
  }


  login() {
    (async () => {
      try {
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

        const userInfo = await this.fb.getUserInfo(userID, accessToken);
        if (userInfo.name) {
          this.store.putUserInfo(userInfo);
        }
      } catch (e) {
        console.error(e);
      }
    })();
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