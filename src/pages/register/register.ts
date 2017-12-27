import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CustomValidator } from '../../helpers/validator';

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
  register = new FormGroup({
    name: new FormControl('Ram', [ Validators.required, Validators.minLength(3) ]),
    business_name: new FormControl('Seller', [ Validators.required, Validators.minLength(3) ]),
    email: new FormControl('sample@sample.com', [ Validators.required, CustomValidator.isValidEmail ]),
    mobile: new FormControl('9999999999', [ Validators.required, CustomValidator.isValidMobile ]),
    password: new FormControl('12345678', [ Validators.required,Validators.minLength(8) ])
  });
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

  ionViewWillEnter() {
    console.log('Enter Register');
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
        tabs[ key ].style.display = 'none';
      });
    } // end if
  }

  ionViewDidLeave() {
    console.log('Left Register');
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }
}
