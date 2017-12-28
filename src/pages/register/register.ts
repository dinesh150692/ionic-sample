import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

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
  @ViewChild(Content) content: Content
  @ViewChild('inputToFocus') inputToFocus;
  register = new FormGroup({
    name: new FormControl(null, [ 
      Validators.required, 
      Validators.minLength(3) 
    ]),
    business_name: new FormControl(null, [ 
      Validators.required, 
      Validators.minLength(3)
    ]),
    email: new FormControl(null, [ 
      Validators.required,
      CustomValidator.isValidEmail
    ]),
    mobile: new FormControl(null, [ 
      Validators.required, 
      CustomValidator.isValidMobile 
    ]),
    password: new FormControl(null, [ 
      Validators.required,
      Validators.minLength(8) 
    ])
  });
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.inputToFocus.setFocus();
    },200);
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
  
  focusInput(inputRef) {
    let itemTop = inputRef._elementRef.nativeElement.getBoundingClientRect().top;
    let dimensions = this.content.getContentDimensions();
    let itemPositionY = dimensions.scrollTop + itemTop - 80;
    this.content.scrollTo(null, itemPositionY, 500, () => {
      inputRef.setFocus();
    });
  }
}
