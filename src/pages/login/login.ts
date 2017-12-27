import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { CustomValidator } from '../../helpers/validator';

import { MenuPage } from '../menu/menu';
import { RegisterPage }  from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  logo: any = 'assets/phonepe_icon.png';
  showPassword: boolean = false;
  signIn = new FormGroup({
    email: new FormControl('sample@sample.com', Validators.compose([
      Validators.required,
      CustomValidator.isValidEmail
    ])),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
  });
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log(this.signIn.value);
    this.navCtrl.setRoot(MenuPage);
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }

  goToRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }

  resetPassword(){
    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Enter Registered Email/Mobile',
          type:"text",
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: (data) => {
            alert.dismiss().then(() => {
              this.fetchResetPassword(data);
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  fetchResetPassword(data){
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Verification code sent to: " + data.email,
      inputs: [
        {
          name: 'code',
          placeholder: 'Enter 5 digit verification code',
          type:"text",
        },
        {
          name: 'password',
          placeholder: 'Enter new password',
          type:"password",
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            if (data) {
              alert.dismiss().then(() => {
                this.showToast('Password Reset Successful, Login Now...');
              });
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  showToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });
    toast.present();
  }

}