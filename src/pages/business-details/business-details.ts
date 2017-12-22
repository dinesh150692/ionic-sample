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
          this.showToast("File is sucessfully selected");
        })
        .catch(err => {
          this.showToast("Error in file selection");  
        });
      })
    .catch(e => {
      this.showToast("Error in file selection");
      console.log(e)
    });
  }

  captureImage(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.base64Image = imageData;
      this.showToast(this.base64Image);
      this.showToast('Image captured sucessfully');
      this.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
      //var fileExtension = filename.substr(filename.lastIndexOf('/') + 1);
    }, (err) => {
      this.showToast("Error Capturing,Try Again");
    });
  }

  showToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
