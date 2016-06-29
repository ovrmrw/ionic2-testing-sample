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
    private navController: NavController,
    private cd: ChangeDetectorRef,
    private service: IncrementService
  ) { }

  ngOnInit() { }

  ionViewLoaded() {
    this.showToast('bottom'); // ngOnInitに書くとテスト時にエラーになる。
  }


  showToast(position: string) {
    let toast = Toast.create({
      message: 'push "+" button to increment counter.',
      duration: 3000,
      position: position
    });

    this.navController.present(toast);
  }


  content: string = 'increment page content';
}
