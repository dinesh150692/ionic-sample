import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IonicPage, NavController, Content } from 'ionic-angular';

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
    name: new FormControl('Ram', [ 
      Validators.required, 
      Validators.minLength(3) 
    ]),
    business_name: new FormControl('Shop', [ 
      Validators.required, 
      Validators.minLength(3)
    ]),
    email: new FormControl('sample@sample.com', [ 
      Validators.required,
      CustomValidator.isValidEmail
    ]),
    mobile: new FormControl('9876543210', [ 
      Validators.required, 
      CustomValidator.isValidMobile 
    ]),
    password: new FormControl('123456789', [ 
      Validators.required,
      Validators.minLength(8) 
    ])
  });
  constructor(private navCtrl: NavController) {
  }

  openTermsAndCondition(){

  }

  getFurtherDetails(){
    this.navCtrl.setRoot(BusinessDetailsPage);
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
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
