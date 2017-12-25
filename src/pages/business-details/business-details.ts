import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

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
  cameraOptions: CameraOptions;
  base64Image: any;
  fileName: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fileChooser: FileChooser, 
    public toastCtrl:ToastController,
    public camera: Camera,
    public filePath: FilePath) {
      this.cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailsPage');
  }

  selectFile(){
    this.fileChooser.open()
      .then(uri => {
        this.fileName = uri.substr(uri.lastIndexOf('/') + 1);
        this.filePath.resolveNativePath(uri)
        .then(filePath => {
          this.base64Image = filePath;
          this.showToast("File is sucessfully selected", "toast-success");
        })
        .catch(err => {
          this.showToast("Error in file selection", "toast-failure");  
        });
      })
    .catch(e => {
      this.showToast("Error in file selection", "toast-failure");
      console.log(e)
    });
  }

  captureImage(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.base64Image = imageData;
      this.showToast('Image captured sucessfully', "toast-success");
      this.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
      //var fileExtension = filename.substr(filename.lastIndexOf('/') + 1);
    }, (err) => {
      this.showToast("Error Capturing,Try Again", "toast-failure");
    });
  }

  showToast(text, cssClass) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: cssClass
    });
    toast.present();
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
}
