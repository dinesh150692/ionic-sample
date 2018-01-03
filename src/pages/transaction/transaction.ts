import { Component, } from '@angular/core';
import { IonicPage, LoadingController, AlertController} from 'ionic-angular';
import { Helper } from '../../helpers/helper';

/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  
  transactionsList: any = [];
  loadingPage: boolean = true;
  loader: any;
  date: any;
  totalAmount: any;
  constructor(
    private loadingCtrl: LoadingController,
    private helper: Helper,
    private alertCtrl: AlertController
  ) {
    this.date = this.helper.getDateFormat();
    this.fetchLoader();
    this.transactionsList = [
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444'},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-10T23:30:52.123Z', 'terminal': 'q123444'},
      { 'mobileNumber':'9999999999','amount': 23500, 'date': '2017-11-13T23:30:52.123Z', 'terminal': 'q123444'},
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z', 'terminal': 'q123444'},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2014-09-13T23:30:52.123Z', 'terminal': 'q12343'},
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444'}
    ];
    this.totalAmount = 24400;
    this.fetchTransactionsList();
  }

  fetchLoader(){
    this.loadingPage = true;
    console.log(this.loadingPage);
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
    this.loader.dismiss();
    this.loadingPage = false;
    console.log(this.loadingPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.transactionsList = [
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-10T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 23000, 'date': '2017-11-13T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2014-09-13T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444'},
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-09-13T23:30:52.123Z', 'terminal': 'q123444'},
      ];
      this.totalAmount = 24600;
      this.fetchTransactionsList();
      refresher.complete();
    }, 2000);
  }

  fetchFilter() {
    
    let alert = this.alertCtrl.create({
      title: 'Report Filter',
      message: "Select the start and end date for filtering",
      inputs: [
        {
          name: 'Start Date',
          placeholder: 'date',
          type:"date",
          value: this.date,
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
          text: 'Filter',
          handler: data => {
            if (data) {
            this.fetchLoader();
            setTimeout(() => {
              this.fetchTransactionsList();
            }, 2000);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
