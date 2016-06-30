import { Injectable } from '@angular/core';
import { Store } from '../../store';

@Injectable()
export class HomeService {
  constructor(
    private store: Store
  ) { }

  get userName$() { return this.store.userName$; }

}