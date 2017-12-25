import { Component, NgZone } from '@angular/core';

import { App,Platform, MenuController, LoadingController, AlertController, NavControllerBase, ToastController} from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  nav: NavControllerBase;
  rootPage: any = LoginPage;
  loading: any;
  alert: any;
  disconnectSubscription: any;
  connectSubscription: any;
  networkCount: any;
  toast: any;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public network: Network,
    public toastCtrl: ToastController,
    public app: App)
  { 
    this.networkCount = 0;
    platform.ready().then(() => {
      //platform.resume.subscribe((e) => this.showPause(e));
      //platform.pause.subscribe((e) => this.showResume(e));
      platform.registerBackButtonAction(() => this.handleHardwareBackButtonPress());
      statusBar.styleDefault();
      splashScreen.hide();
      this.zone.run(() =>  {
        this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
          this.showToast("Could not connect to internet", 5000, "toast-failure");
        });
        this.connectSubscription = this.network.onConnect().subscribe(() => {
          this.networkCount += this.networkCount + 1;
          this.toast.dismiss();
          if(this.networkCount > 1){
            this.showToast("Connected to a Network", 2000, "toast-success");
          }
        });
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

  showToast(text, duration, cssClass) {
    this.toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      cssClass: cssClass
    });
    this.toast.present();
  }


  // ionViewillLeave(){
  //   // stop disconnect watch
  //   this.disconnectSubscription.unsubscribe();  
  //   // stop connect watch
  //   this.connectSubscription.unsubscribe();
  // }
  
}
