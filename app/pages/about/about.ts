import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  // templateUrl: 'build/pages/about/about.html',
  template: require('./about.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPage implements OnInit {
  constructor(
    private navController: NavController,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.showTextsAsync();
  }

  ionViewLoaded() { }


  showTextsAsync() {
    (async () => {
      this.texts.push('start async');

      await new Promise(resolve => {
        setTimeout(() => {
          this.texts.push('this message should be shown between "start" and "end".');
          this.cd.markForCheck();
          resolve();
        }, 1000);
      });

      this.texts.push('end async');
    })();
  }

  texts: string[] = [];
}
