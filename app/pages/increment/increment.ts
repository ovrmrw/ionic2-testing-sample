import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NavController, Toast, } from 'ionic-angular';

import { IncrementService } from './increment.service';


@Component({
  // templateUrl: 'build/pages/home/home.html'
  template: require('./increment.html'),
  providers: [IncrementService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncrementPage implements OnInit {
  constructor(
    private nav: NavController,
    private cd: ChangeDetectorRef,
    private service: IncrementService
  ) { }

  ngOnInit() { }

  ionViewLoaded() {
    this.showToast('middle'); // ngOnInitに書くとテスト時にエラーになる。
  }


  showToast(position: string) {
    let toast = Toast.create({
      message: 'push "+" button to increment counter.',
      duration: 3000,
      position: position
    });
    this.nav.present(toast);
  }


  increment() { this.service.increment(); }

  decrement() { this.service.decrement(); }


  get userName() { return this.service.userName$; }


  // templateのasyncパイプへObservableを渡しているが、
  // 自前でsubscribeしてtemplateに直接値を渡した方がレスポンスは速い。
  // (asyncパイプはdirty checkingのようなものなので多少のタイムラグがある)
  get counter() { return this.service.counter$; }
}
