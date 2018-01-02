import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DocumentsPage } from '../documents/documents';

/**
 * Generated class for the BusinessDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})

export class BusinessDetailsPage {
  businessDetails = new FormGroup({
    businessType: new FormControl('m', Validators.required),
    businessCategory: new FormControl('f', Validators.required),
    businessSubCategory: new FormControl('m', Validators.required),
    //fileName: new FormControl(null, Validators.required),
    //filePath: new FormControl(this.fileNativePath, Validators.required)
  });
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailsPage');
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
        tabs[ key ].style.display = 'inline';
      });
    } // end if
  }

  goToDocument(){
    this.navCtrl.setRoot(DocumentsPage);
  }
}
