import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import { HomeService } from './home.service';

@Component({
  // templateUrl: 'build/pages/home/home.html',
  template: require('./home.html'),
  providers: [HomeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  constructor(
    private service: HomeService,
    private cd: ChangeDetectorRef,
    private nav: NavController
  ) { }

  ngOnInit() { }

  get userName() { return this.service.userName$; }
}
