import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPage implements OnInit {
  constructor(
    private navController: NavController,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    (async function () {
      this.texts.push('start async');

      await new Promise(resolve => {
        setTimeout(() => {
          this.texts.push('this message should be shown between "start" and "end".');
          resolve();
          this.cd.markForCheck();
        }, 1000);
      });

      this.texts.push('end async');
    })();
  }

  texts: string[] = [];
}
