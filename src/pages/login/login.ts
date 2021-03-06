import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';

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
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  login() {
    console.log(this.signIn.value);
    this.navCtrl.setRoot(MenuPage);
  }

  goToRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }

  forgotPassword(){
    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      mode: 'ios',
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
          }
        },
        {
          text: 'Confirm',
          handler: (data) => {
            alert.dismiss().then(() => {
              this.resetPassword(data);
            });
            return false;
          }
        }
      ]
    });
    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }

  resetPassword(data){
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      mode: 'ios',
      message: "Verification code sent to: " + data.email,
      inputs: [
        {
          name: 'code',
          placeholder: 'Enter 5 digit verification code',
          type:"number",
          max:99999,
          min:10000,
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
    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
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

  checkValidCode(){

  }
}