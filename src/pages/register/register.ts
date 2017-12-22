import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BusinessDetailsPage } from '../business-details/business-details';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  openTermsAndCondition(){

  }

  getFurtherDetails(){
    this.navCtrl.setRoot(BusinessDetailsPage);
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
