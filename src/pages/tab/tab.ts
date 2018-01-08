import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  tab1Root = 'TransactionPage';
  tab2Root = 'ReportsPage';
  myIndex: number;
 
  constructor( private navParams: NavParams) {
    this.myIndex = this.navParams.data.tabIndex || 0;
  }

}
