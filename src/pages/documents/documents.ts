import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

import { SuccessPage } from '../success/success';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  cameraOptions: CameraOptions;
  panNativePath: any;
  panfile: any;
  chequeNativePath: any;
  chequefile: any;
  itrNativePath: any;
  itrfile: any;

  documentsDetails = new FormGroup({
    pan: new FormControl(null, Validators.required),
    cheque: new FormControl(null, Validators.required),
    itr: new FormControl(null, Validators.required),
  });
  constructor(
    public navCtrl: NavController,
    public fileChooser: FileChooser, 
    public camera: Camera,
    public filePath: FilePath,
    public toastCtrl:ToastController
  ) {
      this.cameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
      }
  }


  selectFile(chooser){
    this.fileChooser.open()
      .then(uri => {
        let file = uri.substr(uri.lastIndexOf('/') + 1);
        this.filePath.resolveNativePath(uri)
        .then(filePath => {
          let fileNativePath = filePath;
          this.showToast("File is sucessfully selected", "toast-success");
          this.assignFileName(fileNativePath, file, chooser);
        })
        .catch(err => {
          this.showToast("Error in file selection", "toast-failure");  
        });
      })
    .catch(e => {
      this.showToast("Error in file selection", "toast-failure");
    });
  }

  captureImage(chooser){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      let fileNativePath = imageData;
      let file = imageData.substr(imageData.lastIndexOf('/') + 1);
      this.showToast('Image captured sucessfully', "toast-success");
      this.assignFileName(fileNativePath, file, chooser);
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

  assignFileName(fileNativePath, file, chooser){

    switch(chooser){
      case 'PAN':
        this.panNativePath = fileNativePath;
        this.panfile = file;
        break;
      case 'ITR':
        this.itrNativePath = fileNativePath;
        this.itrfile = file;
        break;
      case 'CHEQUE':
        this.chequeNativePath = fileNativePath;
        this.chequefile = file;
        break;
    }

  }

  goToSuccess(){
    this.navCtrl.setRoot(SuccessPage);
  }
}
