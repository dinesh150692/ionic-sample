import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    public camera: Camera) {
      this.cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
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
      this.showToast(uri);
  })
  .catch(e => console.log(e));
  }

  captureImage(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.showToast('image captured sucessfully');
      //this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64Image = imageData;
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
      position: 'bottom'
    });
    toast.present();
  }
}
