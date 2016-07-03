import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SignupService } from './signup.service';


@Component({
  // templateUrl: 'build/pages/signup/signup.html',
  template: require('./signup.html'),
  providers: [SignupService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPage implements OnInit {
  constructor(
    private service: SignupService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }


  login() {
    (async () => {
      this.loginStatus = await this.service.getLoginStatus();
      this.cd.markForCheck();
      this.service.login();
    })();
  }


  loginStatus: string;
}