import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs/Rx';
import { UserInfo } from './types';


@Injectable()
export class Store {
  private _userInfoSubject$ = new ReplaySubject<UserInfo>();
  private _userInfo$: Observable<UserInfo>;
  private _counterSubject$ = new BehaviorSubject<number>(0);
  private _counter$: Observable<number>;

  constructor() {
    this._userInfo$ = this._userInfoSubject$.scan<UserInfo>((p, value) => {
      console.group('New UserInfo');
      console.log(value);
      console.groupEnd();
      return value;
    });
    this._counter$ = this._counterSubject$.scan<number>((p, value) => {
      const _value = p + value;
      console.group('New Counter');
      console.log(_value);
      console.groupEnd();
      return p + value;
    });
  }


  get userInfo$() { return this._userInfo$; }
  putUserInfo(data: UserInfo) { this._userInfoSubject$.next(data); }

  get counter$() { return this._counter$; }
  putCounter(data: number) { this._counterSubject$.next(data); }
}
