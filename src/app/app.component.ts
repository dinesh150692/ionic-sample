import { Component, NgZone } from '@angular/core';

import { App,Platform, MenuController, LoadingController, AlertController, NavControllerBase} from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  nav: NavControllerBase;
  rootPage: any = LoginPage;
  loading: any;
  alert: any;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public app: App)
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //platform.resume.subscribe((e) => this.showPause(e));
      //platform.pause.subscribe((e) => this.showResume(e));
      platform.registerBackButtonAction(() => this.handleHardwareBackButtonPress());
      statusBar.styleDefault();
      splashScreen.hide();
      this.zone.run(() =>  {
        this.initializeApp();        
      });
    });
  }

  initializeApp() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="cssload-container">
      <div class="cssload-whirlpool"></div>
      </div>`
    });
    this.loading.present();
    setTimeout(() => {
      //this.rootPage = 'LoginPage';
      this.loading.dismiss();
    },100);
  }

  handleHardwareBackButtonPress() {
    this.nav = this.app.getActiveNav();
    if (this.nav.canGoBack()) {
      this.nav.pop();
    } else {
      this.showExitConfirmation();
    }
  }

  showExitConfirmation() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }

  showPause(e: any){
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you pause?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();

  }

  showResume(e: any){
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you resume ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }
}
