import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import { UserInfo } from './types';

@Injectable()
export class Store {
  private _userInfoSubject$ = new ReplaySubject<UserInfo>();
  private _userInfo$: Observable<UserInfo>;

  constructor() {
    this._userInfo$ = this._userInfoSubject$.scan<UserInfo>((p, value) => {
      return value;
    });
  }


  get userInfo$() { return this._userInfo$; }
  putUserInfo(data: UserInfo) { this._userInfoSubject$.next(data); }

}
