import { Injectable } from '@angular/core';
import { Store } from '../../store';

@Injectable()
export class IncrementService {
  constructor(
    private store: Store
  ) { }

  increment() {
    this.store.putCounter(1);
  }

  decrement() {
    this.store.putCounter(-1);
  }


  get userName$() {
    return this.store.userInfo$
      .map(info => info.name);
  }

  get counter$() { return this.store.counter$; }
  putCounter(data: number) { this.store.putCounter(data); }

}