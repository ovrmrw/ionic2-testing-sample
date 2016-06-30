import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Facebook} from './../../services/facebook';
import {TabsPage} from './../tabs/tabs';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [Facebook]
})
export class SignupPage {
  // fb :any;
  constructor(
    public nav: NavController,
    private fb: Facebook
  ) {
    // this.fb = fb;
  }

  login() {
    this.fb.login().then((response) => {
      console.log(response);
      if (response.status === 'connected') {
        this.nav.setRoot(<any>TabsPage);
      } else {
        alert("can't using facebook login");
      }
    });
  }
}
