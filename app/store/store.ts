import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';


@Injectable()
export class Store {
  private userNameSubject$ = new ReplaySubject<string>();
  
  userName$: Observable<string>;

  constructor() {
    this.userName$ = this.userNameSubject$.scan<string>((p, value) => {
      return value;
    });
  }


  putUserName(data: string) { this.userNameSubject$.next(data); }

}
