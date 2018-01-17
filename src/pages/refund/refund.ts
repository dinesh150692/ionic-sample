import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the RefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refund',
  templateUrl: 'refund.html',
})
export class RefundPage {
  filterValue: any;
  loadingPage: boolean = false;
  transactionsList:  any = [];
  enableInfiniteScroll: boolean = true;
  enableRefresher: boolean = true;
  loader: any;
  partialRefundAmount: number = 0;
  refundHistoryLoaded: boolean = false;
  enableRefund: any;
  title ="Refunds";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.fetchLoader();
    this.fetchTransactionsList(); 
  }

  init(){
    this.navCtrl.setRoot(RefundPage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundPage');
  }

  onInput(event){
    console.log(event);
  }
  
  onCancel(event){
    console.log(event);
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

  fetchTransactionsList() {
    this.transactionsList = [
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false },
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-10T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false,  'refund': false },
      { 'mobileNumber':'9999999999','amount': 2300000, 'date': '2017-11-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false },
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2014-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
    ];
    setTimeout(() => {
      this.loader.dismiss();
      this.loadingPage = false;
    }, 1000);
  }

  doRefresh(refresher) {
    this.enableInfiniteScroll = true;
    setTimeout(() => {
      this.transactionsList = [
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false },
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-10T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false,  'refund': false },
        { 'mobileNumber':'9999999999','amount': 23000, 'date': '2017-11-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false },
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2014-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      ];
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.transactionsList = [
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false },
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-10T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false,  'refund': false },
        { 'mobileNumber':'9999999999','amount': 23000, 'date': '2017-11-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false },
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2014-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444', 'refunded': false, 'refund': false},
      ];
      //infiniteScroll.enable(false);
      this.enableInfiniteScroll = false;
      infiniteScroll.complete();
    }, 5000);
    
  }

  partialRefund(item){
    this.initateRefundAlert(this.partialRefundAmount, item);
  }

  fullRefund(item){
    this.initateRefundAlert(item.amount, item);  
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

  initateRefundAlert(amount,item){
    let alert = this.alertCtrl.create({
      title: 'Refund',
      mode: 'ios',
      message: "You have intiated a refund of amount  ₹" + amount,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            alert.dismiss();
            this.intiateRefund(amount,item);
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  intiateRefund(amount, item){
    item.refunded= true;
    item.refund=false;
    this.showToast('Refunded the amount  ₹' + amount + ' successfuly.' ,'toast-success');
  }

  fetchRefundHistory(){
    this.fetchLoader();
    this.refundHistoryLoaded = true;
    this.title = "Refund History";
    this.enableRefresher = false;
    this.transactionsList = [
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-10T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 23000, 'date': '2017-11-13T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2014-09-13T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444' },
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444' },
    ];
    setTimeout(() => {
      this.loader.dismiss();
      this.loadingPage = false;
    }, 1000);
  } 

  checkPartialRefundAmount(item, event){
    this.zone.run(()=> {
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
      this.partialRefundAmount = event._value;
      if( this.partialRefundAmount >= item.amount ){
        this.partialRefundAmount = item.amount - 1;
      }else if( item.partialRefundAmount < 0 ){
        this.partialRefundAmount = 0;
      }
      
    });
  }

  openRefund(item){
    if(item.refund){
      item.refund = true;
      this.enableRefund = item;
    }else if(this.enableRefund && this.enableRefund.refund){
      this.enableRefund.refund = false;
      this.partialRefundAmount=0
      item.refund = true;
      this.enableRefund = item;
    }else{
      item.refund = true;
      this.enableRefund = item;
    }
  }
  
  closeRefund(item){
    item.refund = false;
    this.partialRefundAmount=0;
    this.enableRefund = null;
  }
}
