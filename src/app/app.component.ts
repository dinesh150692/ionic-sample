import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, LoadingController, Nav } from 'ionic-angular';

import { TransactionPage } from '../pages/transaction/transaction';
import { ReportsPage } from '../pages/reports/reports';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Transactions', component: TransactionPage},
      {title: 'Reports', component: ReportsPage},
    ];
  }

  initializeApp() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
      this.rootPage = LoginPage;
      this.platform.ready().then(() => {
        
        
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }, 2000);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
