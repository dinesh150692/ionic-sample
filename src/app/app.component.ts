import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, LoadingController, Nav } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="cssload-container">
      <div class="cssload-whirlpool"></div>
  </div>`
    });
  
    loading.present();
  
    setTimeout(() => {
      //this.rootPage = 'LoginPage';
      loading.dismiss();
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    },2000);
  }
}
