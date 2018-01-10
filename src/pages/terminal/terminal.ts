import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the TerminalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terminal',
  templateUrl: 'terminal.html',
})
export class TerminalPage {
  loadingPage: boolean = true;
  segmentSelection: string = 'POS';
  loader: any;
  filerSelection: any ='today';
  transactionsList: any = [];
  enableInfiniteScroll: boolean = true;
  enableRefresher: boolean = false;
  qrData: any;
  showQRData: boolean = false;
  qrDataList: any = [];
  selectOptions: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl:ToastController) 
  {
    this.selectOptions = {
      title: 'Filter'
    };
    this.transactionsList = [
      { 'amount': 100,'terminal': 'q123444', 'transactions': 2},
      { 'amount': 100,  'terminal': 'q123445', 'transactions': 3},
      { 'amount': 23500,  'terminal': 'q123446', 'transactions': 4},
      { 'amount': 100,'terminal': 'q123447', 'transactions': 2},
      { 'amount': 100,  'terminal': 'q123448', 'transactions': 3},
      { 'amount': 23500,  'terminal': 'q123449', 'transactions': 4},
    ];
  }

  ionViewDidLoad() { 
    this.fetchNewData();
  }
  segmentChange(){
    if(this.segmentSelection == 'POS'){
      this.fetchNewData();
    }else {
      this.enableRefresher = false;
      this.fetchLoader();
      setTimeout(() => {
        this.finishLoading(true);
      }, 1000);
    }
  }
  fetchLoader(){
    this.loadingPage = true;
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="cssload-container">
          <div class="cssload-whirlpool"></div>
        </div>
      `,
    });
    this.loader.present();
  }

  finishLoading(event){
    if(event){
      this.loader.dismiss();
      this.loader.onDidDismiss(() => {
        setTimeout(()=> {
          this.loadingPage = false;
        },100); 
      });
    }
  }

  fetchNewData(){
    this.fetchLoader();
    if(this.filerSelection != 'today'){
      this.enableRefresher = false;
    }else {
      this.enableRefresher = true;
    }
    setTimeout(() => {
      this.finishLoading(true);
    },  1000);
  }  

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.enableInfiniteScroll = false;
      infiniteScroll.complete();
    }, 5000);
    
  }

  doRefresh(refresher) {
    this.enableInfiniteScroll = true;
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  scanQR(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      if(barcodeData.format == 'QR_CODE'){
        this.qrData = barcodeData.text;
        this.showToast('Successfuly Scanned the QR, fetching the data', 'toast-success');
        this.fetchLoader();
        this.showQRData = true;
        this.qrDataList = [
          {'name': 'Today', 'amount': 100, 'transaction': 2},
          {'name': 'Week', 'amount': 1000, 'transaction': 5},
          {'name': 'Month', 'amount': 4000, 'transaction': 20},
          {'name': 'All', 'amount': 8000, 'transaction': 50},
        ];
        setTimeout(() => {
          this.finishLoading(true);
        }, 3000);
      }else {
        this.showToast('Not a vaild QR code','toast-failure');
      }
    }, (err) => {
      this.showToast('Error Occurred During Scan, Try Again', 'toast-failure');
    });
  }

  showToast(text, cssClass) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
      cssClass: cssClass
    });
    toast.present();
  }
}
