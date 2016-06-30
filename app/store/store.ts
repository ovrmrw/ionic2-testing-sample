import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';


@Injectable()
export class Store {
  private _userNameSubject$ = new ReplaySubject<string>();
  private _userName$: Observable<string>;

  constructor() {
    this._userName$ = this._userNameSubject$.scan((p, value) => {
      return value;
    }, null);
  }


  putUserName(data: string) { this._userNameSubject$.next(data); }

  get userName$() { return this._userName$; }
}
