import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, AlertController } from 'ionic-angular';

import {  LoginPage } from '../login/login';
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TransactionPage';
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
  pages: PageInterface[] = [
    { title: 'Transaction', pageName: 'TabPage', tabComponent: 'TransactionPage', index: 0, icon: 'swap' },
    { title: 'Reports', pageName: 'TabPage', tabComponent: 'ReportsPage', index: 1, icon: 'document' },
    { title: 'QR/POS', pageName: 'TabPage', tabComponent: 'TerminalPage', index: 2, icon: 'barcode' },
    { title: 'Refund', pageName: 'TabPage', tabComponent: 'RefundPage', index: 3, icon: 'refresh' },
  ];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  openPage(page: PageInterface) {
    this.nav.setRoot(page.tabComponent);
    
    //let params = {};
    // //  The index is equal to the order of our tabs inside tabs.ts
    // if (page.index) {
    //   params = { tabIndex: page.index };
    // }
 
    // // The active child nav is our Tabs Navigation
    // if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
    //   this.nav.getActiveChildNavs()[0].select(page.index);
    // } else {
    //   // Tabs are not active, so reset the root page 
    //   // In this case: moving to or from SpecialPage
    //   this.nav.setRoot(page.pageName, params);
    // }
  }
 
  isActive(page: PageInterface) {
    if (this.nav.getActive() && this.nav.getActive().id === page.tabComponent) {
         return 'phonepe';
    }
    // // Again the Tabs Navigation
    // let childNav = this.nav.getActiveChildNavs()[0];
 
    // if (childNav) {
    //   console.log(childNav.getSelected());
    //   if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
    //     return 'phonepe';
    //   }
    //   return ;
    // }
 
    // Fallback needed when there is no active childnav (tabs not active)
    
    // if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
    //   return 'phonepe';
    // }
    // return;
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  logoutChecker(){
    let alert = this.alertCtrl.create({
      title: 'Logout',
      mode: 'ios',
      subTitle: 'Are you sure to end the current session?',
      buttons: [
        {
          text: 'No',
          handler: data => {
          }
        },
        {
          text: 'Yes',
          handler: (data) => {
            alert.dismiss().then(() => {
              this.logout();
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }
}
