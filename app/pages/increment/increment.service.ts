import { Injectable } from '@angular/core';
import { Store } from '../../store';

@Injectable()
export class IncrementService {
  constructor(
    private store: Store
  ) { }

  get userName$() {
    return this.store.userInfo$
      .map(info => info.name);
  }

}